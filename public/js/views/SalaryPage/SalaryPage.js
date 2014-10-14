var SalaryPage = Backbone.View.extend({
  className: 'SalaryPage',
  template: _.template($('#SalaryPage').html()),
  initialize: function(){
    this.model.set('loading', true);

    var SalaryCollection = Backbone.Collection.extend({
      parse: function(res){
        return res.results.data;
      }
    });

    var employeeModel = this.model.clone();
    var salaryCollection = new SalaryCollection();
    salaryCollection.url = '/api/employee-groups/'+this.model.get('employeeGroupId')+'/employees/'+this.model.get('employeeId')+'/salaries';

    this.salaryCollectionView = new SalaryCollectionView({
      collection:salaryCollection
    });

    this.salaryChartView = new SalaryChartView({
      collection:salaryCollection,
      model: employeeModel
    });

    salaryCollection.fetch({
      success: function(collection, res, options){
        this.model.set('loading', false);
        employeeModel.set(res.results.parent);
        this.render();
      }.bind(this)
    });
  },
  render:function(){
    this.$el.html(this.template());

    this.$el.find('#chart-container').html(this.salaryChartView.render());
    this.$el.find('#table-container').html(this.salaryCollectionView.render());
    
    if(this.model.get('loading')){
      this.$el.find('.status-text').text('Loading...');
    }else{
      if(this.salaryCollectionView.collection.length > 0){
        this.$el.find('.status-text').text('');
      }else{
        this.$el.find('.status-text').text('Employee Not Found!');
      }
    }
    return this.$el;
  }
});
