<template>
  <div class="box-container">
    <kd-scrollbar ref="kdScrollRef">
      <div class="inner-container">
        test
        <br/>
        test
        <br/>
        test
        <br/>
        test
        <br/>
        test
        <br/>
        test
        <br/>
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
      })
    },
  }
}
</script>

<style scoped lang="scss">
.box-container {
  height: 60px;
  background-color: #ffffff;
  .inner-container {
    height: 120px;
  }
}
</style>
