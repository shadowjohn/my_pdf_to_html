// From : https://gist.github.com/joelambert/1002116

window.requestAnimFrame = (function() {     
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
window.requestInterval = function(fn, delay) {
	if( !window.requestAnimationFrame       && 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setInterval(fn, delay);
			
	var start = new Date().getTime(),
		handle = new Object();
		
	function loop() {
		var current = new Date().getTime(),
			delta = current - start;
			
		if(delta >= delay) {
			fn.call();
			start = new Date().getTime();
      //start = Date.now() - (delta % delay)
		}

		handle.value = requestAnimFrame(loop);
	};
	
	handle.value = requestAnimFrame(loop);
	return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestInterval = function(handle) {
    if(handle==null) return;
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearInterval(handle);
};



/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */

window.requestTimeout = function(fn, delay) {
	if( !window.requestAnimationFrame      	&& 
		!window.webkitRequestAnimationFrame && 
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame      && 
		!window.msRequestAnimationFrame)
			return window.setTimeout(fn, delay);
			
	var start = new Date().getTime(),
		handle = new Object();
		
	function loop(){
		var current = new Date().getTime(),
			delta = current - start;
			
		delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
	};
	
	handle.value = requestAnimFrame(loop);
	return handle;
};

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function(handle) {
    if(handle==null) return;
    window.cancelAnimationFrame != null ? window.cancelAnimationFrame(handle.value) :
    window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
    window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
    window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
    window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
    clearTimeout(handle);
};

/*
window.setInterval = window.requestInterval;
window.clearInterval = window.clearRequestInterval;

window.setTimeout = window.requestTimeout;
window.clearTimeout = window.clearRequestTimeout;
*/


//??????URL??????
function my_fix_random() {
    //var array = new Uint32Array(1);
    //var v = window.crypto.getRandomValues(array)[0];
    //return parseFloat((v / (Math.pow(10, v.toString().length))).toFixed(10));    
    var crypto =  window.crypto /*native*/ || window.msCrypto /*IE11 native*/ || window.msrCrypto; /*polyfill*/
    return parseFloat(((new Uint32Array(1))[0] / 4294967295).toString(36).substring(2, 15) + (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295));
}
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1;    
var is_moz = userAgent.indexOf('firefox') != -1;
var is_chrome = userAgent.indexOf('chrome') != -1;
var is_safari = userAgent.indexOf('safari') != -1;
//var is_ie = (userAgent.indexOf('msie') != -1 || userAgent.indexOf('rv:11') != -1) && !is_moz && !is_opera && !is_chrome && !is_safari;
//var is_ie = (((userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3)) || !!window.MSInputMethodContext && !!document.documentMode);
var is_ie = ( (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3)) || userAgent.indexOf("rv:11.0") > 0;
var isAndroid = userAgent.indexOf("android") > -1;
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
/*
  //iframe??????
  if (top.location != location) {
  	top.location.href = location.href;
  }

  function $(id) {
	 return document.getElementById(id);
  }
*/

/*
 * ???????????????value????????????????????????????????????????????????boolean??????????????????
 * ?????? setMemory("isDrag",true);
 * ???????????????true or false ??????????????? if(getMemory("isDrag")=='true'))
 * ?????????????????????????????? setMemory ????????????????????? 'true'
 */
function setMemory(wtfkey, value) {
	localStorage.setItem(wtfkey, value);
}
function getMemory(wtfkey) {
	return localStorage.getItem(wtfkey);
}
function removeMemory(wtfkey) {
	return localStorage.removeItem(wtfkey);
}
function setCopy(_sTxt){
	if(is_ie) {
		clipboardData.setData('Text',_sTxt);
		alert ("?????????"+_sTxt+"???\n?????????????????????????????????\n???????????????Ctrl+V?????????????????????????????????");
	} else {
		prompt("?????????????????????:",_sTxt); 
	}
}
function pasteToCursor(dom,text)
{
  //?????????????????????
  var TXTpos = dom[0].selectionStart;
  var TXTend = dom[0].selectionEnd;
  var orin_data = dom.val();
  dom.focus();
  dom.val(orin_data.substring(0,TXTpos)+text+orin_data.substring(TXTend));
  dom[0].selectionStart = TXTpos + text.length;
  dom[0].selectionEnd = TXTpos + text.length;
}
function fullToHalf($value)
{
  var $databases=' \
    { \
      "???":"+", \
      "???":"-", \
      "???":"*", \
      "???":"/", \
      "???":"0", \
      "???":"1", \
      "???":"2", \
      "???":"3", \
      "???":"4", \
      "???":"5", \
      "???":"6", \
      "???":"7", \
      "???":"8", \
      "???":"9" \
    } \
  ';
  var $m=json_decode($databases,true);
  for(var k in $m)
  {
    $value=$value.replace(k,$m[k]);
  }
  return $value;
}

String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};

function handleEnter (field, event) {
   // ??? enter ?????? submit onkeypress="return handleEnter(this, event);"         
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
		if (keyCode == 13) {
			var i;
			for (i = 0; i < field.form.elements.length; i++)
				if (field == field.form.elements[i])
					break;
			i = (i + 1) % field.form.elements.length;
			field.form.elements[i].focus();
			return false;
		} 
		else
		return true;
	}  
	
function replaceAll(strOrg,strFind,strReplace){
 var index = 0;
 while(strOrg.indexOf(strFind,index) != -1){
  strOrg = strOrg.replace(strFind,strReplace);
  index = strOrg.indexOf(strFind,index);
 }
 return strOrg
} 
function execInnerScript_googleapi(innerhtml)
{  
  var temp=innerhtml.replace(/\n|\r/g,"");
  var regex=/<script.+?<\/script>/gi;
  var arr=temp.match(regex);  
  if(arr)
  {   
    for(var iiiiiiiiii_iii=0;iiiiiiiiii_iii<arr.length;iiiiiiiiii_iii++)
    {      
      var temp1=arr[iiiiiiiiii_iii];      
      var reg=new RegExp("^<script(.+?)>(.+)<\/script>$","gi");
      reg.test(temp1);                  
      eval(RegExp.$2);          
    }
  }  
}
// ????????? AJAX: Getting Started - MDC
function makeRequest_googleapi(url,input,out_span) {
  var http_request = false;

  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    http_request = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      http_request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        http_request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  if (!http_request) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  // ??????????????????????????? alterContents()
  http_request.onreadystatechange = function() { 
                                    alertContents_googleapi(http_request,input,out_span); };
  //http_request.open('GET', url, true);

  
  
  http_request.open('POST', url, true);
  http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  http_request.send(input);
  //http_request.send(null);
  
}

  function alertContents_googleapi(http_request,input,out_span) {
    if (http_request.readyState == 4)
    {
      if (http_request.status == 200) {
        var mesg =http_request.responseText;

        //document.getElementById(out_span).innerHTML=mesg;
        out_span=replaceHtml(out_span,mesg);
        execInnerScript_googleapi(mesg);             
      } else {
        //alert('There was a problem with the request.');
      }

    }
    else
    {
      //document.getElementById(out_span).innerHTML="<center></center>";
    }
  }
  
  function execInnerScript(innerhtml)
  {
    var  temp=innerhtml.replace(/\n|\r/g,"");
    var  regex=/<script.+?<\/script>/gi;
    var  arr=temp.match(regex);
    if(arr)
    {
      for(var i=0,max_i=arr.length;i<max_i;i++)
      {
        var temp1=arr[i];
        var reg=new  RegExp("^<script(.+?)>(.+)<\/script>$","gi");
        reg.test(temp1);
        eval(RegExp.$2);
      }
    }
  }

  // ????????? AJAX: Getting Started - MDC
  function makeRequest(url,input,out_span) {
    var http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
      http_request = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
    }

    if (!http_request) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    // ??????????????????????????? alterContents()
    http_request.onreadystatechange = function() { 
                                      alertContents(http_request,input,out_span); };
    //http_request.open('GET', url, true);

    
    
    http_request.open('POST', url, true);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http_request.send(input);
    //http_request.send(null);
    
  }
  function alertContents(http_request,input,out_span) {
    if (http_request.readyState == 4)
    {
      if (http_request.status == 200) {
        var mesg =http_request.responseText;
        //document.getElementById(out_span).innerHTML=mesg;
        replaceHtml(out_span,mesg);
        execInnerScript(mesg);            
      } else {
        //alert('There was a problem with the request.');
      }

    }
    else
    {
      //document.getElementById(out_span).innerHTML="<center></center>";
      //out_span=replaceHtml(out_span,document.getElementById(out_span).innerHTML);
    }
  }  

  
  function getWindowSize(){
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      myWidth = document.documentElement.clientWidth;
      myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      //IE 4 compatible
      myWidth = document.body.clientWidth;
      myHeight = document.body.clientHeight;      
    }
    var a=new Object();
    a['width']=myWidth;
    a['height']=myHeight;
    return a;
  }

  function onKeyPressCode(e)
  {
    var wtfkey =  window.event ? e.keyCode : e.which;
    var keychar = wtfkey;
    return keychar;
  }
  
  
  function replaceHtml(el, html) {
  	var oldEl = typeof el === "string" ? document.getElementById(el) : el;
  	/*@cc_on // Pure innerHTML is slightly faster in IE
  		oldEl.innerHTML = html;
  		return oldEl;
  	@*/
  	var newEl = oldEl.cloneNode(false);
  	newEl.innerHTML = html;
  	oldEl.parentNode.replaceChild(newEl, oldEl);
  	/* Since we just removed the old element from the DOM, return a reference
  	to the new element, which can be used to restore variable references. */
  	return newEl;
  }

/*
	//???jQuery????????? cookie ??????
		http://www.stilbuero.de/2006/09/17/cookie-plugin-for-jquery/

	jQuery??????cookie?????????,???????????????????????????

	??????cookie??????
			$.cookie('the_cookie', ???the_value');
	????????????cookie ??????????????? ?????? ?????????
			$.cookie('the_cookie', ???the_value', {expires: 7, path: ???/', domain: ???jquery.com', secure: true});
	??????cookie
		  $.cookie('the_cookie', ???the_value');
	????????????cookie
		  $.cookie('the_cookie', null);

*/
function getSession_id() {
    return /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
}

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (wtfkey, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(wtfkey), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = wtfkey ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (wtfkey === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!wtfkey && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (wtfkey, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(wtfkey, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(wtfkey);
	};

}));
/**
 * From : https://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0 
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */
 
// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
      
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
		// setup all variables
                var xhr = new XMLHttpRequest(),
		url = options.url,
		type = options.type,
		async = options.async || true,
		// blob or arraybuffer. Default is blob
		dataType = options.responseType || "blob",
		data = options.data || null,
		username = options.username || null,
		password = options.password || null;
					
                xhr.addEventListener('load', function(){
			var data = {};
			data[options.dataType] = xhr.response;
			// make callback and send data
			callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });
 
                xhr.open(type, url, async, username, password);
				
		// setup custom headers
		for (var i in headers ) {
			xhr.setRequestHeader(i, headers[i] );
		}
				
                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});
function myAjaxBinary_async(url,postdata,func)
{
  var $method = "POST";
  if(postdata=="")
  {
    $method = "GET";
  }
  $.ajax({
    url: url,
    type: $method,
    data: postdata,
    async: true,
    dataType: "binary",
    processData: false,
    responseType:'arraybuffer',
    success: function(result){
  	  // do something with binary data
      func(result);
      //my_gc(result);
    }
  });
}
function myAjaxBinary(url,postdata)
{
  var $method = "POST";
  if(postdata=="")
  {
    $method = "GET";
  }
  return $.ajax({
      url: url,
      type: 'GET',      
      dataType: "binary",
      async: false,
      processData: false      
      //responseType:'arraybuffer',      
    }).response;            
}
function myAjaxGETOnly(url)
{
  var tmp = $.ajax({
      url: url,
      type: "GET",      
      //crossDomain :true,
      dataType: 'html',
      async: false
   }).responseText;
  return tmp;
}
//??????ajax
function myAjax(url,postdata)
{
  $method = "POST";
  if(postdata=="")
  {
    $method = "GET";
  }
  var tmp = $.ajax({
      url: url,
      type: $method,
      data: postdata,
      dataType: 'html',
      //crossDomain:true,
      async: false
   }).responseText;
  return tmp;
}
function ajax_post_encode(data)
{
  return encodeURIComponent(data);
}
function myAjax_async(url,postdata,dom,func)
{
  $method = "POST";
  if(postdata=="")
  {
    $method = "GET";
  }
  $.ajax({
      url: url,
      type: $method,
      data: postdata,
      async: true,
      dataType: 'html',
      success: function(html){
        if(dom!="")
        {
          $(dom).html(html);
        }
        func(html);        
      }
  });  
}
function myAjax_async_progress(url,postdata,func_success, func_error)
{
  var tmp = "<div style='width:350px;text-align:left;'>???????????????...<br> \
                       <table border='0' cellpadding='0' cellspacing='0' width='100%'> \
                         <tr> \
                           <td style='width:80%;' reqc='td_left'> \
                             <div style='padding:2px;'><div  reqc='progress_bar' style='width:0%;background-color:blue;'></div></div> \
                           </td> \
                           <td style='width:20%;' reqc='td_right'> \
                             <div style='text-align:center;' reqc='progress_data' style='width:100%;'></div> \
                           </td> \
                          </tr> \
                       </table> \
                      </div>";
  //??????: https://blog.toright.com/posts/3585/ajax-%E5%88%A9%E7%94%A8-xhr2-%E5%AF%A6%E4%BD%9C%E4%B8%8B%E8%BC%89%E9%80%B2%E5%BA%A6%E5%88%97-progress-event.html
  dialogMyBoxOn(tmp, false, function(){
    var method = 'POST';
    if(postdata == "")
    {
      method = 'GET';
    }
    $.ajax({
                "type": method,
                "data": postdata,
                "url": url,
                "success" : function(html) {
                  dialogMyBoxOff();
    	          func_success(html);
		},
                "error" : function(html){
                  mylog("myAjax_async_progress ??????: ");
                  mylog(html);
                  dialogMyBoxOff();
                  if(func_error!=null){
                    func_error(html);
                  }
                },
                "xhrFields": {
                    "onprogress": function (event) {
                        console.log(event);
                        //Download progress
                        if ( event.lengthComputable) {  
                            //????????????
                            var percent = (event.loaded / event.total) * 100.0;
                            if(percent >=100) { percent  = 100; }
                            percent = percent.toFixed(2);
                            $("div[id^='mybox_div'] div[reqc='progress_bar']").css({'width': percent+'%'});
                            $("div[id^='mybox_div'] div[reqc='progress_data']").text( percent +" %" );
                        }
                        else
                        {
                          //???????????????
                          console.log("????????????...");
                          $("div[id^='mybox_div'] td[reqc='td_left']").css({ width: '20%' });
                          $("div[id^='mybox_div'] td[reqc='td_right']").css({ width: '80%' });
                          $("div[id^='mybox_div'] div[reqc='progress_data']").text( "?????????... "+event.loaded);
                        }
                    }
                }
            });
  });
}
function myAjax_async_json(url,postdata,func)
{
  $method = "POST";
  if(postdata=="")
  {
    $method = "GET";
  }
  $.ajax({
      url: url,
      type: $method,
      data: postdata,
      async: true,
      dataType: 'json',
      success: function(html){       
        func(html);        
      }
  });  
}
function my_loadScript(url)
{
  $.ajax({
      url:url,
      async: false,
      type: "POST",
      data: '',  
      timeout: 30*1000
  }).responseText;
}
//???????????????
function div_motion(domid)
{
	var pre_name="3WA_"+new Date().getTime();
	
    window[pre_name+'paperdown']=0;
    window[pre_name+'motion']=0;
    $("#"+domid).mousedown(function(event){
      if(window[pre_name+'paperdown']!=0)
      {		
		  $("#"+domid).stop();
	  }
      window[pre_name+'startmovetime']=new Date().getTime();
      window[pre_name+'paperdown']=1;
      window[pre_name+'moveX']=event.pageX;
      window[pre_name+'moveY']=event.pageY;
      window[pre_name+'motion']=0;                          
    });
    $("#"+domid).mouseup(function(){
	   window[pre_name+'endmovetime']=new Date().getTime();
	   window[pre_name+'lastX']=this.scrollLeft;
	   window[pre_name+'lastY']=this.scrollTop;
	   var orz=window[pre_name+'endmovetime']-window[pre_name+'startmovetime'];       
	   if(orz>=15){
		 orz=0;    
		 window[pre_name+'paperdown']=0; 
		 window[pre_name+'motion']=0;    
	   }
	   else
	   {
		 orz=15-orz;                                
		 window[pre_name+'motion']=1;
		 $("#"+domid).animate({ 
		   'scrollLeft':(window[pre_name+'lastX']+(window[pre_name+'lastX']-window[pre_name+'moveSX'])/0.1),
		   'scrollTop':(window[pre_name+'lastY']+(window[pre_name+'lastY']-window[pre_name+'moveSY'])/0.05)
		 },{
			duration:orz*100,
			query:false,
			complete:function(){
			window[pre_name+'paperdown']=0;
			window[pre_name+'motion']=0;			                 					 	
		   }
		 });
	   }   
    });
    $("#"+domid).mousemove(function(event){
      if(window[pre_name+'paperdown']==1&&window[pre_name+'motion']==0)
      {
        window[pre_name+'startmovetime']=new Date().getTime();
        window[pre_name+'moveSX']=this.scrollLeft;
        window[pre_name+'moveSY']=this.scrollTop;
                
        this.scrollLeft-=(event.pageX-window[pre_name+'moveX']);
        this.scrollTop-=(event.pageY-window[pre_name+'moveY']);
        window[pre_name+'moveX']=event.pageX;
        window[pre_name+'moveY']=event.pageY;

        /*if(this.scrollTop==0)
        {
			this.scrollTop=parseInt(str_replace('px','',this.scrollHeight))-parseInt(str_replace('px','',$("#TABLE_TR").css('height')));			
		}
		if(this.scrollTop+parseInt(str_replace('px','',$("#TABLE_TR").css('height')))-2==parseInt(str_replace('px','',this.scrollHeight)))
		{
			this.scrollTop=1;
		}*/
      }
    });
}

