<template>
  <div class="wrap">
    <popover-button
      class="m-r-8"
      :disabled="false"
      :content-text="'是否确认要批量删除数据表？'"
      @confirm="batchDel"
      @cancel="onCancel"
    ></popover-button>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    methods: {
      batchDel() {
        console.log('批量删除')
        this.$message.success('确认删除')
      },
      onCancel(){
        this.$message.info('取消操作')
      }
    },
  }
</script>
