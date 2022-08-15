<template>
  <el-popover v-model="show" v-bind="popAttrs">
    <slot slot="reference" name="reference">
      <el-button v-bind="referenceBtnAttrs" :disabled="disabled">
        <template v-if="referenceFormat !== null">
          {{ referenceFormat() }}
        </template>
        <template v-else>
          {{ referenceText }}
        </template>
      </el-button>
    </slot>
    <p :style="contentStyles">
      <template v-if="contentFormat !== null">
        {{ contentFormat() }}
      </template>
      <template v-else>
        {{ contentText }}
      </template>
    </p>
    <div class="btn-wrap">
      <el-button type="info" @click="cancel">{{ cancelText }}</el-button>
      <el-button type="primary" :disabled="disConfirm" @click="confirm">
        {{ confirmText }}
      </el-button>
    </div>
  </el-popover>
</template>

<script>
// Attributes
// popupAttrs {Object} popover的属性对象
// referenceBtnAttrs {Object} 触发popup的按钮属性对象
// referenceText {String} 触发按钮文本
// referenceFormat {Function} 触发按钮文本自定义format
// contentText {String} 默认'确定删除？'  主体文本
// contentFormat {Function} 默认null，主体文本自定义
// contentStyles {Object} 默认null，主体文本样式
// disConfirm {Boolean} 默认false，弹出框确认按钮disabled
// confirmText {String} 默认'确认',
// cancelText {String} 默认'取消'

export default {
  name: "KdPopoverButton",
  props: {
    popoverAttrs: {
      type: Object,
      default: () => {}
    },
    referenceBtnAttrs: {
      type: Object,
      default: () => {
        return {};
      }
    },
    referenceText: {
      type: String,
      default: "删除"
    },
    referenceFormat: {
      type: Function,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    contentText: {
      type: String,
      default: "确定删除？"
    },
    contentStyles: {
      type: Object,
      default: () => {}
    },
    contentFormat: {
      type: Function,
      default: null
    },
    disConfirm: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    popAttrs() {
      return Object.assign(
        {
          placement: "bottom",
          title: "批量删除",
          width: 260,
          trigger: "click"
        },
        this.popoverAttrs
      );
    }
  },
  methods: {
    confirm() {
      this.show = false;
      this.$emit("confirm");
    },
    cancel() {
      this.show = false;
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped lang="scss">
.btn-wrap {
  text-align: right;
  margin: 16px 4px 4px 4px;
}
</style>
