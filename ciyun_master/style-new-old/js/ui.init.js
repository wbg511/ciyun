var x = typeof $ === "function" ? window.$ : {};x.config = {jsFile: "style/js/",cssFile: "../style/css/",imgFile: "style/images/"};x.getName=function(b){return document.getElementsByName(b)};x.getID=function(a){return document.getElementById(a)};x.getTag=function(a){return document.getElementsByTagName(a)};x.ct=function(a){return document.createTextNode(a)};x.ce=function(a){return document.createElement(a)};x.stopBubble=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=true};x.stopDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=false};x.getStyle=function(a){return a.currentStyle||document.defaultView.getComputedStyle(a,null)};x.exid=function(b){var a=document.getElementById(b);if(a){return true}else{return false}};x.bind=function(c,b,a){if(c.attachEvent){c["e"+b+a]=a;c[b+a]=function(){c["e"+b+a](window.event)};c.attachEvent("on"+b,c[b+a])}else{c.addEventListener(b,a,false)}};x.unbind=function(d,c,b){if(d.detachEvent){try{d.detachEvent("on"+c,d[c+b]);d[c+b]=null}catch(a){}}else{d.removeEventListener(c,b,false)}};x.Browser=function(){var d=navigator.userAgent.toLowerCase();var c={};c.isStrict=document.compatMode=="CSS1Compat";c.isFirefox=d.indexOf("firefox")>-1;c.isOpera=d.indexOf("opera")>-1;c.isSafari=(/webkit|khtml/).test(d);c.isSafari3=c.isSafari&&d.indexOf("webkit/5")!=-1;c.isIE=!c.isOpera&&d.indexOf("msie")>-1;c.isIE6=!c.isOpera&&d.indexOf("msie 6")>-1;c.isIE7=!c.isOpera&&d.indexOf("msie 7")>-1;c.isIE8=!c.isOpera&&d.indexOf("msie 8")>-1;c.isGecko=!c.isSafari&&d.indexOf("gecko")>-1;c.isMozilla=document.all!=undefined&&document.getElementById!=undefined&&!window.opera!=undefined;return c}();x.pageSize={get:function(){var i=x.Browser.isStrict?document.documentElement:document.body;var h=["clientWidth","clientHeight","scrollWidth","scrollHeight"];var k={};for(var j in h){k[h[j]]=i[h[j]]}k.scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft;k.scrollTop=document.body.scrollTop||document.documentElement.scrollTop;return k}};x.getPosition=function(i){if(typeof(i)=="string"){i=x.getID(i)}var k=0;var j=0;var a=i.offsetWidth;var b=i.offsetHeight;do{j+=i.offsetTop||0;k+=i.offsetLeft||0;i=i.offsetParent}while(i);return{x:k,y:j,width:a,height:b}};x.safeRange=function(l){var v=x.getID(l);var u,t,r,q,o,m,i,a;i=v.offsetWidth;a=v.offsetHeight;p=x.pageSize.get();u=0;r=p.clientWidth-i;o=r/2;t=0;q=p.clientHeight-a;var n=p.clientHeight*0.382-a/2;m=(a<p.clientHeight/2)?n:q/2;if(o<0){o=0}if(m<0){m=0}return{width:i,height:a,minX:u,minY:t,maxX:r,maxY:q,centerX:o,centerY:m}};x.setXY=function(j,k,a,i){var c=x.pageSize.get(),d=x.safeRange(j),b=x.getID(j);if(a){s=x.safeRange(a);rp=x.getPosition(a)}var l=k,n=i===true?0:c.scrollTop;if(a!=undefined&&a!=""){var h=!l.right?parseInt(l.left):c.clientWidth-s.width-parseInt(l.right);var m=!l.bottom?parseInt(l.top):c.clientHeight-s.height-parseInt(l.bottom);left1=rp.x+parseInt(l.left);left2=rp.x+parseInt(l.left)+s.width;right1=rp.x+s.width-d.width-parseInt(l.right);right2=rp.x-d.width-parseInt(l.right);top1=rp.y+parseInt(l.top);top2=rp.y+parseInt(l.top)+s.height;bottom1=rp.y+s.height-d.height-parseInt(l.bottom);bottom2=rp.y-d.height-parseInt(l.bottom);h=!l.right?(l.lin?left1:left2):(l.rin?right1:right2);m=!l.bottom?(l.tin?top1:top2):(l.bin?bottom1:bottom2);b.style.left=h+"px";b.style.top=m+"px"}else{if(!l.left&&!l.right){b.style.left=d.centerX+"px"}else{if(!l.right){b.style.left=parseInt(l.left)+"px"}else{b.style.right=parseInt(l.right)+"px"}}if(!l.top&&!l.bottom){b.style.top=d.centerY+n+"px"}else{if(!l.bottom){b.style.top=parseInt(l.top)+n+"px"}else{b.style.top=c.clientHeight-b.offsetHeight-parseInt(l.bottom)+"px"}}}};x.setIframHeight=function(b){var a=function(k){var l=document.getElementById(k);try{var d=l.contentWindow.document.body.scrollHeight;var c=l.contentWindow.document.documentElement.scrollHeight;var j=Math.max(d,c);l.height=j}catch(i){}};window.setInterval(a,200)};Array.prototype.removeRepeat=function(){var h,a=[],k=this.length;for(var d=0;d<k-1;d++){for(var c=d+1;c<k;c++){if(this[c]===this[d]){this.splice(c,1);if(this[d]!==h){h=this[d],a.push(this[d])}d--,k--}}}return a};Array.prototype.min=function(){return Math.min.apply({},this)};Array.prototype.max=function(){return Math.max.apply({},this)};Array.prototype.indexOf=function(b){for(var a=0;a<this.length;a++){if(this[a]==b){return a}}return -1};Array.prototype.remove=function(b){var a=this.indexOf(b);if(a>-1){this.splice(a,1)}};x.hasClass=function(b,a){return b.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"))};x.addClass=function(b,a){if(!this.hasClass(b,a)){b.className+=" "+a}};x.removeClass=function(c,a){if(hasClass(c,a)){var b=new RegExp("(\\s|^)"+a+"(\\s|$)");c.className=c.className.replace(b," ")}};x.siblings=function(d){var b=[];var c=d.previousSibling;while(c){if(c.nodeType===1){b.push(c)}c=c.previousSibling}b.reverse();var h=d.nextSibling;while(h){if(h.nodeType===1){b.push(h)}h=h.nextSibling}return b};x.getLength=function(a){return a.replace(/[^\x00-\xff]/g,"**").length};x.strlen=function(d){var a=0;for(var c=0;c<d.length;c++){var b=d.substr(c,1);if(escape(b).substr(0,2)=="%u"){a+=3}else{a+=1}}return a};x.addCSS=function(c){var a=this.style;if(!a){a=this.style=document.createElement("style");a.setAttribute("type","text/css");document.getElementsByTagName("head")[0].appendChild(a)}a.styleSheet&&(a.styleSheet.cssText+=c)||a.appendChild(document.createTextNode(c))};x.loadCSS=function(i,h){if(!i){return}var a=x.getTag("link");for(var k in a){if(a[k].href==i){return}}var j=document.createElement("link");j.id=h;j.rel="stylesheet";j.media="screen";j.type="text/css";j.href=x.config.cssFile+i;x.getTag("HEAD").item(0).appendChild(j)};x.loadJS=function(i,a,h,b){b=b||"utf-8";var c=document.createElement("script");c.charset=b;c.type="text/javascript";c.id=i;c.src=x.config.jsFile+i;var d=x.getTag("HEAD").item(0);if(x.Browser.isIE){c.onreadystatechange=function(){if(!(/loaded|complete/i.test(c.readyState))){return}if("function"==typeof a){a()}c.onreadystatechange=null;c.parentNode.removeChild(c);c=null}}else{c.onload=function(){if("function"==typeof a){a()}c.parentNode.removeChild(c);c=null}}if("function"==typeof h){c.onerror=function(){if("function"==typeof h){h()}c.parentNode.removeChild(c);c=null}}d.appendChild(c)};x.random=function(n,l,j,m){if(!l&&!j&&!m){l=j=m=true}var h=[["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],["0","1","2","3","4","5","6","7","8","9"]];var d=[];var o="";d=l?d.concat(h[0]):d;d=j?d.concat(h[1]):d;d=m?d.concat(h[2]):d;for(var k=0;k<n;k++){o+=d[Math.round(Math.random()*(d.length-1))]}return o};x.getUrlKey=function(c,b){var b=b?b:location.href;var a="";var d=b.indexOf(c+"=");if(d!=-1){d+=c.length+1;e=b.indexOf("&",d);if(e==-1){e=b.length}a=b.substring(d,e)}return a};x.fixed=function(c){var i=x.getID(c);if(!x.Browser.isIE6){i.style.position="fixed"}else{var a=function(l,j){var l=x.getTag(l);var d=[];for(var k=0;k<l.length;k++){if(l[k].className==j){d.push(l[k])}}return d};var h=a("div","ui_dialog_fixed");if(x.getStyle(x.getID("page"))["backgroundImage"]!="none"){x.addCSS(".ui_dialog_fixed{width:100%; height:1px; position:absolute; z-index: 891201; left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth); top:expression(documentElement.scrollTop)}.body-fixed{background-attachment:fixed;}")}else{x.addCSS(".ui_dialog_fixed{width:100%; height:1px; position:absolute; z-index: 891201; left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth); top:expression(documentElement.scrollTop)}.body-fixed{background-attachment:fixed;background-image:url(about:blank);}")}if(h.length==0){var b=x.ce("div");b.className="ui_dialog_fixed";b.appendChild(i);document.body.appendChild(b);x.addClass(x.getTag("html")[0],"body-fixed")}else{h[0].appendChild(i)}}};x.callBack={ok:function(a){return"<div class='ui_box_callback'><span class='ui_box_callback_ok'></span>"+a+"</div>"},error:function(a){return"<div class='ui_box_callback'><span class='ui_box_callback_error'></span>"+a+"</div>"},tips:function(a){return"<div class='ui_box_callback'><span class='ui_box_callback_tips'></span>"+a+"</div>"}};x.Cookie={get:function(i){var h="";var k=i+"=";var j=document.cookie;if(j.length>0){g=j.indexOf(k);if(g!=-1){g+=k.length;f=j.indexOf(";",g);if(f==-1){f=j.length}h=unescape(j.substring(g,f))}}return h},set:function(j,i,m,l){var n="";var k=x.config.cookieHours||24*30;if(k!=null){n=new Date((new Date()).getTime()+k*3600000);n="; expires="+n.toGMTString()}document.cookie=j+"="+escape(i)+n+(m?"; path="+m:"; path=/")+(l?";domain="+l:"")},del:function(b){document.cookie=b+"=;path=/;expires="+(new Date(0)).toGMTString()}};x.animate=function(r,v,n,C,m){var A=x.getID(r),k=A.children,q=k[0].offsetWidth,D=k[0].offsetHeight,l=k.length,j;var u=0,G=parseInt(x.getStyle(x.getID(r))[v]),H=v=="left"?-Math.abs(q)*n:-Math.abs(D)*n,F=H-G,E=C;var z=function(){clearTimeout(j);if(F&&u<E){A.style[v]=Math.round(m(u++,G,F,E))+"px";j=setTimeout(z,10)}else{A.style[v]=H+"px"}};if(v=="left"){k[n].style.cssFloat="left";k[n].style.display="block";A.style.position="absolute";A.style.width=l*q+"px";A.style.height=D+"px";return z()}else{if(v=="top"){k[n].style.display="block";A.style.position="absolute";A.style.height=l*D+"px";return z()}else{k[n].style.display="block";var y=x.siblings(k[n]);for(var B=0;B<y.length;B++){y[B].style.display="none"}}}};
(function(b){x.Dialog=function(a){defaults=b.extend({type:"dialog",loadType:"web",theme:"defaults",title:"",boxID:x.random(10),referID:"",content:"text:loading text",width:"",height:"",time:"",drag:true,lock:true,fixed:true,showbg:true,showborder:true,showtitle:true,position:"",arrow:"left",tips:"",yesBtn:null,noBtn:null,cfns:"",ofns:""},a);x.Dialog.init(defaults)};b.extend(x.Dialog,{data:{_this:null,winarr:[],zindex:870618},init:function(d){if(x.getID(d.boxID)){return}x.Dialog.create(d);x.Dialog.loadContent(d);if(d.yesBtn){x.Dialog.yesBtn(d)}if(d.noBtn){x.Dialog.noBtn(d)}if(d.fixed){x.fixed(d.boxID);x.fixed(d.boxID+"_move_temp")}if(typeof d.time==="number"){setTimeout(function(){x.Dialog.close(d.boxID,d.cfns)},d.time)}if(typeof d.time==="boolean"){return}$(window).resize(function(){try{x.setXY(d.boxID,d.position,d.referID,d.fixed);var g=x.safeRange(d.boxID);b(".ui_iframe",_this).css({width:g.width+"px",height:g.height+"px"});var e=x.pageSize.get();w_resize=e.clientWidth,h_resize=e.clientHeight;b(".ui_overlay_iframe").css({width:w_resize+"px",height:w_resize+"px"});x.Dialog.setPosition(d.boxID)}catch(c){}});b(".ui_btn_close",_this).live("click",function(){x.Dialog.close(d.boxID,d.cfns);return false});var a=x.Dialog.data.winarr;_this.live("mousedown",function(){this.style.zIndex=x.Dialog.data.zindex+=1;for(var c=0;c<a.length;c++){if(a[c][0]==d.boxID){a[c][1]=this.style.zIndex}}});document.onkeydown=function(c){c=c||window.event;if(c.keyCode==27){var e=[];for(var i=0;i<a.length;i++){e.push(a[i][1])}for(var j=0;j<e.length;j++){if(a[j][1]==e.max()){x.Dialog.close(a[j][0],d.cfns);e.remove(e.max());a.remove(a[j])}}}}},create:function(d){var a='<div class="ui_dialog_wrap"><div id="'+d.boxID+'" class="ui_dialog">';a+='<table class="ui_table_wrap" cellspacing="0" cellpadding="0" border="0"><tbody>';a+='<tr><td class="ui_border ui_td_00"></td><td class="ui_border ui_td_01"></td><td class="ui_border ui_td_02"></td></tr>';a+='<tr><td class="ui_border ui_td_10"></td><td class="ui_td_11"><table class="ui_dialog_main" cellspacing="0" cellpadding="0" border="0"><tbody>';a+='<tr><td><div class="ui_title_wrap"><div class="ui_title"><div class="ui_title_text"><span class="ui_title_icon"></span>'+d.title+'</div><div class="ui_btn_wrap"><span class="ui_btn_close">close</span></div></div></div></td></tr>';a+='<tr><td><div class="ui_content" id="'+d.boxID+'_content"></div></td></tr>';a+='<tr><td><div class="ui_button_wrap"><div class="ui_resize"></div></div></td></tr></tbody></table>';a+='</td><td class="ui_border ui_td_12"></td></tr>';a+='<tr><td class="ui_border ui_td_20"></td><td class="ui_border ui_td_21"></td><td class="ui_border ui_td_22"></td></tr></tbody></table>';a+='<iframe src="about:blank" class="ui_iframe" style="position:absolute;left:0;top:0; filter:alpha(opacity=0);opacity:0; scrolling=no;border:none;z-index:10714;"></iframe>';a+='</div><div class="ui_move_temp" id="'+d.boxID+'_move_temp"></div><div class="ui_overlay"><iframe class="ui_overlay_iframe" src="about:blank" width="100%" height="'+b(document).height()+'" style="width:100%;filter:alpha(opacity=50);opacity:0.5;z-index:870611;" scrolling="0" frameborder="0"></iframe></div></div>';b(a).appendTo("body");_this=b("#"+d.boxID);_this.css("zIndex",x.Dialog.data.zindex+=1).addClass("ui_dialog_restore").parent().addClass("ui_dialog_theme_"+d.theme);if(d.type=="tips"){d.showtitle=false}if(d.showtitle!=true){b(".ui_title_wrap",_this).remove()}if(d.showbg){_this.parent().find(".ui_overlay").css("visibility","visible")}if(!d.showborder){_this.find(".ui_border").css({width:"0px",height:"0px",fontSize:"0",lineHeight:"0",visibility:"hidden",overflow:"hidden"});_this.find(".ui_resize").css({right:"5px",bottom:"5px"});if(d.type=="dialog"){_this.find(".ui_dialog_main").addClass("ui_box_shadow")}}x.Dialog.setPosition(d)},loadContent:function(d){var o=b(".ui_content",_this),l=x.Dialog.data.winarr;var n='<em class="ui_arrow arrow-'+d.arrow+'" style="z-index:1;"></em><span class="ui_arrow arrow-'+d.arrow+'-in" style="z-index:2;"></span><i class="ui_tips_close">x</i>';$contentType=d.content.substring(0,d.content.indexOf(":"));$content=d.type=="tips"?"<div class='ui_tips_content'><i class=\"ui_tips_content_ico\"></i>"+d.content.substring(d.content.indexOf(":")+1,d.content.length)+"</div>"+n:d.content.substring(d.content.indexOf(":")+1,d.content.length);b.ajaxSetup({global:false});var a=d.width!=""?d.width:"auto",q=d.height!=""?d.height:"auto";o.css({width:a,height:q});if(d.drag){d.dragBox=true}var m=function(f){l.push([d.boxID,x.getID(d.boxID).style.zIndex,o.width(),o.height()]);if(!f){return}var e=x.safeRange(d.boxID);var c=e.width>400||e.height>300?".ui_move_temp":"";x.loadJS("dialog/x.drag.js",function(){x.drag({obj:d.boxID,handle:".ui_title_text",lock:d.lock,fixed:d.fixed,temp:c})})};switch($contentType){case"text":o.html($content);x.Dialog.setPosition(d);m(d.dragBox);if(d.ofns!=""&&b.isFunction(d.ofns)){d.ofns(this)}break;case"img":b.ajax({beforeSend:function(){x.Dialog.setPosition(d);b(".ui_title_wrap",_this).hide();o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-loading"><img src="'+x.config.imgFile+'loading.gif"></span><span class="ico-minMsg-end"></span></span></div>')},error:function(){o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-fail "></span>11<em class="ui-miniMsg-fail">'+x.tipConfig.errorImg+'</em><a href="javascript:;" onclick=$(".ui_dialog_wrap").remove() class="ui-miniMsg-box-close">'+x.tipConfig.close+'</a><span class="ico-minMsg-end"></span></span></div>');x.Dialog.setPosition(d)},success:function(c){x.loadJS("dialog/x.img.js",function(){imgReady($content,function(){b(".ui_title_wrap",_this).show();o.html("<img src="+$content+" alt='' />");x.Dialog.setPosition(d);m(d.dragBox)},function(){o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-fail "></span><em class="ui-miniMsg-fail">'+x.tipConfig.errorImg+'</em><a href="javascript:;" onclick=$(".ui_dialog_wrap").remove() class="ui-miniMsg-box-close">'+x.tipConfig.close+'</a><span class="ico-minMsg-end"></span></span></div>')})});if(d.ofns!=""&&b.isFunction(d.ofns)){d.ofns(this)}}});break;case"swf":b.ajax({beforeSend:function(){x.Dialog.setPosition(d);b(".ui_title_wrap",_this).hide();o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-loading"><img src="'+x.config.imgFile+'loading.gif"></span><span class="ico-minMsg-end"></span></span></div>')},error:function(){o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-fail "></span><em class="ui-miniMsg-fail">'+x.tipConfig.error+'</em><a href="javascript:;" onclick=$(".ui_dialog_wrap").remove() class="ui-miniMsg-box-close">'+x.tipConfig.close+'</a><span class="ico-minMsg-end"></span></span></div>');x.Dialog.setPosition(d)},success:function(c){x.loadJS("dialog/x.swf.js",function(){b(".ui_title_wrap",_this).show();x.Dialog.setPosition(d);o.html("<div id='"+d.boxID+'swf\'><h1>Alternative content</h1><p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></p></div><script type="text/javascript">swfobject.embedSWF(\''+$content+"', '"+d.boxID+"swf', '"+d.width+"', '"+d.height+"', '9.0.0', 'expressInstall.swf');<\/script>");b("#"+d.boxID+"swf").css({position:"absolute",left:"0",top:"0",textAlign:"center"});m(d.dragBox)});if(d.ofns!=""&&b.isFunction(d.ofns)){d.ofns(this)}}});break;case"url":var k=$content.split("?");b.ajax({beforeSend:function(){x.Dialog.setPosition(d);b(".ui_title_wrap",_this).hide();o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-loading"><img src="'+x.config.imgFile+'loading.gif"></span><span class="ico-minMsg-end"></span></span></div>')},type:k[0],url:k[1],data:k[2],error:function(){o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-fail "></span><em class="ui-miniMsg-fail">'+x.tipConfig.errorUrl+'</em><a href="javascript:;" onclick=$(".ui_dialog_wrap").remove() class="ui-miniMsg-box-close">'+x.tipConfig.close+'</a><span class="ico-minMsg-end"></span></span></div>');x.Dialog.setPosition(d)},success:function(c){b(".ui_title_wrap").show();x.Dialog.setPosition(d);o.html(c);x.Dialog.setPosition(d);m(d.dragBox);if(d.ofns!=""&&b.isFunction(d.ofns)){d.ofns(this)}}});break;case"iframe":b.ajax({beforeSend:function(){x.Dialog.setPosition(d);b(".ui_title_wrap",_this).hide();o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-loading"><img src="'+x.config.imgFile+'loading.gif"></span><span class="ico-minMsg-end"></span></span></div>')},error:function(){o.html('<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-fail "></span><em class="ui-miniMsg-fail">'+x.tipConfig.errorIframe+'</em><span class="ico-minMsg-end"></span></span></div>');x.Dialog.setPosition(d)},success:function(c){b(".ui_title_wrap",_this).show();o.html('<iframe src="'+$content+'" style="width:100%;height:100%;" id="'+d.boxID+'frame" scrolling="auto" frameborder="0"></iframe>');b("#"+d.boxID+"frame").bind("load",function(){var e=document.getElementById(d.boxID+"frame");if(d.width==""||d.height==""){try{e=e.contentWindow.document,width=Math.max(e.body.scrollWidth,e.documentElement.scrollWidth),height=Math.max(e.body.scrollHeight,e.documentElement.scrollHeight);_this.find(".ui_content").css({width:width+"px",height:height+"px"})}catch(f){}}else{_this.find(".ui_content").css({width:a+"px",height:q+"px"})}x.Dialog.setPosition(d);m(d.dragBox);if(d.ofns!=""&&b.isFunction(d.ofns)){d.ofns(this)}})}})}},setPosition:function(z){x.setXY(z.boxID,z.position,z.referID,z.fixed);var v=x.safeRange(z.boxID);b(".ui_iframe",_this).css({width:v.width+"px",height:v.height+"px"});if(z.type=="tips"){var o=z.tips,t=z.arrow=="left"||z.arrow=="right"?"top":"left";var y=o.val||"10";var B=o.style||"default";var s=o.radius||"0";var q=o.auto||true;_this.find(".ui_button_wrap").hide().end().find(".ui_dialog_main").css({border:"none",background:"none"}).find(".ui_content").addClass("ui_tips_style_"+B).css({borderRadius:s+"px",textAlign:"left"}).find(".ui_arrow").css(t,y+"px").end().find(".ui_tips_close").click(function(){x.Dialog.close(z.boxID,z.cfns)});var A=x.getPosition(z.boxID),u=x.getPosition(z.referID),a=x.safeRange(z.referID),r=document.body.scrollTop||document.documentElement.scrollTop;switch(z.arrow){case"left":_this.css({left:A.x+8+"px",top:A.y+"px"});if(q=true&&p.clientWidth-A.x<_this.outerWidth()){_this.css({left:u.x-_this.outerWidth()-8}).find(".ui_arrow").removeClass("ui_arrow_mode_left").addClass("ui_arrow_mode_right")}break;case"right":_this.css({left:A.x-10+"px",top:A.y+"px"});if(q=true&&A.x<0){_this.css({left:u.x+a.width+8}).find(".ui_arrow").removeClass("ui_arrow_mode_right").addClass("ui_arrow_mode_left")}break;case"bottom":_this.css({left:A.x+"px",top:A.y-8+"px"});if(q=true&&A.y<0){_this.css({top:u.y+a.height+8}).find(".ui_arrow").removeClass("ui_arrow_mode_bottom").addClass("ui_arrow_mode_top")}break;case"top":_this.css({left:A.x+"px",top:A.y+8+"px"});if(q=true&&p.clientHeight-A.y+r<_this.outerHeight()){_this.css({top:u.y-_this.outerHeight()-8}).find(".ui_arrow").removeClass("ui_arrow_mode_top").addClass("ui_arrow_mode_bottom")}break}}},yesBtn:function(f){var i=f.yesBtn[1]||function(){},g=f.yesBtn[0]||"\u786E\u5B9A";var a='<button class="ui_box_btn ui_box_btn_yes" type="button">'+g+"</button>";_this.find(".ui_button_wrap").append(a);if(i!=""&&b.isFunction(i)){_this.find(".ui_box_btn_yes").click(function(){var c=i();if(c!=false){x.Dialog.close(f.boxID,f.cfns)}})}},noBtn:function(f){var a=f.noBtn[1]||function(){},g=f.noBtn[0]||"\u53D6\u6D88";var i='<button class="ui_box_btn ui_box_btn_no" type="button">'+g+"</button>";_this.find(".ui_button_wrap").append(i);if(a!=""&&b.isFunction(a)){_this.find(".ui_box_btn_no").click(function(){var c=a();if(c!=false){x.Dialog.close(f.boxID,f.cfns)}})}},min:function(a){var d=b("#"+a.boxID);b(".ui_btn_min",d).live("click",function(){d.find(".ui_content").css({width:"0",height:"0",display:"none",visibility:"hidden"}).end().find(".ui_button_wrap").hide();var c=x.safeRange(a.boxID);b(".ui_iframe",d).css({width:c.width+"px",height:c.height+"px"});d.addClass("ui_dialog_min").removeClass("ui_dialog_restore ui_dialog_max");if(a.drag){x.config.drag=true}return false})},max:function(a){var d=b("#"+a.boxID);b(".ui_btn_max",d).live("click",function(){var c=x.pageSize.get();w=c.clientWidth-(a.showborder?10:2);h=c.clientHeight-(a.showtitle?34:2)-(a.button?36:0);d.find(".ui_content").css({width:w+"px",height:h+"px"});x.Dialog.setPosition(a);d.addClass("ui_dialog_max").removeClass("ui_dialog_restore ui_dialog_min");if(a.drag){x.config.drag=false;d.find(".ui_title_text").css("cursor","default")}return false})},restore:function(f){var e=b("#"+f.boxID);var a=x.Dialog.data.winarr;b(".ui_btn_restore",e).live("click",function(){for(var c=0;c<a.length;c++){if(f.boxID==a[c][0]){e.find(".ui_content").css({width:a[c][2]+"px",height:a[c][3]+"px",display:"block",visibility:"visible"}).end().find(".ui_button_wrap").show();x.Dialog.setPosition(f);e.addClass("ui_dialog_restore").removeClass("ui_dialog_min ui_dialog_max")}}if(f.drag){x.config.drag=true;e.find(".ui_title_text").css("cursor","move")}return false})},close:function(e,f){if(typeof e==="string"){box=b("#"+e)}else{alert(x.tipConfig.loadingBoxId);return}if(box.length!=0){box.parent().remove();b(".ui_dialog_wraps").animate({opacity:"0"},100,function(){b(this).remove()});for(var a=0;a<x.Dialog.data.winarr.length;a++){if(e==x.Dialog.data.winarr[a][0]){x.Dialog.data.winarr.remove(x.Dialog.data.winarr[a])}}if(f!=""&&b.isFunction(f)){f(this)}}}})})(jQuery);
(function(a){Array.prototype.indexOf=function(c,d){for(var b=(d||0);b<this.length;b++){if(this[b]==c){return b}}};a.fn.extend({getSetSSValue:function(b){if(b){a(this).val(b).change();return this}else{return a(this).find(":selected").val()}},resetSS:function(){var b=a(this).data("ssOpts");$this=a(this);$this.next().remove();$this.unbind(".sSelect").sSelect(b)}});a.fn.sSelect=function(b){return this.each(function(){var i={defaultText:"\u9354\u72ba\u6d47\u6d93\ufffd...",animationSpeed:100,ddMaxHeight:"",containerClass:"",visibility:"visible"};var l=a.extend(i,b),e=a(this),j=a('<div class="ui-select-list-text"></div>'),r=a('<div class="ui-select-box '+l.containerClass+'"></div>'),z=a('<ul class="ui-select-list" style="visibility:hidden;"></ul>'),t=-1,d=-1,m=[],w=false,v=false,x;a(this).data("ssOpts",b);r.insertAfter(e);r.attr("tabindex",e.attr("tabindex")||"0");j.prependTo(r);z.appendTo(r);e.hide();j.data("ssReRender",!j.is(":visible"));if(e.children("optgroup").length==0){e.children().each(function(B){var C=a(this).html();var A=a(this).val();m.push(C.charAt(0).toLowerCase());if(a(this).attr("selected")==true){l.defaultText=C;d=B}z.append(a("<li><span>"+C+"</span></li>").data("key",A))});x=z.children().children()}else{e.children("optgroup").each(function(){var A=a(this).attr("label"),C=a('<li class="ui-select-item-optgroup"><p class="ui-select-item-optgroup-label">'+A+"</p></li>");C.appendTo(z);var B=a("<ul></ul>");B.appendTo(C);a(this).children().each(function(){++t;var E=a(this).html();var D=a(this).val();m.push(E.charAt(0).toLowerCase());if(a(this).attr("selected")==true){l.defaultText=E;d=t}B.append(a("<li><span>"+E+"</span></li>").data("key",D))})});x=z.find("ul li span")}var o=z.height(),n=r.height(),y=x.length;if(d!=-1){h(d,true)}else{j.text(l.defaultText)}function p(){var B=r.offset().top,A=jQuery(window).height(),C=jQuery(window).scrollTop();if(o>parseInt(l.ddMaxHeight)){o=parseInt(l.ddMaxHeight)}B=B-C;if(B+o>=A){z.css({top:"-"+o+"px",height:o});e.onTop=true}else{z.css({top:n+"px",height:o});e.onTop=false}}p();a(window).bind("resize.sSelect scroll.sSelect",p);function s(){r.css("position","relative")}function c(){r.css("position","static")}j.bind("click.sSelect",function(A){A.stopPropagation();if(a(this).data("ssReRender")){o=z.height("").height();n=r.height();a(this).data("ssReRender",false);p()}a(".ui-select-list").not(a(this).next()).hide().parent().css("position","static").removeClass("ui-select-box-focus");z.toggle();s();x.eq(d).focus()});x.bind("click.sSelect",function(B){var A=a(B.target);d=x.index(A);v=true;h(d);z.hide();r.css("position","static")});x.bind("mouseenter.sSelect",function(B){var A=a(B.target);A.addClass("ui-select-list-hover")}).bind("mouseleave.sSelect",function(B){var A=a(B.target);A.removeClass("ui-select-list-hover")});function h(A,E){x.removeClass("ui-select-item-select").eq(A).addClass("ui-select-item-select");if(z.is(":visible")){x.eq(A).focus()}var D=x.eq(A).text();var C=x.eq(A).parent().data("key");if(E==true){e.val(C);j.text(D);return false}try{e.val(C)}catch(B){e[0].selectedIndex=A}e.change();j.text(D)}e.bind("change.sSelect",function(A){$targetInput=a(A.target);if(v==true){v=false;return false}$currentOpt=$targetInput.find(":selected");d=$targetInput.find("option").index($currentOpt);h(d,true)});function q(A){a(A).unbind("keydown.sSelect").bind("keydown.sSelect",function(D){var C=D.which;v=true;switch(C){case 40:case 39:u();return false;break;case 38:case 37:k();return false;break;case 33:case 36:g();return false;break;case 34:case 35:f();return false;break;case 13:case 27:z.hide();c();return false;break}keyPressed=String.fromCharCode(C).toLowerCase();var B=m.indexOf(keyPressed);if(typeof B!="undefined"){++d;d=m.indexOf(keyPressed,d);if(d==-1||d==null||w!=keyPressed){d=m.indexOf(keyPressed)}h(d);w=keyPressed;return false}})}function u(){if(d<(y-1)){++d;h(d)}}function k(){if(d>0){--d;h(d)}}function g(){d=0;h(d)}function f(){d=y-1;h(d)}r.bind("click.sSelect",function(A){A.stopPropagation();q(this)});r.bind("focus.sSelect",function(){a(this).addClass("ui-select-box-focus");q(this)});r.bind("blur.sSelect",function(){a(this).removeClass("ui-select-box-focus")});a(document).bind("click.sSelect",function(){r.removeClass("ui-select-box-focus");z.hide();c()});j.bind("mouseenter.sSelect",function(B){var A=a(B.target);A.parent().addClass("ui-select-item-select")}).bind("mouseleave.sSelect",function(B){var A=a(B.target);A.parent().removeClass("ui-select-item-select")});z.css({left:"0px",display:"none",visibility:l.visibility})})}})(jQuery);
(function(a){a.fn.placeholder=function(b){var d={labelMode:false,labelStyle:{},labelAlpha:false,labelAcross:false};var e=a.extend({},d,b||{});var c=function(g,f){if(g.val()===""){f.css("opacity",0.4).html(g.data("placeholder"))}else{f.html("")}};a(this).each(function(){var h=a(this),g="placeholder" in document.createElement("input"),j=h.attr("placeholder");if(!j||(!e.labelMode&&g)||(e.labelMode&&!e.labelAcross&&g)){return}h.data("placeholder",j);if(e.labelMode){var f=h.attr("id"),i=null;if(!f){f="placeholder"+Math.random();h.attr("id",f)}i=a('<label for="'+f+'" class="placeholder" id="'+f+'For"></label>').css(a.extend({position:"absolute",color:"",cursor:"text"},e.labelStyle)).insertBefore(h);if(e.labelAlpha){h.bind({focus:function(){c(a(this),i)},input:function(){c(a(this),i)},blur:function(){if(this.value===""){i.css("opacity",1).html(j)}}});if(!window.screenX){h.bind("keyup",function(){c(a(this),i)});h.get(0).onpaste=function(){setTimeout(function(){c(h,i)},30)}}i.get(0).oncontextmenu=function(){h.trigger("focus");return false}}else{h.bind({focus:function(){i.html("")},blur:function(){if(a(this).val()===""){i.html(j)}}})}if(e.labelAcross){h.removeAttr("placeholder")}if(h.val()===""){i.html(j)}}else{h.bind({focus:function(){if(a(this).val()===j){a(this).val("")}a(this).css("color","")},blur:function(){if(a(this).val()===""){a(this).val(j).css("color","")}}});if(h.val()===""){h.val(j).css("color","")}}})}})(jQuery);
(function(b){b.fn.ajaxSubmit=function(p){if(!this.length){a("ajaxSubmit: skipping submit process - no element selected");return this}if(typeof p=="function"){p={success:p}}p=b.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},p||{});var s={};this.trigger("form-pre-serialize",[this,p,s]);if(s.veto){a("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(p.beforeSerialize&&p.beforeSerialize(this,p)===false){a("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var i=this.formToArray(p.semantic);if(p.data){p.extraData=p.data;for(var e in p.data){if(p.data[e] instanceof Array){for(var f in p.data[e]){i.push({name:e,value:p.data[e][f]})}}else{i.push({name:e,value:p.data[e]})}}}if(p.beforeSubmit&&p.beforeSubmit(i,this,p)===false){a("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[i,this,p,s]);if(s.veto){a("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var d=b.param(i);if(p.type.toUpperCase()=="GET"){p.url+=(p.url.indexOf("?")>=0?"&":"?")+d;p.data=null}else{p.data=d}var r=this,h=[];if(p.resetForm){h.push(function(){r.resetForm()})}if(p.clearForm){h.push(function(){r.clearForm()})}if(!p.dataType&&p.target){var m=p.success||function(){};h.push(function(j){b(p.target).html(j).each(m,arguments)})}else{if(p.success){h.push(p.success)}}p.success=function(q,k){for(var n=0,j=h.length;n<j;n++){h[n].apply(p,[q,k,r])}};var c=b("input:file",this).fieldValue();var o=false;for(var g=0;g<c.length;g++){if(c[g]){o=true}}if(p.iframe||o){if(b.browser.safari&&p.closeKeepAlive){b.get(p.closeKeepAlive,l)}else{l()}}else{b.ajax(p)}this.trigger("form-submit-notify",[this,p]);return this;function l(){var u=r[0];if(b(":input[@name=submit]",u).length){dfalertn('Error: Form elements must not be named "submit".');return}var q=b.extend({},b.ajaxSettings,p);var D=jQuery.extend(true,{},b.extend(true,{},b.ajaxSettings),q);var t="jqFormIO"+(new Date().getTime());var z=b('<iframe id="'+t+'" name="'+t+'" />');var B=z[0];if(b.browser.msie||b.browser.opera){B.src='javascript:false;document.write("");'}z.css({position:"absolute",top:"-1000px",left:"-1000px"});var C={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;z.attr("src","about:blank")}};var A=q.global;if(A&&!b.active++){b.event.trigger("ajaxStart")}if(A){b.event.trigger("ajaxSend",[C,q])}if(D.beforeSend&&D.beforeSend(C,D)===false){D.global&&jQuery.active--;return}if(C.aborted){return}var k=0;var w=0;var j=u.clk;if(j){var v=j.name;if(v&&!j.disabled){p.extraData=p.extraData||{};p.extraData[v]=j.value;if(j.type=="image"){p.extraData[name+".x"]=u.clk_x;p.extraData[name+".y"]=u.clk_y}}}setTimeout(function(){var G=r.attr("target"),E=r.attr("action");r.attr({target:t,method:"POST",action:q.url});if(!p.skipEncodingOverride){r.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})}if(q.timeout){setTimeout(function(){w=true;x()},q.timeout)}var F=[];try{if(p.extraData){for(var H in p.extraData){F.push(b('<input type="hidden" name="'+H+'" value="'+p.extraData[H]+'" />').appendTo(u)[0])}}z.appendTo("body");B.attachEvent?B.attachEvent("onload",x):B.addEventListener("load",x,false);u.submit()}finally{r.attr("action",E);G?r.attr("target",G):r.removeAttr("target");b(F).remove()}},10);function x(){if(k++){return}B.detachEvent?B.detachEvent("onload",x):B.removeEventListener("load",x,false);var E=0;var F=true;try{if(w){throw"timeout"}var G,I;I=B.contentWindow?B.contentWindow.document:B.contentDocument?B.contentDocument:B.document;if(I.body==null&&!E&&b.browser.opera){E=1;k--;setTimeout(x,100);return}C.responseText=I.body?I.body.innerHTML:null;C.responseXML=I.XMLDocument?I.XMLDocument:I;C.getResponseHeader=function(K){var J={"content-type":q.dataType};return J[K]};if(q.dataType=="json"||q.dataType=="script"){var n=I.getElementsByTagName("textarea")[0];C.responseText=n?n.value:C.responseText}else{if(q.dataType=="xml"&&!C.responseXML&&C.responseText!=null){C.responseXML=y(C.responseText)}}G=b.httpData(C,q.dataType)}catch(H){F=false;b.handleError(q,C,"error",H)}if(F){q.success(G,"success");if(A){b.event.trigger("ajaxSuccess",[C,q])}}if(A){b.event.trigger("ajaxComplete",[C,q])}if(A&&!--b.active){b.event.trigger("ajaxStop")}if(q.complete){q.complete(C,F?"success":"error")}setTimeout(function(){z.remove();C.responseXML=null},100)}function y(n,E){if(window.ActiveXObject){E=new ActiveXObject("Microsoft.XMLDOM");E.async="false";E.loadXML(n)}else{E=(new DOMParser()).parseFromString(n,"text/xml")}return(E&&E.documentElement&&E.documentElement.tagName!="parsererror")?E:null}}};b.fn.ajaxForm=function(c){return this.ajaxFormUnbind().bind("submit.form-plugin",function(){b(this).ajaxSubmit(c);return false}).each(function(){b(":submit,input:image",this).bind("click.form-plugin",function(f){var d=this.form;d.clk=this;if(this.type=="image"){if(f.offsetX!=undefined){d.clk_x=f.offsetX;d.clk_y=f.offsetY}else{if(typeof b.fn.offset=="function"){var g=b(this).offset();d.clk_x=f.pageX-g.left;d.clk_y=f.pageY-g.top}else{d.clk_x=f.pageX-this.offsetLeft;d.clk_y=f.pageY-this.offsetTop}}}setTimeout(function(){d.clk=d.clk_x=d.clk_y=null},10)})})};b.fn.ajaxFormUnbind=function(){this.unbind("submit.form-plugin");return this.each(function(){b(":submit,input:image",this).unbind("click.form-plugin")})};b.fn.formToArray=function(q){var p=[];if(this.length==0){return p}var d=this[0];var h=q?d.getElementsByTagName("*"):d.elements;if(!h){return p}for(var k=0,m=h.length;k<m;k++){var e=h[k];var f=e.name;if(!f){continue}if(q&&d.clk&&e.type=="image"){if(!e.disabled&&d.clk==e){p.push({name:f+".x",value:d.clk_x},{name:f+".y",value:d.clk_y})}continue}var r=b.fieldValue(e,true);if(r&&r.constructor==Array){for(var g=0,c=r.length;g<c;g++){p.push({name:f,value:r[g]})}}else{if(r!==null&&typeof r!="undefined"){p.push({name:f,value:r})}}}if(!q&&d.clk){var l=d.getElementsByTagName("input");for(var k=0,m=l.length;k<m;k++){var o=l[k];var f=o.name;if(f&&!o.disabled&&o.type=="image"&&d.clk==o){p.push({name:f+".x",value:d.clk_x},{name:f+".y",value:d.clk_y})}}}return p};b.fn.formSerialize=function(c){return b.param(this.formToArray(c))};b.fn.fieldSerialize=function(d){var c=[];this.each(function(){var h=this.name;if(!h){return}var f=b.fieldValue(this,d);if(f&&f.constructor==Array){for(var g=0,e=f.length;g<e;g++){c.push({name:h,value:f[g]})}}else{if(f!==null&&typeof f!="undefined"){c.push({name:this.name,value:f})}}});return b.param(c)};b.fn.fieldValue=function(h){for(var g=[],e=0,c=this.length;e<c;e++){var f=this[e];var d=b.fieldValue(f,h);if(d===null||typeof d=="undefined"||(d.constructor==Array&&!d.length)){continue}d.constructor==Array?b.merge(g,d):g.push(d)}return g};b.fieldValue=function(c,j){var e=c.name,p=c.type,q=c.tagName.toLowerCase();if(typeof j=="undefined"){j=true}if(j&&(!e||c.disabled||p=="reset"||p=="button"||(p=="checkbox"||p=="radio")&&!c.checked||(p=="submit"||p=="image")&&c.form&&c.form.clk!=c||q=="select"&&c.selectedIndex==-1)){return null}if(q=="select"){var k=c.selectedIndex;if(k<0){return null}var m=[],d=c.options;var g=(p=="select-one");var l=(g?k+1:d.length);for(var f=(g?k:0);f<l;f++){var h=d[f];if(h.selected){var o=b.browser.msie&&!(h.attributes.value.specified)?h.text:h.value;if(g){return o}m.push(o)}}return m}return c.value};b.fn.clearForm=function(){return this.each(function(){b("input,select,textarea",this).clearFields()})};b.fn.clearFields=b.fn.clearInputs=function(){return this.each(function(){var d=this.type,c=this.tagName.toLowerCase();if(d=="text"||d=="password"||c=="textarea"){this.value=""}else{if(d=="checkbox"||d=="radio"){this.checked=false}else{if(c=="select"){this.selectedIndex=-1}}}})};b.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};b.fn.enable=function(c){if(c==undefined){c=true}return this.each(function(){this.disabled=!c})};b.fn.selected=function(c){if(c==undefined){c=true}return this.each(function(){var d=this.type;if(d=="checkbox"||d=="radio"){this.checked=c}else{if(this.tagName.toLowerCase()=="option"){var e=b(this).parent("select");if(c&&e[0]&&e[0].type=="select-one"){e.find("option").selected(false)}this.selected=c}}})};function a(){if(b.fn.ajaxSubmit.debug&&window.console&&window.console.log){window.console.log("[jquery.form] "+Array.prototype.join.call(arguments,""))}}})(jQuery);
(function(a){a.fn.checkboxAll=function(b){var d={chkName:"cheItem",chkClass:"itemCheck",splitObj:",",callback:function(){}},b=a.extend(d,b),f=a(this),e=a("input[name='"+b.chkName+"']"),c=0;e.click(function(){var i=0;var h="";var g="";a("[name="+b.chkName+"]").each(function(){if(a(this).attr("checked")){i+=Number(a(this).attr("acountVal"));h+=a(this).attr("value")+b.splitObj;a(this).parent().parent().addClass(b.chkClass)}else{a(this).parent().parent().removeClass(b.chkClass);g+=a(this).attr("noValue")+b.splitObj}if(e.filter(":checked").length==e.length){f.attr("checked",true)}else{f.removeAttr("checked")}});c=e.filter(":checked").length;if(typeof b.callback==="function"){b.callback(h,c,i,g)}});f.click(function(){if(a(this).attr("checked")){e.attr("checked",true)}else{e.removeAttr("checked")}var i=0;var h="";var g="";a("[name="+b.chkName+"]").each(function(){if(a(this).attr("checked")){i+=Number(a(this).attr("acountVal"));h+=a(this).attr("value")+b.splitObj;a(this).parent().parent().addClass(b.chkClass)}else{a(this).parent().parent().removeClass(b.chkClass);g+=a(this).attr("noValue")+b.splitObj}if(e.filter(":checked").length==e.length){f.attr("checked",true)}else{f.removeAttr("checked")}});c=e.filter(":checked").length;if(typeof b.callback==="function"){b.callback(h,c,i,g)}})}})(jQuery);
(function(a){a.fn.tableHover=function(b){var c={item:"",evenClass:"itemEven",oddClass:"itemOdd",onClass:"itemOn"};var b=a.extend(c,b);if(!b.item){this.each(function(){var d=a(this);a(d).find("tr:even").addClass(b.evenClass);a(d).find("tr:odd").addClass(b.oddClass);a(d).find("tr").bind("mouseover",function(){a(this).addClass(b.onClass)});a(d).find("tr").bind("mouseout",function(){a(this).removeClass(b.onClass)})})}else{this.each(function(){var d=a(this);a(d).find(b.item+":even").addClass(b.evenClass);a(d).find(b.item+":odd").addClass(b.oddClass);a(d).find(b.item).bind("mouseover",function(){a(this).addClass(b.onClass)});a(d).find(b.item).bind("mouseout",function(){a(this).removeClass(b.onClass)})})}}})(jQuery);
(function(a){a.fn.dropdownNav=function(b){var d={dropdownEl:".dropdown-menu",openedClass:"dropdown-open",delayTime:100};var c=a.extend(d,b);return this.each(function(){var f=null;var e=null;var g=null;var h=null;a(this).hover(function(){if(g){clearTimeout(g)}f=a(this);g=setTimeout(function(){f.addClass(c.openedClass).find(c.dropdownEl).show()},c.delayTime);e=f},function(){if(g){clearTimeout(g)}g=setTimeout(function(){e.removeClass(c.openedClass).find(c.dropdownEl).hide()},c.delayTime)});a(this).bind("click",function(){if(g){clearTimeout(g)}g=setTimeout(function(){e.removeClass(c.openedClass).find(c.dropdownEl).hide()},c.delayTime)})})}})(jQuery);

(function(a){a.extend(a.fn,{validate:function(b){if(!this.length){b&&b.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return}var c=a.data(this[0],"validator");if(c){return c}c=new a.validator(b,this[0]);a.data(this[0],"validator",c);if(c.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){c.cancelSubmit=true});if(c.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){c.submitButton=this})}this.submit(function(d){if(c.settings.debug){d.preventDefault()}function e(){if(c.settings.submitHandler){if(c.submitButton){var f=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)}c.settings.submitHandler.call(c,c.currentForm);if(c.submitButton){f.remove()}return false}return true}if(c.cancelSubmit){c.cancelSubmit=false;return e()}if(c.form()){if(c.pendingRequest){c.formSubmitted=true;return false}return e()}else{c.focusInvalid();return false}})}return c},valid:function(){if(a(this[0]).is("form")){return this.validate().form()}else{var c=true;var b=a(this[0].form).validate();this.each(function(){c&=b.element(this)});return c}},removeAttrs:function(d){var b={},c=this;a.each(d.split(/\s/),function(e,f){b[f]=c.attr(f);c.removeAttr(f)});return b},rules:function(e,b){var g=this[0];if(e){var d=a.data(g.form,"validator").settings;var i=d.rules;var j=a.validator.staticRules(g);switch(e){case"add":a.extend(j,a.validator.normalizeRule(b));i[g.name]=j;if(b.messages){d.messages[g.name]=a.extend(d.messages[g.name],b.messages)}break;case"remove":if(!b){delete i[g.name];return j}var h={};a.each(b.split(/\s/),function(k,l){h[l]=j[l];delete j[l]});return h}}var f=a.validator.normalizeRules(a.extend({},a.validator.metadataRules(g),a.validator.classRules(g),a.validator.attributeRules(g),a.validator.staticRules(g)),g);if(f.required){var c=f.required;delete f.required;f=a.extend({required:c},f)}return f}});a.extend(a.expr[":"],{blank:function(b){return !a.trim(""+b.value)},filled:function(b){return !!a.trim(""+b.value)},unchecked:function(b){return !b.checked}});a.validator=function(b,c){this.settings=a.extend(true,{},a.validator.defaults,b);this.currentForm=c;this.init()};a.validator.format=function(b,c){if(arguments.length==1){return function(){var d=a.makeArray(arguments);d.unshift(b);return a.validator.format.apply(this,d)}}if(arguments.length>2&&c.constructor!=Array){c=a.makeArray(arguments).slice(1)}if(c.constructor!=Array){c=[c]}a.each(c,function(d,e){b=b.replace(new RegExp("\\{"+d+"\\}","g"),e)});return b};a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"success",errorElement:"span",focusInvalid:true,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(b){this.lastActive=b;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,b,this.settings.errorClass,this.settings.validClass);this.errorsFor(b).hide()}},onfocusout:function(b){if(!this.checkable(b)&&(b.name in this.submitted||!this.optional(b))){this.element(b)}},onkeyup:function(b){if(b.name in this.submitted||b==this.lastElement){this.element(b)}},onclick:function(b){if(b.name in this.submitted){this.element(b)}else{if(b.parentNode.name in this.submitted){this.element(b.parentNode)}}},highlight:function(d,b,c){a(d).addClass(b).removeClass(c)},unhighlight:function(d,b,c){a(d).removeClass(b).addClass(c)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=a(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm);this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=(this.groups={});a.each(this.settings.groups,function(e,f){a.each(f.split(/\s/),function(h,g){b[g]=e})});var d=this.settings.rules;a.each(d,function(e,f){d[e]=a.validator.normalizeRule(f)});function c(g){var f=a.data(this[0].form,"validator"),e="on"+g.type.replace(/^validate/,"");f.settings[e]&&f.settings[e].call(f,this[0])}a(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",c).validateDelegate(":radio, :checkbox, select, option","click",c);if(this.settings.invalidHandler){a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();a.extend(this.submitted,this.errorMap);this.invalid=a.extend({},this.errorMap);if(!this.valid()){a(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var b=0,c=(this.currentElements=this.elements());c[b];b++){this.check(c[b])}return this.valid()},element:function(c){c=this.clean(c);this.lastElement=c;this.prepareElement(c);this.currentElements=a(c);var b=this.check(c);if(b){delete this.invalid[c.name]}else{this.invalid[c.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return b},showErrors:function(c){if(c){a.extend(this.errorMap,c);this.errorList=[];for(var b in c){this.errorList.push({message:c[b],element:this.findByName(b)[0]})}this.successList=a.grep(this.successList,function(d){return !(d.name in c)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){if(a.fn.resetForm){a(this.currentForm).resetForm()}this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(d){var c=0;for(var b in d){c++}return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}}},findLastActive:function(){var b=this.lastActive;return b&&a.grep(this.errorList,function(c){return c.element.name==b.name}).length==1&&b},elements:function(){var c=this,b={};return a([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&c.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!c.objectLength(a(this).rules())){return false}b[this.name]=true;return true})},clean:function(b){return a(b)[0]},errors:function(){return a(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=a([]);this.toHide=a([]);this.currentElements=a([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(b){this.reset();this.toHide=this.errorsFor(b)},check:function(c){c=this.clean(c);if(this.checkable(c)){c=this.findByName(c.name)[0]}var h=a(c).rules();var d=false;for(method in h){var g={method:method,parameters:h[method]};try{var b=a.validator.methods[method].call(this,c.value.replace(/\r/g,""),c,g.parameters);if(b=="dependency-mismatch"){d=true;continue}d=false;if(b=="pending"){this.toHide=this.toHide.not(this.errorsFor(c));return}if(!b){this.formatAndAdd(c,g);return false}}catch(f){this.settings.debug&&window.console&&console.log("exception occured when checking element "+c.id+", check the '"+g.method+"' method",f);throw f}}if(d){return}if(this.objectLength(h)){this.successList.push(c)}return true},customMetaMessage:function(b,d){if(!a.metadata){return}var c=this.settings.meta?a(b).metadata()[this.settings.meta]:a(b).metadata();return c&&c.messages&&c.messages[d]},customMessage:function(c,d){var b=this.settings.messages[c];return b&&(b.constructor==String?b:b[d])},findDefined:function(){for(var b=0;b<arguments.length;b++){if(arguments[b]!==undefined){return arguments[b]}}return undefined},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customMetaMessage(b,c),!this.settings.ignoreTitle&&b.title||undefined,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(c,e){var d=this.defaultMessage(c,e.method),b=/\$?\{(\d+)\}/g;if(typeof d=="function"){d=d.call(this,e.parameters,c)}else{if(b.test(d)){d=jQuery.format(d.replace(b,"{$1}"),e.parameters)}}this.errorList.push({message:d,element:c});this.errorMap[c.name]=d;this.submitted[c.name]=d},addWrapper:function(b){if(this.settings.wrapper){b=b.add(b.parent(this.settings.wrapper))}return b},defaultShowErrors:function(){for(var c=0;this.errorList[c];c++){var b=this.errorList[c];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(var c=0;this.successList[c];c++){this.showLabel(this.successList[c])}}if(this.settings.unhighlight){for(var c=0,d=this.validElements();d[c];c++){this.settings.unhighlight.call(this,d[c],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(c,d){var b=this.errorsFor(c);if(b.length){b.removeClass().addClass(this.settings.errorClass);b.attr("generated")&&b.html(d)}else{b=a("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(c),generated:true}).addClass(this.settings.errorClass).html(d||"");if(this.settings.wrapper){b=b.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(b).length){this.settings.errorPlacement?this.settings.errorPlacement(b,a(c)):b.insertAfter(c)}}if(!d&&this.settings.success){b.text("");typeof this.settings.success=="string"?b.addClass(this.settings.success):this.settings.success(b)}this.toShow=this.toShow.add(b)},errorsFor:function(c){var b=this.idOrName(c);return this.errors().filter(function(){return a(this).attr("for")==b})},idOrName:function(b){return this.groups[b.name]||(this.checkable(b)?b.name:b.id||b.name)},checkable:function(b){return/radio|checkbox/i.test(b.type)},findByName:function(b){var c=this.currentForm;return a(document.getElementsByName(b)).map(function(d,e){return e.form==c&&e.name==b&&e||null})},getLength:function(c,b){switch(b.nodeName.toLowerCase()){case"select":return a("option:selected",b).length;case"input":if(this.checkable(b)){return this.findByName(b.name).filter(":checked").length}}return c.length},depend:function(c,b){return this.dependTypes[typeof c]?this.dependTypes[typeof c](c,b):true},dependTypes:{"boolean":function(c,b){return c},string:function(c,b){return !!a(c,b.form).length},"function":function(c,b){return c(b)}},optional:function(b){return !a.validator.methods.required.call(this,a.trim(b.value),b)&&"dependency-mismatch"},startRequest:function(b){if(!this.pending[b.name]){this.pendingRequest++;this.pending[b.name]=true}},stopRequest:function(b,c){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[b.name];if(c&&this.pendingRequest==0&&this.formSubmitted&&this.form()){a(this.currentForm).submit();this.formSubmitted=false}else{if(!c&&this.pendingRequest==0&&this.formSubmitted){a(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}}},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:true,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(b,c){b.constructor==String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(c){var d={};var b=a(c).attr("class");b&&a.each(b.split(" "),function(){if(this in a.validator.classRuleSettings){a.extend(d,a.validator.classRuleSettings[this])}});return d},attributeRules:function(c){var e={};var b=a(c);for(method in a.validator.methods){var d=b.attr(method);if(d){e[method]=d}}if(e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)){delete e.maxlength}return e},metadataRules:function(b){if(!a.metadata){return{}}var c=a.data(b.form,"validator").settings.meta;return c?a(b).metadata()[c]:a(b).metadata()},staticRules:function(c){var d={};var b=a.data(c.form,"validator");if(b.settings.rules){d=a.validator.normalizeRule(b.settings.rules[c.name])||{}}return d},normalizeRules:function(c,b){a.each(c,function(f,e){if(e===false){delete c[f];return}if(e.param||e.depends){var d=true;switch(typeof e.depends){case"string":d=!!a(e.depends,b.form).length;break;case"function":d=e.depends.call(b,b);break}if(d){c[f]=e.param!==undefined?e.param:true}else{delete c[f]}}});a.each(c,function(d,e){c[d]=a.isFunction(e)?e(b):e});a.each(["minlength","maxlength","min","max"],function(){if(c[this]){c[this]=Number(c[this])}});a.each(["rangelength","range"],function(){if(c[this]){c[this]=[Number(c[this][0]),Number(c[this][1])]}});if(a.validator.autoCreateRanges){if(c.min&&c.max){c.range=[c.min,c.max];delete c.min;delete c.max}if(c.minlength&&c.maxlength){c.rangelength=[c.minlength,c.maxlength];delete c.minlength;delete c.maxlength}}if(c.messages){delete c.messages}return c},normalizeRule:function(c){if(typeof c=="string"){var b={};a.each(c.split(/\s/),function(){b[this]=true});c=b}return c},addMethod:function(b,d,c){a.validator.methods[b]=d;a.validator.messages[b]=c!=undefined?c:a.validator.messages[b];if(d.length<3){a.validator.addClassRules(b,a.validator.normalizeRule(b))}},methods:{required:function(c,b,e){if(!this.depend(e,b)){return"dependency-mismatch"}switch(b.nodeName.toLowerCase()){case"select":var d=a(b).val();return d&&d.length>0;case"input":if(this.checkable(b)){return this.getLength(c,b)>0}default:return a.trim(c).length>0}},remote:function(f,c,g){if(this.optional(c)){return"dependency-mismatch"}var d=this.previousValue(c);if(!this.settings.messages[c.name]){this.settings.messages[c.name]={}}d.originalMessage=this.settings.messages[c.name].remote;this.settings.messages[c.name].remote=d.message;g=typeof g=="string"&&{url:g}||g;if(d.old!==f){d.old=f;var b=this;this.startRequest(c);var e={};e[c.name]=f;a.ajax(a.extend(true,{url:g,mode:"abort",port:"validate"+c.name,dataType:"json",data:e,async:false,success:function(i){b.settings.messages[c.name].remote=d.originalMessage;var k=i===true;if(k){var h=b.formSubmitted;b.prepareElement(c);b.formSubmitted=h;b.successList.push(c);b.showErrors()}else{var l={};var j=(d.message=i||b.defaultMessage(c,"remote"));l[c.name]=a.isFunction(j)?j(f):j;b.showErrors(l)}d.valid=k;b.stopRequest(c,k)}},g));return"pending"}else{if(this.pending[c.name]){return"pending"}}return d.valid},minlength:function(c,b,d){return this.optional(b)||this.getLength(a.trim(c),b)>=d},maxlength:function(c,b,d){return this.optional(b)||this.getLength(a.trim(c),b)<=d},rangelength:function(d,b,e){var c=this.getLength(a.trim(d),b);return this.optional(b)||(c>=e[0]&&c<=e[1])},min:function(c,b,d){return this.optional(b)||c>=d},max:function(c,b,d){return this.optional(b)||c<=d},range:function(c,b,d){return this.optional(b)||(c>=d[0]&&c<=d[1])},email:function(c,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(c)},url:function(c,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)},date:function(c,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(c))},dateISO:function(c,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(c)},number:function(c,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(c)},digits:function(c,b){return this.optional(b)||/^\d+$/.test(c)},creditcard:function(f,c){if(this.optional(c)){return"dependency-mismatch"}if(/[^0-9-]+/.test(f)){return false}var g=0,e=0,b=false;f=f.replace(/\D/g,"");for(var h=f.length-1;h>=0;h--){var d=f.charAt(h);var e=parseInt(d,10);if(b){if((e*=2)>9){e-=9}}g+=e;b=!b}return(g%10)==0},accept:function(c,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||c.match(new RegExp(".("+d+")$","i"))},equalTo:function(c,b,e){var d=a(e).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(b).valid()});return c==d.val()}}});a.format=a.validator.format})(jQuery);(function(c){var b=c.ajax;var a={};c.ajax=function(e){e=c.extend(e,c.extend({},c.ajaxSettings,e));var d=e.port;if(e.mode=="abort"){if(a[d]){a[d].abort()}return(a[d]=b.apply(this,arguments))}return b.apply(this,arguments)}})(jQuery);(function(a){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){a.each({focus:"focusin",blur:"focusout"},function(c,b){a.event.special[b]={setup:function(){this.addEventListener(c,d,true)},teardown:function(){this.removeEventListener(c,d,true)},handler:function(f){arguments[0]=a.event.fix(f);arguments[0].type=b;return a.event.handle.apply(this,arguments)}};function d(f){f=a.event.fix(f);f.type=b;return a.event.handle.call(this,f)}})}a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(e){var f=a(e.target);if(f.is(d)){return b.apply(f,arguments)}})}})})(jQuery);
(function($){$.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(type,name){this.defaults.type=type;this.defaults.name=name},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);if(!settings.single.length){settings.single="metadata"}var data=$.data(elem,settings.single);if(data){return data}data="{}";if(settings.type=="class"){var m=settings.cre.exec(elem.className);if(m){data=m[1]}}else{if(settings.type=="elem"){if(!elem.getElementsByTagName){return undefined}var e=elem.getElementsByTagName(settings.name);if(e.length){data=$.trim(e[0].innerHTML)}}else{if(elem.getAttribute!=undefined){var attr=elem.getAttribute(settings.name);if(attr){data=attr}}}}if(data.indexOf("{")<0){data="{"+data+"}"}data=eval("("+data+")");$.data(elem,settings.single,data);return data}}});$.fn.metadata=function(opts){return $.metadata.get(this[0],opts)}})(jQuery);


