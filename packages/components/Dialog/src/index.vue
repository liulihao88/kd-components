<template>
  <div class="kd-dialog">
    <!-- :close-on-click-modal="mIsDev ? true : false" -->
    <el-dialog
      v-el-drag-dialog
      :fullscreen="fullscreen"
      :destroy-on-close="$attrs.destroyOnClose !== false"
      v-bind="$attrs"
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
            :class="fullscreen ? 'kd-icon-fullscreen-exit' : 'kd-icon-fullsreen'"
          ></i>
        </button>
      </template>
      <div class="dialog_slot_box">
        <slot />
      </div>
      <span slot="footer" class="dialog_footer" v-if="showFooter">
        <slot name="footer">
          <el-button
            type="info"
            size="small"
            :disabled="cancelDisabled"
            v-throttle="throttleNumber"
            v-if="!!cancelText"
            @click="handleClose"
            >{{ cancelText }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="confirmDisabled"
            v-throttle="throttleNumber"
            v-if="!!confirmText"
            @click="confirmHandle"
            >{{ confirmText }}</el-button
          >
        </slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 二次封装dialog
* @param {*} showDialog 是否显示dialog。
* @param {*} cancle 是否使用自定义的cancel方法
* @example 使用方法
<kjDialog
:visible.sync="isShow"
@confirm="confirmDialog"
> </kjDialog>
*/
export default {
  name: 'KdDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    cancel: {
      type: [Function, String],
      default: ''
    },
    confirmDisabled:{
      type: Boolean,
      default: false
    },
    cancelDisabled:{
      type: Boolean,
      default: false
    },

    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    showFullscreen: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    throttleNumber:{
      type: Number,
      default: 4000
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
  created() {},
  mounted() {},
  methods: {
    confirmHandle() {
      if (this.$listeners.confirm) {
        this.$emit('confirm');
      } else {
        this.$emit('update:visible', false);
      }
    },
    handleClose() {
      if (this.$listeners.cancel) {
        this.$emit('cancel');
      } else {
        this.$emit('update:visible', false);
      }
    }
  }
};
</script>
