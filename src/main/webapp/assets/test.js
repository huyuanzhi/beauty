!function (e, t, n) {
    var r = n(e, t);
    e.define ? define("js/Base", [], r) : e.utils = e.utils || r
}(this, document, function (e, t) {
    function n(e) {
        return "" !== e && e == +e ? !0 : !1
    }

    function r(e, t, r) {
        if ("object" == typeof e && "function" == typeof t) {
            var o = e.length;
            if (n(o))for (var i = 0; o > i; i++)t.call(r, e[i], i, this); else for (var i in e)e.hasOwnProperty(i) && t.call(r, e[i], i, this)
        }
    }

    function o(e, t) {
        return e && e.className ? !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")) : void 0
    }

    function i(e, t) {
        e && !o(e, t) && (e.className += " " + t)
    }

    function a(e, t) {
        if (e && o(e, t)) {
            var n = new RegExp("(\\s+|^)" + t + "(\\s+|$)");
            e.className = e.className.replace(n, " ")
        }
    }

    function s(e, t) {
        (o(e, t) ? a : i)(e, t)
    }

    function c(e, t, r) {
        t = t.toString(), n(r) && "zIndex" != t && (r += "px"), e.style[t] = r
    }

    function l(e, t) {
        e && t && (r(t, function (e, n) {
            ("transform" == n || "transition" == n) && r(["webkit", "o", "moz"], function (r, o) {
                t["-" + o + "-" + n] = e
            })
        }), r(t, function (t, n) {
            c(e, n, t)
        }))
    }

    function u(e) {
        var n, r = {top: 0, left: 0, screen_top: 0, screen_left: 0};
        return "undefined" != typeof e.getBoundingClientRect && (n = e.getBoundingClientRect()), r.screen_top = n.top, r.screen_left = n.left, r.top = n.top + (0 == t.documentElement.scrollTop ? t.body.scrollTop : t.documentElement.scrollTop), r.left = n.left + t.body.scrollLeft, r
    }

    function f(e, n, r) {
        var o, i, a = n.getAttribute("id");
        return a ? o = a : (o = [N, S, ++C].join("_"), n.setAttribute("id", o)), i = t[r]("#" + o + " " + e), !a && d(function () {
            n.removeAttribute("id")
        }), i
    }

    function p() {
        var e = M, t = e.length;
        M = [], j = !1;
        for (var n = 0; t > n; n++)e[n]()
    }

    function d(e) {
        return M.push(e), j || (j = !0, setTimeout(p, 0)), M.length
    }

    function g(e, n, r) {
        var o, i = [], r = "boolean" == typeof r ? r : !0, a = "querySelector" + (r ? "All" : "");
        return e && "string" == typeof e ? (n && n.nodeType ? (o = e.match(/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/), o ? (i = o[1] ? [n.getElementById(o[1])] : o[2] ? n.getElementsByTagName(o[2]) : n.getElementsByClassName(o[3]), !r && (i = i[0] || null)) : i = f(e, n, a)) : i = t[a](e), i) : i
    }

    function m(e, t, n) {
        for (var r, o = e, i = t.trim().split(/\s+/), a = i.pop(), s = []; ;) {
            if (o == n || !o)return !1;
            if (w(o, a)) {
                if (r || (r = o), s = a.split(/\s*\>\s*/), s.length > 1) {
                    s.pop();
                    for (var c = s.length - 1; c >= 0; c--)if (o = o.parentNode, !w(o, s[c]))return !1
                }
                if (!i.length)return r;
                a = i.pop()
            }
            o = o.parentNode
        }
    }

    function v(e, t, n, o) {
        var i, a, s = [].concat(e), c = t.split(/\s+/), l = {
            bind: function (t, n, r) {
                return v(e, t, n, r), l
            }
        };
        if ("function" == typeof n) a = n; else {
            if ("string" != typeof n || "function" != typeof o)return;
            i = n
        }
        return r(s, function (e) {
            i && (a = function (t) {
                for (var n, r = t.srcElement || t.target, a = i.split(/\s*\,\s*/), s = 0, c = a.length; c > s; s++)if (n = m(r, a[s], e)) {
                    o && o.call(n, t);
                    break
                }
            }), r(c, function (t) {
                e.addEventListener(t, a, !1)
            })
        }), l
    }

    function h(e, n) {
        var r = t.createEvent("HTMLEvents");
        r.initEvent(n, !0, !1), e.dispatchEvent(r)
    }

    function y(e) {
        var n = t.createElement("div");
        return n.innerHTML = e, n.childNodes[0]
    }

    function E(e, t) {
        var n, r, o = [];
        for (var i in e)n = t ? t + "[" + i + "]" : i, r = e[i], r && 0 != r && "" != r && o.push("object" == typeof r ? E(e[i], n) : n + "=" + e[i]);
        return o.join("&")
    }

    function b(e) {
        e = e || {};
        var t = e.url, n = e.callback || null, r = e.headers || {}, o = e.data, i = E(o), a = e.type && e.type.match(/^(get|post)$/i) ? e.type.toUpperCase() : "GET", s = new XMLHttpRequest;
        r.accept = "application/json, text/javascript", "POST" == a ? r["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8" : (t = i.length ? t + "?" + i : t, i = void 0), s.open(a, t, !0);
        for (var c in r)s.setRequestHeader(c, r[c]);
        s.onload = function () {
            if (s.status >= 200 && s.status < 400) {
                var e = s.responseText;
                e = JSON.parse(e), n && n(null, e, s)
            } else n && n(s.status, e, s)
        }, s.onerror = function () {
            n && n("connection fail", resp, s)
        }, s.send(i)
    }

    function T(e, t) {
        if (0 == arguments.length)return null;
        var t = t || "{y}-{m}-{d} {h}:{i}:{s}";
        if ("object" == typeof e)var n = e; else var n = new Date(parseInt(e));
        var r = {
            y: n.getYear() + 1900,
            m: n.getMonth() + 1,
            d: n.getDate(),
            h: n.getHours(),
            i: n.getMinutes(),
            s: n.getSeconds(),
            a: n.getDay()
        }, o = t.replace(/{(y|m|d|h|i|s|a)+}/g, function (e, t) {
            var n = r[t];
            return e.length > 3 && 10 > n && (n = "0" + n), n || 0
        });
        return o
    }

    var w = function () {
        var e = Element.prototype, t = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector;
        return function (e, n) {
            return t.call(e, n)
        }
    }(), N = "Query", S = parseInt((new Date).getTime() / 1e3).toString(36), C = 0, M = [], j = !1;
    return {
        queryAll: g,
        query: function (e, t) {
            return g(e, t, !1)
        },
        each: r,
        parseTime: T,
        offset: u,
        createDom: y,
        addClass: i,
        removeClass: a,
        toggleClass: s,
        css: l,
        remove: function (e) {
            e.parentNode.removeChild(e)
        },
        parents: function (e, t) {
            return !e || "string" != typeof t || t.split(",").length > 1 ? null : m(e, t)
        },
        bind: v,
        trigger: h,
        fetch: b
    }
});
define("js/md5", ["require", "exports"], function () {
    function r(r) {
        return h(n(a(r), r.length * A))
    }

    function n(r, n) {
        r[n >> 5] |= 128 << n % 32, r[(n + 64 >>> 9 << 4) + 14] = n;
        for (var t = 1732584193, i = -271733879, a = -1732584194, h = 271733878, v = 0; v < r.length; v += 16) {
            var A = t, d = i, g = a, l = h;
            t = u(t, i, a, h, r[v + 0], 7, -680876936), h = u(h, t, i, a, r[v + 1], 12, -389564586), a = u(a, h, t, i, r[v + 2], 17, 606105819), i = u(i, a, h, t, r[v + 3], 22, -1044525330), t = u(t, i, a, h, r[v + 4], 7, -176418897), h = u(h, t, i, a, r[v + 5], 12, 1200080426), a = u(a, h, t, i, r[v + 6], 17, -1473231341), i = u(i, a, h, t, r[v + 7], 22, -45705983), t = u(t, i, a, h, r[v + 8], 7, 1770035416), h = u(h, t, i, a, r[v + 9], 12, -1958414417), a = u(a, h, t, i, r[v + 10], 17, -42063), i = u(i, a, h, t, r[v + 11], 22, -1990404162), t = u(t, i, a, h, r[v + 12], 7, 1804603682), h = u(h, t, i, a, r[v + 13], 12, -40341101), a = u(a, h, t, i, r[v + 14], 17, -1502002290), i = u(i, a, h, t, r[v + 15], 22, 1236535329), t = e(t, i, a, h, r[v + 1], 5, -165796510), h = e(h, t, i, a, r[v + 6], 9, -1069501632), a = e(a, h, t, i, r[v + 11], 14, 643717713), i = e(i, a, h, t, r[v + 0], 20, -373897302), t = e(t, i, a, h, r[v + 5], 5, -701558691), h = e(h, t, i, a, r[v + 10], 9, 38016083), a = e(a, h, t, i, r[v + 15], 14, -660478335), i = e(i, a, h, t, r[v + 4], 20, -405537848), t = e(t, i, a, h, r[v + 9], 5, 568446438), h = e(h, t, i, a, r[v + 14], 9, -1019803690), a = e(a, h, t, i, r[v + 3], 14, -187363961), i = e(i, a, h, t, r[v + 8], 20, 1163531501), t = e(t, i, a, h, r[v + 13], 5, -1444681467), h = e(h, t, i, a, r[v + 2], 9, -51403784), a = e(a, h, t, i, r[v + 7], 14, 1735328473), i = e(i, a, h, t, r[v + 12], 20, -1926607734), t = f(t, i, a, h, r[v + 5], 4, -378558), h = f(h, t, i, a, r[v + 8], 11, -2022574463), a = f(a, h, t, i, r[v + 11], 16, 1839030562), i = f(i, a, h, t, r[v + 14], 23, -35309556), t = f(t, i, a, h, r[v + 1], 4, -1530992060), h = f(h, t, i, a, r[v + 4], 11, 1272893353), a = f(a, h, t, i, r[v + 7], 16, -155497632), i = f(i, a, h, t, r[v + 10], 23, -1094730640), t = f(t, i, a, h, r[v + 13], 4, 681279174), h = f(h, t, i, a, r[v + 0], 11, -358537222), a = f(a, h, t, i, r[v + 3], 16, -722521979), i = f(i, a, h, t, r[v + 6], 23, 76029189), t = f(t, i, a, h, r[v + 9], 4, -640364487), h = f(h, t, i, a, r[v + 12], 11, -421815835), a = f(a, h, t, i, r[v + 15], 16, 530742520), i = f(i, a, h, t, r[v + 2], 23, -995338651), t = o(t, i, a, h, r[v + 0], 6, -198630844), h = o(h, t, i, a, r[v + 7], 10, 1126891415), a = o(a, h, t, i, r[v + 14], 15, -1416354905), i = o(i, a, h, t, r[v + 5], 21, -57434055), t = o(t, i, a, h, r[v + 12], 6, 1700485571), h = o(h, t, i, a, r[v + 3], 10, -1894986606), a = o(a, h, t, i, r[v + 10], 15, -1051523), i = o(i, a, h, t, r[v + 1], 21, -2054922799), t = o(t, i, a, h, r[v + 8], 6, 1873313359), h = o(h, t, i, a, r[v + 15], 10, -30611744), a = o(a, h, t, i, r[v + 6], 15, -1560198380), i = o(i, a, h, t, r[v + 13], 21, 1309151649), t = o(t, i, a, h, r[v + 4], 6, -145523070), h = o(h, t, i, a, r[v + 11], 10, -1120210379), a = o(a, h, t, i, r[v + 2], 15, 718787259), i = o(i, a, h, t, r[v + 9], 21, -343485551), t = c(t, A), i = c(i, d), a = c(a, g), h = c(h, l)
        }
        return Array(t, i, a, h)
    }

    function t(r, n, t, u, e, f) {
        return c(i(c(c(n, r), c(u, f)), e), t)
    }

    function u(r, n, u, e, f, o, c) {
        return t(n & u | ~n & e, r, n, f, o, c)
    }

    function e(r, n, u, e, f, o, c) {
        return t(n & e | u & ~e, r, n, f, o, c)
    }

    function f(r, n, u, e, f, o, c) {
        return t(n ^ u ^ e, r, n, f, o, c)
    }

    function o(r, n, u, e, f, o, c) {
        return t(u ^ (n | ~e), r, n, f, o, c)
    }

    function c(r, n) {
        var t = (65535 & r) + (65535 & n), u = (r >> 16) + (n >> 16) + (t >> 16);
        return u << 16 | 65535 & t
    }

    function i(r, n) {
        return r << n | r >>> 32 - n
    }

    function a(r) {
        for (var n = Array(), t = (1 << A) - 1, u = 0; u < r.length * A; u += A)n[u >> 5] |= (r.charCodeAt(u / A) & t) << u % 32;
        return n
    }

    function h(r) {
        for (var n = v ? "0123456789ABCDEF" : "0123456789abcdef", t = "", u = 0; u < 4 * r.length; u++)t += n.charAt(r[u >> 2] >> u % 4 * 8 + 4 & 15) + n.charAt(r[u >> 2] >> u % 4 * 8 & 15);
        return t
    }

    var v = 0, A = 8;
    return r
});
define("js/user", ["exports", "js/Base", "js/md5"], function (a, e, l) {
    function n(a) {
        e.fetch({
            url: "/ajax/user/detail", type: "POST", callback: function (e, l) {
                !e && l && 200 == l.code ? a && a(null, l.detail) : a && a("error")
            }
        })
    }

    var o = null, r = [];
    window.appLoginCallback = function (a) {
        for (var e = 0, l = r.length; l > e; e++)r[e](a);
        r = []
    }, a.setLocalUser = function (a) {
        var e = JSON.stringify({username: a.username, email: a.email, blog: a.blog, avatar: a.avatar});
        localStorage.setItem("userInfo", e), o = a
    }, a.info = function (a, e) {
        var r = "boolean" == typeof e ? e : !0;
        r && o ? a && a(null, o) : n(function (e, n) {
            if (e) {
                var n = localStorage.getItem("userInfo");
                n ? (o = JSON.parse(n), o.email.length && (o.avatar = "//www.gravatar.com/avatar/" + l(o.email)), a && a(null, o, "local")) : a && a("未登录")
            } else o = n, a && a(e, n, "online")
        })
    }
});
define("js/navigation", ["exports", "js/Base"], function (n, i) {
    "use strict";
    function o() {
        function n() {
            var n = a.scrollTop > .6 * window.innerHeight ? "removeClass" : "addClass";
            i[n](e, "hide")
        }

        var o, e = i.query(".back-top"), a = i.query("body"), c = i.query(".app_nav", a);
        i.bind(c, "click", ".nav a,.side a", function () {
            i.removeClass(a, "nav_slidedown")
        }).bind("click", ".nav_mask", function () {
            i.removeClass(a, "nav_slidedown")
        }).bind("click", ".nav_moreBtn", function () {
            i.toggleClass(a, "nav_slidedown")
        }), i.bind(i.query(".backToOldVersion"), "click", function () {
            UI.confirm({
                text: "确定要去当屌丝？", callback: function () {
                    document.cookie = "ui_version=html;path=/;", window.location.reload()
                }
            })
        }), n(), window.onscroll = function () {
            clearTimeout(o), o = setTimeout(n, 100)
        }, i.bind(e, "click", function () {
            a.scrollTop = 0
        })
    }

    function e(n) {
        "/" === n && (n = "index"), i.removeClass(i.query(".app_nav li.cur"), "cur"), i.addClass(i.query(".app_nav li[page=" + n + "]"), "cur")
    }

    n.init = o, n.setCur = e
});
!function (t, e, n) {
    t.define ? define("js/lofox", [], n) : (t.utils = t.utils || {}, t.utils.lofox = n())
}(window, document, function () {
    function t(t) {
        return "string" == typeof t && t.length ? !0 : !1
    }

    function e(e) {
        if (!t(e))return !1;
        var n = e.match(l);
        return n && (n[2] != h.host || n[1] && n[1] != h.protocol) ? !1 : !0
    }

    function n(t) {
        t = t.replace(/^\/*|\/*$/g, "");
        var e = t.split(/\//);
        return 1 == e.length && "" == e[0] && (e = []), e
    }

    function i(t) {
        var e, n, i, r = {};
        if (t && t.length > 1)for (e = t.split("&"), n = 0; n < e.length; n++)e[n] && (i = e[n].split("="), r[i[0]] = "undefined" == typeof i[1] ? "" : i[1]);
        return r
    }

    function r(t, e) {
        if (this.events[t])for (var n = 0, i = this.events[t].length; i > n; n++)this.events[t][n].apply(this, e)
    }

    function s(t, e) {
        var i, r, s = {}, o = null;
        for (var h in e)if (i = n(h), i.length == t.length) {
            o = e[h];
            for (var l = 0, u = i.length; u > l; l++)if (i[l] != t[l]) {
                if (r = i[l].match(/{(.+)}/), !r) {
                    o = null, s = {};
                    break
                }
                s[r[1]] = t[l]
            }
            if (o)break
        }
        return o ? {mapsItem: o, data: s} : null
    }

    function o(t) {
        if (!(this instanceof o))return new o(t);
        if (!window.history || !window.history.pushState)throw Error("not support pushState");
        var e = this, t = t || {};
        this.events = {}, this._maps = {}, this._rest = null, this.beforeTitleChange = null, window.addEventListener("popstate", function (t) {
            var n = t.state || {}, i = n.url || null;
            return i && e.refresh(i), !1
        }), setTimeout(function () {
            e.refresh()
        }, 10)
    }

    var h = window.location, l = /^(http(?:|s)\:)*\/\/([^\/]+)/;
    return o.prototype = {
        rest: function (t) {
            return "function" == typeof t && (this._rest = t), this
        }, on: function (t, e) {
            return this.events[t] || (this.events[t] = []), this.events[t].push(e), this
        }, set: function (t, e) {
            var n, i = [], r = Object.prototype.toString.call(t);
            "[object Array]" == r ? (i = t, n = i.length) : "[object String]" == r && (i = [t], n = 1);
            for (var s = 0; n > s; s++)this._maps[i[s]] = {renderFn: "function" == typeof e ? e : null};
            return this
        }, title: function (t) {
            var e;
            this.beforeTitleChange && (e = this.beforeTitleChange(t)), document.title = "string" == typeof e ? e : t
        }, isInRouter: function (i) {
            if (!t(i))return !1;
            if (!e(i))return !1;
            var r = i.replace(l, "").split(/\?/), o = n(r[0].split("#")[0]), h = s(o, this._maps);
            return h ? !0 : !1
        }, push: function (t) {
            window.history.pushState({url: t}, "test", t)
        }, refresh: function (e) {
            var o, l = e ? e : h.pathname + h.search + h.hash, u = t(l) ? l.split(/\?/) : ["", ""], f = n(u[0].split("#")[0]), a = i(u[1]), p = s(f, this._maps);
            r.call(this, "beforeRefresh", [f, a]), p ? (o = p.data, p.mapsItem.renderFn.call(this, o, f, a), p.mapsItem.title && this.title(p.mapsItem.title)) : this._rest && this._rest.call(this, f, a), r.call(this, "refresh", [f, a])
        }
    }, o
});
define("js/page/index", ["js/Base"], function (i) {
    function n(n) {
        var l, o = n.node;
        return o.innerHTML = e, l = i.query(".gallayer", o), l.style.backgroundImage = "url(" + s[++a] + ")", a + 1 >= s.length && (a = -1), setTimeout(function () {
            i.addClass(l, "zoom-show")
        }, 600), {
            destroy: function () {
                i.css(l, {
                    position: "absolute",
                    top: i.query("body").scrollTop - i.offset(i.query(".app_container")).top,
                    height: window.innerHeight
                })
            }
        }
    }

    var e = '<div class="indeCnt">\n  <div class="gallayer"></div>\n  <section class="index-aboutme">\n    <div class="avatar"></div>\n    <h3>我是剧中人</h3>\n    <p>90后天蝎男，前端工程师，全栈开发尝试者</p>\n    <div class="my-sns-links">\n      <a href="https://github.com/bh-lay" title="github"><i class="l-icon l-icon-git"></i></a>\n      <a href="http://www.zhihu.com/people/imju-zhong-ren" title="知乎"><i class="l-icon l-icon-zhihu"></i></a>\n      <a href="https://dribbble.com/bh_lay" title="dribbble"><i class="l-icon l-icon-dribbble"></i></a>\n    </div>\n  </section>\n  <section class="index-about-design">\n    <h3>尝试实现响应式设计</h3>\n    <p>配合单页架构提升使用体验</p>\n    <div class="links">\n      单页组件<a href="http://bh-lay.github.io/lofox/index.html">lofox.js</a>\n      <a href="http://bh-lay.github.io/iframer/app.html">iframer</a>\n    </div>\n    <div class="device-cnt">\n      <div class="device mobile"><span></span><i></i><i></i></div>\n      <div class="device pc"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>\n      <div class="device pad"><i></i><i></i><i></i><i></i></div>\n    </div>\n  </section>\n  <section class="index-about-backend">\n    <div class="language">\n      <div class="nodeJS-logo"></div>\n      <p>NODEJS强力驱动</p>\n    </div>\n    <div class="frameworks">\n      <p>无耻地没有使用以下框架</p>\n      <p>express hexo bones rrestjs koa hapi<a href="https://github.com/bh-lay/blog/">博客源码</a></p>\n    </div>\n  </section>\n  <section class="index-about-links">\n    <a href="/topic/aboutme/index.html" class="btn focusme">关于剧中人</a>\n    <a href="/topic/aboutblog/index.html" class="btn">关于小剧客栈</a>\n  </section>\n</div>', s = ["//dn-lay.qbox.me/build/single-page/images/gallery/bamboo_b115f5c.jpg", "//dn-lay.qbox.me/build/single-page/images/gallery/coast_edf14c6.jpg"], a = -1;
    return n
});
!function (t, n, i) {
    var e = i(t, n);
    t.Stick = t.Stick || e, t.define && define("js/stick", ["require", "exports"], function () {
        return e
    })
}(window, document, function (t, n) {
    function i(t) {
        return "" !== t && t == +t ? !0 : !1
    }

    function e(t, n) {
        if ("object" == typeof t && "function" == typeof n) {
            var e = t.length;
            if (i(e))for (var o = 0; e > o && n.call(this, o, t[o]) !== !1; o++); else for (var o in t)if (t.hasOwnProperty(o) && n.call(this, o, t[o]) === !1)break
        }
    }

    function o(t, n) {
        return t.className && t.className.match(new RegExp("(\\s|^)" + n + "(\\s|$)")) ? !0 : !1
    }

    function s(t, n) {
        o(t, n) || (t.className += " " + n)
    }

    function r(t, n) {
        if (o(t, n)) {
            var i = new RegExp("(\\s+|^)" + n + "(\\s+|$)");
            t.className.replace(i, " ")
        }
    }

    function l(t) {
        var i = n.createElement("div");
        return i.innerHTML = t, i.childNodes[0]
    }

    function c(t, n) {
        e(n, function (n, e) {
            i(e) && (e += "px"), t.style[n] = e
        })
    }

    function a(t, n) {
        function i() {
            clearInterval(o), n && n(), n = null
        }

        if (!t)return void(n && n());
        var e = new Image;
        e.onerror = e.onload = i;
        var o = setInterval(function () {
            e.width > 1 && i()
        }, 2);
        e.src = t
    }

    function u() {
        return Math.max(n.documentElement.scrollTop, n.body.scrollTop)
    }

    function h(t) {
        if (this.column_num > 1) {
            var n, i = 0;
            this.list.length < this.column_num ? (n = this.list.length, this.last_row.push(t.clientHeight)) : (i = Math.min.apply(null, this.last_row), n = this.last_row.indexOf(i), i += this.column_gap), c(t, {
                position: "absolute",
                top: i,
                left: Math.round(n * (this.column_width + this.column_gap)),
                width: Math.round(this.column_width)
            }), s(t, "fadeInLeft"), setTimeout(function () {
                r(t, "fadeInLeft")
            }, 1e3), this.last_row[n] = i + t.clientHeight, c(this.container, {height: Math.max.apply(null, this.last_row) + this.column_gap})
        } else c(t, {position: "static", width: "auto"});
        this.list.push(t)
    }

    function f(i) {
        var i = i || {}, e = this;
        this.container = i.container, this.onNeedMore = i.onNeedMore || null, this.column_gap = i.column_gap ? parseInt(i.column_gap) : 20, this.column_width_base = i.column_width ? parseInt(i.column_width) : 300, this.column_width, this.column_num, this.load_spacing = i.load_spacing || 300, this.list = [], this.last_row = [];
        var o, s = 0;
        this.scrollListener = function () {
            var i = (new Date).getTime();
            i - s > 500 && u() + t.innerHeight >= n.body.scrollHeight - e.load_spacing && (e.onNeedMore && e.onNeedMore(), s = i)
        }, this.resizeListener = function () {
            clearTimeout(o), o = setTimeout(function () {
                e.refresh()
            }, 500)
        }, d(n, "scroll", this.scrollListener), d(t, "resize", this.resizeListener), this.container.innerHTML = "", this.buildLayout()
    }

    var d = t.addEventListener ? function (t, n, i) {
        t.addEventListener(n, i, !1)
    } : function (t, n, i) {
        t.attachEvent("on" + n, i)
    }, m = t.removeEventListener ? function (t, n, i) {
        t.removeEventListener(n, i, !1)
    } : function (t, n, i) {
        t.detachEvent("on" + n, i)
    };
    return f.prototype = {
        buildLayout: function () {
            var t = this.container.clientWidth;
            this.list = [], this.last_row = [], this.column_num = Math.floor((t + this.column_gap) / (this.column_width_base + this.column_gap)), this.column_width = (t + this.column_gap) / this.column_num - this.column_gap
        }, refresh: function () {
            var t = this, n = t.list;
            t.buildLayout(), 1 == t.column_num && c(this.container, {height: "auto"}), e(n, function (n, i) {
                h.call(t, i)
            })
        }, addItem: function (t, n) {
            var i = this;
            "string" == typeof t && (t = l(t)), a(n, function () {
                i.container.appendChild(t), h.call(i, t)
            })
        }, addList: function () {
        }, destroy: function () {
            m(n, "scroll", this.scrollListener), m(t, "resize", this.resizeListener)
        }
    }, f
});
!function (t, e, o) {
    t.util = t.util || {}, t.util.tie = o(t, e), t.define && define("js/tie", ["require"], function () {
        return t.util.tie
    })
}(window, document, function (t, e) {
    function o() {
        return m.scrollTop || a.scrollTop
    }

    function i(t) {
        return "" !== t && t == +t ? !0 : !1
    }

    function n(t, e) {
        if ("object" == typeof t && "function" == typeof e) {
            var o = t.length;
            if (i(o))for (var n = 0; o > n && e.call(this, n, t[n]) !== !1; n++); else for (var n in t)if (t.hasOwnProperty(n) && e.call(this, n, t[n]) === !1)break
        }
    }

    function l(t, e, o) {
        e = e.toString(), "opacity" == e ? (t.style.filter = "alpha(opacity=" + 100 * o + ")", o = o) : i(o) && "zIndex" != e && (o += "px"), t.style[e] = o
    }

    function r(t, e) {
        t = [].concat(t), n(t, function (t, o) {
            n(e, function (t, e) {
                l(o, t, e)
            })
        })
    }

    function s(t) {
        var o = {top: 0, left: 0, width: 0, height: 0, screen_top: 0, screen_left: 0}, i = t.getBoundingClientRect();
        return o.width = i.width || i.right - i.left, o.height = i.height || i.bottom - i.top, o.screen_top = i.top, o.screen_left = i.left, o.top = i.top + (0 == e.documentElement.scrollTop ? e.body.scrollTop : e.documentElement.scrollTop), o.left = i.left + e.body.scrollLeft, o
    }

    function c(t, o) {
        var n;
        if (t.style[o]) n = t.style[o]; else if (e.defaultView) {
            var l = e.defaultView.getComputedStyle(t, null);
            n = o in l ? l[o] : l.getPropertyValue(o)
        } else t.currentStyle && (n = t.currentStyle[o]);
        return /\px$/.test(n) ? n = parseInt(n) : i(n) ? n = Number(n) : "auto" == n && ("height" == o ? n = t.clientHeight : "width" == o && (n = t.clientWidth)), n
    }

    function h() {
        var t, e, i = this, n = s(i.scopeDom), l = o(), c = i.state;
        i.minScrollTop = s(i.ghostDom).top - i.fix_top, i.maxScrollTop = n.top + n.height - s(i.dom).height - i.fix_top, l <= i.minScrollTop ? (i.state = "min", t = 0, e = "relative") : l >= i.maxScrollTop ? (i.state = "max", t = n.top + n.height - s(i.ghostDom).top - s(i.dom).height, e = "relative") : (i.state = "mid", t = i.fix_top, e = "fixed"), r(i.dom, {
            top: t,
            position: e
        }), c != i.state && (i.onPositionChange && i.onPositionChange.call(i, i.state), i.updateGhostDom())
    }

    function p(o) {
        if (!(this instanceof p))return new p(o);
        var i = this;
        o = o || {}, i.fix_top = o.fixed_top || 0, i.minScrollTop = null, i.maxScrollTop = null, i.dom = o.dom, i.scrollDom = o.scrollDom || t, i.scopeDom = o.scopeDom, i.ghostDom = e.createElement("div"), i.dom.parentNode.insertBefore(i.ghostDom, i.dom), i.ghostDom.appendChild(i.dom), i.onPositionChange = o.onPositionChange || null, i.state = "min", i._scroll_resize_listener = h.bind(this), i.refresh(), "static" == c(i.scopeDom, "position") && (i.scopeDom.style.position = "relative"), f(i.scrollDom, "scroll", i._scroll_resize_listener), f(t, "resize", i._scroll_resize_listener)
    }

    var a = e.body || e.getElementsByTagName("body")[0], m = "BackCompat" == e.compatMode ? a : e.documentElement, f = t.addEventListener ? function (t, e, o) {
        t.addEventListener(e, o, !1)
    } : function (t, e, o) {
        t.attachEvent("on" + e, o)
    }, u = t.removeEventListener ? function (t, e, o) {
        t.removeEventListener(e, o, !1)
    } : function (t, e, o) {
        t.detachEvent("on" + e, o)
    };
    return p.prototype = {
        refresh: h, updateGhostDom: function () {
            this.ghostDom.style.height = s(this.dom).height + "px"
        }, destroy: function () {
            u(this.scrollDom, "scroll", this._scroll_resize_listener), u(t, "resize", this._scroll_resize_listener), r(this.dom, {
                position: "relative",
                top: s(this.dom).top - s(this.ghostDom).top
            })
        }
    }, p
});
define("js/imageHosting", ["require"], function () {
    "use strict";
    function i(i, t) {
        var e = t.width || t.height, n = t.height || t.width;
        return i + "?imageView/1/w/" + e + "/h/" + n + "/q/85"
    }

    function t(i, t) {
        var e;
        return e = t.width ? "w/" + t.width : "h/" + t.height, i + "?imageView2/2/" + e + "/q/85"
    }

    function e(e, n) {
        var r = e;
        return "string" == typeof e && e.length > 0 && "/" === e[0] && (r = app_config.imgDomain + e, n && (r = "zoom" === n.type ? t(r, n) : i(r, n))), r
    }

    return e
});
!function () {
    var e = function () {
        var t = [].slice.call(arguments);
        return t.push(e.options), t[0].match(/^\s*#([\w:\-\.]+)\s*$/gim) && t[0].replace(/^\s*#([\w:\-\.]+)\s*$/gim, function (e, n) {
            var i = document, r = i && i.getElementById(n);
            t[0] = r ? r.value || r.innerHTML : e
        }), 1 == arguments.length ? e.compile.apply(e, t) : arguments.length >= 2 ? e.to_html.apply(e, t) : void 0
    }, t = {
        escapehash: {"<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#x27;", "/": "&#x2f;"},
        escapereplace: function (e) {
            return t.escapehash[e]
        },
        escaping: function (e) {
            return "string" != typeof e ? e : e.replace(/[&<>"]/gim, this.escapereplace)
        },
        detection: function (e) {
            return "undefined" == typeof e ? "" : e
        }
    }, n = function (e) {
        if ("undefined" != typeof console) {
            if (console.warn)return void console.warn(e);
            if (console.log)return void console.log(e)
        }
        throw e
    }, i = function (e, t) {
        if (e = e !== Object(e) ? {} : e, e.__proto__)return e.__proto__ = t, e;
        var n = function () {
        }, i = Object.create ? Object.create(t) : new (n.prototype = t, n);
        for (var r in e)e.hasOwnProperty(r) && (i[r] = e[r]);
        return i
    };
    e.__cache = {}, e.version = "0.6.5-stable", e.settings = {}, e.tags = {
        operationOpen: "{@",
        operationClose: "}",
        interpolateOpen: "\\${",
        interpolateClose: "}",
        noneencodeOpen: "\\$\\${",
        noneencodeClose: "}",
        commentOpen: "\\{#",
        commentClose: "\\}"
    }, e.options = {
        cache: !0,
        strip: !0,
        errorhandling: !0,
        detection: !0,
        _method: i({__escapehtml: t, __throw: n, __juicer: e}, {})
    }, e.tagInit = function () {
        var t = e.tags.operationOpen + "each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?" + e.tags.operationClose, n = e.tags.operationOpen + "\\/each" + e.tags.operationClose, i = e.tags.operationOpen + "if\\s*([^}]*?)" + e.tags.operationClose, r = e.tags.operationOpen + "\\/if" + e.tags.operationClose, o = e.tags.operationOpen + "else" + e.tags.operationClose, s = e.tags.operationOpen + "else if\\s*([^}]*?)" + e.tags.operationClose, a = e.tags.interpolateOpen + "([\\s\\S]+?)" + e.tags.interpolateClose, c = e.tags.noneencodeOpen + "([\\s\\S]+?)" + e.tags.noneencodeClose, p = e.tags.commentOpen + "[^}]*?" + e.tags.commentClose, l = e.tags.operationOpen + "each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)" + e.tags.operationClose, u = e.tags.operationOpen + "include\\s*([^}]*?)\\s*,\\s*([^}]*?)" + e.tags.operationClose;
        e.settings.forstart = new RegExp(t, "igm"), e.settings.forend = new RegExp(n, "igm"), e.settings.ifstart = new RegExp(i, "igm"), e.settings.ifend = new RegExp(r, "igm"), e.settings.elsestart = new RegExp(o, "igm"), e.settings.elseifstart = new RegExp(s, "igm"), e.settings.interpolate = new RegExp(a, "igm"), e.settings.noneencode = new RegExp(c, "igm"), e.settings.inlinecomment = new RegExp(p, "igm"), e.settings.rangestart = new RegExp(l, "igm"), e.settings.include = new RegExp(u, "igm")
    }, e.tagInit(), e.set = function (e, t) {
        var n = this, i = function (e) {
            return e.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/gim, function (e) {
                return "\\" + e
            })
        }, r = function (e, t) {
            var r = e.match(/^tag::(.*)$/i);
            return r ? (n.tags[r[1]] = i(t), void n.tagInit()) : void(n.options[e] = t)
        };
        if (2 === arguments.length)return void r(e, t);
        if (e === Object(e))for (var o in e)e.hasOwnProperty(o) && r(o, e[o])
    }, e.register = function (e, t) {
        var n = this.options._method;
        return n.hasOwnProperty(e) ? !1 : n[e] = t
    }, e.unregister = function (e) {
        var t = this.options._method;
        return t.hasOwnProperty(e) ? delete t[e] : void 0
    }, e.template = function (t) {
        var n = this;
        this.options = t, this.__interpolate = function (e, t, n) {
            var i, r = e.split("|"), o = r[0] || "";
            return r.length > 1 && (e = r.shift(), i = r.shift().split(","), o = "_method." + i.shift() + ".call({}, " + [e].concat(i) + ")"), "<%= " + (t ? "_method.__escapehtml.escaping" : "") + "(" + (n && n.detection === !1 ? "" : "_method.__escapehtml.detection") + "(" + o + ")) %>"
        }, this.__removeShell = function (t, i) {
            var r = 0;
            return t = t.replace(e.settings.forstart, function (e, t, n, i) {
                var n = n || "value", i = i && i.substr(1), o = "i" + r++;
                return "<% ~function() {for(var " + o + " in " + t + ") {if(" + t + ".hasOwnProperty(" + o + ")) {var " + n + "=" + t + "[" + o + "];" + (i ? "var " + i + "=" + o + ";" : "") + " %>"
            }).replace(e.settings.forend, "<% }}}(); %>").replace(e.settings.ifstart, function (e, t) {
                return "<% if(" + t + ") { %>"
            }).replace(e.settings.ifend, "<% } %>").replace(e.settings.elsestart, function () {
                return "<% } else { %>"
            }).replace(e.settings.elseifstart, function (e, t) {
                return "<% } else if(" + t + ") { %>"
            }).replace(e.settings.noneencode, function (e, t) {
                return n.__interpolate(t, !1, i)
            }).replace(e.settings.interpolate, function (e, t) {
                return n.__interpolate(t, !0, i)
            }).replace(e.settings.inlinecomment, "").replace(e.settings.rangestart, function (e, t, n, i) {
                var o = "j" + r++;
                return "<% ~function() {for(var " + o + "=" + n + ";" + o + "<" + i + ";" + o + "++) {{var " + t + "=" + o + "; %>"
            }).replace(e.settings.include, function (e, t, n) {
                return "<%= _method.__juicer(" + t + ", " + n + "); %>"
            }), i && i.errorhandling === !1 || (t = "<% try { %>" + t, t += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>'), t
        }, this.__toNative = function (e, t) {
            return this.__convert(e, !t || t.strip)
        }, this.__lexicalAnalyze = function (t) {
            var n = [], i = [], r = "", o = ["if", "each", "_", "_method", "console", "break", "case", "catch", "continue", "debugger", "default", "delete", "do", "finally", "for", "function", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "null", "typeof", "class", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "const", "arguments", "true", "false", "undefined", "NaN"], s = function (e, t) {
                if (Array.prototype.indexOf && e.indexOf === Array.prototype.indexOf)return e.indexOf(t);
                for (var n = 0; n < e.length; n++)if (e[n] === t)return n;
                return -1
            }, a = function (t, r) {
                if (r = r.match(/\w+/gim)[0], -1 === s(n, r) && -1 === s(o, r) && -1 === s(i, r)) {
                    if ("undefined" != typeof window && "function" == typeof window[r] && window[r].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;
                    if ("undefined" != typeof global && "function" == typeof global[r] && global[r].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;
                    if ("function" == typeof e.options._method[r] || e.options._method.hasOwnProperty(r))return i.push(r), t;
                    n.push(r)
                }
                return t
            };
            t.replace(e.settings.forstart, a).replace(e.settings.interpolate, a).replace(e.settings.ifstart, a).replace(e.settings.elseifstart, a).replace(e.settings.include, a).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/gim, a);
            for (var c = 0; c < n.length; c++)r += "var " + n[c] + "=_." + n[c] + ";";
            for (var c = 0; c < i.length; c++)r += "var " + i[c] + "=_method." + i[c] + ";";
            return "<% " + r + " %>"
        }, this.__convert = function (e, t) {
            var n = [].join("");
            return n += "'use strict';", n += "var _=_||{};", n += "var _out='';_out+='", n += t !== !1 ? e.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out;" : e.replace(/\\/g, "\\\\").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t").replace(/[\n]/g, "\\n").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='") + "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');"
        }, this.parse = function (e, t) {
            var r = this;
            return t && t.loose === !1 || (e = this.__lexicalAnalyze(e) + e), e = this.__removeShell(e, t), e = this.__toNative(e, t), this._render = new Function("_, _method", e), this.render = function (e, t) {
                return t && t === n.options._method || (t = i(t, n.options._method)), r._render.call(this, e, t)
            }, this
        }
    }, e.compile = function (e, t) {
        t && t === this.options || (t = i(t, this.options));
        try {
            var r = this.__cache[e] ? this.__cache[e] : new this.template(this.options).parse(e, t);
            return t && t.cache === !1 || (this.__cache[e] = r), r
        } catch (o) {
            return n("Juicer Compile Exception: " + o.message), {
                render: function () {
                }
            }
        }
    }, e.to_html = function (e, t, n) {
        return n && n === this.options || (n = i(n, this.options)), this.compile(e, n).render(t, n._method)
    }, "undefined" != typeof module && module.exports ? module.exports = e : this.juicer = e
}(), "function" == typeof define && define("js/juicer", ["require"], function () {
    return juicer
});
define("js/page/blogList", ["js/Base", "js/stick", "js/tie", "js/imageHosting", "js/juicer"], function (i, t, a, s, n) {
    function e(t) {
        return c ? void(t && t(c)) : void i.fetch({
            url: "/ajax/tag/list", callback: function (i, a) {
                a = a || {}, a.list = a.list ? a.list.slice(0, 10) : [], c = a, t && t(c)
            }
        })
    }

    function o(t, a, s) {
        e(function (e) {
            var o = '<a data-tag="null" href="javascript:void(0)">全部标签</a>{@each list as it}<a href="javascript:void(0)" data-tag="${it.name}">${it.name}<span>${it.count}</span></a>{@/each}', l = n(o, e), d = a ? "a[data-tag=" + a + "]" : "a";
            t.innerHTML = l, i.addClass(i.query(d, t), "active"), i.bind(t, "click", "a", function () {
                var i = this.getAttribute("data-tag");
                s && s(i)
            })
        })
    }

    function l(i, t, a) {
        this.skip = 0, this.limit = 10, this.count = -1, this.tag = i || null, this.onLoadStart = t, this.onLoaded = a, this.isLoading = !1, this.loadMore()
    }

    function d(a, s) {
        var e = this, d = a.node, c = s.tag ? decodeURI(s.tag) : null, r = '<div class="articleListPage">\n	<div class="header">\n		<div class="mac">\n			<div class="logo"><i class="l-icon l-icon-layLogo"></i></div>\n			<p>剧中人是个懒孩子</p>\n		</div>\n	</div>\n	<div class="articleListPage-tags-cnt">\n		<div class="articleListPage-tags">\n			<div class="grid-row">\n				<div class="content"><span class="l-loading"></span></div>\n			</div>\n		</div>\n	</div>\n	<div class="grid-row">\n		<div class="articleList"></div>\n		<div class="status"><div class="l-loading-panel"><span class="l-loading"></span></div></div>\n	</div>\n</div>', v = '<div class="articleItem {@if !cover}pure-text{@/if}" articleId="${id}">\n  <a href="/blog/${id}" title="${title}" class="link">\n    {@if is_new}\n      <div class="label"><span>new</span></div>\n    {@/if}\n    {@if cover}\n    <div class="pic"><img src="${cover}" alt="${title}" /></div>\n    {@/if}\n    <div class="title">${title}</div>\n    <div class="info"><p>${intro}</p></div>\n  </a>\n  <footer>\n    <div class="tags">\n      <strong>tags</strong>{@each tags as t}<a href="/blog?tag=${t}">${t}</a>{@/each}\n    </div>\n    <div class="time">${time_show}</div>\n  </footer>\n</div>\n', g = '<div class="blank-content"><p>啥都木有</p></div>';
        d.innerHTML = r, this.nodeList = i.query(".articleList", d), this.nodeLoading = i.query(".l-loading-panel", d), this.stick = new t({
            container: e.nodeList,
            column_width: 280,
            column_gap: 10,
            load_spacing: 1e3,
            onNeedMore: function () {
                u.loadMore()
            }
        });
        var h = i.query(".articleListPage-tags", d);
        this.tie = util.tie({dom: h, scopeDom: i.parents(h, ".articleListPage"), fixed_top: 50});
        var u = new l(c, function () {
            i.removeClass(e.nodeLoading, "hide")
        }, function (t) {
            i.addClass(e.nodeLoading, "hide"), t && 0 != t.length ? t.forEach(function (i) {
                var t = n(v, i);
                e.stick.addItem(t, i.cover)
            }) : e.nodeList.innerHTML = g
        });
        o(i.query(".articleListPage-tags .content", d), c, function (i) {
            a.push("null" == i ? "/blog" : "/blog?tag=" + i), a.refresh()
        })
    }

    var c = null;
    return l.prototype.loadMore = function () {
        var t = this;
        this.isLoading || this.count >= 0 && this.skip >= this.count || (this.isLoading = !0, this.onLoadStart && this.onLoadStart(), i.fetch({
            url: "/ajax/blog",
            data: {act: "get_list", skip: this.skip, tag: this.tag || null, limit: this.limit},
            callback: function (a, n) {
                if (a || !n || 200 == n.code)return void(callback && callback("err"));
                var e = n.count, o = n.list, l = (new Date).getTime();
                for (var d in o)(l - o[d].time_show) / 864e5 < 90 && (o[d].is_new = !0), o[d].time_show = i.parseTime(o[d].time_show, "{mm}-{dd} {y}"), o[d].cover = s(o[d].cover, {
                    type: "zoom",
                    width: 420
                });
                t.count = e, t.skip += t.limit, t.onLoaded && t.onLoaded.call(t, o, e), t.isLoading = !1
            }
        }))
    }, d.prototype = {
        destroy: function () {
            this.stick.destroy(), this.tie.destroy()
        }
    }, d
});
define("js/highlight", ["require"], function () {
    function e(e, n) {
        switch (typeof e) {
            case"undefined":
            case"object":
                a(e || document);
                break;
            case"string":
                return t(e, n)
        }
    }

    function a(e) {
        var a, n = e.parentNode;
        lang = (e.className || "").match(/(?:^|\s)(javascript|css|html)(?:$|\s)/), lang = lang ? lang[1] : "javascript", a = t(e.innerHTML, lang), n && "pre" == (n.tagName || "").toLowerCase() && (e = n), e.outerHTML = a
    }

    function n() {
        for (var e = [], a = 0; a < this.length; a++)e.push(this[a].exp);
        return e.join("|")
    }

    function t(e, a) {
        var n, t, a = a || "js", r = s[a], p = r.rules;
        return n = e.replace(/\r?\n$/, "").replace(new RegExp(p, "g"), function () {
            for (var e, a = 0, n = 1; e = p[a++];) {
                if (arguments[n]) {
                    if (e.replacement) {
                        if ("function" == typeof e.replacement)return e.replacement(arguments[0], e);
                        for (var t = e.replacement.replace("$0", e.className), s = 1; s <= e.length - 1; s++)t = t.replace("$" + s, arguments[n + s]);
                        return t
                    }
                    return '<span class="' + e.className + '">' + arguments[0] + "</span>"
                }
                n += e.length
            }
        }), t = n.split(/\r?\n/), n = "<div>" + t.join("</div><div>") + "</div>", n = '<div class="highlight ' + a + '">' + n + "</div>"
    }

    var s = {};
    return e.add = function (e, a, t) {
        var r, p, l = [];
        l.toString = n;
        for (var c in t)p = t[c], r = "string" != typeof p.exp ? String(p.exp).substr(1, String(p.exp).length - 2) : p.exp, l.push({
            className: c,
            exp: "(" + r + ")",
            length: (r.match(/(^|[^\\])\([^?]/g) || "").length + 1,
            replacement: p.replacement || null
        });
        for (var i = e.split(" "), o = i.length; o--;)s[i[o]] = {data: a || {}, rules: l}
    }, e.add("js javascript json", {className: "js"}, {
        blockComments: {
            exp: /\/\*[^*]*\*+([^\/][^*]*\*+)*\//,
            replacement: function (e) {
                var a = '<span class="comment">', n = "</span>", t = a + e.replace(/\r?\n/g, n + "\r\n" + a) + n;
                return t
            }
        },
        inlineComments: {exp: /(\/\/[^\n]*(\n|$))/, replacement: '<span class="comment">$1</span>'},
        string: {exp: /'[^'\\]*(\\.[^'\\]*)*'|"[^"\\]*(\\.[^"\\]*)*"/},
        number: {exp: /([^"'][+\-]?)(\d+)([^"'])/, replacement: '$1<span class="$0">$2</span>$3'},
        regex: {exp: /\/[^\n]+[^\\]\//},
        keywords: {exp: /\b(arguments|break|case|continue|default|delete|do|else|false|for|function|if|in|instanceof|new|null|return|switch|this|true|typeof|var|void|while|with|replace)\b/},
        global: {exp: /\b(toString|valueOf|window|element|prototype|constructor|document|location|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|NaN|isNaN|Infinity|Date)\b/}
    }), e.add("html xml", {className: "html"}, {
        tag: {
            exp: /(&lt;\/?)([a-zA-Z]+\s?)/,
            replacement: '$1<span class="$0">$2</span>'
        },
        comment: {exp: /&lt;!\s*(--([^\-]|[\r\n]|-[^\-])*--\s*)&gt;/},
        tag: {exp: /(&lt;\/?)([a-zA-Z]+\s?)/, replacement: '$1<span class="$0">$2</span>'},
        string: {exp: /'[^']*'|"[^"]*"/},
        attribute: {exp: /\b([a-zA-Z\-:]+)(=)/, replacement: '<span class="$0">$1</span>$2'},
        data: {exp: /\s(data-[a-zA-z\-]+)/},
        doctype: {exp: /&lt;!DOCTYPE([^&]|&[^g]|&g[^t])*&gt;/}
    }), e.add("css", {className: "css"}, {
        comment: {exp: /\/\*[^*]*\*+([^\/][^*]*\*+)*\//},
        keywords: {exp: /@\w[\w\s]*/},
        selectors: {exp: "([\\w-:\\[.#][^{};>]*)(?={)"},
        properties: {exp: "([\\w-]+)(?=\\s*:)"},
        units: {exp: /([0-9])(px|em|en|%|pt|rem)\b/, replacement: '$1<span class="$0">$2</span>'},
        colors: {exp: /#[A-Za-z0-9]{3,6}/},
        urls: {exp: /url\(([^\)]*)\)/, replacement: 'url(<span class="$0">$1</span>)'},
        important: {exp: /!important/}
    }), e
});
window.util = window.util || {}, function (e, t, n) {
    var r = n(t);
    e.jQuery && e.jQuery.fn && (jQuery.fn.Selection = function () {
        var e = this[0];
        return "TEXTAREA" != e.tagName ? this : arguments.length > 0 ? (r.setPosition(e, arguments[0], arguments[1]), this) : r.getPosition(e)
    }, jQuery.fn.insertTxt = function (e, t, n) {
        return r.insertTxt(this[0], e, t, n), this
    }), e.define && define("comments/selection", ["require", "exports"], function (e, t) {
        t.insertTxt = r.insertTxt, t.Selection = r.Selection
    }), e.insertTxt = r.insertTxt, e.Selection = r.Selection
}(this, document, function (e) {
    function t() {
        var e = arguments[0];
        if ("TEXTAREA" == e.tagName)return arguments.length > 1 ? void r(e, arguments[1], arguments[2]) : a(e)
    }

    function n(e, t, n, i) {
        if ("TEXTAREA" == e.tagName && "undefined" != typeof t) {
            var o, c, t = t.toString();
            if ("undefined" == typeof n) {
                var s = a(e);
                o = s[0], c = s[1]
            } else o = parseInt(n), c = i || o;
            var u = e.value, l = u.slice(0, o), f = u.slice(c);
            e.value = l + t + f, r(e, l.length + t.length, 0)
        }
    }

    var r = function () {
        var t = e.createElement("textarea");
        return t.setSelectionRange ? function (e, t, n) {
            var n = n || 0;
            setTimeout(function () {
                e.focus(), e.setSelectionRange(t, t + n)
            })
        } : t.createTextRange ? function (e, t, n) {
            var n = n || 0;
            e.focus();
            var r = e.value.length, a = e.createTextRange();
            a.moveStart("character", t), a.moveEnd("character", t + n - r), a.select()
        } : void 0
    }(), a = function () {
        var t = e.createElement("textarea");
        return "number" == typeof t.selectionStart ? function (e) {
            return [e.selectionStart, e.selectionEnd, e.value.slice(e.selectionStart, e.selectionEnd)]
        } : function (t) {
            var n = 0, r = 0;
            t.focus();
            var a = e.selection.createRange();
            if ("TEXTAREA" == t.tagName) {
                var i = e.body.createTextRange();
                for (i.moveToElementText(t), n = 0; i.compareEndPoints("StartToStart", a) < 0; n++)i.moveStart("character", 1);
                for (var o = 0; n >= o; o++)"\n" == t.value.charAt(o) && n++;
                for (i.moveToElementText(t), r = 0; i.compareEndPoints("StartToEnd", a) < 0; r++)i.moveStart("character", 1);
                for (var o = 0; r >= o; o++)"\n" == t.value.charAt(o) && r++
            }
            return [n, r, selectedTxt, t.value.slice(n, r)]
        }
    }();
    return {insertTxt: n, Selection: t, setPosition: r, getPosition: a}
});
define("comments/face", ["js/Base", "js/juicer"], function (e, i) {
    function t(t) {
        var a = "", l = s.split(/\s/), a = i(n, {list: l}), r = UI.pop({
            title: "贱萌的emoji表情",
            top: t.top,
            left: t.left,
            width: 300,
            html: a
        });
        e.bind(r.cntDom, "click", "a", function () {
            t.onSelect && t.onSelect(this.getAttribute("title")), r.close()
        })
    }

    var s = "smile grinning smiley blush relaxed wink heart_eyes kissing_heart kissing_heart kissing flushed grin pensive relieved cry scream angry mask tired_face sleeping hushed smirk 1 -1 two_men_holding_hands heart broken_heart gun", n = ['<div class="face_list">{@each list as it}', '<a href="javascript:void(0)" title="${it}"><span class="emoji s_${it}"></span></a>', "{@/each}</div>"].join("");
    return t
});
define("js/pagination", ["js/Base"], function (a) {
    function i() {
        var a = '<ul class="pagination">';
        if (!(this.page_num < 2)) {
            a += this.page_cur > 1 ? '<li class="pagination_prev"><a data-page="prev" href="javascript:void(0)" >上一页</a></li>' : '<li class="pagination_prev disabled"><span>上一页</span></li>';
            var i = 0, t = 0;
            for (this.page_num > this.max_page_btn && (t = this.page_cur - Math.floor(this.max_page_btn / 2)), t = Math.max(t, 1); t < this.page_num + 1 && (a += t != this.page_cur ? '<li><a data-page="jump" href="javascript:void(0)">' + t + "</a></li>" : '<li class="active"><span>' + t + "</span></li>", i++, !(i >= this.max_page_btn)); t++);
            a += this.page_num - this.page_cur >= 1 ? '<li class="pagination_next"><a data-page="next" href="javascript:void(0)">下一页</a></li>' : '<li class="pagination_next disabled"><span>下一页</span></li>', a += "</ul>", this.dom.innerHTML = a
        }
    }

    function t(t, e) {
        var e = e || {}, s = this;
        this.list_count = e.list_count || 0, this.page_cur = e.page_cur || 1, this.page_list_num = e.page_list_num || 15, this.page_num = Math.ceil(this.list_count / this.page_list_num), this.max_page_btn = e.max_page_btn || 50, this.jump = null, this.dom = document.createElement("div"), a.bind(this.dom, "click", "a", function (a) {
            var i, t = this.getAttribute("data-page");
            switch (t) {
                case"next":
                    s.jumpTo(++s.page_cur);
                    break;
                case"prev":
                    s.jumpTo(--s.page_cur);
                    break;
                default:
                    i = parseInt(this.innerHTML), s.page_cur = i - 1, s.jumpTo(i)
            }
            a.preventDefault()
        }), t.innerHTML = "", t.appendChild(this.dom), i.call(this)
    }

    return t.prototype = {
        jumpTo: function (a) {
            this.page_cur = a, i.call(this), this.jump && this.jump(a)
        }
    }, t
});
define("comments/index", ["exports", "js/Base", "comments/selection", "comments/face", "js/pagination", "js/juicer"], function (t, e, i, n, s, a) {
    function o(t) {
        var e = null;
        return "string" == typeof t && t.match(/[\w-]+\.\w{2,4}/) && (e = t.match(/^http(?:s|)\:\/\//) ? t : "http://" + t), e
    }

    function l(t, e) {
        return this._events = this._events || {}, this._events[t] || (this._events[t] = []), this._events[t].push(e), this
    }

    function r(t, e) {
        if (this._events = this._events || {}, this._events[t])for (var i = 0, n = this._events[t].length; n > i; i++)this._events[t][i].apply(this.event_global || this, e)
    }

    function c(t) {
        t = t || {};
        var i = {
            username: t.username || "",
            email: t.email || "",
            blog: t.blog || "",
            avatar: t.avatar || g
        }, n = i.username || "雁过留名", s = e.query(".l_send_username", this.dom);
        s.innerHTML = n, s.setAttribute("title", n), e.query(".l_send_avatar img", this.dom).setAttribute("src", i.avatar)
    }

    function d(t) {
        return t.replace(/\:((\w|\-)+)\:/g, '<span class="emoji s_$1"></span>')
    }

    function u(t, i) {
        var n;
        if (t.user.id) n = null; else {
            if (!(t.user && t.user.username.length > 0))return void(i && i("未登录"));
            n = t.user
        }
        e.fetch({
            url: "/ajax/comments/add",
            type: "POST",
            data: {cid: t.id, content: t.text, user: n, reply_for_id: t.reply_for_id},
            callback: function (t, e) {
                !t && e.code && 200 == e.code ? i && i(null, e.data) : i && i("fail")
            }
        })
    }

    function m(t) {
        function i() {
            var e = l.value, i = c.value, s = d.value;
            return e.length < 1 ? (UI.prompt("大哥，告诉我你叫什么呗！", null, {from: "top"}), !1) : s.length && !o(s) ? (UI.prompt("博客地址是对的么？", null, {from: "top"}), !1) : (L.user.setLocalUser({
                username: e,
                email: i,
                blog: s
            }), void L.user.info(function (e, i) {
                e ? p = null : i && (p = i), r.call(n, "login", [p]), t && t()
            }))
        }

        var n = this, s = p, a = UI.pop({
            title: "雁过留名",
            width: 300,
            html: T,
            easyClose: !1,
            mask: !0,
            confirm: i
        }), l = e.query('input[name="username"]', a.dom), c = e.query('input[name="email"]', a.dom), d = e.query('input[name="blog"]', a.dom);
        s && (l.value = s.username || "", c.value = s.email || "", d.value = s.blog || "")
    }

    function _() {
        var t, s, a = this, o = a.dom, l = e.query("textarea", o);
        e.bind(l, "keyup keydown change propertychange input paste", function () {
            clearTimeout(t), t = setTimeout(function () {
                var t = l.value.trim();
                t != a.text && (a.text = t, r.call(a, "change"))
            }, 80)
        }).bind("focus", function () {
            clearTimeout(s), e.addClass(o, "l_sendBox_active")
        }).bind("focusout blur", function () {
            clearTimeout(s), s = setTimeout(function () {
                0 == a.text.length && e.removeClass(o, "l_sendBox_active")
            }, 200)
        }), e.bind(o, "click", ".l_send_placeholder", function () {
            l.focus()
        }).bind("click", ".set-userinfo", function () {
            m.call(a)
        }).bind("click", ".l_send_submit", function () {
            a.submit()
        }).bind("click", ".l_send_face", function () {
            var t = e.offset(this);
            l.focus(), n({
                top: t.top, left: t.left, onSelect: function (t) {
                    i.insertTxt(l, ":" + t + ":"), e.trigger(l, "change")
                }
            })
        })
    }

    function f() {
        var t = this, i = this.dom, n = e.query("textarea", i), s = e.query(".l_send_count", i), a = e.query("b", s);
        this.on("change", function () {
            var e = n.value.length, i = t.limit - e, o = i;
            e > 2 * t.limit / 3 ? (s.style.display = "block", 0 > i && (o = '<font color="#f50">' + Math.abs(i) + "</font>"), a.innerHTML = o) : s.style.display = "none"
        }).on("login", function (e) {
            c.call(t, e), p = e
        }).on("sendToServiceError", function () {
            UI.prompt("网络出错，没发成功！")
        }).on("sendToServiceSuccess", function () {
            n.value = "", e.trigger(n, "change"), UI.prompt("发布成功！")
        })
    }

    function v(t, i, n) {
        var s = this, n = n || {};
        this.id = i, this.reply_for_id = n.reply_for_id || null, this.isSubmitting = !1, this.limit = 500, this.dom = e.createDom(x), this.text = "", this.userDefine = {}, this.onBeforeSend = n.onBeforeSend || null, t.innerHTML = "", t.appendChild(this.dom), _.call(this), f.call(this), L.user.info(function (t, e) {
            t ? p = null : e && (p = e), c.call(s, e)
        }), n.focus && e.query("textarea", this.dom).focus()
    }

    function h(t, i, n) {
        var o = this;
        n = n || {}, this.cid = i, this.list = [], this.skip = 0, this.limit = n.list_num || 15, this.total = 0, this._status = "normal", this.dom = e.createDom(q), t.innerHTML = "", t.appendChild(this.dom), this.getData(0, function (t, i) {
            if (t)return void(e.query(".l_com_list_cnt", o.dom).innerHTML = y);
            var n = (location.hash || "").match(/#comments-(.+)/), l = a(S, i);
            if (e.query(".l_com_list_cnt", o.dom).innerHTML = l, n) {
                var r = e.query('.l_com_item[data-id="' + n[1] + '"]', o.dom);
                setTimeout(function () {
                    o.scrollTo(r), e.addClass(r, "l_com_item_ani-active")
                }, 500)
            }
            if (0 == o.total) e.query(".l_com_list_cnt", o.dom).innerHTML = y; else {
                var c = new s(e.query(".l_com_list_pagination", o.dom), {
                    list_count: o.total,
                    page_cur: 0,
                    page_list_num: o.limit,
                    max_page_btn: 6
                });
                c.jump = function (t) {
                    o.scrollTo(o.dom), o.getData((t - 1) * o.limit, function (t, i) {
                        if (t)return void console.log("error");
                        var n = a(S, i);
                        e.query(".l_com_list_cnt", o.dom).innerHTML = n
                    })
                }
            }
        }), e.bind(o.dom, "click", ".btn-reply", function () {
            var t = e.parents(this, ".l_com_item"), i = t.getAttribute("data-username"), n = UI.pop({
                title: "回复：" + i,
                mask: !0,
                easyClose: !1,
                from: "top"
            }), s = new v(n.cntDom, o.cid, {
                focus: !0,
                reply_for_id: t.getAttribute("data-id"),
                onBeforeSend: function (t) {
                    return "@" + i + " " + t
                }
            });
            e.css(e.query(".UI_pop_cpt", n.dom), {border: "none"}), s.on("sendToServiceSuccess", function (t) {
                n.close(), o.addItem(t)
            })
        })
    }

    var p = null, g = "//dn-lay.qbox.me/build/single-page/images/default_9fa6849.jpg", y = '<div class="l_com_list_noData">来的真早，快抢沙发！</div>', b = '<div class="l_comments">\n	<div class="l_com_sendBox"></div>\n	<div class="l_com_list">\n	</div>\n</div>', x = '<div class="l_sendBox" spellcheck="false">\n  <div class="l_send_side">\n    <div class="l_send_avatar set-userinfo"><img src="" onerror="L.gravatar_error_fn(this)"/></div>\n    <a href="javascript:void(0)" class="l_send_username set-userinfo">报上名来</a>\n  </div>\n  <div class="l_sendBox_main">\n    <div class="l_send_textarea">\n      <textarea name="content"></textarea>\n      <div class="l_send_placeholder">评论屌一点，BUG少一点！</div>\n    </div>\n    <div class="l_send_footer">\n      <div class="l_send_footer_left">\n        <a href="javascript:void(0)" title="插入表情" class="l_send_face"><span class="l-icon l-icon-face"></span></a>\n        <div class="l_send_count"><b>500</b><i>/</i><span>500</span></div>\n      </div>\n      <div class="l_send_footer_right">\n        <a href="javascript:void(0)" class="l_send_submit">发布</a>\n      </div>\n    </div>\n  </div>\n</div>\n', T = '<div class="l_sendBox_user">\n	<input type="text" autocomplete="off" name="username" placeholder="昵称"/>\n	<input type="text" autocomplete="off" name="email" placeholder="xxx@qq.cn"/>\n	<input type="text" autocomplete="off" name="blog" placeholder="xxx.me"/>\n	<p>邮箱仅用于<a href="https://en.gravatar.com/" title="全球认可的大头贴">gravatar</a>头像，和与您沟通！</p>\n</div>\n', q = '<div>\n    <div class="l_com_list_cnt"><div class="l-loading-panel"><span class="l-loading"></span><p>正在加载评论内容</p></div></div>\n    <div class="l_com_list_pagination"></div>\n</div>', S = '{@each list as it}<div class="l_com_item" data-uid="${it.uid}" data-id="${it._id}" data-cid="${it.cid}" data-username="${it.user.username}">\n  <div class="avatar">\n    <img src="${it.user.avatar}" onerror="L.gravatar_error_fn(this)"/>\n  </div>\n  <div class="content">\n    <div class="caption">{@if it.user.blog}<a href="${it.user.blog}">${it.user.username}</a>{@else}${it.user.username}{@/if} </div>\n    <div class="text">$${it.content}</div>\n    <div class="footer">\n      <div class="time">${it.time}</div>\n      <a href="javascript:void(0)" class="btn-reply">回复</a>\n    </div>\n  </div>\n</div>{@/each}';
    v.prototype = {
        on: l, submit: function () {
            var t = this, i = e.query("textarea", this.dom);
            if (i.focus(), !this.isSubmitting)if (0 == this.text.length) UI.prompt("你丫倒写点东西啊！", null); else if (this.text.length > 500) UI.prompt("这是要刷屏的节奏么！", null); else if (p) {
                var n = this.onBeforeSend ? this.onBeforeSend(t.text) || t.text : t.text;
                t.isSubmitting = !0, u({
                    id: t.id,
                    text: n,
                    user: p,
                    reply_for_id: t.reply_for_id || null
                }, function (e, i) {
                    t.isSubmitting = !1, e ? r.call(t, "sendToServiceError") : r.call(t, "sendToServiceSuccess", [i])
                })
            } else m.call(t, function () {
                t.submit()
            })
        }
    }, h.prototype.scrollTo = function (t) {
        e.query("body").scrollTop = e.offset(t).top - 70
    }, h.prototype.addItem = function (t) {
        t.time = "刚刚", t.content = d(t.content), t.user && t.user.blog && (t.user.blog = o(t.user.blog));
        var i = a(S, {list: [t]}), n = e.createDom(i), s = e.query(".l_com_list_cnt", this.dom);
        s.insertBefore(n, s.firstChild), e.addClass(n, "l_com_item_ani-insert");
        var l = e.query(".l_com_list_noData", this.dom);
        l && (l.style.display = "none")
    }, h.prototype.getData = function (t, i) {
        if ("loading" != this._status) {
            var n = this;
            this._status = "loading", e.fetch({
                url: "/ajax/comments/list",
                data: {cid: this.cid, skip: t || 0, limit: this.limit || 10},
                callback: function (t, s) {
                    if (n._status = "loaded", t || 500 == s.code) i && i(500); else if (s.code && 200 == s.code) {
                        var a = s.data;
                        n.total = a.count, n.list = a.list, n.list.forEach(function (t) {
                            t.time = e.parseTime(t.time, "{h}:{ii} {y}-{m}-{d}"), t.content = d(t.content), t.user.avatar = t.user.avatar || g, t.user.blog && (t.user.blog = o(t.user.blog))
                        }), i && i(null, a)
                    }
                }
            })
        }
    }, t.sendBox = v, t.list = h, t.init = function (t, i, n) {
        var s = this;
        this.dom = e.createDom(b), this.id = i, t.innerHTML = "", t.appendChild(this.dom), this.sendBox = new v(e.query(".l_com_sendBox", this.dom), i, n), this.list = new h(e.query(".l_com_list", this.dom), i, n), this.sendBox.on("sendToServiceSuccess", function (t) {
            s.list.addItem(t)
        })
    }
});
define("js/page/blogDetail", ["js/Base", "js/highlight", "comments/index", "js/juicer"], function (i, n, t, e) {
    function a(n, t) {
        i.fetch({
            url: "/ajax/blog", data: {act: "get_detail", format: "html", id: n}, callback: function (n, e) {
                if (!n && e && 200 == e.code) {
                    var a = e.detail;
                    a.time_show = i.parseTime(a.time_show, "{y}-{mm}-{dd}"), t && t(null, a)
                } else t && t("博客不存在！")
            }
        })
    }

    var s = '<div class="blogDetail">\n  <header>\n    <h1>${title}</h1>\n    <p>发布时间：<span>${time_show} </span></p>\n    <div class="sns-share" data-text="${intro}" data-url="http://bh-lay.com/blog/${id}" data-title="${title}" data-img="${cover}">\n        <a href="#" title="分享至新浪微博" data-shareto="weibo" class="btn focusme"><i class="l-icon l-icon-weibo"></i></a>\n        <a href="#" title="分享至QQ空间" data-shareto="qzone" class="btn"><i class="l-icon l-icon-qzone"></i></a>\n    </div>\n  </header>\n  <div class="article-section">\n    <div class="grid-row">\n      <div class="grid-box-full">\n        <div class="article">$${content}</div>\n        <footer>\n          <p><strong>tgs：</strong>${tags}</p>\n          <p><strong>转载请注明来源：</strong>http://bh-lay.com/blog/${id}</p>\n        </footer>\n      </div>\n    </div>\n  </div>\n  <div class="comments-section">\n    <div class="grid-row">\n      <div class="grid-box-full">\n        <div class="comments_frame"></div>\n      </div>\n    </div>\n  </div>\n</div>';
    return function (l, o) {
        var d = l.node;
        a(o, function (a, c) {
            return a && !c ? (l.push("/"), void l.refresh()) : (l.title(c.title), d.innerHTML = e(s, c), i.each(i.queryAll("pre code", d), function (i) {
                n(i)
            }), void new t.init(i.query(".comments_frame", d), "blog-" + o, {list_num: 8}))
        })
    }
});
define("js/page/labsList", ["js/Base", "js/imageHosting", "js/juicer"], function (i, n, a) {
    var l = '<div class="blank-content"><p>啥都木有</p></div>', s = '<div class="labsList">\n	<div class="l-loading-panel">\n		<span class="l-loading"></span>\n		<p>正在加载数据</p>\n	</div>\n</div>', t = '<div class="grid-row">{@each list as it}<div class="grid-box">\n	<a href="/labs/${it.name}" title="${it.title}" class="lab_item">\n		<div class="cover" style="background-image:url(${it.cover})"><i class="l-icon l-icon-link"></i></div>\n		<div class="info">\n			<h4 class="title">${it.title}</h4>\n			<p>${it.intro}</p>\n		</div>\n   </a>\n</div>{@/each}</div>', e = 20, c = 0, r = null, o = function (a) {
        i.fetch({
            type: "GET", url: "/ajax/labs", data: {act: "get_list", skip: c, limit: e}, callback: function (i, l) {
                if (i || 500 == l.code)return void(a && a(500));
                r = l.count, c += e;
                for (var s = l.list, t = 0, o = s.length; o > t; t++)s[t].work_range = s[t].work_range ? s[t].work_range.split(/\,/) : ["暂未填写"], s[t].cover = n(s[t].cover, {
                    type: "cover",
                    width: 320,
                    height: 400
                });
                a && a(null, s)
            }
        })
    };
    return function (n) {
        var e = n.node;
        c = 0, e.innerHTML = s, o(function (n, s) {
            var c;
            c = n ? l : a(t, {list: s}), i.query(".labsList", e).innerHTML = c
        })
    }
});
define("js/page/bless", ["js/Base", "comments/index"], function (s, n) {
    function e(e) {
        var l = L.tplModule(d), o = e.node;
        o.innerHTML = l;
        var c = new n.sendBox(s.query(".bless-sendBox", o), i), a = new n.list(s.query(".grid-col-flow-300", o), i);
        c.on("sendToServiceSuccess", function (s) {
            a.addItem(s)
        })
    }

    var i = "define-1", d = '<div class="bless-header"><div class="grid-row">\n  <div class="grid-box-full">\n    <h2><span class="l-icon l-icon-comment"></span>说点啥</h2>\n    <div class="bless-sendBox"></div>\n  </div>\n</div></div>\n<div class="grid-row blessPage">\n  <div class="grid-col-flow-300"></div>\n  <div class="grid-col-fix-300 sidebar">[-github_links-][-latest_comments-]</div>\n</div>\n';
    return e
});
define("js/routerHandle", ["js/Base", "js/lofox", "js/page/index", "js/page/blogList", "js/page/blogDetail", "js/page/labsList", "js/page/bless", "js/navigation"], function (e, t, n, s, i, a, l, o) {
    "use strict";
    function r(e) {
        return 0 == e.length || e.match(/^(javascript\s*\:|#)/) ? !0 : !1
    }

    function u() {
        var t = e.createDom('<div class="page"><div class="l-loading-panel"><span class="l-loading"></span><p>正在加载模块</p></div></div>');
        if (p) {
            var n = p;
            p = null, e.addClass(n, "fadeOutRight"), setTimeout(function () {
                e.remove(n), e.query("body").scrollTop = 0, e.addClass(t, "fadeInLeft page-active"), setTimeout(function () {
                    e.removeClass(t, "fadeInLeft")
                }, 500)
            }, 500)
        } else e.addClass(t, "page-active");
        return c.appendChild(t), p = t
    }

    function f() {
        this.node = u()
    }

    var d = new t, c = e.query(".app_container"), p = null, b = null;
    return f.prototype = {push: d.push.bind(d), refresh: d.refresh.bind(d), title: d.title.bind(d)}, function () {
        d.beforeTitleChange = function (e) {
            return e + "_剧中人的个人空间 网页设计师博客 互动设计学习者"
        }, d.on("beforeRefresh", function () {
            b && b.destroy && b.destroy(), b = null
        }).on("refresh", function () {
        }).set("/", function () {
            this.title("小剧客栈"), o.setCur("/"), b = new n(new f)
        }).set("/blog", function (e, t, n) {
            this.title("我的博客"), o.setCur("blog"), b = new s(new f, n)
        }).set("/blog/{id}", function (e) {
            this.title("我的博客"), o.setCur("blog"), b = new i(new f, e.id)
        }).set("/labs", function () {
            this.title("实验室"), o.setCur("labs"), b = new a(new f)
        }).set("/bless", function () {
            this.title("留言板"), o.setCur("bless"), b = new l(new f)
        }), e.bind(e.query("body"), "click", "a", function (e) {
            var t = this.getAttribute("href");
            r(t) ? e.preventDefault() : d.isInRouter(t) && (setTimeout(function () {
                d.push(t), d.refresh()
            }), e.preventDefault())
        })
    }
});
define("js/funny", ["require"], function () {
    return function () {
        document.addEventListener("visibilitychange", function () {
            document.title = document.hidden ? "出BUG了，快看！" : "小剧客栈，剧中人的个人博客！"
        }), document.body.addEventListener("copy", function (n) {
            var t = n.clipboardData || window.clipboardData, e = window.getSelection().toString();
            if (t && e && !(e.length < 18)) {
                n.preventDefault();
                var o = ["作者：剧中人", "来自：小剧客栈", "链接：" + window.location.href, "", e];
                t.setData("text/html", o.join("<br>")), t.setData("text/plain", o.join("\n"))
            }
        });
        try {
            console.log("一个人到底多无聊\r\n 才会把 console 当成玩具\r\n一个人究竟多堕落\r\n 才会把大好青春荒废在博客上\r\n\r\n\r\n%cfollow me %c https://github.com/bh-lay", "color:red", "color:green")
        } catch (n) {
        }
    }
});
!function (t, e, o, n) {
    var i = n(t, e), a = o(t, e, i);
    t.UI = t.UI || a, t.UI._utils = i, t.define && define("js/dialog", ["require"], function () {
        return a
    })
}(window, document, function (t, e, o) {
    function n() {
        J = 0 == Q.scrollTop ? ee.scrollTop : Q.scrollTop, q = t.innerHeight || e.documentElement.clientHeight, K = t.innerWidth || e.documentElement.clientWidth, G = Q.scrollHeight, A = Q.clientWidth
    }

    function i(t) {
        o.each(ie, function (e, o) {
            return o == t ? (ie.splice(e, 1), !1) : void 0
        })
    }

    function a() {
        for (var t = ie.length - 1; t >= 0; t--)if (ie[t]._easyClose) {
            ie[t].close();
            break
        }
    }

    function r() {
        for (var t = ie.length - 1; t >= 0; t--)if (ie[t]._mask) {
            var e = D(ie[t].dom, "zIndex");
            if (N(e))return parseInt(e)
        }
        return 0
    }

    function l() {
        clearTimeout(ne), ne = setTimeout(function () {
            o.each(ie, function (t, e) {
                e.adapt && e.adapt()
            })
        }, 150)
    }

    function c(t, e) {
        var n = this;
        ("boolean" == typeof t ? t : e) && (o.addClass(n.dom, "UI_easyClose"), setTimeout(function () {
            n._easyClose = !0
        }))
    }

    function s(t, e, o, n) {
        var i = oe.gap;
        return t < J + i.top ? t = J + i.top : t + n - J > q - i.bottom && (t = n > q - i.top - i.bottom ? J + i.top : J + q - n - i.bottom), e < i.left ? e = i.left : e + o > A - i.right && (e = A - o - i.right), {
            top: Math.ceil(t),
            left: Math.ceil(e)
        }
    }

    function p(t, e, o) {
        var e = e || {}, n = S(t), i = L(t), a = (q - i) / 2 + J, r = (A - n) / 2, l = s(a, r, n, i), c = N(o) ? z : T;
        c(t, {top: N(e.top) ? e.top : Math.ceil(l.top), left: N(e.left) ? e.left : Math.ceil(l.left)}, o)
    }

    function d() {
        p(this.dom, null, 80)
    }

    function f(t, e, n) {
        var i = null, a = null, r = ["确认", "取消"];
        if ("function" == typeof e) i = e; else if ("object" == typeof e) {
            var l = e.btns || [];
            r[0] = l[0] || r[0], r[1] = l[1] || r[1], "function" == typeof e.callback && (i = e.callback), "function" == typeof e.cancel && (a = e.cancel)
        }
        var c = o.render(H, {confirm: r[0], cancel: r[1]});
        t.appendChild(o.createDom(c)[0]), j(t, "click", ".UI_pop_confirm_ok", function () {
            i ? 0 != i() && n() : n()
        }), j(t, "click", ".UI_pop_confirm_cancel", function () {
            a ? 0 != a() && n() : n()
        })
    }

    function u(t) {
        var e = ee.childNodes;
        o.each(e, function (e, o) {
            o != Z && 1 == o.nodeType && "SCRIPT" != o.tagName && "LINK" != o.tagName && "STYLE" != o.tagName && t(o)
        })
    }

    function m() {
        var t = r();
        T(this.dom, {zIndex: t + 2}), this._mask && (T(te, {zIndex: t + 1}), 0 == t && (re && re(), o.fadeIn(te, 300)))
    }

    function h() {
        var t = this;
        if (t._mask) {
            var e = r();
            T(te, {zIndex: e - 1}), 0 == e && (le && le(), o.fadeOut(te, 150))
        }
    }

    function v(t, e) {
        var o, n;
        switch (t) {
            case"left":
                o = "X", n = -e;
                break;
            case"right":
                o = "X", n = e;
                break;
            case"bottom":
                o = "Y", n = e;
                break;
            default:
                o = "Y", n = -e
        }
        return [o, n]
    }

    function _(t) {
        var e = this, n = e.dom, i = e._from, a = 80;
        if (ie.push(e), m.call(e), E || !i || "none" == i)return void(t && t());
        var r = (o.offset(n), {}), l = {};
        if (i.tagName && i.parentNode) {
            var c = o.offset(i);
            r = {
                top: c.top,
                left: c.left,
                clip: "rect(0," + S(i) + "px," + L(i) + "px,0)",
                overflow: "hidden"
            }, l = {clip: "rect(0," + S(n) + "px," + L(n) + "px,0)", top: D(n, "top"), left: D(n, "left")}
        } else {
            if ("string" != typeof i)return void(t && t());
            var s = v(i, 10);
            r.transform = "translate" + s[0] + "(" + s[1] + "px)", l.transform = "translateX(0) translateY(0)"
        }
        r.opacity = 0, l.opacity = 1, T(n, r), z(n, l, a, "ease-out", function () {
            T(n, {clip: "auto"}), t && t()
        })
    }

    function g(t, e) {
        return function (n) {
            function a() {
                h.call(r), o.removeNode(l)
            }

            var r = this;
            if (!r.dead) {
                r.dead = !0, i(r), r.closeFn && r.closeFn(), e && e.call(r);
                var l = r.dom;
                if (E || "none" == c)return void a();
                var n = N(n) ? n : parseInt(t) || 80, c = r._from;
                if (c && c.tagName && c.parentNode) {
                    var s = o.offset(c);
                    T(l, {overflow: "hidden", clip: "rect(0," + S(l) + "px," + L(l) + "px,0)"}), z(l, {
                        top: s.top,
                        left: s.left,
                        clip: "rect(0," + S(c) + "px," + L(c) + "px,0)",
                        opacity: .3
                    }, n, function () {
                        z(l, {opacity: 0}, 50, a)
                    })
                } else if ("string" == typeof c) {
                    var p = v(c, 10);
                    z(l, {opacity: 0, transform: "translate" + p[0] + "(" + p[1] + "px)"}, n, a)
                } else a()
            }
        }
    }

    function x(t) {
        if (!(this instanceof x))return new x(t);
        var t = t || {}, e = this;
        e.dom = o.createDom(F)[0], e.cntDom = M(e.dom, "UI_cnt")[0], e.closeFn = t.closeFn || null, e._mask = t.mask || !1, e._from = t.from || "top", t.confirm && f(e.dom, t.confirm, function () {
            e.close()
        });
        var n = M(e.dom, "UI_pop_cpt")[0];
        if (t.title) {
            var i = t.title || "need title in parameter!";
            n.innerHTML = i, o.drag(n, e.dom, {
                move: function (t, o, n, i, a, r) {
                    var l = t + n, c = o + i, p = s(c, l, a, r);
                    T(e.dom, {left: p.left, top: p.top})
                }
            })
        } else o.removeNode(n);
        j(e.dom, "click", ".UI_pop_close", function () {
            e.close()
        }), e.cntDom.innerHTML = t.html || "", T(e.dom, {width: Math.min(t.width || 600, A - 20)}), Z.appendChild(e.dom), p(e.dom, t), c.call(e, t.easyClose, !0), _.call(e, function () {
            t.init && t.init.call(e, e.cntDom)
        })
    }

    function I(t) {
        if (!(this instanceof I))return new I(t);
        var t = t || {}, e = this, n = o.render(Y, {text: t.text || "need text in parameter!"});
        e.dom = o.createDom(n)[0], e.closeFn = t.closeFn || null, e._mask = "boolean" == typeof t.mask ? t.mask : !0, e._from = t.from || "top", f(e.dom, t, function () {
            e.close()
        }), Z.appendChild(e.dom), p(e.dom), c.call(e, t.easyClose, !0), _.call(e, function () {
            t.init && t.init.call(e, e.dom)
        })
    }

    function b(t, e, n) {
        if (!(this instanceof b))return new b(t, e, n);
        var i = this, n = n || {}, a = o.render(W, {text: t || "need text in parameter!"});
        i.dom = o.createDom(a)[0], i._mask = "boolean" == typeof n.mask ? n.mask : !0, i._from = n.from || "top", i.inputDom = M(i.dom, "UI_ask_key")[0], i.closeFn = null;
        var r = o.render(H, {confirm: "确定", cancel: "取消"});
        i.dom.appendChild(o.createDom(r)[0]), j(i.dom, "click", ".UI_pop_confirm_ok", function () {
            e ? 0 != e(i.inputDom.value) && i.close() : i.close()
        }), j(i.dom, "click", ".UI_pop_confirm_cancel", function () {
            i.close()
        }), Z.appendChild(i.dom), p(i.dom), c.call(i, n.easyClose, !0), _.call(i, function () {
            i.inputDom.focus(), n.init && n.init.call(i, i.dom)
        })
    }

    function y(t, e, n) {
        if (!(this instanceof y))return new y(t, e, n);
        var n = n || {}, i = this;
        i.dom = o.createDom(O)[0], i._from = n.from || "bottom", i._mask = n.mask ? !0 : !1, i.tips(t, e), Z.appendChild(i.dom), p(i.dom), _.call(i, function () {
            n.init && n.init.call(i, i.dom)
        })
    }

    function U(t) {
        if (!(this instanceof U))return new U(t);
        var e = this, t = t || {};
        e.closeFn = t.closeFn || null, e.dom = o.createDom(P)[0], e._from = t.from || null, e.dom.innerHTML = t.html || "", T(e.dom, {
            width: t.width || 240,
            height: t.height || null,
            top: N(t.top) ? t.top : 300,
            left: N(t.left) ? t.left : 800
        }), Z.appendChild(e.dom), c.call(e, !0), _.call(e, function () {
            t.init && t.init.call(e, e.dom)
        })
    }

    function w(t) {
        if (!(this instanceof w))return new w(t);
        var t = t || {}, e = this;
        e.dom = o.createDom(R)[0], e._mask = "boolean" == typeof t.mask ? t.mask : !1, e._from = t.from || "top", e.cntDom = M(e.dom, "UI_cnt")[0], e.closeFn = t.closeFn || null, j(e.dom, "click", ".UI_close", function () {
            e.close()
        }), e._bodyOverflowY = D(ee, "overflowY"), T(e.dom, {
            height: q,
            top: J
        }), Z.appendChild(e.dom), c.call(e, t.easyClose, !0), _.call(e, function () {
            T(ee, {overflowY: "hidden"}), t.init && t.init.call(e, e.cntDom)
        }), e.cntDom.innerHTML = t.html || ""
    }

    function k(t, e) {
        if (!(this instanceof k))return new k(t, e);
        var n = this, e = e || {}, t = t || [], i = [], a = [];
        o.each(t, function (t, e) {
            a.push(e[0]), i.push(e[1])
        });
        var r = o.render(V, {list: a, title: e.title || null, intro: e.intro || null});
        n.dom = o.createDom(r)[0], n.closeFn = e.closeFn || null, n._from = e.from || "bottom", n._mask = A > 640 ? e.mask : !0;
        var l = M(n.dom, "UI_select_btn");
        if (o.each(l, function (t, e) {
                j(e, "click", function () {
                    i[t] && i[t](), n.close()
                })
            }), 640 > A && !E) n._from = "bottom", Z.appendChild(n.dom); else {
            var p = {top: e.top || 100, left: e.left || 100, width: e.width || 200};
            Z.appendChild(n.dom), T(n.dom, p);
            var f = s(p.top, p.left, p.width, L(n.dom));
            T(n.dom, {left: f.left, top: f.top}), n.adapt = d
        }
        c.call(n, e.easyClose, !0), _.call(n, function () {
            e.init && e.init.call(n, n.dom)
        })
    }

    var C, E, N = o.isNum, T = o.css, D = o.getStyle, z = o.animation, S = o.outerWidth, L = o.outerHeight, M = o.findByClassName, j = o.bind, B = '<div class="UI_lawyer"><div class="UI_mask"></div></div>', F = '<div class="UI_pop"><div class="UI_pop_cpt"></div><div class="UI_cnt"></div><a href="javascript:;" class="UI_pop_close" title="关闭">×</a></div>', Y = '<div class="UI_confirm"><div class="UI_confirm_text"><%=text %></div></div>', W = '<div class="UI_ask"><div class="UI_ask_text"><%=text %></div><input class="UI_ask_key" type="text" name="UI_ask_key"/></div>', H = '<div class="UI_pop_confirm"><a href="javascript:;" class="UI_pop_confirm_ok"><%=confirm %></a><a href="javascript:;" class="UI_pop_confirm_cancel"><%=cancel %></a></div>', O = '<div class="UI_prompt"><div class="UI_cnt"></div></div>', R = '<div class="UI_cover"><div class="UI_cnt"></div><a href="javascript:;" class="UI_close UI_coverClose">×</a></div>', P = '<div class="UI_plane"></div>', V = '<div class="UI_select"><div class="UI_select_body UI_cnt"><% if(title){ %><div class="UI_selectCpt"><h3><%=title %></h3><% if(intro){ %><p><%=intro %></p><% } %></div><% } %><div class="UI_selectCnt"><% for(var i=0,total=list.length;i<total;i++){ %><a class="UI_select_btn" href="javascript:;"><%=list[i] %></a><% } %></div></div><div class="UI_selectCancel"><a class="UI_select_btn" href="javascript:;">取消</a></div></div>', X = '.UI_lawyer{position:absolute;top:0;left:0;z-index:4999;width:100%;height:0;overflow:visible;font-family:"Microsoft Yahei"}.UI_lawyer a,.UI_lawyer a:hover,.UI_lawyer a:active{outline:none;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent}.UI_mask{position:absolute;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.6;filter:alpha(opacity=60);display:none}.UI-blur{-webkit-filter:blur(3px)}.UI_pop{width:200px;position:absolute;top:400px;left:300px;background:#fff;box-shadow:2px 3px 10px rgba(0,0,0,0.6)}.UI_pop_cpt{position:relative;height:36px;line-height:36px;overflow:hidden;border-bottom:1px solid #ebebeb;color:#777;font-size:16px;text-indent:15px;cursor:default}.UI_pop .UI_cnt{position:relative;min-height:100px;overflow:auto}.UI_pop_close{display:block;position:absolute;top:0;right:0;width:40px;height:36px;text-align:center;color:#ddd;font:bold 20px/36px "simsun";transition:0.1s}.UI_pop_close:hover{color:#888}.UI_pop_close:active{color:#222}.UI_confirm{width:300px;position:absolute;background:#fff;overflow:hidden;box-shadow:2px 3px 10px rgba(0,0,0,0.6)}.UI_confirm_text{padding:30px 10px 20px;line-height:26px;text-align:center;font-size:20px;color:#333}.UI_ask{width:300px;position:absolute;background:#fff;overflow:hidden;box-shadow:2px 3px 10px rgba(0,0,0,0.6)}.UI_ask_text{padding:25px 10px 15px;line-height:26px;text-align:center;font-size:18px;color:#333}.UI_ask input{display:block;margin:0 auto 15px;height:30px;padding:4px 4px;line-height:22px;box-sizing:border-box;width:90%}.UI_pop_confirm{overflow:hidden;text-align:center;border-top:1px solid #ddd;white-space:nowrap}.UI_pop_confirm a{display:inline-block;width:50%;font-size:14px;line-height:36px;color:#03f;transition:0.15s}.UI_pop_confirm a:hover{background:#eee}.UI_pop_confirm_ok{border-right:1px solid #ddd}.UI_prompt{position:absolute;width:240px;background:#fff;box-shadow:2px 2px 10px rgba(0,0,0,0.5)}.UI_prompt .UI_cnt{padding:30px 10px;font-size:18px;color:#333;text-align:center}.UI_plane{position:absolute}.UI_cover{position:absolute;left:0;width:100%;height:100%}.UI_cover .UI_cnt{position:relative;width:100%;height:100%;background:#fff;overflow:auto}.UI_coverClose{display:block;position:absolute;top:10px;right:20px;width:30px;height:30px;text-align:center;color:#aaa;font:18px/30px "simsun";background:#eee;border-radius:15px;border:1px solid #aaa}.UI_coverClose:hover{background:#333;color:#fff;transition:0.2s}.UI_select{position:absolute;width:200px;box-shadow:2px 2px 2px rgba(0,0,0,0.6)}.UI_select a{display:block;height:40px;line-height:40px;text-align:center;color:#03f;font-size:16px}.UI_select_body{overflow:hidden;background:#fff}.UI_selectCpt{padding:8px 0}.UI_selectCpt h3,.UI_selectCpt p{margin:0;font-size:15px;line-height:18px;text-align:center;color:#aaa;font-weight:normal}.UI_selectCpt p{font-size:12px}.UI_selectCnt a{height:34px;line-height:34px;font-size:14px;border-top:1px solid #ddd}.UI_selectCnt a:hover{background:#eee}.UI_selectCancel{display:none}@media(max-width:640px){.UI_select{position:fixed;bottom:0;width:100%;padding-bottom:10px}.UI_select_body, .UI_selectCancel{margin:0 10px;border-radius:8px}.UI_select_body{margin:0 10px 10px}.UI_selectCancel{display:block;background:#fff}}.UI_ie678 .UI_pop,.UI_ie678 .UI_confirm,.UI_ie678 .UI_ask,.UI_ie678 .UI_prompt,.UI_ie678 .UI_select{outline:3px solid #ccc}';
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var $ = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
        "MSIE6.0" == $ || "MSIE7.0" == $ ? (C = !0, E = !0) : "MSIE8.0" == $ && (E = !0)
    }
    var A, K, q, G, J, Q, Z = o.createDom(B)[0], te = M(Z, "UI_mask")[0], ee = e.body, oe = {
        gap: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }, zIndex: 499
    };
    Q = "BackCompat" == e.compatMode ? ee : e.documentElement;
    var ne, ie = [];
    j(ee, "mouseup", function (t) {
        var e = t.srcElement || t.target;
        setTimeout(function () {
            for (; !o.hasClass(e, "UI_easyClose");)if (e = e.parentNode, !e) {
                a();
                break
            }
        })
    }), j(ee, "keyup", function (t) {
        27 == t.keyCode && a()
    });
    o.createStyleSheet(X, {"data-module": "UI"});
    ee.appendChild(Z), X = null, B = null, n(), setTimeout(n, 500), E && o.addClass(Z, "UI_ie678");
    var ae = null;
    C ? ae = function () {
        n(), l(), T(te, {marginTop: J})
    } : (T(te, {position: "fixed", top: 0}), ae = function () {
        n(), l()
    }), j(t, "resize", ae), j(t, "scroll", ae);
    var re, le;
    return o.supports("-webkit-filter") && (re = function () {
        u(function (t) {
            o.addClass(t, "UI-blur")
        })
    }, le = function () {
        u(function (t) {
            o.removeClass(t, "UI-blur")
        })
    }), x.prototype.close = g(80), x.prototype.adapt = d, I.prototype.close = g(80), I.prototype.adapt = d, b.prototype.close = g(80), b.prototype.setValue = function (t) {
        this.inputDom.value = t.toString()
    }, b.prototype.adapt = d, y.prototype.close = g(60), y.prototype.tips = function (t, e) {
        var o = this;
        t && (M(this.dom, "UI_cnt")[0].innerHTML = t), 0 != e && setTimeout(function () {
            o.close()
        }, e || 1500)
    }, y.prototype.adapt = d, U.prototype.close = g(80), U.prototype.adapt = d, w.prototype.close = g(200, function () {
        T(this.cntDom, {overflowY: "hidden"}), T(ee, {overflowY: this._bodyOverflowY})
    }), w.prototype.adapt = d, k.prototype.close = g(100), {
        pop: x, config: {
            gap: function (t, e) {
                t && "number" == typeof oe.gap[t] && N(e) && (oe.gap[t] = parseInt(e))
            }, zIndex: function (t) {
                var t = parseInt(t);
                t > 0 && (oe.zIndex = t, T(Z, {zIndex: t}))
            }
        }, confirm: I, ask: b, prompt: y, plane: U, cover: w, select: k
    }
}, function (t, e) {
    function o(t) {
        return Object.prototype.toString.call(t).match(/\s(\w+)/)[1].toLowerCase()
    }

    function n(t) {
        return "" !== t && t == +t ? !0 : !1
    }

    function i(t, e) {
        if ("object" == typeof t && "function" == typeof e) {
            var o = t.length;
            if (n(o))for (var i = 0; o > i && e.call(this, i, t[i]) !== !1; i++); else for (var i in t)if (t.hasOwnProperty(i) && e.call(this, i, t[i]) === !1)break
        }
    }

    function a(t, e) {
        return i(t, function (t, o) {
            "object" == typeof o ? (e[t] = o.constructor == Array ? [] : {}, a(o, e[t])) : e[t] = o
        }), e
    }

    function r(t, e) {
        return t.className && t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)")) || !1
    }

    function l(t, o) {
        var i;
        if ("borderWidth" == o ? o = "borderLeftWidth" : o, t.style[o]) i = t.style[o]; else if (e.defaultView) {
            var a = e.defaultView.getComputedStyle(t, null);
            i = o in a ? a[o] : a.getPropertyValue(o)
        } else t.currentStyle && (i = t.currentStyle[o]);
        return /\px$/.test(i) ? i = parseInt(i) : n(i) ? i = Number(i) : "" == i || "medium" == i ? i = 0 : "auto" == i && ("height" == o ? i = t.clientHeight : "width" == o && (i = t.clientWidth)), i
    }

    function c(t, e, o) {
        e = e.toString(), "opacity" == e ? (t.style.filter = "alpha(opacity=" + 100 * o + ")", o = o) : n(o) && "zIndex" != e && (o += "px"), t.style[e] = o
    }

    function s(t, e) {
        t = [].concat(t), i(e, function (t, o) {
            ("transform" == t || "transition" == t) && i(["webkit", "o", "moz"], function (n, i) {
                e["-" + i + "-" + t] = o
            })
        }), i(t, function (t, o) {
            i(e, function (t, e) {
                c(o, t, e)
            })
        })
    }

    function p(t, e, o, n, i) {
        function r() {
            r = null, t.removeEventListener("webkitTransitionEnd", c, !0), s(t, {transition: p || "all 0s"}), i && i.call(t)
        }

        function c() {
            clearTimeout(f), f = setTimeout(function () {
                r && r()
            }, 40)
        }

        var p = l(t, "transition"), d = a(e, {transition: o + "ms " + n});
        d.transform ? d.transform.match("translate3d") || (d.transform = d.transform + " translate3d(0, 0, 0)") : d.transform = "translate3d(0, 0, 0)";
        var f;
        t.addEventListener("webkitTransitionEnd", c, !0), setTimeout(function () {
            r && r()
        }, o + 80), setTimeout(function () {
            s(t, d)
        }, 10)
    }

    function d(t, e, n, i, a) {
        var r = "linear", l = null;
        if (arguments.length < 3)throw new Error("missing arguments [dom,cssObj,durtime]");
        return "function" == o(i) ? l = i : "string" == typeof i && (r = i), "function" == o(a) && (l = a), x ? p(t, e, n, r, l) : (s(t, e), void(l && l.call(t)))
    }

    function f(t) {
        return l(t, "borderLeftWidth") + l(t, "paddingLeft") + l(t, "width") + l(t, "paddingRight") + l(t, "borderRightWidth")
    }

    function u(t) {
        return l(t, "borderTopWidth") + l(t, "paddingTop") + l(t, "height") + l(t, "paddingBottom") + l(t, "borderBottomWidth")
    }

    function m(t, e, o) {
        for (var n = t.srcElement || t.target; ;) {
            if (n == o || !n)return !1;
            if (r(n, e))return n;
            n = n.parentNode
        }
    }

    function h(t, e, o, n) {
        var i, a, r;
        "string" == typeof o ? (i = o.replace(/^\./, ""), a = n, r = function (e) {
            var o = m(e, i, t);
            o && a && a.call(o)
        }) : r = o, b(t, e, r)
    }

    var v, _, g = function () {
        var t = e.createElement("div").style, o = "Webkit Khtml Ms O Moz".split(/\s/);
        return function (e) {
            var n = !1;
            return e in t ? n = e : (e = e.replace(/^[a-z]/, function (t) {
                return t.toUpperCase()
            }), i(o, function (o, i) {
                i + e in t && (n = ("-" + i + "-" + e).toLowerCase())
            })), n
        }
    }(), x = g("transition") && g("transform") ? !0 : !1, I = e.createElement("div");
    "undefined" !== I.getBoundingClientRect ? (v = function (t) {
        var e = t.getBoundingClientRect().width;
        return "number" == typeof e ? e : f(t)
    }, _ = function (t) {
        var e = t.getBoundingClientRect().height;
        return "number" == typeof e ? e : u(t)
    }) : (v = f, _ = u);
    var b = function () {
        return t.addEventListener ? function (t, e, o) {
            t.addEventListener(e, o, !1)
        } : t.attachEvent ? function (t, e, o) {
            t.attachEvent("on" + e, o)
        } : void 0
    }(), y = function () {
        return t.removeEventListener ? function (t, e, o) {
            t.removeEventListener(e, o, !1)
        } : t.detachEvent ? function (t, e, o) {
            t.detachEvent("on" + e, o)
        } : void 0
    }();
    return {
        TypeOf: o,
        isNum: n,
        each: i,
        getStyle: l,
        css: s,
        animation: d,
        supports: g,
        outerWidth: v,
        outerHeight: _,
        bind: h,
        clone: a,
        unbind: y,
        hasClass: r,
        addClass: function (t, e) {
            this.hasClass(t, e) || (t.className += " " + e)
        },
        removeClass: function (t, e) {
            if (r(t, e)) {
                var o = new RegExp("(\\s+|^)" + e + "(\\s+|$)");
                t.className = t.className.replace(o, " ")
            }
        },
        ready: function () {
            function o() {
                y(e, "DOMContentLoaded", o), y(t, "load", o), i(n, function (t, e) {
                    e()
                }), n = null
            }

            var n = [];
            return function (i) {
                "complete" === e.readyState ? i && i() : (i && n.push(i), b(e, "DOMContentLoaded", o), b(t, "load", o))
            }
        }(),
        drag: function (o, n, i) {
            function a(o) {
                h && h.call(n, o.clientX - c, o.clientY - s, p, d, f, u), o.preventDefault && o.preventDefault(), o.stopPropagation && o.stopPropagation(), t.getSelection ? t.getSelection().removeAllRanges() : e.selection.empty()
            }

            function r() {
                y(e, "mousemove", a), y(e, "mouseup", r), g && g.call(n)
            }

            var c, s, p, d, f, u, i = i || {}, m = i.start || null, h = i.move || null, g = i.end || null;
            b(o, "mousedown", function (t) {
                t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), c = t.clientX, s = t.clientY, p = l(n, "left"), d = l(n, "top"), f = v(n), u = _(n), m && m.call(n, c, s), b(e, "mousemove", a), b(e, "mouseup", r)
            })
        },
        createDom: function (t) {
            var o = e.createElement("div");
            return o.innerHTML = t, o.childNodes
        },
        insertAfter: function (t, e) {
            var o = e.parentNode;
            o.lastChild == e ? o.appendChild(t) : o.insertBefore(t, e.nextSibling)
        },
        removeNode: function (t) {
            t && t.parentNode && "BODY" != t.tagName && t.parentNode.removeChild(t)
        },
        createStyleSheet: function (t, o) {
            var n = e.createElement("style");
            if (o = o || {}, o.type = "text/css", i(o, function (t, e) {
                    n.setAttribute(t, e)
                }), n.styleSheet) n.styleSheet.cssText = t; else {
                var a = e.createTextNode(t);
                n.appendChild(a)
            }
            return (e.head || e.getElementsByTagName("head")[0]).appendChild(n), n
        },
        findByClassName: function () {
            return "undefined" != typeof e.getElementsByClassName ? function (t, e) {
                return t.getElementsByClassName(e)
            } : function (t, e) {
                var o = [], n = t.getElementsByTagName("*");
                return i(n, function (t, n) {
                    r(n, e) && o.push(n)
                }), o
            }
        }(),
        offset: function (t) {
            var o, n = {top: 0, left: 0, screen_top: 0, screen_left: 0};
            return "undefined" != typeof t.getBoundingClientRect && (o = t.getBoundingClientRect()), n.screen_top = o.top, n.screen_left = o.left, n.top = o.top + (0 == e.documentElement.scrollTop ? e.body.scrollTop : e.documentElement.scrollTop), n.left = o.left + e.body.scrollLeft, n
        },
        fadeIn: function (t, e, o) {
            var n = l(t, "opacity");
            s(t, {opacity: 0, display: "block"}), d(t, {opacity: n}, e, function () {
                o && o.call(t)
            })
        },
        fadeOut: function (t, e, o) {
            var n = l(t, "opacity");
            d(t, {opacity: 0}, e, function () {
                t.style.opacity = n, t.style.display = "none", o && o.call(t)
            })
        },
        render: function (t, e) {
            return t && e ? new Function("obj", "var p=[];with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")(e) : ""
        }
    }
});
window.L = window.L || {}, require(["js/user", "js/navigation", "js/Base", "js/routerHandle", "js/imageHosting", "js/funny", "js/dialog"], function (e, t, r, a, n, o) {
    var i = function () {
        var e = document.createElement("div").style, t = "Webkit Khtml Ms O Moz".split(/\s/);
        return function (r) {
            if (r in e)return r;
            r = r.replace(/^[a-z]/, function (e) {
                return e.toUpperCase()
            });
            for (var a = 0, n = t.length; n > a; a++)if (t[a] + r in e)return ("-" + t[a] + "-" + r).toLowerCase()
        }
    }(), s = document.createElement("canvas").getContext ? !0 : !1, u = /windows|win32/.test(navigator.userAgent.toLowerCase()), c = window.history && window.history.pushState, d = i("transform") && c && s ? !0 : !1;
    d || (document.cookie = "ui_version=html;path=/;", window.location.reload()), u && r.addClass(r.query("body"), "define-scrollbar"), L.user = e, L.gravatar_error_fn = function (e) {
        e.src.indexOf("www.gravatar.com") > -1 ? e.src = e.src.replace("www.gravatar.com", "gravatar.duoshuo.com") : e.src.indexOf("gravatar.duoshuo.com") > -1 && (e.src = "//dn-lay.qbox.me/build/single-page/images/default_9fa6849.jpg")
    }, L.tplModule = function (e) {
        return e && e.length ? e.replace(/\[\-(\w+)\-\]/g, function (e, t) {
            return r.query("#module_" + t).innerHTML || ""
        }) : ""
    };
    var l = '<style type="text/css" data-module="emoji">';
    (r.query("#data_emoji").innerHTML || "").trim().split(/\s+/).forEach(function (e, t) {
        l += ".emoji.s_" + e + "{background-position: -" + 25 * t + "px 0;}"
    }), l += "</style>", r.query("head").insertAdjacentHTML("beforeEnd", l), UI.config.zIndex(2e3), t.init(), o(), a(), r.addClass(r.query(".app_mask"), "app_mask_out"), setTimeout(function () {
        r.remove(r.query(".app_mask"))
    }, 1e3), r.bind(r.query("body"), "click", ".sns-share a", function () {
        var e = r.parents(this, ".sns-share"), t = e.getAttribute("data-url") || location.href, a = encodeURIComponent(e.getAttribute("data-text")) || document.title, o = encodeURIComponent(e.getAttribute("data-title")), i = e.getAttribute("data-img"), s = this.getAttribute("data-shareto");
        i = i ? n(i) : "";
        var u = {
            weibo: "http://service.weibo.com/share/share.php?title=" + a + "+&url=" + t + "&source=bookmark&appkey=2861592023&searchPic=false&pic=" + i,
            qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=" + a + "&url=" + t + "&title=" + o + "&pics=" + i + "&desc=" + a
        };
        return u[s] && window.open(u[s]), !1
    })
});