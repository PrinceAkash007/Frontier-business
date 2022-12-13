var $ = jQuery.noConflict();
jQuery(function(e) {
    var t = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i)
        },
        mobile: function() {
            return t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
        },
        any: function() {
            return t.mobile() || t.iPad()
        }
    };
    e(document).one("focus.autoExpand", "textarea.autoExpand", function() {
        var e = this.value;
        this.value = "", this.baseScrollHeight = this.scrollHeight, this.value = e
    }).on("input.autoExpand", "textarea.autoExpand", function() {
        var e, t = 0 | this.getAttribute("data-min-rows");
        this.rows = t, e = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17), this.rows = t + e
    }), t.mobile() || t.iPad() || e(window).scroll(function() {
        e(".footer-logo:in-viewport").addClass("animated slideInLeft"), e(".partner-logo:in-viewport").addClass("animated slideInRight")
    }), e("#form_newsletter").submit(function(e) {
        e.preventDefault()
    }).validate({
        rules: {
            newsletter_email: {
                required: !0,
                email: !0
            }
        },
        submitHandler: function(t) {
            var n = {
                newsletter_email: e("#newsletter_email").val()
            };
            console.log(e("#newsletter_email").val()), e.post(base_url + "/frontier/snippets/addNewsletterSubscribers.php", n, function(n, i) {
                console.log(n), "success" == n ? e.alert({
                    type: "green",
                    typeAnimated: !0,
                    title: "Success!",
                    content: "Thank you for subscribing to our newsletters."
                }) : e.alert({
                    type: "red",
                    typeAnimated: !0,
                    title: "Found!",
                    content: "Your Email Address Registered already"
                }), e(t)[0].reset()
            })
        }
    }), e.validator.methods.email = function(e, t) {
        return this.optional(t) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim.test(e)
    }
}), jQuery(function(e) {
    e("#eventss").hasClass("eb-event-container") && e(".no-events-text").hide()
});