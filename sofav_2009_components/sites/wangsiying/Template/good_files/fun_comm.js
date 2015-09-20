//==javascript==//
//= tab
function cTab(thisObj,Num)
{
	if(thisObj.className == "active")return;
	var tabObj = thisObj.parentNode.id;
	var cList = document.getElementById(tabObj).getElementsByTagName("li");
	for(i=0; i <cList.length; i++)
	{
		if (i == Num)
		{
			thisObj.className = "active"; 
			document.getElementById(tabObj+"_Content"+i).style.display = "block";
		}
		else
		{
			cList[i].className = "normal"; 
			document.getElementById(tabObj+"_Content"+i).style.display = "none";
		}
	};
};

//=jQuery=//
$(function() {
//<==
//= search_focus
jQuery.focusblur = function(focusid) {
	var focusblurid = $(focusid);
	var defval = focusblurid.val();
	focusblurid.focus(function(){
		var thisval = $(this).val();
		if(thisval==defval){
			$(this).val("");
		}
	});
	focusblurid.blur(function(){
		var thisval = $(this).val();
		if(thisval==""){
			$(this).val(defval);
		}
	});
	
};
$.focusblur("#q");
$.focusblur("#bh input.input-text");

//= navgation
$(".nav_ul > li").hover(function(){
	$(".nav_ul li").removeClass("nctive");
	$(this).addClass("nctive");
	},function(){
		$(this).removeClass("nctive");
	}
);
var aA=$(".nav_search p").find("span").length;
if(aA==1)
{
$(".nav_search p a").hover(function(){
	$(".nav_search p a").removeClass("active");
	$(this).addClass("active");
	},function(){
		
	}
);
}

//=web_show_mininav
if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
$(".web_doc_local .local_cat ul").css({width:$(".web_doc_local .local_cat").width()+15})
}
$(".web_doc_local .local_cat").hover(function(){
	$(".web_doc_local .local_cat .local_activ").addClass("yes_show");
	$(".web_doc_local .local_cat ul").stop(true,true).slideDown(200);
	},function(){
		$(".web_doc_local .local_cat .local_activ").removeClass("yes_show");
		$(".web_doc_local .local_cat ul").stop(true,true).slideUp(200);
	}
);

//suqiu_odd_even
$('.table_list tr:first').addClass('first')
$('.table_list tr:odd').addClass('odd'); 
$('.table_list tr:even').addClass('even'); 


//==>
});