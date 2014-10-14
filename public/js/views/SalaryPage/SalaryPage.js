var SalaryPage = Backbone.View.extend({
  className: 'SalaryPage',
  template: _.template($('#SalaryPage').html()),
  initialize: function(){
    var SalaryCollection = Backbone.Collection.extend({
      parse: function(res){
        return res.results.data;
      }
    });

    var salaryCollection = new SalaryCollection();
    salaryCollection.url = '/api/employee-groups/'+this.model.get('employeeGroupId')+'/employees/'+this.model.get('employeeId')+'/salaries';

    this.salaryCollectionView = new SalaryCollectionView({
      collection:salaryCollection
    });

    salaryCollection.fetch({
      success: function(collection, response, options){
        this.salaryCollectionView.render();
      }.bind(this)
    });
  },
  render:function(){
    this.$el.html(this.template());

    this.$el.find('#table-container').html(this.salaryCollectionView.render());
    
    return this.$el;
  }
});
