if (window.diigolet == undefined) {
    (function() {
        var D = window.diigolet = {
            debug: false,
            logLevel: "error",
            version: "4.0b14",
            show: function() {
                Toolbar.show()
            },
            callback: function() {
                WebAPI.callback.apply(WebAPI, arguments)
            },
            devil: function(s) {
                return eval(s)
            }
        };
        window.diigoletrocks = function() {
            D.logLevel = "debug";
            window.d = window.D = D;
            window.dj = $;
            window.devil = window.e = D.devil;
            window.Bookmark = Bookmark;
            window.Annotation = Annotation;
            window.TextHighlight = TextHighlight;
            window.ImageHighlight = ImageHighlight;
            window.FloatNote = FloatNote;
            window.Comment = Comment;
            window.PageComment = PageComment;
            window.InlineComment = InlineComment;
            window.Ctx = Ctx;
            window.Toolbar = Toolbar;
            window.DlgBookmark = DlgBookmark;
            window.DlgIC = DlgIC;
            window.Post2Twitter = Post2Twitter;
            window.Utils = Utils
        };
        (function() {
            var _jQuery = window.jQuery,
            _$ = window.$;
            var jQuery = window.jQuery = window.$ = function(selector, context) {
                return new jQuery.fn.init(selector, context)
            };
            var quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
            isSimple = /^.[^:#\[\.]*$/,
            undefined;
            jQuery.fn = jQuery.prototype = {
                init: function(selector, context) {
                    selector = selector || document;
                    if (selector.nodeType) {
                        this[0] = selector;
                        this.length = 1;
                        return this
                    }
                    if (typeof selector == "string") {
                        var match = quickExpr.exec(selector);
                        if (match && (match[1] || !context)) {
                            if (match[1]) {
                                selector = jQuery.clean([match[1]], context)
                            } else {
                                var elem = document.getElementById(match[3]);
                                if (elem) {
                                    if (elem.id != match[3]) {
                                        return jQuery().find(selector)
                                    }
                                    return jQuery(elem)
                                }
                                selector = []
                            }
                        } else {
                            return jQuery(context).find(selector)
                        }
                    } else { if (jQuery.isFunction(selector)) {
                            return jQuery(document)[jQuery.fn.ready ? "ready" : "load"](selector)
                        }
                    }
                    return this.setArray(jQuery.makeArray(selector))
                },
                jquery: "1.2.7pre",
                size: function() {
                    return this.length
                },
                get: function(num) {
                    return num == undefined ? jQuery.makeArray(this) : this[num]
                },
                pushStack: function(elems) {
                    var ret = jQuery(elems);
                    ret.prevObject = this;
                    return ret
                },
                setArray: function(elems) {
                    this.length = 0;
                    Array.prototype.push.apply(this, elems);
                    return this
                },
                each: function(callback, args) {
                    return jQuery.each(this, callback, args)
                },
                index: function(elem) {
                    var ret = -1;
                    return jQuery.inArray(elem && elem.jquery ? elem[0] : elem, this)
                },
                attr: function(name, value, type) {
                    var options = name;
                    if (name.constructor == String) {
                        if (value === undefined) {
                            return this[0] && jQuery[type || "attr"](this[0], name)
                        } else {
                            options = {};
                            options[name] = value
                        }
                    }
                    return this.each(function(i) {
                        for (name in options) {
                            jQuery.attr(type ? this.style : this, name, jQuery.prop(this, options[name], type, i, name))
                        }
                    })
                },
                css: function(key, value) {
                    if ((key == "width" || key == "height") && parseFloat(value) < 0) {
                        value = undefined
                    }
                    return this.attr(key, value, "curCSS")
                },
                text: function(text) {
                    if (typeof text != "object" && text != null) {
                        return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text))
                    }
                    var ret = "";
                    jQuery.each(text || this, function() {
                        jQuery.each(this.childNodes, function() {
                            if (this.nodeType != 8) {
                                ret += this.nodeType != 1 ? this.nodeValue : jQuery.fn.text([this])
                            }
                        })
                    });
                    return ret
                },
                wrapAll: function(html) {
                    if (this[0]) {
                        jQuery(html, this[0].ownerDocument).clone().insertBefore(this[0]).map(function() {
                            var elem = this;
                            while (elem.firstChild) {
                                elem = elem.firstChild
                            }
                            return elem
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(html) {
                    return this.each(function() {
                        jQuery(this).contents().wrapAll(html)
                    })
                },
                wrap: function(html) {
                    return this.each(function() {
                        jQuery(this).wrapAll(html)
                    })
                },
                append: function() {
                    return this.domManip(arguments, true, false, function(elem) {
                        if (this.nodeType == 1) {
                            this.appendChild(elem)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, true, true, function(elem) {
                        if (this.nodeType == 1) {
                            this.insertBefore(elem, this.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, false, false, function(elem) {
                        this.parentNode.insertBefore(elem, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, false, true, function(elem) {
                        this.parentNode.insertBefore(elem, this.nextSibling)
                    })
                },
                end: function() {
                    return this.prevObject || jQuery([])
                },
                find: function(selector) {
                    var elems = jQuery.map(this, function(elem) {
                        return jQuery.find(selector, elem)
                    });
                    return this.pushStack(/[^+>] [^+>]/.test(selector) ? jQuery.unique(elems) : elems)
                },
                clone: function(events) {
                    var ret = this.map(function() {
                        if (jQuery.browser.msie && !jQuery.isXMLDoc(this)) {
                            var clone = this.cloneNode(true),
                            container = document.createElement("div");
                            container.appendChild(clone);
                            return jQuery.clean([container.innerHTML])[0]
                        } else {
                            return this.cloneNode(true)
                        }
                    });
                    var clone = ret.find("*").andSelf().each(function() {
                        if (this[expando] != undefined) {
                            this[expando] = null
                        }
                    });
                    if (events === true) {
                        this.find("*").andSelf().each(function(i) {
                            if (this.nodeType == 3) {
                                return
                            }
                            var events = jQuery.data(this, "events");
                            for (var type in events) {
                                for (var handler in events[type]) {
                                    jQuery.event.add(clone[i], type, events[type][handler], events[type][handler].data)
                                }
                            }
                        })
                    }
                    return ret
                },
                filter: function(selector) {
                    return this.pushStack(jQuery.isFunction(selector) && jQuery.grep(this, function(elem, i) {
                        return selector.call(elem, i)
                    }) || jQuery.multiFilter(selector, this))
                },
                not: function(selector) {
                    if (selector.constructor == String) {
                        if (isSimple.test(selector)) {
                            return this.pushStack(jQuery.multiFilter(selector, this, true))
                        } else {
                            selector = jQuery.multiFilter(selector, this)
                        }
                    }
                    var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
                    return this.filter(function() {
                        return isArrayLike ? jQuery.inArray(this, selector) < 0 : this != selector
                    })
                },
                add: function(selector) {
                    return this.pushStack(jQuery.unique(jQuery.merge(this.get(), typeof selector == "string" ? jQuery(selector) : jQuery.makeArray(selector))))
                },
                is: function(selector) {
                    return !! selector && jQuery.multiFilter(selector, this).length > 0
                },
                hasClass: function(selector) {
                    return this.is("." + selector)
                },
                val: function(value) {
                    if (value == undefined) {
                        var elem = this[0];
                        if (elem) {
                            if (jQuery.nodeName(elem, "option")) {
                                return (elem.attributes.value || {}).specified ? elem.value : elem.text
                            }
                            if (jQuery.nodeName(elem, "select")) {
                                var index = elem.selectedIndex,
                                values = [],
                                options = elem.options,
                                one = elem.type == "select-one";
                                if (index < 0) {
                                    return null
                                }
                                for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                                    var option = options[i];
                                    if (option.selected) {
                                        value = jQuery(option).val();
                                        if (one) {
                                            return value
                                        }
                                        values.push(value)
                                    }
                                }
                                return values
                            }
                            return (elem.value || "").replace(/\r/g, "")
                        }
                        return undefined
                    }
                    if (value.constructor == Number) {
                        value += ""
                    }
                    return this.each(function() {
                        if (this.nodeType != 1) {
                            return
                        }
                        if (value.constructor == Array && /radio|checkbox/.test(this.type)) {
                            this.checked = (jQuery.inArray(this.value, value) >= 0 || jQuery.inArray(this.name, value) >= 0)
                        } else { if (jQuery.nodeName(this, "select")) {
                                var values = jQuery.makeArray(value);
                                jQuery("option", this).each(function() {
                                    this.selected = (jQuery.inArray(this.value, values) >= 0 || jQuery.inArray(this.text, values) >= 0)
                                });
                                if (!values.length) {
                                    this.selectedIndex = -1
                                }
                            } else {
                                this.value = value
                            }
                        }
                    })
                },
                html: function(value) {
                    return value == undefined ? (this[0] ? this[0].innerHTML : null) : this.empty().append(value)
                },
                replaceWith: function(value) {
                    return this.after(value).remove()
                },
                eq: function(i) {
                    return this.slice(i, +i + 1)
                },
                slice: function() {
                    return this.pushStack(Array.prototype.slice.apply(this, arguments))
                },
                map: function(callback) {
                    return this.pushStack(jQuery.map(this, function(elem, i) {
                        return callback.call(elem, i, elem)
                    }))
                },
                andSelf: function() {
                    return this.add(this.prevObject)
                },
                data: function(key, value) {
                    var parts = key.split(".");
                    parts[1] = parts[1] ? "." + parts[1] : "";
                    if (value === undefined) {
                        var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                        if (data === undefined && this.length) {
                            data = jQuery.data(this[0], key)
                        }
                        return data === undefined && parts[1] ? this.data(parts[0]) : data
                    } else {
                        return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function() {
                            jQuery.data(this, key, value)
                        })
                    }
                },
                removeData: function(key) {
                    return this.each(function() {
                        jQuery.removeData(this, key)
                    })
                },
                domManip: function(args, table, reverse, callback) {
                    var clone = this.length > 1,
                    elems;
                    return this.each(function() {
                        if (!elems) {
                            elems = jQuery.clean(args, this.ownerDocument);
                            if (reverse) {
                                elems.reverse()
                            }
                        }
                        var obj = this;
                        if (table && jQuery.nodeName(this, "table") && jQuery.nodeName(elems[0], "tr")) {
                            obj = this.getElementsByTagName("tbody")[0] || this.appendChild(this.ownerDocument.createElement("tbody"))
                        }
                        var scripts = jQuery([]);
                        jQuery.each(elems, function() {
                            var elem = clone ? jQuery(this).clone(true)[0] : this;
                            if (jQuery.nodeName(elem, "script")) {
                                scripts = scripts.add(elem)
                            } else { if (elem.nodeType == 1) {
                                    scripts = scripts.add(jQuery("script", elem).remove())
                                }
                                callback.call(obj, elem)
                            }
                        });
                        scripts.each(evalScript)
                    })
                }
            };
            jQuery.fn.init.prototype = jQuery.fn;
            function evalScript(i, elem) {
                if (elem.src) {
                    jQuery.ajax({
                        url: elem.src,
                        async: false,
                        dataType: "script"
                    })
                } else {
                    jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || "")
                }
                if (elem.parentNode) {
                    elem.parentNode.removeChild(elem)
                }
            }
            function now() {
                return +new Date
            }
            jQuery.extend = jQuery.fn.extend = function() {
                var target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false,
                options;
                if (target.constructor == Boolean) {
                    deep = target;
                    target = arguments[1] || {};
                    i = 2
                }
                if (typeof target != "object" && typeof target != "function") {
                    target = {}
                }
                if (length == i) {
                    target = this;
                    --i
                }
                for (; i < length; i++) {
                    if ((options = arguments[i]) != null) {
                        for (var name in options) {
                            var src = target[name],
                            copy = options[name];
                            if (target === copy) {
                                continue
                            }
                            if (deep && copy && typeof copy == "object" && !copy.nodeType) {
                                target[name] = jQuery.extend(deep, src || (copy.length != null ? [] : {}), copy)
                            } else { if (copy !== undefined) {
                                    target[name] = copy
                                }
                            }
                        }
                    }
                }
                return target
            };
            var expando = "jQuery" + now(),
            uuid = 0,
            windowData = {},
            exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
            defaultView = document.defaultView || {};
            jQuery.extend({
                noConflict: function(deep) {
                    window.$ = _$;
                    if (deep) {
                        window.jQuery = _jQuery
                    }
                    return jQuery
                },
                isFunction: function(fn) {
                    return fn instanceof Function
                },
                isXMLDoc: function(elem) {
                    return elem.documentElement && !elem.body || elem.tagName && elem.ownerDocument && !elem.ownerDocument.body
                },
                globalEval: function(data) {
                    data = jQuery.trim(data);
                    if (data) {
                        var head = document.getElementsByTagName("head")[0] || document.documentElement,
                        script = document.createElement("script");
                        script.type = "text/javascript";
                        if (jQuery.browser.msie) {
                            script.text = data
                        } else {
                            script.appendChild(document.createTextNode(data))
                        }
                        head.insertBefore(script, head.firstChild);
                        head.removeChild(script)
                    }
                },
                nodeName: function(elem, name) {
                    return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase()
                },
                cache: {},
                data: function(elem, name, data) {
                    elem = elem == window ? windowData : elem;
                    var id = elem[expando];
                    if (!id) {
                        id = elem[expando] = ++uuid
                    }
                    if (name && !jQuery.cache[id]) {
                        jQuery.cache[id] = {}
                    }
                    if (data !== undefined) {
                        jQuery.cache[id][name] = data
                    }
                    return name ? jQuery.cache[id][name] : id
                },
                removeData: function(elem, name) {
                    elem = elem == window ? windowData : elem;
                    var id = elem[expando];
                    if (name) {
                        if (jQuery.cache[id]) {
                            delete jQuery.cache[id][name];
                            name = "";
                            for (name in jQuery.cache[id]) {
                                break
                            }
                            if (!name) {
                                jQuery.removeData(elem)
                            }
                        }
                    } else {
                        try {
                            delete elem[expando]
                        } catch(e) {
                            if (elem.removeAttribute) {
                                elem.removeAttribute(expando)
                            }
                        }
                        delete jQuery.cache[id]
                    }
                },
                each: function(object, callback, args) {
                    var name, i = 0,
                    length = object.length;
                    if (args) {
                        if (length == undefined) {
                            for (name in object) {
                                if (callback.apply(object[name], args) === false) {
                                    break
                                }
                            }
                        } else {
                            for (; i < length;) {
                                if (callback.apply(object[i++], args) === false) {
                                    break
                                }
                            }
                        }
                    } else { if (length == undefined) {
                            for (name in object) {
                                if (callback.call(object[name], name, object[name]) === false) {
                                    break
                                }
                            }
                        } else {
                            for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
                        }
                    }
                    return object
                },
                prop: function(elem, value, type, i, name) {
                    if (jQuery.isFunction(value)) {
                        value = value.call(elem, i)
                    }
                    return value && value.constructor == Number && type == "curCSS" && !exclude.test(name) ? value + "px" : value
                },
                className: {
                    add: function(elem, classNames) {
                        jQuery.each((classNames || "").split(/\s+/), function(i, className) {
                            if (elem.nodeType == 1 && !jQuery.className.has(elem.className, className)) {
                                elem.className += (elem.className ? " " : "") + className
                            }
                        })
                    },
                    remove: function(elem, classNames) {
                        if (elem.nodeType == 1) {
                            elem.className = classNames != undefined ? jQuery.grep(elem.className.split(/\s+/), function(className) {
                                return !jQuery.className.has(classNames, className)
                            }).join(" ") : ""
                        }
                    },
                    has: function(elem, className) {
                        return jQuery.inArray(className, (elem.className || elem).toString().split(/\s+/)) > -1
                    }
                },
                swap: function(elem, options, callback) {
                    var old = {};
                    for (var name in options) {
                        old[name] = elem.style[name];
                        elem.style[name] = options[name]
                    }
                    callback.call(elem);
                    for (var name in options) {
                        elem.style[name] = old[name]
                    }
                },
                css: function(elem, name, force) {
                    if (name == "width" || name == "height") {
                        var val, props = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        which = name == "width" ? ["Left", "Right"] : ["Top", "Bottom"];
                        function getWH() {
                            val = name == "width" ? elem.offsetWidth : elem.offsetHeight;
                            var padding = 0,
                            border = 0;
                            jQuery.each(which, function() {
                                padding += parseFloat(jQuery.curCSS(elem, "padding" + this, true)) || 0;
                                border += parseFloat(jQuery.curCSS(elem, "border" + this + "Width", true)) || 0
                            });
                            val -= Math.round(padding + border)
                        }
                        if (jQuery(elem).is(":visible")) {
                            getWH()
                        } else {
                            jQuery.swap(elem, props, getWH)
                        }
                        return Math.max(0, val)
                    }
                    return jQuery.curCSS(elem, name, force)
                },
                curCSS: function(elem, name, force) {
                    var ret, style = elem.style;
                    function color(elem) {
                        if (!jQuery.browser.safari) {
                            return false
                        }
                        var ret = defaultView.getComputedStyle(elem, null);
                        return !ret || ret.getPropertyValue("color") == ""
                    }
                    if (name == "opacity" && jQuery.browser.msie) {
                        ret = jQuery.attr(style, "opacity");
                        return ret == "" ? "1" : ret
                    }
                    if (jQuery.browser.opera && name == "display") {
                        var save = style.outline;
                        style.outline = "0 solid black";
                        style.outline = save
                    }
                    if (name.match(/float/i)) {
                        name = styleFloat
                    }
                    if (!force && style && style[name]) {
                        ret = style[name]
                    } else { if (defaultView.getComputedStyle) {
                            if (name.match(/float/i)) {
                                name = "float"
                            }
                            name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                            var computedStyle = defaultView.getComputedStyle(elem, null);
                            if (computedStyle && !color(elem)) {
                                ret = computedStyle.getPropertyValue(name)
                            } else {
                                var swap = [],
                                stack = [],
                                a = elem,
                                i = 0;
                                for (; a && color(a); a = a.parentNode) {
                                    stack.unshift(a)
                                }
                                for (; i < stack.length; i++) {
                                    if (color(stack[i])) {
                                        swap[i] = stack[i].style.display;
                                        stack[i].style.display = "block"
                                    }
                                }
                                ret = name == "display" && swap[stack.length - 1] != null ? "none" : (computedStyle && computedStyle.getPropertyValue(name)) || "";
                                for (i = 0; i < swap.length; i++) {
                                    if (swap[i] != null) {
                                        stack[i].style.display = swap[i]
                                    }
                                }
                            }
                            if (name == "opacity" && ret == "") {
                                ret = "1"
                            }
                        } else { if (elem.currentStyle) {
                                var camelCase = name.replace(/\-(\w)/g, function(all, letter) {
                                    return letter.toUpperCase()
                                });
                                ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
                                if (!/^\d+(px)?$/i.test(ret) && /^\d/.test(ret)) {
                                    var left = style.left,
                                    rsLeft = elem.runtimeStyle.left;
                                    elem.runtimeStyle.left = elem.currentStyle.left;
                                    style.left = ret || 0;
                                    ret = style.pixelLeft + "px";
                                    style.left = left;
                                    elem.runtimeStyle.left = rsLeft
                                }
                            }
                        }
                    }
                    return ret
                },
                clean: function(elems, context) {
                    var ret = [];
                    context = context || document;
                    if (typeof context.createElement == "undefined") {
                        context = context.ownerDocument || context[0] && context[0].ownerDocument || document
                    }
                    jQuery.each(elems, function(i, elem) {
                        if (typeof elem == "number") {
                            elem += ""
                        }
                        if (!elem) {
                            return
                        }
                        if (typeof elem == "string") {
                            elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag) {
                                return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? all : front + "></" + tag + ">"
                            });
                            var tags = jQuery.trim(elem).toLowerCase(),
                            div = context.createElement("div");
                            var wrap = !tags.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !tags.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || tags.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !tags.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!tags.indexOf("<td") || !tags.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !tags.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || jQuery.browser.msie && [1, "<div>", "</div>"] || [0, "", ""];
                            div.innerHTML = wrap[1] + elem + wrap[2];
                            while (wrap[0]--) {
                                div = div.lastChild
                            }
                            if (jQuery.browser.msie) {
                                var tbody = !tags.indexOf("<table") && tags.indexOf("<tbody") < 0 ? div.firstChild && div.firstChild.childNodes : wrap[1] == "<table>" && tags.indexOf("<tbody") < 0 ? div.childNodes : [];
                                for (var j = tbody.length - 1; j >= 0; --j) {
                                    if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                        tbody[j].parentNode.removeChild(tbody[j])
                                    }
                                }
                                if (/^\s/.test(elem)) {
                                    div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]), div.firstChild)
                                }
                            }
                            elem = jQuery.makeArray(div.childNodes)
                        }
                        if (elem.length === 0 && (!jQuery.nodeName(elem, "form") && !jQuery.nodeName(elem, "select"))) {
                            return
                        }
                        if (elem[0] == undefined || jQuery.nodeName(elem, "form") || elem.options) {
                            ret.push(elem)
                        } else {
                            ret = jQuery.merge(ret, elem)
                        }
                    });
                    return ret
                },
                attr: function(elem, name, value) {
                    if (!elem || elem.nodeType == 3 || elem.nodeType == 8) {
                        return undefined
                    }
                    var notxml = !jQuery.isXMLDoc(elem),
                    set = value !== undefined,
                    msie = jQuery.browser.msie;
                    name = notxml && jQuery.props[name] || name;
                    if (elem.tagName) {
                        var special = /href|src|style/.test(name);
                        if (name == "selected" && jQuery.browser.safari) {
                            elem.parentNode.selectedIndex
                        }
                        if (name in elem && notxml && !special) {
                            if (set) {
                                if (name == "type" && jQuery.nodeName(elem, "input") && elem.parentNode) {
                                    throw "type property can't be changed"
                                }
                                elem[name] = value
                            }
                            if (jQuery.nodeName(elem, "form") && elem.getAttributeNode(name)) {
                                return elem.getAttributeNode(name).nodeValue
                            }
                            return elem[name]
                        }
                        if (msie && notxml && name == "style") {
                            return jQuery.attr(elem.style, "cssText", value)
                        }
                        if (set) {
                            elem.setAttribute(name, "" + value)
                        }
                        var attr = msie && notxml && special ? elem.getAttribute(name, 2) : elem.getAttribute(name);
                        return attr === null ? undefined : attr
                    }
                    if (msie && name == "opacity") {
                        if (set) {
                            elem.zoom = 1;
                            elem.filter = (elem.filter || "").replace(/alpha\([^)]*\)/, "") + (parseInt(value) + "" == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")")
                        }
                        return elem.filter && elem.filter.indexOf("opacity=") >= 0 ? (parseFloat(elem.filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : ""
                    }
                    name = name.replace(/-([a-z])/ig, function(all, letter) {
                        return letter.toUpperCase()
                    });
                    if (set) {
                        elem[name] = value
                    }
                    return elem[name]
                },
                trim: function(text) {
                    return (text || "").replace(/^\s+|\s+$/g, "")
                },
                makeArray: function(array) {
                    var ret = [];
                    if (array != null) {
                        var i = array.length;
                        if (i == null || typeof array == "string" || array.setInterval) {
                            ret[0] = array
                        } else {
                            while (i) {
                                ret[--i] = array[i]
                            }
                        }
                    }
                    return ret
                },
                inArray: function(elem, array) {
                    for (var i = 0, length = array.length; i < length; i++) {
                        if (array[i] === elem) {
                            return i
                        }
                    }
                    return -1
                },
                merge: function(first, second) {
                    var i = 0,
                    elem, pos = first.length;
                    if (jQuery.browser.msie) {
                        while (elem = second[i++]) {
                            if (elem.nodeType != 8) {
                                first[pos++] = elem
                            }
                        }
                    } else {
                        while (elem = second[i++]) {
                            first[pos++] = elem
                        }
                    }
                    return first
                },
                unique: function(array) {
                    var ret = [],
                    done = {};
                    try {
                        for (var i = 0, length = array.length; i < length; i++) {
                            var id = jQuery.data(array[i]);
                            if (!done[id]) {
                                done[id] = true;
                                ret.push(array[i])
                            }
                        }
                    } catch(e) {
                        ret = array
                    }
                    return ret
                },
                grep: function(elems, callback, inv) {
                    var ret = [];
                    for (var i = 0, length = elems.length; i < length; i++) {
                        if (!inv != !callback(elems[i], i)) {
                            ret.push(elems[i])
                        }
                    }
                    return ret
                },
                map: function(elems, callback) {
                    var ret = [];
                    for (var i = 0, length = elems.length; i < length; i++) {
                        var value = callback(elems[i], i);
                        if (value != null) {
                            ret[ret.length] = value
                        }
                    }
                    return ret.concat.apply([], ret)
                }
            });
            var userAgent = navigator.userAgent.toLowerCase();
            jQuery.browser = {
                version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
                safari: /webkit/.test(userAgent),
                opera: /opera/.test(userAgent),
                msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
                mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
            };
            var styleFloat = jQuery.browser.msie ? "styleFloat" : "cssFloat";
            jQuery.extend({
                boxModel: !jQuery.browser.msie || document.compatMode == "CSS1Compat",
                props: {
                    "for": "htmlFor",
                    "class": "className",
                    "float": styleFloat,
                    cssFloat: styleFloat,
                    styleFloat: styleFloat,
                    readonly: "readOnly",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    rowspan: "rowSpan"
                }
            });
            jQuery.each({
                parent: function(elem) {
                    return elem.parentNode
                },
                parents: function(elem) {
                    return jQuery.dir(elem, "parentNode")
                },
                next: function(elem) {
                    return jQuery.nth(elem, 2, "nextSibling")
                },
                prev: function(elem) {
                    return jQuery.nth(elem, 2, "previousSibling")
                },
                nextAll: function(elem) {
                    return jQuery.dir(elem, "nextSibling")
                },
                prevAll: function(elem) {
                    return jQuery.dir(elem, "previousSibling")
                },
                siblings: function(elem) {
                    return jQuery.sibling(elem.parentNode.firstChild, elem)
                },
                children: function(elem) {
                    return jQuery.sibling(elem.firstChild)
                },
                contents: function(elem) {
                    return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes)
                }
            },
            function(name, fn) {
                jQuery.fn[name] = function(selector) {
                    var ret = jQuery.map(this, fn);
                    if (selector && typeof selector == "string") {
                        ret = jQuery.multiFilter(selector, ret)
                    }
                    return this.pushStack(jQuery.unique(ret))
                }
            });
            jQuery.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            },
            function(name, original) {
                jQuery.fn[name] = function() {
                    var args = arguments;
                    return this.each(function() {
                        for (var i = 0, length = args.length; i < length; i++) {
                            jQuery(args[i])[original](this)
                        }
                    })
                }
            });
            jQuery.each({
                removeAttr: function(name) {
                    jQuery.attr(this, name, "");
                    if (this.nodeType == 1) {
                        this.removeAttribute(name)
                    }
                },
                addClass: function(classNames) {
                    jQuery.className.add(this, classNames)
                },
                removeClass: function(classNames) {
                    jQuery.className.remove(this, classNames)
                },
                toggleClass: function(classNames) {
                    jQuery.className[jQuery.className.has(this, classNames) ? "remove" : "add"](this, classNames)
                },
                remove: function(selector) {
                    if (!selector || jQuery.filter(selector, [this]).r.length) {
                        jQuery("*", this).add([this]).each(function() {
                            jQuery.event.remove(this);
                            jQuery.removeData(this)
                        });
                        if (this.parentNode) {
                            this.parentNode.removeChild(this)
                        }
                    }
                },
                empty: function() {
                    jQuery(">*", this).remove();
                    while (this.firstChild) {
                        this.removeChild(this.firstChild)
                    }
                }
            },
            function(name, fn) {
                jQuery.fn[name] = function() {
                    return this.each(fn, arguments)
                }
            });
            jQuery.each(["Height", "Width"], function(i, name) {
                var type = name.toLowerCase();
                jQuery.fn[type] = function(size) {
                    return this[0] == window ? jQuery.browser.opera && document.body["client" + name] || jQuery.browser.safari && window["inner" + name] || document.compatMode == "CSS1Compat" && document.documentElement["client" + name] || document.body["client" + name] : this[0] == document ? Math.max(Math.max(document.body["scroll" + name], document.documentElement["scroll" + name]), Math.max(document.body["offset" + name], document.documentElement["offset" + name])) : size == undefined ? (this.length ? jQuery.css(this[0], type) : null) : this.css(type, size.constructor == String ? size : size + "px")
                }
            });
            function num(elem, prop) {
                return elem[0] && parseInt(jQuery.curCSS(elem[0], prop, true), 10) || 0
            }
            var chars = jQuery.browser.safari && parseInt(jQuery.browser.version) < 417 ? "(?:[\\w*_-]|\\\\.)" : "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
            quickChild = new RegExp("^>\\s*(" + chars + "+)"),
            quickID = new RegExp("^(" + chars + "+)(#)(" + chars + "+)"),
            quickClass = new RegExp("^([#.]?)(" + chars + "*)");
            jQuery.extend({
                expr: {
                    "": function(a, i, m) {
                        return m[2] == "*" || jQuery.nodeName(a, m[2])
                    },
                    "#": function(a, i, m) {
                        return a.getAttribute("id") == m[2]
                    },
                    ":": {
                        lt: function(a, i, m) {
                            return i < m[3] - 0
                        },
                        gt: function(a, i, m) {
                            return i > m[3] - 0
                        },
                        nth: function(a, i, m) {
                            return m[3] - 0 == i
                        },
                        eq: function(a, i, m) {
                            return m[3] - 0 == i
                        },
                        first: function(a, i) {
                            return i == 0
                        },
                        last: function(a, i, m, r) {
                            return i == r.length - 1
                        },
                        even: function(a, i) {
                            return i % 2 == 0
                        },
                        odd: function(a, i) {
                            return i % 2
                        },
                        "first-child": function(a) {
                            return a.parentNode.getElementsByTagName("*")[0] == a
                        },
                        "last-child": function(a) {
                            return jQuery.nth(a.parentNode.lastChild, 1, "previousSibling") == a
                        },
                        "only-child": function(a) {
                            return !jQuery.nth(a.parentNode.lastChild, 2, "previousSibling")
                        },
                        parent: function(a) {
                            return a.firstChild
                        },
                        empty: function(a) {
                            return !a.firstChild
                        },
                        contains: function(a, i, m) {
                            return (a.textContent || a.innerText || jQuery(a).text() || "").indexOf(m[3]) >= 0
                        },
                        visible: function(a) {
                            return "hidden" != a.type && jQuery.css(a, "display") != "none" && jQuery.css(a, "visibility") != "hidden"
                        },
                        hidden: function(a) {
                            return "hidden" == a.type || jQuery.css(a, "display") == "none" || jQuery.css(a, "visibility") == "hidden"
                        },
                        enabled: function(a) {
                            return !a.disabled
                        },
                        disabled: function(a) {
                            return a.disabled
                        },
                        checked: function(a) {
                            return a.checked
                        },
                        selected: function(a) {
                            return a.selected || jQuery.attr(a, "selected")
                        },
                        text: function(a) {
                            return "text" == a.type
                        },
                        radio: function(a) {
                            return "radio" == a.type
                        },
                        checkbox: function(a) {
                            return "checkbox" == a.type
                        },
                        file: function(a) {
                            return "file" == a.type
                        },
                        password: function(a) {
                            return "password" == a.type
                        },
                        submit: function(a) {
                            return "submit" == a.type
                        },
                        image: function(a) {
                            return "image" == a.type
                        },
                        reset: function(a) {
                            return "reset" == a.type
                        },
                        button: function(a) {
                            return "button" == a.type || jQuery.nodeName(a, "button")
                        },
                        input: function(a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        has: function(a, i, m) {
                            return jQuery.find(m[3], a).length
                        },
                        header: function(a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        animated: function(a) {
                            return jQuery.grep(jQuery.timers, function(fn) {
                                return a == fn.elem
                            }).length
                        }
                    }
                },
                parse: [/^(\[) *@?([\w:-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/, /^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/, new RegExp("^([:.#]*)(" + chars + "+)")],
                multiFilter: function(expr, elems, not) {
                    var old, cur = [];
                    while (expr && expr != old) {
                        old = expr;
                        var f = jQuery.filter(expr, elems, not);
                        expr = f.t.replace(/^\s*,\s*/, "");
                        cur = not ? elems = f.r : jQuery.merge(cur, f.r)
                    }
                    return cur
                },
                find: function(t, context) {
                    if (typeof t != "string") {
                        return[t]
                    }
                    if (context && context.nodeType != 1 && context.nodeType != 9) {
                        return[]
                    }
                    context = context || document;
                    var ret = [context],
                    done = [],
                    last,
                    nodeName;
                    while (t && last != t) {
                        var r = [];
                        last = t;
                        t = jQuery.trim(t);
                        var foundToken = false,
                        re = quickChild,
                        m = re.exec(t);
                        if (m) {
                            nodeName = m[1].toUpperCase();
                            for (var i = 0; ret[i]; i++) {
                                for (var c = ret[i].firstChild; c; c = c.nextSibling) {
                                    if (c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName)) {
                                        r.push(c)
                                    }
                                }
                            }
                            ret = r;
                            t = t.replace(re, "");
                            if (t.indexOf(" ") == 0) {
                                continue
                            }
                            foundToken = true
                        } else {
                            re = /^([>+~])\s*(\w*)/i;
                            if ((m = re.exec(t)) != null) {
                                r = [];
                                var merge = {};
                                nodeName = m[2].toUpperCase();
                                m = m[1];
                                for (var j = 0, rl = ret.length; j < rl; j++) {
                                    var n = m == "~" || m == "+" ? ret[j].nextSibling : ret[j].firstChild;
                                    for (; n; n = n.nextSibling) {
                                        if (n.nodeType == 1) {
                                            var id = jQuery.data(n);
                                            if (m == "~" && merge[id]) {
                                                break
                                            }
                                            if (!nodeName || n.nodeName.toUpperCase() == nodeName) {
                                                if (m == "~") {
                                                    merge[id] = true
                                                }
                                                r.push(n)
                                            }
                                            if (m == "+") {
                                                break
                                            }
                                        }
                                    }
                                }
                                ret = r;
                                t = jQuery.trim(t.replace(re, ""));
                                foundToken = true
                            }
                        }
                        if (t && !foundToken) {
                            if (!t.indexOf(",")) {
                                if (context == ret[0]) {
                                    ret.shift()
                                }
                                done = jQuery.merge(done, ret);
                                r = ret = [context];
                                t = " " + t.substr(1, t.length)
                            } else {
                                var re2 = quickID;
                                var m = re2.exec(t);
                                if (m) {
                                    m = [0, m[2], m[3], m[1]]
                                } else {
                                    re2 = quickClass;
                                    m = re2.exec(t)
                                }
                                m[2] = m[2].replace(/\\/g, "");
                                var elem = ret[ret.length - 1];
                                if (m[1] == "#" && elem && elem.getElementById && !jQuery.isXMLDoc(elem)) {
                                    var oid = elem.getElementById(m[2]);
                                    if ((jQuery.browser.msie || jQuery.browser.opera) && oid && typeof oid.id == "string" && oid.id != m[2]) {
                                        oid = jQuery('[@id="' + m[2] + '"]', elem)[0]
                                    }
                                    ret = r = oid && (!m[3] || jQuery.nodeName(oid, m[3])) ? [oid] : []
                                } else {
                                    for (var i = 0; ret[i]; i++) {
                                        var tag = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];
                                        if (tag == "*" && ret[i].nodeName.toLowerCase() == "object") {
                                            tag = "param"
                                        }
                                        r = jQuery.merge(r, ret[i].getElementsByTagName(tag))
                                    }
                                    if (m[1] == ".") {
                                        r = jQuery.classFilter(r, m[2])
                                    }
                                    if (m[1] == "#") {
                                        var tmp = [];
                                        for (var i = 0; r[i]; i++) {
                                            if (r[i].getAttribute("id") == m[2]) {
                                                tmp = [r[i]];
                                                break
                                            }
                                        }
                                        r = tmp
                                    }
                                    ret = r
                                }
                                t = t.replace(re2, "")
                            }
                        }
                        if (t) {
                            var val = jQuery.filter(t, r);
                            ret = r = val.r;
                            t = jQuery.trim(val.t)
                        }
                    }
                    if (t) {
                        ret = []
                    }
                    if (ret && context == ret[0]) {
                        ret.shift()
                    }
                    done = jQuery.merge(done, ret);
                    return done
                },
                classFilter: function(r, m, not) {
                    m = " " + m + " ";
                    var tmp = [];
                    for (var i = 0; r[i]; i++) {
                        var pass = (" " + r[i].className + " ").indexOf(m) >= 0;
                        if (!not && pass || not && !pass) {
                            tmp.push(r[i])
                        }
                    }
                    return tmp
                },
                filter: function(t, r, not) {
                    var last;
                    while (t && t != last) {
                        last = t;
                        var p = jQuery.parse,
                        m;
                        for (var i = 0; p[i]; i++) {
                            m = p[i].exec(t);
                            if (m) {
                                t = t.substring(m[0].length);
                                m[2] = m[2].replace(/\\/g, "");
                                break
                            }
                        }
                        if (!m) {
                            break
                        }
                        if (m[1] == ":" && m[2] == "not") {
                            r = isSimple.test(m[3]) ? jQuery.filter(m[3], r, true).r : jQuery(r).not(m[3])
                        } else { if (m[1] == ".") {
                                r = jQuery.classFilter(r, m[2], not)
                            } else { if (m[1] == "[") {
                                    var tmp = [],
                                    type = m[3];
                                    for (var i = 0, rl = r.length; i < rl; i++) {
                                        var a = r[i],
                                        z = a[jQuery.props[m[2]] || m[2]];
                                        if (z == null || /style|href|src|selected/.test(m[2])) {
                                            z = jQuery.attr(a, m[2]) || ""
                                        }
                                        if ((type == "" && !!z || type == "=" && z == m[5] || type == "!=" && z != m[5] || type == "^=" && z && !z.indexOf(m[5]) || type == "$=" && z.substr(z.length - m[5].length) == m[5] || (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ not) {
                                            tmp.push(a)
                                        }
                                    }
                                    r = tmp
                                } else { if (m[1] == ":" && m[2] == "nth-child") {
                                        var merge = {},
                                        tmp = [],
                                        test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" || !/\D/.test(m[3]) && "0n+" + m[3] || m[3]),
                                        first = (test[1] + (test[2] || 1)) - 0,
                                        last = test[3] - 0;
                                        for (var i = 0, rl = r.length; i < rl; i++) {
                                            var node = r[i],
                                            parentNode = node.parentNode,
                                            id = jQuery.data(parentNode);
                                            if (!merge[id]) {
                                                var c = 1;
                                                for (var n = parentNode.firstChild; n; n = n.nextSibling) {
                                                    if (n.nodeType == 1) {
                                                        n.nodeIndex = c++
                                                    }
                                                }
                                                merge[id] = true
                                            }
                                            var add = false;
                                            if (first == 0) {
                                                if (node.nodeIndex == last) {
                                                    add = true
                                                }
                                            } else { if ((node.nodeIndex - last) % first == 0 && (node.nodeIndex - last) / first >= 0) {
                                                    add = true
                                                }
                                            }
                                            if (add ^ not) {
                                                tmp.push(node)
                                            }
                                        }
                                        r = tmp
                                    } else {
                                        var fn = jQuery.expr[m[1]];
                                        if (typeof fn == "object") {
                                            fn = fn[m[2]]
                                        }
                                        if (typeof fn == "string") {
                                            fn = eval("false||function(a,i){return " + fn + ";}")
                                        }
                                        r = jQuery.grep(r, function(elem, i) {
                                            return fn(elem, i, m, r)
                                        },
                                        not)
                                    }
                                }
                            }
                        }
                    }
                    return {
                        r: r,
                        t: t
                    }
                },
                dir: function(elem, dir) {
                    var matched = [],
                    cur = elem[dir];
                    while (cur && cur != document) {
                        if (cur.nodeType == 1) {
                            matched.push(cur)
                        }
                        cur = cur[dir]
                    }
                    return matched
                },
                nth: function(cur, result, dir, elem) {
                    result = result || 1;
                    var num = 0;
                    for (; cur; cur = cur[dir]) {
                        if (cur.nodeType == 1 && ++num == result) {
                            break
                        }
                    }
                    return cur
                },
                sibling: function(n, elem) {
                    var r = [];
                    for (; n; n = n.nextSibling) {
                        if (n.nodeType == 1 && n != elem) {
                            r.push(n)
                        }
                    }
                    return r
                }
            });
            jQuery.event = {
                add: function(elem, types, handler, data) {
                    if (elem.nodeType == 3 || elem.nodeType == 8) {
                        return
                    }
                    if (jQuery.browser.msie && elem.setInterval) {
                        elem = window
                    }
                    if (!handler.guid) {
                        handler.guid = this.guid++
                    }
                    if (data != undefined) {
                        var fn = handler;
                        handler = this.proxy(fn, function() {
                            return fn.apply(this, arguments)
                        });
                        handler.data = data
                    }
                    var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
                    handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function() {
                        if (typeof jQuery != "undefined" && !jQuery.event.triggered) {
                            return jQuery.event.handle.apply(arguments.callee.elem, arguments)
                        }
                    });
                    handle.elem = elem;
                    jQuery.each(types.split(/\s+/), function(index, type) {
                        var parts = type.split(".");
                        type = parts[0];
                        handler.type = parts[1];
                        var handlers = events[type];
                        if (!handlers) {
                            handlers = events[type] = {};
                            if (!jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data) === false) {
                                if (elem.addEventListener) {
                                    elem.addEventListener(type, handle, false)
                                } else { if (elem.attachEvent) {
                                        elem.attachEvent("on" + type, handle)
                                    }
                                }
                            }
                        }
                        handlers[handler.guid] = handler;
                        jQuery.event.global[type] = true
                    });
                    elem = null
                },
                guid: 1,
                global: {},
                remove: function(elem, types, handler) {
                    if (elem.nodeType == 3 || elem.nodeType == 8) {
                        return
                    }
                    var events = jQuery.data(elem, "events"),
                    ret,
                    index;
                    if (events) {
                        if (types == undefined || (typeof types == "string" && types.charAt(0) == ".")) {
                            for (var type in events) {
                                this.remove(elem, type + (types || ""))
                            }
                        } else { if (types.type) {
                                handler = types.handler;
                                types = types.type
                            }
                            jQuery.each(types.split(/\s+/), function(index, type) {
                                var parts = type.split(".");
                                type = parts[0];
                                if (events[type]) {
                                    if (handler) {
                                        delete events[type][handler.guid]
                                    } else {
                                        for (handler in events[type]) {
                                            if (!parts[1] || events[type][handler].type == parts[1]) {
                                                delete events[type][handler]
                                            }
                                        }
                                    }
                                    for (ret in events[type]) {
                                        break
                                    }
                                    if (!ret) {
                                        if (!jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem) === false) {
                                            if (elem.removeEventListener) {
                                                elem.removeEventListener(type, jQuery.data(elem, "handle"), false)
                                            } else { if (elem.detachEvent) {
                                                    elem.detachEvent("on" + type, jQuery.data(elem, "handle"))
                                                }
                                            }
                                        }
                                        ret = null;
                                        delete events[type]
                                    }
                                }
                            })
                        }
                        for (ret in events) {
                            break
                        }
                        if (!ret) {
                            var handle = jQuery.data(elem, "handle");
                            if (handle) {
                                handle.elem = null
                            }
                            jQuery.removeData(elem, "events");
                            jQuery.removeData(elem, "handle")
                        }
                    }
                },
                trigger: function(type, data, elem, donative, extra) {
                    data = jQuery.makeArray(data);
                    if (type.indexOf("!") >= 0) {
                        type = type.slice(0, -1);
                        var exclusive = true
                    }
                    if (!elem) {
                        if (this.global[type]) {
                            jQuery.each(jQuery.cache, function() {
                                if (this.events && this.events[type]) {
                                    jQuery.event.trigger(type, data, this.handle.elem)
                                }
                            })
                        }
                    } else { if (elem.nodeType == 3 || elem.nodeType == 8) {
                            return undefined
                        }
                        var val, ret, fn = jQuery.isFunction(elem[type] || null),
                        event = !data[0] || !data[0].preventDefault;
                        if (event) {
                            data.unshift({
                                type: type,
                                target: elem,
                                preventDefault: function() {},
                                stopPropagation: function() {},
                                timeStamp: now()
                            });
                            data[0][expando] = true
                        }
                        data[0].type = type;
                        if (exclusive) {
                            data[0].exclusive = true
                        }
                        var handle = jQuery.data(elem, "handle");
                        if (handle) {
                            val = handle.apply(elem, data)
                        }
                        if ((!fn || (jQuery.nodeName(elem, "a") && type == "click")) && elem["on" + type] && elem["on" + type].apply(elem, data) === false) {
                            val = false
                        }
                        if (event) {
                            data.shift()
                        }
                        if (extra && jQuery.isFunction(extra)) {
                            ret = extra.apply(elem, val == null ? data : data.concat(val));
                            if (ret !== undefined) {
                                val = ret
                            }
                        }
                        if (fn && donative !== false && val !== false && !(jQuery.nodeName(elem, "a") && type == "click")) {
                            this.triggered = true;
                            try {
                                elem[type]()
                            } catch(e) {}
                        }
                        this.triggered = false
                    }
                    return val
                },
                handle: function(event) {
                    var val, ret, namespace, all, handlers;
                    event = arguments[0] = jQuery.event.fix(event || window.event);
                    namespace = event.type.split(".");
                    event.type = namespace[0];
                    namespace = namespace[1];
                    all = !namespace && !event.exclusive;
                    handlers = (jQuery.data(this, "events") || {})[event.type];
                    for (var j in handlers) {
                        var handler = handlers[j];
                        if (all || handler.type == namespace) {
                            event.handler = handler;
                            event.data = handler.data;
                            ret = handler.apply(this, arguments);
                            if (val !== false) {
                                val = ret
                            }
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                    return val
                },
                props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" "),
                fix: function(event) {
                    if (event[expando] == true) {
                        return event
                    }
                    var originalEvent = event;
                    event = {
                        originalEvent: originalEvent
                    };
                    for (var i = this.props.length, prop; i;) {
                        prop = this.props[--i];
                        event[prop] = originalEvent[prop]
                    }
                    event[expando] = true;
                    event.preventDefault = function() {
                        if (originalEvent.preventDefault) {
                            originalEvent.preventDefault()
                        }
                        originalEvent.returnValue = false
                    };
                    event.stopPropagation = function() {
                        if (originalEvent.stopPropagation) {
                            originalEvent.stopPropagation()
                        }
                        originalEvent.cancelBubble = true
                    };
                    event.timeStamp = event.timeStamp || now();
                    if (!event.target) {
                        event.target = event.srcElement || document
                    }
                    if (event.target.nodeType == 3) {
                        event.target = event.target.parentNode
                    }
                    if (!event.relatedTarget && event.fromElement) {
                        event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement
                    }
                    if (event.pageX == null && event.clientX != null) {
                        var doc = document.documentElement,
                        body = document.body;
                        event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
                        event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0)
                    }
                    if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
                        event.which = event.charCode || event.keyCode
                    }
                    if (!event.metaKey && event.ctrlKey) {
                        event.metaKey = event.ctrlKey
                    }
                    if (!event.which && event.button) {
                        event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)))
                    }
                    return event
                },
                proxy: function(fn, proxy) {
                    proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
                    return proxy
                },
                special: {
                    ready: {
                        setup: bindReady,
                        teardown: function() {}
                    }
                }
            };
            if (!jQuery.browser.msie) {
                var withinElement = function(event) {
                    var parent = event.relatedTarget;
                    while (parent && parent != this) {
                        try {
                            parent = parent.parentNode
                        } catch(e) {
                            parent = this
                        }
                    }
                    if (parent != this) {
                        event.type = event.data;
                        jQuery.event.handle.apply(this, arguments)
                    }
                };
                jQuery.each({
                    mouseover: "mouseenter",
                    mouseout: "mouseleave"
                },
                function(orig, fix) {
                    jQuery.event.special[fix] = {
                        setup: function() {
                            jQuery.event.add(this, orig, withinElement, fix)
                        },
                        teardown: function() {
                            jQuery.event.remove(this, orig, withinElement)
                        }
                    }
                })
            }
            jQuery.fn.extend({
                bind: function(type, data, fn) {
                    return type == "unload" ? this.one(type, data, fn) : this.each(function() {
                        jQuery.event.add(this, type, fn || data, fn && data)
                    })
                },
                one: function(type, data, fn) {
                    var one = jQuery.event.proxy(fn || data, function(event) {
                        jQuery(this).unbind(event, one);
                        return (fn || data).apply(this, arguments)
                    });
                    return this.each(function() {
                        jQuery.event.add(this, type, one, fn && data)
                    })
                },
                unbind: function(type, fn) {
                    return this.each(function() {
                        jQuery.event.remove(this, type, fn)
                    })
                },
                trigger: function(type, data, fn) {
                    return this.each(function() {
                        jQuery.event.trigger(type, data, this, true, fn)
                    })
                },
                triggerHandler: function(type, data, fn) {
                    return this[0] && jQuery.event.trigger(type, data, this[0], false, fn)
                },
                toggle: function(fn) {
                    var args = arguments,
                    i = 1;
                    while (i < args.length) {
                        jQuery.event.proxy(fn, args[i++])
                    }
                    return this.click(jQuery.event.proxy(fn, function(event) {
                        this.lastToggle = (this.lastToggle || 0) % i;
                        event.preventDefault();
                        return args[this.lastToggle++].apply(this, arguments) || false
                    }))
                },
                hover: function(fnOver, fnOut) {
                    return this.bind("mouseenter", fnOver).bind("mouseleave", fnOut)
                },
                ready: function(fn) {
                    bindReady();
                    if (jQuery.isReady) {
                        fn.call(document, jQuery)
                    } else {
                        jQuery.readyList.push(function() {
                            return fn.call(this, jQuery)
                        })
                    }
                    return this
                }
            });
            jQuery.extend({
                isReady: false,
                readyList: [],
                ready: function() {
                    if (!jQuery.isReady) {
                        jQuery.isReady = true;
                        if (jQuery.readyList) {
                            jQuery.each(jQuery.readyList, function() {
                                this.call(document)
                            });
                            jQuery.readyList = null
                        }
                        jQuery(document).triggerHandler("ready")
                    }
                }
            });
            var readyBound = false;
            function bindReady() {
                if (readyBound) {
                    return
                }
                readyBound = true;
                if (document.addEventListener && !jQuery.browser.opera) {
                    document.addEventListener("DOMContentLoaded", jQuery.ready, false)
                }
                if (jQuery.browser.msie && window == top) {
                    (function() {
                        if (jQuery.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll("left")
                        } catch(error) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        jQuery.ready()
                    })()
                }
                if (jQuery.browser.opera) {
                    document.addEventListener("DOMContentLoaded", function() {
                        if (jQuery.isReady) {
                            return
                        }
                        for (var i = 0; i < document.styleSheets.length; i++) {
                            if (document.styleSheets[i].disabled) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                        }
                        jQuery.ready()
                    },
                    false)
                }
                if (jQuery.browser.safari) {
                    var numStyles;
                    (function() {
                        if (jQuery.isReady) {
                            return
                        }
                        if (document.readyState != "loaded" && document.readyState != "complete") {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        if (numStyles === undefined) {
                            numStyles = jQuery("style, link[rel=stylesheet]").length
                        }
                        if (document.styleSheets.length != numStyles) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        jQuery.ready()
                    })()
                }
                jQuery.event.add(window, "load", jQuery.ready)
            }
            jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name) {
                jQuery.fn[name] = function(fn) {
                    return fn ? this.bind(name, fn) : this.trigger(name)
                }
            });
            jQuery(window).bind("unload", function() {
                for (var id in jQuery.cache) {
                    if (id != 1 && jQuery.cache[id].handle) {
                        jQuery.event.remove(jQuery.cache[id].handle.elem)
                    }
                }
            });
            jQuery.fn.extend({
                _load: jQuery.fn.load,
                load: function(url, params, callback) {
                    if (typeof url != "string") {
                        return this._load(url)
                    }
                    var off = url.indexOf(" ");
                    if (off >= 0) {
                        var selector = url.slice(off, url.length);
                        url = url.slice(0, off)
                    }
                    var type = "GET";
                    if (params) {
                        if (jQuery.isFunction(params)) {
                            callback = params;
                            params = null
                        } else { if (typeof params == "object") {
                                params = jQuery.param(params);
                                type = "POST"
                            }
                        }
                    }
                    var self = this;
                    jQuery.ajax({
                        url: url,
                        type: type,
                        dataType: "html",
                        data: params,
                        complete: function(res, status) {
                            if (status == "success" || status == "notmodified") {
                                self.html(selector ? jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(selector) : res.responseText)
                            }
                            if (callback) {
                                self.each(callback, [res.responseText, status, res])
                            }
                        }
                    });
                    return this
                },
                serialize: function() {
                    return jQuery.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        return this.elements ? jQuery.makeArray(this.elements) : this
                    }).filter(function() {
                        return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))
                    }).map(function(i, elem) {
                        var val = jQuery(this).val();
                        return val == null ? null : val.constructor == Array ? jQuery.map(val, function(val, i) {
                            return {
                                name: elem.name,
                                value: val
                            }
                        }) : {
                            name: elem.name,
                            value: val
                        }
                    }).get()
                }
            });
            jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i, o) {
                jQuery.fn[o] = function(f) {
                    return this.bind(o, f)
                }
            });
            var jsc = now();
            jQuery.extend({
                get: function(url, data, callback, type) {
                    if (jQuery.isFunction(data)) {
                        callback = data;
                        data = null
                    }
                    return jQuery.ajax({
                        type: "GET",
                        url: url,
                        data: data,
                        success: callback,
                        dataType: type
                    })
                },
                getScript: function(url, callback) {
                    return jQuery.get(url, null, callback, "script")
                },
                getJSON: function(url, data, callback) {
                    return jQuery.get(url, data, callback, "json")
                },
                post: function(url, data, callback, type) {
                    if (jQuery.isFunction(data)) {
                        callback = data;
                        data = {}
                    }
                    return jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        success: callback,
                        dataType: type
                    })
                },
                ajaxSetup: function(settings) {
                    jQuery.extend(jQuery.ajaxSettings, settings)
                },
                ajaxSettings: {
                    url: location.href,
                    global: true,
                    type: "GET",
                    timeout: 0,
                    contentType: "application/x-www-form-urlencoded",
                    processData: true,
                    async: true,
                    data: null,
                    username: null,
                    password: null,
                    xhr: function() {
                        return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
                    },
                    accepts: {
                        xml: "application/xml, text/xml",
                        html: "text/html",
                        script: "text/javascript, application/javascript",
                        json: "application/json, text/javascript",
                        text: "text/plain",
                        _default: "*/*"
                    }
                },
                lastModified: {},
                ajax: function(s) {
                    s = jQuery.extend(true, s, jQuery.extend(true, {},
                    jQuery.ajaxSettings, s));
                    var jsonp, jsre = /=\?(&|$)/g,
                    status, data, type = s.type.toUpperCase();
                    if (s.data && s.processData && typeof s.data != "string") {
                        s.data = jQuery.param(s.data)
                    }
                    if (s.dataType == "jsonp") {
                        if (type == "GET") {
                            if (!s.url.match(jsre)) {
                                s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?"
                            }
                        } else { if (!s.data || !s.data.match(jsre)) {
                                s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?"
                            }
                        }
                        s.dataType = "json"
                    }
                    if (s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre))) {
                        jsonp = "jsonp" + jsc++;
                        if (s.data) {
                            s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1")
                        }
                        s.url = s.url.replace(jsre, "=" + jsonp + "$1");
                        s.dataType = "script";
                        window[jsonp] = function(tmp) {
                            data = tmp;
                            success();
                            complete();
                            window[jsonp] = undefined;
                            try {
                                delete window[jsonp]
                            } catch(e) {}
                            if (head) {
                                head.removeChild(script)
                            }
                        }
                    }
                    if (s.dataType == "script" && s.cache == null) {
                        s.cache = false
                    }
                    if (s.cache === false && type == "GET") {
                        var ts = now();
                        var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
                        s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "")
                    }
                    if (s.data && type == "GET") {
                        s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;
                        s.data = null
                    }
                    if (s.global && !jQuery.active++) {
                        jQuery.event.trigger("ajaxStart")
                    }
                    var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec(s.url);
                    if (s.dataType == "script" && type == "GET" && parts && (parts[1] && parts[1] != location.protocol || parts[2] != location.host)) {
                        var head = document.getElementsByTagName("head")[0];
                        var script = document.createElement("script");
                        script.src = s.url;
                        if (s.scriptCharset) {
                            script.charset = s.scriptCharset
                        }
                        if (!jsonp) {
                            var done = false;
                            script.onload = script.onreadystatechange = function() {
                                if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                                    done = true;
                                    success();
                                    complete();
                                    head.removeChild(script)
                                }
                            }
                        }
                        head.appendChild(script);
                        return undefined
                    }
                    var requestDone = false;
                    var xhr = s.xhr();
                    if (s.username) {
                        xhr.open(type, s.url, s.async, s.username, s.password)
                    } else {
                        xhr.open(type, s.url, s.async)
                    }
                    try {
                        if (s.data) {
                            xhr.setRequestHeader("Content-Type", s.contentType)
                        }
                        if (s.ifModified) {
                            xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT")
                        }
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*" : s.accepts._default)
                    } catch(e) {}
                    if (s.beforeSend && s.beforeSend(xhr, s) === false) {
                        s.global && jQuery.active--;
                        xhr.abort();
                        return false
                    }
                    if (s.global) {
                        jQuery.event.trigger("ajaxSend", [xhr, s])
                    }
                    var onreadystatechange = function(isTimeout) {
                        if (!requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout")) {
                            requestDone = true;
                            if (ival) {
                                clearInterval(ival);
                                ival = null
                            }
                            status = isTimeout == "timeout" ? "timeout" : !jQuery.httpSuccess(xhr) ? "error" : s.ifModified && jQuery.httpNotModified(xhr, s.url) ? "notmodified" : "success";
                            if (status == "success") {
                                try {
                                    data = jQuery.httpData(xhr, s.dataType, s)
                                } catch(e) {
                                    status = "parsererror"
                                }
                            }
                            if (status == "success") {
                                var modRes;
                                try {
                                    modRes = xhr.getResponseHeader("Last-Modified")
                                } catch(e) {}
                                if (s.ifModified && modRes) {
                                    jQuery.lastModified[s.url] = modRes
                                }
                                if (!jsonp) {
                                    success()
                                }
                            } else {
                                jQuery.handleError(s, xhr, status)
                            }
                            complete();
                            if (s.async) {
                                xhr = null
                            }
                        }
                    };
                    if (s.async) {
                        var ival = setInterval(onreadystatechange, 13);
                        if (s.timeout > 0) {
                            setTimeout(function() {
                                if (xhr) {
                                    xhr.abort();
                                    if (!requestDone) {
                                        onreadystatechange("timeout")
                                    }
                                }
                            },
                            s.timeout)
                        }
                    }
                    try {
                        xhr.send(s.data)
                    } catch(e) {
                        jQuery.handleError(s, xhr, null, e)
                    }
                    if (!s.async) {
                        onreadystatechange()
                    }
                    function success() {
                        if (s.success) {
                            s.success(data, status)
                        }
                        if (s.global) {
                            jQuery.event.trigger("ajaxSuccess", [xhr, s])
                        }
                    }
                    function complete() {
                        if (s.complete) {
                            s.complete(xhr, status)
                        }
                        if (s.global) {
                            jQuery.event.trigger("ajaxComplete", [xhr, s])
                        }
                        if (s.global && !--jQuery.active) {
                            jQuery.event.trigger("ajaxStop")
                        }
                    }
                    return xhr
                },
                handleError: function(s, xhr, status, e) {
                    if (s.error) {
                        s.error(xhr, status, e)
                    }
                    if (s.global) {
                        jQuery.event.trigger("ajaxError", [xhr, s, e])
                    }
                },
                active: 0,
                httpSuccess: function(xhr) {
                    try {
                        return !xhr.status && location.protocol == "file:" || (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || xhr.status == 1223 || jQuery.browser.safari && xhr.status == undefined
                    } catch(e) {}
                    return false
                },
                httpNotModified: function(xhr, url) {
                    try {
                        var xhrRes = xhr.getResponseHeader("Last-Modified");
                        return xhr.status == 304 || xhrRes == jQuery.lastModified[url] || jQuery.browser.safari && xhr.status == undefined
                    } catch(e) {}
                    return false
                },
                httpData: function(xhr, type, s) {
                    var ct = xhr.getResponseHeader("content-type"),
                    xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;
                    if (xml && data.documentElement.tagName == "parsererror") {
                        throw "parsererror"
                    }
                    if (s && s.dataFilter) {
                        data = s.dataFilter(data, type)
                    }
                    if (typeof data == "string") {
                        if (type == "script") {
                            jQuery.globalEval(data)
                        }
                        if (type == "json") {
                            data = eval("(" + data + ")")
                        }
                    }
                    return data
                },
                param: function(a) {
                    var s = [];
                    function add(key, value) {
                        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
                    }
                    if (a.constructor == Array || a.jquery) {
                        jQuery.each(a, function() {
                            add(this.name, this.value)
                        })
                    } else {
                        for (var j in a) {
                            if (a[j] && a[j].constructor == Array) {
                                jQuery.each(a[j], function() {
                                    add(j, this)
                                })
                            } else {
                                add(j, jQuery.isFunction(a[j]) ? a[j]() : a[j])
                            }
                        }
                    }
                    return s.join("&").replace(/%20/g, "+")
                }
            });
            jQuery.fn.extend({
                show: function(speed, callback) {
                    return speed ? this.animate({
                        height: "show",
                        width: "show",
                        opacity: "show"
                    },
                    speed, callback) : this.filter(":hidden").each(function() {
                        this.style.display = this.oldblock || "";
                        if (jQuery.css(this, "display") == "none") {
                            var elem = jQuery("<" + this.tagName + " />").appendTo("body");
                            this.style.display = elem.css("display");
                            if (this.style.display == "none") {
                                this.style.display = "block"
                            }
                            elem.remove()
                        }
                    }).end()
                },
                hide: function(speed, callback) {
                    return speed ? this.animate({
                        height: "hide",
                        width: "hide",
                        opacity: "hide"
                    },
                    speed, callback) : this.filter(":visible").each(function() {
                        this.oldblock = this.oldblock || jQuery.css(this, "display");
                        this.style.display = "none"
                    }).end()
                },
                _toggle: jQuery.fn.toggle,
                toggle: function(fn, fn2) {
                    return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ? this._toggle.apply(this, arguments) : fn ? this.animate({
                        height: "toggle",
                        width: "toggle",
                        opacity: "toggle"
                    },
                    fn, fn2) : this.each(function() {
                        jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]()
                    })
                },
                fadeTo: function(speed, to, callback) {
                    return this.animate({
                        opacity: to
                    },
                    speed, callback)
                },
                animate: function(prop, speed, easing, callback) {
                    var optall = jQuery.speed(speed, easing, callback);
                    return this[optall.queue === false ? "each" : "queue"](function() {
                        var opt = jQuery.extend({},
                        optall),
                        p,
                        hidden = this.nodeType == 1 && jQuery(this).is(":hidden"),
                        self = this;
                        for (p in prop) {
                            if (prop[p] == "hide" && hidden || prop[p] == "show" && !hidden) {
                                return opt.complete.call(this)
                            }
                            if ((p == "height" || p == "width") && this.style) {
                                opt.display = jQuery.css(this, "display");
                                opt.overflow = this.style.overflow
                            }
                        }
                        if (opt.overflow != null) {
                            this.style.overflow = "hidden"
                        }
                        opt.curAnim = jQuery.extend({},
                        prop);
                        jQuery.each(prop, function(name, val) {
                            var e = new jQuery.fx(self, opt, name);
                            if (/toggle|show|hide/.test(val)) {
                                e[val == "toggle" ? hidden ? "show" : "hide" : val](prop)
                            } else {
                                var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                                start = e.cur(true) || 0;
                                if (parts) {
                                    var end = parseFloat(parts[2]),
                                    unit = parts[3] || "px";
                                    if (unit != "px") {
                                        self.style[name] = (end || 1) + unit;
                                        start = ((end || 1) / e.cur(true)) * start;
                                        self.style[name] = start + unit
                                    }
                                    if (parts[1]) {
                                        end = ((parts[1] == "-=" ? -1 : 1) * end) + start
                                    }
                                    e.custom(start, end, unit)
                                } else {
                                    e.custom(start, val, "")
                                }
                            }
                        });
                        return true
                    })
                },
                queue: function(type, fn) {
                    if (jQuery.isFunction(type) || (type && type.constructor == Array)) {
                        fn = type;
                        type = "fx"
                    }
                    if (!type || (typeof type == "string" && !fn)) {
                        return queue(this[0], type)
                    }
                    return this.each(function() {
                        if (fn.constructor == Array) {
                            queue(this, type, fn)
                        } else {
                            queue(this, type).push(fn);
                            if (queue(this, type).length == 1) {
                                fn.call(this)
                            }
                        }
                    })
                },
                stop: function(clearQueue, gotoEnd) {
                    var timers = jQuery.timers;
                    if (clearQueue) {
                        this.queue([])
                    }
                    this.each(function() {
                        for (var i = timers.length - 1; i >= 0; i--) {
                            if (timers[i].elem == this) {
                                if (gotoEnd) {
                                    timers[i](true)
                                }
                                timers.splice(i, 1)
                            }
                        }
                    });
                    if (!gotoEnd) {
                        this.dequeue()
                    }
                    return this
                }
            });
            jQuery.each({
                slideDown: {
                    height: "show"
                },
                slideUp: {
                    height: "hide"
                },
                slideToggle: {
                    height: "toggle"
                },
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                }
            },
            function(name, props) {
                jQuery.fn[name] = function(speed, callback) {
                    return this.animate(props, speed, callback)
                }
            });
            var queue = function(elem, type, array) {
                if (elem) {
                    type = type || "fx";
                    var q = jQuery.data(elem, type + "queue");
                    if (!q || array) {
                        q = jQuery.data(elem, type + "queue", jQuery.makeArray(array))
                    }
                }
                return q
            };
            jQuery.fn.dequeue = function(type) {
                type = type || "fx";
                return this.each(function() {
                    var q = queue(this, type);
                    q.shift();
                    if (q.length) {
                        q[0].call(this)
                    }
                })
            };
            jQuery.extend({
                speed: function(speed, easing, fn) {
                    var opt = speed && speed.constructor == Object ? speed : {
                        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                        duration: speed,
                        easing: fn && easing || easing && easing.constructor != Function && easing
                    };
                    opt.duration = (opt.duration && opt.duration.constructor == Number ? opt.duration : jQuery.fx.speeds[opt.duration]) || jQuery.fx.speeds._default;
                    opt.old = opt.complete;
                    opt.complete = function() {
                        if (opt.queue !== false) {
                            jQuery(this).dequeue()
                        }
                        if (jQuery.isFunction(opt.old)) {
                            opt.old.call(this)
                        }
                    };
                    return opt
                },
                easing: {
                    linear: function(p, n, firstNum, diff) {
                        return firstNum + diff * p
                    },
                    swing: function(p, n, firstNum, diff) {
                        return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum
                    }
                },
                timers: [],
                timerId: null,
                fx: function(elem, options, prop) {
                    this.options = options;
                    this.elem = elem;
                    this.prop = prop;
                    if (!options.orig) {
                        options.orig = {}
                    }
                }
            });
            jQuery.fx.prototype = {
                update: function() {
                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this)
                    } (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
                    if ((this.prop == "height" || this.prop == "width") && this.elem.style) {
                        this.elem.style.display = "block"
                    }
                },
                cur: function(force) {
                    if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                        return this.elem[this.prop]
                    }
                    var r = parseFloat(jQuery.css(this.elem, this.prop, force));
                    return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0
                },
                custom: function(from, to, unit) {
                    this.startTime = now();
                    this.start = from;
                    this.end = to;
                    this.unit = unit || this.unit || "px";
                    this.now = this.start;
                    this.pos = this.state = 0;
                    this.update();
                    var self = this;
                    function t(gotoEnd) {
                        return self.step(gotoEnd)
                    }
                    t.elem = this.elem;
                    jQuery.timers.push(t);
                    if (jQuery.timerId == null) {
                        jQuery.timerId = setInterval(function() {
                            var timers = jQuery.timers;
                            for (var i = 0; i < timers.length; i++) {
                                if (!timers[i]()) {
                                    timers.splice(i--, 1)
                                }
                            }
                            if (!timers.length) {
                                clearInterval(jQuery.timerId);
                                jQuery.timerId = null
                            }
                        },
                        13)
                    }
                },
                show: function() {
                    this.options.orig[this.prop] = jQuery.attr(this.elem.style, this.prop);
                    this.options.show = true;
                    this.custom(0, this.cur());
                    if (this.prop == "width" || this.prop == "height") {
                        this.elem.style[this.prop] = "1px"
                    }
                    jQuery(this.elem).show()
                },
                hide: function() {
                    this.options.orig[this.prop] = jQuery.attr(this.elem.style, this.prop);
                    this.options.hide = true;
                    this.custom(this.cur(), 0)
                },
                step: function(gotoEnd) {
                    var t = now();
                    if (gotoEnd || t > this.options.duration + this.startTime) {
                        this.now = this.end;
                        this.pos = this.state = 1;
                        this.update();
                        this.options.curAnim[this.prop] = true;
                        var done = true;
                        for (var i in this.options.curAnim) {
                            if (this.options.curAnim[i] !== true) {
                                done = false
                            }
                        }
                        if (done) {
                            if (this.options.display != null) {
                                this.elem.style.overflow = this.options.overflow;
                                this.elem.style.display = this.options.display;
                                if (jQuery.css(this.elem, "display") == "none") {
                                    this.elem.style.display = "block"
                                }
                            }
                            if (this.options.hide) {
                                this.elem.style.display = "none"
                            }
                            if (this.options.hide || this.options.show) {
                                for (var p in this.options.curAnim) {
                                    jQuery.attr(this.elem.style, p, this.options.orig[p])
                                }
                            }
                        }
                        if (done) {
                            this.options.complete.call(this.elem)
                        }
                        return false
                    } else {
                        var n = t - this.startTime;
                        this.state = n / this.options.duration;
                        this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
                        this.now = this.start + ((this.end - this.start) * this.pos);
                        this.update()
                    }
                    return true
                }
            };
            jQuery.extend(jQuery.fx, {
                speeds: {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                step: {
                    opacity: function(fx) {
                        jQuery.attr(fx.elem.style, "opacity", fx.now)
                    },
                    _default: function(fx) {
                        if (fx.prop in fx.elem) {
                            fx.elem[fx.prop] = fx.now
                        } else { if (fx.elem.style) {
                                fx.elem.style[fx.prop] = fx.now + fx.unit
                            }
                        }
                    }
                }
            });
            jQuery.fn.offset = function() {
                var left = 0,
                top = 0,
                elem = this[0],
                results;
                if (elem) {
                    with(jQuery.browser) {
                        var parent = elem.parentNode,
                        offsetChild = elem,
                        offsetParent = elem.offsetParent,
                        doc = elem.ownerDocument,
                        safari2 = safari && parseInt(version) < 522 && !/adobeair/i.test(userAgent),
                        css = jQuery.curCSS,
                        fixed = css(elem, "position") == "fixed";
                        if (! (mozilla && elem == document.body) && elem.getBoundingClientRect) {
                            var box = elem.getBoundingClientRect();
                            add(box.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), box.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
                            add(-doc.documentElement.clientLeft, -doc.documentElement.clientTop)
                        } else {
                            add(elem.offsetLeft, elem.offsetTop);
                            while (offsetParent) {
                                add(offsetParent.offsetLeft, offsetParent.offsetTop);
                                if (mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2) {
                                    border(offsetParent)
                                }
                                if (!fixed && css(offsetParent, "position") == "fixed") {
                                    fixed = true
                                }
                                offsetChild = /^body$/i.test(offsetParent.tagName) ? offsetChild : offsetParent;
                                offsetParent = offsetParent.offsetParent
                            }
                            while (parent && parent.tagName && !/^body|html$/i.test(parent.tagName)) {
                                if (!/^inline|table.*$/i.test(css(parent, "display"))) {
                                    add(-parent.scrollLeft, -parent.scrollTop)
                                }
                                if (mozilla && css(parent, "overflow") != "visible") {
                                    border(parent)
                                }
                                parent = parent.parentNode
                            }
                            if ((safari2 && (fixed || css(offsetChild, "position") == "absolute")) || (mozilla && css(offsetChild, "position") != "absolute")) {
                                add(-doc.body.offsetLeft, -doc.body.offsetTop)
                            }
                            if (fixed) {
                                add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), Math.max(doc.documentElement.scrollTop, doc.body.scrollTop))
                            }
                        }
                        results = {
                            top: top,
                            left: left
                        }
                    }
                }
                function border(elem) {
                    add(jQuery.curCSS(elem, "borderLeftWidth", true), jQuery.curCSS(elem, "borderTopWidth", true))
                }
                function add(l, t) {
                    left += parseInt(l, 10) || 0;
                    top += parseInt(t, 10) || 0
                }
                return results
            };
            jQuery.fn.extend({
                position: function() {
                    var left = 0,
                    top = 0,
                    results;
                    if (this[0]) {
                        var offsetParent = this.offsetParent(),
                        offset = this.offset(),
                        parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? {
                            top: 0,
                            left: 0
                        } : offsetParent.offset();
                        offset.top -= num(this, "marginTop");
                        offset.left -= num(this, "marginLeft");
                        parentOffset.top += num(offsetParent, "borderTopWidth");
                        parentOffset.left += num(offsetParent, "borderLeftWidth");
                        results = {
                            top: offset.top - parentOffset.top,
                            left: offset.left - parentOffset.left
                        }
                    }
                    return results
                },
                offsetParent: function() {
                    var offsetParent = this[0].offsetParent || document.body;
                    while (offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, "position") == "static")) {
                        offsetParent = offsetParent.offsetParent
                    }
                    return jQuery(offsetParent)
                }
            });
            jQuery.each(["Left", "Top"], function(i, name) {
                var method = "scroll" + name;
                jQuery.fn[method] = function(val) {
                    if (!this[0]) {
                        return
                    }
                    return val != undefined ? this.each(function() {
                        this == window || this == document ? window.scrollTo(!i ? val : jQuery(window).scrollLeft(), i ? val : jQuery(window).scrollTop()) : this[method] = val
                    }) : this[0] == window || this[0] == document ? self[i ? "pageYOffset" : "pageXOffset"] || jQuery.boxModel && document.documentElement[method] || document.body[method] : this[0][method]
                }
            });
            jQuery.each(["Height", "Width"], function(i, name) {
                var tl = i ? "Left" : "Top",
                br = i ? "Right" : "Bottom";
                jQuery.fn["inner" + name] = function() {
                    return this[name.toLowerCase()]() + num(this, "padding" + tl) + num(this, "padding" + br)
                };
                jQuery.fn["outer" + name] = function(margin) {
                    return this["inner" + name]() + num(this, "border" + tl + "Width") + num(this, "border" + br + "Width") + (margin ? num(this, "margin" + tl) + num(this, "margin" + br) : 0)
                }
            })
        })();
        var $ = window.$.noConflict(true),
        jQuery = $;
        $.browser.ieBelow7 = $.browser.msie && $.browser.version < 7;
        $.browser.ieBelow8 = $.browser.msie && $.browser.version < 8;
        $.browser.supportPositionFixed = !$.browser.msie || ($.browser.version >= 7 && $.boxModel);
        $.each({
            toggleClass: function(classNames, on) {
                jQuery.className[(arguments.length < 2 ? jQuery.className.has(this, classNames) : !on) ? "remove" : "add"](this, classNames)
            }
        },
        function(i, n) {
            $.fn[i] = function() {
                return this.each(n, arguments)
            }
        });
        $.fn.showHide = function(show) {
            return show ? this.show() : this.hide()
        };
        $.makeArray = function(array) {
            var ret = [];
            if (array != null) {
                var i = array.length;
                if (i == null || array.split || array.setInterval || $.isFunction(array)) {
                    ret[0] = array
                } else {
                    while (i) {
                        ret[--i] = array[i]
                    }
                }
            }
            return ret
        };
        (function($) {
            var m = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            s = {
                array: function(x) {
                    var a = ["["],
                    b,
                    f,
                    i,
                    l = x.length,
                    v;
                    for (i = 0; i < l; i += 1) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == "string") {
                                if (b) {
                                    a[a.length] = ","
                                }
                                a[a.length] = v;
                                b = true
                            }
                        }
                    }
                    a[a.length] = "]";
                    return a.join("")
                },
                "boolean": function(x) {
                    return String(x)
                },
                "null": function(x) {
                    return "null"
                },
                number: function(x) {
                    return isFinite(x) ? String(x) : "null"
                },
                object: function(x) {
                    if (x) {
                        if (x instanceof Array) {
                            return s.array(x)
                        }
                        var a = ["{"],
                        b,
                        f,
                        i,
                        v;
                        for (i in x) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == "string") {
                                    if (b) {
                                        a[a.length] = ","
                                    }
                                    a.push(s.string(i), ":", v);
                                    b = true
                                }
                            }
                        }
                        a[a.length] = "}";
                        return a.join("")
                    }
                    return "null"
                },
                string: function(x) {
                    if (/["\\\x00-\x1f]/.test(x)) {
                        x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                            var c = m[b];
                            if (c) {
                                return c
                            }
                            c = b.charCodeAt();
                            return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                        })
                    }
                    return '"' + x + '"'
                }
            };
            $.toJSON = function(v) {
                var f = s[typeof v];
                if (f) {
                    return f(v)
                }
            };
            $.parseJSON = function(v, safe) {
                if (safe === undefined) {
                    safe = $.parseJSON.safe
                }
                if (safe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v)) {
                    return undefined
                }
                return eval("(" + v + ")")
            };
            $.parseJSON.safe = false
        })(jQuery);
        var logLevels = ["debug", "info", "error"];
        function log(params, level) {
            try {
                if (logLevels.indexOf(level) >= logLevels.indexOf(D.logLevel)) {
                    if (window.console) {
                        console.log.apply(console, params)
                    }
                }
            } catch(e) {}
        }
        function debug() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("[Diigolet]");
            log(args, "debug")
        }
        function info() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("[Diigolet]");
            log(args, "info")
        }
        function error() {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("[Diigolet Error!!!]");
            log(args, "error")
        }
        function assert(condition) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift("[Diigolet Assertion failed!!!]");
            if (!condition) {
                log(args, "error")
            }
        }
        function extend() {
            var args = [].slice.call(arguments);
            var dst = args.shift();
            for (var i = 0, l = args.length, src; src = args[i], i < l; i++) {
                for (var k in src) {
                    dst[k] = src[k]
                }
            }
            return dst
        }
        function extendThese(dst, src, properties) {
            for (var i = 0, l = properties.length, prop; prop = properties[i], i < l; i++) {
                dst[prop] = src[prop]
            }
            return dst
        }
        function $w(s, sep) {
            sep = sep || " ";
            return s.split(sep)
        }
        function forEach(obj, fn, z) {
            if (obj.length !== undefined) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    fn.call(z, obj[i], i)
                }
            } else {
                for (var i in obj) {
                    fn.call(z, obj[i], i)
                }
            }
        }
        function filter(arr, fn, z) {
            var r = [];
            for (var i = 0, l = arr.length; i < l; i++) {
                if (fn.call(z, arr[i], i)) {
                    r.push(arr[i])
                }
            }
            return r
        }
        function map(arr, fn, z) {
            var l = arr.length,
            r = new Array(l);
            for (var i = 0; i < l; i++) {
                r[i] = fn.call(z, arr[i], i)
            }
            return r
        }
        function some(arr, fn, z) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (fn.call(z, arr[i], i)) {
                    return true
                }
            }
            return false
        }
        function map2(arr, fn, z) {
            var l = arr.length,
            r = [],
            t;
            for (var i = 0; i < l; i++) {
                t = fn.call(z, arr[i], i);
                if (t !== null) {
                    r.push(t)
                }
            }
            return r
        }
        function findIndex(arr, fn, start) {
            start = start || 0;
            var isFunc = typeof fn == "function";
            for (var i = start, l = arr.length, v; v = arr[i], i < l; i++) {
                if (isFunc ? fn(v) : v == fn) {
                    return i
                }
            }
            return -1
        }
        function find(arr, fn, start) {
            var i = findIndex(arr, fn, start);
            return i > -1 ? arr[i] : null
        }
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(elt) {
                var len = this.length;
                var from = Number(arguments[1]) || 0;
                from = (from < 0) ? Math.ceil(from) : Math.floor(from);
                if (from < 0) {
                    from += len
                }
                for (; from < len; from++) {
                    if (from in this && this[from] === elt) {
                        return from
                    }
                }
                return -1
            }
        }
        function unique(arr, fn) {
            var r = [];
            for (var i = 0, len = arr.length, v; v = arr[i], i < len; i++) {
                if (!fn) {
                    if (r.indexOf(v) == -1) {
                        r.push(v)
                    }
                } else { if (!find(r, function(vv) {
                        return fn(vv, v)
                    })) {
                        r.push(v)
                    }
                }
            }
            return r
        }
        function reverse(arr) {
            var r = new Array(arr.length);
            for (var i = arr.length - 1, j = 0; i >= 0; i--, j++) {
                r[j] = arr[i]
            }
            return r
        }
        function trim(str) {
            var str = str.replace(/^\s\s*/, ""),
            ws = /\s/,
            i = str.length;
            while (ws.test(str.charAt(--i))) {}
            return str.slice(0, i + 1)
        }
        function scan(s, pattern, func) {
            if (!pattern.global) {
                throw "string.scan: pattern is not global"
            }
            var a;
            while (a = pattern.exec(s)) {
                func(a)
            }
        }
        function parseDomain(url) {
            if (!/^[^:\/?#]+:\/\//.test(url)) {
                url = "http://" + url
            }
            var m = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
            return trim(m[4].toLowerCase())
        }
        function str_interpret(value) {
            return value == null ? "" : String(value)
        }
        function gsub(str, pattern, replacement) {
            var result = "",
            source = str,
            match;
            while (source.length > 0) {
                if (match = source.match(pattern)) {
                    result += source.slice(0, match.index);
                    result += str_interpret(replacement(match));
                    source = source.slice(match.index + match[0].length)
                } else {
                    result += source,
                    source = ""
                }
            }
            return result
        }
        var tplPattern = /(^|.|\r|\n)(#\{(.*?)\})/;
        function evalTpl(tpl, object) {
            return gsub(tpl, tplPattern, function(match) {
                if (object == null) {
                    return ""
                }
                var before = match[1] || "";
                if (before == "\\") {
                    return match[2]
                }
                var ctx = object,
                expr = match[3];
                var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
                match = pattern.exec(expr);
                if (match == null) {
                    return before
                }
                while (match != null) {
                    var comp = match[1].indexOf("[") === 0 ? gsub(match[2], "\\\\]", "]") : match[1];
                    ctx = ctx[comp];
                    if (null == ctx || "" == match[3]) {
                        break
                    }
                    expr = expr.substring("[" == match[3] ? match[1].length : match[0].length);
                    match = pattern.exec(expr)
                }
                return before + str_interpret(ctx)
            })
        }
        function $html(html) {
            var o = $.clean([trim(html)]);
            return new $().setArray(o)
        }
        Array.prototype.push2 = function(cur, eles) {};
        function $id(id) {
            return $("#" + id)
        }
        var Utils = {
            parseColor: function(color) {
                var namedColors = {
                    aqua: [0, 255, 255],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    black: [0, 0, 0],
                    blue: [0, 0, 255],
                    brown: [165, 42, 42],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgrey: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkviolet: [148, 0, 211],
                    fuchsia: [255, 0, 255],
                    gold: [255, 215, 0],
                    green: [0, 128, 0],
                    indigo: [75, 0, 130],
                    khaki: [240, 230, 140],
                    lightblue: [173, 216, 230],
                    lightcyan: [224, 255, 255],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    navy: [0, 0, 128],
                    olive: [128, 128, 0],
                    orange: [255, 165, 0],
                    pink: [255, 192, 203],
                    purple: [128, 0, 128],
                    red: [255, 0, 0],
                    silver: [192, 192, 192],
                    white: [255, 255, 255],
                    yellow: [255, 255, 0]
                };
                if (namedColors[color]) {
                    return {
                        r: namedColors[color][0],
                        g: namedColors[color][1],
                        b: namedColors[color][2]
                    }
                } else { if (result = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/.exec(color)) {
                        return {
                            r: parseInt(result[1]),
                            g: parseInt(result[2]),
                            b: parseInt(result[3])
                        }
                    } else { if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)$/.exec(color)) {
                            return {
                                r: parseFloat(result[1]) * 2.55,
                                g: parseFloat(result[2]) * 2.55,
                                b: parseFloat(result[3]) * 2.55
                            }
                        } else { if (result = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(color)) {
                                return {
                                    r: parseInt("0x" + result[1] + result[1]),
                                    g: parseInt("0x" + result[2] + result[2]),
                                    b: parseInt("0x" + result[3] + result[3])
                                }
                            } else { if (result = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(color)) {
                                    return {
                                        r: parseInt("0x" + result[1]),
                                        g: parseInt("0x" + result[2]),
                                        b: parseInt("0x" + result[3])
                                    }
                                } else {
                                    return {
                                        r: 255,
                                        g: 255,
                                        b: 255
                                    }
                                }
                            }
                        }
                    }
                }
            },
            dom: {
                build: function() {
                    var ret = [],
                    a = arguments,
                    e,
                    o,
                    i = 0,
                    j;
                    a = a[0] instanceof Array ? a[0] : a;
                    for (; i < a.length; i++) {
                        if (a[i + 1] instanceof Object) {
                            e = ret[ret.length] = document.createElement(a[i]);
                            for (j in a[++i]) {
                                e.setAttribute(j, a[i][j])
                            }
                            if (a[i + 1] instanceof Array) {
                                o = arguments.callee(a[++i]);
                                for (j = 0; j < o.length; j++) {
                                    e.appendChild(o[j])
                                }
                            }
                        } else {
                            ret[ret.length] = document.createTextNode(a[i])
                        }
                    }
                    return ret
                },
                buildOne: function(tag, attrs, children) {
                    return this.build(tag, attrs, children)[0]
                },
                getSelection: function() {
                    return window.getSelection ? window.getSelection().toString() : document.getSelection ? document.getSelection() : document.selection.createRange().text
                }
            },
            content2Html: function(c) {
                return c
            }
        };
        var IEventDispatcher = {
            mixin: function(o) {
                extendThese(o, this, $w("addEventListener removeEventListener fireEvent _resetEvents"));
                o._resetEvents()
            },
            addEventListener: function(eventName, listener) {
                if (!this._events[eventName]) {
                    this._events[eventName] = []
                }
                var listenerList = this._events[eventName];
                if (listenerList.indexOf(listener) == -1) {
                    listenerList.push(listener)
                }
            },
            removeEventListener: function(eventName, listener) {
                var listenerList = this._events[eventName];
                if (listenerList) {
                    if (arguments.length == 2) {
                        var i = listenerList.indexOf(listener);
                        if (i > -1) {
                            listenerList.splice(i)
                        }
                    } else {
                        delete this._events[eventName]
                    }
                }
            },
            _resetEvents: function() {
                this._supressEvents = false;
                this._events = []
            },
            fireEvent: function(eventName, paramArray) {
                if (this._supressEvents) {
                    return
                }
                debug("[event]", eventName);
                var listenerList = this._events[eventName];
                if (listenerList) {
                    for (var i = 0, listener, len = listenerList.length; listener = listenerList[i], i < len; i++) {
                        (typeof listener == "function" ? listener : listener["on" + eventName]).apply(listener, paramArray)
                    }
                }
            }
        };
        if (typeof Poly9 == "undefined") {
            var Poly9 = {}
        }
        Poly9.URLParser = function(url) {
            this._fields = {
                Username: 4,
                Password: 5,
                Port: 7,
                Protocol: 2,
                Host: 6,
                Pathname: 8,
                URL: 0,
                Querystring: 9,
                Fragment: 10
            };
            this._values = {};
            this._regex = null;
            this.version = 0.1;
            this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
            for (var f in this._fields) {
                this["get" + f] = this._makeGetter(f)
            }
            if (typeof url != "undefined") {
                this._parse(url)
            }
        };
        Poly9.URLParser.prototype.setURL = function(url) {
            this._parse(url)
        };
        Poly9.URLParser.prototype._initValues = function() {
            for (var f in this._fields) {
                this._values[f] = ""
            }
        };
        Poly9.URLParser.prototype._parse = function(url) {
            this._initValues();
            var r = this._regex.exec(url);
            if (!r) {
                throw "DPURLParser::_parse -> Invalid URL"
            }
            for (var f in this._fields) {
                if (typeof r[this._fields[f]] != "undefined") {
                    this._values[f] = r[this._fields[f]]
                }
            }
        };
        Poly9.URLParser.prototype._makeGetter = function(field) {
            return function() {
                return this._values[field]
            }
        };
        function MD5(sMessage) {
            function RotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
            }
            function AddUnsigned(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 2147483648);
                lY8 = (lY & 2147483648);
                lX4 = (lX & 1073741824);
                lY4 = (lY & 1073741824);
                lResult = (lX & 1073741823) + (lY & 1073741823);
                if (lX4 & lY4) {
                    return (lResult ^ 2147483648 ^ lX8 ^ lY8)
                }
                if (lX4 | lY4) {
                    if (lResult & 1073741824) {
                        return (lResult ^ 3221225472 ^ lX8 ^ lY8)
                    } else {
                        return (lResult ^ 1073741824 ^ lX8 ^ lY8)
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8)
                }
            }
            function F(x, y, z) {
                return (x & y) | ((~x) & z)
            }
            function G(x, y, z) {
                return (x & z) | (y & (~z))
            }
            function H(x, y, z) {
                return (x ^ y ^ z)
            }
            function I(x, y, z) {
                return (y ^ (x | (~z)))
            }
            function FF(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }
            function GG(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }
            function HH(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }
            function II(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b)
            }
            function ConvertToWordArray(sMessage) {
                var lWordCount;
                var lMessageLength = sMessage.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray
            }
            function WordToHex(lValue) {
                var WordToHexValue = "",
                WordToHexValue_temp = "",
                lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2)
                }
                return WordToHexValue
            }
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
            var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
            var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
            var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
            x = ConvertToWordArray(sMessage);
            a = 1732584193;
            b = 4023233417;
            c = 2562383102;
            d = 271733878;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
                d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
                c = FF(c, d, a, b, x[k + 2], S13, 606105819);
                b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
                a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
                d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
                c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
                b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
                a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
                d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
                c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
                b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
                a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
                d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
                c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
                b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
                a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
                d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
                c = GG(c, d, a, b, x[k + 11], S23, 643717713);
                b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
                a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
                d = GG(d, a, b, c, x[k + 10], S22, 38016083);
                c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
                b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
                a = GG(a, b, c, d, x[k + 9], S21, 568446438);
                d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
                c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
                b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
                a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
                d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
                c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
                b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
                a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
                d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
                c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
                b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
                a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
                d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
                c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
                b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
                a = HH(a, b, c, d, x[k + 13], S31, 681279174);
                d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
                c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
                b = HH(b, c, d, a, x[k + 6], S34, 76029189);
                a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
                d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
                c = HH(c, d, a, b, x[k + 15], S33, 530742520);
                b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
                a = II(a, b, c, d, x[k + 0], S41, 4096336452);
                d = II(d, a, b, c, x[k + 7], S42, 1126891415);
                c = II(c, d, a, b, x[k + 14], S43, 2878612391);
                b = II(b, c, d, a, x[k + 5], S44, 4237533241);
                a = II(a, b, c, d, x[k + 12], S41, 1700485571);
                d = II(d, a, b, c, x[k + 3], S42, 2399980690);
                c = II(c, d, a, b, x[k + 10], S43, 4293915773);
                b = II(b, c, d, a, x[k + 1], S44, 2240044497);
                a = II(a, b, c, d, x[k + 8], S41, 1873313359);
                d = II(d, a, b, c, x[k + 15], S42, 4264355552);
                c = II(c, d, a, b, x[k + 6], S43, 2734768916);
                b = II(b, c, d, a, x[k + 13], S44, 1309151649);
                a = II(a, b, c, d, x[k + 4], S41, 4149444226);
                d = II(d, a, b, c, x[k + 11], S42, 3174756917);
                c = II(c, d, a, b, x[k + 2], S43, 718787259);
                b = II(b, c, d, a, x[k + 9], S44, 3951481745);
                a = AddUnsigned(a, AA);
                b = AddUnsigned(b, BB);
                c = AddUnsigned(c, CC);
                d = AddUnsigned(d, DD)
            }
            var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
            return temp.toLowerCase()
        }
        var Base = function() {};
        Base.extend = function(_instance, _static) {
            var extend = Base.prototype.extend;
            Base._prototyping = true;
            var proto = new this;
            extend.call(proto, _instance);
            delete Base._prototyping;
            var constructor = proto.constructor;
            var klass = proto.constructor = function() {
                if (!Base._prototyping) {
                    if (this._constructing || this.constructor == klass) {
                        this._constructing = true;
                        constructor.apply(this, arguments);
                        delete this._constructing
                    } else { if (arguments[0] != null) {
                            return (arguments[0].extend || extend).call(arguments[0], proto)
                        }
                    }
                }
            };
            klass.ancestor = this;
            klass.extend = this.extend;
            klass.forEach = this.forEach;
            klass.implement = this.implement;
            klass.prototype = proto;
            klass.toString = this.toString;
            klass.valueOf = function(type) {
                return (type == "object") ? klass : constructor.valueOf()
            };
            extend.call(klass, _static);
            if (typeof klass.init == "function") {
                klass.init()
            }
            return klass
        };
        Base.prototype = {
            extend: function(source, value) {
                if (arguments.length > 1) {
                    var ancestor = this[source];
                    if (ancestor && (typeof value == "function") && (!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) && /\bbase\b/.test(value)) {
                        var method = value.valueOf();
                        value = function() {
                            var previous = this.base || Base.prototype.base;
                            this.base = ancestor;
                            var returnValue = method.apply(this, arguments);
                            this.base = previous;
                            return returnValue
                        };
                        value.valueOf = function(type) {
                            return (type == "object") ? value : method
                        };
                        value.toString = Base.toString
                    }
                    this[source] = value
                } else { if (source) {
                        var extend = Base.prototype.extend;
                        if (!Base._prototyping && typeof this != "function") {
                            extend = this.extend || extend
                        }
                        var proto = {
                            toSource: null
                        };
                        var hidden = ["constructor", "toString", "valueOf"];
                        var i = Base._prototyping ? 0 : 1;
                        while (key = hidden[i++]) {
                            if (source[key] != proto[key]) {
                                extend.call(this, key, source[key])
                            }
                        }
                        for (var key in source) {
                            if (!proto[key]) {
                                extend.call(this, key, source[key])
                            }
                        }
                    }
                }
                return this
            },
            base: function() {}
        };
        Base = Base.extend({
            constructor: function() {
                this.extend(arguments[0])
            }
        },
        {
            ancestor: Object,
            version: "1.1",
            forEach: function(object, block, context) {
                for (var key in object) {
                    if (this.prototype[key] === undefined) {
                        block.call(context, object[key], key, object)
                    }
                }
            },
            implement: function() {
                for (var i = 0;
                i < arguments.length; i++) {
                    if (typeof arguments[i] == "function") {
                        arguments[i](this.prototype)
                    } else {
                        this.prototype.extend(arguments[i])
                    }
                }
                return this
            },
            toString: function() {
                return String(this.valueOf())
            }
        });
        jQuery.Draggable = function(ele, options) {
            var $ = jQuery;
            var dragging = false;
            ele = this.ele = $(ele);
            if (ele[0].draggable) {
                ele[0].draggable.destroy()
            }
            ele[0].draggable = this;
            var o = this.options = $.extend({
                handle: "",
                cursor: "move",
                onDrag: function() {
                    return true
                },
                beforeDrag: function() {},
                afterDrag: function() {}
            },
            options || {});
            o.handle = o.handle ? $(o.handle, ele) : ele;
            o.handle.css({
                cursor: o.cursor
            });
            var mx, my;
            function onMouseDown(e) {
                dragging = false;
                $(document).bind("mousemove", onMouseMove).bind("mouseup", onMouseUp);
                mx = e.pageX;
                my = e.pageY;
                return false
            }
            function onMouseMove(e) {
                if (!dragging) {
                    o.beforeDrag(e)
                }
                dragging = true;
                var l = parseInt(ele.css("left")),
                t = parseInt(ele.css("top"));
                var ox = e.pageX - mx,
                oy = e.pageY - my;
                if (o.onDrag(ele, {
                    ox: ox,
                    oy: oy
                })) {
                    ele.css({
                        left: l + ox,
                        top: t + oy
                    })
                }
                mx = e.pageX;
                my = e.pageY;
                return false
            }
            function onMouseUp(e) {
                $(document).unbind("mousemove", onMouseMove).unbind("mouseup", onMouseUp);
                if (dragging) {
                    o.afterDrag(e);
                    return false
                } else {
                    return true
                }
            }
            this.destroy = function() {
                o.handle.unbind("mousedown", onMouseDown)
            };
            o.handle.bind("mousedown", onMouseDown)
        };
        var AutoComplete = function(input, options) {
            var i = $(input),
            timeout;
            if (i[0].autoCompleter) {
                i[0].autoCompleter.destroy()
            }
            i[0].autoCompleter = this;
            var o = options = $.extend({
                inputClass: "ac_input",
                resultsClass: "ac_results",
                minChars: 1,
                delay: 100,
                matchCase: 0,
                matchSubset: 1,
                matchContains: 0,
                mustMatch: 0,
                loadingClass: "ac_loading",
                selectFirst: false,
                selectOnly: false,
                mode: "multiple",
                multipleSeparator: " "
            },
            options || {});
            if (typeof o.multipleSeparator == "string") {
                o.multipleSeparator = o.multipleSeparator.split("")
            }
            function lastIndexOfMultipleSeparator(str) {
                var index = -1,
                sep = "";
                $.each(o.multipleSeparator, function(k, v) {
                    var i;
                    if ((i = str.lastIndexOf(v)) > index) {
                        sep = v;
                        index = i
                    }
                });
                return[index, sep]
            }
            function onScroll() {
                r.hide()
            }
            function onKeyDown(e) {
                switch (e.keyCode) {
                case 38:
                    e.preventDefault();
                    moveSelect(-1);
                    break;
                case 40:
                    e.preventDefault();
                    moveSelect(1);
                    break;
                case 9:
                case 13:
                    if (selectItem()) {
                        e.preventDefault()
                    }
                    break;
                default:
                    active = -1;
                    if (timeout) {
                        clearTimeout(timeout)
                    }
                    timeout = setTimeout(function() {
                        if (i.val().length < o.minChars) {
                            r.hide()
                        } else {
                            requestData(i.val())
                        }
                    },
                    o.delay);
                    break
                }
            }
            function selectItem(index) {
                if (index !== undefined) {
                    active = index;
                    moveSelect(0)
                }
                index = active;
                if (index < 0) {
                    return
                }
                var v = r.find("li").eq(index).html();
                if (v.indexOf(" ") >= 0) {
                    v = '"' + v + '"'
                }
                if (o.mode == "multiple") {
                    var old_value = i.val();
                    var sep = lastIndexOfMultipleSeparator(old_value);
                    if (sep[0] >= 1) {
                        var value = old_value.substr(0, sep[0] + 1);
                        new_value = value + v + sep[1]
                    } else {
                        new_value = v
                    }
                } else {
                    new_value = v
                }
                i.val(new_value);
                r.hide();
                if (o.onItemSelect) {
                    setTimeout(function() {
                        o.onItemSelect(v)
                    },
                    1)
                }
                setTimeout(function() {
                    i[0].focus();
                    (function(ele, pos) {
                        if (ele.createTextRange) {
                            var range = ele.createTextRange();
                            range.move("character", pos);
                            range.select()
                        } else { if (ele.selectionStart >= 0) {
                                ele.focus();
                                ele.setSelectionRange(pos, pos)
                            }
                        }
                    })(i[0], i.val().length)
                },
                13);
                return true
            }
            function moveSelect(step) {
                var lis = r.find("li");
                if (lis.size() == 0) {
                    return
                }
                active += step;
                if (active < 0) {
                    active = lis.size() - 1
                } else { if (active >= lis.size()) {
                        active = 0
                    }
                }
                lis.removeClass("over").eq(active).addClass("over")
            }
            function requestData(q) {
                if (o.mode == "multiple") {
                    var sep = lastIndexOfMultipleSeparator(q),
                    p = "";
                    if (sep[0] > 0) {
                        p = q.substr(sep[0] + 1)
                    } else {
                        p = q
                    }
                    if (p.length > 0) {
                        tags = D.parseTags(p, true);
                        q = tags.pop()
                    } else {
                        q = p;
                        return
                    }
                }
                var q = q.toLowerCase();
                var candidates = [];
                for (var i = 0, v; v = o.data[i], i < o.data.length; i++) {
                    if (v.toLowerCase().indexOf(q) == 0) {
                        candidates.push(v)
                    }
                }
                receiveData(q, candidates)
            }
            function receiveData(q, data) {
                if (data && data.length > 0) {
                    if (data.length > 10) {
                        data.splice(9, 99999)
                    }
                    function findPos(obj) {
                        var curleft = obj.offsetLeft || 0;
                        var curtop = obj.offsetTop || 0;
                        while (obj = obj.offsetParent) {
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop
                        }
                        var t = 0,
                        l = 0;
                        if ($.browser.opera && document.compatMode != "CSS1Compat") {
                            curtop += 30
                        }
                        return {
                            x: curleft + l,
                            y: curtop + t
                        }
                    }
                    var pos = findPos(i[0]);
                    r.find("li").unbind();
                    r.find("ul").html($.map(data, function(v) {
                        return "<li>" + v + "</li>"
                    }).join("")).end().css({
                        top: pos.y + i[0].offsetHeight,
                        left: pos.x
                    }).show();
                    r.find("li").mouseover(function(e) {
                        active = r.find("li").index(e.target);
                        moveSelect(0)
                    }).mousedown(function(e) {
                        active = r.find("li").index(e.target);
                        moveSelect(0);
                        selectItem();
                        return false
                    })
                } else {
                    r.hide()
                }
            }
            function onBlur(e) {
                r.hide()
            }
            this.destroy = function() {
                i.unbind("keydown", onKeyDown).unbind("blur", onBlur);
                $(window).unbind("scroll", onScroll);
                i[0].autoCompleter = null
            };
            i.attr("autocomplete", "off").addClass(o.inputClass).bind("keydown", onKeyDown).bind("blur", onBlur);
            if (!$.browser.supportPositionFixed) {
                $(window).bind("scroll", onScroll)
            }
            var r = $("#diigolet-ac");
            if (r.size() == 0) {
                r = $('<div id="diigolet-ac"><ul></ul></div>').addClass(o.resultsClass).hide().css({
                    position: $.browser.supportPositionFixed ? "fixed" : "absolute"
                }).appendTo(document.body).hide();
                if ($.browser.ieBelow7) {
                    r.append(document.createElement("<iframe class=\"bgiframe\" src=\"javascript:false;document.write('');\" tabindex=\"-1\" style=\"display:block; position:absolute; top: expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)  || 0) * -1) + 'px'); left:expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth) || 0) * -1) + 'px'); z-index:-1; filter:Alpha(Opacity='0'); width:expression(this.parentNode.offsetWidth + 'px'); height:expression(this.parentNode.offsetHeight + 'px')\"/>"))
                }
            }
        };
        var HTML_TOOLBAR = '<div id="diigolet-toolbar" class="diigolet" title="Diigolet version #{DIIGOLET_VERSION}"><div id="diigolet-tb-content"><div id="diigolet-tb-bar"><a id="diigolet-tb-btnHide" href="#" class="_hoverAndHideDropdown" onclick="return diigolet.handle(event, \'hideToolbar\');" title="Hide the toolbar"></a><a style="float:right; width:30px;height:24px;background:url(\'http://www.diigo.com/javascripts/webtoolbar/images/diigoletHelp.gif\') no-repeat 50% 50%" href="#" onmouseover="return diigolet.handle(event, \'showHelp\');" onclick="return diigolet.handle(event, \'showHelp\');" title="Help"></a><a id="diigolet-tb-btnMore" href="#" class="diigoletButton hover" onclick="return false;" onmouseover="return diigolet.handle(event, \'tb_showDropDownMenu\', \'#diigolet-tb-moreMenu\')"><b class="outer"><b>Diigo</b></b></a><a id="diigolet-tb-btnBookmark" href="#" class="diigoletButton" onclick="diigolet.handle(event, \'bookmark\');" title="Bookmark this page"><b class="outer"><b>Bookmark</b></b></a><a id="diigolet-button-highlight" href="#" class="diigoletButton" onmouseout="diigolet.handle(event, \'outHighlight\');" onmouseover="diigolet.handle(event, \'overHighlight\');" onmousedown="this.blur();return diigolet.handle(event, \'highlight\');" onclick="return false;" title="Selected some text to highlight"><b class="outer"><b>Highlight</b></b></a><a id="diigolet-button-highlight-dropdown" href="#" class="diigoletButton" onmouseout="diigolet.handle(event, \'outHighlight\');" onmouseover="diigolet.handle(event, \'overHighlight\');" onmousedown="this.blur();return diigolet.handle(event, \'dropDownColorMenu\');" onclick="return false;"></a><a id="diigolet-tb-btnFloatNote" href="#" class="diigoletButton" title="Add a sticky note" onclick="diigolet.handle(event, \'addStickyNote\')"><b class="outer"><b>Floating Sticky Note</b></b></a><a id="diigolet-tb-btnComment" href="#" class="diigoletButton" title="View comments" onclick="return diigolet.handle(event, \'tb_viewComments\')"><b class="outer"><b>Comment</b></b></a><span id="diigoDivInfo" style="padding-left:25px; float:left"><span style="display:none" id="diigolet-tb-forward">Annotated <a href="#" class="_forwardPageUrl" title="Go to the original page">page</a> by <a href="#" class="_forwardUserUrl" title=""></a>.\n\t\t\t</span><span class="_info"></span></span></div><div id="diigolet-tb-signInMenu" class="dropdownMenu" style="left:1px;width:80px"><a href="#" title="Sign in into Diigo.com" onclick="return diigolet.handle(event, \'tb_signIn\')">Sign in</a><a href="#{URL_DIIGO}/sign-up" title="Create a Diigo account" target="_blank">Sign up</a></div><div id="diigolet-tb-moreMenu" class="dropdownMenu" style="left:10px" onclick="this.style.display = \'none\'"><a href="#" class="_URL_MY_LIBRARY _diigomenu" title="My Library" target="_blank">My Library</a><a href="#" class="_URL_MY_LIST _diigomenu" title="My lists home" target="_blank">My lists home</a><a href="#" class="_URL_MY_GROUP _diigomenu" title="My groups home" target="_blank">My groups home</a><a href="#" class="_URL_NETWORK _diigomenu" title="My Network" target="_blank">My Network</a><a href="#" class="_URL_HOT_BOOKMARK _diigomenu" title="Hot Bookmark" target="_blank">Hot Bookmark</a><div><img style="height:2px;width:140px;" src="http://www.diigo.com/javascripts/webtoolbar/images/diigoletToobarSep.png"/></div><a href="#" title="Show/hide highlight" onclick="diigolet.handle(event, \'showHideHighlight\')">Show/hide highlight</a></div><div id="diigolet-tb-colorMenu" class="dropdownMenu" style="left:329px" onclick="this.style.display = \'none\'"><a href="#" id="diigolet-colorMenu-yellow" onclick="diigolet.handle(event, \'ChangeColor\', \'yellow\')"><b class="colorItem"><b>Yellow</b></b></a><a href="#" id="diigolet-colorMenu-blue" onclick="diigolet.handle(event, \'ChangeColor\', \'blue\')"><b class="colorItem"><b>Blue</b></b></a><a href="#" id="diigolet-colorMenu-green" onclick="diigolet.handle(event, \'ChangeColor\', \'green\')"><b class="colorItem"><b>Green</b></b></a><a href="#" id="diigolet-colorMenu-pink" onclick="diigolet.handle(event, \'ChangeColor\', \'pink\')"><b class="colorItem"><b>Pink</b></b></a></div><div style="clear:both"></div></div><div id="diigolet-tb-shadow"></div><div id="diigolet-help"><div class="diigolet-closeBtn" onclick="diigolet.handle(event, \'hideHelp\')"></div><p>To highlight, select some text and click "Highlight" on the context menu.</p><p>To add a sticky note, move your mouse over highlighted text and the click \n\t"Add Sticky Notes" on the context menu.</p><p><a target="_blank" href="http://www.diigo.com/help/diigolet/3" title="View full Help">View full help</a></p></div><div id="diigolet-notify" class="diigolet"><span></span></div><div id="diigolet-annotationSummary" style="width:360px;display:none;"></div></div>\n';
        var HTML_TRAY = '<div id="diigolet-tray" class="diigolet" onmouseover="diigolet.handle(event, \'mouseOnBorder\');"></div>\n';
        var HTML_DLG_BOOKMARK = '<div class="diigolet" id="diigolet-tagForward"><h1 style="text-align: center; line-height: 30px;font-size:14px; font-weight:bold">Save Bookmark</h1><div class="diigo-hr"></div><form method="post" onsubmit="return false;"><table class="diigo-table"><tbody><tr><th>Url</th><td colspan="2"><input name="text" type="text" id="Diigo-Bookmark-Url" class="diigolet-input" size="64"/></td></tr><tr><th>Title</th><td colspan="2"><input id="Diigo-Bookmark-Title" class="diigolet-input" size="64" type="text"/></td></tr><tr><th></th><td style="padding:0;"><input type="checkbox" class="diigo-check" id="Diigo-Bookmark-Privacy"/><label for="Diigo-Bookmark-Privacy" title="Make this bookmark private">Private</label><input type="checkbox" class="diigo-check" id="Diigo-Bookmark-Unread" style="margin-left:20px;"/><label for="Diigo-Bookmark-Unread" title="Mark this bookmark as unread">Unread</label></td><!--<td style="text-align:right"><a href="http://www.diigo.com/help/tips.html#tag" target="_blank" class="diigolet-Help" id="Diigo-Bookmark-Help">Help...</a></td>--></tr><tr><th>Description</th><td colspan="2"><textarea id="Diigo-Bookmark-Description" cols="60"></textarea></td></tr><tr><th>Tags</th><td colspan="2"><input id="Diigo-Bookmark-Tag" class="diigolet-input" size="64" type="text"/></td></tr><tr id="diigolet-add-to-list"><th>Add to a <br/>List</th><td colspan="2"><select id="diigo-lists" style="width: 140px"></select></td></tr><tr id="diigolet-bm-shareToGroupsRegion"><th>Share to a <br/>Group</th><td colspan="2"><select id="Diigo-Bookmark-selectShareTo" style="width: 140px"></select><span><input type="checkbox" class="diigo-check" id="Diigo-Bookmark-checkShareExisting" style="margin-left:10px" checked="checked"/><label for="Diigo-Bookmark-checkShareExisting" title="Share my existing annotations" style="margin:0"> Share my existing annotations</label></span></td></tr><tr><td style="height: 10px"></td><td colspan="2"></td></tr><tr><td></td><td colspan="2" style="text-align: right;"><input type="button" class="diigo-button" onclick="return diigolet.handle(event, \'bmOnSubmitAndClose\', \'bookmark\')" value="Save Bookmark"/><input type="button" class="diigo-button" onclick="return diigolet.handle(event, \'bmCancel\')" value="Cancel" style="font-weight:normal"/></td></tr></tbody></table></form></div>\n';
        var POST_TO_TWITTER = '<div id="diigolet-twitter" class="diigolet"><table width="100%" border="0" cellspacing="4" cellpadding="2"><tr><td><img width="210px" height="49px" src="http://assets3.twitter.com/images/twitter.png"/></td></tr><tr><td><p>Share this bookmark with friends on Twitter</p></td></tr><tr><td><fieldset><legend>Input your message</legend><textarea id="message-editor" onkeyup="diigolet.handle(event, \'OnTwitterMsgChange\')" style="margin-top:5px;margin-bottom:5px;width:361px;height:113px;"></textarea><span style="margin-right:5px" id="left-count">51</span>characters left\n\t\t      \t</fieldset></td></tr><tr><td colspan="2" style="text-align: right;"><input type="button" class="diigo-button" onclick="return diigolet.handle(event, \'TwitterPost\')" value="Post"/><input type="button" class="diigo-button" onclick="return diigolet.handle(event, \'TwitterCancel\')" value="Cancel" style="font-weight:normal"/></td></tr></table></div>\n';
        var HTML_DLG_IC = '<div id="diigolet-dlg-sticky" style="position:absolute; top:60px; left:150px;" class="diigolet diigoletFN"><table border="0" cellspacing="0" cellpadding="0" class="diigoletFNTable"><tr><td rowspan="2" class="diigoletFNL _dragHandle"></td><td colspan="2" class="diigoletFNT" valign="top"><div class="diigoletFNTDiv"><div class="menu"><a id="diigolet-dlgIC-close" href="#" title="Close"><img src="http://www.diigo.com/javascripts/webtoolbar/images/float_note_close.gif" alt="X" /></a></div><h1 class="_stickyTitle _dragHandle">Sticky Notes</h1></div></td></tr><tr><td class="_body"><div class="diigoletFNContent"><blockquote>\n                                That\'s awesome :-)\n                            </blockquote><p class="diigoletFNAuthorP">\n                                by <a href="#" class="diigoletFNAuthor">Mike</a>\n                                less than a minute ago <span class="diigoletFNEdit"><a href="">[Delete]</a></span></p></div><div class="diigoletFNComment"><p><textarea class="_stickyContent" style="width:345px; height:50px"></textarea></p><p class="diigoletFNCommand" style="width:345px;text-align: right; margin-bottom:6px !important;"><input id="diigoletFNSubmit" type="submit" value="Post" class="diigo-button" style="font-weight:bold"/></p><div style="margin-top: -25px;" class="_options"><select style="width:150px;" class="diigoletFNPriSlct"></select></div></div></td><td rowspan="2" class="diigoletFNR _dragHandle"></td></tr><tr><td colspan="2" class="diigoletFNB"><div class="diigoFootDiv"><div class="IconFeild"><div class="editIcon"></div></div><div class="footText"><span class="personalText"></span></div></div></td></tr></table></div>\n';
        var HTML_SIDEBAR = '<div class="diigolet d3df themeDefault" id="d3df-sidebar"><div class="heading bgColor1 _dragHandle" style="zoom:1;border:none;"><a href="#{URL_DIIGO}" style="background: transparent url(http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv1.gif) no-repeat scroll left -4px; padding-left: 20px; float:left">\n\t\tDiigo</a><a class="_signIn" href="#" title="Sign in into Diigo.com" style="float:left;margin-left:10px" onclick="return diigolet.handle(event, \'tb_signIn\')">sign in</a><div style="float: right;" title="Pop out and pin" class="popOut" onclick="diigolet.devil(\'Sidebar\').popOut();"></div><div style="clear:both"></div></div><div class="heading bgColor1 color2"><a id="d3df-togglePanelInline" class="togglePanel" href="#" onclick="diigolet.devil(\'Sidebar\').togglePanel(\'inline\');return false;"></a><a class="add" href="#" onclick="diigolet.devil(\'Sidebar\').addInlineComment();return false;">+Add</a><p><span class="_inlineCommentsTitle">Inline Comments</span>(<span class="_inlineCommentCount">0</span>)</p></div><ul id="d3df-inlineCommentBox" class="highlights bgColor2" style="overflow:auto">\n</ul><div class="heading bgColor1"><a id="d3df-togglePanelPage" class="togglePanel" href="#" onclick="diigolet.devil(\'Sidebar\').togglePanel(\'page\');return false;"></a><a class="add" href="#" onclick="diigolet.devil(\'Sidebar\').showEditPageCommentBox();return false;">Add</a><p>Page Comments(<span class="_pageCommentCount">0</span>)</p></div><div id="d3df-pageCommentBox" class=" bgColor1"><div class="addComment"><select id="diigolet-sb-selpc" style="margin-left:5px"></select><textarea id="diigolet-sb-txtpc" name="txtComment" rows="4" style="margin:5px;width:90%"></textarea><div style="margin:5px"><input class="diigo-button" type="button" value="Post" onclick="diigolet.devil(\'Sidebar\').addCommentSubmit()"/><input class="diigo-button" type="button" value="Cancel" onclick="diigolet.devil(\'Sidebar\').showEditPageCommentBox(false);"/></div></div><ul id="d3df-pageCommentList" class="comments" style="overflow:auto">\n</ul></div></div>\n';
        var HTML_3DF_SIDEBAR_PAGE_COMMENT = '<li class="bgColor3"><a class="avatar" href="#{DIIGO_URL}/user/#{USER}" title="#{USER}" target="_blank"><img alt="#{USER}" src="http://resources.diigo.com/resources_mana/user_avatar?user_name=#{USER}&amp;size=48" /></a><span class="commentInfo color1"><a href="#{DIIGO_URL}/user/#{USER}" target="_blank" class="color1">#{USER} </a>#{DATE}\n\t\t\t</span ><p class="labelList">#{LABELS_HTML}</p><p class="commentBody color2">#{CONTENT}</p></li>\n';
        var HTML_3DF_SIDEBAR_INLINE_COMMENT = '<li class="bgColor3"><a class="avatar" href="#{DIIGO_URL}/user/#{USER}" title="#{USER}" target="_blank"><img alt="#{USER}" src="http://resources.diigo.com/resources_mana/user_avatar?user_name=#{USER}&amp;size=48" /></a><span class="commentInfo color1"><a href="#{DIIGO_URL}/user/#{USER}" target="_blank" class="color1">#{USER} </a>#{DATE}\n\t\t\t</span ><p class="commentBody"><a class="color2" href="#" onclick="diigolet.devil(\'Sidebar\').jumpToHighlight(\'#{HIGHLIGHT_ID}\');return false;">#{CONTENT}</a></p></li>\n';
        var HTML_3DF_SIDEBAR_NO_COMMENTS = '<li class="bgColor3 color1"><div class="noComments">No comments yet</div></li>\n';
        var HTML_3DF_SIDEBAR_HIGHLIGHT = '<li class="highlight"><a class="highlight headingColor2 #{FLOAT_NOTE_CLASS}" href="#" onclick="diigolet.devil(\'Sidebar\').jumpToHighlight(\'#{ID}\');return false;"><span class="jumpTo color1" style="float:right">...Jump to</span><em style="font-style:italic;line-height:24px;width:80%;" class="color2">#{CONTENT}</em></a><ul class="comments bgColor1">#{COMMENTS}\n</ul></li>\n';
        var HTML_CONTEXT_MENU = '<div id="diigolet-csm" class="diigolet diigoletContexMenu"><a href="#" onclick="diigolet.handle(event, \'highlight\')">Highlight</a><a href="#" onclick="diigolet.handle(event, \'highlightAndComment\')">Highlight and Sticky Note</a></div>\n';
        var HTML_ANN_MENU = '<div id="diigolet-annMenu" class="diigolet diigoletContexMenu"><a href="#" id="diigolet-annMenu-add">Add Sticky Notes</a><a href="#" id="diigolet-annMenu-del">Delete</a><a href="#" class="_onlyMy" id="diigolet-annMenu-My">View in my library</a><div class="_onlyMy"><img style="height:2px;width:200px;" src="http://www.diigo.com/javascripts/webtoolbar/images/diigoletToobarSep.png"/></div><a href="#" class="_onlyMy" id="diigolet-context-yellow" color="yellow"><b class="colorItem"><b>Yellow</b></b></a><a href="#" class="_onlyMy" id="diigolet-context-blue" color="blue"><b class="colorItem"><b>Blue</b></b></a><a href="#" class="_onlyMy" id="diigolet-context-green" color="green"><b class="colorItem"><b>Green</b></b></a><a href="#" class="_onlyMy" id="diigolet-context-pink" color="pink"><b class="colorItem"><b>Pink</b></b></a><div id="diigolet-annMenu-tip-before" class="_onlyMy"><img style="height:2px;width:200px;" src="http://www.diigo.com/javascripts/webtoolbar/images/diigoletToobarSep.png"/></div><div id="diigolet-annMenu-tip" style="color:#333;background-color:#ffffcc;padding:0 12px">Tip</div></div>\n';
        var HTML_FLOAT_NOTE = '<div class="diigolet floatNote"><span>10</span></div>\n';
        var HTML_ANN = "";
        var HTML_COMMENT = "";
        var CSS = '.diigolet,.diigolet a,.diigolet em,.diigolet span,.diigolet div,.diigolet dl,.diigolet dt,.diigolet dd,.diigolet ul,.diigolet ol,.diigolet li,.diigolet h1,.diigolet h2,.diigolet h3,.diigolet h4,.diigolet h5,.diigolet h6,.diigolet pre,.diigolet form,.diigolet fieldset,.diigolet p,.diigolet blockquote,.diigolet th,.diigolet td,.diigolet input,.diigolet textarea,.diigolet select,.diigolet *{background:transparent none;padding:0;margin:0;border:#000 0 solid;text-align:left;text-decoration:none;text-transform:none;text-indent:0;line-height:normal;word-break:normal;word-wrap:normal;width:auto;height:auto;color:inherit;font:inherit;float:none;cursor:default;}.diigolet{color:#000;font:normal normal normal 13px arial,helvetica,clean,sans-serif;}.diigolet input,.diigolet textarea,.diigolet select,.diigolet fieldset{background-color:#FFF;border:1px #999 solid;padding:1px;font-size:11px;display:inline;}.diigolet textarea{white-space:normal!important;}.diigolet input.diigo-check{border:none;vertical-align:middle;}.diigolet input.diigo-button{background:#09f url(http://www.diigo.com/images/btn_diigo_1.gif) repeat-x scroll center;border-color:#EEE #4291e3 #4291e3 #eee;border-style:solid;border-width:1px;color:#FFF;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;margin-right:10px;text-align:center;}#diigoletFNSubmit{width:50px;}.diigolet table{border-collapse:collapse;border-spacing:0;width:auto;}.diigolet label{cursor:pointer!important;display:inline;vertical-align:middle;}.diigolet fieldset,.diigolet img{border:0;}.diigolet address,.diigolet caption,.diigolet cite,.diigolet code,.diigolet dfn,.diigolet em,.diigolet strong,.diigolet th,.diigolet var{font-style:normal;font-weight:bold;}.diigolet ol,.diigolet ul,.diigolet li{list-style:none;}.diigolet caption,.diigolet th{text-align:left;}.diigolet h1,.diigolet h2,.diigolet h3,.diigolet h4,.diigolet h5,.diigolet h6{font-weight:bold;}.diigolet q:before,.diigolet q:after{content:\'\';}.diigolet abbr,.diigolet acronym{border:0;}.diigolet a:link,.diigolet a:visited,.diigolet a:hover,.diigolet a:active{text-decoration:none;color:#00F;cursor:pointer!important;}.diigolet a:hover{text-decoration:underline;}#diigolet-tray{position:fixed;top:0;left:10;width:16px;height:16px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv3.gif") no-repeat left -4px;z-index:99998;}.diigolet a.diigolet-Help:link,.diigolet a.diigolet-Help:visited{color:#06F;}.diigolet a.diigolet-Help:hover,.diigo a.diigolet-Help:active{color:#00F;}.diigolet label{margin-left:3px;}.diigolet span.noComments{color:#AAA;font-size:10px;}#diigolet-toolbar{border:none;width:100%;position:absolute;top:0;left:0;z-index:2147483647;color:#333;}#diigolet-tb-content{padding:3px 5px;background:#EFEDDE url(http://www.diigo.com/javascripts/webtoolbar/images/diigolet-toolbar-bg2.gif) repeat scroll 0;}#diigolet-tb-bar span,#diigolet-tb-bar div,#diigolet-tb-bar a,#diigolet-tb-bar em{line-height:24px;}#diigolet-tb-shadow{height:5px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/diigolet-toolbar-shadow.png) repeat-x left top;}* html #diigolet-tb-shadow.ie6{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="http://www.diigo.com/javascripts/webtoolbar/images/diigolet-toolbar-shadow.png");overflow:hidden;background:none;}#diigolet-help{display:none;position:absolute;top:29px;right:10px;width:200px;border:1px #ccc solid;background-color:#FFC;padding:6px 16px 6px 6px;}.diigolet a.diigoletButton{height:24px;float:left;padding-right:4px;cursor:pointer!important;}.diigolet a.diigoletButton:hover{text-decoration:none;color:#000;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3_r.png") no-repeat right top;}.diigolet a.diigoletButton:active{background-position:right bottom;}.diigolet a.diigoletButton b{font-weight:normal;color:#000;line-height:24px;float:left;padding-left:4px;height:24px;}#diigolet-button-highlight-dropdown{width:8px;height:16px;margin-right:4px;background:transparent url(\'http://www.diigo.com/javascripts/webtoolbar/images/down_arrow.gif\') no-repeat scroll left 2px;}#diigolet-button-highlight-dropdown.mouseovered{border-left:1px solid #888;margin-right:0;text-decoration:none;width:11px;height:24px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn4.png") no-repeat left top!important;}#diigolet-button-highlight-dropdown.mouseoveredIe{border-left:1px solid #888;margin-right:1px;text-decoration:none;width:11px;height:24px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn4.png") no-repeat left top!important;}#diigolet-button-highlight-dropdown.checked{border-left:1px solid #888;margin-right:0;text-decoration:none;width:11px;height:24px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn4_s.png") no-repeat left top!important;}#diigolet-button-highlight.mouseovered{text-decoration:none;color:#000;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3_r.png") no-repeat right top!important;}#diigolet-button-highlight.mouseoveredIe{text-decoration:none;color:#000;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3_r.png") no-repeat right top!important;}#diigolet-button-highlight.mouseovered b.outer{background:transparent url(\'http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3.png\') no-repeat left top;}#diigolet-button-highlight.mouseoveredIe b.outer{background:transparent url(\'http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3.png\') no-repeat left top;}a#diigolet-button-highlight b.outer{padding-right:5px;}a#diigolet-button-highlight{padding-right:0!important;}a.diigoletButton:hover b.outer{background:transparent url(\'http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3.png\') no-repeat left top;}a.diigoletButton:active b.outer{background-position:left bottom;}.diigolet a.diigoletButton b b{font-size:12px;padding-left:20px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv3.gif") no-repeat left 50%;}.diigolet a.diigoletButton:active b b{position:relative;top:1px;left:1px;}.diigolet a.diigoletButton.diigoletDisabled{cursor:default;}.diigolet a.diigoletButton.diigoletDisabled b b{color:#999;position:static;}.diigolet a.diigoletButton.diigoletDisabled:hover{background:none transparent;}.diigolet a.diigoletButton.diigoletDisabled:hover b.outer{background:none transparent;}.diigolet a.diigoletButton.checked{background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3_r.png") no-repeat right top;background-position:right bottom;}.diigolet a.diigoletButton.checked b.outer{background:transparent url(\'http://www.diigo.com/javascripts/webtoolbar/images/diigoletBtn3.png\') no-repeat left top;background-position:left bottom;}.diigolet a.diigoletButton.checked b b{position:relative;top:1px;left:1px;}#diigolet-tb-btnSidebar b b{background-position:left -24px;}#diigolet-tb-btnSidebar.toClose b b{background-position:left -48px;}#diigolet-tb-btnBookmark b b{background-position:left -144px;}#diigolet-tb-btnBookmark.saved b b{background-position:left -120px;}#diigolet-button-highlight b b{background-position:left -72px;}#diigolet-button-highlight.dontShow b b{background-position:left -96px;}#diigolet-button-highlight.yellow b b{background-position:left -355px;}#diigolet-button-highlight.blue b b{background-position:left -375px;}#diigolet-button-highlight.green b b{background-position:left -395px;}#diigolet-button-highlight.pink b b{background-position:left -415px;}.diigolet .colorItem{padding-left:20px;height:16px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv3.gif") no-repeat left -440px;}#diigolet-context-yellow b,#diigolet-colorMenu-yellow b{background-position:left -440px;}#diigolet-context-blue b,#diigolet-colorMenu-blue b{background-position:left -460px;}#diigolet-context-green b,#diigolet-colorMenu-green b{background-position:left -480px;}#diigolet-context-pink b,#diigolet-colorMenu-pink b{background-position:left -500px;}#diigolet-context-yellow.colorchecked b,#diigolet-colorMenu-yellow.colorchecked b{background-position:left -520px;}#diigolet-context-blue.colorchecked b,#diigolet-colorMenu-blue.colorchecked b{background-position:left -540px;}#diigolet-context-green.colorchecked b,#diigolet-colorMenu-green.colorchecked b{background-position:left -560px;}#diigolet-context-pink.colorchecked b,#diigolet-colorMenu-pink.colorchecked b{background-position:left -580px;}#diigolet-tb-btnFloatNote b b{background-position:left -167px;}#diigolet-tb-btnTwitter b b{background:transparent url("http://twitter.com/favicon.ico") no-repeat left 50%;}#diigolet-tb-btnComment b b{background-position:left -192px;}#diigolet-tb-btnComment.commented b b{background-position:left -192px;}#diigolet-tb-btnMore b b{background-position:left 0;}#diigolet-tb-btnSignIn b b{background-position:left -264px;}#diigolet-tb-btnHide{float:right;height:24px;width:16px;background:transparent url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv3.gif") no-repeat left -240px;}div.diigoIcon{cursor:pointer!important;margin:0;padding:0;position:absolute;display:none;width:24px!important;z-index:9999;height:23px!important;background:transparent url(\'http://www.diigo.com/client/ietoolbar/edit-highlight.png\') no-repeat left;}div.diigoIcon span{color:#000;display:block;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;line-height:18px;text-align:center;text-shadow:0 1px 1px #FFF;}div.diigoHighlightcommented{display:block!important;}div.ImageIcon{background-color:transparent!important;}div.diigoIcon:hover{background-background:transparent!important;background-repeat:no-repeat!important;background-position:right!important;}div.diigoHighlightcommented.TextIcon{left:0;top:-8px;}div.diigoHighlightcommented.public{background:#FFF url(\'http://www.diigo.com/client/ietoolbar/public-annotation.png\') no-repeat left;}div.diigoHighlightcommented.private{background:#FFF url(\'http://www.diigo.com/client/ietoolbar/private-annotation.png\') no-repeat left;}div.diigoHighlightcommented.group{background:#FFF url(\'http://www.diigo.com/client/ietoolbar/group-annotation.png\') no-repeat left;}#diigolet-toolbar .dropdownMenu{display:none;border:1px solid #999;font:12px arial,helvetica,clean,sans-serif;background-color:Menu;padding:2px 0;z-index:99999;position:absolute;top:30px;width:140px;}#diigolet-toolbar .dropdownMenu a,#diigolet-toolbar .dropdownMenu a:link,#diigolet-toolbar .dropdownMenu a:visited,#diigolet-toolbar .dropdownMenu a:hover,#diigolet-toolbar .dropdownMenu a:active{display:block;padding:2px 12px;font-weight:normal;text-decoration:none;color:#000;background:#fff;cursor:default;}#diigolet-toolbar .dropdownMenu a:hover,#diigolet-toolbar .dropdownMenu a:active{color:#fff;background:#09f;}#diigolet-notify{display:none;position:absolute;top:33px;left:0;border:1px #ccc solid;background-color:#FFC;padding:6px 16px 6px 6px;z-index:99999;}#diigolet-notify.right{left:auto;right:0;text-align:right;}#diigolet-twitter{background-color:threedface;font-family:Arial,sans-serif;font-size:13px;color:windowtext;padding:5px 5px;margin:0;left:0;top:30px;z-index:99998;width:380px;position:static;border:1px #09F solid;border-left-width:0;}#diigolet-twitter input{vertical-align:middle;}#diigolet-twitter input,textarea{font-family:Calibri,Arial,sans-serif;}.twitterlogo{width:210px;height:49px;FILTER:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="http://assets3.twitter.com/images/twitter.png");}#diigolet-tagForward{border:1px #09F solid;border-left-width:0;width:460px;position:static;left:0;top:30px;z-index:99998;background-color:#FFF;}#diigolet-tagForward .tabContainer{text-align:center;margin:5px;}#diigolet-tagForward .tab{margin-right:8px;margin-left:8px;padding:0 8px 2px 8px;font-weight:bold;}#diigolet-tagForward .tabContainer a:link,#diigolet-tagForward .tabContainer a:visited{padding:4px;border:1px #fff solid;font-weight:bold;color:#06c;text-decoration:none;}#diigolet-tagForward .tabContainer a.active:link,#diigolet-tagForward .tabContainer a.active:visited{border:none;background-color:#09f;color:#fff;padding:5px;}#diigolet-tagForward .tabContainer a:hover,#diigolet-tagForward .tabContainer a:active{border:1px #09f solid;}#diigolet-tagForward div.tabContent{display:none;}#diigolet-tagForward div.tabContent.active{display:block;}#diigolet-tagForward .diigo-hr{width:420px;border-top:1px #ccc solid;margin:0 auto;height:1px;overflow:hidden;}.diigolet .diigo-table{margin:10px 20px;}.diigolet .diigo-table td{padding:2px 0;}.diigolet .diigo-table th{color:#666;font-weight:bold;padding-right:5px;width:62px;text-align:left;font-size:12px;}.diigolet .diigolet-input{width:350px;padding:1px;font-size:11px;}#Diigo-Bookmark-Description,#Diigo-Forward-PS{width:350px;height:65px;margin:5px 0;}.diigolet .diigolet-submit{width:140px;height:25px;text-align:center;}#diigolet-txtPermalink{background-color:#eee;padding:3px;font-size:13px;}.diigoletContexMenu{border:1px solid #999;font:12px arial,helvetica,clean,sans-serif;padding:2px;background-color:Menu;z-index:99997;}.diigoletContexMenu a:link,.diigoletContexMenu a:visited{display:block;padding:2px 12px;text-decoration:none;color:#000;cursor:default;white-space:nowrap;}.diigoletContexMenu a:hover,.diigoletContexMenu a:active{color:#fff;background:#09f;}*html .diigoletContexMenu ._selection a{width:45px;}*html .diigoletContexMenu ._highlight a{width:90px;}.diigolet.diigoletFN{z-index:99995;}.diigolet.diigoletFN a:link,.diigolet.diigoletFN a:visited{color:#06c;}.diigolet.diigoletFN a:hover,.diigolet.diigoletFN a:active{color:#333;text-decoration:none;}.diigolet .diigoletFNL{width:21px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_l.png) no-repeat left top;}.diigolet .diigoletFNT{height:32px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_t.png) no-repeat right top;cursor:move!important;}.diigolet .diigoletFNR{width:16px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_r.png) no-repeat left bottom;overflow:hidden;vertical-align:bottom;}.diigolet .diigoletFNB{height:34px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_b.png) no-repeat left bottom;}.diigolet .diigoletFNTH{vertical-align:top;width:12px;}.diigolet .diigoletFNTH div{width:12px;height:12px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_h_rt.gif) no-repeat right top;position:relative;top:5px;left:-22px;overflow:hidden;cursor:ne-resize!important;}.diigolet .diigoletFNB{vertical-align:top;overflow:hidden;}.diigolet .diigoletFNPosN .diigoletFNXjjR,.diigolet .diigoletFNPosN .diigoletFNXjjT,.diigolet .diigoletFNPosN .diigoletFNXjjB,.diigolet .diigoletFNPosN .diigoletFNTH div,.diigolet .diigoletFNPosN .diigoletFNB div{display:none;}.diigolet .diigoletFNT h1{font:12px/19px Arial,Helvetica,sans-serif;font-weight:bold;color:#666;margin:5px 0 0 5px;padding:0;}.diigolet .diigoletFNT div.menu{margin:3px 25px 10px 0;background-color:#fff9a4;border-right:1px solid #f2e984;border-left:1px solid #c9b822;}.diigolet .diigoletFNT div.menu a{display:block;line-height:19px;float:left;color:#666;padding:0 5px;border-right:1px solid #c9b822;text-decoration:none;}.diigolet .diigoletFNT div.menu a:hover,.diigolet .diigoletFNT div.menu a:active{background-color:#fff587;color:#333;}.diigolet .diigoletFNT div.menu a.diigoletFNOpt{background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_downdot.gif) no-repeat right top;padding-right:14px;}.diigolet .diigoletFNT{font:12px/32px Arial,Helvetica,sans-serif;}.diigolet .diigoletFNContent,.diigolet .diigoletFNComment{background-color:#fff89f;color:#666;font-family:Arial,Helvetica,sans-serif;font-size:11px;overflow:auto;zoom:1;border-bottom:1px solid #E0DB9D;}.diigolet .diigoletFNContent .diigoletFNAuthorP{font-size:10px;font-weight:normal;color:#666;margin:0 11px 5px 0;padding:2px 5px;line-height:100%;}.diigolet .diigoletFNContent .diigoletFNAuthorP .diigoletFNAuthor{border-bottom:1px dotted #ccc;color:#06c;}.diigolet .diigoletFNContent .diigoletFNAuthorP .diigoletFNAuthor:hover,.diigoletFNContent .diigoletFNAuthorP .diigoletFNAuthor:active{border-bottom:1px solid #ccc;color:#333;}.diigolet .diigoletFNContent .diigoletFNAuthorP a{color:#999;}.diigolet .diigoletFNContent .diigoletFNAuthorP a:hover,.diigoletFNContent .diigoletFNAuthorP a:active{color:#666;}.diigolet.diigoletFN blockquote{color:#333;font-size:12px;padding:0 5px;}.diigolet .diigoletFNComment select,.diigolet .diigoletFNComment input,.diigolet .diigoletFNComment textarea{font:11px/15px Verdana,Arial,Helvetica,sans-serif;}.diigolet .diigoletFNComment p{margin:5px 0;}.diigolet .diigoletFNTDiv{height:32px;overflow:hidden;}.diigolet.diigoletFN .menu{float:right;height:19px;overflow:hidden;}.diigolet .labelList label{margin-right:2px;background-color:#eee;color:#666;white-space:nowrap;font-weight:normal;font-size:9px;}.diigolet .labelList span{padding:0 2px;}.diigolet .labelList a{padding:0 2px;background-color:#ffe76a;}.diigolet .labelList a:hover{color:#fef5c7;text-decoration:none;}.diigolet .labelList a.del{border:none;padding-right:2px;font-weight:normal;}.diigolet a.del{cursor:pointer;background:url("http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv3.gif") no-repeat left -343px;}.diigolet a.del:hover{filter:alpha(opacity=100);-moz-opacity:1;background-position:1px -342px;text-decoration:none;}.diigolet ul.diigoletFNDropdown{position:absolute;display:none;left:10px;background-color:#fff89f;border:1px solid #c9b822;z-index:99999;}.diigolet ul.diigoletFNDropdown li{padding-left:25px;}.diigolet ul.diigoletFNDropdown a:link,.diigolet ul.diigoletFNDropdown a:visited{color:#666;display:block;width:85px;font:11px Arial,Helvetica,sans-serif;}.diigolet ul.diigoletFNDropdown a:hover,.diigolet ul.diigoletFNDropdown a:active{background-color:#fff567;color:#333;}.diigolet.diigoletFNIEPatch .diigoletFNL{background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_l.gif) no-repeat left top;}.diigolet.diigoletFNIEPatch .diigoletFNT{background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_t.gif) no-repeat right top;}.diigolet.diigoletFNIEPatch .diigoletFNR{background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_r.gif) no-repeat left bottom;}.diigolet.diigoletFNIEPatch .diigoletFNB{background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/float_note_b.gif) no-repeat left bottom;}.diigolet.diigoletFNIEPatch .diigoletFNT{height:23px;}.diigolet.diigoletFNIEPatch .diigoletFNTDiv{height:23px;}.diigoletFN.editing .diigoletFNComment{display:block;}.personalText{color:#555!important;font-size:10px!important;}.IconFeild{float:left!important;margin-left:8px!important;margin-top:5px!important;}.IconFeild:hover .editIcon{background-position:right!important;}.editIcon{cursor:pointer!important;width:24px!important;height:19px!important;background-image:url(\'http://www.diigo.com/client/ietoolbar/edit-highlight-2.png\')!important;background-attachment:no-repeat!important;background-color:transparent!important;background-position:left;}.multipalCol{padding-top:0!important;}.singleCol{padding-top:7px!important;}.myCommentSpan{margin-left:35px!important;}.notMyCommentSpan{margin-left:15px!important;}.footText{line-height:1.5;}div.floatNote{position:absolute!important;width:29px;height:36px;text-align:center;background:transparent url(\'http://www.diigo.com/javascripts/webtoolbar/images/float_icon.png\') no-repeat 50% 50%!important;z-index:9996;}div.floatNote span{color:#000;font:bold 13px Arial,Helvetica,sans-serif;cursor:default;line-height:37px;text-shadow:#fff 0 1px 0;}html div.floatNote{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="http://www.diigo.com/javascripts/webtoolbar/images/float_icon.png");overflow:hidden;background:none;}em.diigoHighlight{text-align:inherit;text-decoration:inherit;line-height:inherit;font:inherit;color:inherit;display:inline;position:relative;zoom:1;}em.diigoHighlight.diigoHighlightcommented{padding-left:25px;}em.diigoHighlight.mouseOvered{background-color:#ffc62a!important;}em.diigoHighlight.yellow{background-color:#FF9;}img.diigoHighlight.yellow{cursor:pointer;outline:2px solid #FF9!important;}em.diigoHighlight.blue{background-color:#ABD5FF;}img.diigoHighlight.blue{cursor:pointer;outline:2px solid #ABD5FF!important;}em.diigoHighlight.green{background-color:#B2E57E;}img.diigoHighlight.green{cursor:pointer;outline:2px solid #B2E57E!important;}em.diigoHighlight.pink{background-color:#fcc;}img.diigoHighlight.pink{cursor:pointer;outline:2px solid #fcc!important;}img.diigoHighlight.mouseOvered{cursor:pointer;outline:2px solid #ffc62a!important;}.diigolet .diigolet-closeBtn{position:absolute;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/close1.gif);width:14px;height:14px;top:2px;right:2px;cursor:pointer!important;}.ac_results{border:1px solid #000;background:#EEE none repeat scroll 0;cursor:pointer!important;font-size:11px;left:0;position:absolute;width:200px;z-index:99999;}.ac_results ul{margin:0;padding:0;}.ac_results li{list-style-image:none;list-style-position:outside;list-style-type:none;padding:2px 5px;}.ac_results a{width:100%;}.ac_results li.over{background:#ccf none repeat scroll 0;}#d3df-sidebar{border:1px #ccc solid;z-index:99997;}#d3df-sidebar div.heading{padding:3px;font-size:13px;border-top:1px #E8EEF7 solid;font-weight:bold;zoom:1;}#d3df-sidebar div.popOut{width:16px;height:16px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/popout.gif) no-repeat scroll left top;cursor:pointer;}#d3df-sidebar div.popOut.popIn{background-image:url(http://www.diigo.com/javascripts/webtoolbar/images/popin.gif);}#d3df-sidebar div.popOut.close{background-image:url(http://www.diigo.com/javascripts/webtoolbar/images/close1.gif);}#d3df-sidebar div.heading a.add{background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv1.gif) no-repeat scroll left -172px;padding-left:18px;display:block;float:right;font-weight:normal;}#d3df-sidebar a.togglePanel{background:transparent url(http://www.diigo.com/images/v2/eoc.gif) no-repeat scroll left top;display:block;float:right;width:16px;height:16px;}#d3df-sidebar a.togglePanel.collapsed{background-position:left bottom;}#d3df-sidebar ul,#d3df-sidebar ul li{list-style:none;overflow:hidden;zoom:1;}#d3df-sidebar li.highlight a.highlight{overflow:hidden;height:24px;zoom:1;}#d3df-sidebar ul.highlights li{margin:1px;}#d3df-sidebar ul.comments li{margin:1px;padding:2px;}#d3df-sidebar div.noComments{font-size:11px;text-align:center;padding:15px 5px;}#d3df-sidebar p.commentBody,#d3df-sidebar p.commentBody a{font-size:11px;}#d3df-sidebar a.avatar{float:left;margin-right:3px;}#d3df-sidebar a.avatar img{padding:1px;border:1px #CCC solid;width:32px;height:32px;}#d3df-sidebar .commentInfo{font-size:12px;}#d3df-sidebar .commentInfo a{border-bottom:1px dotted #999;}#d3df-sidebar a.highlight{line-height:24px;padding-left:18px;display:block;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv1.gif) no-repeat scroll left -192px;}#d3df-sidebar a.floatNote{padding-left:16px;background:transparent url(http://www.diigo.com/javascripts/webtoolbar/images/diigoletIconv1.gif) no-repeat scroll left -144px;}#d3df-sidebar a.highlight .jumpTo{line-height:24px;padding-left:5px;font-size:12px;font-style:italic;}#d3df-sidebar.themeDefault .bgColor1{background-color:#C3D9FF;}#d3df-sidebar.themeDefault .bgColor2{background-color:#E8EEF7;}#d3df-sidebar.themeDefault .bgColor3{background-color:#FFF;}#d3df-sidebar.themeDefault .color1{color:#999;}#d3df-sidebar.themeDefault .color2{color:#333;}';
        var MSG_HIGHLIGHT_LENGTH = "The number of highlighted non white space characters needs to be between 5 and 2000. Please select some text and try again.";
        var MSG_HOMEPAGE_RESTRICTION = "To minimize graffiti, highlight and sticky notes are not allowed on homepages of websites. You can still use page comments however.";
        var MSG_LOADING = "Loading...";
        var MSG_COMMENT_CANNOT_BE_EMPTY = "Please input content.";
        var MSG_NEED_TO_SIGNIN = 'Please <a href="#" title="Sign in into Diigo.com" onclick="return diigolet.handle(event, \'tb_signIn\')">sign in</a> first.';
        var MSG_NO_COMMENTS = "There are no public comments on this page.";
        var MSG_HIGHLIGHT_NOT_FOUND = "No corresponding text is found on the page. This page has probably been changed since you highlighted it.";
        var DIIGO_SERVER = "http://www.diigo.com";
        var DIIGO_DATA_SERVER = "http://toolbar3.diigo.com";
        var DIIGO_GROUP_SERVER = "http://groups.diigo.com";
        var ID_TOOLBAR = "#diigolet-toolbar";
        var ID_TRAY = "#diigolet-tray";
        var ID_DLG_BOOKMARK = "#diigolet-tagForward";
        var ID_DLG_IC = "#diigolet-dlg-sticky";
        var ID_CONTEXT_MENU = "#diigolet-contexMenu";
        var ID_NOTIFY = "#diigolet-notify";
        var PRIVACY_MODE_PUBLIC = 0,
        PRIVACY_MODE_PRIVATE = 2,
        PRIVACY_MODE_GROUP = 3,
        BOOKMARK_TYPE_WEBPAGE = 1,
        BOOKMARK_TYPE_IMAGE = 2,
        BOOKMARK_TYPE_FLASH = 3,
        BOOKMARK_TYPE_VIDEO = 4,
        BOOKMARK_TYPE_LIST = 10,
        ANNOTATION_TYPE_TEXT = 0,
        ANNOTATION_TYPE_IMAGE = 1,
        ANNOTATION_TYPE_FLOATNOTE = 2,
        ANNOTATION_TYPE_FLASH = 3,
        ANNOTATION_TYPE_VIDEO = 4,
        ANNOTATION_TYPE_CLIP = 5;
        ANNOTATION_TYPE_ICON = 9;
        D.urls = {
            getUserBookmarksPageURL: function(user) {
                return DIIGO_SERVER + "/user/" + (user || Ctx.user)
            },
            getCreateGroupURL: function() {
                return DIIGO_GROUP_SERVER + "/create"
            },
            getCreateListURL: function() {
                return DIIGO_SERVER + "/bookmark_list/new_list"
            },
            getGroupURL: function(group) {
                var url = DIIGO_GROUP_SERVER;
                return group ? url + "/groups/" + group : url
            },
            getGroupHome: function() {
                return DIIGO_GROUP_SERVER + "/user/" + Ctx.user
            },
            getListHome: function() {
                return DIIGO_SERVER + "/list/" + Ctx.user
            },
            getNetwork: function() {
                return DIIGO_SERVER + "/network/" + Ctx.user
            },
            getHotBookmark: function() {
                return DIIGO_SERVER + "/buzz/hot"
            },
            getUserHomepageURL: function(user) {
                return this.getUserProfileURL(user)
            },
            getUserProfileURL: function(user) {
                user = user || Ctx.user;
                return DIIGO_SERVER + "/profile/" + user
            }
        };
        D.handlers = {
            tb_showDropDownMenu: function(e, id) {
                $("#diigolet-help,#diigolet-toolbar .dropdownMenu").hide();
                if (id == "#diigolet-tb-signInMenu" && Ctx.signedIn) {
                    return
                }
                var j = $(e.target);
                j = j.add(j.parents("a")).filter(".diigoletButton");
                if ($.browser.msie && $.browser.version >= 9) {
                    tbar = $("#diigolet-toolbar");
                    mouseOutAndHide($(id).css({
                        left: j.offset().left,
                        top: $(document).scrollTop() + 25
                    }).show())
                } else {
                    mouseOutAndHide($(id).css({
                        left: j.offset().left
                    }).show())
                }
            },
            tb_viewComments: function() {
                Sidebar.popOut({
                    top: 35,
                    left: 3
                })
            },
            tb_signIn: function() {
                if (Ctx.signedIn) {
                    WebAPI.signOut()
                } else {
                    WebAPI.signIn()
                }
            },
            hideToolbar: function() {
                Toolbar.hide()
            },
            showHelp: function(e) {
                $("#diigolet-toolbar .dropdownMenu").hide();
                if ($.browser.msie && $.browser.version >= 9) {
                    tbar = $("#diigolet-toolbar");
                    mouseOutAndHide(Toolbar.jHelpTip.css({
                        top: tbar.offset().top + tbar.height() - 5
                    }).show())
                } else {
                    mouseOutAndHide(Toolbar.jHelpTip.show(), 500)
                }
            },
            hideHelp: function() {
                $("#diigolet-help").hide()
            },
            mouseOnBorder: function(event) {
                Toolbar.show()
            },
            OnTwitterMsgChange: function() {
                Post2Twitter.onMessageChanged()
            },
            bookmark: function() {
                if (!requireSignIn()) {
                    return
                }
                DlgBookmark.shown ? DlgBookmark.hide() : DlgBookmark.show()
            },
            overHighlight: function() {
                if (!Ctx.isHighlightPen) {
                    $("#diigolet-button-highlight").toggleClass(Ctx.mouseClass, true);
                    $("#diigolet-button-highlight-dropdown").toggleClass(Ctx.mouseClass, true)
                }
            },
            outHighlight: function() {
                if (!Ctx.isHighlightPen) {
                    $("#diigolet-button-highlight").toggleClass(Ctx.mouseClass, false);
                    $("#diigolet-button-highlight-dropdown").toggleClass(Ctx.mouseClass, false)
                }
            },
            dropDownColorMenu: function() {
                $("#diigolet-help,#diigolet-toolbar .dropdownMenu").hide();
                var j = $("#diigolet-button-highlight");
                $.each(Ctx.defaultColor, function(i, v) {
                    $id("diigolet-colorMenu-" + v).toggleClass("colorchecked", false)
                });
                if (Ctx.penColor && Ctx.penColor.length > 0) {
                    $id("diigolet-colorMenu-" + Ctx.penColor).toggleClass("colorchecked", true)
                } else {
                    $id("diigolet-colorMenu-yellow").toggleClass("colorchecked", true)
                }
                if ($.browser.msie && $.browser.version >= 9) {
                    mouseOutAndHide($("#diigolet-tb-colorMenu").css({
                        left: j.offset().left,
                        top: $(document).scrollTop() + 25
                    }).show())
                } else {
                    mouseOutAndHide($("#diigolet-tb-colorMenu").css({
                        left: j.offset().left
                    }).show())
                }
            },
            diigoTwitterit: function() {
                if (!requireSignIn()) {
                    return
                }
                Post2Twitter.shown ? Post2Twitter.hide() : Post2Twitter.show()
            },
            bmOnSubmitAndClose: function(evt) {
                DlgBookmark.submitAndClose()
            },
            bmCancel: function() {
                DlgBookmark.hide(true)
            },
            TwitterPost: function() {
                Post2Twitter.Post()
            },
            TwitterCancel: function() {
                Post2Twitter.hide(true)
            },
            highlight: function() {
                if (!requireSignIn()) {
                    return
                }
                var sel = H.checkSelection();
                debug("[highlight]", sel);
                if (sel.ok) {
                    debug("[highlight] Making a text highlight");
                    var data = {
                        user: Ctx.user,
                        realName: Ctx.realName,
                        content: sel.html,
                        type: ANNOTATION_TYPE_TEXT,
                        nth: sel.nth
                    };
                    var ann = Annotation.add(data);
                    if ($.browser.msie) {
                        document.selection.empty()
                    }
                } else { if (sel.pen) {
                        diigolet.handle(true, "TogglePen")
                    } else {
                        Toolbar.notify(sel.msg)
                    }
                }
                return ann
            },
            TogglePen: function() {
                Ctx.isHighlightPen = !Ctx.isHighlightPen;
                var btn = $("#diigolet-button-highlight");
                btn.toggleClass("checked");
                if (Ctx.isHighlightPen) {
                    $("#diigolet-button-highlight b b").text("Highlighter")
                } else {
                    $("#diigolet-button-highlight b b").text("Highlight")
                }
                $("#diigolet-button-highlight-dropdown").toggleClass("checked");
                if (Ctx.isHighlightPen) {
                    btn.toggleClass(Ctx.mouseClass, false);
                    $("#diigolet-button-highlight-dropdown").toggleClass(Ctx.mouseClass, false)
                } else {
                    btn.toggleClass(Ctx.mouseClass, true);
                    $("#diigolet-button-highlight-dropdown").toggleClass(Ctx.mouseClass, true)
                }
                function changeClass() {
                    $(document.body).toggleClass("diigoHiPen");
                    $(document.body).toggleClass(Ctx.penColor)
                }
                changeClass()
            },
            ChangeColor: function(event, color) {
                try {
                    $("#diigolet-button-highlight").toggleClass(Ctx.penColor, false);
                    Ctx.penColor = color;
                    $.each(Ctx.defaultColor, function(i, v) {
                        $(document.body).toggleClass(v, false);
                        $id("diigolet-colorMenu-" + v).toggleClass("colorchecked", false)
                    });
                    $id("diigolet-colorMenu-" + color).toggleClass("colorchecked", true);
                    $("#diigolet-button-highlight").addClass(Ctx.penColor);
                    if (Ctx.isHighlightPen) {
                        $(document.body).addClass(color)
                    }
                } catch(e) {}
            },
            highlightAndComment: function(e) {
                var ann = D.handle(e, "highlight");
                if (!ann) {
                    return
                }
                ann.jumpHere(false, true)
            },
            showHideHighlight: function(e) {
                Ctx.toggleSilent()
            },
            addStickyNote: function() {
                if (!requireSignIn() || DlgIC.editing) {
                    return
                }
                var data = {
                    user: Ctx.user,
                    realName: Ctx.realName,
                    content: "",
                    type: ANNOTATION_TYPE_FLOATNOTE
                };
                var ann = Annotation.add(data, {
                    dontSave: true
                });
                ann.jumpHere(false, true)
            },
            hlmenu_mousedown: function() {
                return $.browser.opera
            },
            dlgIC_del_ic: function(event, id, groupName) {
                DlgIC.onclick_del_ic(event, id, groupName)
            },
            sb_del_pc: function(event, id, groupName) {
                Sidebar.onclick_del_pc(event, id, groupName)
            }
        };
        D.handle = function(event, handler) {
            var event = $.event.fix(event || window.event);
            event.preventDefault();
            return D.handle2.apply(null, [handler, event].concat([].slice.call(arguments, 2)))
        };
        D.handle2 = function(handler) {
            var args = [].slice.call(arguments, 1);
            return D.handlers[handler].apply(null, args)
        };
        function isHomePage(url) {
            var p = new Poly9.URLParser(url.toLowerCase()).getPathname();
            if (!p || p == "/") {
                return true
            }
            var m = p.match(/^\/([^\.]+)\.(.*)$/);
            return m && m.length == 3 ? ["default", "index", "home"].indexOf(m[1]) > -1 && ["htm", "html", "shtml", "php", "jsp", "asp", "aspx", "cfm"].indexOf(m[2]) > -1 : false;
            return true
        }
        function publicAnnotationsAllowed(url) {
            return true
        }
        function mouseOutAndHide(j, timeout) {
            timeout = timeout === undefined ? 850 : timeout;
            j = $(j).unbind("mouseout").unbind("mouseover");
            if (j[0]) {
                clearTimeout(j[0]._hideTimerId)
            }
            j.bind("mouseout", function() {
                j[0]._hideTimerId = setTimeout(function() {
                    j.hide()
                },
                timeout)
            }).bind("mouseover", function() {
                clearTimeout(j[0]._hideTimerId)
            })
        }
        function checkSignIn() {
            return Ctx.signedIn
        }
        function hasSignedIn() {
            return Ctx.signedIn && Ctx.user
        }
        function requireSignIn() {
            return checkSignIn() || (Toolbar.notify(MSG_NEED_TO_SIGNIN, 1000), false)
        }
        var clickedOnDiigolet = false;
        function pay4Sin() {
            forEach([DlgBookmark, Post2Twitter, DlgIC, Toolbar, Csm, AnnotationContextMenu, Sidebar], function(v) {
                if (!v.j) {
                    return
                }
                var f = (function(v) {
                    return function() {
                        v.clickedOn = true;
                        clickedOnDiigolet = true
                    }
                })(v);
                v.j.unbind().bind("mouseup", f).bind("mousedown", f).bind("keydown", function(e) {
                    e.stopPropagation()
                })
            });
            jDoc.mouseup(doc_mouseup).mouseover(ann_mouseover).mouseout(ann_mouseout)
        }
        function setupAutocomplete() {
            var options = {
                resultsClass: "diigolet ac_results",
                data: Ctx.myTags,
                mode: "multiple",
                multipleSeparator: " ,",
                onItemSelect: function() {
                    DlgBookmark.clickedOn = true
                }
            };
            new AutoComplete("#Diigo-Bookmark-Tag", options)
        }
        function ann_mouseover(event, ann) {
            var z = this;
            if (Ctx.draggingFloatNote) {
                return
            }
            var hInfo = Highlighter.isHighlightElement(event.target);
            if (hInfo) {
                var id = hInfo.ids[0];
                var ann = Annotation.find(id);
                ann.activate(true);
                if (ann.comments.length == 0) {
                    var IconAnnChanged = AnnotationHeader.ann != ann;
                    if (hInfo.type == ANNOTATION_TYPE_TEXT || hInfo.type == ANNOTATION_TYPE_IMAGE) {
                        if (IconAnnChanged || !AnnotationHeader.shown) {
                            AnnotationHeader.reset(ann);
                            AnnotationHeader.scheduleShow(event, ann)
                        } else {
                            AnnotationHeader.cancelHide();
                            AnnotationHeader.cancelToggleEdit()
                        }
                    }
                } else { if (hInfo.type == ANNOTATION_TYPE_FLOATNOTE || hInfo.type == ANNOTATION_TYPE_ICON) {
                        AnnotationHeader.removeEditMode();
                        AnnotationHeader.ann = null;
                        var annChanged = DlgIC.ann != ann;
                        if (!DlgIC.pinned && !DlgIC.editing) {
                            if (annChanged || !DlgIC.shown) {
                                DlgIC.scheduleShow(event, ann)
                            } else {
                                DlgIC.cancelHide()
                            }
                        }
                    }
                }
                if (ann.comments.length > 0 && (hInfo.type == ANNOTATION_TYPE_TEXT || hInfo.type == ANNOTATION_TYPE_IMAGE)) {
                    AnnotationHeader.reset(ann);
                    AnnotationHeader.scheduleToggleEdit(true)
                }
            }
        }
        function ann_mouseout(event, ann) {
            var z = this;
            if (Ctx.draggingFloatNote) {
                return
            }
            var hInfo = Highlighter.isHighlightElement(event.target);
            if (hInfo) {
                var id = hInfo.ids[0];
                var ann = Annotation.find(id);
                ann.activate(false);
                if (!DlgIC.pinned && !DlgIC.editing && DlgIC.aboutToShow()) {
                    DlgIC.scheduleHide()
                }
                if (AnnotationHeader.aboutToShow() && ann.comments.length <= 0) {
                    AnnotationHeader.scheduleHide()
                }
                AnnotationHeader.scheduleToggleEdit(false)
            }
        }
        function doc_mouseup(event) {
            if (!Toolbar.clickedOn) {
                $("#diigolet-toolbar .dropdownMenu").hide()
            }
            if (!clickedOnDiigolet) {
                DlgIC.hide()
            }
            if (DlgIC.shown && !DlgIC.clickedOn && !DlgIC.pinned) {
                DlgIC.hide()
            }
            if (!Ctx.silent && checkSignIn() && !clickedOnDiigolet && Hiliter.isTextSelected()) {
                if (Ctx.isHighlightPen) {
                    diigolet.handle(event, "highlight")
                } else {
                    Csm.show(event, "selection")
                }
            } else {
                Csm.hide();
                AnnotationContextMenu.hide()
            }
            AnnotationHeader.scheduleHide();
            Toolbar.clickedOn = Post2Twitter.clickedOn = DlgBookmark.clickedOn = ContextMenu.clickedOn = DlgIC.clickedOn = clickedOnDiigolet = false
        }
        function onSignIn(username) {
            debug("onSignIn");
            Ctx.reset();
            Ctx.user = username;
            Ctx.signedIn = true;
            Sidebar.onSignIn();
            Toolbar.onSignIn();
            WebAPI.loadMyStuff()
        }
        function onSignOut() {
            debug("onSignOut");
            Ctx.reset();
            Sidebar.onSignOut();
            Toolbar.onSignOut();
            Ctx.unpaintAllAnnotations();
            WebAPI.loadBookmark()
        }
        var Ctx = {
            isCommented: function() {
                return this.isAnnotated()
            },
            isAnnotated: function() {
                return (this.bookmark.annotated || this.pageComments.length > 0 || this.annotations.length > 0)
            },
            toggleSilent: function(silent) {
                silent = silent === undefined ? !this.silent : silent;
                if (silent == this.silent) {
                    return
                }
                this.silent = silent;
                if (silent) {
                    this.unpaintAllAnnotations()
                } else {
                    this.paintAllAnnotations()
                }
            },
            resetData: function() {
                extend(this, {
                    user: "",
                    userId: null,
                    realName: "",
                    userLevel: 0,
                    isHighlightPen: false,
                    penColor: "yellow",
                    mouseClass: "mouseovered",
                    defaultColor: ["yellow", "blue", "green", "pink"],
                    signedIn: false,
                    launchMode: {
                        normal: diigoletLaunchMode == 0,
                        permalink: diigoletLaunchMode == 3,
                        pagePlayer: diigoletLaunchMode == 5
                    },
                    permalinkParams: null,
                    silent: false,
                    bookmark: Bookmark.fromDocument(),
                    selectionResult: null,
                    annotations: [],
                    pageComments: [],
                    currentHighlight: "",
                    myTags: [],
                    myBmList: [],
                    myGroups: []
                });
                var lm = Ctx.launchMode;
                if (lm.permalink) {
                    Ctx.permalinkParams = {
                        user: window.diigo_permalink_user,
                        key: window.diigo_permalink_key,
                        mode: diigo_permalink_mode,
                        url: diigo_bookmark_url,
                        legacy: diigo_permalink_legacy
                    }
                }
                if (window.diigo_bookmark_url) {
                    this.bookmark.url = window.diigo_bookmark_url
                }
            },
            reset: function() {
                this.resetData();
                return
            },
            paintAllAnnotations: function() {
                forEach(this.annotations, function(ann) {
                    ann.paint()
                })
            },
            unpaintAllAnnotations: function() {
                forEach(this.annotations, function(ann) {
                    ann.unpaint()
                })
            }
        };
        IEventDispatcher.mixin(Ctx);
        var FixPosition = {
            lastScroll: [0, 0],
            start: function() {
                var z = this;
                function f() {
                    var t = jWin.scrollTop(),
                    l = jWin.scrollLeft();
                    Toolbar.j.add("#diigolet-tray").css({
                        top: t,
                        left: l
                    });
                    DlgBookmark.j.css({
                        top: t + 30,
                        left: l
                    });
                    var j;
                    if (Sidebar.floating && (j = Sidebar.j)) {
                        j.css({
                            left: parseInt(j.css("left")) + l - z.lastScroll[0],
                            top: parseInt(j.css("top")) + t - z.lastScroll[1]
                        })
                    }
                    z.lastScroll[0] = l;
                    z.lastScroll[1] = t
                }
                jWin.bind("scroll", f).bind("resize", f);
                f()
            }
        };
        var Dimension = {
            docScroll: function() {
                return[jWin.scrollLeft(), jWin.scrollTop()]
            },
            docSize: function() {
                return[jDoc.width(), jDoc.height()]
            }
        };
        var ContextMenu = {
            ele: null,
            shown: false,
            init: function() {},
            destroy: function() {},
            show: function(event, which) {
                if (!checkSignIn()) {
                    return
                }
                if (Ctx.launchMode.threeDForum && which == "selection") {
                    which = "selection_3df"
                }
                var t = this.ele;
                this.shown = true;
                t.find(">div").css({
                    display: "none"
                });
                t.find("." + ({
                    selection: "_selection",
                    highlight: "_highlight",
                    selection_3df: "_selection_3df"
                })[which]).show();
                var h = Ctx.currentHighlight;
                if (h && h.comments.length == 0) {
                    t.find("a._del")[h.user == Ctx.user ? "show" : "hide"]()
                }
                t.css({
                    left: event.pageX + 3,
                    top: event.pageY + 3
                }).show()
            },
            hide: function() {
                this.shown = false;
                this.ele.hide()
            },
            create: function() {
                this.ele = $(HTML_CONTEXT_MENU).css({
                    position: "absolute"
                }).hide().appendTo(document.body).hide()
            }
        };
        function addCss() {
            var bodyId = document.body.id = document.body.id || "bodyid";
            var cssText = "",
            m;
            var pattern = /([^{}]*)({[^{}]*})/g;
            while (m = pattern.exec(CSS)) {
                cssText += ($.map(m[1].split(","), function(v) {
                    if (/(^|\s)html(\s|$)/.test(v)) {
                        return v.replace("html", "html body#" + bodyId)
                    }
                    if (/(^|\s)body(\s|$)/.test(v)) {
                        return v.replace("body", "body#" + bodyId)
                    }
                    return "body#" + bodyId + " " + v
                }).join(",") + m[2] + "\n")
            }
            document.createStyleSheet ? document.createStyleSheet().cssText = cssText : $("head, body").add(document.body).eq(0).append($(document.createElement("style")).attr({
                type: "text/css"
            }).text(cssText));
            $("head, body").add(document.body).eq(0).append($(document.createElement("link")).attr({
                rel: "stylesheet",
                href: "http://www.diigo.com/client/ietoolbar/pageCss.css"
            }))
        }
        D.run = function() {
            $("#diigoDivLoading").remove();
            Ctx.reset();
            if ($.browser.ieBelow8) {
                Ctx.mouseClass = "mouseoveredIe"
            }
            addCss();
            forEach([Toolbar, Sidebar, Post2Twitter, DlgBookmark, DlgIC, Csm, AnnotationContextMenu], function(a) {
                a.init()
            });
            if (!Ctx.launchMode.threeDForum) {
                $html(HTML_TRAY).css({
                    position: $.browser.supportPositionFixed ? "fixed" : "absolute"
                }).appendTo(document.body)
            }
            if (!$.browser.supportPositionFixed) {
                FixPosition.start()
            }
            if ($.browser.ieBelow7) {
                document.execCommand("BackgroundImageCache", false, true)
            }
            WebAPI.loadBookmark();
            pay4Sin();
            if (!window.__diigolet_hidden) {
                Toolbar.show()
            }
            if (Ctx.launchMode.threeDForum) {
                $("#diigolet-tb-content,#diigolet-tb-shadow").hide()
            }
        };
        D.runAway = function() {
            Ctx.reset();
            forEach([DlgBookmark, Post2Twitter, DlgIC, Sidebar], function() {
                v.destroy()
            });
            delete window.diigolet
        };
        var ParseTags = {
            quoteTag: function(tag) {
                tag = tag.replace(/"/g, "'").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
                if (tag.match(/\s+|,/)) {
                    tag = '"' + tag + '"'
                }
                return tag
            },
            parseTags: function(strTags, validate) {
                var stack = [],
                tags = [];
                var begin_delimiter = false;
                for (var i = 0, len = strTags.length, c; c = strTags.charAt(i), i < len; i++) {
                    if (c == '"') {
                        if (!begin_delimiter) {
                            begin_delimiter = true
                        } else {
                            begin_delimiter = false;
                            clearStack()
                        }
                    } else { if (begin_delimiter) {
                            stack.push(c)
                        } else { if (/\s/.test(c) || c == ",") {
                                clearStack()
                            } else {
                                stack.push(c)
                            }
                        }
                    }
                }
                clearStack();
                if (validate) {
                    tags = map2(unique(tags), function(t) {
                        return trim(t) || null
                    })
                }
                return tags;
                function clearStack() {
                    if (stack.length > 0) {
                        tags.push(stack.join(""));
                        stack.length = 0
                    }
                }
            },
            unparseTags: function(tagArray, joinBy) {
                joinBy = joinBy || " ";
                return map(tagArray, function(t) {
                    return this.quoteTag(t)
                },
                this).join(joinBy)
            }
        };
        extend(D, ParseTags);
        var Bookmark = Base.extend({
            constructor: function(data) {
                extend(this, {
                    url: "",
                    urlId: "",
                    b_id: "",
                    title: "",
                    description: "",
                    user: "",
                    unread: false,
                    mode: PRIVACY_MODE_PUBLIC,
                    tags: [],
                    alert: false,
                    onlyInGroup: false,
                    groups: [],
                    lists: [],
                    datetime: null,
                    saved: false,
                    toSharetoBmList: null,
                    toShareToGroups: null,
                    toShareExistingAnnotations: false
                },
                data || {})
            },
            getTitle: function() {
                var title = this.title || document.title || document.location.href;
                return trim(title)
            },
            addGroups: function(groupObjects) {
                var z = this;
                forEach(groupObjects, function(groupObj) {
                    var i = findIndex(z.groups, function(g) {
                        return g.name == groupObj.name
                    });
                    if (i == -1) {
                        z.groups.push(groupObj);
                        Ctx.fireEvent("bm_addGroups", [z, groupObj.name])
                    } else { if (groupObj.user) {
                            z.groups[i].user = groupObj.user
                        }
                    }
                })
            },
            getGroupNamesSharedByMe: function() {
                return map2(this.groups, function(g) {
                    return g.user == Ctx.user ? g.name : null
                })
            }
        });
        Bookmark.fromDocument = function() {
            var doc = document;
            return new Bookmark({
                url: doc.location.href,
                title: doc.title || doc.location.href
            })
        };
        var Annotation = Base.extend({
            constructor: function(data) {
                data = data || {};
                extend(this, {
                    id: null,
                    user: "",
                    mode: PRIVACY_MODE_PRIVATE,
                    content: "",
                    comments: [],
                    saved: false,
                    datetime: "",
                    painted: false,
                    paintedSuccessfully: false,
                    type: null,
                    groups: [],
                    onlyInGroup: false,
                    extra: {}
                },
                data);
                var defaultExtra = {
                    nth: 1
                };
                this.extra = extend(defaultExtra, this.extra || {})
            },
            paint: function() {
                if (Ctx.silent) {
                    return
                }
                this.constructor.paint(this);
                this.painted = true
            },
            unpaint: function() {
                if (this.paintedSuccessfully) {
                    this.constructor.unpaint(this)
                }
                this.painted = this.paintedSuccessfully = false
            },
            del: function(groupName) {
                var t = this.constructor.del ? this.constructor : Annotation;
                return t.del(this, groupName)
            },
            canDelete: function(filterMode) {
                return this.user == Ctx.user && this.getComments(filterMode).length == 0
            },
            canAddComments: function() {
                if (this.isPrivate() && this.user != Ctx.user) {
                    return false
                }
                if (this.isPublic() && !publicAnnotationsAllowed(Ctx.bookmark.url)) {
                    return false
                }
                return true
            },
            addGroups: function(groupObjects) {
                var z = this;
                forEach(groupObjects, function(groupObj) {
                    var i = findIndex(z.groups, function(g) {
                        return g.idInGroup == groupObj.idInGroup
                    });
                    if (i == -1) {
                        z.groups.push(groupObj);
                        Ctx.fireEvent("ann_add", [z, groupObj.name])
                    }
                });
                this.paint()
            },
            getPageOffset: function() {
                var hi;
                if (this.type == ANNOTATION_TYPE_TEXT) {
                    hi = $("em." + H.HIGHLIGHT_ID_CLASS + this.id)
                } else {
                    hi = $("." + H.HIGHLIGHT_TYPE_CLASS + this.type + "." + H.HIGHLIGHT_ID_CLASS + this.id)
                }
                if (hi.size() <= 0) {
                    return {
                        left: 0,
                        top: 0
                    }
                }
                var curwin = window,
                pOffset = {
                    left: 0,
                    top: 0
                },
                scrollLeft = 0,
                scrollTop = 0;
                var re = hi.parents("div").filter(function(index) {
                    var over = curwin.getComputedStyle(this, null).getPropertyValue("position");
                    if (over == "relative") {
                        pOffset.left += $(this).offset().left;
                        pOffset.top += $(this).offset().top;
                        scrollLeft += $(this).scrollLeft();
                        scrollTop += $(this).scrollTop()
                    }
                });
                var offset = hi.offset();
                if (!offset) {
                    return {
                        left: 0,
                        top: 0
                    }
                }
                var iconLeft = offset.left - pOffset.left + scrollLeft;
                var iconTop = offset.top - pOffset.top + scrollTop;
                return {
                    left: iconLeft,
                    top: iconTop
                }
            },
            getComments: function(filterMode) {
                return filter(this.comments, function(c) {
                    return c.matchFilter(filterMode)
                })
            },
            jumpHere: function(scroll, edit) {
                debug("[Annotation] jump here");
                if (arguments.length == 0) {
                    scroll = true
                }
                if (!this.paintedSuccessfully) {
                    Toolbar.notify(MSG_HIGHLIGHT_NOT_FOUND);
                    return
                }
                var doc = document;
                var j = (this.type == ANNOTATION_TYPE_TEXT ? $("em." + Highlighter.HIGHLIGHT_ID_CLASS + this.id) : this.getEle());
                if (j.size() == 0) {
                    Toolbar.notify(MSG_HIGHLIGHT_NOT_FOUND);
                    return
                }
                if (scroll) {
                    var o = j.eq(0).offset();
                    window.scrollTo(o.left, o.top - 40)
                }
                j = j.eq(j.size() - 1);
                o = j.offset();
                e = {
                    pageX: o.left,
                    pageY: o.top + j.height() + 15
                };
                DlgIC.hide();
                if (edit || this.comments.length > 0) {
                    DlgIC.show(e, this, edit ? "add" : "view")
                }
            },
            activate: function(b) {}
        });
        extend(Annotation, {
            add: function(ann, options) {
                options = extend({
                    dontPaint: false,
                    dontSave: false,
                    dontSort: false
                },
                options || {});
                var ctor;
                switch (ann.type) {
                case ANNOTATION_TYPE_TEXT:
                    ctor = TextHighlight;
                    break;
                case ANNOTATION_TYPE_IMAGE:
                    ctor = ImageHighlight;
                    break;
                case ANNOTATION_TYPE_FLOATNOTE:
                    ctor = FloatNote;
                    break;
                default:
                    return null
                }
                ann = new ctor(ann);
                if (!ann.saved) {
                    if (!ann.id) {
                        ann.id = MD5(ann.content + ann.user + Ctx.bookmark.urlId + ann.nth)
                    }
                    ann.extra.color = Ctx.penColor
                }
                Ctx.annotations.push(ann);
                if (!options.dontPaint) {
                    ann.paint()
                }
                if (ann.paintedSuccessfully && !options.dontSort) {
                    Annotation.sort()
                }
                if (!ann.saved && !options.dontSave) {
                    WebAPI.addAnnotation(ann)
                }
                if (!ann.onlyInGroup) {
                    Ctx.fireEvent("ann_add", [ann])
                }
                if (ann.groups) {
                    forEach(ann.groups, function(g) {
                        Ctx.fireEvent("ann_add", [ann, g.name])
                    })
                }
                return ann
            },
            del: function(ann, groupName) {
                ann = this.find(ann);
                if (groupName) {
                    var i = findIndex(ann.groups, function(g) {
                        return g.name == groupName && g.user == Ctx.user
                    });
                    if (ann.saved) {
                        WebAPI.deleteAnnotation(ann, ann.groups[i].idInGroup)
                    }
                    ann.groups.splice(i, 1);
                    Ctx.fireEvent("ann_del", [ann, groupName])
                } else { if (ann.onlyInGroup) {
                        throw "Annotation.del: onlyInGroup!"
                    }
                    ann.onlyInGroup = true;
                    ann.mode = PRIVACY_MODE_GROUP;
                    if (ann.saved) {
                        WebAPI.deleteAnnotation(ann, null)
                    }
                    Ctx.fireEvent("ann_del", [ann])
                }
                if (ann.onlyInGroup && ann.groups.length == 0) {
                    ann.unpaint();
                    Ctx.annotations.splice(Ctx.annotations.indexOf(ann), 1)
                } else {
                    ann.paint()
                }
                return ann
            },
            find: function(id) {
                id = id.id || id;
                return find(Ctx.annotations, function(a) {
                    return a.id == id
                })
            },
            findByInlineComment: function(c) {
                var id = c.id || c;
                return find(Ctx.annotations, function(ann) {
                    return find(ann.comments, function(ic) {
                        return ic.id == id
                    })
                })
            },
            sort: function() {
                Ctx.annotations.sort(function(a, b) {
                    if (!a.paintedSuccessfully) {
                        return 1
                    }
                    if (!b.paintedSuccessfully) {
                        return -1
                    }
                    return a.extra.top - b.extra.top > 0 ? 1 : (a.extra.top - b.extra.top == 0 ? (a.extra.left - b.extra.left) : -1)
                })
            }
        });
        var TextHighlight = Annotation.extend({
            constructor: function(data) {
                this.base(data || {})
            }
        });
        extend(TextHighlight, {
            paint: function(ann) {
                ann = Annotation.find(ann);
                Hiliter.paint(ann)
            },
            unpaint: function(ann) {
                ann = Annotation.find(ann);
                Hiliter.unpaint(ann)
            }
        });
        var ImageHighlight = Annotation.extend({
            constructor: function(data) {
                data = data || {};
                this.base(data);
                this.type = ANNOTATION_TYPE_IMAGE;
                var defaultExtra = {};
                this.extra = extend(defaultExtra, this.extra || {});
                var docUrl = Ctx.bookmark.url;
                if (!this.content) {
                    if (this._focusedNode) {
                        this.content = evalTpl('<img src="#{0}" title="#{1}" alt="#{2}" />', [ImageHighlight.makeAbsUrl(this._focusedNode.src, docUrl), this._focusedNode.title, this._focusedNode.alt])
                    } else {
                        throw ("Must specify either content or _focusedNode for image highlight")
                    }
                }
                if (!this.extra.imageUrl) {
                    this.extra.imageUrl = ImageHighlight.makeAbsUrl((this.content.match(/<img.*?\s+src=['"]?(.*?)['"]?[\s>]/im) || [])[1] || "", docUrl)
                }
                if (!this.extra.imageUrl) {
                    throw ("invalid imageUrl")
                }
                if (!this.saved && this._focusedNode) {
                    var relUrl = ImageHighlight.makeRelUrl(this.extra.imageUrl, docUrl);
                    var absUrl = ImageHighlight.makeAbsUrl(this.extra.imageUrl, docUrl);
                    var images = document.getElementsByTagName("img");
                    var n = 0;
                    for (var i = 0, len = images.length, img; img = images[i], i < len; i++) {
                        if (img.src.indexOf(relUrl) > -1 && absUrl == ImageHighlight.makeAbsUrl(img.src, docUrl)) {
                            n++;
                            if (img == this._focusedNode) {
                                this.extra.nth = n;
                                break
                            }
                        }
                    }
                }
            },
            getEle: function() {
                var j = null;
                j = $("img." + Highlighter.HIGHLIGHT_ID_CLASS);
                if (j.size() == 0) {
                    var relUrl = ImageHighlight.makeRelUrl(this.extra.imageUrl, Ctx.bookmark.url);
                    var absUrl = ImageHighlight.makeAbsUrl(this.extra.imageUrl, Ctx.bookmark.url);
                    var images = document.getElementsByTagName("img");
                    var n = 0;
                    for (var i = 0, len = images.length, img; img = images[i], i < len; i++) {
                        if (img.src.indexOf(relUrl) > -1 && absUrl == ImageHighlight.makeAbsUrl(img.src, Ctx.bookmark.url)) {
                            n++;
                            if (n == this.extra.nth) {
                                return $(img)
                            }
                        }
                    }
                }
                return j
            }
        });
        extend(ImageHighlight, {
            paint: function(ann) {
                ann = Annotation.find(ann);
                var j = ann.getEle();
                if (!j) {
                    return
                }
                var comments = ann.comments;
                j.addClass(Highlighter.HIGHLIGHT_CLASS).addClass(Highlighter.HIGHLIGHT_ID_CLASS + ann.id).addClass(Highlighter.HIGHLIGHT_TYPE_CLASS + ann.type).removeClass("yellow blue green pink").addClass((ann.extra.color && ann.extra.color.length > 0) ? ann.extra.color : "yellow").toggleClass("diigoHighlightcommented", comments.length > 0);
                if (j.size() > 0) {
                    var offset = j.offset();
                    ann.extra.top = offset.top;
                    ann.extra.left = offset.left
                }
                ann.painted = true;
                ann.paintedSuccessfully = j.size() > 0;
                function addIconClass(icon, ann) {
                    $(icon).addClass(H.HIGHLIGHT_ICON_CLASS).addClass(H.HIGHLIGHT_ID_CLASS + ann.id).addClass(H.HIGHLIGHT_TYPE_CLASS + ANNOTATION_TYPE_ICON).addClass("ImageIcon").toggleClass("public", ann.isPublic() && comments.length > 0).toggleClass("private", ann.isPrivate() && comments.length > 0).toggleClass("group", ann.inAnyGroups() && comments.length > 0).toggleClass("diigoHighlightcommented", comments.length > 0);
                    if (comments.length > 0) {
                        $(icon).html("<span class='" + H.HIGHLIGHT_ID_CLASS + ann.id + " " + H.HIGHLIGHT_ICON_CLASS + " " + H.HIGHLIGHT_TYPE_CLASS + ANNOTATION_TYPE_ICON + "'>" + comments.length + "</span>");
                        $(icon).attr("title", AnnotationContextMenu.tipMsg(ann));
                        var offset = ann.getPageOffset();
                        $(icon).css({
                            left: offset.left,
                            top: offset.top
                        })
                    } else {
                        $(icon).html("");
                        $(icon).attr("title", "")
                    }
                    return icon
                }
                if ($("div." + H.HIGHLIGHT_ID_CLASS + ann.id).size() <= 0 && j.size() > 0) {
                    var icon = $(doc.createElement("div"));
                    icon.insertBefore(j);
                    addIconClass(icon, ann)
                } else {
                    addIconClass("div." + H.HIGHLIGHT_ID_CLASS + ann.id, ann)
                }
            },
            unpaint: function(ann) {
                ann = Annotation.find(ann);
                var j = ann.getEle();
                if (!j) {
                    return
                }
                j.removeClass(Highlighter.HIGHLIGHT_ID_CLASS + ann.id).removeClass(Highlighter.HIGHLIGHT_CLASS).removeClass("diigoHighlightcommented").removeClass("public").removeClass("group")
            },
            getBaseUrl: function(url, siteRoot) {
                var u = url;
                var i = u.replace(/:\/\//, "123")[(siteRoot ? "i" : "lastI") + "ndexOf"]("/");
                if (i > 0) {
                    u = u.slice(0, i)
                }
                return u + "/"
            },
            makeRelUrl: function(url, docUrl) {
                if (!/^[a-zA-Z]+:\/\/|^\//.test(url)) {
                    return url
                }
                if (url.charAt(0) == "/") {
                    url = url.replace("/", this.getBaseUrl(url, true))
                }
                return url.replace(this.getBaseUrl(docUrl, false), "")
            },
            makeAbsUrl: function(url, docUrl) {
                if (url.indexOf("://") > 0) {
                    return url
                }
                var root = url.charAt(0) == "/";
                return this.getBaseUrl(docUrl, root) + (root ? url.slice(1) : url)
            }
        });
        var FloatNote = Annotation.extend({
            constructor: function(data) {
                data = data || {};
                this.base(data);
                this.saving = false;
                if (!this.id) {
                    this.id = MD5(Math.random() + Math.random() + new Date().getTime().toString())
                }
                this.type = ANNOTATION_TYPE_FLOATNOTE
            },
            fixExtra: function() {
                var doc = document;
                var existingFloatNoteCount = filter(Ctx.annotations, function(ann) {
                    return ann.type == ANNOTATION_TYPE_FLOATNOTE
                }).length;
                var offset = 5 * existingFloatNoteCount;
                var j = $(document);
                var scrollTop = j.scrollTop();
                var scrollLeft = j.scrollLeft();
                var docHeight = j.height();
                var docWidth = j.width();
                var defaultExtra = {
                    left: offset + scrollLeft + 10,
                    top: offset + scrollTop + 50
                };
                this.extra = extend(defaultExtra, this.extra || {},
                {
                    winWidth: docWidth,
                    winHeight: docHeight
                })
            },
            getEle: function() {
                return $("." + Highlighter.HIGHLIGHT_ID_CLASS + this.id)
            }
        });
        extend(FloatNote, {
            paint: function(ann) {
                debug("[FloatNote] paint: called");
                ann = Annotation.find(ann);
                ann.fixExtra();
                if (ann.painted) {
                    var j = ann.getEle();
                    if (j) {
                        j.find("span").text(ann.comments.length || "")
                    }
                } else {
                    var j = $html(HTML_FLOAT_NOTE).addClass(Highlighter.HIGHLIGHT_CLASS).addClass(Highlighter.HIGHLIGHT_ID_CLASS + ann.id).addClass(Highlighter.HIGHLIGHT_TYPE_CLASS + ann.type).css({
                        left: ann.extra.left,
                        top: ann.extra.top
                    }).appendTo(document.body).find("span").text(ann.comments.length || "");
                    this.bindEvents(ann);
                    ann.paintedSuccessfully = true
                }
                ann.painted = true
            },
            unpaint: function(ann) {
                ann = Annotation.find(ann);
                var j = ann.getEle();
                if (j) {
                    j.unbind().remove();
                    ann.painted = ann.paintedSuccessfully = false
                }
            },
            bindEvents: function(ann) {
                ann = Annotation.find(ann);
                var j = ann.getEle();
                j.mouseout(function(e) {
                    if (e.relatedTarget == this.firstChild) {
                        return false
                    }
                });
                new $.Draggable(j, {
                    cursor: "default",
                    beforeDrag: function() {
                        Ctx.clickedOnDiigolet = true;
                        Ctx.draggingFloatNote = true;
                        debug("[FloatNote] before drag: cancel show");
                        if (ann.saved) {
                            DlgIC.hide()
                        }
                    },
                    afterDrag: function(event) {
                        debug("[FloatNote] after drag");
                        ann.extra.left = parseInt(j.css("left"));
                        ann.extra.top = parseInt(j.css("top"));
                        Ctx.draggingFloatNote = false;
                        if (ann.user == Ctx.user && ann.saved) {
                            WebAPI.updateExtra(ann);
                            Annotation.sort()
                        }
                    }
                })
            }
        });
        var Comment = Base.extend({
            constructor: function(data) {
                extend(this, {
                    id: null,
                    user: "",
                    mode: PRIVACY_MODE_PRIVATE,
                    saved: false,
                    datetime: "",
                    groups: [],
                    onlyInGroup: false
                },
                data || {});
                if (this.onlyInGroup && !(this.id > 0)) {
                    this.id = Math.random().toString().substr(2)
                }
            },
            del: function(groupName) {
                return this.constructor.del(this, groupName)
            },
            canDelete: function() {
                return hasSignedIn() && Ctx.user == this.user
            },
            addGroups: function(groupObjects) {
                var z = this;
                forEach(groupObjects, function(groupObj) {
                    var i = findIndex(z.groups, function(g) {
                        return g.idInGroup == groupObj.idInGroup
                    });
                    if (i == -1) {
                        z.groups.push(groupObj);
                        Ctx.fireEvent(((z instanceof PageComment) ? "pc" : "ic") + "_add", [z, groupObj.name])
                    }
                })
            }
        });
        var PageComment = Comment.extend({
            constructor: function(data) {
                this.base(data)
            }
        });
        extend(PageComment, {
            add: function(c) {
                if (! (c instanceof this)) {
                    c = new this(c)
                }
                Ctx.pageComments.push(c);
                if (!c.saved) {
                    throw "[PageComment] add: adding an unsaved comment is probably and error"
                }
                Ctx.fireEvent("pc_add", [c]);
                return c
            },
            del: function(c, groupName) {
                c = this.find(c);
                if (groupName) {
                    var i = findIndex(c.groups, function(g) {
                        return g.name == groupName && g.user == Ctx.user
                    });
                    if (c.saved) {
                        WebAPI.deletePageComment(c, c.groups[i].idInGroup)
                    }
                    c.groups.splice(i, 1);
                    Ctx.fireEvent("pc_del", [c, groupName])
                } else { if (c.onlyInGroup) {
                        throw "PageComment.del: onlyInGroup!"
                    }
                    c.onlyInGroup = true;
                    c.mode = PRIVACY_MODE_GROUP;
                    if (c.saved) {
                        WebAPI.deletePageComment(c, null)
                    }
                    Ctx.fireEvent("pc_del", [c])
                }
                if (c.onlyInGroup && c.groups.length == 0) {
                    Ctx.pageComments.splice(Ctx.pageComments.indexOf(c), 1)
                }
                return c
            },
            find: function(id) {
                id = id.id || id;
                return find(Ctx.pageComments, function(c) {
                    return c.id == id
                })
            }
        });
        var InlineComment = Comment.extend({
            constructor: function(data) {
                data = extend({
                    annotationId: null
                },
                data);
                this.base(data);
                if (!this.annotationId) {
                    throw "[InlineComment ctr] must specify annotationId"
                }
            },
            getAnnotation: function() {
                if (!this.annotation) {
                    this.annotation = Annotation.find(this.annotationId)
                }
                return this.annotation
            }
        });
        extend(InlineComment, {
            add: function(c) {
                if (! (c instanceof this)) {
                    c = new this(c)
                }
                ann = c.getAnnotation();
                if (ann.getComments("_noGroups").length > 0) {
                    if (c.mode != ann.mode && c.mode != PRIVACY_MODE_GROUP) {
                        c.mode = ann.mode
                    }
                } else { if (c.mode != ann.mode && c.mode != PRIVACY_MODE_GROUP) {
                        ann.mode = c.mode;
                        Ctx.fireEvent("ann_changeMode", [ann])
                    }
                }
                ann.comments.push(c);
                if (!c.saved) {}
                if (ann.paintedSuccessfully) {
                    ann.paint()
                }
                Ctx.fireEvent("ic_add", [c]);
                return c
            },
            del: function(c, groupName) {
                c = this.find(c);
                debug("[InlineComment.del]", c, groupName, c.onlyInGroup ? "onlyInGroup" : "");
                var callback = function() {
                    if (f) {
                        f()
                    }
                };
                if (groupName) {
                    var i = findIndex(c.groups, function(g) {
                        return g.name == groupName && g.user == Ctx.user
                    });
                    if (c.saved) {
                        WebAPI.deleteInlineComment(c, c.groups[i].idInGroup, callback)
                    }
                    c.groups.splice(i, 1);
                    Ctx.fireEvent("ic_del", [c, groupName])
                } else { if (c.onlyInGroup) {
                        throw "InlineComment.del: onlyInGroup!"
                    }
                    c.onlyInGroup = true;
                    c.mode = PRIVACY_MODE_GROUP;
                    if (c.saved) {
                        WebAPI.deleteInlineComment(c, null, callback)
                    }
                    Ctx.fireEvent("ic_del", [c])
                }
                if (c.onlyInGroup && c.groups.length == 0) {
                    var ann = c.getAnnotation();
                    ann.comments.splice(ann.comments.indexOf(c), 1);
                    if (ann.isPublic() && ann.getComments("_smasher").length == 0) {
                        ann.mode = PRIVACY_MODE_PRIVATE;
                        Ctx.fireEvent("ann_changeMode", [ann])
                    }
                    if (ann.paintedSuccessfully) {
                        ann.paint()
                    }
                    var sectionComments = ann.getComments(groupName ? groupName : "_smasher");
                    if (ann.type == ANNOTATION_TYPE_FLOATNOTE && sectionComments.length == 0) {
                        var f = function() {
                            ann.del(groupName)
                        }
                    }
                }
                return c
            },
            find: function(id) {
                id = id.id || id;
                var ann = Annotation.findByInlineComment(id);
                if (!ann) {
                    return null
                }
                return find(ann.comments, function(c) {
                    return c.id == id
                })
            }
        });
        forEach([Bookmark, Annotation, Comment], function(v) {
            v.implement({
                isPublic: function() {
                    return this.mode == PRIVACY_MODE_PUBLIC && !this.onlyInGroup
                },
                isPrivate: function() {
                    return this.mode == PRIVACY_MODE_PRIVATE && !this.onlyInGroup
                },
                inGroup: function(groupName, user) {
                    var z = this;
                    return some(z.groups, function(g) {
                        return g.name == groupName && (user ? g.user == user : true)
                    })
                },
                inList: function(listId) {
                    var z = this;
                    return some(z.lists, function(g) {
                        return g.id == listId
                    })
                },
                inAnyGroups: function() {
                    return this.groups.length > 0
                },
                matchFilter: function(filterMode) {
                    if (!filterMode) {
                        throw "matchFilter: illegal filter mode!"
                    }
                    if (filterMode == "_all") {
                        return this.isPublic() || this.isPrivate() || this.inAnyGroups()
                    } else { if (filterMode == "_smasher") {
                            return this.isPublic() || this.isPrivate()
                        } else { if (filterMode == "_public") {
                                return this.isPublic()
                            } else { if (filterMode == "_private") {
                                    return this.isPrivate()
                                } else {
                                    return this.inGroup(filterMode)
                                }
                            }
                        }
                    }
                }
            })
        });
        function obj2QueryString(obj) {
            var pairs = [];
            $.each(obj, function(i, v) {
                pairs.push(encodeURIComponent(i) + "=" + encodeURIComponent(v))
            });
            return pairs.join("&")
        }
        var WebAPI = {
            transId: 0,
            callbacks: {},
            getScriptId: function(transId) {
                return "diigoletScriptCall_" + transId
            },
            callback: function(resp) {
                var transId = resp.transId,
                cmd = resp.cmd,
                result = resp.result;
                debug("[WebAPI response]", cmd, resp.code, resp, result);
                if (!Ctx.signedIn && resp.user) {
                    onSignIn(resp.user)
                } else { if (Ctx.signedIn && !resp.user) {
                        onSignOut()
                    }
                }
                if (resp.code != 1) {
                    Toolbar.showInfo("Failed", 3000);
                    return
                } else { if (!find(["bm_saveBookmark", "annotation_add", "pc_add", "ic_add"], cmd)) {
                        Toolbar.showInfo("Succeeded", 3000)
                    } else {
                        Toolbar.updateUsername()
                    }
                }
                if (this["cb_" + cmd]) {
                    this["cb_" + cmd](resp)
                }
                if (resp.code == 1 && this["cb_" + cmd + "_success"]) {
                    this["cb_" + cmd + "_success"](resp.result)
                }
                if (resp.code == 0 && this["cb_" + cmd + "_failure"]) {
                    this["cb_" + cmd + "_failure"](resp.result)
                }
                if (this.callbacks[transId]) {
                    this.callbacks[transId](resp)
                }
                delete this.callbacks[transId];
                $id(this.getScriptId(transId)).remove()
            },
            invoke: function(cmd, data, callback) {
                Toolbar.showInfo(MSG_LOADING, 3000);
                var protocolVersion = 13,
                transId = this.transId++;
                if (callback) {
                    this.callbacks[transId] = callback
                }
                var paramObj = {
                    cmd: cmd,
                    v: protocolVersion,
                    _nocache: Math.random(),
                    json: $.toJSON(data),
                    user: Ctx.user,
                    transId: transId
                };
                debug("[WebAPI request]", cmd, data);
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = this.getScriptId(transId);
                if (cmd == "user_signIn") {
                    script.src = evalTpl(DIIGO_DATA_SERVER + "/chappai/pv=#{pv}/ct=let/cv=#{cv}/cmd=#{cmd}?", {
                        pv: protocolVersion,
                        cv: D.version,
                        cmd: cmd
                    }) + obj2QueryString(paramObj)
                } else {
                    script.src = evalTpl(DIIGO_DATA_SERVER + "/chappai/pv=#{pv}/ct=let/cv=#{cv}/user=#{user}/cmd=#{cmd}/?", {
                        pv: protocolVersion,
                        cv: D.version,
                        user: Ctx.user,
                        cmd: cmd
                    }) + obj2QueryString(paramObj)
                }
                $("head,body").add(document.body)[0].appendChild(script)
            },
            loadBookmark: function() {
                var p = {
                    url: Ctx.bookmark.url,
                    what: "bookmarkInfo annotations pageComments",
                    permalinkParams: Ctx.launchMode.permalink ? Ctx.permalinkParams : null
                };
                if (p.permalinkParams) {
                    p.url = p.permalinkParams.url
                }
                this.invoke("bm_loadBookmark", p)
            },
            cb_bm_loadBookmark_success: function(data) {
                var t;
                var bm = Ctx.bookmark;
                bm.loaded = true;
                extendThese(bm, data, $w("url urlId annotated groups saved b_id"));
                if (bm.saved) {
                    if (data.bookmarkInfo) {
                        extendThese(bm, data.bookmarkInfo, $w("title mode tags unread alert description datetime onlyInGroup lists"))
                    }
                }
                Ctx._supressEvents = true;
                if (data.pageComments) {
                    forEach(reverse(data.pageComments), function(v) {
                        PageComment.add(extend({
                            saved: true
                        },
                        v))
                    })
                }
                if (data.annotations) {
                    forEach(data.annotations, function(v) {
                        var ann = Annotation.add(extendThese({
                            saved: true
                        },
                        v, $w("id user realName mode type content datetime extra groups onlyInGroup")), {
                            dontPaint: true,
                            dontSort: true
                        });
                        forEach(v.comments, function(vv) {
                            InlineComment.add(extend({
                                saved: true,
                                annotationId: ann.id
                            },
                            vv))
                        })
                    });
                    Ctx.unpaintAllAnnotations();
                    Ctx.paintAllAnnotations();
                    Annotation.sort()
                }
                Ctx._supressEvents = false;
                Toolbar.updateUI();
                Sidebar.refresh()
            },
            saveBookmark: function(moreData) {
                var bm = Ctx.bookmark;
                var data = {
                    url: bm.url,
                    mode: bm.mode,
                    title: bm.title,
                    tags: bm.tags,
                    description: bm.description,
                    unread: bm.unread,
                    groups: bm.toShareToGroups,
                    shareExistingAnnotations: bm.toShareExistingAnnotations,
                    lists: bm.toSharetoBmList
                };
                var t;
                if (moreData) {
                    t = moreData.pageComment;
                    if (t) {
                        data.pageComment = {
                            content: t.content,
                            mode: t.mode,
                            groups: t.groups,
                            justForGroups: t.justForGroups
                        };
                        data.groups = t.groups
                    }
                    t = moreData.annotation;
                    if (t) {
                        data.annotation = {
                            id: t.id,
                            content: t.content,
                            type: t.type,
                            groups: t.groups,
                            extra: t.extra
                        };
                        data.groups = t.groups;
                        t = moreData.annotation.inlineComment;
                        if (t) {
                            data.annotation.inlineComment = {
                                mode: t.mode,
                                content: t.content,
                                groups: t.groups,
                                justForGroups: t.justForGroups
                            };
                            data.groups = t.groups
                        }
                    }
                }
                this.invoke("bm_saveBookmark", data);
                bm.toSharetoBmList = null;
                bm.toShareToGroups = null;
                bm.toShareExistingAnnotations = false
            },
            cb_bm_saveBookmark_success: function(data) {
                var t;
                var bm = Ctx.bookmark;
                bm.saved = true;
                bm.url = data.url;
                bm.urlId = data.urlId;
                bm.b_id = data.b_id;
                bm.datetime = data.datetime;
                bm.alert = data.alert;
                if (data.groups) {
                    bm.addGroups(data.groups)
                }
                if (t = data.pageComment) {
                    PageComment.add({
                        id: t.id,
                        user: t.user,
                        realName: t.realName,
                        mode: t.mode,
                        datetime: t.datetime,
                        content: t.content,
                        userOnline: t.userOnline,
                        groups: t.groups,
                        onlyInGroup: t.onlyInGroup,
                        saved: true
                    })
                }
                if (t = data.annotation) {
                    var ann = Annotation.find(t.id);
                    if (t.groups) {
                        ann.addGroups(t.groups)
                    }
                    if (t = data.annotation.inlineComment) {
                        var ic = InlineComment.add({
                            id: t.id,
                            annotationId: t.annotationId,
                            user: t.user,
                            realName: t.realName,
                            mode: t.mode,
                            datetime: t.datetime,
                            content: t.content,
                            userOnline: t.userOnline,
                            groups: t.groups,
                            onlyInGroup: t.onlyInGroup,
                            saved: true
                        })
                    }
                }
                var shareResult = data.result_shareExisting;
                if (shareResult) {
                    forEach(shareResult.pageComments, function(c) {
                        var pc = PageComment.find(c.id);
                        if (pc) {
                            pc.addGroups(c.groups)
                        }
                    });
                    forEach(shareResult.annotations, function(a) {
                        var ann = Annotation.find(a);
                        if (!ann) {
                            return
                        }
                        ann.addGroups(a.groups);
                        if (a.inlineComments) {
                            forEach(a.inlineComments, function(c) {
                                var ic = InlineComment.find(c.id);
                                if (ic) {
                                    ic.addGroups(c.groups)
                                }
                            })
                        }
                    })
                }
                Sidebar.refresh("thisUrl", true);
                Sidebar.refresh("annotations", true);
                Toolbar.updateUI()
            },
            addAnnotation: function(ann) {
                var data = {
                    urlId: Ctx.bookmark.urlId,
                    id: ann.id,
                    content: ann.content,
                    type: ann.type,
                    extra: ann.extra,
                    groups: ann.type == ANNOTATION_TYPE_FLOATNOTE ? null : Ctx.bookmark.getGroupNamesSharedByMe()
                };
                if (ann._toAddInlineComment) {
                    data.inlineComment = ann._toAddInlineComment;
                    delete ann._toAddInlineComment
                }
                if (!Ctx.bookmark.saved) {
                    var z = this;
                    this.saveBookmark({
                        annotation: data
                    })
                } else {
                    this.invoke("annotation_add", data)
                }
            },
            cb_annotation_add_success: function(data) {
                var ann = Annotation.find(data.id);
                ann.saving = false;
                ann.saved = true;
                ann.onlyInGroup = data.onlyInGroup;
                if (data.groups) {
                    ann.addGroups(data.groups)
                }
                if (data.__bookmark_groups) {
                    Ctx.bookmark.addGroups(data.__bookmark_groups)
                }
                if (data.inlineComment) {
                    this.cb_ic_add_success(data.inlineComment)
                }
            },
            deleteAnnotation: function(ann, idInGroup) {
                var data = {
                    urlId: Ctx.bookmark.urlId
                };
                if (idInGroup) {
                    data.idInGroup = idInGroup
                } else {
                    data.id = ann.id
                }
                this.invoke("annotation_delete", data)
            },
            addPageComment: function(data) {
                var data = {
                    urlId: data.urlId,
                    mode: data.mode,
                    content: data.content,
                    justForGroups: data.justForGroups,
                    groups: data.groups
                };
                if (!Ctx.bookmark.saved) {
                    var z = this;
                    this.saveBookmark({
                        pageComment: data
                    })
                } else {
                    this.invoke("pc_add", data)
                }
            },
            cb_pc_add_success: function(data) {
                PageComment.add({
                    id: data.id,
                    user: data.user,
                    realName: data.realName,
                    mode: data.mode,
                    datetime: data.datetime,
                    content: data.content,
                    userOnline: data.userOnline,
                    groups: data.groups,
                    onlyInGroup: data.onlyInGroup,
                    saved: true
                });
                var t = data.__bookmark_groups;
                if (t) {
                    Ctx.bookmark.addGroups(t)
                }
            },
            deletePageComment: function(c, idInGroup) {
                var data = {
                    urlId: Ctx.bookmark.urlId
                };
                if (idInGroup) {
                    data.idInGroup = idInGroup
                } else {
                    data.id = c.id
                }
                this.invoke("pc_delete", data)
            },
            addInlineComment: function(data) {
                var data = {
                    urlId: Ctx.bookmark.urlId,
                    annotationId: data.annotationId,
                    mode: data.mode,
                    content: data.content,
                    justForGroups: data.justForGroups,
                    groups: data.groups
                };
                if (data.justForGroups) {
                    data.urlId = Ctx.bookmark.urlId
                }
                this.invoke("ic_add", data)
            },
            cb_ic_add_success: function(data) {
                InlineComment.add({
                    id: data.id,
                    annotationId: data.annotationId,
                    user: data.user,
                    realName: data.realName,
                    mode: data.mode,
                    datetime: data.datetime,
                    datetime2: data.datetime2,
                    content: data.content,
                    userOnline: data.userOnline,
                    groups: data.groups,
                    onlyInGroup: data.onlyInGroup,
                    saved: true
                });
                if (data.__annotation_groups) {
                    Annotation.find(data.annotationId).addGroups(data.__annotation_groups)
                }
                if (data.__bookmark_groups) {
                    Ctx.bookmark.addGroups(data.__bookmark_groups)
                }
            },
            deleteInlineComment: function(c, idInGroup, callback) {
                var data = {
                    urlId: Ctx.bookmark.urlId
                };
                if (idInGroup) {
                    data.idInGroup = idInGroup
                } else {
                    data.id = c.id
                }
                this.invoke("ic_delete", data, callback)
            },
            loadMyStuff: function() {
                this.invoke("user_loadMyStuff", {
                    what: "myTags myGroups myProfile myBookmarkLists"
                })
            },
            cb_user_loadMyStuff_success: function(data) {
                Ctx.myTags = data.myTags;
                Ctx.myGroups = data.myGroups;
                Ctx.myBmList = data.myBookmarkLists;
                Ctx.realName = data.myProfile.realName;
                setupAutocomplete();
                DlgBookmark.updateGroups();
                DlgBookmark.updateLists()
            },
            updateExtra: function(ann) {
                var data = {
                    urlId: Ctx.bookmark.urlId,
                    id: ann.id,
                    idsInGroup: map(filter(ann.groups, function(g) {
                        return g.user == Ctx.user
                    }), function(g) {
                        return g.idInGroup
                    }),
                    extra: ann.extra
                };
                this.invoke("annotation_updateExtra", data)
            },
            signIn: function() {
                this.invoke("user_signIn", {})
            },
            cb_user_signIn_success: function(data) {
                if (data.signedIn) {
                    WebAPI.loadBookmark()
                }
            },
            signOut: function() {
                this.invoke("user_signOut", {})
            },
            cb_user_signOut_success: function(data) {
                onSignOut()
            }
        };
        var Toolbar = {
            shown: false,
            j: null,
            init: function() {
                var z = this;
                z.create();
                z.j.find("a.diigoletButton,#diigolet-tb-btnHide").bind("focus", function() {
                    this.blur()
                });
                z.jHelpTip = $id("diigolet-help");
                z.j.find(".diigoletButton,._hoverAndHideDropdown").bind("mouseover", function(e) {
                    z.jHelpTip.hide();
                    var id = $(this).attr("id");
                    if (id == "diigolet-button-highlight" || id == "diigolet-button-highlight-dropdown") {
                        return
                    }
                    if (!$(this).is(".hover")) {
                        z.j.find(".dropdownMenu").hide()
                    }
                })
            },
            destroy: function() {},
            onSignIn: function() {
                this.updateUI()
            },
            onSignOut: function() {
                this.updateUI()
            },
            show: function() {
                if (this.shown) {
                    return
                }
                this.shown = true;
                this.j.slideDown()
            },
            hide: function() {
                if (!this.shown) {
                    return
                }
                this.shown = false;
                this.jHelpTip.hide();
                this.j.slideUp()
            },
            updateUsername: function(username) {
                var username = username || Ctx.user;
                $("a#diigolet-tb-btnMyBookmarks").attr({
                    href: D.urls.getUserBookmarksPageURL(username)
                });
                var unsignHtml = '<em><a href="#" title="Sign in into Diigo.com" onclick="return diigolet.handle(event, \'tb_signIn\')">Sign in</a> to add annotations or <a href="' + DIIGO_SERVER + '/sign-up" title="Create a Diigo account" target="_blank">Create a Diigo account now</a> (free!)</em>';
                this.showInfo(Ctx.signedIn ? "<em>Welcome " + username + "</em>" : unsignHtml, null)
            },
            updateUI: function() {
                var needSignIn = !checkSignIn();
                if (needSignIn) {
                    $("#diigolet-tb-btnSignIn b b").show()
                } else {
                    $("#diigolet-tb-btnSignIn b b").hide()
                }
                $("#diigolet-tb-btnMyBookmarks").hide();
                this.updateUsername();
                $("#diigolet-tb-btnComment").toggleClass("commented", Ctx.isCommented());
                $("#diigolet-tb-btnBookmark").toggleClass("saved", Ctx.bookmark.saved)
            },
            create: function() {
                var html = evalTpl(HTML_TOOLBAR, {
                    DIIGOLET_VERSION: D.version,
                    URL_DIIGO: DIIGO_SERVER
                });
                try {
                    var t = this.j = $html(html).css({
                        position: $.browser.supportPositionFixed ? "fixed" : "absolute"
                    }).appendTo(document.body).hide()
                } catch(e) {}
                setTimeout(function() {
                    $("#diigolet-tb-shadow").addClass("ie6")
                },
                5000);
                this.showInfo(MSG_LOADING, null);
                if ($.browser.opera) {
                    $("#diigolet-button-highlight").hide();
                    $("#diigolet-button-highlight-dropdown").hide()
                }
                $("._diigomenu").click(function(event) {
                    var url;
                    className = $(event.target).attr("class");
                    if (className.indexOf("URL_MY_LIBRARY") >= 0) {
                        url = D.urls.getUserBookmarksPageURL()
                    } else { if (className.indexOf("URL_MY_LIST") >= 0) {
                            url = D.urls.getListHome()
                        } else { if (className.indexOf("URL_MY_GROUP") >= 0) {
                                url = D.urls.getGroupHome()
                            } else { if (className.indexOf("URL_NETWORK") >= 0) {
                                    url = D.urls.getNetwork()
                                } else { if (className.indexOf("URL_HOT_BOOKMARK") >= 0) {
                                        url = D.urls.getHotBookmark()
                                    }
                                }
                            }
                        }
                    }
                    window.open(url, "_blank");
                    return false
                });
                if (Ctx.launchMode.permalink) {
                    var j = $("#diigolet-tb-forward").show();
                    $("a._forwardPageUrl", t).attr({
                        href: Ctx.bookmark.url
                    });
                    var pu = Ctx.permalinkParams.user;
                    $("a._forwardUserUrl", t).attr({
                        href: pu ? DIIGO_SERVER + "/user/" + pu : DIIGO_SERVER
                    }).text(pu || "Diigo");
                    $("a._myBookmarks, a._info", t).hide()
                } else { if (Ctx.launchMode.sandbox) {
                        $("a._myBookmarks, a._info", t).hide()
                    }
                }
            },
            showInfo: function(html, timeout) {
                var j = this.j,
                thisObj = this;
                j.find("span._info").html(html);
                if (timeout != null) {
                    setTimeout(function() {
                        thisObj.updateUsername()
                    },
                    timeout)
                }
            },
            notify: function(html, timeout, pos) {
                timeout = timeout == undefined ? 4000 : timeout;
                var j;
                if ($.browser.msie && $.browser.version >= 9) {
                    tbar = $("#diigolet-toolbar");
                    j = $(ID_NOTIFY).css({
                        top: tbar.offset().top + tbar.height() - 5
                    }).show()
                } else {
                    j = $(ID_NOTIFY).show()
                }
                j.find("span").html(html);
                j.toggleClass("right", pos == 1);
                clearTimeout(j[0].timerId);
                if (timeout) {
                    j[0].timerId = setTimeout(function() {
                        j.fadeOut("slow")
                    },
                    timeout)
                }
            }
        };
        Toolbar.refresh = Toolbar.updateUI;
        var Highlighter, H;
        var Hiliter = Highlighter = H = {
            HIGHLIGHT_CLASS: "diigoHighlight",
            HIGHLIGHT_ICON_CLASS: "diigoIcon",
            HIGHLIGHT_ID_CLASS: "id_",
            HIGHLIGHT_TYPE_CLASS: "type_",
            colorPen: ["yellow", "blue", "green", "pink"],
            isHighlightElement: function(target) {
                if (target.nodeType == 1 && target.className && (target.className.indexOf(this.HIGHLIGHT_CLASS) > -1 || target.className.indexOf(this.HIGHLIGHT_ICON_CLASS) > -1)) {
                    var r = {
                        type: -1,
                        ids: []
                    };
                    r.type = Number(target.className.match(new RegExp(this.HIGHLIGHT_TYPE_CLASS + "(\\d)"))[1]);
                    scan(target.className, new RegExp(this.HIGHLIGHT_ID_CLASS + "([^\\s]+)(?:\\s|$)", "img"), function(m) {
                        r.ids.push(m[1])
                    });
                    r.ids = r.ids.slice(0, 1);
                    return r
                }
                return false
            },
            tagBlackList: ",applet,area,base,basefont,bdo,button,frame,frameset,iframe,head,hr,img,input,link,map,meta,noframes,noscript,optgroup,option,param,script,select,style,textarea,title,",
            docHtml: "",
            docTxt: "",
            docTxtOffsetList: [],
            domSnapshot: function() {
                var z = this;
                this.docString = document.body.innerHTML;
                this.docTxt = "";
                this.docTxtOffsetList = [];
                new DOMWalker(document.body, function(n) {
                    if (n.nodeType == 3) {
                        var nodeTxt = n.nodeValue.replace(/\s+/g, "");
                        if (nodeTxt) {
                            z.docTxtOffsetList.push({
                                offset: z.docTxt.length,
                                node: n
                            });
                            z.docTxt += nodeTxt
                        }
                    }
                },
                {
                    filter: function(n) {
                        return z.domSnapshotNodeFilter(n)
                    }
                }).walk()
            },
            domSnapshotNodeFilter: function(n) {
                if (n.nodeType == 3) {
                    return true
                }
                if (n.nodeType != 1) {
                    return false
                }
                if (n.tagName && this.tagBlackList.indexOf("," + n.tagName.toLowerCase() + ",") > -1) {
                    return false
                }
                if (!n.className) {
                    return true
                }
                if (/(^|\s)diigoHighlight(\s|$)/.test(n.className)) {
                    return true
                }
                if (/(^|\s)diigolet(\s|$)/.test(n.className)) {
                    return false
                }
                return true
            },
            isHighlightableNode: function(n) {
                return n.nodeType == 3 || (n.nodeType == 1 && H.tagBlackList.indexOf("," + n.tagName.toLowerCase() + ",") == -1)
            },
            findOffset: function(node, txt, startOrEnd, offset) {
                var nodeTxt = node.nodeValue,
                nodeTxt2 = nodeTxt.replace(/\s+/g, "");
                if (startOrEnd) {
                    var substr = txt.slice(0, nodeTxt2.length - offset);
                    for (var j = nodeTxt.length - substr.length; j >= offset; j--) {
                        if (nodeTxt.slice(j).replace(/\s+/g, "").indexOf(substr) > -1) {
                            return j
                        }
                    }
                } else {
                    var substr = txt.slice(Math.max(0, txt.length - offset - 1));
                    for (var j = offset; j <= nodeTxt.length; j++) {
                        if (nodeTxt.slice(0, j).replace(/\s+/g, "").indexOf(substr) > -1) {
                            return j
                        }
                    }
                }
                return startOrEnd ? nodeTxt.length : 0
            },

            // 在 docTxt 中寻找第 nth 次出现的 html 文本的位置信息
            seek: function(html, nth) {
                nth = nth || 1;
                var txt = this.html2txt(html);
                var docTxt = this.docTxt;
                var startIndex = 0,
                endIndex = 0,
                n = 0;
                while ((startIndex = docTxt.indexOf(txt, endIndex)) > -1) {
                    n++;
                    endIndex = startIndex + txt.length - 1;
                    if (n == nth) {
                        break
                    }
                }
                if (startIndex == -1) {
                    return null
                }
                var list = this.docTxtOffsetList;
                var startNode, endNode, startOffset, endOffset, commonAncestor;
                for (var i = 0, a, l = list.length; a = list[i], i < l; i++) {
                    if (startIndex == a.offset || (startIndex > a.offset && ((i + 1) == list.length || startIndex < list[i + 1].offset))) {
                        startNode = a.node;
                        startOffset = this.findOffset(a.node, txt, 1, startIndex - a.offset)
                    }
                    if (endIndex == a.offset || (endIndex > a.offset && ((i + 1) == list.length || endIndex < list[i + 1].offset))) {
                        endNode = a.node;
                        endOffset = this.findOffset(a.node, txt, 0, endIndex - a.offset);
                        break
                    }
                }
                if (startNode && endNode) {
                    function descendantOf(element, ancestor) {
                        while (element = element.parentNode) {
                            if (element == ancestor) {
                                return true
                            }
                        }
                        return false
                    }

                    // 公共父节点
                    var ancestor = startNode;
                    while (ancestor = ancestor.parentNode) {
                        if (descendantOf(endNode, ancestor)) {
                            commonAncestor = ancestor;
                            break
                        }
                    }
                    if (!commonAncestor) {
                        return null
                    }
                }
                return startNode && endNode ? {
                    startNode: startNode,
                    endNode: endNode,
                    startOffset: startOffset,
                    endOffset: endOffset,
                    endIndex: endIndex,
                    commonAncestor: commonAncestor,
                    txt: txt
                } : null
            },
            paint: function(id) {
                var z = this;
                var ann = Annotation.find(id);
                var classId = H.HIGHLIGHT_ID_CLASS + ann.id;
                var comments = ann.comments;
                if (ann.paintedSuccessfully) {
                    addHighlightClass("em." + classId, ann);
                    addIconClass("div." + classId, ann);
                    $("em." + classId).filter(":first").toggleClass("diigoHighlightcommented", comments.length > 0);
                    return
                }
                ann.painted = true;
                function addHighlightClass(em, ann) {
                    $(em).addClass(H.HIGHLIGHT_CLASS).addClass(classId).addClass(H.HIGHLIGHT_TYPE_CLASS + ann.type).removeClass("yellow blue green pink").addClass((ann.extra.color && ann.extra.color.length > 0) ? ann.extra.color : "yellow");
                    return em
                }
                function wrap(node) {
                    var j = $(node.parentNode);
                    if (j.hasClass(H.HIGHLIGHT_CLASS)) {
                        j.addClass(classId)
                    } else {
                        $(node).wrap(addHighlightClass(doc.createElement("em"), ann))
                    }
                }
                this.domSnapshot();
                var info = this.seek(ann.content, ann.nth);
                if (!info) {
                    return
                }
                ann.prettyTxt = this.html2txt_pretty(ann.content);
                if (info.startNode === info.endNode) {
                    if (info.endOffset <= info.startOffset) {
                        info.startOffset = info.endOffset - info.txt.length
                    }
                    var t = info.startNode.splitText(info.startOffset);
                    var t1 = t.splitText(info.endOffset - info.startOffset);
                    wrap(t1.previousSibling || t)
                } else {
                    var startNode = info.startNode.splitText(info.startOffset);
                    var endNode = info.endNode.splitText(info.endOffset).previousSibling;
                    var on = false;
                    var textNodes = [];
                    new DOMWalker(info.commonAncestor, function(n) {
                        if (!on && n === startNode) {
                            on = true
                        }
                        if (on) {
                            if (z.isTextNode(n) && n.nodeValue.replace(/(^\s+|\s+$)/g, "").length > 0) {
                                textNodes.push(n)
                            }
                        }
                        if (on && n === endNode) {
                            on = false;
                            throw DOMWalker.$end
                        }
                    },
                    {
                        filter: this.isHighlightableNode
                    }).walk();
                    forEach(textNodes, function(v) {
                        wrap(v)
                    })
                }
                var j = $("em." + classId);
                ann.paintedSuccessfully = j.size() > 0;
                function addIconClass(icon, ann) {
                    $(icon).addClass(H.HIGHLIGHT_ICON_CLASS).addClass(classId).addClass(H.HIGHLIGHT_TYPE_CLASS + ANNOTATION_TYPE_ICON).addClass("TextIcon").toggleClass("public", ann.isPublic() && comments.length > 0).toggleClass("private", ann.isPrivate() && comments.length > 0).toggleClass("group", ann.inAnyGroups() && comments.length > 0).toggleClass("diigoHighlightcommented", comments.length > 0).css({
                        left: "0px",
                        top: "-8px"
                    });
                    if (comments.length > 0) {
                        $(icon).html("<span class='" + classId + " " + H.HIGHLIGHT_ICON_CLASS + " " + H.HIGHLIGHT_TYPE_CLASS + ANNOTATION_TYPE_ICON + "'>" + comments.length + "</span>");
                        $(icon).attr("title", AnnotationContextMenu.tipMsg(ann));
                        z.adjustIconBg(ann)
                    } else {
                        $(icon).html("");
                        $(icon).attr("title", "")
                    }
                    return icon
                }
                if (ann.type == ANNOTATION_TYPE_TEXT && $("div." + classId).size() <= 0 && j.size() > 0) {
                    var icon = $(doc.createElement("div"));
                    var fNode = j.filter(":first");
                    fNode.toggleClass("diigoHighlightcommented", comments.length > 0);
                    icon.prependTo(fNode);
                    addIconClass(icon, ann)
                }
                if (j.size() > 0) {
                    var offset = j.offset();
                    ann.extra.top = offset.top;
                    ann.extra.left = offset.left
                }
                this.adjustColor(ann);
                return ann.paintedSuccessfully
            },
            adjustIconBg: function(ann) {
                var curwin = window,
                bgcolor;
                try {
                    var high = $("em." + H.HIGHLIGHT_ID_CLASS + ann.id);
                    var re = high.parents().filter(function(index) {
                        var over = curwin.getComputedStyle(this, null).getPropertyValue("background-color");
                        if (over != "transparent") {
                            bgcolor = over;
                            throw "end"
                        }
                        return false
                    })
                } catch(e) {}
                var icon = $("div.diigoIcon.diigoHighlightcommented.private." + H.HIGHLIGHT_ID_CLASS + ann.id);
                icon.attr("style", "background-color:" + bgcolor + " !important")
            },
            adjustColor: function(h) {
                function L(color) {
                    var RsRGB = color.r / 255;
                    var GsRGB = color.g / 255;
                    var BsRGB = color.b / 255;
                    var R = (RsRGB <= 0.03928) ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
                    var G = (GsRGB <= 0.03928) ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
                    var B = (BsRGB <= 0.03928) ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);
                    return 0.2126 * R + 0.7152 * G + 0.0722 * B
                }
                function isReadable(txtColor, bgColor) {
                    var l1 = L(txtColor);
                    var l2 = L(bgColor);
                    if (l1 > l2) {
                        var a = l1,
                        b = l2
                    } else {
                        var a = l2,
                        b = l1
                    }
                    return (a + 0.05) / (b + 0.05) > 2.5
                }
                function readableColor(txtColor, bgColor) {
                    if (isReadable(txtColor, bgColor)) {
                        return null
                    }
                    var l = L(bgColor);
                    return l > 0.5 ? "#000000" : "#FFFFFF"
                }
                var ann = Annotation.find(h);
                $("em." + H.HIGHLIGHT_ID_CLASS + ann.id).each(function(i, v) {
                    var j = $(v);
                    var bgColor = Utils.parseColor(j.css("backgroundColor"));
                    var txtColor = Utils.parseColor(j.css("color"));
                    var newTxtColor = readableColor(txtColor, bgColor);
                    if (newTxtColor) {
                        j.css("color", newTxtColor)
                    }
                })
            },
            unpaint: function(id) {
                var ann = Annotation.find(id);
                id = ann.id;
                var klass = H.HIGHLIGHT_ID_CLASS + id;
                $("em." + klass).each(function(i, v) {
                    var j = $(v);
                    j.removeClass(klass);
                    if (false && /(^|\s)diigolet-highlightId_[a-zA-Z0-9]+(\s|$)/.test(j.attr("className"))) {
                        return
                    } else {
                        var e;
                        while (e = v.firstChild) {
                            v.parentNode.insertBefore(e, v)
                        }
                        j.remove()
                    }
                })
            },
            isTextNode: function(node) {
                return node.nodeType == 3
            },
            isTextSelected: function() {
                if (window.getSelection) {
                    return trim(String(window.getSelection())).length > 0
                } else { if ($.browser.msie) {
                        return document.selection.type == "Text" && trim(document.selection.createRange().text).length > 0
                    } else {
                        return false
                    }
                }
            },
            checkSelection: function() {
                var t;
                var sel, result = {
                    ok: false,
                    txt: "",
                    html: "",
                    msg: "",
                    pen: false
                };
                var endNode = null;
                if (!this.isTextSelected()) {
                    result.msg = MSG_HIGHLIGHT_LENGTH;
                    result.pen = true;
                    return result
                }
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (!sel.removeAllRanges) {
                        result.html = String(sel)
                    } else {
                        result.html = this.range2html(t = sel.getRangeAt(0));
                        endNode = t.endContainer
                    }
                } else { if ($.browser.msie) {
                        result.html = this.range2html(document.selection.createRange())
                    } else {
                        result.html = document.getSelection()
                    }
                }
                result.txt = this.html2txt(result.html);
                if (result.txt.length < 5 || result.txt.length > 2000) {
                    result.msg = MSG_HIGHLIGHT_LENGTH;
                    result.pen = true;
                    return result
                }
                if ($("<div></div>").html(result.html).find(".diigoHighlight,.diigolet").size() > 0) {
                    result.msg = "Selection cannot be highlighted.";
                    return result
                }
                result.ok = true;
                if (endNode) {
                    var z = this,
                    docTxt = "",
                    nth = 0;
                    new DOMWalker(document.body, function(n) {
                        if (n.nodeType == 3) {
                            var nodeTxt = n.nodeValue.replace(/\s+/g, "");
                            if (nodeTxt) {
                                docTxt += nodeTxt
                            }
                        }
                        if (n == endNode) {
                            throw DOMWalker.$end
                        }
                    },
                    {
                        filter: function(n) {
                            return z.domSnapshotNodeFilter(n)
                        }
                    }).walk();
                    var startIndex = 0,
                    endIndex = 0,
                    n = 0;
                    while ((startIndex = docTxt.indexOf(result.txt, endIndex)) > -1) {
                        nth++;
                        endIndex = startIndex + result.txt.length - 1
                    }
                    result.nth = nth
                } else {
                    result.nth = 1
                }
                return result
            },
            range2html: function(range) {
                var html = range.htmlText == undefined ? $("<div></div>").append(range.cloneContents()).html() : range.htmlText;
                return this.stripScripts(html)
            },
            stripScripts: function(s) {
                return s.replace(new RegExp("(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)", "img"), "")
            },

            // 删除 html 的标签和空格，返回文本字符串
            html2txt: function(html) {
                var n = $("<div></div>").html(this.stripScripts(html)).appendTo(document.body).hide();
                var thiz = this;
                var txt = "";
                new DOMWalker(n[0], function(n) {
                    if (n.nodeType == 3) {
                        txt += n.nodeValue
                    }
                },
                {
                    filter: function(n) {
                        return n.nodeType == 3 || (n.nodeType == 1 && thiz.tagBlackList.indexOf("," + n.tagName.toLowerCase() + ",") == -1)
                    }
                }).walk();
                n.remove();
                return txt.replace(/\s+/g, "")
            },


            html2txt_pretty: function(html) {
                var t = $("<div></div>").html(this.stripScripts(html)).appendTo(document.body);
                var range, txt;
                if (window.getSelection && window.getSelection().removeAllRanges) {
                    range = document.createRange();
                    range.setStart(t[0], 0);
                    range.setEnd(t[0], t[0].childNodes.length);
                    txt = this.range2txt(range)
                } else { if ($.browser.msie) {
                        t.hide().appendTo(document.body);
                        range = document.body.createTextRange();
                        range.moveToElementText(t[0]);
                        txt = this.range2txt(range)
                    } else {
                        txt = this.node2txt(t[0])
                    }
                }
                t.remove();
                return txt
            },
            node2txt: function(node) {
                var txt = "",
                prevType = 3;
                new DOMWalker(node, function(n) {
                    if (n.nodeType == 3 && $(n).parents("script").size() == 0) {
                        txt += (prevType == 3 ? "" : "\n") + n.nodeValue
                    }
                    prevType = n.nodeType
                }).walk();
                return this.normalizeTxt(txt)
            },
            range2txt: function(range) {
                var txt;
                if (window.getSelection) {
                    var selection = window.getSelection();
                    selection.removeAllRanges ? selection.removeAllRanges() : selection.collapse();
                    selection.addRange(range);
                    txt = selection.toString();
                    selection.removeAllRanges ? selection.removeAllRanges() : selection.collapse()
                } else { if ($.browser.msie) {
                        txt = range.text
                    } else {
                        txt = "";
                        alert("Browser not supported!")
                    }
                }
                return this.normalizeTxt(txt)
            },
            normalizeTxt: function(txt) {
                return gsub(trim(txt), /\s+/, function(m) {
                    return m[0].match(/[\r\n]/) ? "\n" : " "
                }).replace(/[\r|\n]+/g, "\n")
            }
        };
        function DOMWalker(node, func, options) {
            this.options = $.extend({
                reverse: false,
                whatToShow: -1,
                filter: function() {
                    return true
                }
            },
            options || {});
            this.node = node;
            this.func = func;
            this.end = false
        }
        DOMWalker.$end = new Error("end walking");
        DOMWalker.prototype.walk = function() {
            this._walk(this.node, this.func)
        };
        DOMWalker.prototype._walk = function(node, func) {
            var o = this.options;
            if (this.end) {
                return
            }
            if (!o.filter(node)) {
                return
            }
            try {
                func(node)
            } catch(e) {
                if (e === DOMWalker.$end) {
                    this.end = true;
                    return
                }
                throw e
            }
            node = o.reverse ? node.lastChild : node.firstChild;
            while (node) {
                this._walk(node, func);
                node = o.reverse ? node.previousSibling : node.nextSibling
            }
        };
        var DlgIC = {
            j: null,
            pinned: false,
            shown: false,
            showMode: "view",
            dragging: false,
            filterMode: "_all",
            ann: null,
            init: function() {
                var z = this;
                z.create();
                z.editor.init();
                z.jCommentList = z.j.find(".diigoletFNContent");
                setTimeout(function() {
                    z.j.bind("mouseleave", function(event) {
                        if (z.dragging || Ctx.draggingFloatNote || z.editing) {
                            return
                        }
                        z.scheduleHide()
                    }).bind("mouseenter", function(event) {
                        if (z.dragging || Ctx.draggingFloatNote) {
                            return
                        }
                        z.cancelHide()
                    })
                },
                13);
                $(".IconFeild").mouseover(function() {
                    z.showActionDropdown()
                }).click(function() {
                    return false
                });
                $id("diigolet-dlgIC-close").click(function() {
                    z.hide();
                    return false
                });
                Ctx.addEventListener("ic_add", z);
                Ctx.addEventListener("ic_del", z);
                Ctx.addEventListener("ann_del", z);
                new $.Draggable(z.j, {
                    handle: "._dragHandle"
                })
            },
            destroy: function() {},
            create: function() {
                var code = $html(HTML_DLG_IC);
                this.j = code.css({
                    position: "absolute"
                }).appendTo(doc.body).hide();
                if ($.browser.ieBelow7) {
                    this.j.addClass("diigoletFNIEPatch")
                }
            },
            showEditSticky: function(showMode) {
                var z = this;
                z.editor.show();
                return
            },
            show: function(event, ann, showMode) {
                return this.show_(event.pageX, event.pageY, ann, "edit")
            },
            show_: function(x, y, ann, showMode) {
                var z = this;
                z.ann = ann;
                showMode = showMode || "view";
                z.cancelHide();
                z.cancelShow();
                debug("[IC] showing...");
                z.j.find("ul.diigoletFNDropdown").hide();
                if (showMode === undefined) {
                    showMode = z.showMode
                } else {
                    z.showMode = showMode
                }
                Csm.hide();
                AnnotationContextMenu.hide();
                var j = z.j.toggleClass("editing", showMode != "view");
                var isMyHighlight = ann.user == Ctx.user;
                j.find("._menuItem_deleteSticky").showHide(ann.canDelete(z.filterMode));
                if (showMode != "view") {
                    z.showEditSticky(showMode)
                } else {
                    z.editor.remove()
                }
                z.refreshComments();
                var tip = AnnotationContextMenu.tipMsg(z.ann);
                z.j.find("span.personalText").text(tip);
                if (tip.length > 80) {
                    $(".footText").addClass("multipalCol");
                    $(".footText").removeClass("singleCol")
                } else {
                    $(".footText").addClass("singleCol");
                    $(".footText").removeClass("multipalCol")
                }
                if (ann.user == Ctx.user) {
                    $(".IconFeild").show();
                    $(".footText").addClass("myCommentSpan");
                    $(".footText").removeClass("notMyCommentSpan")
                } else {
                    $(".IconFeild").hide();
                    $(".footText").addClass("notMyCommentSpan");
                    $(".footText").removeClass("myCommentSpan")
                }
                if (! (z.shown && showMode != "view")) {
                    z.updatePos({
                        pageX: x,
                        pageY: y
                    })
                }
                j.show();
                z.shown = true
            },
            hide: function() {
                this.cancelHide();
                this.cancelShow();
                if (!this.shown) {
                    return
                }
                this.j.hide();
                this.shown = this.editing = this.pinned = false;
                var ann = this.ann;
                ann.activate(false);
                if (ann && ann.type == ANNOTATION_TYPE_FLOATNOTE && !ann.saved && !ann.saving && !ann.deleted) {
                    ann.del()
                }
            },
            showActionDropdown: function() {
                var offset = this.j.find("div.IconFeild").offset();
                var menu = $id("diigolet-annMenu");
                menu.find("#diigolet-annMenu-add").hide();
                menu.find("#diigolet-annMenu-del").hide();
                menu.find("#diigolet-annMenu-tip").hide();
                AnnotationContextMenu.ann = this.ann;
                if (this.ann.type == ANNOTATION_TYPE_FLOATNOTE) {
                    menu.find("._onlyMy").hide();
                    menu.find("#diigolet-annMenu-My").show()
                } else {
                    menu.find("._onlyMy").show();
                    $.each(Ctx.defaultColor, function(i, v) {
                        var coloritem = $id("diigolet-context-" + v);
                        coloritem.toggleClass("colorchecked", false)
                    });
                    if (ann.extra && ann.extra.color && ann.extra.color.length > 0) {
                        $id("diigolet-context-" + ann.extra.color).toggleClass("colorchecked", true)
                    } else {
                        $id("diigolet-context-yellow").toggleClass("colorchecked", true)
                    }
                }
                menu.find("#diigolet-annMenu-tip-before").hide();
                menu.css({
                    top: offset.top + 20,
                    left: offset.left
                });
                mouseOutAndHide(menu.show(), 13)
            },
            refreshComments: function() {
                var z = this;
                var ann = z.ann;
                var comments = ann.getComments(z.filterMode);
                z.jCommentList.empty();
                forEach(comments, function(c) {
                    z.addInlineComment(c)
                });
                return;
                var h = this.editingHighlight;
                var html = "";
                if (h) {
                    $.each(h.comments, function(k, v) {
                        html += ' <blockquote>#{CONTENT}</blockquote><p class="diigoletFNAuthorP">by <a target="_blank" href="#{DIIGO_SERVER}/user/#{USER}" title="Who posted this sticky note" class="diigoletFNAuthor">#{USER}</a> <span class="date">#{DATE}</span>' + (v.user == Ctx.user ? ' <span class="diigoletFNEdit"><a href="#" onclick="#{CLICK_EDIT}" title="Edit the comment">[Edit]</a>&nbsp;<a href="#" onclick="#{CLICK_DELETE}" title="Delete the comment">[Delete]</a></span>' : "") + "#{GROUPS}</p>";
                        var groupsHtml = "";
                        if (v.groups.length > 0) {
                            groupsHtml = "<br/><span>shared to: " + $.map(v.groups, function(vv) {
                                return '<a class="diigoletFNAuthor" href="#{href}" title="#{displayName}">#{displayName}</a>'.evalTpl({
                                    href: DIIGO_GROUP_SERVER + "/groups/" + vv.name,
                                    displayName: vv.displayName
                                })
                            }).join(", ") + "</span>"
                        }
                        html = html.evalTpl({
                            USER: v.user,
                            CONTENT: v.content,
                            DIIGO_SERVER: DIIGO_SERVER,
                            CLICK_DELETE: "return diigolet.handle(event, 'hlDeleteComment', '#{0}', '#{1}')".evalTpl([v.id, h.id]),
                            CLICK_EDIT: "return diigolet.handle(event, 'hlEditComment', '#{0}', '#{1}')".evalTpl([v.id, h.id]),
                            DATE: v.datetime,
                            GROUPS: groupsHtml
                        })
                    })
                }
                this.j.find("div.diigoletFNContent").html(html);
                this.showNoComments()
            },
            showNoComments: function() {
                var z = this;
                if (z.ann.getComments(z.filterMode).length == 0) {
                    z.j.find("div.diigoletFNContent").html('<span class="noComments">There are no sticky notes yet.</span>')
                }
            },
            updatePos: function(e) {
                if (this.j.css("display") == "none") {
                    this.j.css({
                        left: -999,
                        top: -999,
                        display: "block"
                    })
                }
                var h = this.ann;
                var j = this.j.find("div.diigoletFNContent");
                j.css({
                    height: ""
                });
                if (j.height() > 214) {
                    j.height(214)
                } else {
                    j.css({
                        height: ""
                    })
                }
                var l = h.type != 2 ? e.pageX - 8 : parseInt(h.getEle().css("left")) + 20,
                t = h.type != 2 ? e.pageY - 8 : parseInt(h.getEle().css("top")) + 20;
                var j = this.j;
                var left = $(document).scrollLeft(),
                top = $(document).scrollTop(),
                right = left + $(window).width() - j.width() - 10,
                bottom = top + $(window).height() - j.height() - 10;
                if (l > right) {
                    l = right
                }
                if (l < left) {
                    l = left
                }
                if (t > bottom) {
                    t = bottom
                }
                if (t < top) {
                    t = top
                }
                j.css({
                    left: l,
                    top: t
                })
            }
        };
        var DlgIC_part1 = {
            showDelay: 200,
            showTimer: null,
            hideDelay: 300,
            hideTimer: null,
            cancelShow: function() {
                clearTimeout(this.showTimer);
                this.showTimer = null
            },
            cancelHide: function() {
                clearTimeout(this.hideTimer);
                this.hideTimer = null
            },
            aboutToShow: function() {
                return this.shown || this.showTimer
            },
            aboutToHide: function() {
                return !this.shown || this.hideTimer
            },
            scheduleShow: function(event, ann) {
                var z = this;
                var clonedEvent = {
                    pageX: event.pageX,
                    pageY: event.pageY
                };
                z.cancelHide();
                z.cancelShow();
                z.showTimer = setTimeout(function() {
                    z.show(clonedEvent, ann)
                },
                z.showDelay)
            },
            scheduleHide: function() {
                var z = this;
                z.cancelHide();
                z.cancelShow();
                z.hideTimer = setTimeout(function() {
                    z.hide()
                },
                z.hideDelay)
            }
        };
        extend(DlgIC, DlgIC_part1);
        var DlgIC_part2 = {
            eleId_ic: function(c) {
                return "diigolet-dlgIC-ic_" + c.id
            },
            _labelsHtml: function(c) {
                var commentType = c.annotationId ? "ic" : "pc";
                var filter = this.filterMode,
                html = "",
                delHtml = c.canDelete() ? '<a href="javascript:void(0)" class="del" onclick="#{ONCLICK};"><img title="Delete" src="http://www.diigo.com/client/ietoolbar/spacer.gif" style="width:12px;height:12px;cursor:pointer" alt="" /></a>' : "";
                if (c.isPublic() && (filter == "_all" || filter == "_public") && c.user == Ctx.user) {
                    html += '<label class="_public"><span>Public</span>DEL</label>'.replace("DEL", evalTpl(delHtml, {
                        ONCLICK: "diigolet.handle(event, 'dlgIC_del_ic', '" + c.id + "')"
                    }))
                }
                if (c.isPrivate() && (filter == "_all" || filter == "_private")) {
                    html += '<label class="_private"><span>Private</span>DEL</label>'.replace("DEL", evalTpl(delHtml, {
                        ONCLICK: "diigolet.handle(event, 'dlgIC_del_ic', '" + c.id + "')"
                    }))
                }
                forEach(c.groups, function(g) {
                    if (filter == g.name || filter == "_all") {
                        html += evalTpl('<label class="_#{GROUP_NAME}"><a href="#{GROUP_URL}" class="link">#{GROUP_DISPLAY_NAME}</a>#{DEL}</label>', {
                            GROUP_NAME: g.name,
                            GROUP_DISPLAY_NAME: g.displayName,
                            GROUP_URL: D.urls.getGroupURL(g.name),
                            DEL: evalTpl(delHtml, {
                                ONCLICK: "diigolet.handle(event, 'dlgIC_del_ic', '" + c.id + "', '" + g.name + "')"
                            })
                        })
                    }
                });
                return html
            },
            addInlineComment: function(c) {
                var z = this;
                var list = z.jCommentList;
                if (!c.matchFilter(z.filterMode)) {
                    return
                }
                var j = $id(z.eleId_ic(c));
                if (j.length == 0) {
                    var html = '<div id="#{ID}" class="ic"><p class="diigoletFNAuthorP"><a target="_blank" href="#{USER_URL}" title="Who posted this sticky note" class="diigoletFNAuthor">#{REALNAME}</a> <span class="date">#{DATETIME}</span><p class="labelList">#{LABELS_HTML}</p><blockquote>#{CONTENT}</blockquote></p></div>';
                    html = evalTpl(html, {
                        ID: z.eleId_ic(c),
                        USER: c.user,
                        REALNAME: c.realName,
                        USER_URL: D.urls.getUserHomepageURL(c.user),
                        DATETIME: c.datetime,
                        LABELS_HTML: z._labelsHtml(c),
                        CONTENT: Utils.content2Html(c.content)
                    });
                    list.append($html(html))
                }
            },
            removeInlineComment: function(c, groupName) {
                var z = this;
                var j = $id(z.eleId_ic(c));
                if (j.length == 0) {
                    return
                }
                var labelList = j.find("p.labelList label");
                if (groupName) {
                    labelList.remove("label._" + groupName)
                } else {
                    labelList.remove("label._public").remove("label._private")
                }
                if (j.find("p.labelList label").length == 0) {
                    j.remove();
                    z.j.find("._menuItem_deleteSticky").showHide(c.getAnnotation().canDelete(z.filterMode))
                }
                this.showNoComments()
            },
            onclick_del_ic: function(event, id, groupName) {
                InlineComment.del(id, groupName);
                event.stopPropagation();
                event.preventDefault()
            },
            onic_add: function(c, groupName) {
                this.addInlineComment(c, groupName)
            },
            onic_del: function(c, groupName) {
                this.removeInlineComment(c, groupName)
            },
            onann_del: function(ann, groupName) {
                if (ann == this.ann) {
                    ann.deleted = true;
                    this.hide()
                }
            }
        };
        extend(DlgIC, DlgIC_part2);
        var DlgIC_part3 = {
            editor: {
                jEdit: null,
                init: function() {
                    var z = this;
                    z.jEdit = DlgIC.j.find(".diigoletFNComment");
                    $id("diigoletFNSubmit").click(function() {
                        z.submit()
                    });
                    z.jEdit.find("textarea").keypress(function(event) {
                        if (event.keyCode == 13 && event.ctrlKey) {
                            z.submit()
                        }
                    });
                    $id("diigoletFNCancel").click(function() {
                        z.remove();
                        if (DlgIC.jCommentList.find(">.ic").length == 0) {
                            DlgIC.hide()
                        }
                    })
                },
                submit: function() {
                    var z = this;
                    var content = z.jEdit.find("textarea").val();
                    if (!content) {
                        Toolbar.notify(MSG_COMMENT_CANNOT_BE_EMPTY);
                        return
                    }
                    var t = z.jEdit.find("select").val(),
                    mode,
                    groupName;
                    if (t == "_private") {
                        mode = 2
                    } else { if (t == "_public") {
                            mode = 0
                        } else {
                            groupName = t
                        }
                    }
                    var data = {
                        annotationId: DlgIC.ann.id,
                        mode: mode,
                        content: content
                    };
                    if (groupName) {
                        data.justForGroups = true;
                        data.groups = [groupName]
                    }
                    var ann = Annotation.find(data.annotationId);
                    if (ann.type == ANNOTATION_TYPE_FLOATNOTE && !ann.saved) {
                        ann._toAddInlineComment = data;
                        ann.saving = true;
                        WebAPI.addAnnotation(ann)
                    } else {
                        WebAPI.addInlineComment(data)
                    }
                    z.remove();
                    DlgIC.hide()
                },
                remove: function() {
                    DlgIC.editing = false;
                    if (!this.jEdit[0].parentNode) {
                        return
                    }
                    DlgIC.j.find(".diigoletFNContent").show();
                    DlgIC.j.find(".diigoletFNComment").hide();
                    DlgIC.j.find("._stickyTitle").html("Sticky Notes")
                },
                show: function() {
                    DlgIC.editing = true;
                    var j = $(".diigoletFNPriSlct").empty();
                    var ann = DlgIC.ann;
                    var filterMode = DlgIC.filterMode;
                    if ((filterMode == "_all" || filterMode == "_public") && (ann ? publicAnnotationsAllowed(Ctx.bookmark.url) : true) && (ann ? !ann.onlyInGroup && ann.getComments("_private").length == 0 : true)) {
                        j.append('<option value="_public">Public</option>')
                    }
                    if ((filterMode == "_all" || filterMode == "_private") && (ann ? !ann.onlyInGroup && ann.getComments("_public").length == 0 : true)) {
                        j.append('<option value="_private">Private</option>')
                    }
                    forEach(Ctx.myGroups, function(g) {
                        if ((filterMode == "_all" || filterMode == g.name) && (ann && (ann.user != Ctx.user || ann.onlyInGroup) ? ann.inGroup(g.name) : true)) {
                            j.append(Utils.dom.buildOne("option", {
                                value: g.name
                            },
                            [g.displayName]))
                        }
                    });
                    if (filterMode == "_all" && ann && ann.isPrivate()) {
                        j.val("_private")
                    }
                    if (j.find("option").length == 0) {
                        DlgIC.j.find(".diigoletFNComment").hide();
                        return
                    }
                    DlgIC.j.find(".diigoletFNComment").show();
                    this.jEdit.find("textarea").val("").focus();
                    DlgIC.j.find("._stickyTitle").html("Add Sticky Note")
                }
            }
        };
        extend(DlgIC, DlgIC_part3);
        var DlgBookmark = {
            shown: false,
            ele: null,
            init: function() {
                this.create()
            },
            destroy: function() {},
            show: function() {
                if (!checkSignIn() || (this.shown && this.j.is(":visible"))) {
                    return
                }
                this.shown = true;
                DlgIC.hide();
                Post2Twitter.hide();
                this.j.show();
                this.syncData("data->form")
            },
            hide: function(dontSync) {
                if (this.shown) {
                    this.shown = false;
                    this.j.hide();
                    if (!dontSync) {
                        this.syncData("form->data")
                    }
                }
            },
            create: function() {
                this.j = new $html(HTML_DLG_BOOKMARK).css({
                    position: $.browser.supportPositionFixed ? "fixed" : "absolute"
                }).hide().appendTo(doc.body).hide()
            },
            syncData: function(dir) {
                var bm = Ctx.bookmark;
                if (dir == "data->form") {
                    $("#Diigo-Bookmark-Url").val(bm.url);
                    $("#Diigo-Bookmark-Title").val(bm.getTitle());
                    $("#Diigo-Bookmark-Tag").val(D.unparseTags(bm.tags));
                    $("#Diigo-Bookmark-Privacy").attr("checked", bm.mode == PRIVACY_MODE_PRIVATE);
                    $("#Diigo-Bookmark-Unread").attr("checked", bm.unread);
                    $("#Diigo-Bookmark-Description").val(bm.description || Utils.dom.getSelection());
                    this.updateGroups();
                    this.updateLists()
                } else { if (dir == "form->data") {
                        bm.url = $("#Diigo-Bookmark-Url").val();
                        bm.title = $("#Diigo-Bookmark-Title").val();
                        bm.tags = D.parseTags($("#Diigo-Bookmark-Tag").val(), true);
                        bm.mode = $("#Diigo-Bookmark-Privacy").attr("checked") ? PRIVACY_MODE_PRIVATE : PRIVACY_MODE_PUBLIC;
                        bm.unread = $("#Diigo-Bookmark-Unread").is(":checked");
                        bm.description = $("#Diigo-Bookmark-Description").val();
                        var shareTo = $("#Diigo-Bookmark-selectShareTo").val();
                        if (shareTo == "-1" || shareTo == "-2") {
                            bm.toShareToGroups = []
                        } else {
                            bm.toShareToGroups = [shareTo];
                            bm.toShareExistingAnnotations = $id("Diigo-Bookmark-checkShareExisting").is(":checked")
                        }
                        var shareTo = $("#diigo-lists").val();
                        if (shareTo == "-1" || shareTo == "-2") {
                            bm.toSharetoBmList = []
                        } else {
                            bm.toSharetoBmList = [shareTo]
                        }
                    }
                }
            },
            updateLists: function() {
                var z = this;
                var j = $id("diigolet-add-to-list").showHide(Ctx.myBmList.length > 0);
                if (!Ctx.myBmList.length) {
                    return
                }
                j = $("#diigo-lists").empty().unbind();
                j.append(Utils.dom.buildOne("option", {
                    value: -1
                },
                [new Array(20).join("-")]));
                forEach(Ctx.myBmList, function(g) {
                    j.append(Utils.dom.buildOne("option", {
                        value: g.id
                    },
                    [g.title + (Ctx.bookmark.inList(g.id) ? "(shared)" : "")]))
                });
                j.append(Utils.dom.buildOne("option", {
                    value: -1
                },
                [new Array(20).join("-")]));
                $(Utils.dom.buildOne("option", {
                    value: -2
                },
                ["Create a List..."])).appendTo(j);
                j.change(function() {
                    if (j.val() == -2) {
                        window.open(D.urls.getCreateListURL())
                    }
                });
                j.val(0).change()
            },
            updateGroups: function() {
                var z = this;
                var j = $id("diigolet-bm-shareToGroupsRegion").showHide(Ctx.myGroups.length > 0);
                if (!Ctx.myGroups.length) {
                    return
                }
                j = $("#Diigo-Bookmark-selectShareTo").empty().unbind().change(function() {
                    z.afterGroupSelectionChange()
                });
                j.append(Utils.dom.buildOne("option", {
                    value: -1
                },
                [new Array(20).join("-")]));
                forEach(Ctx.myGroups, function(g) {
                    j.append(Utils.dom.buildOne("option", {
                        value: g.name
                    },
                    [g.displayName + (Ctx.bookmark.inGroup(g.name) ? "(shared)" : "")]))
                });
                j.append(Utils.dom.buildOne("option", {
                    value: -1
                },
                [new Array(20).join("-")]));
                $(Utils.dom.buildOne("option", {
                    value: -2
                },
                ["Create a Group..."])).appendTo(j);
                j.change(function() {
                    if (j.val() == -2) {
                        window.open(D.urls.getCreateGroupURL())
                    }
                });
                j.val(0).change()
            },
            afterGroupSelectionChange: function() {
                var groupSelected = $("#Diigo-Bookmark-selectShareTo").val() != "-1";
                var j = $id("Diigo-Bookmark-checkShareExisting");
                j.parent().showHide(groupSelected && Ctx.isAnnotated())
            },
            submitAndClose: function(type) {
                var ok = true,
                msg = "";
                if ($("#Diigo-Bookmark-Url").val().match(/^\s*$/)) {
                    ok = false;
                    msg = "Please input a valid url."
                }
                if ($("#Diigo-Bookmark-Title").val().match(/^\s*$/)) {
                    ok = false;
                    msg = "Please input bookmark title."
                }
                if (!ok) {
                    Toolbar.notify(msg);
                    return
                }
                this.syncData("form->data");
                WebAPI.saveBookmark();
                this.hide();
                $("#Diigo-Bookmark-checkShareExisting").attr("checked", false)
            }
        };
        var Post2Twitter = {
            url: "",
            tinyUrl: "",
            message: "",
            MAX_COUNT: 140,
            index: 0,
            shown: false,
            init: function() {
                this.create()
            },
            destroy: function() {},
            create: function() {
                this.j = new $html(POST_TO_TWITTER).css({
                    position: "absolute"
                }).hide().appendTo(doc.body).hide()
            },
            show: function() {
                if (!checkSignIn() || (this.shown && this.j.is(":visible"))) {
                    return
                }
                this.shown = true;
                DlgIC.hide();
                DlgBookmark.hide();
                this.j.show();
                var bm = Ctx.bookmark;
                if (this.tinyUrl.length > 0) {
                    $("#message-editor").val(this.composeMessage(bm.title, this.tinyUrl));
                    this.onMessageChanged()
                } else {
                    $("#message-editor").val("Loading URL. Please wait ...");
                    this.onMessageChanged();
                    var t = this;
                    this.shortenUrl(bm.url, function(event) {
                        t.tinyUrl = Url;
                        $("#message-editor").val(t.composeMessage(bm.title, t.tinyUrl));
                        $id(this.id).remove()
                    })
                }
            },
            hide: function() {
                if (this.shown) {
                    this.shown = false;
                    this.j.hide()
                }
            },
            doUpdate: function(message) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "diigoscripttwitter" + this.index++;
                script.src = "http://twitter.com/statuses/update.json?source=diigo&status=" + encodeURIComponent(message);
                $("head,body").add(document.body)[0].appendChild(script)
            },
            onMessageChanged: function() {
                var txt = $("#message-editor").val();
                var left = this.MAX_COUNT - txt.length;
                if (left <= 0) {
                    $("#message-editor").val(txt.substring(0, MAX_COUNT));
                    left = 0
                }
                document.getElementById("left-count").innerHTML = left
            },
            composeMessage: function(title, url) {
                return title + " " + url + " via www.diigo.com/~" + Ctx.user
            },
            shortenUrl: function(url, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "diigoscripttwitter" + this.index++;
                script.src = "http://tinyurl.com/api-create.php?url=" + url;
                script.onload = callback;
                $("head,body").add(document.body)[0].appendChild(script)
            },
            Post: function() {
                this.doUpdate($("#message-editor").val());
                this.hide()
            },
            getTitle: function() {
                return this.title || document.title || document.location.href
            }
        };
        var Sidebar = {
            j: null,
            floating: false,
            container: null,
            init: function() {
                var z = this;
                z.create();
                Ctx.addEventListener("ic_add", z);
                Ctx.addEventListener("ic_del", z);
                Ctx.addEventListener("pc_add", z);
                Ctx.addEventListener("pc_del", z);
                Ctx.addEventListener("ann_add", z);
                Ctx.addEventListener("ann_del", z)
            },
            destroy: function() {},
            create: function() {
                var html = evalTpl(HTML_SIDEBAR, {
                    URL_DIIGO: DIIGO_SERVER
                });
                this.container = $(Ctx.launchMode.threeDForum ? "#diigo-3dforum" : "#diigolet-annotationSummary");
                var j = this.j = $(html).appendTo(this.container);
                j.find("div.addComment").hide();
                if (!Ctx.launchMode.threeDForum) {
                    j.find("span._inlineCommentsTitle").text("Sticky Notes");
                    j.find("a.add").eq(0).hide();
                    j.find("div.popOut").addClass("close")
                }
            },
            onSignIn: function() {
                this.j.find("a._signIn").hide()
            },
            onSignOut: function() {},
            togglePanel: function(what, toShow) {
                var j = $({
                    inline: "#d3df-togglePanelInline",
                    page: "#d3df-togglePanelPage"
                } [what]);
                var k = $({
                    inline: "#d3df-inlineCommentBox",
                    page: "#d3df-pageCommentBox"
                } [what]);
                var shown = !j.is(".collapsed");
                toShow = toShow !== undefined ? toShow : !shown;
                if (toShow == shown) {
                    return
                } else {
                    j.toggleClass("collapsed", !toShow);
                    k[toShow ? "slideDown" : "slideUp"]()
                }
            },
            popOut: function(dimension) {
                var j = this.j.find("div.popOut");
                var toPopIn = j.is(".popIn");
                j.toggleClass("popIn", !toPopIn);
                j.attr("title", toPopIn ? "Pop out and pin" : "Pop in");
                if (!Ctx.launchMode.threeDForum) {
                    j.attr("title", "close")
                }
                j = this.j;
                if (toPopIn) {
                    j.appendTo(this.container).css({
                        position: "static",
                        left: "",
                        top: "",
                        width: ""
                    }).find("._dragHandle").css({
                        cursor: ""
                    });
                    j[0].draggable.destroy()
                } else {
                    var o = dimension || j.offset();
                    j.css({
                        position: "absolute",
                        left: o.left,
                        top: o.top,
                        width: 260
                    }).appendTo(document.body);
                    if ($.browser.supportPositionFixed) {
                        if (dimension) {
                            j.css({
                                position: "fixed"
                            })
                        } else {
                            var docScroll = Dimension.docScroll();
                            j.css({
                                position: "fixed",
                                left: o.left - docScroll[0],
                                top: o.top - docScroll[1]
                            })
                        }
                    }
                    new $.Draggable(j, {
                        handle: "._dragHandle"
                    });
                    Ctx.toggleSilent(false)
                }
                this.floating = !toPopIn;
                this.adjustSize()
            },
            showEditPageCommentBox: function(toShow) {
                if (!requireSignIn()) {
                    WebAPI.signIn();
                    return
                }
                toShow = toShow !== undefined ? toShow : true;
                $("#d3df-sidebar div.addComment")[toShow ? "show" : "hide"]();
                this.togglePanel("page", true);
                $id("diigolet-sb-txtpc").val("");
                var j = $id("diigolet-sb-selpc").empty();
                j.append('<option value="_public">Public</option>');
                j.append('<option value="_private">Private</option>');
                forEach(Ctx.myGroups, function(g) {
                    j.append(Utils.dom.buildOne("option", {
                        value: g.name
                    },
                    [g.displayName]))
                });
                j.val("_private")
            },
            refresh: function() {
                this.refreshComments()
            },
            refreshComments: function() {
                this.refreshPageComments();
                this.refreshInlineComments()
            },
            refreshPageComments: function() {
                var z = this;
                var html = "";
                forEach(Ctx.pageComments, function(c) {
                    html += evalTpl(HTML_3DF_SIDEBAR_PAGE_COMMENT, {
                        USER: c.user,
                        CONTENT: c.content,
                        DIIGO_URL: DIIGO_SERVER,
                        DATE: c.datetime,
                        LABELS_HTML: z._labelsHtml(c)
                    })
                });
                $("#d3df-pageCommentList").html(html || HTML_3DF_SIDEBAR_NO_COMMENTS);
                this.j.find("._pageCommentCount").text(Ctx.pageComments.length + "");
                this.adjustSize()
            },
            refreshInlineComments: function() {
                Annotation.sort();
                var html = "",
                highlightHtml, inlineCommentHtml, count = 0;
                forEach(Ctx.annotations, function(v) {
                    if (! (v.type == 0 || v.type == 2 || v.type == 1)) {
                        return
                    }
                    inlineCommentHtml = "";
                    forEach(v.comments, function(c) {
                        count++;
                        inlineCommentHtml += evalTpl(HTML_3DF_SIDEBAR_INLINE_COMMENT, {
                            HIGHLIGHT_ID: v.id,
                            USER: c.user,
                            CONTENT: c.content,
                            DIIGO_URL: DIIGO_SERVER,
                            DATE: c.datetime
                        })
                    });
                    highlightHtml = evalTpl(HTML_3DF_SIDEBAR_HIGHLIGHT, {
                        ID: v.id,
                        FLOAT_NOTE_CLASS: v.type == 2 ? "floatNote" : "",
                        CONTENT: (v.prettyTxt || Hiliter.html2txt_pretty(v.content)),
                        COMMENTS: inlineCommentHtml
                    });
                    html += highlightHtml
                });
                var noCommentHTML = HTML_3DF_SIDEBAR_NO_COMMENTS;
                if (!Ctx.launchMode.threeDForum) {
                    noCommentHTML = noCommentHTML.replace("No comments", "No sticky notes")
                }
                var j = $("#d3df-inlineCommentBox").html(html || noCommentHTML);
                this.j.find("._inlineCommentCount").text(count + "");
                this.adjustSize()
            },
            adjustSize: function() {
                $("#d3df-inlineCommentBox,#d3df-pageCommentList").each(function(i) {
                    var j = $(this);
                    j.height("").height(j.height() > 180 ? 180 : "")
                })
            },
            addCommentSubmit: function() {
                var content = $id("diigolet-sb-txtpc").val();
                if (content.length <= 0 || content.length > 500) {
                    alert("Comment length should < 500 characters");
                    return
                }
                var v = $id("diigolet-sb-selpc").val(),
                mode,
                groupName;
                if (v == "_private") {
                    mode = 2
                } else { if (v == "_public") {
                        mode = 0
                    } else {
                        groupName = v
                    }
                }
                var data = {
                    urlId: Ctx.bookmark.urlId,
                    mode: mode,
                    content: content
                };
                if (groupName) {
                    data.justForGroups = true;
                    data.groups = [groupName]
                }
                WebAPI.addPageComment(data);
                this.showEditPageCommentBox(false)
            },
            jumpToHighlight: function(id) {
                Ctx.toggleSilent(false);
                var ann = Annotation.find(id);
                if (ann) {
                    ann.jumpHere(true, false)
                }
            },
            onpc_del: function(c, groupName) {
                var z = this;
                setTimeout(function() {
                    z.refreshPageComments()
                },
                100)
            },
            onpc_add: function(c, groupName) {
                this.refreshPageComments()
            },
            onic_add: function(c, groupName) {
                this.refreshInlineComments()
            },
            onic_del: function(c, groupName) {
                var z = this;
                setTimeout(function() {
                    z.refreshInlineComments()
                },
                100)
            },
            onann_add: function(ann, groupName) {
                this.refreshInlineComments()
            },
            onann_changeMode: function(ann) {
                this.refreshInlineComments()
            },
            onann_del: function(ann, groupName) {
                var z = this;
                setTimeout(function() {
                    z.refreshInlineComments()
                },
                100)
            }
        };
        var Sidebar_part1 = {
            filterMode: "_all",
            _labelsHtml: function(c) {
                var commentType = c.annotationId ? "ic" : "pc";
                var filter = this.filterMode,
                html = "",
                delHtml = c.canDelete() ? '<a href="javascript:void(0)" class="del" onclick="#{ONCLICK};">X</a>' : "";
                if (c.isPublic() && (filter == "_all" || filter == "_public") && c.user == Ctx.user) {
                    html += '<label class="_public"><span>Public</span>DEL</label>'.replace("DEL", evalTpl(delHtml, {
                        ONCLICK: evalTpl("diigolet.handle(event, 'sb_del_#{0}', '#{1}')", [commentType, c.id])
                    }))
                }
                if (c.isPrivate() && (filter == "_all" || filter == "_private")) {
                    html += '<label class="_private"><span>Private</span>DEL</label>'.replace("DEL", evalTpl(delHtml, {
                        ONCLICK: evalTpl("diigolet.handle(event, 'sb_del_#{0}', '#{1}')", [commentType, c.id])
                    }))
                }
                forEach(c.groups, function(g) {
                    if (filter == g.name || filter == "_all") {
                        html += evalTpl('<label class="_#{GROUP_NAME}"><a href="#{GROUP_URL}" class="link">#{GROUP_DISPLAY_NAME}</a>#{DEL}</label>', {
                            GROUP_NAME: g.name,
                            GROUP_DISPLAY_NAME: g.displayName,
                            GROUP_URL: D.urls.getGroupURL(g.name),
                            DEL: evalTpl(delHtml, {
                                ONCLICK: evalTpl("diigolet.handle(event, 'sb_del_#{0}', '#{1}', '#{2}')", [commentType, c.id, g.name])
                            })
                        })
                    }
                });
                return html
            },
            onclick_del_pc: function(event, id, groupName) {
                PageComment.del(id, groupName)
            }
        };
        extend(Sidebar, Sidebar_part1);
        var Csm = {
            j: null,
            shown: false,
            init: function() {
                var z = this;
                z.create()
            },
            create: function() {
                this.j = $html(HTML_CONTEXT_MENU).css({
                    position: "absolute"
                }).hide().appendTo(doc.body).hide()
            },
            show: function(event) {
                this.j.show().css({
                    left: event.pageX + 3,
                    top: event.pageY + 3
                }).show();
                this.shown = true
            },
            hide: function() {
                this.j.hide();
                this.shown = false
            }
        };
        var AnnotationContextMenu = {
            j: null,
            ann: null,
            p: null,
            showDelay: 200,
            showTimer: null,
            hideDelay: 500,
            hideTimer: null,
            shown: false,
            cancelShow: function() {
                clearTimeout(this.showTimer);
                this.showTimer = null
            },
            cancelHide: function() {
                clearTimeout(this.hideTimer);
                this.hideTimer = null
            },
            aboutToShow: function() {
                return this.shown || this.showTimer
            },
            aboutToHide: function() {
                return !this.shown || this.hideTimer
            },
            scheduleShow: function(event, ann) {
                var z = this;
                var clonedEvent = {
                    pageX: event.pageX,
                    pageY: event.pageY
                };
                z.cancelHide();
                z.cancelShow();
                z.showTimer = setTimeout(function() {
                    if (z.p == null) {
                        z.showInComment(clonedEvent, ann)
                    } else {
                        z.show(clonedEvent, ann)
                    }
                },
                z.showDelay)
            },
            scheduleHide: function() {
                var z = this;
                z.cancelHide();
                z.cancelShow();
                z.hideTimer = setTimeout(function() {
                    z.hide()
                },
                z.hideDelay)
            },
            init: function() {
                var z = this;
                z.create();
                setTimeout(function() {
                    z.j.bind("mouseleave", function() {
                        z.scheduleHide();
                        if (z.p) {
                            z.p.scheduleHide();
                            z.p.scheduleToggleEdit(false)
                        }
                    }).bind("mousemove", function() {
                        z.cancelHide();
                        if (z.p) {
                            z.p.cancelHide();
                            z.p.cancelToggleEdit()
                        }
                    }).bind("mouseenter", function() {
                        z.cancelHide();
                        if (z.p) {
                            z.p.cancelHide();
                            z.p.cancelToggleEdit()
                        }
                    });
                    z.j.click(function() {
                        z.hide()
                    })
                },
                13);
                $id("diigolet-annMenu-add").click(function(event) {
                    if (!requireSignIn()) {
                        return
                    }
                    DlgIC.show_(event.pageX, event.pageY, z.ann, "add");
                    event.preventDefault();
                    return false
                });
                $id("diigolet-annMenu-My").click(function(event) {
                    window.open(D.urls.getUserBookmarksPageURL(), "_blank");
                    return false
                });
                $("#diigolet-context-yellow,#diigolet-context-blue,#diigolet-context-green,#diigolet-context-pink").click(function(event) {
                    var color = $(this).attr("color");
                    if (!z.ann.extra || z.ann.extra == "undefined") {
                        z.ann.extra = {
                            color: color
                        }
                    } else {
                        z.ann.extra.color = color
                    }
                    WebAPI.updateExtra(z.ann);
                    z.ann.paint();
                    return false
                });
                $id("diigolet-annMenu-del").click(function(event) {
                    var ann = z.ann;
                    if (!ann.onlyInGroup) {
                        ann.del()
                    }
                    forEach(map(ann.groups, function(g) {
                        return g.name
                    }), function(groupName) {
                        ann.del(groupName)
                    });
                    event.preventDefault();
                    return false
                })
            },
            create: function() {
                this.j = $html(HTML_ANN_MENU).css({
                    position: "absolute"
                }).hide().appendTo(doc.body).hide()
            },
            show: function(event, ann) {
                this.cancelHide();
                this.cancelShow();
                if (Csm.shown) {
                    Csm.hide()
                }
                if (DlgIC.shown) {
                    DlgIC.hide()
                }
                this.ann = ann;
                this.buildMenu();
                offset = this.p.j.offset();
                this.j.css({
                    left: offset.left,
                    top: offset.top + 23
                }).show();
                this.shown = true
            },
            hide: function() {
                this.cancelHide();
                this.cancelShow();
                this.shown = false;
                this.j.hide()
            },
            buildMenu: function() {
                var ann = this.ann;
                var z = this;
                var j = z.j;
                $id("diigolet-annMenu-add").showHide(ann.canAddComments());
                $id("diigolet-annMenu-del").showHide(ann.canDelete());
                if (ann.user == Ctx.user) {
                    $("._onlyMy").show()
                } else {
                    $("._onlyMy").hide()
                }
                $.each(Ctx.defaultColor, function(i, v) {
                    $id("diigolet-context-" + v).toggleClass("colorchecked", false)
                });
                if (ann.extra && ann.extra.color && ann.extra.color.length > 0) {
                    $id("diigolet-context-" + ann.extra.color).toggleClass("colorchecked", true)
                } else {
                    $id("diigolet-context-yellow").toggleClass("colorchecked", true)
                }
                $id("diigolet-annMenu-tip-before").show();
                $id("diigolet-annMenu-tip").show();
                $id("diigolet-annMenu-tip").html(z.tipMsg(ann))
            },
            tipMsg: function(ann) {
                var tip = "#{MODE} #{WHAT} by #{REALNAME}";
                var tipData = {
                    REALNAME: ann.realName
                };
                if (ann.type == D.ANNOTATION_TYPE_FLOATNOTE) {
                    tipData.WHAT = "floating sticky note"
                } else {
                    tipData.WHAT = "highlight"
                }
                if (ann.isPublic()) {
                    tipData.MODE = "Public"
                } else { if (ann.isPrivate()) {
                        tipData.MODE = "Personal"
                    } else {
                        tipData.MODE = "Group"
                    }
                }
                if (ann.inAnyGroups()) {
                    tip += ", shared to group #{GROUPS}";
                    var groups = unique(map(ann.groups, function(g) {
                        return g.displayName
                    }));
                    if (groups.length == 1) {
                        tipData.GROUPS = groups[0]
                    } else {
                        tipData.GROUPS = groups.slice(0, groups.length - 1).join(", ") + " and " + groups[groups.length - 1]
                    }
                }
                return evalTpl(tip, tipData)
            }
        };
        var AnnotationHeader = {
            j: null,
            ann: null,
            showDelay: 200,
            showTimer: null,
            hideDelay: 300,
            hideTimer: null,
            editDelay: 350,
            editTimer: null,
            shown: false,
            cancelShow: function() {
                clearTimeout(this.showTimer);
                this.showTimer = null
            },
            cancelHide: function() {
                clearTimeout(this.hideTimer);
                this.hideTimer = null
            },
            aboutToShow: function() {
                return this.shown || this.showTimer
            },
            aboutToHide: function() {
                return !this.shown || this.hideTimer
            },
            scheduleShow: function(event, ann) {
                var z = this;
                var clonedEvent = {
                    screenX: event.screenX,
                    screenY: event.screenY
                };
                z.cancelHide();
                z.cancelShow();
                z.showTimer = setTimeout(function() {
                    z.show(clonedEvent, ann)
                },
                z.showDelay)
            },
            scheduleHide: function() {
                var z = this;
                z.cancelHide();
                z.cancelShow();
                z.hideTimer = setTimeout(function() {
                    z.hide()
                },
                z.hideDelay)
            },
            hideCallback: function() {
                this.shown = false;
                this.ann = null;
                if (AnnotationContextMenu.aboutToShow()) {
                    AnnotationContextMenu.scheduleHide()
                }
            },
            showMenu: function(event, z, isclick) {
                z.cancelHide();
                z.cancelToggleEdit();
                if (!z.ann) {
                    return
                }
                if (z.ann.comments.length == 0) {
                    try {
                        var annChanged = AnnotationContextMenu.ann != z.ann;
                        AnnotationContextMenu.p = z;
                        if (annChanged || !AnnotationContextMenu.shown || isclick) {
                            AnnotationContextMenu.scheduleShow(event, z.ann)
                        } else {
                            AnnotationContextMenu.cancelHide()
                        }
                    } catch(e) {
                        throw (e)
                    }
                } else {
                    var annChanged = DlgIC.ann != z.ann;
                    if (!DlgIC.pinned && !DlgIC.editing) {
                        if ((annChanged || !DlgIC.shown) && !isclick) {
                            DlgIC.scheduleShow(event, z.ann)
                        } else {
                            DlgIC.cancelHide()
                        }
                    }
                }
            },
            reset: function(ann) {
                var z = this;
                this.removeEditMode();
                this.hide();
                this.ann = ann;
                this.j = $("div." + H.HIGHLIGHT_ID_CLASS + ann.id).bind("mouseout", function() {
                    z.scheduleHide()
                }).bind("click", function(event) {
                    z.showMenu(event, z, true)
                }).bind("mousemove", function(event) {
                    z.showMenu(event, z, false)
                })
            },
            show: function(event, ann) {
                if (Csm.shown) {
                    Csm.hide()
                }
                if (ann.comments.length <= 0) {
                    var hi;
                    if (ann.type == ANNOTATION_TYPE_TEXT) {
                        this.j.css({
                            top: -23
                        })
                    } else {
                        var offset = ann.getPageOffset();
                        this.j.css({
                            left: offset.left,
                            top: offset.top
                        })
                    }
                }
                this.j.show();
                this.shown = true
            },
            scheduleToggleEdit: function(edit) {
                try {
                    var z = this;
                    if (this.ann == null || this.ann.comments.length <= 0) {
                        return
                    }
                    if (edit) {
                        z.j = $("div." + H.HIGHLIGHT_ID_CLASS + z.ann.id);
                        z.j.toggleClass("edit", true)
                    } else {
                        z.cancelToggleEdit();
                        z.editTimer = setTimeout(function() {
                            z.removeEditMode()
                        },
                        z.editDelay)
                    }
                } catch(e) {}
            },
            removeEditMode: function() {
                if (this.ann && this.ann.comments.length > 0) {
                    this.j.toggleClass("edit", false);
                    this.ann = null
                }
            },
            cancelToggleEdit: function() {
                clearTimeout(this.editTimer);
                this.editTimer = null
            },
            hide: function() {
                this.cancelHide();
                this.cancelShow();
                this.shown = false;
                if (this.j) {
                    this.j.hide(1, this.hideCallback)
                }
            }
        };
        var win = window,
        doc = document,
        jWin = $(win),
        jDoc = $(doc);
        D.$ = $;
        diigolet.loaded = true;
        diigolet.run()
    })()
};