
var id_add		= "add";
var id_categories_input	= "add_input_3";
var id_tags_input		= "add_input_4";
var id_msg_box		= "message_box";
var o_steps		= new divdisp();
var str_tags_separator	= "|";

window.onload		= sofav_init;

function sofav_init() {
	add_event( window, "resize", remove_msg_box );
}

function init_add() {
	var o1 = _gt( id_add, "input" );
	var o2 = _gt( id_add, "textarea" );
	var o = array_merge( o1, o2 );
	o_steps.init( "add_input_1_a|add_input_2_a|add_input_3_a|add_input_4_a|add_input_5_a|add_input_6_a" );
	o_steps.display(0);
	
	if(o) {
		for( var i = 0; i < o.length; i++ ) {
			if( o[i].type != "submit" ) {
				add_event( o[i], "focus", add_ifocus );
				add_event( o[i], "blur", add_iblur );
			}
		}
	}
	
	add_event( _ge( "my_categories" ),	"click", view_my_categories );
	add_event( _ge( "my_categories_t" ),	"click", view_my_categories );
	add_event( _ge( "system_categories" ),	"click", view_sys_categories );
	add_event( _ge( "system_categories_t" ),	"click", view_sys_categories );
	add_event( _ge( "my_tags" ),		"click", view_my_tags );
	add_event( _ge( "my_tags_t" ),	"click", view_my_tags );
	add_event( _ge( "system_tags" ),	"click", view_sys_tags );
	add_event( _ge( "system_tags_t" ),	"click", view_sys_tags );
	
	add_event( window,	"keydown", handle_keydown );
	add_event( document.body,	"keydown", handle_keydown );
	
}

function handle_keydown( event ) {
	var kcode	= event.keyCode;
	if( kcode == 27 ) {	// Esc
		remove_msg_box();
	}
}

function add_ifocus(e) {
	var o = get_element(e);
	if(o) {
		if( o.type != "checkbox" ) {
			add_class( o, "add_input_curr" );
		}
		o_steps.displayid( o.id + "_a" );
	}
}

function add_iblur(e) {
	var n;
	var o = get_element(e);
	if(o) {
		if( o.type != "checkbox" ) {
			remove_class( o, "add_input_curr" );
		}
	}
}

function view_my_categories() {
	var info	= new Array();
	info[0]	= id_categories_input;
	info[1]	= "我的分类"
	info[2]	= my_categories;
	make_msg_box( info );
}

function view_sys_categories() {
	var info	= new Array();
	info[0]	= id_categories_input;
	info[1]	= "系统分类";
	info[2]	= system_categories;
	make_msg_box( info );
}

function view_my_tags() {
	var info	= new Array();
	info[0]	= id_tags_input;
	info[1]	= "我的标签";
	info[2]	= my_tags;
	make_msg_box( info );
}

function view_sys_tags() {
	var info	= new Array();
	info[0]	= id_tags_input;
	info[1]	= "系统标签";
	info[2]	= system_tags;
	make_msg_box( info );
}

function make_msg_box( info ) {
	
	var m_input_id	= info[0];
	var m_box_title	= info[1];
	var m_content_len	= "(" + info[2].length + ")";
	var m_box_content	= make_box_content( info[0], info[2] );
	
	if( _ge( id_msg_box ) ) {
		remove_msg_box();
	}
	
	var o_input	= _ge( m_input_id );
	if( o_input ) {
		o_steps.displayid( m_input_id + "_a" );
		add_class( o_input, "add_input_curr" );
		var msg_box		= make_element( "div" );
		var msg_len		= make_element( "span" );
		var finish_btn		= make_element( "div" );
		var finish_img		= make_element( "img" );
		var finish_txt		= make_element( "div" );
		
		var p			= 0.96;
		var pos			= get_abs_pos( o_input );
		msg_box.setAttribute( "id", id_msg_box );
		msg_box.style.left		= parseInt( pos.x - 30 ) + "px";
		msg_box.style.top		= parseInt( pos.y - 220 ) + "px";
		msg_box.style.filter 		= 'Alpha(Opacity=' + parseInt( p * 100 ) + ')';
		msg_box.style.MozOpacity	= p;
		add_text( msg_box, m_box_title );
		
		msg_len.className		= "msg_len";
		add_text( msg_len, m_content_len );
		
		finish_btn.className	= "finish_btn";
		
		finish_img.title		= "关闭对话框";
		finish_img.src		= path_img + "close.gif";
		finish_img.className	= "finish_img";
		
		finish_txt.title		= "关闭对话框";
		finish_txt.className	= "finish_txt";
		add_text( finish_txt, " 完成" );
		
		add_event( finish_btn, "click", remove_msg_box );
		add_event( finish_btn, "mouseover", fbtn_over );
		add_event( finish_btn, "mouseout", fbtn_out );
		
		append_element( document.body, msg_box );
		append_element( msg_box, msg_len );
		append_element( msg_box, m_box_content );
		append_element( finish_btn, finish_txt );
		append_element( finish_btn, finish_img );
		append_element( msg_box, finish_btn );
		
		return		msg_box;
	}
}

function remove_msg_box() {
	var o = _ge( id_msg_box );
	if(o) {
		remove_child( o.parentNode, o );
		remove_class( _ge(id_categories_input), "add_input_curr" );
		remove_class( _ge(id_tags_input), "add_input_curr" );
	}
}

function fbtn_over(e) {
	var o = get_element(e);
	if(o) {
		add_class( o, "finish_over" );
	}
}

function fbtn_out(e) {
	var o = get_element(e);
	if(o) {
		remove_class( o, "finish_over" );
	}
}

function make_box_content( t, info ) {
	if( t && info ) {
		var i;
		var str		= "";
		var content	= make_element( "div" );
		content.setAttribute( "id", "box_content" );
		for( i = 0; i < info.length; i++ ) {
			if ( info[i].length ) {
				str	+= '<span onclick="insert_word( \'' + t + '\', this )">' + info[i] + '</span> ';
			}
		}
		content.innerHTML	= str;
		return	content;
	}
}

function insert_word( m, o ) {
	var s	= "";
	var t	= _ge( m );
	var v	= o.innerHTML;
	if( t && v ) {
		add_class( o, "cate_selected" );
		if( m == id_categories_input ) {	// Category
			if( t.value.indexOf( v ) != -1 ) {	// Tag 已存在
				t.value = "";
				remove_class( o, "cate_selected" );
			} else {
				t.value = v;
			}
		} else if ( m == id_tags_input ) {	// Tag
			if( t.value.indexOf( v ) != -1 ) {	// Tag 已存在	
				remove_class( o, "cate_selected" );
				s	= t.value;
				s	= s.replace( str_tags_separator + v, "" );
				s	= s.replace( v + str_tags_separator, "" );
				s	= s.replace( v, "" );
				t.value	= s;
				if( str_tags_separator == t.value ) {
					t.value = "";
				}
				
			} else {		// Tag 不存在
				if(t.value.length) {
					s = str_tags_separator;
				}
				t.value += s + v;
			}
		}
	}
}


function frm_reset( t ) {
	var o1 = _gt( t, "input" );
	var o2 = _gt( t, "textarea" );
	var o = array_merge( o1, o2 );
	if( o ) {
		var e;
		for( var i = 0; i < o.length; i++ ) {
			e	= o[i];
			if( e.type != "button" && e.type != "submit" ) {
				e.value = "";
			}
		}
	}
}