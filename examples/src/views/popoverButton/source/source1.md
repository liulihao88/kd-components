```vue
<template>
  <kd-popover-button @confirm="onConfirm"></kd-popover-button>
</template>

<script>
export default {
  methods: {
    onConfirm() {
      this.$message.success('确认删除')
    }
  }
}
</script>
```