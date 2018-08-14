(function ymapsInit(e) {
    var n = this,
        t = {
            ns: {},
            env: e,
            project: {
                preload: ["package.system"],
                combineBatchSize: 500
            }
        },
        r = .01;
    t.performance = function (e) {
        function n() {
            y = y || setTimeout(t, g)
        }

        function t() {
            clearTimeout(y), y = null;
            var e = r();
            if (e) {
                var t = i + "/vars=" + e + "/*";
                if (!s || !navigator.sendBeacon(o, t)) {
                    var a = new Image,
                        c = (new Date).getTime() + Math.round(100 * Math.random());
                    a.src = o + "/rnd=" + c + t
                }
                n()
            }
        }

        function r() {
            var e = [],
                n = 0;
            for (var t in f)
                if (f.hasOwnProperty(t) && f[t].length && (e.push(t + "=" + f[t].shift()), ++n >= m)) break;
            for (var t in l)
                if (l.hasOwnProperty(t) && l[t].length && (e.push(t + "=" + l[t].shift()), ++n >= m)) break;
            return e.join(",")
        }
        var o, i, s, a, c = {
                exports: {}
            },
            u = (c.exports, window.performance || {
                now: function () {
                    return Date.now()
                }
            }),
            l = {},
            f = {},
            d = u.getEntriesByType ? function (e) {
                return u.getEntriesByType("resource").filter(function (n) {
                    return n.name === e
                })[0]
            } : function () {},
            p = {
                initjs: "i",
                mapjs: "m",
                combine_s: "cs",
                combine_m: "cm",
                combine_l: "cl"
            },
            v = {
                eval: "e",
                duration: "d",
                cached: "c",
                encodedSize: "esz",
                decodedSize: "dsz",
                responseDuration: "res",
                requestDuration: "req"
            },
            h = {
                statistics: {
                    combine: {
                        total: 0,
                        size: 0,
                        modules: 0
                    }
                },
                initTimings: {},
                now: function () {
                    return u.now()
                },
                getResourceTimings: function (e) {
                    return d(e) || {}
                },
                init: function (e) {
                    o = e.url, i = "/pid=443/cid=73188/dtype=stred" + e.data, s = Boolean(e.useSendBeacon && navigator.sendBeacon), a = e.enable, h.initTimings = h.getResourceTimings(e.initUrl), h.saveResourceTimings("initjs", h.initTimings, {
                        size: !1,
                        cached: !1
                    })
                },
                saveMeasure: function (e, t) {
                    if (a) {
                        var r = /^@/.test(e);
                        if (r) {
                            var o = e.replace(/^@/, "").split(".");
                            e = (p[o[0]] || o[0]) + "." + (v[o[1]] || o[1])
                        }
                        if (t = Math.round(t), !isNaN(t)) {
                            var i = r ? l : f;
                            i[e] = i[e] || [], i[e].push(t), n()
                        }
                    }
                },
                startMeasure: function (e, n) {
                    n = "undefined" == typeof n ? u.now() : n;
                    var t = !1;
                    return {
                        finish: function (r) {
                            t || (r = "undefined" == typeof r ? u.now() : r, h.saveMeasure(e, r - n), t = !0)
                        }
                    }
                },
                saveResourceTimings: function (e, n, t) {
                    var r = "object" == typeof n ? n : d(n);
                    if (r && (t = t || {}, e = e.replace(/^@?/, "@"), this.saveMeasure(e + ".duration", r.duration), r.responseStart)) {
                        var o = 0 === r.transferSize ? 1 : 0;
                        this.saveMeasure(e + ".responseDuration", r.responseEnd - r.responseStart), this.saveMeasure(e + ".requestDuration", r.responseStart - r.requestStart), t.cached !== !1 && this.saveMeasure(e + ".cached", o), t.size === !1 || o || (this.saveMeasure(e + ".encodedSize", r.encodedBodySize / 1024), this.saveMeasure(e + ".decodedSize", r.decodedBodySize / 1024))
                    }
                }
            },
            m = 40,
            g = 5e3,
            y = null;
        return window.addEventListener("beforeunload", function () {
            h.saveMeasure("combine.total", h.statistics.combine.total), h.saveMeasure("combine.modules", h.statistics.combine.modules), h.saveMeasure("combine.size", h.statistics.combine.size / 1024), t()
        }), c.exports = h, c.exports
    }();
    var o = t.performance.startMeasure("@initjs.eval");
    t.count = function (e) {
        function n() {
            r.push(arguments)
        }
        var t = {
                exports: {}
            },
            r = (t.exports, []),
            o = null,
            i = function () {
                (o || n).apply(null, arguments)
            };
        return i.provideImplementation = function (e) {
            if (o) throw new Error("ym.count: implementation was already provided.");
            o = e(r)
        }, t.exports = i, t.exports
    }(), t.vow = t.ns.vow = function (e) {
        var t, r = {
            exports: {}
        };
        r.exports;
        return function (e) {
            var n, o = function () {
                    var n = [],
                        t = function (e) {
                            return n.push(e), 1 === n.length
                        },
                        r = function () {
                            var e = n,
                                t = 0,
                                r = n.length;
                            for (n = []; t < r;) e[t++]()
                        };
                    if ("function" == typeof setImmediate) return function (e) {
                        t(e) && setImmediate(r)
                    };
                    if ("object" == typeof process && process.nextTick) return function (e) {
                        t(e) && process.nextTick(r)
                    };
                    var o = e.MutationObserver || e.WebKitMutationObserver;
                    if (o) {
                        var i = 1,
                            s = document.createTextNode("");
                        return new o(r).observe(s, {
                                characterData: !0
                            }),
                            function (e) {
                                t(e) && (s.data = i *= -1)
                            }
                    }
                    if (e.postMessage) {
                        var a = !0;
                        if (e.attachEvent) {
                            var c = function () {
                                a = !1
                            };
                            e.attachEvent("onmessage", c), e.postMessage("__checkAsync", "*"), e.detachEvent("onmessage", c)
                        }
                        if (a) {
                            var u = "__promise" + Math.random() + "_" + new Date,
                                l = function (e) {
                                    e.data === u && (e.stopPropagation && e.stopPropagation(), r())
                                };
                            return e.addEventListener ? e.addEventListener("message", l, !0) : e.attachEvent("onmessage", l),
                                function (n) {
                                    t(n) && e.postMessage(u, "*")
                                }
                        }
                    }
                    var f = e.document;
                    if ("onreadystatechange" in f.createElement("script")) {
                        var d = function () {
                            var e = f.createElement("script");
                            e.onreadystatechange = function () {
                                e.parentNode.removeChild(e), e = e.onreadystatechange = null, r()
                            }, (f.documentElement || f.body).appendChild(e)
                        };
                        return function (e) {
                            t(e) && d()
                        }
                    }
                    return function (e) {
                        t(e) && setTimeout(r, 0)
                    }
                }(),
                i = function (e) {
                    o(function () {
                        throw e
                    })
                },
                s = function (e) {
                    return "function" == typeof e
                },
                a = function (e) {
                    return null !== e && "object" == typeof e
                },
                c = Object.prototype.toString,
                u = Array.isArray || function (e) {
                    return "[object Array]" === c.call(e)
                },
                l = function (e) {
                    for (var n = [], t = 0, r = e.length; t < r;) n.push(t++);
                    return n
                },
                f = Object.keys || function (e) {
                    var n = [];
                    for (var t in e) e.hasOwnProperty(t) && n.push(t);
                    return n
                },
                d = function (e) {
                    var n = function (n) {
                        this.name = e, this.message = n
                    };
                    return n.prototype = new Error, n
                },
                p = function (e, n) {
                    return function (t) {
                        e.call(this, t, n)
                    }
                },
                v = function () {
                    this._promise = new m
                };
            v.prototype = {
                promise: function () {
                    return this._promise
                },
                resolve: function (e) {
                    this._promise.isResolved() || this._promise._resolve(e)
                },
                reject: function (e) {
                    this._promise.isResolved() || (_.isPromise(e) ? (e = e.then(function (e) {
                        var n = _.defer();
                        return n.reject(e), n.promise()
                    }), this._promise._resolve(e)) : this._promise._reject(e))
                },
                notify: function (e) {
                    this._promise.isResolved() || this._promise._notify(e)
                }
            };
            var h = {
                    PENDING: 0,
                    RESOLVED: 1,
                    FULFILLED: 2,
                    REJECTED: 3
                },
                m = function (e) {
                    if (this._value = n, this._status = h.PENDING, this._fulfilledCallbacks = [], this._rejectedCallbacks = [], this._progressCallbacks = [], e) {
                        var t = this,
                            r = e.length;
                        e(function (e) {
                            t.isResolved() || t._resolve(e)
                        }, r > 1 ? function (e) {
                            t.isResolved() || t._reject(e)
                        } : n, r > 2 ? function (e) {
                            t.isResolved() || t._notify(e)
                        } : n)
                    }
                };
            m.prototype = {
                valueOf: function () {
                    return this._value
                },
                isResolved: function () {
                    return this._status !== h.PENDING
                },
                isFulfilled: function () {
                    return this._status === h.FULFILLED
                },
                isRejected: function () {
                    return this._status === h.REJECTED
                },
                then: function (e, n, t, r) {
                    var o = new v;
                    return this._addCallbacks(o, e, n, t, r), o.promise()
                },
                "catch": function (e, t) {
                    return this.then(n, e, t)
                },
                fail: function (e, t) {
                    return this.then(n, e, t)
                },
                always: function (e, n) {
                    var t = this,
                        r = function () {
                            return e.call(this, t)
                        };
                    return this.then(r, r, n)
                },
                progress: function (e, t) {
                    return this.then(n, n, e, t)
                },
                spread: function (e, n, t) {
                    return this.then(function (n) {
                        return e.apply(this, n)
                    }, n, t)
                },
                done: function (e, n, t, r) {
                    this.then(e, n, t, r).fail(i)
                },
                delay: function (e) {
                    var n, t = this.then(function (t) {
                        var r = new v;
                        return n = setTimeout(function () {
                            r.resolve(t)
                        }, e), r.promise()
                    });
                    return t.always(function () {
                        clearTimeout(n)
                    }), t
                },
                timeout: function (e) {
                    var n = new v,
                        t = setTimeout(function () {
                            n.reject(new _.TimedOutError("timed out"))
                        }, e);
                    return this.then(function (e) {
                        n.resolve(e)
                    }, function (e) {
                        n.reject(e)
                    }), n.promise().always(function () {
                        clearTimeout(t)
                    }), n.promise()
                },
                _vow: !0,
                _resolve: function (e) {
                    if (!(this._status > h.RESOLVED)) {
                        if (e === this) return void this._reject(TypeError("Can't resolve promise with itself"));
                        if (this._status = h.RESOLVED, e && e._vow) return void(e.isFulfilled() ? this._fulfill(e.valueOf()) : e.isRejected() ? this._reject(e.valueOf()) : e.then(this._fulfill, this._reject, this._notify, this));
                        if (a(e) || s(e)) {
                            var n;
                            try {
                                n = e.then
                            } catch (t) {
                                return void this._reject(t)
                            }
                            if (s(n)) {
                                var r = this,
                                    o = !1;
                                try {
                                    n.call(e, function (e) {
                                        o || (o = !0, r._resolve(e))
                                    }, function (e) {
                                        o || (o = !0, r._reject(e))
                                    }, function (e) {
                                        r._notify(e)
                                    })
                                } catch (t) {
                                    o || this._reject(t)
                                }
                                return
                            }
                        }
                        this._fulfill(e)
                    }
                },
                _fulfill: function (e) {
                    this._status > h.RESOLVED || (this._status = h.FULFILLED, this._value = e, this._callCallbacks(this._fulfilledCallbacks, e), this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = n)
                },
                _reject: function (e) {
                    this._status > h.RESOLVED || (this._status = h.REJECTED, this._value = e, this._callCallbacks(this._rejectedCallbacks, e), this._fulfilledCallbacks = this._rejectedCallbacks = this._progressCallbacks = n)
                },
                _notify: function (e) {
                    this._callCallbacks(this._progressCallbacks, e)
                },
                _addCallbacks: function (e, t, r, o, i) {
                    r && !s(r) ? (i = r, r = n) : o && !s(o) && (i = o, o = n);
                    var a;
                    this.isRejected() || (a = {
                        defer: e,
                        fn: s(t) ? t : n,
                        ctx: i
                    }, this.isFulfilled() ? this._callCallbacks([a], this._value) : this._fulfilledCallbacks.push(a)), this.isFulfilled() || (a = {
                        defer: e,
                        fn: r,
                        ctx: i
                    }, this.isRejected() ? this._callCallbacks([a], this._value) : this._rejectedCallbacks.push(a)), this._status <= h.RESOLVED && this._progressCallbacks.push({
                        defer: e,
                        fn: o,
                        ctx: i
                    })
                },
                _callCallbacks: function (e, n) {
                    var t = e.length;
                    if (t) {
                        var r = this.isResolved(),
                            i = this.isFulfilled(),
                            s = this.isRejected();
                        o(function () {
                            for (var o, a, c, u = 0; u < t;)
                                if (o = e[u++], a = o.defer, c = o.fn) {
                                    var l, f = o.ctx;
                                    try {
                                        l = f ? c.call(f, n) : c(n)
                                    } catch (d) {
                                        a.reject(d);
                                        continue
                                    }
                                    r ? a.resolve(l) : a.notify(l)
                                } else i ? a.resolve(n) : s ? a.reject(n) : a.notify(n)
                        })
                    }
                }
            };
            var g = {
                cast: function (e) {
                    return _.cast(e)
                },
                all: function (e) {
                    return _.all(e)
                },
                race: function (e) {
                    return _.anyResolved(e)
                },
                resolve: function (e) {
                    return _.resolve(e)
                },
                reject: function (e) {
                    return _.reject(e)
                }
            };
            for (var y in g) g.hasOwnProperty(y) && (m[y] = g[y]);
            var _ = {
                Deferred: v,
                Promise: m,
                defer: function () {
                    return new v
                },
                when: function (e, n, t, r, o) {
                    return _.cast(e).then(n, t, r, o)
                },
                fail: function (e, t, r) {
                    return _.when(e, n, t, r)
                },
                always: function (e, n, t) {
                    return _.when(e).always(n, t)
                },
                progress: function (e, n, t) {
                    return _.when(e).progress(n, t)
                },
                spread: function (e, n, t, r) {
                    return _.when(e).spread(n, t, r)
                },
                done: function (e, n, t, r, o) {
                    _.when(e).done(n, t, r, o)
                },
                isPromise: function (e) {
                    return a(e) && s(e.then)
                },
                cast: function (e) {
                    return e && e._vow ? e : _.resolve(e)
                },
                valueOf: function (e) {
                    return e && s(e.valueOf) ? e.valueOf() : e
                },
                isFulfilled: function (e) {
                    return !e || !s(e.isFulfilled) || e.isFulfilled()
                },
                isRejected: function (e) {
                    return !(!e || !s(e.isRejected)) && e.isRejected()
                },
                isResolved: function (e) {
                    return !e || !s(e.isResolved) || e.isResolved()
                },
                resolve: function (e) {
                    var n = _.defer();
                    return n.resolve(e), n.promise()
                },
                fulfill: function (e) {
                    var n = _.defer(),
                        t = n.promise();
                    return n.resolve(e), t.isFulfilled() ? t : t.then(null, function (e) {
                        return e
                    })
                },
                reject: function (e) {
                    var n = _.defer();
                    return n.reject(e), n.promise()
                },
                invoke: function (n, t) {
                    var r, o = Math.max(arguments.length - 1, 0);
                    if (o) {
                        r = Array(o);
                        for (var i = 0; i < o;) r[i++] = arguments[i]
                    }
                    try {
                        return _.resolve(r ? n.apply(e, r) : n.call(e))
                    } catch (s) {
                        return _.reject(s)
                    }
                },
                all: function (e) {
                    var n = new v,
                        t = u(e),
                        r = t ? l(e) : f(e),
                        o = r.length,
                        i = t ? [] : {};
                    if (!o) return n.resolve(i), n.promise();
                    var s = o;
                    return _._forEach(e, function (e, t) {
                        i[r[t]] = e, --s || n.resolve(i)
                    }, n.reject, n.notify, n, r), n.promise()
                },
                allResolved: function (e) {
                    var n = new v,
                        t = u(e),
                        r = t ? l(e) : f(e),
                        o = r.length,
                        i = t ? [] : {};
                    if (!o) return n.resolve(i), n.promise();
                    var s = function () {
                        --o || n.resolve(e)
                    };
                    return _._forEach(e, s, s, n.notify, n, r), n.promise()
                },
                allPatiently: function (e) {
                    return _.allResolved(e).then(function () {
                        var n, t, r, o, i = u(e),
                            s = i ? l(e) : f(e),
                            a = s.length,
                            c = 0;
                        if (!a) return i ? [] : {};
                        for (; c < a;) r = s[c++], o = e[r], _.isRejected(o) ? (n || (n = i ? [] : {}), i ? n.push(o.valueOf()) : n[r] = o.valueOf()) : n || ((t || (t = i ? [] : {}))[r] = _.valueOf(o));
                        if (n) throw n;
                        return t
                    })
                },
                any: function (e) {
                    var n = new v,
                        t = e.length;
                    if (!t) return n.reject(Error()), n.promise();
                    var r, o = 0;
                    return _._forEach(e, n.resolve, function (e) {
                        o || (r = e), ++o === t && n.reject(r)
                    }, n.notify, n), n.promise()
                },
                anyResolved: function (e) {
                    var n = new v,
                        t = e.length;
                    return t ? (_._forEach(e, n.resolve, n.reject, n.notify, n), n.promise()) : (n.reject(Error()), n.promise())
                },
                delay: function (e, n) {
                    return _.resolve(e).delay(n)
                },
                timeout: function (e, n) {
                    return _.resolve(e).timeout(n)
                },
                _forEach: function (e, n, t, r, o, i) {
                    for (var s = i ? i.length : e.length, a = 0; a < s;) _.when(e[i ? i[a] : a], p(n, a), t, r, o), ++a
                },
                TimedOutError: d("TimedOut")
            };
            _.__nextTick__ = o;
            var E = !0;
            "object" == typeof r && "object" == typeof r.exports && (r.exports = _, E = !1), "object" == typeof modules && s(modules.define) && (modules.define("vow", function (e) {
                e(_)
            }), E = !1), "function" == typeof t && (t(function (e, n, t) {
                t.exports = _
            }), E = !1), E && (e.vow = _)
        }("undefined" != typeof window ? window : n), r.exports
    }(), t.utils = function (e) {
        function n(n) {
            return e[n]
        }
        var t = {
                exports: {}
            },
            r = t.exports,
            o = n("vow"),
            i = Object.prototype.hasOwnProperty;
        return r.nextTick = o.__nextTick__, o.__nextTick__ = void 0, r.isArray = Array.isArray ? Array.isArray : function (e) {
            return "[object Array]" === Object.prototype.call(e)
        }, r.extend = Object.assign ? Object.assign : function (e) {
            for (var n = 1, t = arguments.length; n < t; n++) {
                var r = arguments[n];
                if (null != r)
                    for (var o in r) i.call(r, o) && (e[o] = r[o])
            }
            return e
        }, r.mergeSets = function (e, n) {
            n.forEach(function (n) {
                e.add(n)
            })
        }, r.convertSetToArray = function (e) {
            var n = [];
            return e.forEach(function (e) {
                n.push(e)
            }), n
        }, t.exports
    }({
        vow: t.vow
    });
    var i = function (e) {
            function n(n) {
                return e[n]
            }
            var t = {
                    exports: {}
                },
                r = (t.exports, n("vow"));
            return t.exports = function (e, n) {
                var t = document.createElement("script"),
                    o = r.defer();
                return window[n] = function (e) {
                    delete window[n], t.parentElement.removeChild(t), o.resolve(e)
                }, t.src = e, document.head.appendChild(t), o.promise()
            }, t.exports
        }({
            vow: t.vow
        }),
        s = "__jsonp_" + (t.env.namespace || "ymaps" + Date.now()),
        a = function (e) {
            function n(n) {
                return e[n]
            }

            function t(e) {
                this._config = e, this._sandbox = null, this._definitionsByName = {}, this._definitionsByStorage = {}, this._definitionsByAlias = {}, this._queuedForFetching = {}, this._remoteLoadingAllowed = f.defer(), this._modulesMapLoaded = this._remoteLoadingAllowed.promise().then(this._config.fetchMap).spread(function (e, n) {
                    this._processLoadedMap(e), n()
                }, this);
                var n = this;
                this.providePackage = function (e) {
                    var t = n._findDefinition(this.name),
                        r = Array.prototype.slice.call(arguments, 1),
                        o = n._require(["system.mergeImports"]).spread(function (e) {
                            return e.joinImports(t.name, {}, t.depends, r)
                        });
                    e.async(o)
                }
            }

            function r(e, n, t, r, o, i, s, a, c) {
                this.state = e, this.alias = null, this.name = n, this.storage = t, this.key = r, this.depends = o, this.dynamicDepends = a, this.declaration = i, this.context = s, this.exports = e === m.DEFINED ? c : void 0, this.resolvingPromise = void 0, this.fetchingDeferred = void 0
            }

            function o(e, n) {
                if (!e.dynamicDepends) return h;
                var t = [];
                for (var r in e.dynamicDepends)
                    if (e.dynamicDepends.hasOwnProperty(r))
                        for (var o = 0, i = n.length; o < i; o++) {
                            var a = n[o];
                            if (void 0 !== a) {
                                var c = e.dynamicDepends[r](a);
                                s(c) && t.push(c)
                            }
                        }
                return t
            }

            function i(e, n, t) {
                return p.call(e.dynamicDepends, n) ? e.dynamicDepends[n].call(null, t) : v
            }

            function s(e) {
                return "string" == typeof e || c(e)
            }

            function a(e) {
                return "string" == typeof e ? e : e.key + "@" + e.storage
            }

            function c(e) {
                return null != e && "object" == typeof e && "string" == typeof e.key && "string" == typeof e.storage
            }

            function u(e) {
                var n = d.isArray(e);
                return "object" == typeof e && !n && p.call(e, "modules") ? {
                    modules: d.isArray(e.modules) ? e.modules : [e.modules],
                    data: e.data
                } : n ? {
                    modules: e
                } : {
                    modules: [e]
                }
            }
            var l = {
                    exports: {}
                },
                f = (l.exports, n("vow")),
                d = n("./utils"),
                p = Object.prototype.hasOwnProperty,
                v = {},
                h = Object.freeze([]),
                m = {
                    MENTIONED: 1,
                    QUEUED: 2,
                    FETCHING: 3,
                    DECLARED: 4,
                    RESOLVING: 5,
                    ERROR: 6,
                    DEFINED: 7
                };
            return l.exports = t, t.prototype.allowRemoteLoading = function () {
                this._remoteLoadingAllowed.resolve()
            }, t.prototype.isDefined = function (e) {
                return Boolean(this._findDefinition(e))
            }, t.prototype.define = function (e, n, t, o) {
                var i, s, a, c;
                if ("object" == typeof e) {
                    var u = e;
                    e = u.name, s = u.storage, i = u.key, n = u.depends, t = u.declaration, o = u.context, a = u.dynamicDepends, c = u.exports
                } else 2 === arguments.length && (t = n, n = null);
                var l = new r(m.DECLARED, e, s, i, n, t, o, a, c);
                this._define(l)
            }, t.prototype.defineSync = function (e) {
                var n = new r(m.DEFINED, e.name, e.storage, e.key, null, null, null, null, e.module);
                this._define(n)
            }, t.prototype._define = function (e) {
                var n = this._definitionsByName[e.name];
                if (n) {
                    if (n.state !== m.FETCHING || e.state !== m.DECLARED) {
                        var t = new Error("ymaps.modules: redefinition of " + e.name);
                        throw console.error(t), t
                    }
                    return n.state = m.DECLARED, n.declaration = e.declaration, void(n.context = e.context)
                }
                "function" == typeof e.depends && (e.depends = e.depends.call({
                    name: e.name
                }, this._config.dependenciesContext)), e.depends = e.depends || h, this._definitionsByName[e.name] = e, this._saveDefinitionToStorage(e)
            }, t.prototype._resolve = function (e, n) {
                if (!e.dynamicDepends) {
                    if (e.state === m.DEFINED) return f.resolve(e.exports);
                    if (e.state === m.ERROR) return f.reject(e.exports)
                }
                e.state < m.RESOLVING && !e.resolvingPromise && (e.resolvingPromise = this._resolveCore(e, n).always(function (n) {
                    return e.resolvingPromise = void 0, n
                }));
                var t = o(e, [n]);
                return f.all([e.resolvingPromise, this._require(t, n)]).then(function () {
                    return e.state === m.DEFINED ? f.resolve(e.exports) : f.reject(e.exports)
                })
            }, t.prototype._resolveCore = function (e, n) {
                return this._fetchModule(e, n).then(function () {
                    return e.state = m.RESOLVING, this._require(e.depends, n)
                }, this).then(function (n) {
                    function t(n, t) {
                        e.state === m.RESOLVING && (e.state = t ? m.ERROR : m.DEFINED, e.exports = t || n), o && o.resolve()
                    }
                    var r, o;
                    t.async = function (n) {
                        e.state === m.RESOLVING && (r = n.then(function (e) {
                            t(e)
                        }, function (e) {
                            t(void 0, e)
                        }))
                    }, t.provide = t, t.provideAsync = t.async, t.dynamicDepends = e.dynamicDepends ? {
                        getValue: function (n, t) {
                            var r = i(e, n, t);
                            return r === v ? f.reject(new Error("ymaps.modules: dynamic dependency `" + n + "` is not declared.")) : s(r) ? this._require([r], t) : f.resolve([r])
                        }.bind(this),
                        getValueSync: function (n, t) {
                            var r = i(e, n, t);
                            if (!s(r)) return r;
                            var o = this._findDefinition(r);
                            return o ? this._requireSingleSync(o, t) : void 0
                        }.bind(this)
                    } : null;
                    var a = e.context || {
                        name: e.name
                    };
                    try {
                        e.declaration.apply(a, [t].concat(n))
                    } catch (c) {
                        return e.state = m.ERROR, void(e.exports = c)
                    }
                    return r ? r : e.state !== m.DEFINED && e.state !== m.ERROR ? (console.warn("ymaps.modules: asynchronious provide is deprecated and will be removed. Module `" + e.name + "`."), o = f.defer(), o.promise()) : void 0
                }, this)
            }, t.prototype.require = function (e, n, t, r) {
                var o = "object" == typeof e && !d.isArray(e),
                    i = 1 === arguments.length;
                o && (n = e.successCallback, t = e.errorCallback, r = e.context, i = !n && !t), e = u(e);
                var s = this._require(e.modules, e.data);
                return i ? s : void s.spread(n, t, r)
            }, t.prototype.requireSync = function (e) {
                if (e = u(e), 1 !== e.modules.length) throw new Error("ymaps.modules: only one module can be required synchroniously.");
                var n = this._findDefinition(e.modules[0]);
                return n && this._requireSingleSync(n, e.data)
            }, t.prototype._requireSingleSync = function (e, n) {
                for (var t = o(e, [n]), r = 0, i = t.length; r < i; r++) {
                    var s = this._findDefinition(t[r]);
                    if (!s || !this._requireSingleSync(s, n)) return
                }
                return e.state === m.DEFINED ? e.exports : void 0
            }, t.prototype._require = function (e, n) {
                var t = e.map(function (e) {
                    return this._requireSingle(e, n)
                }, this);
                return f.all(t)
            }, t.prototype._requireSingle = function (e, n) {
                var t = this._findDefinition(e);
                return t ? this._resolve(t, n) : this._modulesMapLoaded.then(function () {
                    var t = this._findDefinition(e);
                    return t ? this._resolve(t, n) : f.reject(new Error("ymaps.modules: module `" + a(e) + "` is not defined."))
                }, this)
            }, t.prototype._findDefinition = function (e) {
                if ("undefined" != typeof e) return "string" == typeof e ? this._definitionsByName[e] : this._definitionsByStorage[e.storage] && this._definitionsByStorage[e.storage][e.key]
            }, t.prototype._saveDefinitionToStorage = function (e, n) {
                if (e.key && e.storage) {
                    n = n || {
                        key: e.key,
                        storage: e.storage
                    };
                    for (var t = d.isArray(n.key) ? n.key : [n.key], r = 0, o = t.length; r < o; r++) this._definitionsByStorage[n.storage] = this._definitionsByStorage[n.storage] || {}, this._definitionsByStorage[n.storage][t[r]] = e
                }
            }, t.prototype._fetchModule = function (e, n) {
                return e.state >= m.DECLARED ? f.resolve() : (e.fetchingDeferred = e.fetchingDeferred || f.defer(), e.state === m.MENTIONED && (e.state = m.QUEUED, this._queuedForFetching[e.name] = {
                    definition: e,
                    dataList: []
                }, this._enqueueCombine()), e.state !== m.FETCHING && this._queuedForFetching[e.name].dataList.push(n), e.fetchingDeferred.promise())
            }, t.prototype._enqueueCombine = function () {
                this._combineEnqueued || (this._combineEnqueued = !0, this._modulesMapLoaded.then(function () {
                    this._combineEnqueued = !1;
                    var e = this._queuedForFetching;
                    this._queuedForFetching = {};
                    var n = new Set;
                    for (var t in e)
                        if (e.hasOwnProperty(t)) {
                            var r = e[t],
                                o = this._getAliasesToFetchFor(t, r.dataList);
                            d.mergeSets(n, o)
                        }
                    for (var i = d.convertSetToArray(n), s = 0, a = i.length; s < a; s += this._config.combineBatchSize) this._fetchCombine(i.slice(s, s + this._config.combineBatchSize))
                }, this))
            }, t.prototype._fetchCombine = function (e) {
                this._config.fetchCombine(e).spread(function (e, n) {
                    this._sandbox = this._sandbox || this._config.createSandbox();
                    for (var t = 0, r = e.length; t < r; t++) {
                        var o = e[t][0],
                            i = this._definitionsByAlias[o];
                        if (e[t][1].call(null, this._sandbox), i.state === m.DECLARED) i.fetchingDeferred && i.fetchingDeferred.resolve();
                        else {
                            i.state = m.ERROR;
                            var s = new Error("[internal] ymaps.modules: module `" + i.name + "` was not defined after dynamic module loading");
                            i.exports = s, i.fetchingDeferred && i.fetchingDeferred.reject(s)
                        }
                        i.fetchingDeferred = void 0
                    }
                    n()
                }, this)["catch"](function (n) {
                    for (var t = 0, r = e.length; t < r; t++) {
                        var o = this._definitionsByAlias[e[t]],
                            n = new Error("[internal] ymaps.modules: dynamic module loading failed");
                        o.state = m.ERROR, o.exports = n, o.fetchingDeferred && o.fetchingDeferred.reject(n), o.fetchingDeferred = void 0
                    }
                }, this)
            }, t.prototype._getAliasesToFetchFor = function (e, n) {
                for (var t = [e], r = new Set; t.length;) {
                    var i = t.shift(),
                        s = this._findDefinition(i);
                    if (!s) return void console.error("ymaps.modules: trying to fetch unknown module `" + a(i) + "` while loading `" + a(e) + "`.");
                    s.state <= m.QUEUED && (s.state = m.FETCHING, r.add(s.alias), Array.prototype.push.apply(t, s.depends)), Array.prototype.push.apply(t, o(s, n))
                }
                return r
            }, t.prototype._processLoadedMap = function (e) {
                function n(e) {
                    if ("function" == typeof e) return e;
                    for (var n = [], r = 0, o = e.length; r < o; r += 2) {
                        var i = e.substr(r, 2);
                        n.push(t[i])
                    }
                    return n
                }
                for (var t = {}, o = 0, i = e.length; o < i; o++) {
                    var s = e[o][0],
                        a = e[o][1];
                    t[a] = s
                }
                for (var o = 0, i = e.length; o < i; o++) {
                    var s = e[o][0],
                        a = e[o][1],
                        c = this._definitionsByName[s];
                    if (!c) {
                        var u = n(e[o][2]),
                            l = e[o][3],
                            f = e[o][4],
                            d = e[o][5];
                        c = new r(m.MENTIONED, s, f, l, u, null, null, d), this._define(c)
                    }
                    c.alias = a, this._definitionsByAlias[a] = c
                }
            }, l.exports
        }({
            vow: t.vow,
            "./utils": t.utils
        }),
        c = t.env.server.url + "/map.js?callback={CALLBACK}&mode=" + t.env.server.params.mode,
        u = t.env.server.url + "/combine.js?callback_prefix={CALLBACK_PREFIX}&mode=" + t.env.server.params.mode,
        l = t.env.server.url + "/" + t.env.server.path.replace(/\/$/, "") + "/images/";
    if (t.modules = new a({
            dependenciesContext: t,
            combineBatchSize: t.project.combineBatchSize,
            fetchMap: function () {
                var e = s + "_map",
                    n = c.replace("{CALLBACK}", e);
                return i(n, e).then(function (e) {
                    var r = t.performance.getResourceTimings(n);
                    t.performance.saveResourceTimings("mapjs", r);
                    var o = t.performance.startMeasure("@mapjs.eval");
                    return [e, o.finish.bind(o)]
                })
            },
            fetchCombine: function (e) {
                t.performance.statistics.combine.total++, t.performance.statistics.combine.modules += e.length;
                var n = e.length < 100 ? "s" : e.length < 300 ? "m" : "l",
                    r = e.join(""),
                    o = s + "_combine",
                    a = u.replace("{CALLBACK_PREFIX}", o) + "&load=" + r,
                    c = o + "_" + r;
                return i(a, c).then(function (e) {
                    var r = t.performance.getResourceTimings(a);
                    t.performance.saveResourceTimings("combine_" + n, r), t.performance.statistics.combine.size += r.encodedBodySize;
                    var o = t.performance.startMeasure("@combine_" + n + ".eval");
                    return [e, o.finish.bind(o)]
                })
            },
            createSandbox: function () {
                var e = Object.create(t.modules);
                return e.importImages = function (e) {
                    return {
                        get: function (n) {
                            return l + e[n].src
                        }
                    }
                }, t.utils.extend({}, t, {
                    modules: e
                })
            }
        }), t.modules.define("system.supports.csp", [], function (e) {
            var n = t.env ? t.env.browser : null;
            e({
                isSupported: "undefined" != typeof Blob && "undefined" != typeof URL,
                isNonceSupported: n && n.name && n.version ? !(n.name.search("Safari") != -1 && parseInt(n.version) < 10) : null
            })
        }), t.modules.define("system.supports.css", [], function (e) {
            function n(e) {
                return "undefined" == typeof d[e] ? d[e] = r(e) : d[e]
            }

            function r(e) {
                return o(e) || o(v + s(e)) || o(p.cssPrefix + s(e))
            }

            function o(e) {
                return "undefined" != typeof i().style[e] ? e : null
            }

            function i() {
                return u || (u = document.createElement("div"))
            }

            function s(e) {
                return e ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            }

            function a(e) {
                var t = n(e);
                return t && t != e && (t = "-" + v + "-" + e), t
            }

            function c(e) {
                return l[e] && n("transitionProperty") ? a(l[e]) : null
            }
            var u, l = {
                    transform: "transform",
                    opacity: "opacity",
                    transitionTimingFunction: "transition-timing-function",
                    userSelect: "user-select",
                    height: "height"
                },
                f = {},
                d = {},
                p = t.env.browser,
                v = p.cssPrefix.toLowerCase();
            e({
                checkProperty: n,
                checkTransitionProperty: function (e) {
                    return "undefined" == typeof f[e] ? f[e] = c(e) : f[e]
                },
                checkTransitionAvailability: c
            })
        }), t.modules.define("system.supports.graphics", [], function (e) {
            function n() {
                if (!window.WebGLRenderingContext) return !1;
                var e = t.env.browser,
                    n = {
                        "Samsung Internet": !0,
                        AndroidBrowser: !0
                    },
                    r = "Webkit" == e.engine && +e.engineVersion < 537;
                return !r && !n[e.name]
            }

            function r() {
                if (!n()) return null;
                var e, t;
                try {
                    var r = document.createElement("canvas");
                    t = r.getContext(e = "webgl", i), t || (t = r.getContext(e = "experimental-webgl", i), t || (e = null))
                } catch (o) {
                    e = null
                }
                return e ? {
                    contextName: e,
                    context: t
                } : null
            }

            function o(e, n) {
                e.width = 226, e.height = 256, n.fillStyle = "#fff", n.fillRect(0, 0, 150, 150), n.globalCompositeOperation = "xor", n.fillStyle = "#f00", n.fillRect(10, 10, 100, 100), n.fillStyle = "#0f0", n.fillRect(50, 50, 100, 100);
                for (var t = n.getImageData(49, 49, 2, 2), r = [], o = 0; o < 16; o++) r.push(t.data[o]);
                return "0x0x0x0x0x0x0x0x0x0x0x0x0x255x0x255" == r.join("x")
            }
            var i = {
                    failIfMajorPerformanceCaveat: !0,
                    antialias: !1
                },
                s = {};
            e({
                hasSvg: function () {
                    return "svg" in s || (s.svg = document.implementation && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")), s.svg
                },
                hasCanvas: function () {
                    if (!("canvas" in s)) {
                        var e = document.createElement("canvas"),
                            n = "getContext" in e ? e.getContext("2d") : null;
                        s.canvas = !!n && o(e, n)
                    }
                    return s.canvas
                },
                hasWebGl: function () {
                    return "webgl" in s || (s.webgl = r()), s.webgl
                },
                redetect: function () {
                    s = {}
                },
                getWebGlContextName: function () {
                    return s.webgl && s.webgl.contextName
                }
            })
        }), t.modules.define("vectorEngine.isSupported", ["system.supports.graphics", "system.browser"], function (e, n, r) {
            function o() {
                var e = !0,
                    o = ["requestAnimationFrame", "Worker", "URL", "Blob", "XMLHttpRequest", "Set", "Map"];
                o.forEach(function (n) {
                    window[n] || (e = !1, i(n))
                });
                var c = n.hasWebGl();
                if (!c || "webgl" !== c.contextName) return i("hasWebGl"), !1;
                var u = c.context;
                if (0 == u.getParameter(u.MAX_VERTEX_TEXTURE_IMAGE_UNITS) && (e = !1, i("MAX_VERTEX_TEXTURE_IMAGE_UNITS")), u.getExtension("OES_vertex_array_object") || (e = !1, i("OES_vertex_array_object")), u.getExtension("OES_standard_derivatives") || (e = !1, i("OES_standard_derivatives")), !s()) {
                    var l = a();
                    e = !1, t.count("error", {
                        path: ["vectorEngine.drawPointsError", r.platform, r.name, l.vendor, l.renderer].join("."),
                        share: 1
                    })
                }
                return e
            }

            function i(e) {
                var n = a();
                t.count("error", {
                    path: ["vectorEngine.reasonsVectorNotSupported", e, r.platform, r.name, n.vendor, n.renderer].join("."),
                    share: .1
                })
            }

            function s() {
                var e = document.createElement("canvas");
                e.width = 1, e.height = 1;
                var n = e.getContext("webgl", {
                        alpha: !1,
                        depth: !1,
                        antialias: !1
                    }),
                    t = n.createShader(n.VERTEX_SHADER);
                n.shaderSource(t, "#version 100\nattribute vec2 p;\nvoid main() {\n    gl_Position = vec4(p,0,1);\n    gl_PointSize = 1.0;\n}"), n.compileShader(t);
                var r = n.createShader(n.FRAGMENT_SHADER);
                n.shaderSource(r, "#version 100\nvoid main() {\n    gl_FragColor = vec4(1, 0, 0, 1);\n}"), n.compileShader(r);
                var o = n.createProgram();
                n.attachShader(o, t), n.attachShader(o, r), n.bindAttribLocation(o, 0, "p"), n.linkProgram(o);
                var i = n.createBuffer();
                n.bindBuffer(n.ARRAY_BUFFER, i), n.bufferData(n.ARRAY_BUFFER, new Float32Array([0, 0]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0), n.clearColor(0, 1, 0, 1), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(o), n.drawArrays(n.POINTS, 0, 1);
                var s = new Uint8Array(4);
                return n.readPixels(0, 0, 1, 1, n.RGBA, n.UNSIGNED_BYTE, s), 255 === s[0]
            }

            function a() {
                var e = {},
                    t = n.hasWebGl();
                if (!t) return e;
                var r = t.context,
                    o = r.getExtension("WEBGL_debug_renderer_info");
                return o && (e.vendor = r.getParameter(o.UNMASKED_VENDOR_WEBGL).replace(/\W/g, "_"), e.renderer = r.getParameter(o.UNMASKED_RENDERER_WEBGL).replace(/\W/g, "_")), e
            }
            var c;
            e(function () {
                return void 0 === c && (c = o()), c
            })
        }), t.modules.define("vectorEngine.preload", ["vectorEngine.isSupported"], function (e, n) {
            n() && t.modules.require("vectorEngine.VectorMapLayer"), e({})
        }), t.modules.define("vectorEngine.VectorMapLayer", ["vow"], function (e, n) {
            if ("ymaps" !== t.env.namespace) return void e(void 0, new Error("Vector supports only `ymaps` namespace."));
            if (null == t.env.vectorVersion) return void e(void 0, new Error("No vector version"));
            var r = n.defer(),
                o = document.createElement("script");
            o.onload = r.resolve.bind(r), o.onerror = r.reject.bind(r), o.src = t.env.hosts.vectorIndex.replace("{{version}}", t.env.vectorVersion), document.head.insertAdjacentElement("afterbegin", o);
            var i = r.promise().then(function () {
                return t.modules.require(["vectorEngine.implementation.VectorMapLayer"])
            }, function () {
                return n.reject(new Error("Failed to load vector engine"))
            }).spread(function (e) {
                return e
            });
            e.async(i)
        }), t.modules.define("system.browser", ["system.supports.graphics"], function (e, n) {
            var r = t.env.browser;
            r.documentMode = document.documentMode, r.isIE = "MSIE" == r.name || "IEMobile" == r.name, r.isEdge = "Edge" == r.engine, r.isChromium = r.base && "chromium" == r.base.toLocaleLowerCase(), r.isSafari = "Safari" == r.name;
            var o = "Edge" == r.engine || "MSIE" == r.name && r.documentMode >= 10 && r.osVersion > 6.1 || "IEMobile" == r.name && r.engineVersion >= 6;
            o ? r.eventMapper = "pointer" : r.eventMapper = "touchMouse", r.androidBrokenBuild = "AndroidBrowser" == r.name && "534.30" == r.engineVersion;
            var i = window.devicePixelRatio || screen.deviceXDPI && screen.deviceXDPI / 96 || 1;
            !n.hasCanvas() || "MSIE" == r.name || "IEMobile" == r.name || "Android" == r.osFamily && r.engine && "gecko" == r.engine.toLocaleLowerCase() || i > 1 && i < 2 ? r.graphicsRenderEngine = "svg" : r.graphicsRenderEngine = "canvas", r.transformTransition = "Android" == r.osFamily || "iOS" == r.osFamily || "MSIE" == r.name && r.documentMode >= 10 || r.base && "chromium" == r.base.toLocaleLowerCase(), r.css3DTransform = "WebKit" == r.engine && !("Android" == r.osFamily && parseFloat(r.osVersion) < 3) || "Gecko" == r.engine && parseInt(r.engineVersion.split(".")[0]) >= 10, r.unsupported = "OperaMini" == r.name, e(r)
        }), t.modules.define("system.logger", [], function (e, n) {
            function r(e, n) {
                var r = "";
                return t.env.debug && (r += "(" + e + "): "), r += n
            }
            var o = "Yandex Maps JS API";
            e({
                assert: function (e, n) {
                    e || t.env.debug && window.console && console.log(r(o, n))
                },
                log: function (e) {
                    t.env.debug && window.console && console.log(r(o, e))
                },
                notice: function (e) {
                    t.env.debug && window.console && console.info(r(o, e))
                },
                warning: function (e) {
                    t.env.debug && window.console && console.warn(r(o, e))
                },
                error: function (e) {
                    window.console && console.error(r(o, e))
                },
                exception: function (e, n) {
                    throw new Error(r(e, n))
                }
            })
        }), t.modules.define("system.nextTick", [], function (e) {
            e(t.utils.nextTick)
        }), t.modules.define("system.mergeImports", [], function (e) {
            function n(e, n, t) {
                if (n) {
                    var r = e;
                    n = n.split(".");
                    for (var o, i = 0, s = n.length - 1; i < s; i++) n[i] && (r = r[o = n[i]] || (r[o] = {}));
                    return r[n[s]] = t, r[n[s]]
                }
                return t
            }

            function t(e, n) {
                return e[2] - n[2]
            }

            function r(e) {
                return 0 === e.indexOf("package.")
            }

            function o(e, t, r) {
                for (var o = [], i = {}, s = 0, a = t.length; s < a; ++s) {
                    var c = r[s].__package;
                    if (c)
                        for (var u = 0; u < c.length; ++u) i[c[u][0]] || (n(e, c[u][0], c[u][1]), o.push([c[u][0], c[u][1]]), i[c[u][0]] = 1);
                    else n(e, t[s], r[s]), i[t[s]] || (o.push([t[s], r[s]]), i[t[s]] = 1)
                }
                return e.__package = o, e
            }

            function i(e, i, s, a) {
                var c = [],
                    u = r(e);
                if (u) return o(i, s, a);
                for (var l = 0, f = s.length; l < f; ++l) c.push([s[l], l, s[l].length]);
                c.sort(t);
                for (var l = 0, f = c.length; l < f; ++l) {
                    var d = c[l][1],
                        p = s[d];
                    if (r(p))
                        for (var v = a[d].__package, h = 0; h < v.length; ++h) n(i, v[h][0], v[h][1]);
                    else n(i, p, a[d])
                }
                return i
            }
            e({
                isPackage: r,
                joinImports: i,
                createNS: n
            })
        }), t.modules.define("vow", [], function (e) {
            e(t.vow)
        }), t.ns.load = function (e, n, r, o) {
            return "function" == typeof e ? n ? t.ns.ready(["package.full"], e, n) : t.ns.ready(["package.full"], e) : ("string" == typeof e && (e = [e]), t.ns.ready.apply(this, arguments))
        }, function () {
            function e(e) {
                return function () {
                    console.warn("{NS}.modules.{FN} is not a public API and will be removed from {NS}.modules.".replace(/\{NS\}/g, t.project.namespace).replace(/\{FN\}/g, e));
                    var n = t.modules[e].apply(t.modules, arguments);
                    return n === t.modules ? t.ns.modules : n
                }
            }
            t.ns.modules = {
                require: function () {
                    return t.modules.require.apply(t.modules, arguments)
                },
                isDefined: function () {
                    return t.modules.isDefined.apply(t.modules, arguments)
                },
                requireSync: function () {
                    return t.modules.requireSync.apply(t.modules, arguments)
                },
                define: function (e, n, r, o) {
                    return t.modules.define.apply(t.modules, arguments), t.ns.modules
                },
                defineSync: e("defineSync"),
                providePackage: e("providePackage"),
                getDefinition: e("getDefinition"),
                getState: e("getState"),
                setOptions: e("setOptions"),
                flush: e("flush"),
                nextTick: e("nextTick"),
                watchResolving: e("watchResolving"),
                __modules: t.modules
            }
        }(), function (e) {
            function n() {
                g && (t.performance.saveMeasure("ymaps.readyDelay", t.performance.now() - t.performance.initTimings.responseEnd), g = !1);
                var e = t.performance.startMeasure("ymaps.ready"),
                    n = {};
                arguments.length && (1 != arguments.length || "object" != typeof arguments[0] || arguments[0].length ? "function" != typeof arguments[0] ? (n.require = "string" == typeof arguments[0] ? [arguments[0]] : arguments[0], n.successCallback = arguments[1], n.errorCallback = arguments[2] && "function" == typeof arguments[2] ? arguments[2] : null, n.context = arguments[2] && "object" == typeof arguments[2] ? arguments[2] : arguments[3]) : (n.successCallback = arguments[0],
                    n.errorCallback = arguments[1] && "function" == typeof arguments[1] ? arguments[1] : null, n.context = arguments[1] && "object" == typeof arguments[1] ? arguments[1] : arguments[2]) : n = arguments[0]);
                var o = n.require ? t.modules.require(n.require) : u.resolve();
                return u.all([r(), o, f, l, v]).spread(function (r, o) {
                    return c(o) && r.joinImports("package.ymaps", t.ns, n.require, o), n.successCallback && t.utils.nextTick(function () {
                        n.successCallback.call(n.context, t.ns)
                    }), e.finish(), t.ns
                }).fail(function (e) {
                    return n.errorCallback && t.utils.nextTick(function () {
                        n.errorCallback.call(n.context, e)
                    }), u.reject(e)
                })
            }

            function r() {
                return h || (h = t.modules.require(["system.mergeImports"]).spread(function (e) {
                    return e
                })), h
            }

            function o() {
                var e = t.project.preload;
                if (!c(e)) return u.resolve();
                var n = t.modules.require(e);
                return u.all([r(), n]).spread(function (n, r) {
                    c(r) && n.joinImports("package.ymaps", t.ns, e, r)
                })
            }

            function i() {
                var e = t.env.preload,
                    n = e.load && e.load.length > 0 && e.load.split(","),
                    o = n ? t.modules.require(n) : u.resolve();
                e.onError && o.fail(function (n) {
                    t.utils.nextTick(function () {
                        s(0, e.onError, n)
                    })
                });
                var i = t.performance.startMeasure("ymaps.preload");
                return u.all([r(), o, l]).spread(function (r, o) {
                    c(o) && r.joinImports("package.ymaps", t.ns, n, o), i.finish(), e.onLoad && t.utils.nextTick(function () {
                        s(0, e.onLoad, t.ns)
                    })
                })
            }

            function s(n, t, r) {
                var o = a(e, t);
                o ? o.method.call(o.context, r) : window.setTimeout(function () {
                    s(++n, t, r)
                }, Math.pow(2, n))
            }

            function a(e, n) {
                var t = e;
                n = n.split(".");
                for (var r = 0, o = n.length - 1; r < o; r++)
                    if (t = t[n[r]], !t) return;
                return {
                    method: t[n[o]],
                    context: t
                }
            }

            function c(e) {
                return e && e.length
            }
            var u = t.vow,
                l = o(),
                f = i(),
                d = "complete" == document.readyState,
                p = u.defer(),
                v = d ? u.resolve() : p.promise(),
                h = null,
                m = function () {
                    d || (d = !0, p.resolve())
                };
            d || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", m, !1), window.addEventListener("load", m, !1)) : document.attachEvent && window.attachEvent("onload", m)), t.ns.ready = n;
            var g = !0
        }(this), t.modules.require(["system.supports.css", "system.supports.graphics", "system.supports.csp", "system.browser", "system.logger"]).spread(function (e, n, r, o, i, s) {
            t.env.server.params.csp && !r.isSupported && console.warn("CSP is not suported in this browser"), t.supports = {
                css: e,
                graphics: n,
                printPatchNeeded: !e.checkProperty("printColorAdjust"),
                csp: r
            }, t.logger = i, t.modules.allowRemoteLoading()
        })["catch"](function (e) {
            console.error("ymaps initialization failed: " + e.stack)
        }), t.env.namespace) {
        for (var f = t.env.namespace.split("."), d = n; f.length > 1;) {
            var p = f.shift();
            d[p] = d[p] || {}, d = d[p]
        }
        d[f.shift()] = t.ns
    }
    console.log('init key');
    console.dir(t);
    t.performance.init({
        url: t.env.hosts.api.statCounter + "/counter",
        data: "/path=" + t.env.version.replace(/\W/g, "_") + "." + t.env.browser.platform,
        enable: "all" == t.env.counters || Math.random() < r && !t.env.server.params.debug,
        initUrl: document.currentScript && document.currentScript.src,
        useSendBeacon: !t.env.server.params.csp
    }), t.env.switchLinkOnEnterprise && (console.warn("You're using a wrong API host. For commercial API use enterprise.api-maps.yandex.ru"), t.env.hasValidApiKey || (t.env.apikey = void 0, console.warn("Invalid API key"))), o.finish()
})({
    "server": {
        "url": "https://api-maps.yandex.ru/2.1.68",
        "path": "build/release",
        "params": {
            "mode": "release",
            "ns": "ymaps",
            "csp": null
        }
    },
    "preload": {
        "load": "package.full"
    },
    "mode": "release",
    "debug": false,
    "namespace": "ymaps",
    "enterprise": false,
    "key": undefined,
    "apikey": undefined,
    "browser": {
        "name": "Chromium",
        "version": "67.0.3396",
        "base": "Chromium",
        "engine": "WebKit",
        "engineVersion": "537.36",
        "osName": "Ubuntu",
        "osFamily": "Linux",
        "osVersion": 0,
        "isMobile": false,
        "isTablet": false,
        "multiTouch": false,
        "platform": "Desktop",
        "cssPrefix": "Webkit"
    },
    "lang": "ru_RU",
    "languageCode": "ru",
    "countryCode": "RU",
    "hosts": {
        "api": {
            "main": "https://api-maps.yandex.ru/",
            "ua": "https://yandex.ru/legal/maps_termsofuse/?lang={{lang}}",
            "maps": "https://yandex.ru/maps/",
            "statCounter": "https://yandex.ru/clck/",
            "services": {
                "coverage": "https://api-maps.yandex.ru/services/coverage/",
                "geocode": "https://geocode-maps.yandex.ru/",
                "geoxml": "https://api-maps.yandex.ru/services/geoxml/",
                "inception": "https://api-maps.yandex.ru/services/inception/",
                "panoramaLocate": "https://api-maps.yandex.ru/services/panoramas/",
                "search": "https://api-maps.yandex.ru/services/search/",
                "suggest": "https://suggest-maps.yandex.ru/",
                "regions": "https://api-maps.yandex.ru/services/regions/",
                "route": "https://api-maps.yandex.ru/services/route/"
            }
        },
        "layers": {
            "map": "https://vec0%d.maps.yandex.net/tiles?l=map&%c&%l",
            "mapj": "https://vec0%d.maps.yandex.net/tiles?l=mapj&%c&%l",
            "sat": "https://sat0%d.maps.yandex.net/tiles?l=sat&%c&%l",
            "skl": "https://vec0%d.maps.yandex.net/tiles?l=skl&%c&%l",
            "sklj": "https://vec0%d.maps.yandex.net/tiles?l=sklj&%c&%l",
            "stv": "https://0%d.srdr.maps.yandex.net/?l=stv&%c&v=%v&%l&action=render",
            "sta": "https://lrs.maps.yandex.net/tiles?l=sta&%c&tm=%v&%l",
            "staHotspot": "https://lrs.maps.yandex.net/tiles?l=stj&%c&tm=%v&%l",
            "staHotspotKey": "%c&l=stj&tm=%v"
        },
        "metro_RU": "https://metro.yandex.ru/",
        "metro_UA": "https://metro.yandex.ua/",
        "metro_BY": "https://metro.yandex.by/",
        "metro_US": "https://metro.yandex.com/",
        "traffic": "https://jgo.maps.yandex.net/",
        "trafficArchive": "https://jft.maps.yandex.net/",
        "vectorIndex": "https://yastatic.net/maps/vector/{{version}}/index.js",
        "vectorTiles": "https://vec.maps.yandex.net/vmap2/tiles?l=vmap2&lang={{lang}}&x={{x}}&y={{y}}&z={{z}}&zmin={{zmin}}&zmax={{zmax}}",
        "vectorImages": "https://vec.maps.yandex.net/vmap2/icons?id={{id}}&scale={{scale}}",
        "vectorMeshes": "https://vec.maps.yandex.net/vmap2/meshes?id={{id}}",
        "vectorGlyphs": "https://vec.maps.yandex.net/vmap2/glyphs?lang={{lang}}&font_id={{fontId}}&range={{range}}",
        "panoramasTiles": "https://pano.maps.yandex.net/%s/%z.%x.%y"
    },
    "layers": {
        "map": {
            "version": "18.08.11-1",
            "scaled": true,
            "hotspotZoomRange": [13, 23]
        },
        "sat": {
            "version": "3.425.0"
        },
        "skl": {
            "version": "18.08.11-1",
            "scaled": true,
            "hotspotZoomRange": [13, 23]
        },
        "trf": {
            "version": "1534238085",
            "scaled": true
        },
        "sta": {
            "version": "0.28.1-0.1.3.2-0.2018.08.01.22.00.2.29.26-0.stable"
        },
        "stv": {
            "version": "4.49.0-1"
        }
    },
    "geolocation": {
        "longitude": 37.80285,
        "latitude": 48.015877,
        "isHighAccuracy": false,
        "span": {
            "longitude": 0.475343,
            "latitude": 0.206715
        }
    },
    "token": "c44d7fae205ea99fe17d2438ba1907cf",
    "sign": (function (r) {
        function t(e) {
            if (n[e]) return n[e].exports;
            var o = n[e] = {
                exports: {},
                id: e,
                loaded: !1
            };
            return r[e].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }
        var n = {};
        return t.m = r, t.c = n, t.p = "", t(0)
    })([function (r, t, n) {
        "use strict";

        function e() {
            for (var r = ["0", "e", "0", "7", "f", "8", "f", "e", "a", "9", "d", "b", "a", "3", "e", "f", "7", "8", "2", "6", "c", "8", "8", "e", "a", "2", "c", "1", "9", "6", "6", "5", "a", "1", "8", "b", "d", "4", "3", "4"], t = [
                    [SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMAX + 29, document.head.nodeName.length + 11],
                    [(function () {
                        var e = document.createElement("a");
                        return e.href = "http://dum.edu:285", e.hostname.length
                    })() + 5, DOMException.URL_MISMATCH_ERR - 17],
                    [SVGAngle.SVG_ANGLETYPE_RAD + 7, SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_UNKNOWN + 20]
                ], n = 0; n < t.length; n++) {
                var e = t[n][0],
                    o = t[n][1],
                    i = r[e];
                r[e] = r[o], r[o] = i
            }
            return r.join("")
        }
        var o, i = n(1),
            u = n(2);
        r.exports = function (r) {
            return o || (o = i(e())), i(u(r), o)
        }
    }, function (r, t) {
        "use strict";
        r.exports = function (r, t) {
            t = t || 0;
            for (var n = 0; n < r.length; n++) t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24), t ^= r.charCodeAt(n);
            return t >>> 0
        }
    }, function (r, t) {
        "use strict";
        r.exports = function (r) {
            r = r.replace(/^.*\/\//, "");
            var t = r.indexOf("?");
            if (-1 === t) return r;
            var n = t + 1,
                e = r.indexOf("#", n); - 1 === e && (e = r.length);
            var o = r.substring(n, e).split("&", 1e3);
            return r.substring(0, n) + o.sort().join("&") + r.substring(e)
        }
    }]),
    "distribution": {},
    "vectorVersion": "0.3.2",
    "version": "2.1.68",
    "majorVersion": "2.1",
    "cssPrefix": "ymaps-2-1-68-",
    "coordinatesOrder": "latlong"
})