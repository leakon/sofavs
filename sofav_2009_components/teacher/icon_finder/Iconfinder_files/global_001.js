function download(format)
{
	if(format=='PNG')
	{
		$('#downloadloader-PNG').slideDown('fast');
		setTimeout("$('#downloadloader-PNG').slideUp('fast');",2000 );
	}
	else
	{
		$('#downloadloader-ICO').slideDown('fast');
		setTimeout("$('#downloadloader-ICO').slideUp('fast');",4000 );
	}
	pageTracker._trackEvent('Download',format);
	return false;
}


function sfocus()
{
	$("#inputField").focus();
	return false;
}


function loadJsResults()
{		
	// Iconza stuff
	//loadcolorpicker();

	$('.ui-corner-all').hover(
		function(){ 
			$(this).addClass("ui-state-hover"); 
		},
		function(){ 
			$(this).removeClass("ui-state-hover"); 
		}
	)
	
	$("#inputField").click(
	function()
	{
		sfocus();	
		return false;
	});
	
	$(".numberchoose").click(
	function()
	{
		$(".numberchoose").removeClass("numberselected");
		$(this).addClass("numberselected");
		updatenumber();
		return false;
	});
		
	$(".colorchoose").click(
	function()
	{
		$(".colorchoose").removeClass("colorselected");
		$(this).addClass("colorselected");
		updatecolor();
		return false;
	});
		
	/* VOTES */	
	$(".vote").click(
	function()
	{
		$(this).parent().parent().parent().parent().slideUp('fast');
		id = $(this).siblings(".iconid").val();
		voted = $(this).val();
				
		$.get("/ajax/votetags/", 
		{ 
			id: id,
			voted: voted
		},
		function(data)
		{
			return false;
		});	
		return false;
	});
	
	update = 0;	
	loadinfo();	
	//loadrelated();
	//loadiconhover();
	
	$("#custom").submit(
	function()
	{
		form_name = $(this).find('#form_name').val();
		form_email = $(this).find('#form_email').val();
		form_description = $(this).find('#form_description').val();
		$(this).html('&nbsp;');
		$(this).parent().addClass('loading');
		
		$.post("/ajax/submitform/", 
		{ 
			form_name: form_name,
			form_email: form_email,
			form_description: form_description
		},
		function(data)
		{	
			$("#submitformwrapper").parent().removeClass("loading");
			$("#submitformwrapper").parent().html(data);
			return false;
		});
		//pageTracker._trackEvent('Submit form','Custom icon design');	
		return false;
	});
	

	$("#feedbackbutton").click(
	function()
	{
		form_description = $('#feedbacktext').val();
		$("#feedback").html('&nbsp;');
		$("#feedback").addClass('loading');
		
		form_name = 'feedback';
		form_email = 'N/A';
		
		$.post("/ajax/submitform/", 
		{ 
			form_name: form_name,
			form_email: form_email,
			form_description: form_description
		},
		function(data)
		{	
			$("#feedback").removeClass("loading");
			$("#feedback").html(data);
			setTimeout("$('#feedback').slideUp('fast');",2000);
			return false;
		});
		//pageTracker._trackEvent('Submit form','Feedback');	
		return false;
	});
	

	initstars();
	
	return false;
}

/* -------------------------- INFO MENU --------------------------- */

var timeout    = 0;
var closetimer = 0;
var ddmenuitem = 0;

function loadinfo()
{
	document.onclick = hideallinfo;

	$(".infolink").click(
	function()
	{
		obj = $(this).parent('.info');
		obj.children('.infomenu').html('Please wait'); 	
		showinfo(obj);
		return false;		
	});

	obj = null;
	return false;
}

function showinfo(obj)
{
	canceltimerinfo();
	hideinfo($(document).find('.infomenu'));			
	obj.children('.infolink').addClass("selected");
	infomenu = obj.children('.infomenu');
	infomenu.css("display","block");	
	infomenu.addClass("loading");
	infomenu.dropShadow();

	id = obj.children('.hiddeniconid').val();
	hiddensize = obj.children('.hiddensize').val();

	$.get("/ajax/infomenu/", 
	{ 
		id: id,
		size: hiddensize
	},
	function(data)
	{	
		infomenu.html(data);
		infomenu.removeClass("loading");
		if(infomenu.css("display")=="block")
			infomenu.redrawShadow();
	});

	pageTracker._trackEvent('Info menu','Show info',id);	

	obj = null;
	id = null;
	hiddensize = null;
	return false;
}

function timerinfo(obj)
{
	closetimer = window.setTimeout(hideallinfo, timeout);
	return false;	
}

function hideallinfo()
{
	if(tagsedited==0)
		hideinfo($(document).find('.infomenu'));
	
	if(switcheron==1)
		hideswitcher();	

	if(coloron==1)
		hidecolorpicker();	
}

function hideinfo(obj)
{
	obj.siblings('.infolink').removeClass("selected");
	obj.removeShadow();
	obj.fadeOut('fast');
	//infomenu.fadeOut('fast');
}

function canceltimerinfo()
{  
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
	return false;
}

/* -------------------------- TAGS --------------------------- */

var tagsedited = 0;
var switcheron = 0;
var coloron = 0;

function tagsubmit(id)
{
	// Get iconid from hidden input	
	var n = $('#'+id).val();
	var size = $('#s'+id).val();
	var iconid = $('#i'+id).val();
	
	//alert(iconid + ' - ' + size + ' - ' + n + ' - ');

	$('#'+id).addClass("loading");
	$('#tagsbox'+id).css("display","block");
	$('#tagsbox'+id).html("Submitting tags");

	$.get("/ajax/savetags/", 
	{ 
		iconid: iconid,
		size: size,
		n: n
	},
	function(data)
	{	
		$('#'+id).removeClass("loading");
		$('#tagsbox'+id).html("Tags submitted succesfully.");
		tagsedited = 0;
		window.setTimeout(hideallinfo, timeout);
		pageTracker._trackEvent('Info menu','Submit tags',parseInt(id));	
		return false;
	});
	return false;
}

