
var LeakonGetScripts	= function() {

	var browserAgent	= navigator.userAgent.toLowerCase();
	var browser		= {
					version:	(browserAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],
					safari:		/webkit/.test(browserAgent),opera:/opera/.test(browserAgent),
					msie:		/msie/.test(browserAgent)&&!/opera/.test(browserAgent),
					mozilla:	/mozilla/.test(browserAgent)&&!/(compatible|webkit)/.test(browserAgent)
				};

	var arrParamQueue	= [];
	var version		= "2009-02-01";

	var sign		= (Math.random() + "").replace(/[.0]*/g, "");

	this.add	= function(scriptSrc) {

		var rand	= (new Date()).getTime()
				+ (Math.random() + "").replace(/[.0]*/g, "");

		scriptSrc	+= (-1 == scriptSrc.indexOf("?") ? "?" : "&") + "r=" + rand + "&sign=" + sign;

		var scriptId	= "id_" + rand;
		var param	= {
					"rand":		rand,
					"src":		scriptSrc,
					"id":		scriptId
				};

		arrParamQueue.push(param);

	}	// end of add()

	this.loadFirst	= function() {

		var len	= arrParamQueue.length;

		if (len > 0) {
		} else {
			return;
		}

		var __THIS__		= this;

		var objParam		= arrParamQueue.shift();

		var scriptElement	= document.createElement("script");
		scriptElement.type	= "text/javascript";
		scriptElement.src	= objParam["src"];
		scriptElement.id	= objParam["id"];;

		if (browser.msie) {

			scriptElement.onreadystatechange	= function() {

					var idx	= scriptElement.src.match(/time=(\d+)/i)[1];

					if ("loaded" == scriptElement.readyState
					|| "complete" == scriptElement.readyState) {
						__THIS__.loadFirst(false);
					}
				}

		} else {

			scriptElement.onload	= function() {
					__THIS__.loadFirst(false);
				}

		}

		document.body.appendChild(scriptElement);

	}	// end of loadFirst()

	this.beginLoad	= function() {
		this.loadFirst(true);
	}

}	// end of Class

