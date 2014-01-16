var message = "Cached";      
var link = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
                           
function banner(event) {     
  if (event.originalEvent.state.link && event.originalEvent.state.target) {
    $("body").append("<div class='cayl-banner'>Problems viewing " + event.originalEvent.state.target + "? <a href='" + event.originalEvent.state.link + 
          "'>Cached version here</a>");
    window.setTimeout(function() { $(".cayl-banner").fadeOut(2000);}, 5000);
  }
}                           
                                 
$(function(){                  
  $("a").click(function() {
    history.pushState({link: link, target: $(this).attr("href")},"");    
    history.pushState({},"","#cayl");    
  });                                
  $(window).on("load",function() { if (window.location.hash == "#cayl") window.history.back(); });
  $(window).on("popstate", banner);          
});
