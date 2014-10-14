page('/', function(){
  var homePage = new HomePage();
  $('#ui-view').html( homePage.render() );
});

page('/employee-groups/:id/employees', function(ctx, next){
  var model = new Backbone.Model({
    employeeGroupId: ctx.params.id
  });
  var employeePage = new EmployeePage({model: model});
  $('#ui-view').html( employeePage.render() );
});

page('/employee-groups/:id/employees/:employeeId/salaries', function(ctx, next){
  var model = new Backbone.Model({
    employeeGroupId: ctx.params.id,
    employeeId: ctx.params.employeeId
  });
  var salaryPage = new SalaryPage({model: model});
  $('#ui-view').html( salaryPage.render() );
});

$(function(){
  page();
});