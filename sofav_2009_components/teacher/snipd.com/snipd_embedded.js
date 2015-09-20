(function(){var prototype___iter__=null,prototype_toJSONString=null;var sanitizePrototype=function(){prototype___iter__=Object.prototype.__iter__;delete Object.prototype.__iter__;prototype_toJSONString=Object.prototype.toJSONString;delete Object.prototype.toJSONString;};var revertPrototype=function(){Object.prototype.__iter__=prototype___iter__;Object.prototype.toJSONString=prototype_toJSONString;};sanitizePrototype();if(window.jQuery)
var _jQuery=window.jQuery;var jQuery=window.jQuery=function(selector,context){return new jQuery.prototype.init(selector,context);};if(window.$)
var _$=window.$;window.$=jQuery;var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;var isSimple=/^.[^:#\[\.]*$/;jQuery.fn=jQuery.prototype={prototype___iter__:null,prototype_toJSONString:null,sanitizePrototype:sanitizePrototype,revertPrototype:revertPrototype,init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this;}else if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])
selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem)
if(elem.id!=match[3]){var val=jQuery().find(selector);return val;}
else{this[0]=elem;this.length=1;return this;}
else
selector=[];}}else{var val=new jQuery(context).find(selector);return val;}}else if(jQuery.isFunction(selector)){var val=new jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return val;}
var val=this.setArray(selector.constructor==Array&&selector||(selector.jquery||selector.length&&selector!=window&&!selector.nodeType&&selector[0]!=undefined&&selector[0].nodeType)&&jQuery.makeArray(selector)||[selector]);return val;},jquery:"1.2.4",size:function(){return this.length;},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num];},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret;},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this;},each:function(callback,args){return jQuery.each(this,callback,args);},index:function(elem){var ret=-1;this.each(function(i){if(this==elem)
ret=i;});return ret;},attr:function(name,value,type){var options=name;if(name.constructor==String)
if(value==undefined)
return this.length&&jQuery[type||"attr"](this[0],name)||undefined;else{options={};options[name]=value;}
return this.each(function(i){for(name in options)
jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name));});},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)
value=undefined;return this.attr(key,value,"curCSS");},text:function(text){if(typeof text!="object"&&text!=null)
return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)
ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);});});return ret;},wrapAll:function(html){if(this[0])
jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)
elem=elem.firstChild;return elem;}).append(this);return this;},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html);});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)
this.appendChild(elem);});},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)
this.insertBefore(elem,this.firstChild);});},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this);});},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});},end:function(){return this.prevObject||jQuery([]);},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem);});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems);},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0];}else
return this.cloneNode(true);});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)
this[expando]=null;});if(events===true)
this.find("*").andSelf().each(function(i){if(this.nodeType==3)
return;var events=jQuery.data(this,"events");for(var type in events)
for(var handler in events[type])
jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data);});return ret;},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i);})||jQuery.multiFilter(selector,this));},not:function(selector){if(selector.constructor==String)
if(isSimple.test(selector))
return this.pushStack(jQuery.multiFilter(selector,this,true));else
selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector;});},add:function(selector){return!selector?this:this.pushStack(jQuery.merge(this.get(),selector.constructor==String?jQuery(selector).get():selector.length!=undefined&&(!selector.nodeName||jQuery.nodeName(selector,"form"))?selector:[selector]));},is:function(selector){return selector?jQuery.multiFilter(selector,this).length>0:false;},hasClass:function(selector){return this.is("."+selector);},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)
return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)
return value;values.push(value);}}
return values;}else
return(this[0].value||"").replace(/\r/g,"");}
return undefined;}
return this.each(function(){if(this.nodeType!=1)
return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))
this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=value.constructor==Array?value:[value];jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0);});if(!values.length)
this.selectedIndex=-1;}else
this.value=value;});},html:function(value){return value==undefined?(this.length?this[0].innerHTML:null):this.empty().append(value);},replaceWith:function(value){return this.after(value).remove();},eq:function(i){return this.slice(i,i+1);},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},andSelf:function(){return this.add(this.prevObject);},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value==null){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data==undefined&&this.length)
data=jQuery.data(this[0],key);return data==null&&parts[1]?this.data(parts[0]):data;}else
return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value);});},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)
elems.reverse();}
var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))
obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem);}else{if(elem.nodeType==1)
scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem);}});scripts.each(evalScript);});}};jQuery.prototype.init.prototype=jQuery.prototype;function evalScript(i,elem){if(elem.src)
jQuery.ajax({url:elem.src,async:false,dataType:"script"});else
jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)
elem.parentNode.removeChild(elem);}
jQuery.snipd_extend=jQuery.fn.snipd_extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!="object"&&typeof target!="function")
target={};if(length==1){target=this;i=0;}
for(;i<length;i++)
if((options=arguments[i])!=null)
for(var name in options){if(target===options[name])
continue;if(deep&&options[name]&&typeof options[name]=="object"&&target[name]&&!options[name].nodeType)
target[name]=jQuery.snipd_extend(deep,target[name],options[name]);else if(options[name]!=undefined)
target[name]=options[name];}
return target;};var expando="jQuery"+(new Date()).getTime(),uuid=0,windowData={};var exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i;jQuery.snipd_extend({noConflict:function(deep){window.$=_$;if(deep)
window.jQuery=_jQuery;return jQuery;},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/function/i.test(fn+"");},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body;},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)
script.text=data;else
script.appendChild(document.createTextNode(data));head.appendChild(script);head.removeChild(script);}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)
id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])
jQuery.cache[id]={};if(data!=undefined)
jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id;},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])
break;if(!name)
jQuery.removeData(elem);}}else{try{delete elem[expando];}catch(e){if(elem.removeAttribute)
elem.removeAttribute(expando);}
delete jQuery.cache[id];}},each:function(object,callback,args){var ignore_prototype_property=function(prop){if(prop){return prop.__iter__;}else{return false;}};if(args){if(object.length==undefined){for(var name in object){if(!ignore_prototype_property(object[name])){if(callback.apply(object[name],args)===false)
break;}}}else
for(var i=0,length=object.length;i<length;i++){if(!ignore_prototype_property(object[i])){if(callback.apply(object[i],args)===false)
break;}}}else{if(object.length==undefined){for(var name in object){if(!ignore_prototype_property(object[name])){if(callback.call(object[name],name,object[name])===false)
break;}}}else{for(var i=0,length=object.length,value=object[0];i<length;){if(!ignore_prototype_property(value)){if(callback.call(value,i,value)===false){break;}}
value=object[++i];}}}
return object;},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))
value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value;},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))
elem.className+=(elem.className?" ":"")+className;});},remove:function(elem,classNames){if(elem.nodeType==1)
elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className);}).join(" "):"";},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1;}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}
callback.call(elem);for(var name in options)
elem.style[name]=old[name];},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0;});val-=Math.round(padding+border);}
if(jQuery(elem).is(":visible"))
getWH();else
jQuery.swap(elem,props,getWH);return Math.max(0,val);}
return jQuery.curCSS(elem,name,force);},curCSS:function(elem,name,force){var ret;function color(elem){if(!jQuery.browser.safari)
return false;var ret=document.defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")=="";}
if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(elem.style,"opacity");return ret==""?"1":ret;}
if(jQuery.browser.opera&&name=="display"){var save=elem.style.outline;elem.style.outline="0 solid black";elem.style.outline=save;}
if(name.match(/float/i))
name=styleFloat;if(!force&&elem.style&&elem.style[name])
ret=elem.style[name];else if(document.defaultView&&document.defaultView.getComputedStyle){if(name.match(/float/i))
name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var getComputedStyle=document.defaultView.getComputedStyle(elem,null);if(getComputedStyle&&!color(elem))
ret=getComputedStyle.getPropertyValue(name);else{var swap=[],stack=[];for(var a=elem;a&&color(a);a=a.parentNode)
stack.unshift(a);for(var i=0;i<stack.length;i++)
if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block";}
ret=name=="display"&&swap[stack.length-1]!=null?"none":(getComputedStyle&&getComputedStyle.getPropertyValue(name))||"";for(var i=0;i<swap.length;i++)
if(swap[i]!=null)
stack[i].style.display=swap[i];}
if(name=="opacity"&&ret=="")
ret="1";}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase();});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var style=elem.style.left,runtimeStyle=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;elem.style.left=ret||0;ret=elem.style.pixelLeft+"px";elem.style.left=style;elem.runtimeStyle.left=runtimeStyle;}}
return ret;},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')
context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)
return;if(elem.constructor==Number)
elem=elem.toString();if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">";});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)
div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)
if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)
tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))
div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild);}
elem=jQuery.makeArray(div.childNodes);}
if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))
return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)
ret.push(elem);else
ret=jQuery.merge(ret,elem);});return ret;},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)
return undefined;var fix=jQuery.isXMLDoc(elem)?{}:jQuery.props;if(name=="selected"&&jQuery.browser.safari)
elem.parentNode.selectedIndex;if(fix[name]){if(value!=undefined)
elem[fix[name]]=value;return elem[fix[name]];}else if(jQuery.browser.msie&&name=="style")
return jQuery.attr(elem.style,"cssText",value);else if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method"))
return elem.getAttributeNode(name).nodeValue;else if(elem.tagName){if(value!=undefined){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)
throw"type property can't be changed";elem.setAttribute(name,""+value);}
if(jQuery.browser.msie&&/href|src/.test(name)&&!jQuery.isXMLDoc(elem))
return elem.getAttribute(name,2);return elem.getAttribute(name);}else{if(name=="opacity"&&jQuery.browser.msie){if(value!=undefined){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+
(parseFloat(value).toString()=="NaN"?"":"alpha(opacity="+value*100+")");}
return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100).toString():"";}
name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase();});if(value!=undefined)
elem[name]=value;return elem[name];}},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"");},makeArray:function(array){var ret=[];if(array.constructor!=Array)
for(var i=0,length=array.length;i<length;i++)
ret.push(array[i]);else
ret=array.slice(0);return ret;},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)
if(array[i]==elem)
return i;return-1;},merge:function(first,second){if(jQuery.browser.msie){for(var i=0;second[i];i++)
if(second[i].nodeType!=8)
first.push(second[i]);}else
for(var i=0;second[i];i++)
first.push(second[i]);return first;},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i]);}}}catch(e){ret=array;}
return ret;},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)
if(!inv&&callback(elems[i],i)||inv&&!callback(elems[i],i))
ret.push(elems[i]);return ret;},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!==null&&value!=undefined){if(value.constructor!=Array)
value=[value];ret=ret.concat(value);}}
return ret;}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.snipd_extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected",maxlength:"maxLength",selectedIndex:"selectedIndex",defaultValue:"defaultValue",tagName:"tagName",nodeName:"nodeName"}});jQuery.each({parent:function(elem){return elem.parentNode;},parents:function(elem){return jQuery.dir(elem,"parentNode");},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")
ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret));};});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)
jQuery(args[i])[original](this);});};});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)
this.removeAttribute(name);},addClass:function(classNames){jQuery.className.add(this,classNames);},removeClass:function(classNames){jQuery.className.remove(this,classNames);},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames);},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this);});if(this.parentNode)
this.parentNode.removeChild(this);}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)
this.removeChild(this.firstChild);}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments);};});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px");};});var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.snipd_extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2]);},"#":function(a,i,m){return a.getAttribute("id")==m[2];},":":{lt:function(a,i,m){return i<m[3]-0;},gt:function(a,i,m){return i>m[3]-0;},nth:function(a,i,m){return m[3]-0==i;},eq:function(a,i,m){return m[3]-0==i;},first:function(a,i){return i==0;},last:function(a,i,m,r){return i==r.length-1;},even:function(a,i){return i%2==0;},odd:function(a,i){return i%2;},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a;},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a;},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling");},parent:function(a){return a.firstChild;},empty:function(a){return!a.firstChild;},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0;},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden";},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden";},enabled:function(a){return!a.disabled;},disabled:function(a){return a.disabled;},checked:function(a){return a.checked;},selected:function(a){return a.selected||jQuery.attr(a,"selected");},text:function(a){return"text"==a.type;},radio:function(a){return"radio"==a.type;},checkbox:function(a){return"checkbox"==a.type;},file:function(a){return"file"==a.type;},password:function(a){return"password"==a.type;},submit:function(a){return"submit"==a.type;},image:function(a){return"image"==a.type;},reset:function(a){return"reset"==a.type;},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button");},input:function(a){return/input|select|textarea|button/i.test(a.nodeName);},has:function(a,i,m){return jQuery.find(m[3],a).length;},header:function(a){return/h\d/i.test(a.nodeName);},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem;}).length;}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r);}
return cur;},find:function(t,context){if(typeof t!="string")
return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)
return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false;var re=quickChild;var m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)
for(var c=ret[i].firstChild;c;c=c.nextSibling)
if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))
r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true;}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)
if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n);}
if(m=="+")break;}}
ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true;}}
if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length);}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]];}else{re2=quickClass;m=re2.exec(t);}
m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])
oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")
tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag));}
if(m[1]==".")
r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)
if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break;}
r=tmp;}
ret=r;}
t=t.replace(re2,"");}}
if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t);}}
if(t)
ret=[];if(ret&&context==ret[0])
ret.shift();done=jQuery.merge(done,ret);return done;},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)
tmp.push(r[i]);}
return tmp;},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break;}}
if(!m)
break;if(m[1]==":"&&m[2]=="not")
r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")
r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))
z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)
tmp.push(a);}
r=tmp;}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)
if(n.nodeType==1)
n.nodeIndex=c++;merge[id]=true;}
var add=false;if(first==0){if(node.nodeIndex==last)
add=true;}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)
add=true;if(add^not)
tmp.push(node);}
r=tmp;}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")
fn=fn[m[2]];if(typeof fn=="string")
fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r);},not);}}
return{r:r,t:t};},dir:function(elem,dir){var matched=[];var cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)
matched.push(cur);cur=cur[dir];}
return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])
if(cur.nodeType==1&&++num==result)
break;return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&(!elem||n!=elem))
r.push(n);}
return r;}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)
return;if(jQuery.browser.msie&&elem.setInterval!=undefined)
elem=window;if(!handler.guid)
handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=function(){return fn.apply(this,arguments);};handler.data=data;handler.guid=fn.guid;}
var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){var val;if(typeof jQuery=="undefined"||jQuery.event.triggered)
return val;val=jQuery.event.handle.apply(arguments.callee.elem,arguments);return val;});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)
elem.addEventListener(type,handle,false);else if(elem.attachEvent)
elem.attachEvent("on"+type,handle);}}
handlers[handler.guid]=handler;jQuery.event.global[type]=true;});elem=null;},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)
return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))
for(var type in events)
this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type;}
jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)
delete events[type][handler.guid];else
for(handler in events[type])
if(!parts[1]||events[type][handler].type==parts[1])
delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)
elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)
elem.detachEvent("on"+type,jQuery.data(elem,"handle"));}
ret=null;delete events[type];}}});}
for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle");}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data||[]);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true;}
if(!elem){if(this.global[type])
jQuery("*").add([window,document]).trigger(type,data);}else{if(elem.nodeType==3||elem.nodeType==8)
return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event)
data.unshift(this.fix({type:type,target:elem}));data[0].type=type;if(exclusive)
data[0].exclusive=true;if(jQuery.isFunction(jQuery.data(elem,"handle")))
val=jQuery.data(elem,"handle").apply(elem,data);if(!fn&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)
val=false;if(event)
data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)
val=ret;}
if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]();}catch(e){}}
this.triggered=false;}
return val;},handle:function(event){var val;event=jQuery.event.fix(event||window.event||{});var parts=event.type.split(".");event.type=parts[0];var handlers=jQuery.data(this,"events")&&jQuery.data(this,"events")[event.type],args=Array.prototype.slice.call(arguments,1);args.unshift(event);for(var j in handlers){var handler=handlers[j];args[0].handler=handler;args[0].data=handler.data;if(!parts[1]&&!event.exclusive||handler.type==parts[1]){var ret=handler.apply(this,args);if(val!==false)
val=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}
if(jQuery.browser.msie)
event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null;return val;},fix:function(event){var originalEvent=event;event=jQuery.snipd_extend({},originalEvent);event.preventDefault=function(){if(originalEvent.preventDefault)
originalEvent.preventDefault();originalEvent.returnValue=false;};event.stopPropagation=function(){if(originalEvent.stopPropagation)
originalEvent.stopPropagation();originalEvent.cancelBubble=true;};if(!event.target)
event.target=event.srcElement||document;if(event.target.nodeType==3)
event.target=originalEvent.target.parentNode;if(!event.relatedTarget&&event.fromElement)
event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);}
if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))
event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)
event.metaKey=event.ctrlKey;if(!event.which&&event.button)
event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event;},special:{ready:{setup:function(){bindReady();return;},teardown:function(){return;}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true;},handler:function(event){if(withinElement(event,this))return true;arguments[0].type="mouseenter";return jQuery.event.handle.apply(this,arguments);}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true;},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true;},handler:function(event){if(withinElement(event,this))return true;arguments[0].type="mouseleave";return jQuery.event.handle.apply(this,arguments);}}}};jQuery.fn.snipd_extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data);});},one:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,function(event){jQuery(this).unbind(event);return(fn||data).apply(this,arguments);},fn&&data);});},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn);});},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn);});},triggerHandler:function(type,data,fn){if(this[0])
return jQuery.event.trigger(type,data,this[0],false,fn);return undefined;},toggle:function(){var args=arguments;return this.click(function(event){this.lastToggle=0==this.lastToggle?1:0;event.preventDefault();return args[this.lastToggle].apply(this,arguments)||false;});},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut);},ready:function(fn){bindReady();if(jQuery.isReady)
fn.call(document,jQuery);else
jQuery.readyList.push(function(){return fn.call(this,jQuery);});return this;}});jQuery.snipd_extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.apply(document);});jQuery.readyList=null;}
jQuery(document).triggerHandler("ready");}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)
document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}
jQuery.ready();})();if(jQuery.browser.opera)
document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)
if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}
jQuery.ready();},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}
if(numStyles===undefined)
numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}
jQuery.ready();})();}
jQuery.event.add(window,"load",jQuery.ready);}
jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode;}catch(error){parent=elem;}
return parent==elem;};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind();});jQuery.fn.snipd_extend({load:function(url,params,callback){if(jQuery.isFunction(url))
return this.bind("load",url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
callback=callback||function(){};var type="GET";if(params)
if(jQuery.isFunction(params)){callback=params;params=null;}else{params=jQuery.param(params);type="POST";}
var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")
self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res]);}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val};}):{name:elem.name,value:val};}).get();}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});var jsc=(new Date).getTime();jQuery.snipd_extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null;}
return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type});},getScript:function(url,callback){return jQuery.get(url,null,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={};}
return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type});},ajaxSetup:function(settings){jQuery.snipd_extend(jQuery.ajaxSettings,settings);},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){var jsonp,jsre=/=\?(&|$)/g,status,data;s=jQuery.snipd_extend(true,s,jQuery.snipd_extend(true,{},jQuery.ajaxSettings,s));if(s.data&&s.processData&&typeof s.data!="string")
s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(s.type.toLowerCase()=="get"){if(!s.url.match(jsre))
s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?";}else if(!s.data||!s.data.match(jsre))
s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json";}
if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)
s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp];}catch(e){}
if(head)
head.removeChild(script);};}
if(s.dataType=="script"&&s.cache==null)
s.cache=false;if(s.cache===false&&s.type.toLowerCase()=="get"){var ts=(new Date()).getTime();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"");}
if(s.data&&s.type.toLowerCase()=="get"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null;}
if(s.global&&!jQuery.active++)
jQuery.event.trigger("ajaxStart");if((!s.url.indexOf("http")||!s.url.indexOf("//"))&&s.dataType=="script"&&s.type.toLowerCase()=="get"){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)
script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script);}};}
head.appendChild(script);return undefined;}
var requestDone=false;var xml=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();xml.open(s.type,s.url,s.async,s.username,s.password);try{if(s.data)
xml.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)
xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xml.setRequestHeader("X-Requested-With","XMLHttpRequest");xml.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default);}catch(e){}
if(s.beforeSend)
s.beforeSend(xml);if(s.global)
jQuery.event.trigger("ajaxSend",[xml,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xml&&(xml.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null;}
status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xml)&&"error"||s.ifModified&&jQuery.httpNotModified(xml,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xml,s.dataType);}catch(e){status="parsererror";}}
if(status=="success"){var modRes;try{modRes=xml.getResponseHeader("Last-Modified");}catch(e){}
if(s.ifModified&&modRes)
jQuery.lastModified[s.url]=modRes;if(!jsonp)
success();}else
jQuery.handleError(s,xml,status);complete();if(s.async)
xml=null;}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)
setTimeout(function(){if(xml){xml.abort();if(!requestDone)
onreadystatechange("timeout");}},s.timeout);}
try{xml.send(s.data);}catch(e){jQuery.handleError(s,xml,null,e);}
if(!s.async)
onreadystatechange();function success(){if(s.success)
s.success(data,status);if(s.global)
jQuery.event.trigger("ajaxSuccess",[xml,s]);}
function complete(){if(s.complete)
s.complete(xml,status);if(s.global)
jQuery.event.trigger("ajaxComplete",[xml,s]);if(s.global&&!--jQuery.active)
jQuery.event.trigger("ajaxStop");}
return xml;},handleError:function(s,xml,status,e){if(s.error)s.error(xml,status,e);if(s.global)
jQuery.event.trigger("ajaxError",[xml,s,e]);},active:0,httpSuccess:function(r){try{return!r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||r.status==1223||jQuery.browser.safari&&r.status==undefined;}catch(e){}
return false;},httpNotModified:function(xml,url){try{var xmlRes=xml.getResponseHeader("Last-Modified");return xml.status==304||xmlRes==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined;}catch(e){}
return false;},httpData:function(r,type){var ct=r.getResponseHeader("content-type");var xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0;var data=xml?r.responseXML:r.responseText;if(xml&&data.documentElement.tagName=="parsererror")
throw"parsererror";if(type=="script")
jQuery.globalEval(data);if(type=="json")
data=eval("("+data+")");return data;},param:function(a){var s=[];if(a.constructor==Array||a.jquery)
jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));});else
for(var j in a)
if(a[j]&&a[j].constructor==Array)
jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));});else
s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]));return s.join("&").replace(/%20/g,"+");}});jQuery.fn.snipd_extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")
this.style.display="block";elem.remove();}}).end();},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none";}).end();},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]();});},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback);},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback);},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback);},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback);},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback);},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)
return false;var opt=jQuery.snipd_extend({},optall);var hidden=jQuery(this).is(":hidden"),self=this;for(var p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)
return jQuery.isFunction(opt.complete)&&opt.complete.apply(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow;}}
if(opt.overflow!=null)
this.style.overflow="hidden";opt.curAnim=jQuery.snipd_extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))
e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit;}
if(parts[1])
end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit);}else
e.custom(start,val,"");}});return true;});},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx";}
if(!type||(typeof type=="string"&&!fn))
return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)
queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)
fn.apply(this);}});},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)
this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)
if(timers[i].elem==this){if(gotoEnd)
timers[i](true);timers.splice(i,1);}});if(!gotoEnd)
this.dequeue();return this;}});var queue=function(elem,type,array){if(!elem)
return undefined;type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)
q=jQuery.data(elem,type+"queue",array?jQuery.makeArray(array):[]);return q;};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)
q[0].apply(this);});};jQuery.snipd_extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)
jQuery(this).dequeue();if(jQuery.isFunction(opt.old))
opt.old.apply(this);};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)
options.orig={};}});jQuery.fx.prototype={update:function(){if(this.options.step)
this.options.step.apply(this.elem,[this.now,this]);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")
this.elem.style.display="block";},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)
return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0;},custom:function(from,to,unit){this.startTime=(new Date()).getTime();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd);}
t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)
if(!timers[i]())
timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null;}},13);}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")
this.elem.style[this.prop]="1px";jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=(new Date()).getTime();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)
if(this.options.curAnim[i]!==true)
done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")
this.elem.style.display="block";}
if(this.options.hide)
this.elem.style.display="none";if(this.options.hide||this.options.show)
for(var p in this.options.curAnim)
jQuery.attr(this.elem.style,p,this.options.orig[p]);}
if(done&&jQuery.isFunction(this.options.complete))
this.options.complete.apply(this.elem);return false;}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();}
return true;}};jQuery.fx.step={scrollLeft:function(fx){fx.elem.scrollLeft=fx.now;},scrollTop:function(fx){fx.elem.scrollTop=fx.now;},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now);},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit;}};jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),fixed=jQuery.css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop);}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)
border(offsetParent);if(!fixed&&jQuery.css(offsetParent,"position")=="fixed")
fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent;}
while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(jQuery.css(parent,"display")))
add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&jQuery.css(parent,"overflow")!="visible")
border(parent);parent=parent.parentNode;}
if((safari2&&(fixed||jQuery.css(offsetChild,"position")=="absolute"))||(mozilla&&jQuery.css(offsetChild,"position")!="absolute"))
add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)
add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));}
results={top:top,left:left};}
function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true));}
function add(l,t){left+=parseInt(l)||0;top+=parseInt(t)||0;}
return results;};jQuery.each(["Height","Width"],function(i,name){var tl=name=="Height"?"Top":"Left",br=name=="Height"?"Bottom":"Right";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+
num(this,"padding"+tl)+
num(this,"padding"+br);};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+
num(this,"border"+tl+"Width")+
num(this,"border"+br+"Width")+
(!!margin?num(this,"margin"+tl)+num(this,"margin"+br):0);};});function num(elem,prop){elem=elem.jquery?elem[0]:elem;return elem&&parseInt(jQuery.curCSS(elem,prop,true))||0;}})();(function($){var jQuery=$;var highlight_count=0;var Settings=this.Settings={show_log:false,auto_snip:false,easy_paste_loaded:false,is_ssl:false,content_tag_called:false,read_later_called:false,latest_error:false,snipd_ver:'101',user_data:false,is_anonymous:false,private_snipping:false,content_id:false,content_rand:false,presentation_mode:false,show_extended_msg_on_bookmarklet: false,show_extended_msg_on_snipping: true,anonymous_user: true,username: ""};var Gui=this.Gui={inject_style:function(css){try{$(css).appendTo('head');}catch(err){alert(err.message);}},create_visual_content_snip_div:function(){var div=$(''
+'<div id="visual_content_snip_bar" '
+'style="position: absolute; height:28px;margin-left:1px; text-align: left; z-index: 2000;">'
+'<div id="snip_bar_back" style="background-color:#6FFF6F;height:28px;width:100%;opacity:1;margin-top:0px; ">'
+'<a href="javascript:void(0);" class="snipd_content_snip snip_bar_link" style="border-right:1px solid #999999;"></a>'
+'<a href="javascript:void(0);" class="snipd_content_unsnip snip_bar_link" style="border-right:1px solid #999999;"></a>'
+'<a href="javascript:void(0);" class="snipd_content_more snip_bar_link" style="width:45px;border-right:1px solid #999999;"></a>'
+'</div>'
+'</div>');$(div).mouseover(function(e){Common.over_visual_content_snip_div=true;}).mouseout(function(e){Common.over_visual_content_snip_div=false;});$(div).hide().appendTo($('body'));$('.snipd_content_unsnip').hide();},get_visual_content_snip_div:function(){return $('#visual_content_snip_bar');},show_visual_content_snip_div:function(obj,obj_rect,snippet,already_snipped,visual_display_class){Common.log('____________FLASH SNIP__________');var snipd_box=this.get_snipd_box();if((snipd_box.is(':visible')&&!($(snipd_box.data('last_selection')).is('img')))||$('#snipd_extended_box').is(':visible')){return;}
var that=this;this.get_snipd_box().hide();this.update_visual_content_buttons(already_snipped);$('#visual_content_snip_bar a.snipd_content_snip').unbind();$('#visual_content_snip_bar a.snipd_content_unsnip').unbind();$('#visual_content_snip_bar a.snipd_content_more').unbind();$('#visual_content_snip_bar a.snipd_content_snip').click(function(e){e.stopPropagation();Gui.get_snipd_box().data('last_selection',obj).data('last_snippet',snippet);Common.log('Binder.add_flash_bind(obj)');Binder.add_flash_bind(obj);that.update_visual_content_buttons(true);if(!!visual_display_class)
$('.'+visual_display_class).css({border:'3px dashed #6FFF6F'});return false;});$('#visual_content_snip_bar a.snipd_content_unsnip').click(function(e){e.stopPropagation();Gui.get_snipd_box().data('last_selection',obj).data('last_snippet',snippet);Binder.remove_image_bind(obj);that.update_visual_content_buttons(false);if(!!visual_display_class)
$('.'+visual_display_class).css({border:'3px dashed #CCCCCC'});return false;});$('#visual_content_snip_bar a.snipd_content_more').click(function(e){e.stopPropagation();Gui.get_snipd_box().data('last_selection',obj).data('last_snippet',snippet);Actions.more_action(e);return false;}).mousedown(function(e){e.stopPropagation();});var bar=$('#visual_content_snip_bar');try{var top_offset=-(obj.bottom-obj.top+1);if($(obj).is('img')){top_offset=0;}
bar.css('left',obj.left).css('top',obj.top+obj.height).width(obj.right-obj.left).show();}catch(err){Common.log('Error: displaying black_bar '+err.message+' '+obj);var top=obj_rect.top;var left=obj_rect.left;var w=obj_rect.width;var h=obj_rect.height;bar.css({left:left+'px',top:(top+h)+'px',width:w+'px'}).show();}
Common.log('visual_snip_bar shown: left: '+left+', top:'+top);},update_visual_content_buttons:function(already_snipped){var snip_div=$('#visual_content_snip_bar a.snipd_content_snip');var unsnip_div=$('#visual_content_snip_bar a.snipd_content_unsnip');if(already_snipped){if(snip_div){snip_div.hide();}
if(unsnip_div){unsnip_div.show();}}else{if(snip_div){snip_div.show();}
if(unsnip_div){unsnip_div.hide();}}},create_snipd_box:function(){var that=this;function link(name,desc){return'<a href="javascript:void(0);" style="cursor: pointer" id="snipd_id_'+name+'" class="snipd_'+name+' "'
+' title="'+desc+'"><!--for IE--></a>';};var snipd_box=$('<div class="snipd_box" style="z-index:100000">'
+link('snip','Snip It')
+link('unsnip','Remove Snip')
+link('more','More Options')
+'</div>').mouseover(Snipd._mouse_handlers.box_enter).mouseout(Snipd._mouse_handlers.box_exit).hide().appendTo('body');this.get_unsnip_link().hide();$('<iframe id="snipdTransportFrame" name="snipdTransportFrame" '
+'style="width: 1px; height: 1px; border: 0px; position:absolute; top:10px; left:0px;">'
+'</iframe>').appendTo('body');$('<form></form>').attr({id:'snipdTransportForm',name:'snipdTransportForm',method:'post',style:'width:1px; height: 1px;',target:'snipdTransportFrame'}).appendTo('body');$('.snipd_snip').unbind('click').bind("mousedown",function(e){e.stopPropagation();Actions.snip_action(e,function(data){Gui.get_snip_link().hide();Gui.get_unsnip_link().show();});});$('.snipd_unsnip').unbind('click').bind("mousedown",function(e){e.stopPropagation();Actions.unsnip_action(e);});$('.snipd_more').bind("click",function(e){e.stopPropagation();Actions.more_action(e);});},comment_selection_text:'',tag_selection_text:'names or emails',hide_extended_box:function(){$('#snipd_extended_box').hide();var snippet=this.get_snipd_box().data('last_snippet');if(snippet){snippet.comment_text=$('#extended_box_comments textarea').val();$('#extended_box_comments textarea').val(this.comment_selection_text);}else{this.comment_selection_text=$('#extended_box_comments textarea').val();if(!this.comment_selection_text){}}
if($('#extended_box_comments .snipd_tag_people').val()==''){$('#extended_box_comments .snipd_tag_people').val('names or emails');}
this.tag_selection_text=$('#extended_box_comments .snipd_tag_people').val();},show_message_box:function(msg,keep_open){Common.log('show_message_box('+msg+')');var msg_box=$('.snipd_message');msg_box.stop().hide();if(Settings.private_snipping){var class_priv="snipd_private";var text_priv="Private";}else{var class_priv="snipd_public";var text_priv="Public";}
var privHtml=$("<div title='Click to change privacy setting.' class='"+class_priv+"' id='snipd_enable_private' style='float: right; height: 20px; padding-right: 20px; cursor: pointer; background-repeat: no-repeat; background-position: top right; margin-left: -10px; position:relative; top: 2px;'>"+text_priv+"</div>").unbind('click').bind("click",function(e){e.stopPropagation();var that=this;if($(that).text()=="Private"){$(that).text('Public');Settings.private_snipping=false;var private_snipd=0;}else{$(that).text('Private');Settings.private_snipping=true;var private_snipd=1;}
Data.send_transport_form('content_privacy',{content_id:Settings.content_id||-1,content_rand:Settings.content_rand||-1,user_hash:Snipd_blet.user_hash,priv:private_snipd},function(data){data=Data.eval_json(data);if(data.content_id||data.content_rand){$(that).toggleClass('snipd_private').toggleClass('snipd_public');}},true);});var end_html="";if(!!Settings.user_data){end_html+="<span style='' title='Go to http://snipd.com/"+Settings.user_data.username+"' class='snipd_bar_link' onclick='window.location=\"http://snipd.com/"+Settings.user_data.username+"\"'>My Snips</span>";if(!Settings.is_anonymous&&!Settings.read_later_called)
end_html+="<span style='margin-left: 4px; margin-right: 3px;  cursor:pointer; border-bottom:1px solid green;' onclick='Actions.read_later();return false;' title='Snipd will mail you the contents of this page automatically.'>Read later</span>";end_html+="<span style=''><input type='text' onmousedown='this.focus();' style='height: 17px; padding-right: 23px; width: 80px; font-size: 10px; margin-top: 1px; margin-left: 5px; padding-top:0px;' name='snipd_tag' id='snipd_add_tag' value='Add a tag.'/><img style='cursor: pointer; position:relative; left: -26px; top: 3px;' id='snipd_add_tag_button' title='Click to tag this content. Use commas to seperate one-word tags.' src='"+Snipd.STATIC_URL+"images/toolbar/tag.gif'/></span>";end_html=$(end_html);}else{var end_html='';}
$('.snipd_msg_box_text').html("<strong>"+msg+"</strong>").append(end_html).prepend(privHtml);if(!Settings.easy_paste_action){$('.easy_paste_action').unbind("click").bind("click",function(e){Settings.easy_paste_action=true;$(this).unbind("click");Data.inject_ajax_js('presentation/',{user_hash:Snipd_blet.user_hash});});}
if(Settings.content_tag_called){$("#snipd_add_tag").val(Settings.content_tag_called.tags).attr({disabled:"disabled"});$("#snipd_add_tag_button").unbind("click").fadeTo(.4,"fast");}else{$('#snipd_add_tag_button').click(function(e){if($('#snipd_add_tag').val()=="Add a tag."||$('#snipd_add_tag').val()==""){$('#snipd_add_tag').css({backgroundColor:'red',color:'white'});alert('Please enter a tag above (see red box) to describe the content on this page.');}else{$('#snipd_add_tag').css({backgroundColor:'',color:''});Common.log('sending tags');Data.inject_ajax_js('add_tags/',{user_hash:Snipd_blet.user_hash,tags:$('#snipd_add_tag').val(),content_id:Settings.content_id||-1,content_rand:Settings.content_rand||-1});}});}
$('#snipd_add_tag').mousedown(function(e){if($(this).val()=="Add a tag.")
$(this).val('').css({backgroundColor:'',color:''});$(this).focus();});if(keep_open){$('.snipd_message .snipd_msg_close').show();}else{$('.snipd_message .snipd_msg_close').hide();}
msg_box.show();if(!keep_open&&true==false){msg_box.animate({opacity:1.0},3500);msg_box.fadeTo('slow',0,function(){msg_box.hide();msg_box.css('opacity',1);});}},show_box:function(selection,pos,snippet,over_highlight){if(over_highlight){this.get_snip_link().hide();this.get_unsnip_link().show();}else{this.get_snip_link().show();this.get_unsnip_link().hide();}
Common.log('show_box for selection: ');return this.get_snipd_box().css(pos).show().data('last_selection',selection).data('last_snippet',snippet);},hide_box:function(){if(!$('#snipd_extended_box').is(':visible')){Common.log('hiding snipd box...');this.get_snipd_box().hide().removeData('last_selection').removeData('last_snippet');}},get_snipd_box:function(){return $('.snipd_box');},get_snip_link:function(){return $('.snipd_box .snipd_snip');},get_unsnip_link:function(){return $('.snipd_box .snipd_unsnip');},get_more_link:function(){return $('.snipd_box .snipd_more');},get_comment_html:function(){return''
+'<div id="extended_box_comments" style="font-size:13px;color:#333333;font-family:Arial;">'
+'<div align="left" style="clear:both;">'
+' <span id="snipd_comment_close" style="float:right; font-size:13px;font-family:Arial;cursor:pointer;text-align:right;background:white;padding:1px 5px 2px; z-index: 99999; width: 25%;color:gray;">Close [x]</span>'
+' <input id="snipd_comment_save_button" style="font-size:13px;font-family:Arial;border:1px solid #999999;background:#6FFF6F;padding:1px 5px 2px; z-index: 99999; width: 70%;color:black;" '
+'type="submit" onclick="return false;" tabindex="101" value="Click to Snip" />'
+'</div></div>'
+'<div align="left" style="margin-top: 8px;padding-bottom:2px;color:#666666;font-weight:bold;">Comment <span style="color:#666666;font-weight:normal;">(optional)</span></div>'
+'<textarea id="snipd_comments_text_area" tabindex="99"  '
+'name="foo" rows="5" style="margin-bottom: 0.5em;font-size:13px;color:#333333;font-family:Arial;width:279px;background:white;border:1px solid #7F9DB9;" '
+' >'
+'</textarea><br/>'},get_email_html:function(){return''
+'<div id="extended_box_email">'
+'<input type="text"  style="width: 100%; margin-bottom: 0.5em; color: gray;" '
+'class="snipd_email_to" /><br />'
+'<input type="text"  style="width: 100%; margin-bottom: 0.5em; color: gray;" '
+'class="snipd_email_subject" /><br />'
+'<textarea class="snipd_email_text_area" '
+'rows="5" style="width: 100%; margin-bottom: 0.5em; color: gray;">'
+'</textarea><br/>'
+'<input id="snipd_email_send_button" '
+'type="submit" value="Send Email" onclick="Snipd.send_email()" />'
+'</div>';},setup_email_fields:function(){$('.snipd_email_to').val('To Emails').click(function(e){if($(this).val()=='To Emails'){$(this).val('');}}).blur(function(e){if($(this).val()==''){$(this).val('To Emails');}});$('.snipd_email_subject').val('Subject').click(function(e){if($(this).val()=='Subject'){$(this).val('');}}).blur(function(e){if($(this).val()==''){$(this).val('Subject');}});$('.snipd_email_text_area').val('Private Message (Optional)').click(function(e){if($(this).val()=='Private Message (Optional)'){$(this).val('');}}).blur(function(e){if($(this).val()==''){$(this).val('Private Message (Optional)');}});},prevent_selection_removal:function(element){var restore_selection=function(){var selection=Selection.get_current_selection(Selection.get_text());if(selection){try{Common.log('adding range!!!!');window.getSelection().removeAllRanges();window.getSelection().addRange(selection);}catch(err){Common.log('Error: window.getSelection().add...'+err.message);}}};element.click(function(e){restore_selection();}).mousedown(function(e){restore_selection();}).keydown(function(e){restore_selection();});},create_extended_box:function(){var extended=$(''
+'<div style="border: solid 4px #CCCCCC; background: white; padding: 0.5em; display:none; width: 280px; z-index:10000000;" '
+'id="snipd_extended_box">'
+this.get_comment_html()
+'</div>')
extended.hide().appendTo('body');$('#snipd_comment_save_button').bind("click",function(e){Actions.send_comment(e,$('#snipd_comments_text_area').val());});$('#snipd_comments_text_area').bind("mousedown",function(e){var txt=Selection.get_text();if(txt&&txt!='')
Actions.snip_action(false,function(){Gui.show_message_box("Snipd it.",true);});});$('#snipd_comment_close').bind("click",function(e){$('#snipd_extended_box').hide();});var that=this;$('#snipd_comments_text_area').keydown(function(e){var comment_text=that.get_snipd_box().data('last_snippet').comment_text;if($('#snipd_comments_text_area').html()!=comment_text){$('#snipd_comment_save_button').val('Click to Comment').removeAttr('disabled').fadeTo('fast',1);}});$('#extended_box_comments .snipd_tag_content').focus(function(e){if($('#extended_box_comments .snipd_tag_content').val()=='tag content'){$('#extended_box_comments .snipd_tag_content').val('');}
$('#snipd_comment_save_button').val('Click to Tag Snippet').removeAttr('disabled');}).blur(function(e){if($('#extended_box_comments .snipd_tag_content').val()==''){$('#extended_box_comments .snipd_tag_content').val('tag content');}});$('#extended_box_comments .snipd_tag_people').keydown(function(e){$('#snipd_comment_save_button').val('Click to Email Snippet').removeAttr('disabled');$('#snipd_comment_save_button').removeAttr('disabled');}).focus(function(e){if($('#extended_box_comments .snipd_tag_people').val()=='names or emails'){$('#extended_box_comments .snipd_tag_people').val('');}}).blur(function(e){if($('#extended_box_comments .snipd_tag_people').val()==''){$('#extended_box_comments .snipd_tag_people').val('names or emails');}});extended.mousedown(function(e){e.stopPropagation();});this.get_more_link().mousedown(function(e){e.stopPropagation();});},insert_css:function(){var head=$('head'),s=$('<style><!--'
+'.ac_results {'
+'top:173px;left:9px;width:281px;border:1px solid #006699;'
+'}'
+'.snip_bar_link {'
+'display:block;opacity:1;height:28px;width:56px;float:left;'
+'}'
+'.snipd_content_snip {'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/snip.gif) center no-repeat;'
+'text-decoration: none;'
+'}'
+'.snipd_content_unsnip {'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/unsnip.gif) center no-repeat;'
+'}'
+'.snipd_content_more {'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/pic_down_arrow.gif) center no-repeat;'
+'}'
+'.snip_bar_link:hover {'
+'background-color:#666666;'
+'}'
+'.snipd_hidden {'
+'position: absolute; width:1px; height:1px; top: -1px; left: -1px;'
+'}'
+'.snipd_box {'
+'position: absolute; max-width:36px; width:auto; height:auto; background:white; z-index:900000000;'
+'}'
+'.snipd_snip, .snipd_unsnip {'
+'width: 21px; display: block; float: left; height: 21px;'
+'}'
+'.snipd_snip:hover {'
+'background:#CCEEFF;'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/snip.gif) center no-repeat;'
+'border: 1px solid #CCCCCC;'
+'}'
+'.snipd_bar_link { margin-left: 4px; margin-right: 3px; cursor:pointer; border-bottom:1px solid green; }'
+'.snipd_unsnip:hover {'
+'background:#CCEEFF;'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/unsnip.gif) center no-repeat;'
+'border: 1px solid #316AC5;'
+'}'
+'.snipd_more {'
+'width: 11px; float: left;'
+'}'
+'.snipd_more:hover {'
+'width: 11px; display: block; height: 21px; float: left; border: 1px solid #CCCCCC;'
+'border-left: none;'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/more.gif) center no-repeat #CCEEFF;'
+'}'
+'.snipd_snip {'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/snip.gif) center no-repeat;'
+'border: 1px solid #CCCCCC;'
+'}'
+'.snipd_unsnip {'
+'background: #CCEEFF url('+Snipd.STATIC_URL+'images/toolbar/unsnip.gif) center no-repeat;'
+'border: solid 1px #316AC5;'
+'}'
+'a.snipd_snip:hover {'
+'background-position: 2px 2px;'
+'}'
+'.snipd_more {'
+'width: 11px; display: block; height: 21px; float: left; border: 1px solid #CCCCCC;'
+'border-left: none;'
+'background: url('+Snipd.STATIC_URL+'images/toolbar/more.gif) center no-repeat;'
+'}'
+'.ui-dialog-titlebar {'
+'display: none;'
+'}'
+'.snipd_private { background:url("'+Snipd.STATIC_URL+'images/toolbar/lock.gif");  }'
+'.snipd_public { background:url("'+Snipd.STATIC_URL+'images/toolbar/unlock.gif"); }'
+'.snipd_highlight {'
+'background-color: #AEFFAE;'
+'color: black;'
+'}'
+'--></style>');s.appendTo(head);}};var Data=this.Data={BASE_AJAX_URL:'http://snipd.com/ajax/',error_msg_text:'Error snipping.',inject_fjax:function(){var url=Snipd.STATIC_URL+'swfhttprequest.swf';var obj=$(''
+'<object'
+' id="swfhttprequest" class="snipd_hidden"'
+' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'
+' codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0">'
+' <param name="movie" value="'+url+'" />'
+' <param name="allowScriptAccess" value="always" />'
+' <embed'
+' class="snipd_hidden"'
+' src="'+url+'"'
+' allowScriptAccess="always"'
+' type="application/x-shockwave-flash"'
+' pluginspage="http://www.adobe.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"> '
+' </embed>'
+'</object>');if(!$.browser.msie)
obj.appendTo('body');},inject_js:function(url){Common.log('js inj: '+url);$('<'+'script'+'>'+'</'+'script'+'>').attr({language:'Javascript',src:url}).appendTo('body');},inject_ajax_js:function(file,form_data){var params='?js_xss=true&user_hash='+Snipd_blet.user_hash;this.process_form_data(form_data,function(name,value){if(name!=''&&name!=' ')
params+='&'+encodeURIComponent(name)+'='+encodeURIComponent(value);});this.inject_js(this.BASE_AJAX_URL+file+params);},eval_json:function(data){if(typeof(data)=="string")
var res=eval('('+data+')');else
var res=data;return res;},send_transport_form:function(form_name,form_data,callback,hide_message){if(typeof(SWFHttpRequest)!='undefined'&&!$.browser.msie&&!$.browser.safari){this.send_transport_form_flash(form_name,form_data,callback);}else{this.send_transport_form_iframe(form_name,form_data,callback);}
if(!hide_message&&true==false){Gui.show_message_box('Working... <img src="'+Snipd.STATIC_URL+'images/toolbar/loader_white2.gif" border=0 style="margin-bottom:-3px;" />',false);}},send_transport_form_flash:function(form_name,form_data,callback){Common.log('flash submit');var that=this;var sanitize_text=function(text){if(typeof(text)=='string'){text=text.replace(/\n/g,'');text=text.replace(/&/g,'%26');text=text.replace(/=/g,'%3D');text=text.replace(/\+/g,'[__pl__]');return text;}else{return text;}};var params='flash_xss=true';this.process_form_data(form_data,function(name,value){params+='&';params+=name+'='+sanitize_text(value);});try{var shr=new SWFHttpRequest();shr.open('POST',this.BASE_AJAX_URL+form_name+'/');shr.onreadystatechange=function(){if(this.readyState!=4)return;if(this.status==200){if(callback){callback(this.responseText);}}else{that.send_transport_form_iframe(form_name,form_data,callback);}};shr.send(params);}catch(err){Common.log(err.message);}},send_transport_form_iframe:function(form_name,form_data,callback){var url=this.BASE_AJAX_URL+form_name+'/';try{var old_hash=snipdTransportFrame.location.hash;}catch(err){var old_hash=window.location.hash;}
function input_field(name){return'<input type = "hidden" name = "'+name+'" id = "'+'snipdAddForm_'+name+'" value = "'+form_data[name]+'" />';};$('#snipdTransportForm').html("");Common.log('FORM DATA!');this.process_form_data(form_data,function(name,value){$("<input type='hidden'>").attr({id:"snipdAddForm_"+name,name:name,value:value}).appendTo('#snipdTransportForm');Common.log(name+': '+value);});$('<input type="button" name="snipd_submit" value="Submit" '+'style="width:0px; height:0px; overflow: hidden; border: 0px;"'+'/>').appendTo('#snipdTransportForm');if($('#snipdTransportForm'))
$('#snipdTransportForm').attr('action',url).submit();Common.log('submitting iframe, callback: '+url);callback({fake_data:true,snippet_id:-1,content_id:-1,content_rand:Settings.content_rand||-1,rand:form_data.rand||false});},update_snippet_list:function(snippet){var snippet_list=Gui.get_snipd_box().data('snipd');if(!snippet_list){Gui.get_snipd_box().data('snipd',snippet_list=[]);}
snippet_list[snippet_list.length]=snippet;},process_form_data:function(form_data,callback){var fields=[];for(var key in form_data){fields[fields.length]=key;}
$.map(fields,function(name){if(form_data[name]==undefined){alert('Field "'+name+'" is missing in the form');}
callback(name,form_data[name]);});},send_snippet_to_server:function(snippet,cont,hide_message){Common.log('_________add_snippet____________');Common.log('1');var that=this;if(Snipd.is_sandbox()){try{Page.snipd_flash_done(Snipd_blet.user_hash);}catch(err){}}
if(Settings.private_snipping)
var private_snipd=1;else
var private_snipd=0;if(snippet.priv==1)
private_snipd=1;Common.log('1.4');try{var re=new RegExp("\n","g");var replaced=snippet.text.replace(re,'_SLASHN_');Common.log('1.5');var re=new RegExp("position:( |)(absolute|static|fixed)","g");var replaced=replaced.replace(re,"position:");Common.log('2');re=new RegExp("_SLASHN_","g");replaced=replaced.replace(re,'\n');}catch(e){Common.log('Error on regex');var replaced=snippet.text||Selection.get_text();}
try{replaced=Common.convert_to_entity(replaced);}catch(e){Common.log('error on common.covert entity.');}
Common.log('3');Common.log('regex replaced');this.send_transport_form('add_snippet',{src:snippet.src||'-1',start:snippet.start_offset||0,end:snippet.end_offset||0,text:replaced,yPosition:snippet.yPosition||0,type:snippet.type||'T',user_hash:Snipd_blet.user_hash,page_title:Common.convert_to_entity(document.title),page_url:location.href,priv:private_snipd,anchor:snippet.anchor||'-1',focus:snippet.focus||'-1',anchorOffset:snippet.anchorOffset||'-1',focusOffset:snippet.focusOffset||'-1',rand:snippet.rand||0},function(data){Common.log('called back');var res=Data.eval_json(data);snippet.content_id=res.content_id;Settings.content_id=parseInt(snippet.content_id);snippet.snippet_id=res.snippet_id;if(cont){cont.call(that,snippet);}},hide_message);}};var Binder=this.Binder={over_image:false,over_large_image:false,over_visual_content_snip_div:false,hide_toolbar_on_image:false,visual_content_selector:'img',image_bind:function(){var that=this;$(this.visual_content_selector).each(function(e){var img=this;$(this).mouseover(function(e){Common.log('over image');that.over_image=true;if($(img).width()<40000&&!Common.button_down){if(!$(img).data('snippet'))
$(img).css({border:'3px dashed #CCCCCC',margin:'-3px'});var snipd_box=Gui.get_snipd_box();if(Gui.get_visual_content_snip_div().is(':visible'))
Gui.get_visual_content_snip_div().hide();if(img!=snipd_box.data('last_selection')&&!$('#snipd_extended_box').is(':visible')&&(!Common.button_down)){Gui.show_box(img,{left:e.pageX,top:e.pageY},$(img).data('snippet')||false,Common.is_image_snipped(img));}}}).mouseout(function(e){if(!$(img).data('snippet'))
$(img).css({border:'0px dashed green',margin:''});that.over_image=false;that.over_large_image=false;that.hide_toolbar_on_image=false;}).click(function(){that.hide_toolbar_on_image=true;Gui.hide_box();});});},remove_image_bind:function(obj){var that=this;var snippet=$(obj).data('snippet');Data.send_transport_form('remove_snippet',{snippet_id:snippet.snippet_id||-1,rand:snippet.rand||-1,user_hash:Snipd_blet.user_hash},function(data){if($(obj).is('img')){$(obj).css({border:'0px',margin:''});$(obj).removeData('snippet');}else{$(obj).removeData('snippet');}
Gui.get_snip_link().show();Gui.get_unsnip_link().hide();Gui.show_message_box('Image Snippet removed.',false);});Gui.get_snipd_box().removeData('last_snippet');},add_flash_bind:function(obj,cont){Common.log('_______FLASH/img BIND________');try{var div=$('<div></div>');var copy=$(obj).clone();copy.attr('src',src);div.append(copy);}catch(e){var div=$(obj).parent();Common.log('IE crash on flashbind');}
var type='E';var src=$("embed",div).attr('src');if(!src||src==''){src=$("img",div).attr('src');type='I';}
if(!src||src==''){src=$("object",div).attr('data');type='E';}
if(src!=null)
{src=Common.create_absolute_source(src);src=encodeURI(src);Common.log('<strong>'+src+'</strong>');$("embed",div).attr('src',src);$("object",div).attr('data',src);$("img",div).attr('src',src);}
var embed_html=div.html();if(embed_html){Common.log('EMBED:'+embed_html);if(/youtube\.com/.test(document.location.href)){var code=$('input#embed_code').val();if(code){embed_html=code;}}
if(embed_html.indexOf('<embed')!=-1||embed_html.indexOf('<EMBED')!=-1||embed_html.indexOf('<OBJECT')!=-1||embed_html.indexOf('<object')!=-1){type='E';}
Common.log('creating snippet');var snippet={start_offset:0,end_offset:0,text:embed_html,src:src,type:type,rand:Math.round(Math.random()*100000000000)};$(obj).data('snippet',snippet);Gui.get_snipd_box().data('last_snippet',snippet);Common.log('sending to server-object/embed/img');Data.send_snippet_to_server(snippet,function(snippet){if(type=='I'){Common.log('image adding border');$(obj).css({border:'3px dashed #6FFF6F',margin:'-3px'});}
Gui.get_snip_link().hide();Gui.get_unsnip_link().show();Gui.show_message_box("Snipd it.",true);if(cont){cont(snippet);}
if(Snipd.is_sandbox()){try{Page.snipd_flash_done(Snipd_blet.user_hash);}catch(err){}}});}}};var Common=this.Common={over_box:false,button_down:false,over_image:false,over_visual_content_snip_div:false,log:function(data){if(Settings.show_log){var block=$("<p></p>").css("margin","4px").html(data);if(document.getElementById('snipd_logger')){block.prependTo('#snipd_logger');}else{$("<div></div>").attr("id","snipd_logger").css({width:'150px',height:'600px',backgroundColor:'white',border:'2px solid red',position:'fixed',top:'25px',left:'0px',textAlign:'left',overflow:'auto',fontSize:'10px'}).appendTo("body").fadeTo("fast",.9);block.prependTo('#snipd_logger');}}},convert_to_entity:function(text_str){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');}
var utf8_char=text_str;utf8_char=utf8_char.trim();var html_entity='';for(i=0;i<=utf8_char.length;i++){if(utf8_char.charCodeAt(i)>127){html_entity+='&#'+utf8_char.charCodeAt(i)+';';}else{html_entity+=utf8_char.charAt(i);}}
return html_entity;},calculate_e_pos:function(e){if(!e)
var e=window.event;if(e.pageX||e.pageY){curX=e.pageX;curY=e.pageY;}else if(e.clientX||e.clientY){curX=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;curY=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;}
return{x:curX,y:curY}},calculate_object_size_position:function(obj){if(typeof(document.documentElement.innerWidth)=='number'){var w=document.documentElement.innerWidth;var h=document.documentElement.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){var w=document.documentElement.clientWidth;var h=document.documentElement.clientHeight;}
var offset_bottom=document.documentElement.offsetTop+h;var offset_right=document.documentElement.offsetLeft+w;return{width:w,height:h,offset_top:document.documentElement.offsetTop,offset_bottom:offset_bottom,offset_left:document.documentElement.offsetLeft,offset_right:offset_right}},calculate_e_target:function(e){var targ;if(!e)var e=window.event;if(e.target)targ=e.target;else if(e.srcElement)targ=e.srcElement;if(targ.nodeType==3)
targ=targ.parentNode;return targ;},selectorFromNode:function(node){var parentSelector='';var indexSelector='';Common.log('selectorFromNode(), node:'+node);if(node&&node.parentNode&&node.parentNode!=document){parentSelector=this.selectorFromNode(node.parentNode);var children=node.parentNode.childNodes;var j=-1;for(var i=0;i<children.length;i++){if(children[i].tagName==node.tagName){j++;}
if(children[i]==node){break;}}
indexSelector=':eq('+j+')';}
var selector=parentSelector;if(node&&node.tagName){if(parentSelector){selector=selector+' > '+node.tagName.toLowerCase()+indexSelector;}else{selector=selector+node.tagName.toLowerCase()+indexSelector;}}
return selector;},is_image_snipped:function(img){Common.log('checking src of object');if($(img).data('snippet'))
return true;else
return false;},find_image_src:function(img){var src=$(img).attr('src');if(!src){src=$(img).attr('data');}
if(!src){src='';}
if(src.search('http://')==-1&&src.search('https://')==-1){var url=(document.location.href).split('/');src=url[0]+'/'+url[1]+'/'+url[2]+'/'+src;}
return src;},create_absolute_source:function(src){try{if(src.search('http://')==-1&&src.search('https://')==-1){var url=(document.location.href).split('/');var endURL='';for(var i=3;i<(url.length-1);i++){endURL+='/'+url[i];}
if(src.substr(0,1)=='/')
src=url[0]+'/'+url[1]+'/'+url[2]+'/'+src;else
src=url[0]+'/'+url[1]+'/'+url[2]+''+endURL+'/'+src;}}catch(err){Common.log(err.message);}
return src;}};var Actions=this.Actions={read_later:function(){var html=$("body").html();var replaced=Common.convert_to_entity(html);var title=Common.convert_to_entity($('title').text());Data.send_transport_form('read_later',{body:replaced,title:title,url:document.location,user_hash:Snipd_blet.user_hash},function(data){try{Settings.read_later_called=true;Gui.show_message_box("Emailed for later reading.",false);}catch(err){Common.log('Error: on read_later data back - '+err.message);}});},toggle_presentation:function(){Settings.presentation_mode=!Settings.presentation_mode;Common.log("Presentation mode "+(Settings.presentation_mode?"ON":"OFF"));},make_snipd_action:function(handler_name){Common.log('make_snipd_action: '+handler_name);var that=this;return(function(e){try{this[handler_name+'_action'].call(that,e);Common.log('action called.');}catch(e){Common.log('Error: make_snipd_action: '+handler_name+', err:'+e.message);Gui.show_message_box(that.error_msg_text+' '+e,true);}});},snip_action:function(e,cont){Common.log('____________snip_action____________');if($(Gui.get_snipd_box().data('last_selection')).is('embed')||$(Gui.get_snipd_box().data('last_selection')).is('object')||$(Gui.get_snipd_box().data('last_selection')).is('img')){Binder.add_flash_bind(Gui.get_snipd_box().data('last_selection'),cont);return;}
if(!Selection.get_text())
return;var selection=Selection.selection_html(Selection.get_text());if(selection.browser=='msie'){Common.log('msie begin snipping');var snippet={selection:selection,start_offset:false,end_offset:false,text:selection.html,comment:'',yPosition:e.pageY||0,rand:Math.round(Math.random()*100000000000),start:0,end:0,documentLocation:'foo',toString:function(){return this.text;}};}else{Common.log('moz begin snipping..');var selection_obj=Selection.get_current_selection(selection.text);Common.log('grabbed selection_obj');var snippet={selection:selection_obj,start_offset:Selection.find_absolute_range(selection_obj,'start'),end_offset:Selection.find_absolute_range(selection_obj,'end'),text:selection.html||selection.toString(),comment:'',yPosition:e.pageY||0,rand:Math.round(Math.random()*100000000000),documentLocation:'foo',toString:function(){return this.text;}};Common.log('checking selection');if(selection&&selection!=''){try{snippet.anchor=Common.selectorFromNode(snippet.selection.startContainer);snippet.focus=Common.selectorFromNode(snippet.selection.endContainer);snippet.anchorOffset=snippet.selection.startOffset;snippet.focusOffset=snippet.selection.endOffset;}catch(err){Common.log('could not set anchor, focus, or offsets');snippet.anchor='';snippet.focus='';snippet.anchorOffset='';snippet.focusOffset='';}}
Common.log('created snippet');}
if(selection){Common.log('sending to server');Data.send_snippet_to_server(snippet,function(snippet){Gui.get_snipd_box().data('last_snippet',snippet);Gui.get_snip_link().hide();Gui.get_unsnip_link().show();if(snippet.snippet_id==-1)
var snippet_id=snippet.rand;else
var snippet_id=snippet.snippet_id;Selection.highlight('snipd_highlight',snippet_id,snippet.selection,function(jq_set){jq_set.mouseover(Snipd._mouse_handlers.highlight_enter).mouseout(Snipd._mouse_handlers.highlight_exit).data('snipd_snippet',snippet);});Common.log('highlighted '+snippet_id);Gui.show_message_box('Snipd it.',true);Data.update_snippet_list(snippet);Snipd.snipping_ready=true;try{window.getSelection().removeAllRanges();}catch(err){try{document.selection.empty();}catch(err){alert(err.message);}}
if(cont){cont(snippet);}
if(Snipd.is_sandbox()){try{Page.snipd_flash_done(Snipd_blet.user_hash);}catch(err){}}});}},unsnip_action:function(e){Common.log("unsnip_action()");var snippet=Gui.get_snipd_box().data('last_snippet');try{if($(Gui.get_snipd_box().data('last_selection')).is('img')){Binder.remove_image_bind(Gui.get_snipd_box().data('last_selection'));return;}
if($(Gui.get_snipd_box().data('last_selection')).is('embed')||$(Gui.get_snipd_box().data('last_selection')).is('object')){Binder.remove_flash_bind(Gui.get_snipd_box().data('last_selection'));return;}}catch(err){Common.log('Error: ie break '+err.message);}
var that=this;Data.send_transport_form('remove_snippet',{snippet_id:snippet.snippet_id,rand:snippet.rand,user_hash:Snipd_blet.user_hash},function(data){Gui.get_snip_link().show();Gui.get_unsnip_link().hide();Selection.remove_highlight(snippet);Gui.hide_box();Gui.show_message_box("Snippet removed.",false);var snippet_list=Gui.get_snipd_box().data('snipd');try{for(var i=0;i<snippet_list.length;i++){if(snippet_list[i].snippet_id==snippet.snippet_id){snippet_list.splice(i,1);break;}}}catch(err){Common.log('Error: length in .data("snipd")');}});},more_action:function(e,cont){Common.log('showing.');if(!$('#snipd_extended_box').is(':visible')){var snippet=Gui.get_snipd_box().data('last_snippet');var comment=snippet.comment_text;if(!comment){comment=Gui.comment_selection_text;}
$('#extended_box_comments textarea').val(comment);$('#extended_box_comments .snipd_tag_people').val(Gui.tag_selection_text);$('#extended_box_comments .snipd_tag_content').val('tag content');if($('.snipd_content_unsnip').is(':visible')||$('.snipd_unsnip').is(':visible')){$('#snipd_comment_save_button').val('Snipd it.').attr('disabled','disabled').fadeTo('fast',.5);}else{$('#snipd_comment_save_button').val('Click to Snip').removeAttr('disabled').fadeTo('fast',1);}
var snipdBox=Gui.get_snipd_box();var position;if(snipdBox.is(':visible')){var l=snipdBox.offset().left+22;var t=snipdBox.offset().top+22;}else{var content_box=Gui.get_visual_content_snip_div();var l=content_box.offset().left+56;var t=content_box.offset().top+28;}
$('#snipd_extended_box').show().css({left:l+'px',top:t+'px',position:'absolute'});Common.log('show snipd_extended_box, sel:'+snipdBox.data('last_selection'));}else{Gui.hide_extended_box();}
var selection=Selection.get_current_selection(Selection.get_text());if(selection){try{Common.log('adding range!!!!');window.getSelection().addRange(selection);}catch(err){Common.log('Error: window.getSelection().add...'+err.message);}}},send_comment:function(e,comment){var snippet=Gui.get_snipd_box().data('last_snippet');var that=this;Common.log('send_comment(): '+comment);if(!snippet){Common.log('!! no snippet defined.');Gui.update_visual_content_buttons(true);this.snip_action(e,function(snippet){$('#snipd_comment_save_button').fadeTo('fast',.5).val('Snipd it.').attr('disabled','disabled');Gui.get_snip_link().hide();Gui.get_unsnip_link().show();if(snippet&&(snippet.snippet_id||snippet.rand)&&(comment!='')){that.send_comment_aux(snippet,comment);}});}else{Common.log('Snippet defined.');this.send_comment_aux(snippet,comment);}},send_comment_aux:function(snippet,comment){Common.log('send_comment_aux() for snippet_id: '+snippet.snippet_id);Data.send_transport_form("add_comment",{snippet_id:snippet.snippet_id||-1,content_id:Settings.content_id||-1,rand:snippet.rand||-1,user_hash:Snipd_blet.user_hash||-1,text:comment},function(data){var res=Data.eval_json(data);snippet.comment_id=res.comment_id;Gui.get_snipd_box().data('last_snippet',snippet);Gui.show_message_box("Comment saved. ",false);Gui.hide_extended_box();});}};var Selection=this.Selection={selection_html:function(sel){if(document.selection){var partial=document.selection.createRange();return{range:partial,html:partial.htmlText,text:sel,browser:'msie',toString:function(){return partial.htmlText;}}}else{var full=Selection.partial_source(sel);var partial=full.innerHTML.split(this.BEG_SEL);return{range:full,html:partial[1],text:sel,browser:'moz',toString:function(){return partial[1];}}}},get_current_selection:function(selection){if(!selection.rangeCount){return null;}
Common.log('gcs0');var range=selection.getRangeAt(0);if(range.startContainer==range.endContainer&&range.startOffset==range.endOffset){return null;}
Common.log('gcs1');var out_range=document.createRange();var find_text=function(node,forward,index){if(!node){return null;}
if(node.nodeType==3){return node;}
Common.log('gcs2');var children=node.childNodes;if(forward){var i=0;if(index){i=index;}
for(;i<children.length;i++){var textNode=find_text(children[i],true);if(textNode){return textNode;}}
return null;}else{var i=children.length-1;if(index){i=index;}
for(;i>=0;i--){var textNode=find_text(children[i],false);if(textNode){return textNode;}}
return null;}
Common.log('gcs3');};if(range.startContainer.nodeType!=3){var temp=find_text(range.startContainer,true,range.startOffset);if(!temp){return null;}
out_range.setStart(temp,0);}else{out_range.setStart(range.startContainer,range.startOffset);}
if(range.endContainer.nodeType!=3){var temp=find_text(range.endContainer,false,range.endOffset-1);if(!temp){return null;}
out_range.setEnd(temp,temp.nodeValue.length);}else{out_range.setEnd(range.endContainer,range.endOffset);}
return out_range;},get_text:function(){if(window.getSelection){return window.getSelection();}else if(document.getSelection){return document.getSelection();}else if(document.selection){return document.selection.createRange().text;}else{return false;}},remove_highlight:function(snippet){if(snippet.snippet_id!=-1)
var cls='snipd_highlight_id_'+snippet.snippet_id;else
var cls='snipd_highlight_id_'+snippet.rand;$('.'+cls).css("background-color","").removeClass('snipd_highlight').unbind('mouseover',Snipd._mouse_handlers.highlight_enter).unbind('mouseout',Snipd._mouse_handlers.highlight_exit);},highlight:function(base_class,highlight_id,range,callback){Common.log('begin highlighting.');if(document.selection){try{Common.log('wrapping selection');var h_id="snipd_highlight_id_"+highlight_id;if(document.selection.createRange().execCommand){document.selection.createRange().execCommand("BackColor","false","#AEFFAE");}
$("font").each(function(){if($(this).css("background-color")=="#aeffae"){$(this).addClass(h_id);Common.log('adding class');}});callback($('.'+h_id));}catch(err){alert(err.message);}
return;}
var do_callback=function(){if(callback){callback($('.'+base_class+seq_num));}};var seq_num=highlight_count++,cls=base_class+' '+base_class+seq_num;if(highlight_id){cls=cls+' '+base_class+'_id_'+highlight_id;}
var start=range.startContainer;var end=range.endContainer;var ancestor=this.get_common_ancestor(range);Common.log('hl0');if(start==end){this.highlight_single_text_node(cls,start,range.startOffset,range.endOffset);do_callback();return;}
Common.log('hl1')
start=this.highlight_single_text_node(cls,start,range.startOffset)[1];var top_start=this.highlight_subtree(start,ancestor,true,cls);end=this.highlight_single_text_node(cls,end,0,range.endOffset)[0];var top_end=this.highlight_subtree(end,ancestor,false,cls);Common.log('hl2')
if(!top_start||!top_end||top_start.previousSibling==top_end){do_callback();return;}
Common.log('hl3')
for(;top_start!=null&&top_start!=top_end;){top_start=this.highlight_element(top_start,cls);top_start=top_start.nextSibling;}
this.highlight_element(top_start,cls);do_callback();Common.log('hl4')},highlight_element:function(element,cls){var isWhitespace=function(s){var reWhiteSpace=new RegExp(/^\s*$/);if(reWhiteSpace.test(s)){return true;}
return false;};if(element==null){return null;}
if(element.nodeType==3&&!isWhitespace(element.nodeValue)){var new_el=this.create_span(cls,element.nodeValue);element.parentNode.insertBefore(new_el[0],element);element.parentNode.removeChild(element);return new_el[0];}
var free_text=false;for(var i=0;i<element.childNodes.length;i++){var node=element.childNodes[i];if(node.nodeType==1||node.nodeType==3){this.highlight_element(node,cls);}}
return element;},highlight_subtree:function(start,ancestor,direction,cls){var get_sibling=function(element){var sibling;if(direction==true){sibling=element.nextSibling;}else{sibling=element.previousSibling;}
if(!sibling){if(element.parentNode!=ancestor){return get_sibling(element.parentNode);}else{return null;}}else{return sibling;}};var element=start;for(;element&&element.parentNode!=ancestor;){element=this.highlight_element(element,cls);element=get_sibling(element);}
return element;},create_span:function(cls,text){text=text.replace(/</g,'&lt;');text=text.replace(/>/g,'&gt;');var spantag=$('<span class = "'+cls+'">'+text+'</span>');if(spantag.hasClass("snipd_highlight"))
spantag.bind("mouseover",function(e){});return spantag;},highlight_single_text_node:function(cls,elem,start,end){var text=elem.nodeValue;if(!start){start=0;}
if(!end){end=text.length;}
var new_beginning=document.createTextNode(text.substring(0,start)),highlighted=this.create_span(cls,text.substring(start,end))[0],new_ending=document.createTextNode(text.substring(end,text.length));elem.parentNode.insertBefore(new_beginning,elem);elem.parentNode.insertBefore(highlighted,elem);elem.parentNode.insertBefore(new_ending,elem);elem.parentNode.removeChild(elem);return[new_beginning,new_ending];},getPath:function(ancestor,node){var n=node;var p=n.parentNode;if(n==ancestor||!p)
return null;var path=new Array();if(!path)
return null;do{for(var i=0;i<p.childNodes.length;i++){if(p.childNodes.item(i)==n){path.push(i);break;}}
n=p;p=n.parentNode;}
while(n!=ancestor&&p);return path;},find_absolute_range:function(range,which){if(range==null)
return false;return this.find_absolute_offset(range[which+'Container'],range[which+'Offset']);},find_absolute_offset:function(container,offset){return(container!=document?this.find_absolute_offset(container.parentNode,0):0)
+this.find_preceding_length(container)
+offset;},find_preceding_length:function(dom_node){var length=0,current=dom_node.previousSibling;while(current&&current!=document){if(current.nodeType==1){length+=$(current).text().length;}else if(current.nodeType==3){length+=current.nodeValue.length;}
current=current.previousSibling;}
return length;},get_common_ancestor:function(range){return range.parentElement||range.commonAncestorContainer||range.startContainer;},partial_source:function(selection){var range=selection.getRangeAt(0);var ancestorContainer=range.commonAncestorContainer;var doc=ancestorContainer.ownerDocument;var startContainer=range.startContainer;var endContainer=range.endContainer;var startOffset=range.startOffset;var endOffset=range.endOffset;if(ancestorContainer.nodeType==Node.TEXT_NODE||ancestorContainer.nodeType==Node.CDATA_SECTION_NODE)
ancestorContainer=ancestorContainer.parentNode;try{if(ancestorContainer==doc.body)
ancestorContainer=doc.documentElement;}catch(e){}
var startPath=this.getPath(ancestorContainer,startContainer);var endPath=this.getPath(ancestorContainer,endContainer);ancestorContainer=ancestorContainer.cloneNode(true);startContainer=ancestorContainer;endContainer=ancestorContainer;var canDrawSelection=ancestorContainer.hasChildNodes();if(canDrawSelection){var i;for(i=startPath?startPath.length-1:-1;i>=0;i--){startContainer=startContainer.childNodes.item(startPath[i]);}
for(i=endPath?endPath.length-1:-1;i>=0;i--){endContainer=endContainer.childNodes.item(endPath[i]);}
var tmpNode;if(endContainer.nodeType==Node.TEXT_NODE||endContainer.nodeType==Node.CDATA_SECTION_NODE){if((endOffset>0&&endOffset<endContainer.data.length)||!endContainer.parentNode||!endContainer.parentNode.parentNode)
endContainer.insertData(endOffset,this.END_SEL);else{tmpNode=doc.createTextNode(this.END_SEL);endContainer=endContainer.parentNode;if(endOffset==0)
endContainer.parentNode.insertBefore(tmpNode,endContainer);else
endContainer.parentNode.insertBefore(tmpNode,endContainer.nextSibling);}}else{tmpNode=doc.createTextNode(this.END_SEL);endContainer.insertBefore(tmpNode,endContainer.childNodes.item(endOffset));}
if(startContainer.nodeType==Node.TEXT_NODE||startContainer.nodeType==Node.CDATA_SECTION_NODE){if((startOffset>0&&startOffset<startContainer.data.length)||!startContainer.parentNode||!startContainer.parentNode.parentNode||startContainer!=startContainer.parentNode.lastChild)
startContainer.insertData(startOffset,this.BEG_SEL);else{tmpNode=doc.createTextNode(this.BEG_SEL);startContainer=startContainer.parentNode;if(startOffset==0)
startContainer.parentNode.insertBefore(tmpNode,startContainer);else
startContainer.parentNode.insertBefore(tmpNode,startContainer.nextSibling);}}else{tmpNode=doc.createTextNode(this.BEG_SEL);startContainer.insertBefore(tmpNode,startContainer.childNodes.item(startOffset));}}
tmpNode=doc.createElementNS(this.NS_XHTML,'div');tmpNode.appendChild(ancestorContainer);return tmpNode;},txt:'',NS_XHTML:'http://www.w3.org/1999/xhtml',BEG_SEL:'|||SNIP_SPLIT|||',END_SEL:'|||SNIP_SPLIT|||'};var Snipd=this.Snipd={STATIC_URL:'http://snipd.com/static/',_mouse_handlers:false,init:function(){var loc=document.location.toString();if(loc.search('https://')!=-1){this.STATIC_URL='https://snipd.com/static/';Data.BASE_AJAX_URL='https://snipd.com/ajax/';Settings.is_ssl=true;}
Data.inject_ajax_js('get_css/',{style:'styles/boxy.css'});if(!$.browser.msie){$('#snipd_message').css({position:'fixed'});}else{$('#snipd_message').css({maxWidth:'800px',width:'auto'});$('.snipd_msg_box_text').css({marginTop:'-5px'});}
this._mouse_handlers=this.mouse_handlers();Gui.create_snipd_box();if(!Settings.auto_snip){Snipd.compute_embedded_rects();Gui.hide_extended_box();}
Gui.create_extended_box();Binder.image_bind();Gui.create_visual_content_snip_div();Gui.insert_css();$(document).mousedown(this._mouse_handlers.mousedown).mouseup(this._mouse_handlers.mouseup).bind('mousemove',this._mouse_handlers.mousemove);Gui.hide_box();$('#visual_content_snip_bar').hide();var that=this;$(window).resize(function(e){$(document).unbind('mousemove');Snipd.compute_embedded_rects();$(document).bind('mousemove',that._mouse_handlers.mousemove);});var rand=Math.round(Math.random()*100000000000);Data.send_snippet_to_server({start_offset:'0',end_offset:'0',text:Common.convert_to_entity($('body').html()),yPosition:'0',type:'Q',priv:0,rand:rand},function(data){var data=Data.eval_json(data);if(data.content_id==-1||data.content_id=='-1'){Settings.content_rand=rand;}else{Settings.content_id=data.content_id;}
var txt=Selection.get_text();if(txt&&txt!='')
Actions.snip_action(false,function(){Gui.show_message_box("Snipd it.",true);});if(Snipd.is_sandbox()){Page.get_bookmarklet_done();}},true);Data.inject_ajax_js('check_auth/',{user_hash:Snipd_blet.user_hash});},is_sandbox:function(){if(typeof(snipd_sandbox)!='undefined'&&snipd_sandbox){return true;}else{return false;}},over_highlight:false,snipping_ready:false,mouse_handlers:function(e){var that=this,button_down=false,down_position_x=0,down_position_y=0,up_position_x=0,up_position_y=0,element_top=0,element_left=0,element_width=0,element_height=0,snippet=null;function is_mouse_over_embedded_object(e){var x=e.clientX+(window.pageXOffset||document.body.scrollLeft),y=e.clientY+(window.pageYOffset||document.body.scrollTop);for(var i=0;i<that.embedded_rects.length;i++){var rect=that.embedded_rects[i];var offset=rect.object.offset();element_top=rect.top;element_left=rect.left;element_width=rect.object.width();element_height=rect.object.height();var obj=that.is_point_in_rect({x:x,y:y},rect,25);if(obj&&that.can_item_be_seen(rect.object)){Common.log("INSIDE OBJECT");return rect;}}
return null;}
function set_button_down(is_down){button_down=is_down;Common.button_down=is_down;}
function check_over_highlight(e,selection){if(that.over_highlight||(selection&&selection!='')){if(Gui.get_visual_content_snip_div().is(':visible'))
Gui.get_visual_content_snip_div().hide();var _selection=snippet?snippet.selection:selection;Common.log('something is selected...');if(!Gui.get_snipd_box().is(':visible')&&!button_down){Common.log('Gui.showbox');Gui.show_box(_selection,{left:Common.calculate_e_pos(e).x,top:Common.calculate_e_pos(e).y},snippet||false,snippet||false);Common.log('if auto_snip, snipping.');if(Settings.auto_snip){Actions.snip_action(e,function(data){Gui.get_snip_link().hide();Gui.get_unsnip_link().show();});}}else{Common.log('button is up or snipd_box is visible, button_down: '+button_down+'snipd box is: '+Gui.get_snipd_box().is(':visible'));}}else{Common.log('null block, nothing selected');var offset=Gui.get_snipd_box().offset();Common.log('current positions: '+Common.calculate_e_pos(e).x+', '+Common.calculate_e_pos(e).y);var dist=Math.sqrt(Math.pow(Common.calculate_e_pos(e).x-offset.left,2)+
Math.pow(Common.calculate_e_pos(e).y-offset.top,2));Common.log('over image: '+Common.over_image);if(!Common.over_image){if(dist>40){Gui.hide_box();}}
Common.log('end over image check');}}
return{mousedown:function(e){Common.log('_____________down____________');var e_targ=Common.calculate_e_target(e);set_button_down(true);Common.log('mousedown');Gui.hide_box();down_position_x=e.pageX;down_position_y=e.pageY;},mouseup:function(e){Common.log('_____________up____________');set_button_down(false);Common.log('mouseup');try{var txt=Selection.get_text();if(txt&&txt!=''){Common.log('text is selected: '+txt);Common.log('running check_over_highlight()');check_over_highlight(e,txt);}}catch(err){Common.log('Error: cannot check_over_highlight(): '+err.message);}},highlight_enter:function(e){snippet=$(this).data('snipd_snippet');var _selection=snippet?snippet.selection:selection;if(!Gui.get_snipd_box().is(':visible')&&!button_down){Gui.show_box(_selection,{left:e.pageX,top:e.pageY},snippet||false,snippet||false);}},highlight_exit:function(e){snippet=null;},mousemove:function(e){},box_enter:function(e){Common.log('entering box');Common.over_box=true;Gui.get_snipd_box().css('background-color','#CCEEFF');Gui.get_snip_link().css('border-color','#316AC5');Gui.get_more_link().css('border-color','#316AC5');},box_exit:function(e){Common.over_box=false;Gui.get_snipd_box().css('background-color','white');Gui.get_snip_link().css('border-color','#CCCCCC');Gui.get_more_link().css('border-color','#CCCCCC');}}},embedded_rects:[],compute_embedded_rects:function(){Common.log("compute_embedded_rects");var that=this;that.embedded_rects=[];$('embed').each(function(){var obj=$(this);var offset=obj.offset();var rect={left:offset.left,top:offset.top,right:offset.left+obj.width(),bottom:offset.top+obj.height(),width:obj.width(),height:obj.height(),object:obj};if(!obj.hasClass('snipd')){that.embedded_rects[that.embedded_rects.length]=rect;var class_name='snipd_video_'+Math.round(Math.random()*100000000000);$('<div></div>').addClass(class_name).css({width:rect.width+20+'px',height:rect.height+20+'px',position:'absolute',top:rect.top-10+'px',left:rect.left-10+'px',background:'#EEEEEE',border:'3px dashed #CCCCCC'}).data('rect',rect).fadeTo(1,.6).bind('mouseover',function(e){if($('#snipd_extended_box').is(':visible'))
return;if(Common.over_visual_content_snip_div&&(Gui.get_visual_content_snip_div().is(':visible')||Common.over_image)){return;}else{Gui.get_visual_content_snip_div().hide();}
Gui.show_visual_content_snip_div(obj,{top:rect.top,left:rect.left,width:rect.width,height:rect.height},$(obj).data('snippet')||false,Common.is_image_snipped(obj),class_name);}).appendTo('body');}});},is_point_in_rect:function(point,rect,margin){if(!margin){margin=0;}
return point.x>=rect.left-margin&&point.x<=rect.right+margin&&point.y>=rect.top-margin&&point.y<=rect.bottom+margin;},can_item_be_seen:function(obj){if(obj[0]==$('body')[0]){return true;}
if($(obj).is(':visible')){return this.can_item_be_seen($(obj).parent());}else{return false;}}};})(jQuery.noConflict(true));Snipd.init();