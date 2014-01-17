var message = "Cached";      
var link = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
                                 
$(function(){   
  $("a").on('mousedown', function(e){
     $(this).contextMenu();
  });
  
  $.contextMenu({
    selector: "a",            
    callback: function(key, options) {
      window.location = link;  
    },
    items: { "cache" : {name: "Cached"}   }
  });          
});

