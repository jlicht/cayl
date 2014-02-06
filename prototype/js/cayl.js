var cayl = {

  hovering_on_popup : false,
  translations : {
    en : {
      interstitial_html : 
      '<div class="cayl-interstitial"><a href="#" class="cayl-close"></a><div class="cayl-body"><div class="cayl-message"><span>The link you clicked may not be available for viewing.</span><br/>We did find a cached version of this page.</div>' +
      '<div class="cayl-cached"><div>The live link may not lead to the page you are looking for and may have been replaced or routed to another server.<div>Our cached link is from<br/>  ' +
      '{{DATE}}</div></div><a href="{{CACHE}}">View the cached link</a></div><div class="cayl-live"><div><iframe src="{{LINK}}"/></div><a href="{{LINK}}">View the live link</a></div>' +
      '<div class="cayl-credit">Balatarin uses <a href="#">CAYL</a></div></div></div>',
      hover_html_up : '<div class="cayl-hover cayl-up"><div class="cayl-text">This site should be available</div><a href="{{LINK}}">View the Live Link</a><a href="{{CACHE}}">View the Cached Link</a><div class="cayl-arrow"></div></div>',
      hover_html_down : '<div class="cayl-hover cayl-down"><div class="cayl-text">This site may not be available</div><a href="{{LINK}}" class="cayl-live">View the Live Link</a><a href="{{CACHE}}" class="cayl-cache">View the Cached Link</a><div class="cayl-credit">Balatarin uses <a href="#">CAYL</a></div><div class="cayl-arrow"></div></div>',      
    },
    fa : {
        interstitial_html : 
        '<div class="cayl-interstitial"><a href="#" class="cayl-close"></a><div class="cayl-body"><div class="cayl-message"><span>لینکی که کلیک کردید ممکن است در دسترس برای مشاهده شود.</span><br/>ما پیدا کردن یک نسخه ذخیره سازی این صفحه.</div>' +
        '<div class="cayl-cached"><div>پیوند زندگی می کنند ممکن است به صفحه شما به دنبال نمی شود و ممکن است جایگزین شده است و یا روت به سرور دیگری.<div>اتصال به مخزن ما این است که از<br/>  ' +
        '{{DATE}}</div></div><a href="{{CACHE}}">نمایش لینک های cache شده</a></div><div class="cayl-live"><div><iframe src="{{LINK}}"/></div><a href="{{LINK}}">نمایش لینک های فعال</a></div>' +
        '<div class="cayl-credit">بالاترین از <a href="#"> CAYL </ A></div></div></div>',
        hover_html_up : '<div class="cayl-hover cayl-up"><div class="cayl-text">This site should be available</div><a href="{{LINK}}">View the Live Link</a><a href="{{CACHE}}">View the Cached Link</a><div class="cayl-arrow"></div></div>',
        hover_html_down : '<div class="cayl-hover cayl-down"><div class="cayl-text">This site may not be available</div><a href="{{LINK}}" class="cayl-live">View the Live Link</a><a href="{{CACHE}}" class="cayl-cache">View the Cached Link</a><div class="cayl-credit">Balatarin uses <a href="#">CAYL</a></div><div class="cayl-arrow"></div></div>',      
      },      
    },
  
  text : {},
                     
  replace_args : function (s, args) {
    for (var key in args) {
      s = s.replace(new RegExp(key,"g"), args[key]);
    }                                        
    return s;
  },

  show_interstitial : function (e) {                    
                                                 
    /* Add the window to the DOM */                                                                     
    jQuery("body").append('<div class="cayl-overlay"></div>');
  
    /* Substitute dynamic text */ 
    var replacements = {
      '{{DATE}}' : jQuery(this).attr("data-ircache-cache-date"),
      '{{LINK}}' : jQuery(this).attr("href"),
      '{{CACHE}}' : jQuery(this).attr("data-ircache-location"),
    }                                                

    jQuery("body").append(cayl.replace_args(cayl.text.interstitial_html,replacements));    

    /* Center the window */
    var left = jQuery(window).width()/2 - jQuery(".cayl-interstitial").width()/2;
    var top =  jQuery(window).height()/2 - jQuery(".cayl-interstitial").height()/2;
    jQuery(".cayl-interstitial").css({"left" : left, "top": top});
  
    /* Clicking on the overlay or close button closes the window */
    jQuery(".cayl-overlay, .cayl-close").click(function(e) { jQuery(".cayl-overlay, .cayl-interstitial").remove(); });
  
    return false;
  },

                                                    
  start_popup_hover : function (e) {
    cayl.hovering_on_popup = true;
  }, 

  end_popup_hover : function (e) {
    cayl.hovering_on_popup = false;   
    jQuery(".cayl-hover").remove();
  },                        
                                            
  calculate_hover_position : function (target) {
    var status = jQuery(target).attr("data-ircache-status");
    var offset = jQuery(target).offset();
    if (status == "up") {
      return {"left" : offset.left - 30, "top" : offset.top - 35}
    } else {
      return {"left" : offset.left - 15, "top" : offset.top - 115}
    }
  },

  start_link_hover : function (e) {               
                                                        
    var status = jQuery(this).attr("data-ircache-status");
    var delay = jQuery(this).attr("data-ircache-hover-delay");
    var args = {
      '{{CACHE}}' : jQuery(this).attr("data-ircache-location"),
      '{{LINK}}' : jQuery(this).attr("href"),
    }                       
    t = this;
    if (delay) {
      var timer = setTimeout(function() {                  
        jQuery("body").append(cayl.replace_args(status == "up" ? cayl.text.hover_html_up : cayl.text.hover_html_down, args));

        /* Position the hover text */
        var offset = jQuery(t).offset();
        jQuery(".cayl-hover").css(cayl.calculate_hover_position(t));    
        jQuery(".cayl-hover").hover(cayl.start_popup_hover, cayl.end_popup_hover);
      }, delay);
      jQuery(this).attr("cayl-timer",timer);    
    }
  },

  end_link_hover : function (e) {
    clearTimeout(jQuery(this).attr("cayl-timer"));         

    /* Give them some time, and then check if they've moved over the popup before closing popup */
    setTimeout(function() {
      if (!cayl.hovering_on_popup) {
        jQuery(".cayl-hover").remove();
      }    
    },100);
  },      
};
          
cayl.text = cayl.translations.en;

jQuery(document).ready(function($) {    
    $("a[data-ircache-location][data-ircache-behavior=override]").click(cayl.show_interstitial);    
    $("a[data-ircache-location][data-ircache-behavior=hover]").hover(cayl.start_link_hover, cayl.end_link_hover);    
  }); 