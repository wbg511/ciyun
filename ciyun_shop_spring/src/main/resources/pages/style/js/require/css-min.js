define(function(){if(typeof window=="undefined"){return{load:function(s,p,q){q()}}}var l=document.getElementsByTagName("head")[0];var k=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0;var h=false;var c=true;if(k[1]||k[7]){h=parseInt(k[1])<6||parseInt(k[7])<=9}else{if(k[2]||k[8]){c=false}else{if(k[4]){h=parseInt(k[4])<18}}}var g={};g.pluginBuilder="./css-builder";var j,a;var n=function(){j=document.createElement("style");l.appendChild(j);a=j.styleSheet||j.sheet};var m=0;var i=[];var f;var o=function(p){m++;if(m==32){n();m=0}a.addImport(p);j.onload=function(){d()}};var d=function(){f();var p=i.shift();if(!p){f=null;return}f=p[1];o(p[0])};var e=function(q,r){if(!a||!a.addImport){n()}if(a&&a.addImport){if(f){i.push([q,r])}else{o(q);f=r}}else{j.textContent='@import "'+q+'";';var p=setInterval(function(){try{j.sheet.cssRules;clearInterval(p);r()}catch(s){}},10)}};var b=function(q,s){var r=document.createElement("link");r.type="text/css";r.rel="stylesheet";if(c){r.onload=function(){r.onload=function(){};setTimeout(s,7)}}else{var p=setInterval(function(){for(var u=0;u<document.styleSheets.length;u++){var t=document.styleSheets[u];if(t.href==r.href){clearInterval(p);return s()}}},10)}r.href=q;l.appendChild(r)};g.normalize=function(q,p){if(q.substr(q.length-4,4)==".css"){q=q.substr(0,q.length-4)}return p(q)};g.load=function(s,q,r,p){(h?e:b)(q.toUrl(s+".css"),r)};return g});