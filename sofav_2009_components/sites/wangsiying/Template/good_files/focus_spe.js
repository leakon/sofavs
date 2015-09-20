$(function() {
var sWidth = $("#special_focus").width();
var len = $("#special_focus ul li").length;
var index = 0;
var picTimer;
var btn = "<div class='btnBg'></div><div class='btn'>";
for(var i=0; i < len; i++) {
	btn += "<span></span>";
}
btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
$("#special_focus").append(btn);
var btnWidth=($("#special_focus .btn span")[0].offsetWidth+5)*len;
$("#special_focus .btn").css({width:btnWidth+'px',left:(sWidth-btnWidth)/2});
$("#special_focus .btnBg").css("opacity",0.5);
$("#special_focus .btn span").mouseenter(function() {
	index = $("#special_focus .btn span").index(this);
	showPics(index);
}).eq(0).trigger("mouseenter");

$("#special_focus ul").css("width",sWidth * (len));

$("#special_focus").hover(function() {
	clearInterval(picTimer);
},function() {
	picTimer = setInterval(function() {
		showPics(index);
		index++;
		if(index == len) {index = 0;}
	},1000);
}).trigger("mouseleave");

function showPics(index) {
    var newIdx  = index % len;
	var nowLeft = -newIdx*sWidth;
	$("#special_focus ul").stop(true,false).animate({"left":nowLeft},300);
	$("#special_focus .btn span").removeClass("on").eq(newIdx).addClass("on");
	$("#special_focus .btn span").eq(newIdx + len).addClass("on");
}

});
