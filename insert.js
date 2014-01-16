var message = "Cached";      
var link = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
                                 
$(function(){   
  $("a").click(function() {
    $(this).after("<span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
  })          
});

