var SalaryView = Backbone.View.extend({
  className: 'SalaryView',
  tagName: 'tr',
  template: _.template($('#SalaryView').html()),
  render:function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el;
  }
});
