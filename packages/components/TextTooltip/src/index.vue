<template>
  <el-tooltip
    class="item"
    effect="dark"
    :disabled="isShowTooltip"
    :content="text"
    :placement="kdPlacement"
    v-bind="$attrs"
  >
    <span
      class="hide-text"
      :style="{ maxWidth: width }"
      @mouseover="onMouseOver('str')"
    >
      <span ref="str">{{ text }}</span>
    </span>
  </el-tooltip>
</template>

<script>
// <TextTooltip width="380px" class="right_bg" :text="activeEntity.name" />
export default {
  name: "TextTooltip",
  components: {},
  props: {
    text: {
      type: String,
      default: () => {
        return "";
      },
    },
    width: {
      type: String,
      default: () => {
        return "100%";
      },
    },
    kdPlacement:{
      type: String,
      default: () => {
        return "top";
      },
    }
  },
  data() {
    return {
      isShowTooltip: true,
    };
  },
  created() {},
  mounted() {},
  methods: {
    onMouseOver(str) {
      // 内容超出，显示文字提示内容
      const tag = this.$refs[str];
      const parentWidth = tag.parentNode.offsetWidth; // 获取元素父级可视宽度
      const contentWidth = tag.offsetWidth; // 获取元素可视宽度
      this.isShowTooltip = contentWidth <= parentWidth;
    },
  },
};
</script>

<style lang="scss">
.hide-text{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
