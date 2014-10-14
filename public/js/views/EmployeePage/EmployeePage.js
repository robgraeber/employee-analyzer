var EmployeePage = Backbone.View.extend({
  className: 'EmployeePage',
  template: _.template($('#EmployeePage').html()),
  initialize: function(){
    this.model.set('loading', true);
    
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
        this.model.set('loading', false);
        this.render();
      }.bind(this)
    });
  },
  render:function(){
    this.$el.html(this.template());

    this.$el.find('#table-container').html(this.employeeCollectionView.render());
    
    if(this.model.get('loading')){
      this.$el.find('.status-text').text('Loading...');
    }else{
      if(this.employeeCollectionView.collection.length > 0){
        this.$el.find('.status-text').text('');
      }else{
        this.$el.find('.status-text').text('No Employees Found!');
      }
    }
    
    return this.$el;
  }
});
