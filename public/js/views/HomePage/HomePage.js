var HomePage = Backbone.View.extend({
  className: "HomePage",
  template: _.template($("#HomePage").html()),
  initialize: function(){

  },
  render:function(){
    var $el = this.$el;
    $el.html(this.template());
    $el.find('#csv-form').ajaxForm({
      beforeSend: function() {
        $el.find("#status-text").text('0%');
      },
      uploadProgress: function(event, position, total, percentComplete) {
        $el.find("#status-text").text(percentComplete + '%');
      },
      success: function() {
        $el.find("#status-text").text('100%');
      },
      complete: function(xhr) {
        console.log("res:", xhr.responseJSON);
        var results = xhr.responseJSON.results;
        page('/employee-groups/'+ results.resourceId+'/employees');
      }
    }); 
    return this.$el;
  }
});
