if (typeof Sina == "undefined") {
    Sina = {}
}
Sina.pkg = function(c) {
    if (!c || !c.length) {
        return null
    }
    var d = c.split(".");
    var b = Sina;
    for (var a = (d[0] == "Sina") ? 1 : 0; a < d.length; ++a) {
        b[d[a]] = b[d[a]] || {};
        b = b[d[a]]
    }
    return b
};
function $E(b) {
    var a = typeof b == "string" ? document.getElementById(b) : b;
    if (a != null) {
        return a
    } else {
    }
    return null
}
function $C(a) {
    return document.createElement(a)
}
function $N(a) {
    return document.getElementsByName(a)
}
function $T(b, a) {
    return b.getElementsByTagName(a)
}
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (e) {
}
(function() {
    var b = function(f, d) {
        var c = f;
        return function() {
            return c.apply(d, arguments)
        }
    };
    var a = "Debug";
    if (window[a] == null || typeof window[a].log == "undefined") {
        window[a] = {cacheData: [],base_url: "http://sjs.sinajs.cn/bind2/",product: scope.$PRODUCT_NAME,baseColor: {1: {color: "#FFF",bgcolor: "#E00"},2: {color: "#F00"},3: {color: "#FFF000"},4: {color: "#0F0"},5: {color: "#FFF"}},fatal: function(c) {
                this.addData(c, 1)
            },error: function(c) {
                this.addData(c, 2)
            },warning: function(c) {
                this.addData(c, 3)
            },info: function(c) {
                this.addData(c, 4)
            },log: function(c) {
                this.addData(c, 5)
            },dir: function(c) {
                this.addData(c, 5)
            },addData: function(d, c, f, g) {
                if (d == null) {
                    return
                }
                if (typeof d != "object") {
                    d = d.toString()
                }
                var h = {type: c || "5",color: f || this.baseColor[c].color,bgcolor: g || this.baseColor[c].bgcolor};
                this.cacheData.push([d, h]);
                if (this.initFinished == true) {
                    this.showCurrentData([d, h])
                }
            }};
        window.trace = b(window[a].log, window[a]);
        window.traceError = b(window[a].error, window[a])
    }
})();
Sina.pkg("Core");
if (typeof Core == "undefined") {
    Core = Sina.Core
}
Sina.pkg("Core.Array");
Core.Array.foreach = function(d, c) {
    if (d == null && d.constructor != Array) {
        return []
    }
    var f = 0, b = d.length, g = [];
    while (f < b) {
        var a = c(d[f], f);
        if (a !== null) {
            g[g.length] = a
        }
        f++
    }
    return g
};
Sina.pkg("Core.Events");
Core.Events.addEvent = function(g, d, c, a) {
    var f = typeof g == "string" ? $E(g) : g;
    if (f == null) {
        trace("addEvent 找不到对象：" + g);
        return
    }
    if (typeof a == "undefined") {
        a = false
    }
    if (typeof c == "undefined") {
        c = "click"
    }
    if (f.addEventListener) {
        f.addEventListener(c, d, a);
        return true
    } else {
        if (f.attachEvent) {
            var b = f.attachEvent("on" + c, d);
            return true
        } else {
            f["on" + c] = d
        }
    }
};
Core.Events.removeEvent = function(a, b, c) {
    var d = $E(a);
    if (d == null) {
        trace("removeEvent 找不到对象：" + a);
        return
    }
    if (typeof b != "function") {
        return
    }
    if (typeof c == "undefined") {
        c = "click"
    }
    if (d.addEventListener) {
        d.removeEventListener(c, b, false)
    } else {
        if (d.attachEvent) {
            d.detachEvent("on" + c, b)
        }
    }
    b[c] = null
};
Sina.pkg("Core.Function");
Core.Function.bind3 = function(d, c, b) {
    b = b == null ? [] : b;
    var a = d;
    return function() {
        return a.apply(c, b)
    }
};
Core.Array.findit = function(a, c) {
    var b = -1;
    Core.Array.foreach(a, function(f, d) {
        if (c == f) {
            b = d
        }
    });
    return b
};
window.onerror = function(c, b, a) {
    trace("Error occured:" + c + "<br/>file:" + b + "<br/>line:" + a + "<br/>");
    return true
};
function Jobs(a) {
    this.option = a || {};
    this._jobTable = [[], [], [], []]
}
Jobs.prototype = {_registedJobTable: {},errorMsg: [],_registJob: function(b, a) {
        this._registedJobTable[b] = a
    },error: function(a) {
        Debug.error(a);
        this.errorMsg.push(a)
    },add: function(b, a) {
        a = a || 1;
        if (Core.Array.findit(this._jobTable[a], b) == -1) {
            this._jobTable[a].push(b)
        } else {
            this.error("Error: Job <b>" + b + "</b> is existed now.")
        }
    },start: function() {
        if (this.option.onStart != null) {
            this.option.onStart()
        }
        var c = this._registedJobTable;
        var a = this._jobTable[1].concat(this._jobTable[2]);
        var d = this;
        this.fe = Core.Function.bind3(d.focus, d, []);
        var b = function() {
            if (d._jobTable[3].length == 0) {
                if (d.option.onEnd != null) {
                    d.option.onEnd()
                }
                return
            }
            Core.Events.addEvent(document.body, d.fe, "focus");
            Core.Events.addEvent(window, d.fe, "scroll");
            Core.Events.addEvent(document.body, d.fe, "mousemove");
            Core.Events.addEvent(document.body, d.fe, "mouseover")
        };
        this.queue(a, b)
    },focus: function() {
        var b = this;
        if (this.focusdown) {
            Core.Events.removeEvent(document.body, b.fe, "focus");
            Core.Events.removeEvent(window, b.fe, "scroll");
            Core.Events.removeEvent(document.body, b.fe, "mousemove");
            Core.Events.removeEvent(document.body, b.fe, "mouseover");
            b.fe = null;
            return
        }
        this.focusdown = true;
        var a = this._jobTable[3];
        this.queue(a, this.option.onEnd)
    },queue: function(a, j) {
        var h = this;
        var b = function() {
            return new Date().valueOf()
        };
        var c = this._registedJobTable;
        var g = a.length;
        var f = 0;
        var d = window.setInterval(function() {
            if (f >= g) {
                clearInterval(d);
                d = null;
                if (j != null) {
                    j()
                }
                return
            }
            var o = a[f];
            var m = c[o];
            f++;
            if (typeof m == "undefined") {
                h.error("<b>Job[" + o + "] is undefiend!!!</b>");
                return
            }
            var l = true;
            var k = b();
            try {
                m.call()
            } catch (n) {
                h.error("<b>Job[" + o + "] failed!!!</b>" + n.message + "");
                if (j != null) {
                    j()
                }
                l = false;
                throw n
            }finally {
                if (l) {
                    var i = b();
                    Debug.info("<b>Job[" + o + "] done in " + (i - k) + "ms.</b>")
                }
            }
        }, 10)
    },call: function(b, a) {
        if (typeof this._registedJobTable[b] != "undefined") {
            this._registedJobTable[b].apply(this, a)
        } else {
            trace("<b>Job[" + b + "] is undefined!!!</b>", {color: "#900",bgColor: "#FFF;"})
        }
    }};
