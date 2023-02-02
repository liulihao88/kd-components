<template>
  <div
    v-if="mIsDev"
    v-clipboard="subTitle"
    v-clipboard:success="clipboardSuccess"
    class="basic"
    :class="'outer_' + type"
  >
    <span v-if="subTitle">
      {{ subTitle }}
    </span>
    <slot></slot>
  </div>
</template>

<script>
/**
* @描述
* 只有在本地环境下, 才会显示的一些提示文本或按钮, 方便开发, 不占用页面空间
* @使用方法
  <kd-dev sub-title="examples/test/index.vue"></kd-dev>
  <kd-dev>
    <kd-tooltip content="测试按钮" :slot-show="true">
      <el-button type="primary" size="mini">测试57</el-button>
    </kd-tooltip>
  </kd-dev>
  <kd-dev sub-title="examples/test/index.vue" type="fixed" class="t-40 r-200"></kd-dev>
*/
import { $toast } from '@kd/utils';
export default {
  name: 'KdDev',
  components: {},
  props: {
    subTitle: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clipboardSuccess(val) {
      $toast(`${val.text}复制成功`, 's', { duration: 500 });
    },
  },
};
</script>
<style scoped lang="scss">
.basic {
  color: var(--blue);
  opacity: 0.6;
  height: 0px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
}
.outer_ {
  position: relative;
  line-height: 0px;
  height: 0px;
  display: block;
}
.outer_right {
  position: absolute;
  right: 300px;
  text-align: right;
}

.outer_relative {
  position: relative;
  line-height: 0px;
  height: 0px;
  display: block;
}

.outer_fixed {
  position: fixed;
  line-height: 0px;
  height: 0px;
  // text-align: right;
}

.outer_top {
  position: fixed;
  right: 30%;
  top: 16px;
}
</style>