//自定义位置
$.validator.setDefaults({
	errorPlacement: function (error, element) {
		var ID = element.attr('validator') || element.attr('id');
		if (!ID || error.html() == '') return;
		error.parent().removeClass().addClass("error").attr("for", ID);
		if ($("#validator-" + ID).length == 0) element.parent().append("<span id=\"validator-" + ID + "\"></span>");
		if ($("#validator-" + ID + ">span").size() == 0) {
			$("#validator-" + ID).html(error);
		} else {
			var L = $("#validator-" + ID + ">span");
			if ($.trim(L.html()) == '' || L.attr("for") == element.attr('id')) L.attr("for", element.attr('id')).html(error.html());
			L.parent().removeClass().addClass("error")
		}
	},
	success: function (label) {
		var ID = label.attr("for");
		if ($.trim($("#validator-" + ID).text()) == '') {
			$("#validatorId-" + ID + ">span").parent().removeClass('error').addClass("success").html(' ');
		}
	},
	ignore:'',
	//focusInvalid:false,
	onkeyup: false
});



//验证
jQuery.extend(jQuery.validator.messages, {
	required: "此项不为空",
	remote: "请修正该字段",
	email: "请输入正确格式的电子邮件",
	url: "请输入合法的网址",
	date: "请输入合法的日期",
	dateISO: "请输入合法的日期 .",
	number: "请输入合法的数字",
	digits: "只能输入整数",
	creditcard: "请输入合法的信用卡号",
	equalTo: "请再次输入相同的值",
	accept: "请输入拥有合法后缀名",
	maxlength: $.format("不能超过{0}个字符"),
	minlength: $.format("至少输入{0}个字符"),
	rangelength: $.format("请输入长度介于{0}和{1}间的字符"),
	range: $.format("请输入介于{0}和{1}之间的值"),
	max: $.format("请输入最大为{0}的值"),
	min: $.format("请输入最小为{0}的值")
});



