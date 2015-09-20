/*******************************************************************************
 * Copyright 2008, Evernote Corporation. All Rights Reserved.
 * 
 * @author Philip Constantinou
 */

// Declares the content and source of a web clip
function Clip(title, content, url, window) {
	this.title = title;
	this.content = content;
	this.url = url;
	this.window = window;
	this.fullPage = false;
}

// Default constructor of a web clip which contains all of the current window
function ClipCurrentWindow() {
	this.title = window.document.title;
	this.content = EN_DOMtoHTML(window.document.body);
	this.url = window.document.location;
	this.window = window;
	this.fullPage = true;
}

// Constructor of a web clip which contains all of the provided window
function ClipWindow(aWindow) {
	this.title = aWindow.document.title;
	this.content = EN_DOMtoHTML(aWindow.document.body);
	this.url = aWindow.document.location;
	this.window = aWindow;
	this.fullPage = true;
}

function ClippingForm(element, form) {
	this.element = element;
	this.form = form;
}
/**
 * Sends the clip to the provide service's clipping URL
 * 
 * @param clipURL
 */
function EN_clip(clipURL) {
	var fullPage = false;
	var isIE = (navigator.appVersion.indexOf("MSIE", 0) != -1);
	var isSafari = (navigator.appVersion.indexOf("WebKit", 0) != -1);
	if (clipURL == 'http://preview.evernote.com') {
		clipURL = 'http://www.evernote.com';
	}
	// Support the FF native clipper
	var aWindow = null;
	try {
		aWindow = (window_clipped_to_en) ? window_clipped_to_en : window;
	} catch (e) {
		aWindow = window;
	}
	// Test to see if there's selected text
	var clip = EN_findSelectedContent(isIE, aWindow);
	if (clip == null) {
		try {
			// Check to see if the page has frames and no main content
			if (aWindow.document == null
					|| aWindow.document.body == null
					|| (aWindow.document.getElementsByTagName('frameset').length > 0)) {
				alert('Sorry, Evernote cannot clip this entire page. Please select the portion you wish to clip.');
				return;
			}
			clip = new ClipWindow(aWindow);
		} catch (e) {
			// Can't construct a clip -- usually because the body is a frame
			alert('Sorry, Evernote cannot clip this entire page. Please select the portion you wish to clip.');
			return;
		}
	}
	if (clip.url.protocol.indexOf("http") != 0) {
		alert('Sorry, Evernote can only clip web pages.');
		return;
	}
	// Convert post URL to SSL if the source page uses HTTPs and the Evernote
	// server
	// supports HTTPs.
	if (clip.url.protocol.indexOf("https") == 0
			&& clipURL.indexOf("http:") == 0 && clipURL.indexOf(':', 6) == -1) {
		clipURL = "https:" + clipURL.substring(5, clipURL.length);
	}
	var clippingForm = EN_makeForm(clipURL + '/clip.action', clip, 'e_iframe');
	showClipperPanel(clip, clippingForm, clipURL);
}

/**
 * Draw a floating div over the current page
 * 
 * @param clip
 * @param clippingForm
 * @param baseURL
 * @return
 */
function showClipperPanel(clip, clippingForm, baseURL) {
	var panel;
	panel = div(clip.window, "e_clipper");
	panel.style.position = "absolute";
	panel.style.right = "0px";
	panel.style.zIndex = 100000;
	panel.style.margin = "10px";
	panel.style.top = f_scrollTop(clip.window) + "px";

	var data;
	data = div(clip.window, "e_data", panel);
	data.style.position = "absolute";
	data.style.width = "0px";
	data.style.height = "0px";
	data.style.zIndex = 0;
	data.style.margin = "0px";
	data.style.top = "0px";

	var view;
	view = div(clip.window, "e_view", panel);
	view.style.backgroundColor = "white";
	view.style.zIndex = 2;
	view.style.width = "500px";
	view.style.height = "355px";
	view.style.border = "solid rgb(180,180,180)";
	view.style.borderWidth = "6px";
	view.innerHTML = '<iframe id="e_iframe" '
			+ 'onLoad="p = document.getElementById(\'e_data\'); c = p.style.zIndex; if (c==7) {;p.parentNode.parentNode.removeChild(p.parentNode)} p.style.zIndex = ++c;" name="e_iframe" src="'
			+ baseURL
			+ '/loadingClip.html" scrolling="no" frameborder="0" style="width:100%; height:100%; '
			+ 'border:1px; padding:0px; margin:0px"></iframe>';
	clip.window.document.body.appendChild(panel);
	clip.window.document.body.appendChild(clippingForm.element);
	clippingForm.form.submit();
}

