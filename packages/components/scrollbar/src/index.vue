<template>
  <el-scrollbar class="kd_scrollbar" ref="kdScrollRef" v-bind="$attrs">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
  export default {
    name: 'KdScrollbar',
    methods: {
      updateScroll() {
        this.$nextTick(() => {
          this.$refs.kdScrollRef.update();
        })
      }
    }
  };
</script>