//mini msgCallback
x.msgCallBack = {
	succ:function(info,close){
		return '<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-succ"></span><em class="ui-miniMsg-succ">'+info+'</em><span class="ico-minMsg-end"></span>'+close+'</span></div>';
	},
	fail:function(info,close){
		return '<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-fail "></span><em class="ui-miniMsg-fail">'+info+'</em><span class="ico-minMsg-end"></span>'+close+'</span></div>';
	},
	hits:function(info,close){
		return '<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-hits"></span><em class="ui-miniMsg-hits">'+info+'</em><span class="ico-minMsg-end"></span>'+close+'</span></div>';
	},
	loading:function(info,close){
		return '<div class="ui-miniMsg-box"><span class="miniMsg-box"><span class="ico-minMsg-loading"><img src="' + x.config.imgFile + 'loading.gif"></span><em class="ui-miniMsg-loading">'+info+'</em><span class="ico-minMsg-end"></span>'+close+'</span></div>';
	}
};


//min Alert

/*
	type 提示类型  succ  fail hits loading
	info 对应类型提示文字
	time 是否自动关闭,自动关闭使用number 2000/3000 主动关闭使用false 适用于弹出层里面返回提示 true 自动关闭适用于一般页面返回
	callback 关闭回调方法
*/

x.miniAlert = function (type,info,time,callback){
	if("undefined" == typeof time){
		alert("缺少时间参数，请检查");
	}
	var time,close;
	if (typeof time === "number") {
		close="";
		time=time;
	}
	if (typeof time === "boolean") {
		if(time){ //true 有关闭，默认2.5秒自动关闭
			close="<a href='javascript:;' class='ui-miniMsg-box-close' id=ui-miniMsg-box-close-"+type+" hidefocus='true'>关闭</a>";
			time=2500;
		}else{ //false 有关闭 进行自动关闭
			close="<a href='javascript:;' class='ui-miniMsg-box-close' id=ui-miniMsg-box-close-"+type+" hidefocus='true'>关闭</a>";
			time="";
		}
	}
	switch(type) {
		case "succ":
			$("#ui-miniMsg-box-close-"+type).live("click",function(){
					x.Dialog.close("dialog-miniAlert-succ",callback);
			});
			x.Dialog({
				showtitle: "remove",
				boxID: "dialog-miniAlert-succ",
				time:time,
				showbg:(typeof time === "number")?true:false,
				content:"text:"+x.msgCallBack.succ(info,close),
				cfns:function(){
					if(typeof(callback)=='function'){
						callback();
					}else{
						x.Dialog.close("dialog-miniAlert-succ");
					}
				}
			});
		break;
		case "fail":
			$("#ui-miniMsg-box-close-"+type).live("click",function(){
					x.Dialog.close("dialog-miniAlert-fail",callback);
			});
			x.Dialog({
				showtitle: "remove",
				boxID: "dialog-miniAlert-fail",
				time:time,
				showbg:(typeof time === "number")?true:false,
				content:"text:"+x.msgCallBack.fail(info,close),
				cfns:function(){
					if(typeof(callback)=='function'){
						callback();
					}else{
						x.Dialog.close("dialog-miniAlert-fail");
					}
				}
			});
		break;
		case "hits":
			$("#ui-miniMsg-box-close-"+type).live("click",function(){
					x.Dialog.close("dialog-miniAlert-hits",callback);
			});
			x.Dialog({
				showtitle: "remove",
				boxID: "dialog-miniAlert-hits",
				time:time,
				showbg:(typeof time === "number")?true:false,
				content:"text:"+x.msgCallBack.hits(info,close),
				cfns:function(){
					if(typeof(callback)=='function'){
						callback();
					}else{
						x.Dialog.close("dialog-miniAlert-hits");
					}
				}
			});
		break;
		case "loading":
			x.Dialog({
				showtitle: "remove",
				boxID: "dialog-miniAlert-loading",
				time:time,
				showbg:(typeof time === "number")?true:false,
				content:"text:"+x.msgCallBack.loading(info,close),
				cfns:function(){
					if(typeof(callback)=='function'){
						callback();
					}else{
						x.Dialog.close("dialog-miniAlert-loading");
					}
				}
			});
			$("#ui-miniMsg-box-close-"+type).bind("click",function(){
				 x.Dialog.close("dialog-miniAlert-loading",callback);
			});
		break;
	}
};

