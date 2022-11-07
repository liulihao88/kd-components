<template>
  <el-tooltip class="item" effect="dark" :disabled="isShowTooltip" :placement="$attrs.placement" v-bind="$attrs">
    <span
      v-if="!slotShow"
      class="hide-text"
      :style="{ maxWidth: width }"
      v-on="$listeners"
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
    width: {
      // 超过此宽度省略号显示
      type: String,
      default: () => {
        return '100%';
      },
    },
    slotShow: {
      // 是否显示插槽
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      isShowTooltip: false,
    };
  },
  methods: {
    onMouseOver(str) {
      if (this.slotShow) return;
      // 内容超出，显示文字提示内容
      const tag = this.$refs[str];
      if (!tag) return;
      const parentWidth = tag.parentNode.offsetWidth; // 获取元素父级可视宽度
      const contentWidth = tag.offsetWidth; // 获取元素可视宽度
      this.isShowTooltip = contentWidth <= parentWidth;
    },
  },
};
</script>
