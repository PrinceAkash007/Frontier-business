Joomla = window.Joomla || {}, Joomla.editors = Joomla.editors || {}, Joomla.editors.instances = Joomla.editors.instances || {},
    function(a, b) {
        "use strict";
        a.submitform = function(a, c, d) {
            c || (c = b.getElementById("adminForm")), a && (c.task.value = a), c.noValidate = !d, c.setAttribute("novalidate", !d);
            var e = b.createElement("input");
            e.style.display = "none", e.type = "submit", c.appendChild(e).click(), c.removeChild(e)
        }, a.submitbutton = function(b) {
            a.submitform(b)
        }, a.JText = {
            strings: {},
            _: function(a, b) {
                return "undefined" != typeof this.strings[a.toUpperCase()] ? this.strings[a.toUpperCase()] : b
            },
            load: function(a) {
                for (var b in a) a.hasOwnProperty(b) && (this.strings[b.toUpperCase()] = a[b]);
                return this
            }
        }, a.replaceTokens = function(a) {
            if (/^[0-9A-F]{32}$/i.test(a)) {
                var d, e, f, c = b.getElementsByTagName("input");
                for (d = 0, f = c.length; d < f; d++) e = c[d], "hidden" == e.type && "1" == e.value && 32 == e.name.length && (e.name = a)
            }
        }, a.isEmail = function(a) {
            var b = /^[\w.!#$%&‚Äô*+\/=?^`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]{2,})+$/i;
            return b.test(a)
        }, a.checkAll = function(a, b) {
            if (!a.form) return !1;
            b = b ? b : "cb";
            var d, e, f, c = 0;
            for (d = 0, f = a.form.elements.length; d < f; d++) e = a.form.elements[d], e.type == a.type && 0 === e.id.indexOf(b) && (e.checked = a.checked, c += e.checked ? 1 : 0);
            return a.form.boxchecked && (a.form.boxchecked.value = c), !0
        }, a.renderMessages = function(c) {
            a.removeMessages();
            var e, f, g, h, i, j, k, l, d = b.getElementById("system-message-container");
            for (e in c)
                if (c.hasOwnProperty(e)) {
                    f = c[e], g = b.createElement("div"), l = "notice" == e ? "alert-info" : "alert-" + e, l = "message" == e ? "alert-success" : l, g.className = "alert " + l;
                    var m = b.createElement("button");
                    for (m.setAttribute("type", "button"), m.setAttribute("data-dismiss", "alert"), m.className = "close", m.innerHTML = "×", g.appendChild(m), h = a.JText._(e), "undefined" != typeof h && (i = b.createElement("h4"), i.className = "alert-heading", i.innerHTML = a.JText._(e), g.appendChild(i)), j = f.length - 1; j >= 0; j--) k = b.createElement("div"), k.innerHTML = f[j], g.appendChild(k);
                    d.appendChild(g)
                }
        }, a.removeMessages = function() {
            for (var a = b.getElementById("system-message-container"); a.firstChild;) a.removeChild(a.firstChild);
            a.style.display = "none", a.offsetHeight, a.style.display = ""
        }, a.ajaxErrorsMessages = function(b, c, d) {
            var e = {};
            if ("parsererror" == c) {
                for (var f = b.responseText.trim(), g = [], h = f.length - 1; h >= 0; h--) g.unshift(["&#", f[h].charCodeAt(), ";"].join(""));
                f = g.join(""), e.error = [a.JText._("JLIB_JS_AJAX_ERROR_PARSE").replace("%s", f)]
            } else "nocontent" == c ? e.error = [a.JText._("JLIB_JS_AJAX_ERROR_NO_CONTENT")] : "timeout" == c ? e.error = [a.JText._("JLIB_JS_AJAX_ERROR_TIMEOUT")] : "abort" == c ? e.error = [a.JText._("JLIB_JS_AJAX_ERROR_CONNECTION_ABORT")] : e.error = [a.JText._("JLIB_JS_AJAX_ERROR_OTHER").replace("%s", b.status)];
            return e
        }, a.isChecked = function(a, c) {
            if ("undefined" == typeof c && (c = b.getElementById("adminForm")), c.boxchecked.value = a ? parseInt(c.boxchecked.value) + 1 : parseInt(c.boxchecked.value) - 1, c.elements["checkall-toggle"]) {
                var e, f, g, d = !0;
                for (e = 0, g = c.elements.length; e < g; e++)
                    if (f = c.elements[e], "checkbox" == f.type && "checkall-toggle" != f.name && !f.checked) {
                        d = !1;
                        break
                    }
                c.elements["checkall-toggle"].checked = d
            }
        }, a.popupWindow = function(a, b, c, d, e) {
            var f = (screen.width - c) / 2,
                g = (screen.height - d) / 2,
                h = "height=" + d + ",width=" + c + ",top=" + g + ",left=" + f + ",scrollbars=" + e + ",resizable";
            window.open(a, b, h).window.focus()
        }, a.tableOrdering = function(c, d, e, f) {
            "undefined" == typeof f && (f = b.getElementById("adminForm")), f.filter_order.value = c, f.filter_order_Dir.value = d, a.submitform(e, f)
        }, window.writeDynaList = function(a, c, d, e, f, g) {
            var k, l, m, h = "<select " + a + ">",
                i = d == e,
                j = 0;
            for (l in c) c.hasOwnProperty(l) && (m = c[l], m[0] == d && (k = "", (i && f == m[1] || !i && 0 === j) && (k = 'selected="selected"'), h += '<option value="' + m[1] + '" ' + k + ">" + m[2] + "</option>", j++));
            h += "</select>", g ? g.innerHTML = h : b.writeln(h)
        }, window.changeDynaList = function(a, c, d, e, f) {
            for (var i, j, k, l, g = b.adminForm[a], h = d == e; g.firstChild;) g.removeChild(g.firstChild);
            i = 0;
            for (j in c) c.hasOwnProperty(j) && (k = c[j], k[0] == d && (l = new Option, l.value = k[1], l.text = k[2], (h && f == l.value || !h && 0 === i) && (l.selected = !0), g.options[i++] = l));
            g.length = i
        }, window.radioGetCheckedValue = function(a) {
            if (!a) return "";
            var c, b = a.length;
            if (void 0 === b) return a.checked ? a.value : "";
            for (c = 0; c < b; c++)
                if (a[c].checked) return a[c].value;
            return ""
        }, window.getSelectedValue = function(a, c) {
            var d = b[a][c],
                e = d.selectedIndex;
            return null !== e && e > -1 ? d.options[e].value : null
        }, window.listItemTask = function(a, c) {
            var f, d = b.adminForm,
                e = 0,
                g = d[a];
            if (!g) return !1;
            for (;;) {
                if (f = d["cb" + e], !f) break;
                f.checked = !1, e++
            }
            return g.checked = !0, d.boxchecked.value = 1, window.submitform(c), !1
        }, window.submitbutton = function(b) {
            a.submitbutton(b)
        }, window.submitform = function(b) {
            a.submitform(b)
        }, window.saveorder = function(a, b) {
            window.checkAll_button(a, b)
        }, window.checkAll_button = function(c, d) {
            d = d ? d : "saveorder";
            var e, f;
            for (e = 0; e <= c; e++) {
                if (f = b.adminForm["cb" + e], !f) return void alert("You cannot change the order of items, as an item in the list is `Checked Out`");
                f.checked = !0
            }
            a.submitform(d)
        }, a.loadingLayer = function(c, d) {
            if (c = c || "show", d = d || b.body, "load" == c) {
                var e = b.getElementsByTagName("body")[0].getAttribute("data-basepath") || "",
                    f = b.createElement("div");
                f.id = "loading-logo", f.style.position = "fixed", f.style.top = "0", f.style.left = "0", f.style.width = "100%", f.style.height = "100%", f.style.opacity = "0.8", f.style.filter = "alpha(opacity=80)", f.style.overflow = "hidden", f.style["z-index"] = "10000", f.style.display = "none", f.style["background-color"] = "#fff", f.style["background-image"] = 'url("' + e + '/media/jui/images/ajax-loader.gif")', f.style["background-position"] = "center", f.style["background-repeat"] = "no-repeat", f.style["background-attachment"] = "fixed", d.appendChild(f)
            } else b.getElementById("loading-logo") || a.loadingLayer("load", d), b.getElementById("loading-logo").style.display = "show" == c ? "block" : "none";
            return b.getElementById("loading-logo")
        }
    }(Joomla, document);