//alert 自动2.5秒关闭
x.alert = function (info,callback){
	x.Dialog({
		title:"系统提示",
		boxID: "dialog-alert",
		width:400,
		time:2500,
		content:"text:<div class='ui-alert-box'><p class='ui-alert-content'><em>"+info+"</em></p></div>",
		cfns:function(){
			if(typeof(callback)=='function'){
				callback();
			}else{
				x.Dialog.close("dialog-alert");
			}
		}
	});
};

//confirmAlert 提示
x.confirmAlert = function (info,callback){
	x.Dialog({
		title:"系统提示",
		boxID: "dialog-confirmAlert",
		width:400,
		yesBtn:["关闭",function(){
			if(callback){callback();}else{x.Dialog.close("dialog-confirmAlert");}
		}],
		content:"text:<div class='ui-confirmAlert-box'><p class='ui-confirmAlert-content'><em>"+info+"</em></p></div>"
	});
};

//confirm 提示
x.confirm = function (info,callbackYes,callbackNo){
	x.Dialog({
		title:"系统提示",
		boxID: "dialog-confirm",
		width:400,
		yesBtn:["确定",function(){
			if(callbackYes){callbackYes();}else{x.Dialog.close("dialog-confirm");}
		}],
		noBtn: ["取消",function(){
			if(callbackNo){callbackNo();}else{x.Dialog.close("dialog-confirm");}
		}],
		content:"text:<div class='ui-confirm-box'><p class='ui-confirm-content'><em>"+info+"</em></p></div>"
	});
};


