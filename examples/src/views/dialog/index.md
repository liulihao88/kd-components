```html 
<template>
  <div class="box">
    <el-button @click="isShow = true">简单弹框</el-button>
    <el-button @click="isShow1 = true">自定义title和footer</el-button>
    <el-button @click="isShow2 = true" type="primary">复杂弹框</el-button>

    <kd-dialog :visible.sync="isShow" title="提示" ref="dialogRef" class="easy_use">
      简单用法
    </kd-dialog>

    <kd-dialog :visible.sync="isShow1" title="提示" ref="dialogRef">
      <template slot="title">
        <div>自定义title <span style="color: red">开心</span></div>
      </template>
      <template slot="footer">
        <el-button type="primary">自定义btn</el-button>
      </template>
      具名插槽
    </kd-dialog>

    <kd-dialog
      :visible.sync="isShow2"
      title="复杂提示"
      @confirm="confirmDialog"
      @cancel="cancelDialog"
      showFullscreen
      append-to-body
      :showFooter="false"
      ref="dialogRef2"
      width="80%"
    >
      <el-button @click="isShow3 = true" type="primary">复杂用法</el-button>
      <kd-dialog
        :visible.sync="isShow3"
        showFullscreen
        :close-on-click-modal="false"
        confirmText="提交按钮1"
        cancelText="取消按钮2"
        title="哈哈"
        top="25vh"
      >
        最里层dialog
      </kd-dialog>
    </kd-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      isShow: false,
      isShow2: false,
      isShow3: false,
      isShow1: false
    };
  },
  watch: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    cancelDialog() {
      console.log('cancelDialog');
    },
    popWin() {
      this.isShow = true;
    },
    confirmDialog() {}
  }
};
</script>
<style scoped lang="scss">
.easy_use ::v-deep .el-dialog__footer{
  border-top: none;
}
</style>

```
### 属性
#### 全局属性
|选项|类型|默认值|说明|
|---|---|---|---|
|title|String|""|弹框标题名称|
|theme|String|""|弹框样式：norm norm16 simple|
|confirmDisabled|Boolean|false|确认按钮是否禁止点击|
|cancelDisabled|Boolean|false|取消按钮是否禁止点击|
|cancelText|String|"取消"|取消按钮文本|
|confirmText|String|"确认"|确认按钮文本|
|showFullscreen|Boolean|false|是否显示可全屏|
|showFooter|Boolean|true|是否显示底部按钮|
|cancelThrottleNumber|Number|1000|取消按钮节流|
|confirmThrottleNumber|Number|1000|确定按钮节流|
|border|Boolean|true|是否显示弹框标题下边线|
|destroyOnClose|Boolean|true|关闭时是否销毁Dialog中的元素|
|width|String|50%|Dialog的宽度|
|top|String|15vh|Dialog CSS中的margin-top值|
|append-to-body|Boolean|false|Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true|
|close-on-click-modal|Boolean|true|是否可以通过点击 modal 关闭 Dialog|

### 事件
|事件名称|说明|回调参数|
|---|---|---|
|cancel|弹框取消按钮|-|
|confirm|弹框确定按钮|-|

### slot
|名称|说明|参数|
|---|---|---|
|title|自定义弹框标题|-|
|footer|自定义弹框底部按钮|-|
