<template>
  <div>
    <kd-drawer
      ref="drawerRef"
      title="index"
      sub-title="index"
      type="detail"
      :visible.sync="isShow"
    >
      <el-descriptions :column="1">
        <el-descriptions-item label="左侧">右侧</el-descriptions-item>
      </el-descriptions>
    </kd-drawer>
  </div>
</template>

<script>
export default {
  name: "T1",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    open() {
      this.isShow = true;
    },
  },
};
</script>
<style scoped lang="scss"></style>
