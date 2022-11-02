<template>
  <div class="box-container">
    <el-button @click="positionTop">定位到顶部</el-button>
    <el-button @click="positionBottom">定位到底部</el-button>
    <kd-scrollbar ref="kdScrollRef" @scrollBottom="scrollBottom" @scrollTop="scrollTop">
      <div class="inner-container">
        <div>top</div>
        <div v-for="item in 30" :key="item">test</div>
        <div>bottom</div>
      </div>
    </kd-scrollbar>
  </div>
</template>

<script>
export default {
  methods: {
    updateScroll() {
      this.$nextTick(() => {
        //解决滚动条初始化消失的问题
        this.$refs.kdScrollRef.updateScroll();
      });
    },
    /**
     * 定位到顶部
     */
    positionTop() {
      this.$refs.kdScrollRef.setScrollPositionTop();
    },
    /**
     * 定位到底部
     */
    positionBottom() {
      this.$refs.kdScrollRef.setScrollPositionBottom();
    },
    // 滚动到底部事件
    scrollBottom() {
      console.log('我已经滚动到底部了');
    },
    // 滚动到底部事件
    scrollTop() {
      console.log('我已经滚动到顶部了');
    },
  },
};
</script>

<style scoped lang="scss">
.box-container {
  height: 100px;
  background-color: #ffffff;
  .inner-container {
    height: 120px;
  }
}
</style>