function savetags(button,iconid,size)
{
	// Get iconid from hidden input	
	var n = $('#tags'+iconid).val();
	
	$('#tags'+iconid).addClass("loading");
	$(button).val('Submitting tags');
	
	$.get("/ajax/savetags/", 
	{ 
		iconid: iconid,
		size: size,
		n: n
	},
	function(data)
	{	
		$('#tags'+iconid).removeClass("loading");
		$(button).val('Tags submitted');
		pageTracker._trackEvent('Icon details','Submit tags',parseInt(iconid));	
		return false;
	});
	return false;
}


function tagfocus(obj)
{
	tagsedited = 1;
	return false;
}

function tagcancel(obj)
{
	tagsedited = 0;
	hideallinfo();
}


function rate(iconid,value,link)
{
	
	i=0;
	$('.star').each(function()
	{
		if(i < value)
		{
			$(this).addClass('clicked');
		}
		i++;
	});

	$.get("/ajax/rate/", 
	{ 
		iconid: iconid,
		value: value
	},
	function(data)
	{
		$('#checkmark-'+iconid).css("display","inline");
		return false;
	});	
	return false;
}

function initstars()
{
	$(".star").hover(function()
	{
		$(this).addClass('hover');	
		$(this).prevALL('.star').addClass('hover');	
		return false;
	},
	function()
	{
		$(this).removeClass('hover');	
		$(this).prevALL('.star').removeClass('hover');	
		return false;	
	});
	
	
	$.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
	};

	// create two new functions: prevALL and nextALL. they're very similar, hence this style.
	$.each( ['prev', 'next'], function(unusedIndex, name) {
	    $.fn[ name + 'ALL' ] = function(matchExpr) {
	        // get all the elements in the body, including the body.
	        var $all = $('body').find('*').andSelf();
	
	        // slice the $all object according to which way we're looking
	        $all = (name == 'prev')
	             ? $all.slice(0, $all.index(this)).reverse()
	             : $all.slice($all.index(this) + 1)
	        ;
	        // filter the matches if specified
	        if (matchExpr) $all = $all.filter(matchExpr);
	        return $all;
	    };
	});
}



/* -------------------------- SETTINGS --------------------------- */

function updatecolor()
{
	val = $('.colorselected').css("background-color");
	name = 'bgcolor';	
	$('body').find('.icon').css("background-color",val);				
	$.get("/ajax/cookie/", 
	{ 
		name: name,
		val: val
	},
	function(data)
	{
		return false;
	});
	pageTracker._trackEvent('Settings','Change color',val);	
	val = null;
	name = null;
	return false;
}


function updatenumber()
{
	val = $('.numberselected').attr("id");
	name = 'numberofresults';	

	$.get("/ajax/cookie/", 
	{ 
		name: name,
		val: val
	},
	function(data)
	{
		updatesearch();
	});		
	pageTracker._trackEvent('Settings','Change number',val);	
	val = null;
	name = null;
	return false;
}

/*
function loadrelated()
{
	$("#related").hover(
	function()
	{		
		$("#relatedlinks").css("display","block");
		$("#relatedlinks").addClass("hover");
		q = $("#inputField").val();
		
		$.get("/ajax/related/", 
		{ 
			q: q
		},
		function(data)
		{
			$("#relatedlinks").html(data);
			return false;
		});
		return false;
	},
	function()
	{
		$("#relatedlinks").css("display","none");
		$("#relatedlinks").removeClass("hover");
		return false;
	});
	return false;
}
*/

/*
function loadiconhover()
{
	$(".icon").hover(
	function()
	{
		//$(".icon").removeClass("iconhover");
		//$(this).addClass("iconhover");
		return false;
	},
	function()
	{
		//$(".icon").removeClass("iconhover");
		return false;
	});
	return false;
}
*/

function loadswitcher()
{
    $("#switcher-trigger").click(function() 
    {
    	if($("div#links").is(":hidden"))
		{
			$("#switcher-trigger").addClass('selected');
			$("div#links").slideDown("fast");
			
			if($("#pg-content").html() == 'Loading')
			{
				$.get("/ajax/getpackages/", 
				{ 
				},
				function(data)
				{	
		      		switcheron = 1;
					$("#pg-content").html(data);
					$("#pg-content").removeClass("loading");
				});
			}
   		}
      	else
      	{
			$("#switcher-trigger").removeClass('selected');
			$("div#links").fadeOut("fast");
			switcheron = 0;
      	} 
    });
}

function hideswitcher()
{
	//if(switcheron == 1)
	//{
		$("#switcher-trigger").removeClass('selected');
		$("div#links").fadeOut("fast");
		switcheron = 0;
	//}
}

//------------------ ICONZA STUFF

/*
function loadcolorpicker()
{
    $(".changecolor").click(function() 
    {
    	link = $(this);
    	obj = $(this).siblings(".colorpicker");
    	iconid = obj.attr("id").replace(/color-/,"");
    	
    	if(obj.is(":hidden"))
    	{
    		hidecolorpicker();
    		link.addClass("selected");
			$(obj).css("display","block");
			$(obj).dropShadow();
	    	$(obj).children("a.izacolor").click(function() 
	   		{
	   			$(obj).addClass("small-loading");
	   			color = $(this).attr("href");
	   			id = "#icon-" + iconid;
	   			url = $(id).attr("src");
	   			url = url.replace(/(ffffff|f6eb2c|eb3a05|e86f2d|e01d33|df086d|bfbfbf|808080|404040|88167b|009244|0097d9|80b63e|2a15d9|000000)/,color);
	   			$(id).attr("src",url);
				url = $("#pnglink-" + iconid).attr("href") + "&color=" + color;
				$("#pnglink-" + iconid).attr("href",url);
				url = $("#icolink-" + iconid).attr("href") + "&color=" + color;
				$("#icolink-" + iconid).attr("href",url);
				setTimeout("$(obj).removeClass('small-loading')",1000);
			    return false;
		    });
		    coloron = 1;
    	}
      	else
      	{
    		link.removeClass("selected");
			hidecolorpicker();
    	}
	    return false;
    });
}

function hidecolorpicker()
{
	//if(coloron == 1)
	//{
		$(".changecolor").removeClass('selected');
		$("div.colorpicker").css("display","none");
		$("div.colorpicker").removeShadow();
		coloron = 0;
	//}
}
*/


/* Shadows */

