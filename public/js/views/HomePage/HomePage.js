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
      error: function(xhr){
        $el.find("#status-text").text('Upload Failed!');
        console.log("res:", xhr.responseJSON);
      },
      success: function(responseText, statusText, xhr) {
        $el.find("#status-text").text('100%');
        console.log("res:", xhr.responseJSON);
        var results = xhr.responseJSON.results;
        page('/employee-groups/'+ results.resourceId+'/employees');
      },
    }); 
    return this.$el;
  }
});
