var message = "Cached";      
var link = "http://www.youtube.com/watch?v=oHg5SJYRHA0";

$(function() {
  $("a").each(function(i,e) {
    $(this).after("<span class='cayl-widget'><span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
  })             
  $("span.cayl-widget").click(function(e) {$(this).children().toggleClass("on"); e.stopPropagation(); });
  $("body").click(function(e) {$("span.cayl").removeClass("on");});
});