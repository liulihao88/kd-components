<template>
  <div class="kj-affix-footer" v-bind="$attrs" :style="boxStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'KdAffix',
  props: {
    offsetTop: {
      type: [String, Number, undefined],
      default: undefined,
    },
    offsetBottom: {
      type: [String, Number],
      default: 0,
    },
    offsetLeft: {
      type: [String, Number],
      default: 184,
    },
    offsetRight: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    boxStyle() {
      // console.log(typeof this.offsetTop, 1222);
      if (typeof this.offsetTop === 'string' || typeof this.offsetTop === 'number') {
        return {
          top: this.offsetTop,
          left: this.offsetLeft,
          right: this.offsetRight,
        };
      } else {
        return {
          bottom: this.offsetBottom,
          left: this.offsetLeft,
          right: this.offsetRight,
        };
      }
    },
  },
};
</script>
