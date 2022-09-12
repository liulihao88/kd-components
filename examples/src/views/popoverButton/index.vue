<template>
  <div class="wrap">
    <kd-popover-button
      class="m-r-8"
      :disabled="false"
      :content-text="'是否确认要批量删除数据表？'"
      @confirm="batchDel"
      @cancel="onCancel"
    ></kd-popover-button>
    <kd-popover-button
      class="m-r-8"
      content-text="确定暂停数据读取吗？"
      reference-text="暂停"
      :popover-attrs="{title: '暂停'}"
      :loading-confirm="true"
      :confirm-text="stopLoading? '加载中': '确定'"
      @confirm="stopRead"
      @cancel="cancelStop"
    >
      <template #reference>
        <i class="icon kj-iconfont icon-geshihua m-l-4 cp" />
      </template>
    </kd-popover-button>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        stopLoading: false
      }
    },
    methods: {
      batchDel() {
        console.log('批量删除')
        this.$message.success('确认删除')
      },
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
      cancelStop() {
        // this.stopLoading = false
      }
    },
  }
</script>
