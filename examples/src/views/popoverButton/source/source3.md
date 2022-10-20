```vue
<template>
  <kd-popover-button
      content-text="确定暂停数据读取吗？"
      :popover-attrs="{title: '是否暂停'}"
      :confirm-text="stopLoading? '加载中': '暂停'"
      cancel-text="不暂停"
      loading-confirm
      @confirm="stopRead"
      @cancel="onCancel"
  >
    <template #reference>
      <i class="el-icon-s-tools" />
    </template>
  </kd-popover-button>
</template>

<script>
export default {
  data() {
    return {
      stopLoading: false
    }
  },
  methods: {
    onCancel(){
      this.$message.info('取消操作')
    },
    stopRead(cb) {
      this.stopLoading = true
      setTimeout(() => {
        this.stopLoading = false
        cb();
      }, 3000)
    },
  }
}
</script>
```