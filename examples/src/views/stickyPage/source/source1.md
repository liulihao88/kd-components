```vue
<template>
  <div>
    <div style="height: 60px; font-size: 24px; text-align: center; line-height: 60px">顶部固定内容区域</div>
    
    <column-area side-position="left" :scroll-top="scrollTop2" :ext-bottom="60" top-border>
      <!--侧边内容区域，可获取内部动态高度-->
      <template #side="{ height }">
        <div>
          <div style="height: 300px; background: #eee">
            侧边区域
            <p>动态高度：{{ height }}</p>
          </div>
        </div>
      </template>
      <!--主要内容区域，模拟内容滚动-->
      <div>
        <div style="height: 300px; font-size: 24px">内容区域</div>
        <div style="height: 300px; background: #eee">模拟滚动</div>
        <div style="height: 400px; background: #fff">模拟滚动</div>
        <div style="height: 300px; background: #eee">模拟滚动</div>
        <div style="height: 400px; background: #fff">模拟滚动</div>
        <div style="height: 300px; background: #eee">模拟滚动</div>
        <div style="height: 400px; background: #fff">模拟滚动</div>
      </div>
    </column-area>
    <!--假设底部也有内容-->
    <kd-affix>111</kd-affix>
  </div>
</template>
<script>
export default {
  // 在 ScrollLayout 布局组件中定义的页面滚动距顶的距离
  inject: ["scrollTop"],
  computed: {
    // 组件需要 scrollTop 来控制吸顶
    scrollTop2() {
      return this.scrollTop();
    },
  },
}
</script>
```