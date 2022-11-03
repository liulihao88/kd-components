<template>
  <el-popover v-model="show" v-bind="popAttrs" class="kd-popover-button" v-on="$listeners">
    <slot slot="reference" name="reference">
      <el-button v-bind="referenceBtnAttrs" :disabled="disabled">
        {{ referenceText }}
      </el-button>
    </slot>

    <template v-if="type === 'content'">
      <slot slot="default">
        <p :style="contentStyles">
          {{ contentText }}
        </p>
      </slot>

      <div style="text-align: right; margin: 16px 4px 4px 4px">
        <el-button type="info" @click="cancel">{{ cancelText }}</el-button>
        <el-button type="primary" :disabled="disConfirm" :loading="loading" @click="confirm">
          {{ confirmText }}
        </el-button>
      </div>
    </template>
    <template v-if="type === 'dropdown'">
      <el-button
        v-for="item in btnList"
        :key="item.key"
        v-bind="item.attrs"
        class="kd-popover-button__dropdown-button"
        @click="btnsClick(item.key)"
        >{{ item.label }}</el-button
      >
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'KdPopoverButton',
  props: {
    type: {
      type: String,
      default: 'content',
      validator: function (value) {
        return ['content', 'dropdown'].includes(value);
      },
    },
    popoverAttrs: {
      type: Object,
      default: () => {},
    },
    referenceBtnAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    referenceText: {
      type: String,
      default: '删除',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    contentText: {
      type: String,
      default: '确定删除？',
    },
    contentStyles: {
      type: Object,
      default: () => {},
    },
    disConfirm: {
      type: Boolean,
      default: false,
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    loadingConfirm: {
      type: Boolean,
      default: false,
    },
    btnList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      show: false,
      loading: false,
    };
  },
  computed: {
    popAttrs() {
      let obj;
      if (this.type === 'content') {
        obj = {
          placement: 'bottom',
          title: '删除',
          width: 260,
          trigger: 'click',
        };
      }
      if (this.type === 'dropdown') {
        obj = {
          placement: 'bottom-end',
          width: 143,
          trigger: 'click',
          'popper-class': 'kd-popover-button__dropdown',
        };
      }

      return Object.assign(obj, this.popoverAttrs);
    },
  },
  methods: {
    confirm() {
      if (this.loadingConfirm) {
        this.loading = true;
        this.$emit('confirm', (err) => {
          if (!err) {
            this.loading = false;
            this.show = false;
          }
        });
      } else {
        this.show = false;
        this.$emit('confirm');
      }
    },
    cancel() {
      this.show = false;
      this.$emit('cancel');
    },
    btnsClick(key) {
      this.$emit('btnsClick', key);
    },
  },
};
</script>
