// 2006-10-5 21:14
// Last Function: divdisp

Leakon = function() {
	
}

// ������������
var nav = navigator.userAgent.toLowerCase();
Leakon.is_ie = ( ( nav.indexOf( "msie" ) != -1 ) || ( nav.indexOf( "opera" ) != -1 ) );

// ���ú��� ��ʼ
Leakon.getAbsolutePos = function(el) {
	var r = { x: el.offsetLeft, y: el.offsetTop };
	if (el.offsetParent) {
		var tmp = Leakon.getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
};

Leakon.isRelated = function (el, evt) {
	var related = evt.relatedTarget;
	if (!related) {
		var type = evt.type;
		if (type == "mouseover") {
			related = evt.fromElement;
		} else if (type == "mouseout") {
			related = evt.toElement;
		}
	}
	while (related) {
		if (related == el) {
			return true;
		}
		related = related.parentNode;
	}
	return false;
};

Leakon.removeClass = function(el, className) {
	if (!(el && el.className)) {
		return;
	}
	var cls = el.className.split(" ");
	var ar = new Array();
	for (var i = cls.length; i > 0;) {
		if (cls[--i] != className) {
			ar[ar.length] = cls[i];
		}
	}
	el.className = ar.join(" ");
};

Leakon.addClass = function(el, className) {
	Leakon.removeClass(el, className);
	el.className += " " + className;
};

Leakon.getElement = function(ev) {
	if (Leakon.is_ie) {
		return window.event.srcElement;
	} else {
		return ev.currentTarget;
	}
};

Leakon.getTargetElement = function(ev) {
	if (Leakon.is_ie) {
		return window.event.srcElement;
	} else {
		return ev.target;
	}
};

Leakon.stopEvent = function(ev) {
	if (Leakon.is_ie) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
};

Leakon.addEvent = function(el, evname, func) {
	if (Leakon.is_ie) {
		el.attachEvent("on" + evname, func);
	} else {
		el.addEventListener(evname, func, true);
	}
};

Leakon.removeEvent = function(el, evname, func) {
	if (Leakon.is_ie) {
		el.detachEvent("on" + evname, func);
	} else {
		el.removeEventListener(evname, func, true);
	}
};

Leakon.createElement = function(type, parent) {
	var el = null;
	if (document.createElementNS) {
		// use the XHTML namespace; IE won't normally get here unless
		// _they_ "fix" the DOM2 implementation.
		el = document.createElementNS("http://www.w3.org/1999/xhtml", type);
	} else {
		el = document.createElement(type);
	}
	if (typeof parent != "undefined") {
		parent.appendChild(el);
	}
	return el;
};

Leakon.makeElement = function(type) {
	var el = null;
	if (document.createElementNS) {
		// use the XHTML namespace; IE won't normally get here unless
		// _they_ "fix" the DOM2 implementation.
		el = document.createElementNS("http://www.w3.org/1999/xhtml", type);
	} else {
		el = document.createElement(type);
	}
	return el;
};

Leakon.centerElement = function(el, parent) {
	var t = parent ? parent : document.body;
	var r = { width:el.offsetWidth, height:el.offsetHeight };
	var p = { width:t.offsetWidth, height:t.offsetHeight };
	var e = { left: Math.abs( p.width - r.width ) / 2, top: Math.abs( p.height - r.height ) / 2 }
	el.style.left = e.left + "px";
	el.style.top = e.top + "px";
	return r;
};

// ���ú��� ����

function add_class( el, classname ) {
	Leakon.addClass( el, classname );
}

function remove_class( el, classname ) {
	Leakon.removeClass( el, classname );
}

function add_event( el, evname, func ) {
	Leakon.addEvent( el, evname, func );
}

// �� p ������µ��ӽ�㣬t Ϊ�ֽڵ�����ͣ��� table
function create_element( p, t ) {
	return	Leakon.createElement( t, p );
}

// �� p ������µ��ı���㣬t Ϊ�ı�
function add_text( p, txt ) {
	var el = null;
	el = document.createTextNode(txt);;
	p.appendChild(el);
	return el;
}

// �� p ������µ��ӽ�㣬t Ϊ�ֽڵ�����ͣ��� table
function add_element( p, t ) {
	return	Leakon.createElement( t, p );
}

// ������㣬t Ϊ�ֽڵ�����ͣ��� table
function make_element( t ) {
	return	Leakon.makeElement( t );
}

function append_element( p, el ) {
	if (typeof p != "undefined") {
		p.appendChild(el);
	}
	return el;
}

// ���ص�ǰ������
function get_element( e ) {
	return	Leakon.getElement( e );
}

/*
 * ���ɱ�񣬰��� table ���� tbody ���
 * p_node	���ĸ����
 * table_id	���ID
 * arr_info	������ݣ���ά����
 * callback_col	����ÿ���н��Ĵ�����������2������( ��������, ��Ԫ���� )
 */
function show_table( p_node, table_id, arr_info, callback_row ) {
	
	var i, table, tbody, rows, row, col;
	
	rows	= arr_info.length;
	table	= add_element( p_node,	"table" );
	tbody	= add_element( table,	"tbody" );
	
	table.setAttribute( "id", table_id );
	
	return	show_tbody( tbody, callback_row, arr_info, rows );;
	
}

/*
 * ���� tbody �����ӽ��
 * callback_row	����ÿ���н��Ĵ�����������2������( ��������, ��Ԫ���� )
 * arr_info	������ݣ���ά����
 * rows		��ʾ����������
 */
function show_tbody( tbody, callback_row, arr_info, rows ) {
	
	var row = null;
	
	for( i = 0; i < rows; i++ ) {
		row	= callback_row( arr_info[i], i );
		append_element( tbody, row );
	}

	return tbody;
	
}

function insert_row( tbody, row, pos ) {
	var o;
	if( tbody && row ) {
		o = tbody.childNodes[pos];
		if( o ) {
			tbody.insertBefore( row, o );
		} else {
			tbody.appendChild( row );
		}
		//alert( tbody.childNodes[pos].innerHTML );
	}
}

function _ge(a) {
	return document.getElementById ? document.getElementById(a) : null;
}

function _gt(a,t) {
	var o = _ge(a);
	return o ? o.getElementsByTagName(t) : null;
}

// ɾ�� p ���ĵ����ӽ�� n 
function remove_child(p, n) {
	if(p && n && p == n.parentNode) {
		p.removeChild(n);
	}
}

// ɾ�� p_node ���������ӽ��
function remove_children(p_node) {
	while(p_node.hasChildNodes()) {
		p_node.removeChild(p_node.lastChild);
	}
}

function get_mod(num, b) {
	var t = "";
	if( num < 10 ) {
		t += num;
	} else if ( num < b ) {
		t += String.fromCharCode(num + 87);
	} else {
		t += 0;
	}
	return	t;
}
	
function convert_36_10( num ) {
	return	parseInt( num, 36 );
}

function convert_10_36( num ) {
	var t = num;
	var base = 36;
	var ret = "";
	var i, d, r;
	
	do {
		d	= t / base;
		r	= t % base;
		t	= parseInt( d );
		ret	+= get_mod(r, base);
	} while ( t >= base );
	t = get_mod( t, base );
	ret += t ? t : "";
	t	= ret;
	ret	= "";
	for( i = t.length; i > 0; i-- ) {
		ret += t.charAt(i-1);
	}
	return	ret;
	
}	

//Unicode ת GBK
function unicode_to_gb(str)
{
	var re=/&#[\da-fA-F]{1,5};/ig;
	var arr=str.match(re);
	if(arr==null)return("");
	for(var i=0;i<arr.length;i++) arr[i]=String.fromCharCode(arr[i].replace(/[&#;]/g,""));
	return(arr.toString().replace(/,/g,""))
}

//GBK ת Unicode
function gb_to_unicode(str)
{
	var arr = new Array();
	for(var i=0;i<str.length;i++) arr[i]="&#" + str.charCodeAt(i) + ";";
	return(arr.toString().replace(/,/g,""));
}

function get_abs_pos(o) {
	return	Leakon.getAbsolutePos(o);
}

// ��ָ��������������ͼƬ�ߴ�
function izoom( o, scale ) {
	if( o && scale ) {
		var pic_width	= o.width;
		var pic_height	= o.height;
		if ( pic_width > 1 && pic_height > 1 ) {
			o.width		= parseInt( pic_width * scale );
			o.height		= parseInt( pic_height * scale );
		}
	}
}

// ��ָ�����ߣ�px����������ͼƬ�ߴ�
function iresize( o, target_width, target_height ) {
	if( o ) {
		var scale		= null;
		var pic_width	= o.width;
		var pic_height	= o.height;
		
		var pic_scale	= pic_width / pic_height;
		var target_scale	= target_width / target_height;
		
		if ( pic_scale >= target_scale ) {
			scale	= target_width / pic_width;
		} else {
			scale	= target_height / pic_height;
		}
		izoom( o, scale );
	}
}

// �������㣨px������ͼƬ�������һ������ֵ������������ͼƬ�ߴ�
function imax( o, max_width, max_height ) {
	if( o && max_width && max_height ) {
		var pic_width	= o.width;
		var pic_height	= o.height;
		if ( pic_width > max_width || pic_height > max_height ) {
			iresize( o, max_width, max_height );
		} else {
		}
	}
}

// �油ͼƬ
function isubstitute( o, surl ) {
	if( o, surl ) {
		o.src = surl;
	}
}

// �ϲ�����
function array_merge( arr1, arr2 ) {
	if( typeof arr1 == "object" && typeof arr2 == "object" ) {
		var i;
		var ret	= new Array();
		for( i = 0; i < arr1.length; i++ ) {
			ret.push( arr1[i] );
		}
		for( i = 0; i < arr2.length; i++ ) {
			ret.push( arr2[i] );
		}
		return	ret;
	}
}

// �趨һ�� div ������ػ���ʾ ֧�ְ� ���� �� ID ������ʾ״̬
function divdisp() {
	var i		= 0;
	var m_disp	= "";
	var m_id		= "";
	var m_div_string	= new Array();
	var m_div_array	= new Array();
	
	this.init = function( n ) {
		m_div_string = n.split( "|" );
		for( i = 0; i < m_div_string.length; i++ ) {
			m_div_array[m_div_array.length] = _ge( m_div_string[i] );
		}
	}
	
	this.display = function( idx ) {
		m_id	= m_div_string[idx];
		this.displayid( m_id );
	}
	
	this.displayid = function( divid ) {
		for( i = 0; i < m_div_array.length; i++ ) {
			if( m_div_array[i].id == divid ) {
				m_disp	= "";
			} else {
				m_disp	= "none";
			}
			m_div_array[i].style.display	= m_disp;
		}
	}
}
