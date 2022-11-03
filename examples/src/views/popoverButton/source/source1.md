```vue
<template>
  <!-- type=content（默认） -->
  <kd-popover-button @confirm="onConfirm"></kd-popover-button>
  <!-- type=dropdown-->
  <kd-popover-button type="dropdown" :btn-list="btnList" @btnsClick="onBtnsClick">
    <el-button slot="reference" type="primary" icon="el-icon-plus">新增API</el-button>
  </kd-popover-button>
</template>

<script>
export default {
  data() {
    return {
      btnList: [
        {
          label: '可视化创建API',
          key: 'visual',
        },
        {
          label: 'SQL创建API',
          key: 'sql',
          attrs: { disabled: true },
        },
        {
          label: '注册API',
          key: 'register',
        },
      ],
    }
  },
  methods: {
    onConfirm() {
      this.$message.success('确认删除')
    },
    onBtnsClick(key) {
      console.log(key);
      this.$message.success('当前点击了 ==> ' + key);
    },
  }
}
</script>
```