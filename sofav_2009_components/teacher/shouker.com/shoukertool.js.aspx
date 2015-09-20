//**********************************************
//		author:sunning last update 2008.5.26
//		all rights reserved by shouker.com
//**********************************************

function $(uid
){return document.getElementById(uid)}

if(!$('shouker_tool')
){var shouker_tool_top=2;var shouker_tool_left=(document.body.clientWidth-768)/2;var shouker_imgArr=new Array();var shouker_oheight="42px";var _skid=0;shouker_tool={tool:null,script:null,style:null,frame:null,width:'768px',body_height:'442px',height:'477px',homeURL:'http://www.shouker.com/',acturl:'http://www.shouker.com/tools/comm/shoukertool.aspx?type=&ff=',nowdo:"",toolbarHTML:"<div id=\"shouker_tool_bar\" ><div id=\"shouker_tool_bar_01\">保存当前的:</div><div id=\"shouker_tool_bar_02\"><a href=\"javascript:;\" onclick=\"shouker_tool.doit(this);return false;\" class=\"shouker_tool_bar_02_normal_1\" id=\"shouker_tool_url\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" class=\"shouker_tool_bar_ico_1\"/> 网址</a><a href=\"javascript:;\" onclick=\"shouker_tool.doit(this);return false;\" class=\"shouker_tool_bar_02_normal_1\" id=\"shouker_tool_col\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" class=\"shouker_tool_bar_ico_2\"/> 网页</a><a href=\"javascript:;\" onclick=\"shouker_tool.doit(this);return false;\""
+" class=\"shouker_tool_bar_02_normal_1\" id=\"shouker_tool_pic\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" class=\"shouker_tool_bar_ico_3\"/> 图片</a><a href=\"javascript:;\" onclick=\"shouker_tool.doit(this);return false;\" class=\"shouker_tool_bar_02_normal_1\" id=\"shouker_tool_mic\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" class=\"shouker_tool_bar_ico_8\"/> 音乐</a><a href=\"javascript:;\" onclick=\"shouker_tool.doit(this);return false;\" class=\"shouker_tool_bar_02_normal_1\" id=\"shouker_tool_vod\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" class=\"shouker_tool_bar_ico_4\"/> 视频</a><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" style=\"width:100px; height:5px;\"/></div><div id=\"shouker_tool_bar_03\"><span id=\"shouker_tool_colse_layer\"><a href=\"javascript:;\" id=\"shouker_tool_toM\" onclick=\"shouker_tool.style12(false);return false;\" title=\"最小化\" class=\"shouker_tool_colse_02 shouker_tool_bar_ico_img_2\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\""
+" width=\"15\" height=\"15\"/></a><a href=\"javascript:;\" id=\"shouker_tool_toL\" onclick=\"shouker_tool.style12(true);return false;\" title=\"还原\" class=\"shouker_tool_colse_03 shouker_tool_bar_ico_img_2\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" width=\"15\" height=\"15\"/></a><a id=\"shouker_tool_toN\" class=\"shouker_tool_bar_ico_img_3\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" width=\"15\" height=\"15\"/></a><a href=\"javascript:;\" onclick=\"shouker_tool.destroy();return false;\" title=\"关闭\" class=\"tool_colse_01 tool_bar_ico_img_2\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_dot.gif\" width=\"15\" height=\"15\"/></a></span><img src=\"http://www.shouker.com/tools/images/layer_shouker_line_1.gif\" align=\"middle\"/></div><div id=\"shouker_tool_bar_head\"></div></div><div id=\"shouker_tool_main\"></div>",loginHTML:"<div id=\"shouker_tool_bar_mian_box\"><form action=\"tools/comm/shoukertool.aspx?act=Login\" style=\"margin:0px;padding:0px;\""
+" onsubmit=\"if(this.permanent.checked
){this.permanent.value=\'true\';}
else{this.permanent.value=\'false\';}
shouker_tool.submit(this);return false;\" name=\"shouker_login_form\"><div id=\"shouker_tool_bar_mian\"><div id=\"shouker_tool_bar_list_03\"><ul><li id=\"shouker_tool_bar_login\"><span id=\"shouker_tool_login_msg\">登录后永久保存该资源</span></li><li>用<span style=\"margin-left:4px\">户</span><span style=\"margin-left:4px\">名</span>：<input type=\"text\" name=\"shouer_name\" onclick=\"this.focus();return false;\" class=\"shouker_layer_input_5\" /></li><li>密<span style=\"margin-left:22px\">码</span>：<input type=\"password\" name=\"shouker_pwd\" onclick=\"this.focus();return false;\" class=\"shouker_layer_input_5\" /><a href=\"#\" class=\"shouker_font_12px\">忘记密码</a></li><li><label><input name=\"permanent\" type=\"checkbox\" value=\"\" style=\"margin-left:70px\"/>记住我的登录状态</label></li><li style=\"padding-top:12px\"><input type=\"submit\" name=\"shouker_login\" class=\"shouker_layer_btn\" style=\"margin-left:70px\""
+" value=\"登录收客\"/></li></ul></div><div id=\"shouker_tool_bar_list_right\"></div></div></form></div>",createTool:function(
){this.tool=document.createElement("div");with(this.tool.style
){position="absolute";zIndex="2147483099";width=this.width;height='0px';left=this.setClientLeft(shouker_tool_left)+"px";top=this.setClientTop(shouker_tool_top)+"px";}

this.style0();this.tool.id='shouker_tool';this.tool.onmousedown=this.ffDragging;document.body.appendChild(this.tool);}
,createStyle:function(
){this.style=document.createElement("link");with(this.style
){setAttribute('id','shouker_tool_style');setAttribute('rel','stylesheet');setAttribute('type','text/css');setAttribute('href','http://www.shouker.com/tools/comm/shoukertool.css');}

document.body.appendChild(this.style);}
,doit:function(obj
){var self=this;if(this.nowdo!=obj.id&&!$('shouker_tool_login_msg')
){this.cancelImage();setStyle();this.nowdo=obj.id;if(obj.id!="shouker_tool_pic"&&obj.id!="shouker_tool_htm"
){this.post("");}
}


function setStyle(
){if(obj.id=="shouker_tool_inf"||obj.id=="shouker_tool_inf1"
){}
else if(obj.id=="shouker_tool_htm"
){obj.className="shouker_tool_bar_02_normal_2_acitve";}
else{obj.className="shouker_tool_bar_02_normal_1_acitve";}

if(self.nowdo!=""&&self.nowdo!="shouker_tool_inf"&&self.nowdo!="shouker_tool_inf1"
){if(self.nowdo=="shouker_tool_htm"
){$(self.nowdo).className="shouker_tool_bar_02_normal_2";}
else{$(self.nowdo).className="shouker_tool_bar_02_normal_1";}
}

if(obj.id=="shouker_tool_htm"||obj.id=="shouker_tool_pic"
){self.style11(obj.id);}
else{self.style13();}
}
}
,style0:function(
){this.cancelImage();this.tool.innerHTML="<span style=\"background-color: #99FF33;\">「收客收藏工具」加载中...</span>";this.tool.style.height="20px";setTimeout("shouker_tool.launch(shouker_tool.acturl + Math.random())",1000);}
,style1:function(userinfo
){this.cancelImage();this.nowdo="";this.tool.innerHTML=this.toolbarHTML;if($("shouker_tool_bar_head")
){var userinfoDIV=$("shouker_tool_bar_head");userinfoDIV.innerHTML=userinfo;}

this.tool.style.height="42px";$("shouker_tool_toM").style.display="none";$("shouker_tool_toL").style.display="none";$("shouker_tool_toN").style.display="";}
,style10:function(
){if($("shouker_tool_main")
){var mainDIV=$("shouker_tool_main");mainDIV.innerHTML=this.loginHTML;}

this.tool.style.height="477px";$("shouker_tool_toM").style.display="none";$("shouker_tool_toL").style.display="none";$("shouker_tool_toN").style.display="";}
,style100:function(
){if($("shouker_tool_login_msg")
){var errmsg=$("shouker_tool_login_msg");errmsg.innerHTML="用户名或者密码错误";}

$("shouker_tool_toM").style.display="none";$("shouker_tool_toL").style.display="none";$("shouker_tool_toN").style.display="";}
,style11:function(type
){if($("shouker_tool_main")
){var mainDIV=$("shouker_tool_main");mainDIV.innerHTML="<div id=\"shouker_tool_bar_mian_box\"><div class=\"shouker_tool_bar_mian_2\"><div style=\"padding:30px 15px 0 15px\"><span style=\"float:left\">鼠标上移到您要<span style=\"color:#f60\">"
+(type=="shouker_tool_pic"?"收藏的图片":"截取内容区域")
+"</span>,<span style=\"color:#f60\">单击鼠标左键选中</span>,选择完后<a href=\"javascript:;\" onclick=\"shouker_tool.postImage();return false;\"><img src=\"http://www.shouker.com/tools/images/layer_shouker_btn_1.gif\" alt=\"确定保存\" align=\"middle\"/></a></span><span style=\"float:right;margin-top:5px;\"><a href=\"javascript:;\" onclick=\"shouker_tool.style1(userinfo);return false;\">取消保存</a></span></div></div></div>";}

this.tool.style.height="109px";shouker_oheight="109px";$("shouker_tool_main").style.display="";$("shouker_tool_toM").style.display="";$("shouker_tool_toL").style.display="none";$("shouker_tool_toN").style.display="none";
function run(
){document.onmousemove=selecting;}

var _ele=null;var _oskid=0;var _divborderWidth=5;

function selecting(){
	var e=arguments[0]||window.event;
	if(e.target){
		_ele=e.target;
	} else if(document.elementFromPoint){
		_ele=document.elementFromPoint(e.clientX ,e.clientY)
	}

	if(_ele!=null&&_ele.tagName&&_ele.tagName=="IMG"){
		if(!istoolImg(_ele)){
			toSkImg(_ele);
		}
	}

	if(_ele.getAttribute("skid")){
		var skid=_ele.getAttribute("skid");

		if(skid!=_oskid){
			if(_oskid>0){
				skImgOutfocus(_oskid);
			}
			skImgOnfocus(skid);
		}

		_oskid=skid;
	} else{
		if(_oskid>0){
			skImgOutfocus(_oskid);_oskid=0;
		}
	}
}


function toSkImg(img
){_skid++;img.setAttribute("skid",_skid);var outdiv=document.createElement("div");img.parentNode.insertBefore(outdiv,img);with(outdiv.style
){display="none";position="absolute";border=_divborderWidth+"px solid #f90";width=img.offsetWidth-_divborderWidth*2-parseIntNaN(getStyle(img,"border-left-width"))-parseIntNaN(getStyle(img,"border-right-width"))-parseIntNaN(getStyle(img,"padding-right"))-parseIntNaN(getStyle(img,"padding-left"))+"px";height=img.offsetHeight-_divborderWidth*2-parseIntNaN(getStyle(img,"border-top-width"))-parseIntNaN(getStyle(img,"border-bottom-width"))-parseIntNaN(getStyle(img,"padding-bottom"))-parseIntNaN(getStyle(img,"padding-top"))+"px";if(document.compatMode=="BackCompat"&&!!(window.attachEvent&&!window.opera)
){width=parseIntNaN(width)+_divborderWidth*2+"px";height=parseIntNaN(height)+_divborderWidth*2+"px";}

top=positionedOffset(img)[1]+parseIntNaN(getStyle(img,"border-top-width"))+parseIntNaN(getStyle(img,"padding-top"))+"px";left=positionedOffset(img)[0]+parseIntNaN(getStyle(img,"border-left-width"))+parseIntNaN(getStyle(img,"padding-left"))+"px";cursor="pointer";}

outdiv.title="单击收藏";outdiv.setAttribute("skid",_skid);outdiv.setAttribute("sk","no");outdiv.setAttribute("skimg",img.src);outdiv.id="skid"+_skid;var innerdiv=document.createElement("div");with(innerdiv.style
){width="100%";height="100%";background="#ffffff";MozOpacity="0";filter="alpha(opacity=0)";textAlign="center";}

innerdiv.setAttribute("skid",_skid);outdiv.appendChild(innerdiv);var selimg=document.createElement("img");selimg.src="http://www.shouker.com/tools/images/layer_right.png";selimg.border="0";with(selimg.style
){var w=img.width*2/3;var h=img.width*30/159;if(h>img.height*3/4
){h=img.height*3/4;w=img.height*159/60;}

width=w+"px";height=h+"px";marginTop=(img.height-h)/2+"px";border="0";display="none";}

selimg.setAttribute("skid",_skid);innerdiv.appendChild(selimg);}


function skImgOnfocus(skid
){var outdiv=$("skid"+skid);if(outdiv&&outdiv.getAttribute("sk")=="no"
){outdiv.style.display="";outdiv.onclick=function(
){var e=arguments[0]||window.event;e.cancelBubble=true;skImgOnselected(skid);return false;}
}
}


function skImgOutfocus(skid
){var outdiv=$("skid"+skid);if(outdiv&&outdiv.getAttribute("sk")=="no"
){outdiv.style.display="none";outdiv.onclick=null;}
}


function skImgOnselected(skid
){if(shouker_imgArr.length>=12
){alert("超过一次最大收藏数12张");return;}

var outdiv=$("skid"+skid);if(outdiv
){outdiv.setAttribute("sk","yes");outdiv.title="单击取消收藏";outdiv.onclick=function(
){skImgOutselected(skid);return false;}

var innerdiv=outdiv.firstChild;with(innerdiv.style
){background="#33cc33";MozOpacity="0.5";filter="alpha(opacity=50)";}

var selimg=innerdiv.firstChild;selimg.style.display="";shouker_imgArr.push(outdiv.getAttribute("skimg"));}
}


function skImgOutselected(skid
){var outdiv=$("skid"+skid);if(outdiv
){outdiv.setAttribute("sk","no");outdiv.title="单击收藏";outdiv.onclick=function(
){skImgOnselected(skid);return false;}

var innerdiv=outdiv.firstChild;with(innerdiv.style
){background="#ffffff";MozOpacity="0";filter="alpha(opacity=0)";}

var selimg=innerdiv.firstChild;selimg.style.display="none";moveArr(shouker_imgArr,outdiv.getAttribute("skimg"));}
}


function getStyle(oElm,strCssRule
){var strValue="";if(document.defaultView&&document.defaultView.getComputedStyle
){strValue=document.defaultView.getComputedStyle(oElm,"").getPropertyValue(strCssRule);}
else if(oElm.currentStyle
){strCssRule=strCssRule.replace(/\-(\w)/g,function(strMatch,p1
){return p1.toUpperCase();}
);strValue=oElm.currentStyle[strCssRule];}

return strValue;}


function positionedOffset(obj
){var valueT=0,valueL=0;do{valueT+=obj.offsetTop||0;valueL+=obj.offsetLeft||0;obj=obj.offsetParent;if(obj
){if(obj.tagName=="BODY")break;var p=getStyle(obj,"position");if(p!="static")break;}
}
while(obj);return new Array(valueL,valueT);}


function moveArr(arr,src
){for(var i=0;i<arr.length;i++
){if(arr[i]==src
){arr.splice(i,1);break;}
}
}


function parseIntNaN(str
){if(!parseInt(str))
return 0;else
return parseInt(str);}


function istoolImg(img){

	var shoukerImgs=$("shouker_tool").getElementsByTagName("img");

	for(var i=0;i<shoukerImgs.length;i++) {
		if(shoukerImgs[i]==img){
			return true;
		}
	}

	if(img.getAttribute("skid")){
		return true;
	}

	return false;
}

if(type=="shouker_tool_pic"
){run();}
}
,style12:function(is
){if(is
){this.tool.style.height=shouker_oheight;$("shouker_tool_main").style.display="";$("shouker_tool_toM").style.display="";$("shouker_tool_toL").style.display="none";$("shouker_tool_toN").style.display="none";}
else{this.tool.style.height="42px";$("shouker_tool_main").style.display="none";$("shouker_tool_toM").style.display="none";$("shouker_tool_toL").style.display="";$("shouker_tool_toN").style.display="none";}
}
,style13:function(
){if($("shouker_tool_main")
){var mainDIV=$("shouker_tool_main");mainDIV.innerHTML="<iframe name=\"shouker_tool_frame\" height=\"477\" width=\"768\" border=\"0\" frameborder=\"0\" scrolling=\"no\" style=\"overflow:hidden;\"></iframe>";}

this.tool.style.height="477px";shouker_oheight="477px";$("shouker_tool_main").style.display="";$("shouker_tool_toM").style.display="";$("shouker_tool_toL").style.display="none";$("shouker_tool_toN").style.display="none";}
,destroy:function(
){this.cancelImage();this.tool.parentNode.removeChild(this.tool);if(this.script.parentNode
){this.script.parentNode.removeChild(this.script);}
else{this.script.removeNode(true);}

this.style.parentNode.removeChild(this.style);}
,ffDragging:function(
){var e=arguments[0]||window.event;var obj=shouker_tool.tool;var x=parseInt(obj.style.left);var y=parseInt(obj.style.top);var x_=e.clientX-x;var y_=e.clientY-y;if(document.addEventListener
){document.addEventListener('mousemove',inFmove,true);document.addEventListener('mouseup',inFup,true);}
else if(document.attachEvent
){document.attachEvent('onmousemove',inFmove);document.attachEvent('onmouseup',inFup);}

if(obj.setCapture
){obj.setCapture();}

else{window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);}

obj.setAttribute("ffDragging","yes");inFstop(e);inFabort(e);
function inFmove(e
){var evt;if(!e)e=window.event;if(e.button==1||e.which==1
){if(obj.getAttribute("ffDragging")=="yes"
){if(e.clientY-y_<shouker_tool.setClientTop(-22))return false;if(e.clientX-x_<shouker_tool.setClientLeft(-748))return false;if(e.clientY-y_>shouker_tool.setClientTop(shouker_tool.getClientHeight()-20))return false;if(e.clientX-x_>shouker_tool.setClientLeft(shouker_tool.getClientWidth()-20))return false;obj.style.left=e.clientX-x_+'px';obj.style.top=e.clientY-y_+'px';inFstop(e);}
}
}


function inFup(e
){var evt;if(!e)e=window.event;if(document.removeEventListener
){document.removeEventListener('mousemove',inFmove,true);document.removeEventListener('mouseup',inFup,true);}
else if(document.detachEvent
){document.detachEvent('onmousemove',inFmove);document.detachEvent('onmouseup',inFup);}

if(obj.releaseCapture
){obj.releaseCapture();}

else{window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);}

obj.setAttribute("ffDragging","no");shouker_tool_top=parseInt(obj.style.top)-shouker_tool.setClientTop(0);shouker_tool_left=parseInt(obj.style.left)-shouker_tool.setClientLeft(0);inFstop(e);}


function inFstop(e
){if(e.stopPropagation)return e.stopPropagation();else return e.cancelBubble=true;}


function inFabort(e
){if(e.preventDefault)return e.preventDefault();else return e.returnValue=false;}
}
,submit:function(form
){var url=this.homeURL+form.getAttribute('action')+'&ff='+Math.random()+'&'+this.serialize(form);this.launch(url);}
,serialize:function(form
){if(form&&form.elements&&form.elements.length>0
){var fElements=form.elements;var params=new Array();for(var i=0;i<fElements.length;i++
){params[i]=fElements[i].name+"="+encodeURIComponent(fElements[i].value);}

return params.join("&");}

return"";}
,onscrollListener:function(
){if(document.addEventListener
){document.addEventListener('scroll',setPosition,true);}
else if(document.attachEvent
){window.attachEvent('onscroll',setPosition);}


function setPosition(
){shouker_tool.tool.style.top=shouker_tool.setClientTop(shouker_tool_top)+"px";shouker_tool.tool.style.left=shouker_tool.setClientLeft(shouker_tool_left)+"px";}
}
,setClientTop:function(top
){var scrollPos;if(typeof window.pageYOffset!='undefined'
){scrollPos=window.pageYOffset;}
else if(typeof document.compatMode!='undefined'&&document.compatMode!='BackCompat'
){scrollPos=document.documentElement.scrollTop;}
else if(typeof document.body!='undefined'
){scrollPos=document.body.scrollTop;}

return scrollPos+top;}
,setClientLeft:function(left
){var scrollPos;if(typeof window.pageXOffset!='undefined'
){scrollPos=window.pageXOffset;}
else if(typeof document.compatMode!='undefined'&&document.compatMode!='BackCompat'
){scrollPos=document.documentElement.scrollLeft;}
else if(typeof document.body!='undefined'
){scrollPos=document.body.scrollLeft;}

return scrollPos+left;}
,getClientHeight:function(
){var scrollPos;if(typeof document.compatMode!='undefined'&&document.compatMode!='BackCompat'
){scrollPos=document.documentElement.clientHeight;}
else if(typeof document.body!='undefined'
){scrollPos=document.body.clientHeight;}

return scrollPos;}
,getClientWidth:function(
){var scrollPos;if(typeof document.compatMode!='undefined'&&document.compatMode!='BackCompat'
){scrollPos=document.documentElement.clientWidth;}
else if(typeof document.body!='undefined'
){scrollPos=document.body.clientWidth;}

return scrollPos;}
,getLargestFrame:function(
){var _frames=null;var largestFrame=null;if(document.getElementsByTagName('frame').length>0)_frames=window.frames;if(_frames&&_frames.length>0
){for(i=0;i<_frames.length;i++
){var subFrame=_frames[i];if(largestFrame==null
){largestFrame=subFrame;}
else{var largestArea=largestFrame.document.body.clientHeight*largestFrame.document.body.clientWidth;var currentArea=subFrame.document.body.clientHeight*subFrame.document.body.clientWidth;if(currentArea>largestArea)
largestFrame=subFrame}
}
}
else{largestFrame=window;}

return largestFrame;}
,launch:function(url
){this.script=this.getLargestFrame().document.createElement('script');with(this.script
){setAttribute('id','shouker_tool_scripts');setAttribute('type','text/javascript');setAttribute('src',url);setAttribute('charset','utf-8');}

this.script.onload=this.script.onreadystatechange=function(
){if(this.readyState&&this.readyState=='loading')return;var launcher=$('shouker_tool_scripts');launcher.parentNode.removeChild(launcher);}

this.getLargestFrame().document.body.appendChild(this.script);}
,post:function(ps
){var postForm=document.createElement("form");if(this.nowdo=="shouker_tool_inf1"
){postForm.action="http://www.shouker.com/tools/shouker_tool_inf.aspx";}
else{postForm.action="http://www.shouker.com/tools/"+this.nowdo+".aspx";}

postForm.target="shouker_tool_frame";postForm.method="post";var input=null;for(var i=0;i<5;i++
){input=document.createElement("input");input.type="hidden";postForm.appendChild(input);}

var title=document.title;if(title.indexOf("-")>-1)
title=title.substr(0,title.indexOf("-"));
function getSelectedText(
){if(window.getSelection)
return window.getSelection().toString();else if(document.getSelection)
return document.getSelection();else if(document.selection)
return document.selection.createRange().text;}

if(this.nowdo=="shouker_tool_url"||this.nowdo=="shouker_tool_col"||this.nowdo=="shouker_tool_htm"
){postForm.childNodes[0].name="url";postForm.childNodes[0].value=encodeURIComponent(window.location.href);postForm.childNodes[1].name="title";postForm.childNodes[1].value=encodeURIComponent(title);postForm.childNodes[2].name="tags";postForm.childNodes[2].value="";postForm.childNodes[3].name="desc";postForm.childNodes[3].value=encodeURIComponent(getSelectedText());}

if(this.nowdo=="shouker_tool_pic"
){postForm.childNodes[0].name="picurl";postForm.childNodes[0].value=encodeURIComponent(ps);postForm.childNodes[1].name="pictitle";postForm.childNodes[1].value=encodeURIComponent(title);postForm.childNodes[2].name="pictags";postForm.childNodes[2].value="";postForm.childNodes[3].name="picdesc";postForm.childNodes[3].value=encodeURIComponent(getSelectedText());}

if(this.nowdo=="shouker_tool_mic"
){var temp=this.getMusicInfo();postForm.childNodes[0].name="musurl";postForm.childNodes[0].value=encodeURIComponent(temp[0].length>0?temp[0]:"");postForm.childNodes[1].name="mustitle";postForm.childNodes[1].value=encodeURIComponent(temp[1].length>0?temp[1]:"");postForm.childNodes[2].name="mussinger";postForm.childNodes[2].value=encodeURIComponent(temp[2].length>0?temp[2]:"");postForm.childNodes[3].name="muicdesc";postForm.childNodes[3].value=encodeURIComponent(getSelectedText());}

if(this.nowdo=="shouker_tool_vod"
){postForm.childNodes[0].name="vodcode";postForm.childNodes[0].value=encodeURIComponent(this.getFlashObject());postForm.childNodes[1].name="vodtitle";postForm.childNodes[1].value=encodeURIComponent(title);postForm.childNodes[2].name="vodtags";postForm.childNodes[2].value="";postForm.childNodes[3].name="voddesc";postForm.childNodes[3].value=encodeURIComponent(getSelectedText());}

postForm.childNodes[4].name="from";postForm.childNodes[4].value=encodeURIComponent(window.location.href);this.tool.appendChild(postForm);postForm.submit();postForm.parentNode.removeChild(postForm);}
,run:function(
){this.createStyle();this.createTool();this.onscrollListener();}
,postImage:function(
){if(shouker_imgArr.length>0
){this.style13();this.post(shouker_imgArr.join("|"));this.cancelImage();}
else{alert("没有图片被选中");}
}
,cancelImage:function(
){document.onmousemove=null;while(shouker_imgArr.length>0
){shouker_imgArr.shift();}

for(var i=0;i<=_skid;i++
){var outdiv=$("skid"+i);if(outdiv
){outdiv.style.display="none";outdiv.setAttribute("sk","no");outdiv.title="单击收藏";outdiv.onclick=null;var innerdiv=outdiv.firstChild;with(innerdiv.style
){background="#ffffff";MozOpacity="0";filter="alpha(opacity=0)";}

var selimg=innerdiv.firstChild;selimg.style.display="none";}
}
}
,getMusicInfo:function(
){var info=new Array("","","");var infostr=findFromLink();info[0]=infostr.split("$shouker$")[0];info[1]=infostr.split("$shouker$")[1];if(info[0].length==0
){info[0]=findFromObject();}

if(info[0].length==0
){info[0]=findFromEmbed();}

return info;
function findFromDoc(
){return findmp3url(document.documentElement.outerHTML);}


function findFromLink(
){if(document.getElementsByTagName("a").length>0
){for(var i=0;i<document.getElementsByTagName("a").length;i++
){var obj=document.getElementsByTagName("a")[i];var temp=findmp3url(obj.href);if(temp.length>0&&obj.href.indexOf(temp)==0
){var title=(obj.textContent==undefined?obj.innerText:obj.textContent);if(title.indexOf("http://")<0
){return temp+"$shouker$"+title;}
else{return temp+"$shouker$";}
}
}
}

return"$shouker$";}


function findFromObject(
){if(document.getElementsByTagName("object").length>0
){for(var i=0;i<document.getElementsByTagName("object").length;i++
){var obj=document.getElementsByTagName("object")[i];var temp=obj.innerHTML;if(temp.length>0
){temp=findmp3url(temp);if(temp.length>0
){return temp;}
}
else{for(var j=0;j<obj.childNodes.length;j++
){var temp=findmp3url(obj.childNodes[j].value);if(temp.length>0
){return temp;}
}
}
}
}

return"";}


function findFromEmbed(
){if(document.getElementsByTagName("embed").length>0
){for(var i=0;i<document.getElementsByTagName("embed").length;i++
){var obj=document.getElementsByTagName("embed")[i];for(var j=0;j<obj.attributes.length;j++
){var temp=obj.attributes[j].nodeValue;if(temp!=null&&temp.length>10
){temp=findmp3url(temp);if(temp.length>0
){return temp;}
}
}
}
}

return"";}


function findmp3url(str
){if(str==null||str==undefined)
return"";var flag=str.indexOf('.mp3');if(flag>0
){var temp=str.substring(0,flag+4);flag=temp.lastIndexOf('http://')<0?temp.lastIndexOf('mms://'):temp.lastIndexOf('http://');if(flag>=0
){temp=temp.substring(flag,temp.length);if(IsURL(temp)&&temp.indexOf("/",8)>0
){return temp;}
}
}

return"";}


function IsURL(urlString
){var temp=urlString.charAt(urlString.length-1);if(temp=="/")
urlString=urlString.substring(0,urlString.length-1);regExp=/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;if(urlString.match(regExp))return true;else return false;}
}
,getFlashObject:function(
){var temp=getFlashCode();if(temp!=""
){return temp;}
else if(document.getElementsByTagName("object").length>0
){return document.getElementsByTagName("object")[0].outerHTML;}
else if(document.getElementsByTagName("embed").length>0
){var embedA=document.getElementsByTagName("embed")[0];if(embedA.src.indexOf("http://")!=0
){if(embedA.src.indexOf("/")==0
){embedA.src=location.protocol+"//"+location.hostname+embedA.src;}
else{embedA.src=location.href.substring(0,location.href.lastIndexOf("/")+1)+embedA.src;}
}

return document.getElementsByTagName("embed")[0].outerHTML;}


function getFlashCode(
){var reFlashCode="";var domainstr=location.href;var domainlen=domainstr.indexOf("/",8);if(domainlen>0
){domainstr=domainstr.substr(0,domainlen);if(domainstr=="http://you.video.sina.com.cn"
){var filename=location.href;filename=filename.substring(filename.lastIndexOf("/")+1,filename.lastIndexOf("."));reFlashCode="<object id=\"ssss\" width=\"475\" height=\"447\" ><param name=\"allowScriptAccess\" value=\"always\" /><embed pluginspage=\"http://www.macromedia.com/go/getflashplayer\" src=\"http://vhead.blog.sina.com.cn/player/outer_player.swf?auto=0&vid="
+filename.split("-")[0]+"&uid="+filename.split("-")[1]+"\" type=\"application/x-shockwave-flash\" name=\"ssss\" allowFullScreen=\"true\" allowScriptAccess=\"always\" width=\"475\" height=\"447\"></embed></object>";}
else if(domainstr=="http://www.56.com"||domainstr=="http://andylau.56.com"||domainstr=="http://v.youku.com"
){var filename="";for(var i=0;i<document.getElementsByTagName("input").length;i++
){filename=document.getElementsByTagName("input")[i].value;if(filename.substring(filename.length-4,filename.length)==".swf"
){reFlashCode="<embed src=\""+filename+"\" quality=\"high\" width=\"450\" height=\"372\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\"></embed>";}
}
}
else if(document.getElementsByTagName("input").length>0
){for(var i=0;i<document.getElementsByTagName("input").length;i++
){if(document.getElementsByTagName("input")[i].value.toLowerCase().indexOf("<object")>-1)
reFlashCode=document.getElementsByTagName("input")[i].value;}
}
}

return reFlashCode;}
}
}

shouker_tool.run();}
