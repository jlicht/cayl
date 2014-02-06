function cayl_replace_args(s, args) {
  for (var key in args) {
    s = s.replace(new RegExp(key,"g"), args[key]);
  }                                        
  return s;
}

function cayl_show_interstitial(e) {                    
  var interstitial_html = 
  '<div class="cayl-interstitial"><a href="#" class="cayl-close"></a><div class="cayl-body"><div class="cayl-message"><span>The link you clicked may not be available for viewing.</span><br/>We did find a cached version of this page.</div>' +
  '<div class="cayl-cached"><div>The live link may not lead to the page you are looking for and may have been replaced or routed to another server.<div>Our cached link is from<br/>  ' +
  '{{DATE}}</div></div><a href="{{CACHE}}">View the cached link</a></div><div class="cayl-live"><div><iframe src="{{LINK}}"/></div><a href="{{LINK}}">View the live link</a></div>' +
  '<div class="cayl-credit">Balatarin uses <a href="#">CAYL</a></div></div></div>';
                                                 
  /* Add the window to the DOM */                                                                     
  jQuery("body").append('<div class="cayl-overlay"></div>');
  
  /* Substitute dynamic text */ 
  var replacements = {
    '{{DATE}}' : jQuery(this).attr("data-ircache-cache-date"),
    '{{LINK}}' : jQuery(this).attr("href"),
    '{{CACHE}}' : jQuery(this).attr("data-ircache-location"),
  }                                                

  jQuery("body").append(cayl_replace_args(interstitial_html,replacements));    

  /* Center the window */
  var left = jQuery(window).width()/2 - jQuery(".cayl-interstitial").width()/2;
  var top =  jQuery(window).height()/2 - jQuery(".cayl-interstitial").height()/2;
  jQuery(".cayl-interstitial").css({"left" : left, "top": top});
  
  /* Clicking on the overlay or close button closes the window */
  jQuery(".cayl-overlay, .cayl-close").click(function(e) { jQuery(".cayl-overlay, .cayl-interstitial").remove(); });
  
  return false;
}

function cayl_show_hover(arg1) {
  console.log(arg1);
}
                                            
function cayl_start_hover(e) {               
  var hover_html_up = '<div class="cayl-hover cayl-up"><div class="cayl-text">This site should be available</div><a href="{{LINK}}">View the Live Link</a><a href="{{CACHE}}">View the Cached Link</a></div>';
  var hover_html_down = '<div class="cayl-hover cayl-down"><div class="cayl-text">This site may not be available</div><a href="{{LINK}}" class="cayl-live">View the Live Link</a><a href="{{CACHE}}" class="cayl-cache">View the Cached Link</a><div class="cayl-credit">Balatarin uses <a href="#">CAYL</a></div></div>';
                                                         
  var status = jQuery(this).attr("data-ircache-status");
  var delay = jQuery(this).attr("data-ircache-hover-delay");
  var args = {
    '{{CACHE}}' : jQuery(this).attr("data-ircache-location"),
    '{{LINK}}' : jQuery(this).attr("href"),
  }                       
  t = this;
  if (delay) {
    var timer = setTimeout(function() {                  
      jQuery("body").append(cayl_replace_args(status == "up" ? hover_html_up : hover_html_down, args));

      /* Position the hover text */
      var offset = jQuery(t).offset();
      jQuery(".cayl-hover").css({"left" : offset.left, "top" : offset.top - 30});
    }, delay);
    jQuery(this).attr("cayl-timer",timer);    
  }
}

function cayl_end_hover(e) {
  clearTimeout(jQuery(this).attr("cayl-timer"));    
  jQuery(".cayl-hover").remove();
}



jQuery(document).ready(function($) {    
    $("a[data-ircache-location][data-ircache-behavior=override]").click(cayl_show_interstitial);    
    $("a[data-ircache-location][data-ircache-behavior=hover]").hover(cayl_start_hover, cayl_end_hover);    
  }); 