(function($){

	var dropShadowZindex = 1;  //z-index counter

	$.fn.dropShadow = function(options)
	{
		// Default options
		var opt = $.extend({
			left: 1,
			top: 1,
			blur: 3,
			opacity: .4,
			color: "black",
			swap: false
			}, options);
		var jShadows = $([]);  //empty jQuery collection
		
		// Loop through original elements
		this.not(".dropShadow").each(function()
		{
			var jthis = $(this);
			var shadows = [];
			var blur = (opt.blur <= 0) ? 0 : opt.blur;
			var opacity = (blur == 0) ? opt.opacity : opt.opacity / (blur * 8);
			var zOriginal = (opt.swap) ? dropShadowZindex : dropShadowZindex + 1;
			var zShadow = (opt.swap) ? dropShadowZindex + 1 : dropShadowZindex;
			
			// Create ID for shadow
			var shadowId;
			if (this.id) {
				shadowId = this.id + "_dropShadow";
			}
			else {
				shadowId = "ds" + (1 + Math.floor(9999 * Math.random()));
			}

			// Modify original element
			$.data(this, "shadowId", shadowId); //store id in expando
			$.data(this, "shadowOptions", options); //store options in expando
			jthis
				.attr("shadowId", shadowId)
				.css("zIndex", zOriginal);
			if (jthis.css("position") != "absolute") {
				jthis.css({
					position: "relative",
					zoom: 1 //for IE layout
				});
			}

			// Create first shadow layer
			bgColor = jthis.css("backgroundColor");
			if (bgColor == "rgba(0, 0, 0, 0)") bgColor = "transparent";  //Safari
			if (bgColor != "transparent" || jthis.css("backgroundImage") != "none" 
					|| this.nodeName == "SELECT" 
					|| this.nodeName == "INPUT"
					|| this.nodeName == "TEXTAREA") {		
				shadows[0] = $("<div></div>")
					.css("background", opt.color);								
			}
			else {
				shadows[0] = jthis
					.clone()
					.removeAttr("id")
					.removeAttr("name")
					.removeAttr("shadowId")
					.css("color", opt.color);
			}
			shadows[0]
				.addClass("dropShadow")
				.css({
					height: jthis.outerHeight(),
					left: blur,
					opacity: opacity,
					position: "absolute",
					top: blur,
					width: jthis.outerWidth(),
					zIndex: zShadow
				});
				
			// Create other shadow layers
			var layers = (8 * blur) + 1;
			for (i = 1; i < layers; i++) {
				shadows[i] = shadows[0].clone();
			}

			// Position layers
			var i = 1;			
			var j = blur;
			while (j > 0) {
				shadows[i].css({left: j * 2, top: 0});           //top
				shadows[i + 1].css({left: j * 4, top: j * 2});   //right
				shadows[i + 2].css({left: j * 2, top: j * 4});   //bottom
				shadows[i + 3].css({left: 0, top: j * 2});       //left
				shadows[i + 4].css({left: j * 3, top: j});       //top-right
				shadows[i + 5].css({left: j * 3, top: j * 3});   //bottom-right
				shadows[i + 6].css({left: j, top: j * 3});       //bottom-left
				shadows[i + 7].css({left: j, top: j});           //top-left
				i += 8;
				j--;
			}

			// Create container
			var divShadow = $("<div></div>")
				.attr("id", shadowId) 
				.addClass("dropShadow")
				.css({
					left: jthis.position().left + opt.left - blur,
					marginTop: jthis.css("marginTop"),
					marginRight: jthis.css("marginRight"),
					marginBottom: jthis.css("marginBottom"),
					marginLeft: jthis.css("marginLeft"),
					position: "absolute",
					top: jthis.position().top + opt.top - blur,
					zIndex: zShadow
				});

			// Add layers to container	
			for (i = 0; i < layers; i++) {
				divShadow.append(shadows[i]);
			}
			
			// Add container to DOM
			jthis.after(divShadow);

			// Add shadow to return set
			jShadows = jShadows.add(divShadow);

			// Re-align shadow on window resize
			$(window).resize(function()
			{
				try {
					divShadow.css({
						left: jthis.position().left + opt.left - blur,
						top: jthis.position().top + opt.top - blur
					});
				}
				catch(e){}
			});
			
			// Increment z-index counter
			dropShadowZindex += 2;

		});  //end each
		
		return this.pushStack(jShadows);
	};


	$.fn.redrawShadow = function()
	{
		// Remove existing shadows
		this.removeShadow();
		
		// Draw new shadows
		return this.each(function()
		{
			var shadowOptions = $.data(this, "shadowOptions");
			$(this).dropShadow(shadowOptions);
		});
	};


	$.fn.removeShadow = function()
	{
		return this.each(function()
		{
			var shadowId = $(this).shadowId();
			$("div#" + shadowId).remove();
		});
	};


	$.fn.shadowId = function()
	{
		return $.data(this[0], "shadowId");
	};


	$(function()  
	{
		// Suppress printing of shadows
		var noPrint = "<style type='text/css' media='print'>";
		noPrint += ".dropShadow{visibility:hidden;}</style>";
		$("head").append(noPrint);
	});

})(jQuery);



/**
 *  author:		Timothy Groves - http://www.brandspankingnew.net
 *	version:	1.2 - 2006-11-17
 *              1.3 - 2006-12-04
 *              2.0 - 2007-02-07
 *
 */

var useBSNns;

if (useBSNns)
{
	if (typeof(bsn) == "undefined")
		bsn = {}
	_bsn = bsn;
}
else
{
	_bsn = this;
}



if (typeof(_bsn.Autosuggest) == "undefined")
	_bsn.Autosuggest = {}



