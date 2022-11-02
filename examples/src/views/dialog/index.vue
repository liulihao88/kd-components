<template>
  <div class="box">
    <el-button @click="isShow = true">简单弹框</el-button>
    <el-button @click="isShow1 = true">自定义title和footer</el-button>
    <el-button type="primary" @click="isShow2 = true">复杂弹框</el-button>
    <kd-dialog ref="dialogRef" :visible.sync="isShow" theme="norm16" title="提示" class="easy_use"> </kd-dialog>

    <kd-dialog ref="dialogRef" :visible.sync="isShow1" title="提示">
      <template slot="title">
        <div>自定义title <span style="color: red">开心</span></div>
      </template>
      <template slot="footer">
        <el-button type="primary">自定义btn</el-button>
      </template>
      具名插槽
    </kd-dialog>

    <kd-dialog
      ref="dialogRef2"
      :visible.sync="isShow2"
      title="复杂提示"
      show-fullscreen
      width="1000"
      :confirm-attrs="{
        type: 'danger',
        size: 'mini',
        disabled: true,
      }"
    >
      <el-button type="primary" @click="isShow3 = true">复杂用法</el-button>
      <kd-dialog
        :visible.sync="isShow3"
        show-fullscreen
        append-to-body
        :close-on-click-modal="false"
        confirm-text="提交按钮1"
        cancel-text="取消按钮2"
        title="哈哈"
        top="25vh"
      >
        最里层dialog, 且点击模态框不关闭
      </kd-dialog>
    </kd-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      isShow: false,
      isShow2: false,
      isShow3: false,
      isShow1: false,
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.easy_use ::v-deep .el-dialog__footer {
  border-top: none;
}
</style>
