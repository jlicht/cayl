var message = "Cached";      
var link = "http://www.youtube.com/watch?v=oHg5SJYRHA0";               

if (window.location.search) {
  var q = window.location.search.substring(1);
  switch (q) {
    case "hover" :
      jQuery( document ).ready(function( $ ) {
        $("a[href^=http]").not("[href*=" + caylExclude + "]").each(function(i,e) {
          $(this).after("<span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
        })
      });
      break;        
                
    case "hover2":
      jQuery( document ).ready(function( $ ) {
        $("a[href^=http]").not("[href*=" + caylExclude + "]").each(function(i,e) {
          $(this).after("<span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
        })                                  
        $("a[href^=http]").not("[href*=" + caylExclude + "]").hoverIntent({ over: function() { $(this).next("span.cayl").addClass("on"); }, 
                             out: function() { $(this).next("span.cayl").removeClass("on"); },
                             interval: 500}  )
      });  
      break;

    case "insert":
      jQuery( document ).ready(function( $ ) {   
        $("a[href^=http]").not("[href*=" + caylExclude + "]").click(function() {
          $(this).after("<span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
        })          
      });
      break;
      
    case "menu":
      jQuery( document ).ready(function( $ ) {   
        $.contextMenu({
          selector: "a",            
          callback: function(key, options) {
            window.location = link;     
          },
          items: { "cache" : {name: "Cached"}   }
        });          
      });
      break;
      
      case "state":
        function banner(event) {  
          if (event.originalEvent.state.link && event.originalEvent.state.target) {
            jQuery("body").append("<div class='cayl-banner'>Problems viewing " + 
                  event.originalEvent.state.target + "? <a href='" + event.originalEvent.state.link + 
                  "'>Cached version here</a>");
            window.setTimeout(function() { jQuery(".cayl-banner").fadeOut(2000);}, 5000);
          }
        }                           

        jQuery( document ).ready(function( $ ) {                  
          $("a[href^=http]").not("[href*=" + caylExclude + "]").click(function() {
            history.pushState({link: link, target: $(this).attr("href")},"");    
            history.pushState({},"","#cayl");    
          });                                
          $(window).on("load",function() { if (window.location.hash == "#cayl") window.history.back(); });
          $(window).on("popstate", banner);          
        });
        break;
        
      case "widget":
        jQuery( document ).ready(function( $ ) {
          $("a[href^=http]").not("[href*=" + caylExclude + "]").each(function(i,e) {
            $(this).after("<span class='cayl-widget'><span class='cayl'><a href='" + link + "'>" + message + "</a></span>");
          })             
          $("span.cayl-widget").click(function(e) {$(this).children().toggleClass("on"); e.stopPropagation(); });
          $("body").click(function(e) {$("span.cayl").removeClass("on");});
        });
        break;
  } 
    
}
