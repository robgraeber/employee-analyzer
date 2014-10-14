var SalaryCollectionView = Backbone.View.extend({
  className: 'SalaryCollectionView',
  template: _.template($('#SalaryCollectionView').html()),
  render:function(){
    this.$el.html(this.template());

    var $salaryTable = this.$el.find('#salary-table tbody');
    $salaryTable.children().detach();
    
    $salaryTable.append(
      this.collection.map(function(salaryModel){
        return new SalaryView({model: salaryModel}).render();
      })
    );
    return this.$el;
  }
});
