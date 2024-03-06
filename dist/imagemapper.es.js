var ne = Object.defineProperty;
var se = (n, t, e) => t in n ? ne(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var g = (n, t, e) => (se(n, typeof t != "symbol" ? t + "" : t, e), e);
const D = "http://www.w3.org/2000/svg", ie = "http://www.w3.org/1999/xlink";
let X, _;
window != null ? (X = window, _ = X.document) : (X = globalThis, _ = X.document);
const A = function(n, t, e) {
  [n].flat().forEach((s) => {
    t.split(" ").forEach((i) => {
      s.addEventListener(i, e, {
        passive: !1
      });
    });
  });
}, re = function(n, t, e) {
  [n].flat().forEach((s) => {
    t.split(" ").forEach((i) => {
      s.removeEventListener(i, e);
    });
  });
}, oe = {
  fill: "rgb(102, 102, 102)",
  stroke: "rgb(51, 51, 51)",
  cursor: "pointer"
}, ce = {
  off: {
    strokeWidth: "1",
    opacity: "0.5"
  },
  on: {
    strokeWidth: "2",
    opacity: "0.6"
  }
}, he = {
  off: {
    strokeDasharray: "none",
    // alt. 'initial'
    strokeLinejoin: "miter"
  },
  on: {
    strokeDasharray: "4 3",
    strokeLinejoin: "round"
  }
}, ae = {
  fill: "rgb(255, 255, 255)",
  stroke: "rgb(51, 51, 51)",
  strokeWidth: "1",
  opacity: "0.3",
  cursor: "pointer"
}, le = {
  opacity: "0.6"
}, Dt = () => ({
  component: Object.assign({}, oe),
  componentHover: Object.assign({}, ce),
  componentSelect: Object.assign({}, he),
  handle: Object.assign({}, ae),
  handleHover: Object.assign({}, le)
}), w = (n, t) => Object.entries(t).forEach(([e, s]) => n.setAttribute(e, s)), ot = (n, t, e) => {
  A(n, "mouseenter touchstart", () => w(n, e)), A(
    n,
    "mouseleave touchend touchleave",
    () => w(n, t)
  );
};
class T {
  constructor(t, e) {
    g(this, "style", Dt());
    g(this, "isSelected", !1);
    g(this, "isFrozen", !1);
    this.editorOwner = t, this.element = e;
  }
  _logWarnOnOpOnFrozen(t) {
    this.isFrozen && console.warn(`${t} frozen ${this.element.tagName} with id ${this.element.id}`);
  }
}
class x {
  constructor(t, e, s, i) {
    g(this, "moveHandler");
    g(this, "element");
    g(this, "isFrozen");
    this.moveHandler = s, this.element = _.createElementNS(D, "circle"), this.element.setAttribute("cx", String(t)), this.element.setAttribute("cy", String(e)), this.element.setAttribute("r", "5"), this.element.setAttribute("visibility", "hidden"), this.isFrozen = i != null ? !!i : !1;
  }
  freeze(t) {
    return this.isFrozen = t != null ? !!t : !0, this.isFrozen && this.setVisible(!1), this;
  }
  setAttrX(t) {
    return this.element.setAttribute("cx", String(t)), this;
  }
  setAttrY(t) {
    return this.element.setAttribute("cy", String(t)), this;
  }
  move(t, e) {
    return this.moveHandler(t, e), this;
  }
  setVisible(t) {
    return t = t != null ? !!t : !0, this.element.setAttribute("visibility", t ? "visible" : "hidden"), this;
  }
  setStyle(t, e) {
    return w(this.element, t), ot(this.element, t, e), this;
  }
}
const ct = (n, t, e) => {
  const s = {
    defineProperty(i, r, o) {
      return Object.is(o.value, i[r]) || (typeof t == "function" ? t.call(
        e || this,
        r,
        o.value,
        i[r],
        n
      ) : t[r].call(
        e || this,
        o.value,
        i[r],
        n
      )), Reflect.defineProperty(i, r, o);
    }
  };
  return new Proxy(n, s);
};
class J extends T {
  constructor(e, s, i, r, o, c = 0, h = 0) {
    super(i, _.createElementNS(D, e));
    g(this, "dim");
    g(this, "handles");
    this.dim = ct(
      { x: r, y: o, width: 0, height: 0 },
      {
        /*
                this.handles[]
                index location:
        
                   0_______2
                    |     |
                    |_____|
                   1       3
                */
        // move
        x: (a, l, d) => {
          this._logWarnOnOpOnFrozen("Dimension property x changed on"), s.x.call(this, a, l, d), this.handles[0].setAttrX(a), this.handles[1].setAttrX(a), this.handles[2].setAttrX(a + d.width), this.handles[3].setAttrX(a + d.width);
        },
        // move
        y: (a, l, d) => {
          this._logWarnOnOpOnFrozen("Dimension property y changed on"), s.y.call(this, a, l, d), this.handles[0].setAttrY(a), this.handles[1].setAttrY(a + d.height), this.handles[2].setAttrY(a), this.handles[3].setAttrY(a + d.height);
        },
        // resize
        width: (a, l, d) => {
          this._logWarnOnOpOnFrozen("Dimension property width changed on"), s.width.call(this, a, l, d), this.handles[2].setAttrX(d.x + a), this.handles[3].setAttrX(d.x + a);
        },
        // resize
        height: (a, l, d) => {
          this._logWarnOnOpOnFrozen("Dimension property height changed on"), s.height.call(this, a, l, d), this.handles[1].setAttrY(d.y + a), this.handles[3].setAttrY(d.y + a);
        }
      },
      this
    ), this.handles = [
      new x(
        r,
        o,
        (a, l) => {
          this.dim.x += a, this.dim.width -= a, this.dim.y += l, this.dim.height -= l;
        },
        this.isFrozen
      ),
      new x(
        r,
        o,
        (a, l) => {
          this.dim.x += a, this.dim.width -= a, this.dim.height += l;
        },
        this.isFrozen
      ),
      new x(
        r,
        o,
        (a, l) => {
          this.dim.width += a, this.dim.y += l, this.dim.height -= l;
        },
        this.isFrozen
      ),
      new x(
        r,
        o,
        (a, l) => {
          this.dim.width += a, this.dim.height += l;
        },
        this.isFrozen
      )
    ], this.handles.forEach((a) => {
      this.editorOwner.registerComponentHandle(a);
    }), [this.dim.width, this.dim.height] = [c, h];
  }
  freeze(e) {
    return this.isFrozen = e != null ? !!e : !0, this.handles.forEach((s) => s.freeze(e)), this;
  }
  resize(e, s) {
    return this.dim.width = e - this.dim.x, this.dim.height = s - this.dim.y, this;
  }
  move(e, s) {
    return this.dim.x += e, this.dim.y += s, this;
  }
  isValid() {
    return this.dim.width > 0 && this.dim.height > 0;
  }
  setHandlesVisibility(e) {
    return this.handles.forEach((s) => s.setVisible(e)), this;
  }
  setIsSelected(e) {
    return this._logWarnOnOpOnFrozen("Select/unselect performed on"), this.isSelected = e = e != null ? !!e : !0, this.setHandlesVisibility(e), this.style && w(
      this.element,
      e ? this.style.componentSelect.on : this.style.componentSelect.off
    ), this;
  }
  getHandles() {
    return this.handles;
  }
  setStyle(e) {
    return this.style = e, w(this.element, e.component), w(this.element, e.componentHover.off), w(this.element, e.componentSelect.off), ot(this.element, e.componentHover.off, e.componentHover.on), this;
  }
  export() {
    const { x: e, y: s, width: i, height: r } = this.dim;
    return { x: e, y: s, width: i, height: r };
  }
}
function de() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
}
function ue() {
  const n = de();
  if (n.__xstate__)
    return n.__xstate__;
}
const fe = (n) => {
  if (typeof window > "u")
    return;
  const t = ue();
  t && t.register(n);
};
class yt {
  constructor(t) {
    this._process = t, this._active = !1, this._current = null, this._last = null;
  }
  start() {
    this._active = !0, this.flush();
  }
  clear() {
    this._current && (this._current.next = null, this._last = this._current);
  }
  enqueue(t) {
    const e = {
      value: t,
      next: null
    };
    if (this._current) {
      this._last.next = e, this._last = e;
      return;
    }
    this._current = e, this._last = e, this._active && this.flush();
  }
  flush() {
    for (; this._current; ) {
      const t = this._current;
      this._process(t.value), this._current = t.next;
    }
    this._last = null;
  }
}
const V = ".", pe = "", Ct = "", me = "#", ge = "*", kt = "xstate.init", ye = "xstate.error", Q = "xstate.stop";
function ve(n, t) {
  return {
    type: `xstate.after.${n}.${t}`
  };
}
function tt(n, t) {
  return {
    type: `xstate.done.state.${n}`,
    output: t
  };
}
function _e(n, t) {
  return {
    type: `xstate.done.actor.${n}`,
    output: t
  };
}
function $t(n, t) {
  return {
    type: `xstate.error.actor.${n}`,
    error: t
  };
}
function Rt(n) {
  return {
    type: kt,
    input: n
  };
}
function b(n) {
  setTimeout(() => {
    throw n;
  });
}
const we = typeof Symbol == "function" && Symbol.observable || "@@observable";
function vt(n, t) {
  return `${n.sessionId}.${t}`;
}
let Se = 0;
function be(n, t) {
  const e = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new Set(), o = {}, c = t.clock, h = {
    schedule: (l, d, u, f, p = Math.random().toString(36).slice(2)) => {
      const m = {
        source: l,
        target: d,
        event: u,
        delay: f,
        id: p,
        startedAt: Date.now()
      }, y = vt(l, p);
      a._snapshot._scheduledEvents[y] = m;
      const ee = c.setTimeout(() => {
        delete o[y], delete a._snapshot._scheduledEvents[y], a._relay(l, d, u);
      }, f);
      o[y] = ee;
    },
    cancel: (l, d) => {
      const u = vt(l, d), f = o[u];
      delete o[u], delete a._snapshot._scheduledEvents[u], c.clearTimeout(f);
    },
    cancelAll: (l) => {
      for (const d in a._snapshot._scheduledEvents) {
        const u = a._snapshot._scheduledEvents[d];
        u.source === l && h.cancel(l, u.id);
      }
    }
  }, a = {
    _snapshot: {
      _scheduledEvents: ((t == null ? void 0 : t.snapshot) && t.snapshot.scheduler) ?? {}
    },
    _bookId: () => `x:${Se++}`,
    _register: (l, d) => (e.set(l, d), l),
    _unregister: (l) => {
      e.delete(l.sessionId);
      const d = i.get(l);
      d !== void 0 && (s.delete(d), i.delete(l));
    },
    get: (l) => s.get(l),
    _set: (l, d) => {
      const u = s.get(l);
      if (u && u !== d)
        throw new Error(`Actor with system ID '${l}' already exists.`);
      s.set(l, d), i.set(d, l);
    },
    inspect: (l) => {
      r.add(l);
    },
    _sendInspectionEvent: (l) => {
      const d = {
        ...l,
        rootId: n.sessionId
      };
      r.forEach((u) => {
        var f;
        return (f = u.next) == null ? void 0 : f.call(u, d);
      });
    },
    _relay: (l, d, u) => {
      a._sendInspectionEvent({
        type: "@xstate.event",
        sourceRef: l,
        actorRef: d,
        event: u
      }), d._send(u);
    },
    scheduler: h,
    getSnapshot: () => ({
      _scheduledEvents: {
        ...a._snapshot._scheduledEvents
      }
    }),
    start: () => {
      const l = a._snapshot._scheduledEvents;
      a._snapshot._scheduledEvents = {};
      for (const d in l) {
        const {
          source: u,
          target: f,
          event: p,
          delay: m,
          id: y
        } = l[d];
        h.schedule(u, f, p, m, y);
      }
    }
  };
  return a;
}
function jt(n, t) {
  const e = _t(n), s = _t(t);
  return typeof s == "string" ? typeof e == "string" ? s === e : !1 : typeof e == "string" ? e in s : Object.keys(e).every((i) => i in s ? jt(e[i], s[i]) : !1);
}
function Wt(n) {
  return Ht(n) ? n : n.split(V);
}
function _t(n) {
  if (Ge(n))
    return n.value;
  if (typeof n != "string")
    return n;
  const t = Wt(n);
  return xe(t);
}
function xe(n) {
  if (n.length === 1)
    return n[0];
  const t = {};
  let e = t;
  for (let s = 0; s < n.length - 1; s++)
    if (s === n.length - 2)
      e[n[s]] = n[s + 1];
    else {
      const i = e;
      e = {}, i[n[s]] = e;
    }
  return t;
}
function wt(n, t) {
  const e = {}, s = Object.keys(n);
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    e[r] = t(n[r], r, n, i);
  }
  return e;
}
function Yt(n) {
  return Ht(n) ? n : [n];
}
function O(n) {
  return n === void 0 ? [] : Yt(n);
}
function et(n, t, e, s) {
  return typeof n == "function" ? n({
    context: t,
    event: e,
    self: s
  }) : n;
}
function Ht(n) {
  return Array.isArray(n);
}
function Ee(n) {
  return n.type.startsWith("xstate.error.actor");
}
function R(n) {
  return Yt(n).map((t) => typeof t > "u" || typeof t == "string" ? {
    target: t
  } : t);
}
function Ut(n) {
  if (!(n === void 0 || n === pe))
    return O(n);
}
function St(n, t, e) {
  var r, o, c;
  const s = typeof n == "object", i = s ? n : void 0;
  return {
    next: (r = s ? n.next : n) == null ? void 0 : r.bind(i),
    error: (o = s ? n.error : t) == null ? void 0 : o.bind(i),
    complete: (c = s ? n.complete : e) == null ? void 0 : c.bind(i)
  };
}
function bt(n, t) {
  return `${t}.${n}`;
}
function ht(n, t) {
  const e = t.match(/^xstate\.invoke\.(\d+)\.(.*)/);
  if (!e)
    return n.implementations.actors[t];
  const [, s, i] = e, o = n.getStateNodeById(i).config.invoke;
  return (Array.isArray(o) ? o[s] : o).src;
}
const at = 1;
let v = /* @__PURE__ */ function(n) {
  return n[n.NotStarted = 0] = "NotStarted", n[n.Running = 1] = "Running", n[n.Stopped = 2] = "Stopped", n;
}({});
const Ae = {
  clock: {
    setTimeout: (n, t) => setTimeout(n, t),
    clearTimeout: (n) => clearTimeout(n)
  },
  logger: console.log.bind(console),
  devTools: !1
};
class Oe {
  /**
   * Creates a new actor instance for the given logic with the provided options, if any.
   *
   * @param logic The logic to create an actor from
   * @param options Actor options
   */
  constructor(t, e) {
    this.logic = t, this._snapshot = void 0, this.clock = void 0, this.options = void 0, this.id = void 0, this.mailbox = new yt(this._process.bind(this)), this.observers = /* @__PURE__ */ new Set(), this.logger = void 0, this._processingStatus = v.NotStarted, this._parent = void 0, this._syncSnapshot = void 0, this.ref = void 0, this._actorScope = void 0, this._systemId = void 0, this.sessionId = void 0, this.system = void 0, this._doneEvent = void 0, this.src = void 0, this._deferred = [];
    const s = {
      ...Ae,
      ...e
    }, {
      clock: i,
      logger: r,
      parent: o,
      syncSnapshot: c,
      id: h,
      systemId: a,
      inspect: l
    } = s;
    this.system = o ? o.system : be(this, {
      clock: i
    }), l && !o && this.system.inspect(St(l)), this.sessionId = this.system._bookId(), this.id = h ?? this.sessionId, this.logger = r, this.clock = i, this._parent = o, this._syncSnapshot = c, this.options = s, this.src = s.src ?? t, this.ref = this, this._actorScope = {
      self: this,
      id: this.id,
      sessionId: this.sessionId,
      logger: this.logger,
      defer: (d) => {
        this._deferred.push(d);
      },
      system: this.system,
      stopChild: (d) => {
        if (d._parent !== this)
          throw new Error(`Cannot stop child actor ${d.id} of ${this.id} because it is not a child`);
        d._stop();
      }
    }, this.send = this.send.bind(this), this.system._sendInspectionEvent({
      type: "@xstate.actor",
      actorRef: this
    }), a && (this._systemId = a, this.system._set(a, this)), this._initState((e == null ? void 0 : e.snapshot) ?? (e == null ? void 0 : e.state)), a && this._snapshot.status !== "active" && this.system._unregister(this);
  }
  _initState(t) {
    var e;
    try {
      this._snapshot = t ? this.logic.restoreSnapshot ? this.logic.restoreSnapshot(t, this._actorScope) : t : this.logic.getInitialSnapshot(this._actorScope, (e = this.options) == null ? void 0 : e.input);
    } catch (s) {
      this._snapshot = {
        status: "error",
        output: void 0,
        error: s
      };
    }
  }
  update(t, e) {
    var i, r;
    this._snapshot = t;
    let s;
    for (; s = this._deferred.shift(); )
      try {
        s();
      } catch (o) {
        this._deferred.length = 0, this._snapshot = {
          ...t,
          status: "error",
          error: o
        };
      }
    switch (this._snapshot.status) {
      case "active":
        for (const o of this.observers)
          try {
            (i = o.next) == null || i.call(o, t);
          } catch (c) {
            b(c);
          }
        break;
      case "done":
        for (const o of this.observers)
          try {
            (r = o.next) == null || r.call(o, t);
          } catch (c) {
            b(c);
          }
        this._stopProcedure(), this._complete(), this._doneEvent = _e(this.id, this._snapshot.output), this._parent && this.system._relay(this, this._parent, this._doneEvent);
        break;
      case "error":
        this._error(this._snapshot.error);
        break;
    }
    this.system._sendInspectionEvent({
      type: "@xstate.snapshot",
      actorRef: this,
      event: e,
      snapshot: t
    });
  }
  /**
   * Subscribe an observer to an actor’s snapshot values.
   *
   * @remarks
   * The observer will receive the actor’s snapshot value when it is emitted. The observer can be:
   * - A plain function that receives the latest snapshot, or
   * - An observer object whose `.next(snapshot)` method receives the latest snapshot
   *
   * @example
   * ```ts
   * // Observer as a plain function
   * const subscription = actor.subscribe((snapshot) => {
   *   console.log(snapshot);
   * });
   * ```
   *
   * @example
   * ```ts
   * // Observer as an object
   * const subscription = actor.subscribe({
   *   next(snapshot) {
   *     console.log(snapshot);
   *   },
   *   error(err) {
   *     // ...
   *   },
   *   complete() {
   *     // ...
   *   },
   * });
   * ```
   *
   * The return value of `actor.subscribe(observer)` is a subscription object that has an `.unsubscribe()` method. You can call `subscription.unsubscribe()` to unsubscribe the observer:
   *
   * @example
   * ```ts
   * const subscription = actor.subscribe((snapshot) => {
   *   // ...
   * });
   *
   * // Unsubscribe the observer
   * subscription.unsubscribe();
   * ```
   *
   * When the actor is stopped, all of its observers will automatically be unsubscribed.
   *
   * @param observer - Either a plain function that receives the latest snapshot, or an observer object whose `.next(snapshot)` method receives the latest snapshot
   */
  subscribe(t, e, s) {
    var r;
    const i = St(t, e, s);
    if (this._processingStatus !== v.Stopped)
      this.observers.add(i);
    else
      switch (this._snapshot.status) {
        case "done":
          try {
            (r = i.complete) == null || r.call(i);
          } catch (o) {
            b(o);
          }
          break;
        case "error": {
          const o = this._snapshot.error;
          if (!i.error)
            b(o);
          else
            try {
              i.error(o);
            } catch (c) {
              b(c);
            }
          break;
        }
      }
    return {
      unsubscribe: () => {
        this.observers.delete(i);
      }
    };
  }
  /**
   * Starts the Actor from the initial state
   */
  start() {
    if (this._processingStatus === v.Running)
      return this;
    this._syncSnapshot && this.subscribe({
      next: (s) => {
        s.status === "active" && this.system._relay(this, this._parent, {
          type: `xstate.snapshot.${this.id}`,
          snapshot: s
        });
      },
      error: () => {
      }
    }), this.system._register(this.sessionId, this), this._systemId && this.system._set(this._systemId, this), this._processingStatus = v.Running;
    const t = Rt(this.options.input);
    switch (this.system._sendInspectionEvent({
      type: "@xstate.event",
      sourceRef: this._parent,
      actorRef: this,
      event: t
    }), this._snapshot.status) {
      case "done":
        return this.update(this._snapshot, t), this;
      case "error":
        return this._error(this._snapshot.error), this;
    }
    if (this._parent || this.system.start(), this.logic.start)
      try {
        this.logic.start(this._snapshot, this._actorScope);
      } catch (s) {
        return this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: s
        }, this._error(s), this;
      }
    return this.update(this._snapshot, t), this.options.devTools && this.attachDevTools(), this.mailbox.start(), this;
  }
  _process(t) {
    let e, s;
    try {
      e = this.logic.transition(this._snapshot, t, this._actorScope);
    } catch (i) {
      s = {
        err: i
      };
    }
    if (s) {
      const {
        err: i
      } = s;
      this._snapshot = {
        ...this._snapshot,
        status: "error",
        error: i
      }, this._error(i);
      return;
    }
    this.update(e, t), t.type === Q && (this._stopProcedure(), this._complete());
  }
  _stop() {
    return this._processingStatus === v.Stopped ? this : (this.mailbox.clear(), this._processingStatus === v.NotStarted ? (this._processingStatus = v.Stopped, this) : (this.mailbox.enqueue({
      type: Q
    }), this));
  }
  /**
   * Stops the Actor and unsubscribe all listeners.
   */
  stop() {
    if (this._parent)
      throw new Error("A non-root actor cannot be stopped directly.");
    return this._stop();
  }
  _complete() {
    var t;
    for (const e of this.observers)
      try {
        (t = e.complete) == null || t.call(e);
      } catch (s) {
        b(s);
      }
    this.observers.clear();
  }
  _reportError(t) {
    if (!this.observers.size) {
      this._parent || b(t);
      return;
    }
    let e = !1;
    for (const s of this.observers) {
      const i = s.error;
      e || (e = !i);
      try {
        i == null || i(t);
      } catch (r) {
        b(r);
      }
    }
    this.observers.clear(), e && b(t);
  }
  _error(t) {
    this._stopProcedure(), this._reportError(t), this._parent && this.system._relay(this, this._parent, $t(this.id, t));
  }
  // TODO: atm children don't belong entirely to the actor so
  // in a way - it's not even super aware of them
  // so we can't stop them from here but we really should!
  // right now, they are being stopped within the machine's transition
  // but that could throw and leave us with "orphaned" active actors
  _stopProcedure() {
    return this._processingStatus !== v.Running ? this : (this.system.scheduler.cancelAll(this), this.mailbox.clear(), this.mailbox = new yt(this._process.bind(this)), this._processingStatus = v.Stopped, this.system._unregister(this), this);
  }
  /**
   * @internal
   */
  _send(t) {
    this._processingStatus !== v.Stopped && this.mailbox.enqueue(t);
  }
  /**
   * Sends an event to the running Actor to trigger a transition.
   *
   * @param event The event to send
   */
  send(t) {
    this.system._relay(void 0, this, t);
  }
  attachDevTools() {
    const {
      devTools: t
    } = this.options;
    t && (typeof t == "function" ? t : fe)(this);
  }
  toJSON() {
    return {
      xstate$$type: at,
      id: this.id
    };
  }
  /**
   * Obtain the internal state of the actor, which can be persisted.
   *
   * @remarks
   * The internal state can be persisted from any actor, not only machines.
   *
   * Note that the persisted state is not the same as the snapshot from {@link Actor.getSnapshot}. Persisted state represents the internal state of the actor, while snapshots represent the actor's last emitted value.
   *
   * Can be restored with {@link ActorOptions.state}
   *
   * @see https://stately.ai/docs/persistence
   */
  getPersistedSnapshot(t) {
    return this.logic.getPersistedSnapshot(this._snapshot, t);
  }
  [we]() {
    return this;
  }
  /**
   * Read an actor’s snapshot synchronously.
   *
   * @remarks
   * The snapshot represent an actor's last emitted value.
   *
   * When an actor receives an event, its internal state may change.
   * An actor may emit a snapshot when a state transition occurs.
   *
   * Note that some actors, such as callback actors generated with `fromCallback`, will not emit snapshots.
   *
   * @see {@link Actor.subscribe} to subscribe to an actor’s snapshot values.
   * @see {@link Actor.getPersistedSnapshot} to persist the internal state of an actor (which is more than just a snapshot).
   */
  getSnapshot() {
    return this._snapshot;
  }
}
function z(n, t) {
  return new Oe(n, t);
}
function Me(n, t, e, s, {
  sendId: i
}) {
  const r = typeof i == "function" ? i(e, s) : i;
  return [t, r];
}
function Te(n, t) {
  n.defer(() => {
    n.system.scheduler.cancel(n.self, t);
  });
}
function zt(n) {
  function t(e, s) {
  }
  return t.type = "xstate.cancel", t.sendId = n, t.resolve = Me, t.execute = Te, t;
}
function Ie(n, t, e, s, {
  id: i,
  systemId: r,
  src: o,
  input: c,
  syncSnapshot: h
}) {
  const a = typeof o == "string" ? ht(t.machine, o) : o, l = typeof i == "function" ? i(e) : i;
  let d;
  return a && (d = z(a, {
    id: l,
    src: o,
    parent: n == null ? void 0 : n.self,
    syncSnapshot: h,
    systemId: r,
    input: typeof c == "function" ? c({
      context: t.context,
      event: e.event,
      self: n == null ? void 0 : n.self
    }) : c
  })), [k(t, {
    children: {
      ...t.children,
      [l]: d
    }
  }), {
    id: i,
    actorRef: d
  }];
}
function De(n, {
  id: t,
  actorRef: e
}) {
  e && n.defer(() => {
    e._processingStatus !== v.Stopped && e.start();
  });
}
function Pt(...[n, {
  id: t,
  systemId: e,
  input: s,
  syncSnapshot: i = !1
} = {}]) {
  function r(o, c) {
  }
  return r.type = "snapshot.spawnChild", r.id = t, r.systemId = e, r.src = n, r.input = s, r.syncSnapshot = i, r.resolve = Ie, r.execute = De, r;
}
function Ce(n, t, e, s, {
  actorRef: i
}) {
  const r = typeof i == "function" ? i(e, s) : i, o = typeof r == "string" ? t.children[r] : r;
  let c = t.children;
  return o && (c = {
    ...c
  }, delete c[o.id]), [k(t, {
    children: c
  }), o];
}
function ke(n, t) {
  if (t) {
    if (n.system._unregister(t), t._processingStatus !== v.Running) {
      n.stopChild(t);
      return;
    }
    n.defer(() => {
      n.stopChild(t);
    });
  }
}
function lt(n) {
  function t(e, s) {
  }
  return t.type = "xstate.stopChild", t.actorRef = n, t.resolve = Ce, t.execute = ke, t;
}
function K(n, t, e, s) {
  const {
    machine: i
  } = s, r = typeof n == "function", o = r ? n : i.implementations.guards[typeof n == "string" ? n : n.type];
  if (!r && !o)
    throw new Error(`Guard '${typeof n == "string" ? n : n.type}' is not implemented.'.`);
  if (typeof o != "function")
    return K(o, t, e, s);
  const c = {
    context: t,
    event: e
  }, h = r || typeof n == "string" ? void 0 : "params" in n ? typeof n.params == "function" ? n.params({
    context: t,
    event: e
  }) : n.params : void 0;
  return "check" in o ? o.check(
    s,
    c,
    o
    // this holds all params
  ) : o(c, h);
}
const dt = (n) => n.type === "atomic" || n.type === "final";
function W(n) {
  return Object.values(n.states).filter((t) => t.type !== "history");
}
function P(n, t) {
  const e = [];
  if (t === n)
    return e;
  let s = n.parent;
  for (; s && s !== t; )
    e.push(s), s = s.parent;
  return e;
}
function N(n) {
  const t = new Set(n), e = Lt(t);
  for (const s of t)
    if (s.type === "compound" && (!e.get(s) || !e.get(s).length))
      xt(s).forEach((i) => t.add(i));
    else if (s.type === "parallel") {
      for (const i of W(s))
        if (i.type !== "history" && !t.has(i)) {
          const r = xt(i);
          for (const o of r)
            t.add(o);
        }
    }
  for (const s of t) {
    let i = s.parent;
    for (; i; )
      t.add(i), i = i.parent;
  }
  return t;
}
function Xt(n, t) {
  const e = t.get(n);
  if (!e)
    return {};
  if (n.type === "compound") {
    const i = e[0];
    if (i) {
      if (dt(i))
        return i.key;
    } else
      return {};
  }
  const s = {};
  for (const i of e)
    s[i.key] = Xt(i, t);
  return s;
}
function Lt(n) {
  const t = /* @__PURE__ */ new Map();
  for (const e of n)
    t.has(e) || t.set(e, []), e.parent && (t.has(e.parent) || t.set(e.parent, []), t.get(e.parent).push(e));
  return t;
}
function Nt(n, t) {
  const e = N(t);
  return Xt(n, Lt(e));
}
function ut(n, t) {
  return t.type === "compound" ? W(t).some((e) => e.type === "final" && n.has(e)) : t.type === "parallel" ? W(t).every((e) => ut(n, e)) : t.type === "final";
}
const q = (n) => n[0] === me;
function $e(n, t) {
  return n.transitions.get(t) || [...n.transitions.keys()].filter((s) => {
    if (s === ge)
      return !0;
    if (!s.endsWith(".*"))
      return !1;
    const i = s.split("."), r = t.split(".");
    for (let o = 0; o < i.length; o++) {
      const c = i[o], h = r[o];
      if (c === "*")
        return o === i.length - 1;
      if (c !== h)
        return !1;
    }
    return !0;
  }).sort((s, i) => i.length - s.length).flatMap((s) => n.transitions.get(s));
}
function Re(n) {
  const t = n.config.after;
  if (!t)
    return [];
  const e = (i, r) => {
    const o = ve(i, n.id), c = o.type;
    return n.entry.push(Zt(o, {
      id: c,
      delay: i
    })), n.exit.push(zt(c)), c;
  };
  return Object.keys(t).flatMap((i, r) => {
    const o = t[i], c = typeof o == "string" ? {
      target: o
    } : o, h = Number.isNaN(+i) ? i : +i, a = e(h);
    return O(c).map((l) => ({
      ...l,
      event: a,
      delay: h
    }));
  }).map((i) => {
    const {
      delay: r
    } = i;
    return {
      ...I(n, i.event, i),
      delay: r
    };
  });
}
function I(n, t, e) {
  const s = Ut(e.target), i = e.reenter ?? !1, r = Ye(n, s), o = {
    ...e,
    actions: O(e.actions),
    guard: e.guard,
    target: r,
    source: n,
    reenter: i,
    eventType: t,
    toJSON: () => ({
      ...o,
      source: `#${n.id}`,
      target: r ? r.map((c) => `#${c.id}`) : void 0
    })
  };
  return o;
}
function je(n) {
  const t = /* @__PURE__ */ new Map();
  if (n.config.on)
    for (const e of Object.keys(n.config.on)) {
      if (e === Ct)
        throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
      const s = n.config.on[e];
      t.set(e, R(s).map((i) => I(n, e, i)));
    }
  if (n.config.onDone) {
    const e = `xstate.done.state.${n.id}`;
    t.set(e, R(n.config.onDone).map((s) => I(n, e, s)));
  }
  for (const e of n.invoke) {
    if (e.onDone) {
      const s = `xstate.done.actor.${e.id}`;
      t.set(s, R(e.onDone).map((i) => I(n, s, i)));
    }
    if (e.onError) {
      const s = `xstate.error.actor.${e.id}`;
      t.set(s, R(e.onError).map((i) => I(n, s, i)));
    }
    if (e.onSnapshot) {
      const s = `xstate.snapshot.${e.id}`;
      t.set(s, R(e.onSnapshot).map((i) => I(n, s, i)));
    }
  }
  for (const e of n.after) {
    let s = t.get(e.eventType);
    s || (s = [], t.set(e.eventType, s)), s.push(e);
  }
  return t;
}
function We(n, t) {
  const e = typeof t == "string" ? n.states[t] : t ? n.states[t.target] : void 0;
  if (!e && t)
    throw new Error(`Initial state node "${t}" not found on parent state node #${n.id}`);
  const s = {
    source: n,
    actions: !t || typeof t == "string" ? [] : O(t.actions),
    eventType: null,
    reenter: !1,
    target: e ? [e] : [],
    toJSON: () => ({
      ...s,
      source: `#${n.id}`,
      target: e ? [`#${e.id}`] : []
    })
  };
  return s;
}
function Ye(n, t) {
  if (t !== void 0)
    return t.map((e) => {
      if (typeof e != "string")
        return e;
      if (q(e))
        return n.machine.getStateNodeById(e);
      const s = e[0] === V;
      if (s && !n.parent)
        return F(n, e.slice(1));
      const i = s ? n.key + e : e;
      if (n.parent)
        try {
          return F(n.parent, i);
        } catch (r) {
          throw new Error(`Invalid transition definition for state node '${n.id}':
${r.message}`);
        }
      else
        throw new Error(`Invalid target: "${e}" is not a valid target from the root node. Did you mean ".${e}"?`);
    });
}
function Ft(n) {
  const t = Ut(n.config.target);
  return t ? {
    target: t.map((e) => typeof e == "string" ? F(n.parent, e) : e)
  } : n.parent.initial;
}
function C(n) {
  return n.type === "history";
}
function xt(n) {
  const t = Bt(n);
  for (const e of t)
    for (const s of P(e, n))
      t.add(s);
  return t;
}
function Bt(n) {
  const t = /* @__PURE__ */ new Set();
  function e(s) {
    if (!t.has(s)) {
      if (t.add(s), s.type === "compound")
        e(s.initial.target[0]);
      else if (s.type === "parallel")
        for (const i of W(s))
          e(i);
    }
  }
  return e(n), t;
}
function Y(n, t) {
  if (q(t))
    return n.machine.getStateNodeById(t);
  if (!n.states)
    throw new Error(`Unable to retrieve child state '${t}' from '${n.id}'; no child states exist.`);
  const e = n.states[t];
  if (!e)
    throw new Error(`Child state '${t}' does not exist on '${n.id}'`);
  return e;
}
function F(n, t) {
  if (typeof t == "string" && q(t))
    try {
      return n.machine.getStateNodeById(t);
    } catch {
    }
  const e = Wt(t).slice();
  let s = n;
  for (; e.length; ) {
    const i = e.shift();
    if (!i.length)
      break;
    s = Y(s, i);
  }
  return s;
}
function B(n, t) {
  if (typeof t == "string")
    return [n, n.states[t]];
  const e = Object.keys(t), s = e.map((i) => Y(n, i)).filter(Boolean);
  return [n.machine.root, n].concat(s, e.reduce((i, r) => {
    const o = Y(n, r);
    if (!o)
      return i;
    const c = B(o, t[r]);
    return i.concat(c);
  }, []));
}
function He(n, t, e, s) {
  const r = Y(n, t).next(e, s);
  return !r || !r.length ? n.next(e, s) : r;
}
function Ue(n, t, e, s) {
  const i = Object.keys(t), r = Y(n, i[0]), o = ft(r, t[i[0]], e, s);
  return !o || !o.length ? n.next(e, s) : o;
}
function ze(n, t, e, s) {
  const i = [];
  for (const r of Object.keys(t)) {
    const o = t[r];
    if (!o)
      continue;
    const c = Y(n, r), h = ft(c, o, e, s);
    h && i.push(...h);
  }
  return i.length ? i : n.next(e, s);
}
function ft(n, t, e, s) {
  return typeof t == "string" ? He(n, t, e, s) : Object.keys(t).length === 1 ? Ue(n, t, e, s) : ze(n, t, e, s);
}
function Pe(n) {
  return Object.keys(n.states).map((t) => n.states[t]).filter((t) => t.type === "history");
}
function M(n, t) {
  let e = n;
  for (; e.parent && e.parent !== t; )
    e = e.parent;
  return e.parent === t;
}
function Xe(n, t) {
  const e = new Set(n), s = new Set(t);
  for (const i of e)
    if (s.has(i))
      return !0;
  for (const i of s)
    if (e.has(i))
      return !0;
  return !1;
}
function Jt(n, t, e) {
  const s = /* @__PURE__ */ new Set();
  for (const i of n) {
    let r = !1;
    const o = /* @__PURE__ */ new Set();
    for (const c of s)
      if (Xe(nt([i], t, e), nt([c], t, e)))
        if (M(i.source, c.source))
          o.add(c);
        else {
          r = !0;
          break;
        }
    if (!r) {
      for (const c of o)
        s.delete(c);
      s.add(i);
    }
  }
  return Array.from(s);
}
function Le(n) {
  const [t, ...e] = n;
  for (const s of P(t, void 0))
    if (e.every((i) => M(i, s)))
      return s;
}
function pt(n, t) {
  if (!n.target)
    return [];
  const e = /* @__PURE__ */ new Set();
  for (const s of n.target)
    if (C(s))
      if (t[s.id])
        for (const i of t[s.id])
          e.add(i);
      else
        for (const i of pt(Ft(s), t))
          e.add(i);
    else
      e.add(s);
  return [...e];
}
function Vt(n, t) {
  const e = pt(n, t);
  if (!e)
    return;
  if (!n.reenter && e.every((i) => i === n.source || M(i, n.source)))
    return n.source;
  const s = Le(e.concat(n.source));
  if (s)
    return s;
  if (!n.reenter)
    return n.source.machine.root;
}
function nt(n, t, e) {
  var i;
  const s = /* @__PURE__ */ new Set();
  for (const r of n)
    if ((i = r.target) != null && i.length) {
      const o = Vt(r, e);
      r.reenter && r.source === o && s.add(o);
      for (const c of t)
        M(c, o) && s.add(c);
    }
  return [...s];
}
function Ne(n, t) {
  if (n.length !== t.size)
    return !1;
  for (const e of n)
    if (!t.has(e))
      return !1;
  return !0;
}
function st(n, t, e, s, i, r) {
  if (!n.length)
    return t;
  const o = new Set(t._nodes);
  let c = t.historyValue;
  const h = Jt(n, o, c);
  let a = t;
  i || ([a, c] = Ve(a, s, e, h, o, c, r)), a = H(a, s, e, h.flatMap((d) => d.actions), r), a = Be(a, s, e, h, o, r, c, i);
  const l = [...o];
  a.status === "done" && (a = H(a, s, e, l.sort((d, u) => u.order - d.order).flatMap((d) => d.exit), r));
  try {
    return c === t.historyValue && Ne(t._nodes, o) ? a : k(a, {
      _nodes: l,
      historyValue: c
    });
  } catch (d) {
    throw d;
  }
}
function Fe(n, t, e, s, i) {
  if (!s.output)
    return;
  const r = tt(i.id, i.output && i.parent ? et(i.output, n.context, t, e.self) : void 0);
  return et(s.output, n.context, r, e.self);
}
function Be(n, t, e, s, i, r, o, c) {
  let h = n;
  const a = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
  Je(s, o, l, a), c && l.add(n.machine.root);
  const d = /* @__PURE__ */ new Set();
  for (const u of [...a].sort((f, p) => f.order - p.order)) {
    i.add(u);
    const f = [];
    f.push(...u.entry);
    for (const p of u.invoke)
      f.push(Pt(p.src, {
        ...p,
        syncSnapshot: !!p.onSnapshot
      }));
    if (l.has(u)) {
      const p = u.initial.actions;
      f.push(...p);
    }
    if (h = H(h, t, e, f, r, u.invoke.map((p) => p.id)), u.type === "final") {
      const p = u.parent;
      let m = (p == null ? void 0 : p.type) === "parallel" ? p : p == null ? void 0 : p.parent, y = m || u;
      for ((p == null ? void 0 : p.type) === "compound" && r.push(tt(p.id, u.output ? et(u.output, h.context, t, e.self) : void 0)); (m == null ? void 0 : m.type) === "parallel" && !d.has(m) && ut(i, m); )
        d.add(m), r.push(tt(m.id)), y = m, m = m.parent;
      if (m)
        continue;
      h = k(h, {
        status: "done",
        output: Fe(h, t, e, h.machine.root, y)
      });
    }
  }
  return h;
}
function Je(n, t, e, s) {
  for (const i of n) {
    const r = Vt(i, t);
    for (const c of i.target || [])
      !C(c) && // if the target is different than the source then it will *definitely* be entered
      (i.source !== c || // we know that the domain can't lie within the source
      // if it's different than the source then it's outside of it and it means that the target has to be entered as well
      i.source !== r || // reentering transitions always enter the target, even if it's the source itself
      i.reenter) && (s.add(c), e.add(c)), j(c, t, e, s);
    const o = pt(i, t);
    for (const c of o) {
      const h = P(c, r);
      (r == null ? void 0 : r.type) === "parallel" && h.push(r), Kt(s, t, e, h, !i.source.parent && i.reenter ? void 0 : r);
    }
  }
}
function j(n, t, e, s) {
  var i;
  if (C(n))
    if (t[n.id]) {
      const r = t[n.id];
      for (const o of r)
        s.add(o), j(o, t, e, s);
      for (const o of r)
        G(o, n.parent, s, t, e);
    } else {
      const r = Ft(n);
      for (const o of r.target)
        s.add(o), r === ((i = n.parent) == null ? void 0 : i.initial) && e.add(n.parent), j(o, t, e, s);
      for (const o of r.target)
        G(o, n.parent, s, t, e);
    }
  else if (n.type === "compound") {
    const [r] = n.initial.target;
    C(r) || (s.add(r), e.add(r)), j(r, t, e, s), G(r, n, s, t, e);
  } else if (n.type === "parallel")
    for (const r of W(n).filter((o) => !C(o)))
      [...s].some((o) => M(o, r)) || (C(r) || (s.add(r), e.add(r)), j(r, t, e, s));
}
function Kt(n, t, e, s, i) {
  for (const r of s)
    if ((!i || M(r, i)) && n.add(r), r.type === "parallel")
      for (const o of W(r).filter((c) => !C(c)))
        [...n].some((c) => M(c, o)) || (n.add(o), j(o, t, e, n));
}
function G(n, t, e, s, i) {
  Kt(e, s, i, P(n, t));
}
function Ve(n, t, e, s, i, r, o) {
  let c = n;
  const h = nt(s, i, r);
  h.sort((l, d) => d.order - l.order);
  let a;
  for (const l of h)
    for (const d of Pe(l)) {
      let u;
      d.history === "deep" ? u = (f) => dt(f) && M(f, l) : u = (f) => f.parent === l, a ?? (a = {
        ...r
      }), a[d.id] = Array.from(i).filter(u);
    }
  for (const l of h)
    c = H(c, t, e, [...l.exit, ...l.invoke.map((d) => lt(d.id))], o), i.delete(l);
  return [c, a || r];
}
function qt(n, t, e, s, i, r) {
  const {
    machine: o
  } = n;
  let c = n;
  for (const h of s) {
    const a = typeof h == "function", l = a ? h : (
      // the existing type of `.actions` assumes non-nullable `TExpressionAction`
      // it's fine to cast this here to get a common type and lack of errors in the rest of the code
      // our logic below makes sure that we call those 2 "variants" correctly
      o.implementations.actions[typeof h == "string" ? h : h.type]
    );
    if (!l)
      continue;
    const d = {
      context: c.context,
      event: t,
      self: e == null ? void 0 : e.self,
      system: e == null ? void 0 : e.system
    }, u = a || typeof h == "string" ? void 0 : "params" in h ? typeof h.params == "function" ? h.params({
      context: c.context,
      event: t
    }) : h.params : void 0;
    if (!("resolve" in l)) {
      (e == null ? void 0 : e.self._processingStatus) === v.Running ? l(d, u) : e == null || e.defer(() => {
        l(d, u);
      });
      continue;
    }
    const f = l, [p, m, y] = f.resolve(
      e,
      c,
      d,
      u,
      l,
      // this holds all params
      i
    );
    c = p, "retryResolve" in f && (r == null || r.push([f, m])), "execute" in f && ((e == null ? void 0 : e.self._processingStatus) === v.Running ? f.execute(e, m) : e == null || e.defer(f.execute.bind(null, e, m))), y && (c = qt(c, t, e, y, i, r));
  }
  return c;
}
function H(n, t, e, s, i, r) {
  const o = r ? [] : void 0, c = qt(n, t, e, s, {
    internalQueue: i,
    deferredActorIds: r
  }, o);
  return o == null || o.forEach(([h, a]) => {
    h.retryResolve(e, c, a);
  }), c;
}
function Z(n, t, e, s = []) {
  let i = n;
  const r = [];
  if (t.type === Q)
    return i = k(Et(i, t, e), {
      status: "stopped"
    }), r.push(i), {
      snapshot: i,
      microstates: r
    };
  let o = t;
  if (o.type !== kt) {
    const h = o, a = Ee(h), l = At(h, i);
    if (a && !l.length)
      return i = k(n, {
        status: "error",
        error: h.error
      }), r.push(i), {
        snapshot: i,
        microstates: r
      };
    i = st(l, n, e, o, !1, s), r.push(i);
  }
  let c = !0;
  for (; i.status === "active"; ) {
    let h = c ? Ke(i, o) : [];
    const a = h.length ? i : void 0;
    if (!h.length) {
      if (!s.length)
        break;
      o = s.shift(), h = At(o, i);
    }
    i = st(h, i, e, o, !1, s), c = i !== a, r.push(i);
  }
  return i.status !== "active" && Et(i, o, e), {
    snapshot: i,
    microstates: r
  };
}
function Et(n, t, e) {
  return H(n, t, e, Object.values(n.children).map((s) => lt(s)), []);
}
function At(n, t) {
  return t.machine.getTransitionData(t, n);
}
function Ke(n, t) {
  const e = /* @__PURE__ */ new Set(), s = n._nodes.filter(dt);
  for (const i of s)
    t:
      for (const r of [i].concat(P(i, void 0)))
        if (r.always) {
          for (const o of r.always)
            if (o.guard === void 0 || K(o.guard, n.context, t, n)) {
              e.add(o);
              break t;
            }
        }
  return Jt(Array.from(e), new Set(n._nodes), n.historyValue);
}
function qe(n, t) {
  const e = N(B(n, t));
  return Nt(n, [...e]);
}
function Ge(n) {
  return !!n && typeof n == "object" && "machine" in n && "value" in n;
}
const Ze = function(t) {
  return jt(t, this.value);
}, Qe = function(t) {
  return this.tags.has(t);
}, tn = function(t) {
  const e = this.machine.getTransitionData(this, t);
  return !!(e != null && e.length) && // Check that at least one transition is not forbidden
  e.some((s) => s.target !== void 0 || s.actions.length);
}, en = function() {
  const {
    _nodes: t,
    tags: e,
    machine: s,
    getMeta: i,
    toJSON: r,
    can: o,
    hasTag: c,
    matches: h,
    ...a
  } = this;
  return {
    ...a,
    tags: Array.from(e)
  };
}, nn = function() {
  return this._nodes.reduce((t, e) => (e.meta !== void 0 && (t[e.id] = e.meta), t), {});
};
function L(n, t) {
  return {
    status: n.status,
    output: n.output,
    error: n.error,
    machine: t,
    context: n.context,
    _nodes: n._nodes,
    value: Nt(t.root, n._nodes),
    tags: new Set(n._nodes.flatMap((e) => e.tags)),
    children: n.children,
    historyValue: n.historyValue || {},
    matches: Ze,
    hasTag: Qe,
    can: tn,
    getMeta: nn,
    toJSON: en
  };
}
function k(n, t = {}) {
  return L({
    ...n,
    ...t
  }, n.machine);
}
function sn(n, t) {
  const {
    _nodes: e,
    tags: s,
    machine: i,
    children: r,
    context: o,
    can: c,
    hasTag: h,
    matches: a,
    getMeta: l,
    toJSON: d,
    ...u
  } = n, f = {};
  for (const m in r) {
    const y = r[m];
    f[m] = {
      snapshot: y.getPersistedSnapshot(t),
      src: y.src,
      systemId: y._systemId,
      syncSnapshot: y._syncSnapshot
    };
  }
  return {
    ...u,
    context: Gt(o),
    children: f
  };
}
function Gt(n) {
  let t;
  for (const e in n) {
    const s = n[e];
    if (s && typeof s == "object")
      if ("sessionId" in s && "send" in s && "ref" in s)
        t ?? (t = Array.isArray(n) ? n.slice() : {
          ...n
        }), t[e] = {
          xstate$$type: at,
          id: s.id
        };
      else {
        const i = Gt(s);
        i !== s && (t ?? (t = Array.isArray(n) ? n.slice() : {
          ...n
        }), t[e] = i);
      }
  }
  return t ?? n;
}
function rn(n, t, e, s, {
  event: i,
  id: r,
  delay: o
}, {
  internalQueue: c
}) {
  const h = t.machine.implementations.delays;
  if (typeof i == "string")
    throw new Error(`Only event objects may be used with raise; use raise({ type: "${i}" }) instead`);
  const a = typeof i == "function" ? i(e, s) : i;
  let l;
  if (typeof o == "string") {
    const d = h && h[o];
    l = typeof d == "function" ? d(e, s) : d;
  } else
    l = typeof o == "function" ? o(e, s) : o;
  return typeof l != "number" && c.push(a), [t, {
    event: a,
    id: r,
    delay: l
  }];
}
function on(n, t) {
  const {
    event: e,
    delay: s,
    id: i
  } = t;
  if (typeof s == "number") {
    n.defer(() => {
      const r = n.self;
      n.system.scheduler.schedule(r, r, e, s, i);
    });
    return;
  }
}
function Zt(n, t) {
  function e(s, i) {
  }
  return e.type = "xstate.raise", e.event = n, e.id = t == null ? void 0 : t.id, e.delay = t == null ? void 0 : t.delay, e.resolve = rn, e.execute = on, e;
}
function cn(n, {
  machine: t,
  context: e
}, s, i) {
  const r = (o, c = {}) => {
    const {
      systemId: h,
      input: a
    } = c;
    if (typeof o == "string") {
      const l = ht(t, o);
      if (!l)
        throw new Error(`Actor logic '${o}' not implemented in machine '${t.id}'`);
      const d = z(l, {
        id: c.id,
        parent: n.self,
        syncSnapshot: c.syncSnapshot,
        input: typeof a == "function" ? a({
          context: e,
          event: s,
          self: n.self
        }) : a,
        src: o,
        systemId: h
      });
      return i[d.id] = d, d;
    } else
      return z(o, {
        id: c.id,
        parent: n.self,
        syncSnapshot: c.syncSnapshot,
        input: c.input,
        src: o,
        systemId: h
      });
  };
  return (o, c) => {
    const h = r(o, c);
    return i[h.id] = h, n.defer(() => {
      h._processingStatus !== v.Stopped && h.start();
    }), h;
  };
}
function hn(n, t, e, s, {
  assignment: i
}) {
  if (!t.context)
    throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
  const r = {}, o = {
    context: t.context,
    event: e.event,
    spawn: cn(n, t, e.event, r),
    self: n == null ? void 0 : n.self,
    system: n == null ? void 0 : n.system
  };
  let c = {};
  if (typeof i == "function")
    c = i(o, s);
  else
    for (const a of Object.keys(i)) {
      const l = i[a];
      c[a] = typeof l == "function" ? l(o, s) : l;
    }
  const h = Object.assign({}, t.context, c);
  return [k(t, {
    context: h,
    children: Object.keys(r).length ? {
      ...t.children,
      ...r
    } : t.children
  })];
}
function E(n) {
  function t(e, s) {
  }
  return t.type = "xstate.assign", t.assignment = n, t.resolve = hn, t;
}
let Ot = /* @__PURE__ */ function(n) {
  return n.Parent = "#_parent", n.Internal = "#_internal", n;
}({});
function an(n, t, e, s, {
  to: i,
  event: r,
  id: o,
  delay: c
}, h) {
  var p;
  const a = t.machine.implementations.delays;
  if (typeof r == "string")
    throw new Error(`Only event objects may be used with sendTo; use sendTo({ type: "${r}" }) instead`);
  const l = typeof r == "function" ? r(e, s) : r;
  let d;
  if (typeof c == "string") {
    const m = a && a[c];
    d = typeof m == "function" ? m(e, s) : m;
  } else
    d = typeof c == "function" ? c(e, s) : c;
  const u = typeof i == "function" ? i(e, s) : i;
  let f;
  if (typeof u == "string") {
    if (u === Ot.Parent ? f = n == null ? void 0 : n.self._parent : u === Ot.Internal ? f = n == null ? void 0 : n.self : u.startsWith("#_") ? f = t.children[u.slice(2)] : f = (p = h.deferredActorIds) != null && p.includes(u) ? u : t.children[u], !f)
      throw new Error(`Unable to send event to actor '${u}' from machine '${t.machine.id}'.`);
  } else
    f = u || (n == null ? void 0 : n.self);
  return [t, {
    to: f,
    event: l,
    id: o,
    delay: d
  }];
}
function ln(n, t, e) {
  typeof e.to == "string" && (e.to = t.children[e.to]);
}
function dn(n, t) {
  n.defer(() => {
    const {
      to: e,
      event: s,
      delay: i,
      id: r
    } = t;
    if (typeof i == "number") {
      n.system.scheduler.schedule(n.self, e, s, i, r);
      return;
    }
    n.system._relay(
      n.self,
      // at this point, in a deferred task, it should already be mutated by retryResolveSendTo
      // if it initially started as a string
      e,
      s.type === ye ? $t(n.self.id, s.data) : s
    );
  });
}
function un(n, t, e) {
  function s(i, r) {
  }
  return s.type = "xsnapshot.sendTo", s.to = n, s.event = t, s.id = e == null ? void 0 : e.id, s.delay = e == null ? void 0 : e.delay, s.resolve = an, s.retryResolve = ln, s.execute = dn, s;
}
function fn(n, t, e, s, {
  collect: i
}) {
  const r = [], o = function(h) {
    r.push(h);
  };
  return o.assign = (...c) => {
    r.push(E(...c));
  }, o.cancel = (...c) => {
    r.push(zt(...c));
  }, o.raise = (...c) => {
    r.push(Zt(...c));
  }, o.sendTo = (...c) => {
    r.push(un(...c));
  }, o.spawnChild = (...c) => {
    r.push(Pt(...c));
  }, o.stopChild = (...c) => {
    r.push(lt(...c));
  }, i({
    context: e.context,
    event: e.event,
    enqueue: o,
    check: (c) => K(c, t.context, e.event, t)
  }), [t, void 0, r];
}
function pn(n) {
  function t(e, s) {
  }
  return t.type = "xstate.enqueueActions", t.collect = n, t.resolve = fn, t;
}
const Mt = /* @__PURE__ */ new WeakMap();
function $(n, t, e) {
  let s = Mt.get(n);
  return s ? t in s || (s[t] = e()) : (s = {
    [t]: e()
  }, Mt.set(n, s)), s[t];
}
const mn = {}, U = (n) => typeof n == "string" ? {
  type: n
} : typeof n == "function" ? "resolve" in n ? {
  type: n.type
} : {
  type: n.name
} : n;
class mt {
  constructor(t, e) {
    if (this.config = t, this.key = void 0, this.id = void 0, this.type = void 0, this.path = void 0, this.states = void 0, this.history = void 0, this.entry = void 0, this.exit = void 0, this.parent = void 0, this.machine = void 0, this.meta = void 0, this.output = void 0, this.order = -1, this.description = void 0, this.tags = [], this.transitions = void 0, this.always = void 0, this.parent = e._parent, this.key = e._key, this.machine = e._machine, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.id = this.config.id || [this.machine.id, ...this.path].join(V), this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic"), this.description = this.config.description, this.order = this.machine.idMap.size, this.machine.idMap.set(this.id, this), this.states = this.config.states ? wt(this.config.states, (s, i) => new mt(s, {
      _parent: this,
      _key: i,
      _machine: this.machine
    })) : mn, this.type === "compound" && !this.config.initial)
      throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
    this.history = this.config.history === !0 ? "shallow" : this.config.history || !1, this.entry = O(this.config.entry).slice(), this.exit = O(this.config.exit).slice(), this.meta = this.config.meta, this.output = this.type === "final" || !this.parent ? this.config.output : void 0, this.tags = O(t.tags).slice();
  }
  _initialize() {
    this.transitions = je(this), this.config.always && (this.always = R(this.config.always).map((t) => I(this, Ct, t))), Object.keys(this.states).forEach((t) => {
      this.states[t]._initialize();
    });
  }
  /**
   * The well-structured state node definition.
   */
  get definition() {
    return {
      id: this.id,
      key: this.key,
      version: this.machine.version,
      type: this.type,
      initial: this.initial ? {
        target: this.initial.target,
        source: this,
        actions: this.initial.actions.map(U),
        eventType: null,
        reenter: !1,
        toJSON: () => ({
          target: this.initial.target.map((t) => `#${t.id}`),
          source: `#${this.id}`,
          actions: this.initial.actions.map(U),
          eventType: null
        })
      } : void 0,
      history: this.history,
      states: wt(this.states, (t) => t.definition),
      on: this.on,
      transitions: [...this.transitions.values()].flat().map((t) => ({
        ...t,
        actions: t.actions.map(U)
      })),
      entry: this.entry.map(U),
      exit: this.exit.map(U),
      meta: this.meta,
      order: this.order || -1,
      output: this.output,
      invoke: this.invoke,
      description: this.description,
      tags: this.tags
    };
  }
  toJSON() {
    return this.definition;
  }
  /**
   * The logic invoked as actors by this state node.
   */
  get invoke() {
    return $(this, "invoke", () => O(this.config.invoke).map((t, e) => {
      const {
        src: s,
        systemId: i
      } = t, r = t.id ?? bt(this.id, e), o = typeof s == "string" ? s : `xstate.invoke.${bt(this.id, e)}`;
      return {
        ...t,
        src: o,
        id: r,
        systemId: i,
        toJSON() {
          const {
            onDone: c,
            onError: h,
            ...a
          } = t;
          return {
            ...a,
            type: "xstate.invoke",
            src: o,
            id: r
          };
        }
      };
    }));
  }
  /**
   * The mapping of events to transitions.
   */
  get on() {
    return $(this, "on", () => [...this.transitions].flatMap(([e, s]) => s.map((i) => [e, i])).reduce((e, [s, i]) => (e[s] = e[s] || [], e[s].push(i), e), {}));
  }
  get after() {
    return $(this, "delayedTransitions", () => Re(this));
  }
  get initial() {
    return $(this, "initial", () => We(this, this.config.initial));
  }
  next(t, e) {
    const s = e.type, i = [];
    let r;
    const o = $(this, `candidates-${s}`, () => $e(this, s));
    for (const c of o) {
      const {
        guard: h
      } = c, a = t.context;
      let l = !1;
      try {
        l = !h || K(h, a, e, t);
      } catch (d) {
        const u = typeof h == "string" ? h : typeof h == "object" ? h.type : void 0;
        throw new Error(`Unable to evaluate guard ${u ? `'${u}' ` : ""}in transition for event '${s}' in state node '${this.id}':
${d.message}`);
      }
      if (l) {
        i.push(...c.actions), r = c;
        break;
      }
    }
    return r ? [r] : void 0;
  }
  /**
   * All the event types accepted by this state node and its descendants.
   */
  get events() {
    return $(this, "events", () => {
      const {
        states: t
      } = this, e = new Set(this.ownEvents);
      if (t)
        for (const s of Object.keys(t)) {
          const i = t[s];
          if (i.states)
            for (const r of i.events)
              e.add(`${r}`);
        }
      return Array.from(e);
    });
  }
  /**
   * All the events that have transitions directly from this state node.
   *
   * Excludes any inert events.
   */
  get ownEvents() {
    const t = new Set([...this.transitions.keys()].filter((e) => this.transitions.get(e).some((s) => !(!s.target && !s.actions.length && !s.reenter))));
    return Array.from(t);
  }
}
const gn = "#";
class gt {
  constructor(t, e) {
    this.config = t, this.version = void 0, this.implementations = void 0, this.__xstatenode = !0, this.idMap = /* @__PURE__ */ new Map(), this.root = void 0, this.id = void 0, this.states = void 0, this.events = void 0, this.__TResolvedTypesMeta = void 0, this.id = t.id || "(machine)", this.implementations = {
      actors: (e == null ? void 0 : e.actors) ?? {},
      actions: (e == null ? void 0 : e.actions) ?? {},
      delays: (e == null ? void 0 : e.delays) ?? {},
      guards: (e == null ? void 0 : e.guards) ?? {}
    }, this.version = this.config.version, this.transition = this.transition.bind(this), this.getInitialSnapshot = this.getInitialSnapshot.bind(this), this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this), this.restoreSnapshot = this.restoreSnapshot.bind(this), this.start = this.start.bind(this), this.root = new mt(t, {
      _key: this.id,
      _machine: this
    }), this.root._initialize(), this.states = this.root.states, this.events = this.root.events;
  }
  /**
   * Clones this state machine with the provided implementations
   * and merges the `context` (if provided).
   *
   * @param implementations Options (`actions`, `guards`, `actors`, `delays`, `context`)
   *  to recursively merge with the existing options.
   *
   * @returns A new `StateMachine` instance with the provided implementations.
   */
  provide(t) {
    const {
      actions: e,
      guards: s,
      actors: i,
      delays: r
    } = this.implementations;
    return new gt(this.config, {
      actions: {
        ...e,
        ...t.actions
      },
      guards: {
        ...s,
        ...t.guards
      },
      actors: {
        ...i,
        ...t.actors
      },
      delays: {
        ...r,
        ...t.delays
      }
    });
  }
  resolveState(t) {
    const e = qe(this.root, t.value), s = N(B(this.root, e));
    return L({
      _nodes: [...s],
      context: t.context || {},
      children: {},
      status: ut(s, this.root) ? "done" : t.status || "active",
      output: t.output,
      error: t.error,
      historyValue: t.historyValue
    }, this);
  }
  /**
   * Determines the next snapshot given the current `snapshot` and received `event`.
   * Calculates a full macrostep from all microsteps.
   *
   * @param snapshot The current snapshot
   * @param event The received event
   */
  transition(t, e, s) {
    return Z(t, e, s).snapshot;
  }
  /**
   * Determines the next state given the current `state` and `event`.
   * Calculates a microstep.
   *
   * @param state The current state
   * @param event The received event
   */
  microstep(t, e, s) {
    return Z(t, e, s).microstates;
  }
  getTransitionData(t, e) {
    return ft(this.root, t.value, t, e) || [];
  }
  /**
   * The initial state _before_ evaluating any microsteps.
   * This "pre-initial" state is provided to initial actions executed in the initial state.
   */
  getPreInitialState(t, e, s) {
    const {
      context: i
    } = this.config, r = L({
      context: typeof i != "function" && i ? i : {},
      _nodes: [this.root],
      children: {},
      status: "active"
    }, this);
    return typeof i == "function" ? H(r, e, t, [E(({
      spawn: c,
      event: h
    }) => i({
      spawn: c,
      input: h.input
    }))], s) : r;
  }
  /**
   * Returns the initial `State` instance, with reference to `self` as an `ActorRef`.
   */
  getInitialSnapshot(t, e) {
    const s = Rt(e), i = [], r = this.getPreInitialState(t, s, i), o = st([{
      target: [...Bt(this.root)],
      source: this.root,
      reenter: !0,
      actions: [],
      eventType: null,
      toJSON: null
      // TODO: fix
    }], r, t, s, !0, i), {
      snapshot: c
    } = Z(o, s, t, i);
    return c;
  }
  start(t) {
    Object.values(t.children).forEach((e) => {
      e.getSnapshot().status === "active" && e.start();
    });
  }
  getStateNodeById(t) {
    const e = t.split(V), s = e.slice(1), i = q(e[0]) ? e[0].slice(gn.length) : e[0], r = this.idMap.get(i);
    if (!r)
      throw new Error(`Child state node '#${i}' does not exist on machine '${this.id}'`);
    return F(r, s);
  }
  get definition() {
    return this.root.definition;
  }
  toJSON() {
    return this.definition;
  }
  getPersistedSnapshot(t, e) {
    return sn(t, e);
  }
  restoreSnapshot(t, e) {
    const s = {}, i = t.children;
    Object.keys(i).forEach((h) => {
      const a = i[h], l = a.snapshot, d = a.src, u = typeof d == "string" ? ht(this, d) : d;
      if (!u)
        return;
      const f = z(u, {
        id: h,
        parent: e == null ? void 0 : e.self,
        syncSnapshot: a.syncSnapshot,
        snapshot: l,
        src: d,
        systemId: a.systemId
      });
      s[h] = f;
    });
    const r = L({
      ...t,
      children: s,
      _nodes: Array.from(N(B(this.root, t.value)))
    }, this);
    let o = /* @__PURE__ */ new Set();
    function c(h, a) {
      if (!o.has(h)) {
        o.add(h);
        for (let l in h) {
          const d = h[l];
          if (d && typeof d == "object") {
            if ("xstate$$type" in d && d.xstate$$type === at) {
              h[l] = a[d.id];
              continue;
            }
            c(d, a);
          }
        }
      }
    }
    return c(r.context, s), r;
  }
}
function yn(n, t) {
  return new gt(n, t);
}
const Qt = (n) => n != null;
class it extends T {
  // proxied points
  constructor(e, s) {
    super(e, _.createElementNS(D, "polygon"));
    g(this, "points", []);
    s && [s].flat().forEach((i) => this.addPoint(i.x, i.y));
  }
  updateElementPoints() {
    return this.element.setAttribute("points", this.points.map((e) => `${e.x},${e.y}`).join(" ")), this;
  }
  addPoint(e, s) {
    const i = { x: e, y: s }, r = ct(i, (o, c, h, a) => {
      var l, d;
      this._logWarnOnOpOnFrozen("Point moved on"), this.updateElementPoints(), o === "x" && ((l = a.handle) == null || l.setAttrX(c)), o === "y" && ((d = a.handle) == null || d.setAttrY(c));
    });
    return i.handle = new x(
      e,
      s,
      (o, c) => {
        r.x += o, r.y += c;
      },
      this.isFrozen
    ), this.editorOwner.registerComponentHandle(i.handle), this.points.push(r), this.updateElementPoints(), this;
  }
  moveLastPoint(e, s) {
    const i = this.points[this.points.length - 1];
    return [i.x, i.y] = [e, s], this;
  }
  freeze(e) {
    return this.isFrozen = e != null ? !!e : !0, this.getHandles().forEach((s) => s == null ? void 0 : s.freeze(e)), this;
  }
  // TODO: move by transform:translate instead?
  move(e, s) {
    return this.points.forEach((i) => {
      i.x += e, i.y += s;
    }), this;
  }
  isValid() {
    return this.points.length >= 3;
  }
  setHandlesVisibility(e) {
    return this.getHandles().forEach((s) => s.setVisible(e)), this;
  }
  setIsSelected(e) {
    return this._logWarnOnOpOnFrozen("Select/unselect performed on"), this.isSelected = e = e != null ? !!e : !0, this.setHandlesVisibility(e), this.style && w(
      this.element,
      e ? this.style.componentSelect.on : this.style.componentSelect.off
    ), this;
  }
  getHandles() {
    return this.points.map((e) => e.handle).filter(Qt);
  }
  setStyle(e) {
    return this.style = e, w(this.element, e.component), w(this.element, e.componentHover.off), w(this.element, e.componentSelect.off), ot(this.element, e.componentHover.off, e.componentHover.on), this;
  }
  export() {
    return this.points.map((e) => ({ x: e.x, y: e.y }));
  }
}
const vn = {
  rect: {
    on: {
      MT_DOWN: {
        actions: ["createRectangle", "selectUnfinished"],
        target: "#drawing.rect.mouseIsDown"
      }
    }
  },
  circle: {
    on: {
      MT_DOWN: {
        actions: ["createCircle", "selectUnfinished"],
        target: "#drawing.circle.mouseIsDown"
      }
    }
  },
  ellipse: {
    on: {
      MT_DOWN: {
        actions: ["createEllipse", "selectUnfinished"],
        target: "#drawing.ellipse.mouseIsDown"
      }
    }
  },
  polygon: {
    on: {
      MT_DOWN: {
        actions: ["createPolygon", "selectUnfinished"],
        target: "#drawing.polygon.mouseIsDown"
      }
    }
  }
}, _n = {
  rect: {
    initial: "mouseIsUp",
    states: {
      mouseIsDown: {
        on: {
          MT_UP: "#idle.drawMode.rect",
          // consider selection if mouse has not moved
          KEYDOWN_ESC: "#idle.drawMode.rect",
          MT_MOVE: {
            actions: "resizeUnfinished"
          }
        }
      },
      mouseIsUp: {}
    }
  },
  circle: {
    initial: "mouseIsUp",
    states: {
      mouseIsDown: {
        on: {
          MT_UP: "#idle.drawMode.circle",
          // consider selection if mouse has not moved
          KEYDOWN_ESC: "#idle.drawMode.circle",
          MT_MOVE: {
            actions: "resizeUnfinished"
          }
        }
      },
      mouseIsUp: {}
    }
  },
  ellipse: {
    initial: "mouseIsUp",
    states: {
      mouseIsDown: {
        on: {
          MT_UP: "#idle.drawMode.ellipse",
          // consider selection if mouse has not moved
          KEYDOWN_ESC: "#idle.drawMode.ellipse",
          MT_MOVE: {
            actions: "resizeUnfinished"
          }
        }
      },
      mouseIsUp: {}
    }
  },
  polygon: {
    on: {
      KEYDOWN_ESC: "#idle.drawMode.polygon"
    },
    initial: "mouseIsUp",
    states: {
      mouseIsDown: {
        on: {
          MT_UP: "mouseIsUp",
          MT_MOVE: {
            actions: "moveLastPoint"
          }
        }
      },
      mouseIsUp: {
        on: {
          MT_DOWN: [
            {
              guard: "isHandle",
              target: "#idle.drawMode.polygon"
            },
            {
              // else
              actions: "addPoint",
              target: "mouseIsDown"
            }
          ]
        }
      }
    }
  }
}, wn = (n) => yn(
  {
    context: {
      unfinishedComponent: void 0,
      mouseDownInSelectModeObject: void 0,
      _editor: n
    },
    on: {
      MODE_SELECT: ".idle.selectMode",
      MODE_DRAW_RECT: ".idle.drawMode.rect",
      MODE_DRAW_CIRCLE: ".idle.drawMode.circle",
      MODE_DRAW_ELLIPSE: ".idle.drawMode.ellipse",
      MODE_DRAW_POLYGON: ".idle.drawMode.polygon"
    },
    initial: "idle",
    states: {
      idle: {
        id: "idle",
        initial: "selectMode",
        states: {
          selectMode: {
            initial: "mouseIsUp",
            states: {
              mouseIsUp: {
                on: {
                  MT_DOWN: {
                    actions: [
                      "selectComponent",
                      "mouseDownInSelectModeAssign"
                    ],
                    target: "mouseIsDown"
                  },
                  KEYDOWN_ARROW: {
                    actions: "mouseDownInSelectModeObjectMove"
                  }
                }
              },
              mouseIsDown: {
                on: {
                  MT_UP: "mouseIsUp",
                  MT_MOVE: {
                    actions: "mouseDownInSelectModeObjectMove"
                  }
                }
              }
            },
            on: {
              KEYDOWN_ESC: {
                actions: ["unselectAll", "mouseDownInSelectModeUnassign"]
              },
              KEYDOWN_DEL: {
                actions: ["deleteComponent", "mouseDownInSelectModeUnassign"]
              },
              mouseDownInSelectModeUnassign: {
                actions: "mouseDownInSelectModeUnassign"
              }
            },
            entry: "selectModeEntry",
            exit: ["unselectAll", "mouseDownInSelectModeUnassign"]
          },
          drawMode: {
            initial: "polygon",
            states: vn,
            on: {
              KEYDOWN_ESC: "#idle.selectMode"
            }
          }
        }
      },
      drawing: {
        id: "drawing",
        initial: "polygon",
        states: _n,
        exit: pn(({ enqueue: t, check: e }) => {
          e("unfinishedIsValid") ? (t("unselectAll"), t("validComponentFinished")) : t("discardUnfinished");
        })
      }
    }
  },
  {
    actions: {
      createRectangle: E({
        unfinishedComponent: (t) => t.context._editor.createRectangle({
          x: t.event.offsetX,
          y: t.event.offsetY,
          width: 0,
          height: 0
        })
      }),
      createCircle: E({
        unfinishedComponent: (t) => t.context._editor.createCircle({
          x: t.event.offsetX,
          y: t.event.offsetY,
          width: 0,
          height: 0
        })
      }),
      createEllipse: E({
        unfinishedComponent: (t) => t.context._editor.createEllipse({
          x: t.event.offsetX,
          y: t.event.offsetY,
          width: 0,
          height: 0
        })
      }),
      createPolygon: E({
        unfinishedComponent: (t) => t.context._editor.createPolygon({
          x: t.event.offsetX,
          y: t.event.offsetY
        })
      }),
      discardUnfinished: (t) => {
        t.context.unfinishedComponent && t.context._editor.unregisterComponent(t.context.unfinishedComponent);
      },
      resizeUnfinished: (t) => {
        t.context.unfinishedComponent instanceof J && t.context.unfinishedComponent.resize(t.event.offsetX, t.event.offsetY);
      },
      selectUnfinished: (t) => {
        t.context._editor.selectComponent(t.context.unfinishedComponent);
      },
      validComponentFinished: (t) => {
        const e = t.context.unfinishedComponent;
        e && t.context._editor.componentDrawnHandler && t.context._editor.componentDrawnHandler(e, e.element.id);
      },
      // polygons only
      addPoint: (t) => {
        t.context.unfinishedComponent instanceof it && t.context.unfinishedComponent.addPoint(t.event.offsetX, t.event.offsetY), t.context._editor.selectComponent(t.context.unfinishedComponent);
      },
      // polygons only
      moveLastPoint: (t) => {
        t.context.unfinishedComponent instanceof it && t.context.unfinishedComponent.moveLastPoint(
          t.event.offsetX,
          t.event.offsetY
        );
      },
      mouseDownInSelectModeAssign: E({
        mouseDownInSelectModeObject: (t) => t.event.component
      }),
      mouseDownInSelectModeUnassign: E({
        mouseDownInSelectModeObject: void 0
      }),
      mouseDownInSelectModeObjectMove: (t) => {
        const e = t.context.mouseDownInSelectModeObject;
        e && e.move && e.move(t.event.movementX, t.event.movementY);
      },
      selectComponent: (t) => {
        t.context._editor.selectComponent(t.event.component);
      },
      deleteComponent: (t) => {
        const e = t.context.mouseDownInSelectModeObject;
        e && t.context._editor.unregisterComponent(e);
      },
      unselectAll: (t) => {
        t.context._editor.selectComponent(void 0);
      },
      selectModeEntry: (t) => {
        t.context._editor.selectModeHandler && t.context._editor.selectModeHandler();
      }
    },
    guards: {
      isHandle: (t) => t.event.component instanceof x,
      unfinishedIsValid: (t) => {
        var e;
        return !!((e = t.context.unfinishedComponent) != null && e.isValid());
      }
    }
  }
), Sn = (n) => z(wn(n));
class bn extends J {
  constructor(t, e, s, i = 0, r = 0) {
    super(
      "rect",
      {
        // move
        x: (o, c, h) => {
          super.element.setAttribute("x", String(h.width < 0 ? o + h.width : o));
        },
        // move
        y: (o, c, h) => {
          super.element.setAttribute("y", String(h.height < 0 ? o + h.height : o));
        },
        // resize
        width: (o, c, h) => {
          super.element.setAttribute("width", String(Math.abs(o))), super.element.setAttribute("x", String(o < 0 ? h.x + o : h.x));
        },
        // resize
        height: (o, c, h) => {
          super.element.setAttribute("height", String(Math.abs(o))), super.element.setAttribute("y", String(o < 0 ? h.y + o : h.y));
        }
      },
      t,
      e,
      s,
      i,
      r
    );
  }
}
class xn extends J {
  constructor(t, e, s, i = 0, r = 0) {
    super(
      "circle",
      {
        // move
        x: (o, c, h) => {
          super.element.setAttribute("cx", String(o + h.width / 2));
        },
        // move
        y: (o, c, h) => {
          super.element.setAttribute("cy", String(o + h.height / 2));
        },
        // resize
        width: (o, c, h) => {
          super.element.setAttribute(
            "r",
            String(Math.min(Math.abs(o), Math.abs(h.height)) / 2)
          ), super.element.setAttribute("cx", String(h.x + o / 2));
        },
        // resize
        height: (o, c, h) => {
          super.element.setAttribute(
            "r",
            String(Math.min(Math.abs(o), Math.abs(h.width)) / 2)
          ), super.element.setAttribute("cy", String(h.y + o / 2));
        }
      },
      t,
      e,
      s,
      i,
      r
    );
  }
}
class En extends J {
  constructor(t, e, s, i = 0, r = 0) {
    super(
      "ellipse",
      {
        // move
        x: (o, c, h) => {
          super.element.setAttribute("cx", String(o + h.width / 2));
        },
        // move
        y: (o, c, h) => {
          super.element.setAttribute("cy", String(o + h.height / 2));
        },
        // resize
        width: (o, c, h) => {
          super.element.setAttribute("rx", String(Math.abs(o) / 2)), super.element.setAttribute("cx", String(h.x + o / 2));
        },
        // resize
        height: (o, c, h) => {
          super.element.setAttribute("ry", String(Math.abs(o) / 2)), super.element.setAttribute("cy", String(h.y + o / 2));
        }
      },
      t,
      e,
      s,
      i,
      r
    );
  }
}
const Tt = (n) => {
  if (typeof n == "object" && n !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      const t = Object.getPrototypeOf(n);
      return t === Object.prototype || t === null;
    }
    return Object.prototype.toString.call(n) === "[object Object]";
  }
  return !1;
}, S = (...n) => n.reduce((t, e) => {
  if (Array.isArray(e))
    throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
  return Object.keys(e).forEach((s) => {
    ["__proto__", "constructor", "prototype"].includes(s) || (Array.isArray(t[s]) && Array.isArray(e[s]) ? t[s] = S.options.mergeArrays ? S.options.uniqueArrayItems ? Array.from(new Set(t[s].concat(e[s]))) : [...t[s], ...e[s]] : e[s] : Tt(t[s]) && Tt(e[s]) ? t[s] = S(t[s], e[s]) : t[s] = e[s] === void 0 ? S.options.allowUndefinedOverrides ? e[s] : t[s] : e[s]);
  }), t;
}, {}), rt = {
  allowUndefinedOverrides: !0,
  mergeArrays: !0,
  uniqueArrayItems: !0
};
S.options = rt;
S.withOptions = (n, ...t) => {
  S.options = Object.assign(Object.assign({}, rt), n);
  const e = S(...t);
  return S.options = rt, e;
};
class It {
  constructor(t, e = {}, s = {}) {
    g(this, "width");
    g(this, "height");
    g(this, "componentDrawnHandler");
    g(this, "selectModeHandler");
    g(this, "viewClickHandler");
    g(this, "svg");
    g(this, "cgroup");
    g(this, "hgroup");
    g(this, "style");
    g(this, "fsmService");
    g(this, "_cacheElementMapping");
    g(this, "_idCounter");
    g(this, "_handleIdCounter");
    if (this.width = e.width ?? 1200, this.height = e.height ?? 600, this.componentDrawnHandler = e.componentDrawnHandler, this.selectModeHandler = e.selectModeHandler, this.viewClickHandler = e.viewClickHandler, this.style = S.withOptions(
      { allowUndefinedOverrides: !1 },
      Dt(),
      s
    ), this.fsmService = Sn(this).start(), t instanceof SVGSVGElement)
      this.svg = t;
    else if (typeof t == "string" || t instanceof String) {
      const i = _.querySelector(`#${t}`);
      if (i)
        this.svg = i;
      else {
        this.svg = _.createElementNS(D, "svg"), this.svg.setAttribute("version", "1.1"), this.svg.setAttribute("id", t), this.svg.setAttribute("width", String(this.width)), this.svg.setAttribute("height", String(this.height)), this.svg.setAttribute("viewBox", `0, 0, ${this.width} ${this.height}`), this.svg.setAttribute("preserveAspectRatio", "xMinYMin");
        const r = this.svg;
        window.addEventListener(
          "load",
          function() {
            _.body.appendChild(r);
          },
          { once: !0 }
        );
      }
    }
    this.cgroup = _.createElementNS(D, "g"), this.hgroup = _.createElementNS(D, "g"), this.svg.appendChild(this.cgroup), this.svg.appendChild(this.hgroup), this._cacheElementMapping = ct(
      {},
      (i, r, o) => {
        r ? r instanceof x ? this.hgroup.appendChild(r.element) : this.cgroup.appendChild(r.element) : o instanceof x ? this.hgroup.removeChild(o.element) : (this.cgroup.removeChild(o.element), o.getHandles().forEach((c) => {
          this.unregisterComponent(c);
        }));
      }
    ), this._idCounter = 1, this._handleIdCounter = 1;
  }
  // end constructor
  /**
   * Add an image element into the SVG element.
   *
   * @param {string} path
   * @param {number|string} [width]
   * @param {number|string} [height]
   * @returns {Editor}
   */
  loadImage(t, e, s) {
    const i = _.createElementNS(D, "image");
    return i.setAttributeNS(ie, "href", t), e != null && i.setAttribute("width", String(e)), s != null && i.setAttribute("height", String(s)), this.svg.prepend(i), this;
  }
  /**
   * Completely or partly set current style of components, handles, hovering etc.
   *
   * @param {object} style
   * @returns {Editor}
   *
   * @example
   * ```js
   * editor.setStyle({
   *   component: {
   *     fill: 'rgb(102, 102, 102)',
   *     stroke: 'rgb(51, 51, 51)',
   *   },
   *   componentHover: {
   *     off: {
   *       'stroke-width': 1,
   *       opacity: 0.5,
   *     },
   *     on: {
   *       'stroke-width': 2,
   *       opacity: 0.6,
   *     },
   *   },
   *   componentSelect: {
   *     off: {
   *       'stroke-dasharray': 'none',
   *       'stroke-linejoin': 'miter',
   *     },
   *     on: {
   *       'stroke-dasharray': '4 3',
   *       'stroke-linejoin': 'round',
   *     },
   *   },
   *   handle: {
   *     fill: 'rgb(255, 255, 255)',
   *     stroke: 'rgb(51, 51, 51)',
   *     'stroke-width': 1,
   *     opacity: 0.3,
   *   },
   *   handleHover: {
   *     opacity: 0.6,
   *   },
   * });
   * ```
   */
  setStyle(t) {
    return this.style = S.withOptions(
      { allowUndefinedOverrides: !1 },
      this.style,
      t
    ), this;
  }
  /**
   * Put editor in draw mode of rectangles.
   */
  rect() {
    this.fsmService.send({ type: "MODE_DRAW_RECT" });
  }
  /**
   * Put editor in draw mode of circles.
   */
  circle() {
    this.fsmService.send({ type: "MODE_DRAW_CIRCLE" });
  }
  /**
   * Put editor in draw mode of ellipses.
   */
  ellipse() {
    this.fsmService.send({ type: "MODE_DRAW_ELLIPSE" });
  }
  /**
   * Put editor in draw mode of polygons.
   */
  polygon() {
    this.fsmService.send({ type: "MODE_DRAW_POLYGON" });
  }
  /**
   * Put editor in select mode.
   */
  selectMode() {
    this.fsmService.send({ type: "MODE_SELECT" });
  }
  /**
   * @param {string} id
   * @returns {Rectangle|Circle|Ellipse|Polygon}
   */
  getComponentById(t) {
    return this._cacheElementMapping && this._cacheElementMapping[t];
  }
  /**
   * Make programmatically selection of a component which basically enables its handles by making them visible.
   * Please note that all components will be unselected when leaving select mode or leaving draw mode.
   *
   * @param {string|Rectangle|Circle|Ellipse|Polygon} componentOrId - a component or a component id
   * @returns {Rectangle|Circle|Ellipse|Polygon|null}
   */
  selectComponent(t) {
    let e;
    return typeof t == "string" || t instanceof String ? e = this.getComponentById(t) : e = t, Object.values(this._cacheElementMapping).forEach((s) => {
      s instanceof T && (s === e && s.setIsSelected(!0), s !== e && !s.isFrozen && s.setIsSelected(!1));
    }), e instanceof T ? e : null;
  }
  /**
   * Remove a component (shape) from the editor or view.
   *
   * @param {string|Rectangle|Circle|Ellipse|Polygon} componentOrId - a component or a component id
   * @returns {Rectangle|Circle|Ellipse|Polygon|null}
   */
  removeComponent(t) {
    let e;
    return typeof t == "string" || t instanceof String ? e = this.getComponentById(t) : e = t, e instanceof T ? (this.unregisterComponent(e), e) : null;
  }
  /**
   * Add event listener(s).
   *
   * @param {string} eventTypes
   * @param {EventListenerOrEventListenerObject} handler
   * @returns {Editor}
   */
  on(t, e) {
    return A(this.svg, t, e), this;
  }
  /**
   * Remove event listener(s).
   *
   * @param {string} eventTypes
   * @param {EventListenerOrEventListenerObject} handler
   * @returns {Editor}
   */
  off(t, e) {
    return re(this.svg, t, e), this;
  }
  /**
   * @callback idInterceptor
   * @param {string} id - the id to be modified
   */
  /**
   * Import shapes from JSON.
   *
   * @param {string} data
   * @param {idInterceptor} [idInterceptor] - function to change the imported id to avoid name conflicts, eg. in case user decides to import multiple times or import _after_ drawing
   * @returns {Array.<Rectangle|Circle|Ellipse|Polygon>}
   *
   * @example
   * ```js
   * {
   *   "components": [{
   *     "id": "circle_1",
   *     "type": "circle",
   *     "data": {
   *       "x": 444,
   *       "y": 71,
   *       "width": 241,
   *       "height": 211
   *     }
   *   }]
   * }
   * ```
   *
   * @example
   * ```js
   * {
   *   "components": [{
   *     "id": "rect_1",
   *     "type": "rect",
   *     "data": {
   *       "x": 444,
   *       "y": 71,
   *       "width": 241,
   *       "height": 211
   *     }
   *   }]
   * }
   * ```
   *
   * @example
   * ```js
   * {
   *   "components": [{
   *     "id": "ellipse_1",
   *     "type": "ellipse",
   *     "data": {
   *       "x": 444,
   *       "y": 71,
   *       "width": 241,
   *       "height": 211
   *     }
   *   }]
   * }
   * ```
   *
   * @example
   * ```js
   * {
   *   "components": [{
   *     "id": "polygon_1",
   *     "type": "polygon",
   *     "data": [{
   *       "x": 603,
   *       "y": 114
   *     }, {
   *       "x": 625,
   *       "y": 203
   *     }, {
   *       "x": 699,
   *       "y": 124
   *     }]
   *   }]
   * }
   * ```
   */
  import(t, e) {
    const s = JSON.parse(t);
    return this._idCounter = s.idCounter, s.components.map(
      (i) => {
        const r = e ? e(i.id) : i.id;
        switch (i.type) {
          case "rect":
            return this.createRectangle(i.data, r);
          case "circle":
            return this.createCircle(i.data, r);
          case "ellipse":
            return this.createEllipse(i.data, r);
          case "polygon":
            return this.createPolygon(i.data, r);
          default:
            return console.error("Unknown type", i.type), null;
        }
      }
    ).filter(Qt);
  }
  /**
   * Export drawn shapes as JSON.
   *
   * @param {boolean} [escape] - whether double quotes should be escaped
   * @returns {string} - JSON data
   */
  export(t) {
    const e = Object.entries(this._cacheElementMapping).filter(
      ([, r]) => r instanceof T
    ), s = {
      idCounter: this._idCounter,
      components: e.map(([r, o]) => ({
        id: r,
        type: o.element.tagName,
        data: o.export()
      }))
    }, i = JSON.stringify(s);
    return t ? i.replace(/[\"]/g, '\\"') : i;
  }
  createRectangle(t, e) {
    const { x: s, y: i, width: r, height: o } = t;
    return this.registerComponent(
      new bn(this, s, i, r, o).setStyle(this.style),
      e
    );
  }
  createCircle(t, e) {
    const { x: s, y: i, width: r, height: o } = t;
    return this.registerComponent(
      new xn(this, s, i, r, o).setStyle(this.style),
      e
    );
  }
  createEllipse(t, e) {
    const { x: s, y: i, width: r, height: o } = t;
    return this.registerComponent(
      new En(this, s, i, r, o).setStyle(this.style),
      e
    );
  }
  createPolygon(t, e) {
    return this.registerComponent(new it(this, t).setStyle(this.style), e);
  }
  registerComponent(t, e) {
    return t instanceof x ? e = "handle_" + this._handleIdCounter++ : e = e || t.element.tagName + "_" + this._idCounter++, this._cacheElementMapping[e] = t, t.element.id = e, t;
  }
  registerComponentHandle(t) {
    return this.registerComponent(t.setStyle(this.style.handle, this.style.handleHover));
  }
  unregisterComponent(t) {
    t instanceof T && t._logWarnOnOpOnFrozen("Deleting"), this._cacheElementMapping[t.element.id] = void 0, delete this._cacheElementMapping[t.element.id];
  }
}
const An = (n) => {
  let t;
  return A(n.svg, "mousedown touchstart", (e) => {
    var a;
    e.preventDefault();
    const s = n.getComponentById((a = e.target) == null ? void 0 : a.id), i = s && s.isFrozen ? void 0 : s, r = e instanceof MouseEvent ? e : null, o = e instanceof TouchEvent ? e : null, c = n.svg.getBoundingClientRect(), h = o == null ? void 0 : o.targetTouches[0];
    n.fsmService.send({
      type: "MT_DOWN",
      component: i,
      // not defined when mousedown on editor
      offsetX: (r == null ? void 0 : r.offsetX) ?? (h && h.clientX - c.x) ?? 0,
      offsetY: (r == null ? void 0 : r.offsetY) ?? (h && h.clientY - c.y) ?? 0
    }), t = h;
  }), A(n.svg, "mouseup touchend mouseleave touchleave", (e) => {
    e.preventDefault(), n.fsmService.send({
      type: "MT_UP"
    }), t = void 0;
  }), A(n.svg, "mousemove touchmove", (e) => {
    const s = e instanceof MouseEvent ? e : null, i = e instanceof TouchEvent ? e : null, r = n.svg.getBoundingClientRect(), o = i == null ? void 0 : i.targetTouches[0];
    n.fsmService.send({
      type: "MT_MOVE",
      offsetX: (s == null ? void 0 : s.offsetX) ?? (o && o.clientX - r.x) ?? 0,
      offsetY: (s == null ? void 0 : s.offsetY) ?? (o && o.clientY - r.y) ?? 0,
      movementX: (s == null ? void 0 : s.movementX) != null ? s.movementX : t && o ? o.clientX - t.clientX : 0,
      movementY: (s == null ? void 0 : s.movementY) != null ? s.movementY : t && o ? o.clientY - t.clientY : 0
    }), t = o;
  }), A(window, "keydown", (e) => {
    const s = e;
    switch (s.key) {
      case "Escape":
        n.fsmService.send({ type: "KEYDOWN_ESC" });
        break;
      case "Delete":
        n.fsmService.send({ type: "KEYDOWN_DEL" });
        break;
      case "ArrowUp":
        s.preventDefault(), n.fsmService.send({
          type: "KEYDOWN_ARROW",
          movementX: 0,
          movementY: -1
        });
        break;
      case "ArrowDown":
        s.preventDefault(), n.fsmService.send({
          type: "KEYDOWN_ARROW",
          movementX: 0,
          movementY: 1
        });
        break;
      case "ArrowLeft":
        s.preventDefault(), n.fsmService.send({
          type: "KEYDOWN_ARROW",
          movementX: -1,
          movementY: 0
        });
        break;
      case "ArrowRight":
        s.preventDefault(), n.fsmService.send({
          type: "KEYDOWN_ARROW",
          movementX: 1,
          movementY: 0
        });
        break;
    }
  }), n;
}, On = (n) => (A(n.cgroup, "click touchstart", (t) => {
  var e;
  t.preventDefault(), n.viewClickHandler && n.viewClickHandler(t, (e = t.target) == null ? void 0 : e.id);
}), n), te = (n) => function(...e) {
  return n ? On(new It(...e)) : An(new It(...e));
}, Mn = te(), Tn = te(!0), Dn = {
  editor: Mn,
  view: Tn
};
export {
  xn as Circle,
  T as Component,
  J as CornerShapedElement,
  It as Editor,
  En as Ellipse,
  it as Polygon,
  bn as Rectangle,
  Dn as default,
  Mn as editor,
  Tn as view
};
//# sourceMappingURL=imagemapper.es.js.map