function f_scrollTop(aWindow) {
	return f_filterResults(
			aWindow.pageYOffset ? aWindow.pageYOffset : 0,
			aWindow.document.documentElement ? aWindow.document.documentElement.scrollTop
					: 0,
			aWindow.document.body ? aWindow.document.body.scrollTop : 0);
}

function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function makeElementInClip(clip, elementName) {
	return clip.window.document.createElement(elementName);
}

function EN_makeForm(actionURL, clip, target) {
	var form;
	form = makeElementInClip(clip, 'form');
	form.action = actionURL;
	form.method = 'POST';
	form.target = target || '_top';
	form.enctype = "application/x-www-form-urlencoded";
	form.acceptCharset = "UTF-8";
	form.name = "en_clip_form";

	var body = makeElementInClip(clip, 'textarea');
	body.name = 'body';
	if (!clip.fullPage)
		body.value = clip.content;
	form.appendChild(body);

	var url = makeElementInClip(clip, 'input');
	url.name = 'url';
	url.value = clip.url;
	url.type = 'hidden';
	form.appendChild(url);

	var format = makeElementInClip(clip, 'input');
	format.name = 'format';
	format.value = 'microclip';
	format.type = 'hidden';
	form.appendChild(format);

	var quicknote = makeElementInClip(clip, 'input');
	quicknote.name = 'quicknote';
	quicknote.value = clip.fullPage;
	quicknote.type = 'hidden';
	form.appendChild(quicknote);

	var title = makeElementInClip(clip, 'input');
	title.name = 'title';
	if (!clip.fullPage)
		title.value = clip.title;
	title.type = 'hidden';
	form.appendChild(title);

	var div = makeElementInClip(clip, 'div');
	div.style.display = 'none';
	div.id = "evernote_clip_form";
	div.appendChild(form);
	var clippingForm = new ClippingForm(div, form);
	return clippingForm;
}

function div(aWindow, id, opt_parent) {
	var d = aWindow.document.createElement("div");
	d.id = id;
	d.style.border = "0";
	d.style.margin = "0";
	d.style.padding = "0";
	d.style.position = "relative";
	if (opt_parent) {
		opt_parent.appendChild(d);
	}
	return d;
}

function EN_HTMLEncode(str) {
	var result = "";
	for ( var i = 0; i < str.length; i++) {
		var charcode = str.charCodeAt(i);
		var aChar = str[i];
		if (charcode > 0x7f) {
			result += "&#" + charcode + ";";
		} else if (aChar == '>') {
			result += "&gt;";
		} else if (aChar == '<') {
			result += "&lt;";
		} else if (aChar == '&') {
			result += "&amp;";
		} else {
			result += str[i];
		}
	}
	return result;
}

function debugObj(label, obj) {
	return;
	var str = "";
	for ( var p in obj) {
		str += (p + ":" + obj[p] + "\n\n");
	}
	alert(label + "*******\n" + str);
}

/**
 * Get selected range
 * 
 * @param selectionObject
 *            a representation of the text selection
 * @return a range object representing the selected text
 */
