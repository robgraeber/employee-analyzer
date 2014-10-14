var _ = require('underscore');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var csvParse = Promise.promisify(require('csv-parse'));
var formidable = require('formidable');

var employeeGroups = {};
var currentId = 1;

module.exports = function(app) {

  app.post('/api/employee-groups', function (req, res){

    if(!req.files.employees || !req.files.salaries){
      res.status(500);
      res.send({
        results:{
          error: "Missing file"
        },
        status:"Error"
      });
      return;
    }
    Promise.all([
      fs.readFileAsync(req.files.employees.path),
      fs.readFileAsync(req.files.salaries.path)
    ])
    .spread(function(employees, salaries){
      return Promise.all([
        csvParse(employees.toString('utf8'), {auto_parse: true, columns: ['employeeId', 'birthdate', 'firstName', 'lastName', 'sex', 'startDate']}),
        csvParse(salaries.toString('utf8'), {auto_parse: true, columns: ['employeeId', 'salary', 'startDate', 'endDate']})
      ]);
    })
    .spread(function(employees, salaries){
      var employeeGroup = {
        id: currentId++,
        employees:{},
        salaries:{},
      };

      employees.forEach(function(employee){
        employee.startDate = Date.parse(employee.startDate) //converts to 1970 epoch time
        employeeGroup.employees[employee.employeeId] = employee;
      })
      salaries.forEach(function(salary){
        var id = salary.employeeId;
        salary.startDate = Date.parse(salary.startDate)
        salary.endDate = Date.parse(salary.endDate)
        employeeGroup.salaries[id] = employeeGroup.salaries[id] || [];
        employeeGroup.salaries[id].push(salary)
      })

      employeeGroups[employeeGroup.id] = employeeGroup;
    
      res.send({
        results:{
          resourceId: employeeGroup.id,
          resourceUrl:"/api/employee-groups/"+employeeGroup.id,
          employeesUrl:"/api/employee-groups/"+employeeGroup.id+"/employees",
          salariesUrl:"/api/employee-groups/"+employeeGroup.id+"/salaries"
        },
        status:"OK"
      });
    })
    .catch(function(err){
      res.status(500);
      res.send({
        results:{
          error: err
        },
        status:"Error"
      });
    });
  });

  // app.get('/api/employee-groups/:id', function (req, res){
  //   res.send({
  //     results: {data: employeeGroups[req.params.id]},
  //     status:"OK"
  //   });
  // });

  app.get('/api/employee-groups/:id/employees', function (req, res){
    var employeeGroup = employeeGroups[req.params.id] || {};
    res.send({
      results: {data: _.toArray(employeeGroup.employees)},
      status:"OK"
    });
  });

  app.get('/api/employee-groups/:id/employees/:employeeId/salaries', function (req, res){
    var employeeGroup = employeeGroups[req.params.id] || {};
    var employees = employeeGroup.employees || {};
    var salaries = employeeGroup.salaries || {};
    
    res.send({
      results:{ 
        data: _.toArray(salaries[req.params.employeeId]),
        parent: employees[req.params.employeeId] 
      },
      status:"OK"
    });
  });
};

