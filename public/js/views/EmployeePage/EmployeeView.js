var EmployeeView = Backbone.View.extend({
  className: 'EmployeeView',
  tagName: 'tr',
  template: _.template($('#EmployeeView').html()),
  render:function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this.$el;
  }
});
