var seed = document.getElementById('qingTool');
seed.src = '';
document.body.removeChild(seed);
var _ua = navigator.userAgent.toLowerCase();
var isIE6 = /msie 6/.test(_ua);

if (!isIE6) {
    scope = {
        $pageid: 'qingTool'
    };
    $_GLOBAL = {};
    $_GLOBAL.DOMAIN_CORE = "http://qing.weibo.com";
    var js = document.createElement('script');
    js.src = 'http://sjs.sinajs.cn/xblog/captureImgsLayer.js?r=' + Math.random();
    //js.src = 'http://sjs.sinajs.cn/bind2/index.php?product=xblog&pageid=captureImgsLayer';
    js.setAttribute('charset', 'utf-8');
    (document.getElementsByTagName("head")[0] || document.body).appendChild(js);
    js.onload = js.onreadystatechange = function() {
        if (js && js.readyState && js.readyState != "loaded" && js.readyState != "complete") {
            return;
        }
        js.onload = js.onreadystatechange = js.onerror = null;
        js.src = "";
        js.parentNode.removeChild(js);
        js = null;
        main();
    };
}
;