function disableEnterKey(e)
{
     var wtfkey;

     if(window.event)
          wtfkey = window.event.keyCode;     //IE
     else
          wtfkey = e.which;     //firefox

     if(wtfkey == 13)
          return false;
     else
          return true;
}

function comment(input,width,height)
{  
  $("#mycolorbox").html(input).dialog({
    'width':width,
    'height':height
  });
}

function ValidEmail(emailtoCheck)
{
  //  email
  //  ??????:  1.????????????  "@"
  //              2.?????????,  ??????????????????".",  ?????????????????????
  //              3.???????????????
  var  regExp = /^[^@^\s]+@[^\.@^\s]+(\.[^\.@^\s]+)+$/;
  if(emailtoCheck.match(regExp))
    return true;
  else
    return false;
}
function getCheckBox_req(dom_name)
{
  //return array
    var arr = new Array();
    var doms = $("input[name='"+dom_name+"']:checked");
    for (i = 0, max_i = doms.length; i < max_i; i++) {
        array_push(arr, doms.eq(i).attr('req'));
    }    
    return arr;
}
function getCheckBox_val(dom_name) {
    //return array
    /*var arr = new Array();
    for (var i = 0, max_i = $($("*[name='" + dom_name + "']")).length; i < max_i; i++) {
        if ($($("*[name='" + dom_name + "']")[i]).prop('checked')) {
            array_push(arr, $($("*[name='" + dom_name + "']")[i]).val());
        }
    }*/

    var arr = new Array();
    var doms = $("input[name='"+dom_name+"']:checked");
    for (i = 0, max_i = doms.length; i < max_i; i++) {
        array_push(arr, doms.eq(i).val());
    }    
    return arr;
}
function ValidPhone(phonenum)
{
  //????????? 09xx-xxxxxx
  var tel=/^(09)\d{2}-\d{6}$/;
  if(!tel.test(phonenum))
  {    
    return false;
  } 
  else
  {
    return true;
  }
}
function ValidChineseEnglish(input)
{
  //????????? ???????????????
  var check=/^[\u4E00-\u9FA5A-Za-z]+$/;
  if(!check.test(input))
  {    
    return false;
  } 
  else
  {
    return true;
  }
}
function ValidEnglishDigital(input)
{
  //????????? ?????????
  var check=/^[a-zA-Z0-9]+$/;
  if(!check.test(input))
  {    
    return false;
  } 
  else
  {
    return true;
  }
}
function ValidEnglishDigitalWordNotSpaceAnd(input)
{
  //????????? ????????????????????????????????????????????????&
  var check=/^[^ ^&\fa-zA-Z0-9]+$/;
  if(!check.test(input))
  {    
    return false;
  } 
  else
  {
    return true;
  }
}
jQuery.fn.outerHTML = function(s) {
return (s) ? $(this).replaceWith(s) : $(this).clone().wrap('<p>').parent().html();
} 

//scroll page to id , ??? #id
function Animate2id(dom,offsetY=0){
  /*var animSpeed=800; //animation speed
  var easeType="easeInOutExpo"; //easing type
  if($.browser.webkit){ //webkit browsers do not support animate-html
    $("body").stop().animate({scrollTop: $(dom).offset().top}, animSpeed, easeType,function(){
      $(dom).focus();
    });
  } else {
    $("html").stop().animate({scrollTop: $(dom).offset().top}, animSpeed, easeType,function(){
      $(dom).focus();
    });
  }
  */
  var body = $("html, body");
  body.stop().animate({scrollTop: $(dom).offset().top - offsetY }, 800, 'swing', function() { 
    //alert("Finished animating");
  });

}
function windows_status()
{
  $m=new Array();
  $m['scrollTop']=$(window).scrollTop();
  $m['scrollLeft']=$(window).scrollLeft();
  $m['clientWidth']=$(document.body)[0].clientWidth;
  $m['clientHeight']=$(document.body)[0].clientHeight;
  return $m;
}
function html_multiselect_set_value(domid,value_string)
{
  var selected = explode(",",value_string);  
  var obj=$('#'+domid);
  for (var i in selected) {
    var val=selected[i];    
    obj.find('option:[value='+val+']').attr('selected',1);
  }           
}


  //???????????????????????????
	function touchHandler(event)
	{
	 var touches = event.changedTouches,
	    first = touches[0],
	    type = "";

	     switch(event.type)
	{
	    case "touchstart": type = "mousedown"; break;
	    case "touchmove":  type="mousemove"; break;        
	    case "touchend":   type="mouseup"; break;
	    default: return;
	}
	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1,
	                          first.screenX, first.screenY,
	                          first.clientX, first.clientY, false,
	                          false, false, false, 0/*left*/, null);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
	}

	function mouse_init()
	{
	   document.addEventListener("touchstart", touchHandler, true);
	   document.addEventListener("touchmove", touchHandler, true);
	   document.addEventListener("touchend", touchHandler, true);
	   document.addEventListener("touchcancel", touchHandler, true);    
	}
  function size_hum_read($size){
      /* Returns a human readable size */
  	$size = parseInt($size);
    var $i=0;
    var $iec = new Array();
    var $iec_kind="B,KB,MB,GB,TB,PB,EB,ZB,YB";
    $iec=explode(',',$iec_kind);
    while (($size/1024)>1) {
      $size=$size/1024;
      $i++;
    }
    return sprintf("%s%s",substr($size,0,strpos($size,'.')+4),$iec[$i]);
  }

  function plus_or_minus_one_month($year_month,$kind)
  {
    //$year_month ?????????????????? 2011-01
    //$kind ?????? '+' or '-'
    //??????????????? 2011-01  
    switch($kind)
    {
      case '+':
          return date('Y-m',strtotime("+1 month",strtotime($year_month)));
        break;
      case '-':
          return date('Y-m',strtotime("-1 month",strtotime($year_month)));
        break;
    }  
  }
  function my_ids_mix(ids)
  {
    var m=new Array();
    m=explode(",",ids);
    var data=new Array();    
    for(i=0,max_i=m.length;i<max_i;i++)
    {
      array_push(data,m[i]+"="+encodeURIComponent($("#"+m[i]).val()));
    }
    return implode('&',data);
  }  
  function my_names_mix(indom)
  {
    var m=new Array();
    var names=$(indom).find('*[req="group[]"]');    
    for(i=0,max=names.length;i<max;i++)
    {
      array_push(m,$(names[i]).attr('name')+"="+encodeURIComponent($(names[i]).val()));
    }
    return implode('&',m);
  }

function anti_right_click()
{
  //???????????????
  document.onselectstart = function(){return false;}
  document.ondragstart = function(){return false;}
  document.oncontextmenu = function(){return false;}
  if (document.all)
      document.body.onselectstart = function() { return false; };
  else {
      $('body').css('-moz-user-select', 'none');
      $('body').css('-webkit-user-select', 'none');
  }
  document.onmousedown = clkARR_;
  document.onkeydown = clkARR_;
  document.onkeyup = clkARRx_;
  window.onmousedown = clkARR_;
  window.onkeydown = clkARR_;
  window.onkeyup=clkARRx_;
  
  var clkARRCtrl = false;
  
  function clkARRx_(e) {
      var k = (e) ? e.which : event.keyCode;
      if (k==17) clkARRCtrl = false;
  }
  
  function clkARR_(e) {
      var k = (e) ? e.which : event.keyCode;
      var m = (e) ? (e.which==3) : (event.button==2);
      if (k==17) clkARRCtrl = true;
      if (m || clkARRCtrl && (k==67 || k==83))
          alert((typeof(clkARRMsg)=='string') ? clkARRMsg : '-????????????-????????????-');
  }   
}
$.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}
function dialogOn(message,functionAction)
{
  $.fn.center = function () {
      this.css("position","absolute");
      this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
      this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
      return this;
  }
	$.blockUI({
		message : message,
		css : {
			backgroundColor : '#000',
			color : '#fff',
			padding:'15px'
		},		
		onBlock : function() {      
			functionAction();
      $('.blockUI.blockMsg').center();
		}						
	});
}
function dialogMyBoxOn(message,isTouchOutSideClose,functionAction)
{  
	$.mybox({
    is_background_touch_close:isTouchOutSideClose,
		message : message,
		css : {
      border : '2px solid #fff',
			backgroundColor : '#000',
			color : '#fff',
			padding:'15px'
		},		
		onBlock : function() {      
			functionAction();      
		}						
	});
}
function dialogMyBoxOff()
{
  $.unmybox();
}
function dialogOff()
{	
	setTimeout(function(){
		$.unblockUI();
	},500);
}
function basename(filepath)
{
  m=explode("/",filepath);
  mdata = explode("?",end(m));  
  return mdata[0];
}
function mainname(filepath)
{
  filepath = basename(filepath);
  var mdata=explode(".",filepath);
  return mdata[0];
}
function subname(filepath)
{
  filepath = basename(filepath);
  var m=explode(".",filepath);
  return end(m);
} 
function getext($s){	return strtolower(subname($s));}
function isvideo($file){	if(in_array(getext($file),new Array('mpg','mpeg','avi','rm','rmvb','mov','wmv','mod','asf','m1v','mp2','mpe','mpa','flv','3pg','vob'))){		return true;	}	return false;} 
function isdocument($file){	if(in_array(getext($file),new Array('docx','odt','odp','ods','odc','csv','doc','txt','pdf','ppt','pps','xls'))){		return true;	}	return false;} 
function isimage($file){	if(in_array(getext($file),new Array('jpg','bmp','gif','png','jpeg','tiff','tif','psd'))){		return true;	}	return false;} 
function isspecimage($file){	if(in_array(getext($file),new Array('tiff','tif','psd'))){		return true;	}	return false;}
function isweb($file){	if(in_array(getext($file),new Array('htm','html'))){		return true;	}	return false;} 
function iscode($file){	if(in_array(getext($file),new Array('c','cpp','h','pl','py','php','phps','asp','aspx','css','jsp','sh','shar'))){		return true;	}	return false;}
function dialogColorBoxOn(message,isTouchOutSideClose,func){
  //$(this).colorbox.resize();
  isTouchOutSideClose=(isTouchOutSideClose==='boolean')?false:isTouchOutSideClose;
  if($("#mycolorbox").length==0)
  {
    $("body").append("<div id='mycolorbox' style='display:none;'></div>");
  }
  $("#mycolorbox").colorbox({
    html:message,
    open:true,
    overlayClose:isTouchOutSideClose,
    onComplete: func 
  });
}
function dialogColorBoxOff(){
  if($("#mycolorbox").length!=0){
    $("#mycolorbox").colorbox.close();
  }
}
function colorToRgb(data) {
    data=strtolower(data);
    data=str_replace("#","",data);
    data=str_replace("rgb(","",data);
    data=str_replace(")","",data);
    var test=explode(',',data);
    var m = new Array();
    if(test.length==3)
    {
      
      m['r']=test[0];
      m['g']=test[1];
      m['b']=test[2];       
    }
    else
    {
      var bigint = parseInt(data, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;      
      m['r']=r;
      m['g']=g;
      m['b']=b;
    }
    return m;
}
function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    var m = new Array();
    m['r']=r;
    m['g']=g;
    m['b']=b;
    return m;
}
function rgbToHex(color) {
    if (color.substr(0, 1) === "#") {
        return color;
    }
    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);
    return "#"+ (
        (r.length == 1 ? r +"0" : r) +
        (g.length == 1 ? g +"0" : g) +
        (b.length == 1 ? b +"0" : b)
    );
}
  function is_string_like($data,$find_string){
/*
  is_string_like($data,$fine_string)

  $mystring = "Hi, this is good!";
  $searchthis = "%thi% goo%";

  $resp = string_like($mystring,$searchthis);


  if ($resp){
     echo "milike = VERDADERO";
  } else{
     echo "milike = FALSO";
  }

  Will print:
  milike = VERDADERO

  and so on...

  this is the function:
*/
    $tieneini=0;
    if($find_string=="") return 1;
    $vi = explode("%",$find_string);
    $offset=0;
    for($n=0,$max_n=count($vi);$n<$max_n;$n++){
        if($vi[$n]== ""){
            if($vi[0]== ""){
                   $tieneini = 1;
            }
        } else {
            $newoff=strpos($data,$vi[$n],$offset);
            if($newoff!==false){
                if(!$tieneini){
                    if($offset!=$newoff){
                        return false;
                    }
                }
                if($n==$max_n-1){
                    if($vi[$n] != substr($data,strlen($data)-strlen($vi[$n]), strlen($vi[$n]))){
                        return false;
                    }

                } else {
                    $offset = $newoff + strlen($vi[$n]);
                 }
            } else {
                return false;
            }
        }
    }
    return true;
  }