function EN_getRangeObject(selectionObject) {
	if (selectionObject.getRangeAt) {
		if (selectionObject.rangeCount == 0)
			return null;
		var r = selectionObject.getRangeAt(0);
		// Test if selection has nothing in it.
		if (r.startContainer == r.endContainer && r.startOffset == r.endOffset) {
			return null;
		}
		debugObj("Selection", r);
		return r;
	} else {
		var range = document.createRange();
		range
				.setStart(selectionObject.anchorNode,
						selectionObject.anchorOffset);
		range.setEnd(selectionObject.focusNode, selectionObject.focusOffset);
		return range;
	}
}

function EN_findSelectedContent(isIE, aWindow) {
	if (aWindow == null || aWindow.document == null
			|| aWindow.document.body == null) {
		return null;
	}
	var content = null;
	var userSelection = null;
	var range = null;
	// Obtain user selection
	try {
		if (aWindow.getSelection) {
			userSelection = aWindow.getSelection();
			if (userSelection.type != 'text') {
				// userSelection = null;
				debugObj("Not text selection", userSelection);
			}
		} else if (aWindow.document.selection) { // should come last; Opera!
			if (aWindow.document.selection.type != 'text') {
				userSelection = null;
			}
			if (isIE) {
				userSelection = aWindow.document.selection.createRange();
			} else {
				userSelection = document.selection.createRange();
			}
		}
	} catch (e) {
		//alert("Error: " + e.message);
		return null;
	}
	// Test for textRange (ie) or range (w3c) support
	if (userSelection != null) {
		if (isIE) {
			if (userSelection.htmlText.length > 0) {
				return new Clip(aWindow.document.title, userSelection.htmlText,
						aWindow.document.location, aWindow);
			}
		} else {
			range = EN_getRangeObject(userSelection);
			if (range != null) {
				var document = EN_DOMtoHTML(range.cloneContents());
				var clip = new Clip(aWindow.document.title, document,
						aWindow.document.location, aWindow);
				return clip;
			}
		}
		// Recurse
		for ( var i = 0; i < aWindow.frames.length; i++) {
			var aFrame = aWindow.frames[i];
			if (aFrame != null) {
				try {
					content = EN_findSelectedContent(isIE, aFrame);
					if (content != null) {
						return content;
					}
				} catch (e) {
					;
				}
			}
		}
	}
	return null;
}

function EN_DOMtoHTML(n) {
	if (navigator.appVersion.indexOf("MSIE") != -1) {
		return n.innerHTML;
	} else {
		return EN_serializeDOMNode(n);
	}
}

/**
 * Recurses through a DOM and returns a text stream
 */
function EN_serializeDOMNode(n) {
	var v = "";
	if (n == null)
		return v;
	var hasTag = (n.nodeType == 1) && (n.nodeName.indexOf('#') != 0);
	var name = "";
	if (n.nodeType == 3) { // Text block
		v += EN_HTMLEncode(n.nodeValue);
	} else if (n.nodeType == 1) { // Element tag
		if (hasTag) {
			name = n.nodeName;
			v += '<' + name;
			var attrs = n.attributes;
			if (attrs != null) {
				for ( var i = 0; i < attrs.length; i++) {
					if (attrs[i].nodeValue != null
							&& attrs[i].nodeValue.length > 0)
						v += ' ' + attrs[i].nodeName + '=' + '"'
								+ attrs[i].nodeValue + '" ';
				}
			}
			v += '>';

		}
	}
	// Recurs through child notes
	if (n.hasChildNodes()) {
		var children = n.childNodes;
		for ( var j = 0; j < children.length; j++) {
			try {
				var child = children[j];
				if (child != null && child.nodeType > 0
						&& child.nodeName != 'SCRIPT'
						&& child.nodeName != 'IFRAME') {
					v += EN_serializeDOMNode(child);
				}
			} catch (e) {
				;
			}
		}
	}
	if (hasTag) {
		v += '</' + name + '>';
	}
	return v;
}
try {
	EN_clip(EN_CLIP_HOST);
} catch (e) {
	
}
