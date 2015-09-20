/**
 *
 * Javascript 打印对象
 *
 *
 */

SFDebug	= {};
SFDebug.dump = { };
SFDebug.dump = (function() {
	var max,
		depth = 0,
		INDENT = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
	function valueToStr(value, depth) {
		switch(typeof value) {
			case "object":
				return objectToStr(value, depth + 1);
			case "function":
				return "function";
			case "string":
				return "'"+value+"'";
			default:
				return value;
		}
	};
	function objectToStr(object, depth) {
		if(depth > max)
			return false;
		var type = Object.prototype.toString.call(object),
			output = "\n",
			indent = INDENT.substr(0, depth);
		for(var key in object)
			output += indent + valueToStr(key) + ": " + valueToStr(object[key], depth) + ",\n";
		indent = INDENT.substr(0, depth - 1);
		switch(type) {
			case "[object Object]":
				return "{ " + output.substr(0, output.length - 2) + "\n" + indent + "}";
			case "[object Array]":
				return "[ " + output.substr(0, output.length - 2) + "\n" + indent + "]";
			default:
				return;
		}
	};
	return function(value, aggregate, MAX) {
		max = MAX || 2;
		value = valueToStr(value, depth);

		return	alert(value);

		var d = document.getElementById("TEST");
		if(!d) { // TEST does not exist
			var d = document.createElement("textarea");
			d.id = "TEST";
			document.body.appendChild(d);
		}
		d.innerHTML = aggregate ? d.innerHTML + value : value;
	};
})();