function lockRight(){
  document.onselectstart = function(){return false;}
  document.ondragstart = function(){return false;}
  document.oncontextmenu  =  function(){
    var userAgent = navigator.userAgent.toLowerCase();
    var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
    var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
    var is_ie = ( (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3)) || userAgent.indexOf("rv:11.0") > 0;
    var is_safari = (userAgent.indexOf('webkit') != -1 || userAgent.indexOf('safari') != -1);
    if (is_ie!=false){
      // IE
      window.event.returnValue=false;
    }
    return  false;
  }
}
/*function is_url(s) {
  var regexp = /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
  return regexp.test(s);
}*/
/*function is_url(value) {
    var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
    if (urlregex.test(value)) {
        return (true);
    }
    return (false);
}*/
function is_url(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(s);
}
function blockIE678(){
  var userAgent = navigator.userAgent.toLowerCase();
  if(
    userAgent.indexOf('msie 8.0')!=-1 ||
    userAgent.indexOf('msie 7.0')!=-1 ||
    userAgent.indexOf('msie 6.0')!=-1
  )
  {
    //ie6 7 8
    dialogOn("?????????????????????????????????????????? IE9 ??? Firefox???Google Chrome...<br><br><center><input type='button' value='??????' onClick=\"location.href='http://3wa.tw';\"></center>",function(){
      
    });
    
  }
}
function distance(lat1,lon1,lat2,lon2) {
	//???????????????????????????
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  if (d>1) return d.toFixed(2)+"km";
  else if (d<=1) return (d*1000).toFixed(2)+"m";
  return d;
}
function canvas_scale(base64_data,nw,nh)
{
  //?????? base64_data ????????? canvas tag
  //???????????? ... ??? dom : $("#a_img")[0] ??? document.getElementById('a_img') ???base64
  //alert(typeof(base64_data));    
  var _t = new Date().getTime();
  //?????? base64_data ????????? canvas tag
  if(typeof(base64_data)=="object")
  {
    //?????? canvas
    var tmp_canvas = "canvas_scale_tmp_canvas_"+_t;
    var w = $(base64_data).width();
    var h = $(base64_data).height();  
    $("body").append("<canvas id='"+tmp_canvas+"' width='"+w+"' height='"+w+"'></canvas>");
    var canvas = document.getElementById(tmp_canvas);
    var ctx = canvas.getContext('2d');            
    ctx.drawImage(base64_data, 0, 0, w, h);    
    base64_data = $("#"+tmp_canvas)[0].toDataURL();      
    $("#"+tmp_canvas).remove();
  }
  if(base64_data.substr(0,10).toLowerCase() != "data:image")
  {
     base64_data = "data:image/png;base64,"+base64_data;     
  }    
  //??????????????????
  var _tmpid = "canvas_scale_img_"+_t; 
  $("body").append("<img id='"+_tmpid+"' src='"+base64_data+"'>");
  var w = $("#"+_tmpid).width();
  var h = $("#"+_tmpid).height();
 
  var r = parseFloat(w)/parseFloat(h);
  
  //???????????????????????? :)
  var new_w=nw;
  var new_h=new_w;
  if(typeof(nh)=="undefined" || isNaN(nh))
  {
	  new_h=new_w/r;
  }
  else
  {
	  new_h=nh;
  }
  //alert(new_w);    
  //alert(new_h);
  //$("#"+_tmpid).remove();
  //????????????canvas??????
  var _canvas_tmpid = "canvas_scale_canvas"+_t;
  $("body").append("<canvas id='"+_canvas_tmpid+"' width='"+new_w+"' height='"+new_h+"'></canvas>");
  
  var canvas = document.getElementById(_canvas_tmpid);
  var ctx = canvas.getContext('2d');            
  ctx.drawImage(document.getElementById(_tmpid), 0, 0, new_w, new_h);    
  var output = document.getElementById(_canvas_tmpid).toDataURL();
  //alert(new_w+","+new_h);
  //alert(w+","+h);
  $("#"+_tmpid).remove();
  $("#"+_canvas_tmpid).remove();    
  delete canvas;
  my_gc(canvas);
  
  delete ctx;
  my_gc(ctx);
  
  delete w;
  my_gc(w);
  
  delete h;
  my_gc(h);
  
  delete r;
  my_gc(r);
  
  delete new_h;
  my_gc(new_h);
  
  delete new_w;
  my_gc(new_w);
  
  return output;
}

//???????????????
function enPWD_string( $str, $key ) {
  if($str==null)
  {
    $str = "";
  }
  $str = base64_encode($str);
  $key = base64_encode($key); 
  $xored = "";
  //alert($str);
  for ($i=0,$max_i=$str.length;$i<$max_i;$i++) {
    $a = ord(substr($str,$i,1));      
    for ($j=0,$max_j=$key.length;$j<$max_j;$j++) {      
      $k = ord(substr($key,$j,1));
      $a = $a ^ $k;
    }
    $xored = sprintf("%s%s",$xored,chr($a));
  }       
  return base64_encode($xored);
}
function dePWD_string( $str, $key ) {
  if($str==null)
  {
    $str = "";
  }
  $str = base64_decode($str);    
  $key = base64_encode($key);
  $xored = "";
  for ($i=0,$max_i=$str.length;$i<$max_i;$i++) {
    $a = ord(substr($str,$i,1));
    for ($j=$key.length-1;$j>=0;$j--) {    
      $k = ord(substr($key,$j,1));
      $a = $a ^ $k;
    }
    $xored = sprintf("%s%s",$xored,chr($a));
  }   
  $xored = base64_decode($xored);
  return $xored;
}
// javascript
function get_between($data,$s_begin,$s_end)
{
  /*
    $a = "abcdefg";
    echo get_between($a, "cde", "g");
    // get "f"
  */
  $s = $data;
  $start = strpos($s,$s_begin);
  $new_s = substr($s,$start + strlen($s_begin));
  $end = strpos($new_s,$s_end);
  return substr($s,$start + strlen($s_begin), $end);
}
function smallComment(message,seconds,is_need_motion,cssOptions)
{
	//?????????1/15	
	if($("#mysmallComment").length==0)
	{    
		$("body").append("<div id='mysmallComment'><span class='' id='mysmallCommentContent'></span></div>");
		$("#mysmallComment").css({
			'display':'none',
			'position':'fixed',
			'left':'0px',
			'right':'0px',
			'padding':'15px',
			'bottom':'3em',
			'z-index':new Date().getTime(),
			'text-align':'center',
			'opacity':0.8,
      'pointer-events':'none'
		});
		$("#mysmallCommentContent").css({									
			'color':'#fff',
			'background-color':'#000',
      'padding':'10px',
      'border':'3px solid #fff',
      'pointer-events':'none'				
		});    
		/*
		$("#mysmallComment").css({
			'left': (wh['width']-$("#mysmallComment").width())/2+'px' 
		});
		*/

		//$("#mysmallComment").corner();
	}  
    
  var mlen = strlen(strip_tags(message));
  var font_size="16px";
  if(mlen>=10)
  {
    font_size="12px";
  }
  $("#mysmallCommentContent").css({
    'font-size':font_size
  });		
  
  if(typeof(cssOptions)!="undefined")
  {
    $("#mysmallCommentContent").css(cssOptions);
  }
  
	$("#mysmallCommentContent").html(message);
	if(is_need_motion==true)
	{
		$("#mysmallComment").stop();
		$("#mysmallComment").fadeIn("slow");
    clearTimeout(window['smallComment_TIMEOUT']);
		window['smallComment_TIMEOUT']=setTimeout(function(){
			$("#mysmallComment").fadeOut('fast');
		},seconds);
	}
	else
	{
    $("#mysmallComment").stop();
		$("#mysmallComment").show();
    clearTimeout(window['smallComment_TIMEOUT']);
		window['smallComment_TIMEOUT']=setTimeout(function(){
			$("#mysmallComment").hide();
		},seconds);
	}
}
function timedownbutton(button_dom,title,seconds,done_func)
{
  // By 3WA John (linainverseshadow@gmail.com)
  // Version : 1.0
  // Method : ?????????????????? 
  // button_dom = which buttom dom you wanna control
  // title = button title
  // second = wait second
  // done_func = after count down. what will be going on.
  
  if($(button_dom).length==0)
  {
    return;
  }
  if(window['timedown_step']==null)
  {
    window['timedown_step']=new Array();
  }
  window['timedown_step'].push("REGISTED");
  $(button_dom).attr('timedown',seconds);
  var t = new Date().getTime()+"_"+window['timedown_step'].length;
  window['time_down_func_'+t] = function(){
    $(button_dom).val(
          title+
          "("+
          parseInt($(button_dom).attr('timedown'))+
          ")"
    );                
    setTimeout(function(){
      if(parseInt($(button_dom).attr('timedown'))>0)
      {
        $(button_dom).attr('timedown',parseInt($(button_dom).attr('timedown')) -1 );
        window['time_down_func_'+t]();
      }
      else
      {
        done_func();
      }
    },1000);
  }
  
  window['time_down_func_'+t]();
}
/// <summary>
/// $ra:Array
/// $fields:????????????
/// $headers:??????????????????
/// $classname:?????????style css??????
/// </summary>
function print_table($ra, $fields, $headers, $classname) {
    $classname = (typeof ($classname) == "undefined" || $classname == '') ? '' : " class='" + $classname + "' ";
    if (typeof ($fields) == "undefined" || $fields == '' || $fields == '*') {

        $tmp = "<table " + $classname+" border='1' cellspacing='0' cellpadding='0'>";
        $tmp += "<thead><tr>";
        for (var k in $ra[0]) {
            $tmp += "<th field=\""+k+"\">"+k+"</th>";
        }
        $tmp += "</tr></thead>";
        $tmp += "<tbody>";
        for ($i = 0, $max_i = $ra.length; $i < $max_i; $i++) {
            $tmp += "<tr>";
            for (var k in $ra[$i]) {
                $tmp += "<td field=\"" + k + "\">" + $ra[$i][k]+"</td>";
            }
            $tmp += "</tr>";
        }
        $tmp += "</tbody>";
        $tmp += "</table>";
        return $tmp;
    }
    else {
        $tmp = "<table " + $classname+" border='1' cellspacing='0' cellpadding='0'>";
        $tmp += "<thead><tr>";
        $mheaders = $headers.split(',');
        $m_fields = $fields.split(',');
        for (var k = 0, max_k = $mheaders.length; k < max_k; k++) {
            $tmp += "<th field=\"" + $m_fields[k] + "\">" + $mheaders[k]+"</th>";
        }
        $tmp += "</tr></thead>";
        $tmp += "<tbody>";

        for ($i = 0, $max_i = $ra.length; $i < $max_i; $i++) {
            $tmp += "<tr>";
            for (var k = 0, max_k = $m_fields.length; k < max_k; k++) {
                $tmp += "<td field=\"" + $m_fields[k] + "\">" + $ra[$i][$m_fields[k]]+"</td>";
            }
            $tmp += "</tr>";
        }
        $tmp += "</tbody>";
        $tmp += "</table>";
        return $tmp;
    }
}
function print_table_v(ra,fields,show_fields,theclass)
{
  var names = new Array();
  var show_names = new Array();
  if(count(ra)>0)
  {
    for(var k in ra[0])
    {
      names.push(k);
      show_names .push(k);
    }
  }
  if(typeof(fields)!="undefined")
  {
    names = new Array();
    show_names = new Array();
    fields = trim(fields);
    show_fields = trim(show_fields);
    var m = explode(",",fields);    
    var sm = explode(",",show_fields);
    if( count(m)!=count(sm)) { 
       alert('Now same array...');
       return;
    }
    
    for(var i=0,max_i=count(m);i<max_i;i++)
    {
      names.push(m[i]);
      show_names.push(sm[i]);
    }
  }
  var table_data = "";
  var class_append = "";
  if(typeof(theclass)!="undefined")
  {
    class_append += " class=\""+theclass+"\" ";
  }
  table_data = "<table "+class_append +">";
  table_data +="<thead>";
    table_data +="<tr>";
        table_data +="<th>??????</th>";
        table_data +="<th colspan=\""+count(ra)+"\">??????</th>";
    table_data +="</tr>";
  table_data +="</thead>";
  table_data +="<tbody>";
  for(var k=0,max_k=names.length;k<max_k;k++)
  {
     table_data += "<tr>";
        table_data += "<th>"+show_names[k]+"</th>";
        for(var i=0;i<ra.length;i++)
        {
            for(var obj in ra[i])
            {
              if(obj==names[k])
              {
                 table_data += "<td fields=\""+names[k]+"\">"+ra[i][obj]+"</td>";
              }
            }
        }
     table_data += "</tr>";
  }
  table_data +="</tbody>";
  table_data +="</table>";
  return table_data;
}
function prevent_drop_down_refresh(){
  //???????????????????????????
  
  //$(document).bind('touchmove',function(e) {
  //  e.preventDefault();
  //});
  
  
  // Function to disable "pull-to-refresh" effect present in some webviews.
// Especially Crosswalk 12 and above (Chromium 41+) runtimes.

// Adapted from this example: https://code.google.com/p/chromium/issues/detail?id=456515#c8
// Source: Copyright (c) 2015 by jdduke (http://jsbin.com/qofuwa/2/edit)
// Source: Released under the MIT license: http://jsbin.mit-license.org

// <input id="preventPullToRefresh"  type="checkbox">Prevent pull-to-refresh?</input>
// <input id="preventOverscrollGlow" type="checkbox">Prevent overscroll glow?</input>
// <input id="preventScroll"         type="checkbox">Prevent scroll?</input>

window.addEventListener('load', function() {
//  var preventPullToRefreshCheckbox  = document.getElementById('preventPullToRefresh') ;
//  var preventOverscrollGlowCheckbox = document.getElementById("preventOverscrollGlow") ;
//  var preventScrollCheckbox         = document.getElementById("preventScroll") ;

    var lastTouchY = 0 ;
    var maybePreventPullToRefresh = false ;

    // Pull-to-refresh will only trigger if the scroll begins when the
    // document's Y offset is zero.

    var touchstartHandler = function(e) {
        if( e.touches.length != 1 ) {
            return ;
        }
        lastTouchY = e.touches[0].clientY ;
        // maybePreventPullToRefresh = (preventPullToRefreshCheckbox.checked) && (window.pageYOffset == 0) ;
        maybePreventPullToRefresh = (window.pageYOffset == 0) ;
    }

    // To suppress pull-to-refresh it is sufficient to preventDefault the
    // first overscrolling touchmove.

    var touchmoveHandler = function(e) {
        var touchY = e.touches[0].clientY ;
        var touchYDelta = touchY - lastTouchY ;
        lastTouchY = touchY ;

        if (maybePreventPullToRefresh) {
            maybePreventPullToRefresh = false ;
            if (touchYDelta > 0) {
                e.preventDefault() ;
                // console.log("pull-to-refresh event detected") ;
                return ;
            }
        }

        // if (preventScrollCheckbox.checked) {
        //     e.preventDefault() ;
        //     return ;
        // }

        // if (preventOverscrollGlowCheckbox.checked) {
        //     if (window.pageYOffset == 0 && touchYDelta > 0) {
        //         e.preventDefault() ;
        //         return ;
        //     }
        // }
    }

    document.addEventListener('touchstart', touchstartHandler, false) ;
    document.addEventListener('touchmove', touchmoveHandler, false) ;
}) ;

}
function secondtodhis($time)
{
  //???????????????????????????
  //Create by ?????? 
  // 2010-02-07
  $days=sprintf("%02d",$time/(24*60*60));
  $days=($days>=1)?$days+'???':'';
  $hours=sprintf("%02d",($time % (60 * 60 * 24)) / (60 * 60));
  $hours=($days==''&&$hours=='0')?'':$hours+"???";
  $mins=sprintf("%02d",($time % (60 * 60)) / (60));
  $mins=($days==''&&$hours==''&&$mins=='0')?'':$mins+"???";
  $seconds=sprintf("%02d",($time%60))+"???";
  $output=sprintf("%s%s%s%s",$days,$hours,$mins,$seconds);
  return $output;
}
function myW(html,func,cssOption){
  if( typeof(window['myW_t'])=="undefined")
  {
     window['myW_t']=0;
  }
  $.fn.center = function () {
      this.css("position","absolute");
      this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
      this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
      return this;
  }  
  var t = new Date().getTime()+"_"+window['myW_t']++;
  var id = "myW_"+t;
  $("body").append("<div id='"+id+"'></div>");  
  $("#"+id).css({
    'position':'absolute',
    'z-index':new Date().getTime(),
    'padding':'3px',
    'background-color':'#fff',
    'color':'black',
    'border':'2px solid #00f'
  });
  if(typeof(cssOption)!="undefined" && typeof(cssOption)=="object"){
    for(var k in cssOption)
    {
      $("#"+id).css(k,cssOption[k]);
    }
  }
  html = html.replace("{myW_id}",id);  
  $("#"+id).html(html);
  $(window).bind("scroll",{id:id},function(event){
    $("#"+event.data.id).center();
  });  
  $("#"+id).center();
  func(id);
  return id;
}

  function mix_td(dom){
    //?????????????????????????????????td
    //var dom = dom;  //$("td[field='fake_orin_dir_path']")
    var now_order_no="";
    var step=0;    
    for(var i=0,max_i=dom.length;i<max_i;i++)
    {
      if(i==0) {
        now_order_no=dom.eq(i).html();
        step=0;
        continue;        
      }
      if(dom.eq(i).html()==now_order_no)
      {
        step++;
        dom.eq(i).hide();
      }
      else
      {
        now_order_no=dom.eq(i).html();
        dom.eq(i-step-1).attr('rowspan',step+1);
        //dom.eq(i-step-1).append("<br><center><input type='button' style='width:120px;height:50px;' value='??????????????????'></center>");
        step=0;
      }
      if(i==max_i-1)
      {        
        dom.eq(i-step).attr('rowspan',step+1);
        //dom.eq(i-step).append("<br><center><input type='button' style='width:120px;height:50px;' value='??????????????????'></center>");
      }
    }    
  }
  function nl2br(varTest){
    return varTest.replace(/(\r\n|\n\r|\n)/g, "<br>");
  }
  function br2nl(varTest){
      return varTest.replace(/<br>/g, "\n").replace(/<br \/>/g, "\n");
  }
  function json_format(json)
  {
    if(typeof(json)=="string")
    {
      return JSON.stringify(json_decode(json,true), null, 2);
    }
    else
    {
      return JSON.stringify(json, null, 2);
    }
  }
  function json_highlight(json) {
    /*
    pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
    */
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'color: red;'; //key
            } else {
                cls = 'color: green;'; //string
            }
        } else if (/true|false/.test(match)) {
            cls = 'color: blue;'; //boolean
        } else if (/null/.test(match)) {
            cls = 'color: magenta;'; //null
        }
        return '<span style="' + cls + '">' + match + '</span>';
    });
  }
  function tile2long(x,z) { return (x/Math.pow(2,z)*360-180); }
  
  function tile2lat(y,z) {
      var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
      return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
  }  
   // ref: http://stackoverflow.com/a/1293163/2343
  // This will parse a delimited string into an array of
  // arrays. The default delimiter is the comma, but this
  // can be overriden in the second argument.
  function csvtoarray( strData, strDelimiter ){
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
          (
              // Delimiters.
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

              // Quoted fields.
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

              // Standard fields.
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );


      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;


      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (
              strMatchedDelimiter.length &&
              strMatchedDelimiter !== strDelimiter
              ){

              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push( [] );

          }

          var strMatchedValue;

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              strMatchedValue = arrMatches[ 2 ].replace(
                  new RegExp( "\"\"", "g" ),
                  "\""
                  );

          } else {

              // We found a non-quoted value.
              strMatchedValue = arrMatches[ 3 ];

          }


          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      // Return the parsed data.
      return( arrData );
  }

  //???????????????ie8 
  
