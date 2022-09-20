<template>
  <el-drawer
    :wrapper-closable="wrapperClosable"
    :destroy-on-close="isDestroyChild"
    :with-header="true"
    :size="$attrs.size || 640"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- <slot name="title" slot="title"></slot> -->
    <!-- <template name="title">
      哈哈
    </template> -->
    <template slot="title">
      <slot name="title">
        <div class="ml2 ft-14">{{ title }}</div>
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
            type="primary"
            size="small"
            class="mr"
            @click="confirm"
          >
            {{ confirmText }}
          </el-button>
          <el-button
            v-if="showCancel"
            type="info"
            size="small"
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
export default {
  name: 'KdDrawer',
  props: {
    title: {
      type: String,
      default: ''
    },

    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '提交'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    loading: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    wrapperClosable: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development'
    }
  },
  computed: {
    isDestroyChild() {
      if (this.$attrs['destroy-on-close'] !== undefined) {
        return this.$attrs['destroy-on-close'];
      }
      return true;
    }
  },
  mounted() {},
  methods: {
    confirm() {
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
