var EmployeeCollectionView = Backbone.View.extend({
  className: 'EmployeeCollectionView',
  template: _.template($('#EmployeeCollectionView').html()),
  render:function(){
    this.$el.html(this.template());

    var $employeeTable = this.$el.find('#employee-table tbody');
    $employeeTable.children().detach();
    
    $employeeTable.append(
      this.collection.map(function(employeeModel){
        return new EmployeeView({model: employeeModel}).render();
      })
    );
    return this.$el;
  }
});