$.support.cors = true;
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}  
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
  
function random_pwd($how_many_words)
{
  //????????????????????????
  $wtfws="abcdefghijklmnpqrstuvwxyz123456789";//??????o???0
  $words="";
  for($i=0;$i<$how_many_words;$i++)
  {
    $words+=substr($wtfws,rand(0,strlen($wtfws)-1),1);
  }
  return $words;
}  
function myTableScroll(table_dom,show_scroll,options){    
  var css_options;
  css_options = {
    'max-height':'300px',
    'margin-right':'-16px'      
  };
  if(navigator.userAgent.toLowerCase().indexOf('chrome')!=-1)
  {      
    css_options['margin-right']='-16px';            
  }
  for(var k in options)
  {
    css_options[k]=options[k];
  }
  show_scroll=(show_scroll==false)?"hidden":"display";
  $(table_dom).css({
    'overflow':show_scroll
  });
  $(table_dom+" thead").css({
    'display':'table',
    'width':'100%',
    'table-layout':'fixed'
  });
  $(table_dom+" tbody tr").css({
    'display':'table',
    'width':'100%',
    'table-layout':'fixed'
  });
  $(table_dom+" tbody").css(css_options);
  
  $(table_dom+" tbody").css({
    'display':'block',      
    'overflow-x':'hidden',
    'overflow-y':'scroll'
  });

}
function money_format(number, decimals, decSymbol, thousSymbol) { 
  //number, decimal places , decimal symobl (.), thousands separator (,)
  decimals = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals, 
  decSymbol = decSymbol == undefined ? "." : decSymbol, 
  thousSymbol = thousSymbol == undefined ? "," : thousSymbol, 
  posNegSymbol = number < 0 ? "-" : "", 
  i = parseInt(number = Math.abs(+number || 0).toFixed(decimals)) + "", 
  j = (j = i.length) > 3 ? j % 3 : 0;
 
	return posNegSymbol + (j ? i.substr(0, j) + thousSymbol : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousSymbol) + (decimals ? decSymbol + Math.abs(number - i).toFixed(decimals).slice(2) : "");
}




if (!window.atob) {
  var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var table = tableStr.split("");

  window.atob = function (base64) {
    if (/(=[^=]+|={3,})$/.test(base64)) throw new Error("String contains an invalid character");
    base64 = base64.replace(/=/g, "");
    var n = base64.length & 3;
    if (n === 1) throw new Error("String contains an invalid character");
    for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
      var a = tableStr.indexOf(base64[j++] || "A"), b = tableStr.indexOf(base64[j++] || "A");
      var c = tableStr.indexOf(base64[j++] || "A"), d = tableStr.indexOf(base64[j++] || "A");
      if ((a | b | c | d) < 0) throw new Error("String contains an invalid character");
      bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
      bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
      bin[bin.length] = ((c << 6) | d) & 255;
    };
    return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4);
  };

  window.btoa = function (bin) {
    for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
      var a = bin.charCodeAt(j++), b = bin.charCodeAt(j++), c = bin.charCodeAt(j++);
      if ((a | b | c) > 255) throw new Error("String contains an invalid character");
      base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
                              (isNaN(b) ? "=" : table[((b << 2) & 63) | (c >> 6)]) +
                              (isNaN(b + c) ? "=" : table[c & 63]);
    }
    return base64.join("");
  };

}

function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
}

function base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join(" ");
}
function sortByArrayName(arr,sort_arr,field)
{
  //??????????????????????????????????????????????????????????????????
  var output = new Array();

  for(var i=0,max_i=count(sort_arr);i<max_i;i++)
  {
    for(var j=count(arr)-1;j>=0;j--)
    {
         //alert(print_r(arr[j],true));
       if(arr[j][field]==sort_arr[i])
       {
          output.push($.extend(true, {}, arr[j]) );
          //delete arr[j];
          //arr = array_values(arr);
          arr.splice(j,1);
       }
    }
    //???????????????????????????????????????output
  }
  
  for(var j=0,max_j=count(arr);j<max_j;j++)
  {
     output.push($.extend(true, {}, arr[j]) );
  }
  return output;
}
function img_mouseover_show(dom)
{    
  dom.unbind("mouseout").mouseout(function(){
    $("#show_pic_div_img_mouseover_show").stop().fadeOut();
  });
  
  //for copy
  dom.unbind("mousedown").mousedown(function(){
    var o_w = $(this).width();
    var o_h = $(this).height();
    if($(this).attr('bsrc')!=null)
    {
      $(this).attr('src',$(this).attr('bsrc')).width(o_w).height(o_h);
    }
  });
  
  dom.unbind("mouseover").bind("mouseover",function(){
    window['wh']=getWindowSize();
    console.log(window['wh']);
    if($("#show_pic_div_img_mouseover_show").length==0)
    {            
      $("body").append("<div id='show_pic_div_img_mouseover_show'></div>");
    }
    //console.log($(this).css('width')+","+$(this).css('height'));
    //var r = parseInt(str_replace("px","",$(this).css('height'))) / parseInt(str_replace("px","",$(this).css('width')));
    if(window['wh']['width'] > window['wh']['height'])
    { 
      if(parseInt(str_replace("px","",$(this).css('width'))) > parseInt(str_replace("px","",$(this).css('height'))) )
      {
        //?????????????????????-??????
        console.log('ww1?????????????????????-??????');
        $("#show_pic_div_img_mouseover_show").css({
          'position':'fixed',
          'pointer-events':'none',   
          'max-width':(window['wh']['width']*80/100)+'px',
          'max-height': (window['wh']['height']*80/100)+'px',                    
          'background-color':'#dcdcdc',
          'box-shadow': '1px 1px 10px rgba(0,0,0,0.5)',
          'z-index':time()*100,
          'opacity': 1,
          'padding':'15px',      
          'display':'none'            
        });
      }
      else
      {        
        //?????????????????????-??????
        console.log('ww2?????????????????????-??????');
        $("#show_pic_div_img_mouseover_show").css({
          'position':'fixed',
          'pointer-events':'none',
          'max-width':(window['wh']['width']*80/100)+'px',
          'max-height': (window['wh']['height']*80/100)+'px',
          'height': (window['wh']['height']*80/100)+'px',           
          'background-color':'#dcdcdc',
          'box-shadow': '1px 1px 10px rgba(0,0,0,0.5)',
          'z-index':time()*100,
          'opacity': 1,
          'padding':'15px',      
          'display':'none',                
          'top': (window['wh']['height'] - window['wh']['height']*70/100)+'px'
        });
      }       
    }
    else
    { 
      //???????????????
      if(parseInt(str_replace("px","",$(this).css('width'))) > parseInt(str_replace("px","",$(this).css('height'))) )
      {
        console.log('ww3???????????????-??????');
        $("#show_pic_div_img_mouseover_show").css({
          'position':'fixed',
          'pointer-events':'none',
          'max-width':(window['wh']['width']*80/100)+'px',
          'max-height': (window['wh']['height']*80/100)+'px',
          'height': (window['wh']['height']*80/100)+'px',           
          'background-color':'#dcdcdc',
          'box-shadow': '1px 1px 10px rgba(0,0,0,0.5)',
          'z-index':time()*100,
          'opacity': 1,
          'padding':'15px',      
          'display':'none',                
          'top': (window['wh']['height'] - window['wh']['height']*70/100)+'px'
        });
      }
      else
      {
        console.log('ww4???????????????-??????');
        $("#show_pic_div_img_mouseover_show").css({
          'position':'fixed',
          'pointer-events':'none',   
          'max-width':(window['wh']['width']*80/100)+'px',
          'max-height': (window['wh']['height']*80/100)+'px',                    
          'background-color':'#dcdcdc',
          'box-shadow': '1px 1px 10px rgba(0,0,0,0.5)',
          'z-index':time()*100,
          'opacity': 1,
          'padding':'15px',      
          'display':'none'            
        });
      }
      
    }                
    //$("#show_pic_div").center();
    //$("#show_pic_div").corner();
    var show_url = ($(this).attr('bsrc')!=null)?$(this).attr('bsrc'):$(this).attr('src');
    
    $("#show_pic_div_img_mouseover_show").html("<img src=\""+show_url+"\" onLoad=\"$('#show_pic_div_img_mouseover_show').center();\" style='pointer-events: none;width:100%;height:100%;'>");    
    $("#show_pic_div_img_mouseover_show").stop().fadeIn();
    $("#show_pic_div_img_mouseover_show").center();        
    return true;
  });   
}                 
function checkbox_multiselect_init(dom)
{    
  // ??? checkbox ?????? shift ????????????
  // Author : ??????
  // Version : 1.0
  // Release date: 2021-01-05 16:20
  dom.data('last_click',-1);
  dom.data('which_down',false);  
  $(window).bind("keydown",{dom:dom},function(e){    
    dom.data('which_down',(e.which==16));    
  });
  $(window).bind("keyup",{dom:dom},function(e){
    if(e.which==16)
    {
      dom.data('which_down',false);
    }
  });
  $(dom).bind("mousedown",{dom:dom},function(){    
    dom.data('target_prop',$(this).prop("checked")); 
  });
  $(dom).closest("label").bind("mouseup",{dom:dom},function(e){
    dom.data('target_prop',$(this).find("input[type='checkbox']").prop("checked")); 
  });
//   $(dom).closest("label").bind("mouseup",{dom:dom},function(e){
//     
//     $(dom).data("label_click",true);
//     
//     var index = $(dom).closest("label").index(this);  
//     var tf = dom.eq(index).prop("checked");
//              
//     if(dom.data('last_click')!=-1 && dom.data('which_down') )
//     {
//       var ss = 0;
//       var ee = 0;
//       var is_reverse = false;
//       if(index <= dom.data('last_click'))
//       {
//         ss = index;
//         ee = dom.data('last_click'); 
//         is_reverse = true;
//       }
//       else
//       {
//         ss = dom.data('last_click');
//         ee = index ;        
//       }
//       for(var i = ss; i <= ee ; i++ )
//       {          
//         dom.eq(i).prop("checked",!tf);
//       }
//       //??????URL??????
//       var userAgent = navigator.userAgent.toLowerCase();
//       var is_opera = userAgent.indexOf('opera') != -1;    
//       var is_moz = userAgent.indexOf('firefox') != -1;
//       var is_chrome = userAgent.indexOf('chrome') != -1;
//       var is_safari = userAgent.indexOf('safari') != -1;
//       var is_ie = (userAgent.indexOf('msie') != -1 || userAgent.indexOf('rv:11') != -1) && !is_moz && !is_opera && !is_chrome && !is_safari;
//       
//       if( ( is_ie || is_chrome || is_moz ) && is_reverse == false)
//       {           
//         dom.eq(ee).prop("checked",tf);
//       }    
//       if( is_reverse == true)
//       { 
//         dom.eq(ss).prop("checked",tf);      
//         dom.eq(ee).prop("checked",!tf);        
//       }                         
//     }      
//     dom.data('last_click',index);  
//   });
  
  $(dom).bind("change",{dom:dom},function(){        
    var index = dom.index(this); 
    var tf = dom.data("target_prop");       
    //var label_click = ($(dom).data("label_click")==true)?true:false;
    if(dom.data('last_click')!=-1 && dom.data('which_down') )
    {
      var ss = 0;
      var ee = 0;
      //var is_reverse = false;
      if(index <= dom.data('last_click'))
      {
        ss = index;
        ee = dom.data('last_click');  
        //is_reverse = true;       
      }
      else
      {
        ss = dom.data('last_click');
        ee = index;       
      }
      //console.log("ss:"+ss);
      //console.log("ee:"+ee);
      //console.log("tf:"+dom.data("target_prop"));
      for(var i = ss; i <= ee ; i++ )
      {          
        dom.eq(i).prop("checked",!tf);
      }
      //??????URL??????
//       var userAgent = navigator.userAgent.toLowerCase();
//       var is_opera = userAgent.indexOf('opera') != -1;    
//       var is_moz = userAgent.indexOf('firefox') != -1;
//       var is_chrome = userAgent.indexOf('chrome') != -1;
//       var is_safari = userAgent.indexOf('safari') != -1;
//       var is_ie = (userAgent.indexOf('msie') != -1 || userAgent.indexOf('rv:11') != -1) && !is_moz && !is_opera && !is_chrome && !is_safari;

      //console.log(userAgent);
//       if( ( is_ie || is_chrome || is_moz ) && is_reverse == false)
//       {                
//         dom.eq(ee).prop("checked",tf);
//       }
//       if( is_reverse == true)
//       { 
//         dom.eq(ss).prop("checked",tf);      
//         dom.eq(ee).prop("checked",!tf);
//       }   
    }      
    dom.data('last_click',index);      	
  });
}
function my_gc(obj) {
  for(prop in obj) {
    if (typeof obj[prop] === 'array'){
      my_gc(obj[prop]);
    }
    else
    {
      obj[prop]=null;
      delete obj[prop];
    }
  }
  obj = null;
  delete obj;
}
function getGET() {
    var output = new Object();
    output['hash'] = location.hash;  
    var _m = location.href.replace(output['hash'],'').split('?');
    _m.shift();
    var pa = _m.join('?');       
    if (pa == "") return output;
    var map = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'" };
    pa = pa.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) { return map[m]; });    
    var mpa = pa.split("&");
    for (var k=0,max_k=mpa.length;k<max_k;k++) {
        //console.log(mpa[k]);
        var d = mpa[k].split("=");
        output[d[0]] = decodeURIComponent(d[1]);
    }
    return output;
}
/*
function getGET(){
  var output = new Object();
  //alert(location.href);
  if(!is_string_like(location.href,"%?%"))
  {
    return new Object();
  }
  var a = parse_url(location.href);  
  parse_str(a['query'],output);
  return output;
  //???????????? null
}
*/
//???????????????
//???????????? typewriter_run(dom,word,speed)
// dom jquery ???????????? $("#a")
// word ????????????????????? ???  ["??????","????????????"]
// speed ????????????????????????ms  
function typewriter_run(dom,word,speed)
{
  if(typeof(window['typewriterObj'])=="undefined")
  {
    window['typewriterObj'] = new Object();
  }   
  var t = Math.round((new Date()).getTime() / 1000) + "_" + Math.floor((my_fix_random() * 9000000) + 1).toString();
  window['typewriterObj']['task_'+t]=new Object();
  window['typewriterObj']['task_'+t]['dom']=dom[0];
  if($.isArray(word))
  {
    window['typewriterObj']['task_'+t]['aText'] = word;
  }
  else
  {
    window['typewriterObj']['task_'+t]['aText'] = new Array(
      word
    //"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
    );
  }
  window['typewriterObj']['task_'+t]['iSpeed'] = speed; // ?????????????????? ?????? 300
  window['typewriterObj']['task_'+t]['iIndex'] = 0; // start printing array at this posision  
  window['typewriterObj']['task_'+t]['iScrollAt'] = 20; // start scrolling up at this many lines
   
  window['typewriterObj']['task_'+t]['iTextPos'] = 0; // initialise text position
  window['typewriterObj']['task_'+t]['sContents'] = ''; // initialise contents variable
  window['typewriterObj']['task_'+t]['iRow']; // initialise current row
  if(count( window['typewriterObj']['task_'+t]['aText'] ) >0)
  {
    window['typewriterObj']['task_'+t]['iArrLength'] = window['typewriterObj']['task_'+t]['aText'][0].length; 
    // the length of the text array
    //????????????dom???????????????????????????setTimeout clean???
    for(var task in window['typewriterObj'])
    {
      if(dom[0] == window['typewriterObj'][task]['dom'] && "task_"+t != task)
      {        
        clearTimeout(window['typewriterObj'][task]['TIMEOUT']);        
      }
    }
    typewriter(t,dom);
  }
}
 
