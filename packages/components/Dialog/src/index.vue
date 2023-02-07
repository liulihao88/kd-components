<template>
  <div class="kd-dialog">
    <el-dialog
      v-el-drag-dialog
      :fullscreen="fullscreen"
      :custom-class="getThemeClass"
      :destroy-on-close="destroyOnClose !== false"
      :width="$attrs.width || '640px'"
      :class="!border && 'hide-title-border'"
      :before-close="handleClose"
      v-bind="$attrs"
      v-on="$listeners"
      @closed="_closed"
    >
      <template slot="title">
        <slot name="title">
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
        </slot>
        <button
          v-if="showFullscreen"
          class="el-dialog__headerbtn dialog_fullscreen__icon"
          @click="fullscreen = !fullscreen"
        >
          <i :class="fullscreen ? 'kd-icon-fullscreen-exit' : 'kd-icon-fullsreen'"></i>
        </button>
      </template>
      <div class="dialog_slot_box">
        <slot></slot>
      </div>
      <div v-if="showFooter" slot="footer" class="dialog_footer">
        <slot name="footer">
          <el-button
            v-if="showCancel"
            v-throttle="cancelThrottleNumber"
            :type="cancelAttrs.type || 'info'"
            v-bind="cancelAttrs"
            @click="handleClose"
            >{{ cancelText }}</el-button
          >
          <el-button
            v-if="showConfirm"
            id="kdDialogConfirmBtn"
            v-throttle="confirmThrottleNumber"
            :type="confirmAttrs.type || 'primary'"
            v-bind="confirmAttrs"
            @click="confirm"
            >{{ confirmText }}</el-button
          >
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
  name: 'KdDialog',
  props: {
    title: {
      type: String,
      default: '', // 弹框标题名称
    },
    theme: {
      type: String,
      default: '', // 弹框样式: 默认空, norm norm16 simple
    },
    cancel: {
      type: [Function, String],
      default: '', //
    },
    confirmDisabled: {
      type: Boolean,
      default: false, // 确认按钮是否禁止点击
    },
    cancelDisabled: {
      type: Boolean,
      default: false, // 取消按钮是否禁止点击
    },

    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确认',
    },
    showFullscreen: {
      type: Boolean,
      default: false, // 是否显示可全屏
    },
    showFooter: {
      type: Boolean,
      default: true, // 是否显示底部操作按钮
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    cancelThrottleNumber: {
      type: Number,
      default: 1000, // 取消按钮节流
    },
    confirmThrottleNumber: {
      type: Number,
      default: 2000,
    },
    border: {
      type: Boolean,
      default: true,
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    confirmAttrs: {
      type: Object,
      default: () => ({}),
    },
    cancelAttrs: {
      type: Object,
      default: () => ({}),
    },
    // 本地开发, 用来对drawer命名的, 可以快速定位到drawer的文件名
    subTitle: {
      type: String,
      default: '',
    },
    // 允许自动清空表单
    clear: {
      type: Boolean,
      default: false,
    },
    // 允许自动清空的表单名, 默认form
    formData: {
      type: String,
      default: 'form',
    },
  },
  data() {
    return {
      fullscreen: false,
      orgForm: {},
    };
  },
  computed: {
    getThemeClass() {
      if (this.theme === 'norm') {
        return 'kd-norm-dialog';
      } else if (this.theme === 'norm16') {
        return 'kd-norm16-dialog';
      } else if (this.theme === 'simple') {
        return 'kd-simple-dialog';
      } else {
        return '';
      }
    },
  },
  created() {
    window.addEventListener('keydown', this.enterSubmit);
  },
  destroyed() {
    window.removeEventListener('keydown', this.enterSubmit);
  },
  methods: {
    // 如果form有默认参数, 需要先使用这个方法把默认参数加进来.
    $clear(oForm) {
      this.orgForm = cloneDeep(oForm);
    },
    // 如果在dialog打开的情况下, 给确定按钮绑定enter事件. 注意, 如果有多个visible的情况, 因为visible变量公用, 无法使用回车, 需要用v-if
    enterSubmit(e) {
      if (this.$attrs.visible !== true || !this.mIsDev) {
        return;
      }
      let hasConfirmBtn = document.getElementById('kdDialogConfirmBtn');
      if (!hasConfirmBtn) {
        return;
      }
      if (e.keyCode === 13) {
        this.confirm();
        // 阻止冒泡, 否则el-button等组件也有默认回车事件
        e.preventDefault();
        e.stopPropagation();
      }
    },
    confirm() {
      if (this.$listeners.confirm) {
        this.$emit('confirm');
      } else {
        this.$emit('update:visible', false);
      }
    },
    // 关闭动画结束的时候, 情况父组件的form
    _closed() {
      // 如果clear属性不为真, 或者外部调用了close属性. 返回
      if (this.clear !== true) {
        return;
      }
      let formData = this.$parent[this.formData];
      if (Object.keys(this.orgForm).length === 0) {
        Object.keys(formData).forEach((key) => {
          let getType = this.judgeType(key);
          if (getType === 'array') {
            formData[key] = [];
          } else if (getType === 'object') {
            formData[key] = {};
          } else {
            formData[key] = '';
          }
        });
      } else {
        this.$parent[this.formData] = cloneDeep(this.orgForm);
      }
    },
    judgeType(type) {
      if (typeof type === 'object') {
        const objType = Object.prototype.toString.call(type).slice(8, -1).toLowerCase();
        return objType;
      } else {
        return typeof type;
      }
    },
    handleClose() {
      if (this.$listeners.cancel) {
        this.$emit('cancel');
      } else {
        this.$emit('update:visible', false);
      }
    },
  },
};
</script>
