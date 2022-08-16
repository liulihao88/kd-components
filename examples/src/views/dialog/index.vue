<template>
  <div>
    <el-button @click="isShow = true">弹框</el-button>
    <el-button @click="isShow1 = true">自定义title和footer</el-button>
    <el-button @click="isShow2 = true" type="primary">复杂弹框</el-button>
    <kd-dialog :visible.sync="isShow" title="提示" ref="dialogRef">
      简单用法
    </kd-dialog>

    <kd-dialog :visible.sync="isShow1" title="提示" ref="dialogRef">
      <template slot="title">
        <div>自定义title <span style="color: red;">开心</span> </div>
      </template>
      <template slot="footer">
        <el-button type="primary">自定义btn</el-button>
      </template>
      具名插槽
    </kd-dialog>

    <kd-dialog
      :visible.sync="isShow2"
      title="复杂提示"
      @confirm="confirmDialog"
      @cancel="cancelDialog"
      showFullscreen
      confirmText="提交按钮"
      cancelText="取消按钮"
      ref="dialogRef2"
      width="80%"
    >
      <el-button @click="isShow3 = true" type="primary">复杂用法</el-button>
      <kd-dialog
        :visible.sync="isShow3"
        showFullscreen
        append-to-body
        title="哈哈"
        zIndex="1000"
        top="25vh"
      >
        最里层dialog
      </kd-dialog>
    </kd-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      isShow: false,
      isShow2: false,
      isShow3: false,
      isShow1: false
    };
  },
  watch: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    cancelDialog() {
      console.log('cancelDialog');
    },
    popWin() {
      this.isShow = true;
    },
    confirmDialog() {}
  }
};
</script>
<style scoped lang="scss"></style>