x.tipConfig ={
	close:"关闭",
	loadingBoxId:"弹出层ID错误，无法关闭，请检查！",
	loading:"加载中，请稍等！",
	error:"数据加载出错！",
	errorImg:"加载图片出错，请检查图片是否存在！",
	errorUrl:"加载数据出错，请检查页面是否存在！",
	errorIframe:"加载数据出错，请检查链接是否存在！"
};


/*
	demo action operation
	使用场景
	列表数据 新建修改 弹出
 */

/*
	打开 dialog 请求代码片段
	o 当前元素
	w 宽度
	h 高度
	id 传值ID 默认为 -1 即为新增
*/
x.openWin = function (o,w,h,id){
	var url = $(o).attr("dataUrl"),titleName = $(o).attr("title"),flag = url.indexOf("?");
	if(flag>0){
		url = url +"&time="+new Date().getTime();
	}else{
		url = url +"?time="+new Date().getTime();
	}
	x.Dialog({
		boxID: "dialog-win",
		showborder: false,
		title :titleName,
		width:w,
		height:h,
		content : "url:get?"+url,
		ofns:function(){
			if($.browser.msie) {
				 $(".ui-placeholder").placeholder({
					labelMode:true,
					labelAlpha:false,
					labelAcross:true
				});
			}
		}
	});
};
//关闭 dialog
x.closeWin = function(){
	x.Dialog.close('dialog-win');
};

