//var x = typeof $ === "function" ? window.$ : {};x.config = {jsFile: "../style/js/",cssFile: "../style/css/",imgFile: "../style/images/"};x.getName=function(b){return document.getElementsByName(b)};x.getID=function(a){return document.getElementById(a)};x.getTag=function(a){return document.getElementsByTagName(a)};x.ct=function(a){return document.createTextNode(a)};x.ce=function(a){return document.createElement(a)};x.stopBubble=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=true};x.stopDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=false};x.getStyle=function(a){return a.currentStyle||document.defaultView.getComputedStyle(a,null)};x.exid=function(b){var a=document.getElementById(b);if(a){return true}else{return false}};x.bind=function(c,b,a){if(c.attachEvent){c["e"+b+a]=a;c[b+a]=function(){c["e"+b+a](window.event)};c.attachEvent("on"+b,c[b+a])}else{c.addEventListener(b,a,false)}};x.unbind=function(d,c,b){if(d.detachEvent){try{d.detachEvent("on"+c,d[c+b]);d[c+b]=null}catch(a){}}else{d.removeEventListener(c,b,false)}};x.Browser=function(){var d=navigator.userAgent.toLowerCase();var c={};c.isStrict=document.compatMode=="CSS1Compat";c.isFirefox=d.indexOf("firefox")>-1;c.isOpera=d.indexOf("opera")>-1;c.isSafari=(/webkit|khtml/).test(d);c.isSafari3=c.isSafari&&d.indexOf("webkit/5")!=-1;c.isIE=!c.isOpera&&d.indexOf("msie")>-1;c.isIE6=!c.isOpera&&d.indexOf("msie 6")>-1;c.isIE7=!c.isOpera&&d.indexOf("msie 7")>-1;c.isIE8=!c.isOpera&&d.indexOf("msie 8")>-1;c.isGecko=!c.isSafari&&d.indexOf("gecko")>-1;c.isMozilla=document.all!=undefined&&document.getElementById!=undefined&&!window.opera!=undefined;return c}();x.pageSize={get:function(){var i=x.Browser.isStrict?document.documentElement:document.body;var h=["clientWidth","clientHeight","scrollWidth","scrollHeight"];var k={};for(var j in h){k[h[j]]=i[h[j]]}k.scrollLeft=document.body.scrollLeft||document.documentElement.scrollLeft;k.scrollTop=document.body.scrollTop||document.documentElement.scrollTop;return k}};x.getPosition=function(i){if(typeof(i)=="string"){i=x.getID(i)}var k=0;var j=0;var a=i.offsetWidth;var b=i.offsetHeight;do{j+=i.offsetTop||0;k+=i.offsetLeft||0;i=i.offsetParent}while(i);return{x:k,y:j,width:a,height:b}};x.safeRange=function(l){var v=x.getID(l);var u,t,r,q,o,m,i,a;i=v.offsetWidth;a=v.offsetHeight;p=x.pageSize.get();u=0;r=p.clientWidth-i;o=r/2;t=0;q=p.clientHeight-a;var n=p.clientHeight*0.382-a/2;m=(a<p.clientHeight/2)?n:q/2;if(o<0){o=0}if(m<0){m=0}return{width:i,height:a,minX:u,minY:t,maxX:r,maxY:q,centerX:o,centerY:m}};x.setXY=function(j,k,a,i){var c=x.pageSize.get(),d=x.safeRange(j),b=x.getID(j);if(a){s=x.safeRange(a);rp=x.getPosition(a)}var l=k,n=i===true?0:c.scrollTop;if(a!=undefined&&a!=""){var h=!l.right?parseInt(l.left):c.clientWidth-s.width-parseInt(l.right);var m=!l.bottom?parseInt(l.top):c.clientHeight-s.height-parseInt(l.bottom);left1=rp.x+parseInt(l.left);left2=rp.x+parseInt(l.left)+s.width;right1=rp.x+s.width-d.width-parseInt(l.right);right2=rp.x-d.width-parseInt(l.right);top1=rp.y+parseInt(l.top);top2=rp.y+parseInt(l.top)+s.height;bottom1=rp.y+s.height-d.height-parseInt(l.bottom);bottom2=rp.y-d.height-parseInt(l.bottom);h=!l.right?(l.lin?left1:left2):(l.rin?right1:right2);m=!l.bottom?(l.tin?top1:top2):(l.bin?bottom1:bottom2);b.style.left=h+"px";b.style.top=m+"px"}else{if(!l.left&&!l.right){b.style.left=d.centerX+"px"}else{if(!l.right){b.style.left=parseInt(l.left)+"px"}else{b.style.right=parseInt(l.right)+"px"}}if(!l.top&&!l.bottom){b.style.top=d.centerY+n+"px"}else{if(!l.bottom){b.style.top=parseInt(l.top)+n+"px"}else{b.style.top=c.clientHeight-b.offsetHeight-parseInt(l.bottom)+"px"}}}};x.setIframHeight=function(b){var a=function(k){var l=document.getElementById(k);try{var d=l.contentWindow.document.body.scrollHeight;var c=l.contentWindow.document.documentElement.scrollHeight;var j=Math.max(d,c);l.height=j}catch(i){}};window.setInterval(a,200)};Array.prototype.removeRepeat=function(){var h,a=[],k=this.length;for(var d=0;d<k-1;d++){for(var c=d+1;c<k;c++){if(this[c]===this[d]){this.splice(c,1);if(this[d]!==h){h=this[d],a.push(this[d])}d--,k--}}}return a};Array.prototype.min=function(){return Math.min.apply({},this)};Array.prototype.max=function(){return Math.max.apply({},this)};Array.prototype.indexOf=function(b){for(var a=0;a<this.length;a++){if(this[a]==b){return a}}return -1};Array.prototype.remove=function(b){var a=this.indexOf(b);if(a>-1){this.splice(a,1)}};x.hasClass=function(b,a){return b.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"))};x.addClass=function(b,a){if(!this.hasClass(b,a)){b.className+=" "+a}};x.removeClass=function(c,a){if(hasClass(c,a)){var b=new RegExp("(\\s|^)"+a+"(\\s|$)");c.className=c.className.replace(b," ")}};x.siblings=function(d){var b=[];var c=d.previousSibling;while(c){if(c.nodeType===1){b.push(c)}c=c.previousSibling}b.reverse();var h=d.nextSibling;while(h){if(h.nodeType===1){b.push(h)}h=h.nextSibling}return b};x.getLength=function(a){return a.replace(/[^\x00-\xff]/g,"**").length};x.strlen=function(d){var a=0;for(var c=0;c<d.length;c++){var b=d.substr(c,1);if(escape(b).substr(0,2)=="%u"){a+=3}else{a+=1}}return a};x.addCSS=function(c){var a=this.style;if(!a){a=this.style=document.createElement("style");a.setAttribute("type","text/css");document.getElementsByTagName("head")[0].appendChild(a)}a.styleSheet&&(a.styleSheet.cssText+=c)||a.appendChild(document.createTextNode(c))};x.loadCSS=function(i,h){if(!i){return}var a=x.getTag("link");for(var k in a){if(a[k].href==i){return}}var j=document.createElement("link");j.id=h;j.rel="stylesheet";j.media="screen";j.type="text/css";j.href=x.config.cssFile+i;x.getTag("HEAD").item(0).appendChild(j)};x.loadJS=function(i,a,h,b){b=b||"utf-8";var c=document.createElement("script");c.charset=b;c.type="text/javascript";c.id=i;c.src=x.config.jsFile+i;var d=x.getTag("HEAD").item(0);if(x.Browser.isIE){c.onreadystatechange=function(){if(!(/loaded|complete/i.test(c.readyState))){return}if("function"==typeof a){a()}c.onreadystatechange=null;c.parentNode.removeChild(c);c=null}}else{c.onload=function(){if("function"==typeof a){a()}c.parentNode.removeChild(c);c=null}}if("function"==typeof h){c.onerror=function(){if("function"==typeof h){h()}c.parentNode.removeChild(c);c=null}}d.appendChild(c)};x.random=function(n,l,j,m){if(!l&&!j&&!m){l=j=m=true}var h=[["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],["0","1","2","3","4","5","6","7","8","9"]];var d=[];var o="";d=l?d.concat(h[0]):d;d=j?d.concat(h[1]):d;d=m?d.concat(h[2]):d;for(var k=0;k<n;k++){o+=d[Math.round(Math.random()*(d.length-1))]}return o};x.getUrlKey=function(c,b){var b=b?b:location.href;var a="";var d=b.indexOf(c+"=");if(d!=-1){d+=c.length+1;e=b.indexOf("&",d);if(e==-1){e=b.length}a=b.substring(d,e)}return a};x.fixed=function(c){var i=x.getID(c);if(!x.Browser.isIE6){i.style.position="fixed"}else{var a=function(l,j){var l=x.getTag(l);var d=[];for(var k=0;k<l.length;k++){if(l[k].className==j){d.push(l[k])}}return d};var h=a("div","ui_dialog_fixed");if(x.getStyle(x.getID("page"))["backgroundImage"]!="none"){x.addCSS(".ui_dialog_fixed{width:100%; height:1px; position:absolute; z-index: 891201; left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth); top:expression(documentElement.scrollTop)}.body-fixed{background-attachment:fixed;}")}else{x.addCSS(".ui_dialog_fixed{width:100%; height:1px; position:absolute; z-index: 891201; left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth); top:expression(documentElement.scrollTop)}.body-fixed{background-attachment:fixed;background-image:url(about:blank);}")}if(h.length==0){var b=x.ce("div");b.className="ui_dialog_fixed";b.appendChild(i);document.body.appendChild(b);x.addClass(x.getTag("html")[0],"body-fixed")}else{h[0].appendChild(i)}}};x.callBack={ok:function(a){return"<div class='ui_box_callback'><span class='ui_box_callback_ok'></span>"+a+"</div>"},error:function(a){return"<div class='ui_box_callback'><span class='ui_box_callback_error'></span>"+a+"</div>"},tips:function(a){return"<div class='ui_box_callback'><span class='ui_box_callback_tips'></span>"+a+"</div>"}};x.Cookie={get:function(i){var h="";var k=i+"=";var j=document.cookie;if(j.length>0){g=j.indexOf(k);if(g!=-1){g+=k.length;f=j.indexOf(";",g);if(f==-1){f=j.length}h=unescape(j.substring(g,f))}}return h},set:function(j,i,m,l){var n="";var k=x.config.cookieHours||24*30;if(k!=null){n=new Date((new Date()).getTime()+k*3600000);n="; expires="+n.toGMTString()}document.cookie=j+"="+escape(i)+n+(m?"; path="+m:"; path=/")+(l?";domain="+l:"")},del:function(b){document.cookie=b+"=;path=/;expires="+(new Date(0)).toGMTString()}};x.animate=function(r,v,n,C,m){var A=x.getID(r),k=A.children,q=k[0].offsetWidth,D=k[0].offsetHeight,l=k.length,j;var u=0,G=parseInt(x.getStyle(x.getID(r))[v]),H=v=="left"?-Math.abs(q)*n:-Math.abs(D)*n,F=H-G,E=C;var z=function(){clearTimeout(j);if(F&&u<E){A.style[v]=Math.round(m(u++,G,F,E))+"px";j=setTimeout(z,10)}else{A.style[v]=H+"px"}};if(v=="left"){k[n].style.cssFloat="left";k[n].style.display="block";A.style.position="absolute";A.style.width=l*q+"px";A.style.height=D+"px";return z()}else{if(v=="top"){k[n].style.display="block";A.style.position="absolute";A.style.height=l*D+"px";return z()}else{k[n].style.display="block";var y=x.siblings(k[n]);for(var B=0;B<y.length;B++){y[B].style.display="none"}}}};
//(function(a){a.extend(a.fn,{validate:function(b){if(!this.length){b&&b.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return}var c=a.data(this[0],"validator");if(c){return c}c=new a.validator(b,this[0]);a.data(this[0],"validator",c);if(c.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){c.cancelSubmit=true});if(c.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){c.submitButton=this})}this.submit(function(d){if(c.settings.debug){d.preventDefault()}function e(){if(c.settings.submitHandler){if(c.submitButton){var f=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)}c.settings.submitHandler.call(c,c.currentForm);if(c.submitButton){f.remove()}return false}return true}if(c.cancelSubmit){c.cancelSubmit=false;return e()}if(c.form()){if(c.pendingRequest){c.formSubmitted=true;return false}return e()}else{c.focusInvalid();return false}})}return c},valid:function(){if(a(this[0]).is("form")){return this.validate().form()}else{var c=true;var b=a(this[0].form).validate();this.each(function(){c&=b.element(this)});return c}},removeAttrs:function(d){var b={},c=this;a.each(d.split(/\s/),function(e,f){b[f]=c.attr(f);c.removeAttr(f)});return b},rules:function(e,b){var g=this[0];if(e){var d=a.data(g.form,"validator").settings;var i=d.rules;var j=a.validator.staticRules(g);switch(e){case"add":a.extend(j,a.validator.normalizeRule(b));i[g.name]=j;if(b.messages){d.messages[g.name]=a.extend(d.messages[g.name],b.messages)}break;case"remove":if(!b){delete i[g.name];return j}var h={};a.each(b.split(/\s/),function(k,l){h[l]=j[l];delete j[l]});return h}}var f=a.validator.normalizeRules(a.extend({},a.validator.metadataRules(g),a.validator.classRules(g),a.validator.attributeRules(g),a.validator.staticRules(g)),g);if(f.required){var c=f.required;delete f.required;f=a.extend({required:c},f)}return f}});a.extend(a.expr[":"],{blank:function(b){return !a.trim(""+b.value)},filled:function(b){return !!a.trim(""+b.value)},unchecked:function(b){return !b.checked}});a.validator=function(b,c){this.settings=a.extend(true,{},a.validator.defaults,b);this.currentForm=c;this.init()};a.validator.format=function(b,c){if(arguments.length==1){return function(){var d=a.makeArray(arguments);d.unshift(b);return a.validator.format.apply(this,d)}}if(arguments.length>2&&c.constructor!=Array){c=a.makeArray(arguments).slice(1)}if(c.constructor!=Array){c=[c]}a.each(c,function(d,e){b=b.replace(new RegExp("\\{"+d+"\\}","g"),e)});return b};a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"success",errorElement:"span",focusInvalid:true,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(b){this.lastActive=b;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,b,this.settings.errorClass,this.settings.validClass);this.errorsFor(b).hide()}},onfocusout:function(b){if(!this.checkable(b)&&(b.name in this.submitted||!this.optional(b))){this.element(b)}},onkeyup:function(b){if(b.name in this.submitted||b==this.lastElement){this.element(b)}},onclick:function(b){if(b.name in this.submitted){this.element(b)}else{if(b.parentNode.name in this.submitted){this.element(b.parentNode)}}},highlight:function(d,b,c){a(d).addClass(b).removeClass(c)},unhighlight:function(d,b,c){a(d).removeClass(b).addClass(c)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=a(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm);this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=(this.groups={});a.each(this.settings.groups,function(e,f){a.each(f.split(/\s/),function(h,g){b[g]=e})});var d=this.settings.rules;a.each(d,function(e,f){d[e]=a.validator.normalizeRule(f)});function c(g){var f=a.data(this[0].form,"validator"),e="on"+g.type.replace(/^validate/,"");f.settings[e]&&f.settings[e].call(f,this[0])}a(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",c).validateDelegate(":radio, :checkbox, select, option","click",c);if(this.settings.invalidHandler){a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();a.extend(this.submitted,this.errorMap);this.invalid=a.extend({},this.errorMap);if(!this.valid()){a(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var b=0,c=(this.currentElements=this.elements());c[b];b++){this.check(c[b])}return this.valid()},element:function(c){c=this.clean(c);this.lastElement=c;this.prepareElement(c);this.currentElements=a(c);var b=this.check(c);if(b){delete this.invalid[c.name]}else{this.invalid[c.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return b},showErrors:function(c){if(c){a.extend(this.errorMap,c);this.errorList=[];for(var b in c){this.errorList.push({message:c[b],element:this.findByName(b)[0]})}this.successList=a.grep(this.successList,function(d){return !(d.name in c)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){if(a.fn.resetForm){a(this.currentForm).resetForm()}this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(d){var c=0;for(var b in d){c++}return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}}},findLastActive:function(){var b=this.lastActive;return b&&a.grep(this.errorList,function(c){return c.element.name==b.name}).length==1&&b},elements:function(){var c=this,b={};return a([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&c.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!c.objectLength(a(this).rules())){return false}b[this.name]=true;return true})},clean:function(b){return a(b)[0]},errors:function(){return a(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=a([]);this.toHide=a([]);this.currentElements=a([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(b){this.reset();this.toHide=this.errorsFor(b)},check:function(c){c=this.clean(c);if(this.checkable(c)){c=this.findByName(c.name)[0]}var h=a(c).rules();var d=false;for(method in h){var g={method:method,parameters:h[method]};try{var b=a.validator.methods[method].call(this,c.value.replace(/\r/g,""),c,g.parameters);if(b=="dependency-mismatch"){d=true;continue}d=false;if(b=="pending"){this.toHide=this.toHide.not(this.errorsFor(c));return}if(!b){this.formatAndAdd(c,g);return false}}catch(f){this.settings.debug&&window.console&&console.log("exception occured when checking element "+c.id+", check the '"+g.method+"' method",f);throw f}}if(d){return}if(this.objectLength(h)){this.successList.push(c)}return true},customMetaMessage:function(b,d){if(!a.metadata){return}var c=this.settings.meta?a(b).metadata()[this.settings.meta]:a(b).metadata();return c&&c.messages&&c.messages[d]},customMessage:function(c,d){var b=this.settings.messages[c];return b&&(b.constructor==String?b:b[d])},findDefined:function(){for(var b=0;b<arguments.length;b++){if(arguments[b]!==undefined){return arguments[b]}}return undefined},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customMetaMessage(b,c),!this.settings.ignoreTitle&&b.title||undefined,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(c,e){var d=this.defaultMessage(c,e.method),b=/\$?\{(\d+)\}/g;if(typeof d=="function"){d=d.call(this,e.parameters,c)}else{if(b.test(d)){d=jQuery.format(d.replace(b,"{$1}"),e.parameters)}}this.errorList.push({message:d,element:c});this.errorMap[c.name]=d;this.submitted[c.name]=d},addWrapper:function(b){if(this.settings.wrapper){b=b.add(b.parent(this.settings.wrapper))}return b},defaultShowErrors:function(){for(var c=0;this.errorList[c];c++){var b=this.errorList[c];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(var c=0;this.successList[c];c++){this.showLabel(this.successList[c])}}if(this.settings.unhighlight){for(var c=0,d=this.validElements();d[c];c++){this.settings.unhighlight.call(this,d[c],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(c,d){var b=this.errorsFor(c);if(b.length){b.removeClass().addClass(this.settings.errorClass);b.attr("generated")&&b.html(d)}else{b=a("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(c),generated:true}).addClass(this.settings.errorClass).html(d||"");if(this.settings.wrapper){b=b.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(b).length){this.settings.errorPlacement?this.settings.errorPlacement(b,a(c)):b.insertAfter(c)}}if(!d&&this.settings.success){b.text("");typeof this.settings.success=="string"?b.addClass(this.settings.success):this.settings.success(b)}this.toShow=this.toShow.add(b)},errorsFor:function(c){var b=this.idOrName(c);return this.errors().filter(function(){return a(this).attr("for")==b})},idOrName:function(b){return this.groups[b.name]||(this.checkable(b)?b.name:b.id||b.name)},checkable:function(b){return/radio|checkbox/i.test(b.type)},findByName:function(b){var c=this.currentForm;return a(document.getElementsByName(b)).map(function(d,e){return e.form==c&&e.name==b&&e||null})},getLength:function(c,b){switch(b.nodeName.toLowerCase()){case"select":return a("option:selected",b).length;case"input":if(this.checkable(b)){return this.findByName(b.name).filter(":checked").length}}return c.length},depend:function(c,b){return this.dependTypes[typeof c]?this.dependTypes[typeof c](c,b):true},dependTypes:{"boolean":function(c,b){return c},string:function(c,b){return !!a(c,b.form).length},"function":function(c,b){return c(b)}},optional:function(b){return !a.validator.methods.required.call(this,a.trim(b.value),b)&&"dependency-mismatch"},startRequest:function(b){if(!this.pending[b.name]){this.pendingRequest++;this.pending[b.name]=true}},stopRequest:function(b,c){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[b.name];if(c&&this.pendingRequest==0&&this.formSubmitted&&this.form()){a(this.currentForm).submit();this.formSubmitted=false}else{if(!c&&this.pendingRequest==0&&this.formSubmitted){a(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}}},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:true,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(b,c){b.constructor==String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(c){var d={};var b=a(c).attr("class");b&&a.each(b.split(" "),function(){if(this in a.validator.classRuleSettings){a.extend(d,a.validator.classRuleSettings[this])}});return d},attributeRules:function(c){var e={};var b=a(c);for(method in a.validator.methods){var d=b.attr(method);if(d){e[method]=d}}if(e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)){delete e.maxlength}return e},metadataRules:function(b){if(!a.metadata){return{}}var c=a.data(b.form,"validator").settings.meta;return c?a(b).metadata()[c]:a(b).metadata()},staticRules:function(c){var d={};var b=a.data(c.form,"validator");if(b.settings.rules){d=a.validator.normalizeRule(b.settings.rules[c.name])||{}}return d},normalizeRules:function(c,b){a.each(c,function(f,e){if(e===false){delete c[f];return}if(e.param||e.depends){var d=true;switch(typeof e.depends){case"string":d=!!a(e.depends,b.form).length;break;case"function":d=e.depends.call(b,b);break}if(d){c[f]=e.param!==undefined?e.param:true}else{delete c[f]}}});a.each(c,function(d,e){c[d]=a.isFunction(e)?e(b):e});a.each(["minlength","maxlength","min","max"],function(){if(c[this]){c[this]=Number(c[this])}});a.each(["rangelength","range"],function(){if(c[this]){c[this]=[Number(c[this][0]),Number(c[this][1])]}});if(a.validator.autoCreateRanges){if(c.min&&c.max){c.range=[c.min,c.max];delete c.min;delete c.max}if(c.minlength&&c.maxlength){c.rangelength=[c.minlength,c.maxlength];delete c.minlength;delete c.maxlength}}if(c.messages){delete c.messages}return c},normalizeRule:function(c){if(typeof c=="string"){var b={};a.each(c.split(/\s/),function(){b[this]=true});c=b}return c},addMethod:function(b,d,c){a.validator.methods[b]=d;a.validator.messages[b]=c!=undefined?c:a.validator.messages[b];if(d.length<3){a.validator.addClassRules(b,a.validator.normalizeRule(b))}},methods:{required:function(c,b,e){if(!this.depend(e,b)){return"dependency-mismatch"}switch(b.nodeName.toLowerCase()){case"select":var d=a(b).val();return d&&d.length>0;case"input":if(this.checkable(b)){return this.getLength(c,b)>0}default:return a.trim(c).length>0}},remote:function(f,c,g){if(this.optional(c)){return"dependency-mismatch"}var d=this.previousValue(c);if(!this.settings.messages[c.name]){this.settings.messages[c.name]={}}d.originalMessage=this.settings.messages[c.name].remote;this.settings.messages[c.name].remote=d.message;g=typeof g=="string"&&{url:g}||g;if(d.old!==f){d.old=f;var b=this;this.startRequest(c);var e={};e[c.name]=f;a.ajax(a.extend(true,{url:g,mode:"abort",port:"validate"+c.name,dataType:"json",data:e,async:false,success:function(i){b.settings.messages[c.name].remote=d.originalMessage;var k=i===true;if(k){var h=b.formSubmitted;b.prepareElement(c);b.formSubmitted=h;b.successList.push(c);b.showErrors()}else{var l={};var j=(d.message=i||b.defaultMessage(c,"remote"));l[c.name]=a.isFunction(j)?j(f):j;b.showErrors(l)}d.valid=k;b.stopRequest(c,k)}},g));return"pending"}else{if(this.pending[c.name]){return"pending"}}return d.valid},minlength:function(c,b,d){return this.optional(b)||this.getLength(a.trim(c),b)>=d},maxlength:function(c,b,d){return this.optional(b)||this.getLength(a.trim(c),b)<=d},rangelength:function(d,b,e){var c=this.getLength(a.trim(d),b);return this.optional(b)||(c>=e[0]&&c<=e[1])},min:function(c,b,d){return this.optional(b)||c>=d},max:function(c,b,d){return this.optional(b)||c<=d},range:function(c,b,d){return this.optional(b)||(c>=d[0]&&c<=d[1])},email:function(c,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(c)},url:function(c,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)},date:function(c,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(c))},dateISO:function(c,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(c)},number:function(c,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(c)},digits:function(c,b){return this.optional(b)||/^\d+$/.test(c)},creditcard:function(f,c){if(this.optional(c)){return"dependency-mismatch"}if(/[^0-9-]+/.test(f)){return false}var g=0,e=0,b=false;f=f.replace(/\D/g,"");for(var h=f.length-1;h>=0;h--){var d=f.charAt(h);var e=parseInt(d,10);if(b){if((e*=2)>9){e-=9}}g+=e;b=!b}return(g%10)==0},accept:function(c,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||c.match(new RegExp(".("+d+")$","i"))},equalTo:function(c,b,e){var d=a(e).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(b).valid()});return c==d.val()}}});a.format=a.validator.format})(jQuery);(function(c){var b=c.ajax;var a={};c.ajax=function(e){e=c.extend(e,c.extend({},c.ajaxSettings,e));var d=e.port;if(e.mode=="abort"){if(a[d]){a[d].abort()}return(a[d]=b.apply(this,arguments))}return b.apply(this,arguments)}})(jQuery);(function(a){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){a.each({focus:"focusin",blur:"focusout"},function(c,b){a.event.special[b]={setup:function(){this.addEventListener(c,d,true)},teardown:function(){this.removeEventListener(c,d,true)},handler:function(f){arguments[0]=a.event.fix(f);arguments[0].type=b;return a.event.handle.apply(this,arguments)}};function d(f){f=a.event.fix(f);f.type=b;return a.event.handle.call(this,f)}})}a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(e){var f=a(e.target);if(f.is(d)){return b.apply(f,arguments)}})}})})(jQuery);
//(function($){$.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(type,name){this.defaults.type=type;this.defaults.name=name},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);if(!settings.single.length){settings.single="metadata"}var data=$.data(elem,settings.single);if(data){return data}data="{}";if(settings.type=="class"){var m=settings.cre.exec(elem.className);if(m){data=m[1]}}else{if(settings.type=="elem"){if(!elem.getElementsByTagName){return undefined}var e=elem.getElementsByTagName(settings.name);if(e.length){data=$.trim(e[0].innerHTML)}}else{if(elem.getAttribute!=undefined){var attr=elem.getAttribute(settings.name);if(attr){data=attr}}}}if(data.indexOf("{")<0){data="{"+data+"}"}data=eval("("+data+")");$.data(elem,settings.single,data);return data}}});$.fn.metadata=function(opts){return $.metadata.get(this[0],opts)}})(jQuery);

