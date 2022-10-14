<template>
  <el-popover v-model="show" v-bind="popAttrs" v-on="$listeners" class="kd-popover-button">
    <slot slot="reference" name="reference">
      <el-button v-bind="referenceBtnAttrs" :disabled="disabled">
        {{ referenceText }}
      </el-button>
    </slot>

    <slot slot="default">
      <p :style="contentStyles">
        {{ contentText }}
      </p>
    </slot>

    <div style="text-align: right;margin: 16px 4px 4px 4px;">
      <el-button type="info" @click="cancel">{{ cancelText }}</el-button>
      <el-button type="primary" :disabled="disConfirm" :loading="loading" @click="confirm">
        {{ confirmText }}
      </el-button>
    </div>
  </el-popover>
</template>

<script>
// Attributes
// popupAttrs {Object} popover的属性对象
// referenceBtnAttrs {Object} 触发popup的按钮属性对象
// referenceText {String} 按钮文本；不使用reference插槽时，默认为按钮样式；使用reference插槽后该属性失效
// disabled {Boolean} 同el-button的disabled，控制按钮能否点击
// contentText {String} 默认'确定删除？'，主体文本
// contentStyles {Object} 默认null，主体文本样式
// disConfirm {Boolean} 默认false，弹出框确认按钮disabled
// confirmText {String} 默认'确认',
// cancelText {String} 默认'取消'

// 插槽
// default 同popover的default插槽，Popover 内嵌 HTML 文本
// reference 同popover的reference插槽，触发 Popover 显示的 HTML 元素

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
    },
    loadingConfirm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      loading: false
    };
  },
  computed: {
    popAttrs() {
      return Object.assign(
        {
          placement: "bottom",
          title: "删除",
          width: 260,
          trigger: "click"
        },
        this.popoverAttrs
      );
    }
  },
  methods: {
    confirm() {
      if (this.loadingConfirm) {
        this.loading = true;
        this.$emit("confirm", (err) => {
          if (!err) {
            this.loading = false;
            this.show = false;
          }
        });
      } else {
        this.show = false;
        this.$emit("confirm");
      }
      
    },
    cancel() {
      this.show = false;
      this.$emit("cancel");
    }
  }
};
</script>
