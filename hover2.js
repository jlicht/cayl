var message = "Cached";      
var link = "http://www.youtube.com/watch?v=oHg5SJYRHA0";

$(function() {
  $("a").each(function(i,e) {
    $(this).after("<span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
  })                                  
  $("a").hoverIntent({ over: function() { $(this).next("span.cayl").addClass("on"); }, 
                       out: function() { $(this).next("span.cayl").removeClass("on"); },
                       interval: 500}  )
});