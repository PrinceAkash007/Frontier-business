/**
 * @version $Id: jquery.djmobilemenu.js 63 2017-01-31 16:19:29Z szymon $
 * @package DJ-MegaMenu
 * @copyright Copyright (C) 2013 DJ-Extensions.com, All rights reserved.
 * @license DJ-Extensions.com Proprietary Use License
 * @author url: http://dj-extensions.com
 * @author email contact@dj-extensions.com
 * @developer Szymon Woronowski - szymon.woronowski@design-joomla.eu
 */
! function(a) {
    var b = function(b, d) {
            var e = a('<select id="' + b.attr("id") + 'select" class="inputbox dj-select" />').on("change", function() {
                    a(this).val && (window.location = a(this).val())
                }),
                f = b.find("li.dj-up");
            c(f, e, 0), e.appendTo(d), d.find(".dj-mobile-open-btn").on("click", function(a) {
                a.stopPropagation(), a.preventDefault();
                var b = e[0];
                if (document.createEvent) {
                    var c = document.createEvent("MouseEvents");
                    c.initMouseEvent("mousedown", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), b.dispatchEvent(c)
                } else b.fireEvent && b.fireEvent("onmousedown")
            })
        },
        c = function(b, d, e) {
            for (var f = "", g = !1, h = 0; h < e; h++) f += "- ";
            b.each(function() {
                var b = a(this),
                    h = b.find("> a").first(),
                    i = b.find("> .dj-subwrap > .dj-subwrap-in > .dj-subcol > .dj-submenu > li, > .dj-subtree > li");
                if (h.length) {
                    var j = "",
                        k = h.find("img").first();
                    k.length ? j = f + k.attr("alt") : (j = h.html().replace(/(<small[^<]+<\/small>)/gi, ""), j = f + j.replace(/(<([^>]+)>)/gi, ""));
                    var l = a('<option value="' + h.prop("href") + '">' + j + "</option>").appendTo(d);
                    h.prop("href") || l.prop("disabled", !0), b.hasClass("active") && (d.val(l.val()), g = !0)
                }
                i && c(i, d, e + 1)
            }), e || g || (a('<option value="">- MENU -</option>').prependTo(d), d.val(""))
        },
        d = function(b) {
            b.find("ul.dj-mobile-nav > li, ul.dj-mobile-nav-child > li").each(function() {
                var b = a(this),
                    c = b.find("> a").first();
                if (c.length) {
                    var d = b.find("> ul.dj-mobile-nav-child > li:not(:empty)");
                    d.length || (b.removeClass("parent"), b.find("ul.dj-mobile-nav-child").remove()), b.hasClass("parent") && (c.append('<span class="toggler"></span>'), c.on("click", function(c) {
                        b.hasClass("active") ? a(c.target).hasClass("toggler") && (c.preventDefault(), c.stopPropagation(), b.removeClass("active")) : c.preventDefault()
                    })), c.on("focus", function() {
                        setTimeout(function() {
                            b.click()
                        }, 250)
                    })
                }
                b.on("click", function() {
                    b.siblings().removeClass("active"), b.addClass("active")
                })
            })
        },
        e = function(b) {
            var c = null,
                e = jQuery(".dj-offcanvas-wrapper").first(),
                f = jQuery(".dj-offcanvas-pusher").first(),
                g = jQuery(".dj-offcanvas-pusher-in").first();
            e.length || (c = a(document.body).children(), e = a('<div class="dj-offcanvas-wrapper" />'), f = a('<div class="dj-offcanvas-pusher" />'), g = a('<div class="dj-offcanvas-pusher-in" />'));
            var h = b.find(".dj-offcanvas").first(),
                i = h.data("effect");
            a(document.body).addClass("dj-offcanvas-effect-" + i);
            var j = null;
            b.find(".dj-mobile-open-btn").on("click", function(b) {
                b.stopPropagation(), b.preventDefault(), clearTimeout(j), h.data("scroll", a(window).scrollTop()), a(document.body).addClass("dj-offcanvas-anim"), setTimeout(function() {
                    a(document.body).addClass("dj-offcanvas-open")
                }, 50), g.css("top", -h.data("scroll")), h.find(".dj-offcanvas-close-btn").focus()
            }), c && a(document.body).prepend(e), 3 == i || 6 == i || 7 == i || 8 == i || 14 == i ? f.append(h) : e.append(h), c && (e.append(f), f.append(g), g.append(c)), h.find(".dj-offcanvas-close-btn").on("click", function(c) {
                c.stopPropagation(), c.preventDefault(), a(document.body).hasClass("dj-offcanvas-open") && (a(document.body).removeClass("dj-offcanvas-open"), j = setTimeout(function() {
                    g.css("top", 0), a(document.body).removeClass("dj-offcanvas-anim"), a(window).scrollTop(h.data("scroll")), b.find(".dj-mobile-open-btn").focus()
                }, 500))
            }), a(".dj-offcanvas-pusher").on("click", function(b) {
                a(b.target).parents(".dj-offcanvas").length || h.find(".dj-offcanvas-close-btn").click()
            }), h.find(".dj-offcanvas-close-btn").on("keydown", function(a) {
                9 == a.which && setTimeout(function() {
                    h.find(":focus").length || h.find(".dj-offcanvas-close-btn").click()
                }, 50)
            }), h.find(".dj-offcanvas-end").on("focus", function() {
                h.find(".dj-offcanvas-close-btn").click()
            }), d(h)
        },
        f = function(b) {
            b.find(".dj-mobile-open-btn").on("click", function(a) {
                a.stopPropagation(), a.preventDefault(), b.find(".dj-accordion-in").slideToggle("fast")
            }), a(document).on("click", function(c) {
                a(c.target).closest(".dj-accordion-in").length || b.find(".dj-accordion-in").is(":visible") && b.find(".dj-accordion-in").slideUp("fast")
            }), d(b)
        },
        g = null;
    a(window).resize(function() {
        window.clearTimeout(g), g = window.setTimeout(function() {
            a("body").css("overflow", "hidden");
            var b = a(window).innerWidth();
            a("body").css("overflow", "");
            var c = !1;
            a(".dj-megamenu").each(function() {
                var d = a(this),
                    e = a("#" + d.prop("id") + "mobile");
                e.length && (b <= d.data("trigger") ? (c = !0, a(document.body).addClass(d.prop("id") + "-mobile")) : a(document.body).removeClass(d.prop("id") + "-mobile"))
            }), c ? a(document.body).addClass("dj-megamenu-mobile") : a(document.body).removeClass("dj-megamenu-mobile")
        }, 100)
    }), a(document).ready(function() {
        a(".dj-megamenu").each(function() {
            var b = a(this),
                c = a("#" + b.prop("id") + "mobile"),
                d = a("#" + b.prop("id") + "mobileWrap");
            d.length && d.append(c), c.length && (c.find(".dj-hideitem").remove(), c.hasClass("dj-megamenu-offcanvas") ? e(c) : c.hasClass("dj-megamenu-accordion") && f(c))
        }), a(window).trigger("resize")
    }), a(window).one("load", function() {
        a(".dj-megamenu").each(function() {
            var c = a(this),
                d = a("#" + c.prop("id") + "mobile");
            d.length && d.hasClass("dj-megamenu-select") && b(c, d)
        }), a(".dj-offcanvas-close-btn").click()
    })
}(jQuery);