_bsn.AutoSuggest = function (fldID, param)
{
	// no DOM - give up!
	//
	if (!document.getElementById)
		return false;
	
	// get field via DOM
	//
	this.fld = _bsn.DOM.getElement(fldID);

	if (!this.fld)
		return false;
	
	// init variables
	//
	this.sInput 		= "";
	this.nInputChars 	= 0;
	this.aSuggestions 	= [];
	this.iHighlighted 	= 0;
	
	// parameters object
	//
	this.oP = (param) ? param : {};
	
	// defaults	
	//
	if (!this.oP.minchars)									this.oP.minchars = 3;
	if (!this.oP.method)									this.oP.meth = "get";
	if (!this.oP.varname)									this.oP.varname = "input";
	if (!this.oP.className)									this.oP.className = "autosuggest";
	if (!this.oP.timeout)									this.oP.timeout = 2000;
	if (!this.oP.delay)										this.oP.delay = 0;
	if (!this.oP.offsety)									this.oP.offsety = 0;
	if (!this.oP.shownoresults)								this.oP.shownoresults = false;
	if (!this.oP.noresults)									this.oP.noresults = "No exact match";
	if (!this.oP.maxheight && this.oP.maxheight !== 0)		this.oP.maxheight = 12;
	if (!this.oP.cache && this.oP.cache != false)			this.oP.cache = true;
	
	
	// set keyup handler for field
	// and prevent autocomplete from client
	//
	var pointer = this;
	
	// NOTE: not using addEventListener because UpArrow fired twice in Safari
	//_bsn.DOM.addEvent( this.fld, 'keyup', function(ev){ return pointer.onKeyPress(ev); } );
	
	this.fld.onkeypress 	= function(ev){ return pointer.onKeyPress(ev); }
	this.fld.onkeyup 		= function(ev){ return pointer.onKeyUp(ev); }
	
	this.fld.setAttribute("autocomplete","off");
}

_bsn.AutoSuggest.prototype.onKeyPress = function(ev)
{
	
	var key = (window.event) ? window.event.keyCode : ev.keyCode;



	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//
	var RETURN = 13;
	var TAB = 9;
	var ESC = 27;
	
	var bubble = true;

	switch(key)
	{

		case RETURN:
			this.setHighlightedValue();
			bubble = false;
			document.getElementById("searchform").submit();
			break;


		case ESC:
			this.clearSuggestions();
			break;
	}

	return bubble;
}



_bsn.AutoSuggest.prototype.onKeyUp = function(ev)
{
	var key = (window.event) ? window.event.keyCode : ev.keyCode;
	


	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//

	var ARRUP = 38;
	var ARRDN = 40;
	
	var bubble = true;

	switch(key)
	{


		case ARRUP:
			this.changeHighlight(key);
			bubble = false;
			break;


		case ARRDN:
			this.changeHighlight(key);
			bubble = false;
			break;
		
		
		default:
			this.getSuggestions(this.fld.value);
	}

	return bubble;
	

}








_bsn.AutoSuggest.prototype.getSuggestions = function (val)
{
	
	// if input stays the same, do nothing
	//
	if (val == this.sInput)
		return false;

	
	// input length is less than the min required to trigger a request
	// reset input string
	// do nothing
	//
	if (val.length < this.oP.minchars)
	{
		this.sInput = "";
		return false;
	}
	
	// if caching enabled, and user is typing (ie. length of input is increasing)
	// filter results out of aSuggestions from last request
	//
	if (val.length>this.nInputChars && this.aSuggestions.length && this.oP.cache)
	{
		var arr = [];
		for (var i=0;i<this.aSuggestions.length;i++)
		{
			if (this.aSuggestions[i].value.substr(0,val.length).toLowerCase() == val.toLowerCase())
				arr.push( this.aSuggestions[i] );
		}
		
		this.sInput = val;
		this.nInputChars = val.length;
		this.aSuggestions = arr;
		this.createList(this.aSuggestions);
		return false;
	}
	else
	// do new request
	//
	{
		this.sInput = val;
		this.nInputChars = val.length;
		var pointer = this;
		clearTimeout(this.ajID);
		this.ajID = setTimeout( function() { pointer.doAjaxRequest() }, this.oP.delay );
	}
	return false;
}

_bsn.AutoSuggest.prototype.doAjaxRequest = function ()
{
	var pointer = this;
	
	// create ajax request
	var url = this.oP.script+this.oP.varname+"="+escape(this.fld.value);
	var meth = this.oP.meth;
	var onSuccessFunc = function (req) { pointer.setSuggestions(req) };
	var onErrorFunc = function (status) 
	{ 
	//alert("AJAX error: "+status); 
	};

	var myAjax = new _bsn.Ajax();
	myAjax.makeRequest( url, meth, onSuccessFunc, onErrorFunc );
}

_bsn.AutoSuggest.prototype.setSuggestions = function (req)
{
	this.aSuggestions = [];
	if (this.oP.json)
	{
		var jsondata = eval('(' + req.responseText + ')');
		for (var i=0;i<jsondata.results.length;i++)
		{
			this.aSuggestions.push(  { 'id':jsondata.results[i].id, 'value':jsondata.results[i].value, 'info':jsondata.results[i].info }  );
		}
	}
	else
	{
		var xml = req.responseXML;
	
		// traverse xml
		//
		var results = xml.getElementsByTagName('results')[0].childNodes;

		for (var i=0;i<results.length;i++)
		{
			if (results[i].hasChildNodes())
				this.aSuggestions.push(  { 'id':results[i].getAttribute('id'), 'value':results[i].childNodes[0].nodeValue, 'info':results[i].getAttribute('info') }  );
		}
	
	}
	
	this.idAs = "as_"+this.fld.id;
	

	this.createList(this.aSuggestions);

}