function typewriter(t,dom)
{
  window['typewriterObj']['task_'+t]['sContents'] = '';
  window['typewriterObj']['task_'+t]['iRow'] = Math.max(0, window['typewriterObj']['task_'+t]['iIndex']-window['typewriterObj']['task_'+t]['iScrollAt']);
  var destination = dom;  
  while ( window['typewriterObj']['task_'+t]['iRow'] < window['typewriterObj']['task_'+t]['iIndex'] ) {
    window['typewriterObj']['task_'+t]['sContents'] += window['typewriterObj']['task_'+t]['aText'][window['typewriterObj']['task_'+t]['iRow']++] + '<br />';
  }
  destination.html(window['typewriterObj']['task_'+t]['sContents'] + window['typewriterObj']['task_'+t]['aText'][window['typewriterObj']['task_'+t]['iIndex']].substring(0, window['typewriterObj']['task_'+t]['iTextPos']));
  if ( window['typewriterObj']['task_'+t]['iTextPos']++ == window['typewriterObj']['task_'+t]['iArrLength'] ) 
  {
    window['typewriterObj']['task_'+t]['iTextPos'] = 0;
    window['typewriterObj']['task_'+t]['iIndex']++;
    
    //console.log(window['typewriterObj']['task_'+t]['iIndex']);
    //console.log(window['typewriterObj']['task_'+t]['aText'].length);
    if ( window['typewriterObj']['task_'+t]['iIndex'] != window['typewriterObj']['task_'+t]['aText'].length ) {
      window['typewriterObj']['task_'+t]['iArrLength'] = window['typewriterObj']['task_'+t]['aText'][window['typewriterObj']['task_'+t]['iIndex']].length-1;
      //run over ?
      //console.log("Final...task_"+t);
      
      window['typewriterObj']['task_'+t]['TIMEOUT']=setTimeout(function(){
        typewriter(t,dom)
      }, window['typewriterObj']['task_'+t]['iSpeed']);          
    }
    else
    {
      //?????????????????????
      console.log("Over task_"+t);
      //my_gc(window['typewriterObj']['task_'+t]);
      delete window['typewriterObj']['task_'+t];  
    }
  } else {
   
    window['typewriterObj']['task_'+t]['TIMEOUT']=setTimeout(function(){
       typewriter(t,dom)
    }, window['typewriterObj']['task_'+t]['iSpeed']);
    
  }
}
function getRadioValue(radio_name)
{
  var dom = $("*[name='"+radio_name+"']");
  for(var i=0,max_i=dom.length;i<max_i;i++)
  {
    if(dom.eq(i).prop("checked")==true)
    {
      return dom.eq(i).val();
    }
  }
  return "";
}
function getWindowRelativeOffset(elem) {
  var offset = {
      left : 0,
      top : 0
  };
  // relative to the target field's document
  offset.left = elem.getBoundingClientRect().left;
  offset.top = elem.getBoundingClientRect().top;
  

  return offset;
};
function select2combobox(dom)
{
  // ????????? select ????????? combobox
  // Author : ??????
  // Version : 1.1
  // Release date: 2021-01-05 15:02
  if(dom.length!=1)
  {
    for(var i=0;i<dom.length;i++)
    {
      select2combobox(dom.eq(i));
    }
    return;
  }
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
  
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
  jQuery.fn.extend({
      getMaxZ : function(){
          return Math.max.apply(null, jQuery(this).map(function(){
              var z;
              return isNaN(z = parseInt(jQuery(this).css("z-index"), 10)) ? 0 : z;
          }));
      }
  });
  /*alert(dom.width());      
  var w = dom[0].offsetWidth;
  var h = dom[0].offsetHeight;
  alert(w);
  alert(h);*/
  var w = dom.width();
  var h = dom.height();
 
  
  dom.css({
    'display':'none'
  });
  if(typeof(window['select2combobox_step'])=="undefined")
  {
    window['select2combobox_step']=0;
  }
  var option_counts = dom.find("option").length;
  var max_h_size = (option_counts>=10)?10:option_counts; 
  var _t = new Date().getTime();
  _t = _t + "_" + window['select2combobox_step'];
  
  var i_html = " \
<div reqc='div_"+_t+"' style='position:relatiev;'> \
<input type='text' reqc='input_"+_t+"'><br> \
<select reqc='select_"+_t+"'>"+dom.html()+"</select> \
</div>";       
  dom.before(i_html);  
  $("div[reqc='div_"+_t+"']").css({                
    'width':w+'px',
    'min-width':w+'px',
    'height':h+'px',
    'min-width':h+'px',    
    'display':'inline-block',        
    'vertical-align':'top',
    'z-index':parseInt((new Date().getTime()/1000))
  });      
  var o = $("div[reqc='div_"+_t+"']").offset();
  $("div[reqc='div_"+_t+"']").css({
    'position':'static'
  });
      
  $("input[type='text'][reqc='input_"+_t+"']").css({
    //'position':'relative',
    'width':w+'px',
    'height':h+'px',
    'z-index':parseInt((new Date().getTime()/1000))
  });
  $("select[reqc='select_"+_t+"']").css({    
    'position':'relative',
    'width':w+'px',
    'max-height':((h+1)*max_h_size)+'px',
    //'left': (($("input[type='text'][reqc='input_"+_t+"']")[0].offsetLeft)-w/2)+'px',
    //'top': ($("input[type='text'][reqc='input_"+_t+"']")[0].offsetTop+h)+'px',
    'display':'none',
    'z-index':parseInt((new Date().getTime()/1000))    
  });
  $("div[reqc='div_"+_t+"']").unbind("click").click(function(event){
    event.stopPropagation();
  });
  $("select[reqc='select_"+_t+"']").attr('size',max_h_size);
  $("input[type='text'][reqc='input_"+_t+"']").unbind("focus").focus({dom:dom,_t:_t},function(event){                 
    //$("div[reqc='div_"+event.data._t+"']").css({
      //'position':'static',      
      //'z-index':(new Date().getTime()/1000)
    //});
    var max_z = $("select[reqc^='select_']").getMaxZ();
    //alert(max_z);
    $("input[reqc='input_"+event.data._t+"']").css({      
      'position':'relative',
      'z-index': (max_z+1)
    });
    $("select[reqc='select_"+event.data._t+"']").css({
      'display':'block',
      'z-index': (max_z+1)
    });   
    
    $("select[reqc='select_"+event.data._t+"']").html(event.data.dom.html());
    $("select[reqc='select_"+event.data._t+"']").val($(this).val());
    //$("select[reqc='select_"+event.data._t+"'] option").show();
    event.stopPropagation();        
  });
  $("input[type='text'][reqc='input_"+_t+"']").unbind("keydown").keydown({_t:_t},function(event){
    if(event.which==13)
    {
      $("select[reqc='select_"+event.data._t+"']").css('display','none'); 
      $("input[type='text'][reqc='input_"+event.data._t+"']").blur();
      return false;
    }
  });
  $("select[reqc='select_"+_t+"']").unbind("change").change({dom:dom,_t:_t},function(event){
    var val = $(this).val();        
    var so = $("select[reqc='select_"+event.data._t+"'] option[value='"+val+"']").text();        
    $("sinput[type='text'][reqc='input_"+event.data._t+"']").val(so);    
  });
  
  $("input[type='text'][reqc='input_"+_t+"']").unbind("keyup").keyup({dom:dom,_t:_t},function(event){
    var index = $("select[reqc='select_"+event.data._t+"']").prop('selectedIndex');
    //console.log("index:"+index);   
    //console.log(event.which);        
    switch(event.which)
    {
      case 27: //esc        
      case 13: //enter
      //case 32: //space
        $("select[reqc='select_"+event.data._t+"']").hide();
        $("input[type='text'][reqc='input_"+event.data._t+"']").blur();        
        return false;          
        break;
      case 38: //up
        //index--;        
        var find = false;
        for(var i=index-1;i>=0;i--)
        {
          //if($("select[reqc='select_"+event.data._t+"'] option").eq(i).is(":visible") == true)
          {
            find=true;
            index = i;
            break;
          }
        }
        if(find==false)
        {
          for(var i=$("select[reqc='select_"+event.data._t+"'] option").length-1;i>=0;i--)
          {
            //if($("select[reqc='select_"+event.data._t+"'] option").eq(i).is(":visible") == true)
            {
              find = true;
              index = i;
              break;
            } 
          }
        }
          
        $("select[reqc='select_"+event.data._t+"'] option").eq(index).prop("selected",true);
        $("input[type='text'][reqc='input_"+event.data._t+"']").val( $("select[reqc='select_"+event.data._t+"'] option").eq(index).text() );
        event.data.dom.val($("select[reqc='select_"+event.data._t+"'] option").eq(index).val());
        event.data.dom.trigger("change");
        return;          
        break;
      case 40: //down
        var find = false;
        for(var i=index+1;i<$("select[reqc='select_"+event.data._t+"'] option").length;i++)
        {
          //if($("select[reqc='select_"+event.data._t+"'] option").eq(i).is(":visible") == true)
          {
            find = true;
            index = i;
            break;
          }
        }
        if(find==false)
        {
          for(var i=0;i<$("select[reqc='select_"+event.data._t+"'] option").length;i++)
          {            
            //if($("select[reqc='select_"+event.data._t+"'] option").eq(i).is(":visible") == true)
            {
              find = true;
              index = i;
              break;
            } 
          }
        }
        $("select[reqc='select_"+event.data._t+"'] option").eq(index).prop("selected",true);
        $("input[type='text'][reqc='input_"+event.data._t+"']").val( $("select[reqc='select_"+event.data._t+"'] option").eq(index).text() );
        event.data.dom.val($("select[reqc='select_"+event.data._t+"'] option").eq(index).val());
        event.data.dom.trigger("change");
        return;       
        break;
    }
    var val = $(this).val();
    $("select[reqc='select_"+event.data._t+"']").html(event.data.dom.html());
    var so = $("select[reqc='select_"+event.data._t+"'] option");    
    if(val!="")
    {             
      //so.hide();
      for(var i=0,max_i=so.length;i<max_i;i++)
      {
        //console.log( so.eq(i).val() +" ... "+val);
        //console.log( so.eq(i).text() +" ... "+val);
        if(!so.eq(i).text().includes(val)) //!so.eq(i).val().includes(val) &&
        {
          so.eq(i).remove();
        }
      }
    }
    else
    {
      //so.show();
    }
  });
  
  /*
  $("select[reqc='select_"+_t+"']").unbind("focus");
  $("select[reqc='select_"+_t+"']").focus({dom:dom},function(event){
    $(this).css('display','inline-block');
  });
  */
  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroid = userAgent.indexOf("android") > -1;
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  var select_event = "click";
  if(isAndroid || isIOS)
  {
    select_event="change";
  }
  $("select[reqc='select_"+_t+"']").unbind(select_event).bind(select_event,{select_event:select_event,dom:dom,_t:_t},function(event){
    event.data.dom.val($(this).val());
    $("input[type='text'][reqc='input_"+event.data._t+"']").val( $(this).find("option[value='"+$(this).val()+"']").text() );
    $(this).css('display','none');
    event.data.dom.trigger("change");
    event.stopPropagation();
  });
  $("select[reqc='select_"+_t+"']").bind("click",function(event){
    event.stopPropagation();
  });
  $("select[reqc='select_"+_t+"']").blur(function(){  
    $(this).hide();
  });
  $("body").bind("click",{_t:_t},function(event){
    $("select[reqc='select_"+event.data._t+"']").hide();
  });
  window['select2combobox_step']++;
  $("input[type='text'][reqc='input_"+_t+"']").click(function(event){
    event.stopPropagation();
  });
  //preset
  $("input[type='text'][reqc='input_"+_t+"']").val(  dom.find("option[value='"+dom.val()+"']").text()  );
  $("select[reqc='select_"+_t+"']").val(dom.val());
  /*
  var val = $("input[type='text'][reqc='input_"+_t+"']").val();
  //$("select[reqc='select_"+_t+"']").html(event.data.dom.html());
  var so = $("select[reqc='select_"+_t+"'] option");    
  if(val!="")
  {             
    //so.hide();
    for(var i=0,max_i=so.length;i<max_i;i++)
    {        
      if(so.eq(i).text()==val) 
      {
        $("select[reqc='select_"+_t+"']").val(so.eq(i).val());
      }
    }
  }
  */
  
  return _t; 
}    
//????????????
function select2multichoiceUI_KIND(dom,pre_id,sp_class,isMultiple,cssobj){
    if(typeof(isMultiple)=='undefined' || isMultiple=='')
    {
      isMultiple=false;
    }
    if(typeof(cssobj)=='undefined' || cssobj =='')
    {
      cssobj=new Object();
      cssobj["PRE_CSS"]= new Object();
      cssobj["BLOCK_CSS"]= new Object();
    }
    else
	{
    	if(typeof(cssobj["PRE_CSS"])=="undefined"){
    		cssobj["PRE_CSS"]=new Object();
    	}
    	if(typeof(cssobj["BLOCK_CSS"])=="undefined"){
    		cssobj["BLOCK_CSS"]=new Object();
    	}
	}
    if(typeof(window['select2multichoiceUI_step'])=="undefined")
    {
      window['select2multichoiceUI_step']=0;
    }
    var id = pre_id+"_select2multichoiceUI_step_"+window['select2multichoiceUI_step'];
    $("*[id^='"+pre_id+"_']").remove();
    var tmp = sprintf("<span class='%s' id='%s' req='%s'>%s</span>",sp_class,id,dom.val(),dom.find("option[value='"+dom.val()+"']").html());
    dom.after(tmp); //after
    dom.hide();
    
    //pre css
    $("#"+id).css({
      'border':'1px solid #fff',
      'width':'80%',
      'height':'85%'
    })
    //?????? css
    for(var o in cssobj['PRE_CSS'])
    {
      $("#"+id).css(o,cssobj['PRE_CSS'][o]);
    } 
    $("#"+id).unbind("click").click(function(){    	
					    	
    	dialogMyBoxOn("?????????...",false,function(){
			setTimeout(function(){
					    	
					    	
					      window['wh']=getWindowSize();
					      $("#select2multichoiceUI_BG").remove();
					      if($("#select2multichoiceUI_BG").length==0)
					      {
					        $("body").append("<div id='select2multichoiceUI_BG'></div>");        
					      }          
					      $("#select2multichoiceUI_BG").css({
					        'width':(window['wh']['width']*75/100)+'px',
					        'height':(window['wh']['height']*90/100)+'px',
					        'z-index':new Date().getTime(),
					        'padding':'5px',
					        'background-color':'orange',
					        'border':'1px solid #0ff', 
					        'color':'black',
					        'overflow-y':'auto'        
					      });            
					      //?????? css
					      for(var o in cssobj['BLOCK_CSS'])
					      {
					        $("#select2multichoiceUI_BG").css(o,cssobj['BLOCK_CSS'][o]);
					      }  
					            
					      $("#select2multichoiceUI_BG").center();      
					      //????????????
					      //????????????????????????
					      var data = new Object();      
					      var dl = dom.find("option");
					      for(var i=0,max_i=dl.length;i<max_i;i++)
					      {        
					    	var mf = explode("???",dl.eq(i).text());
					        //var f = substr(dl.eq(i).text(),0,1);
					    	var f = mf[0];
					        if(f=='') continue;
					        //if(dl.eq(i).text()=='--?????????--') continue;
					        	
					        var ks = new Array();
					        for(var k in data) {
					        	array_push(ks,k);
					        }
					        if(!in_array(f, ks))
					        {          
					          data[f]=new Object();
					          data[f]['DATA']=new Array();
					          data[f]['SHOW_DATA']=new Array();          
					        }
					        array_push(data[f]['DATA'],dl.eq(i).val());
					        array_push(data[f]['SHOW_DATA'],end(mf));
					      }
					      //alert(print_r(data,true));
					      var tmp = "";
					      //??? X
					      tmp+="<div class='select2multichoiceUI_CLOSE'></div>";
					      for(var k in data)
					      {
					    	tmp+="<div class='select2multichoiceUI_ALL' ";
					    	if(data[k]['SHOW_DATA'][0]=='--?????????--')
							{
					    		tmp+="style='display:none;'>";
							}
					    	else
							{
					    		tmp+=">";
							}
					        tmp+="<div class='select2multichoiceUI_LEFT_SPAN'>?????????"+k+"</div>";
					        tmp+="<div class='select2multichoiceUI_DATA_DIV'>";
					                          
                  for(var i=0,max_i=count(data[k]['DATA']);i<max_i;i++)
					        {
					          //??????
					          tmp+=sprintf("<div class='select2multichoiceUI_RIGHT_div' req='%s'>%s</div> ",data[k]['DATA'][i],data[k]['SHOW_DATA'][i]);
					        }
					        tmp+="</div>";
					        tmp+="<hr>";     
					        tmp+="</div>";// ALL
					      }
					      //tmp = substr(tmp,0,-4);
					      $("#select2multichoiceUI_BG").html(tmp);
					      //xx
					      $(".select2multichoiceUI_CLOSE").css({
					        'position':'fixed',
					        'right':'9%',
					        'top':'2%',
					        'border':'0px solid #000',
					        'width':(85*window['whrw'])+'px',
					        'height':(85*window['whrh'])+'px',
					        'line-height':(60*window['whrh'])+'px',
					        'font-weight':'bold',
					        'font-size':window['font_24px'],
					        'padding-top':(5*window['whrh'])+'px',
					        'padding-bottom':(5*window['whrh'])+'px',
					        'padding-left':(5*window['whrw'])+'px',
					        'padding-right':(5*window['whrw'])+'px',
					        'text-align':'center',
					        'background-image':"url('images/main/x_close.png')",
					        'background-repeat':'no-repeat',
					        'background-size':'100% 100%'
					      });
					      $(".select2multichoiceUI_CLOSE").unbind("click").click(function(){
					        $("#select2multichoiceUI_BG").remove();
					      });
					      $(".select2multichoiceUI_DATA_DIV").css({
					        'text-align':'left',
					        'width':'98%',
					        'word-wrap':'break-word',
					        'white-space':'pre-wrap',        
					        'line-height':'50px'
					      });
					      $(".select2multichoiceUI_LEFT_SPAN").css({
					        'margin-bottom':'5px',
					        'font-weight':'bold'
					      });    
					      $(".select2multichoiceUI_RIGHT_div").css({
					        'display':'inline',
					        'border':'1px solid #000',
					        'background-color':'#fff',
					        'padding':'5px',
					        'margin-right':'5px',
					        'margin-top':'15px',
					        'cursor':'pointer',
					        'white-space':'nowrap'        
					      });
					      switch(isMultiple)
					      {
					        case true:
					          //????????????          
					          break;
					        case false:
					          //????????????
					          $(".select2multichoiceUI_RIGHT_div").unbind("click").bind("click",{id:id,dom:dom},function(event){        	
					            //???????????????
					            //alert($(this).attr('req'));
					        	$("#select2multichoiceUI_BG").hide();
					        	
					        		
					        	
					        	event.data.dom.val($(this).attr('req'));
					            $("#"+event.data.id).html($(this).html());
					            $("#"+event.data.id).attr('req',$(this).attr('req'));            
					            $("#select2multichoiceUI_BG").remove();
					            setTimeout(function(){
					            	event.data.dom.trigger('change');
					            },300);
					          });
					          break;
					      }
					      
					      
					      dialogMyBoxOff();
			},300);
    	});
    });
    window['select2multichoiceUI_step']++; 
  }