/*
	打开 dialog 请求远程页面
	o 当前元素
	w 宽度
	h 高度
*/
x.openWinIframe = function (o,w,h){
	var url = $(o).attr("dataUrl"),titleName = $(o).attr("title"),flag = url.indexOf("?");
	if(flag>0){
		url = url +"&time="+new Date().getTime();
	}else{
		url = url +"?time="+new Date().getTime();
	}
	x.Dialog({
		boxID: "dialog-iframe",
		title :titleName,
		width:w,
		height:h,
		content : "iframe:"+url
	});
};
//关闭 dialog iframe
x.closeWinIframe = function(){
	parent.x.Dialog.close('dialog-iframe');
};


/*
	更新状态
	o 当前元素
	updateId 更新状态ID
	state 为传递状态值
*/
x.updateData =function (o,id,state){
	var updateId = $("#"+id).val();
	var tips;
	var url = $(o).attr("dataUrl");
	var flag = url.indexOf("?");
	if(flag>0){
		url = url +"&time="+new Date().getTime();
	}else{
		url = url +"?time="+new Date().getTime();
	}
	if(updateId==""){
		x.miniAlert('hits','请至少选择一条记录',true);
		return false;
	}
	if(state==1){
		tips ="确定要启用此记录吗？"
	}else{
		tips = "确定要停用此记录吗？"
	}
	x.confirm(tips,function(){
		x.miniAlert('succ','操作成功',true,function(){alert("回调操作方法")});
		return false;//程序后续编写ajax 删除方法
		$.ajax({
		  type: "post",
		  cache:false,
		  url:url,
		  data :"updateId="+updateId+"&state="+state,
		  success: function(data){
			if (data.msg != '0' && data.msg != undefined) {//返回成功处理自行编写
				x.confirmAlert(data.msg,function(){
					//location.href=data.params;
					//window.location.href=window.location.href;
				});
			}else{
				x.confirmAlert(data.msg);
			}
		  }
		});
	})
};
/*
	删除
	o 当前元素
	deleteId 删除ID
*/
x.deleteData=function(o,id){
	var deleteId = $("#"+id).val();
	var url = $(o).attr("dataUrl");
	var flag = url.indexOf("?");
	if(flag>0){
		url = url +"&time="+new Date().getTime();
	}else{
		url = url +"?time="+new Date().getTime();
	}
	if(deleteId=="")
	{
		x.miniAlert('hits','请至少选择一条要删除的记录',true);
		return false;
	}
	x.confirm("确认要删除此记录吗？",function(){
		x.miniAlert('succ','操作成功',2000,function(){
			alert("删除成功返回");
		});
		return false;//程序后续编写ajax 删除方法
		$.ajax({
		  type: "post",
		  cache:false,
		  url:url,
		  data :"deleteId="+deleteId,
		  success: function(data){

			if (data.msg != '0' && data.msg != undefined) {//返回成功处理自行编写
				x.confirmAlert(data.msg,function(){
					//location.href=data.params;
					//window.location.href=window.location.href;
				});
			}else{
				x.confirmAlert(data.msg);
			}
		  }
		});
	})
};

