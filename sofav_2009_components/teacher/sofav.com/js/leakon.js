// 2006-11-02 10:56
// Last Function: divdispbtn

Leakon = function() {
	
}

// 检测浏览器类型
var nav = navigator.userAgent.toLowerCase();
Leakon.is_ie = ( ( nav.indexOf( "msie" ) != -1 ) || ( nav.indexOf( "opera" ) != -1 ) );

// 公用函数 开始
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

// 公用函数 结束

function add_class( el, classname ) {
	Leakon.addClass( el, classname );
}

function remove_class( el, classname ) {
	Leakon.removeClass( el, classname );
}

function add_event( el, evname, func ) {
	Leakon.addEvent( el, evname, func );
}

// 在 p 上添加新的子结点，t 为字节点的类型，如 table
function create_element( p, t ) {
	return	Leakon.createElement( t, p );
}

// 在 p 上添加新的文本结点，t 为文本
function add_text( p, txt ) {
	var el = null;
	el = document.createTextNode(txt);;
	p.appendChild(el);
	return el;
}

// 在 p 上添加新的子结点，t 为字节点的类型，如 table
function add_element( p, t ) {
	return	Leakon.createElement( t, p );
}

// 创建结点，t 为字节点的类型，如 table
function make_element( t ) {
	return	Leakon.makeElement( t );
}

function append_element( p, el ) {
	if (typeof p != "undefined") {
		p.appendChild(el);
	}
	return el;
}

// 返回当前结点对象
function get_element( e ) {
	return	Leakon.getElement( e );
}