_bsn.AutoSuggest.prototype.createList = function(arr)
{
	var pointer = this;
	
	// get rid of old list
	// and clear the list removal timeout
	//
	_bsn.DOM.removeElement(this.idAs);
	this.killTimeout();
	
	// create holding div
	//
	var div = _bsn.DOM.createElement("div", {id:this.idAs, className:this.oP.className});	
	var hcorner = _bsn.DOM.createElement("div", {className:"as_corner"});
	var hbar = _bsn.DOM.createElement("div", {className:"as_bar"});
	var header = _bsn.DOM.createElement("div", {className:"as_header"});
	header.appendChild(hcorner);
	header.appendChild(hbar);
	div.appendChild(header);
	
	// create and populate ul
	//
	var ul = _bsn.DOM.createElement("ul", {id:"as_ul"});
	
	
	// loop throught arr of suggestions
	// creating an LI element for each suggestion

	/* Set max number of items in list */
	var length;
	if(arr.length > this.oP.maxheight)
		length = this.oP.maxheight;
	else
		length = arr.length;
	
	for (var i=0;i<length;i++)
	{
		// format output with the input enclosed in a EM element
		// (as HTML, not DOM)
		//
		var val = arr[i].value;
		var st = val.toLowerCase().indexOf( this.sInput.toLowerCase() );
		var output = val.substring(0,st) + "<em>" + val.substring(st, st+this.sInput.length) + "</em>" + val.substring(st+this.sInput.length);
		
		
		var span 		= _bsn.DOM.createElement("span", {}, output, true);
		if (arr[i].info != "")
		{
			var br			= _bsn.DOM.createElement("br", {});
			span.appendChild(br);
			var small		= _bsn.DOM.createElement("small", {}, arr[i].info);
			span.appendChild(small);
		}
		
		var a 			= _bsn.DOM.createElement("a", { href:"#" });
		
		var tl 		= _bsn.DOM.createElement("span", {className:"tl"}, " ");
		var tr 		= _bsn.DOM.createElement("span", {className:"tr"}, " ");
		a.appendChild(tl);
		a.appendChild(tr);
		
		a.appendChild(span);
		
		a.name = i+1;
		a.onclick = function () { pointer.setHighlightedValue(); return false; }
		a.onmouseover = function () { pointer.setHighlight(this.name); }
		
		var li 			= _bsn.DOM.createElement(  "li", {}, a  );
		
		ul.appendChild( li );
	}
	
	// no results
	//
	if (arr.length == 0)
	{
		var li 			= _bsn.DOM.createElement(  "li", {className:"as_warning"}, this.oP.noresults  );
		
		ul.appendChild( li );
	}
	
	div.appendChild( ul );
	
	var fcorner = _bsn.DOM.createElement("div", {className:"as_corner"});
	var fbar = _bsn.DOM.createElement("div", {className:"as_bar"});
	var footer = _bsn.DOM.createElement("div", {className:"as_footer"});
	footer.appendChild(fcorner);
	footer.appendChild(fbar);
	div.appendChild(footer);
	
	
	// get position of target textfield
	// position holding div below it
	// set width of holding div to width of field
	//
	var pos = _bsn.DOM.getPos(this.fld);
	
	div.style.left 		= pos.x + "px";
	div.style.top 		= ( pos.y + this.fld.offsetHeight + this.oP.offsety ) + "px";
	div.style.width 	= this.fld.offsetWidth + "px";
	
	
	// set mouseover functions for div
	// when mouse pointer leaves div, set a timeout to remove the list after an interval
	// when mouse enters div, kill the timeout so the list won't be removed
	//
	div.onmouseover 	= function(){ pointer.killTimeout() }
	div.onmouseout 		= function(){ pointer.resetTimeout() }


	// add DIV to document
	//
	document.getElementsByTagName("body")[0].appendChild(div);
	
	
	// currently no item is highlighted
	//
	this.iHighlighted = 0;
	
	// remove list after an interval
	//
	var pointer = this;
	this.toID = setTimeout(function () { pointer.clearSuggestions() }, this.oP.timeout);
}

_bsn.AutoSuggest.prototype.changeHighlight = function(key)
{	
	var list = _bsn.DOM.getElement("as_ul");
	if (!list)
		return false;
	
	var n;

	if (key == 40)
		n = this.iHighlighted + 1;
	else if (key == 38)
		n = this.iHighlighted - 1;
	
	if (n > list.childNodes.length)
		n = list.childNodes.length;
	if (n < 1)
		n = 1;
	
	this.setHighlight(n);
}

_bsn.AutoSuggest.prototype.setHighlight = function(n)
{
	var list = _bsn.DOM.getElement("as_ul");
	if (!list)
		return false;
	
	if (this.iHighlighted > 0)
		this.clearHighlight();
	
	this.iHighlighted = Number(n);
	
	list.childNodes[this.iHighlighted-1].className = "as_highlight";


	this.killTimeout();
}


_bsn.AutoSuggest.prototype.clearHighlight = function()
{
	var list = _bsn.DOM.getElement("as_ul");
	if (!list)
		return false;
	
	if (this.iHighlighted > 0)
	{
		list.childNodes[this.iHighlighted-1].className = "";
		this.iHighlighted = 0;
	}
}


_bsn.AutoSuggest.prototype.setHighlightedValue = function ()
{
	if (this.iHighlighted)
	{
		this.sInput = this.fld.value = this.aSuggestions[ this.iHighlighted-1 ].value;
		
		// move cursor to end of input (safari)
		//
		this.fld.focus();
		if (this.fld.selectionStart)
			this.fld.setSelectionRange(this.sInput.length, this.sInput.length);
		

		this.clearSuggestions();
		
		// pass selected object to callback function, if exists
		//
		if (typeof(this.oP.callback) == "function")
			this.oP.callback( this.aSuggestions[this.iHighlighted-1] );
	}
}



_bsn.AutoSuggest.prototype.killTimeout = function()
{
	clearTimeout(this.toID);
}

_bsn.AutoSuggest.prototype.resetTimeout = function()
{
	clearTimeout(this.toID);
	var pointer = this;
	this.toID = setTimeout(function () { pointer.clearSuggestions() }, 1000);
}

_bsn.AutoSuggest.prototype.clearSuggestions = function ()
{
	
	this.killTimeout();
	
	var ele = _bsn.DOM.getElement(this.idAs);
	var pointer = this;
	if (ele)
	{
		var fade = new _bsn.Fader(ele,1,0,250,function () { _bsn.DOM.removeElement(pointer.idAs) });
	}
}










// AJAX PROTOTYPE _____________________________________________


if (typeof(_bsn.Ajax) == "undefined")
	_bsn.Ajax = {}



_bsn.Ajax = function ()
{
	this.req = {};
	this.isIE = false;
}



