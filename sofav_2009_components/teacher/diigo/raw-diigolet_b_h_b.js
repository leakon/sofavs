(function(){

	try {
		if(window.diigoToolbarVersion) {
			alert("Diigolet will not run because Diigo Toolbar is installed.");
			return
		}


		var J=navigator.userAgent.toLowerCase();
		browser={
			version:	(J.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],
			safari:		/webkit/.test(J),opera:/opera/.test(J),
			msie:		/msie/.test(J)&&!/opera/.test(J),
			mozilla:	/mozilla/.test(J)&&!/(compatible|webkit)/.test(J)
		};

		var H=!browser.msie||document.compatMode=="CSS1Compat";
		var F="http://www.diigo.com/javascripts/webtoolbar";

		function B(){
			var K=window;
			if(K.document.body.tagName.toLowerCase()=="body"){
				return K
			}
			if(K.document.getElementsByTagName("frameset").length>0){
				K=C(K.frames)
			}
			return K
		}


		function D(K){
			return browser.opera&&document.body["client"+K]||browser.safari&&window["inner"+K]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+K]||document.body["client"+K]
		}


		function C(R){
				var P=null;

				for(var O=0;O<R.length;O++){
					var L=R[O];
					var N=false;

					try{
						N=!!(L.document&&L.document.body)
					}catch(Q){
					}

					if(!N){
						continue
					}

					if(L.document.getElementsByTagName("frameset").length>0){
						L=C(L.frames)
					}

					if(P==null){
						P=L
					}else{
						var M=D(P,"width")*D(P,"height");
						var K=D(L,"width")*D(L,"height");
						if(K>M){
							P=L
						}
					}
				}
			return P
		}

		function A(M,L,N){
			var K=M.getElementById(N);
			if(K&&K.tagName.toLowerCase()=="script"){
			K.parentNode.removeChild(K)}

			K=M.createElement("script");
			K.id=N;
			K.type="text/javascript";
			K.src=L;
			M.body.appendChild(K)
		}


		var I=B(),G=I.document;

		if(I.diigolet&&I.diigolet.loaded){
			I.diigolet.show()
		}else{
			I.diigoletLaunchMode=0;
			setTimeout(
				function(){

					if(I.diigoletLaunchMode!=5&&I.diigoletLaunchMode!=6){
						var L="diigoDivLoading";
						var K=G.getElementById(L)||G.createElement("div");
						K.id=L;
						K.innerHTML="Loading Diigolet...";
						K.style.cssText="width:150px;top:0;left:0;background-color:#CC4444;"
						+"color:#fff;font:normal 14px arial;padding:2px;padding-left:6px;z-index:9999;position:"
						+((browser.msie&&parseFloat(browser.version)<7)||(!H)?"absolute;":"fixed;");
						G.body.appendChild(K)
					}

					A(I.document,F+"/diigolet.js","diigoLoaderScript_2")
				}
				,100
			)
		}


	}catch(E){
		alert(":( Diigolet doesn't support this page.")
	}

}
)();