//==javascript==//


//=jQuery=//
$(function() {
//nav_index_0default
$(".nav_ul > li").hover(function(){
	$(".nav_ul li").removeClass("nctive");
	$(this).addClass("nctive");
	},function(){
		$(this).removeClass("nctive");
	}
);

//scroller_news
var sSpeed = 30; 
var $sTab=$(".scroller_fun"); 
var $sTab1=$(".s_wrap_1"); 
var $sTab2=$(".s_wrap_2"); 
$sTab2.html($sTab1.html()); 
function Marquee(){ 
	if($sTab2[0].offsetWidth-$sTab[0].scrollLeft<=0) 
	$sTab[0].scrollLeft-=$sTab1[0].offsetWidth; 
	else{ 
		$sTab[0].scrollLeft++; 
	} 
};
var MySMar=setInterval(Marquee,sSpeed);  
$sTab.hover(function(){ 
	clearInterval(MySMar); 
	},function(){ 
	MySMar=setInterval(Marquee,sSpeed) 
});

//focus
var Width = $("#focus").width();
var Len = $("#focus ul li").length;
var Index = 0;
var picTimer;
var fSpeed=4000;
var Btn = "<div class='btn'>";
for(var i=0; i < Len; i++) {
	Btn += "<span></span>";
};
Btn += "</div>";
$("#focus").append(Btn);
var btnWidth=($("#focus .btn span")[0].offsetWidth+2)*Len;
$("#focus .btn").css({width:btnWidth+'px',left:(Width-btnWidth)/2});
$("#focus .btn span").mouseenter(function() {
	Index = $("#focus .btn span").index(this);
	showFocus(Index);
}).eq(0).trigger("mouseenter");
$("#focus ul").css("width",Width * (Len));
$("#focus").hover(function() {
	clearInterval(picTimer);
},function() {
	picTimer = setInterval(function() {
		showFocus(Index);
		Index++;
		if(Index == Len) {Index = 0;}
	},fSpeed);
}).trigger("mouseleave");
function showFocus(Index) {
    var inputIndex  = Index;
    Index   = Index % Len;
	var nowLeft = -Index*Width;
	$("#focus ul").stop(true,false).animate({"left":nowLeft},200);
	$("#focus .btn span").removeClass("on").eq(Index + Len).addClass("on");
	$("#focus .btn span").eq(Index).addClass("on");
};

//tu_picshow
$('#pc_160_100').bxCarousel({
	display_num:4,
	move:4,
	auto:true,
	auto_interval:10000,
	margin:17
});
//link_pic
$('#lk_158_88').bxCarousel({
	display_num:4,
	move:4,
	auto:true,
	auto_interval:8000,
	margin:17
});

//iztc
var _list=$('.work_che_list ul');
var _len=_list.length;
var _index=0;
var _speed=5000;
var _moving; 
var _ul='<ul>'
for(var i=1; i<=_len; i++){
_ul=_ul+'<li>'+i+'</li>';
}
_ul=_ul+'</ul>';
$('div.ico').append(_ul);
var _ico=$('.ico li');
_ico.mouseover(function(){
_index=_ico.index(this);
/*
_list.filter(':visible').hide(function(){
	_list.eq(_index).show();
})
*/
_list.hide();
_list.eq(_index).show();
$(this).addClass('high').siblings().removeClass('high');
}).eq(0).mouseover();
_moving=setInterval(autoShow,_speed);
_list.hover(function(){clearInterval(_moving)},function(){
_moving=setInterval(autoShow,_speed);
})
function autoShow(){
_index++;
if(_index==_len)
_index=0;
_ico.eq(_index).trigger('mouseover');
}; 

//==>
});


//==function==//
//fun_scroll_pic
(function($){$.fn.bxCarousel=function(options){var defaults={move:7,display_num:7,speed:1000,margin:0,auto:true,auto_interval:10000,auto_dir:'next',auto_hover:false,next_text:'next',next_image:'',prev_text:'prev',prev_image:'',controls:true};var options=$.extend(defaults,options);return this.each(function(){var $this=$(this);var li=$this.find('li');var first=0;var fe=0;var last=options.display_num-1;var le=options.display_num-1;var is_working=false;var j='';var clicked=false;li.css({'float':'left','listStyle':'none','marginRight':options.margin});var ow=li.outerWidth(true);wrap_width=(ow*options.display_num)-options.margin;var seg=ow*options.move;$this.wrap('<div class="bx_container"></div>').width(999999);if(options.controls){if(options.next_image!=''||options.prev_image!=''){var controls='<a href="" class="prev"><img src="'+options.prev_image+'"/></a><a href="" class="next"><img src="'+options.next_image+'"/></a>';}
else{var controls='<a href="" class="prev">'+options.prev_text+'</a><a href="" class="next">'+options.next_text+'</a>';}}
$this.parent('.bx_container').wrap('<div class="bx_wrap"></div>').css({'position':'relative','width':wrap_width,'overflow':'hidden'}).before(controls);var w=li.slice(0,options.display_num).clone();var last_appended=(options.display_num+options.move)-1;$this.empty().append(w);get_p();get_a();$this.css({'position':'relative','left':-(seg)});$this.parent().siblings('.next').click(function(){slide_next();clearInterval(j);clicked=true;return false;});$this.parent().siblings('.prev').click(function(){slide_prev();clearInterval(j);clicked=true;return false;});if(options.auto){start_slide();if(options.auto_hover&&clicked!=true){$this.find('li').live('mouseenter',function(){if(!clicked){clearInterval(j);}});$this.find('li').live('mouseleave',function(){if(!clicked){start_slide();}});}}
function start_slide(){if(options.auto_dir=='next'){j=setInterval(function(){slide_next()},options.auto_interval);}else{j=setInterval(function(){slide_prev()},options.auto_interval);}}
function slide_next(){if(!is_working){is_working=true;set_pos('next');$this.animate({left:'-='+seg},options.speed,function(){$this.find('li').slice(0,options.move).remove();$this.css('left',-(seg));get_a();is_working=false;});}}
function slide_prev(){if(!is_working){is_working=true;set_pos('prev');$this.animate({left:'+='+seg},options.speed,function(){$this.find('li').slice(-options.move).remove();$this.css('left',-(seg));get_p();is_working=false;});}}
function get_a(){var str=new Array();var lix=li.clone();le=last;for(i=0;i<options.move;i++){le++
if(lix[le]!=undefined){str[i]=$(lix[le]);}else{le=0;str[i]=$(lix[le]);}}
$.each(str,function(index){$this.append(str[index][0]);});}
function get_p(){var str=new Array();var lix=li.clone();fe=first;for(i=0;i<options.move;i++){fe--
if(lix[fe]!=undefined){str[i]=$(lix[fe]);}else{fe=li.length-1;str[i]=$(lix[fe]);}}
$.each(str,function(index){$this.prepend(str[index][0]);});}
function set_pos(dir){if(dir=='next'){first+=options.move;if(first>=li.length){first=first%li.length;}
last+=options.move;if(last>=li.length){last=last%li.length;}}else if(dir=='prev'){first-=options.move;if(first<0){first=li.length+first;}
last-=options.move;if(last<0){last=li.length+last;}}}});}})(jQuery);
