var __SFDialogInstance;
var __SF_Elements_Of_Frameset	= document.getElementsByTagName('frameset');
var __SF_Is_In_Frameset		= __SF_Elements_Of_Frameset.length;
var __SF_Doc_Refer		= document;
var __SF_Blocked_Instruction	= "The dialog window is blocked by your browser.\nCould you please check it out ? :)";
var __sfDialogScriptContent	= '';
//var sfDialog;

//alert(encodeURIComponent(__SF_Doc_Refer.title));

/*
__sfDialogScriptTag	= document.createElement('script');
__sfDialogScriptTag.src	= '<?php echo $dialogLocation ?>?';
document.body.appendChild(__sfDialogScriptTag);
window.focus()

setTimeout(
	function () {
		alert(__sfDialogScriptContent)
	},
	5000
);
*/

function SFBindEvent(targetObject, eventName, bindFunction) {
	if (document.addEventListener) {
		// Modern browser
		targetObject.addEventListener(eventName, bindFunction, false);
	} else {
		// IE5+
		setTimeout(
			function() {
				targetObject.attachEvent(
					"on" + eventName,
					new Function(  setTimeout(bindFunction, 10)  )
				);
			},
			10
		);
	}
}

function SFCallEventFunc(d) {

}

function SFLoaderChain(parentNode) {

	var arrChain	= Array();

	this.push	= function(objectToLoad, functionToCall) {
		var oneItem	= {obj:objectToLoad, func:functionToCall};
		arrChain.push(oneItem);
	}

	this.execute	= function() {

	//	alert(arrChain.length);
	//	return;

		for(var i = 0; i < arrChain.length; i++) {

		//	alert(arrChain[i].func);
			if (arrChain[i].func) {
			//	alert(arrChain[i].func);
			}

		//	SFBindEvent(arrChain[i].obj, 'load', arrChain[i].func);
		//	SFBindEvent(arrChain[i].obj, 'load', new Function( this.load(i) ));

		}

	}

	this.load	= function(indexOfChain) {

		alert(indexOfChain);

		parentNode.appendChild(arrChain[indexOfChain].obj);

		if (indexOfChain < (arrChain.length - 1)) {

			alert('lll');

			setTimeout(
				new Function( this.load(indexOfChain + 1) ),
				10
			);

		}

	}


}


/*

new Function(setTimeout(
	SFDrawDialogDiv,
	500
)

*/



function SFDrawDialogDiv() {
//	alert(__sfDialogScriptContent);

	var sfDialog		= __SF_Doc_Refer.createElement('div');
	sfDialog.id		= 'SofavBookmarkToolBar';
	sfDialog.style.width	= '800px';
	sfDialog.style.height	= '600px';
	sfDialog.style.position	= 'absolute';
//	sfDialog.style.top	= intFinalTop + 'px';
	sfDialog.style.top	= '20px';
	sfDialog.style.left	= '40px';
	sfDialog.style.zIndex	= '65535';

	sfDialog.innerHTML	= __sfDialogScriptContent;

	try {
		sfDialog.addEventListener('load', function() {sfDialog.style.display = 'block';}, false);
		// If it is IE, "addEventListener" does not exist, will throw an exception and skip the following lines.
	//	sfDialog.style.display	= 'none';
	} catch(e) {
	} finally {

	//	alert(window.frames.length);
		__SFDialogInstance	= __SF_Doc_Refer.body.appendChild(sfDialog);
	}
}



