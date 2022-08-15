```vue
<template>
  <div class="wrap">
    <kd-popover-button
      class="m-r-8"
      :disabled="false"
      :content-text="'是否确认要批量删除数据表？'"
      @confirm="batchDel"
      @cancel="onCancel"
    ></kd-popover-button>
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
```

### 属性
|选项|类型|默认值|说明|
|---|---|---|---|
|popoverAttrs|Object|{placement: "bottom",title: "删除",width: 260,trigger: "click"}|el-popover的属性对象|
|referenceBtnAttrs|Object|{}|触发popup的按钮属性对象|
|referenceText|String|"删除"|触发按钮文本|
|referenceFormat|Function|null|触发按钮文本自定义format|
|contentText|String|"确定删除？"|内容文本|
|contentStyles|Object|null|内容文本样式|
|disConfirm|Boolean|false|popover框确认按钮disabled|
|confirmText|String|"确认"|popover框确认按钮文本|
|cancelText|String|"取消"|popover框取消按钮文本|

### 事件
|事件名称|说明|回调参数|
|---|---|---|
|confirm|点击确定按钮||
|cancel|点击取消按钮||

### slot
|名称|说明|参数|
|---|---|---|
|reference|同el-popover||