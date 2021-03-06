Employee Analyzer
===================

Example employee csv analyzer using express, node, backbone, highcharts. Please fork and improve :)  
  
Get example csv's here:  
[Employees CSV](https://raw.githubusercontent.com/robgraeber/employee-analyzer/master/test/employees_small.csv)  
[Salaries CSV](https://raw.githubusercontent.com/robgraeber/employee-analyzer/master/test/salaries_small.csv)

# Running the Application
1. Clone the repo
2. npm/bower install
3. node app.js

![](https://cloud.githubusercontent.com/assets/2387719/5312125/a9f4f4c0-7c21-11e4-8653-a720ad25a639.png)


Demo: http://employee-analyzer.herokuapp.com/

# Exposed Endpoints

#####POST: /api/employee-groups 
Create new employee-group resource with request body:  
`{
    employees: file1.csv,
    salaries: file2.csv
}`

#####GET: /api/employee-groups/:id/employees   
List of all employees in employee-group

#####GET: /api/employee-groups/:id/employees/:employee-id/salaries
List of all past salaries for an employee