function fb_date($datetime)
{
  //?????? facebook?????????????????????
  //???????????????????????? 2011-01-19 04:12:12 
  //???????????? facebook ??????????????????????????????????????????
  $week_array=new Array('?????????','?????????','?????????','?????????','?????????','?????????','?????????');
  $timestamp=strtotime($datetime);
  $distance=(time()-$timestamp);
  if($distance < 60)
  {
    return sprintf("%d %s",$distance,("??????")); 
  }
  else if($distance>=60 && $distance<60*60)
  {
    return sprintf("%d %s",floor($distance/60),("?????????"));
  }
  else if($distance>=60*60 && $distance<60*60*24)
  {      
    return sprintf("%d %s",floor($distance/60/60),("?????????"));
  }
  else if($distance>=60*60*24 && $distance<60*60*24*7)
  {      
    return sprintf("%s %s",($week_array[ (date('N',$timestamp) -1) ]),date('H:i',$timestamp));
  }
  else
  {      
    return sprintf("%s",date("Y/m/d H:i",$timestamp));
  }
}
function init_wagtail_cursor()
{
  if(window['no_init_wagtail_cursor']!=null) return;
  //window['g']['cursor']
  if(is_ie) 
  {
    document.body.style.cursor = 'url(/pic/wagtail/wagtail.ani),auto';
  }
  else
  {
    if(window['g']==null || window['g']['body_cursor']==null)
    {
      console.log("?????????????????????");
      return;
    }
    (function myWagtailLoop (_i) {          
     setTimeout(function () {   
        //$("html").css('cursor',"url('"+_imgs[i]+"')");       //  your code here
        document.body.style.cursor = 'url('+window['g']['body_cursor'][_i-1]+') 0 0,auto';
        //console.log(window['g']['body_cursor'][_i-1]);                
        if (--_i) 
        {
          myWagtailLoop(_i);      //  decrement i and call myLoop again if i > 0
        }
        else
        {
          myWagtailLoop(window['g']['body_cursor'].length-1);
        }
     }, 100)
    })(window['g']['body_cursor'].length);
  }   
}
function random_pwd($how_many_words)
{
  //??????????????????
  $pwd_words="abcdefghijklmnpqrstuvwxyz123456789";//??????o???0
  $words="";
  for($i=0;$i<$how_many_words;$i++)
  {
    $words+=substr($pwd_words,rand(0,strlen($pwd_words)-1),1);
  }
  return $words;
} 
function random_console(){
  console['\x63\x6c\x65\x61\x72']();console['\x6c\x6f\x67']("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");setTimeout(function(){random_console()},100);
}
function array_copy(array)
{
  return array.slice();
}
//?????????????????????
function array_sort(arr, field, order)
{
  var array = arr.slice();
  //order = ='SORT_DESC'
  if(order==null)
  {
    order = 'ASC';
  }
  //From : https://davidwalsh.name/array-sort
  return array.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    switch(order)
    {
        case 'ASC':
        case 'SORT_ASC':
          if(!isNaN(obj1[field]) && !isNaN(obj2[field]) )
          {
       	    return obj1[field]- obj2[field];
          }
          else
          {
            return obj1[field].replace("???","1").replace("???","2").replace("???","3").replace("???","4").replace("???","5").replace("???","6").replace("???","7").replace("???","8").replace("???","9").localeCompare(obj2[field].replace("???","1").replace("???","2").replace("???","3").replace("???","4").replace("???","5").replace("???","6").replace("???","7").replace("???","8").replace("???","9"), "zh-Hant"); 
          }
          break;
        case 'DESC':
        case 'SORT_DESC':
          if(!isNaN(obj1[field]) && !isNaN(obj2[field]) )
          {
            return obj2[field]-obj1[field];
          }
          else
          {
            return obj2[field].replace("???","1").replace("???","2").replace("???","3").replace("???","4").replace("???","5").replace("???","6").replace("???","7").replace("???","8").replace("???","9").localeCompare(obj1[field].replace("???","1").replace("???","2").replace("???","3").replace("???","4").replace("???","5").replace("???","6").replace("???","7").replace("???","8").replace("???","9"), "zh-Hant"); 
          }
          break; 
    }
  });
}
/*
  * Calculates the angle ABC (return deg) 
  * ????????????????????????
  * A first point, ex: {x: 0, y: 0}
  * C second point
  * B center point
*/
function return_deg_from_three_points(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return ((Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))) * 180) / Math.PI;
}
/*
 * Calculates the angle ABC (return deg) 
 * ?????????0,0????????????
 * A first point, ex: {x: 0, y: 0}
 * C second point
 * B center point
*/
function return_deg_from_one_point(A)
{
  return Math.atan(A.y/A.x)  * 180 / Math.PI;
}
function my_focus_on_screen(x, y, func) {
    //?????????????????????
    $("div[reqc='focus_on_screen_div'] table").stop();
    $("div[reqc='focus_on_screen_div']").stop().remove();
    $("body").append("<div reqc='focus_on_screen_div' style='margin-left:auto;margin-right:auto;position:absolute;overflow:display;text-align:center;'>" +
        "<table border='0' cellpadding='0' cellspacing='0' style='margin-left:auto;margin-right:auto;border-collapse: collapse;width:100%;height:100%;'>" +
        "<tr>" +
        "<td width='33%' height='33%' style='border-width:3px 0px 0px 3px; border-style: solid;border-color:red;'></td>" +
        "<td width='33%' height='33%' style='border-width:0px 0px 0px 0px; border-style: solid;border-color:red;'></td>" +
        "<td width='33%' height='33%' style='border-width:3px 3px 0px 0px; border-style: solid;border-color:red;'></td>" +
        "</tr>" +
        "<tr>" +
        "<td width='33%' height='33%' style='border-width:0px 0px 0px 0px; border-style: solid;border-color:red;'></td>" +
        "<td width='33%' height='33%' style='border-width:0px 0px 0px 0px; border-style: solid;border-color:red;'></td>" +
        "<td width='33%' height='33%' style='border-width:0px 0px 0px 0px; border-style: solid;border-color:red;'></td>" +
        "</tr>" +
        "<tr>" +
        "<td width='33%' height='33%' style='border-width:0px 0px 3px 3px; border-style: solid;border-color:red;'></td>" +
        "<td width='33%' height='33%' style='border-width:0px 0px 0px 0px; border-style: solid;border-color:red;'></td>" +
        "<td width='33%' height='33%' style='border-width:0px 3px 3px 0px; border-style: solid;border-color:red;'></td>" +
        "</tr>" +
        "<tr>" +
        "<td></td><td></td><td></td>"+
        "</tr>"+
        "</table>" +
        "</div>");
    var size_from = 100;
    var size_to = 50;
    var size_step = 10;
    $("div[reqc='focus_on_screen_div']").css({
        'display': 'block',
        'width': size_from + 'px',
        'height': size_from + 'px',
        'left': x-(size_from/2) + 'px',
        'top': y-(size_from/2) + 'px',
        'z-index': 99999
    });
    $("div[reqc='focus_on_screen_div'] table").animate({
        opacity: 0.40,
        width: "-=30",
        height: "-=30"
    }, 2000, function () {
        // Animation complete.
        $("div[reqc='focus_on_screen_div']").remove();
        func();
    });
}
function isAllowChars(data,allowCharsString){
  if(typeof(data)!="string" || typeof(allowCharsString)!="string") {
    console.log("Error use allowCharsString, wrong input type, not string...");
    return false;
  }
  var m = allowCharsString.split("");
  for(var i=0,max_i=data.length;i<max_i;i++)
  {
    if( m.indexOf(data.charAt(i)) == -1 ) return false;
  }
  return true;
}
function my_table_sort( jq_table_dom,  isNeedArrow, options)
{
  // require : <script src="https://3wa.tw/inc/javascript/jquery/sort-table/sort-table.js"></script>
  //$(".thetable thead th[field='?????????']").addClass('js-sort-number');
  //$(".thetable thead th[field='?????????']").addClass('js-sort-number');
  //$(".thetable thead th[field='??????????????????']").addClass('js-sort-date');
  var fields = null;
  var func = null;
  if( typeof(options) == 'object')
  {
    fields = options.fields;
    func = options.func;
  }
  else
  {
    fields = options;
  }
  var arrow_up = {
     'margin-left':'6px',
     'border': 'solid black',
     'border-width': '0 3px 3px 0',
     'display': 'inline-block',
     'padding': '3px',
     'transform': 'rotate(-135deg)',
     '-webkit-transform': 'rotate(-135deg)'
  };
  var arrow_down = {
     'margin-left':'6px',
     'border': 'solid black',
     'border-width': '0 3px 3px 0',
     'display': 'inline-block',
     'padding': '3px',
     'transform': 'rotate(45deg)',
     '-webkit-transform': 'rotate(45deg)'
  };
  var m_fields = new Array();
  var th = new Array();
  if(typeof(isNeedArrow)=="undefined")
  {
     isNeedArrow = true;
  }
  if( typeof(fields) =="undefined")
  {
    //???????????????????????????
    if( isNeedArrow )
    {
       jq_table_dom.find("thead th").append("<i reqk=\"my_sort_i\"></i>");
       jq_table_dom.find("thead th").attr('my_sort_need_sort','Y');
       jq_table_dom.find("thead th").attr('my_sort_asc_desc','1');
    }
    else
    {
        jq_table_dom.find("thead th").attr('my_sort_need_sort','Y');
        jq_table_dom.find("thead th").attr('my_sort_asc_desc','1');        
    }
  }
  else
  {
    //??????????????????
    var m = fields.split(",");
    for(var k=0 , max_k = m.length ; k < max_k ; k++)
    {
      if(isNaN(m[k]))
      {
         if( isNeedArrow )
         {
           jq_table_dom.find("thead th[field='"+m[k]+"']").eq(0).append("<i reqk=\"my_sort_i\"></i>");
           jq_table_dom.find("thead th[field='"+m[k]+"']").eq(0).attr('my_sort_need_sort','Y');
           jq_table_dom.find("thead th[field='"+m[k]+"']").eq(0).attr('my_sort_asc_desc','1');
         }
         else
         {
           jq_table_dom.find("thead th[field='"+m[k]+"']").eq(0).attr('my_sort_need_sort','Y');
           jq_table_dom.find("thead th[field='"+m[k]+"']").eq(0).attr('my_sort_asc_desc','1');
         }
      }
      else
      {
        if( isNeedArrow )
        {
           jq_table_dom.find("thead th").eq( parseInt(m[k]) ).append("<i reqk=\"my_sort_i\"></i>");
           jq_table_dom.find("thead th").eq( parseInt(m[k]) ).attr('my_sort_need_sort','Y');
           jq_table_dom.find("thead th").eq( parseInt(m[k]) ).attr('my_sort_asc_desc','1');
        }
        else
        {
           jq_table_dom.find("thead th").eq( parseInt(m[k]) ).attr('my_sort_need_sort','Y');
           jq_table_dom.find("thead th").eq( parseInt(m[k]) ).attr('my_sort_asc_desc','1');
        }
      }
    }
  }
  //preset class
  jq_table_dom.find("thead th i[reqk='my_sort_i']").css( arrow_up );
  jq_table_dom.find("thead th").unbind("click").click({func:func },function(e){
    if($(this).attr('my_sort_need_sort')!='Y')
    {
       return;
    }
    var index =   jq_table_dom.find("thead th").index(this);
    var asc_desc = parseInt($(this).attr('my_sort_asc_desc'));

    switch(asc_desc)
    {
      case 1:
         $(this).attr('my_sort_asc_desc',-1);
         sortTable( jq_table_dom[0] , index ,-1);     

         if($(this).find("i[reqk='my_sort_i']").length!=0)
         {
            $(this).find("i[reqk='my_sort_i']").eq(0).css(arrow_down);
         }
         break;
      case -1:
         $(this).attr('my_sort_asc_desc',1);
         sortTable( jq_table_dom[0] , index ,1);
         if($(this).find("i[reqk='my_sort_i']").length!=0)
         {
            $(this).find("i[reqk='my_sort_i']").eq(0).css(arrow_up);
         }
         break;
    }
    if(e.data.func != null ) e.data.func();
  });  
}
 $(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 100);
});
function myMatrix(dom,obj)
{
   //myMatrix
   // Author: Mowd
   // Author: Feather Mountain (https://3wa.tw)
   //obj 
   // opacity: 0.5
  var data = "\x3C!-- Matrix Reloaded --\x3E\r\n\x3C!-- Author: Mowd --\x3E\r\n\x3Cdiv style=\"overflow:hidden;\"\x3E\r\n\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=12 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 0px\" width=\"1%\" height=\"100%\"\x3E\x3CFONT color=#78FF78\x3E486R?????????????R4?????????????????????????F?????????4F6E74C65S46486R?????????????R4?????????????????????????F?????????4F6E74C65S46486R?????????????R4?????????????????????????F?????????4F6E74C65S46\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=7 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00C300\x3E?????????????????????????????????3OLKP?????????????????????????????????3OLKP?????????????????????????????????3OLKP?????????????????????????????????3OLKP?????????????????????????????????3OLKP?????????????????????????????????3OLKP\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=10 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00FF00\x3E????????????????????F?????????4F6E74????????????????????F?????????4F6E74????????????????????F?????????4F6E74????????????????????F?????????4F6E74????????????????????F?????????4F6E74????????????????????F?????????4F6E74\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=11 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 6px\" width=\"1%\"\x3E\x3CFONT color=#3CFF3C\x3E???7t68y46e+f68e7????????????y46???????626837???7t68y46e+f68e7????????????y46???????626837???7t68y46e+f68e7????????????y46???????626837???7t68y46e+f68e7????????????y46???????626837???7t68y46e+f68e7????????????y46???????626837???7t68y46e+f68e7????????????y46???????626837\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=2 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E???????????????????????????6C54E89?????????????????????????T651CLKP??????????????????????????????6C54E89?????????????????????????T651CLKP??????????????????????????????6C54E89?????????????????????????T651CLKP??????????????????????????????6C54E89?????????????????????????T651CLKP??????????????????????????????6C54E89?????????????????????????T651CLKP???\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=5 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E?????????1D5????????]???????????????E4F6JCEK?????????1D5????????]???????????????E4F6JCEK?????????1D5????????]???????????????E4F6JCEK?????????1D5????????]???????????????E4F6JCEK?????????1D5????????]???????????????E4F6JCEK?????????1D5????????]???????????????E4F6JCEK\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=8 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3E??????????????????????????????1D5????????]?????????????????????????????????1D5????????]?????????????????????????????????1D5????????]?????????????????????????????????1D5????????]?????????????????????????????????1D5????????]?????????????????????????????????1D5????????]???\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00A500\x3E4f?????????????????????????????????????????4f?????????????????????????????????????????4f?????????????????????????????????????????4f?????????????????????????????????????????4f?????????????????????????????????????????4f?????????????????????????????????????????4f?????????????????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=3 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=##006900\x3E???DPK[3O67F4e7t646v5??????754Y874???DPK[3O67F4e7t646v5??????754Y874???DPK[3O67F4e7t646v5??????754Y874???DPK[3O67F4e7t646v5??????754Y874???DPK[3O67F4e7t646v5??????754Y874???DPK[3O67F4e7t646v5??????754Y874\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=2 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E???????OD??????7t68y46e+f68e7????????????y???????OD??????7t68y46e+f68e7????????????y???????OD??????7t68y46e+f68e7????????????y???????OD??????7t68y46e+f68e7????????????y???????OD??????7t68y46e+f68e7????????????y???????OD??????7t68y46e+f68e7????????????y\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=11 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 6px\" width=\"1%\"\x3E\x3CFONT color=#3CFF3C\x3E68e4f?????????????????????????????????????????????????????????????68e4f?????????????????????????????????????????????????????????????68e4f?????????????????????????????????????????????????????????????68e4f?????????????????????????????????????????????????????????????68e4f?????????????????????????????????????????????????????????????68e4f?????????????????????????????????????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=5 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E?????????????1D5????????]???????????????E4F6JCEKF[0?????????????1D5????????]???????????????E4F6JCEKF[0?????????????1D5????????]???????????????E4F6JCEKF[0?????????????1D5????????]???????????????E4F6JCEKF[0?????????????1D5????????]???????????????E4F6JCEKF[0?????????????1D5????????]???????????????E4F6JCEKF[0\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=4 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E???????????????????????????6C54E89???????????????????????????????????????????6C54E89???????????????????????????????????????????6C54E89???????????????????????????????????????????6C54E89???????????????????????????????????????????6C54E89???????????????????????????????????????????6C54E89????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00C000\x3E????????????????????????????????????1D5????????]???????????????????????????????????????1D5????????]???????????????????????????????????????1D5????????]???????????????????????????????????????1D5????????]???????????????????????????????????????1D5????????]???????????????????????????????????????1D5????????]???\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=7 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00C300\x3E???67g+4f6e7f64w647f897f9e87f68e4f???67g+4f6e7f64w647f897f9e87f68e4f???67g+4f6e7f64w647f897f9e87f68e4f???67g+4f6e7f64w647f897f9e87f68e4f???67g+4f6e7f64w647f897f9e87f68e4f???67g+4f6e7f64w647f897f9e87f68e4f\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=9 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3EFKEIR0???????????????????????????????FKEIR0???????????????????????????????FKEIR0???????????????????????????????FKEIR0???????????????????????????????FKEIR0???????????????????????????????FKEIR0???????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=7 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00C300\x3E????????????????????OD??????7t68y46e+f68e7?????????????????????????????OD??????7t68y46e+f68e7?????????????????????????????OD??????7t68y46e+f68e7?????????????????????????????OD??????7t68y46e+f68e7?????????????????????????????OD??????7t68y46e+f68e7?????????????????????????????OD??????7t68y46e+f68e7?????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=10 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 6px\" width=\"1%\"\x3E\x3CFONT color=#00FF00\x3E4e7t646v5??????754Y874464RE9R84e7t646v5??????754Y874464RE9R84e7t646v5??????754Y874464RE9R84e7t646v5??????754Y874464RE9R84e7t646v5??????754Y874464RE9R84e7t646v5??????754Y874464RE9R8\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=8 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3E????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=3 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3ER?????????????R4?????????????????????????FR?????????????R4?????????????????????????FR?????????????R4?????????????????????????FR?????????????R4?????????????????????????FR?????????????R4?????????????????????????FR?????????????R4?????????????????????????F\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=4 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E???????????????????????????OD??????7t68y???????????????????????????OD??????7t68y???????????????????????????OD??????7t68y???????????????????????????OD??????7t68y???????????????????????????OD??????7t68y???????????????????????????OD??????7t68y\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=2 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E???????????????3OLKPRL?????????4EC6???????????????3OLKPRL?????????4EC6???????????????3OLKPRL?????????4EC6???????????????3OLKPRL?????????4EC6???????????????3OLKPRL?????????4EC6???????????????3OLKPRL?????????4EC6\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00A500\x3E????????????????????F?????????4F6E7????????????????????F?????????4F6E7????????????????????F?????????4F6E7????????????????????F?????????4F6E7????????????????????F?????????4F6E7????????????????????F?????????4F6E7\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=8 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3E????????????E7e86g6e4f66f4w????????????????????????E7e86g6e4f66f4w????????????????????????E7e86g6e4f66f4w????????????????????????E7e86g6e4f66f4w????????????????????????E7e86g6e4f66f4w????????????????????????E7e86g6e4f66f4w????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=7 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00C300\x3E4f6e7f64w647f897f9e87f68e44f6e7f64w647f897f9e87f68e44f6e7f64w647f897f9e87f68e44f6e7f64w647f897f9e87f68e44f6e7f64w647f897f9e87f68e44f6e7f64w647f897f9e87f68e4\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=2 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E?????????????????????????????????DPK[????????????????????????????????????????????DPK[????????????????????????????????????????????DPK[????????????????????????????????????????????DPK[????????????????????????????????????????????DPK[????????????????????????????????????????????DPK[???????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=4 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E????1D5????????]???????????????E4F6JC????1D5????????]???????????????E4F6JC????1D5????????]???????????????E4F6JC????1D5????????]???????????????E4F6JC????1D5????????]???????????????E4F6JC????1D5????????]???????????????E4F6JC\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=3 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3EEKF[04ITOF644S????????????????????????????EKF[04ITOF644S????????????????????????????EKF[04ITOF644S????????????????????????????EKF[04ITOF644S????????????????????????????EKF[04ITOF644S????????????????????????????EKF[04ITOF644S????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=5 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E89?????????????????????????T651CLKP???89?????????????????????????T651CLKP???89?????????????????????????T651CLKP???89?????????????????????????T651CLKP???89?????????????????????????T651CLKP???89?????????????????????????T651CLKP???\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=14 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#8AFF78\x3E???????????????????????????????????3OLKPRL?????????4EC6486R????????????????????????????????????????3OLKPRL?????????4EC6486R????????????????????????????????????????3OLKPRL?????????4EC6486R????????????????????????????????????????3OLKPRL?????????4EC6486R????????????????????????????????????????3OLKPRL?????????4EC6486R?????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=2 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E???R4?????????????????????????F?????????4F6E7???R4?????????????????????????F?????????4F6E7???R4?????????????????????????F?????????4F6E7???R4?????????????????????????F?????????4F6E7???R4?????????????????????????F?????????4F6E7???R4?????????????????????????F?????????4F6E7\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=14 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#8AFF78\x3E??F?????????4F6E74C65S464H515??F?????????4F6E74C65S464H515??F?????????4F6E74C65S464H515??F?????????4F6E74C65S464H515??F?????????4F6E74C65S464H515??F?????????4F6E74C65S464H515\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=2 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E?????????????OD??????7t68y46e+f68e7?????????????OD??????7t68y46e+f68e7?????????????OD??????7t68y46e+f68e7?????????????OD??????7t68y46e+f68e7?????????????OD??????7t68y46e+f68e7?????????????OD??????7t68y46e+f68e7\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=9 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3E??????y46???????626837????????????DPK[3O??????y46???????626837????????????DPK[3O??????y46???????626837????????????DPK[3O??????y46???????626837????????????DPK[3O??????y46???????626837????????????DPK[3O??????y46???????626837????????????DPK[3O\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00A500\x3E???????OD??????7t68y46e+f???????OD??????7t68y46e+f???????OD??????7t68y46e+f???????OD??????7t68y46e+f???????OD??????7t68y46e+f???????OD??????7t68y46e+f\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=4 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E???y46???????626837????????????DPK[3???y46???????626837????????????DPK[3???y46???????626837????????????DPK[3???y46???????626837????????????DPK[3???y46???????626837????????????DPK[3???y46???????626837????????????DPK[3\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=8 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3E67F4e7t646v5??????754Y874464RE9R67F4e7t646v5??????754Y874464RE9R67F4e7t646v5??????754Y874464RE9R67F4e7t646v5??????754Y874464RE9R67F4e7t646v5??????754Y874464RE9R67F4e7t646v5??????754Y874464RE9R\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=3 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#006900\x3E39IMOFKEIR0??????????????????????????????????39IMOFKEIR0??????????????????????????????????39IMOFKEIR0??????????????????????????????????39IMOFKEIR0??????????????????????????????????39IMOFKEIR0??????????????????????????????????39IMOFKEIR0??????????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=11 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#3CFF3C\x3E??????????????????E7e86g6e4f66f4w????????????67g??????????????????E7e86g6e4f66f4w????????????67g??????????????????E7e86g6e4f66f4w????????????67g??????????????????E7e86g6e4f66f4w????????????67g??????????????????E7e86g6e4f66f4w????????????67g??????????????????E7e86g6e4f66f4w????????????67g\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=9 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00E100\x3E7g+4f6e7f64w647f897f9e87f68e4f???7g+4f6e7f64w647f897f9e87f68e4f???7g+4f6e7f64w647f897f9e87f68e4f???7g+4f6e7f64w647f897f9e87f68e4f???7g+4f6e7f64w647f897f9e87f68e4f???7g+4f6e7f64w647f897f9e87f68e4f???\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=12 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 0px\" width=\"1%\" height=\"100%\"\x3E\x3CFONT color=#78FF78\x3E????????????????????626837??????????????????????????????????????????????????626837??????????????????????????????????????????????????626837??????????????????????????????????????????????????626837??????????????????????????????????????????????????626837??????????????????????????????????????????????????626837??????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=11 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 6px\" width=\"1%\"\x3E\x3CFONT color=#3CFF3C\x3E????????????DPK[????????????????????????????????????????????????????DPK[????????????????????????????????????????????????????DPK[????????????????????????????????????????????????????DPK[????????????????????????????????????????????????????DPK[????????????????????????????????????????????????????DPK[????????????????????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00C000\x3E?????????1D5????????]???????????????E4F6JCEKF[04I?????????1D5????????]???????????????E4F6JCEKF[04I?????????1D5????????]???????????????E4F6JCEKF[04I?????????1D5????????]???????????????E4F6JCEKF[04I?????????1D5????????]???????????????E4F6JCEKF[04I?????????1D5????????]???????????????E4F6JCEKF[04I\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#00A500\x3ETOF644S????????????????????????????????6C54E89??TOF644S????????????????????????????????6C54E89??TOF644S????????????????????????????????6C54E89??TOF644S????????????????????????????????6C54E89??TOF644S????????????????????????????????6C54E89??TOF644S????????????????????????????????6C54E89??\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=5 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3E9?????????????????????????T651CLKP???9?????????????????????????T651CLKP???9?????????????????????????T651CLKP???9?????????????????????????T651CLKP???9?????????????????????????T651CLKP???9?????????????????????????T651CLKP???\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=14 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#8AFF78\x3E???????????????????????????????????3OLKPRL????????????????????????????????????????3OLKPRL????????????????????????????????????????3OLKPRL????????????????????????????????????????3OLKPRL????????????????????????????????????????3OLKPRL????????????????????????????????????????3OLKPRL?????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=10 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 6px\" width=\"1%\"\x3E\x3CFONT color=#00FF00\x3E????4EC6486R?????????????R4???????????????????????????4EC6486R?????????????R4???????????????????????????4EC6486R?????????????R4???????????????????????????4EC6486R?????????????R4???????????????????????????4EC6486R?????????????R4???????????????????????????4EC6486R?????????????R4???????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x26nbsp;\r\n\x3CMARQUEE direction=down height=\"100%\" scrollAmount=5 style=\"FONT-FAMILY:arial; FONT-SIZE: 10px; LETTER-SPACING: 3px\" width=\"1%\"\x3E\x3CFONT color=#008F00\x3EF6E74C65S464H5156?????????????????????????F6E74C65S464H5156?????????????????????????F6E74C65S464H5156?????????????????????????F6E74C65S464H5156?????????????????????????F6E74C65S464H5156?????????????????????????F6E74C65S464H5156?????????????????????????\x3C/FONT\x3E\x3C/MARQUEE\x3E\r\n\x3C/div\x3E\r\n";
  var n = "myMatrix_"+new Date().getTime();
  var w = dom.width();
  var h = dom.height();

  dom.prepend("<div reqc=\""+n+"\">"+data+"</div>");  
  $("div[reqc='"+n+"']").css({
    'position':'absolute',
    'z-index':0,
    'width':w+'px',
    'height':h+'px',
    'pointer-events':'none'   
   });
  $("div[reqc='"+n+"']").find("marquee").css({
    'height':h+'px',
    'max-height':h+'px',
    'overflow':'hidden',
    'display':'inline-block'
  });
  $("div[reqc='"+n+"']").find("div").css({'height':h+'px'});
  $("div[reqc='"+n+"']").css(obj);
  $(window).bind("resizeEnd",{'n':n,'dom':dom,'obj':obj},function(e){
    var w = e.data.dom.width();
    var h = e.data.dom.height();
    $("div[reqc='"+e.data.n+"']").css({
      'width':w+'px',
      'height':h+'px'
     });
    $("div[reqc='"+e.data.n+"']").find("marquee").css({
      'height':h+'px',
      'max-height':h+'px'
    });
  });
  return n;
}


