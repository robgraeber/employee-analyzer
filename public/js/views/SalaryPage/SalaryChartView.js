var SalaryChartView = Backbone.View.extend({
  className: 'SalaryChartView',
  template: _.template($('#SalaryChartView').html()),
  render:function(){
    this.$el.html(this.template());

    var series = _.map(this.collection.toJSON(), function(model){
      return [new Date(model.startDate).getFullYear(), model.salary];
    });
    console.log(series);
    setTimeout(function(){
      this.$el.find('.chart').highcharts({
        chart: {
            renderTo: 'container',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 12,
                beta: 2,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: 'Salary Graph'
        },
        xAxis: {
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: {
                text: 'Salary'
            }
        },
        subtitle: {
            text: '(Total Compensation)'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        series: [{
            data: series
        }]
      });
    }.bind(this), 0);
    return this.$el;
  }
});
