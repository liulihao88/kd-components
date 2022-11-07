```vue
<template>
  <!-- 图标名可简化 -->
  <kd-icon name="a-1bi1"></kd-icon>
  <kd-icon name="kd-icon-kuguanli"></kd-icon>
  
  <!-- 兼容el图标 -->
  <kd-icon name="el-icon-platform-eleme"></kd-icon>

  <!-- size控制尺寸 -->
  <kd-icon name="el-icon-goods" size="26"></kd-icon>  
  
  <!-- pointer样式 -->
  <kd-icon name="xuanzhong" pointer size="18"></kd-icon>
  
  <!-- hover颜色 -->
  <kd-icon name="el-icon-upload" pointer hover-color="blue" size="26"></kd-icon>

  <!-- tooltip -->
  <kd-icon name="add" size="26" tooltip="新建"></kd-icon>

  <!-- names定义多个图标切换 -->
  <kd-icon :names="names" pointer hover-color="blue" size="26" @click="onClick"></kd-icon>

  <!-- is-place占位 -->
  <kd-icon is-place></kd-icon>
  
  <!-- 边距控制 -->
  <kd-icon name="add" mr="8"></kd-icon>
</template>

<script>
export default {
  data() {
    return {
      names: [
        {
          name: 'chevron-up',
          key: 'up',
          tooltip: '上',
        },
        {
          name: 'chevron-right',
          key: 'right',
          tooltip: '右',
        },
        {
          name: 'chevron-down',
          key: 'down',
          tooltip: '下',
        },
        {
          name: 'chevron-left',
          key: 'left',
          tooltip: '左',
        },
      ],
    };
  },
  methods: {
    onClick(key){
      this.$message.success('多值切换：当前点击' + key);
    }
  }
};
</script>

 ```
