<template>
  <div class="kd-dialog">
    <!-- :close-on-click-modal="mIsDev ? true : false" -->
    <el-dialog
      v-el-drag-dialog
      :modal="true"
      :modal-append-to-body="true"
      :width="$attrs.width"
      :fullscreen="fullscreen"
      :destroy-on-close="$attrs.destroyOnClose !== false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template slot="title">
        <div>{{ title }}</div>
        <button
          class="el-dialog__headerbtn fullscreen__icon"
          v-if="showFullscreen"
          @click="fullscreen = !fullscreen"
        >
          <i
            class="kj-iconfont"
            :class="fullscreen ? 'icon-fullscreen-exit' : 'icon-fullsreen'"
          ></i>
        </button>
      </template>
      <div class="slot_box">
        <slot />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click="handleClose">{{ cancelText }}</el-button>
        <el-button type="primary" size="small" @click="confirmHandle">{{
          confirmText
        }}</el-button>
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
<style lang="scss" src="./index.scss"></style>
