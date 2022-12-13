! function(e, t, i, o) {
    var n = e(t);
    e.fn.lazyload = function(r) {
        var f, l = this,
            a = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                skip_invisible: !0,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };

        function h() {
            var t = 0;
            l.each(function() {
                var i = e(this);
                if (!a.skip_invisible || i.is(":visible"))
                    if (e.abovethetop(this, a) || e.leftofbegin(this, a));
                    else if (e.belowthefold(this, a) || e.rightoffold(this, a)) {
                    if (++t > a.failure_limit) return !1
                } else i.trigger("appear"), t = 0
            })
        }
        return r && (o !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), o !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(a, r)), f = a.container === o || a.container === t ? n : e(a.container), 0 === a.event.indexOf("scroll") && f.bind(a.event, function() {
            return h()
        }), this.each(function() {
            var t = this,
                i = e(t);
            t.loaded = !1, i.attr("src") !== o && !1 !== i.attr("src") || i.is("img") && i.attr("src", a.placeholder), i.one("appear", function() {
                if (!this.loaded) {
                    if (a.appear) {
                        var o = l.length;
                        a.appear.call(t, o, a)
                    }
                    e("<img />").bind("load", function() {
                        var o = i.attr("data-" + a.data_attribute);
                        i.hide(), i.is("img") ? i.attr("src", o) : i.css("background-image", "url('" + o + "')"), i[a.effect](a.effect_speed), t.loaded = !0;
                        var n = e.grep(l, function(e) {
                            return !e.loaded
                        });
                        if (l = e(n), a.load) {
                            var r = l.length;
                            a.load.call(t, r, a)
                        }
                    }).attr("src", i.attr("data-" + a.data_attribute))
                }
            }), 0 !== a.event.indexOf("scroll") && i.bind(a.event, function() {
                t.loaded || i.trigger("appear")
            })
        }), n.bind("resize", function() {
            h()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && n.bind("pageshow", function(t) {
            t.originalEvent && t.originalEvent.persisted && l.each(function() {
                e(this).trigger("appear")
            })
        }), e(i).ready(function() {
            h()
        }), this
    }, e.belowthefold = function(i, r) {
        return (r.container === o || r.container === t ? (t.innerHeight ? t.innerHeight : n.height()) + n.scrollTop() : e(r.container).offset().top + e(r.container).height()) <= e(i).offset().top - r.threshold
    }, e.rightoffold = function(i, r) {
        return (r.container === o || r.container === t ? n.width() + n.scrollLeft() : e(r.container).offset().left + e(r.container).width()) <= e(i).offset().left - r.threshold
    }, e.abovethetop = function(i, r) {
        return (r.container === o || r.container === t ? n.scrollTop() : e(r.container).offset().top) >= e(i).offset().top + r.threshold + e(i).height()
    }, e.leftofbegin = function(i, r) {
        return (r.container === o || r.container === t ? n.scrollLeft() : e(r.container).offset().left) >= e(i).offset().left + r.threshold + e(i).width()
    }, e.inviewport = function(t, i) {
        return !(e.rightoffold(t, i) || e.leftofbegin(t, i) || e.belowthefold(t, i) || e.abovethetop(t, i))
    }, e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        "above-the-fold": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-fold": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-fold": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document);