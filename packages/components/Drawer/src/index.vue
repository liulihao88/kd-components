<template>
  <el-drawer
    :wrapper-closable="mergeAttrs.wrapperClosable"
    :destroy-on-close="destroyOnClose !== false"
    :with-header="true"
    :size="mergeAttrs.size"
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
    </template>

    <div v-loading="loading" class="drawer-main">
      <el-scrollbar class="drawer-scrollbar">
        <div class="content">
          <slot></slot>
        </div>
      </el-scrollbar>

      <div v-if="showFooter" class="kd-drawer-footer">
        <slot name="footer">
          <el-button
            v-if="showConfirm"
            id="kdDrawerConfirmBtn"
            v-throttle="cancelThrottleNumber"
            :type="confirmAttrs.type || 'primary'"
            v-bind="confirmAttrs"
            class="mr"
            @click="confirm"
          >
            {{ mergeAttrs.confirmText }}
          </el-button>
          <el-button
            v-if="mergeAttrs.showCancel"
            v-throttle="confirmThrottleNumber"
            :type="cancelAttrs.type || 'info'"
            v-bind="cancelAttrs"
            @click="handleClose"
          >
            {{ cancelText }}
          </el-button>
        </slot>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
  name: 'KdDrawer',
  props: {
    title: {
      type: String,
      default: '',
    },

    confirmText: {
      type: String,
      default: '提交',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    wrapperClosable: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development',
    },
    cancelThrottleNumber: {
      type: Number,
      default: 1000,
    },
    confirmThrottleNumber: {
      type: Number,
      default: 2000,
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    confirmAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cancelAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 自定义详情属性
    detailAttrs: {
      type: Object,
      default: () => {},
    },
    // 可选值: detail, ''
    type: {
      type: String,
      default: '',
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
      orgForm: {},
    };
  },
  computed: {
    mergeAttrs() {
      // 如果type不是detail, 走默认的逻辑
      let changeAttrs = {
        size: this.$attrs.size || 640,
        confirmText: this.confirmText,
        showCancel: this.showCancel,
        wrapperClosable: this.wrapperClosable,
      };
      if (this.type === 'detail') {
        changeAttrs = Object.assign(
          {
            size: 400,
            confirmText: '关闭',
            showCancel: false,
            wrapperClosable: true,
          },
          this.detailAttrs
        );
      }
      return changeAttrs;
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
      let hasConfirmBtn = document.getElementById('kdDrawerConfirmBtn');
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
