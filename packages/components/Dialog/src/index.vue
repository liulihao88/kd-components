<template>
  <div class="kd-dialog">
    <!-- :close-on-click-modal="mIsDev ? true : false" -->
    <el-dialog
      v-el-drag-dialog
      :fullscreen="fullscreen"
      :custom-class="getThemeClass"
      :destroy-on-close="destroyOnClose !== false"
      v-bind="$attrs"
      :width="$attrs.width || '640px'"
      :class="!border && 'hide-title-border'"
      v-on="$listeners"
    >
      <template slot="title">
        <slot name="title">
          <div>{{ title }}</div>
        </slot>
        <button
          class="el-dialog__headerbtn dialog_fullscreen__icon"
          v-if="showFullscreen"
          @click="fullscreen = !fullscreen"
        >
          <i
            :class="
              fullscreen ? 'kd-icon-fullscreen-exit' : 'kd-icon-fullsreen'
            "
          ></i>
        </button>
      </template>
      <div class="dialog_slot_box">
        <slot />
      </div>
      <div slot="footer" class="dialog_footer" v-if="showFooter">
        <slot name="footer">
          <el-button
            :type="cancelAttrs.type || 'info'"
            v-throttle="cancelThrottleNumber"
            v-if="showCancel"
            v-bind="cancelAttrs"
            @click="handleClose"
            >{{ cancelText }}</el-button
          >
          <el-button
            :type="confirmAttrs.type || 'primary'"
            v-bind="confirmAttrs"
            v-throttle="confirmThrottleNumber"
            v-if="showConfirm"
            @click="confirmHandle"
            >{{ confirmText }}</el-button
          >
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "KdDialog",
  props: {
    title: {
      type: String,
      default: "" // 弹框标题名称
    },
    theme: {
      type: String,
      default: "" // 弹框样式: 默认空, norm norm16 simple
    },
    cancel: {
      type: [Function, String],
      default: "" //
    },
    confirmDisabled: {
      type: Boolean,
      default: false // 确认按钮是否禁止点击
    },
    cancelDisabled: {
      type: Boolean,
      default: false // 取消按钮是否禁止点击
    },

    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    showFullscreen: {
      type: Boolean,
      default: false // 是否显示可全屏
    },
    showFooter: {
      type: Boolean,
      default: true // 是否显示底部操作按钮
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    cancelThrottleNumber: {
      type: Number,
      default: 1000 // 取消按钮节流
    },
    confirmThrottleNumber: {
      type: Number,
      default: 2000
    },
    border: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    confirmAttrs: {
      type: Object,
      default: () => ({})
    },
    cancelAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fullscreen: false
    };
  },
  watch: {
    showDialog() {}
  },
  computed: {
    getThemeClass() {
      if (this.theme === "norm") {
        return "kd-norm-dialog";
      } else if (this.theme === "norm16") {
        return "kd-norm16-dialog";
      } else if (this.theme === "simple") {
        return "kd-simple-dialog";
      } else {
        return "";
      }
    }
  },
  methods: {
    confirmHandle() {
      if (this.$listeners.confirm) {
        this.$emit("confirm");
      } else {
        this.$emit("update:visible", false);
      }
    },
    handleClose() {
      if (this.$listeners.cancel) {
        this.$emit("cancel");
      } else {
        this.$emit("update:visible", false);
      }
    }
  }
};
</script>