$registJob = function(b, a) {
    Jobs.prototype._registJob(b, a)
};
$callJob = function(b) {
    var a = [];
    if (arguments.length > 1) {
        Core.Array.foreach(arguments, function(c, d) {
            a[d] = c
        });
        a.shift()
    }
    Jobs.prototype.call(b, a)
};
if (typeof Lib == "undefined") {
    Lib = {}
}
Lib.pkg = function(c) {
    if (!c || !c.length) {
        return null
    }
    var d = c.split(".");
    var b = Lib;
    for (var a = (d[0] == "Lib") ? 1 : 0; a < d.length; ++a) {
        b[d[a]] = b[d[a]] || {};
        b = b[d[a]]
    }
    return b
};
Sina.pkg("Core.String");
Core.String.trimHead = function(a) {
    return a.replace(/^(\u3000|\s|\t)*/gi, "")
};
Core.String.trimTail = function(a) {
    return a.replace(/(\u3000|\s|\t)*$/gi, "")
};
Core.String.trim = function(a) {
    return Core.String.trimHead(Core.String.trimTail(a))
};
Lib.classUtils = function() {
};
Lib.classUtils.prototype.addClass = function(b, a) {
    if (!b) {
        return false
    }
    if (!this.hasClass(b, a)) {
        b.className = Core.String.trim(b.className.concat(" " + a))
    }
};
Lib.classUtils.prototype.delClass = function(c, b) {
    if (!c) {
        return false
    }
    var a = new RegExp("( +|^)" + b + "(?=( |$))", "ig");
    c.className = Core.String.trim(c.className.replace(a, ""))
};
Lib.classUtils.prototype.hasClass = function(c, b) {
    if (!c) {
        return false
    }
    var a = new RegExp("( +|^)" + b + "(?=( |$))", "ig");
    return a.test(c.className)
};
Sina.pkg("Core.Dom");
Core.Dom.getElementsByClass = function(c, b, h) {
    c = c || document;
    var d = [];
    h = " " + h + " ";
    var k = c.getElementsByTagName(b), g = k.length;
    for (var f = 0; f < g; ++f) {
        var a = k[f];
        if (a.nodeType == 1) {
            var j = " " + a.className + " ";
            if (j.indexOf(h) != -1) {
                d[d.length] = a
            }
        }
    }
    return d
};
Core.Dom.byClz = Core.Dom.getElementsByClass;
(function(h) {
    var i = navigator.userAgent.toLowerCase();
    var f = {$winXP: /windows nt 5.1/.test(i),$winVista: /windows nt 6.0/.test(i),$win7: /windows nt 6.1/.test(i),$macOS: /mac/.test(i)};
    var b = {$OPERA: false,$IE6: false,$IE7: false,$IE8: false,$IE9: false,$SAFARI: false,$FF2: false,$FF3: false,$FF4: false,$FF: false,$CHROME: false,$TT: false,$360: false,$SOGO: false,$Maxthon: false};
    var d = {$IE: false,$MOZ: false,$WEBKIT: false,$KHTML: false};
    if (/opera/.test(i) || h.opera) {
        b.$OPERA = true
    } else {
        if (/chrome\/(\S+)/.test(i)) {
            b.$CHROME = true
        } else {
            if (/safari\/(\S+)/.test(i)) {
                b.$SAFARI = true
            } else {
                if (/msie/.test(i)) {
                    d.$IE = true;
                    if (/360se/.test(i)) {
                        b.$360 = true
                    } else {
                        if (/tencenttraveler/.test(i)) {
                            b.$TT = true
                        } else {
                            if (/se\s\S+\smetasr\s\d+\.\d+/.test(i)) {
                                b.$SOGO = true
                            }
                        }
                    }
                    if (/msie 8/.test(i)) {
                        b.$IE8 = true
                    } else {
                        if (/msie 6/.test(i)) {
                            b.$IE6 = true
                        } else {
                            if (/msie 9/.test(i)) {
                                b.$IE9 = true
                            } else {
                                if (/msie 7/.test(i)) {
                                    b.$IE7 = true
                                }
                            }
                        }
                    }
                } else {
                    if (/firefox/.test(i)) {
                        b.$FF = true;
                        if (/firefox\/3/.test(i)) {
                            b.$FF3 = true
                        } else {
                            if (/firefox\/4/.test(i)) {
                                b.$FF4 = true
                            } else {
                                if (/firefox\/2/.test(i)) {
                                    b.$FF2 = true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    try {
        var c = window.external;
        b.$Maxthon = c.max_version ? true : false
    } catch (g) {
    }
    if (/applewebkit\/(\S+)/.test(i)) {
        d.$WEBKIT = true
    } else {
        if (/khtml\/(\S+)/.test(i)) {
            d.$KHTML = true
        } else {
            if (/rv:([^\)]+)\) gecko\/\d{8}/.test(i)) {
                d.$MOZ = true
            }
        }
    }
    function a(l, j) {
        var k;
        for (k in j) {
            l[k] = j[k]
        }
    }
    a(h, b);
    a(h, d);
    a(h, f)
})(window);
Core.Dom.getStyle = function(a, c) {
    switch (c) {
        case "opacity":
            var f = 100;
            try {
                f = a.filters["DXImageTransform.Microsoft.Alpha"].opacity
            } catch (d) {
                try {
                    f = a.filters("alpha").opacity
                } catch (d) {
                }
            }
            return f / 100;
        case "float":
            c = "styleFloat";
        default:
            var b = a.currentStyle ? a.currentStyle[c] : null;
            return (a.style[c] || b)
    }
};
if (!$IE) {
    Core.Dom.getStyle = function(a, c) {
        if (c == "float") {
            c = "cssFloat"
        }
        try {
            var b = document.defaultView.getComputedStyle(a, "")
        } catch (d) {
            traceError(d)
        }
        return a.style[c] || b ? b[c] : null
    }
}
Sina.pkg("Core.System");
Core.System.getScrollPos = function(c) {
    c = c || document;
    var a = c.documentElement;
    var b = c.body;
    return [Math.max(a.scrollTop, b.scrollTop), Math.max(a.scrollLeft, b.scrollLeft), Math.max(a.scrollWidth, b.scrollWidth), Math.max(a.scrollHeight, b.scrollHeight)]
};
Core.Dom.getXY = function(b) {
    if ((b.parentNode == null || b.offsetParent == null || Core.Dom.getStyle(b, "display") == "none") && b != document.body) {
        return false
    }
    var a = null;
    var g = [];
    var c;
    var d = b.ownerDocument;
    c = b.getBoundingClientRect();
    var f = Core.System.getScrollPos(b.ownerDocument);
    return [c.left + f[1], c.top + f[0]];
    a = b.parentNode;
    while (a.tagName && !/^body|html$/i.test(a.tagName)) {
        if (Core.Dom.getStyle(a, "display").search(/^inline|table-row.*$/i)) {
            g[0] -= a.scrollLeft;
            g[1] -= a.scrollTop
        }
        a = a.parentNode
    }
    return g
};
if (!$IE) {
    Core.Dom.getXY = function(b) {
        if ((b.parentNode == null || b.offsetParent == null || Core.Dom.getStyle(b, "display") == "none") && b != document.body) {
            return false
        }
        var a = null;
        var g = [];
        var c;
        var d = b.ownerDocument;
        g = [b.offsetLeft, b.offsetTop];
        a = b.offsetParent;
        var f = Core.Dom.getStyle(b, "position") == "absolute";
        if (a != b) {
            while (a) {
                g[0] += a.offsetLeft;
                g[1] += a.offsetTop;
                if ($SAFARI && !f && Core.Dom.getStyle(a, "position") == "absolute") {
                    f = true
                }
                a = a.offsetParent
            }
        }
        if ($SAFARI && f) {
            g[0] -= b.ownerDocument.body.offsetLeft;
            g[1] -= b.ownerDocument.body.offsetTop
        }
        a = b.parentNode;
        while (a.tagName && !/^body|html$/i.test(a.tagName)) {
            if (Core.Dom.getStyle(a, "display").search(/^inline|table-row.*$/i)) {
                g[0] -= a.scrollLeft;
                g[1] -= a.scrollTop
            }
            a = a.parentNode
        }
        return g
    }
}
Sina.pkg("Utils");
if (typeof Utils == "undefined") {
    Utils = Sina.Utils
}
Sina.pkg("Utils.Io");
if (typeof Xblog === "undefined") {
    Xblog = {}
}
Xblog.captureImgs = function(c) {
    var d = c.picLimWidth || 100, h = c.picLimHeight || 100, f = c.createLayer || function() {
    };
    var m = [];
    var i;
    l();
    return a();
    function a(y, n, p) {
        var v = y || document;
        n = n || [], p = p || {};
        for (var q = 0; q < v.images.length; q++) {
            var r = v.images[q];
            if (j(r)) {
                if (r.src.indexOf("http") == -1) {
                    var t = location.host;
                    r.src = t + r.src
                }
                b(r);
                r = k(r);
                n.push(r);
                m.push(r.src)
            }
        }
        var s;
        if (document.all) {
            s = v.frames
        } else {
            s = v.getElementsByTagName("iframe")
        }
        for (var o = 0; o < s.length; o++) {
            try {
                var y;
                if (document.all) {
                    y = s[o].document
                } else {
                    y = s[o].contentDocument
                }
                if (y) {
                    var w = s[o].parentNode;
                    n = a(y, n, {parentNode: w})
                }
            } catch (u) {
            }
        }
        return n
    }
    function l() {
        if ($E("captureToQing")) {
            return
        }
        var n = document.createElement("input");
        n.value = "收集到Qing";
        n.type = "button";
        n.id = "captureToQing";
        n.style.display = "none";
        n.style.position = "absolute";
        n.style.width = 100 + "px";
        n.style.zIndex = 10000000;
        document.body.appendChild(n);
        n.onmouseover = function() {
            clearTimeout(i);
            this.style.display = "block"
        };
        n.onmouseout = function(p) {
            var o = p || window.event;
            var q = o.relatedTarget || o.toElement;
            if (q === n.curImg) {
                return
            }
            var r = this;
            i = setTimeout(function() {
                r.style.display = "none"
            }, 100)
        };
        n.onclick = function() {
            f(n.curImg)
        }
    }
    function b(n) {
        if (n.getAttribute("capturePin")) {
            return
        }
        n.setAttribute("capturePin", "registered");
        var o = document.getElementById("captureToQing");
        n.onmouseover = function() {
            clearTimeout(i);
            g(o, n);
            o.style.display = "block"
        };
        n.onmouseout = function(q) {
            var p = q || window.event;
            var r = p.relatedTarget || p.toElement;
            if (r === o) {
                return
            }
            i = setTimeout(function() {
                o.style.display = "none"
            }, 100)
        }
    }
    function g(o, n) {
        var p = Core.Dom.getXY(n);
        o.style.position = "absolute";
        o.style.left = p[0] + "px";
        o.style.top = p[1] + "px";
        o.curImg = n
    }
    function j(n) {
        for (var o = 0; o < m.length; o++) {
            if (n.src == m[o]) {
                return !1
            }
        }
        if (n.style.display != "none" && n.width >= d && n.height >= h) {
            return !0
        } else {
            return !1
        }
    }
    function k(n) {
        var o = new Image;
        o.w = n.width;
        o.h = n.height;
        o.src = n.src;
        o.alt = n.alt;
        return o
    }
};
Xblog.onlyShadow = function(b, c, f) {
    this.entity = null;
    this.parent = c || document.body;
    this._ie6Fixed = function() {
        if (d.entity) {
            d.entity.style.top = document.documentElement.scrollTop + "px";
            var i = (document.documentElement.scrollLeft - d._ie6EntityXY[0]);
            var h = i + d.entity.offsetWidth;
            var g = (document.documentElement.scrollWidth || document.body.scrollWidth);
            if (h <= g) {
                d.entity.style.left = i + "px"
            }
            if (d.ifm) {
                d.ifm.style.top = d.entity.style.top;
                if (h <= g) {
                    d.ifm.style.left = d.entity.style.left
                }
            }
        }
    };
    var d = this;
    this.resetShadowDiv = Core.Function.bind3(function() {
        if (d.entity) {
            setTimeout(function() {
                d.updateSize();
                if ($IE6 && d.isShow()) {
                    d.entity.style.left = "0px";
                    var g = Core.Dom.getXY(d.entity);
                    d._ie6EntityXY = g;
                    d._ie6Fixed()
                }
            }, 1)
        }
    }, this);
    this._create = function() {
        d.entity = $C("div");
        if (f) {
            d.entity.id = f
        }
        d.entity.style.position = "absolute";
        d.entity.style.width = d.getAreaWidth() + "px";
        d.entity.style.height = d.getAreaHeight() + "px";
        d.entity.style.left = "0px";
        d.entity.style.top = "0px";
        d.entity.style.zIndex = 1400000;
        d.entity.style.backgroundColor = "black";
        d.parent.appendChild(d.entity);
        d._setOpacity(d.entity, isNaN(b) ? 0.5 : b);
        if ($IE6) {
            var h = Core.Dom.getXY(d.entity);
            d._ie6EntityXY = h;
            var g = (document.documentElement.scrollLeft - d._ie6EntityXY[0]);
            d.entity.style.left = g + "px";
            d.addIframe()
        }
        Core.Events.addEvent(window, d.resetShadowDiv, "resize");
        d.setFixed(true);
        d.hidden()
    };
    (function a() {
        if (f && $E(f)) {
            d.entity = $E(f)
        } else {
            d._create()
        }
    })()
};
Xblog.onlyShadow.prototype = {isShow: function() {
        return this.entity.offsetHeight > 0 ? true : false
    },show: function() {
        this.entity.style.display = "";
        if (this.ifm) {
            this.ifm.style.display = ""
        }
        if ($IE6) {
            this.updateSize();
            this.entity.style.left = "0px";
            var a = Core.Dom.getXY(this.entity);
            this._ie6EntityXY = a;
            this._ie6Fixed()
        }
        this.onShow()
    },hidden: function() {
        this.entity.style.display = "none";
        if (this.ifm) {
            this.ifm.style.display = "none"
        }
        this.onHidden()
    },close: function() {
        this.hidden();
        this.destroy()
    },destroy: function() {
        Core.Events.removeEvent(window, this._ie6Fixed, "scroll");
        Core.Events.removeEvent(window, this.resetShadowDiv, "resize");
        this.entity.parentNode.removeChild(this.entity);
        this.entity = null;
        if (this.ifm) {
            this.ifm.parentNode.removeChild(this.ifm);
            this.ifm = null
        }
    },addIframe: function() {
        this.ifm = $C("iframe");
        this._setOpacity(this.ifm, 0);
        this.ifm.style.position = "absolute";
        this.ifm.style.zIndex = this.entity.style.zIndex;
        this.ifm.style.left = this.entity.style.left;
        this.ifm.style.top = this.entity.style.top;
        this.ifm.style.width = this.entity.style.width;
        this.ifm.style.height = this.entity.style.height;
        this.entity.parentNode.insertBefore(this.ifm, this.entity)
    },insertBefore: function(a) {
        a.parentNode.insertBefore(this.entity, a);
        if (this.ifm) {
            this.entity.parentNode.insertBefore(this.ifm, this.entity)
        }
    },updateSize: function() {
        var b = this.getAreaWidth();
        var a = this.getAreaHeight();
        this.entity.style.width = b + "px";
        this.entity.style.height = a + "px";
        if (this.ifm) {
            this.ifm.style.width = b + "px";
            this.ifm.style.height = a + "px"
        }
    },getAreaHeight: function() {
        var a = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
        return a
    },getAreaWidth: function() {
        var a = document.documentElement.clientWidth || document.body.clientWidth;
        return a
    },setFixed: function(a) {
        if ($IE6) {
            var b = this;
            if (a) {
                b._ie6Fixed();
                Core.Events.addEvent(window, b._ie6Fixed, "scroll")
            } else {
                Core.Events.removeEvent(window, b._ie6Fixed, "scroll")
            }
        } else {
            this.entity.style.position = a ? "fixed" : "absolute"
        }
    },_setOpacity: function(b, a) {
        if ($IE) {
            b.style.filter = "alpha(opacity=" + a * 100 + ")"
        } else {
            b.style.opacity = a
        }
    },onShow: function() {
    },onHidden: function() {
    }};
Xblog.loadExternalCSS = function(a, f) {
    if (typeof a !== "string") {
        return
    }
    var c, d, b = document.getElementsByTagName("head")[0] || document.body;
    if ($FF) {
        d = $C("style");
        d.type = "text/css";
        d.innerHTML = "@import url(" + a + ")";
        b.appendChild(d);
        (function() {
            try {
                d.sheet.cssRules;
                typeof f === "function" && f()
            } catch (g) {
                setTimeout(arguments.callee, 50)
            }
        })()
    } else {
        c = $C("link");
        c.href = a;
        c.type = "text/css";
        c.rel = "stylesheet";
        c.media = "all";
        b.appendChild(c);
        if ($SAFARI || $CHROME) {
            (function() {
                try {
                    c.sheet.cssRules;
                    typeof f === "function" && f()
                } catch (g) {
                    setTimeout(arguments.callee, 50)
                }
            })()
        } else {
            c.onload = function() {
                c.onload = null;
                typeof f === "function" && f()
            }
        }
    }
};
$registJob("captureImgs", function() {
    if (location.hostname.indexOf("qing.weibo.com") != -1) {
        alert("不能收集Qing本站的图片，请使用转载功能");
        return
    }
    if ($E("captureStepOne")) {
        return
    }
    var h = Core.Events.addEvent;
    var a = Core.Dom.getElementsByClass;
    var d = new Lib.classUtils;
    var g = '<div class="qingLayerBg"><div class="qingLayerInner"><div class="qingCaptureBox "><div class=" qingCaptureTit "><h4>收集到Qing</h4><div class="qingTip "><p id="choicePicNum">一次最多可以选择20张图片</p></div><a class="qingClose" id="captureCloseBtn" href="#" title=""></a></div><div class="qinCaptureCon"><div class="qingPicWrap"><!--最大高度是338px，超出后显示滚动条--><ul class="qingPicList" id="capturePicWrap"></ul></div><div class="qingBtnWrap"><a class="qingBtn qingBtndis" id="captureNextBtn"><span>下一步</span></a><!--此为按钮不可用状态--><span style="display:none" class="qingErrorTip" id="captureErrorTip">请选择一张图片</span></div></div></div></div></div>';
    Xblog.loadExternalCSS("http://simg.sinajs.cn/xblogstyle/css/dialog/layer_capture.css?r=" + Math.random(), function() {
        if ($E("captureStepOne")) {
            return
        }
        var k = {picLimWidth: 100,picLimHeight: 100,createLayer: n};
        var j = false, l = 0, i = 20;
        window.liEventInit = false;
        n();
        function n(s) {
            var x = new Xblog.onlyShadow(0.8, document.body, "captureMaskLayer");
            var o = $C("div");
            o.id = "captureStepOne";
            o.className = "qingCaptureWrap qingCaptureStep1";
            o.innerHTML = g;
            o.style.display = "none";
            document.body.appendChild(o);
            if (s) {
                var v = new Image;
                v.alt = s.alt;
                v.src = s.src;
                s = v;
                j = true;
                m([s])
            } else {
                var t = Xblog.captureImgs(k);
                if (t.length == 0) {
                    alert("抱歉，页面上没有足够大的图片");
                    document.body.removeChild(o);
                    return
                }
                m(t)
            }
            x.show();
            $E("captureStepOne").style.display = "";
            f("captureStepOne");
            $E("captureStepOne").style.zIndex = 14010000;
            if (!window.liEventInit) {
                window.liEventInit = true;
                var w = $E("captureCloseBtn"), u = $E("capturePicWrap"), r = $E("captureErrorTip"), q = $E("captureNextBtn"), p = $E("captureLoading");
                h(w, function() {
                    document.body.removeChild($E("captureStepOne"));
                    window.liEventInit = false;
                    x.close()
                }, "click");
                h(u, function(B) {
                    var z = B || window.event;
                    var A = z.target || z.srcElement;
                    var y = c(A, "li");
                    if (!y) {
                        return
                    }
                    if (!d.hasClass(y, "selected")) {
                        d.addClass(y, "selected");
                        l++;
                        $E("choicePicNum").innerHTML = '还可以选择<span style="color:red;">' + (i - l) + "</span>张";
                        if (l > i) {
                            l--;
                            $E("choicePicNum").innerHTML = '还可以选择<span style="color:red;">' + (i - l) + "</span>张";
                            d.delClass(y, "selected");
                            return
                        }
                    } else {
                        d.delClass(y, "selected");
                        l--;
                        $E("choicePicNum").innerHTML = '还可以选择<span style="color:red;">' + (i - l) + "</span>张"
                    }
                    if (l >= 1) {
                        d.delClass(q, "qingBtndis");
                        r.style.display = "none"
                    } else {
                        d.addClass(q, "qingBtndis")
                    }
                });
                h(q, function() {
                    if (l == 0) {
                        $E("captureErrorTip").innerHTML = "请至少选择一张图片";
                        $E("captureErrorTip").style.display = "inline";
                        return
                    }
                    var I = [];
                    var y = u.getElementsByTagName("li");
                    for (var A = 0; A < y.length; A++) {
                        if (y[A].className == "selected") {
                            var B = y[A].innerHTML;
                            var H = /<img(.+?)src=""*([^\s]+?)""*(\s|>)/ig;
                            var F = String(B.match(H));
                            var C = /src\s*=\s*(["'])([^"']+)\1/i;
                            I.push(String(F.match(C)[2]))
                        }
                    }
                    document.body.removeChild($E("captureStepOne"));
                    window.liEventInit = false;
                    x.close();
                    var D = "";
                    for (var A = 0; A < I.length; A++) {
                        D += "img[]=";
                        var E = b(String(I[A]));
                        D += encodeURIComponent(E);
                        D += "&"
                    }
                    var G = document.URL;
                    var z = $_GLOBAL.DOMAIN_CORE + "/blog/controllers/capture.php?" + D + "&title=" + encodeURIComponent(document.title) + "&host=" + encodeURIComponent(G) + "&r=" + Math.random();
                    window.open(z, "selectionshare", "toolbar=0,status=0,resizable=1,width=900,height=500,left=100,top=100")
                }, "click")
            }
        }
        function m(r) {
            for (var q = 0; q < r.length; q++) {
                var o = $C("li");
                var p = '<a href="javascript:void(0);" title="图片大小:' + r[q].w + "x" + r[q].h + '" onclick="return false;"><img src="' + r[q].src + '" alt="图片大小:' + r[q].alt + '" title="图片大小:' + r[q].w + "x" + r[q].h + '"><span class="qingMaskLayer"></span><span class="qingIcon"></span></a>';
                if (j == true) {
                    d.addClass(o, "selected");
                    d.delClass($E("captureNextBtn"), "qingBtndis");
                    $E("captureErrorTip").style.display = "none";
                    l++;
                    j = false
                }
                o.innerHTML = p;
                $E("capturePicWrap").appendChild(o)
            }
        }
    });
    function c(j, i) {
        i = i.toUpperCase();
        while (j != document.body) {
            if (j.tagName.toUpperCase() == i) {
                return j
            }
            j = j.parentNode
        }
        return null
    }
    function f(i) {
        var j = document.documentElement.clientHeight || document.body.clientHeight;
        var l = document.documentElement.clientWidth || document.body.clientWidth;
        var k = 876;
        $E(i).style.position = $IE6 ? "absolute" : "fixed";
        $E(i).style.left = Math.abs(l - k) / 2 + "px";
        if ($IE6) {
            $E(i).style.top = document.documentElement.scrollTop + 60 + "px"
        } else {
            $E(i).style.top = 60 + "px"
        }
    }
    function b(j) {
        var i = document.createElement("div");
        i.innerHTML = j;
        return i.innerText || i.textContent
    }
});
function main() {
    var a = new Jobs();
    a.add("captureImgs");
    a.start()
}
;
