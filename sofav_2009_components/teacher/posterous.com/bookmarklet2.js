

if (typeof PosterousBookmarklet == "undefined") {
	
	var PosterousBookmarkletConstants = {
	  Version: '2',
	  Browser: {
	    IE:     !!(window.attachEvent &&
	      navigator.userAgent.indexOf('Opera') === -1),
	    Opera:  navigator.userAgent.indexOf('Opera') > -1,
	    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
	    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 &&
	      navigator.userAgent.indexOf('KHTML') === -1,
	    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
	  }
	};
	
	
	// CONSTRUCTOR
	
	var PosterousBookmarklet = function() {
		this.posterous_domain = POSTEROUS___bookmarklet_domain;
	};
	PosterousBookmarklet.prototype.setup = function() {
		this.createBookmarklet();
		this.setupMsgChannel();
	};
	
	
	// EXTENSIONS
	Object.extend = function(destination, source) {
	  for (var property in source) { destination[property] = source[property]; }
	  return destination;
	};
	
	Function.prototype.bind = function(context) {
	  var fun = this;
	  return function(){
	    return fun.apply(context, arguments);
	  };
	};
	
	Object.extend(Object, {	
		isUndefined: function(object) {
	    return typeof object == "undefined";
	  }
	});
	
	if (typeof Element == 'undefined') {
		var Element = function(){};
	}
  	Element._attributeTranslations = {
	  read: {
	    names: {
	      'class': 'className',
	      'for':   'htmlFor'
	    },
	    values: {
	      _getAttr: function(element, attribute) {
	        return element.getAttribute(attribute, 2);
	      },
	      _getAttrNode: function(element, attribute) {
	        var node = element.getAttributeNode(attribute);
	        return node ? node.value : "";
	      },
	      _getEv: function(element, attribute) {
	        attribute = element.getAttribute(attribute);
	        return attribute ? attribute.toString().slice(23, -2) : null;
	      },
	      _flag: function(element, attribute) {
	        return $(element).hasAttribute(attribute) ? attribute : null;
	      },
	      style: function(element) {
	        return element.style.cssText.toLowerCase();
	      },
	      title: function(element) {
	        return element.title;
	      }
	    }
	  }
	};

	Element._attributeTranslations.write = {
	  names: Object.extend({
	    cellpadding: 'cellPadding',
	    cellspacing: 'cellSpacing'
	  }, Element._attributeTranslations.read.names),
	  values: {
	    checked: function(element, value) {
	      element.checked = !!value;
	    },

	    style: function(element, value) {
	      element.style.cssText = value ? value : '';
	    }
	  }
	};

	PosterousBookmarklet.writeAttribute = function(element, name, value) {
	  var attributes = { }, t = Element._attributeTranslations.write;

	  if (typeof name == 'object') attributes = name;
	  else attributes[name] = Object.isUndefined(value) ? true : value;

	  for (var attr in attributes) {
	    name = t.names[attr] || attr;
	    value = attributes[attr];
	    if (t.values[attr]) name = t.values[attr](element, value);
	    if (value === false || value === null)
	      element.removeAttribute(name);
	    else if (value === true)
	      element.setAttribute(name, name);
	    else element.setAttribute(name, value);
	  }
	  return element;
	};
	
	PosterousBookmarklet.readAttribute = function(element, name) {
	  if (PosterousBookmarkletConstants.Browser.IE) {
	    var t = Element._attributeTranslations.read;
	    if (t.values[name]) return t.values[name](element, name);
	    if (t.names[name]) name = t.names[name];
	    if (name.include(':')) {
	      return (!element.attributes || !element.attributes[name]) ? null :
	       element.attributes[name].value;
	    }
	  }
	  return element.getAttribute(name);
	};
	
	PosterousBookmarklet.show = function(elem) {
		elem.style.display = 'block';
	};
	
	PosterousBookmarklet.hide = function(elem) {
		elem.style.display = 'none';
	};
	
	PosterousBookmarklet.getHeight = function() {
		return self['innerHeight'] || (document.documentElement['clientHeight'] || document.body['clientHeight']);
	};
	
	PosterousBookmarklet.setAttributes = function(elem, attributes) {
		for (var attr in attributes) {
			PosterousBookmarklet.writeAttribute(elem, attr, attributes[attr]);
		}
	};
	

	// METHODS
	
	PosterousBookmarklet.prototype.setupMsgChannel = function() {
		setInterval(this.handleMsgChannel.bind(this), 200);
		this.lastMsgId = location.hash;
	};
	
	PosterousBookmarklet.prototype.handleMsgChannel = function() {
		if (location.hash != this.lastMsgId){
			this.lastMsgId = location.hash;
			if (this.lastMsgId == '#close=1') {
				this.deactivate();
				location.hash = '#';
			}
			if (this.lastMsgId == '#iframe_height=300') {
				this.absolute_div.style.height = '300px';
				location.hash = '#';
			}				
		}
	};
	

	PosterousBookmarklet.prototype.createBookmarklet = function() {
		// set viewport height to be something reasonable.
		var browserHeight = PosterousBookmarklet.getHeight();
		this.viewportHeight = (browserHeight < 610) ? browserHeight - 20 : 610;
		
		this.absolute_div = document.createElement('div');
		PosterousBookmarklet.setAttributes(this.absolute_div, {
			'id': 'POSTEROUS___bookmarklet_div', 
			'style': 'display: none; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; border: 4px solid #888; background: #fff none repeat scroll 0% 0%; position: fixed; top: 10px; right: 10px; width: 590px; height:' + this.viewportHeight+'px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; z-index: 2147483646;'});
		document.body.appendChild(this.absolute_div);

		this.absolute_div.innerHTML='<iframe name="POSTEROUS___bookmarklet_iframe" id="POSTEROUS___bookmarklet_iframe_id" style="border: 0px none; margin: 0px; padding: 0px; width: 100%; height: 100%; opacity: 1; overflow-x: hidden;"></iframe>'
		
		this.form_tag = document.createElement('form')
		PosterousBookmarklet.setAttributes(this.form_tag, {
			'target': 'POSTEROUS___bookmarklet_iframe',
			'action': this.posterous_domain + '/bookmarklet/iframe_contents', 
			'accept-charset': 'utf-8', 
			'id': 'POSTEROUS___bookmarklet_form', 
			'method':'POST'});
		
		this.input_title = document.createElement('input');
		PosterousBookmarklet.setAttributes(this.input_title, {'id': 'POSTEROUS___title', 'type': 'hidden', 'name': 'title'})
		this.form_tag.appendChild(this.input_title);
		
		this.input_linkto = document.createElement('input');
		PosterousBookmarklet.setAttributes(this.input_linkto,  {'id': 'POSTEROUS___linkto', 'type': 'hidden', 'name': 'linkto'});
		this.form_tag.appendChild(this.input_linkto);

		this.input_selection = document.createElement('input');
		PosterousBookmarklet.setAttributes(this.input_selection, {'id': 'POSTEROUS___selection', 'type': 'hidden', 'name': 'selection'});
		this.form_tag.appendChild(this.input_selection);

		this.input_doc_contents = document.createElement('input');
		PosterousBookmarklet.setAttributes(this.input_doc_contents, {'id': 'POSTEROUS___doc_contents', 'type': 'hidden', 'name': 'doc_contents'});
		this.form_tag.appendChild(this.input_doc_contents);

		document.body.appendChild(this.form_tag);
	};
	PosterousBookmarklet.prototype.getSelectionText = function() {
		var ws = window.getSelection;
		var ds = document.getSelection;
		var dss = document.selection;
		return ( ws ? ws() : (ds) ? ds() : (dss?dss.createRange().text:0) );
	};
	
	PosterousBookmarklet.prototype.getSelectedHTML = function() {
	    if (document.selection) {
	        var c = document.selection.createRange();
	        return c.htmlText;
	    }
	    var nNd = document.createElement("div");
		var sel = getSelection();
		if (sel == null || sel == '')
			return '';
	    var w = getSelection().getRangeAt(0).cloneContents();
		nNd.appendChild(w);
	    return nNd.innerHTML;
	};
	PosterousBookmarklet.prototype.activate = function() {
		this.input_title.value = document.title;
		this.input_linkto.value = document.location;
		this.input_selection.value = this.getSelectedHTML(); //this.getSelectionText();

		// pass img tag sizes along
		//
		var imgs = document.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
			var img_elem = imgs[i];
			var img_width = img_elem.width;
			var img_height = img_elem.height;
			if (img_height && img_height)
				PosterousBookmarklet.setAttributes(img_elem, {'width': img_width, 'height': img_height});
		}

		this.input_doc_contents.value = new String(document.body.innerHTML).replace(/<form method=\"post\" id=\"POSTEROUS___bookmarklet_form\".*<\/form>/, '');
		this.form_tag.submit();
		this.input_doc_contents.value = '';		// clear this out so that it doesn't submit back
		this.absolute_div.style.height = this.viewportHeight + 'px';
		PosterousBookmarklet.show(this.absolute_div);
	};
	PosterousBookmarklet.prototype.deactivate = function() {
		PosterousBookmarklet.hide(this.absolute_div);
	};
} 

if (typeof __posterousbookmarklet == "undefined") {
	var __posterousbookmarklet = new PosterousBookmarklet();
	__posterousbookmarklet.setup();
}

if (typeof __posterousbookmarklet != "undefined") {
	__posterousbookmarklet.activate();
} else {
	// alert("Something went wrong with the Posterous bookmarklet. Please let us know about this error by emailing us at help@posterous.com with the page on which you saw this failure.");
	location.href = POSTEROUS___bookmarklet_domain + '/bookmarklet/iframe_contents?linkto=' + escape(location.href) + "&title=" + escape(document.title);
}
