<template>
  <div
    class="kd-sticky-page"
    :class="{ 'border-top': topBorder }"
    :style="{ '--side-width': sideWidth + 'px', '--bottom-height': bottom + 'px' }"
  >
    <div
      class="kd-sticky-page__side"
      :style="{
        'max-height': maxHeight + 'px',
        height: sideHeight + 'px',
        ...sideStyle,
        width: sideWidth + 'px',
        ['border-' + (sidePosition === 'left' ? 'right' : 'left')]: sideBorder ? '1px solid var(--line-color)' : 'none',
      }"
    >
      <kd-scrollbar>
        <slot name="side" :height="sideHeight"></slot>
      </kd-scrollbar>
    </div>
    <div class="kd-sticky-page__content" :style="{ ['margin-' + sidePosition]: 'var(--side-width)' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

export default {
  name: 'KdStickyPage',
  inject: {
    scrollTop: {
      default: () => {},
    },
  },
  props: {
    // 左侧吸顶区域宽度
    sideWidth: {
      type: Number,
      default: 270,
    },
    sidePosition: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right'].includes(value);
      },
    },
    // 是否显示侧边栏边框线
    sideBorder: {
      type: Boolean,
      default: true,
    },
    // 是否显示顶部边框线
    topBorder: {
      type: Boolean,
      default: true,
    },
    // 容器跟离顶部的额外高度，默认是导航栏高度
    extTop: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      initToTop: null, // 初始距离顶部的距离
      minHeight: null,
      maxHeight: null,
      sideHeight: 0,
      toTop: 0,
      isFixed: false,
      wrapRect: {},
    };
  },
  computed: {
    scrollTop2() {
      return this.scrollTop() || 0;
    },
    sideStyle() {
      const style = {
        position: this.isFixed ? 'fixed' : 'absolute',
        top: this.isFixed ? this.extTop + 50 + 'px' : 0,
        left: 0,
      };
      if (this.isFixed) {
        style.left =
          this.sidePosition === 'left'
            ? this.wrapRect.left + 'px'
            : this.wrapRect.width - this.sideWidth + this.wrapRect.left + 'px';
      } else {
        style.left = this.sidePosition === 'left' ? 0 : this.wrapRect.width - this.sideWidth + 'px';
      }
      return style;
    },
  },
  watch: {
    scrollTop2(val) {
      this.isFixed = this.extTop + this.initToTop - val < 0;
      this.sideHeight = Math.min(this.minHeight + val, this.maxHeight);
    },
  },
  mounted() {
    this.init();
    addResizeListener(this.$el, this.onResize);
  },
  beforeDestroy() {
    if (this.onResize) removeResizeListener(this.$el, this.onResize);
  },
  methods: {
    init() {
      let wrapRect;
      if (this.$el && this.$el.getBoundingClientRect()) {
        wrapRect = this.$el.getBoundingClientRect();
      }
      this.initToTop = wrapRect.top;
    },
    onResize() {
      let wrapRect;
      if (this.$el && this.$el.getBoundingClientRect()) {
        wrapRect = this.$el.getBoundingClientRect();
      }
      this.wrapRect = { left: wrapRect.left, width: wrapRect.width };
      const winH = window.innerHeight; // 屏幕高度
      this.toTop = wrapRect.top;
      this.sideHeight = this.minHeight = winH - (this.initToTop ?? 0) - this.extTop - this.bottom - 1;
      this.maxHeight = winH - 50 - this.extTop - this.bottom;
    },
  },
};
</script>