/*
$(function(){
	 $.ajaxSetup({
        contentType:"application/x-www-form-urlencoded;charset=utf-8",
        timeout:20000,
        error:function(xhr, textStatus, data){

		},
        complete:function(xhr,textStatus){
        	if(xhr.status == 2000){//session超时
        		window.location.href=window.location.href;
        		return;
        	}else if(xhr.status == 2001){//先不管。
        		x.miniAlert("fail","您好，请求发生异常，请稍后重试，或联系管理员。");
            	return;
        	}else if(xhr.status == 0 ){//请求发生异常 xhr.status==0可能是ajax被取消，如用户名检验不停请求，并把之前请求取消
        		return;
        	}
        	if(textStatus=="timeout"){//请求超时
            	x.miniAlert("hits","请求超时，请稍后重试。");
            }else if(textStatus=="notmodified"){//数据未改变，不用处理

            }else if(textStatus=="parsererror"){//json，xml匹配错误
            	x.miniAlert("fail","您好，返回数据匹配错误。请联系管理员。");
            }else if(textStatus=="error"){
				$(".ui_dialog_wrap").remove();
				x.Dialog.close("dialog-win");

            	//x.confirmAlert("您好，请求发生错误。请刷新页面重试。");
            	x.miniAlert("fail","您好，请求发生错误。请刷新页面重试。");
            }else if(textStatus==400){
            	//x.confirmAlert("您好，请求发生错误。请刷新页面重试。");
            	x.miniAlert("fail","请求不纯在。");
            }
        }
     });
 });
 */


