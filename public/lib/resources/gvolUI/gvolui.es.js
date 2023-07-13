import { onMounted as E, watchEffect as ae, onBeforeUnmount as ie, ref as b, computed as k, watch as le, openBlock as f, createElementBlock as _, normalizeStyle as I, createElementVNode as r, Fragment as $, createVNode as y, unref as h, isRef as T, toDisplayString as C, renderSlot as Y, createCommentVNode as se, withDirectives as ce, vModelText as re, reactive as M, toRefs as ue, renderList as V, withCtx as z, createTextVNode as de, markRaw as J, normalizeClass as me, createBlock as ge, resolveDynamicComponent as pe, createApp as he } from "vue";
function O(e, t = "px") {
  return e ? typeof e == "string" ? e : `${e}${t}` : "";
}
let c = {}, X = "../assets";
const fe = (e, t) => {
  console.log(e, t), c && (c = e), t && (X = t);
}, K = (e, t, o) => {
  let a = {
    offsetX: 0,
    offsetY: 0
  };
  const n = (l) => {
    const u = l.clientX, d = l.clientY, { offsetX: m, offsetY: p } = a, v = e.value.getBoundingClientRect(), g = v.left, N = v.top, S = v.width, B = v.height, U = document.documentElement.clientWidth, R = document.documentElement.clientHeight, w = -g + m, te = -N + p, ne = U - g - S + m, oe = R - N - B + p, F = (G) => {
      const W = Math.min(Math.max(m + G.clientX - u, w), ne), H = Math.min(Math.max(p + G.clientY - d, te), oe);
      a = {
        offsetX: W,
        offsetY: H
      }, e.value.style.transform = `translate(${O(W)}, ${O(H)})`;
    }, A = () => {
      document.removeEventListener("mousemove", F), document.removeEventListener("mouseup", A);
    };
    document.addEventListener("mousemove", F), document.addEventListener("mouseup", A);
  }, s = () => {
    t.value && e.value && t.value.addEventListener("mousedown", n);
  }, i = () => {
    t.value && e.value && t.value.removeEventListener("mousedown", n);
  };
  E(() => {
    ae(() => {
      o.value ? s() : i();
    });
  }), ie(() => {
    i();
  });
};
const _e = ["src"], P = {
  __name: "index",
  props: {
    imgName: String,
    isShow: {
      type: Boolean,
      default: !1
    },
    width: {
      type: Number,
      default: 34
    },
    height: {
      type: Number,
      default: 34
    }
  },
  emits: ["update:isShow"],
  setup(e, { emit: t }) {
    const o = e, a = b(""), n = (l) => {
      const u = `${X}/img/${o.imgName}`;
      return l ? `${u}_on.png` : `${u}.png`;
    };
    a.value = n(o.isShow);
    const s = k({
      get() {
        return o.isShow;
      },
      set(l) {
        t("update:isShow", l);
      }
    }), i = () => {
      s.value = !s.value;
    };
    return le(s, (l) => {
      a.value = n(l);
    }), (l, u) => (f(), _("div", {
      onClick: i,
      class: "g-btn",
      style: I({ width: e.width + "px" })
    }, [
      r("img", { src: a.value }, null, 8, _e)
    ], 4));
  }
};
const ve = { class: "el-btn" }, ye = { class: "text" }, Q = {
  __name: "el-btn",
  props: {
    imgName: String,
    titleName: String,
    labelList: {
      type: Array,
      default: () => []
    },
    isSelected: {
      type: Boolean,
      default: !1
    },
    isAlone: {
      type: Boolean,
      default: !0
    },
    arrowSelect: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change", "update:isSelected", "update:arrowSelect"],
  setup(e, { emit: t }) {
    const o = e, a = k({
      get() {
        return o.isSelected;
      },
      set(s) {
        o.isAlone && o.labelList.forEach((i) => i.isSelected = !1), t("update:isSelected", s), t("change", { title: o.titleName, status: s });
      }
    }), n = k({
      get() {
        return o.arrowSelect;
      },
      set(s) {
        o.labelList.forEach((i) => i.arrowSelect = !1), t("update:arrowSelect", s);
      }
    });
    return (s, i) => (f(), _($, null, [
      r("div", ve, [
        y(P, {
          isShow: h(a),
          "onUpdate:isShow": i[0] || (i[0] = (l) => T(a) ? a.value = l : null),
          imgName: o.imgName
        }, null, 8, ["isShow", "imgName"]),
        y(P, {
          isShow: h(n),
          "onUpdate:isShow": i[1] || (i[1] = (l) => T(n) ? n.value = l : null),
          width: 9,
          imgName: "tree_arrow"
        }, null, 8, ["isShow"])
      ]),
      r("div", ye, C(o.titleName.length === 2 ? `\xA0 ${o.titleName}` : o.titleName), 1)
    ], 64));
  }
};
const be = { class: "opt-content" }, we = {
  __name: "opt-panel",
  props: {
    isSelected: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:isSelected"],
  setup(e, { emit: t }) {
    const o = e, a = b(null), n = b(null), s = k({
      get() {
        return o.isSelected;
      },
      set(i) {
        t("update:isSelected", i);
      }
    });
    return K(a, n, s), (i, l) => h(s) ? (f(), _("div", {
      key: 0,
      ref_key: "optRef",
      ref: a,
      class: "opt-panel"
    }, [
      r("div", {
        ref_key: "optHeaderRef",
        ref: n,
        class: "opt-header"
      }, [
        Y(i.$slots, "header")
      ], 512),
      r("div", be, [
        Y(i.$slots, "default")
      ])
    ], 512)) : se("", !0);
  }
};
const Se = { class: "g-input" }, ke = { class: "dot" }, x = {
  __name: "index",
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    unit: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const o = e, a = k({
      get() {
        return o.modelValue;
      },
      set(n) {
        console.log(n), t("update:modelValue", n);
      }
    });
    return (n, s) => (f(), _("div", Se, [
      ce(r("input", {
        "onUpdate:modelValue": s[0] || (s[0] = (i) => T(a) ? a.value = i : null),
        class: "gui-btn"
      }, null, 512), [
        [re, h(a)]
      ]),
      r("div", ke, C(o.unit), 1)
    ]));
  }
};
function xe() {
  D({
    destination: {
      longitude: 107.5,
      latitude: 38,
      height: 85117358e-1
    },
    orientation: {
      heading: 0,
      pitch: -90,
      roll: 0
    },
    duration: 1
  });
}
function D({ destination: e, orientation: t, duration: o }) {
  const { longitude: a, latitude: n, height: s } = e, { heading: i, pitch: l, roll: u } = t;
  console.log(a, n, s, i, l, u, o), c.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(a, n, s),
    orientation: {
      heading: Cesium.Math.toRadians(i),
      pitch: Cesium.Math.toRadians(l),
      roll: u
    },
    duration: o
  });
}
function j() {
  D({
    destination: {
      longitude: 120.5,
      latitude: 28.891179,
      height: 22191651
    },
    orientation: {
      heading: 0,
      pitch: -90,
      roll: 0
    },
    duration: 1
  });
}
const Le = (e, t, o, a, n, s, i, l = !1, u = 100) => {
  e.value.addEventListener("mousedown", (d) => {
    const m = o.value.getBoundingClientRect(), p = d.pageX, v = p - m.x, g = o.value.offsetWidth;
    let N = 0, S = 0;
    const B = (U) => {
      const R = U.pageX;
      S = v + R - p, console.log("right", S), console.log("left", N);
      let w = (S - N) / g;
      return S >= g && (w = 1), S <= 0 && (w = 0), w = w.toFixed(u.toString().length - 1), s.value.innerHTML = (w * u).toFixed(0), console.log("precent", w), t.value.style.left = w * 100 + "%", a.value.style.width = w * 100 + "%", w * u;
    };
    document.addEventListener("mousemove", B), document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", B);
    });
  });
}, Ne = (e, t, o, a, n, s, i = 100) => {
  t.value.addEventListener("click", (l) => {
    const u = t.value.getBoundingClientRect(), d = l.pageX, m = d - u.x, p = t.value.offsetWidth;
    let v = (m / p).toFixed(2);
    d <= u.x && (v = 0), d - u.x >= p && (v = 1), n.value.innerHTML = (v * i).toFixed(0), e.value.style.left = v * 100 + "%", o.value.style.width = v * 100 + "%";
  });
};
const Z = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [a, n] of t)
    o[a] = n;
  return o;
}, $e = {
  __name: "index",
  props: {
    buttonPosition: {
      type: String,
      default: "0%"
    },
    sliderWidth: {
      type: Number
    },
    handlerFunction: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(e) {
    const t = e, o = k(() => ({ left: t.buttonPosition })), a = k(() => ({ width: t.sliderWidth })), n = b(null), s = b(null), i = b(null), l = b(null), u = b(0), d = b(null);
    return E(() => {
      Le(n, s, i, l, u, d, handlerFunction), Ne(s, i, l, u, d, handlerFunction);
    }), (m, p) => (f(), _("div", {
      class: "slider-container",
      style: I(h(a))
    }, [
      r("div", {
        class: "slider-runway",
        ref_key: "runwayRef",
        ref: i
      }, [
        r("div", {
          class: "slider-bar",
          ref_key: "barRef",
          ref: l
        }, null, 512),
        r("div", {
          class: "slider-button",
          ref_key: "buttonRef",
          ref: s,
          style: I(h(o))
        }, [
          r("div", {
            class: "slider-button-inner",
            ref_key: "buttonInnerRef",
            ref: n
          }, null, 512)
        ], 4),
        r("span", {
          class: "info",
          ref_key: "infoRef",
          ref: d
        }, "0", 512)
      ], 512)
    ], 4));
  }
}, Ce = /* @__PURE__ */ Z($e, [["__scopeId", "data-v-e1cf5790"]]);
const Be = { class: "detail-btn" }, Ve = { class: "angle-view-head" }, Ue = /* @__PURE__ */ r("button", { class: "gui-btn gui-button mg-r" }, " \u6062\u590D\u9ED8\u8BA4 ", -1), Re = /* @__PURE__ */ r("button", { class: "gui-btn gui-button mg-r" }, " \u5F53\u524D\u76F8\u673A ", -1), Ie = { class: "panel-div" }, Te = /* @__PURE__ */ r("div", { class: "panel-div-1" }, "\u98DE\u884C\u65F6\u95F4\uFF1A", -1), Pe = { class: "panel-div" }, Ee = /* @__PURE__ */ r("div", { class: "panel-div-1" }, "\u4F4D\u7F6E\uFF1A", -1), Me = { class: "panel-div" }, Xe = /* @__PURE__ */ r("div", { class: "panel-div-1" }, "\u671D\u5411\uFF1A", -1), ee = {
  __name: "index",
  props: {
    labelList: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = e, o = M({
      destination: {
        longitude: 107.5,
        latitude: 38,
        height: 85117358e-1
      },
      orientation: {
        heading: 0,
        pitch: -90,
        roll: 0
      },
      duration: 1
    }), { destination: a, orientation: n, duration: s } = ue(o), i = () => {
      console.log(o), D(o);
    }, l = (d) => {
      switch (d.title) {
        case "\u4E2D\u56FD":
          xe();
          break;
        case "\u5168\u7403":
          j();
          break;
        case "\u81EA\u5B9A\u4E49":
          j();
          break;
      }
    }, u = (d) => {
      console.log(s.value), s.value = d;
    };
    return (d, m) => (f(!0), _($, null, V(t.labelList, (p, v) => (f(), _("div", {
      class: "type-1-c-btn",
      key: v + "label"
    }, [
      r("div", Be, [
        y(Q, {
          titleName: p.name,
          labelList: t.labelList,
          onChange: l,
          isSelected: p.isSelected,
          "onUpdate:isSelected": (g) => p.isSelected = g,
          arrowSelect: p.arrowSelect,
          "onUpdate:arrowSelect": (g) => p.arrowSelect = g,
          imgName: p.img
        }, null, 8, ["titleName", "labelList", "isSelected", "onUpdate:isSelected", "arrowSelect", "onUpdate:arrowSelect", "imgName"]),
        y(we, {
          isSelected: p.arrowSelect,
          "onUpdate:isSelected": (g) => p.arrowSelect = g
        }, {
          header: z(() => [
            r("div", Ve, [
              de(C(p.name) + " ", 1),
              y(P, {
                onClick: () => p.arrowSelect = !1,
                width: 12,
                imgName: "model_close"
              }, null, 8, ["onClick"])
            ])
          ]),
          default: z(() => [
            r("div", null, [
              r("div", { class: "panel-div" }, [
                Ue,
                Re,
                r("button", {
                  class: "gui-btn gui-button mg-r",
                  onClick: i
                }, " \u5E94\u7528\u67E5\u770B ")
              ])
            ]),
            r("div", Ie, [
              Te,
              y(Ce, { getInfoTxt: u })
            ]),
            r("div", Pe, [
              Ee,
              y(x, {
                modelValue: h(a).longitude,
                "onUpdate:modelValue": m[0] || (m[0] = (g) => h(a).longitude = g),
                unit: "\xB0"
              }, null, 8, ["modelValue"]),
              y(x, {
                modelValue: h(a).latitude,
                "onUpdate:modelValue": m[1] || (m[1] = (g) => h(a).latitude = g),
                unit: "\xB0"
              }, null, 8, ["modelValue"]),
              y(x, {
                modelValue: h(a).height,
                "onUpdate:modelValue": m[2] || (m[2] = (g) => h(a).height = g),
                unit: "m"
              }, null, 8, ["modelValue"])
            ]),
            r("div", Me, [
              Xe,
              y(x, {
                modelValue: h(n).heading,
                "onUpdate:modelValue": m[3] || (m[3] = (g) => h(n).heading = g),
                unit: "\xB0"
              }, null, 8, ["modelValue"]),
              y(x, {
                modelValue: h(n).pitch,
                "onUpdate:modelValue": m[4] || (m[4] = (g) => h(n).pitch = g),
                unit: "\xB0"
              }, null, 8, ["modelValue"]),
              y(x, {
                modelValue: h(n).roll,
                "onUpdate:modelValue": m[5] || (m[5] = (g) => h(n).roll = g),
                unit: "\xB0"
              }, null, 8, ["modelValue"])
            ])
          ]),
          _: 2
        }, 1032, ["isSelected", "onUpdate:isSelected"])
      ])
    ]))), 128));
  }
};
J(ee);
const q = [
  {
    title: "\u6F2B\u6E38",
    isSelected: !0,
    content: [
      {
        typeName: "\u573A\u666F",
        labelList: [{ name: "\u4FDD\u5B58", img: "savecj" }]
      },
      {
        typeName: "\u89C6\u89D2",
        component: J(ee),
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      },
      {
        typeName: "\u641C\u7D22\u5B9A\u4F4D",
        labelList: [{ type: "input", name: "\u641C\u7D22", img: "china" }]
      },
      {
        typeName: "\u81EA\u52A8\u98DE\u884C",
        labelList: [
          { name: "\u5168\u7403\u65CB\u8F6C", img: "globalrotation" },
          { name: "\u4E2D\u5FC3\u65CB\u8F6C", img: "centerrotation" },
          { name: "\u7ED1\u5B9A\u76F8\u673A", img: "cameraattach" }
        ]
      }
    ]
  },
  {
    title: "\u89C6\u56FE",
    content: [
      {
        typeName: "\u63A7\u4EF6",
        labelList: [
          { name: "\u56FE\u5C42\u7BA1\u7406", img: "layer" },
          { name: "\u5BFC\u822A\u63A7\u4EF6", img: "nav" },
          { name: "\u6BD4\u4F8B\u5C3A", img: "scale" },
          { name: "\u72B6\u6001\u680F", img: "state" },
          { name: "\u65F6\u95F4\u7EBF", img: "time" },
          { name: "\u74E6\u7247\u6D4B\u8BD5", img: "test" }
        ]
      },
      {
        typeName: "\u5206\u5C4F",
        labelList: [{ name: "\u5355\u89C6\u53E3", img: "singleviewport" }]
      },
      {
        typeName: "\u8C03\u8BD5",
        labelList: [
          { name: "\u5730\u5F62\u8C03\u8BD5", img: "terrain" },
          { name: "\u74E6\u7247\u8C03\u8BD5", img: "3Dtiles" },
          { name: "\u573A\u666F\u622A\u56FE", img: "layer" },
          { name: "\u5730\u7403\u989C\u8272", img: "global" },
          { name: "Token", img: "token" }
        ]
      }
    ]
  },
  {
    title: "\u5F71\u50CF",
    content: [
      {
        typeName: "\u6570\u636E\u6E90",
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      }
    ]
  },
  {
    title: "\u74E6\u7247",
    content: [
      {
        typeName: "\u6570\u636E\u6E90",
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      }
    ]
  },
  {
    title: "\u5730\u5F62",
    content: [
      {
        typeName: "\u6570\u636E\u6E90",
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      }
    ]
  },
  {
    title: "\u5206\u6790",
    content: [
      {
        typeName: "\u53EF\u89C6\u5316",
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      }
    ]
  },
  {
    title: "\u6548\u679C",
    content: [
      {
        typeName: "\u5929\u6C14",
        labelList: [
          { name: "\u592A\u9633", img: "sun" },
          { name: "\u6708\u4EAE", img: "moon" },
          { name: "\u5927\u6C14", img: "atmosphere" },
          { name: "\u4E91", img: "cloud" },
          { name: "\u96E8", img: "rain" },
          { name: "\u96EA", img: "snow" },
          { name: "\u96FE", img: "fog" },
          { name: "\u5168\u5C4F\u96FE\u6548", img: "fogpostprocess" },
          { name: "\u661F\u7A7A", img: "starrysky" },
          { name: "\u5929\u7A7A\u76D2", img: "skybox" }
        ]
      }
    ]
  },
  {
    title: "\u6807\u7ED8",
    content: [
      {
        typeName: "\u6807\u7ED8\u5E93",
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      }
    ]
  },
  {
    title: "\u5176\u4ED6",
    content: [
      {
        typeName: "\u6570\u636E\u6E90",
        labelList: [
          { name: "\u5168\u7403", img: "global" },
          { name: "\u4E2D\u56FD", img: "china" },
          { name: "\u81EA\u5B9A\u4E49", img: "view" }
        ]
      }
    ]
  }
];
const De = { class: "g-tabs" }, Fe = ["onClick"], Ae = {
  __name: "tabs",
  emits: ["changeTab"],
  setup(e, { emit: t }) {
    const o = q.map((l) => ({ title: l.title, isSelected: !!l.isSelected })), a = M(o);
    let n = a.find((l) => l.isSelected);
    const s = (l) => {
      n.isSelected = !1, l.isSelected = !0, n = l, i(n);
    }, i = (l) => {
      const u = q.find((d) => d.title === l.title);
      t("changeTab", u);
    };
    return E(() => {
      console.log(n), i(n);
    }), (l, u) => (f(), _("div", De, [
      (f(!0), _($, null, V(a, (d, m) => (f(), _("div", {
        class: me(["g-tabs-item", { "is-selected": d.isSelected }]),
        onClick: (p) => s(d),
        key: m + "tab"
      }, C(d.title), 11, Fe))), 128))
    ]));
  }
};
function Ge(e) {
  let t = e.status;
  switch (e.title) {
    case "\u5BFC\u822A\u63A7\u4EF6":
      We(t);
      break;
    case "\u6BD4\u4F8B\u5C3A":
      He(t);
      break;
    case "\u5730\u5F62\u8C03\u8BD5":
      Ye(t);
      break;
    case "\u74E6\u7247\u8C03\u8BD5":
      ze(t);
      break;
  }
}
function We(e) {
  c.camera.navigator.showCompass = e;
}
function He(e) {
  c.camera.navigator.showDistanceLegend = e;
}
function Ye(e) {
  c.misc.debug.cesiumInspectorVisibility = e;
}
function ze(e) {
  c.misc.debug.tilesetInspectorVisibility = e;
}
const L = (e) => `${X}/skyboxes/sky1/${e}.jpg`;
function Oe(e, t = 1) {
  if (e) {
    var o = c.czm.viewer, a = c.weather.sunPosition;
    c.weather.sun.enabled = e, c.weather.sun.glowFactor = t, o.camera.flyTo({
      destination: new Cesium.Cartesian3(-a.x / 1e3, -a.y / 1e3, -a.z / 2e3),
      orientation: {
        heading: 0,
        pitch: Cesium.Math.toRadians(-90),
        roll: 0
      }
    });
  } else
    c.camera.flyTo([2.1031217486531673, 0.5041647748838838, 2102141583325694e-8], 0, [6.283185307179586, -1.5705982258639, 0]);
}
function je(e) {
  if (e) {
    var t = c.czm.viewer, o = c.weather.moonPosition;
    c.weather.moon.enabled = e, t.camera.flyTo({
      destination: new Cesium.Cartesian3(o.x / 1.2, o.y / 1.2, o.z / 1.2),
      orientation: {
        heading: 0,
        pitch: Cesium.Math.toRadians(90),
        roll: 0
      }
    });
  } else
    c.camera.flyTo([2.1031217486531673, 0.5041647748838838, 2102141583325694e-8], 0, [6.283185307179586, -1.5705982258639, 0]);
}
function qe(e) {
  c.weather.atmosphere.enabled = e, c.weather.atmosphere.brightnessShift = 0.5, c.weather.atmosphere.hueShift = 0, c.weather.atmosphere.saturationShift = 0.5;
}
function Je(e) {
  c.enableCloud = e;
}
function Ke(e) {
  c.weather.rainPostProcess.enabled = e;
}
function Qe(e) {
  c.weather.snowPostProcess.enabled = e;
}
function Ze(e) {
  c.weather.fog.enabled = e, c.weather.fog.density = 2e-3, c.weather.fog.minimumBrightness = 1;
}
function et(e) {
  c.weather.skyBox.enabled = e, c.weather.skyBox.topSkyBoxOnGroundImageUri = L("top"), c.weather.skyBox.bottomSkyBoxOnGroundImageUri = L("bottom"), c.weather.skyBox.eastSkyBoxOnGroundImageUri = L("east"), c.weather.skyBox.southSkyBoxOnGroundImageUri = L("south"), c.weather.skyBox.westSkyBoxOnGroundImageUri = L("west"), c.weather.skyBox.northSkyBoxOnGroundImageUri = L("north");
}
function tt(e) {
  const t = document.getElementsByTagName("body")[0];
  t.onload = () => {
    options.skyBox.show = e;
  };
}
function nt(e) {
  c.weather.fogPostProcess.enabled = e;
}
const ot = { class: "detail-btn" }, at = {
  __name: "index",
  props: {
    labelList: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const t = e, o = (a) => {
      console.log("\u6211\u662F\u516C\u7528\u7684\u7EC4\u4EF6"), Ge(a);
      let n = a.status;
      switch (a.title) {
        case "\u592A\u9633":
          Oe(n);
          break;
        case "\u6708\u4EAE":
          je(n);
          break;
        case "\u5927\u6C14":
          qe(n);
          break;
        case "\u4E91":
          Je(n);
          break;
        case "\u96E8":
          Ke(n);
          break;
        case "\u96EA":
          Qe(n);
          break;
        case "\u96FE":
          Ze(n);
          break;
        case "\u661F\u7A7A":
          et(n);
          break;
        case "\u5929\u7A7A\u76D2":
          tt(n);
          break;
        case "\u5168\u5C4F\u96FE\u6548":
          nt(n);
          break;
      }
    };
    return (a, n) => (f(!0), _($, null, V(t.labelList, (s, i) => (f(), _("div", {
      class: "type-1-c-btn",
      key: i + "label"
    }, [
      r("div", ot, [
        y(Q, {
          titleName: s.name,
          labelList: t.labelList,
          onChange: o,
          isSelected: s.isSelected,
          "onUpdate:isSelected": (l) => s.isSelected = l,
          imgName: s.img
        }, null, 8, ["titleName", "labelList", "isSelected", "onUpdate:isSelected", "imgName"])
      ])
    ]))), 128));
  }
};
const it = { class: "g-dialog-content" }, lt = { class: "type-1-t" }, st = { class: "type-1-c" }, ct = {
  __name: "App",
  setup(e) {
    const t = b(null), o = b(null), a = b(!0);
    let n = M({
      list: []
    });
    K(t, o, a);
    const s = (i) => {
      n.list = i && i.content || [];
    };
    return (i, l) => (f(), _("div", {
      class: "g-dialog",
      ref_key: "dialogRef",
      ref: t
    }, [
      r("div", {
        ref_key: "headerRef",
        ref: o,
        class: "g-dialog-header"
      }, [
        y(Ae, { onChangeTab: s })
      ], 512),
      r("div", it, [
        (f(!0), _($, null, V(h(n).list, (u, d) => (f(), _("div", {
          class: "type-1",
          key: d + "type"
        }, [
          r("div", lt, C(u.typeName), 1),
          r("div", st, [
            (f(), ge(pe(u.component ? u.component : at), {
              labelList: u.labelList
            }, null, 8, ["labelList"]))
          ])
        ]))), 128))
      ])
    ], 512));
  }
}, rt = /* @__PURE__ */ Z(ct, [["__scopeId", "data-v-9c1a1b14"]]);
function ut(e = "app", t, o) {
  return fe(t, o), document.getElementById(e) ? t ? rt : (console.error("\u672A\u68C0\u67E5\u5230GvolEngine\u5B9E\u4F8B"), !1) : (console.error("\u8BF7\u5148\u521B\u5EFAgvol\u7236\u7EA7dom"), !1);
}
const mt = (e, t, o = "gui") => {
  const a = ut("app", e, t);
  return he(a).mount(`#${o}`);
};
export {
  mt as default
};