_bsn.Ajax.prototype.makeRequest = function (url, meth, onComp, onErr)
{
	
	if (meth != "POST")
		meth = "GET";
	
	this.onComplete = onComp;
	this.onError = onErr;
	
	var pointer = this;
	
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest)
	{
		this.req = new XMLHttpRequest();
		this.req.onreadystatechange = function () { pointer.processReqChange() };
		this.req.open("GET", url, true); //
		this.req.send(null);
	// branch for IE/Windows ActiveX version
	}
	else if (window.ActiveXObject)
	{
		this.req = new ActiveXObject("Microsoft.XMLHTTP");
		if (this.req)
		{
			this.req.onreadystatechange = function () { pointer.processReqChange() };
			this.req.open(meth, url, true);
			this.req.send();
		}
	}
}


_bsn.Ajax.prototype.processReqChange = function()
{
	
	// only if req shows "loaded"
	if (this.req.readyState == 4) {
		// only if "OK"
		if (this.req.status == 200)
		{
			this.onComplete( this.req );
		} else {
			this.onError( this.req.status );
		}
	}
}










// DOM PROTOTYPE _____________________________________________


if (typeof(_bsn.DOM) == "undefined")
	_bsn.DOM = {}




_bsn.DOM.createElement = function ( type, attr, cont, html )
{
	var ne = document.createElement( type );
	if (!ne)
		return false;
		
	for (var a in attr)
		ne[a] = attr[a];
		
	if (typeof(cont) == "string" && !html)
		ne.appendChild( document.createTextNode(cont) );
	else if (typeof(cont) == "string" && html)
		ne.innerHTML = cont;
	else if (typeof(cont) == "object")
		ne.appendChild( cont );

	return ne;
}





_bsn.DOM.clearElement = function ( id )
{
	var ele = this.getElement( id );
	
	if (!ele)
		return false;
	
	while (ele.childNodes.length)
		ele.removeChild( ele.childNodes[0] );
	
	return true;
}


_bsn.DOM.removeElement = function ( ele )
{
	var e = this.getElement(ele);
	
	if (!e)
		return false;
	else if (e.parentNode.removeChild(e))
		return true;
	else
		return false;
}

_bsn.DOM.replaceContent = function ( id, cont, html )
{
	var ele = this.getElement( id );
	
	if (!ele)
		return false;
	
	this.clearElement( ele );
	
	if (typeof(cont) == "string" && !html)
		ele.appendChild( document.createTextNode(cont) );
	else if (typeof(cont) == "string" && html)
		ele.innerHTML = cont;
	else if (typeof(cont) == "object")
		ele.appendChild( cont );
}









_bsn.DOM.getElement = function ( ele )
{
	if (typeof(ele) == "undefined")
	{
		return false;
	}
	else if (typeof(ele) == "string")
	{
		var re = document.getElementById( ele );
		if (!re)
			return false;
		else if (typeof(re.appendChild) != "undefined" ) {
			return re;
		} else {
			return false;
		}
	}
	else if (typeof(ele.appendChild) != "undefined")
		return ele;
	else
		return false;
}







_bsn.DOM.appendChildren = function ( id, arr )
{
	var ele = this.getElement( id );
	
	if (!ele)
		return false;
	
	if (typeof(arr) != "object")
		return false;
		
	for (var i=0;i<arr.length;i++)
	{
		var cont = arr[i];
		if (typeof(cont) == "string")
			ele.appendChild( document.createTextNode(cont) );
		else if (typeof(cont) == "object")
			ele.appendChild( cont );
	}
}



_bsn.DOM.getPos = function ( ele )
{
	var ele = this.getElement(ele);

	var obj = ele;

	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;


	var obj = ele;
	
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;

	return {x:curleft, y:curtop}
}










// FADER PROTOTYPE _____________________________________________



if (typeof(_bsn.Fader) == "undefined")
	_bsn.Fader = {}





_bsn.Fader = function (ele, from, to, fadetime, callback)
{	
	if (!ele)
		return false;
	
	this.ele = ele;
	
	this.from = from;
	this.to = to;
	
	this.callback = callback;
	
	this.nDur = fadetime;
		
	this.nInt = 50;
	this.nTime = 0;
	
	var p = this;
	this.nID = setInterval(function() { p._fade() }, this.nInt);
}




_bsn.Fader.prototype._fade = function()
{
	this.nTime += this.nInt;
	
	var ieop = Math.round( this._tween(this.nTime, this.from, this.to, this.nDur) * 100 );
	var op = ieop / 100;
	
	if (this.ele.filters) // internet explorer
	{
		try
		{
			this.ele.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieop;
		} catch (e) { 
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.ele.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+ieop+')';
		}
	}
	else // other browsers
	{
		this.ele.style.opacity = op;
	}
	
	if (this.nTime == this.nDur)
	{
		clearInterval( this.nID );
		if (this.callback != undefined)
			this.callback();
	}
}



_bsn.Fader.prototype._tween = function(t,b,c,d)
{
	return b + ( (c-b) * (t/d) );
}



/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - selectToUISlider - creates a UI slider component from a select element(s)
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_jquery_ui_16_slider_from_a_select_element/
 * demo page: http://www.filamentgroup.com/examples/slider_v2/index.html
 * 
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Usage Notes: please refer to our article above for documentation
 *  
 * --------------------------------------------------------------------
 */


