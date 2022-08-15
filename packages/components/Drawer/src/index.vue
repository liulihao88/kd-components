<template>
  <div class="kd-drawer">
    <el-drawer
      :with-header="false"
      :size="fullscreen ? '100%' :($attrs.size || '640px')"
      :wrapper-closable="wrapperClosable"
      :destroy-on-close="destroyOnCloseComputed"
      :z-index="zIndex"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div v-loading="loading" class="kd-drawer-box">
        <div class="top f-bt">
          <div>
            {{ title }}
          </div>

          <button
            class="el-dialog__headerbtn dialog_fullscreen__icon"
            v-if="showFullscreen"
            @click="fullscreen = !fullscreen"
          >
            <i
              class="kj-iconfont"
              :class="fullscreen ? 'icon-fullscreen-exit' : 'icon-fullsreen'"
            ></i>
          </button>
          <div class="icon_box" @click="escClose">
            <i class="el-icon-close" />
          </div>
        </div>
        <div class="content p-24">
          <slot />
        </div>

        <div class="h-64 footer f bs" v-if="showFooter">
          <slot name="footer">
            <el-button
              v-if="showConfirm"
              type="primary"
              size="small"
              class="mr"
              @click="sConfirm"
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
  </div>
</template>

<script>
/**
* @描述
* element组件draver抽屉封装
* @使用方法
  <kd-drawer
    title="新建数据源"
    :visible.sync="isShowSource"
  >
    中间的slot
    <template #footer>
    </template>
  </kd-drawer>

  如果有更深一层的父组件
   <kd-drawer
      title="andy2"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="sonHandle"
    >
      {{$attrs.name}}
      {{$attrs.list}}
    </kd-drawer>
  @confirm: this.$parent.mIsShow =false
  爷爷组件调用
   <gTest
      :visible.sync="mIsShow"
      name="哈哈哈大萨达撒啊撒"
      :list= "{name: 'l大萨达撒' , age:321321}"
    >
    </gTest>
* @param
  @confirm: 点击确定按钮传递事件
  size="60%" 宽度
  :wrapperClosable="false"  点击遮罩层是否可以关闭
* @LastEditTime: 最后更新时间
* 2022-03-04
* @Author: andy凌云
*/
export default {
  name: 'KdDrawer',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    wrapperClosable: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development' ? true : false
    },
    confirmText: {
      type: String,
      default: '提交'
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
    // 若不加zIndex, message会被遮罩层覆盖
    zIndex: {
      type: [Number, String],
      default: 999
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
  computed: {
    // 控制是否在关闭 Drawer 之后将子元素全部销毁, 默认全部销毁
    destroyOnCloseComputed(val) {
      if (val === false) {
        return false;
      }
      return true;
    }
  },
  watch: {},
  created() {
    //    一定要在create里面执行一下写的回车事件enterSearch(),否则会执行不了
  },
  mounted() {},
  methods: {
    sConfirm() {
      // 如果父组件或者爷爷组件有监听到confirm就把confirm方法emit出去, 否则直接关闭弹框
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
    },
    escClose() {
      this.handleClose();
    }
  }
};
</script>