(function($){
	$.fn.formSubmit = function(options){
		var defaults = {
			loadHtml:"正在保存数据",
			form:"",
			callback : "",
			callbefore :""
		};
		var opts = $.extend(defaults, options);
		$(opts.form+" :text,"+opts.form+" :password").focus(function(){
			var v = $(this).val();
			if (v == '' && !$(this).is('.form-error')){
			}
			$(this).parent().parent().addClass("form-focus");
		}).blur(function(){
			$(this).valid();
		});
		$(opts.form+" select").change(function(){
			$(this).valid();
		});
		$(opts.form+" .ui-calendar").select(function(){
			$(this).valid();
		});
		this.bind("click", function(){
			if ($(opts.form).valid()){
				if(opts.callbefore != "" && $.isFunction(opts.callbefore)) {
					opts.callbefore(this);
				}
				if($(this).attr("type")!="submit"){
					$(this).hide();
					$("<span class='loadFormSubmit'><span><em>"+opts.loadHtml+"</em></span></span>").insertAfter(this);
					setTimeout(function(){
						$(opts.form).submit();
					},0);
				}else{
					$(this).hide();
					$("<span class='loadFormSubmit'><span><em>"+opts.loadHtml+"</em></span></span>").insertAfter(this);
				}
				if(opts.callback != "" && $.isFunction(opts.callback)) {
					opts.callback(this);
				}
			}

		});
	};
})(jQuery);