jQuery.fn.selectToUISlider = function(settings){
	var selects = jQuery(this);
	
	//accessible slider options
	var options = jQuery.extend({
		labels: 3, //number of visible labels
		tooltip: true, //show tooltips, boolean
		tooltipSrc: 'text',//accepts 'value' as well
		labelSrc: 'value',//accepts 'value' as well	,
		sliderOptions: null
	}, settings);


	//handle ID attrs - selects each need IDs for handles to find them
	var handleIds = (function(){
		var tempArr = [];
		selects.each(function(){
			tempArr.push('handle_'+jQuery(this).attr('id'));
		});
		return tempArr;
	})();
	
	//array of all option elements in select element (ignores optgroups)
	var selectOptions = (function(){
		var opts = [];
		selects.eq(0).find('option').each(function(){
			opts.push({
				value: jQuery(this).attr('value'),
				text: jQuery(this).text()
			});
		});
		return opts;
	})();
	
	//array of opt groups if present
	var groups = (function(){
		if(selects.eq(0).find('optgroup').size()>0){
			var groupedData = [];
			selects.eq(0).find('optgroup').each(function(i){
				groupedData[i] = {};
				groupedData[i].label = jQuery(this).attr('label');
				groupedData[i].options = [];
				jQuery(this).find('option').each(function(){
					groupedData[i].options.push({text: jQuery(this).text(), value: jQuery(this).attr('value')});
				});
			});
			return groupedData;
		}
		else return null;
	})();	
	//check if obj is array
	function isArray(obj) {
		return obj.constructor == Array;
	}
	//return tooltip text from option index
	function ttText(optIndex){
		return (options.tooltipSrc == 'text') ? selectOptions[optIndex].text : selectOptions[optIndex].value;
	}
	
	//plugin-generated slider options (can be overridden)
	var sliderOptions = {
		step: 1,
		min: 0,
		orientation: 'horizontal',
		max: selectOptions.length-1,
		range: selects.length > 1,//multiple select elements = true
		slide: function(e, ui) {//slide function
				var thisHandle = jQuery(ui.handle);
				//handle feedback 
				var textval = ttText(ui.value);
				thisHandle
					.attr('aria-valuetext', textval)
					.attr('aria-valuenow', ui.value)
					.find('.ui-slider-tooltip .ttContent')
						.text( textval );

				//control original select menu
				var currSelect = jQuery('#' + thisHandle.attr('id').split('handle_')[1]);
				currSelect.find('option').eq(ui.value).attr('selected', 'selected');
		},
		stop: function(event, ui) 
		{
			var minimum = $("#valueA").val();
			var maximum = $("#valueB").val();

			pageTracker._trackEvent("Settings","Change sizes","Minimum",parseInt(minimum));
			pageTracker._trackEvent("Settings","Change sizes","Maximum",parseInt(maximum));
			
			$.get("/ajax/cookie/", 
			{ 
				name: "minimum",
				val: minimum
			},
			function(data)
			{
				return false;
			});
				
			$.get("/ajax/cookie/", 
			{ 
				name: "maximum",
				val: maximum
			},
			function(data)
			{
				updatesearch();
				return false;
			});
		},
		values: (function(){
			var values = [];
			selects.each(function(){
				values.push( jQuery(this).get(0).selectedIndex );
			});
			return values;
		})()
	};
	
	//slider options from settings
	options.sliderOptions = (settings) ? jQuery.extend(sliderOptions, settings.sliderOptions) : sliderOptions;
		
	//select element change event	
	selects.bind('change keyup click', function()
	{
		var thisIndex = jQuery(this).get(0).selectedIndex;
		var thisHandle = jQuery('#handle_'+ jQuery(this).attr('id'));
		var handleIndex = thisHandle.data('handleNum');
		thisHandle.parents('.ui-slider:eq(0)').slider("values", handleIndex, thisIndex);
	});
	

	//create slider component div
	var sliderComponent = jQuery('<div></div>');

	//CREATE HANDLES
	selects.each(function(i){
		var hidett = '';
		
		//associate label for ARIA
		var thisLabel = jQuery('label[for=' + jQuery(this).attr('id') +']');
		//labelled by aria doesn't seem to work on slider handle. Using title attr as backup
		var labelText = (thisLabel.size()>0) ? 'Slider control for '+ thisLabel.text()+'' : '';
		var thisLabelId = thisLabel.attr('id') || thisLabel.attr('id', 'label_'+handleIds[i]).attr('id');
		
		
		if( options.tooltip == false ){hidett = ' style="display: none;"';}
		jQuery('<a '+
				'href="#" tabindex="0" '+
				'id="'+handleIds[i]+'" '+
				'class="ui-slider-handle" '+
				'role="slider" '+
				'aria-labelledby="'+thisLabelId+'" '+
				'aria-valuemin="'+options.sliderOptions.min+'" '+
				'aria-valuemax="'+options.sliderOptions.max+'" '+
				'aria-valuenow="'+options.sliderOptions.values[i]+'" '+
				'aria-valuetext="'+ttText(options.sliderOptions.values[i])+'" '+
			'><span class="screenReaderContext">'+labelText+'</span>'+
			'<span class="ui-slider-tooltip ui-widget-content ui-corner-all"'+ hidett +'><span class="ttContent"></span>'+
				'<span class="ui-tooltip-pointer-down ui-widget-content"><span class="ui-tooltip-pointer-down-inner"></span></span>'+
			'</span></a>')
			.data('handleNum',i)
			.appendTo(sliderComponent);
	});
	
	//CREATE SCALE AND TICS
	
	//write dl if there are optgroups
	if(groups) {
		var inc = 0;
		var scale = sliderComponent.append('<dl class="ui-slider-scale ui-helper-reset" role="presentation"></dl>').find('.ui-slider-scale:eq(0)');
		jQuery(groups).each(function(h){
			scale.append('<dt style="width: '+ (100/groups.length).toFixed(2) +'%' +'; left:'+ (h/(groups.length-1) * 100).toFixed(2)  +'%' +'"><span>'+this.label+'</span></dt>');//class name becomes camelCased label
			var groupOpts = this.options;
			jQuery(this.options).each(function(i){
				var style = (inc == selectOptions.length-1 || inc == 0) ? 'style="display: none;"' : '' ;
				var labelText = (options.labelSrc == 'text') ? groupOpts[i].text : groupOpts[i].value;
				scale.append('<dd style="left:'+ leftVal(inc) +'"><span class="ui-slider-label">'+ labelText +'</span><span class="ui-slider-tic ui-widget-content"'+ style +'></span></dd>');
				inc++;
			});
		});
	}
	//write ol
	else {
		var scale = sliderComponent.append('<ol class="ui-slider-scale ui-helper-reset" role="presentation"></ol>').find('.ui-slider-scale:eq(0)');
		jQuery(selectOptions).each(function(i){
			var style = (i == selectOptions.length-1 || i == 0) ? 'style="display: none;"' : '' ;
			var labelText = (options.labelSrc == 'text') ? this.text : this.value;
			scale.append('<li style="left:'+ leftVal(i) +'"><span class="ui-slider-label">'+ labelText +'</span><span class="ui-slider-tic ui-widget-content"'+ style +'></span></li>');
		});
	}
	
	function leftVal(i)
	{
		return (i/(selectOptions.length-1) * 100).toFixed(2)  +'%';
	}
	
	//show and hide labels depending on labels pref
	//show the last one if there are more than 1 specified
	if(options.labels > 1) sliderComponent.find('.ui-slider-scale li:last span.ui-slider-label, .ui-slider-scale dd:last span.ui-slider-label').addClass('ui-slider-label-show');

	//set increment
	var increm = Math.max(1, Math.round(selectOptions.length / options.labels));
	//show em based on inc
	for(var j=0; j<selectOptions.length; j+=increm){
		if((selectOptions.length - j) > increm){//don't show if it's too close to the end label
			sliderComponent.find('.ui-slider-scale li:eq('+ j +') span.ui-slider-label, .ui-slider-scale dd:eq('+ j +') span.ui-slider-label').addClass('ui-slider-label-show');
		}
	}

	//style the dt's
	sliderComponent.find('.ui-slider-scale dt').each(function(i){
		jQuery(this).css({
			'left': ((100 /( groups.length))*i).toFixed(2) + '%'
		});
	});
	

	//inject and return 
	sliderComponent
	.insertAfter(jQuery(this).eq(this.length-1))
	.slider(options.sliderOptions)
	.attr('role','application')
	.find('.ui-slider-label')
	.each(function(){
		jQuery(this).css('marginLeft', -jQuery(this).width()/2);
	});
	
	//update tooltip arrow inner color
	sliderComponent.find('.ui-tooltip-pointer-down-inner').each(function(){
				var bWidth = jQuery('.ui-tooltip-pointer-down-inner').css('borderTopWidth');
				var bColor = jQuery(this).parents('.ui-slider-tooltip').css('backgroundColor')
				jQuery(this).css('border-top', bWidth+' solid '+bColor);
	});
	
	var values = sliderComponent.slider('values');
	
	if(isArray(values)){
		jQuery(values).each(function(i){
			sliderComponent.find('.ui-slider-tooltip .ttContent').eq(i).text( ttText(this) );
		});
	}
	else {
		sliderComponent.find('.ui-slider-tooltip .ttContent').eq(0).text( ttText(values) );
	}
	
	return this;
}



