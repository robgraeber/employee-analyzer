var EmployeePage = Backbone.View.extend({
  className: 'EmployeePage',
  template: _.template($('#EmployeePage').html()),
  initialize: function(){
    var EmployeeCollection = Backbone.Collection.extend({
      parse: function(res){
        return res.results.data;
      }
    });

    var employeeCollection = new EmployeeCollection();
    employeeCollection.url = '/api/employee-groups/'+this.model.get('employeeGroupId')+'/employees';

    this.employeeCollectionView = new EmployeeCollectionView({
      collection:employeeCollection
    });

    employeeCollection.fetch({
      success: function(collection, response, options){
        this.employeeCollectionView.render();
      }.bind(this)
    });
  },
  render:function(){
    this.$el.html(this.template());

    this.$el.find('#table-container').html(this.employeeCollectionView.render());
    
    return this.$el;
  }
});
