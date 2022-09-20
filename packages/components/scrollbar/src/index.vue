<template>
  <el-scrollbar class="kd_scrollbar" ref="kdScrollRef" v-bind="$attrs">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
  export default {
    name: 'KdScrollbar',
    data() {
      return {
        maxScroll: 0, // 可滚动最大高度
        scrollPositionValue: 0, // 当前滚动到的位置
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getMaxScroll();
        this.$refs.kdScrollRef.wrap.addEventListener('scroll', this.scrollEvent)
      })
    },
    methods: {
      /**
       * 更新滚动条
       */
      updateScroll() {
        this.$nextTick(() => {
          this.$refs.kdScrollRef.update();
          // 更新可滚动的最大高度
          this.getMaxScroll();
        })
      },
      /**
       * 计算最大滚动高度
       */
      getMaxScroll() {
        this.maxScroll = this.$refs.kdScrollRef.wrap.scrollHeight - this.$refs.kdScrollRef.wrap.clientHeight;
      },
      /**
       * 滚动条滚动事件
       * @param e
       */
      scrollEvent(e) {
        let scrollTopValue = e.target.scrollTop
        this.scrollPositionValue = scrollTopValue;
        if(scrollTopValue >= this.maxScroll) {
          this.$emit('scrollBottom')
          return false
        }
        if(scrollTopValue <= 0) {
          this.$emit('scrollTop')
          return false
        }
      },
      /**
       * 自定义滚动条位置,传入值
       * @param value : number
       */
      setScrollPosition(value) {
        this.scrollPositionValue = value
        this.$refs.kdScrollRef.wrap.scrollTop = value
      },
      /**
       * 获取当前滚动条的位置
       * @returns {number}
       */
      getScrollPosition() {
        return this.scrollPositionValue
      },
      /**
       * 滚动到底部
       */
      setScrollPositionBottom() {
        this.setScrollPosition(this.maxScroll)
      },
      /**
       * 滚动到顶部
       */
      setScrollPositionTop() {
        this.setScrollPosition(0)
      }
    },
    beforeDestroy() {
      this.$refs.kdScrollRef.wrap.removeEventListener('scroll', this.scrollEvent)
    }
  };
</script>
