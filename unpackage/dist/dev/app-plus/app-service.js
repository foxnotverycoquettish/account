if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value2) => promise.resolve(callback()).then(() => value2),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_LOAD = "onLoad";
  const ON_READY = "onReady";
  const ON_REACH_BOTTOM = "onReachBottom";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
  const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
  const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onReady = /* @__PURE__ */ createHook(ON_READY);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  const onNavigationBarButtonTap = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_BUTTON_TAP);
  const onNavigationBarSearchInputChanged = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED);
  const onNavigationBarSearchInputConfirmed = /* @__PURE__ */ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$o = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$d], ["__scopeId", "data-v-5de67484"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  const _sfc_main$n = {
    name: "u-button",
    emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp", "chooseavatar"],
    props: {
      // 是否细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，default，primary，error，warning，success
      type: {
        type: String,
        default: "default"
      },
      // 按钮尺寸，default，medium，mini
      size: {
        type: String,
        default: "default"
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: "square"
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ""
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ""
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ""
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: "en"
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ""
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ""
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ""
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ""
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: false
      },
      // 手指按（触摸）按钮时按钮时的背景颜色
      hoverBgColor: {
        type: String,
        default: ""
      },
      // 水波纹的背景颜色
      rippleBgColor: {
        type: String,
        default: ""
      },
      // 是否开启水波纹效果
      ripple: {
        type: Boolean,
        default: false
      },
      // 按下的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义样式，对象形式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ""
      },
      // 节流，一定时间内只能触发一次
      throttleTime: {
        type: [String, Number],
        default: 500
      },
      // 按住后多久出现点击态，单位毫秒
      hoverStartTime: {
        type: [String, Number],
        default: 20
      },
      // 手指松开后点击态保留时间，单位毫秒
      hoverStayTime: {
        type: [String, Number],
        default: 150
      },
      timerId: {
        type: [String, Number]
      }
    },
    computed: {
      // 当没有传bgColor变量时，按钮按下去的颜色类名
      getHoverClass() {
        if (this.loading || this.disabled || this.ripple || this.hoverClass)
          return "";
        let hoverClass = "";
        hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
        return hoverClass;
      },
      // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
      showHairLineBorder() {
        if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
          return "";
        } else {
          return "u-hairline-border";
        }
      }
    },
    data() {
      let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
      return {
        btnTimerId,
        rippleTop: 0,
        // 水波纹的起点Y坐标到按钮上边界的距离
        rippleLeft: 0,
        // 水波纹起点X坐标到按钮左边界的距离
        fields: {},
        // 波纹按钮节点信息
        waveActive: false
        // 激活水波纹
      };
    },
    methods: {
      // 按钮点击
      click(e) {
        this.$u.throttle(() => {
          if (this.loading === true || this.disabled === true)
            return;
          if (this.ripple) {
            this.waveActive = false;
            this.$nextTick(function() {
              this.getWaveQuery(e);
            });
          }
          this.$emit("click", e);
        }, this.throttleTime, true, this.btnTimerId);
      },
      // 查询按钮的节点信息
      getWaveQuery(e) {
        this.getElQuery().then((res) => {
          let data = res[0];
          if (!data.width || !data.width)
            return;
          data.targetWidth = data.height > data.width ? data.height : data.width;
          if (!data.targetWidth)
            return;
          this.fields = data;
          let touchesX = "", touchesY = "";
          touchesX = e.touches[0].clientX;
          touchesY = e.touches[0].clientY;
          this.rippleTop = touchesY - data.top - data.targetWidth / 2;
          this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
          this.$nextTick(() => {
            this.waveActive = true;
          });
        });
      },
      // 获取节点信息
      getElQuery() {
        return new Promise((resolve) => {
          let queryInfo = "";
          queryInfo = uni.createSelectorQuery().in(this);
          queryInfo.select(".u-btn").boundingClientRect();
          queryInfo.exec((data) => {
            resolve(data);
          });
        });
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit("getphonenumber", res);
      },
      getuserinfo(res) {
        this.$emit("getuserinfo", res);
      },
      error(res) {
        this.$emit("error", res);
      },
      opensetting(res) {
        this.$emit("opensetting", res);
      },
      launchapp(res) {
        this.$emit("launchapp", res);
      },
      chooseavatar(res) {
        this.$emit("chooseavatar", res);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("button", {
      id: "u-wave-btn",
      class: vue.normalizeClass(["u-btn u-line-1 u-fix-ios-appearance", [
        "u-size-" + $props.size,
        $props.plain ? "u-btn--" + $props.type + "--plain" : "",
        $props.loading ? "u-loading" : "",
        $props.shape == "circle" ? "u-round-circle" : "",
        $props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border",
        "u-btn--" + $props.type,
        $props.disabled ? `u-btn--${$props.type}--disabled` : ""
      ]]),
      "hover-start-time": Number($props.hoverStartTime),
      "hover-stay-time": Number($props.hoverStayTime),
      disabled: $props.disabled,
      "form-type": $props.formType,
      "open-type": $props.openType,
      "app-parameter": $props.appParameter,
      "hover-stop-propagation": $props.hoverStopPropagation,
      "send-message-title": $props.sendMessageTitle,
      "send-message-path": "sendMessagePath",
      lang: $props.lang,
      "data-name": $props.dataName,
      "session-from": $props.sessionFrom,
      "send-message-img": $props.sendMessageImg,
      "show-message-card": $props.showMessageCard,
      onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getphonenumber && $options.getphonenumber(...args)),
      onGetuserinfo: _cache[1] || (_cache[1] = (...args) => $options.getuserinfo && $options.getuserinfo(...args)),
      onError: _cache[2] || (_cache[2] = (...args) => $options.error && $options.error(...args)),
      onOpensetting: _cache[3] || (_cache[3] = (...args) => $options.opensetting && $options.opensetting(...args)),
      onLaunchapp: _cache[4] || (_cache[4] = (...args) => $options.launchapp && $options.launchapp(...args)),
      onChooseavatar: _cache[5] || (_cache[5] = (...args) => $options.chooseavatar && $options.chooseavatar(...args)),
      style: vue.normalizeStyle([$props.customStyle, {
        overflow: $props.ripple ? "hidden" : "visible"
      }]),
      onClick: _cache[6] || (_cache[6] = vue.withModifiers(($event) => $options.click($event), ["stop"])),
      "hover-class": $options.getHoverClass,
      loading: $props.loading
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.ripple ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["u-wave-ripple", [$data.waveActive ? "u-wave-active" : ""]]),
          style: vue.normalizeStyle({
            top: $data.rippleTop + "px",
            left: $data.rippleLeft + "px",
            width: $data.fields.targetWidth + "px",
            height: $data.fields.targetWidth + "px",
            "background-color": $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
          })
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ], 46, ["hover-start-time", "hover-stay-time", "disabled", "form-type", "open-type", "app-parameter", "hover-stop-propagation", "send-message-title", "lang", "data-name", "session-from", "send-message-img", "show-message-card", "hover-class", "loading"]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$c], ["__scopeId", "data-v-097def2b"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
  function broadcast(componentName, eventName, params) {
  }
  const Emitter = {
    methods: {
      /**
       * 派发 (向上查找) (一个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent[eventName](params);
        }
      },
      /**
       * 广播 (向下查找) (广播多个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
      }
    }
  };
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every(function(e) {
          return typeof e === "string";
        })) {
          formatAppLog("warn", "at uni_modules/vk-uview-ui/libs/util/async-validator.js:30", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format$2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (var arg = args[i]; i < len; arg = args[++i]) {
        str += " " + arg;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value2, type2) {
    if (value2 === void 0 || value2 === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value2) && !value2.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value2 === "string" && !value2) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func(a, count);
    });
  }
  function asyncSerialArray(arr, func, callback) {
    var index = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index;
      index = index + 1;
      if (original < arrLength) {
        func(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func, callback) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func, next);
      });
      _pending["catch"](function(e) {
        return e;
      });
      return _pending;
    }
    var firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func, next);
        } else {
          asyncParallelArray(arr, func, next);
        }
      });
    });
    pending["catch"](function(e) {
      return e;
    });
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge$1(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value2 = source[s];
          if (typeof value2 === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], {}, value2);
          } else {
            target[s] = value2;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value2, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value2, type2 || rule.type))) {
      errors.push(format$2(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value2, source, errors, options) {
    if (/^\s+$/.test(value2) || value2 === "") {
      errors.push(format$2(options.messages.whitespace, rule.fullField));
    }
  }
  var pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value2) {
      return types.number(value2) && parseInt(value2, 10) === value2;
    },
    "float": function float(value2) {
      return types.number(value2) && !types.integer(value2);
    },
    array: function array2(value2) {
      return Array.isArray(value2);
    },
    regexp: function regexp2(value2) {
      if (value2 instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value2);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value2) {
      return typeof value2.getTime === "function" && typeof value2.getMonth === "function" && typeof value2.getYear === "function";
    },
    number: function number2(value2) {
      if (isNaN(value2)) {
        return false;
      }
      return typeof +value2 === "number";
    },
    object: function object2(value2) {
      return typeof value2 === "object" && !types.array(value2);
    },
    method: function method2(value2) {
      return typeof value2 === "function";
    },
    email: function email2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.email) && value2.length < 255;
    },
    url: function url2(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.url);
    },
    hex: function hex(value2) {
      return typeof value2 === "string" && !!value2.match(pattern.hex);
    }
  };
  function type(rule, value2, source, errors, options) {
    if (rule.required && value2 === void 0) {
      required(rule, value2, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value2)) {
        errors.push(format$2(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value2 !== rule.type) {
      errors.push(format$2(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range$1(rule, value2, source, errors, options) {
    var len = typeof rule.len === "number";
    var min = typeof rule.min === "number";
    var max = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value2;
    var key = null;
    var num = typeof value2 === "number";
    var str = typeof value2 === "string";
    var arr = Array.isArray(value2);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value2.length;
    }
    if (str) {
      val = value2.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format$2(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format$2(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format$2(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format$2(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  var ENUM = "enum";
  function enumerable(rule, value2, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value2) === -1) {
      errors.push(format$2(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value2, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value2)) {
          errors.push(format$2(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value2)) {
          errors.push(format$2(options.messages.pattern.mismatch, rule.fullField, value2, rule.pattern));
        }
      }
    }
  }
  var rules = {
    required,
    whitespace,
    type,
    range: range$1,
    "enum": enumerable,
    pattern: pattern$1
  };
  function string(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "string");
      if (!isEmptyValue(value2, "string")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
        rules.pattern(rule, value2, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value2, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function number$1(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value2 === "") {
        value2 = void 0;
      }
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue(value2)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function array$1(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, "array");
      if (!isEmptyValue(value2, "array")) {
        rules.type(rule, value2, source, errors, options);
        rules.range(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function object$1(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  var ENUM$1 = "enum";
  function enumerable$1(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (value2 !== void 0) {
        rules[ENUM$1](rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue(value2, "string")) {
        rules.pattern(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function date$1(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
      if (!isEmptyValue(value2)) {
        var dateObject;
        if (typeof value2 === "number") {
          dateObject = new Date(value2);
        } else {
          dateObject = value2;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value2, callback, source, options) {
    var errors = [];
    var type2 = Array.isArray(value2) ? "array" : typeof value2;
    rules.required(rule, value2, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value2, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options, ruleType);
      if (!isEmptyValue(value2, ruleType)) {
        rules.type(rule, value2, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value2, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value2) && !rule.required) {
        return callback();
      }
      rules.required(rule, value2, source, errors, options);
    }
    callback(errors);
  }
  var validators$2 = {
    string,
    method,
    number: number$1,
    "boolean": _boolean,
    regexp,
    integer,
    "float": floatFn,
    array: array$1,
    object: object$1,
    "enum": enumerable$1,
    pattern: pattern$2,
    date: date$1,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge$1(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      var z;
      var item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      var _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        var i;
        var errors = [];
        var fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge$1(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var arr;
      var value2;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function(z) {
        arr = _this.rules[z];
        value2 = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value2 = source[z] = rule.transform(value2);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value: value2,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key
          });
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format$2(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              for (var k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res = rule.validator(rule, data.value, cb, data.source, options);
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(rule.message || rule.field + " fails");
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(function() {
            return cb();
          }, function(e) {
            return cb(e);
          });
        }
      }, function(results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators$2.hasOwnProperty(rule.type)) {
        throw new Error(format$2("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys = Object.keys(rule);
      var messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators$2.required;
      }
      return validators$2[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator2) {
    if (typeof validator2 !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators$2[type2] = validator2;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$m = {
    name: "u-form-item",
    mixins: [Emitter],
    inject: {
      uForm: {
        default() {
          return null;
        }
      }
    },
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [String, Boolean],
        default: ""
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 左侧图标的样式
      leftIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 左侧图标的样式
      rightIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      inputAlign: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        initialValue: "",
        // 存储的默认值
        // isRequired: false, // 是否必填，由于人性化考虑，必填"*"号通过props的required配置，不再通过rules的规则自动生成
        validateState: "",
        // 是否校验成功
        validateMessage: "",
        // 校验失败的提示语
        // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
        errorType: ["message"],
        fieldValue: "",
        // 获取当前子组件input的输入的值
        // 父组件的参数，在computed计算中，无法得知this.parent发生变化，故将父组件的参数值，放到data中
        parentData: {
          borderBottom: true,
          labelWidth: 90,
          labelPosition: "left",
          labelStyle: {},
          labelAlign: "left",
          inputAlign: "left"
        }
      };
    },
    watch: {
      validateState(val) {
        this.broadcastInputError();
      },
      // 监听u-form组件的errorType的变化
      "uForm.errorType"(val) {
        this.errorType = val;
        this.broadcastInputError();
      }
    },
    computed: {
      // 计算后的label宽度，由于需要多个判断，故放到computed中
      uLabelWidth() {
        return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
      },
      showError() {
        return (type2) => {
          if (this.errorType.indexOf("none") >= 0)
            return false;
          else if (this.errorType.indexOf(type2) >= 0)
            return true;
          else
            return false;
        };
      },
      // label的宽度
      elLabelWidth() {
        return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
      },
      // label的样式
      elLabelStyle() {
        return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
      },
      // label的位置，左侧或者上方
      elLabelPosition() {
        return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
      },
      // label的对齐方式
      elLabelAlign() {
        return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
      },
      // label的下划线
      elBorderBottom() {
        return this.borderBottom !== "" ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom : true;
      },
      elInputAlign() {
        return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
      }
    },
    methods: {
      broadcastInputError() {
        this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
      },
      // 判断是否需要required校验
      setRules() {
      },
      // 从u-form的rules属性中，取出当前u-form-item的校验规则
      getRules() {
        let rules2 = this.parent.rules;
        rules2 = rules2 ? rules2[this.prop] : [];
        return [].concat(rules2 || []);
      },
      // blur事件时进行表单校验
      onFieldBlur() {
        this.validation("blur");
      },
      // change事件进行表单校验
      onFieldChange() {
        this.validation("change");
      },
      // 过滤出符合要求的rule规则
      getFilteredRule(triggerType = "") {
        let rules2 = this.getRules();
        if (!triggerType)
          return rules2;
        return rules2.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
      },
      getData(dataObj, name, defaultValue) {
        let newDataObj;
        if (dataObj) {
          newDataObj = JSON.parse(JSON.stringify(dataObj));
          let k = "", d = ".", l = "[", r = "]";
          name = name.replace(/\s+/g, k) + d;
          let tstr = k;
          for (let i = 0; i < name.length; i++) {
            let theChar = name.charAt(i);
            if (theChar != d && theChar != l && theChar != r) {
              tstr += theChar;
            } else if (newDataObj) {
              if (tstr != k)
                newDataObj = newDataObj[tstr];
              tstr = k;
            }
          }
        }
        if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
          newDataObj = defaultValue;
        return newDataObj;
      },
      setData(dataObj, name, value2) {
        let dataValue;
        if (typeof value2 === "object") {
          dataValue = JSON.parse(JSON.stringify(value2));
        } else {
          dataValue = value2;
        }
        let regExp = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
        const patten = name.match(regExp);
        for (let i = 0; i < patten.length - 1; i++) {
          let keyName = patten[i];
          if (typeof dataObj[keyName] !== "object")
            dataObj[keyName] = {};
          dataObj = dataObj[keyName];
        }
        dataObj[patten[patten.length - 1]] = dataValue;
      },
      // 校验数据
      validation(trigger, callback = () => {
      }) {
        this.fieldValue = this.getData(this.parent.model, this.prop);
        let rules2 = this.getFilteredRule(trigger);
        if (!rules2 || rules2.length === 0) {
          return callback("");
        }
        this.validateState = "validating";
        let validator2 = new Schema({
          [this.prop]: rules2
        });
        validator2.validate({
          [this.prop]: this.fieldValue
        }, {
          firstFields: true
        }, (errors, fields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          let field = errors ? errors[0].field : "";
          callback(this.validateMessage, {
            state: this.validateState,
            key: field,
            msg: this.validateMessage
          });
        });
      },
      // 清空当前的u-form-item
      resetField() {
        this.setData(this.parent.model, this.prop, this.initialValue);
        this.validateState = "success";
      }
    },
    // 组件创建完成时，将当前实例保存到u-form中
    mounted() {
      this.parent = this.$u.$parent.call(this, "u-form");
      if (this.parent) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
        if (this.prop) {
          this.parent.fields.push(this);
          this.errorType = this.parent.errorType;
          this.initialValue = this.fieldValue;
          this.$nextTick(() => {
            this.setRules();
          });
        }
      }
    },
    beforeUnmount() {
      if (this.parent && this.prop) {
        this.parent.fields.map((item, index) => {
          if (item === this)
            this.parent.fields.splice(index, 1);
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-form-item", { "u-border-bottom": $options.elBorderBottom, "u-form-item__border-bottom--error": $data.validateState === "error" && $options.showError("border-bottom") }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-form-item__body",
            style: vue.normalizeStyle({
              flexDirection: $options.elLabelPosition == "left" ? "row" : "column"
            })
          },
          [
            vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
            vue.createElementVNode(
              "view",
              {
                class: "u-form-item--left",
                style: vue.normalizeStyle({
                  width: $options.uLabelWidth,
                  flex: `0 0 ${$options.uLabelWidth}`,
                  marginBottom: $options.elLabelPosition == "left" ? 0 : "10rpx"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                $props.required || $props.leftIcon || $props.label ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--left__content"
                }, [
                  vue.createCommentVNode(" nvue不支持伪元素before "),
                  $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "u-form-item--left__content--required"
                  }, "*")) : vue.createCommentVNode("v-if", true),
                  $props.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "u-form-item--left__content__icon"
                  }, [
                    vue.createVNode(_component_u_icon, {
                      name: $props.leftIcon,
                      "custom-style": $props.leftIconStyle
                    }, null, 8, ["name", "custom-style"])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "u-form-item--left__content__label",
                      style: vue.normalizeStyle([$options.elLabelStyle, {
                        "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
                      }])
                    },
                    vue.toDisplayString($props.label),
                    5
                    /* TEXT, STYLE */
                  )
                ])) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "u-form-item--right u-flex" }, [
              vue.createElementVNode("view", { class: "u-form-item--right__content" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "u-form-item--right__content__slot",
                    style: vue.normalizeStyle($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : "")
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  4
                  /* STYLE */
                ),
                _ctx.$slots.right || $props.rightIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--right__content__icon u-flex"
                }, [
                  $props.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                    key: 0,
                    "custom-style": $props.rightIconStyle,
                    name: $props.rightIcon
                  }, null, 8, ["custom-style", "name"])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ],
          4
          /* STYLE */
        ),
        $data.validateState === "error" && $options.showError("message") ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-form-item__message",
            style: vue.normalizeStyle({
              paddingLeft: $options.elLabelPosition == "left" ? _ctx.$u.addUnit($options.elLabelWidth) : "0",
              textAlign: $options.elInputAlign == "right" ? "right" : "left"
            })
          },
          vue.toDisplayString($data.validateMessage),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$b], ["__scopeId", "data-v-361fbc0d"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue"]]);
  const _sfc_main$l = {
    name: "u-divider",
    props: {
      // 单一边divider横线的宽度(数值)，单位rpx。或者百分比
      halfWidth: {
        type: [Number, String],
        default: 150
      },
      // divider横线的颜色，如设置，
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      // 主题色，可以是primary|info|success|warning|error之一值
      type: {
        type: String,
        default: "primary"
      },
      // 文字颜色
      color: {
        type: String,
        default: "#909399"
      },
      // 文字大小，单位rpx
      fontSize: {
        type: [Number, String],
        default: 26
      },
      // 整个divider的背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      // 整个divider的高度单位rpx
      height: {
        type: [Number, String],
        default: "auto"
      },
      // 上边距
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 下边距
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      // 是否使用slot传入内容，如果不用slot传入内容，先的中间就不会有空隙
      useSlot: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      lineStyle() {
        let style = {};
        if (String(this.halfWidth).indexOf("%") != -1)
          style.width = this.halfWidth;
        else
          style.width = this.halfWidth + "rpx";
        if (this.borderColor)
          style.borderColor = this.borderColor;
        return style;
      }
    },
    methods: {
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-divider",
        style: vue.normalizeStyle({
          height: $props.height == "auto" ? "auto" : $props.height + "rpx",
          backgroundColor: $props.bgColor,
          marginBottom: $props.marginBottom + "rpx",
          marginTop: $props.marginTop + "rpx"
        }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-divider-line", [$props.type ? "u-divider-line--bordercolor--" + $props.type : ""]]),
            style: vue.normalizeStyle([$options.lineStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        ),
        $props.useSlot ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-divider-text",
            style: vue.normalizeStyle({
              color: $props.color,
              fontSize: $props.fontSize + "rpx"
            })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-divider-line", [$props.type ? "u-divider-line--bordercolor--" + $props.type : ""]]),
            style: vue.normalizeStyle([$options.lineStyle])
          },
          null,
          6
          /* CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$a], ["__scopeId", "data-v-3203ecfe"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-divider/u-divider.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value2) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value2));
          } catch (e) {
          }
          currentSettings = value2;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value2) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value2);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.33
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject$2(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global$1 = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url2, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url2);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url2) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url2, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global$1.HTMLElement)) || "safari" in _global$1;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url2 = reader.result;
        if (typeof url2 !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url2 = isChromeIOS ? url2 : url2.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url2;
        } else {
          location.assign(url2);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url2 = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url2);
      else
        location.href = url2;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url2);
      }, 4e4);
    }
  }
  function toastMessage(message, type2) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type2);
    } else if (type2 === "error") {
      console.error(piniaMessage);
    } else if (type2 === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type2) {
    switch (type2) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type: type2 }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type2),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type2 === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type2 === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject$2(targetValue) && isPlainObject$2(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop$1 = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value2, key) => target.set(key, value2));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$2(targetValue) && isPlainObject$2(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject$2(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value2) => {
            triggerSubscriptions(afterCallbackList, value2);
            return value2;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject$2(newStateTarget) && isPlainObject$2(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value2 = store[key];
        if (vue.isRef(value2) || vue.isReactive(value2)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  function bind$2(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString: toString$1 } = Object.prototype;
  const { getPrototypeOf } = Object;
  const kindOf$1 = ((cache) => (thing) => {
    const str = toString$1.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest$1 = (type2) => {
    type2 = type2.toLowerCase();
    return (thing) => kindOf$1(thing) === type2;
  };
  const typeOfTest = (type2) => (thing) => typeof thing === type2;
  const { isArray: isArray$2 } = Array;
  const isUndefined$1 = typeOfTest("undefined");
  function isBuffer$1(val) {
    return val !== null && !isUndefined$1(val) && val.constructor !== null && !isUndefined$1(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer$1 = kindOfTest$1("ArrayBuffer");
  function isArrayBufferView$1(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer$1(val.buffer);
    }
    return result;
  }
  const isString$1 = typeOfTest("string");
  const isFunction$1 = typeOfTest("function");
  const isNumber$1 = typeOfTest("number");
  const isObject$1 = (thing) => thing !== null && typeof thing === "object";
  const isBoolean = (thing) => thing === true || thing === false;
  const isPlainObject$1 = (val) => {
    if (kindOf$1(val) !== "object") {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  const isDate$1 = kindOfTest$1("Date");
  const isFile$1 = kindOfTest$1("File");
  const isBlob$1 = kindOfTest$1("Blob");
  const isFileList$1 = kindOfTest$1("FileList");
  const isStream$1 = (val) => isObject$1(val) && isFunction$1(val.pipe);
  const isFormData$1 = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf$1(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
  };
  const isURLSearchParams$1 = kindOfTest$1("URLSearchParams");
  const trim$2 = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach$1(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray$2(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined$1(context) && context !== _global;
  function merge$1() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject$1(result[targetKey]) && isPlainObject$1(val)) {
        result[targetKey] = merge$1(result[targetKey], val);
      } else if (isPlainObject$1(val)) {
        result[targetKey] = merge$1({}, val);
      } else if (isArray$2(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach$1(arguments[i], assignValue);
    }
    return result;
  }
  const extend$1 = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach$1(b, (val, key) => {
      if (thisArg && isFunction$1(val)) {
        a[key] = bind$2(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  const stripBOM$1 = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits$1 = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject$1 = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith$1 = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray$1 = (thing) => {
    if (!thing)
      return null;
    if (isArray$2(thing))
      return thing;
    let i = thing.length;
    if (!isNumber$1(i))
      return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  const isTypedArray$1 = ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest$1("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const isRegExp = kindOfTest$1("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach$1(descriptors2, (descriptor, name) => {
      if (reducer(descriptor, name, obj) !== false) {
        reducedDescriptors[name] = descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value2 = obj[name];
      if (!isFunction$1(value2))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value2) => {
        obj[value2] = true;
      });
    };
    isArray$2(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {
  };
  const toFiniteNumber = (value2, defaultValue) => {
    value2 = +value2;
    return Number.isFinite(value2) ? value2 : defaultValue;
  };
  const ALPHA = "abcdefghijklmnopqrstuvwxyz";
  const DIGIT = "0123456789";
  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction$1(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  const toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject$1(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray$2(source) ? [] : {};
          forEach$1(source, (value2, key) => {
            const reducedValue = visit(value2, i + 1);
            !isUndefined$1(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest$1("AsyncFunction");
  const isThenable = (thing) => thing && (isObject$1(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
  const utils$3 = {
    isArray: isArray$2,
    isArrayBuffer: isArrayBuffer$1,
    isBuffer: isBuffer$1,
    isFormData: isFormData$1,
    isArrayBufferView: isArrayBufferView$1,
    isString: isString$1,
    isNumber: isNumber$1,
    isBoolean,
    isObject: isObject$1,
    isPlainObject: isPlainObject$1,
    isUndefined: isUndefined$1,
    isDate: isDate$1,
    isFile: isFile$1,
    isBlob: isBlob$1,
    isRegExp,
    isFunction: isFunction$1,
    isStream: isStream$1,
    isURLSearchParams: isURLSearchParams$1,
    isTypedArray: isTypedArray$1,
    isFileList: isFileList$1,
    forEach: forEach$1,
    merge: merge$1,
    extend: extend$1,
    trim: trim$2,
    stripBOM: stripBOM$1,
    inherits: inherits$1,
    toFlatObject: toFlatObject$1,
    kindOf: kindOf$1,
    kindOfTest: kindOfTest$1,
    endsWith: endsWith$1,
    toArray: toArray$1,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };
  function AxiosError$2(message, code2, config2, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code2 && (this.code = code2);
    config2 && (this.config = config2);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils$3.inherits(AxiosError$2, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$3.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  const prototype$2 = AxiosError$2.prototype;
  const descriptors$1 = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code2) => {
    descriptors$1[code2] = { value: code2 };
  });
  Object.defineProperties(AxiosError$2, descriptors$1);
  Object.defineProperty(prototype$2, "isAxiosError", { value: true });
  AxiosError$2.from = (error, code2, config2, request, response, customProps) => {
    const axiosError = Object.create(prototype$2);
    utils$3.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError$2.call(axiosError, error.message, code2, config2, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  const httpAdapter = null;
  function isVisitable(thing) {
    return utils$3.isPlainObject(thing) || utils$3.isArray(thing);
  }
  function removeBrackets(key) {
    return utils$3.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils$3.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$3.toFlatObject(utils$3, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils$3.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils$3.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils$3.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils$3.isSpecCompliantForm(formData);
    if (!utils$3.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value2) {
      if (value2 === null)
        return "";
      if (utils$3.isDate(value2)) {
        return value2.toISOString();
      }
      if (!useBlob && utils$3.isBlob(value2)) {
        throw new AxiosError$2("Blob is not supported. Use a Buffer instead.");
      }
      if (utils$3.isArrayBuffer(value2) || utils$3.isTypedArray(value2)) {
        return useBlob && typeof Blob === "function" ? new Blob([value2]) : Buffer.from(value2);
      }
      return value2;
    }
    function defaultVisitor(value2, key, path) {
      let arr = value2;
      if (value2 && !path && typeof value2 === "object") {
        if (utils$3.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value2 = JSON.stringify(value2);
        } else if (utils$3.isArray(value2) && isFlatArray(value2) || (utils$3.isFileList(value2) || utils$3.endsWith(key, "[]")) && (arr = utils$3.toArray(value2))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$3.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value2)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value2));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value2, path) {
      if (utils$3.isUndefined(value2))
        return;
      if (stack.indexOf(value2) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value2);
      utils$3.forEach(value2, function each(el, key) {
        const result = !(utils$3.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils$3.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils$3.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$2(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  const prototype$1 = AxiosURLSearchParams.prototype;
  prototype$1.append = function append(name, value2) {
    this._pairs.push([name, value2]);
  };
  prototype$1.toString = function toString2(encoder) {
    const _encode = encoder ? function(value2) {
      return encoder.call(this, value2, encode$2);
    } : encode$2;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode$1(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL$2(url2, params, options) {
    if (!params) {
      return url2;
    }
    const _encode = options && options.encode || encode$1;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$3.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$3.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }
  const InterceptorManager$1 = InterceptorManager;
  const transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  const isStandardBrowserEnv$1 = (() => {
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  })();
  const isStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const platform = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    isStandardBrowserEnv: isStandardBrowserEnv$1,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value2, key, path, helpers) {
        if (platform.isNode && utils$3.isBuffer(value2)) {
          this.append(key, value2.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  function parsePropPath(name) {
    return utils$3.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value2, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$3.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$3.hasOwnProp(target, name)) {
          target[name] = [target[name], value2];
        } else {
          target[name] = value2;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils$3.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value2, target[name], index);
      if (result && utils$3.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$3.isFormData(formData) && utils$3.isFunction(formData.entries)) {
      const obj = {};
      utils$3.forEachEntry(formData, (name, value2) => {
        buildPath(parsePropPath(name), value2, obj, 0);
      });
      return obj;
    }
    return null;
  }
  const DEFAULT_CONTENT_TYPE = {
    "Content-Type": void 0
  };
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$3.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$3.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$3.isObject(data);
      if (isObjectPayload && utils$3.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$3.isFormData(data);
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data;
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$3.isArrayBuffer(data) || utils$3.isBuffer(data) || utils$3.isStream(data) || utils$3.isFile(data) || utils$3.isBlob(data)) {
        return data;
      }
      if (utils$3.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$3.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils$3.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (data && utils$3.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError$2.from(e, AxiosError$2.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils$3.forEach(["delete", "get", "head"], function forEachMethodNoData(method2) {
    defaults.headers[method2] = {};
  });
  utils$3.forEach(["post", "put", "patch"], function forEachMethodWithData(method2) {
    defaults.headers[method2] = utils$3.merge(DEFAULT_CONTENT_TYPE);
  });
  const defaults$1 = defaults;
  const ignoreDuplicateOf = utils$3.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  const parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  const $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value2) {
    if (value2 === false || value2 == null) {
      return value2;
    }
    return utils$3.isArray(value2) ? value2.map(normalizeValue) : String(value2);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value2, header, filter, isHeaderNameFilter) {
    if (utils$3.isFunction(filter)) {
      return filter.call(this, value2, header);
    }
    if (isHeaderNameFilter) {
      value2 = header;
    }
    if (!utils$3.isString(value2))
      return;
    if (utils$3.isString(filter)) {
      return value2.indexOf(filter) !== -1;
    }
    if (utils$3.isRegExp(filter)) {
      return filter.test(value2);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$3.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils$3.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$3.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$3.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$3.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$3.findKey(this, header);
        if (key) {
          const value2 = this[key];
          if (!parser) {
            return value2;
          }
          if (parser === true) {
            return parseTokens(value2);
          }
          if (utils$3.isFunction(parser)) {
            return parser.call(this, value2, key);
          }
          if (utils$3.isRegExp(parser)) {
            return parser.exec(value2);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$3.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$3.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils$3.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format2) {
      const self2 = this;
      const headers = {};
      utils$3.forEach(this, (value2, header) => {
        const key = utils$3.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value2);
          delete self2[header];
          return;
        }
        const normalized = format2 ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value2);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils$3.forEach(this, (value2, header) => {
        value2 != null && value2 !== false && (obj[header] = asStrings && utils$3.isArray(value2) ? value2.join(", ") : value2);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value2]) => header + ": " + value2).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils$3.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  }
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils$3.freezeMethods(AxiosHeaders.prototype);
  utils$3.freezeMethods(AxiosHeaders);
  const AxiosHeaders$1 = AxiosHeaders;
  function transformData(fns, response) {
    const config2 = this || defaults$1;
    const context = response || config2;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils$3.forEach(fns, function transform(fn) {
      data = fn.call(config2, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel(value2) {
    return !!(value2 && value2.__CANCEL__);
  }
  function CanceledError(message, config2, request) {
    AxiosError$2.call(this, message == null ? "canceled" : message, AxiosError$2.ERR_CANCELED, config2, request);
    this.name = "CanceledError";
  }
  utils$3.inherits(CanceledError, AxiosError$2, {
    __CANCEL__: true
  });
  function settle$2(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError$2(
        "Request failed with status code " + response.status,
        [AxiosError$2.ERR_BAD_REQUEST, AxiosError$2.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  const cookies = platform.isStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value2, expires, path, domain, secure) {
          const cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value2));
          if (utils$3.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils$3.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils$3.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  function isAbsoluteURL$2(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  }
  function combineURLs$2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function buildFullPath$2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL$2(requestedURL)) {
      return combineURLs$2(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const isURLSameOrigin = platform.isStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url2) {
        let href = url2;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        const parsed = utils$3.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  function parseProtocol(url2) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now2 = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now2;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now2;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now2 - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now2 - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return (e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  const xhrAdapter = isXHRAdapterSupported && function(config2) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let requestData = config2.data;
      const requestHeaders = AxiosHeaders$1.from(config2.headers).normalize();
      const responseType = config2.responseType;
      let onCanceled;
      function done() {
        if (config2.cancelToken) {
          config2.cancelToken.unsubscribe(onCanceled);
        }
        if (config2.signal) {
          config2.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils$3.isFormData(requestData)) {
        if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
          requestHeaders.setContentType(false);
        } else {
          requestHeaders.setContentType("multipart/form-data;", false);
        }
      }
      let request = new XMLHttpRequest();
      if (config2.auth) {
        const username = config2.auth.username || "";
        const password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : "";
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
      }
      const fullPath = buildFullPath$2(config2.baseURL, config2.url);
      request.open(config2.method.toUpperCase(), buildURL$2(fullPath, config2.params, config2.paramsSerializer), true);
      request.timeout = config2.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config2,
          request
        };
        settle$2(function _resolve(value2) {
          resolve(value2);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config2, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config2, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded";
        const transitional = config2.transitional || transitionalDefaults;
        if (config2.timeoutErrorMessage) {
          timeoutErrorMessage = config2.timeoutErrorMessage;
        }
        reject(new AxiosError$2(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED,
          config2,
          request
        ));
        request = null;
      };
      if (platform.isStandardBrowserEnv) {
        const xsrfValue = (config2.withCredentials || isURLSameOrigin(fullPath)) && config2.xsrfCookieName && cookies.read(config2.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config2.xsrfHeaderName, xsrfValue);
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils$3.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils$3.isUndefined(config2.withCredentials)) {
        request.withCredentials = !!config2.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config2.responseType;
      }
      if (typeof config2.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer(config2.onDownloadProgress, true));
      }
      if (typeof config2.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer(config2.onUploadProgress));
      }
      if (config2.cancelToken || config2.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config2, request) : cancel);
          request.abort();
          request = null;
        };
        config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
        if (config2.signal) {
          config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(fullPath);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config2));
        return;
      }
      request.send(requestData || null);
    });
  };
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter
  };
  utils$3.forEach(knownAdapters, (fn, value2) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value: value2 });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value: value2 });
    }
  });
  const adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils$3.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters2[i];
        if (adapter = utils$3.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
          break;
        }
      }
      if (!adapter) {
        if (adapter === false) {
          throw new AxiosError$2(
            `Adapter ${nameOrAdapter} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          );
        }
        throw new Error(
          utils$3.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
        );
      }
      if (!utils$3.isFunction(adapter)) {
        throw new TypeError("adapter is not a function");
      }
      return adapter;
    },
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config2) {
    if (config2.cancelToken) {
      config2.cancelToken.throwIfRequested();
    }
    if (config2.signal && config2.signal.aborted) {
      throw new CanceledError(null, config2);
    }
  }
  function dispatchRequest(config2) {
    throwIfCancellationRequested(config2);
    config2.headers = AxiosHeaders$1.from(config2.headers);
    config2.data = transformData.call(
      config2,
      config2.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config2.method) !== -1) {
      config2.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config2.adapter || defaults$1.adapter);
    return adapter(config2).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config2);
      response.data = transformData.call(
        config2,
        config2.transformResponse,
        response
      );
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config2);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config2,
            config2.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config3 = {};
    function getMergedValue(target, source, caseless) {
      if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source)) {
        return utils$3.merge.call({ caseless }, target, source);
      } else if (utils$3.isPlainObject(source)) {
        return utils$3.merge({}, source);
      } else if (utils$3.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, caseless) {
      if (!utils$3.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils$3.isUndefined(a)) {
        return getMergedValue(void 0, a, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils$3.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils$3.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils$3.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    utils$3.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
    });
    return config3;
  }
  const VERSION = "1.4.0";
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type2, i) => {
    validators$1[type2] = function validator2(thing) {
      return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value2, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError$2(
          formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
          AxiosError$2.ERR_DEPRECATED
        );
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        formatAppLog(
          "warn",
          "at node_modules/axios/lib/helpers/validator.js:43",
          formatMessage(
            opt,
            " has been deprecated since v" + version2 + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value2, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError$2("options must be an object", AxiosError$2.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator2 = schema[opt];
      if (validator2) {
        const value2 = options[opt];
        const result = value2 === void 0 || validator2(value2, opt, options);
        if (result !== true) {
          throw new AxiosError$2("option " + opt + " must be " + result, AxiosError$2.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$2("Unknown option " + opt, AxiosError$2.ERR_BAD_OPTION);
      }
    }
  }
  const validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager$1(),
        response: new InterceptorManager$1()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl, config2) {
      if (typeof configOrUrl === "string") {
        config2 = config2 || {};
        config2.url = configOrUrl;
      } else {
        config2 = configOrUrl || {};
      }
      config2 = mergeConfig(this.defaults, config2);
      const { transitional, paramsSerializer, headers } = config2;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils$3.isFunction(paramsSerializer)) {
          config2.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }
      config2.method = (config2.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders;
      contextHeaders = headers && utils$3.merge(
        headers.common,
        headers[config2.method]
      );
      contextHeaders && utils$3.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method2) => {
          delete headers[method2];
        }
      );
      config2.headers = AxiosHeaders$1.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config2);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config2;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config2) {
      config2 = mergeConfig(this.defaults, config2);
      const fullPath = buildFullPath$2(config2.baseURL, config2.url);
      return buildURL$2(fullPath, config2.params, config2.paramsSerializer);
    }
  }
  utils$3.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method2) {
    Axios.prototype[method2] = function(url2, config2) {
      return this.request(mergeConfig(config2 || {}, {
        method: method2,
        url: url2,
        data: (config2 || {}).data
      }));
    };
  });
  utils$3.forEach(["post", "put", "patch"], function forEachMethodWithData(method2) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url2, data, config2) {
        return this.request(mergeConfig(config2 || {}, {
          method: method2,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: url2,
          data
        }));
      };
    }
    Axios.prototype[method2] = generateHTTPMethod();
    Axios.prototype[method2 + "Form"] = generateHTTPMethod(true);
  });
  const Axios$1 = Axios;
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners)
          return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config2, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message, config2, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  }
  const CancelToken$1 = CancelToken;
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError(payload) {
    return utils$3.isObject(payload) && payload.isAxiosError === true;
  }
  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value2]) => {
    HttpStatusCode[value2] = key;
  });
  const HttpStatusCode$1 = HttpStatusCode;
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance2 = bind$2(Axios$1.prototype.request, context);
    utils$3.extend(instance2, Axios$1.prototype, context, { allOwnKeys: true });
    utils$3.extend(instance2, context, null, { allOwnKeys: true });
    instance2.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance2;
  }
  const axios = createInstance(defaults$1);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;
  axios.AxiosError = AxiosError$2;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (thing) => formDataToJSON(utils$3.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;
  const axios$1 = axios;
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var axiosAdapterUniappExports = {};
  var axiosAdapterUniapp = {
    get exports() {
      return axiosAdapterUniappExports;
    },
    set exports(v) {
      axiosAdapterUniappExports = v;
    }
  };
  var isMultiUpload$1 = function isMultiUpload2(config2) {
    return Array.isArray(config2.files) && config2.files.length > 0;
  };
  const isMultiUpload = isMultiUpload$1;
  var isUploadFile$2 = function isUploadFile2(config2) {
    if (config2.method === "post") {
      if (config2.filePath && config2.name)
        return true;
      if (isMultiUpload(config2))
        return true;
    }
    return false;
  };
  var bind$1 = function bind2(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  var bind = bind$1;
  var toString = Object.prototype.toString;
  var kindOf = function(cache) {
    return function(thing) {
      var str = toString.call(thing);
      return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
  }(/* @__PURE__ */ Object.create(null));
  function kindOfTest(type2) {
    type2 = type2.toLowerCase();
    return function isKindOf(thing) {
      return kindOf(thing) === type2;
    };
  }
  function isArray$1(val) {
    return Array.isArray(val);
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isPlainObject(val) {
    if (kindOf(val) !== "object") {
      return false;
    }
    var prototype2 = Object.getPrototypeOf(val);
    return prototype2 === null || prototype2 === Object.prototype;
  }
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  function isFormData(thing) {
    var pattern2 = "[object FormData]";
    return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern2 || isFunction(thing.toString) && thing.toString() === pattern2);
  }
  var isURLSearchParams = kindOfTest("URLSearchParams");
  function trim$1(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray$1(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray$1(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === "function") {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  function inherits(constructor, superConstructor, props, descriptors2) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    props && Object.assign(constructor.prototype, props);
  }
  function toFlatObject(sourceObj, destObj, filter) {
    var props;
    var i;
    var prop;
    var merged = {};
    destObj = destObj || {};
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if (!merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = Object.getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  }
  function endsWith(str, searchString, position) {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    var lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }
  function toArray(thing) {
    if (!thing)
      return null;
    var i = thing.length;
    if (isUndefined(i))
      return null;
    var arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  }
  var isTypedArray = function(TypedArray) {
    return function(thing) {
      return TypedArray && thing instanceof TypedArray;
    };
  }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
  var utils$2 = {
    isArray: isArray$1,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim: trim$1,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    isTypedArray,
    isFileList
  };
  var utils$1 = utils$2;
  function AxiosError$1(message, code2, config2, request, response) {
    Error.call(this);
    this.message = message;
    this.name = "AxiosError";
    code2 && (this.code = code2);
    config2 && (this.config = config2);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils$1.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  var prototype = AxiosError$1.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED"
    // eslint-disable-next-line func-names
  ].forEach(function(code2) {
    descriptors[code2] = { value: code2 };
  });
  Object.defineProperties(AxiosError$1, descriptors);
  Object.defineProperty(prototype, "isAxiosError", { value: true });
  AxiosError$1.from = function(error, code2, config2, request, response, customProps) {
    var axiosError = Object.create(prototype);
    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    });
    AxiosError$1.call(axiosError, error.message, code2, config2, request, response);
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_1 = AxiosError$1;
  var AxiosError = AxiosError_1;
  var settle$1 = function settle2(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError(
        "Request failed with status code " + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  };
  var utils = utils$2;
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  var buildURL$1 = function buildURL2(url2, params, paramsSerializer) {
    if (!params) {
      return url2;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils.isArray(val)) {
          key = key + "[]";
        } else {
          val = [val];
        }
        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + "=" + encode(v));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url2.indexOf("#");
      if (hashmarkIndex !== -1) {
        url2 = url2.slice(0, hashmarkIndex);
      }
      url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
  };
  var isAbsoluteURL$1 = function isAbsoluteURL2(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
  };
  var combineURLs$1 = function combineURLs2(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  var isAbsoluteURL = isAbsoluteURL$1;
  var combineURLs = combineURLs$1;
  var buildFullPath$1 = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };
  var settle = settle$1;
  var buildURL = buildURL$1;
  var buildFullPath = buildFullPath$1;
  const isUploadFile$1 = isUploadFile$2;
  var format$1 = function format2(config2, resolve, reject) {
    const fullPath = buildFullPath(config2.baseURL, config2.url);
    const requestHeaders = config2.headers;
    const uniConfig = {
      ...config2,
      url: buildURL(fullPath, config2.params, config2.paramsSerializer),
      // uniapp 用的是 header
      header: requestHeaders
    };
    if (isUploadFile$1(config2)) {
      delete requestHeaders["Content-Type"];
      if (config2.formData) {
        uniConfig.formData = config2.formData;
      } else {
        if (typeof config2.data === "string") {
          uniConfig.formData = JSON.parse(config2.data);
        } else {
          uniConfig.formData = config2.data;
        }
      }
    } else if (config2.method === "get") {
      uniConfig.data = config2.data ? config2.data : config2.params;
    } else {
      uniConfig.data = config2.data;
    }
    if (config2.auth) {
      var username = config2.auth.username || "";
      var password = unescape(encodeURIComponent(config2.auth.password)) || "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    uniConfig.complete = function(response) {
      var result = {
        data: response.data,
        status: response.statusCode,
        statusText: response.errMsg,
        header: response.header,
        config: config2
        // request: request
      };
      settle(resolve, reject, result);
    };
    return uniConfig;
  };
  const isUploadFile = isUploadFile$2;
  const format = format$1;
  function uniappAdapter(config2 = {}) {
    return new Promise(function dispatchUniApp(resolve, reject) {
      const uniConfig = format(config2, resolve, reject);
      let requestTask = null;
      if (config2.cancelToken) {
        config2.cancelToken.promise.then(function onCanceled(cancel) {
          if (!requestTask) {
            return;
          }
          requestTask.abort();
          reject(cancel);
          requestTask = null;
        });
      }
      if (isUploadFile(config2)) {
        requestTask = uni.uploadFile(uniConfig);
      } else {
        requestTask = uni.request(uniConfig);
      }
    });
  }
  axiosAdapterUniapp.exports = uniappAdapter;
  axiosAdapterUniappExports.default = uniappAdapter;
  const instance = axios$1.create({
    // baseURL: 'http://localhost:8089/account/api', // 设置基础URL
    baseURL: "http://120.46.203.181:8089/account/api",
    // 设置基础URL
    timeout: 5e3,
    // 设置请求超时时间
    crossDomain: true,
    //允许跨域
    adapter: axiosAdapterUniappExports,
    //配置适配器 adapter: axiosAdapterUniapp,
    headers: {
      Authorization: "Bearer [token]"
      // 设置默认请求头
    }
  });
  instance.interceptors.request.use(
    (config2) => {
      const value2 = uni.getStorageSync("storage_key");
      config2.headers["Authorization"] = value2;
      return config2;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const useClassStore = defineStore("classID", {
    state: () => ({
      bookStore: []
    }),
    actions: {
      async getClassName() {
        try {
          const userId = uni.getStorageSync("storage_id");
          formatAppLog("log", "at common/stores/className.js:14", "getClassName的uid=" + userId);
          const response = await instance.get("/data/className?userId=" + userId);
          this.bookStore = response.data;
          formatAppLog("log", "at common/stores/className.js:17", "分页数据=" + response.data);
          formatAppLog("log", "at common/stores/className.js:18", "book数据=" + this.bookStore);
        } catch (error) {
          formatAppLog("error", "at common/stores/className.js:20", error);
        }
      }
    }
  });
  const useHomeStore = defineStore("HomeId", {
    state: () => ({
      tableDataStore: []
    }),
    getters: {
      totalMoney(state) {
        return state.tableDataStore.reduce((prev, curr) => prev + curr.money, 0);
      },
      totalPerson(state) {
        return state.tableDataStore.length;
      }
    },
    actions: {
      async getTableData(option) {
        try {
          const res = await instance.get("data/show?modelId=" + option);
          this.tableDataStore = res.data;
          formatAppLog("log", "at common/stores/home.js:26", "useHomeStore的数1=" + res.data);
        } catch (e) {
        }
      }
    }
  });
  const _sfc_main$k = {
    __name: "index",
    setup(__props) {
      const homeStore = useHomeStore();
      const { getTableData } = homeStore;
      const classStore = useClassStore();
      const { bookStore } = storeToRefs(classStore);
      const { getClassName } = classStore;
      const book = vue.ref(bookStore);
      vue.ref([]);
      const token = uni.getStorageSync("storage_key");
      vue.onMounted(() => {
        if (token == "") {
          setTimeout(() => {
            uni.showModal({
              title: "登录",
              content: "欢迎回来我们一起去登录吧",
              success: function(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: "/pages/me/login/login"
                  });
                } else if (res.cancel) {
                  return;
                }
              }
            });
          }, 3e3);
        } else {
          return;
        }
      });
      function onLongPress(index, mid) {
        uni.showModal({
          title: "删除",
          content: "你确定要删除这个账本吗",
          success: function(res) {
            if (res.confirm) {
              formatAppLog("log", "at pages/index/index.vue:118", "账本id=" + mid);
              instance.get("/data/deleteBook?mid=" + mid).then(() => {
                book.value.splice(index, 1);
              });
            } else if (res.cancel) {
              formatAppLog("log", "at pages/index/index.vue:124", "用户点击取消");
            }
          }
        });
      }
      const userId = uni.getStorageSync("storage_id");
      function createBook() {
        uni.showModal({
          title: "请备注账本名字",
          editable: true,
          placeholderText: "请输入",
          success: function(res) {
            if (res.confirm) {
              if (res.content !== "") {
                formatAppLog("log", "at pages/index/index.vue:145", res.content);
                formatAppLog("log", "at pages/index/index.vue:147", "用户id=" + userId);
                instance.get("data/newBook?note=" + res.content + "&userId=" + userId).then(() => {
                  getClassName();
                }).catch(() => {
                  uni.showToast({
                    title: "修改失败,请重试",
                    duration: 2e3,
                    icon: "error"
                  });
                });
              } else {
                uni.showToast({
                  title: "账本名字不能为空",
                  duration: 1800,
                  icon: "error"
                });
              }
            } else if (res.cancel) {
              formatAppLog("log", "at pages/index/index.vue:169", "用户点击了取消");
              return;
            }
          }
        });
      }
      function gotoHome(index) {
        uni.navigateTo({
          url: "/pages/index/home?obj=" + encodeURIComponent(JSON.stringify(book.value[index]))
        });
      }
      function toSearch() {
        formatAppLog("log", "at pages/index/index.vue:186", "搜索");
        uni.navigateTo({
          url: "/pages/index/search/search?"
        });
      }
      onPullDownRefresh(() => {
        formatAppLog("log", "at pages/index/index.vue:194", "refresh");
        getClassName();
        setTimeout(function() {
          uni.stopPullDownRefresh();
        }, 1e3);
      });
      return (_ctx, _cache) => {
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2$1);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
        const _component_u_divider = resolveEasycom(vue.resolveDynamicComponent("u-divider"), __easycom_3$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "main-top" }, [
          vue.createCommentVNode(" 搜索 "),
          vue.createElementVNode("view", null, [
            vue.createVNode(_component_u_button, {
              style: { "height": "30px" },
              onClick: _cache[0] || (_cache[0] = ($event) => toSearch())
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_icon, {
                  name: "search",
                  color: "#2979ff",
                  size: "28"
                }),
                vue.createTextVNode(" 搜索 ")
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 标题 "),
            vue.createVNode(_component_u_form_item, { style: { "padding-left": "3%" } }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("h3", null, "账本")
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          vue.createCommentVNode(" 主页类容 "),
          vue.createElementVNode("view", { class: "main-center" }, [
            vue.createCommentVNode(" 记账本个数 "),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(book.value, (value2, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "u-card",
                  key: index
                }, [
                  vue.createElementVNode("view", {
                    onClick: ($event) => gotoHome(index)
                  }, [
                    vue.createElementVNode("view", {
                      class: "card",
                      onLongpress: ($event) => onLongPress(index, value2.mid),
                      onClick: ($event) => vue.unref(getTableData)(value2.mid)
                    }, [
                      vue.createCommentVNode(" 编写卡片类容 "),
                      vue.createElementVNode(
                        "h4",
                        null,
                        vue.toDisplayString(value2.className),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "card-content" }, [
                        vue.createElementVNode("text", { style: { "margin": "4px" } }, "人数:"),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(_ctx.totalMoney),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "card-content" }, [
                        vue.createElementVNode("text", { style: { "margin": "4px" } }, "金额:"),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(_ctx.totalPerson),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 40, ["onLongpress", "onClick"]),
                    vue.createElementVNode(
                      "text",
                      { class: "text" },
                      vue.toDisplayString(value2.createTime),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createCommentVNode(" 添加账本 "),
            vue.createElementVNode("view", {
              class: "u-card",
              onClick: _cache[1] || (_cache[1] = ($event) => createBook())
            }, [
              vue.createElementVNode("view", { class: "card" }, [
                vue.createVNode(_component_u_icon, {
                  name: "plus-circle",
                  size: "28"
                })
              ]),
              vue.createElementVNode("text", null, "新建账本.....")
            ])
          ]),
          vue.createVNode(_component_u_divider, { style: { "margin-top": "7%" } }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("没有更多了")
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "E:/uni-app/account/pages/index/index.vue"]]);
  let base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
  const _sfc_main$j = {
    name: "u-avatar",
    emits: ["click"],
    props: {
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 头像路径
      src: {
        type: String,
        default: ""
      },
      // 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx
      // 宽度等于高度
      size: {
        type: [String, Number],
        default: "default"
      },
      // 头像模型，square-带圆角方形，circle-圆形
      mode: {
        type: String,
        default: "circle"
      },
      // 文字内容
      text: {
        type: String,
        default: ""
      },
      // 图片的裁剪模型
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 标识符
      index: {
        type: [String, Number],
        default: ""
      },
      // 右上角性别角标，man-男，woman-女
      sexIcon: {
        type: String,
        default: "man"
      },
      // 右下角的等级图标
      levelIcon: {
        type: String,
        default: "level"
      },
      // 右下角等级图标背景颜色
      levelBgColor: {
        type: String,
        default: ""
      },
      // 右上角性别图标的背景颜色
      sexBgColor: {
        type: String,
        default: ""
      },
      // 是否显示性别图标
      showSex: {
        type: Boolean,
        default: false
      },
      // 是否显示等级图标
      showLevel: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        error: false,
        // 头像的地址，因为如果加载错误，需要赋值为默认图片，props值无法修改，所以需要一个中间值
        avatar: this.src ? this.src : base64Avatar
      };
    },
    watch: {
      src(n) {
        if (!n) {
          this.avatar = base64Avatar;
          this.error = true;
        } else {
          this.avatar = n;
          this.error = false;
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.height = this.size == "large" ? "120rpx" : this.size == "default" ? "90rpx" : this.size == "mini" ? "70rpx" : this.size + "rpx";
        style.width = style.height;
        style.flex = `0 0 ${style.height}`;
        style.backgroundColor = this.bgColor;
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        if (this.text)
          style.padding = `0 6rpx`;
        return style;
      },
      imgStyle() {
        let style = {};
        style.borderRadius = this.mode == "circle" ? "500px" : "5px";
        return style;
      },
      // 取字符串的第一个字符
      uText() {
        return String(this.text)[0];
      },
      // 性别图标的自定义样式
      uSexStyle() {
        let style = {};
        if (this.sexBgColor)
          style.backgroundColor = this.sexBgColor;
        return style;
      },
      // 等级图标的自定义样式
      uLevelStyle() {
        let style = {};
        if (this.levelBgColor)
          style.backgroundColor = this.levelBgColor;
        return style;
      }
    },
    methods: {
      // 图片加载错误时，显示默认头像
      loadError() {
        this.error = true;
        this.avatar = base64Avatar;
      },
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-avatar",
        style: vue.normalizeStyle([$options.wrapStyle]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        !$options.uText && $data.avatar ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          onError: _cache[0] || (_cache[0] = (...args) => $options.loadError && $options.loadError(...args)),
          style: vue.normalizeStyle([$options.imgStyle]),
          class: "u-avatar__img",
          src: $data.avatar,
          mode: $props.imgMode
        }, null, 44, ["src", "mode"])) : $options.uText ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "u-line-1",
            style: {
              fontSize: "38rpx"
            }
          },
          vue.toDisplayString($options.uText),
          1
          /* TEXT */
        )) : vue.renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true),
        $props.showSex ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 3,
            class: vue.normalizeClass(["u-avatar__sex", ["u-avatar__sex--" + $props.sexIcon]]),
            style: vue.normalizeStyle([$options.uSexStyle])
          },
          [
            vue.createVNode(_component_u_icon, {
              name: $props.sexIcon,
              size: "20"
            }, null, 8, ["name"])
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        $props.showLevel ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 4,
            class: "u-avatar__level",
            style: vue.normalizeStyle([$options.uLevelStyle])
          },
          [
            vue.createVNode(_component_u_icon, {
              name: $props.levelIcon,
              size: "20"
            }, null, 8, ["name"])
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$9], ["__scopeId", "data-v-49012a02"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-avatar/u-avatar.vue"]]);
  const _sfc_main$i = {
    name: "u-cell-item",
    emits: ["click"],
    props: {
      // 左侧图标名称(只能uView内置图标)，或者图标src
      icon: {
        type: String,
        default: ""
      },
      // 左侧标题
      title: {
        type: [String, Number],
        default: ""
      },
      // 右侧内容
      value: {
        type: [String, Number],
        default: ""
      },
      // 标题下方的描述信息
      label: {
        type: [String, Number],
        default: ""
      },
      // 是否显示下边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // 是否显示上边框
      borderTop: {
        type: Boolean,
        default: false
      },
      // 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
      // 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
      // borderGap: {
      // 	type: Boolean,
      // 	default: true
      // },
      // 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
      hoverClass: {
        type: String,
        default: "u-cell-hover"
      },
      // 是否显示右侧箭头
      arrow: {
        type: Boolean,
        default: true
      },
      // 内容是否垂直居中
      center: {
        type: Boolean,
        default: false
      },
      // 是否显示左边表示必填的星号
      required: {
        type: Boolean,
        default: false
      },
      // 标题的宽度，单位rpx
      titleWidth: {
        type: [Number, String],
        default: ""
      },
      // 右侧箭头方向，可选值：right|up|down，默认为right
      arrowDirection: {
        type: String,
        default: "right"
      },
      // 控制标题的样式
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 右侧显示内容的样式
      valueStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 描述信息的样式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 用于识别被点击的是第几个cell
      index: {
        type: [String, Number],
        default: ""
      },
      // 是否使用lable插槽
      useLabelSlot: {
        type: Boolean,
        default: false
      },
      // 左边图标的大小，单位rpx，只对传入icon字段时有效
      iconSize: {
        type: [Number, String],
        default: 34
      },
      // 左边图标的样式，对象形式
      iconStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      arrowStyle() {
        let style = {};
        if (this.arrowDirection == "up")
          style.transform = "rotate(-90deg)";
        else if (this.arrowDirection == "down")
          style.transform = "rotate(90deg)";
        else
          style.transform = "rotate(0deg)";
        return style;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", {
      onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args)),
      class: vue.normalizeClass(["u-cell", { "u-border-bottom": $props.borderBottom, "u-border-top": $props.borderTop, "u-col-center": $props.center, "u-cell--required": $props.required }]),
      "hover-stay-time": "150",
      "hover-class": $props.hoverClass,
      style: vue.normalizeStyle({
        backgroundColor: $props.bgColor
      })
    }, [
      $props.icon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 0,
        size: $props.iconSize,
        name: $props.icon,
        "custom-style": $props.iconStyle,
        class: "u-cell__left-icon-wrap"
      }, null, 8, ["size", "name", "custom-style"])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "u-flex"
      }, [
        vue.renderSlot(_ctx.$slots, "icon", {}, void 0, true)
      ])),
      vue.createElementVNode(
        "view",
        {
          class: "u-cell_title",
          style: vue.normalizeStyle([
            {
              width: $props.titleWidth ? $props.titleWidth + "rpx" : "auto"
            },
            $props.titleStyle
          ])
        },
        [
          $props.title !== "" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createTextVNode(
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, void 0, true),
          $props.label || _ctx.$slots.label ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: "u-cell__label",
              style: vue.normalizeStyle([$props.labelStyle])
            },
            [
              $props.label !== "" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(
                    vue.toDisplayString($props.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : vue.renderSlot(_ctx.$slots, "label", { key: 1 }, void 0, true)
            ],
            4
            /* STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        4
        /* STYLE */
      ),
      vue.createElementVNode(
        "view",
        {
          class: "u-cell__value",
          style: vue.normalizeStyle([$props.valueStyle])
        },
        [
          $props.value !== "" ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              vue.createTextVNode(
                vue.toDisplayString($props.value),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
        ],
        4
        /* STYLE */
      ),
      _ctx.$slots["right-icon"] ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "u-flex u-cell_right"
      }, [
        vue.renderSlot(_ctx.$slots, "right-icon", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      $props.arrow ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
        key: 3,
        name: "arrow-right",
        style: vue.normalizeStyle([$options.arrowStyle]),
        class: "u-icon-wrap u-cell__right-icon-wrap"
      }, null, 8, ["style"])) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$8], ["__scopeId", "data-v-e5554f60"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.vue"]]);
  const _sfc_main$h = {
    name: "u-cell-group",
    props: {
      // 分组标题
      title: {
        type: String,
        default: ""
      },
      // 是否显示分组list上下边框
      border: {
        type: Boolean,
        default: true
      },
      // 分组标题的样式，对象形式，注意驼峰属性写法
      // 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        index: 0
      };
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-cell-box" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "u-cell-title",
          style: vue.normalizeStyle([$props.titleStyle])
        },
        vue.toDisplayString($props.title),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-cell-item-box", { "u-border-bottom u-border-top": $props.border }])
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$7], ["__scopeId", "data-v-dd1e88cb"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.vue"]]);
  const usePersonalStore = defineStore("PersonalID", {
    state: () => ({
      personalArr: []
    }),
    actions: {
      async getPersonal() {
        try {
          const response = await instance.get("/user/me");
          formatAppLog("log", "at common/stores/personal_center.js:14", "个人信息=" + response.data[0]);
          this.personalArr = response.data;
          formatAppLog("log", "at common/stores/personal_center.js:16", "个人数据=" + response.data[0].id);
          uni.setStorage({
            key: "storage_id",
            data: response.data[0].id,
            success: function() {
              formatAppLog("log", "at common/stores/personal_center.js:21", "success");
            }
          });
        } catch (error) {
          formatAppLog("error", "at common/stores/personal_center.js:25", error);
        }
      }
    }
  });
  const useInterruptStore = defineStore("interruptID", {
    actions: {
      loginInterrupt(toUrl) {
        try {
          const value2 = uni.getStorageSync("storage_key");
          if (value2 != "") {
            uni.navigateTo({
              url: toUrl
            });
          } else {
            uni.navigateTo({
              url: "/pages/me/login/login"
            });
          }
        } catch (e) {
        }
      }
    }
  });
  const _sfc_main$g = {
    __name: "me",
    setup(__props) {
      const loginName = vue.ref("去登录");
      const personalStore = usePersonalStore();
      const { personalArr } = storeToRefs(personalStore);
      formatAppLog("log", "at pages/me/me.vue:69", "个人中心数据=" + personalArr);
      const tableHeader = vue.ref(personalArr);
      const interruptStore = useInterruptStore();
      const { loginInterrupt } = interruptStore;
      vue.watch(tableHeader, () => {
        if (tableHeader.value != "") {
          loginName.value = "恭喜发财";
        }
      });
      function login() {
        uni.navigateTo({
          url: "/pages/me/login/login"
        });
      }
      function seting() {
        loginInterrupt("/pages/me/set/set");
      }
      return (_ctx, _cache) => {
        const _component_u_avatar = resolveEasycom(vue.resolveDynamicComponent("u-avatar"), __easycom_0$2);
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
        const _component_u_cell_item = resolveEasycom(vue.resolveDynamicComponent("u-cell-item"), __easycom_2);
        const _component_u_cell_group = resolveEasycom(vue.resolveDynamicComponent("u-cell-group"), __easycom_3$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
          vue.createCommentVNode(" 账户头像 "),
          vue.createElementVNode("view", {
            class: "i-head",
            onClick: _cache[0] || (_cache[0] = ($event) => login())
          }, [
            vue.createVNode(_component_u_avatar, {
              src: _ctx.src,
              size: "large"
            }, null, 8, ["src"]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(tableHeader.value, (value2, index) => {
                return vue.openBlock(), vue.createElementBlock("span", {
                  class: "i-head-center",
                  key: index
                }, [
                  vue.createElementVNode(
                    "h3",
                    null,
                    vue.toDisplayString(value2.nickName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(value2.phone),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode("span", { class: "i-head-right" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(loginName.value),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_u_icon, { name: "arrow-right" })
            ])
          ]),
          vue.createCommentVNode(" 主页类容 "),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createVNode(_component_u_cell_group, {
              border: _ctx.border = false
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_cell_item, {
                  icon: "account",
                  title: "个人信息",
                  arrow: true,
                  "arrow-direction": "left",
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.personal())
                }),
                vue.createVNode(_component_u_cell_item, {
                  icon: "account",
                  title: "账号信息",
                  arrow: true,
                  "arrow-direction": "left"
                }),
                vue.createVNode(_component_u_cell_item, {
                  icon: "share-fill",
                  title: "设置家人共享",
                  arrow: true,
                  "arrow-direction": "left"
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["border"])
          ]),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createVNode(_component_u_cell_group, {
              border: _ctx.border = false
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_cell_item, {
                  icon: "question-circle",
                  title: "帮助与客服",
                  arrow: true,
                  "arrow-direction": "left"
                }),
                vue.createVNode(_component_u_cell_item, {
                  icon: "setting",
                  title: "关于",
                  arrow: true,
                  "arrow-direction": "left"
                }),
                vue.createVNode(_component_u_cell_item, {
                  icon: "setting",
                  title: "设置",
                  arrow: true,
                  "arrow-direction": "left",
                  "border-bottom": _ctx.bottom = false,
                  onClick: _cache[2] || (_cache[2] = ($event) => seting())
                }, null, 8, ["border-bottom"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["border"])
          ])
        ]);
      };
    }
  };
  const PagesMeMe = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "E:/uni-app/account/pages/me/me.vue"]]);
  const _sfc_main$f = {
    name: "u-read-more",
    emits: ["open", "close"],
    props: {
      // 默认的显示占位高度，单位为rpx
      showHeight: {
        type: [Number, String],
        default: 400
      },
      // 展开后是否显示"收起"按钮
      toggle: {
        type: Boolean,
        default: false
      },
      // 关闭时的提示文字
      closeText: {
        type: String,
        default: "展开阅读全文"
      },
      // 展开时的提示文字
      openText: {
        type: String,
        default: "收起"
      },
      // 提示的文字颜色
      color: {
        type: String,
        default: "#2979ff"
      },
      // 提示文字的大小
      fontSize: {
        type: [String, Number],
        default: 28
      },
      // 是否显示阴影
      shadowStyle: {
        type: Object,
        default() {
          return {
            backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
            paddingTop: "300rpx",
            marginTop: "-300rpx"
          };
        }
      },
      // 段落首行缩进的字符个数
      textIndent: {
        type: String,
        default: "2em"
      },
      // open和close事件时，将此参数返回在回调参数中
      index: {
        type: [Number, String],
        default: ""
      }
    },
    watch: {
      paramsChange(val) {
        this.init();
      }
    },
    computed: {
      paramsChange() {
        return `${this.toggle}-${this.showHeight}`;
      },
      // 展开后无需阴影，收起时才需要阴影样式
      innerShadowStyle() {
        if (this.showMore)
          return {};
        else
          return this.shadowStyle;
      }
    },
    data() {
      return {
        isLongContent: false,
        // 是否需要隐藏一部分内容
        showMore: false,
        // 当前隐藏与显示的状态，true-显示，false-收起
        elId: this.$u.guid()
        // 生成唯一class
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
    methods: {
      init() {
        this.$uGetRect("." + this.elId).then((res) => {
          if (res.height > uni.upx2px(this.showHeight)) {
            this.isLongContent = true;
            this.showMore = false;
          }
        });
      },
      // 展开或者收起
      toggleReadMore() {
        this.showMore = !this.showMore;
        if (this.toggle == false)
          this.isLongContent = false;
        this.$emit(this.showMore ? "open" : "close", this.index);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["u-content", [$data.elId]]),
          style: vue.normalizeStyle({
            height: $data.isLongContent && !$data.showMore ? $props.showHeight + "rpx" : "auto",
            textIndent: $props.textIndent
          })
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $data.isLongContent ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleReadMore && $options.toggleReadMore(...args)),
          class: vue.normalizeClass(["u-content__showmore-wrap", { "u-content__show-more": $data.showMore }]),
          style: vue.normalizeStyle([$options.innerShadowStyle])
        },
        [
          vue.createElementVNode(
            "text",
            {
              class: "u-content__showmore-wrap__readmore-btn",
              style: vue.normalizeStyle({
                fontSize: $props.fontSize + "rpx",
                color: $props.color
              })
            },
            vue.toDisplayString($data.showMore ? $props.openText : $props.closeText),
            5
            /* TEXT, STYLE */
          ),
          vue.createElementVNode("view", { class: "u-content__showmore-wrap__readmore-btn__icon u-flex" }, [
            vue.createVNode(_component_u_icon, {
              color: $props.color,
              size: $props.fontSize,
              name: $data.showMore ? "arrow-up" : "arrow-down"
            }, null, 8, ["color", "size", "name"])
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$6], ["__scopeId", "data-v-f4ed79fe"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-read-more/u-read-more.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        // 这是一段很长的文字，也可能包含有HTML标签等内容
        content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				？`
      };
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_read_more = resolveEasycom(vue.resolveDynamicComponent("u-read-more"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      vue.renderList(9, (i) => {
        return vue.createVNode(_component_u_read_more, {
          "show-height": "150",
          toggle: true
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("rich-text", { nodes: $data.content }, null, 8, ["nodes"])
          ]),
          _: 1
          /* STABLE */
        });
      }),
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesDataData = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$5], ["__file", "E:/uni-app/account/pages/data/data.vue"]]);
  const _sfc_main$d = {
    name: "u-input",
    emits: ["update:modelValue", "input", "change", "blur", "focus", "click", "touchstart"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框的类型，textarea，text，number
      type: {
        type: String,
        default: "text"
      },
      inputAlign: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      placeholderStyle: {
        type: String,
        default: "color: #c0c4cc;"
      },
      confirmType: {
        type: String,
        default: "done"
      },
      // 输入框的自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否自动获得焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 密码类型时，是否显示右侧的密码图标
      passwordIcon: {
        type: Boolean,
        default: true
      },
      // input|textarea是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 输入框的边框颜色
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      autoHeight: {
        type: Boolean,
        default: true
      },
      // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
      // open-打开，close-关闭
      selectOpen: {
        type: Boolean,
        default: false
      },
      // 高度，单位rpx
      height: {
        type: [Number, String],
        default: ""
      },
      // 是否可清空
      clearable: {
        type: [Boolean, String]
      },
      // 指定光标与键盘的距离，单位 px
      cursorSpacing: {
        type: [Number, String],
        default: 0
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: [Number, String],
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [Number, String],
        default: -1
      },
      // 是否自动去除两端的空格
      trim: {
        type: Boolean,
        default: true
      },
      // 是否显示键盘上方带有”完成“按钮那一栏
      showConfirmbar: {
        type: Boolean,
        default: true
      },
      // 弹出键盘时是否自动调节高度，uni-app默认值是true
      adjustPosition: {
        type: Boolean,
        default: true
      },
      // input的背景色
      backgroundColor: {
        type: String
      },
      // input的padding
      padding: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: "",
        inputHeight: 70,
        // input的高度
        textareaHeight: 100,
        // textarea的高度
        validateState: false,
        // 当前input的验证状态，用于错误时，边框是否改为红色
        focused: false,
        // 当前是否处于获得焦点的状态
        showPassword: false,
        // 是否预览密码
        lastValue: "",
        // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
        uForm: {
          inputAlign: "",
          clearable: ""
        }
      };
    },
    watch: {
      valueCom(nVal, oVal) {
        this.defaultValue = nVal;
        if (nVal != oVal && this.type == "select")
          this.handleInput({
            detail: {
              value: nVal
            }
          });
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      inputAlignCom() {
        return this.inputAlign || this.uForm.inputAlign || "left";
      },
      clearableCom() {
        if (typeof this.clearable == "boolean")
          return this.clearable;
        if (typeof this.uForm.clearable == "boolean")
          return this.uForm.clearable;
        return true;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      getStyle() {
        let style = {};
        style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
        style = Object.assign(style, this.customStyle);
        return style;
      },
      //
      getCursorSpacing() {
        return Number(this.cursorSpacing);
      },
      // 光标起始位置
      uSelectionStart() {
        return String(this.selectionStart);
      },
      // 光标结束位置
      uSelectionEnd() {
        return String(this.selectionEnd);
      }
    },
    created() {
      this.defaultValue = this.valueCom;
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uForm).map((key) => {
          this.uForm[key] = parent[key];
        });
      }
    },
    methods: {
      /**
       * change 事件
       * @param event
       */
      handleInput(event) {
        let value2 = event.detail.value;
        if (this.trim)
          value2 = this.$u.trim(value2);
        this.$emit("input", value2);
        this.$emit("update:modelValue", value2);
        this.defaultValue = value2;
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", value2);
        }, 40);
      },
      /**
       * blur 事件
       * @param event
       */
      handleBlur(event) {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.$emit("blur", event.detail.value);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldBlur", event.detail.value);
        }, 40);
      },
      onFormItemError(status) {
        this.validateState = status;
      },
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
      },
      inputClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", {
          "u-input--border": $props.border,
          "u-input--error": $data.validateState
        }]),
        style: vue.normalizeStyle({
          padding: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
          borderColor: $props.borderColor,
          textAlign: $options.inputAlignCom,
          backgroundColor: $props.backgroundColor
        }),
        onClick: _cache[10] || (_cache[10] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
      },
      [
        $props.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 0,
          class: "u-input__input u-input__textarea",
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          maxlength: $options.inputMaxlength,
          fixed: $props.fixed,
          focus: $props.focus,
          autoHeight: $props.autoHeight,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "cursor-spacing": $options.getCursorSpacing,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["value", "placeholder", "placeholderStyle", "disabled", "maxlength", "fixed", "focus", "autoHeight", "selection-end", "selection-start", "cursor-spacing", "show-confirm-bar", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 1,
          class: "u-input__input",
          type: $props.type == "password" ? "text" : $props.type,
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          password: $props.type == "password" && !$data.showPassword,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled || $props.type === "select",
          maxlength: $options.inputMaxlength,
          focus: $props.focus,
          confirmType: $props.confirmType,
          "cursor-spacing": $options.getCursorSpacing,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "show-confirm-bar": $props.showConfirmbar,
          "adjust-position": $props.adjustPosition,
          onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[5] || (_cache[5] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onInput: _cache[6] || (_cache[6] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onConfirm: _cache[7] || (_cache[7] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["type", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "selection-end", "selection-start", "show-confirm-bar", "adjust-position"])),
        vue.createElementVNode("view", { class: "u-input__right-icon u-flex" }, [
          $options.clearableCom && $options.valueCom != "" && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__right-icon__clear u-input__right-icon__item",
            onClick: _cache[8] || (_cache[8] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: "close-circle-fill",
              color: "#c0c4cc"
            })
          ])) : vue.createCommentVNode("v-if", true),
          $props.passwordIcon && $props.type == "password" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__right-icon__clear u-input__right-icon__item"
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: !$data.showPassword ? "eye" : "eye-fill",
              color: "#c0c4cc",
              onClick: _cache[9] || (_cache[9] = ($event) => $data.showPassword = !$data.showPassword)
            }, null, 8, ["name"])
          ])) : vue.createCommentVNode("v-if", true),
          $props.type == "select" ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: vue.normalizeClass(["u-input__right-icon--select u-input__right-icon__item", {
                "u-input__right-icon--select--reverse": $props.selectOpen
              }])
            },
            [
              vue.createVNode(_component_u_icon, {
                name: "arrow-down-fill",
                size: "26",
                color: "#c0c4cc"
              })
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$4], ["__scopeId", "data-v-dc846cb1"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-input/u-input.vue"]]);
  const _sfc_main$c = {
    __name: "communtiy",
    setup(__props) {
      const form1 = vue.ref();
      const data = vue.reactive({
        formData: {
          name: "",
          intro: ""
        },
        rules: {
          name: [{
            required: true,
            message: "请输入姓名",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }],
          intro: [{
            min: 5,
            message: "简介不能少于5个字",
            trigger: "change"
          }]
        }
      });
      onReady(() => {
        form1.value.setRules(data.rules);
      });
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "app" }, [
          vue.createVNode(_component_u_input, {
            type: "text",
            disabled: "",
            value: "fjas"
          })
        ]);
      };
    }
  };
  const PagesCommuntiyCommuntiy = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "E:/uni-app/account/pages/communtiy/communtiy.vue"]]);
  const _sfc_main$b = {
    name: "u-form",
    props: {
      // 当前form的需要验证字段的集合
      model: {
        type: Object,
        default() {
          return {};
        }
      },
      // 验证规则
      // rules: {
      // 	type: [Object, Function, Array],
      // 	default() {
      // 		return {};
      // 	}
      // },
      // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
      // border-bottom-下边框呈现红色，none-无提示
      errorType: {
        type: Array,
        default() {
          return ["message", "toast"];
        }
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: Boolean,
        default: true
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: "left"
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: 90
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: "left"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 表单内所有input的inputAlign属性的值
      inputAlign: {
        type: String,
        default: "left"
      },
      // 表单内所有input的clearable属性的值
      clearable: {
        type: Boolean,
        default: true
      }
    },
    provide() {
      return {
        uForm: this
      };
    },
    data() {
      return {
        rules: {}
      };
    },
    created() {
      this.fields = [];
    },
    methods: {
      setRules(rules2) {
        this.rules = rules2;
      },
      // 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
      resetFields() {
        this.fields.map((field) => {
          field.resetField();
        });
      },
      // 校验全部数据
      validate(callback) {
        return new Promise((resolve) => {
          let valid = true;
          let count = 0;
          let errorArr = [];
          let errorObjArr = [];
          this.fields.map((field) => {
            field.validation("", (errorMsg, errObj) => {
              if (errorMsg) {
                valid = false;
                errorArr.push(errorMsg);
                errorObjArr.push(errObj);
              }
              if (++count === this.fields.length) {
                resolve(valid, errorObjArr[0]);
                if (this.errorType.indexOf("none") === -1 && this.errorType.indexOf("toast") >= 0 && errorArr.length) {
                  this.$u.toast(errorArr[0]);
                }
                if (typeof callback == "function")
                  callback(valid, errorObjArr[0]);
              }
            });
          });
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "u-form" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$3], ["__scopeId", "data-v-000ccc72"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-form/u-form.vue"]]);
  const _sfc_main$a = {
    __name: "login",
    setup(__props) {
      const errorType = vue.ref(["toast", "border-bottom"]);
      const loginForm = vue.ref();
      const loginData = vue.reactive({
        loginValue: {
          phone: "",
          code: "",
          password: ""
        },
        rules: {
          phone: [{
            required: true,
            message: "手机号不能为空",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }]
        }
      });
      onReady(() => {
        loginForm.value.setRules(loginData.rules);
      });
      const change = vue.ref("密码登录");
      const showCode = vue.ref(true);
      const showPassword = vue.ref(false);
      const countDownText = vue.ref("发送验证码");
      const isCountingDown = vue.ref(false);
      const classStore = useClassStore();
      const usePersonal = usePersonalStore();
      const { getPersonal } = usePersonal;
      const sendVerificationCode = (e) => {
        loginForm.value.validate((valid) => {
          if (valid) {
            if (!isCountingDown.value) {
              instance.post(`/user/code?phone=${loginData.loginValue.phone}`).then(() => {
                startCountDown();
              }).catch((error) => {
                formatAppLog("error", "at pages/me/login/login.vue:79", "网络异常" + error);
              });
            }
          } else {
            formatAppLog("log", "at pages/me/login/login.vue:83", "验证失败");
          }
        });
      };
      const startCountDown = () => {
        isCountingDown.value = true;
        let count = 60;
        const timer = setInterval(() => {
          count--;
          if (count > 0) {
            countDownText.value = `${count}秒后重发`;
          } else {
            clearInterval(timer);
            isCountingDown.value = false;
            countDownText.value = "发送验证码";
          }
        }, 1e3);
      };
      const login = () => {
        instance.post("/user/login", loginData.loginValue).then((res) => {
          if (res.success == true) {
            uni.setStorage({
              key: "storage_key",
              data: res.data,
              success: function() {
                formatAppLog("log", "at pages/me/login/login.vue:114", "success");
              }
            });
            getPersonal();
            classStore.getClassName();
            uni.navigateBack();
          } else {
            uni.showToast({
              title: res.errorMsg,
              duration: 1800,
              icon: "error"
            });
          }
        }).catch((error) => {
          formatAppLog("error", "at pages/me/login/login.vue:138", error);
        });
      };
      const changeLogin = () => {
        if (showCode.value == true) {
          showCode.value = false;
          showPassword.value = true;
          change.value = "验证码登录";
        } else {
          showCode.value = true;
          showPassword.value = false;
          change.value = "密码登录";
        }
      };
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "login-container" }, [
            vue.createElementVNode("h2", null, "登录"),
            vue.createVNode(_component_u_form, {
              class: "login-form",
              ref_key: "loginForm",
              ref: loginForm,
              model: loginData.loginValue,
              "error-type": errorType.value
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_form_item, { prop: "phone" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_input, {
                      modelValue: loginData.loginValue.phone,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => loginData.loginValue.phone = $event),
                      placeholder: "请输入手机号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.withDirectives(vue.createVNode(
                  _component_u_form_item,
                  { prop: "code" },
                  {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: loginData.loginValue.code,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => loginData.loginValue.code = $event),
                        placeholder: "请输入验证码"
                      }, null, 8, ["modelValue"]),
                      vue.createVNode(_component_u_button, {
                        class: "send-code",
                        disabled: isCountingDown.value,
                        onClick: _cache[2] || (_cache[2] = ($event) => sendVerificationCode())
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(
                            vue.toDisplayString(countDownText.value),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, showCode.value]
                ]),
                vue.withDirectives(vue.createVNode(
                  _component_u_form_item,
                  { prop: "password" },
                  {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        type: "password",
                        modelValue: loginData.loginValue.password,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => loginData.loginValue.password = $event),
                        placeholder: "密码"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, showPassword.value]
                ]),
                vue.createVNode(_component_u_button, {
                  style: { "width": "98%", "margin-top": "32px" },
                  type: "primary",
                  onClick: _cache[4] || (_cache[4] = ($event) => login())
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("登录")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model", "error-type"]),
            vue.withDirectives(vue.createElementVNode(
              "text",
              null,
              "未注册的手机号验证过后将自动注册",
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, showCode.value]
            ]),
            vue.createVNode(_component_u_button, {
              class: "password",
              onClick: changeLogin
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(
                  vue.toDisplayString(change.value),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]);
      };
    }
  };
  const PagesMeLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "E:/uni-app/account/pages/me/login/login.vue"]]);
  const _sfc_main$9 = {
    name: "u-line",
    props: {
      color: {
        type: String,
        default: "#e4e7ed"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等
      length: {
        type: String,
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx"
      margin: {
        type: String,
        default: "0"
      },
      // 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
      borderStyle: {
        type: String,
        default: "solid"
      }
    },
    computed: {
      lineStyle() {
        let style = {};
        style.margin = this.margin;
        if (this.direction == "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.borderStyle;
          style.width = this.$u.addUnit(this.length);
          if (this.hairLine)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.borderStyle;
          style.height = this.$u.addUnit(this.length);
          if (this.hairLine)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return style;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$2], ["__scopeId", "data-v-3e1cc47b"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-line/u-line.vue"]]);
  const _sfc_main$8 = {
    name: "u-loading",
    props: {
      // 动画的类型
      mode: {
        type: String,
        default: "circle"
      },
      // 动画的颜色
      color: {
        type: String,
        default: "#c7c7c7"
      },
      // 加载图标的大小，单位rpx
      size: {
        type: [String, Number],
        default: "34"
      },
      // 是否显示动画
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      // 加载中圆圈动画的样式
      cricleStyle() {
        let style = {};
        style.width = this.size + "rpx";
        style.height = this.size + "rpx";
        if (this.mode == "circle")
          style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${this.color ? this.color : "#c7c7c7"}`;
        return style;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-loading", $props.mode == "circle" ? "u-loading-circle" : "u-loading-flower"]),
        style: vue.normalizeStyle([$options.cricleStyle])
      },
      null,
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$1], ["__scopeId", "data-v-32db0ed8"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-loading/u-loading.vue"]]);
  const _sfc_main$7 = {
    name: "u-loadmore",
    emits: ["loadmore"],
    props: {
      // 组件背景色
      bgColor: {
        type: String,
        default: "transparent"
      },
      // 是否显示加载中的图标
      icon: {
        type: Boolean,
        default: true
      },
      // 字体大小
      fontSize: {
        type: String,
        default: "28"
      },
      // 字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
      status: {
        type: String,
        default: "loadmore"
      },
      // 加载中状态的图标，flower-花朵状图标，circle-圆圈状图标
      iconType: {
        type: String,
        default: "circle"
      },
      // 显示的文字
      loadText: {
        type: Object,
        default() {
          return {
            loadmore: "加载更多",
            loading: "正在加载...",
            nomore: "没有更多了"
          };
        }
      },
      // 在“没有更多”状态下，是否显示粗点
      isDot: {
        type: Boolean,
        default: false
      },
      // 加载中显示圆圈动画时，动画的颜色
      iconColor: {
        type: String,
        default: "#b7b7b7"
      },
      // 上边距
      marginTop: {
        type: [String, Number],
        default: 0
      },
      // 下边距
      marginBottom: {
        type: [String, Number],
        default: 0
      },
      // 高度，单位rpx
      height: {
        type: [String, Number],
        default: "auto"
      }
    },
    data() {
      return {
        // 粗点
        dotText: "●"
      };
    },
    computed: {
      // 加载的文字显示的样式
      loadTextStyle() {
        return {
          color: this.color,
          fontSize: this.fontSize + "rpx",
          position: "relative",
          zIndex: 1,
          backgroundColor: this.bgColor
          // 如果是加载中状态，动画和文字需要距离近一点
        };
      },
      // 加载中圆圈动画的样式
      cricleStyle() {
        return {
          borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
        };
      },
      // 加载中花朵动画形式
      // 动画由base64图片生成，暂不支持修改
      flowerStyle() {
        return {};
      },
      // 显示的提示文字
      showText() {
        let text = "";
        if (this.status == "loadmore")
          text = this.loadText.loadmore;
        else if (this.status == "loading")
          text = this.loadText.loading;
        else if (this.status == "nomore" && this.isDot)
          text = this.dotText;
        else
          text = this.loadText.nomore;
        return text;
      }
    },
    methods: {
      loadMore() {
        if (this.status == "loadmore")
          this.$emit("loadmore");
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_1$1);
    const _component_u_loading = resolveEasycom(vue.resolveDynamicComponent("u-loading"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-load-more-wrap",
        style: vue.normalizeStyle({
          backgroundColor: $props.bgColor,
          marginBottom: $props.marginBottom + "rpx",
          marginTop: $props.marginTop + "rpx",
          height: _ctx.$u.addUnit($props.height)
        })
      },
      [
        vue.createVNode(_component_u_line, {
          color: "#d4d4d4",
          length: "50"
        }),
        vue.createCommentVNode(" 加载中和没有更多的状态才显示两边的横线 "),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([$props.status == "loadmore" || $props.status == "nomore" ? "u-more" : "", "u-load-more-inner"])
          },
          [
            vue.createElementVNode("view", { class: "u-loadmore-icon-wrap" }, [
              vue.createVNode(_component_u_loading, {
                class: "u-loadmore-icon",
                color: $props.iconColor,
                mode: $props.iconType == "circle" ? "circle" : "flower",
                show: $props.status == "loading" && $props.icon
              }, null, 8, ["color", "mode", "show"])
            ]),
            vue.createCommentVNode(" 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["u-line-1", [$props.status == "nomore" && $props.isDot == true ? "u-dot-text" : "u-more-text"]]),
                style: vue.normalizeStyle([$options.loadTextStyle]),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.loadMore && $options.loadMore(...args))
              },
              vue.toDisplayString($options.showText),
              7
              /* TEXT, CLASS, STYLE */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createVNode(_component_u_line, {
          color: "#d4d4d4",
          length: "50"
        })
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render], ["__scopeId", "data-v-e9906cfb"], ["__file", "E:/uni-app/account/uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.vue"]]);
  const _sfc_main$6 = {
    __name: "home",
    setup(__props) {
      const homeStore = useHomeStore();
      const { tableDataStore } = storeToRefs(homeStore);
      const { getTableData } = homeStore;
      formatAppLog("log", "at pages/index/home.vue:97", "home主页数据=" + tableDataStore);
      const tableData = vue.ref(tableDataStore);
      const totalMoney = vue.computed(() => homeStore.totalMoney);
      const totalPerson = vue.computed(() => homeStore.totalPerson);
      const statusValue = vue.ref({
        state: "loadmore"
      });
      onReachBottom(() => {
      });
      function onLongPress(index) {
        uni.showModal({
          title: "删除",
          content: "你确定删除这个数据吗",
          success: (res) => {
            if (res.confirm) {
              if (tableData.value != "") {
                formatAppLog("log", "at pages/index/home.vue:130", "不为空的数据=" + tableData.value[index].did);
                instance.get("/data/deleteData?did=" + tableData.value[index].did).then(() => {
                  tableData.value.splice(index, 1);
                });
              }
            } else if (res.cancel) {
              formatAppLog("log", "at pages/index/home.vue:137", "点击了取消");
              return;
            }
          }
        });
      }
      const bookmodel = vue.ref({
        mid: "",
        className: ""
      });
      onLoad((option) => {
        var item = JSON.parse(decodeURIComponent(option.obj));
        bookmodel.value = item;
        formatAppLog("log", "at pages/index/home.vue:153", "index传过的mid=" + bookmodel.value.className);
      });
      onNavigationBarButtonTap((e) => {
        if (e.text == "添加") {
          uni.navigateTo({
            url: "/pages/index/add?obj=" + encodeURIComponent(JSON.stringify(bookmodel.value.mid))
          });
        }
      });
      onReady(() => {
        uni.setNavigationBarTitle({ title: bookmodel.value.className });
      });
      function gotoSearch() {
        formatAppLog("log", "at pages/index/home.vue:176", "搜索");
        uni.navigateTo({
          url: "/pages/index/search/search"
        });
      }
      function toDetail(index) {
        uni.navigateTo({
          url: "/pages/index/detail?obj=" + encodeURIComponent(JSON.stringify(tableData.value[index]))
        });
      }
      onPullDownRefresh(() => {
        formatAppLog("log", "at pages/index/home.vue:191", "refresh");
        getTableData(bookmodel.value.mid);
        setTimeout(function() {
          uni.stopPullDownRefresh();
        }, 1e3);
      });
      return (_ctx, _cache) => {
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2$1);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
        const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_1$1);
        const _component_u_loadmore = resolveEasycom(vue.resolveDynamicComponent("u-loadmore"), __easycom_4);
        return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
          vue.createElementVNode("view", { class: "main-top" }, [
            vue.createCommentVNode(" 搜索 "),
            vue.createElementVNode("view", null, [
              vue.createVNode(_component_u_button, {
                style: { "height": "30px" },
                onClick: _cache[0] || (_cache[0] = ($event) => gotoSearch())
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_icon, {
                    name: "search",
                    color: "#2979ff",
                    size: "28"
                  }),
                  vue.createTextVNode(" 搜索 ")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createCommentVNode(" 标题 "),
              vue.createVNode(_component_u_form_item, { style: { "padding-left": "3%" } }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("span", { style: { "width": "50%" } }, [
                    vue.createElementVNode("text", null, "总金额:"),
                    vue.createElementVNode(
                      "text",
                      { style: { "margin-left": "4px", "font-size": "20px" } },
                      vue.toDisplayString(vue.unref(totalMoney)),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("span", { style: { "margin-left": "20%", "width": "50%" } }, [
                    vue.createElementVNode("text", null, "总人数:"),
                    vue.createElementVNode(
                      "text",
                      { style: { "margin-left": "4px", "font-size": "20px" } },
                      vue.toDisplayString(vue.unref(totalPerson)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          vue.createCommentVNode(" 主题类容 "),
          vue.createElementVNode("view", { class: "main-center" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(tableData.value, (value2, index) => {
                return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                  vue.createElementVNode("view", {
                    class: "a-card",
                    onLongpress: ($event) => onLongPress(index),
                    onClick: ($event) => toDetail(index)
                  }, [
                    vue.createElementVNode("view", { class: "a-card-top" }, [
                      vue.createElementVNode(
                        "h3",
                        { style: { "padding-left": "3%" } },
                        vue.toDisplayString(value2.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(value2.createTime),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createVNode(_component_u_line, {
                      color: "info",
                      margin: "8px 0px 15px 0px",
                      "border-style": "dashed"
                    }),
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode("view", { class: "card-money" }, [
                        vue.createElementVNode("text", null, "礼金"),
                        vue.createElementVNode("view", { class: "number" }, [
                          vue.createElementVNode("h3", null, [
                            vue.createVNode(_component_u_icon, {
                              name: "rmb",
                              size: "34"
                            }),
                            vue.createTextVNode(
                              " " + vue.toDisplayString(value2.money),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      vue.createElementVNode("view", { style: { "margin-bottom": "6px" } }, [
                        vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "礼品"),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(value2.gift),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "电话"),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(value2.phone),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createVNode(_component_u_line, {
                        color: "info",
                        margin: "8px 0px 8px 0px"
                      }),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "地址"),
                        vue.createElementVNode(
                          "text",
                          { class: "out-of-range" },
                          vue.toDisplayString(value2.address),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("span", { style: { "position": "absolute", "right": "7%" } }, [
                          vue.createVNode(_component_u_icon, { name: "arrow-right" })
                        ])
                      ]),
                      vue.createVNode(_component_u_line, {
                        color: "info",
                        margin: "5px 0px 5px 0px"
                      }),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "备注"),
                        vue.createElementVNode(
                          "text",
                          { class: "out-of-range" },
                          vue.toDisplayString(value2.remark),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("span", { style: { "position": "absolute", "right": "7%" } }, [
                          vue.createVNode(_component_u_icon, { name: "arrow-right" })
                        ])
                      ])
                    ])
                  ], 40, ["onLongpress", "onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createVNode(_component_u_loadmore, {
            status: _ctx.status = statusValue.value.state
          }, null, 8, ["status"])
        ]);
      };
    }
  };
  const PagesIndexHome = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "E:/uni-app/account/pages/index/home.vue"]]);
  var dayjs_minExports = {};
  var dayjs_min = {
    get exports() {
      return dayjs_minExports;
    },
    set exports(v) {
      dayjs_minExports = v;
    }
  };
  (function(module, exports) {
    !function(t, e) {
      module.exports = e();
    }(commonjsGlobal, function() {
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = function(t2) {
        return t2 instanceof _;
      }, S = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, w = function(t2, e2) {
        if (p(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, O = v;
      O.l = S, O.i = p, O.w = function(t2, e2) {
        return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = S(t2.locale, null, true), this.parse(t2);
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return /* @__PURE__ */ new Date(NaN);
            if (O.u(e2))
              return /* @__PURE__ */ new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return O;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = w(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return w(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < w(t2);
        }, m2.$g = function(t2, e2, n2) {
          return O.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
            var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (h2) {
            case c:
              return r2 ? l2(1, 0) : l2(31, 11);
            case f:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === f || o2 === c) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[O.p(t2)]();
        }, m2.add = function(r2, h2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = O.p(h2), y2 = function(t2) {
            var e2 = w(l2);
            return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === f)
            return this.set(f, this.$M + r2);
          if ($2 === c)
            return this.set(c, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return O.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, c2 = function(t3) {
            return O.s(s2 % 12 || 12, t3, "0");
          }, d2 = n2.meridiem || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
          return r2.replace(y, function(t3, e3) {
            return e3 || $2[t3] || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
          return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
        }, m2.daysInMonth = function() {
          return this.endOf(f).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = S(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return O.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), T = _.prototype;
      return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
        T[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), w.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, w), t2.$i = true), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
        return w(1e3 * t2);
      }, w.en = D[g], w.Ls = D, w.p = {}, w;
    });
  })(dayjs_min);
  const dayjs = dayjs_minExports;
  const _sfc_main$5 = {
    __name: "detail",
    setup(__props) {
      const now2 = /* @__PURE__ */ new Date();
      const form = vue.ref();
      const autoHeight = vue.ref(false);
      const boolean = vue.ref(true);
      const button = vue.ref("修改数据");
      const data = vue.reactive({
        formData: {
          name: "古灵",
          money: "123",
          gift: "水果",
          phone: "上大发",
          remark: "飞洒发",
          address: "发顺丰",
          createTime: "发送"
        },
        rules: {
          name: [{
            required: true,
            message: "请输入姓名",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }],
          money: [{
            required: true,
            message: "请输入礼金",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }],
          address: [{
            required: true,
            message: "请输入地址",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }]
        }
      });
      onLoad((option) => {
        var item = JSON.parse(decodeURIComponent(option.obj));
        formatAppLog("log", "at pages/index/detail.vue:90", "详情页" + item);
        data.formData = item;
        formatAppLog("log", "at pages/index/detail.vue:92", "value" + value.name);
      });
      const submit = (e) => {
        if (boolean.value == true) {
          formatAppLog("log", "at pages/index/detail.vue:97", "修改数据");
          boolean.value = false;
          button.value = "保存数据";
        } else if (button.value == "保存数据") {
          form.value.validate((valid) => {
            if (valid) {
              formatAppLog("log", "at pages/index/detail.vue:104", "验证通过");
              data.formData.createTime = dayjs(now2).format("YYYY-MM-DD HH:mm");
              uni.showToast({
                title: "修改成功",
                duration: 2e3
              });
              uni.navigateBack();
            } else {
              formatAppLog("log", "at pages/index/detail.vue:130", "验证失败");
            }
          });
        }
      };
      onReady(() => {
        form.value.setRules(data.rules);
      });
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "main" }, [
              vue.createVNode(_component_u_form, {
                model: data.formData,
                ref_key: "form",
                ref: form
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_form_item, {
                    label: "用户",
                    prop: "name",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => data.formData.name = $event),
                        modelModifiers: { lazy: true, trim: true },
                        placeholder: "请输入姓名",
                        disabled: _ctx.disabled = boolean.value
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "礼金",
                    prop: "money",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.money,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => data.formData.money = $event),
                        modelModifiers: { lazy: true, trim: true },
                        type: "number",
                        placeholder: "请输入礼金",
                        disabled: _ctx.disabled = boolean.value
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "礼品",
                    prop: "gift",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.gift,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => data.formData.gift = $event),
                        modelModifiers: { lazy: true, trim: true },
                        placeholder: "请输入礼品名称",
                        disabled: _ctx.disabled = boolean.value
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "电话",
                    prop: "phone",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.phone,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => data.formData.phone = $event),
                        modelModifiers: { lazy: true, trim: true },
                        type: "tel",
                        placeholder: "请输入电话",
                        disabled: _ctx.disabled = boolean.value
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "地址",
                    prop: "address",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.address,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => data.formData.address = $event),
                        modelModifiers: { lazy: true, trim: true },
                        placeholder: "请输入地址",
                        disabled: _ctx.disabled = boolean.value
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "备注",
                    prop: "remark",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.remark,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => data.formData.remark = $event),
                        modelModifiers: { lazy: true, trim: true },
                        type: "textarea",
                        placeholder: "请输入备注",
                        border: "",
                        height: "100rpx",
                        "auto-height": autoHeight.value,
                        disabled: _ctx.disabled = boolean.value
                      }, null, 8, ["modelValue", "auto-height", "disabled"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"])
            ]),
            vue.createElementVNode("view", { class: "s-card" }, [
              vue.createElementVNode(
                "button",
                {
                  type: "primary",
                  onClick: _cache[6] || (_cache[6] = ($event) => submit()),
                  class: "submit"
                },
                vue.toDisplayString(button.value),
                1
                /* TEXT */
              )
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexDetail = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "E:/uni-app/account/pages/index/detail.vue"]]);
  const _sfc_main$4 = {
    __name: "search",
    setup(__props) {
      const isShow = vue.ref(true);
      const isShowContainer = vue.ref(false);
      const tableData = vue.ref();
      onNavigationBarSearchInputChanged((e) => {
        if (e.text != "") {
          isShow.value = false;
          isShowContainer.value = true;
        } else {
          isShow.value = true;
          isShowContainer.value = false;
        }
      });
      const userId = uni.getStorageSync("storage_id");
      onNavigationBarSearchInputConfirmed(async (e) => {
        formatAppLog("log", "at pages/index/search/search.vue:161", "搜索事件" + e.text);
        if (e.text != "") {
          try {
            const res = await instance.get("/data/search?text=" + e.text.trim() + "&userId=" + userId);
            tableData.value = res.data;
            formatAppLog("log", "at pages/index/search/search.vue:166", "搜索值=" + res.data);
          } catch (e2) {
            formatAppLog("log", "at pages/index/search/search.vue:169", "请求异常");
          }
        }
      });
      return (_ctx, _cache) => {
        const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
        const _component_u_line = resolveEasycom(vue.resolveDynamicComponent("u-line"), __easycom_1$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
          isShow.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "search-body"
          }, [
            vue.createCommentVNode(" 搜索历史 "),
            vue.createElementVNode("view", { class: "word-container" }, [
              vue.createElementVNode("view", { class: "word-container_header" }, [
                vue.createElementVNode("text", { class: "word-container_header-text" }, "搜索历史"),
                vue.createVNode(_component_u_icon, { name: "trash" })
              ]),
              vue.createElementVNode("view", { class: "word-container_center" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(8, (i) => {
                    return vue.createElementVNode("view", { class: "word-container_center-main" }, [
                      vue.createElementVNode("text", { class: "word-container_header-text" }, "王二")
                    ]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 搜索类容 "),
          isShowContainer.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "search-container"
          }, [
            vue.createElementVNode("view", { class: "word-container_body" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(tableData.value, (value2, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                    vue.createElementVNode("view", {
                      class: "a-card",
                      onClick: ($event) => _ctx.toDetail(index)
                    }, [
                      vue.createElementVNode("view", { class: "a-card-top" }, [
                        vue.createElementVNode(
                          "h3",
                          { style: { "padding-left": "3%" } },
                          vue.toDisplayString(value2.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(value2.createTime),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createVNode(_component_u_line, {
                        color: "info",
                        margin: "8px 0px 15px 0px",
                        "border-style": "dashed"
                      }),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("view", { class: "card-money" }, [
                          vue.createElementVNode("text", null, "礼金"),
                          vue.createElementVNode("view", { class: "number" }, [
                            vue.createElementVNode("h3", null, [
                              vue.createVNode(_component_u_icon, {
                                name: "rmb",
                                size: "34"
                              }),
                              vue.createTextVNode(
                                " " + vue.toDisplayString(value2.money),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ]),
                        vue.createElementVNode("view", { style: { "margin-bottom": "6px" } }, [
                          vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "礼品"),
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(value2.gift),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "电话"),
                          vue.createElementVNode(
                            "text",
                            null,
                            vue.toDisplayString(value2.phone),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createVNode(_component_u_line, {
                          color: "info",
                          margin: "8px 0px 8px 0px"
                        }),
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "地址"),
                          vue.createElementVNode(
                            "text",
                            { class: "out-of-range" },
                            vue.toDisplayString(value2.address),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("span", { style: { "position": "absolute", "right": "7%" } }, [
                            vue.createVNode(_component_u_icon, { name: "arrow-right" })
                          ])
                        ]),
                        vue.createVNode(_component_u_line, {
                          color: "info",
                          margin: "5px 0px 5px 0px"
                        }),
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("text", { style: { "margin-right": "5%" } }, "备注"),
                          vue.createElementVNode(
                            "text",
                            { class: "out-of-range" },
                            vue.toDisplayString(value2.remark),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("span", { style: { "position": "absolute", "right": "7%" } }, [
                            vue.createVNode(_component_u_icon, { name: "arrow-right" })
                          ])
                        ])
                      ])
                    ], 8, ["onClick"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("text", null, "正在加载......")
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesIndexSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "E:/uni-app/account/pages/index/search/search.vue"]]);
  const _sfc_main$3 = {
    __name: "add",
    setup(__props) {
      const form = vue.ref();
      const autoHeight = vue.ref(false);
      const data = vue.reactive({
        formData: {
          name: "",
          money: "",
          gift: "",
          phone: "",
          remark: "",
          address: "",
          modelId: "",
          userId: ""
        },
        rules: {
          name: [{
            required: true,
            message: "请输入姓名",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }],
          money: [{
            required: true,
            message: "请输入礼金",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }],
          address: [{
            required: true,
            message: "请输入地址",
            // 可以单个或者同时写两个触发验证方式 
            trigger: ["change", "blur"]
          }]
        }
      });
      onLoad((option) => {
        let mid = JSON.parse(decodeURIComponent(option.obj));
        data.formData.modelId = mid;
        formatAppLog("log", "at pages/index/add.vue:105", "home传过的mid=" + data.formData.modelId);
      });
      vue.onMounted(() => {
        const userId = uni.getStorageSync("storage_id");
        if (userId != "") {
          data.formData.userId = userId;
        }
      });
      useHomeStore();
      const submit = (e) => {
        form.value.validate((valid) => {
          if (valid) {
            formatAppLog("log", "at pages/index/add.vue:123", "验证通过");
            if (data.formData != "") {
              instance.post("/data/addPeople", data.formData).then(() => {
                uni.showModal({
                  title: "提交成功"
                });
              }).catch(() => {
                uni.showModal({
                  title: "提交失败",
                  duration: 1800,
                  icon: "error"
                });
              });
            }
          } else {
            formatAppLog("log", "at pages/index/add.vue:143", "验证失败");
          }
        });
      };
      onReady(() => {
        form.value.setRules(data.rules);
      });
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "main" }, [
              vue.createVNode(_component_u_form, {
                model: data.formData,
                ref_key: "form",
                ref: form
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_u_form_item, {
                    label: "用户",
                    prop: "name",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => data.formData.name = $event),
                        modelModifiers: { lazy: true, trim: true },
                        placeholder: "请输入姓名"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "礼金",
                    prop: "money",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.money,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => data.formData.money = $event),
                        modelModifiers: { lazy: true, trim: true },
                        type: "number",
                        placeholder: "请输入礼金"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "礼品",
                    prop: "gift",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.gift,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => data.formData.gift = $event),
                        modelModifiers: { lazy: true, trim: true },
                        placeholder: "请输入礼品名称"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "电话",
                    prop: "phone",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.phone,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => data.formData.phone = $event),
                        modelModifiers: { lazy: true, trim: true },
                        type: "tel",
                        placeholder: "请输入电话"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "地址",
                    prop: "address",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.address,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => data.formData.address = $event),
                        modelModifiers: { lazy: true, trim: true },
                        placeholder: "请输入地址"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_u_form_item, {
                    label: "备注",
                    prop: "remark",
                    "label-position": "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_u_input, {
                        modelValue: data.formData.remark,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => data.formData.remark = $event),
                        modelModifiers: { lazy: true, trim: true },
                        type: "textarea",
                        placeholder: "请输入备注",
                        border: "",
                        height: "100rpx",
                        "auto-height": autoHeight.value
                      }, null, 8, ["modelValue", "auto-height"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"])
            ]),
            vue.createElementVNode("view", { class: "s-card" }, [
              vue.createElementVNode("button", {
                type: "primary",
                onClick: _cache[6] || (_cache[6] = ($event) => submit()),
                class: "submit"
              }, "提交")
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexAdd = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "E:/uni-app/account/pages/index/add.vue"]]);
  const _sfc_main$2 = {
    __name: "set",
    setup(__props) {
      function exit() {
        formatAppLog("log", "at pages/me/set/set.vue:10", "点击了退出");
        try {
          uni.removeStorageSync("storage_key");
          uni.removeStorage({
            key: "storage_key",
            success: function(res) {
              formatAppLog("log", "at pages/me/set/set.vue:16", "success");
              uni.redirectTo({
                url: "/pages/me/login/login"
              });
            }
          });
        } catch (e) {
          formatAppLog("log", "at pages/me/set/set.vue:23", "退出异常");
        }
      }
      return (_ctx, _cache) => {
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createVNode(_component_u_button, {
            onClick: _cache[0] || (_cache[0] = ($event) => exit())
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("退出")
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  };
  const PagesMeSetSet = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "E:/uni-app/account/pages/me/set/set.vue"]]);
  const _sfc_main$1 = {
    __name: "password",
    setup(__props) {
      const loginData = vue.reactive({
        phone: "",
        password: ""
      });
      const classStore = useClassStore();
      const usePersonal = usePersonalStore();
      const { getPersonal } = usePersonal;
      const login = () => {
        instance.post("/user/passwordLogin", loginData).then((res) => {
          uni.setStorage({
            key: "storage_key",
            data: res.data,
            success: function() {
              formatAppLog("log", "at pages/me/login/password.vue:44", "success");
            }
          });
          getPersonal();
          classStore.getClassName();
          uni.navigateBack();
        }).catch((error) => {
          formatAppLog("error", "at pages/me/login/password.vue:60", error);
        });
      };
      return (_ctx, _cache) => {
        const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0);
        const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1$2);
        const _component_u_button = resolveEasycom(vue.resolveDynamicComponent("u-button"), __easycom_2$1);
        const _component_u_form = resolveEasycom(vue.resolveDynamicComponent("u-form"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "login-container" }, [
            vue.createElementVNode("h2", null, "密码登录"),
            vue.createVNode(_component_u_form, {
              class: "login-form",
              ref: "loginForm",
              model: loginData
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_u_form_item, { prop: "phone" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_input, {
                      modelValue: loginData.phone,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => loginData.phone = $event),
                      placeholder: "请输入手机号"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_u_form_item, { prop: "password" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_u_input, {
                      type: "password",
                      modelValue: loginData.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => loginData.password = $event),
                      placeholder: "密码"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_u_button, {
                  style: { "width": "98%", "margin-top": "32px" },
                  type: "primary",
                  onClick: _cache[2] || (_cache[2] = ($event) => login())
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("登录")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model"])
          ])
        ]);
      };
    }
  };
  const PagesMeLoginPassword = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "E:/uni-app/account/pages/me/login/password.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/me/me", PagesMeMe);
  __definePage("pages/data/data", PagesDataData);
  __definePage("pages/communtiy/communtiy", PagesCommuntiyCommuntiy);
  __definePage("pages/me/login/login", PagesMeLoginLogin);
  __definePage("pages/index/home", PagesIndexHome);
  __definePage("pages/index/detail", PagesIndexDetail);
  __definePage("pages/index/search/search", PagesIndexSearchSearch);
  __definePage("pages/index/add", PagesIndexAdd);
  __definePage("pages/me/set/set", PagesMeSetSet);
  __definePage("pages/me/login/password", PagesMeLoginPassword);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/uni-app/account/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value2) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value2);
  }
  function mobile(value2) {
    return /^1[23456789]\d{9}$/.test(value2);
  }
  function url(value2) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value2);
  }
  function date(value2) {
    return !/Invalid|NaN/.test(new Date(value2).toString());
  }
  function dateISO(value2) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value2);
  }
  function number(value2) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value2);
  }
  function digits(value2) {
    return /^\d+$/.test(value2);
  }
  function idCard(value2) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value2
    );
  }
  function carNo(value2) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value2.length === 7) {
      return creg.test(value2);
    } else if (value2.length === 8) {
      return xreg.test(value2);
    } else {
      return false;
    }
  }
  function amount(value2) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value2);
  }
  function chinese(value2) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value2);
  }
  function letter(value2) {
    return /^[a-zA-Z]*$/.test(value2);
  }
  function enOrNum(value2) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value2);
  }
  function contains(value2, param) {
    return value2.indexOf(param) >= 0;
  }
  function range(value2, param) {
    return value2 >= param[0] && value2 <= param[1];
  }
  function rangeLength(value2, param) {
    return value2.length >= param[0] && value2.length <= param[1];
  }
  function landline(value2) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value2);
  }
  function empty(value2) {
    switch (typeof value2) {
      case "undefined":
        return true;
      case "string":
        if (value2.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value2)
          return true;
        break;
      case "number":
        if (0 === value2 || isNaN(value2))
          return true;
        break;
      case "object":
        if (null === value2 || value2.length === 0)
          return true;
        for (var i in value2) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value2) {
    if (typeof value2 == "string") {
      try {
        var obj = JSON.parse(value2);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value2) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value2);
    } else {
      return Object.prototype.toString.call(value2) === "[object Array]";
    }
  }
  function object(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function code(value2, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value2);
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value2 = data[key];
      if (["", void 0, null].indexOf(value2) >= 0) {
        continue;
      }
      if (value2.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value2.length; i++) {
              _result.push(key + "[" + i + "]=" + value2[i]);
            }
            break;
          case "brackets":
            value2.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value2.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value2.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value2.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value2);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig2 = {};
      if (typeof options === "string") {
        mergeConfig2.url = this.mixinParam(options, params);
        mergeConfig2.type = "navigateTo";
      } else {
        mergeConfig2 = uni.$u.deepClone(options, this.config);
        mergeConfig2.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig2.params = params;
      mergeConfig2 = uni.$u.deepMerge(this.config, mergeConfig2);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig2, resolve);
        });
        isNext && this.openPage(mergeConfig2);
      } else {
        this.openPage(mergeConfig2);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      // 年
      "m+": (date2.getMonth() + 1).toString(),
      // 月
      "d+": date2.getDate().toString(),
      // 日
      "h+": date2.getHours().toString(),
      // 时
      "M+": date2.getMinutes().toString(),
      // 分
      "s+": date2.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? "0" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  function addUnit(value2 = "auto", unit = "rpx") {
    value2 = String(value2);
    return test.number(value2) ? `${value2}${unit}` : value2;
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func === "function" && func();
    } else {
      timeout = setTimeout(function() {
        typeof func === "function" && func();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:13", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  function createApp() {
    const pinia = createPinia();
    const app = vue.createVueApp(App);
    app.use(uView);
    app.use(pinia);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
