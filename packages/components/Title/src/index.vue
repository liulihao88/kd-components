<template>
  <div class="kd-title" :style="{ ...margin, ...handleMargin }">
    <div ref="titleRef" class="kd-left-title">
      <div>
        <span>{{ title }}</span>
        <span
          v-if="mIsDev && subTitle"
          v-clipboard="subTitle"
          v-clipboard:success="mClipboardSuccess"
          class="m-l-4 cl-blue"
        >
          ({{ subTitle }})
        </span>
      </div>
      <slot></slot>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
/**
* 公共title组件。可以设置title,  可以设置左侧竖条颜色, 可设置默认插槽和右侧插槽
* @使用方法
<kd-title title="4. 回到顶部"></kd-title>
<kd-title ttitle="左侧粉色" style="--lc: pink"/>
<kd-title
  title="我是title测试"
  subTitle="只是本地显示"
  t="0"
  style="--lc: red; margin-bottom: 30px"
  class="bd-b-1"
  size="none"
>
  <span class="ml2 cl-blue"> 这是默认插槽 </span>
  <template #right>
    <div class="f">
      <el-button>这是右侧插槽的值1</el-button>
      <el-button>这是右侧插槽的值2</el-button>
    </div>
  </template>
</kd-title>
*/
export default {
  name: 'KdTitle',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '', // 默认margin 16px 0
    },
    // 本地开发. 用来对文件命名. 可以快速定位到文件的名字
    subTitle: {
      type: String,
      default: '',
    },
    t: {
      type: [String, Number],
      default: '',
    },
    b: {
      type: [String, Number],
      default: '',
    },
    l: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    margin() {
      if (!this.t && !this.b && !this.l) {
        return {};
      } else {
        let obj = {};
        if (this.t) {
          obj.marginTop = this.mHandleUnit(this.t);
        }
        if (this.b) {
          obj.marginBottom = this.mHandleUnit(this.t);
        }
        if (this.l) {
          obj.marginLeft = this.mHandleUnit(this.l);
        }
        return obj;
      }
    },
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
  methods: {},
};
</script>