if (__SFDialogInstance) {
	__SFDialogInstance = !__SF_Doc_Refer.body.removeChild(__SFDialogInstance);
} else {
	setTimeout(

		function() {

			var intScrollTopOld	= parseInt(__SF_Doc_Refer.documentElement.scrollTop)
			var intScrollTopNew	= parseInt(__SF_Doc_Refer.body.scrollTop);
			var intFinalTop		= intScrollTopNew >= intScrollTopOld ? intScrollTopNew : intScrollTopOld;
			intFinalTop		-= -40;

			var sfParams		= Array();
			sfParams.push('u=' + encodeURIComponent(window.location));
			sfParams.push('t=' + encodeURIComponent(__SF_Doc_Refer.title));
			sfParams.push('agent=' + encodeURIComponent(navigator.userAgent));
			sfParams.push('browser=' + encodeURIComponent(navigator.appName));

			sfParams.push('scrollTop=' + intScrollTopOld + ':' + intScrollTopNew);
			sfParams.push('pCookie=' + __SF_Doc_Refer.cookie);
			sfParams.push('pDocType=' + __SF_Doc_Refer.doctype);
			sfParams.push('pBodyStyle=' + __SF_Doc_Refer.body.style.padding);

			var sfDialogSrc		= '<?php echo $dialogLocation ?>?' + sfParams.join('&');

			if (__SF_Is_In_Frameset) {

				var __SF_Is_Opened = window.open(sfDialogSrc);
				if (!__SF_Is_Opened) {
					alert(__SF_Blocked_Instruction);
				}

			} else {

				var myLoader	= new SFLoaderChain(__SF_Doc_Refer.body);


				if (1) {

					/*
					<link rel="stylesheet" type="text/css" media="screen" href="/css/main.css" />
					*/

					__sfDialogStyleTag	= __SF_Doc_Refer.createElement('link');
					__sfDialogStyleTag.rel	= 'stylesheet';
					__sfDialogStyleTag.type	= 'text/css';
					__sfDialogStyleTag.href	= '<?php echo $dialogStyleLocation ?>';
				//	__SF_Doc_Refer.body.appendChild(__sfDialogStyleTag);


					myLoader.push(__sfDialogStyleTag);


/*
				//	var sfDialog		= __SF_Doc_Refer.createElement('div');
					sfDialog		= __SF_Doc_Refer.createElement('div');
					sfDialog.id		= 'SofavBookmarkToolBar';
					sfDialog.style.width	= '800px';
					sfDialog.style.height	= '600px';
					sfDialog.style.position	= 'absolute';
					sfDialog.style.top	= intFinalTop + 'px';
					sfDialog.style.left	= '40px';
					sfDialog.style.zIndex	= '128';
*/

					__sfDialogScriptTag	= __SF_Doc_Refer.createElement('script');
					__sfDialogScriptTag.src	= sfDialogSrc;

					myLoader.push(__sfDialogScriptTag, SFDrawDialogDiv);

					myLoader.execute();

					return;


/*
					if (__SF_Doc_Refer.addEventListener) {
						__sfDialogScriptTag.addEventListener('load', SFDrawDialogDiv, false);
					} else {
					//	__sfDialogScriptTag.attachEvent('onload', SFDrawDialogDiv);

					//	__sfDialogScriptTag.onload = 'SFDrawDialogDiv';



					//	var lx = setTimeout(SFDrawDialogDiv, 50000);
					//	alert(typeof lx);
					//	alert(typeof SFDrawDialogDiv);

						setTimeout(function() {
								__sfDialogScriptTag.attachEvent(
										"onload",
										new Function(setTimeout(
											SFDrawDialogDiv,
											500
										))
								);
							},
							50
						);

					}

					__SFDialogInstance	= __SF_Doc_Refer.body.appendChild(__sfDialogScriptTag);
*/



				//	alert(52);
				//	window.focus()

/*
					try {
						if (__SF_Doc_Refer.addEventListener) {
							__sfDialogScriptTag.addEventListener('load', SFDrawDialogDiv, false);
						} else {
							__sfDialogScriptTag.attachEvent('onload', SFDrawDialogDiv);
						}

					} catch(e) {

					} finally {

						__SFDialogInstance	= __SF_Doc_Refer.body.appendChild(__sfDialogScriptTag);
						window.focus()

					}


*/


					try {

					/*
						__sfDialogScriptTag	= document.createElement('script');
						__sfDialogScriptTag.src	= sfDialogSrc;
						document.body.appendChild(__sfDialogScriptTag);
						window.focus()

						alert(__sfDialogScriptContent);
					*/

					} catch(e) {
					} finally {

					}







					return;
				}


				var sfDialog		= __SF_Doc_Refer.createElement('iframe');
				sfDialog.id		= 'SofavBookmarkToolBar';
				sfDialog.name		= sfDialog.id;
				sfDialog.src		= sfDialogSrc;
				sfDialog.style.width	= '800px';
				sfDialog.style.height	= '600px';
				sfDialog.style.position	= 'absolute';
				sfDialog.style.top	= intFinalTop + 'px';
				sfDialog.style.left	= '40px';
				sfDialog.style.zIndex	= '128';
				sfDialog.style.backgroundColor		= 'transparent';
				sfDialog.allowTransparency		= 'true';
				sfDialog.scrolling			= 'no';
				sfDialog.border				= '0';
				sfDialog.frameBorder			= '0';


			//	alert(__SF_Doc_Refer.documentElement.scrollTop + ' : ' + __SF_Doc_Refer.body.scrollTop + ' : ' + sfDialog.style.top);
			//	sfDialog.src		= 'http://code.kk.com/leakon/html/div_alpha/div_alpha.html';
			//	sfDialog.style.left	= '400px';
			//	sfDialog.style.top	= '200px';

				try {
					sfDialog.addEventListener('load', function() {sfDialog.style.display = 'block';}, false);
					// If it is IE, "addEventListener" does not exist, will throw an exception and skip the following lines.
					sfDialog.style.display	= 'none';
				} catch(e) {
				} finally {

				//	alert(window.frames.length);
					__SFDialogInstance	= __SF_Doc_Refer.body.appendChild(sfDialog);
				}
			}


		// End of function
		},
		64
	);
}