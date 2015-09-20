function updatesize(){
	var bodyWidth = document.documentElement.clientWidth;
	if (bodyWidth <= 752) {
		document.body.style.width = '752px';
	} else {
		document.body.style.width = '100%';
	}
	return true;
}
window.onresize = function() {
	setTimeout(updatesize, 200);
}