/*
 * 生成表格，包括 table 结点和 tbody 结点
 * p_node	表格的父结点
 * table_id	表格ID
 * arr_info	表格数据，二维数组
 * callback_col	生成每个行结点的处理函数，接受2个参数( 数据数组, 单元索引 )
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
 * 生成 tbody 结点的子结点
 * callback_row	生成每个行结点的处理函数，接受2个参数( 数据数组, 单元索引 )
 * arr_info	表格数据，二维数组
 * rows		显示的数据数量
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

// 删除 p 结点的单个子结点 n 
function remove_child(p, n) {
	if(p && n && p == n.parentNode) {
		p.removeChild(n);
	}
}

// 删除 p_node 结点的所有子结点
function remove_children(p_node) {
	while(p_node.hasChildNodes()) {
		p_node.removeChild(p_node.lastChild);
	}
}

//	2 - 36 进制互转
function base_convert( n, from, to ) {
	var tmp, ret;
	tmp	= parseInt( n, from );
	ret	= tmp.toString( to );
	return	ret;
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

//Unicode 转 GBK
function unicode_to_gb(str)
{
	var re=/&#[\da-fA-F]{1,5};/ig;
	var arr=str.match(re);
	if(arr==null)return("");
	for(var i=0;i<arr.length;i++) arr[i]=String.fromCharCode(arr[i].replace(/[&#;]/g,""));
	return(arr.toString().replace(/,/g,""))
}

//GBK 转 Unicode
function gb_to_unicode(str)
{
	var arr = new Array();
	for(var i=0;i<str.length;i++) arr[i]="&#" + str.charCodeAt(i) + ";";
	return(arr.toString().replace(/,/g,""));
}

function get_abs_pos(o) {
	return	Leakon.getAbsolutePos(o);
}

// 按指定比例重新设置图片尺寸
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

// 按指定宽、高（px）重新设置图片尺寸
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

// 按最大宽、搞（px）测量图片，如果有一项超出最大值，则重新设置图片尺寸
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

// 替补图片
function isubstitute( o, surl ) {
	if( o, surl ) {
		o.src = surl;
	}
}

// 合并数组
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

// 设定一组 div 块的隐藏或显示 支持按 索引 或按 ID 设置显示状态
function divdisp() {
	var i			= 0;
	var m_curr_idx		= 0;
	var m_disp		= "";
	var m_id		= "";
	var m_div_string	= new Array();
	var m_div_array		= new Array();
	
	this.init = function( n ) {
		m_div_string = n.split( "|" );
		for( i = 0; i < m_div_string.length; i++ ) {
			m_div_array[m_div_array.length] = _ge( m_div_string[i] );
		}
	}
	
	this.display = function( idx ) {
		m_curr_idx	= idx;
		m_id		= m_div_string[idx];
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
	
	this.get_curr_idx = function() {
		return	m_curr_idx;
	}
	
	this.len = function() {
		return	m_div_array.length;
	}
}

function divdispbtn() {
	
	var i			= 0;
	var m_active_idx	= 0;
	var m_default_idx	= 0;
	var m_disp		= "";
	var m_id		= "";
	var m_css_over		= "";
	var m_css_out		= "";
	var m_btn_array		= new Array();
	var m_btn_obj		= new Array();
	var m_self		= null;
	var m_func		= null;
	var m_obj		= null;
	var m_tmp		= null;
	
	// 设置样式 ommouseover = over, onmouseout = out
	this.set_css = function( over, out ) {
		m_css_over	= over;
		m_css_out	= out;
	}
	
	// 激活当前元素
	this.set_active = function( idx ) {
		m_active_idx	= idx;
		for( i = 0; i < m_btn_obj.length; i++ ) {
			remove_class( m_btn_obj[i], m_css_over );
			remove_class( m_btn_obj[i], m_css_out );
			if( i == m_active_idx ) {
				add_class( m_btn_obj[i], m_css_over );
			} else {
				add_class( m_btn_obj[i], m_css_out );
			}
		}
	}
	
	// 设置联合函数，与 divdisp 的实例关联
	this.set_action = function ( func, obj ) {
		m_func	= func;
		m_obj	= obj;
	}
	
	// 初始化，需要传入实例的 指针，和按钮的 id 列表
	this.init = function( myself, n ) {
		m_self		= myself;
		m_btn_array	= n.split( "|" );
		for( i = 0; i < m_btn_array.length; i++ ) {
			m_tmp				= m_btn_obj.length;
			m_btn_obj[m_tmp]		= _ge( m_btn_array[i] );
			add_event( m_btn_obj[m_tmp], "click", this.click );
			add_event( m_btn_obj[m_tmp], "mouseover", this.over );
			add_event( m_btn_obj[m_tmp], "mouseout", this.out );
		}
	}
	
	this.click = function( event ) {
		i	= m_self.get_idx( event );
		m_self.set_active(i);
		if( m_func && m_obj ) {
			m_func( m_obj, m_active_idx );
		}
	}
	
	this.over = function( event ) {
		i	= m_self.get_idx( event );
		
		if( i == m_active_idx ) {
			return;
		}
		
		remove_class( m_btn_obj[i], m_css_over );
		remove_class( m_btn_obj[i], m_css_out );
		add_class( m_btn_obj[i], m_css_over );
		
	}
	
	this.out = function( event ) {
		i	= m_self.get_idx( event );
		
		if( i == m_active_idx ) {
			return;
		}
		
		remove_class( m_btn_obj[i], m_css_over );
		remove_class( m_btn_obj[i], m_css_out );
		add_class( m_btn_obj[i], m_css_out );
	}
	
	this.get_idx = function( event ) {
		var e		= get_element( event );
		var idx		= m_self.id_to_idx( e.id );
		return		idx;
	}
	
	this.id_to_idx = function( str_id ) {
		for( i = 0; i < m_btn_array.length; i++ ) {
			if( str_id == m_btn_array[i] ) {
				return	i;
			}
		}
	}
}

// 返回某个范围内的值，就近取边界值，需要预先对 m_var 进行类型转换
function default_range( m_var, m_min, m_max, auto ) {
	if( m_var < m_min ) {
		return	auto ? m_max : m_min;
	} else if( m_var > m_max ) {
		return	auto ? m_min : m_max;
	} else {
		return	m_var;
	}
}

// 获取 url 中的参数，不支持 form 编码
function url_decode( str ) {
    return	decodeURI( str );
}

function url_request( n ) {
	var i, tmp, qs_tmp;
	var ret		= "";
	var m_href	= window.location.href;
	var m_ppos	= m_href.indexOf( "?" );
	var m_qs	= m_href.substr( m_ppos + 1 );
	
	tmp		= m_qs.split( "&" );
	for( i = 0; i < tmp.length; i++ ) {
		qs_tmp	= tmp[i].split( "=" );
		if( qs_tmp[0].toUpperCase() == n.toUpperCase() ) {
			ret	= url_decode( qs_tmp[1] );
		}
	}
	return		ret;
}