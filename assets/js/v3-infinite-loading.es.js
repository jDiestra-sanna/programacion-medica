import { openBlock, createElementBlock, pushScopeId, popScopeId, createElementVNode, ref, toRefs, onMounted, watch, onUnmounted, renderSlot, createVNode, createCommentVNode, toDisplayString, unref } from "vue";
var Spinner_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = {};
const _withScopeId = (n) => (pushScopeId("data-v-39432f99"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "container" };
const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "spinner" }, null, -1));
const _hoisted_3 = [
  _hoisted_2$1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, _hoisted_3);
}
var Spinner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-39432f99"]]);
const stateHandler = (state) => ({
  loading() {
    state.value = "loading";
  },
  loaded() {
    state.value = "loaded";
  },
  complete() {
    state.value = "complete";
  },
  error() {
    state.value = "error";
  }
});
function infiniteEventEmitter(emit, stateHandler2) {
  return () => {
    stateHandler2.loading();
    emit("infinite", stateHandler2);
  };
}
function isVisible(el, view) {
  var rect = el.getBoundingClientRect();
  return Math.abs(rect.top) * 2 <= view.clientHeight || !view.clientHeight;
}
const getEventHandler = (el, { state, distance, emitInfiniteEvent, top }) => {
  return () => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    const validState = state.value == "loaded" || !state.value;
    if (top && Math.ceil(scrollTop) - distance <= 0 && validState)
      emitInfiniteEvent();
    if (!top && Math.ceil(scrollTop) + clientHeight >= scrollHeight - distance && validState)
      emitInfiniteEvent();
  };
};
let eventHandler;
const startScrollEvent = (params) => {
  if (params.target && !document.querySelector(params.target))
    return console.error("Vue3 infinite loading: target prop should be a valid css selector");
  const el = document.querySelector(params.target) || document.documentElement;
  const target = document.querySelector(params.target) || window;
  const infiniteLoading = document.getElementById("vue3-infinite-loading");
  if (isVisible(infiniteLoading, el) && params.firstLoad)
    params.emitInfiniteEvent();
  eventHandler = getEventHandler(el, params);
  target.addEventListener("scroll", eventHandler);
};
const removeScrollEvent = (params) => {
  const target = document.querySelector(params.target) || window;
  target.removeEventListener("scroll", eventHandler);
};
var InfiniteLoading_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { id: "vue3-infinite-loading" };
const _hoisted_2 = { class: "state-error" };
const _sfc_main = {
  props: {
    top: { type: Boolean, required: false },
    target: { type: [String, Boolean], required: false },
    distance: { type: Number, required: false, default: 0 },
    identifier: { required: false },
    firstLoad: { type: Boolean, required: false, default: true },
    slots: { type: Object, required: false }
  },
  emits: ["infinite"],
  setup(__props, { emit }) {
    const props = __props;
    const state = ref("");
    const { top, target, distance, firstLoad, slots } = props;
    const { identifier } = toRefs(props);
    const params = {
      state,
      target,
      distance,
      top,
      firstLoad,
      emitInfiniteEvent: infiniteEventEmitter(emit, stateHandler(state))
    };
    const stateWatcher = (el, prevHeight) => watch(state, (newVal) => {
      if (newVal == "loaded" && top) {
        Promise.resolve().then(() => {
          el.scrollTop = el.scrollHeight - prevHeight;
        });
        prevHeight = el.scrollHeight;
      }
      if (newVal == "complete")
        removeScrollEvent(params);
    });
    const identifierWatcher = () => watch(identifier, () => {
      state.value = "";
      removeScrollEvent(params);
      startScrollEvent(params);
    });
    onMounted(() => {
      startScrollEvent(params);
      let el = document.querySelector(target) || document.documentElement;
      let prevHeight = el.scrollHeight;
      stateWatcher(el, prevHeight);
      if (identifier)
        identifierWatcher();
    });
    onUnmounted(() => {
      removeScrollEvent(params);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        state.value == "loading" ? renderSlot(_ctx.$slots, "spinner", { key: 0 }, () => [
          createVNode(Spinner)
        ]) : createCommentVNode("v-if", true),
        state.value == "complete" ? renderSlot(_ctx.$slots, "complete", { key: 1 }, () => {
          var _a;
          return [
            createElementVNode("span", null, toDisplayString(((_a = unref(slots)) == null ? void 0 : _a.complete) || "No more results!"), 1)
          ];
        }) : createCommentVNode("v-if", true),
        state.value == "error" ? renderSlot(_ctx.$slots, "error", {
          key: 2,
          retry: params.emitInfiniteEvent
        }, () => {
          var _a;
          return [
            createElementVNode("span", _hoisted_2, [
              createElementVNode("span", null, toDisplayString(((_a = unref(slots)) == null ? void 0 : _a.error) || "Oops something went wrong!"), 1),
              createElementVNode("button", {
                class: "retry",
                onClick: _cache[0] || (_cache[0] = (...args) => params.emitInfiniteEvent && params.emitInfiniteEvent(...args))
              }, "retry")
            ])
          ];
        }) : createCommentVNode("v-if", true)
      ]);
    };
  }
};
export { _sfc_main as default };
