<template>
  <div class="kd-title f-bt" :style="{ ...handleMargin, ...customStyle }">
    <div ref="titleRef" class="title f">
      <div>{{ title }}</div>
      <slot></slot>
    </div>
    <div class="title_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
/**
* @描述
* 公共title组件。可以设置title,  可以设置左侧竖条颜色, 可设置默认插槽和右侧插槽
* @使用方法
<kd-title title="4. 回到顶部"></kd-title>
<kd-title ttitle="左侧粉色" style="--lc: pink"/>
<kd-title
  title="自定义titile"
  style="--lc: yellow"
></kd-title>
*/
export default {
  name: 'KdTitle',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    // 左侧竖条颜色
    color: {
      type: String,
      default: '',
    },
    customStyle: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: '', // 默认margin 16px 0
    },
  },
  data() {
    return {};
  },
  computed: {
    handleMargin() {
      if (this.size === 'none') {
        return { margin: '0' };
      } else if (this.size === 'small') {
        return { margin: '8px 0' };
      } else if (this.size === 'large') {
        return { margin: '24px 0' };
      } else {
        return {};
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    t1() {},
  },
};
</script>