$("#output").html("<div reqc='test1' style='width:500px;border:1px solid #000;height:200px;'>asdfasdfasfdasdf</div> \
<div reqc='test2' style='width:500px;border:1px solid #000;height:200px;'>xxddd</div>\
");
function my_table_page( jq_table_dom , page_cols)
{
  /*      
    var a = [
    {'name':'John','age':15,'id':1,'height':'174','weight':'90'},
    {'name':'Jeff','age':16,'id':2,'height':'165','weight':'60'},
    {'name':'Mary','age':13,'id':3,'height':'155','weight':'42'},
    {'name':'Jojo','age':17,'id':4,'height':'164','weight':'47'},
    {'name':'Bob','age':29,'id':5,'height':'171','weight':'27'},
    {'name':'Daniel','age':13,'id':6,'height':'161','weight':'37'},
    {'name':'Jacky','age':49,'id':7,'height':'151','weight':'57'},
    {'name':'Jacket','age':59,'id':8,'height':'141','weight':'67'},
    {'name':'Jeccy','age':19,'id':9,'height':'161','weight':'45'}
    ];
    var table = print_table(a,"id,name,age,height,weight","??????,??????,??????,??????,??????","thetable");
    $("#output").html(table);
    my_table_sort(  $(".thetable") , true , { 
      fields: 'id,age',
      func: function(){
        my_table_page(  $(".thetable")  , 3);
      }
    });
    my_table_page(  $(".thetable")  , 3);
  */
  if( typeof(page_cols) == "undefined")
  {
      page_cols = 10;
  }
  var totals = jq_table_dom.find("tbody tr").length;
  var page_output = "<div reqk='my_table_page_div'>";
  var is_need_add_one =  (( totals % page_cols )>0)?1:0;
  var total_pages = Math.floor(totals / page_cols ) +is_need_add_one ;

  for(var i=1;i<=total_pages;i++)
  {
     page_output+="<a href='javascript:;' req_page='"+(i-1)+"'>"+i+"</a> ";
  }
  page_output +='</div>';
  jq_table_dom.next("div[reqk='my_table_page_div']").eq(0).remove();
  jq_table_dom.after(page_output);
  jq_table_dom.next("div[reqk='my_table_page_div']").eq(0).find("a").unbind("click").click({'table':jq_table_dom,'page_cols':page_cols},function(e){
    e.data.table.find("tbody tr").hide();
    var p = $(this).attr('req_page');
    //clear color
    $(this).closest("div[reqk='my_table_page_div']").find("a").css({
      'color':'unset'
    });
    $(this).css({
      'color':'orange'
    });
    for(var i=p*e.data.page_cols;i<p*e.data.page_cols+page_cols;i++)
    {
       e.data.table.find("tbody tr").eq(i).show();
    }
  });
  //trigger first page
  jq_table_dom.next("div[reqk='my_table_page_div']").eq(0).find("a").eq(0).trigger("click");
}  
function arduino_map(x, in_min, in_max, out_min, out_max) {
  //x = ?????????
  //in ??? 0~255
  //out ??? 0~1024
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function mytabs(dom,obj){
  /*
    obj.head_css
    obj.head_li_focus_css
    obj.content_css
    obj.show = #div id
    //example:
mytabs($("#tabs"),{
  head_li_focus_css:{
    'background-color':'#77ff77',
    'font-weight':'bold'
  },
  head_li_css:{
    'background-color':'#eeeeee',
    'font-weight':'normal'
  },
  head_a_css:{
    color:'#000'
  },  content_css:{
   
  },
  show : "#tabs-1"
});
  */
  var li_a = dom.find("> ul li a");
  dom.find("> ul li a").css({ 
    "text-decoration":"none"
  });
  dom.find("> ul li").css({ 
    "display": "inline",
    "padding":"8px",
    "border-top": "1px solid #fff",
    "border-left": "1px solid #fff",
    "border-right": "1px solid #fff",
    "border-bottom": "0px",
    "margin": "0px",
    "border-radius": "5px 5px 0px 0px"
  });
  if(obj.head_li_css!=null)
  {
   dom.find("> ul li").css(obj.head_li_css);
  }
 if(obj.head_a_css!=null)
  {
   dom.find("> ul li a").css(obj.head_a_css);
  }
  if(obj.content_css!=null)
  {
    for(var i=0,max_i=li_a.length;i<max_i;i++)
    {
      var id = li_a.eq(i).attr('href');
      dom.find(id).css(obj.content_css);
    }
  }
  li_a.bind("click",{"dom":dom,"obj":obj},function(e){    
    var this_href = $(this).attr('href');
    var li_a = e.data.dom.find("> ul li a");    
    var mids = new Array();
    for(var i=0,max_i=li_a.length;i<max_i;i++)
    {      
      var id = li_a.eq(i).attr('href');     
      li_a.eq(i).closest("li").css({'background-color':'transparent'});
      if(e.data.obj.head_li_css!=null)
      {
        li_a.eq(i).closest("li").css(e.data.obj.head_li_css);
      }
      mids.push(id);
      e.data.dom.find(id).hide();
    }    
    //li css
    $(this).closest("li").css({'background-color':'#006'});
     if(e.data.obj.head_li_focus_css!=null)
     {
        $(this).closest("li").css(e.data.obj.head_li_focus_css);
     }

    e.data.dom.find(this_href).show();
    //div css
    e.data.dom.find(this_href).css({
      'border':'1px solid #fff',
      'padding': '10px',
      'display':'block',
      'margin-top':'10px'
    });
    return false;
  }); //a click
  if(obj.show!=null)
  {
    dom.find("> ul li a[href='"+obj.show+"']").trigger("click");
  }
  else
  {
    dom.find("> ul li a").eq(0).trigger("click");
  }
}
     
// function json_encode(obj)
// {
//   return JSON.stringify(obj);
// }
// function json_decode(data)
// {
//   return JSON.parse(data);
// }
// function array_push(arr,data)
// {
//   if($.isArray(arr))
//   { 
//     arr.push(data);
//   }
// }
// function count(arr)
// {
//   return arr.length;
// }
// function strpos(str,find)
// {
//   var output = str.indexOf(find);
//   output = (output==-1)?false:output; 
//   return output;
// }
// function sprintf(data,args)
// {
//   return $.sprintf(data,args);
// }
// function strtoupper(data)
// {
//   return data.toUpperCase();
// }
// function strtolower(data)
// {
//   return data.toLowerCase();
// }
// function explode(split_char,data)
// {
//   return data.split( split_char );
// }
// function implode(split_char,arr)
// {
//   return arr.join(split_char);
// }


function mytts(str,func_end)
{
  if ('speechSynthesis' in window) {
    var index = null;
    if(window['GLOBAL_MSG']==null)
    {
      window['GLOBAL_MSG'] = new SpeechSynthesisUtterance();
    }
    if(window['GLOBAL_VOICES']==null)
    {
      window['GLOBAL_VOICES'] = window.speechSynthesis.getVoices();
    }
    if(window['GLOBAL_VOICES'].length==0)
    {
      window['GLOBAL_VOICES'] = null;
      setTimeout(function(){
        mytts(str,func_end);
      },500);
      return;
    }
    
    for(var i=0,max_i= window['GLOBAL_VOICES'].length;i<max_i;i++)
    {
      if(window['GLOBAL_VOICES'][i]['name'] == "Microsoft Hanhan - Chinese (Traditional, Taiwan)")
      {
        index=i;
        break;
      }
    }
    //console.log(window['GLOBAL_VOICES'][index]);
    window['GLOBAL_MSG'].voice = window['GLOBAL_VOICES'][index]; //
    window['GLOBAL_MSG'].voiceURI = 'native';
    window['GLOBAL_MSG'].volume = 1; // 0 to 1
    window['GLOBAL_MSG'].rate = 3; // 0.1 to 10
    if(is_moz)
    {
      window['GLOBAL_MSG'].rate = 2; // 0.1 to 10
    }
    window['GLOBAL_MSG'].pitch = 2; //0 to 2
    window['GLOBAL_MSG'].text = str;
    window['GLOBAL_MSG'].lang = 'zh-TW';
    window['GLOBAL_MSG'].onend = function(e) {
      //console.log('Finished in ' + event.elapsedTime + ' seconds.');
      if(typeof(func_end)=="function")
      {        
        if(is_moz)
        {
          setTimeout(function(){
            func_end();
          },2000);
        }
        else{
          func_end();
        }
      }        
    };
    speechSynthesis.speak(window['GLOBAL_MSG']);
  }
}

function myflot(dom_selector,arr,x,y,options=null)
{
  /*
  options = 
  {
    extra:{            
      yaxis:{
        min:-2,
        max:2
      }
    },
    //showAVG:true,          
    simple:false
  }
  */
  var orin_options = {
    showAVG:false,
    simple:false
  };
  if(options!=null && typeof(options)=="object")
  {
    for(var k in options)
    {
      orin_options[k] = options[k];
    }
  }
  
  var max_i = arr.length;
  var step = 1;
  if(orin_options["simple"])
  {
    if(max_i > 1000000)
    {
      step = ceil(max_i/10000);
     }
    else if(max_i > 100000)
    {
      step = ceil(max_i/1000);
     }
    else if(max_i > 10000)
    {
      step = ceil(max_i/100);
     }
     else if(max>5000)
    {
      step = ceil(max_i/50);
    }
  }
  if(!Array.isArray(y))
  {
    y = [y];
  }
  
  var dataPa = new Array();
  for(var k in y)
  {
    var jd = new Array();
    
    for(var i=0,max_i=arr.length;i<max_i;i+=step )
    {
      //if(arr[i][y[k]]==null) continue;
      var d = new Array();
      d.push( arr[i][x] );
      d.push( parseFloat(arr[i][y[k]]) );
      if(d[0].length == 19){ // 2020-10-20 11:20:00 
        d[0]=parseInt(strtotime(d[0]))*1000;
      }
      else if( d[0].length==10)
      {
        //?????? timestamp
        d[0]=parseInt(d[0])*1000;
      }
      else if( d[0].length==13) //timestamp*1000
      {
        d[0]=parseInt(d[0]);
      }
      jd.push(d);
    }
    dataPa.push(jd);  
  }
  
  
  var jdAvg = new Array();
  if(orin_options['showAVG'] == true)
  {
    //???????????????
    for(var i=2,max_i=jd.length-3;i<max_i;i+=max_i%5)
    {
      var d = new Array();
      d[0] = (jd[i-2][0]+jd[i+1][0] + jd[i+2][0]+jd[i+3][0])/4;
      d[1] = (jd[i-2][1]+jd[i+1][1] + jd[i+2][1]+jd[i+3][1])/4;
      jdAvg.push(d);
    }
    dataPa.push(jdAvg);
  }

  var default_setting = {                   
      xaxis: 
      { 
        mode: "time",
        timeformat: "%Y-%m-%d %H:%M:%S",
        timezone: "browser"
      },      
      zoom: {
				interactive: true
			},
			pan: {
				interactive: true
			} 
  };
  if(orin_options['grid'] == true)
  {
    default_setting['grid'] = {
      autoHighlight:true, 
      hoverable:true, 
      clickable:true, 
      axisMargin:10, 
      borderWidth:0
    };
  }
  if(orin_options['colors'] != null)
  {
    default_setting['colors'] = orin_options['colors'];
  }
  if( typeof(orin_options['extra'])=="object")
  {
    default_setting = Object.assign(default_setting,orin_options['extra']); 
  }
  //console.log( default_setting );
  var pt = $.plot( dom_selector, dataPa ,default_setting);
  return {
    plot: pt,
    data:dataPa
  };
}

function protect_string(data) {
    if (typeof (data) != "string") {
        return data;
    }
    var m = data.split("");
    for (var i = 1, max_i = m.length; i < max_i; i+=2) {
        m[i] = '_';
    }
    return m.join('');
}

function outSideWord(jqDomArr, css_obj) {
  /*css_obj default ??????????????????  //outer: blue , color: white, border: 2px*/
  //From : https://3wa.tw/demo/htm/test_javascript.php?id=151
  for (var i = 0, max_i = jqDomArr.length; i < max_i; i++) {
    var jqDom = jqDomArr.eq(i);
    var default_css = {
      color: '#fff',
      outer_color: 'rgba(0,0,255,0.8)',
      border: '10px'
    };
    if (typeof(css_obj) == 'object') {
      for (var k in css_obj) {
        default_css[k] = css_obj[k];
      }
    }
    var uid = parseInt(performance.now()) + '_' + parseInt(my_fix_random() * 1000000);
    jqDom.before("<div req_outSideWord_unique_id_div='" + uid + "'></div>");
    jqDom.detach().appendTo($("div[req_outSideWord_unique_id_div='" + uid + "']"));
    jqDom.attr({
      'data-text': jqDom.text(),
      req_outSideWord_unique_id: uid
    });
    var tagName = jqDom.prop('tagName');
    jqDom.after(`<style>div[req_outSideWord_unique_id_div='` + uid + `'] {  display:table;position:relative;}
  ` + tagName + `[req_outSideWord_unique_id='` + uid + `'] {    color: ` + default_css['color'] + `;    -webkit-text-stroke: 2px# ` + default_css['color'] + `;    
    position: relative;
    z-index: 0;
  }
  ` + tagName + `[req_outSideWord_unique_id='` + uid + `']::before, #txt::after {
      content: attr(data-text);
      position: absolute;      left: 0px;
      z-index: -1;             -webkit-color: ` + default_css['color'] + `;
}
  ` + tagName + `[req_outSideWord_unique_id='` + uid + `']::before {
          -webkit-text-stroke: ` + default_css['border'] + ` ` + default_css['outer_color'] + `;
}
  ` + tagName + `[req_outSideWord_unique_id='` + uid + `']::after {
              -webkit-text-stroke: 3px #000;
}</style>`);
    //console.log(default_css);
  }
}

// return array of [r,g,b,a] from any valid color. if failed returns undefined
function colorValues(color)
{
  /*
   From : https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49 
  Examples:
    colorValues('transparent'); // [0,0,0,0]
    colorValues('white'); // [255, 255, 255, 1]
    colorValues('teal'); // [0, 128, 128, 1]
    colorValues('rgba(11,22,33,.44)'); // [11, 22, 33, 0.44]
    colorValues('rgb(11,22,33)'); // [11, 22, 33, 1]
    colorValues('#abc'); // [170, 187, 204, 1]
    colorValues('#abc6'); // [170, 187, 204, 0.4]
    colorValues('#aabbcc'); // [170, 187, 204, 1]
    colorValues('#aabbcc66'); // [170, 187, 204, 0.4]
    colorValues('asdf'); // undefined
    colorValues(''); // undefined
    colorValues(NaN); // Script Error
    colorValues(123); // Script Error
  */
	if (!color)
		return;
	if (color.toLowerCase() === 'transparent')
		return [0, 0, 0, 0];
	if (color[0] === '#')
	{
		if (color.length < 7)
		{
			// convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
			color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '');
		}
		return [parseInt(color.substr(1, 2), 16),
			parseInt(color.substr(3, 2), 16),
			parseInt(color.substr(5, 2), 16),
			color.length > 7 ? parseInt(color.substr(7, 2), 16)/255 : 1];
	}
	if (color.indexOf('rgb') === -1)
	{
		// convert named colors
		var temp_elem = document.body.appendChild(document.createElement('fictum')); // intentionally use unknown tag to lower chances of css rule override with !important
		var flag = 'rgb(1, 2, 3)'; // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
		temp_elem.style.color = flag;
		if (temp_elem.style.color !== flag)
			return; // color set failed - some monstrous css rule is probably taking over the color of our object
		temp_elem.style.color = color;
		if (temp_elem.style.color === flag || temp_elem.style.color === '')
			return; // color parse failed
		color = getComputedStyle(temp_elem).color;
		document.body.removeChild(temp_elem);
	}
	if (color.indexOf('rgb') === 0)
	{
		if (color.indexOf('rgba') === -1)
			color += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
		return color.match(/[\.\d]+/g).map(function (a)
		{
			return +a
		});
	}
}


function showMessage(data,timeout,bo){
  smallComment(data,timeout,false,{});
}
function is_dom_show(jsdom) {
  return jsdom.is(':visible');
}