$(function() {         
         
    // positions for each overlay 
    var positions = [];     
         
    // setup triggers 
    $("button[rel]").each(function(i) { 
             
        $(this).overlay({ 
 
            // common configuration for each overlay 
            oneInstance: false,  
            closeOnClick: true,  
              
            // setup custom finish position 
            finish: positions[i]} 
        );             
    }); 
     
});


/**
 * @author Jason Roy for CompareNetworks Inc.
 *
 * Version 0.1, improvements to be made.
 * Copyright (c) 2008 CompareNetworks Inc.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($){var f={};var g={};var h={};var j=[];jQuery.fn.jBreadCrumb=function(a){f=$.extend({},$.fn.jBreadCrumb.defaults,a);return this.each(function(){g=$(this);setupBreadCrumb()})};function setupBreadCrumb(){h=jQuery(g).find('li');jQuery(g).find('ul').wrap('<div style="overflow:hidden; position:relative;  width: '+jQuery(g).css("width")+';"><div>');jQuery(g).find('ul').width(5000);if(h.length>0){jQuery(h[h.length-1]).addClass('last');jQuery(h[0]).addClass('first');if(h.length>f.minimumCompressionElements){compressBreadCrumb()}}};function compressBreadCrumb(){var c=jQuery(h[h.length-1]);if(jQuery(c).width()>f.maxFinalElementLength){if(f.beginingElementsToLeaveOpen>0){f.beginingElementsToLeaveOpen--}if(f.endElementsToLeaveOpen>0){f.endElementsToLeaveOpen--}}if(jQuery(c).width()<f.maxFinalElementLength&&jQuery(c).width()>f.minFinalElementLength){if(f.beginingElementsToLeaveOpen>0){f.beginingElementsToLeaveOpen--}}var d=h.length-1-f.endElementsToLeaveOpen;jQuery(h[h.length-1]).css({background:'none'});$(h).each(function(i,a){if(i>f.beginingElementsToLeaveOpen&&i<d){jQuery(a).find('a').wrap('<span></span>').width(jQuery(a).find('a').width()+10);jQuery(a).append(jQuery(f.overlayClass+'.main').clone().removeClass('main').css({display:'block'})).css({background:'none'});if(isIE6OrLess()){fixPNG(jQuery(a).find(f.overlayClass).css({width:'20px',right:"-1px"}))}var b={id:i,width:jQuery(a).width(),listElement:jQuery(a).find('span'),isAnimating:false,element:jQuery(a).find('span')};jQuery(a).bind('mouseover',b,expandBreadCrumb).bind('mouseout',b,shrinkBreadCrumb);jQuery(a).find('a').unbind('mouseover',expandBreadCrumb).unbind('mouseout',shrinkBreadCrumb);a.autoInterval=setInterval(function(){clearInterval(a.autoInterval);jQuery(a).find('span').animate({width:f.previewWidth},f.timeInitialCollapse,f.easing)},(150*(i-2)))}})};function expandBreadCrumb(e){var a=e.data.id;var b=e.data.width;jQuery(e.data.element).stop();jQuery(e.data.element).animate({width:b},{duration:f.timeExpansionAnimation,easing:f.easing,queue:false});return false};function shrinkBreadCrumb(e){var a=e.data.id;jQuery(e.data.element).stop();jQuery(e.data.element).animate({width:f.previewWidth},{duration:f.timeCompressionAnimation,easing:f.easing,queue:false});return false};function isIE6OrLess(){var a=$.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent);return a};function fixPNG(a){var b;if(jQuery(a).is('img')){b=jQuery(a).attr('src')}else{b=$(a).css('backgroundImage');b.match(/^url\(["']?(.*\.png)["']?\)$/i);b=RegExp.$1}$(a).css({'backgroundImage':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='"+b+"')"})};jQuery.fn.jBreadCrumb.defaults={maxFinalElementLength:400,minFinalElementLength:200,minimumCompressionElements:4,endElementsToLeaveOpen:1,beginingElementsToLeaveOpen:1,minElementsToCollapse:4,timeExpansionAnimation:800,timeCompressionAnimation:500,timeInitialCollapse:600,easing:'easeOutQuad',overlayClass:'.chevronOverlay',previewWidth:5}})(jQuery);
