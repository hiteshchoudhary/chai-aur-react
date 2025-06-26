import _typeof from "./typeof.js";
import checkInRHS from "./checkInRHS.js";
function createAddInitializerMethod(e, t) {
  return function (r) {
    assertNotFinished(t, "addInitializer"), assertCallable(r, "An initializer"), e.push(r);
  };
}
function assertInstanceIfPrivate(e, t) {
  if (!e(t)) throw new TypeError("Attempted to access private element on non-instance");
}
function memberDec(e, t, r, n, a, i, s, o, c, l) {
  var u;
  switch (i) {
    case 1:
      u = "accessor";
      break;
    case 2:
      u = "method";
      break;
    case 3:
      u = "getter";
      break;
    case 4:
      u = "setter";
      break;
    default:
      u = "field";
  }
  var f,
    d,
    p = {
      kind: u,
      name: o ? "#" + r : r,
      "static": s,
      "private": o
    },
    h = {
      v: !1
    };
  if (0 !== i && (p.addInitializer = createAddInitializerMethod(a, h)), o || 0 !== i && 2 !== i) {
    if (2 === i) f = function f(e) {
      return assertInstanceIfPrivate(l, e), n.value;
    };else {
      var v = 0 === i || 1 === i;
      (v || 3 === i) && (f = o ? function (e) {
        return assertInstanceIfPrivate(l, e), n.get.call(e);
      } : function (e) {
        return n.get.call(e);
      }), (v || 4 === i) && (d = o ? function (e, t) {
        assertInstanceIfPrivate(l, e), n.set.call(e, t);
      } : function (e, t) {
        n.set.call(e, t);
      });
    }
  } else f = function f(e) {
    return e[r];
  }, 0 === i && (d = function d(e, t) {
    e[r] = t;
  });
  var y = o ? l.bind() : function (e) {
    return r in e;
  };
  p.access = f && d ? {
    get: f,
    set: d,
    has: y
  } : f ? {
    get: f,
    has: y
  } : {
    set: d,
    has: y
  };
  try {
    return e.call(t, c, p);
  } finally {
    h.v = !0;
  }
}
function assertNotFinished(e, t) {
  if (e.v) throw new Error("attempted to call " + t + " after decoration was finished");
}
function assertCallable(e, t) {
  if ("function" != typeof e) throw new TypeError(t + " must be a function");
}
function assertValidReturnValue(e, t) {
  var r = _typeof(t);
  if (1 === e) {
    if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
    void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init");
  } else if ("function" !== r) {
    var n;
    throw n = 0 === e ? "field" : 5 === e ? "class" : "method", new TypeError(n + " decorators must return a function or void 0");
  }
}
function curryThis1(e) {
  return function () {
    return e(this);
  };
}
function curryThis2(e) {
  return function (t) {
    e(this, t);
  };
}
function applyMemberDec(e, t, r, n, a, i, s, o, c, l) {
  var u,
    f,
    d,
    p,
    h,
    v,
    y = r[0];
  n || Array.isArray(y) || (y = [y]), o ? u = 0 === i || 1 === i ? {
    get: curryThis1(r[3]),
    set: curryThis2(r[4])
  } : 3 === i ? {
    get: r[3]
  } : 4 === i ? {
    set: r[3]
  } : {
    value: r[3]
  } : 0 !== i && (u = Object.getOwnPropertyDescriptor(t, a)), 1 === i ? d = {
    get: u.get,
    set: u.set
  } : 2 === i ? d = u.value : 3 === i ? d = u.get : 4 === i && (d = u.set);
  for (var g = n ? 2 : 1, m = y.length - 1; m >= 0; m -= g) {
    var b;
    if (void 0 !== (p = memberDec(y[m], n ? y[m - 1] : void 0, a, u, c, i, s, o, d, l))) assertValidReturnValue(i, p), 0 === i ? b = p : 1 === i ? (b = p.init, h = p.get || d.get, v = p.set || d.set, d = {
      get: h,
      set: v
    }) : d = p, void 0 !== b && (void 0 === f ? f = b : "function" == typeof f ? f = [f, b] : f.push(b));
  }
  if (0 === i || 1 === i) {
    if (void 0 === f) f = function f(e, t) {
      return t;
    };else if ("function" != typeof f) {
      var I = f;
      f = function f(e, t) {
        for (var r = t, n = I.length - 1; n >= 0; n--) r = I[n].call(e, r);
        return r;
      };
    } else {
      var w = f;
      f = function f(e, t) {
        return w.call(e, t);
      };
    }
    e.push(f);
  }
  0 !== i && (1 === i ? (u.get = d.get, u.set = d.set) : 2 === i ? u.value = d : 3 === i ? u.get = d : 4 === i && (u.set = d), o ? 1 === i ? (e.push(function (e, t) {
    return d.get.call(e, t);
  }), e.push(function (e, t) {
    return d.set.call(e, t);
  })) : 2 === i ? e.push(d) : e.push(function (e, t) {
    return d.call(e, t);
  }) : Object.defineProperty(t, a, u));
}
function applyMemberDecs(e, t, r) {
  for (var n, a, i, s = [], o = new Map(), c = new Map(), l = 0; l < t.length; l++) {
    var u = t[l];
    if (Array.isArray(u)) {
      var f,
        d,
        p = u[1],
        h = u[2],
        v = u.length > 3,
        y = 16 & p,
        g = !!(8 & p),
        m = r;
      if (p &= 7, g ? (f = e, 0 !== p && (d = a = a || []), v && !i && (i = function i(t) {
        return checkInRHS(t) === e;
      }), m = i) : (f = e.prototype, 0 !== p && (d = n = n || [])), 0 !== p && !v) {
        var b = g ? c : o,
          I = b.get(h) || 0;
        if (!0 === I || 3 === I && 4 !== p || 4 === I && 3 !== p) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
        b.set(h, !(!I && p > 2) || p);
      }
      applyMemberDec(s, f, u, y, h, p, g, v, d, m);
    }
  }
  return pushInitializers(s, n), pushInitializers(s, a), s;
}
function pushInitializers(e, t) {
  t && e.push(function (e) {
    for (var r = 0; r < t.length; r++) t[r].call(e);
    return e;
  });
}
function applyClassDecs(e, t, r) {
  if (t.length) {
    for (var n = [], a = e, i = e.name, s = r ? 2 : 1, o = t.length - 1; o >= 0; o -= s) {
      var c = {
        v: !1
      };
      try {
        var l = t[o].call(r ? t[o - 1] : void 0, a, {
          kind: "class",
          name: i,
          addInitializer: createAddInitializerMethod(n, c)
        });
      } finally {
        c.v = !0;
      }
      void 0 !== l && (assertValidReturnValue(5, l), a = l);
    }
    return [a, function () {
      for (var e = 0; e < n.length; e++) n[e].call(a);
    }];
  }
}
export default function applyDecs2305(e, t, r, n, a) {
  return {
    e: applyMemberDecs(e, t, a),
    get c() {
      return applyClassDecs(e, r, n);
    }
  };
}