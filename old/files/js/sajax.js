// remote scripting library
// (c) copyright 2005 modernmethod, inc
var sajax_debug_mode = 0;
var sajax_request_type = "GET";
var sajax_target_id = "";
var sajax_failure_redirect = "/";

function sajax_debug(text) {
/*	if (sajax_debug_mode)
		//alert(text);//delete
*/
}

function sajax_init_object() {
	sajax_debug("sajax_init_object() called..")
	
	var A;
	
	var msxmlhttp = new Array(
		'Msxml2.XMLHTTP.5.0',
		'Msxml2.XMLHTTP.4.0',
		'Msxml2.XMLHTTP.3.0',
		'Msxml2.XMLHTTP',
		'Microsoft.XMLHTTP');
	for (var i = 0; i < msxmlhttp.length; i++) {
		try {
			A = new ActiveXObject(msxmlhttp[i]);
		} catch (e) {
			A = null;
		}
	}
	
	if(!A && typeof XMLHttpRequest != "undefined")
		A = new XMLHttpRequest();
	if (!A)
		sajax_debug("Could not create connection object.");
	return A;
}

var sajax_requests = new Array();

function sajax_cancel() {
	for (var i = 0; i < sajax_requests.length; i++) 
		sajax_requests[i].abort();
}

/*
 * uri		服务端地址
 * task		请求任务
 * callback	回调函数，服务端返回的字符串将做为唯一的参数传递给回调函数
 * args		JS数组，按顺序向服务端发送参数
 */
function sajax_do_call(uri, task, callback, args) {
	var i, x, n;
	var uri;
	var post_data;
	var target_id;
	var rand = new Date().getTime();
	
	sajax_debug("in sajax_do_call().." + sajax_request_type + "/" + sajax_target_id);
	target_id = sajax_target_id;
	if (typeof(sajax_request_type) == "undefined" || sajax_request_type == "") 
		sajax_request_type = "GET";
	
	if (sajax_request_type == "GET") {
	
		if (uri.indexOf("?") == -1) 
			uri += "?task=" + task;
		else
			uri += "&task=" + task;
		uri += "&rand=" + rand;
		
		for (i = 0; i < args.length; i++) 
			uri += "&args[]=" + args[i];

		post_data = null;
	} 
	else if (sajax_request_type == "POST") {
		post_data = "task=" + task;
		post_data += "&rand=" + rand;
		
		for (i = 0; i < args.length; i++) 
			post_data = post_data + "&args[]=" + args[i];
	}
/*
	else {
		//alert("Illegal request type: " + sajax_request_type);//delete
	}
*/			
	x = sajax_init_object();
	if (x == null) {
		if (sajax_failure_redirect != "") {
			location.href = sajax_failure_redirect;
			return false;
		} else {
			sajax_debug("NULL sajax object for user agent:\n" + navigator.userAgent);
			return false;
		}
	} else {
		x.open(sajax_request_type, uri, true);
		
		sajax_requests[sajax_requests.length] = x;
		
		if (sajax_request_type == "POST") {
			x.setRequestHeader("Method", "POST " + uri + " HTTP/1.1");
			x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
	
		x.onreadystatechange = function() {
			if (x.readyState != 4) 
				return;

			sajax_debug("received " + x.responseText);
		
			var status;
			var data;
			var txt = x.responseText.replace(/^\s*|\s*$/g,"");
			//callback(txt);
			
			status = txt.charAt(0);
			data = txt.substring(2);

			if (status == "") {
				// let's just assume this is a pre-response bailout and let it slide for now
			} else if (status == "-") 
				alert("Error: " + data);//delete
			else {
				callback(txt);
			}
			
			
		}
	}
	
	sajax_debug(callback + " uri = " + uri + "/post = " + post_data);
	x.send(post_data);
	sajax_debug(callback + " waiting..");
	delete x;
	return true;
}
