/*!
  * Simple-Jekyll-Search v1.6.0 (https://github.com/christian-fei/Simple-Jekyll-Search)
  * Copyright 2015-2017, Christian Fei
  * Licensed under the MIT License.
  */
!function(){"use strict";function e(e){return Boolean(e)&&"[object Object]"===Object.prototype.toString.call(e)}function t(e){return a.push(e),a}var n={load:function(e,t){var n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");n.open("GET",e,!0),n.onreadystatechange=function(e,t){return function(){if(4===e.readyState&&200===e.status)try{t(null,JSON.parse(e.responseText))}catch(n){t(n,null)}}}(n,t),n.send()}},r=function(e,t){var n=t.length,r=e.length;if(r>n)return!1;if(r===n)return e===t;e:for(var i=0,o=0;i<r;i++){for(var u=e.charCodeAt(i);o<n;)if(t.charCodeAt(o++)===u)continue e;return!1}return!0},i=new function(){this.matches=function(e,t){return r(t,e)}},o=new function(){this.matches=function(e,t){return"string"==typeof e&&(e=e.trim()).toLowerCase().indexOf(t.toLowerCase())>=0}},u={put:function(n){return e(n)?t(n):function(e){return Boolean(e)&&"[object Array]"===Object.prototype.toString.call(e)}(n)?function(n){for(var r=[],i=0,o=n.length;i<o;i++)e(n[i])&&r.push(t(n[i]));return r}(n):undefined},clear:function(){return a.length=0,a},search:function(e){return e?function(e,t,n,r){for(var i=[],o=0;o<e.length&&i.length<r.limit;o++){var u=function(e,t,n,r){for(var i in e)if(!function(e,t){for(var n=!1,r=0,i=(t=t||[]).length;r<i;r++){var o=t[r];!n&&new RegExp(e).test(o)&&(n=!0)}return n}(e[i],r.exclude)&&n.matches(e[i],t))return e}(e[o],t,n,r);u&&i.push(u)}return i}(a,e,l.searchStrategy,l):[]},setOptions:function(e){(l=e||{}).fuzzy=e.fuzzy||!1,l.limit=e.limit||10,l.searchStrategy=e.fuzzy?i:o}},a=[],l={};l.fuzzy=!1,l.limit=10,l.searchStrategy=l.fuzzy?i:o;var c={compile:function(e){return f.template.replace(f.pattern,function(t,n){var r=f.middleware(n,e[n],f.template);return void 0!==r?r:e[n]||t})},setOptions:function(e){f.pattern=e.pattern||f.pattern,f.template=e.template||f.template,"function"==typeof e.middleware&&(f.middleware=e.middleware)}},f={};f.pattern=/\{(.*?)\}/g,f.template="",f.middleware=function(){};var s={merge:function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r],"undefined"!=typeof t[r]&&(n[r]=t[r]));return n},isJSON:function(e){try{return!!(e instanceof Object&&JSON.parse(JSON.stringify(e)))}catch(t){return!1}}};!function(e){function t(e){u.put(e),a.searchInput.addEventListener("keyup",function(e){(function(e){return-1===[13,16,20,37,38,39,40,91].indexOf(e)})(e.which)&&(a.resultsContainer.innerHTML="",i(e.target.value))})}function r(e){a.resultsContainer.innerHTML+=e}function i(e){(function(e){return e&&e.length>0})(e)&&function(e){var t=e.length;if(0===t)return r(a.noResultsText);for(var n=0;n<t;n++)r(c.compile(e[n]))}(u.search(e))}function o(e){throw new Error("SimpleJekyllSearch --- "+e)}var a={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},l=["searchInput","resultsContainer","json"],f=function p(e){if(!function(e){return!!e&&"undefined"!=typeof e.required&&e.required instanceof Array}(e))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof p))return new p(e);var t=e.required;this.getRequiredOptions=function(){return t},this.validate=function(e){var n=[];return t.forEach(function(t){"undefined"==typeof e[t]&&n.push(t)}),n}}({required:l});e.SimpleJekyllSearch=function(e){return f.validate(e).length>0&&o("You must specify the following required options: "+l),a=s.merge(a,e),c.setOptions({template:a.searchResultTemplate,middleware:a.templateMiddleware}),u.setOptions({fuzzy:a.fuzzy,limit:a.limit}),s.isJSON(a.json)?t(a.json):function(e){n.load(e,function(n,r){n&&o("failed to get JSON ("+e+")"),t(r)})}(a.json),{search:i}},e.SimpleJekyllSearch.init=e.SimpleJekyllSearch,"function"==typeof e.SimpleJekyllSearchInit&&e.SimpleJekyllSearchInit.call(this,e.SimpleJekyllSearch)}(window)}();
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
  
  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;
  
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/* ========================================================================
 * Bootstrap: transition.js v3.4.0
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function($) {
  "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement("bootstrap");

    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false; // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var $el = this;
    $(this).one("bsTransitionEnd", function() {
      called = true;
    });
    var callback = function() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function() {
    $.support.transition = transitionEnd();

    if (!$.support.transition) return;

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function(e) {
        if ($(e.target).is(this))
          return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
})(jQuery);
/**
 * zoom.js - It's the best way to zoom an image
 * @version v0.0.2
 * @link https://github.com/fat/zoom.js
 * @license MIT
 */

+function(t){"use strict";function o(){this._activeZoom=this._initialScrollPosition=this._initialTouchPosition=this._touchMoveListener=null,this._$document=t(document),this._$window=t(window),this._$body=t(document.body),this._boundClick=t.proxy(this._clickHandler,this)}function i(o){this._fullHeight=this._fullWidth=this._overlay=this._targetImageWrap=null,this._targetImage=o,this._$body=t(document.body)}o.prototype.listen=function(){this._$body.on("click",'[data-action="zoom"]',t.proxy(this._zoom,this))},o.prototype._zoom=function(o){var e=o.target;if(e&&"IMG"==e.tagName&&!this._$body.hasClass("zoom-overlay-open"))return o.metaKey||o.ctrlKey?window.open(o.target.getAttribute("data-original")||o.target.src,"_blank"):void(e.width>=t(window).width()-i.OFFSET||(this._activeZoomClose(!0),this._activeZoom=new i(e),this._activeZoom.zoomImage(),this._$window.on("scroll.zoom",t.proxy(this._scrollHandler,this)),this._$document.on("keyup.zoom",t.proxy(this._keyHandler,this)),this._$document.on("touchstart.zoom",t.proxy(this._touchStart,this)),document.addEventListener?document.addEventListener("click",this._boundClick,!0):document.attachEvent("onclick",this._boundClick,!0),"bubbles"in o?o.bubbles&&o.stopPropagation():o.cancelBubble=!0))},o.prototype._activeZoomClose=function(t){this._activeZoom&&(t?this._activeZoom.dispose():this._activeZoom.close(),this._$window.off(".zoom"),this._$document.off(".zoom"),document.removeEventListener("click",this._boundClick,!0),this._activeZoom=null)},o.prototype._scrollHandler=function(o){null===this._initialScrollPosition&&(this._initialScrollPosition=t(window).scrollTop());var i=this._initialScrollPosition-t(window).scrollTop();Math.abs(i)>=40&&this._activeZoomClose()},o.prototype._keyHandler=function(t){27==t.keyCode&&this._activeZoomClose()},o.prototype._clickHandler=function(t){t.preventDefault?t.preventDefault():event.returnValue=!1,"bubbles"in t?t.bubbles&&t.stopPropagation():t.cancelBubble=!0,this._activeZoomClose()},o.prototype._touchStart=function(o){this._initialTouchPosition=o.touches[0].pageY,t(o.target).on("touchmove.zoom",t.proxy(this._touchMove,this))},o.prototype._touchMove=function(o){Math.abs(o.touches[0].pageY-this._initialTouchPosition)>10&&(this._activeZoomClose(),t(o.target).off("touchmove.zoom"))},i.OFFSET=80,i._MAX_WIDTH=2560,i._MAX_HEIGHT=4096,i.prototype.zoomImage=function(){var o=document.createElement("img");o.onload=t.proxy(function(){this._fullHeight=Number(o.height),this._fullWidth=Number(o.width),this._zoomOriginal()},this),o.src=this._targetImage.src},i.prototype._zoomOriginal=function(){this._targetImageWrap=document.createElement("div"),this._targetImageWrap.className="zoom-img-wrap",this._targetImage.parentNode.insertBefore(this._targetImageWrap,this._targetImage),this._targetImageWrap.appendChild(this._targetImage),t(this._targetImage).addClass("zoom-img").attr("data-action","zoom-out"),this._overlay=document.createElement("div"),this._overlay.className="zoom-overlay",document.body.appendChild(this._overlay),this._calculateZoom(),this._triggerAnimation()},i.prototype._calculateZoom=function(){this._targetImage.offsetWidth;var o=this._fullWidth,e=this._fullHeight,a=(t(window).scrollTop(),o/this._targetImage.width),s=t(window).height()-i.OFFSET,r=t(window).width()-i.OFFSET,n=o/e,h=r/s;this._imgScaleFactor=r>o&&s>e?a:h>n?s/e*a:r/o*a},i.prototype._triggerAnimation=function(){this._targetImage.offsetWidth;var o=t(this._targetImage).offset(),i=t(window).scrollTop(),e=i+t(window).height()/2,a=t(window).width()/2,s=o.top+this._targetImage.height/2,r=o.left+this._targetImage.width/2;this._translateY=e-s,this._translateX=a-r;var n="scale("+this._imgScaleFactor+")",h="translate("+this._translateX+"px, "+this._translateY+"px)";t.support.transition&&(h+=" translateZ(0)"),t(this._targetImage).css({"-webkit-transform":n,"-ms-transform":n,transform:n}),t(this._targetImageWrap).css({"-webkit-transform":h,"-ms-transform":h,transform:h}),this._$body.addClass("zoom-overlay-open")},i.prototype.close=function(){return this._$body.removeClass("zoom-overlay-open").addClass("zoom-overlay-transitioning"),t(this._targetImage).css({"-webkit-transform":"","-ms-transform":"",transform:""}),t(this._targetImageWrap).css({"-webkit-transform":"","-ms-transform":"",transform:""}),t.support.transition?void t(this._targetImage).one(t.support.transition.end,t.proxy(this.dispose,this)).emulateTransitionEnd(300):this.dispose()},i.prototype.dispose=function(){this._targetImageWrap&&this._targetImageWrap.parentNode&&(t(this._targetImage).removeClass("zoom-img").attr("data-action","zoom"),this._targetImageWrap.parentNode.replaceChild(this._targetImage,this._targetImageWrap),this._overlay.parentNode.removeChild(this._overlay),this._$body.removeClass("zoom-overlay-transitioning"))},t(function(){(new o).listen()})}(jQuery);
$(document).ready(function() {
  'use strict';

  var html = $('html'),
    menuOpenIcon = $(".nav__icon-menu"),
    menuCloseIcon = $(".nav__icon-close"),
    menuList = $(".main-nav"),
    searchOpenIcon = $(".nav__icon-search"),
    searchCloseIcon = $(".search__close"),
    searchBox = $(".search"),
    toggleTheme = $(".toggle-theme"),
    searchInput = $(".search__text");


  /* ==================================
  // Menu + Search + Theme Switcher
  ================================== */
  menuOpenIcon.click(function() {
    menuOpen();
  })

  menuCloseIcon.click(function () {
    menuClose();
  })

  searchOpenIcon.click(function () {
    searchOpen();
  });

  searchCloseIcon.click(function () {
    searchClose();
  });

  toggleTheme.click(function () {
    darkMode()
  });

  function menuOpen() {
    menuList.addClass("is-open");
  }

  function menuClose() {
    menuList.removeClass("is-open");
  }

  function searchOpen() {
    searchBox.addClass("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 150);
  }

  function searchClose() {
    searchBox.removeClass("is-visible");
  }

  $('.search, .search__box').on('click keyup', function(event) {
    if (event.target == this || event.keyCode == 27) {
      $('.search').removeClass('is-visible');
    }
  });

  function darkMode() {
    if (html.hasClass('dark-mode')) {
      html.removeClass('dark-mode');
      localStorage.removeItem("theme")
      document.documentElement.removeAttribute("dark");
    } else {
      html.addClass('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  }


  /* ========================
  // Simple Jekyll Search
  ======================== */
  SimpleJekyllSearch({
    searchInput: document.getElementById("js-search-input"),
    resultsContainer: document.getElementById("js-results-container"),
    json: "/search.json",
    searchResultTemplate: '{article}',
    noResultsText: '<h3 class="no-results">No results found</h3>'
  });


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post__content, .page__content").fitVids({
    customSelector: ['iframe[src*="ted.com"]', 'iframe[src*="facebook.com"]']
  });


  /* =======================
  // Zoom Image
  ======================= */
  $(".page img, .post img").attr("data-action", "zoom");
  $(".page a img, .post a img").removeAttr("data-action", "zoom");


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function() {
    $("html, body").stop().animate({ scrollTop: 0 }, "slow", "swing");
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > $(window).height()) {
      $(".top").addClass("is-active");
    } else {
      $(".top").removeClass("is-active");
    }
  });

});