/*/自定义位置
$.validator.setDefaults({
	errorPlacement: function (error, element) {
		var ID = element.attr('validator') || element.attr('id');
		if (!ID || error.html() == '') return;
		error.parent().removeClass().addClass("tip-error").attr("htmlfor", ID);
		if ($("#validator-" + ID).length == 0) element.parent().append("<span id=\"validator-" + ID + "\"></span>");
		if ($("#validator-" + ID + ">span").size() == 0) {
			$("#validator-" + ID).html(error);
		} else {
			var L = $("#validator-" + ID + ">span");
			if ($.trim(L.html()) == '' || L.attr("htmlfor") == element.attr('id')) L.attr("htmlfor", element.attr('id')).html(error.html());
			L.parent().removeClass().addClass("tip-error")
		}
	},
	success: function (label) {
		var ID = label.attr("htmlfor");
		if ($.trim($("#validator-" + ID).text()) == '') {
			$("#validatorId-" + ID + ">span").parent().removeClass('tip-error').addClass("tip-success").html(' ');
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
*/
x.regEx ={
	Strs:/^[\u0391-\uFFE5\w]+$/, //中文字、英文字母、数字和下划线
	NumEn:/^[_a-z0-9]+$/,//检查数字英文
	ZeroInt:/^[0-9]*[0-9][0-9]*$/,//检查0正整数
	NoneZeroInt:/^[0-9]*[1-9][0-9]*$/,//检查0正整数
	Int6:/^\d{6}$/,//检查6位数字
	QQ:/^[1-9]\d{4,10}$/,//检查QQ
	Amount:/^(0\.\d{1,2}|[1-9]\d{0,8}(\.\d{1,2})?)$/,//检查金额数字 0.00 和 小数的后两位
	Sum:/^(\d+\.\d{1,1}|\d+)$/,//检查金额数字 0.0 和 小数的后一位
	Tons:/^(0\.\d{1,3}|[1-9]\d{0,8}(\.\d{1,3})?)$/,//检查金额数字 0.000 和 小数的后三位
	Tel:/^1(3|4|5|8)\d{9}$/,//检查手机号码
	Mobile:/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,//检查固定电话 //0471-1234567
	PostCode:/^[1-9]\d{5}(?!\d)$/,//检查中国邮政编码
	Email:/^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,//检查电子邮件
	ChineseWord:/^[\u4e00-\u9fa5]+$/,//检查汉字
	EnglishWord:/^[a-zA-Z]+$/,//检查英文
	//SpecialWord:/^[\`\=\,\/\;\'\[\]\~\!\@\#\$\%\^\&\*\(\)\+\{\}\|\:"\<\>\?]+$/,//检查特殊字符
	SpecialWord:/^[`\\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\/\.\,\;\'\[\]\\]+$/,//检查特殊字符
	CardId:/^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/,//简单检查身份证方法
	CardNum:/^[1-9]\d{14,18}$/,//检查一般卡号 15位-19位
	CardCompany:/^[\u4e00-\u9fa5a-zA-Z0-9]+$/,//检查 卡号开户行 15位-19位 中英文数字
	ChineseEnNum:/^[\u4e00-\u9fa5a-zA-Z0-9]+$/,//检查中文和英文 数字
	Time:/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/ //检查时间格式YYYY-MM-DD
};




/**
	----------------------------------- 账户检查 -------------------------------------------
**/
//账户 6-30位数字、字母和下划线组合,请勿输入特殊字符
jQuery.validator.addMethod("isUserName", function(value, element) {
	return this.optional(element) || x.chkUserName(value);
}, "账户为6-30位英文字母、数字符号组合,请勿输入特殊字符");
//检查账户
x.chkUserName=function(s){
	if(x.isUserName(s)){
		return true;
	}else{
		return false;
	}
};
//检查账户名 6-30位英文字母、数字符号的登录账户
x.isUserName=function(s){
	var reg=/^[a-zA-Z0-9_.@-]+$/;
	var onlyspc =/^[\`\=\,\/\;\'\[\]\~\!\@\#\$\%\^\&\*\(\)\+\{\}\|\:"\<\>\?]+$/;
	if(onlyspc.test(s)){
		return false;
	}
	if(s.length<6||s.length>30){
		return false;
	}else if(reg.test(s)){
		return true;
	}else{
		return false;
	}
};
/**
	----------------------------------- 密码检查 -------------------------------------------
**/
//密码 6-30位英文字母、数字或者符号至少2种的组合的登录密码
jQuery.validator.addMethod("isUserPassword", function(value, element) {
	return this.optional(element) || x.chkUserPassword(value);
}, "密码为6-30位数字、字母或符号的组合");
//检查密码
x.chkUserPassword=function(s){
	if(x.isUserPassword(s)){
		return true;
	}else{
		return false;
	}
};
//检查密码 6-30位英文字母、数字或者符号至少2种的组合的登录密码
x.isUserPassword=function(s){
	var reg=/^[\a-\z\A-\Z0-9\`\-\=\,\.\/\;\'\[\]\\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\\\@\.]+$/;
	var onlyabc=/^[A-Za-z]+$/;
	var onlynum=/^[0-9]+$/;
	var onlyspc =/^[\`\-\=\,\.\/\;\'\[\]\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:"\<\>\?\@]+$/;
	if(onlynum.test(s)){
		return false;
	}
	if(onlyabc.test(s)){
		return false;
	}
	if(onlyspc.test(s)){
		return false;
	}
	if(s.length<6||s.length>30){
		return false;
	}else if(reg.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 金额数字,1位小数点 -------------------------------------------
**/
//金额数字,1位小数点
jQuery.validator.addMethod("isSum", function(value, element) {
	return this.optional(element) || x.chkSum(value);
}, "请输入1位小数点");
//检查金额数字 0.0 和 小数的后1位
x.chkSum=function (s){
	if(x.regEx.Sum.test(s)&&s!=0.0){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 金额数字,2位小数点 -------------------------------------------
**/
//金额数字,2位小数点
jQuery.validator.addMethod("isAmount", function(value, element) {
	return this.optional(element) || x.chkAmount(value);
}, "请输入2位小数点");
//检查金额数字 0.00 和 小数的后2位
x.chkAmount=function (s){
	if(x.regEx.Amount.test(s)&&s!=0.00){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 吨数  金额数字 3位小数点-------------------------------------------
**/
//吨数 (金额数字 3位小数点)
jQuery.validator.addMethod("isTons", function(value, element) {
	return this.optional(element) || x.chkTons(value);
}, "请输入3位小数点");
//检查金额数字 0.00 和 小数的后两位
x.chkTons=function (s){
	if(x.regEx.Tons.test(s)&&s!=0.000){
		return true;
	}else{
		return false;
	}
};



/**
	----------------------------------- 0正整数 -------------------------------------------
**/
//非0正整数
jQuery.validator.addMethod("isZeroInt", function(value, element) {
	return this.optional(element) || x.chkZeroInt(value);
}, "输入0正整数");
//检查输入非0正整数
x.chkZeroInt=function (s){
	if(x.regEx.ZeroInt.test(s)){
		return true;
	}else{
		return false;
	}
};
/**
	----------------------------------- 非0正整数 -------------------------------------------
**/
//非0正整数
jQuery.validator.addMethod("isNoneZeroInt", function(value, element) {
	return this.optional(element) || x.chkNoneZeroInt(value);
}, "输入非0正整数");
//检查输入非0正整数
x.chkNoneZeroInt=function (s){
	if(x.regEx.NoneZeroInt.test(s)&&s!=0.00){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 0负整数 -------------------------------------------
**/
//0正负整数
jQuery.validator.addMethod("isZeroFNum", function(value, element) {
	return this.optional(element) || x.chkZeroFNum(value);
}, "输入0正负整数");
//检查0负整数
x.chkZeroFNum=function(s){
	var onlNumF=/^-[1-9]{1}[0-9]*$/;
	var onlNumZero=/^[0]*$/;
	if(onlNumF.test(s)){
		return true;
	}
	if(onlNumZero.test(s)){
		return true;
	}
};

/**
	----------------------------------- 0正负整数 -------------------------------------------
**/
//0正负整数
jQuery.validator.addMethod("isZeroZFNum", function(value, element) {
	return this.optional(element) || x.chkZeroZFNum(value);
}, "输入0正负整数");
//检查0正负整数
x.chkZeroZFNum=function(s){
	var onlNumZ=/^[1-9]{1}[0-9]*$/;
	var onlNumF=/^-[1-9]{1}[0-9]*$/;
	var onlNumZero=/^[0]*$/;
	if(onlNumZ.test(s)){
		return true;
	}
	if(onlNumF.test(s)){
		return true;
	}
	if(onlNumZero.test(s)){
		return true;
	}
};


/**
	----------------------------------- 手机号 -------------------------------------------
**/
//手机号
jQuery.validator.addMethod("isTel", function(value, element) {
	return this.optional(element) || x.chkTel(value);
}, "手机号码错误");
//检查手机号
x.chkTel=function (s){
	if(x.regEx.Tel.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 邮箱 -------------------------------------------
**/
//邮箱
jQuery.validator.addMethod("isEmail", function(value, element) {
	return this.optional(element) || x.chkEmail(value);
}, "邮箱地址错误");
//检查邮箱
x.chkEmail=function (s){
	if(x.regEx.Email.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 固定电话 0755-12345678 -------------------------------------------
**/
//固定电话 0755-12345678
jQuery.validator.addMethod("isMobile", function(value, element) {
	return this.optional(element) || x.chkMobile(value);
}, "电话号码错误,类似0755-12345678");
//检查固定电话
x.chkMobile=function (s){
	if(x.regEx.Mobile.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 固定电话 手机号码 0755-12345678或18612345678-------------------------------------------
**/
//固定电话 手机号码
jQuery.validator.addMethod("isTelMobile", function(value, element) {
	return this.optional(element) || x.chkTelMobile(value);
}, "联系电话错误,类似0755-12345678或18612345678");
//检查固定电话 手机号码
x.chkTelMobile=function (s){
	if(!x.chkMobile(s)&&!x.chkTel(s)){
		return false
	}else{
		return true;
	}
};

/**
	----------------------------------- 邮政编码 -------------------------------------------
**/
//邮政编码
jQuery.validator.addMethod("isPostCode", function(value, element) {
	return this.optional(element) || x.chkPostCode(value);
}, "邮政编码错误");
//检查邮政编码
x.chkPostCode=function (s){
	if(x.regEx.PostCode.test(s)){
		return true;
	}else{
		return false;
	}
};


/**
	----------------------------------- QQ号码 -------------------------------------------
**/
//QQ号码
jQuery.validator.addMethod("isQQ", function(value, element) {
	return this.optional(element) || x.chkQQ(value);
}, "QQ号码错误");
//检查QQ号码
x.chkQQ=function (s){
	if(x.regEx.QQ.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 身份证号 -------------------------------------------
**/
//身份证号
jQuery.validator.addMethod("isCardId", function(value, element) {
	return this.optional(element) || x.chkCardId(value);
}, "身份证号错误!");
//检查邮政编码
x.chkCardId=function (s){
	if(x.regEx.CardId.test(s)){
		return true;
	}else{
		return false;
	}
};


/**
	----------------------------------- 中文 -------------------------------------------
**/
//中文
jQuery.validator.addMethod("isChineseWord", function(value, element) {
	return this.optional(element) || x.chkChineseWord(value);
}, "请输入中文");
//检查中文
x.chkChineseWord=function (s){
	if(x.regEx.ChineseWord.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 英文 -------------------------------------------
**/
//英文
jQuery.validator.addMethod("isEnglishWord", function(value, element) {
	return this.optional(element) || x.chkEnglishWord(value);
}, "请输入英文");
//检查英文
x.chkEnglishWord=function (s){
	if(x.regEx.EnglishWord.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 特殊字符 -------------------------------------------
**/
//中文
jQuery.validator.addMethod("isSpecialWord", function(value, element) {
	return this.optional(element) || x.chkSpecialWord(value);
}, "请输入英文特殊字符");
//检查英文
x.chkSpecialWord=function (s){
	if(x.regEx.SpecialWord.test(s)){
		return true;
	}else{
		return false;
	}
};



/**
	----------------------------------- 公司名称 中英文数字 -------------------------------------------
**/
//公司名称 中英文数字
jQuery.validator.addMethod("isChineseEnNum", function(value, element) {
	return this.optional(element) || x.chkChineseEnNum(value);
}, "请输入中英文数字");
//检查公司名称 中英文数字
x.chkChineseEnNum=function (s){
	if(x.regEx.ChineseEnNum.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 银行卡号 -------------------------------------------
**/
//银行卡号
jQuery.validator.addMethod("isCardNum", function(value, element) {
	return this.optional(element) || x.chkCardNum(value);
}, "请输入正确的银行卡号");
//检查 银行卡号
x.chkCardNum=function (s){
	if(x.regEx.CardNum.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 银行卡开户行 -------------------------------------------
**/
//银行卡开户行
jQuery.validator.addMethod("isCardCompany", function(value, element) {
	return this.optional(element) || x.chkCardCompany(value);
}, "请输入正确的银行开户行");
//检查 银行卡开户行
x.chkCardCompany=function (s){
	if(x.regEx.CardCompany.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 备注 非特殊字符 -------------------------------------------
**/
//备注 非特殊字符
jQuery.validator.addMethod("isStrs", function(value, element) {
	return this.optional(element) || x.chkStrs(value);
}, "请输入中文字、英文字母、数字和下划线");
//检查 特殊字符
x.chkStrs=function (s){
	if(x.regEx.Strs.test(s)){
		return true;
	}else{
		return false;
	}
};

/**
	----------------------------------- 国内车牌号 -------------------------------------------
**/
//国内车牌号
jQuery.validator.addMethod("isCarNum", function(value, element) {
  return this.optional(element) || /^[\u0391-\uFFE5\d]+$/.test(value);
}, "请输入正确的车牌号");


/**
	----------------------------------- 不能输入设定值 -------------------------------------------
**/
// 不等于
jQuery.validator.addMethod("notEqualTo", function(value, element, param) {
	return value != param;
}, $.format("不能输入{0}"));

/**
	----------------------------------- 两项必须填写一项  -------------------------------------------
**/
// 指定元素与此元素必须填写其中一项
jQuery.validator.addMethod("requiredOne", function(value, element, param) {
	var requiredOne = $(param).val();
	if(requiredOne == ""&&value=="") {
	return value != "";
	} else {
	return true;
	}
}, $.format("两项必须填写一项!"));




/**
	----------------------------------- 若指定元素为不为空则此元素也为必填  -------------------------------------------
**/
// 若指定元素为不为空则此元素也为必填
jQuery.validator.addMethod("requiredTo", function(value, element, param) {
	var requiredTo = $(param).val();
	if(requiredTo != "") {
		return value != "";
	} else {
		return true;
	}
}, "此项不能为空!");

/**
	----------------------------------- 验证值不允许与特定值等于  -------------------------------------------
**/
// 验证值不允许与特定值等于
jQuery.validator.addMethod("notEqual", function(value, element, param) {
        return value != $(param).val();
}, $.format("不能输入{0}"));

/**
	----------------------------------- 此元素小于等于指定元素  -------------------------------------------
**/
//此元素小于等于指定元素
jQuery.validator.addMethod("lessThanE", function(value, element, param) {
	var otherValue=$(param).val();
	if(value-otherValue <= 0){
		return true;
	}else{
		return false;
	}
}, $.format("此元素必须小于等于指定元素!"));

/**
	----------------------------------- 时间格式验证  2011-07-07和2011/07/07 -------------------------------------------
**/
// 添加日期延至方法 验证 2011-07-07和2011/07/07两种短横线和斜杠格式
jQuery.validator.addMethod("isDate", function(value, element){
	var ereg = /^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/;
	var r = value.match(ereg);
	if (r == null) {
		return false;
	}
	var d = new Date(r[1], r[3] - 1, r[5]);
	var result = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]);
	return this.optional(element) || (result);
}, "请输入正确的日期");

/**
	----------------------------------- 时间大小验证  -------------------------------------------
**/
// 添加时间大小
jQuery.validator.addMethod("compareDate",function(value, element,param) {
	   var startDate = $(param).val();
		var date1 = new Date(Date.parse(startDate.replace("-", "/")));
		var date2 = new Date(Date.parse(value.replace("-", "/")));
		return date1 < date2;
},"请选择正确的时间区间!");

/**
	----------------------------------- 一般字符 中文字、英文字母、数字和下划线 -------------------------------------------
**/
// 字符验证
jQuery.validator.addMethod("word", function(value, element) {
  return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "用户名只能包括中文字、英文字母、数字和下划线");

/**
	----------------------------------- 以 {0} 开头的字符串 -------------------------------------------
**/
jQuery.validator.addMethod("prefix", function(value, element, param) {
var prefix = new RegExp("^" + param);
return this.optional(element) || (prefix.test(value));
}, $.format("请输入以{0}开头的字符串!"));

/**
	----------------------------------- 以 00:00 23:59 时间格式 -------------------------------------------
**/

jQuery.validator.addMethod("isTime", function(value, element) {
	return this.optional(element) || /^([01]\d|2[0-3])(:[0-5]\d){0,2}$/.test(value);
}, "请输入一个正确的时间,在00:00 - 23:59之间");

/**
	----------------------------------- 不能超过{0}个字节(一个中文字算2个字节 -------------------------------------------
**/
jQuery.validator.addMethod("byteMaxLength", function(value,element, param) {
	var length = value.length;
	for ( var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 127) {
			length++;
		}
	}
	return this.optional(element) || (length <= param);
}, $.format("不能超过{0}个字节(一个中文字算2个字节)"));

/**
	----------------------------------- 不能少于{0}个字节(一个中文字算2个字节 -------------------------------------------
**/
jQuery.validator.addMethod("byteMinLength", function(value,element, param) {
	var length = value.length;
	for ( var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 127) {
			length++;
		}
	}
	return this.optional(element) || (length >= param);
}, $.format("不能少于{0}个字节(一个中文字算2个字节)"));

/**
	----------------------------------- 区间内的字数计算 一个中文字算2个字节 -------------------------------------------
**/
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
        length++;
        }
    }
    return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, $.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));



/**
	----------------------------------- 是否已经存在 -------------------------------------------
**/
jQuery.validator.addMethod("isExist", function(value, element) {
	$.ajax({
		type:"get",
		async:false,
		url:"chk.action",
		data:{
			userName:value
		},
		success:function(json) {
			exist = json;
		},
		error:function() {
			exist = false;
		}
	});
	return exist;
}, "已经存在，请重新输入");
/**
	----------------------------------- 是否验证码错误 -------------------------------------------
**/
jQuery.validator.addMethod("imgCod",function(value, element) {
	var isPass = false;
	$.ajax({
		type:"post",
		async:false,
		dataType:"json",
		url:"imgChk.action",
		data:{
			imgCode: function() {return $("#imgCode").val();}
		},
		success:function(data, status) {
			isPass = data;
		},
		error:function(e,b,d) {
			isPass = false;
		}
	});
	return isPass;
},"验证码错误");

/**
	----------------------------------- 检查是否有敏感字眼 -------------------------------------------
	马勒戈壁|卧槽泥马|骚|淫|淫乱|婬蕩|嫖|A片|B毛翻|CAO你|FaLun|Falun|Fa轮|Fa仑|FaLundaFa|FaLun大Fa|G片|JB|e夜情|faL工|fa轮大法|lun功|屄|屌|澤民|爱液|安全套|按推油|按摩服务|包皮|包养|監控|監控暴动|暴政|北京政权|被捕|庇眼|避孕套|表子|勃起|不要脸|藏独|操你|操B|操逼|曹刚川|草你|草祢|策反|长春弟子|陈良宇|陈亚德|成人电影|成人卡通|成人网|成人影院|成人游戏|赤匪|赤化|处男|处女|传单|春药|催情药|催情|搓弄|达赖|打倒|打飞机|打炮|大逼|大法|大法子|大纪元|大炮|大J|大陆当局|大屠杀|带套|祼|党棍|党国|荡妇|荡女|盗卖器官|邓小平|抵制日货|颠覆|电击痕|叼|调情|碟片|动乱|对射|发论|发论工|发伦工|发论工|法lun功|法功|法轮|法輪|法轮功|反攻大陆|反共|方励之|放弃信仰|放纵|封锁消息|夫妻秀|肛|肛交|高潮|高丽|搞~你妈|共产|共党|共和国|共產党|共匪|共军|关根|官正|光光|龟头|郭伯雄|捍东|贺国强|贺領征|嘿咻|嘿咻|黑道口令|洪星|洪志|红色恐怖|红杏|后宫电影院|胡锦涛|胡泽君|胡紧掏|黄华华|黄菊|黄龙云|黄片|黄色电影|回良玉|活体器官|活体摘取|激聊|激情|鸡吧|鸡巴|鸡八|鸡巴|鸡鸡|鸡婆|妓院|家宝|贾庆林|假抗日真扩充|监控电脑|监视监听|间谍|间谍偷窥|简金莲|贱货|贱种|贱种健行|见面做|江主席|江集团|江井恒|江井康|江青|江氏集团|疆独|交换夫妻|叫床|叫鸡|金瓶梅|金枪不倒|锦涛|晋三|精灵下载|精液|精子|静坐|九评|巨乳|绝食|看片激情|口技|口交|口技|口交|口淫|酷刑|狂巢|狂干|狂刷|烂货|烂污|烂种|浪叫|老虎凳|李长春|李鸿忠|李克强|李源潮|李长春|李鹏|李岚清|里藏春|恋童|炼功|梁伟发|两个中国|两腿胯间|聊性|林雄|刘玉浦|刘云山|刘淇|六四|六五|六4|陆肆|吕秀莲|卵泡|乱伦|轮尖|轮奸|罗干|裸聊|裸干|裸聊|裸体|裸图|裸照|妈爽|妈逼|妈操|妈个B|马英九|肏你妈|毛片|美女全脱|蒙汗药|猛进猛出|迷药|民主|民运|明慧|奶子|男主|女主|虐恋|叛乱|陪聊|喷精|器官移植|强卫|强暴|悄悄话查看|翘屁股|情人|情趣用品|庆红|庆林|全程激情|全裸|群发短信|群交|让燥|人尽可夫|日您|日你|容基|肉棒|肉洞|肉棍|肉蒲团|肉穴|乳房|软时|瑞环|三去车仑功|三去-车仑-功|骚|骚妇|骚女|骚货|骚穴|骚液|色狐|色虎|色库|色情|色域|傻b|煞笔|上床|上我|绍基|射精|生殖|实战|示威|视聊|视频|视频收费|视频语聊|视看|视频看|视频聊|收费视频|首都广场|瘦大|兽交|帅哥按摩|爽片|水扁|丝袜|死全家|宋楚瑜|苏家屯|台独|太子党|天安门|天符|添服|添屁眼|舔|舔你|舔私|铁映|同志碟|同志蝶|同志片|偷窺|偷窥|推拿推油|推油推拿|腿毛多|退党|脱衣|玩女人|王兆国|王岐山|王珉|亡党|伟哥|魏星艳|温家宝|我日|我燥|无帮国|吾尔开希|吴邦国|吴官正|吴仪|吴邦国|吴官正|五四运动|务动奖|吸精|习近平|下面特大|下阴|下面大|下面粗大|下体|小平|小肉缝|小穴|肖志恒|辛荣国|新唐人|性爱|性电影|性视频|性爱|性病|性福|性关系|性狐|性交|性奴|性趣|徐少华|悬赏|学潮|学联|学聊|学运|血逼|血洗|血比|血洗|延时药|颜色革命|阳具|一夜|一党专政|一夜情|一中一台|壹夜情|荫道|阴部|阴唇|阴道|阴茎|阴蒂|阴核|阴毛|游行|俞正声|语视|语聊|语音做|欲火|杂种|在家寂寞|泽东|泽民|曾培炎|曾庆红|包夜
**/

function filter(){
	//关键词过滤
	var filter_str = unescape("%u9A6C%u52D2%u6208%u58C1%7C%u5367%u69FD%u6CE5%u9A6C%7C%u9A9A%7C%u6DEB%7C%u6DEB%u4E71%7C%u5A6C%u8569%7C%u5AD6%7CA%u7247%7CB%u6BDB%u7FFB%7CCAO%u4F60%7CFaLun%7CFalun%7CFa%u8F6E%7CFa%u4ED1%7CFaLundaFa%7CFaLun%u5927Fa%7CG%u7247%7CJB%7Ce%u591C%u60C5%7CfaL%u5DE5%7Cfa%u8F6E%u5927%u6CD5%7Clun%u529F%7C%u5C44%7C%u5C4C%7C%u6FA4%u6C11%7C%u7231%u6DB2%7C%u5B89%u5168%u5957%7C%u6309%u63A8%u6CB9%7C%u6309%u6469%u670D%u52A1%7C%u5305%u76AE%7C%u5305%u517B%7C%u76E3%u63A7%7C%u76E3%u63A7%u66B4%u52A8%7C%u66B4%u653F%7C%u5317%u4EAC%u653F%u6743%7C%u88AB%u6355%7C%u5E87%u773C%7C%u907F%u5B55%u5957%7C%u8868%u5B50%7C%u52C3%u8D77%7C%u4E0D%u8981%u8138%7C%u85CF%u72EC%7C%u64CD%u4F60%7C%u64CDB%7C%u64CD%u903C%7C%u66F9%u521A%u5DDD%7C%u8349%u4F60%7C%u8349%u7962%7C%u7B56%u53CD%7C%u957F%u6625%u5F1F%u5B50%7C%u9648%u826F%u5B87%7C%u9648%u4E9A%u5FB7%7C%u6210%u4EBA%u7535%u5F71%7C%u6210%u4EBA%u5361%u901A%7C%u6210%u4EBA%u7F51%7C%u6210%u4EBA%u5F71%u9662%7C%u6210%u4EBA%u6E38%u620F%7C%u8D64%u532A%7C%u8D64%u5316%7C%u5904%u7537%7C%u5904%u5973%7C%u4F20%u5355%7C%u6625%u836F%7C%u50AC%u60C5%u836F%7C%u50AC%u60C5%7C%u6413%u5F04%7C%u8FBE%u8D56%7C%u6253%u5012%7C%u6253%u98DE%u673A%7C%u6253%u70AE%7C%u5927%u903C%7C%u5927%u6CD5%7C%u5927%u6CD5%u5B50%7C%u5927%u7EAA%u5143%7C%u5927%u70AE%7C%u5927J%7C%u5927%u9646%u5F53%u5C40%7C%u5927%u5C60%u6740%7C%u5E26%u5957%7C%u797C%7C%u515A%u68CD%7C%u515A%u56FD%7C%u8361%u5987%7C%u8361%u5973%7C%u76D7%u5356%u5668%u5B98%7C%u9093%u5C0F%u5E73%7C%u62B5%u5236%u65E5%u8D27%7C%u98A0%u8986%7C%u7535%u51FB%u75D5%7C%u53FC%7C%u8C03%u60C5%7C%u789F%u7247%7C%u52A8%u4E71%7C%u5BF9%u5C04%7C%u53D1%u8BBA%7C%u53D1%u8BBA%u5DE5%7C%u53D1%u4F26%u5DE5%7C%u53D1%u8BBA%u5DE5%7C%u6CD5lun%u529F%7C%u6CD5%u529F%7C%u6CD5%u8F6E%7C%u6CD5%u8F2A%7C%u6CD5%u8F6E%u529F%7C%u53CD%u653B%u5927%u9646%7C%u53CD%u5171%7C%u65B9%u52B1%u4E4B%7C%u653E%u5F03%u4FE1%u4EF0%7C%u653E%u7EB5%7C%u5C01%u9501%u6D88%u606F%7C%u592B%u59BB%u79C0%7C%u809B%7C%u809B%u4EA4%7C%u9AD8%u6F6E%7C%u9AD8%u4E3D%7C%u641E%7E%u4F60%u5988%7C%u5171%u4EA7%7C%u5171%u515A%7C%u5171%u548C%u56FD%7C%u5171%u7522%u515A%7C%u5171%u532A%7C%u5171%u519B%7C%u5173%u6839%7C%u5B98%u6B63%7C%u5149%u5149%7C%u9F9F%u5934%7C%u90ED%u4F2F%u96C4%7C%u634D%u4E1C%7C%u8D3A%u56FD%u5F3A%7C%u8D3A%u9818%u5F81%7C%u563F%u54BB%7C%u563F%u54BB%7C%u9ED1%u9053%u53E3%u4EE4%7C%u6D2A%u661F%7C%u6D2A%u5FD7%7C%u7EA2%u8272%u6050%u6016%7C%u7EA2%u674F%7C%u540E%u5BAB%u7535%u5F71%u9662%7C%u80E1%u9526%u6D9B%7C%u80E1%u6CFD%u541B%7C%u80E1%u7D27%u638F%7C%u9EC4%u534E%u534E%7C%u9EC4%u83CA%7C%u9EC4%u9F99%u4E91%7C%u9EC4%u7247%7C%u9EC4%u8272%u7535%u5F71%7C%u56DE%u826F%u7389%7C%u6D3B%u4F53%u5668%u5B98%7C%u6D3B%u4F53%u6458%u53D6%7C%u6FC0%u804A%7C%u6FC0%u60C5%7C%u9E21%u5427%7C%u9E21%u5DF4%7C%u9E21%u516B%7C%u9E21%u5DF4%7C%u9E21%u9E21%7C%u9E21%u5A46%7C%u5993%u9662%7C%u5BB6%u5B9D%7C%u8D3E%u5E86%u6797%7C%u5047%u6297%u65E5%u771F%u6269%u5145%7C%u76D1%u63A7%u7535%u8111%7C%u76D1%u89C6%u76D1%u542C%7C%u95F4%u8C0D%7C%u95F4%u8C0D%u5077%u7AA5%7C%u7B80%u91D1%u83B2%7C%u8D31%u8D27%7C%u8D31%u79CD%7C%u8D31%u79CD%u5065%u884C%7C%u89C1%u9762%u505A%7C%u6C5F%u4E3B%u5E2D%7C%u6C5F%u96C6%u56E2%7C%u6C5F%u4E95%u6052%7C%u6C5F%u4E95%u5EB7%7C%u6C5F%u9752%7C%u6C5F%u6C0F%u96C6%u56E2%7C%u7586%u72EC%7C%u4EA4%u6362%u592B%u59BB%7C%u53EB%u5E8A%7C%u53EB%u9E21%7C%u91D1%u74F6%u6885%7C%u91D1%u67AA%u4E0D%u5012%7C%u9526%u6D9B%7C%u664B%u4E09%7C%u7CBE%u7075%u4E0B%u8F7D%7C%u7CBE%u6DB2%7C%u7CBE%u5B50%7C%u9759%u5750%7C%u4E5D%u8BC4%7C%u5DE8%u4E73%7C%u7EDD%u98DF%7C%u770B%u7247%u6FC0%u60C5%7C%u53E3%u6280%7C%u53E3%u4EA4%7C%u53E3%u6280%7C%u53E3%u4EA4%7C%u53E3%u6DEB%7C%u9177%u5211%7C%u72C2%u5DE2%7C%u72C2%u5E72%7C%u72C2%u5237%7C%u70C2%u8D27%7C%u70C2%u6C61%7C%u70C2%u79CD%7C%u6D6A%u53EB%7C%u8001%u864E%u51F3%7C%u674E%u957F%u6625%7C%u674E%u9E3F%u5FE0%7C%u674E%u514B%u5F3A%7C%u674E%u6E90%u6F6E%7C%u674E%u957F%u6625%7C%u674E%u9E4F%7C%u674E%u5C9A%u6E05%7C%u91CC%u85CF%u6625%7C%u604B%u7AE5%7C%u70BC%u529F%7C%u6881%u4F1F%u53D1%7C%u4E24%u4E2A%u4E2D%u56FD%7C%u4E24%u817F%u80EF%u95F4%7C%u804A%u6027%7C%u6797%u96C4%7C%u5218%u7389%u6D66%7C%u5218%u4E91%u5C71%7C%u5218%u6DC7%7C%u516D%u56DB%7C%u516D%u4E94%7C%u516D4%7C%u9646%u8086%7C%u5415%u79C0%u83B2%7C%u5375%u6CE1%7C%u4E71%u4F26%7C%u8F6E%u5C16%7C%u8F6E%u5978%7C%u7F57%u5E72%7C%u88F8%u804A%7C%u88F8%u5E72%7C%u88F8%u804A%7C%u88F8%u4F53%7C%u88F8%u56FE%7C%u88F8%u7167%7C%u5988%u723D%7C%u5988%u903C%7C%u5988%u64CD%7C%u5988%u4E2AB%7C%u9A6C%u82F1%u4E5D%7C%u808F%u4F60%u5988%7C%u6BDB%u7247%7C%u7F8E%u5973%u5168%u8131%7C%u8499%u6C57%u836F%7C%u731B%u8FDB%u731B%u51FA%7C%u8FF7%u836F%7C%u6C11%u4E3B%7C%u6C11%u8FD0%7C%u660E%u6167%7C%u5976%u5B50%7C%u7537%u4E3B%7C%u5973%u4E3B%7C%u8650%u604B%7C%u53DB%u4E71%7C%u966A%u804A%7C%u55B7%u7CBE%7C%u5668%u5B98%u79FB%u690D%7C%u5F3A%u536B%7C%u5F3A%u66B4%7C%u6084%u6084%u8BDD%u67E5%u770B%7C%u7FD8%u5C41%u80A1%7C%u60C5%u4EBA%7C%u60C5%u8DA3%u7528%u54C1%7C%u5E86%u7EA2%7C%u5E86%u6797%7C%u5168%u7A0B%u6FC0%u60C5%7C%u5168%u88F8%7C%u7FA4%u53D1%u77ED%u4FE1%7C%u7FA4%u4EA4%7C%u8BA9%u71E5%7C%u4EBA%u5C3D%u53EF%u592B%7C%u65E5%u60A8%7C%u65E5%u4F60%7C%u5BB9%u57FA%7C%u8089%u68D2%7C%u8089%u6D1E%7C%u8089%u68CD%7C%u8089%u84B2%u56E2%7C%u8089%u7A74%7C%u4E73%u623F%7C%u8F6F%u65F6%7C%u745E%u73AF%7C%u4E09%u53BB%u8F66%u4ED1%u529F%7C%u4E09%u53BB-%u8F66%u4ED1-%u529F%7C%u9A9A%7C%u9A9A%u5987%7C%u9A9A%u5973%7C%u9A9A%u8D27%7C%u9A9A%u7A74%7C%u9A9A%u6DB2%7C%u8272%u72D0%7C%u8272%u864E%7C%u8272%u5E93%7C%u8272%u60C5%7C%u8272%u57DF%7C%u50BBb%7C%u715E%u7B14%7C%u4E0A%u5E8A%7C%u4E0A%u6211%7C%u7ECD%u57FA%7C%u5C04%u7CBE%7C%u751F%u6B96%7C%u5B9E%u6218%7C%u793A%u5A01%7C%u89C6%u804A%7C%u89C6%u9891%7C%u89C6%u9891%u6536%u8D39%7C%u89C6%u9891%u8BED%u804A%7C%u89C6%u770B%7C%u89C6%u9891%u770B%7C%u89C6%u9891%u804A%7C%u6536%u8D39%u89C6%u9891%7C%u9996%u90FD%u5E7F%u573A%7C%u7626%u5927%7C%u517D%u4EA4%7C%u5E05%u54E5%u6309%u6469%7C%u723D%u7247%7C%u6C34%u6241%7C%u4E1D%u889C%7C%u6B7B%u5168%u5BB6%7C%u5B8B%u695A%u745C%7C%u82CF%u5BB6%u5C6F%7C%u53F0%u72EC%7C%u592A%u5B50%u515A%7C%u5929%u5B89%u95E8%7C%u5929%u7B26%7C%u6DFB%u670D%7C%u6DFB%u5C41%u773C%7C%u8214%7C%u8214%u4F60%7C%u8214%u79C1%7C%u94C1%u6620%7C%u540C%u5FD7%u789F%7C%u540C%u5FD7%u8776%7C%u540C%u5FD7%u7247%7C%u5077%u7ABA%7C%u5077%u7AA5%7C%u63A8%u62FF%u63A8%u6CB9%7C%u63A8%u6CB9%u63A8%u62FF%7C%u817F%u6BDB%u591A%7C%u9000%u515A%7C%u8131%u8863%7C%u73A9%u5973%u4EBA%7C%u738B%u5146%u56FD%7C%u738B%u5C90%u5C71%7C%u738B%u73C9%7C%u4EA1%u515A%7C%u4F1F%u54E5%7C%u9B4F%u661F%u8273%7C%u6E29%u5BB6%u5B9D%7C%u6211%u65E5%7C%u6211%u71E5%7C%u65E0%u5E2E%u56FD%7C%u543E%u5C14%u5F00%u5E0C%7C%u5434%u90A6%u56FD%7C%u5434%u5B98%u6B63%7C%u5434%u4EEA%7C%u5434%u90A6%u56FD%7C%u5434%u5B98%u6B63%7C%u4E94%u56DB%u8FD0%u52A8%7C%u52A1%u52A8%u5956%7C%u5438%u7CBE%7C%u4E60%u8FD1%u5E73%7C%u4E0B%u9762%u7279%u5927%7C%u4E0B%u9634%7C%u4E0B%u9762%u5927%7C%u4E0B%u9762%u7C97%u5927%7C%u4E0B%u4F53%7C%u5C0F%u5E73%7C%u5C0F%u8089%u7F1D%7C%u5C0F%u7A74%7C%u8096%u5FD7%u6052%7C%u8F9B%u8363%u56FD%7C%u65B0%u5510%u4EBA%7C%u6027%u7231%7C%u6027%u7535%u5F71%7C%u6027%u89C6%u9891%7C%u6027%u7231%7C%u6027%u75C5%7C%u6027%u798F%7C%u6027%u5173%u7CFB%7C%u6027%u72D0%7C%u6027%u4EA4%7C%u6027%u5974%7C%u6027%u8DA3%7C%u5F90%u5C11%u534E%7C%u60AC%u8D4F%7C%u5B66%u6F6E%7C%u5B66%u8054%7C%u5B66%u804A%7C%u5B66%u8FD0%7C%u8840%u903C%7C%u8840%u6D17%7C%u8840%u6BD4%7C%u8840%u6D17%7C%u5EF6%u65F6%u836F%7C%u989C%u8272%u9769%u547D%7C%u9633%u5177%7C%u4E00%u591C%7C%u4E00%u515A%u4E13%u653F%7C%u4E00%u591C%u60C5%7C%u4E00%u4E2D%u4E00%u53F0%7C%u58F9%u591C%u60C5%7C%u836B%u9053%7C%u9634%u90E8%7C%u9634%u5507%7C%u9634%u9053%7C%u9634%u830E%7C%u9634%u8482%7C%u9634%u6838%7C%u9634%u6BDB%7C%u6E38%u884C%7C%u4FDE%u6B63%u58F0%7C%u8BED%u89C6%7C%u8BED%u804A%7C%u8BED%u97F3%u505A%7C%u6B32%u706B%7C%u6742%u79CD%7C%u5728%u5BB6%u5BC2%u5BDE%7C%u6CFD%u4E1C%7C%u6CFD%u6C11%7C%u66FE%u57F9%u708E%7C%u66FE%u5E86%u7EA2%7C%u5305%u591C");
	return new RegExp(filter_str, "gi");
}
jQuery.validator.addMethod("checkFilt", function(value, element) {
  return (value.match(filter()) == null);
}, function(value, element){
  var m = element.value.match(filter());
  var keys = m[0];
  for (var i = 1; i < m.length; i++ ){
    keys += ", " + m[i];
  }
  return "不能填写敏感词"
 // return "出现敏感字-" + keys;
});




