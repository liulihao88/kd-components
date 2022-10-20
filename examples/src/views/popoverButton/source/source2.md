```vue
<template>
  <kd-popover-button
      reference-text="批量导出"
      :popover-attrs="{title: '批量导出'}"
      content-text="确定批量导出数据？"
      @confirm="onConfirm"
  >
    <template #reference>
      <i class="el-icon-s-tools" />
    </template>
  </kd-popover-button>
</template>

<script>
export default {
  methods: {
    onConfirm() {
      this.$message.success('确认导出')
    },
  }
}
</script>
```