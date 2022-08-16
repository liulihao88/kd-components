<template>
  <el-tooltip
    class="item"
    effect="dark"
    :disabled="isShowTooltip"
    :placement="$attrs.placement"
    v-bind="$attrs"
  >
    <span
      class="hide-text"
      v-on="$listeners"
      v-if="!slotShow"
      :style="{ maxWidth: width }"
      @mouseover="onMouseOver('str')"
    >
      <span ref="str">{{ $attrs.content }}</span>
    </span>
    <slot></slot>
  </el-tooltip>
</template>

<script>
// <kd-tooltip width="380px" class="right_bg" :text="activeEntity.name" />
export default {
  name: 'KdTooltip',
  components: {},
  props: {
    text: { // 浮框显示的问题
      type: String,
      default: () => {
        return "";
      },
    },
    width: { // 超过此宽度省略号显示
      type: String,
      default: () => {
        return "100%";
      },
    },
    slotShow: { // 是否显示插槽
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      isShowTooltip: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    onMouseOver(str) {
      if (this.slotShow) return;
      // 内容超出，显示文字提示内容
      const tag = this.$refs[str];
      const parentWidth = tag.parentNode.offsetWidth; // 获取元素父级可视宽度
      const contentWidth = tag.offsetWidth; // 获取元素可视宽度
      this.isShowTooltip = contentWidth <= parentWidth;
    }
  }
};
</script>

<style lang="scss"></style>
