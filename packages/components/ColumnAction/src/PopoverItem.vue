<template>
  <el-popover
    ref="popover"
    :placement="popoverConfig.placement"
    :title="popoverConfig.title"
    width="226"
    trigger="click"
    :disabled="disabled"
    popper-class="kd-column-operate__popover-body"
  >
    <div @click.stop>
      <p slot="default" class="kd-column-action__content">{{ popoverConfig.content }}</p>
      <div style="text-align: right; margin: 16px 0 0">
        <el-button v-if="popoverConfig.showCancel" type="info" size="mini" @click="cancel">{{
          popoverConfig.cancelText || '取消'
        }}</el-button>
        <el-button type="primary" size="mini" @click="confirm">{{ popoverConfig.confirmText || '确定' }}</el-button>
      </div>
    </div>

    <template slot="reference">
      <template v-if="type === 'button'">
        <el-button class="kd-column-action__btn-item" :disabled="disabled" type="text">{{
          btnLabel(scope, btnItem)
        }}</el-button>
      </template>
      <template v-if="type === 'dropdown'">
        <el-dropdown-item :disabled="disabled" :command="btnItem.key" class="kd-column-action__btn-item">
          {{ btnLabel(scope, btnItem) }}
        </el-dropdown-item>
      </template>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'PopoverItem',
  components: {},
  mixins: [],
  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    btnItem: {
      type: Object,
      default: () => {
        return {
          key: 'btn',
          hidden: false,
          popover: true,
          popConfig: {
            title: '提示',
            placement: 'left',
            content: '是否停止抢救？',
            confirmText: '停了吧',
            cancelText: '再想想',
          },
        };
      },
    },
    scope: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    popoverConfig() {
      let obj = {
        title: '删除',
        placement: 'bottom',
        content: '确定删除？',
        confirmText: '确定',
        cancelText: '取消',
        showCancel: true,
      };
      return Object.assign({}, obj, this.btnItem.popConfig);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    cancel() {
      this.btnItem.cancel && this.btnItem.cancel(this.scope, this.btnItem);
      this.$refs.popover.doClose();
    },
    confirm() {
      this.btnItem.confirm && this.btnItem.confirm(this.scope, this.btnItem);
      this.$refs.popover.doClose();
    },
    btnLabel(scope, item) {
      let itemLabel;
      if (typeof item.label === 'function') {
        itemLabel = item.label(scope, item);
      } else {
        itemLabel = item.label;
      }
      return itemLabel;
    },
  },
};
</script>
