(function (e, t, n) {
    "use strict";
    var r = typeof e.moment == "function"
        , i = !!e.addEventListener
        , s = e.setTimeout
        , o = function (e, t, n, r) {
            i ? e.addEventListener(t, n, !!r) : e.attachEvent("on" + t, n)
        }
        , u = function (e, t, n, r) {
            i ? e.removeEventListener(t, n, !!r) : e.detachEvent("on" + t, n)
        }
        , a = function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }
        , f = function (e, t) {
            return (" " + e.className + " ").indexOf(" " + t + " ") !== -1
        }
        , l = function (e, t) {
            f(e, t) || (e.className = e.className === "" ? t : e.className + " " + t)
        }
        , c = function (e, t) {
            e.className = a((" " + e.className + " ").replace(" " + t + " ", " "))
        }
        , h = function (e) {
            return /Array/.test(Object.prototype.toString.call(e))
        }
        , p = function (e) {
            return /Date/.test(Object.prototype.toString.call(e)) && !isNaN(e.getTime())
        }
        , d = function (e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        }
        , v = function (e, t) {
            return [31, d(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        }
        , m = function (e, t) {
            return e.getTime() === t.getTime()
        }
        , g = function (e, t, r) {
            var i, s;
            for (i in t) {
                s = e[i] !== n;
                if (s && typeof t[i] == "object" && t[i].nodeName === n) p(t[i]) ? r && (e[i] = new Date(t[i].getTime())) : h(t[i]) ? r && (e[i] = t[i].slice(0)) : e[i] = g({}, t[i], r);
                else if (r || !s) e[i] = t[i]
            }
            return e
        }
        , y = {
            field: null
            , bound: n
            , format: "YYYY-MM-DD"
            , defaultDate: null
            , setDefaultDate: !1
            , firstDay: 0
            , minDate: null
            , maxDate: null
            , yearRange: 10
            , minYear: 0
            , maxYear: 9999
            , minMonth: n
            , maxMonth: n
            , isRTL: !1
            , numberOfMonths: 1
            , i18n: {
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                , weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                , weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            }
            , onSelect: null
            , onOpen: null
            , onClose: null
        }
        , b = function (e, t, n) {
            t += e.firstDay;
            while (t >= 7) t -= 7;
            return n ? e.i18n.weekdaysShort[t] : e.i18n.weekdays[t]
        }
        , w = function (e, t, n, r, i) {
            if (i) return '<td class="is-empty"></td>';
            var s = [];
            return r && s.push("is-disabled"), n && s.push("is-today"), t && s.push("is-selected"), '<td data-day="' + e + '" class="' + s.join(" ") + '"><button class="pika-button" type="button">' + e + "</button>" + "</td>"
        }
        , E = function (e, t) {
            return "<tr>" + (t ? e.reverse() : e).join("") + "</tr>"
        }
        , S = function (e) {
            return "<tbody>" + e.join("") + "</tbody>"
        }
        , x = function (e) {
            var t, n = [];
            for (t = 0; t < 7; t++) n.push('<th scope="col"><abbr title="' + b(e, t) + '">' + b(e, t, !0) + "</abbr></th>");
            return "<thead>" + (e.isRTL ? n.reverse() : n).join("") + "</thead>"
        }
        , T = function (e) {
            var t, n, r, i = e._o
                , s = e._m
                , o = e._y
                , u = o === i.minYear
                , a = o === i.maxYear
                , f = '<div class="pika-title">'
                , l = !0
                , c = !0;
            for (r = [], t = 0; t < 12; t++) r.push('<option value="' + t + '"' + (t === s ? " selected" : "") + (u && t < i.minMonth || a && t > i.maxMonth ? "disabled" : "") + ">" + i.i18n.months[t] + "</option>");
            f += '<div class="pika-label">' + i.i18n.months[s] + '<select class="pika-select pika-select-month">' + r.join("") + "</select></div>", h(i.yearRange) ? (t = i.yearRange[0], n = i.yearRange[1] + 1) : (t = o - i.yearRange, n = 1 + o + i.yearRange);
            for (r = []; t < n && t <= i.maxYear; t++) t >= i.minYear && r.push('<option value="' + t + '"' + (t === o ? " selected" : "") + ">" + t + "</option>");
            return f += '<div class="pika-label">' + o + '<select class="pika-select pika-select-year">' + r.join("") + "</select></div>", u && (s === 0 || i.minMonth >= s) && (l = !1), a && (s === 11 || i.maxMonth <= s) && (c = !1), f += '<button class="pika-prev' + (l ? "" : " is-disabled") + '" type="button">Previous Month</button>', f += '<button class="pika-next' + (c ? "" : " is-disabled") + '" type="button">Next Month</button>', f += "</div>"
        }
        , N = function (e, t) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table">' + x(e) + S(t) + "</table>"
        };
    e.Pikaday = function (n) {
        var u = this
            , a = u.config(n);
        u._onMouseDown = function (t) {
            if (!u._v) return;
            t = t || e.event;
            var n = t.target || t.srcElement;
            if (!n) return;
            if (!f(n, "is-disabled")) {
                if (f(n, "pika-button") && !f(n, "is-empty")) {
                    u.setDate(new Date(u._y, u._m, parseInt(n.innerHTML, 10))), a.bound && s(function () {
                        u.hide()
                    }, 100);
                    return
                }
                f(n, "pika-prev") ? u.prevMonth() : f(n, "pika-next") && u.nextMonth()
            }
            if (!f(n, "pika-select")) {
                if (!t.preventDefault) return t.returnValue = !1;
                t.preventDefault()
            }
            else u._c = !0
        }, u._onChange = function (t) {
            t = t || e.event;
            var n = t.target || t.srcElement;
            if (!n) return;
            f(n, "pika-select-month") ? u.gotoMonth(n.value) : f(n, "pika-select-year") && u.gotoYear(n.value)
        }, u._onInputChange = function (e) {
            var t = new Date(Date.parse(a.field.value));
            u.setDate(p(t) ? t : null), u._v || u.show()
        }, u._onInputFocus = function (e) {
            u.show()
        }, u._onInputClick = function (e) {
            u.show()
        }, u._onInputBlur = function (e) {
            u._c || (u._b = s(function () {
                u.hide()
            }, 50)), u._c = !1
        }, u._onClick = function (t) {
            t = t || e.event;
            var n = t.target || t.srcElement
                , r = n;
            if (!n) return;
            !i && f(n, "pika-select") && (n.onchange || (n.setAttribute("onchange", "return;"), o(n, "change", u._onChange)));
            do
                if (f(r, "pika-single")) return;
            while (r = r.parentNode);
            u._v && n !== a.field && u.hide()
        }, u.el = t.createElement("div"), u.el.className = "pika-single" + (a.isRTL ? " is-rtl" : ""), o(u.el, "mousedown", u._onMouseDown, !0), o(u.el, "change", u._onChange), a.field && (a.bound ? t.body.appendChild(u.el) : a.field.parentNode.insertBefore(u.el, a.field.nextSibling), o(a.field, "change", u._onInputChange), a.defaultDate || (r && a.field.value ? a.defaultDate = e.moment(a.field.value, a.format).toDate() : a.defaultDate = new Date(Date.parse(a.field.value)), a.setDefaultDate = !0));
        var l = a.defaultDate;
        p(l) ? a.setDefaultDate ? u.setDate(l) : u.gotoDate(l) : u.gotoDate(new Date), a.bound ? (this.hide(), u.el.className += " is-bound", o(a.field, "click", u._onInputClick), o(a.field, "focus", u._onInputFocus), o(a.field, "blur", u._onInputBlur)) : this.show()
    }, e.Pikaday.prototype = {
        config: function (e) {
            this._o || (this._o = g({}, y, !0));
            var t = g(this._o, e, !0);
            t.isRTL = !!t.isRTL, t.field = t.field && t.field.nodeName ? t.field : null, t.bound = !!(t.bound !== n ? t.field && t.bound : t.field);
            var r = parseInt(t.numberOfMonths, 10) || 1;
            t.numberOfMonths = r > 4 ? 4 : r, p(t.minDate) || (t.minDate = !1), p(t.maxDate) || (t.maxDate = !1), t.minDate && t.maxDate && t.maxDate < t.minDate && (t.maxDate = t.minDate = !1), t.minDate && (t.minYear = t.minDate.getFullYear(), t.minMonth = t.minDate.getMonth()), t.maxDate && (t.maxYear = t.maxDate.getFullYear(), t.maxMonth = t.maxDate.getMonth());
            if (h(t.yearRange)) {
                var i = (new Date).getFullYear() - 10;
                t.yearRange[0] = parseInt(t.yearRange[0], 10) || i, t.yearRange[1] = parseInt(t.yearRange[1], 10) || i
            }
            else t.yearRange = Math.abs(parseInt(t.yearRange, 10)) || y.yearRange, t.yearRange > 100 && (t.yearRange = 100);
            return t
        }
        , toString: function (t) {
            return p(this._d) ? r ? e.moment(this._d).format(t || this._o.format) : this._d.toDateString() : ""
        }
        , getMoment: function () {
            return r ? e.moment(this._d) : null
        }
        , getDate: function () {
            return p(this._d) ? new Date(this._d.getTime()) : null
        }
        , setDate: function (e) {
            if (!e) return this._d = null, this.draw();
            typeof e == "string" && (e = new Date(Date.parse(e)));
            if (!p(e)) return;
            var t = this._o.minDate
                , n = this._o.maxDate;
            p(t) && e < t ? e = t : p(n) && e > n && (e = n), this._d = new Date(e.getTime()), this._d.setHours(0, 0, 0, 0), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString()), typeof this._o.onSelect == "function" && this._o.onSelect.call(this, this.getDate())
        }
        , gotoDate: function (e) {
            if (!p(e)) return;
            this._y = e.getFullYear(), this._m = e.getMonth(), this.draw()
        }
        , gotoToday: function () {
            this.gotoDate(new Date)
        }
        , gotoMonth: function (e) {
            isNaN(e = parseInt(e, 10)) || (this._m = e < 0 ? 0 : e > 11 ? 11 : e, this.draw())
        }
        , nextMonth: function () {
            ++this._m > 11 && (this._m = 0, this._y++), this.draw()
        }
        , prevMonth: function () {
            --this._m < 0 && (this._m = 11, this._y--), this.draw()
        }
        , gotoYear: function (e) {
            isNaN(e) || (this._y = parseInt(e, 10), this.draw())
        }
        , draw: function (e) {
            if (!this._v && !e) return;
            var t = this._o
                , n = t.minYear
                , r = t.maxYear
                , i = t.minMonth
                , o = t.maxMonth;
            this._y <= n && (this._y = n, !isNaN(i) && this._m < i && (this._m = i)), this._y >= r && (this._y = r, !isNaN(o) && this._m > o && (this._m = o)), this.el.innerHTML = T(this) + this.render(this._y, this._m);
            if (t.bound) {
                var u = t.field
                    , a = u.offsetLeft
                    , f = u.offsetTop + u.offsetHeight;
                while (u = u.offsetParent) a += u.offsetLeft, f += u.offsetTop;
                this.el.style.cssText = "position:absolute;left:" + a + "px;top:" + f + "px;", s(function () {
                    t.field.focus()
                }, 1)
            }
        }
        , render: function (e, t) {
            var n = this._o
                , r = new Date
                , i = v(e, t)
                , s = (new Date(e, t, 1)).getDay()
                , o = []
                , u = [];
            r.setHours(0, 0, 0, 0), n.firstDay > 0 && (s -= n.firstDay, s < 0 && (s += 7));
            var a = i + s
                , f = a;
            while (f > 7) f -= 7;
            a += 7 - f;
            for (var l = 0, c = 0; l < a; l++) {
                var h = new Date(e, t, 1 + (l - s))
                    , d = n.minDate && h < n.minDate || n.maxDate && h > n.maxDate
                    , g = p(this._d) ? m(h, this._d) : !1
                    , y = m(h, r)
                    , b = l < s || l >= i + s;
                u.push(w(1 + (l - s), g, y, d, b)), ++c === 7 && (o.push(E(u, n.isRTL)), u = [], c = 0)
            }
            return N(n, o)
        }
        , isVisible: function () {
            return this._v
        }
        , show: function () {
            this._v || (this._o.bound && o(t, "click", this._onClick), c(this.el, "is-hidden"), this._v = !0, this.draw(), typeof this._o.onOpen == "function" && this._o.onOpen.call(this))
        }
        , hide: function () {
            if (this._v === n || this._v) this._o.bound && u(t, "click", this._onClick), this.el.style.cssText = "", l(this.el, "is-hidden"), this._v = !1, typeof this._o.onClose == "function" && this._o.onClose.call(this)
        }
        , destroy: function () {
            this.hide(), u(this.el, "mousedown", this._onMouseDown, !0), u(this.el, "change", this._onChange), this._o.field && (u(this._o.field, "change", this._onInputChange), this._o.bound && (u(this._o.field, "click", this._onInputClick), u(this._o.field, "focus", this._onInputFocus), u(this._o.field, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }
    }
})(window, window.document);

var picker = new Pikaday({
    field: document.getElementById('datepicker')
    , firstDay: 1
    , minDate: new Date('2000-01-01')
    , maxDate: new Date('2020-12-31')
    , yearRange: [2000, 2020]
});