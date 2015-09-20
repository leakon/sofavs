
var disappeardelay=500
var verticaloffset=0
var enablearrowhead=1
var arrowheadimg=["/_img/arrowdown.gif","/_img/arrowup.gif"]
var arrowheadheight=10
var ie=document.all
var ns6=document.getElementById&&!document.all
verticaloffset=(enablearrowhead)?verticaloffset+arrowheadheight:verticaloffset
function getposOffset(what,offsettype){var totaloffset=(offsettype=="left")?what.offsetLeft:what.offsetTop;var parentEl=what.offsetParent;while(parentEl!=null){totaloffset=(offsettype=="left")?totaloffset+parentEl.offsetLeft:totaloffset+parentEl.offsetTop;parentEl=parentEl.offsetParent;}
return totaloffset;}
function showhide(obj,e){dropmenuobj.style.left=dropmenuobj.style.top="-500px"
if(e.type=="mouseover")
obj.visibility="visible"}
function iecompattest(){return(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body}
function clearbrowseredge(obj,whichedge){if(whichedge=="rightedge"){edgeoffsetx=0
var windowedge=ie&&!window.opera?iecompattest().scrollLeft+iecompattest().clientWidth-15:window.pageXOffset+window.innerWidth-15
dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
if(windowedge-dropmenuobj.x<dropmenuobj.contentmeasure)
edgeoffsetx=dropmenuobj.contentmeasure-obj.offsetWidth
return edgeoffsetx}
else{edgeoffsety=0
var topedge=ie&&!window.opera?iecompattest().scrollTop:window.pageYOffset
var windowedge=ie&&!window.opera?iecompattest().scrollTop+iecompattest().clientHeight-15-65:window.pageYOffset+window.innerHeight-18-65
dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
if(windowedge-dropmenuobj.y<dropmenuobj.contentmeasure)
edgeoffsety=dropmenuobj.contentmeasure+obj.offsetHeight+(verticaloffset*2)
return edgeoffsety}}
function displayballoontip(obj,e){if(window.event)event.cancelBubble=true
else if(e.stopPropagation)e.stopPropagation()
if(typeof dropmenuobj!="undefined")
dropmenuobj.style.visibility="hidden"
clearhidemenu()
dropmenuobj=document.getElementById(obj.getAttribute("rel"))
showhide(dropmenuobj.style,e)
dropmenuobj.onmouseover=function(){clearhidemenu()};dropmenuobj.onmouseout=function(){delayhidemenu()};dropmenuobj.x=getposOffset(obj,"left")
dropmenuobj.y=getposOffset(obj,"top")+verticaloffset
dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj,"rightedge")+"px"
dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj,"bottomedge")+obj.offsetHeight+"px"
if(enablearrowhead)
displaytiparrow()}
function displaytiparrow(){tiparrow=document.getElementById("arrowhead")
tiparrow.src=(edgeoffsety!=0)?arrowheadimg[0]:arrowheadimg[1]
var ieshadowwidth=(dropmenuobj.filters&&dropmenuobj.filters[0])?dropmenuobj.filters[0].Strength-1:0
tiparrow.style.left=(edgeoffsetx!=0)?parseInt(dropmenuobj.style.left)+dropmenuobj.offsetWidth-tiparrow.offsetWidth-5+"px":parseInt(dropmenuobj.style.left)+10+"px"
tiparrow.style.top=(edgeoffsety!=0)?parseInt(dropmenuobj.style.top)+dropmenuobj.offsetHeight-tiparrow.offsetHeight-ieshadowwidth+arrowheadheight+"px":parseInt(dropmenuobj.style.top)-arrowheadheight+"px"
tiparrow.style.visibility="visible"}
function delayhidemenu(){try{delayhide=setTimeout("dropmenuobj.style.visibility='hidden'; dropmenuobj.style.left=0; if (enablearrowhead) tiparrow.style.visibility='hidden'",disappeardelay)}catch(e){}}
function clearhidemenu(){if(typeof delayhide!="undefined")
clearTimeout(delayhide)}
function reltoelement(linkobj){var relvalue=linkobj.getAttribute("rel")
return(relvalue!=null&&relvalue!=""&&document.getElementById(relvalue)!=null&&document.getElementById(relvalue).className=="balloonstyle")?true:false}
function initalizetooltip(){var all_links=document.getElementsByTagName("div")
if(enablearrowhead){tiparrow=document.createElement("img")
tiparrow.setAttribute("src",arrowheadimg[0])
tiparrow.setAttribute("id","arrowhead")
document.body.appendChild(tiparrow)}
for(var i=0;i<all_links.length;i++){if(reltoelement(all_links[i])){all_links[i].onmouseover=function(e){var evtobj=window.event?window.event:e
displayballoontip(this,evtobj)}
all_links[i].onmouseout=delayhidemenu}}}
if(typeof window.jQuery=="undefined"){window.undefined=window.undefined;var jQuery=function(a,c){if(window==this)
return new jQuery(a,c);a=a||document;if(jQuery.isFunction(a))
return new jQuery(document)[jQuery.fn.ready?"ready":"load"](a);if(typeof a=="string"){var m=/^[^<]*(<(.|\s)+>)[^>]*$/.exec(a);if(m)
a=jQuery.clean([m[1]]);else
return new jQuery(c).find(a);}
return this.setArray(a.constructor==Array&&a||(a.jquery||a.length&&a!=window&&!a.nodeType&&a[0]!=undefined&&a[0].nodeType)&&jQuery.makeArray(a)||[a]);};if(typeof $!="undefined")
jQuery._$=$;var $=jQuery;jQuery.fn=jQuery.prototype={jquery:"1.1.2",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(a){var ret=jQuery(a);ret.prevObject=this;return ret;},setArray:function(a){this.length=0;[].push.apply(this,a);return this;},each:function(fn,args){return jQuery.each(this,fn,args);},index:function(obj){var pos=-1;this.each(function(i){if(this==obj)pos=i;});return pos;},attr:function(key,value,type){var obj=key;if(key.constructor==String)
if(value==undefined)
return this.length&&jQuery[type||"attr"](this[0],key)||undefined;else{obj={};obj[key]=value;}
return this.each(function(index){for(var prop in obj)
jQuery.attr(type?this.style:this,prop,jQuery.prop(this,obj[prop],type,index,prop));});},css:function(key,value){return this.attr(key,value,"curCSS");},text:function(e){if(typeof e=="string")
return this.empty().append(document.createTextNode(e));var t="";jQuery.each(e||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)
t+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return t;},wrap:function(){var a=jQuery.clean(arguments);return this.each(function(){var b=a[0].cloneNode(true);this.parentNode.insertBefore(b,this);while(b.firstChild)
b=b.firstChild;b.appendChild(this);});},append:function(){return this.domManip(arguments,true,1,function(a){this.appendChild(a);});},prepend:function(){return this.domManip(arguments,true,-1,function(a){this.insertBefore(a,this.firstChild);});},before:function(){return this.domManip(arguments,false,1,function(a){this.parentNode.insertBefore(a,this);});},after:function(){return this.domManip(arguments,false,-1,function(a){this.parentNode.insertBefore(a,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(t){return this.pushStack(jQuery.map(this,function(a){return jQuery.find(t,a);}),t);},clone:function(deep){return this.pushStack(jQuery.map(this,function(a){var a=a.cloneNode(deep!=undefined?deep:true);a.$events=null;return a;}));},filter:function(t){return this.pushStack(jQuery.isFunction(t)&&jQuery.grep(this,function(el,index){return t.apply(el,[index])})||jQuery.multiFilter(t,this));},not:function(t){return this.pushStack(t.constructor==String&&jQuery.multiFilter(t,this,true)||jQuery.grep(this,function(a){return(t.constructor==Array||t.jquery)?jQuery.inArray(a,t)<0:a!=t;}));},add:function(t){return this.pushStack(jQuery.merge(this.get(),t.constructor==String?jQuery(t).get():t.length!=undefined&&(!t.nodeName||t.nodeName=="FORM")?t:[t]));},is:function(expr){return expr?jQuery.filter(expr,this).r.length>0:false;},val:function(val){return val==undefined?(this.length?this[0].value:null):this.attr("value",val);},html:function(val){return val==undefined?(this.length?this[0].innerHTML:null):this.empty().append(val);},domManip:function(args,table,dir,fn){var clone=this.length>1;var a=jQuery.clean(args);if(dir<0)
a.reverse();return this.each(function(){var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(a[0],"tr"))
obj=this.getElementsByTagName("tbody")[0]||this.appendChild(document.createElement("tbody"));jQuery.each(a,function(){fn.apply(obj,[clone?this.cloneNode(true):this]);});});}};jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0],a=1;if(arguments.length==1){target=this;a=0;}
var prop;while(prop=arguments[a++])
for(var i in prop)target[i]=prop[i];return target;};jQuery.extend({noConflict:function(){if(jQuery._$)
$=jQuery._$;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&typeof fn[0]=="undefined"&&/function/i.test(fn+"");},isXMLDoc:function(elem){return elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},each:function(obj,fn,args){if(obj.length==undefined)
for(var i in obj)
fn.apply(obj[i],args||[i,obj[i]]);else
for(var i=0,ol=obj.length;i<ol;i++)
if(fn.apply(obj[i],args||[i,obj[i]])===false)break;return obj;},prop:function(elem,value,type,index,prop){if(jQuery.isFunction(value))
value=value.call(elem,[index]);var exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i;return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(prop)?value+"px":value;},className:{add:function(elem,c){jQuery.each(c.split(/\s+/),function(i,cur){if(!jQuery.className.has(elem.className,cur))
elem.className+=(elem.className?" ":"")+cur;});},remove:function(elem,c){elem.className=c?jQuery.grep(elem.className.split(/\s+/),function(cur){return!jQuery.className.has(c,cur);}).join(" "):"";},has:function(t,c){t=t.className||t;c=c.replace(/([\.\\\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,"\\$1");return t&&new RegExp("(^|\\s)"+c+"(\\s|$)").test(t);}},swap:function(e,o,f){for(var i in o){e.style["old"+i]=e.style[i];e.style[i]=o[i];}
f.apply(e,[]);for(var i in o)
e.style[i]=e.style["old"+i];},css:function(e,p){if(p=="height"||p=="width"){var old={},oHeight,oWidth,d=["Top","Bottom","Right","Left"];jQuery.each(d,function(){old["padding"+this]=0;old["border"+this+"Width"]=0;});jQuery.swap(e,old,function(){if(jQuery.css(e,"display")!="none"){oHeight=e.offsetHeight;oWidth=e.offsetWidth;}else{e=jQuery(e.cloneNode(true)).find(":radio").removeAttr("checked").end().css({visibility:"hidden",position:"absolute",display:"block",right:"0",left:"0"}).appendTo(e.parentNode)[0];var parPos=jQuery.css(e.parentNode,"position");if(parPos==""||parPos=="static")
e.parentNode.style.position="relative";oHeight=e.clientHeight;oWidth=e.clientWidth;if(parPos==""||parPos=="static")
e.parentNode.style.position="static";e.parentNode.removeChild(e);}});return p=="height"?oHeight:oWidth;}
return jQuery.curCSS(e,p);},curCSS:function(elem,prop,force){var ret;if(prop=="opacity"&&jQuery.browser.msie)
return jQuery.attr(elem.style,"opacity");if(prop=="float"||prop=="cssFloat")
prop=jQuery.browser.msie?"styleFloat":"cssFloat";if(!force&&elem.style[prop])
ret=elem.style[prop];else if(document.defaultView&&document.defaultView.getComputedStyle){if(prop=="cssFloat"||prop=="styleFloat")
prop="float";prop=prop.replace(/([A-Z])/g,"-$1").toLowerCase();var cur=document.defaultView.getComputedStyle(elem,null);if(cur)
ret=cur.getPropertyValue(prop);else if(prop=="display")
ret="none";else
jQuery.swap(elem,{display:"block"},function(){var c=document.defaultView.getComputedStyle(this,"");ret=c&&c.getPropertyValue(prop)||"";});}else if(elem.currentStyle){var newProp=prop.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});ret=elem.currentStyle[prop]||elem.currentStyle[newProp];}
return ret;},clean:function(a){var r=[];jQuery.each(a,function(i,arg){if(!arg)return;if(arg.constructor==Number)
arg=arg.toString();if(typeof arg=="string"){var s=jQuery.trim(arg),div=document.createElement("div"),tb=[];var wrap=!s.indexOf("<opt")&&[1,"<select>","</select>"]||(!s.indexOf("<thead")||!s.indexOf("<tbody")||!s.indexOf("<tfoot"))&&[1,"<table>","</table>"]||!s.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!s.indexOf("<td")||!s.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];div.innerHTML=wrap[1]+s+wrap[2];while(wrap[0]--)
div=div.firstChild;if(jQuery.browser.msie){if(!s.indexOf("<table")&&s.indexOf("<tbody")<0)
tb=div.firstChild&&div.firstChild.childNodes;else if(wrap[1]=="<table>"&&s.indexOf("<tbody")<0)
tb=div.childNodes;for(var n=tb.length-1;n>=0;--n)
if(jQuery.nodeName(tb[n],"tbody")&&!tb[n].childNodes.length)
tb[n].parentNode.removeChild(tb[n]);}
arg=[];for(var i=0,l=div.childNodes.length;i<l;i++)
arg.push(div.childNodes[i]);}
if(arg.length===0&&!jQuery.nodeName(arg,"form"))
return;if(arg[0]==undefined||jQuery.nodeName(arg,"form"))
r.push(arg);else
r=jQuery.merge(r,arg);});return r;},attr:function(elem,name,value){var fix=jQuery.isXMLDoc(elem)?{}:{"for":"htmlFor","class":"className","float":jQuery.browser.msie?"styleFloat":"cssFloat",cssFloat:jQuery.browser.msie?"styleFloat":"cssFloat",innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected"};if(name=="opacity"&&jQuery.browser.msie&&value!=undefined){elem.zoom=1;return elem.filter=elem.filter.replace(/alpha\([^\)]*\)/gi,"")+
(value==1?"":"alpha(opacity="+value*100+")");}else if(name=="opacity"&&jQuery.browser.msie)
return elem.filter?parseFloat(elem.filter.match(/alpha\(opacity=(.*)\)/)[1])/100:1;if(name=="opacity"&&jQuery.browser.mozilla&&value==1)
value=0.9999;if(fix[name]){if(value!=undefined)elem[fix[name]]=value;return elem[fix[name]];}else if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method"))
return elem.getAttributeNode(name).nodeValue;else if(elem.tagName){if(value!=undefined)elem.setAttribute(name,value);if(jQuery.browser.msie&&/href|src/.test(name)&&!jQuery.isXMLDoc(elem))
return elem.getAttribute(name,2);return elem.getAttribute(name);}else{name=name.replace(/-([a-z])/ig,function(z,b){return b.toUpperCase();});if(value!=undefined)elem[name]=value;return elem[name];}},trim:function(t){return t.replace(/^\s+|\s+$/g,"");},makeArray:function(a){var r=[];if(a.constructor!=Array)
for(var i=0,al=a.length;i<al;i++)
r.push(a[i]);else
r=a.slice(0);return r;},inArray:function(b,a){for(var i=0,al=a.length;i<al;i++)
if(a[i]==b)
return i;return-1;},merge:function(first,second){var r=[].slice.call(first,0);for(var i=0,sl=second.length;i<sl;i++)
if(jQuery.inArray(second[i],r)==-1)
first.push(second[i]);return first;},grep:function(elems,fn,inv){if(typeof fn=="string")
fn=new Function("a","i","return "+fn);var result=[];for(var i=0,el=elems.length;i<el;i++)
if(!inv&&fn(elems[i],i)||inv&&!fn(elems[i],i))
result.push(elems[i]);return result;},map:function(elems,fn){if(typeof fn=="string")
fn=new Function("a","return "+fn);var result=[],r=[];for(var i=0,el=elems.length;i<el;i++){var val=fn(elems[i],i);if(val!==null&&val!=undefined){if(val.constructor!=Array)val=[val];result=result.concat(val);}}
var r=result.length?[result[0]]:[];check:for(var i=1,rl=result.length;i<rl;i++){for(var j=0;j<i;j++)
if(result[i]==r[j])
continue check;r.push(result[i]);}
return r;}});new function(){var b=navigator.userAgent.toLowerCase();jQuery.browser={safari:/webkit/.test(b),opera:/opera/.test(b),msie:/msie/.test(b)&&!/opera/.test(b),mozilla:/mozilla/.test(b)&&!/(compatible|webkit)/.test(b)};jQuery.boxModel=!jQuery.browser.msie||document.compatMode=="CSS1Compat";};jQuery.each({parent:"a.parentNode",parents:"jQuery.parents(a)",next:"jQuery.nth(a,2,'nextSibling')",prev:"jQuery.nth(a,2,'previousSibling')",siblings:"jQuery.sibling(a.parentNode.firstChild,a)",children:"jQuery.sibling(a.firstChild)"},function(i,n){jQuery.fn[i]=function(a){var ret=jQuery.map(this,n);if(a&&typeof a=="string")
ret=jQuery.multiFilter(a,ret);return this.pushStack(ret);};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after"},function(i,n){jQuery.fn[i]=function(){var a=arguments;return this.each(function(){for(var j=0,al=a.length;j<al;j++)
jQuery(a[j])[n](this);});};});jQuery.each({removeAttr:function(key){jQuery.attr(this,key,"");this.removeAttribute(key);},addClass:function(c){jQuery.className.add(this,c);},removeClass:function(c){jQuery.className.remove(this,c);},toggleClass:function(c){jQuery.className[jQuery.className.has(this,c)?"remove":"add"](this,c);},remove:function(a){if(!a||jQuery.filter(a,[this]).r.length)
this.parentNode.removeChild(this);},empty:function(){while(this.firstChild)
this.removeChild(this.firstChild);}},function(i,n){jQuery.fn[i]=function(){return this.each(n,arguments);};});jQuery.each(["eq","lt","gt","contains"],function(i,n){jQuery.fn[n]=function(num,fn){return this.filter(":"+n+"("+num+")",fn);};});jQuery.each(["height","width"],function(i,n){jQuery.fn[n]=function(h){return h==undefined?(this.length?jQuery.css(this[0],n):null):this.css(n,h.constructor==String?h:h+"px");};});jQuery.extend({expr:{"":"m[2]=='*'||jQuery.nodeName(a,m[2])","#":"a.getAttribute('id')==m[2]",":":{lt:"i<m[3]-0",gt:"i>m[3]-0",nth:"m[3]-0==i",eq:"m[3]-0==i",first:"i==0",last:"i==r.length-1",even:"i%2==0",odd:"i%2","nth-child":"jQuery.nth(a.parentNode.firstChild,m[3],'nextSibling',a)==a","first-child":"jQuery.nth(a.parentNode.firstChild,1,'nextSibling')==a","last-child":"jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a","only-child":"jQuery.sibling(a.parentNode.firstChild).length==1",parent:"a.firstChild",empty:"!a.firstChild",contains:"jQuery.fn.text.apply([a]).indexOf(m[3])>=0",visible:'a.type!="hidden"&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',hidden:'a.type=="hidden"||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',enabled:"!a.disabled",disabled:"a.disabled",checked:"a.checked",selected:"a.selected||jQuery.attr(a,'selected')",text:"a.type=='text'",radio:"a.type=='radio'",checkbox:"a.type=='checkbox'",file:"a.type=='file'",password:"a.type=='password'",submit:"a.type=='submit'",image:"a.type=='image'",reset:"a.type=='reset'",button:'a.type=="button"||jQuery.nodeName(a,"button")',input:"/input|select|textarea|button/i.test(a.nodeName)"},".":"jQuery.className.has(a,m[2])","@":{"=":"z==m[4]","!=":"z!=m[4]","^=":"z&&!z.indexOf(m[4])","$=":"z&&z.substr(z.length - m[4].length,m[4].length)==m[4]","*=":"z&&z.indexOf(m[4])>=0","":"z",_resort:function(m){return["",m[1],m[3],m[2],m[5]];},_prefix:"z=a[m[3]];if(!z||/href|src/.test(m[3]))z=jQuery.attr(a,m[3]);"},"[":"jQuery.find(m[2],a).length"},parse:[/^\[ *(@)([a-z0-9_-]*) *([!*$^=]*) *('?"?)(.*?)\4 *\]/i,/^(\[)\s*(.*?(\[.*?\])?[^[]*?)\s*\]/,/^(:)([a-z0-9_-]*)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/i,/^([:.#]*)([a-z0-9_*-]*)/i],token:[/^(\/?\.\.)/,"a.parentNode",/^(>|\/)/,"jQuery.sibling(a.firstChild)",/^(\+)/,"jQuery.nth(a,2,'nextSibling')",/^(~)/,function(a){var s=jQuery.sibling(a.parentNode.firstChild);return s.slice(jQuery.inArray(a,s)+1);}],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}
return cur;},find:function(t,context){if(typeof t!="string")
return[t];if(context&&!context.nodeType)
context=null;context=context||document;if(!t.indexOf("//")){context=context.documentElement;t=t.substr(2,t.length);}else if(!t.indexOf("/")){context=context.documentElement;t=t.substr(1,t.length);if(t.indexOf("/")>=1)
t=t.substr(t.indexOf("/"),t.length);}
var ret=[context],done=[],last=null;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t).replace(/^\/\//i,"");var foundToken=false;var re=/^[\/>]\s*([a-z0-9*-]+)/i;var m=re.exec(t);if(m){jQuery.each(ret,function(){for(var c=this.firstChild;c;c=c.nextSibling)
if(c.nodeType==1&&(jQuery.nodeName(c,m[1])||m[1]=="*"))
r.push(c);});ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{for(var i=0;i<jQuery.token.length;i+=2){var re=jQuery.token[i];var m=re.exec(t);if(m){r=ret=jQuery.map(ret,jQuery.isFunction(jQuery.token[i+1])?jQuery.token[i+1]:function(a){return eval(jQuery.token[i+1]);});t=jQuery.trim(t.replace(re,""));foundToken=true;break;}}}
if(t&&!foundToken){if(!t.indexOf(",")){if(ret[0]==context)ret.shift();jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=/^([a-z0-9_-]+)(#)([a-z0-9\\*_-]*)/i;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=/^([#.]?)([a-z0-9\\*_-]*)/i;m=re2.exec(t);}
if(m[1]=="#"&&ret[ret.length-1].getElementById){var oid=ret[ret.length-1].getElementById(m[2]);if(jQuery.browser.msie&&oid&&oid.id!=m[2])
oid=jQuery('[@id="'+m[2]+'"]',ret[ret.length-1])[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{if(m[1]==".")
var rec=new RegExp("(^|\\s)"+m[2]+"(\\s|$)");jQuery.each(ret,function(){var tag=m[1]!=""||m[0]==""?"*":m[2];if(jQuery.nodeName(this,"object")&&tag=="*")
tag="param";jQuery.merge(r,m[1]!=""&&ret.length!=1?jQuery.getAll(this,[],m[1],m[2],rec):this.getElementsByTagName(tag));});if(m[1]=="."&&ret.length==1)
r=jQuery.grep(r,function(e){return rec.test(e.className);});if(m[1]=="#"&&ret.length==1){var tmp=r;r=[];jQuery.each(tmp,function(){if(this.getAttribute("id")==m[2]){r=[this];return false;}});}
ret=r;}
t=t.replace(re2,"");}}
if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}
if(ret&&ret[0]==context)ret.shift();jQuery.merge(done,ret);return done;},filter:function(t,r,not){while(t&&/^[a-z[({<*:.#]/i.test(t)){var p=jQuery.parse,m;jQuery.each(p,function(i,re){m=re.exec(t);if(m){t=t.substring(m[0].length);if(jQuery.expr[m[1]]._resort)
m=jQuery.expr[m[1]]._resort(m);return false;}});if(m[1]==":"&&m[2]=="not")
r=jQuery.filter(m[3],r,true).r;else if(m[1]=="."){var re=new RegExp("(^|\\s)"+m[2]+"(\\s|$)");r=jQuery.grep(r,function(e){return re.test(e.className||"");},not);}else{var f=jQuery.expr[m[1]];if(typeof f!="string")
f=jQuery.expr[m[1]][m[2]];eval("f = function(a,i){"+
(jQuery.expr[m[1]]._prefix||"")+"return "+f+"}");r=jQuery.grep(r,f,not);}}
return{r:r,t:t};},getAll:function(o,r,token,name,re){for(var s=o.firstChild;s;s=s.nextSibling)
if(s.nodeType==1){var add=true;if(token==".")
add=s.className&&re.test(s.className);else if(token=="#")
add=s.getAttribute("id")==name;if(add)
r.push(s);if(token=="#"&&r.length)break;if(s.firstChild)
jQuery.getAll(s,r,token,name,re);}
return r;},parents:function(elem){var matched=[];var cur=elem.parentNode;while(cur&&cur!=document){matched.push(cur);cur=cur.parentNode;}
return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType==1)num++;if(num==result||result=="even"&&num%2==0&&num>1&&cur==elem||result=="odd"&&num%2==1&&cur==elem)return cur;}},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&(!elem||n!=elem))
r.push(n);}
return r;}});jQuery.event={add:function(element,type,handler,data){if(jQuery.browser.msie&&element.setInterval!=undefined)
element=window;if(data)
handler.data=data;if(!handler.guid)
handler.guid=this.guid++;if(!element.$events)
element.$events={};var handlers=element.$events[type];if(!handlers){handlers=element.$events[type]={};if(element["on"+type])
handlers[0]=element["on"+type];}
handlers[handler.guid]=handler;element["on"+type]=this.handle;if(!this.global[type])
this.global[type]=[];this.global[type].push(element);},guid:1,global:{},remove:function(element,type,handler){if(element.$events){var i,j,k;if(type&&type.type){handler=type.handler;type=type.type;}
if(type&&element.$events[type])
if(handler)
delete element.$events[type][handler.guid];else
for(i in element.$events[type])
delete element.$events[type][i];else
for(j in element.$events)
this.remove(element,j);for(k in element.$events[type])
if(k){k=true;break;}
if(!k)element["on"+type]=null;}},trigger:function(type,data,element){data=jQuery.makeArray(data||[]);if(!element)
jQuery.each(this.global[type]||[],function(){jQuery.event.trigger(type,data,this);});else{var handler=element["on"+type],val,fn=jQuery.isFunction(element[type]);if(handler){data.unshift(this.fix({type:type,target:element}));if((val=handler.apply(element,data))!==false)
this.triggered=true;}
if(fn&&val!==false)
element[type]();this.triggered=false;}},handle:function(event){if(typeof jQuery=="undefined"||jQuery.event.triggered)return;event=jQuery.event.fix(event||window.event||{});var returnValue;var c=this.$events[event.type];var args=[].slice.call(arguments,1);args.unshift(event);for(var j in c){args[0].handler=c[j];args[0].data=c[j].data;if(c[j].apply(this,args)===false){event.preventDefault();event.stopPropagation();returnValue=false;}}
if(jQuery.browser.msie)event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null;return returnValue;},fix:function(event){if(!event.target&&event.srcElement)
event.target=event.srcElement;if(event.pageX==undefined&&event.clientX!=undefined){var e=document.documentElement,b=document.body;event.pageX=event.clientX+(e.scrollLeft||b.scrollLeft);event.pageY=event.clientY+(e.scrollTop||b.scrollTop);}
if(jQuery.browser.safari&&event.target.nodeType==3){var originalEvent=event;event=jQuery.extend({},originalEvent);event.target=originalEvent.target.parentNode;event.preventDefault=function(){return originalEvent.preventDefault();};event.stopPropagation=function(){return originalEvent.stopPropagation();};}
if(!event.preventDefault)
event.preventDefault=function(){this.returnValue=false;};if(!event.stopPropagation)
event.stopPropagation=function(){this.cancelBubble=true;};return event;}};jQuery.fn.extend({bind:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,fn||data,data);});},one:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,function(event){jQuery(this).unbind(event);return(fn||data).apply(this,arguments);},data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},toggle:function(){var a=arguments;return this.click(function(e){this.lastToggle=this.lastToggle==0?1:0;e.preventDefault();return a[this.lastToggle].apply(this,[e])||false;});},hover:function(f,g){function handleHover(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this)try{p=p.parentNode}catch(e){p=this;};if(p==this)return false;return(e.type=="mouseover"?f:g).apply(this,[e]);}
return this.mouseover(handleHover).mouseout(handleHover);},ready:function(f){if(jQuery.isReady)
f.apply(document,[jQuery]);else{jQuery.readyList.push(function(){return f.apply(this,[jQuery])});}
return this;}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.apply(document);});jQuery.readyList=null;}
if(jQuery.browser.mozilla||jQuery.browser.opera)
document.removeEventListener("DOMContentLoaded",jQuery.ready,false);}}});new function(){jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,o){jQuery.fn[o]=function(f){return f?this.bind(o,f):this.trigger(o);};});if(jQuery.browser.mozilla||jQuery.browser.opera)
document.addEventListener("DOMContentLoaded",jQuery.ready,false);else if(jQuery.browser.msie){document.write("<scr"+"ipt id=__ie_init defer=true "+"src=//:><\/script>");var script=document.getElementById("__ie_init");if(script)
script.onreadystatechange=function(){if(this.readyState!="complete")return;this.parentNode.removeChild(this);jQuery.ready();};script=null;}else if(jQuery.browser.safari)
jQuery.safariTimer=setInterval(function(){if(document.readyState=="loaded"||document.readyState=="complete"){clearInterval(jQuery.safariTimer);jQuery.safariTimer=null;jQuery.ready();}},10);jQuery.event.add(window,"load",jQuery.ready);};if(jQuery.browser.msie)
jQuery(window).one("unload",function(){var global=jQuery.event.global;for(var type in global){var els=global[type],i=els.length;if(i&&type!='unload')
do
jQuery.event.remove(els[i-1],type);while(--i);}});jQuery.fn.extend({loadIfModified:function(url,params,callback){this.load(url,params,callback,1);},load:function(url,params,callback,ifModified){if(jQuery.isFunction(url))
return this.bind("load",url);callback=callback||function(){};var type="GET";if(params)
if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}
var self=this;jQuery.ajax({url:url,type:type,data:params,ifModified:ifModified,complete:function(res,status){if(status=="success"||!ifModified&&status=="notmodified")
self.attr("innerHTML",res.responseText).evalScripts().each(callback,[res.responseText,status,res]);else
callback.apply(self,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this);},evalScripts:function(){return this.find("script").each(function(){if(this.src)
jQuery.getScript(this.src);else
jQuery.globalEval(this.text||this.textContent||this.innerHTML||"");}).end();}});if(!window.XMLHttpRequest)
XMLHttpRequest=function(){return new ActiveXObject("Microsoft.XMLHTTP");};jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});jQuery.extend({get:function(url,data,callback,type,ifModified){if(jQuery.isFunction(data)){callback=data;data=null;}
return jQuery.ajax({url:url,data:data,success:callback,dataType:type,ifModified:ifModified});},getIfModified:function(url,data,callback,type){return jQuery.get(url,data,callback,type,1);},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}
return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxTimeout:function(timeout){jQuery.ajaxSettings.timeout=timeout;},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings);},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null},lastModified:{},ajax:function(s){s=jQuery.extend({},jQuery.ajaxSettings,s);if(s.data){if(s.processData&&typeof s.data!="string")
s.data=jQuery.param(s.data);if(s.type.toLowerCase()=="get"){s.url+=((s.url.indexOf("?")>-1)?"&":"?")+s.data;s.data=null;}}
if(s.global&&!jQuery.active++)
jQuery.event.trigger("ajaxStart");var requestDone=false;var xml=new XMLHttpRequest();xml.open(s.type,s.url,s.async);if(s.data)
xml.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)
xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xml.setRequestHeader("X-Requested-With","XMLHttpRequest");if(xml.overrideMimeType)
xml.setRequestHeader("Connection","close");if(s.beforeSend)
s.beforeSend(xml);if(s.global)
jQuery.event.trigger("ajaxSend",[xml,s]);var onreadystatechange=function(isTimeout){if(xml&&(xml.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}
var status;try{status=jQuery.httpSuccess(xml)&&isTimeout!="timeout"?s.ifModified&&jQuery.httpNotModified(xml,s.url)?"notmodified":"success":"error";if(status!="error"){var modRes;try{modRes=xml.getResponseHeader("Last-Modified");}catch(e){}
if(s.ifModified&&modRes)
jQuery.lastModified[s.url]=modRes;var data=jQuery.httpData(xml,s.dataType);if(s.success)
s.success(data,status);if(s.global)
jQuery.event.trigger("ajaxSuccess",[xml,s]);}else
jQuery.handleError(s,xml,status);}catch(e){status="error";jQuery.handleError(s,xml,status,e);}
if(s.global)
jQuery.event.trigger("ajaxComplete",[xml,s]);if(s.global&&!--jQuery.active)
jQuery.event.trigger("ajaxStop");if(s.complete)
s.complete(xml,status);if(s.async)
xml=null;}};var ival=setInterval(onreadystatechange,13);if(s.timeout>0)
setTimeout(function(){if(xml){xml.abort();if(!requestDone)
onreadystatechange("timeout");}},s.timeout);try{xml.send(s.data);}catch(e){jQuery.handleError(s,xml,null,e);}
if(!s.async)
onreadystatechange();return xml;},handleError:function(s,xml,status,e){if(s.error)s.error(xml,status,e);if(s.global)
jQuery.event.trigger("ajaxError",[xml,s,e]);},active:0,httpSuccess:function(r){try{return!r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||jQuery.browser.safari&&r.status==undefined;}catch(e){}
return false;},httpNotModified:function(xml,url){try{var xmlRes=xml.getResponseHeader("Last-Modified");return xml.status==304||xmlRes==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined;}catch(e){}
return false;},httpData:function(r,type){var ct=r.getResponseHeader("content-type");var data=!type&&ct&&ct.indexOf("xml")>=0;data=type=="xml"||data?r.responseXML:r.responseText;if(type=="script")
jQuery.globalEval(data);if(type=="json")
eval("data = "+data);if(type=="html")
jQuery("<div>").html(data).evalScripts();return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)
jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)
if(a[j]&&a[j].constructor==Array)
jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]));return s.join("&");},globalEval:function(data){if(window.execScript)
window.execScript(data);else if(jQuery.browser.safari)
window.setTimeout(data,0);else
eval.call(window,data);}});jQuery.fn.extend({show:function(speed,callback){var hidden=this.filter(":hidden");speed?hidden.animate({height:"show",width:"show",opacity:"show"},speed,callback):hidden.each(function(){this.style.display=this.oldblock?this.oldblock:"";if(jQuery.css(this,"display")=="none")
this.style.display="block";});return this;},hide:function(speed,callback){var visible=this.filter(":visible");speed?visible.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):visible.each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");if(this.oldblock=="none")
this.oldblock="block";this.style.display="none";});return this;},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){var args=arguments;return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"].apply(jQuery(this),args);});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.each(function(){var state=jQuery(this).is(":hidden")?"show":"hide";jQuery(this).animate({height:state},speed,callback);});},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){return this.queue(function(){this.curAnim=jQuery.extend({},prop);var opt=jQuery.speed(speed,easing,callback);for(var p in prop){var e=new jQuery.fx(this,opt,p);if(prop[p].constructor==Number)
e.custom(e.cur(),prop[p]);else
e[prop[p]](prop);}});},queue:function(type,fn){if(!fn){fn=type;type="fx";}
return this.each(function(){if(!this.queue)
this.queue={};if(!this.queue[type])
this.queue[type]=[];this.queue[type].push(fn);if(this.queue[type].length==1)
fn.apply(this);});}});jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;opt.old=opt.complete;opt.complete=function(){jQuery.dequeue(this,"fx");if(jQuery.isFunction(opt.old))
opt.old.apply(this);};return opt;},easing:{},queue:{},dequeue:function(elem,type){type=type||"fx";if(elem.queue&&elem.queue[type]){elem.queue[type].shift();var f=elem.queue[type][0];if(f)f.apply(elem);}},fx:function(elem,options,prop){var z=this;var y=elem.style;var oldDisplay=jQuery.css(elem,"display");y.overflow="hidden";z.a=function(){if(options.step)
options.step.apply(elem,[z.now]);if(prop=="opacity")
jQuery.attr(y,"opacity",z.now);else if(parseInt(z.now))
y[prop]=parseInt(z.now)+"px";y.display="block";};z.max=function(){return parseFloat(jQuery.css(elem,prop));};z.cur=function(){var r=parseFloat(jQuery.curCSS(elem,prop));return r&&r>-10000?r:z.max();};z.custom=function(from,to){z.startTime=(new Date()).getTime();z.now=from;z.a();z.timer=setInterval(function(){z.step(from,to);},13);};z.show=function(){if(!elem.orig)elem.orig={};elem.orig[prop]=this.cur();options.show=true;z.custom(0,elem.orig[prop]);if(prop!="opacity")
y[prop]="1px";};z.hide=function(){if(!elem.orig)elem.orig={};elem.orig[prop]=this.cur();options.hide=true;z.custom(elem.orig[prop],0);};z.toggle=function(){if(!elem.orig)elem.orig={};elem.orig[prop]=this.cur();if(oldDisplay=="none"){options.show=true;if(prop!="opacity")
y[prop]="1px";z.custom(0,elem.orig[prop]);}else{options.hide=true;z.custom(elem.orig[prop],0);}};z.step=function(firstNum,lastNum){var t=(new Date()).getTime();if(t>options.duration+z.startTime){clearInterval(z.timer);z.timer=null;z.now=lastNum;z.a();if(elem.curAnim)elem.curAnim[prop]=true;var done=true;for(var i in elem.curAnim)
if(elem.curAnim[i]!==true)
done=false;if(done){y.overflow="";y.display=oldDisplay;if(jQuery.css(elem,"display")=="none")
y.display="block";if(options.hide)
y.display="none";if(options.hide||options.show)
for(var p in elem.curAnim)
if(p=="opacity")
jQuery.attr(y,p,elem.orig[p]);else
y[p]="";}
if(done&&jQuery.isFunction(options.complete))
options.complete.apply(elem);}else{var n=t-this.startTime;var p=n/options.duration;z.now=options.easing&&jQuery.easing[options.easing]?jQuery.easing[options.easing](p,n,firstNum,(lastNum-firstNum),options.duration):((-Math.cos(p*Math.PI)/2)+0.5)*(lastNum-firstNum)+firstNum;z.a();}};}});}
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+options.path:'';var domain=options.domain?'; domain='+options.domain:'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};(function($){$.expr[':'].taconiteTag='a.taconiteTag';if(typeof $.fn.replace=='undefined')
$.fn.replace=function(a){return this.after(a).remove();};if(typeof $.fn.replaceContent=='undefined')
$.fn.replaceContent=function(a){return this.empty().append(a);};$.taconite=$.xmlExec=function(xml){var status=true,ex;try{$.event.trigger('taconite.begin.notify',[xml])
status=$.taconite.impl.process(xml);}catch(e){status=ex=e;}
$.event.trigger('taconite.complete.notify',[xml,!!status,status===true?null:status]);if(ex)throw ex;};$.taconite.version=[2,1,7];$.taconite.debug=0;$.taconite.lastTime=0;$.taconite._httpData=$.httpData;$.httpData=$.taconite.detect=function(xhr,type){var ct=xhr.getResponseHeader('content-type');if($.taconite.debug){$.taconite.log('[AJAX response] content-type: ',ct,';  status: ',xhr.status,' ',xhr.statusText,';  has responseXML: ',xhr.responseXML!=null);$.taconite.log('type: '+type);$.taconite.log('responseXML: '+xhr.responseXML);}
var data=$.taconite._httpData(xhr,type);if(data&&data.documentElement){var root=data.documentElement.tagName;$.taconite.log('XML document root: ',root);if(root=='taconite'){$.taconite.log('taconite command document detected');$.taconite(data);}}
else{$.taconite.log('jQuery core httpData returned: '+data);$.taconite.log('httpData: response is not XML (or not "valid" XML)');}
return data;};$.taconite.enableAutoDetection=function(b){$.httpData=b?$.taconite.detect:$.taconite._httpData;};$.taconite.log=function(){if(!$.taconite.debug||!window.console||!window.console.log)return;if(!$.taconite.log.count++)
$.taconite.log('Plugin Version: '+$.taconite.version.join('.'));window.console.log('[taconite] '+[].join.call(arguments,''));};$.taconite.log.count=0;$.taconite.impl={trimHash:{wrap:1},convert:function(s){var doc;$.taconite.log('attempting string to document conversion');try{if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{var parser=new DOMParser();doc=parser.parseFromString(s,'text/xml');}}
catch(e){if(window.console&&window.console.error)
window.console.error('[taconite] ERROR parsing XML string for conversion: '+e);throw e;}
var ok=doc&&doc.documentElement&&doc.documentElement.tagName!='parsererror';$.taconite.log('conversion ',ok?'successful!':'FAILED');return doc;},process:function(xml){if(typeof xml=='string')
xml=this.convert(xml);if(!xml||!xml.documentElement){$.taconite.log('$.taconite invoked without valid document; nothing to process');return false;}
try{var t=new Date().getTime();$.taconite.impl.process1(xml.documentElement.childNodes);$.taconite.lastTime=(new Date().getTime())-t;$.taconite.log('time to process response: '+$.taconite.lastTime+'ms');}catch(e){if(window.console&&window.console.error)
window.console.error('[taconite] ERROR processing document: '+e);throw e;}
return true;},process1:function(commands){var doPostProcess=0;for(var i=0;i<commands.length;i++){if(commands[i].nodeType!=1)
continue;var cmdNode=commands[i],cmd=cmdNode.tagName;if(cmd=='eval'){var js=(cmdNode.firstChild?cmdNode.firstChild.nodeValue:null);$.taconite.log('invoking "eval" command: ',js);if(js)$.globalEval(js);continue;}
var q=cmdNode.getAttribute('select');var jq=$(q);if(!jq[0]){$.taconite.log('No matching targets for selector: ',q);continue;}
var a=[];if(cmdNode.childNodes.length>0){doPostProcess=1;for(var j=0,els=[];j<cmdNode.childNodes.length;j++)
els[j]=this.createNode(cmdNode.childNodes[j]);a.push(this.trimHash[cmd]?this.cleanse(els):els);}
else{var n=cmdNode.getAttribute('name');var v=cmdNode.getAttribute('value');if(n!==null)a.push(n);if(v!==null)a.push(v);for(var j=1;true;j++){v=cmdNode.getAttribute('arg'+j);if(v===null)
break;a.push(v);}}
if($.taconite.debug){var arg=els?'...':a.join(',');$.taconite.log("invoking command: $('",q,"').",cmd,'('+arg+')');}
jq[cmd].apply(jq,a);}
if(doPostProcess)this.postProcess();},postProcess:function(){if(!$.browser.opera&&!$.browser.msie)return;$('select:taconiteTag').each(function(){$('option:taconiteTag',this).each(function(){this.setAttribute('selected','selected');this.taconiteTag=null;});this.taconiteTag=null;});},cleanse:function(els){for(var i=0,a=[];i<els.length;i++)
if(els[i].nodeType==1)a.push(els[i]);return a;},createNode:function(node){var type=node.nodeType;if(type==1)return this.createElement(node);if(type==3)return this.fixTextNode(node.nodeValue);if(type==4)return this.handleCDATA(node.nodeValue);return null;},handleCDATA:function(s){var $div=$('<div>').html(s);return $div[0];},fixTextNode:function(s){if($.browser.msie)s=s.replace(/\n/g,'\r');return document.createTextNode(s);},createElement:function(node){var e,tag=node.tagName.toLowerCase();if($.browser.msie){var type=node.getAttribute('type');if(tag=='table'||type=='radio'||type=='checkbox'||tag=='button'||(tag=='select'&&node.getAttribute('multiple'))){e=document.createElement('<'+tag+' '+this.copyAttrs(null,node,true)+'>');}}
if(!e){e=document.createElement(tag);this.copyAttrs(e,node);}
if($.browser.msie&&!e.canHaveChildren){if(node.childNodes.length>0)
e.text=node.text;}
else{for(var i=0,max=node.childNodes.length;i<max;i++){var child=this.createNode(node.childNodes[i]);if(child)e.appendChild(child);}}
if($.browser.msie||$.browser.opera){if(tag=='select'||(tag=='option'&&node.getAttribute('selected')))
e.taconiteTag=1;}
return e;},copyAttrs:function(dest,src,inline){for(var i=0,attr='';i<src.attributes.length;i++){var a=src.attributes[i],n=$.trim(a.name),v=$.trim(a.value);if(inline)attr+=(n+'="'+v+'" ');else if(n=='style'){dest.style.cssText=v;dest.setAttribute(n,v);}
else $.attr(dest,n,v);}
return attr;}};})(jQuery);(function($){$.fn.extend({_height:$.fn.height,_width:$.fn.width,height:function(val){if(this[0]==window)
return self.innerHeight||$.boxModel&&document.documentElement.clientHeight||document.body.clientHeight;if(this[0]==document)
return Math.max(document.body.scrollHeight,document.body.offsetHeight);return this._height(val);},width:function(val){if(this[0]==window)
return self.innerWidth||$.boxModel&&document.documentElement.clientWidth||document.body.clientWidth;if(this[0]==document)
return Math.max(document.body.scrollWidth,document.body.offsetWidth);return this._width(val);},innerHeight:function(){return this[0]==window||this[0]==document?this.height():this.is(':visible')?this[0].offsetHeight-num(this,'borderTopWidth')-num(this,'borderBottomWidth'):this.height()+num(this,'paddingTop')+num(this,'paddingBottom');},innerWidth:function(){return this[0]==window||this[0]==document?this.width():this.is(':visible')?this[0].offsetWidth-num(this,'borderLeftWidth')-num(this,'borderRightWidth'):this.width()+num(this,'paddingLeft')+num(this,'paddingRight');},outerHeight:function(){return this[0]==window||this[0]==document?this.height():this.is(':visible')?this[0].offsetHeight:this.height()+num(this,'borderTopWidth')+num(this,'borderBottomWidth')+num(this,'paddingTop')+num(this,'paddingBottom');},outerWidth:function(){return this[0]==window||this[0]==document?this.width():this.is(':visible')?this[0].offsetWidth:this.width()+num(this,'borderLeftWidth')+num(this,'borderRightWidth')+num(this,'paddingLeft')+num(this,'paddingRight');},scrollLeft:function(val){if(val!=undefined)
return this.each(function(){if(this==window||this==document)
window.scrollTo(val,$(window).scrollTop());else
this.scrollLeft=val;});if(this[0]==window||this[0]==document)
return self.pageXOffset||$.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft;return this[0].scrollLeft;},scrollTop:function(val){if(val!=undefined)
return this.each(function(){if(this==window||this==document)
window.scrollTo($(window).scrollLeft(),val);else
this.scrollTop=val;});if(this[0]==window||this[0]==document)
return self.pageYOffset||$.boxModel&&document.documentElement.scrollTop||document.body.scrollTop;return this[0].scrollTop;},offset:function(options,returnObject){var x=0,y=0,sl=0,st=0,elem=this[0],parent=this[0],op,parPos,elemPos=$.css(elem,'position'),mo=$.browser.mozilla,ie=$.browser.msie,sf=$.browser.safari,oa=$.browser.opera,absparent=false,relparent=false,options=$.extend({margin:true,border:true,padding:false,scroll:true,lite:false},options||{});if(options.lite)return this.offsetLite(options,returnObject);if(elem.tagName.toLowerCase()=='body'){x=elem.offsetLeft;y=elem.offsetTop;if(mo){x+=num(elem,'marginLeft')+(num(elem,'borderLeftWidth')*2);y+=num(elem,'marginTop')+(num(elem,'borderTopWidth')*2);}else
if(oa){x+=num(elem,'marginLeft');y+=num(elem,'marginTop');}else
if(ie&&jQuery.boxModel){x+=num(elem,'borderLeftWidth');y+=num(elem,'borderTopWidth');}}else{do{parPos=$.css(parent,'position');x+=parent.offsetLeft;y+=parent.offsetTop;if(mo||ie){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth');if(mo&&parPos=='absolute')absparent=true;if(ie&&parPos=='relative')relparent=true;}
op=parent.offsetParent;do{if(options.scroll){sl+=parent.scrollLeft;st+=parent.scrollTop;}
if(mo&&parent!=elem&&$.css(parent,'overflow')!='visible'){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth');}
parent=parent.parentNode;}while(parent!=op);parent=op;if(parent.tagName.toLowerCase()=='body'||parent.tagName.toLowerCase()=='html'){if((sf||(ie&&$.boxModel))&&elemPos!='absolute'&&elemPos!='fixed'){x+=num(parent,'marginLeft');y+=num(parent,'marginTop');}
if((mo&&!absparent&&elemPos!='fixed')||(ie&&elemPos=='static'&&!relparent)){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth');}
break;}}while(parent);}
var returnValue=handleOffsetReturn(elem,options,x,y,sl,st);if(returnObject){$.extend(returnObject,returnValue);return this;}
else{return returnValue;}},offsetLite:function(options,returnObject){var x=0,y=0,sl=0,st=0,parent=this[0],op,options=$.extend({margin:true,border:true,padding:false,scroll:true},options||{});do{x+=parent.offsetLeft;y+=parent.offsetTop;op=parent.offsetParent;if(options.scroll){do{sl+=parent.scrollLeft;st+=parent.scrollTop;parent=parent.parentNode;}while(parent!=op);}
parent=op;}while(parent&&parent.tagName.toLowerCase()!='body'&&parent.tagName.toLowerCase()!='html');var returnValue=handleOffsetReturn(this[0],options,x,y,sl,st);if(returnObject){$.extend(returnObject,returnValue);return this;}
else{return returnValue;}}});var num=function(el,prop){return parseInt($.css(el.jquery?el[0]:el,prop))||0;};var handleOffsetReturn=function(elem,options,x,y,sl,st){if(!options.margin){x-=num(elem,'marginLeft');y-=num(elem,'marginTop');}
if(options.border&&($.browser.safari||$.browser.opera)){x+=num(elem,'borderLeftWidth');y+=num(elem,'borderTopWidth');}else if(!options.border&&!($.browser.safari||$.browser.opera)){x-=num(elem,'borderLeftWidth');y-=num(elem,'borderTopWidth');}
if(options.padding){x+=num(elem,'paddingLeft');y+=num(elem,'paddingTop');}
if(options.scroll){sl-=elem.scrollLeft;st-=elem.scrollTop;}
return options.scroll?{top:y-st,left:x-sl,scrollTop:st,scrollLeft:sl}:{top:y,left:x};};})(jQuery);Date.dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];Date.abbrDayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];Date.monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];Date.abbrMonthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];Date.firstDayOfWeek=1;Date.format='dd/mm/yyyy';(function(){function add(name,method){if(!Date.prototype[name]){Date.prototype[name]=method;}};add("isLeapYear",function(){var y=this.getFullYear();return(y%4==0&&y%100!=0)||y%400==0;});add("isWeekend",function(){return this.getDay()==0||this.getDay()==6;});add("isWeekDay",function(){return!this.isWeekend();});add("getDaysInMonth",function(){return[31,(this.isLeapYear()?29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];});add("getDayName",function(abbreviated){return abbreviated?Date.abbrDayNames[this.getDay()]:Date.dayNames[this.getDay()];});add("getMonthName",function(abbreviated){return abbreviated?Date.abbrMonthNames[this.getMonth()]:Date.monthNames[this.getMonth()];});add("getDayOfYear",function(){var tmpdtm=new Date("1/1/"+this.getFullYear());return Math.floor((this.getTime()-tmpdtm.getTime())/86400000);});add("getWeekOfYear",function(){return Math.ceil(this.getDayOfYear()/7);});add("setDayOfYear",function(day){this.setMonth(0);this.setDate(day);return this;});add("addYears",function(num){this.setFullYear(this.getFullYear()+num);return this;});add("addMonths",function(num){var tmpdtm=this.getDate();this.setMonth(this.getMonth()+num);if(tmpdtm>this.getDate())
this.addDays(-this.getDate());return this;});add("addDays",function(num){this.setDate(this.getDate()+num);return this;});add("addHours",function(num){this.setHours(this.getHours()+num);return this;});add("addMinutes",function(num){this.setMinutes(this.getMinutes()+num);return this;});add("addSeconds",function(num){this.setSeconds(this.getSeconds()+num);return this;});add("zeroTime",function(){this.setMilliseconds(0);this.setSeconds(0);this.setMinutes(0);this.setHours(0);return this;});add("asString",function(){var r=Date.format;return r.split('yyyy').join(this.getFullYear()).split('yy').join(this.getYear()).split('mmm').join(this.getMonthName(true)).split('mm').join(_zeroPad(this.getMonth()+1)).split('dd').join(_zeroPad(this.getDate()));});Date.fromString=function(s)
{var f=Date.format;var d=new Date('01/01/1977');var iY=f.indexOf('yyyy');if(iY>-1){d.setFullYear(Number(s.substr(iY,4)));}else{d.setYear(Number(s.substr(f.indexOf('yy'),2)));}
var iM=f.indexOf('mmm');if(iM>-1){var mStr=s.substr(iM,3);for(var i=0;i<Date.abbrMonthNames.length;i++){if(Date.abbrMonthNames[i]==mStr)break;}
d.setMonth(i);}else{d.setMonth(Number(s.substr(f.indexOf('mm'),2))-1);}
d.setDate(Number(s.substr(f.indexOf('dd'),2)));if(isNaN(d.getTime()))return false;return d;}
var _zeroPad=function(num){var s='0'+num;return s.substring(s.length-2)};})();(function($){$.fn.extend({renderCalendar:function(s)
{var dc=function(a)
{return document.createElement(a);};s=$.extend({month:null,year:null,renderCallback:null,showHeader:$.dpConst.SHOW_HEADER_SHORT,dpController:null,hoverClass:'dp-hover'},s);if(s.showHeader!=$.dpConst.SHOW_HEADER_NONE){var headRow=$(dc('tr'));for(var i=Date.firstDayOfWeek;i<Date.firstDayOfWeek+7;i++){var weekday=i%7;var day=Date.dayNames[weekday];headRow.append(jQuery(dc('th')).attr({'scope':'col','abbr':day,'title':day,'class':(weekday==0||weekday==6?'weekend':'weekday')}).html(s.showHeader==$.dpConst.SHOW_HEADER_SHORT?day.substr(0,1):day));}};var calendarTable=$(dc('table')).attr({'cellspacing':2,'className':'jCalendar'}).append((s.showHeader!=$.dpConst.SHOW_HEADER_NONE?$(dc('thead')).append(headRow):dc('thead')));var tbody=$(dc('tbody'));var today=(new Date()).zeroTime();var month=s.month==undefined?today.getMonth():s.month;var year=s.year||today.getFullYear();var currentDate=new Date(year,month,1);var firstDayOffset=Date.firstDayOfWeek-currentDate.getDay()+1;if(firstDayOffset>1)firstDayOffset-=7;currentDate.addDays(firstDayOffset-1);var doHover=function()
{if(s.hoverClass){$(this).addClass(s.hoverClass);}};var unHover=function()
{if(s.hoverClass){$(this).removeClass(s.hoverClass);}};var w=0;while(w++<6){var r=jQuery(dc('tr'));for(var i=0;i<7;i++){var thisMonth=currentDate.getMonth()==month;var d=$(dc('td')).text(currentDate.getDate()+'').attr('className',(thisMonth?'current-month ':'other-month ')+
(currentDate.isWeekend()?'weekend ':'weekday ')+
(thisMonth&&currentDate.getTime()==today.getTime()?'today ':'')).hover(doHover,unHover);if(s.renderCallback){s.renderCallback(d,currentDate,month,year);}
r.append(d);currentDate.addDays(1);}
tbody.append(r);}
calendarTable.append(tbody);return this.each(function()
{$(this).empty().append(calendarTable);});},datePicker:function(s)
{if(!$.event._dpCache)$.event._dpCache=[];s=$.extend({month:undefined,year:undefined,startDate:undefined,endDate:undefined,renderCallback:[],createButton:true,showYearNavigation:true,closeOnSelect:true,displayClose:false,selectMultiple:false,clickInput:false,verticalPosition:$.dpConst.POS_TOP,horizontalPosition:$.dpConst.POS_LEFT,verticalOffset:0,horizontalOffset:0,hoverClass:'dp-hover'},s);return this.each(function()
{var $this=$(this);if(!this._dpId){this._dpId=$.event.guid++;$.event._dpCache[this._dpId]=new DatePicker(this);}
var controller=$.event._dpCache[this._dpId];controller.init(s);if(s.createButton){controller.button=$('<a href="#" class="dp-choose-date" title="'+$.dpText.TEXT_CHOOSE_DATE+'">'+$.dpText.TEXT_CHOOSE_DATE+'</a>').bind('click',function()
{$this.dpDisplay(this);this.blur();return false;});$this.after(controller.button);}
if($this.is(':text')){$this.bind('dateSelected',function(e,selectedDate,$td)
{this.value=selectedDate.asString();}).bind('change',function()
{var d=Date.fromString(this.value);if(d){controller.setSelected(d,true,true);}});if(s.clickInput){$this.bind('click',function()
{$this.dpDisplay();});}}
$this.addClass('dp-applied');})},dpSetDisabled:function(s)
{return _w.call(this,'setDisabled',s);},dpSetStartDate:function(d)
{return _w.call(this,'setStartDate',d);},dpSetEndDate:function(d)
{return _w.call(this,'setEndDate',d);},dpGetSelected:function()
{var c=_getController(this[0]);if(c){return c.getSelected();}
return null;},dpSetSelected:function(d,v,m)
{if(v==undefined)v=true;if(m==undefined)m=true;return _w.call(this,'setSelected',Date.fromString(d),v,m);},dpSetDisplayedMonth:function(m,y)
{return _w.call(this,'setDisplayedMonth',Number(m),Number(y));},dpDisplay:function(e)
{return _w.call(this,'display',e);},dpSetRenderCallback:function(a)
{return _w.call(this,'setRenderCallback',a);},dpSetPosition:function(v,h)
{return _w.call(this,'setPosition',v,h);},dpSetOffset:function(v,h)
{return _w.call(this,'setOffset',v,h);},_dpDestroy:function()
{}});var _w=function(f,a1,a2,a3)
{return this.each(function()
{var c=_getController(this);if(c){c[f](a1,a2,a3);}});};function DatePicker(ele)
{this.ele=ele;this.displayedMonth=null;this.displayedYear=null;this.startDate=null;this.endDate=null;this.showYearNavigation=null;this.closeOnSelect=null;this.displayClose=null;this.selectMultiple=null;this.verticalPosition=null;this.horizontalPosition=null;this.verticalOffset=null;this.horizontalOffset=null;this.button=null;this.renderCallback=[];this.selectedDates={};};$.extend(DatePicker.prototype,{init:function(s)
{this.setStartDate(s.startDate);this.setEndDate(s.endDate);this.setDisplayedMonth(Number(s.month),Number(s.year));this.setRenderCallback(s.renderCallback);this.showYearNavigation=s.showYearNavigation;this.closeOnSelect=s.closeOnSelect;this.displayClose=s.displayClose;this.selectMultiple=s.selectMultiple;this.verticalPosition=s.verticalPosition;this.horizontalPosition=s.horizontalPosition;this.hoverClass=s.hoverClass;this.setOffset(s.verticalOffset,s.horizontalOffset);},setStartDate:function(d)
{if(d){this.startDate=Date.fromString(d);}
if(!this.startDate){this.startDate=(new Date()).zeroTime();}
this.setDisplayedMonth(this.displayedMonth,this.displayedYear);},setEndDate:function(d)
{if(d){this.endDate=Date.fromString(d);}
if(!this.endDate){this.endDate=(new Date('12/31/2999'));}
if(this.endDate.getTime()<this.startDate.getTime()){this.endDate=this.startDate;}
this.setDisplayedMonth(this.displayedMonth,this.displayedYear);},setPosition:function(v,h)
{this.verticalPosition=v;this.horizontalPosition=h;},setOffset:function(v,h)
{this.verticalOffset=parseInt(v)||0;this.horizontalOffset=parseInt(h)||0;},setDisabled:function(s)
{$e=$(this.ele);$e[s?'addClass':'removeClass']('dp-disabled');if(this.button){$but=$(this.button);$but[s?'addClass':'removeClass']('dp-disabled');$but.attr('title',s?'':$.dpText.TEXT_CHOOSE_DATE);}
if($e.is(':text')){$e.attr('disabled',s?'disabled':'');}},setDisplayedMonth:function(m,y)
{if(this.startDate==undefined||this.endDate==undefined){return;}
var s=new Date(this.startDate.getTime());s.setDate(1);var e=new Date(this.endDate.getTime());e.setDate(1);var t;if(isNaN(m)&&isNaN(y)){t=new Date().zeroTime();t.setDate(1);}else if(isNaN(m)){t=new Date(y,this.displayedMonth,1);}else if(isNaN(y)){t=new Date(this.displayedYear,m,1);}else{t=new Date(y,m,1)}
if(t.getTime()<s.getTime()){t=s;}else if(t.getTime()>e.getTime()){t=e;}
this.displayedMonth=t.getMonth();this.displayedYear=t.getFullYear();},setSelected:function(d,v,moveToMonth)
{if(this.selectMultiple==false){this.selectedDates={};}
if(moveToMonth){this.setDisplayedMonth(d.getMonth(),d.getFullYear());}
this.selectedDates[d.getTime()]=v;},isSelected:function(t)
{return this.selectedDates[t];},getSelected:function()
{var r=[];for(t in this.selectedDates){if(this.selectedDates[t]==true){r.push(new Date(Number(t)));}}
return r;},display:function(eleAlignTo)
{if($(this.ele).is('.dp-disabled'))return;eleAlignTo=eleAlignTo||this.ele;var c=this;var $ele=$(eleAlignTo);var eleOffset=$ele.offset();var _checkMouse=function(e)
{var el=e.target;var cal=$('#dp-popup')[0];while(true){if(el==cal){return true;}else if(el==document){c._closeCalendar();return false;}else{el=$(el).parent()[0];}}};this._checkMouse=_checkMouse;this._closeCalendar(true);$('body').append($('<div></div>').attr('id','dp-popup').css({'top':eleOffset.top+c.verticalOffset,'left':eleOffset.left+c.horizontalOffset}).append($('<h2></h2>'),$('<div id="dp-nav-prev"></div>').append($('<a id="dp-nav-prev-year" href="#" title="'+$.dpText.TEXT_PREV_YEAR+'">&lt;&lt;</a>').bind('click',function()
{return c._displayNewMonth.call(c,this,0,-1);}),$('<a id="dp-nav-prev-month" href="#" title="'+$.dpText.TEXT_PREV_MONTH+'">&lt;</a>').bind('click',function()
{return c._displayNewMonth.call(c,this,-1,0);})),$('<div id="dp-nav-next"></div>').append($('<a id="dp-nav-next-year" href="#" title="'+$.dpText.TEXT_NEXT_YEAR+'">&gt;&gt;</a>').bind('click',function()
{return c._displayNewMonth.call(c,this,0,1);}),$('<a id="dp-nav-next-month" href="#" title="'+$.dpText.TEXT_NEXT_MONTH+'">&gt;</a>').bind('click',function()
{return c._displayNewMonth.call(c,this,1,0);})),$('<div></div>').attr('id','dp-calendar')).bgIframe());var $pop=$('#dp-popup');if(this.showYearNavigation==false){$('#dp-nav-prev-year, #dp-nav-next-year').css('display','none');}
if(this.displayClose){$pop.append($('<a href="#" id="dp-close">'+$.dpText.TEXT_CLOSE+'</a>').bind('click',function()
{c._closeCalendar();return false;}));}
c._renderCalendar();if(this.verticalPosition==$.dpConst.POS_BOTTOM){$pop.css('top',eleOffset.top+$ele.height()-$pop.height()+c.verticalOffset);}
if(this.horizontalPosition==$.dpConst.POS_RIGHT){$pop.css('left',eleOffset.left+$ele.width()-$pop.width()+c.horizontalOffset);}
$(this.ele).trigger('dpDisplayed',$pop);$(document).bind('mousedown',this._checkMouse);},setRenderCallback:function(a)
{if(a&&typeof(a)=='function'){a=[a];}
this.renderCallback=this.renderCallback.concat(a);},cellRender:function($td,thisDate,month,year){var c=this.dpController;var d=new Date(thisDate.getTime());$td.bind('click',function()
{var $this=$(this);if(!$this.is('.disabled')){c.setSelected(d,!$this.is('.selected')||!c.selectMultiple);var s=c.isSelected(d.getTime());$(c.ele).trigger('dateSelected',[d,$td,s]);if(c.closeOnSelect){c._closeCalendar();}else{$this[s?'addClass':'removeClass']('selected');}}});if(c.isSelected(d.getTime())){$td.addClass('selected');}
for(var i=0;i<c.renderCallback.length;i++){c.renderCallback[i].apply(this,arguments);}},_displayNewMonth:function(ele,m,y)
{if(!$(ele).is('.disabled')){this.setDisplayedMonth(this.displayedMonth+m,this.displayedYear+y);this._clearCalendar();this._renderCalendar();$(this.ele).trigger('dpMonthChanged',[this.displayedMonth,this.displayedYear]);}
ele.blur();return false;},_renderCalendar:function()
{$('#dp-popup h2').html(Date.monthNames[this.displayedMonth]+' '+this.displayedYear);$('#dp-calendar').renderCalendar({month:this.displayedMonth,year:this.displayedYear,renderCallback:this.cellRender,dpController:this,hoverClass:this.hoverClass});if(this.displayedYear==this.startDate.getFullYear()&&this.displayedMonth==this.startDate.getMonth()){$('#dp-nav-prev-year').addClass('disabled');$('#dp-nav-prev-month').addClass('disabled');$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())>20){$this.addClass('disabled');}});var d=this.startDate.getDate();$('#dp-calendar td.current-month').each(function()
{var $this=$(this);if(Number($this.text())<d){$this.addClass('disabled');}});}else{$('#dp-nav-prev-year').removeClass('disabled');$('#dp-nav-prev-month').removeClass('disabled');var d=this.startDate.getDate();if(d>20){var sd=new Date(this.startDate.getTime());sd.addMonths(1);if(this.displayedYear==sd.getFullYear()&&this.displayedMonth==sd.getMonth()){$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())<d){$this.addClass('disabled');}});}}}
if(this.displayedYear==this.endDate.getFullYear()&&this.displayedMonth==this.endDate.getMonth()){$('#dp-nav-next-year').addClass('disabled');$('#dp-nav-next-month').addClass('disabled');$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())<14){$this.addClass('disabled');}});var d=this.endDate.getDate();$('#dp-calendar td.current-month').each(function()
{var $this=$(this);if(Number($this.text())>d){$this.addClass('disabled');}});}else{$('#dp-nav-next-year').removeClass('disabled');$('#dp-nav-next-month').removeClass('disabled');var d=this.endDate.getDate();if(d<13){var ed=new Date(this.endDate.getTime());ed.addMonths(-1);if(this.displayedYear==ed.getFullYear()&&this.displayedMonth==ed.getMonth()){$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())>d){$this.addClass('disabled');}});}}}},_closeCalendar:function(programatic)
{$(document).unbind('mousedown',this._checkMouse);this._clearCalendar();$('#dp-popup a').unbind();$('#dp-popup').empty().remove();if(!programatic){$(this.ele).trigger('dpClosed',[this.getSelected()]);}},_clearCalendar:function()
{$('#dp-calendar td').unbind();$('#dp-calendar').empty();}});$.dpConst={SHOW_HEADER_NONE:0,SHOW_HEADER_SHORT:1,SHOW_HEADER_LONG:2,POS_TOP:0,POS_BOTTOM:1,POS_LEFT:0,POS_RIGHT:1};$.dpText={TEXT_PREV_YEAR:'Previous year',TEXT_PREV_MONTH:'Previous month',TEXT_NEXT_YEAR:'Next year',TEXT_NEXT_MONTH:'Next month',TEXT_CLOSE:'Close',TEXT_CHOOSE_DATE:'Choose date'};$.dpVersion='$Id: jquery.datePicker.js 2036 2007-06-05 22:55:15Z kelvin.luck $';function _getController(ele)
{if(ele._dpId)return $.event._dpCache[ele._dpId];return false;};if($.fn.bgIframe==undefined){$.fn.bgIframe=function(){return this;};};$(window).bind('unload',function(){var els=$.event._dpCache||[];for(var i in els){$(els[i].ele)._dpDestroy();}});})(jQuery);(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&parseInt($.browser.version)<=6){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+
(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)
this.insertBefore(document.createElement(html),this.firstChild);});}
return this;};if(!$.browser.version)
$.browser.version=navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1];})(jQuery);jQuery.fn.extend({selectbox:function(options,callback){return this.each(function(){new jQuery.SelectBox(this,options,callback);});}});jQuery.SelectBox=function(selectobj,options,callback){var opt=options||{};opt.inputClass=opt.inputClass||"selectbox";opt.containerClass=opt.containerClass||"selectbox-wrapper";opt.hoverClass=opt.hoverClass||"selected";opt.debug=opt.debug||false;var elm_id=selectobj.id;var active=-1;var inFocus=false;var hasfocus=0;var $select=$(selectobj);var $container=setupContainer(opt);var $input=setupInput(opt);var $callback=callback;$select.hide().before($input).before($container);init();$input.mousedown(function(){$container.toggle();}).focus(function(){if($container.not(':visible')){inFocus=true;$container.show();}}).keydown(function(event){switch(event.keyCode){case 38:event.preventDefault();moveSelect(-1);break;case 40:event.preventDefault();moveSelect(1);break;case 13:event.preventDefault();setCurrent();hideMe();break;}}).blur(function(){if($container.is(':visible')&&hasfocus>0){if(opt.debug)console.log('container visible and has focus')}else{hideMe();}});function hideMe(){hasfocus=0;$container.hide();}
function init(){$container.append(getSelectOptions()).hide();var width=$input.width()
$container.width(width+10);}
function setupContainer(options){var container=document.createElement("div");$container=$(container);$container.attr('id',elm_id+'_container');$container.addClass(options.containerClass);return $container;}
function setupInput(options){var input=document.createElement("input");var $input=$(input);$input.attr("id",elm_id+"_input");$input.attr("type","text");$input.addClass(options.inputClass);$input.attr("autocomplete","off");$input.attr("readonly","readonly");$input.attr("tabIndex",$select.attr("tabindex"));return $input;}
function moveSelect(step){var lis=$("li",$container);if(!lis)return;active+=step;if(active<0){active=0;}else if(active>=lis.size()){active=lis.size()-1;}
lis.removeClass(opt.hoverClass);$(lis[active]).addClass(opt.hoverClass);}
function setCurrent(){var li=$("li."+opt.hoverClass,$container).get(0);var el=li.id
$select.val(el);$callback();$input.val($(li).html());return true;}
function getCurrentSelected(){return $select.val();}
function getCurrentValue(){return $input.val();}
function getSelectOptions(){var select_options=new Array();var ul=document.createElement('ul');$select.children('option').each(function(){var li=document.createElement('li');li.setAttribute('id',$(this).val());li.innerHTML=$(this).html();if($(this).is(':selected')){$input.val($(this).html());$(li).addClass(opt.hoverClass);}
ul.appendChild(li);$(li).css("background-color",$(this).attr("bg"));$(li).addClass("opacity90");$(li).removeClass("opacity100");$(li).mouseover(function(event){hasfocus=1;if(opt.debug)console.log('out on : '+this.id);jQuery(event.target,$container).addClass(opt.hoverClass);jQuery(event.target,$container).addClass("opacity100");jQuery(event.target,$container).removeClass("opacity90");}).mouseout(function(event){hasfocus=-1;if(opt.debug)console.log('out on : '+this.id);jQuery(event.target,$container).removeClass(opt.hoverClass);jQuery(event.target,$container).addClass("opacity90");jQuery(event.target,$container).removeClass("opacity100");}).click(function(event){if(opt.debug)console.log('click on :'+this.id);$(this).addClass(opt.hoverClass);setCurrent();hideMe();});});return ul;}};jQuery.iUtil={getPosition:function(e)
{var x=0;var y=0;var es=e.style;var restoreStyles=false;if(jQuery(e).css('display')=='none'){var oldVisibility=es.visibility;var oldPosition=es.position;restoreStyles=true;es.visibility='hidden';es.display='block';es.position='absolute';}
var el=e;while(el){x+=el.offsetLeft+(el.currentStyle&&!jQuery.browser.opera?parseInt(el.currentStyle.borderLeftWidth)||0:0);y+=el.offsetTop+(el.currentStyle&&!jQuery.browser.opera?parseInt(el.currentStyle.borderTopWidth)||0:0);el=el.offsetParent;}
el=e;while(el&&el.tagName&&el.tagName.toLowerCase()!='body')
{x-=el.scrollLeft||0;y-=el.scrollTop||0;el=el.parentNode;}
if(restoreStyles==true){es.display='none';es.position=oldPosition;es.visibility=oldVisibility;}
return{x:x,y:y};},getPositionLite:function(el)
{var x=0,y=0;while(el){x+=el.offsetLeft||0;y+=el.offsetTop||0;el=el.offsetParent;}
return{x:x,y:y};},getSize:function(e)
{var w=jQuery.css(e,'width');var h=jQuery.css(e,'height');var wb=0;var hb=0;var es=e.style;if(jQuery(e).css('display')!='none'){wb=e.offsetWidth;hb=e.offsetHeight;}else{var oldVisibility=es.visibility;var oldPosition=es.position;es.visibility='hidden';es.display='block';es.position='absolute';wb=e.offsetWidth;hb=e.offsetHeight;es.display='none';es.position=oldPosition;es.visibility=oldVisibility;}
return{w:w,h:h,wb:wb,hb:hb};},getSizeLite:function(el)
{return{wb:el.offsetWidth||0,hb:el.offsetHeight||0};},getClient:function(e)
{var h,w,de;if(e){w=e.clientWidth;h=e.clientHeight;}else{de=document.documentElement;w=window.innerWidth||self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;h=window.innerHeight||self.innerHeight||(de&&de.clientHeight)||document.body.clientHeight;}
return{w:w,h:h};},getScroll:function(e)
{var t=0,l=0,w=0,h=0,iw=0,ih=0;if(e&&e.nodeName.toLowerCase()!='body'){t=e.scrollTop;l=e.scrollLeft;w=e.scrollWidth;h=e.scrollHeight;iw=0;ih=0;}else{if(document.documentElement){t=document.documentElement.scrollTop;l=document.documentElement.scrollLeft;w=document.documentElement.scrollWidth;h=document.documentElement.scrollHeight;}else if(document.body){t=document.body.scrollTop;l=document.body.scrollLeft;w=document.body.scrollWidth;h=document.body.scrollHeight;}
iw=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;ih=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;}
return{t:t,l:l,w:w,h:h,iw:iw,ih:ih};},getMargins:function(e,toInteger)
{var el=jQuery(e);var t=el.css('marginTop')||'';var r=el.css('marginRight')||'';var b=el.css('marginBottom')||'';var l=el.css('marginLeft')||'';if(toInteger)
return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)};else
return{t:t,r:r,b:b,l:l};},getPadding:function(e,toInteger)
{var el=jQuery(e);var t=el.css('paddingTop')||'';var r=el.css('paddingRight')||'';var b=el.css('paddingBottom')||'';var l=el.css('paddingLeft')||'';if(toInteger)
return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)};else
return{t:t,r:r,b:b,l:l};},getBorder:function(e,toInteger)
{var el=jQuery(e);var t=el.css('borderTopWidth')||'';var r=el.css('borderRightWidth')||'';var b=el.css('borderBottomWidth')||'';var l=el.css('borderLeftWidth')||'';if(toInteger)
return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)||0};else
return{t:t,r:r,b:b,l:l};},getPointer:function(event)
{var x=event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))||0;var y=event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop))||0;return{x:x,y:y};},traverseDOM:function(nodeEl,func)
{func(nodeEl);nodeEl=nodeEl.firstChild;while(nodeEl){jQuery.iUtil.traverseDOM(nodeEl,func);nodeEl=nodeEl.nextSibling;}},purgeEvents:function(nodeEl)
{jQuery.iUtil.traverseDOM(nodeEl,function(el)
{for(var attr in el){if(typeof el[attr]==='function'){el[attr]=null;}}});},centerEl:function(el,axis)
{var clientScroll=jQuery.iUtil.getScroll();var windowSize=jQuery.iUtil.getSize(el);if(!axis||axis=='vertically')
jQuery(el).css({top:clientScroll.t+((Math.max(clientScroll.h,clientScroll.ih)-clientScroll.t-windowSize.hb)/2)+'px'});if(!axis||axis=='horizontally')
jQuery(el).css({left:clientScroll.l+((Math.max(clientScroll.w,clientScroll.iw)-clientScroll.l-windowSize.wb)/2)+'px'});},fixPNG:function(el,emptyGIF){var images=jQuery('img[@src*="png"]',el||document),png;images.each(function(){png=this.src;this.src=emptyGIF;this.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+png+"')";});}};[].indexOf||(Array.prototype.indexOf=function(v,n){n=(n==null)?0:n;var m=this.length;for(var i=n;i<m;i++)
if(this[i]==v)
return i;return-1;});jQuery.iDrag={helper:null,dragged:null,destroy:function()
{return this.each(function()
{if(this.isDraggable){this.dragCfg.dhe.unbind('mousedown',jQuery.iDrag.draginit);this.dragCfg=null;this.isDraggable=false;if(jQuery.browser.msie){this.unselectable="off";}else{this.style.MozUserSelect='';this.style.KhtmlUserSelect='';this.style.userSelect='';}}});},draginit:function(e)
{if(jQuery.iDrag.dragged!=null){jQuery.iDrag.dragstop(e);return false;}
var elm=this.dragElem;jQuery(document).bind('mousemove',jQuery.iDrag.dragmove).bind('mouseup',jQuery.iDrag.dragstop);elm.dragCfg.pointer=jQuery.iUtil.getPointer(e);elm.dragCfg.currentPointer=elm.dragCfg.pointer;elm.dragCfg.init=false;elm.dragCfg.fromHandler=this!=this.dragElem;jQuery.iDrag.dragged=elm;if(elm.dragCfg.si&&this!=this.dragElem){parentPos=jQuery.iUtil.getPosition(elm.parentNode);sliderSize=jQuery.iUtil.getSize(elm);sliderPos={x:parseInt(jQuery.css(elm,'left'))||0,y:parseInt(jQuery.css(elm,'top'))||0};dx=elm.dragCfg.currentPointer.x-parentPos.x-sliderSize.wb/2-sliderPos.x;dy=elm.dragCfg.currentPointer.y-parentPos.y-sliderSize.hb/2-sliderPos.y;jQuery.iSlider.dragmoveBy(elm,[dx,dy]);}
return jQuery.selectKeyHelper||false;},dragstart:function(e)
{var elm=jQuery.iDrag.dragged;elm.dragCfg.init=true;var dEs=elm.style;elm.dragCfg.oD=jQuery.css(elm,'display');elm.dragCfg.oP=jQuery.css(elm,'position');if(!elm.dragCfg.initialPosition)
elm.dragCfg.initialPosition=elm.dragCfg.oP;elm.dragCfg.oR={x:parseInt(jQuery.css(elm,'left'))||0,y:parseInt(jQuery.css(elm,'top'))||0};elm.dragCfg.diffX=0;elm.dragCfg.diffY=0;if(jQuery.browser.msie){var oldBorder=jQuery.iUtil.getBorder(elm,true);elm.dragCfg.diffX=oldBorder.l||0;elm.dragCfg.diffY=oldBorder.t||0;}
elm.dragCfg.oC=jQuery.extend(jQuery.iUtil.getPosition(elm),jQuery.iUtil.getSize(elm));if(elm.dragCfg.oP!='relative'&&elm.dragCfg.oP!='absolute'){dEs.position='relative';}
jQuery.iDrag.helper.empty();var clonedEl=elm.cloneNode(true);jQuery(clonedEl).css({display:'block',left:'0px',top:'0px'});clonedEl.style.marginTop='0';clonedEl.style.marginRight='0';clonedEl.style.marginBottom='0';clonedEl.style.marginLeft='0';jQuery.iDrag.helper.append(clonedEl);var dhs=jQuery.iDrag.helper.get(0).style;if(elm.dragCfg.autoSize){dhs.width='auto';dhs.height='auto';}else{dhs.height=elm.dragCfg.oC.hb+'px';dhs.width=elm.dragCfg.oC.wb+'px';}
dhs.display='block';dhs.marginTop='0px';dhs.marginRight='0px';dhs.marginBottom='0px';dhs.marginLeft='0px';jQuery.extend(elm.dragCfg.oC,jQuery.iUtil.getSize(clonedEl));if(elm.dragCfg.cursorAt){if(elm.dragCfg.cursorAt.left){elm.dragCfg.oR.x+=elm.dragCfg.pointer.x-elm.dragCfg.oC.x-elm.dragCfg.cursorAt.left;elm.dragCfg.oC.x=elm.dragCfg.pointer.x-elm.dragCfg.cursorAt.left;}
if(elm.dragCfg.cursorAt.top){elm.dragCfg.oR.y+=elm.dragCfg.pointer.y-elm.dragCfg.oC.y-elm.dragCfg.cursorAt.top;elm.dragCfg.oC.y=elm.dragCfg.pointer.y-elm.dragCfg.cursorAt.top;}
if(elm.dragCfg.cursorAt.right){elm.dragCfg.oR.x+=elm.dragCfg.pointer.x-elm.dragCfg.oC.x-elm.dragCfg.oC.hb+elm.dragCfg.cursorAt.right;elm.dragCfg.oC.x=elm.dragCfg.pointer.x-elm.dragCfg.oC.wb+elm.dragCfg.cursorAt.right;}
if(elm.dragCfg.cursorAt.bottom){elm.dragCfg.oR.y+=elm.dragCfg.pointer.y-elm.dragCfg.oC.y-elm.dragCfg.oC.hb+elm.dragCfg.cursorAt.bottom;elm.dragCfg.oC.y=elm.dragCfg.pointer.y-elm.dragCfg.oC.hb+elm.dragCfg.cursorAt.bottom;}}
elm.dragCfg.nx=elm.dragCfg.oR.x;elm.dragCfg.ny=elm.dragCfg.oR.y;if(elm.dragCfg.insideParent||elm.dragCfg.containment=='parent'){parentBorders=jQuery.iUtil.getBorder(elm.parentNode,true);elm.dragCfg.oC.x=elm.offsetLeft+(jQuery.browser.msie?0:jQuery.browser.opera?-parentBorders.l:parentBorders.l);elm.dragCfg.oC.y=elm.offsetTop+(jQuery.browser.msie?0:jQuery.browser.opera?-parentBorders.t:parentBorders.t);jQuery(elm.parentNode).append(jQuery.iDrag.helper.get(0));}
if(elm.dragCfg.containment){jQuery.iDrag.getContainment(elm);elm.dragCfg.onDragModifier.containment=jQuery.iDrag.fitToContainer;}
if(elm.dragCfg.si){jQuery.iSlider.modifyContainer(elm);}
dhs.left=elm.dragCfg.oC.x-elm.dragCfg.diffX+'px';dhs.top=elm.dragCfg.oC.y-elm.dragCfg.diffY+'px';dhs.width=elm.dragCfg.oC.wb+'px';dhs.height=elm.dragCfg.oC.hb+'px';jQuery.iDrag.dragged.dragCfg.prot=false;if(elm.dragCfg.gx){elm.dragCfg.onDragModifier.grid=jQuery.iDrag.snapToGrid;}
if(elm.dragCfg.zIndex!=false){jQuery.iDrag.helper.css('zIndex',elm.dragCfg.zIndex);}
if(elm.dragCfg.opacity){jQuery.iDrag.helper.css('opacity',elm.dragCfg.opacity);if(window.ActiveXObject){jQuery.iDrag.helper.css('filter','alpha(opacity='+elm.dragCfg.opacity*100+')');}}
if(elm.dragCfg.frameClass){jQuery.iDrag.helper.addClass(elm.dragCfg.frameClass);jQuery.iDrag.helper.get(0).firstChild.style.display='none';}
if(elm.dragCfg.onStart)
elm.dragCfg.onStart.apply(elm,[clonedEl,elm.dragCfg.oR.x,elm.dragCfg.oR.y]);if(jQuery.iDrop&&jQuery.iDrop.count>0){jQuery.iDrop.highlight(elm);}
if(elm.dragCfg.ghosting==false){dEs.display='none';}
return false;},getContainment:function(elm)
{if(elm.dragCfg.containment.constructor==String){if(elm.dragCfg.containment=='parent'){elm.dragCfg.cont=jQuery.extend({x:0,y:0},jQuery.iUtil.getSize(elm.parentNode));var contBorders=jQuery.iUtil.getBorder(elm.parentNode,true);elm.dragCfg.cont.w=elm.dragCfg.cont.wb-contBorders.l-contBorders.r;elm.dragCfg.cont.h=elm.dragCfg.cont.hb-contBorders.t-contBorders.b;}else if(elm.dragCfg.containment=='document'){var clnt=jQuery.iUtil.getClient();elm.dragCfg.cont={x:0,y:0,w:clnt.w,h:clnt.h};}}else if(elm.dragCfg.containment.constructor==Array){elm.dragCfg.cont={x:parseInt(elm.dragCfg.containment[0])||0,y:parseInt(elm.dragCfg.containment[1])||0,w:parseInt(elm.dragCfg.containment[2])||0,h:parseInt(elm.dragCfg.containment[3])||0};}
elm.dragCfg.cont.dx=elm.dragCfg.cont.x-elm.dragCfg.oC.x;elm.dragCfg.cont.dy=elm.dragCfg.cont.y-elm.dragCfg.oC.y;},hidehelper:function(dragged)
{if(dragged.dragCfg.insideParent||dragged.dragCfg.containment=='parent'){jQuery('body',document).append(jQuery.iDrag.helper.get(0));}
jQuery.iDrag.helper.empty().hide().css('opacity',1);if(window.ActiveXObject){jQuery.iDrag.helper.css('filter','alpha(opacity=100)');}},dragstop:function(e)
{jQuery(document).unbind('mousemove',jQuery.iDrag.dragmove).unbind('mouseup',jQuery.iDrag.dragstop);if(jQuery.iDrag.dragged==null){return;}
var dragged=jQuery.iDrag.dragged;jQuery.iDrag.dragged=null;if(dragged.dragCfg.init==false){return false;}
if(dragged.dragCfg.so==true){jQuery(dragged).css('position',dragged.dragCfg.oP);}
var dEs=dragged.style;if(dragged.si){jQuery.iDrag.helper.css('cursor','move');}
if(dragged.dragCfg.frameClass){jQuery.iDrag.helper.removeClass(dragged.dragCfg.frameClass);}
if(dragged.dragCfg.revert==false){if(dragged.dragCfg.fx>0){if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='horizontally'){var x=new jQuery.fx(dragged,{duration:dragged.dragCfg.fx},'left');x.custom(dragged.dragCfg.oR.x,dragged.dragCfg.nRx);}
if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='vertically'){var y=new jQuery.fx(dragged,{duration:dragged.dragCfg.fx},'top');y.custom(dragged.dragCfg.oR.y,dragged.dragCfg.nRy);}}else{if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='horizontally')
dragged.style.left=dragged.dragCfg.nRx+'px';if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='vertically')
dragged.style.top=dragged.dragCfg.nRy+'px';}
jQuery.iDrag.hidehelper(dragged);if(dragged.dragCfg.ghosting==false){jQuery(dragged).css('display',dragged.dragCfg.oD);}}else if(dragged.dragCfg.fx>0){dragged.dragCfg.prot=true;var dh=false;if(jQuery.iDrop&&jQuery.iSort&&dragged.dragCfg.so){dh=jQuery.iUtil.getPosition(jQuery.iSort.helper.get(0));}
jQuery.iDrag.helper.animate({left:dh?dh.x:dragged.dragCfg.oC.x,top:dh?dh.y:dragged.dragCfg.oC.y},dragged.dragCfg.fx,function()
{dragged.dragCfg.prot=false;if(dragged.dragCfg.ghosting==false){dragged.style.display=dragged.dragCfg.oD;}
jQuery.iDrag.hidehelper(dragged);});}else{jQuery.iDrag.hidehelper(dragged);if(dragged.dragCfg.ghosting==false){jQuery(dragged).css('display',dragged.dragCfg.oD);}}
if(jQuery.iDrop&&jQuery.iDrop.count>0){jQuery.iDrop.checkdrop(dragged);}
if(jQuery.iSort&&dragged.dragCfg.so){jQuery.iSort.check(dragged);}
if(dragged.dragCfg.onChange&&(dragged.dragCfg.nRx!=dragged.dragCfg.oR.x||dragged.dragCfg.nRy!=dragged.dragCfg.oR.y)){dragged.dragCfg.onChange.apply(dragged,dragged.dragCfg.lastSi||[0,0,dragged.dragCfg.nRx,dragged.dragCfg.nRy]);}
if(dragged.dragCfg.onStop)
dragged.dragCfg.onStop.apply(dragged);return false;},snapToGrid:function(x,y,dx,dy)
{if(dx!=0)
dx=parseInt((dx+(this.dragCfg.gx*dx/Math.abs(dx))/2)/this.dragCfg.gx)*this.dragCfg.gx;if(dy!=0)
dy=parseInt((dy+(this.dragCfg.gy*dy/Math.abs(dy))/2)/this.dragCfg.gy)*this.dragCfg.gy;return{dx:dx,dy:dy,x:0,y:0};},fitToContainer:function(x,y,dx,dy)
{dx=Math.min(Math.max(dx,this.dragCfg.cont.dx),this.dragCfg.cont.w+this.dragCfg.cont.dx-this.dragCfg.oC.wb);dy=Math.min(Math.max(dy,this.dragCfg.cont.dy),this.dragCfg.cont.h+this.dragCfg.cont.dy-this.dragCfg.oC.hb);return{dx:dx,dy:dy,x:0,y:0}},dragmove:function(e)
{if(jQuery.iDrag.dragged==null||jQuery.iDrag.dragged.dragCfg.prot==true){return;}
var dragged=jQuery.iDrag.dragged;dragged.dragCfg.currentPointer=jQuery.iUtil.getPointer(e);if(dragged.dragCfg.init==false){distance=Math.sqrt(Math.pow(dragged.dragCfg.pointer.x-dragged.dragCfg.currentPointer.x,2)+Math.pow(dragged.dragCfg.pointer.y-dragged.dragCfg.currentPointer.y,2));if(distance<dragged.dragCfg.snapDistance){return;}else{jQuery.iDrag.dragstart(e);}}
var dx=dragged.dragCfg.currentPointer.x-dragged.dragCfg.pointer.x;var dy=dragged.dragCfg.currentPointer.y-dragged.dragCfg.pointer.y;for(var i in dragged.dragCfg.onDragModifier){var newCoords=dragged.dragCfg.onDragModifier[i].apply(dragged,[dragged.dragCfg.oR.x+dx,dragged.dragCfg.oR.y+dy,dx,dy]);if(newCoords&&newCoords.constructor==Object){dx=i!='user'?newCoords.dx:(newCoords.x-dragged.dragCfg.oR.x);dy=i!='user'?newCoords.dy:(newCoords.y-dragged.dragCfg.oR.y);}}
dragged.dragCfg.nx=dragged.dragCfg.oC.x+dx-dragged.dragCfg.diffX;dragged.dragCfg.ny=dragged.dragCfg.oC.y+dy-dragged.dragCfg.diffY;if(dragged.dragCfg.si&&(dragged.dragCfg.onSlide||dragged.dragCfg.onChange)){jQuery.iSlider.onSlide(dragged,dragged.dragCfg.nx,dragged.dragCfg.ny);}
if(dragged.dragCfg.onDrag)
dragged.dragCfg.onDrag.apply(dragged,[dragged.dragCfg.oR.x+dx,dragged.dragCfg.oR.y+dy]);if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='horizontally'){dragged.dragCfg.nRx=dragged.dragCfg.oR.x+dx;jQuery.iDrag.helper.get(0).style.left=dragged.dragCfg.nx+'px';}
if(!dragged.dragCfg.axis||dragged.dragCfg.axis=='vertically'){dragged.dragCfg.nRy=dragged.dragCfg.oR.y+dy;jQuery.iDrag.helper.get(0).style.top=dragged.dragCfg.ny+'px';}
if(jQuery.iDrop&&jQuery.iDrop.count>0){jQuery.iDrop.checkhover(dragged);}
return false;},build:function(o)
{if(!jQuery.iDrag.helper){jQuery('body',document).append('<div id="dragHelper"></div>');jQuery.iDrag.helper=jQuery('#dragHelper');var el=jQuery.iDrag.helper.get(0);var els=el.style;els.position='absolute';els.display='none';els.cursor='move';els.listStyle='none';els.overflow='hidden';if(window.ActiveXObject){el.unselectable="on";}else{els.mozUserSelect='none';els.userSelect='none';els.KhtmlUserSelect='none';}}
if(!o){o={};}
return this.each(function()
{if(this.isDraggable||!jQuery.iUtil)
return;if(window.ActiveXObject){this.onselectstart=function(){return false;};this.ondragstart=function(){return false;};}
var el=this;var dhe=o.handle?jQuery(this).find(o.handle):jQuery(this);if(jQuery.browser.msie){dhe.each(function()
{this.unselectable="on";});}else{dhe.css('-moz-user-select','none');dhe.css('user-select','none');dhe.css('-khtml-user-select','none');}
this.dragCfg={dhe:dhe,revert:o.revert?true:false,ghosting:o.ghosting?true:false,so:o.so?o.so:false,si:o.si?o.si:false,insideParent:o.insideParent?o.insideParent:false,zIndex:o.zIndex?parseInt(o.zIndex)||0:false,opacity:o.opacity?parseFloat(o.opacity):false,fx:parseInt(o.fx)||null,hpc:o.hpc?o.hpc:false,onDragModifier:{},pointer:{},onStart:o.onStart&&o.onStart.constructor==Function?o.onStart:false,onStop:o.onStop&&o.onStop.constructor==Function?o.onStop:false,onChange:o.onChange&&o.onChange.constructor==Function?o.onChange:false,axis:/vertically|horizontally/.test(o.axis)?o.axis:false,snapDistance:o.snapDistance?parseInt(o.snapDistance)||0:0,cursorAt:o.cursorAt?o.cursorAt:false,autoSize:o.autoSize?true:false,frameClass:o.frameClass||false};if(o.onDragModifier&&o.onDragModifier.constructor==Function)
this.dragCfg.onDragModifier.user=o.onDragModifier;if(o.onDrag&&o.onDrag.constructor==Function)
this.dragCfg.onDrag=o.onDrag;if(o.containment&&((o.containment.constructor==String&&(o.containment=='parent'||o.containment=='document'))||(o.containment.constructor==Array&&o.containment.length==4))){this.dragCfg.containment=o.containment;}
if(o.fractions){this.dragCfg.fractions=o.fractions;}
if(o.grid){if(typeof o.grid=='number'){this.dragCfg.gx=parseInt(o.grid)||1;this.dragCfg.gy=parseInt(o.grid)||1;}else if(o.grid.length==2){this.dragCfg.gx=parseInt(o.grid[0])||1;this.dragCfg.gy=parseInt(o.grid[1])||1;}}
if(o.onSlide&&o.onSlide.constructor==Function){this.dragCfg.onSlide=o.onSlide;}
this.isDraggable=true;dhe.each(function(){this.dragElem=el;});dhe.bind('mousedown',jQuery.iDrag.draginit);})}};jQuery.fn.extend({DraggableDestroy:jQuery.iDrag.destroy,Draggable:jQuery.iDrag.build});jQuery.preloadImages=function()
{for(var i=0;i<arguments.length;i++)
{jQuery("<img>").attr("src",arguments[i]);}}
jQuery.iDrop={fit:function(zonex,zoney,zonew,zoneh)
{return zonex<=jQuery.iDrag.dragged.dragCfg.nx&&(zonex+zonew)>=(jQuery.iDrag.dragged.dragCfg.nx+jQuery.iDrag.dragged.dragCfg.oC.w)&&zoney<=jQuery.iDrag.dragged.dragCfg.ny&&(zoney+zoneh)>=(jQuery.iDrag.dragged.dragCfg.ny+jQuery.iDrag.dragged.dragCfg.oC.h)?true:false;},intersect:function(zonex,zoney,zonew,zoneh)
{return!(zonex>(jQuery.iDrag.dragged.dragCfg.nx+jQuery.iDrag.dragged.dragCfg.oC.w)||(zonex+zonew)<jQuery.iDrag.dragged.dragCfg.nx||zoney>(jQuery.iDrag.dragged.dragCfg.ny+jQuery.iDrag.dragged.dragCfg.oC.h)||(zoney+zoneh)<jQuery.iDrag.dragged.dragCfg.ny)?true:false;},pointer:function(zonex,zoney,zonew,zoneh)
{return zonex<jQuery.iDrag.dragged.dragCfg.currentPointer.x&&(zonex+zonew)>jQuery.iDrag.dragged.dragCfg.currentPointer.x&&zoney<jQuery.iDrag.dragged.dragCfg.currentPointer.y&&(zoney+zoneh)>jQuery.iDrag.dragged.dragCfg.currentPointer.y?true:false;},overzone:false,highlighted:{},count:0,zones:{},highlight:function(elm)
{if(jQuery.iDrag.dragged==null){return;}
var i;jQuery.iDrop.highlighted={};var oneIsSortable=false;for(i in jQuery.iDrop.zones){if(jQuery.iDrop.zones[i]!=null){var iEL=jQuery.iDrop.zones[i].get(0);if(jQuery(jQuery.iDrag.dragged).is('.'+iEL.dropCfg.a)){if(iEL.dropCfg.m==false){iEL.dropCfg.p=jQuery.extend(jQuery.iUtil.getPositionLite(iEL),jQuery.iUtil.getSizeLite(iEL));iEL.dropCfg.m=true;}
if(iEL.dropCfg.ac){jQuery.iDrop.zones[i].addClass(iEL.dropCfg.ac);}
jQuery.iDrop.highlighted[i]=jQuery.iDrop.zones[i];if(jQuery.iSort&&iEL.dropCfg.s&&jQuery.iDrag.dragged.dragCfg.so){iEL.dropCfg.el=jQuery('.'+iEL.dropCfg.a,iEL);elm.style.display='none';jQuery.iSort.measure(iEL);iEL.dropCfg.os=jQuery.iSort.serialize(jQuery.attr(iEL,'id')).hash;elm.style.display=elm.dragCfg.oD;oneIsSortable=true;}
if(iEL.dropCfg.onActivate){iEL.dropCfg.onActivate.apply(jQuery.iDrop.zones[i].get(0),[jQuery.iDrag.dragged]);}}}}
if(oneIsSortable){jQuery.iSort.start();}},remeasure:function()
{jQuery.iDrop.highlighted={};for(i in jQuery.iDrop.zones){if(jQuery.iDrop.zones[i]!=null){var iEL=jQuery.iDrop.zones[i].get(0);if(jQuery(jQuery.iDrag.dragged).is('.'+iEL.dropCfg.a)){iEL.dropCfg.p=jQuery.extend(jQuery.iUtil.getPositionLite(iEL),jQuery.iUtil.getSizeLite(iEL));if(iEL.dropCfg.ac){jQuery.iDrop.zones[i].addClass(iEL.dropCfg.ac);}
jQuery.iDrop.highlighted[i]=jQuery.iDrop.zones[i];if(jQuery.iSort&&iEL.dropCfg.s&&jQuery.iDrag.dragged.dragCfg.so){iEL.dropCfg.el=jQuery('.'+iEL.dropCfg.a,iEL);elm.style.display='none';jQuery.iSort.measure(iEL);elm.style.display=elm.dragCfg.oD;}}}}},checkhover:function(e)
{if(jQuery.iDrag.dragged==null){return;}
jQuery.iDrop.overzone=false;var i;var applyOnHover=false;var hlt=0;for(i in jQuery.iDrop.highlighted)
{var iEL=jQuery.iDrop.highlighted[i].get(0);if(jQuery.iDrop.overzone==false&&jQuery.iDrop[iEL.dropCfg.t](iEL.dropCfg.p.x,iEL.dropCfg.p.y,iEL.dropCfg.p.wb,iEL.dropCfg.p.hb)){if(iEL.dropCfg.hc&&iEL.dropCfg.h==false){jQuery.iDrop.highlighted[i].addClass(iEL.dropCfg.hc);}
if(iEL.dropCfg.h==false&&iEL.dropCfg.onHover){applyOnHover=true;}
iEL.dropCfg.h=true;jQuery.iDrop.overzone=iEL;if(jQuery.iSort&&iEL.dropCfg.s&&jQuery.iDrag.dragged.dragCfg.so){jQuery.iSort.helper.get(0).className=iEL.dropCfg.shc;jQuery.iSort.checkhover(iEL);}
hlt++;}else if(iEL.dropCfg.h==true){if(iEL.dropCfg.onOut){iEL.dropCfg.onOut.apply(iEL,[e,jQuery.iDrag.helper.get(0).firstChild,iEL.dropCfg.fx]);}
if(iEL.dropCfg.hc){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.hc);}
iEL.dropCfg.h=false;}}
if(jQuery.iSort&&!jQuery.iDrop.overzone&&jQuery.iDrag.dragged.so){jQuery.iSort.helper.get(0).style.display='none';}
if(applyOnHover){jQuery.iDrop.overzone.dropCfg.onHover.apply(jQuery.iDrop.overzone,[e,jQuery.iDrag.helper.get(0).firstChild]);}},checkdrop:function(e)
{var i;for(i in jQuery.iDrop.highlighted){var iEL=jQuery.iDrop.highlighted[i].get(0);if(iEL.dropCfg.ac){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.ac);}
if(iEL.dropCfg.hc){jQuery.iDrop.highlighted[i].removeClass(iEL.dropCfg.hc);}
if(iEL.dropCfg.s){jQuery.iSort.changed[jQuery.iSort.changed.length]=i;}
if(iEL.dropCfg.onDrop&&iEL.dropCfg.h==true){iEL.dropCfg.h=false;iEL.dropCfg.onDrop.apply(iEL,[e,iEL.dropCfg.fx]);}
iEL.dropCfg.m=false;iEL.dropCfg.h=false;}
jQuery.iDrop.highlighted={};},destroy:function()
{return this.each(function()
{if(this.isDroppable){if(this.dropCfg.s){id=jQuery.attr(this,'id');jQuery.iSort.collected[id]=null;jQuery('.'+this.dropCfg.a,this).DraggableDestroy();}
jQuery.iDrop.zones['d'+this.idsa]=null;this.isDroppable=false;this.f=null;}});},build:function(o)
{return this.each(function()
{if(this.isDroppable==true||!o.accept||!jQuery.iUtil||!jQuery.iDrag){return;}
this.dropCfg={a:o.accept,ac:o.activeclass||false,hc:o.hoverclass||false,shc:o.helperclass||false,onDrop:o.ondrop||o.onDrop||false,onHover:o.onHover||o.onhover||false,onOut:o.onOut||o.onout||false,onActivate:o.onActivate||false,t:o.tolerance&&(o.tolerance=='fit'||o.tolerance=='intersect')?o.tolerance:'pointer',fx:o.fx?o.fx:false,m:false,h:false};if(o.sortable==true&&jQuery.iSort){id=jQuery.attr(this,'id');jQuery.iSort.collected[id]=this.dropCfg.a;this.dropCfg.s=true;if(o.onChange){this.dropCfg.onChange=o.onChange;this.dropCfg.os=jQuery.iSort.serialize(id).hash;}}
this.isDroppable=true;this.idsa=parseInt(Math.random()*10000);jQuery.iDrop.zones['d'+this.idsa]=jQuery(this);jQuery.iDrop.count++;});}};jQuery.fn.extend({DroppableDestroy:jQuery.iDrop.destroy,Droppable:jQuery.iDrop.build});jQuery.recallDroppables=jQuery.iDrop.remeasure;jQuery.iSlider={tabindex:1,set:function(values)
{var values=values;return this.each(function()
{this.slideCfg.sliders.each(function(key)
{jQuery.iSlider.dragmoveBy(this,values[key]);});});},get:function()
{var values=[];this.each(function(slider)
{if(this.isSlider){values[slider]=[];var elm=this;var sizes=jQuery.iUtil.getSize(this);this.slideCfg.sliders.each(function(key)
{var x=this.offsetLeft;var y=this.offsetTop;xproc=parseInt(x*100/(sizes.w-this.offsetWidth));yproc=parseInt(y*100/(sizes.h-this.offsetHeight));values[slider][key]=[xproc||0,yproc||0,x||0,y||0];});}});return values;},modifyContainer:function(elm)
{elm.dragCfg.containerMaxx=elm.dragCfg.cont.w-elm.dragCfg.oC.wb;elm.dragCfg.containerMaxy=elm.dragCfg.cont.h-elm.dragCfg.oC.hb;if(elm.SliderContainer.slideCfg.restricted){next=elm.SliderContainer.slideCfg.sliders.get(elm.SliderIteration+1);if(next){elm.dragCfg.cont.w=(parseInt(jQuery(next).css('left'))||0)+elm.dragCfg.oC.wb;elm.dragCfg.cont.h=(parseInt(jQuery(next).css('top'))||0)+elm.dragCfg.oC.hb;}
prev=elm.SliderContainer.slideCfg.sliders.get(elm.SliderIteration-1);if(prev){var prevLeft=parseInt(jQuery(prev).css('left'))||0;var prevTop=parseInt(jQuery(prev).css('left'))||0;elm.dragCfg.cont.x+=prevLeft;elm.dragCfg.cont.y+=prevTop;elm.dragCfg.cont.w-=prevLeft;elm.dragCfg.cont.h-=prevTop;}}
elm.dragCfg.maxx=elm.dragCfg.cont.w-elm.dragCfg.oC.wb;elm.dragCfg.maxy=elm.dragCfg.cont.h-elm.dragCfg.oC.hb;if(elm.dragCfg.fractions){elm.dragCfg.gx=((elm.dragCfg.cont.w-elm.dragCfg.oC.wb)/elm.dragCfg.fractions)||1;elm.dragCfg.gy=((elm.dragCfg.cont.h-elm.dragCfg.oC.hb)/elm.dragCfg.fractions)||1;elm.dragCfg.fracW=elm.dragCfg.maxx/elm.dragCfg.fractions;elm.dragCfg.fracH=elm.dragCfg.maxy/elm.dragCfg.fractions;}
elm.dragCfg.cont.dx=elm.dragCfg.cont.x-elm.dragCfg.oR.x;elm.dragCfg.cont.dy=elm.dragCfg.cont.y-elm.dragCfg.oR.y;jQuery.iDrag.helper.css('cursor','default');},onSlide:function(elm,x,y)
{if(elm.dragCfg.fractions){xfrac=parseInt(x/elm.dragCfg.fracW);xproc=xfrac*100/elm.dragCfg.fractions;yfrac=parseInt(y/elm.dragCfg.fracH);yproc=yfrac*100/elm.dragCfg.fractions;}else{xproc=parseInt(x*100/elm.dragCfg.containerMaxx);yproc=parseInt(y*100/elm.dragCfg.containerMaxy);}
elm.dragCfg.lastSi=[xproc||0,yproc||0,x||0,y||0];if(elm.dragCfg.onSlide)
elm.dragCfg.onSlide.apply(elm,elm.dragCfg.lastSi);},dragmoveByKey:function(event)
{pressedKey=event.charCode||event.keyCode||-1;switch(pressedKey)
{case 35:jQuery.iSlider.dragmoveBy(this.dragElem,[2000,2000]);break;case 36:jQuery.iSlider.dragmoveBy(this.dragElem,[-2000,-2000]);break;case 37:jQuery.iSlider.dragmoveBy(this.dragElem,[-this.dragElem.dragCfg.gx||-1,0]);break;case 38:jQuery.iSlider.dragmoveBy(this.dragElem,[0,-this.dragElem.dragCfg.gy||-1]);break;case 39:jQuery.iSlider.dragmoveBy(this.dragElem,[this.dragElem.dragCfg.gx||1,0]);break;case 40:jQuery.iDrag.dragmoveBy(this.dragElem,[0,this.dragElem.dragCfg.gy||1]);break;}},dragmoveBy:function(elm,position)
{if(!elm.dragCfg){return;}
elm.dragCfg.oC=jQuery.extend(jQuery.iUtil.getPosition(elm),jQuery.iUtil.getSize(elm));elm.dragCfg.oR={x:parseInt(jQuery.css(elm,'left'))||0,y:parseInt(jQuery.css(elm,'top'))||0};elm.dragCfg.oP=jQuery.css(elm,'position');if(elm.dragCfg.oP!='relative'&&elm.dragCfg.oP!='absolute'){elm.style.position='relative';}
jQuery.iDrag.getContainment(elm);jQuery.iSlider.modifyContainer(elm);dx=parseInt(position[0])||0;dy=parseInt(position[1])||0;nx=elm.dragCfg.oR.x+dx;ny=elm.dragCfg.oR.y+dy;if(elm.dragCfg.fractions){newCoords=jQuery.iDrag.snapToGrid.apply(elm,[nx,ny,dx,dy]);if(newCoords.constructor==Object){dx=newCoords.dx;dy=newCoords.dy;}
nx=elm.dragCfg.oR.x+dx;ny=elm.dragCfg.oR.y+dy;}
newCoords=jQuery.iDrag.fitToContainer.apply(elm,[nx,ny,dx,dy]);if(newCoords&&newCoords.constructor==Object){dx=newCoords.dx;dy=newCoords.dy;}
nx=elm.dragCfg.oR.x+dx;ny=elm.dragCfg.oR.y+dy;if(elm.dragCfg.si&&(elm.dragCfg.onSlide||elm.dragCfg.onChange)){jQuery.iSlider.onSlide(elm,nx,ny);}
nx=!elm.dragCfg.axis||elm.dragCfg.axis=='horizontally'?nx:elm.dragCfg.oR.x||0;ny=!elm.dragCfg.axis||elm.dragCfg.axis=='vertically'?ny:elm.dragCfg.oR.y||0;elm.style.left=nx+'px';elm.style.top=ny+'px';},build:function(o){return this.each(function()
{if(this.isSlider==true||!o.accept||!jQuery.iUtil||!jQuery.iDrag||!jQuery.iDrop){return;}
toDrag=jQuery(o.accept,this);if(toDrag.size()==0){return;}
var params={containment:'parent',si:true,onSlide:o.onSlide&&o.onSlide.constructor==Function?o.onSlide:null,onChange:o.onChange&&o.onChange.constructor==Function?o.onChange:null,handle:this,opacity:o.opacity||false};if(o.fractions&&parseInt(o.fractions)){params.fractions=parseInt(o.fractions)||1;params.fractions=params.fractions>0?params.fractions:1;}
if(toDrag.size()==1)
toDrag.Draggable(params);else{jQuery(toDrag.get(0)).Draggable(params);params.handle=null;toDrag.Draggable(params);}
toDrag.keydown(jQuery.iSlider.dragmoveByKey);toDrag.attr('tabindex',jQuery.iSlider.tabindex++);this.isSlider=true;this.slideCfg={};this.slideCfg.onslide=params.onslide;this.slideCfg.fractions=params.fractions;this.slideCfg.sliders=toDrag;this.slideCfg.restricted=o.restricted?true:false;sliderEl=this;sliderEl.slideCfg.sliders.each(function(nr)
{this.SliderIteration=nr;this.SliderContainer=sliderEl;});if(o.values&&o.values.constructor==Array){for(i=o.values.length-1;i>=0;i--){if(o.values[i].constructor==Array&&o.values[i].length==2){el=this.slideCfg.sliders.get(i);if(el.tagName){jQuery.iSlider.dragmoveBy(el,o.values[i]);}}}}});}};jQuery.fn.extend({Slider:jQuery.iSlider.build,SliderSetValues:jQuery.iSlider.set,SliderGetValues:jQuery.iSlider.get});(function($){$.fn.ajaxSubmit=function(options){if(typeof options=='function')
options={success:options};options=$.extend({url:this.attr('action')||window.location,type:this.attr('method')||'GET'},options||{});var veto={};$.event.trigger('form.pre.serialize',[this,options,veto]);if(veto.veto)return this;var a=this.formToArray(options.semantic);if(options.data){for(var n in options.data)
a.push({name:n,value:options.data[n]});}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false)return this;$.event.trigger('form.submit.validate',[a,this,options,veto]);if(veto.veto)return this;var q=$.param(a);if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else
options.data=q;var $form=this,callbacks=[];if(options.resetForm)callbacks.push(function(){$form.resetForm();});if(options.clearForm)callbacks.push(function(){$form.clearForm();});if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){if(this.evalScripts)
$(options.target).attr("innerHTML",data).evalScripts().each(oldSuccess,arguments);else
$(options.target).html(data).each(oldSuccess,arguments);});}
else if(options.success)
callbacks.push(options.success);options.success=function(data,status){for(var i=0,max=callbacks.length;i<max;i++)
callbacks[i](data,status,$form);};var files=$('input:file',this).fieldValue();var found=false;for(var j=0;j<files.length;j++)
if(files[j])
found=true;if(options.iframe||found)
fileUpload();else
$.ajax(options);$.event.trigger('form.submit.notify',[this,options]);return this;function fileUpload(){var form=$form[0];var opts=$.extend({},$.ajaxSettings,options);var id='jqFormIO'+$.fn.ajaxSubmit.counter++;var $io=$('<iframe id="'+id+'" name="'+id+'" />');var io=$io[0];var op8=$.browser.opera&&window.opera.version()<9;if($.browser.msie||op8)io.src='javascript:false;document.write("");';$io.css({position:'absolute',top:'-1000px',left:'-1000px'});var xhr={responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){}};var g=opts.global;if(g&&!$.active++)$.event.trigger("ajaxStart");if(g)$.event.trigger("ajaxSend",[xhr,opts]);var cbInvoked=0;var timedOut=0;setTimeout(function(){$io.appendTo('body');io.attachEvent?io.attachEvent('onload',cb):io.addEventListener('load',cb,false);var encAttr=form.encoding?'encoding':'enctype';var t=$form.attr('target');$form.attr({target:id,method:'POST',action:opts.url});form[encAttr]='multipart/form-data';if(opts.timeout)
setTimeout(function(){timedOut=true;cb();},opts.timeout);form.submit();$form.attr('target',t);},10);function cb(){if(cbInvoked++)return;io.detachEvent?io.detachEvent('onload',cb):io.removeEventListener('load',cb,false);var ok=true;try{if(timedOut)throw'timeout';var data,doc;doc=io.contentWindow?io.contentWindow.document:io.contentDocument?io.contentDocument:io.document;xhr.responseText=doc.body?doc.body.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(opts.dataType=='json'||opts.dataType=='script'){var ta=doc.getElementsByTagName('textarea')[0];data=ta?ta.value:xhr.responseText;if(opts.dataType=='json')
eval("data = "+data);else
$.globalEval(data);}
else if(opts.dataType=='xml'){data=xhr.responseXML;if(!data&&xhr.responseText!=null)
data=toXml(xhr.responseText);}
else{data=xhr.responseText;}}
catch(e){ok=false;$.handleError(opts,xhr,'error',e);}
if(ok){opts.success(data,'success');if(g)$.event.trigger("ajaxSuccess",[xhr,opts]);}
if(g)$.event.trigger("ajaxComplete",[xhr,opts]);if(g&&!--$.active)$.event.trigger("ajaxStop");if(opts.complete)opts.complete(xhr,ok?'success':'error');setTimeout(function(){$io.remove();xhr.responseXML=null;},100);};function toXml(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else
doc=(new DOMParser()).parseFromString(s,'text/xml');return(doc&&doc.documentElement&&doc.documentElement.tagName!='parsererror')?doc:null;};};};$.fn.ajaxSubmit.counter=0;$.fn.ajaxForm=function(options){return this.ajaxFormUnbind().submit(submitHandler).each(function(){this.formPluginId=$.fn.ajaxForm.counter++;$.fn.ajaxForm.optionHash[this.formPluginId]=options;$(":submit,input:image",this).click(clickHandler);});};$.fn.ajaxForm.counter=1;$.fn.ajaxForm.optionHash={};function clickHandler(e){var $form=this.form;$form.clk=this;if(this.type=='image'){if(e.offsetX!=undefined){$form.clk_x=e.offsetX;$form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$(this).offset();$form.clk_x=e.pageX-offset.left;$form.clk_y=e.pageY-offset.top;}else{$form.clk_x=e.pageX-this.offsetLeft;$form.clk_y=e.pageY-this.offsetTop;}}
setTimeout(function(){$form.clk=$form.clk_x=$form.clk_y=null;},10);};function submitHandler(){var id=this.formPluginId;var options=$.fn.ajaxForm.optionHash[id];$(this).ajaxSubmit(options);return false;};$.fn.ajaxFormUnbind=function(){this.unbind('submit',submitHandler);return this.each(function(){$(":submit,input:image",this).unbind('click',clickHandler);});};$.fn.formToArray=function(semantic){var a=[];if(this.length==0)return a;var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els)return a;for(var i=0,max=els.length;i<max;i++){var el=els[i];var n=el.name;if(!n)continue;if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el)
a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});continue;}
var v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(var j=0,jmax=v.length;j<jmax;j++)
a.push({name:n,value:v[j]});}
else if(v!==null&&typeof v!='undefined')
a.push({name:n,value:v});}
if(!semantic&&form.clk){var inputs=form.getElementsByTagName("input");for(var i=0,max=inputs.length;i<max;i++){var input=inputs[i];var n=input.name;if(n&&!input.disabled&&input.type=="image"&&form.clk==input)
a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n)return;var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++)
a.push({name:n,value:v[i]});}
else if(v!==null&&typeof v!='undefined')
a.push({name:this.name,value:v});});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length))
continue;v.constructor==Array?$.merge(val,v):val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(typeof successful=='undefined')successful=true;if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1))
return null;if(tag=='select'){var index=el.selectedIndex;if(index<0)return null;var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=$.browser.msie&&!(op.attributes['value'].specified)?op.text:op.value;if(one)return v;a.push(v);}}
return a;}
return el.value;};$.fn.clearForm=function(){return this.each(function(){$('input,select,textarea',this).clearFields();});};$.fn.clearFields=$.fn.clearInputs=function(){return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(t=='text'||t=='password'||tag=='textarea')
this.value='';else if(t=='checkbox'||t=='radio')
this.checked=false;else if(tag=='select')
this.selectedIndex=-1;});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType))
this.reset();});};})(jQuery);(function($){var helper={},current,title,tID,IE=$.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent),track=false;$.Tooltip={blocked:false,defaults:{delay:200,showURL:true,extraClass:"",top:15,left:15},block:function(){$.Tooltip.blocked=!$.Tooltip.blocked;}};$.fn.extend({Tooltip:function(settings){settings=$.extend({},$.Tooltip.defaults,settings);createHelper();return this.each(function(){this.tSettings=settings;this.tooltipText=$(this).attr("title");$(this).removeAttr("title");this.alt="";}).hover(save,hide).click(hide);},fixPNG:IE?function(){return this.each(function(){var image=$(this).css('backgroundImage');if(image.match(/^url\(["']?(.*\.png)["']?\)$/i)){image=RegExp.$1;$(this).css({'backgroundImage':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+image+"')"}).each(function(){var position=$(this).css('position');if(position!='absolute'&&position!='relative')
$(this).css('position','relative');});}});}:function(){return this;},unfixPNG:IE?function(){return this.each(function(){$(this).css({'filter':'',backgroundImage:''});});}:function(){return this;},hideWhenEmpty:function(){return this.each(function(){$(this)[$(this).html()?"show":"hide"]();});},url:function(){return this.attr('href')||this.attr('src');}});function createHelper(){if(helper.parent)
return;helper.parent=$('<div id="tooltip"><h3></h3><div class="body"></div><div class="url"></div></div>').hide().appendTo('body');if($.fn.bgiframe)
helper.parent.bgiframe();helper.title=$('h3',helper.parent);helper.body=$('div.body',helper.parent);helper.url=$('div.url',helper.parent);}
function handle(event){if(this.tSettings.delay)
tID=setTimeout(show,this.tSettings.delay);else
show();track=!!this.tSettings.track;$('body').bind('mousemove',update);update(event);}
function save(){if($.Tooltip.blocked||this==current||!this.tooltipText)
return;current=this;title=this.tooltipText;if(this.tSettings.bodyHandler){helper.title.hide();helper.body.html(this.tSettings.bodyHandler.call(this)).show();}else if(this.tSettings.showBody){var parts=title.split(this.tSettings.showBody);helper.title.html(parts.shift()).show();helper.body.empty();for(var i=0,part;part=parts[i];i++){if(i>0)
helper.body.append("<br/>");helper.body.append(part);}
helper.body.hideWhenEmpty();}else{helper.title.html(title).show();helper.body.hide();}
if(this.tSettings.showURL&&$(this).url())
helper.url.html($(this).url().replace('http://','')).show();else
helper.url.hide();helper.parent.addClass(this.tSettings.extraClass);if(this.tSettings.fixPNG)
helper.parent.fixPNG();handle.apply(this,arguments);}
function show(){tID=null;helper.parent.show();update();}
function update(event){if($.Tooltip.blocked)
return;if(!track&&helper.parent.is(":visible")){$('body').unbind('mousemove',update)}
if(current==null){$('body').unbind('mousemove',update);return;}
var left=helper.parent[0].offsetLeft;var top=helper.parent[0].offsetTop;if(event){left=event.pageX+current.tSettings.left;top=event.pageY+current.tSettings.top;helper.parent.css({left:left+'px',top:top+'px'});}
var v=viewport(),h=helper.parent[0];if(v.x+v.cx<h.offsetLeft+h.offsetWidth){left-=h.offsetWidth+20+current.tSettings.left;helper.parent.css({left:left+'px'});}
if(v.y+v.cy<h.offsetTop+h.offsetHeight){top-=h.offsetHeight+20+current.tSettings.top;helper.parent.css({top:top+'px'});}}
function viewport(){return{x:$(window).scrollLeft(),y:$(window).scrollTop(),cx:$(window).width(),cy:$(window).height()};}
function hide(event){if($.Tooltip.blocked)
return;if(tID)
clearTimeout(tID);current=null;helper.parent.hide().removeClass(this.tSettings.extraClass);if(this.tSettings.fixPNG)
helper.parent.unfixPNG();}})(jQuery);Array.prototype.removeItems=function(items)
{if(typeof items!="object")
{itemsValue=items;var items=new Array();items.push(itemsValue);}
var j;for(var i=0;i<items.length;i++)
{j=0;while(j<this.length)
{if(this[j]==items[i])
{this.splice(j,1);}
else
{j++;}}}}
function getDomainFromUrl(url)
{var domain;domain=url.match(/:\/\/(www\.)?([^\/:]+)/);domain=domain[2]?domain[2]:'';return domain;}
function arraySearch(needle,haystack)
{for(var i=0,j=haystack.length;i<j;i++)
{if(haystack[i]==needle)
{return i;}}
return-1;}
function catchEnter(e)
{var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0;return(key==13);}
function clickHandler(e,clickFunction,parentContainerId)
{if(!e)
{var e=window.event;}
if(e.target)
{targetElement=e.target;}
else
{if(e.srcElement)
{targetElement=e.srcElement;}}
if(targetElement.nodeType==3)
{targetElement=targetElement.parentNode;}
if($(targetElement).parents("#window").attr("class")!=parentContainerId)
{eval(clickFunction+"()");}}
function createAssociativeArray(inArray)
{for(var i=0,j=inArray.length;i<j;i++)
{miniArray=inArray[i].split(":");if(miniArray[0].length>0&&miniArray[1].length>0)
{eval("this."+miniArray[0]+" = miniArray[1]");}}}
function includeFileInHead(elementType,fileUri)
{var head,headElement,headElementType,relText;switch(elementType)
{case'text/javascript':headElementType='script';relText='';break;case'text/css':headElementType='link';relText='stylesheet';break;}
if(document.createElement&&document.getElementsByTagName&&(head=document.getElementsByTagName('head')[0])&&head.appendChild&&(headElement=document.createElement(headElementType)))
{headElement.setAttribute("type",elementType);if(elementType=='text/css')
{headElement.setAttribute("rel",relText);headElement.href=fileUri;}
else
{headElement.src=fileUri;}
headElement.id=fileUri.replace(/[^a-zA-Z_]/g,"");var headElementOld=document.getElementById(headElement.id);try
{if(headElementOld)head.removeChild(headElement);}
catch(e)
{}
head.appendChild(headElement);}
else
{return false;}
return true;}
function toggleBranch(branchId)
{branchList=document.getElementById('branch_'+branchId);branchIndicator=document.getElementById('branch_indicator_'+branchId);branchHandle=document.getElementById('branch_handle_'+branchId);if(branchList.style.display=='none')
{branchList.style.display='block';branchIndicator.className='indicator list_open';branchHandle.style.fontWeight='bold';}
else
{branchList.style.display='none';branchIndicator.className='indicator list_closed';branchHandle.style.fontWeight='normal';}}
function toFixedPositions(input,positions)
{var output='';input=input.toString();for(var i=0,j=positions-input.length;i<j;i++)
{output+="0";}
return output+input;}
function insertSelectOptions(selectElement,optionsHTML)
{if(typeof selectElement=='string')
{selectElement=document.getElementById(selectElement);}
selectElement.innerHTML='';selectTempDiv=document.createElement("div");selectTempDiv.style.display='none';document.body.appendChild(selectTempDiv);selectTempDiv.innerHTML=optionsHTML.replace(/<option/g,"<span").replace(/<\/option/g,"</span");optionElements=selectTempDiv.getElementsByTagName("span");for(var i=0,j=optionElements.length;i<j;i++)
{optionElement=document.createElement("option");optionElement.value=optionElements[i].getAttribute("value");if(optionElements[i].childNodes.length>0)
{optionElement.appendChild(document.createTextNode(optionElements[i].childNodes[0].nodeValue));}
if(typeof optionElements[i].getAttribute("selected")=='string')
{optionElement.selected='selected';}
selectElement.appendChild(optionElement);}
document.body.removeChild(selectTempDiv);selectTempDiv=null;}
function confirmAction(type,label)
{var confirmed=false;switch(type)
{case"pass":confirmed=confirm("Weet u zeker dat u het wachtwoord wilt wijzigen? (oude wachtwoord vervalt)");break;case"groep":confirmed=confirm("Weet u zeker dat u deze groep wilt verwijderen? Alle eventueel eronder hangende groepen zullen ook verwijderd worden! (deze actie is niet omkeerbaar)");break;case"gebruikersgroep":confirmed=confirm("Weet u zeker dat u deze gebruikersgroep wilt verwijderen? Alle eraan gekoppelde gebruikers zullen ook verwijderd worden! (deze actie is niet omkeerbaar)");break;case"desktop":confirmed=confirm("Are you sure you want to delete this desktop?");break;case"reset_desktop":confirmed=confirm("Are you sure you want to reset this desktop?");break;case"reset_full":confirmed=confirm("Are you sure you want to delete all your desktops and icons?");break;case"send":confirmed=confirm("Are you sure you want to send this message: '"+label+"' ?");break;default:confirmed=confirm("Are you sure you want to delete the item '"+label+"' ?");}
return confirmed;}
function confirmActionEx(message)
{var confirmed=false;confirmed=confirm(message);return confirmed;}
function createBrowserBookmark(url,label)
{if(window.sidebar)
{window.sidebar.addPanel(label,url,"");}
else if(document.all)
{window.external.AddFavorite(url,label);}
else if(window.opera&&window.print)
{var elem=document.createElement('a');elem.setAttribute('href',url);elem.setAttribute('title',label);elem.setAttribute('rel','sidebar');elem.click();document.body.removeChild(elem);}}
var Url={encode:function(string){return escape(this._utf8_encode(string));},decode:function(string){return this._utf8_decode(unescape(string));},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}}
var initFunctions=new Array();var LOCALE,LANGUAGE,symbalooLOCALE,APPVERSION,DESKTOPVERSION;var desktopId;var desktopRows;var desktopCols;var desktopContent=new Array();var desktopContentShadow=new Array();var currentSearchModule,currentSearchSource,targetPosition;var crumbsBASE=new Object();var crumbsLOCALE=new Object();var currentTimeout,userInputTimeout;var onWindowClose;var datetimeTimer=false; var updateTimer=false;var dropdownTimer=false;var hideDropdownAfterClick=false; var symbalooLock=false;var loadingDesktop=false;var loadingDesktopBar=false;var explorerLastTab='links';var explorerHistoryCurrentTab=new Array();var explorerHistorylinks=new Array("preferred");var explorerHistorysearch=new Array("preferred");var explorerHistoryfeeds=new Array("preferred");var explorerHistorywidget=new Array("preferred");var explorerHistoryradio=new Array("preferred");var explorerInternationallinks=false;var explorerInternationalfeeds=false;var explorerInternationalradio=false;var refreshTimer;var windowContentTemp;function symbalooInit(appversion,locale,language)
{$.ajaxSetup({type:"GET",timeout:15000});APPVERSION=appversion;LOCALE=locale;LANGUAGE=language; // initDateTime();
}
function ajaxCall(args)
{url=(typeof args.url=='undefined')?'':args.url;data=(typeof args.data=='undefined')?'':args.data;type=(typeof args.type=='undefined')?'GET':args.type;complete=(typeof args.complete!='function')?null:args.complete;if(url.length==0)
{return false;}
dataString='appversion='+APPVERSION;dataString+='&locale='+LOCALE;dataString+='&language='+LANGUAGE;dataString+='&desktopversion='+DESKTOPVERSION;dataString+='&current_desktop_id='+desktopId;if(data.length>0)
{dataString+='&'+data;}
ajaxCallComplete=function(xhr)
{if(xhr.responseText.search(/ajaxCallError/gi)>-1)
{messageItems=xhr.responseText.split('||');if(messageItems[0]=='ajaxCallErrorUpdateInProgress')
{document.location='/update.php';}
else if(messageItems[0]=='ajaxCallErrorInvalidAppVersion'||messageItems[0]=='ajaxCallErrorInvalidDesktopVersion')
{showAlert({content:messageItems[1],icon:'error'});}}
else
{complete(xhr);}}
$.ajax({url:url,type:type,data:dataString,complete:ajaxCallComplete});}
function initDateTime()
{ajaxCall({url:'/_ajax/date_time_retrieve.php',complete:updateDateTime});}
function updateDateTime()
{var currentDateTime=new Date();var currentHours=currentDateTime.getHours();var currentMinutes=currentDateTime.getMinutes();var currentSeconds=currentDateTime.getSeconds();if(currentHours==0&&currentMinutes==0&&datetimeTimer)
{datetimeTimer=false;initDateTime();}
else
{$("#time").html(currentHours+":"+toFixedPositions(currentMinutes,2));if(typeof datetimeTimer!="undefined"&&datetimeTimer)
{datetimeTimer=setTimeout(updateDateTime,60000);}
else
{timeoutSeconds=60000-(currentSeconds*1000);datetimeTimer=setTimeout(updateDateTime,timeoutSeconds);}}}
function getLanguageItems(args)
{identifier=(typeof args.identifier=='undefined')?'':args.identifier;table=(typeof args.table=='undefined')?'':args.table;target=(typeof args.target=='undefined')?'':args.target;type=(typeof args.type=='undefined')?'':args.type;onComplete=(typeof args.complete!='function')?null:args.complete;asyncValue=(type=='');if(typeof identifier=='object')
{identifier=identifier.join(",");}
$.ajax({url:'/_ajax/translation_retrieve.php',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&identifier='+identifier+'&table='+table+'&target='+target+'&type='+type,type:'POST',complete:onComplete});}
function loadDesktopBar(desktopIdDirect)
{if(typeof desktopIdDirect=='undefined')
{desktopIdDirect=desktopId;}
if(loadingDesktopBar==true){return;}
loadingDesktopBar=true;onCompleteLoadDesktopBar=function()
{$(".bar_menu_item_selected").removeClass("bar_menu_item_selected");$("#desktop_link_"+desktopId).addClass("bar_menu_item_selected");loadingDesktopBar=false;totalWidth=0;$(".bar_menu_item").each(function()
{totalWidth+=$(this).outerWidth();});}
$.ajax({url:'/_ajax/desktop_show_bar.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopIdDirect,complete:onCompleteLoadDesktopBar});}
function loadDesktop(desktopId)
{if(loadingDesktop==true){return;}
loadingDesktop=true;onCompleteLoadDesktop=function()
{$("#arrowhead").hide();$(".balloonstyle").hide();$("#site").width($("#desktop").width());$("#boxmain .boxcontent").height($("#boxmain").height()-10);loadingDesktop=false;loadDesktopBar();}
$.ajax({url:'/_ajax/desktop_show_empty.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId,complete:onCompleteLoadDesktop});}
function fillDesktop()
{$("#site").width($("#desktop").width());onCompleteFillDesktop=function(xhr)
{$("#boxmain .boxcontent").height($("#boxmain").height()-10);initDragDrop();if(typeof loadSearchOnReady=="function")
{loadSearchOnReady();}}
$.ajax({url:'/_ajax/desktop_fill.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId+'&desktop_content='+desktopContent.join('|')+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows,complete:onCompleteFillDesktop});}
function fillDesktopPress(widgetPressVideoId)
{$("#site").width($("#desktop").width());onCompleteFillDesktop=function(xhr)
{$("#boxmain .boxcontent").height($("#boxmain").height()-10);initDragDrop();$("#"+widgetPressVideoId+"  div.iconcontent").click();}
$.ajax({url:'/_ajax/desktop_fill.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId+'&desktop_content='+desktopContent.join('|')+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows,complete:onCompleteFillDesktop});}
function initDragDrop_old()
{$("#desktop div.icon:not(.inactive)").Draggable({ghosting:true,revert:true,opacity:0.7,snapDistance:10,onStart:function()
{$("#boxmain").addClass("bin");if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");$("#boxmain").show();}},onStop:function()
{$("#desktop div.iconcontent").mouseover(function(){$(this).children(".handle").css("display","block");});$("#desktop div.iconcontent").mouseout(function(){$(this).children(".handle").css("display","none");});$("#boxmain").removeClass("bin");if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","visible");$("#boxmain").hide();}}});$("#desktop div.icon").Droppable({accept:'icon',hoverclass:'dragover',onDrop:function(drag)
{modifyDesktop($(drag),$(this));}});$("#boxmain").Droppable({accept:'icon',hoverclass:'binhover',onDrop:function(drag)
{modifyDesktop($(drag),0);}});}

function addIconCustom(content,action,iconId,refreshDesktop)
{if(typeof iconId=='undefined')iconId=0;if(typeof refreshDesktop=='undefined')refreshDesktop=0;if(ajaxBrowse)ajaxBrowse.abort();explorerLastTab=content;if($("#window_content_container_tab_add").css("display")=="none")
{$(".window_content_container_tab").hide();$("#window_content_container_tab_add").show();}
ajaxBrowse=ajaxCall({url:'/_ajax/icon_add_window_custom.php',type:'POST',data:'content='+content+'&action='+action+'&icon_id='+iconId+'&refresh_desktop='+refreshDesktop+'&notify_webmaster=1'});}

function initDragDrop()
{$("#desktop div.icon:not(.inactive)").Draggable({ghosting:true,revert:true,opacity:0.7,snapDistance:10,onStart:function()
{$("#boxmaindrop").show();$("#boxmain").hide();if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");$("#boxmain").show();}},onStop:function()
{$("#desktop div.iconcontent").mouseover(function(){$(this).children(".handle").css("display","block");});$("#desktop div.iconcontent").mouseout(function(){$(this).children(".handle").css("display","none");});$("#boxmain").show();$("#boxmaindrop").hide();if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","visible");$("#boxmain").hide();}}});$("#desktop div.icon").Droppable({accept:'icon',hoverclass:'dragover',onDrop:function(drag)
{modifyDesktop($(drag),$(this));}});$("#boxmaindrop_edit").Droppable({accept:'icon',hoverclass:'boxmaindrop_edit_hover',onDrop:function(drag)
{ // if($(drag).attr('id').substring(0,1)=="c")
if(true)
{
	// initEditMode=function() {addIconCustom(explorerLastTab,'edit',$(drag).attr('id'),1);}
// showWindow('add_icon',{width:8,height:6,initwindow:initEditMode,extraParam:'no_init'});}
showWindow('add_icon',{width:8,height:6,initwindow:null,extraParam:'site_id='+$(drag).attr('id')});}
else
{showAlert({identifier:'dropEditNotCustomIcon',icon:'error'});}}});$("#boxmaindrop_delete").Droppable({accept:'icon',hoverclass:'boxmaindrop_delete_hover',onDrop:function(drag)
{modifyDesktop($(drag),0);}});$("#boxmaindrop_move").Droppable({accept:'icon',hoverclass:'boxmaindrop_move_hover',onDrop:function(drag)
{showWindow('move_copy_icon',{width:5,height:3,extraParam:$(drag).attr('id')+"|"+desktopId});}}); $("#boxmaindrop_copy").Droppable({accept:'icon',hoverclass:'boxmaindrop_copy_hover',onDrop:function(drag)
{showWindow('move_copy_icon',{width:5,height:3,extraParam:$(drag).attr('id')+"|"+desktopId});}});}

function modifyDesktop(iconSource,iconTarget)
{if(iconTarget==0)
{iconSource.remove();id=parseInt(iconSource.css("top"))+'_'+parseInt(iconSource.css("left"));$('<div id="'+id+'" class="icon inactive inactive_'+LANGUAGE+'" style="top: '+iconSource.css("top")+'; left: '+iconSource.css("left")+';"></div>').appendTo("#desktop");$("#"+id).mouseover(function(){$(this).addClass("hover");});$("#"+id).mouseout(function(){$(this).removeClass("hover");});$("#"+id).click(function(){targetPosition=$(this).attr("id");showWindow('add_icon',{width:8,height:6});});$("#"+id).Droppable({accept:'icon',hoverclass:'dragover',onDrop:function(drag)
{modifyDesktop($(drag),$(this));}});updateDesktopCookie(iconSource.attr("id"),0);}
else if(iconSource==0)
{if((typeof targetPosition=='undefined'||targetPosition.length==0) && site_id_to_edit=='0')
{desktopSetFirstEmptyPositionAsTarget();}
$.ajax({url:'/_ajax/desktop_add_icon.php',type:'POST',data:'desktop_id='+desktopId+'&target_position='+targetPosition+'&icon_id='+iconTarget+"&old_site_id="+site_id_to_edit,complete:function()
{$("#"+iconTarget).Draggable({ghosting:true,revert:true,opacity:0.7,snapDistance:10,onStart:function()
{$("#boxmaindrop").show();$("#boxmain").hide();if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");$("#boxmain").show();}},onStop:function()
{$("#desktop div.iconcontent").mouseover(function(){$(this).children(".handle").css("display","block");});$("#desktop div.iconcontent").mouseout(function(){$(this).children(".handle").css("display","none");});$("#boxmain").show();$("#boxmaindrop").hide();if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","visible");$("#boxmain").hide();}}});$("#"+iconTarget).Droppable({accept:'icon',hoverclass:'dragover',onDrop:function(drag)
{modifyDesktop($(drag),$(this));}});updateDesktopCookie(0,iconTarget);}});}
/*
{$("#"+iconTarget).Draggable({ghosting:true,revert:true,opacity:0.7,snapDistance:10,onStart:function()
{$("#boxmain").addClass("bin");if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");$("#boxmain").show();}},onStop:function()
{$("#desktop div.iconcontent").mouseover(function(){$(this).children(".handle").css("display","block");});$("#desktop div.iconcontent").mouseout(function(){$(this).children(".handle").css("display","none");});$("#boxmain").removeClass("bin");if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","visible");$("#boxmain").hide();}}});$("#"+iconTarget).Droppable({accept:'icon',hoverclass:'dragover',onDrop:function(drag)
{modifyDesktop($(drag),$(this));}});updateDesktopCookie(0,iconTarget);}});} */
else
{var bufferTop=iconTarget.css("top");var bufferLeft=iconTarget.css("left");iconTarget.css("top",iconSource.css("top"));iconTarget.css("left",iconSource.css("left"));iconSource.css("top",bufferTop);iconSource.css("left",bufferLeft);updateDesktopCookie(iconSource.attr("id"),iconTarget.attr("id"));}}
function desktopSetFirstEmptyPositionAsTarget()
{emptyPosition=arraySearch("0",desktopContent);if(emptyPosition>-1)
{targetPosition=desktopContentShadow[emptyPosition];}}
function updateDesktopCookie(iconIdSource,iconIdTarget)
{if(iconIdTarget==0)
{indexOfSource=arraySearch(iconIdSource,desktopContent);posX=Math.floor(indexOfSource/desktopCols)*90;posY=(indexOfSource%desktopCols)*90;desktopContent[indexOfSource]=0;desktopContentShadow[indexOfSource]=posX+'_'+posY;}
else
{if(iconIdSource==0)
{indexOfTarget=arraySearch(targetPosition,desktopContentShadow);desktopContent[indexOfTarget]=iconIdTarget;desktopContentShadow[indexOfTarget]=iconIdTarget;targetPosition='';}
else
{indexOfTarget=arraySearch(iconIdTarget,desktopContentShadow);if(iconIdTarget.indexOf("_")>-1)
{iconIdTargetShadow=parseInt($('#'+iconIdTarget).css("top"))+'_'+parseInt($('#'+iconIdTarget).css("left"));$('#'+iconIdTarget).attr("id",iconIdTargetShadow);iconIdTarget="0";}
else
{iconIdTargetShadow=iconIdTarget;}
desktopContent[arraySearch(iconIdSource,desktopContent)]=iconIdTarget;desktopContent[indexOfTarget]=iconIdSource;desktopContentShadow[arraySearch(iconIdSource,desktopContentShadow)]=iconIdTargetShadow;desktopContentShadow[indexOfTarget]=iconIdSource;}}
try
{clearTimeout(saveDesktopTimeout);}
catch(e)
{}
saveDesktopTimeout=setTimeout(saveDesktop,1000);}
function saveDesktop()
{removeLock=function()
{symbalooLock=false;}
ajaxCall({url:'/_ajax/desktop_save.php',type:'POST',data:'desktop_id='+desktopId+'&desktop_content='+desktopContent.join("|")+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows,complete:removeLock});}
function saveDesktopAsDefault()
{$.ajax({url:'/_ajax/desktop_save_as_default.php',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&desktop_content='+desktopContent.join("|")+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows,type:'POST',complete:function(xhr)
{if(xhr.responseText=="success")
{showAlert({content:'Current desktop is now the default desktop for <strong>'+LOCALE.toUpperCase()+'</strong>',icon:'ok'})}
else
{showAlert({content:xhr.responseText})}}});}
function showWindow(windowContent,args)
{if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");}
dimensionType=(typeof args.dimensionType=='undefined')?'block':args.dimensionType;windowWidth=(typeof args.width=='undefined')?6:parseInt(args.width);windowHeight=(typeof args.height=='undefined')?3:parseInt(args.height);windowTop=(typeof args.top=='undefined')?-1:parseInt(args.top);windowLeft=(typeof args.left=='undefined')?-1:parseInt(args.left);modal=(typeof args.modal=='undefined')?false:(modal==1);shiftUp=(typeof args.shiftup=='undefined')?false:true;key=(typeof args.key=='undefined')?0:args.key;fileLocation=(typeof args.location=='undefined')?'':args.location;extraParam=(typeof args.extraParam=='undefined')?'':args.extraParam;callback=(typeof args.callback!='function')?null:args.callback;if($.browser.msie&&$("#pressvideo").get().length>0){$("#pressvideo").css("visibility","hidden");}
if($.browser.msie&&typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","hidden");$("body","html").css({height:"100%",width:"100%"});$("html").css("overflow","hidden");}
$("#window .windowcontent").html("");$("#overlay").show();if(!modal)$("#overlay").click(hideWindow);if(fileLocation.length>0)
{$.ajax({url:fileLocation+'/'+windowContent+'.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&key='+key,complete:windowSetCloseButton});}
else if(document.getElementById(windowContent)===null)
{$.ajax({url:'/_window/'+windowContent+'.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&key='+key+'&extraParam='+extraParam,complete:windowSetCloseButton});}
else
{if(typeof document.body.style.maxHeight==="undefined")
{windowContentTemp=document.getElementById('source_dropdown').innerHTML;$("#window .windowcontent").append(windowContentTemp);}
else
{$("#window .windowcontent").html($("#"+windowContent).html());}
windowSetCloseButton();}
if(dimensionType=='block')
{windowWidth=(windowWidth*80)+((windowWidth-1)*10);windowHeight=(windowHeight*80)+((windowHeight-1)*10)-6;}
if($.browser.msie&&(windowTop==-1&&windowLeft==-1))
{$("#window").addClass("windowIEcenter");}
else
{$("#window").removeClass("windowIEcenter");}
$("#window").width(windowWidth);if(windowHeight!=3)
{$("#window").height(windowHeight);$("#window .windowcontent").height(parseInt($("#window").css("height"))-10);}
else
{$("#window").css("height","auto");$("#window .windowcontent").css("height","auto");}
if(windowTop==-1&&windowLeft==-1)
{centerWindow();$("#window").css("top","");$("#window").css("left","");}
else
{if(typeof document.body.style.maxHeight==="undefined")
{$("#window").css("top",windowTop);$("#window").css("left",windowLeft);}
else
{$("#window").css("top",(windowTop-$(document).scrollTop()));$("#window").css("left",(windowLeft-$(document).scrollLeft()));}
$("#window").css("marginLeft","");$("#window").css("marginTop","");}
$("#window").show();if(typeof callback=='function')
{callback();callback=null;}
if(shiftUp){if($("#window").height()+windowTop>$(window).height()-15){$("#window").css("top",$(window).height()-$("#window").height()-15);}}}
function windowSetCloseButton()
{$(".window_close_button").click(hideWindow).hover(function()
{$(this).addClass("window_close_button_hover");},function()
{$(this).removeClass("window_close_button_hover");});}
function hideWindow()
{if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","visible");}
if($("#tab_content_container"))
{$('#tab_content_container>ul>li>a').unbind();}
$("#window a, #window div").unbind();$("#window input, #window select").unbind();$("#window").hide();$("#window .windowcontent").html("");$("#overlay").unbind("click").hide();if(typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","visible");$("body","html").css({height:"auto",width:"auto"});$("html").css("overflow","");}
if($.browser.msie&&$("#pressvideo").get().length>0){$("#pressvideo").css("visibility","visible");}
if(typeof onWindowClose=="function")
{onWindowClose();onWindowClose=null;}}
function centerWindow()
{$("#window").css({marginLeft:'-'+parseInt((parseInt($("#window").css("width"))/2),10)+'px'});if(!jQuery.browser.msie){if(true||(typeof XMLHttpRequest=='function'))
{$("#window").css({marginTop:'-'+parseInt((parseInt($("#window").css("height"))/2),10)+'px'});}}}
function showAlert(args)
{if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");}
content=(typeof args.content=='undefined')?'':args.content;identifier=(typeof args.identifier=='undefined')?'alertContent':args.identifier;caption=(typeof args.caption=='undefined')?'':args.caption;icon=(typeof args.icon=='undefined')?'alert':args.icon;callback=(typeof args.callback!='function')?null:args.callback;if(typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","hidden");$("body","html").css({height:"100%",width:"100%"});$("html").css("overflow","hidden");}
translations=new Array();initHTML=(caption.length>0)?'<div id="'+caption+'" class="alertcaption"></div>':'';initHTML+='<div class="window_close_button"></div><div class="alertcontent"><img src="/_img/alert_icon_'+icon+'.gif" width="32" height="32" style="float: left;" /><div id="'+identifier+'" class="alertmessage"></div></div>';$("#alert .windowcontent").html(initHTML);$("#alert").css("width","300px");$("#overlayalert").show();hideAlertInline=function()
{hideAlert(callback);}
$("#overlayalert").click(hideAlertInline);if(caption.length>0)
{translations.push(caption);}
if(content.length>0)
{$("#"+identifier).html(content);}
else
{translations.push(identifier);}
getLanguageItems({identifier:translations});if(jQuery.browser.msie)
{$("#alert").addClass("alertIEcenter");}
centerAlert();$("#alert").show();$(".window_close_button").click(hideAlert).hover(function()
{$(this).addClass("window_close_button_hover");},function()
{$(this).removeClass("window_close_button_hover");});
if(args.time_out>0) setTimeout(hideAlert, args.time_out*1000); }
function showCommonDialog(args){identifier=(typeof args.identifier=='undefined')?'alertContent':args.identifier;viewtype=args.viewtype;callback=args.callback;viewTypeOK=1;viewTypeOKCancel=2;viewTypeYesNo=3
viewTypeYesNoCancel=4;translations=new Array();translations.push(identifier+":alertContent");buttons=new Array();switch(viewtype){case viewTypeOKCancel:button=new Array("确定",callback);buttons.push(button);button=new Array("取消",null);buttons.push(button);translations.push("dialogButtonOK:button_0_text");translations.push("dialogButtonCancel:button_1_text");break;case viewTypeYesNo:button=new Array("是",callback);buttons.push(button);button=new Array("否",null);buttons.push(button);translations.push("dialogButtonYes:button_0_text");translations.push("dialogButtonNo:button_1_text");break;case viewTypeYesNoCancel:button=new Array("是",callback);buttons.push(button);button=new Array("否",null);buttons.push(button);button=new Array("取消",null);buttons.push(button);translations.push("dialogButtonYes:button_0_text");translations.push("dialogButtonNo:button_1_text");translations.push("dialogButtonCancel:button_2_text");break;default:button=new Array("确定",callback);buttons.push(button);translations.push("dialogButtonOK:button_0_text");}
showDialog({identifier:translations,buttons:buttons, content:args.content});}
function showDialog(args)
{if($("#pressvideo_flag").get().length==1){$("#pressvideo").css("visibility","hidden");}
content=(typeof args.content=='undefined')?'':args.content;caption=(typeof args.caption=='undefined')?'':args.caption;icon=(typeof args.icon=='undefined')?'alert':args.icon;buttons=(typeof args.buttons=='undefined')?null:args.buttons;identifier=(typeof args.identifier=='undefined')?'alertContent':args.identifier;if(typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","hidden");$("body","html").css({height:"100%",width:"100%"});$("html").css("overflow","hidden");}
translations=new Array();initHTML=(caption.length>0)?'<div id="'+caption+'" class="alertcaption"></div>':'';initHTML+='<div class="window_close_button"></div><div class="alertcontent"><img src="/_img/alert_icon_'+icon+'.gif" width="32" height="32" style="float: left;" /><div id="alertContent" class="alertmessage">'+content+'</div></div>';$("#alert .windowcontent").html(initHTML);$("#alert").css("width","300px");hideAlertInline=function()
{hideAlert(callback);}
$("#overlayalert").click(hideAlertInline);if(caption.length>0)
{translations.push(caption);}
if(content.length>0)
{$("#alertContent").html(content);}
else
{translations.push(identifier);}
for(var index in buttons){var text=buttons[index][0];var callback=buttons[index][1];if(typeof(text)=='string'){var sButton='<div id="button_'+index+'" class="button" style="margin-top: 2px;">';sButton+='<a href="#" id="button_'+index+'_text">'+text+'</a></div>';$("#alert .windowcontent").append(sButton);if(typeof(callback)=='function')$("#alert .windowcontent #button_"+index+" a").click(callback);$("#alert .windowcontent #button_"+index+" a").click(hideAlert);}}
if(buttons)$("#alert .windowcontent").append("<div style=\"clear: both\"></div>"); if(content=='') getLanguageItems({identifier:translations}); 
$("#overlayalert").show();if(jQuery.browser.msie)
{$("#alert").addClass("alertIEcenter");}
centerAlert();$("#alert").show();$(".window_close_button").click(hideAlert).hover(function()
{$(this).addClass("window_close_button_hover");},function()
{$(this).removeClass("window_close_button_hover");});}
function hideAlert(callback)
{if($("#pressvideo_flag").get().length==1&&$("#overlay").css("display")=="none"){$("#pressvideo").css("visibility","visible");}
$("#alert").hide();$("#overlayalert").unbind("click").hide();$("#alert .window_close_button").unbind();if(typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","visible");$("body","html").css({height:"auto",width:"auto"});$("html").css("overflow","");}
if(typeof callback=='function')
{callback();callback=null;}}
function centerAlert()
{$("#alert").css({marginLeft:'-'+parseInt((parseInt($("#alert").css("width"))/2),10)+'px'});if(!jQuery.browser.msie)
{$("#alert").css({marginTop:'-'+parseInt((parseInt($("#alert").css("height"))/2),10)+'px'});}}
function showBoxLoading()
{try
{clearTimeout(currentTimeout);}
catch(e)
{}
if(typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","hidden");}
if($("#pressvideo_flag").get().length==1){$("#pressvideo").hide();$("#boxmain").show();}
position=$("#boxmain").offset();positionTop=position.top;positionLeft=position.left;width=$("#boxmain").width();height=$("#boxmain").height();$("#boxoverlay").width(width).height(height).css("top",positionTop).css("left",positionLeft).show();;$("#boxloading").width($("#boxoverlay").css("width")).height($("#boxoverlay").css("height")).css("top",$("#boxoverlay").css("top")).css("left",$("#boxoverlay").css("left")).show();$("#boxloading").show();}
function hideBoxLoading()
{$("#boxloading").hide();$("#boxoverlay").hide();if(typeof document.body.style.maxHeight==="undefined")
{$("select").css("visibility","visible");}}
function loadFeed(url,iconId,args)
{if(typeof args!="undefined")
{logoMargin=(typeof args.logoMargin=='undefined')?'':args.logoMargin;displayType=(typeof args.displayType=='undefined')?'full':args.displayType;sortByDate=(typeof args.sortByDate=='undefined')?'1':args.sortByDate;}
else
{logoMargin=0;displayType='full';sortByDate='1';}
$.ajax({url:'/_ajax/feed_load.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&url='+url+'&icon_id='+iconId+'&logo_margin='+logoMargin+'&display_type='+displayType+'&sort_by_date='+sortByDate+'&desktop_id='+desktopId,complete:hideBoxLoading});executeLoadFeed=function()
{loadFeed(url,iconId,args)}
currentTimeout=setTimeout(executeLoadFeed,10*60*1000);}
function loadWidget(iconId)
{if($("#pressvideo_flag").get().length==1){$("#pressvideo").hide();$("#boxmain").show();}
$.ajax({url:'/_ajax/widget_load.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&desktop_id='+desktopId+'&icon_id='+iconId});}
function loadRadio(iconId)
{$.ajax({url:'/_ajax/radio_load.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&icon_id='+iconId,complete:function(xhr)
{var outputRadio="";var radioLabel=$("label",xhr.responseXML).text();outputRadio+='<html><head>';outputRadio+='<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';outputRadio+='<link rel="stylesheet" href="/_css/symbaloo.popup.css" type="text/css" />';outputRadio+='<title>symbaloo radio</title>';outputRadio+='</head><body style="padding: 20px;">';outputRadio+='<div id="radio_header"><a href="javascript: void(0);" onclick="if (window.opener) { window.opener.location = \'http://www.symbaloo.com/\'; } else { if (windowSymbalooMain) { windowSymbalooMain.location.href = \'\'; } else { var windowSymbalooMain = window.open(\'http://www.symbaloo.com/\', \'windowSymbalooMain\'); }}"><img id="symbaloo_logo" src="/_img/logo_symbaloo_'+LOCALE+'.gif" width="170" height="50" alt="" /></a></div>';outputRadio+='<div align="center">';outputRadio+='<object style="width: 280px; height: 69px;">';outputRadio+='<param name="src" value="'+$("url",xhr.responseXML).text()+'">';outputRadio+='<param name="type" value="application/x-mplayer2">';outputRadio+='<param name="autostart" value="1">';outputRadio+='<param name="showcontrols" value="1">';outputRadio+='<param name="showstatusbar" value="1">';outputRadio+='<embed src="'+$("url",xhr.responseXML).text()+'" type="application/x-mplayer2" autoplay="true" width="280" height="69" controller="1" showstatusbar="1" bgcolor="#9999ff" kioskmode="true">';outputRadio+='</embed>';outputRadio+='</object></div>';outputRadio+='<div id="radio_footer"><img src="'+$("image",xhr.responseXML).text()+'" width="80" height="80" alt="Symbaloo Radio | Now playing: '+$("label",xhr.responseXML).text()+'" title="Symbaloo Radio | Now playing: '+$("label",xhr.responseXML).text()+'" /></div>';outputRadio+='</body></html>';radioWindow=window.open('','radioWindow','width=320, height=275, top=0, left=0, screenX=0, screenY=0, resizable=0, scrollbars=0, titlebar=0, toolbar=0, menubar=0, status=0, directories=0');radioWindow.focus();radioWindow.document.writeln(outputRadio);radioWindow.document.close();}});}
function toggleNode(nodeElement)
{alert($(nodeElement).html());$(nodeElement).parent().toggleClass("node_container_open");}
function searchIcon(iconType,contentType,searchText,showInternational)
{if(searchText.length==0)
{showAlert({identifier:'explorerSearchErrorNoQuery',icon:'error'});}
else if(searchText.length==1)
{showAlert({identifier:'explorerSearchErrorTooShort',icon:'error'});}
else
{$("#search_icon_"+contentType+"_indicator").css("display","inline");$("#box_search_"+contentType+" .tab_header span").css("display","none");$.ajax({url:'/_ajax/explorer_search.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&icon_type='+iconType+'&content_type='+contentType+'&search_text='+searchText+'&show_international='+showInternational+'&desktop_content='+desktopContent.join('|'),complete:function()
{$("#search_icon_"+contentType+"_indicator").css("display","none");$("#box_search_"+contentType+" .tab_header span").css("display","inline");$("#search_reset_"+contentType).show();$("#box_filter_"+contentType).hide();$("#box_custom_"+contentType).hide();$("#search_icon_"+contentType).focus();}});}}
function clearSearch(contentType)
{$("#search_icon_"+contentType).val("");$("#"+contentType+"_results").html("");$("#"+contentType+"_results").hide();$("#"+contentType+"_explorer").show();$("#search_icon_"+contentType+"_clear").hide();$("#search_icon_"+contentType+"_indicator").css("display","none");$("#box_search_"+contentType+" .boxinlinelabel span").css("display","block");$("#search_reset_"+contentType).hide();$("#box_filter_"+contentType).show();$("#box_custom_"+contentType).show();$("#search_icon_"+contentType).focus();}
function formatAndCheckURL()
{contentType=arguments[0];$("#add_custom_icon_"+contentType+"_wait").show();uri=$("#add_custom_icon_"+contentType+"_url").val();$.ajax({url:'/_ajax/extern_checkurl.php',data:'appversion='+APPVERSION+'&url='+uri,type:'post',timeout:30000,complete:function(xhr)
{$(".add_custom_icon_wait").hide();if(xhr.responseText=="1")
{addCustomIconStep(contentType,2,'skip_valid_url_check');}
else
{addCustomIconStep(contentType,'1b');}}});}
function addCustomIconCheckSymbalooDB(contentType)
{$("#add_custom_icon_"+contentType+"_wait").show();uri=$("#add_custom_icon_"+contentType+"_url").val();$.ajax({url:'/_ajax/explorer_add_custom_icon_check_db.php',data:'appversion='+APPVERSION+'&content_type='+contentType+'&icon_type='+$('#form_add_custom_icon_'+contentType+' input[@name=icon_type]').fieldValue()+'&url='+Url.encode(uri),type:'post',complete:function()
{$(".add_custom_icon_wait").hide();if($("#add_custom_icon_"+contentType+"_found_results").html().length==0)
{addCustomIconStep(contentType,2,'skip_alternative_check');}
else
{addCustomIconStep(contentType,'1c');}}});}
function suggestLabelFromUrl(contentType)
{if($("#add_url_"+contentType).val().length>0&&($("#add_url_"+contentType+"_label").val().length==0||$("#add_url_"+contentType+"_label").is(".search_prevalue")))
{url=$("#add_url_"+contentType).val();if(url.indexOf('://')<0)
{url='http://'+url;}
parts=url.split('://');url=parts[1];parts=url.split('/');url=parts[0];if(url.indexOf('www.')>-1)
{parts=url.split('www.');url=parts[1];}
$("#add_url_"+contentType+"_label").focus();$("#add_url_"+contentType+"_label").val(url);$("#add_url_"+contentType+"_label").select();}}
function deleteCustomIcon(customIconId,contentType,confirmed)
{if(typeof confirmed=="undefined")confirmed==false;if(!confirmed)
{showCommonDialog({identifier:'explorerDeleteIconConfirm',viewtype:3,callback:function(){deleteCustomIcon(customIconId,contentType,true);}});}
else
{reloadCurrentExplorer=function()
{if($("#c"+customIconId).get().length==1)
{modifyDesktop($("#c"+customIconId),0);}
$("#"+contentType+"_explorer").html("");showAddContentTab(contentType);}
$.ajax({url:'/_ajax/explorer_delete_custom_icon.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&custom_icon_id='+customIconId,complete:reloadCurrentExplorer});}}
function editCustomIcon(customIconId,contentType,refreshDesktop)
{if(typeof refreshDesktop=="undefined")refreshDesktop="false";$.ajax({url:'/_ajax/explorer_edit_custom_icon.php',type:'post',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&custom_icon_id='+customIconId+'&content_type='+contentType+'&refresh_desktop='+refreshDesktop});}
function cancelEditCustomIcon(contentType)
{$("#add_custom_icon_"+contentType+"_id").val("0");$("#add_custom_icon_"+contentType+"_url").val("http://");$("#add_custom_icon_"+contentType+"_image_default").val("0");$("#add_custom_icon_"+contentType+"_image_default_filename").val("");$("#add_custom_icon_"+contentType+"_image_file_existing").val("");$("#add_custom_icon_"+contentType+"_image_file").val("");$("#add_custom_icon_"+contentType+"_label").val("");$("#add_custom_icon_"+contentType+"_label_visible").attr("checked",false);$("#add_custom_icon_"+contentType+"_example_content_text").html("");$(".icon_listing_small").removeClass("icon_listing_small_selected");$("#box_custom_"+contentType+" .tab_header").show();$("#box_custom_"+contentType+" .tab_header_edit_mode").hide();$(".explorer_cancel").hide();$(".add_custom_icon_"+contentType+"_step").hide();$("#add_custom_icon_"+contentType+"_step_1").show();$("#add_custom_icon_"+contentType+"_url").focus();}
function showAddContentTab(tabId,initTab)
{if(typeof initTab!="function")
{initTab=function(){void(0);}}
explorerLastTab=tabId;if(tabId!="search"&&tabId!="widget")
{eval("explorerShowInternational=explorerInternational"+tabId);}
$(".tab_content").hide();$("#tabs_primary li a").removeClass("tab_current");$("#tab_"+tabId).show();$("#tab_"+tabId+"_button").addClass("tab_current");if($("#"+tabId+"_explorer").children().size()==0)
{$.ajax({url:'/_ajax/explorer_load.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId+'&content_type='+tabId+'&desktop_content='+desktopContent.join('|')+'&show_international='+explorerShowInternational+"&icon_id="+site_id_to_edit,complete:function()
{initTab();explorerHistoryCurrentTab=new Array();eval("explorerHistoryCurrentTab = explorerHistory"+tabId+";");eval("explorerHistory"+tabId+" = new Array();");var explorerHistoryTemp=explorerHistoryCurrentTab.slice();for(var index=0;index<explorerHistoryTemp.length;index++)
{targetGroup=$("#explorer_"+tabId+"_category_"+explorerHistoryTemp[index]);if(targetGroup.get().length==1&&!targetGroup.is(".node_main_open"))
{explorerHistoryCurrentTab.removeItems(explorerHistoryTemp[index]);targetGroup.click();}}}});}
$("#search_icon_"+tabId).focus();}
function showSettingsTab(tabId,initTab)
{if(typeof initTab!="function")
{initTab=function(){void(0);};}
$(".tab_content").hide();$("#tabs_primary li a").removeClass("tab_current");$("#tab_"+tabId).show();$("#tab_"+tabId+"_button").addClass("tab_current");initTab();}
function settingsLoadTabDesktop(args)
{if(typeof args=='undefined')
{action='';subaction='';desktopActionId=desktopId;}
else
{action=(typeof args.action=='undefined')?'':args.action;subaction=(typeof args.subaction=='undefined')?'':args.subaction;desktopActionId=(typeof args.desktop=='undefined')?'':args.desktop;}
$.ajax({url:'/_ajax/settings_load_desktop.php?action='+action+'&subaction='+subaction+'&desktop='+desktopActionId,type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&'+$("#formdesktop input").serialize(),complete:function(){}});}
function settingsLoadDesktopSettings(desktopId){$.ajax({url:'/_ajax/settings_load_desktop_settings.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&changing_desktop_id='+desktopId,complete:function(){}});}
function settingsLoadTabAccount()
{settingsLoadTabAccountProfile();settingsLoadTabAccountPassword();}
function settingsLoadTabAccountProfile(args)
{if(typeof args=='undefined')
{action='';subaction='';}
else
{action=(typeof args.action=='undefined')?'':args.action;subaction=(typeof args.subaction=='undefined')?'':args.subaction;}
$.ajax({url:'/_ajax/settings_load_account_profile.php?action='+action,type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&'+$("#formSettingsAccountProfile input").serialize()});}
function settingsLoadTabAccountPassword(args)
{if(typeof args=='undefined')
{action='';subaction='';}
else
{action=(typeof args.action=='undefined')?'':args.action;subaction=(typeof args.subaction=='undefined')?'':args.subaction;}
$.ajax({url:'/_ajax/settings_load_account_password.php?action='+action,type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&'+$("#formSettingsAccountPassword input").serialize()});}
function fillNews()
{$.ajax({url:'/_ajax/news_fill.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows});}
function savePagesSettings(){sourceid=$("input[@name='source']:checked").val();changingDesktopId=$("input[@name='changingDesktopId']").val();$.ajax({url:'/_ajax/settings_save_news.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&newsfeed_source_id='+sourceid+'&changing_desktop_id='+changingDesktopId,complete:function(){loadDesktop(changingDesktopId)}});}
function settingsLoadNewsPagesAndSaveAfter(){sourceid=$("input[@name='source']:checked").val();changingDesktopId=$("input[@name='changingDesktopId']").val();$.ajax({url:'/_ajax/settings_save_news.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&newsfeed_source_id='+sourceid+'&changing_desktop_id='+changingDesktopId,complete:function(){settingsLoadNewsPages();loadDesktop(changingDesktopId);}});}
function settingsLoadNewsPages(){sourceid=$("input[@name='source']:checked").val();$.ajax({url:'/_ajax/settings_load_news_pages.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&sourceid='+sourceid+'&changing_desktop_id='+$("input[@name='changingDesktopId']").val(),complete:function(){}});}
function saveNewsPercentage(percentage){changingDesktopId=$("input[@name='changingDesktopId']").val();$.ajax({url:'/_ajax/settings_save_news.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&percentage='+percentage+'&changing_desktop_id='+changingDesktopId,complete:function(){loadDesktop(changingDesktopId)}});}
function saveNewsSettings(ob){newsfeed_id=ob.getAttribute('name');changingDesktopId=$("input[@name='changingDesktopId']").val();$.ajax({url:'/_ajax/settings_save_news.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&newsfeed_id='+newsfeed_id+'&value='+ob.checked+'&changing_desktop_id='+changingDesktopId,complete:function(){loadDesktop(changingDesktopId)}});}
function logout()
{afterLogout=function()
{document.location.reload();}
$.ajax({url:'/_ajax/logout.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE,complete:afterLogout});}
function loginVerificationResend(userEmail)
{afterResend=function(xhr)
{if(xhr.responseText=='success')
{showAlert({identifier:'formLoginVerificationResend',icon:'ok'});}
else
{showAlert({identifier:xhr.responseText});}}
$.ajax({url:'/_ajax/login_verification_resend.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&username='+userEmail,complete:afterResend});}
function settingsSelectDesktop(desktopid,thisvar){$(".desktop_row").css("background-color","#FFFFFF");$(thisvar.parentNode.parentNode.parentNode).css("background-color","#CCCCCC");settingsLoadDesktopSettings(desktopid);}
function resetNews(){$.ajax({url:'/_ajax/settings_reset_news.php',type:'POST',data:'locale='+LOCALE+'&language='+LANGUAGE+'&changing_desktop_id='+$("input[@name='changingDesktopId']").val()+'&appversion='+APPVERSION,complete:function(){}});}
function deleteAccount()
{afterDeleteAccount=function()
{hideWindow();loadDesktop(0);showAlert({identifier:'userDeleteAccountSuccess',icon:'ok'});}
$.ajax({url:'/_ajax/user_delete_account.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE,complete:afterDeleteAccount});}
function forgotPassword(username)
{afterForgotPassword=function(xhr)
{if(xhr.responseText=='success')
{showAlert({identifier:'userForgotPasswordSuccess',icon:'ok', time_out:3});}
else
{showAlert({content:xhr.responseText});}}
$.ajax({url:'/_ajax/user_forgot_password.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&username='+username,complete:afterForgotPassword});}
function getMessages()
{$.ajax({url:'/_ajax/message_list.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE});}
function openMessage(messageId)
{$.ajax({url:'/_ajax/message_open.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&message='+messageId,complete:showMessage});}
function showMessage()
{$("#messages").hide();$("#message_detail").show();}
function hideMessage()
{$("#message_detail").hide();$("#messages").show();}
function settingsExternalLinksTargetSet(target)
{afterSettingsExternalLinksTargetSet=function(xhr)
{loadDesktop(desktopId);showAlert({identifier:'settingsExternalLinksTargetSetSuccess',icon:'ok'});}
$.ajax({url:'/_ajax/settings_save_external_links_target.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&target='+target,complete:afterSettingsExternalLinksTargetSet});}
function refreshDesktopTimerFunction(){loadDesktop(desktopId);}
function selectNewsFeed(){var newsfeed=$("#newsfeed option:selected").val();$.ajax({url:'/_ajax/save_news_selected_feed.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&newsfeed='+newsfeed+'&desktopid='+desktopId,complete:function(){loadDesktop(desktopId)}});}
function addCustomIconStep(contentType,gotoStep,action)
{if(typeof action=="undefined")action=""; // $(".add_custom_icon_"+contentType+"_step").hide(); 
switch(gotoStep)
{case 1:case'1b':case'1c':$("#add_custom_icon_"+contentType+"_step_"+gotoStep).show();break;case 2:if($("#add_custom_icon_"+contentType+"_url").val().length==0||$("#add_custom_icon_"+contentType+"_url").val()=="http://")
{showAlert({identifier:'formAddCustomErrorNoUrl',icon:'error'}); addCustomIconStep(contentType,1);}
else if(action!='skip_valid_url_check'&&action!='skip_alternative_check'&&action!='force_change_image')
{addCustomIconCheckSymbalooDB(contentType);}
else if(action!='skip_valid_url_check'&&action!='force_change_image')
{formatAndCheckURL(contentType);}
else
{if(action!='force_change_image'&&($("#add_custom_icon_"+contentType+"_image_file_existing").val()!=''||$("#add_custom_icon_"+contentType+"_image_default").val()!="0"))
{addCustomIconStep(contentType,3,action);}
else
{$(".icon_listing_small_selected").removeClass("icon_listing_small_selected");if($("#add_custom_icon_"+contentType+"_image_default").val()!="0")
{$("#add_custom_icon_"+contentType+"_default_"+$("#add_custom_icon_"+contentType+"_image_default").val()).addClass("icon_listing_small_selected");}
$("#add_custom_icon_"+contentType+"_step_"+gotoStep).show();}}
break;case 3:
	// if($("#add_custom_icon_"+contentType+"_image_default").val()=="0"&&$("#add_custom_icon_"+contentType+"_image_file").val()==''&&$("#add_custom_icon_"+contentType+"_image_file_existing").val()=='')
// {showAlert({identifier:'formAddCustomErrorNoImage',icon:'error'}); addCustomIconStep(contentType,2,'skip_alternative_check');} else
if($("#add_custom_icon_"+contentType+"_image_file").val()!=''&&action!='finish'&&action!='dont_post_image')
{$("#add_custom_icon_"+contentType+"_image_default").val("0");$("#add_custom_icon_"+contentType+"_wait").show();$("#add_custom_icon_"+contentType+"_label_visible").attr("checked",false);$("#add_custom_icon_"+contentType+"_example_content_text").html('');$("#form_add_custom_icon_image_"+contentType).submit();}
else if(action!='finish')
{$("#add_custom_icon_"+contentType+"_example").show();if($("#add_custom_icon_"+contentType+"_id").val()=="0"&&$("#add_custom_icon_"+contentType+"_image_default").val()!="0")
{$("#add_custom_icon_"+contentType+"_label_visible").attr("checked",true);}
if($("#add_custom_icon_"+contentType+"_label_visible").attr("checked"))
{$("#add_custom_icon_"+contentType+"_example_content_text").html($("#add_custom_icon_"+contentType+"_label").val()+'<br /><br />');}
if($("#add_custom_icon_"+contentType+"_image_file_existing").val()=='')
{$("#add_custom_icon_"+contentType+"_example_content").css("background-image","url('"+$("#add_custom_icon_"+contentType+"_image_default_filename").val()+"')");}
else
{if($("#add_custom_icon_"+contentType+"_id").val()!="0")
// {filepath='/_img/icon/custom/'+$("#add_custom_icon_"+contentType+"_image_file_existing").val()+'?uniquekey='+Math.random();}
{filepath='/a/icon/def/'+$("#add_custom_icon_"+contentType+"_id").val()+'.gif';}
else
// {filepath="/_ajax/explorer_add_custom_icon_show_image.php?appversion="+APPVERSION+'&uniquekey='+Math.random();}
{ filepath=$("#add_custom_icon_"+contentType+"_image_file_existing").val; }
$("#add_custom_icon_"+contentType+"_example_content").css("background-image","url('"+filepath+"')");}
$("#add_custom_icon_"+contentType+"_step_"+gotoStep).show(); // $("#add_custom_icon_"+contentType+"_label").focus();
}else{$("#add_custom_icon_"+contentType+"_wait").show();$("#form_add_custom_icon_"+contentType).submit();}
break;}}
function submitAddCustomIconForm()
{$(this).ajaxSubmit({url:'/_ajax/explorer_add_custom_icon.php?appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&notify_webmaster=1',type:'post',complete:function(xhr)
{result=$("result",xhr.responseXML).text();contentType=$("content_type",xhr.responseXML).text();iconId=$("id",xhr.responseXML).text()
refreshDesktop=$("refresh_desktop",xhr.responseXML).text();$(".add_custom_icon_wait").hide();if(result=="success")
{if($("#add_custom_icon_"+contentType+"_id").val()=="0")
{modifyDesktop(0,iconId);showAlert({identifier:'addCustomIconSuccess',icon:'ok', time_out:3});hideWindow();}
else
{modifyDesktop(0, iconId); showAlert({identifier:'editCustomIconSuccess',icon:'ok', time_out:3}); hideWindow(); }}
else
{showAlert({content:result});}},
 beforeSubmit:	function(formData, jqForm, options){ 
// if ($('input[@name=add_custom_icon_links_label]').fieldValue() == ''){showAlert({ content: '必须填写网址名字' });return false;}
// if ($('input[@name=add_custom_icon_links_url]').fieldValue() == 'http://'){showAlert({ content: '必须填写URL地址' });return false;}
}});return false;}
function submitAddCustomIconUploadImageForm()
{$(this).ajaxSubmit({url:'/_ajax/explorer_add_icon_upload_image.php?appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE,type:'post',timeout:90000,complete:function(xhr)
{if(xhr.responseXML==null)
{$("#add_custom_icon_"+explorerLastTab+"_wait").hide();showAlert({identifier:'formAddMenuErrorUploadTimeout'}); 
// addCustomIconStep(explorerLastTab,2,'force_change_image');
}
else
{result=$("result",xhr.responseXML).text();contentType=$("content_type",xhr.responseXML).text();imageFilePath=$("image_file_path",xhr.responseXML).text(); returnMessage=$("return_message",xhr.responseXML).text(); leonUploadIconId=$("id",xhr.responseXML).text(); $("#add_custom_icon_"+contentType+"_wait").hide();if(result=="success")
{$("#add_custom_icon_"+contentType+"_image_file_existing").val(imageFilePath); $("#add_custom_icon_"+contentType+"_upload_icon_id").val(leonUploadIconId); $("#add_custom_icon_"+contentType+"_upload_icon_id2").val(leonUploadIconId); 
// addCustomIconStep(contentType,3,'dont_post_image');
$("#add_custom_icon_"+contentType+"_example_content").css("background-image","url('"+imageFilePath+"?key="+Math.random()+"')");
}
else
{showAlert({identifier:returnMessage});
// addCustomIconStep(contentType,2,'force_change_image');
}}}});return false;}
function getIconCategories(iconType,contentType,categoryId,showInternational,indent)
{$.ajax({url:'/_ajax/explorer_load_category.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&icon_type='+iconType+'&content_type='+contentType+'&category_id='+categoryId+'&show_international='+showInternational+'&indent='+indent+'&desktop_content='+desktopContent.join('|'),complete:function()
{var explorerHistoryTemp=explorerHistoryCurrentTab.slice();for(var index=0;index<explorerHistoryTemp.length;index++)
{targetGroup=$("#explorer_"+contentType+"_category_"+explorerHistoryTemp[index]);if(targetGroup.get().length==1&&!targetGroup.is(".node_main_open"))
{explorerHistoryCurrentTab.removeItems(explorerHistoryTemp[index]);targetGroup.click();}}}});}
function openDesktop(desktopId){$('.bar_menu_item_selected').removeClass('bar_menu_item_selected');$('#desktop_link_'+desktopId).addClass('bar_menu_item_selected');loadDesktop(desktopId);}
function loadChat(name)
{var outputChat="";outputChat+='<html><head>';outputChat+='<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';outputChat+='<link rel="stylesheet" href="/_css/symbaloo.popup.css" type="text/css" />';outputChat+='<title>Symbaloo Chat</title>';outputChat+='</head><body style="padding: 10px;">';outputChat+='<div align="center">';switch(name)
{case"press_chat_eduard":outputChat+='<!-- Beginning of meebo me widget code. Want to talk with visitors on your page? Go to http://www.meebome.com/ and get your widget! --><embed src="http://widget.meebo.com/mm.swf?MUclfMuuRD" type="application/x-shockwave-flash" wmode="transparent" width="400" height="300"></embed>';break;case"press_chat_steven":outputChat+='<!-- Beginning of meebo me widget code. Want to talk with visitors on your page? Go to http://www.meebome.com/ and get your widget! --><embed src="http://widget.meebo.com/mm.swf?KEaVNYgHyT" type="application/x-shockwave-flash" wmode="transparent" width="400" height="300"></embed>';break;case"press_chat_koen":outputChat+='<!-- Beginning of meebo me widget code. Want to talk with visitors on your page? Go to http://www.meebome.com/ and get your widget! --><embed src="http://widget.meebo.com/mm.swf?DszaohYrgK" type="application/x-shockwave-flash" wmode="transparent" width="400" height="300"></embed>';break;case"press_chat_tim":outputChat+='<!-- Beginning of meebo me widget code. Want to talk with visitors on your page? Go to http://www.meebome.com/ and get your widget! --><embed src="http://widget.meebo.com/mm.swf?rMjGdwhSFi" type="application/x-shockwave-flash" wmode="transparent" width="400" height="300"></embed>';break;}
outputChat+='</div>';outputChat+='</body></html>';chatWindow=window.open('',name,'width=420, height=320, resizable=1, scrollbars=0, titlebar=0, toolbar=0, menubar=0, status=0, directories=0');chatWindow.focus();chatWindow.document.writeln(outputChat);chatWindow.document.close();}
function iconAdd(iconId,contentType)
{if($("#node_sub_"+iconId+" .iconDeleteIcon").css("text-decoration")=="underline")
{deleteCustomIcon(iconId,contentType);}
else
{modifyDesktop(0,iconId);hideWindow();}}
function deleteDesktop()
{$.ajax({url:'/_ajax/desktop_delete.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId});}
function getLanguages()
{$.ajax({url:'/_ajax/settings_languages_load.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE,complete:function(xhr)
{$("#languages").html(xhr.responseText);}});}
function setLanguage(language)
{$.ajax({url:'/_ajax/language_save.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+language,complete:function(xhr)
{document.location.reload();}});}
function getResolutions()
{$.ajax({url:'/_ajax/desktop_resolution_load.php',type:'POST',data:'appversion='+APPVERSION+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows});}
function modifyResolution(diffCols,diffRows)
{$("#change_dimension_buttons a").hide();$("#definedResolutions a").hide();modifyResolutionButtonsShow=function()
{getResolutions();$("#definedResolutions a").show();$("#change_dimension_buttons a").show();}
ajaxCall({url:'/_ajax/desktop_resolution_modify.php',type:'POST',data:'desktop_id='+desktopId+'&desktop_content='+desktopContent.join('|')+'&desktop_cols='+desktopCols+'&desktop_rows='+desktopRows+'&diff_cols='+diffCols+'&diff_rows='+diffRows,complete:modifyResolutionButtonsShow});}
function resetSymbaloo(resetType)
{$.ajax({url:'/_ajax/reset.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&reset_type='+resetType,complete:function(xhr)
{if(resetType=='soft')
{alert('not yet implemented');hideWindow();}
else
{document.location.reload();}}});}
var beforeSubmit,afterSubmit;function loadSearchModule(iconId)
{$.ajax({url:"/_ajax/search_module_load.php",type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId+'&search_module='+iconId});}
function loadSearchSource(searchId)
{$.ajax({url:"/_ajax/search_source_get_version.php",type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&desktop_id='+desktopId+'&search_source='+searchId,complete:function(xhr)
{$.ajax({url:"/_ajax/"+xhr.responseText,type:'POST',data:'appversion='+APPVERSION});},error:function()
{$("#boxmain .boxcontent").html("");}});}
function togglePrevalue(fieldElement,textPrevalue,event)
{if(event=='focus')
{if(fieldElement.val()==textPrevalue&&fieldElement.is(".search_prevalue"))
{fieldElement.val("").removeClass("search_prevalue");}}
else
{if(fieldElement.val()=="")
{fieldElement.val(textPrevalue).addClass("search_prevalue");}}}
function toggleSearchExtraDropdown()
{if($("#window").css("display")=="none")
{windowTop=$("#boxmain").offset().top+$("#boxmain").height()-30;windowLeft=$("#boxmain").offset().left-30;windowWidth=$("#boxmain").width()-100;showWindow('source_dropdown',{shiftup:true,dimensionType:'pixel',top:windowTop,left:windowLeft,width:windowWidth});}
else
{hideWindow();}}
function performSearch(searchTarget)
{if($("#searchtext").val()!=null&&($("#searchtext").val()==''||$("#searchtext").is(".search_prevalue")))
{showAlert({identifier:'errorNoSearchQuery'});return false;}
else
{var dontSubmit=false;var formUrl=$("#search_form").attr("action");$(".dontsubmit").attr("disabled",true);$(".search_prevalue").attr("disabled",true);if(beforeSubmit.length>0)
{for(var i=0,j=beforeSubmit.length;i<j;i++)
{if(typeof beforeSubmit[i]=='function')
{beforeSubmit[i]();}
else
{eval(beforeSubmit[i]);}}}
if(formUrl.indexOf('?')>-1&&$("#search_form").attr("method")=="get")
{dontSubmit=true;$("#search_form input, #search_form select, #search_form textarea").each(function()
{if(!$(this).attr("disabled")&&$(this).attr("name")!=undefined)
{formUrl+='&'+$(this).attr("name")+'='+$(this).val();}});}
if($("#url_rewrite").val()=="1")
{dontSubmit=true;$("#search_form input, #search_form select, #search_form textarea").each(function()
{if(!$(this).attr("disabled")&&$(this).attr("name")!=undefined)
{if(formUrl.indexOf('%'+$(this).attr("name")+'%')>-1)
{eval('formUrl = formUrl.replace(/%'+$(this).attr("name")+'%/g, $(this).val());');}}});}
if($("#search_form").attr("aff_action")!=null)
{var action=$("#search_form").attr("action");var actualUrl=$("#search_form").attr("action")+"?"+$("#search_form").formSerialize();var url=$("#search_form").attr("aff_action");url=url.replace("%FORWARD_URL%",Url.encode(actualUrl));formUrl=url;dontSubmit=true;}
// window.alert(formUrl);
if(dontSubmit)
{if(searchTarget=='_parent')
{window.location=formUrl;}
else
{window.open(formUrl,'');}}
if(afterSubmit.length>0)
{for(var i=0,j=afterSubmit.length;i<j;i++)
{if(typeof afterSubmit[i]=='function')
{afterSubmit[i]();}
else
{eval(afterSubmit[i]);}}}
$(".dontsubmit").attr("disabled",false);$(".search_prevalue").attr("disabled",false);trackSubmit();return!dontSubmit;}}
function fillSelectDep(fieldId,optionValue,selectId)
{$.ajax({url:'/_ajax/search_select_dep_load.php',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&field_id='+fieldId+"&option_value="+optionValue,complete:function(xhr)
{insertSelectOptions(selectId,$("include_file",xhr.responseXML).text());}});}
function trackSubmit() {}
// {var affiliate_program_id=$("#search_form").attr("affiliate_program_id");$.ajax({url:'/_ajax/search_submit_stats.php',type:'POST',data:'appversion='+APPVERSION+'&locale='+LOCALE+'&language='+LANGUAGE+'&search_source='+currentSearchSource+(affiliate_program_id==undefined?"":'&affiliate_program_id='+affiliate_program_id)});}
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return"";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

var menuBarScrollStep=4;var menuBarScrollJumpStep=60;var menuBarScrollSpeed=20;var menuBarScrollCurrent=0;var menuBarScrollTimeout;
function menuBarInit()
{var width=0;clearTimeout(menuBarScrollTimeout);$(".bar_menu_item").each(function()
{width+=$(this).width()+15;});width+=$("#desktop_bar_selected_container").width()+3;  $("#bar_menu_item_layer").css("width",width+'px');
width_used=0;width_used+=26;width_used+=40;width_used+=3;
$("#bar_menu_item_container").css("width",(600-width_used)+"px");
if(menuBarScrollCurrent>0)
{menuBarScrollCurrent+=menuBarScrollStep;}
$("#bar_menu_item_container").scrollLeft(menuBarScrollCurrent);
if(width>$("#bar_menu_item_container").width())
{$(".move_button_cell").show();} // $("#desktop_bar_right_end").hide();
else
{$(".move_button_cell").hide();}} // $("#desktop_bar_right_end").show();
function menuBarScroll(direction)
{var scrollJump=$("#bar_menu_item_container").scrollLeft();if(typeof direction=='undefined')direction=0;menuBarScrollCurrent=(direction==1)?scrollJump+menuBarScrollStep:scrollJump-menuBarScrollStep;if(direction==0)
{clearTimeout(menuBarScrollTimeout);}
else
{$("#bar_menu_item_container").scrollLeft(menuBarScrollCurrent);menuBarScrollTimeout=setTimeout(function(){menuBarScroll(direction);},menuBarScrollSpeed);}}
function menuBarScrollJump(direction)
{var scrollJump=$("#bar_menu_item_container").scrollLeft();if(typeof direction=='undefined')direction=0;menuBarScrollCurrent=(direction==1)?scrollJump+menuBarScrollJumpStep:scrollJump-menuBarScrollJumpStep;$("#bar_menu_item_container").scrollLeft(menuBarScrollCurrent);}
function menuBarScrollJumpToItem(previousMenuItems)
{if(previousMenuItems.length==0)
{scrollJump=0;}
else
{var menuItems=previousMenuItems.split(",");var scrollJump=0;for(var i=0,j=menuItems.length;i<j;i++)
{scrollJump+=$("#desktop_link_"+menuItems[i]).width()+13;}
scrollJump-=50;}
$("#bar_menu_item_container").scrollLeft(scrollJump);menuBarScrollCurrent=scrollJump;}

function showMenuDropdown()
{if(!hideDropdownAfterClick)
{clearTimeout(dropdownTimer);dropdownTimer=false;if($("#menu_dropdown").css("display")=="none")
{dropdownTop=$("#desktop_bar_selected_container").offset().top+20;dropdownLeft=$("#desktop_bar_selected_container").offset().left;if($(".move_button_cell").css("display")!="none"&&dropdownLeft<($("#desktop_move_left_button").offset().left+20))
{dropdownLeft=($("#desktop_move_left_button").offset().left+20);}
$("#menu_dropdown").css("top",dropdownTop).css("left",dropdownLeft);$("#menu_dropdown").show();}}
else
hideDropdownAfterClick=false;}
function hideMenuDropdown(now)
{if(!dropdownTimer&&typeof now=="undefined")
{dropdownTimer=setTimeout('$("#menu_dropdown").hide();',300);}
else if(typeof now!="undefined")
{$("#menu_dropdown").hide()}}
