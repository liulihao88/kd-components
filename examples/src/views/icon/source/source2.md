```vue
<template>
  <!-- 基本用法 -->
  <kd-icon name="kd-icon-a-1bi1"></kd-icon>
  <kd-icon name="el-icon-platform-eleme"></kd-icon>

  <!-- size控制尺寸 -->
  <kd-icon name="el-icon-goods" size="26"></kd-icon>

  <!-- pointer样式 -->
  <kd-icon name="kd-icon-xuanzhong" pointer size="18"></kd-icon>

  <!-- hover颜色 -->
  <kd-icon name="el-icon-upload" pointer hover-color="blue" size="26"></kd-icon>

  <!-- tooltip -->
  <kd-icon name="kd-icon-add" size="26" tooltip="新建"></kd-icon>

  <!-- is-place占位 -->
  <kd-icon is-place></kd-icon>

  <!-- 边距控制 -->
  <kd-icon name="add" mr="8"></kd-icon>

  <!-- 多个图标自动切换 -->
  <kd-icon :names="names" pointer hover-color="blue" size="26" @click="onClick"></kd-icon>

  <!-- 多个图标手动切换 -->
  <kd-icon ref="kdIcon" :names="names" pointer hover-color="blue" size="26" custom-next></kd-icon>
</template>

<script>
export default {
  data() {
    return {
      names: [
        {
          name: 'kd-icon-chevron-up',
          key: 'up',
          tooltip: '上',
        },
        {
          name: 'kd-icon-chevron-right',
          key: 'right',
          tooltip: '右',
        },
        {
          name: 'kd-icon-chevron-down',
          key: 'down',
          tooltip: '下',
        },
        {
          name: 'kd-icon-chevron-left',
          key: 'left',
          tooltip: '左',
        },
      ],
    };
  },
  methods: {
    onClick(key) {
      this.$message.success('多值切换：当前点击' + key);
    },
    // 手动切换图标
    toChangeIcon() {
      setTimeout(() => {
        this.$refs.kdIcon.next();
      }, 1000);
    },
  },
};
</script>
```
