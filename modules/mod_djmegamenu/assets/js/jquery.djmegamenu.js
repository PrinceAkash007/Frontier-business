/**
 * @version $Id: jquery.djmegamenu.js 65 2017-02-06 09:15:30Z szymon $
 * @package DJ-MegaMenu
 * @copyright Copyright (C) 2013 DJ-Extensions.com, All rights reserved.
 * @license DJ-Extensions.com Proprietary Use License
 * @author url: http://dj-extensions.com
 * @author email contact@dj-extensions.com
 * @developer Szymon Woronowski - szymon.woronowski@design-joomla.eu
 */
! function(a) {
    var b = function(a, b) {
        this.options = {
            openDelay: 250,
            closeDelay: 500,
            animIn: "fadeIn",
            animOut: "fadeOut",
            animSpeed: "normal",
            duration: 450,
            wrap: null,
            direction: "ltr",
            event: "mouseenter",
            touch: "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
            offset: 0,
            wcag: 1
        }, this.init(a, b)
    };
    b.prototype.init = function(b, d) {
        var e = this;
        if (jQuery.extend(e.options, d), b.length) {
            switch (e.options.menu = b, e.options.blurTimer = null, e.options.animSpeed) {
                case "fast":
                    e.options.duration = 250;
                    break;
                case "slow":
                    e.options.duration = 650
            }
            b.addClass(e.options.animSpeed);
            var f = b.find("li.dj-up");
            e.kids = [], e.options.wrap ? e.options.wrap = a("#" + e.options.wrap) : e.options.wrap = b, e.options.touch && b.on("touchstart", function(a) {
                a.stopPropagation()
            }), f.each(function(b) {
                var d = a(this);
                e.kids[b] = new c(d, 0, e, e.options)
            }), 1 != e.options.fixed || e.options.touch || a(window).one("load", e.makeSticky.bind(e, b)), 1 == e.options.wcag && (e.focusable = b.find("a[href], [tabindex]"), b.on("keydown", function(a) {
                e.focusNearest(a)
            }))
        }
    }, b.prototype.focusNearest = function(b) {
        var c = this,
            d = b.which,
            e = c.options.menu.find(":focus"),
            f = e.offset(),
            g = {
                x: 1024,
                y: 1024
            },
            h = null,
            i = function(a) {
                if (!a.is(":hidden") && a != e) {
                    var b = a.offset(),
                        c = {
                            x: Math.abs(b.left - f.left),
                            y: Math.abs(b.top - f.top)
                        };
                    37 == d && b.left < f.left || 39 == d && b.left > f.left ? (c.y < g.y || c.y == g.y && c.x < g.x) && (g = c, h = a) : (38 == d && b.top < f.top || 40 == d && b.top > f.top && c.x < a.width()) && c.x + c.y < g.x + g.y && (g = c, h = a)
                }
            };
        c.focusable.each(function() {
            i(a(this))
        }), h && (b.preventDefault(), b.stopPropagation(), h.focus())
    }, b.prototype.makeSticky = function(b) {
        var c = this;
        c.sticky = !1;
        var d = a("#" + b.attr("id") + "sticky"),
            e = b.offset().top - parseInt(c.options.offset),
            f = b.clone();
        f.attr("id", b.attr("id") + "placeholder"), f.css({
            display: "none",
            opacity: 0
        }), f.insertBefore(d);
        var g = "rtl" == c.options.direction ? "right" : "left";
        a(window).scroll(c.scroll.bind(c, d, b, f, e, g, !1)), a(window).resize(c.scroll.bind(c, d, b, f, e, g, !0))
    }, b.prototype.scroll = function(b, c, d, e, f, g) {
        var h = this;
        if (a(window).scrollTop() > e) {
            if (!h.sticky && !g || h.sticky && g) {
                var i = c.offset(),
                    j = "left" == f ? i.left : a(window).width() - i.left - c.outerWidth();
                c.css(f, j), g || (b.css({
                    position: "fixed",
                    top: parseInt(h.options.offset),
                    left: 0,
                    width: "100%"
                }), d.css("display", ""), b.find(".dj-stickylogo").css("display", ""), h.sticky = !0);
                var k = a(window).height() - parseInt(h.options.offset) - c.height();
                c.find(".dj-up.fullsub > .dj-subwrap").css({
                    "max-width": d.outerWidth(),
                    "max-height": k,
                    overflow: "auto"
                })
            }
        } else h.sticky && (b.find(".dj-stickylogo").css("display", "none"), b.css({
            position: "",
            top: "",
            left: 0,
            width: ""
        }), d.css("display", "none"), c.css(f, ""), c.css("max-width", ""), h.sticky = !1, c.find(".dj-up.fullsub > .dj-subwrap").css({
            "max-width": "",
            "max-height": "",
            overflow: ""
        }))
    };
    var c = function(a, b, c, d) {
        this.options = {}, this.init(a, b, c, d)
    };
    c.prototype.init = function(b, c, d, e) {
        var f = this;
        jQuery.extend(f.options, e), f.menu = b, f.level = c, f.parent = d, f.timer = null, f.blurTimer = null, f.sub = f.menu.find("> .dj-subwrap").first();
        var g = f.menu.find(".dj-submenu > li, .dj-subtree > li");
        g.length || (f.sub.remove(), f.menu.removeClass("parent"), f.menu.find("span.dj-drop").removeClass("dj-drop"), f.menu.find("i.arrow").remove());
        var h = "mouseenter";
        if (f.options.touch || "click_all" == f.options.event) {
            h = f.options.touch ? h : "click";
            var i = f.menu.find("> a").first();
            i.length && (f.menu.hasClass("separator") && i.css("cursor", "pointer"), i.on("touchend click", function(a) {
                f.sub.length && !f.menu.hasClass("hover") && (a.preventDefault(), "touchend" == a.type && f.menu.trigger("click"))
            }))
        } else if ("click" == f.options.event && f.menu.hasClass("separator")) {
            var i = f.menu.find("> a").first();
            i.length && i.css("cursor", "pointer"), h = "click"
        }
        if (f.options.touch && (f.menu.on("click", f.showSub.bind(f)), a(document).on("touchstart", function() {
                f.menu.hasClass("hover") && f.menu.trigger("mouseleave")
            })), f.menu.on(h, f.showSub.bind(f)), f.menu.on("mouseleave", f.hideSub.bind(f)), 1 == f.options.wcag) {
            var i = f.menu.find("> a").first();
            i.on("focus", f.showSub.bind(f)), i.on("blur", function() {
                f.blurTimer = setTimeout(function() {
                    if (!f.options.menu.find(":focus").length) {
                        for (var a = f; a.level > 0;) a.hideSub(), a = a.parent;
                        a.hideSub()
                    }
                }, 1e3)
            }), i.on("keydown", function(a) {
                f.focusNearest(a)
            }), f.options.menu.on("click", function() {
                clearTimeout(f.blurTimer)
            })
        }
        f.sub.length && (f.kids = [], f.initKids())
    }, c.prototype.focusNearest = function(b) {
        var c = this,
            d = b.which,
            e = c.menu.offset(),
            f = {
                x: 1024,
                y: 1024
            },
            g = null,
            h = function(a) {
                if (a.menu && a.menu.find("> a").length) {
                    var b = a.menu.offset(),
                        c = {
                            x: Math.abs(b.top - e.top),
                            y: Math.abs(b.left - e.left)
                        };
                    37 == d && b.left < e.left || 39 == d && b.left > e.left ? (c.x < f.x || c.x == f.x && c.y < f.y) && (f = c, g = a) : (38 == d && b.top < e.top || 40 == d && b.top > e.top) && (c.y < f.y || c.y == f.y && c.x < f.x) && (f = c, g = a)
                }
            };
        a.each(c.parent.kids, function(a, b) {
            h(b)
        }), g || (h(c.parent), c.sub.length && a.each(c.kids, function(a, b) {
            h(b)
        })), g && (b.preventDefault(), b.stopPropagation(), g.menu.find("> a").first().focus())
    }, c.prototype.showSub = function() {
        var b = this;
        clearTimeout(b.timer), b.menu.hasClass("hover") && !b.sub.hasClass(b.options.animOut) || (b.sub.length && b.sub.css("display", "none"), b.timer = setTimeout(function() {
            clearTimeout(b.animTimer), b.menu.addClass("hover"), b.hideOther(), b.sub.length && (b.sub.css("display", ""), b.sub.removeClass(b.options.animOut), b.checkDir(), b.sub.addClass(b.options.animIn), a(window).trigger("resize"))
        }, b.options.openDelay))
    }, c.prototype.hideSub = function() {
        var a = this;
        clearTimeout(a.timer), a.sub.length ? a.timer = setTimeout(function() {
            a.sub.removeClass(a.options.animIn), a.sub.addClass(a.options.animOut), a.animTimer = setTimeout(function() {
                a.menu.removeClass("hover")
            }, a.options.duration)
        }, a.options.closeDelay) : a.menu.removeClass("hover")
    }, c.prototype.checkDir = function() {
        var a = this;
        if (!a.menu.hasClass("fullsub")) {
            a.sub.css("left", ""), a.sub.css("right", ""), a.sub.css("margin-left", ""), a.sub.css("margin-right", "");
            var b = a.sub.offset(),
                c = a.options.wrap.offset();
            if ("ltr" == a.options.direction) {
                var d = b.left + a.sub.outerWidth() - a.options.wrap.outerWidth() - c.left;
                (d > 0 || a.sub.hasClass("open-left")) && (a.level ? (a.sub.css("right", a.menu.outerWidth()), a.sub.css("left", "auto")) : a.sub.hasClass("open-left") ? (a.sub.css("right", a.sub.css("left")), a.sub.css("left", "auto")) : a.sub.css("margin-left", -d))
            } else if ("rtl" == a.options.direction) {
                var d = b.left - c.left;
                (d < 0 || a.sub.hasClass("open-right")) && (a.level ? (a.sub.css("left", a.menu.outerWidth()), a.sub.css("right", "auto")) : a.sub.hasClass("open-right") ? (a.sub.css("left", a.sub.css("right")), a.sub.css("right", "auto")) : a.sub.css("margin-right", d))
            }
        }
    }, c.prototype.initKids = function() {
        var b = this,
            d = b.sub.find("> .dj-subwrap-in > .dj-subcol > ul.dj-submenu > li");
        d.each(function(d) {
            var e = a(this);
            b.kids[d] = new c(e, b.level + 1, b, b.options)
        })
    }, c.prototype.hideOther = function() {
        var b = this;
        a.each(b.parent.kids, function(a, c) {
            c.menu.hasClass("hover") && c != b && (c.sub.length ? (c.hideOtherSub(), c.sub.removeClass(c.options.animIn), c.sub.addClass(c.options.animOut), c.animTimer = setTimeout(function() {
                c.menu.removeClass("hover")
            }, b.options.duration)) : c.menu.removeClass("hover"))
        })
    }, c.prototype.hideOtherSub = function() {
        var b = this;
        a.each(b.kids, function(a, b) {
            b.sub.length && (b.hideOtherSub(), b.sub.removeClass(b.options.animIn), b.sub.removeClass(b.options.animOut)), b.menu.removeClass("hover")
        })
    }, a(document).ready(function() {
        a(".dj-megamenu[data-options]").each(function() {
            var c = a(this);
            c.find(".dj-hideitem").remove(), c.data();
            var d = c.data("options");
            c.removeAttr("data-options"), new b(c, d)
        })
    })
}(jQuery);