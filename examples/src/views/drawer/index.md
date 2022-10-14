```html 
<template>
  <div>
    <el-button @click="popWin">抽屉</el-button>
    <el-button @click="popWin2">自定义title和footer插槽</el-button>
    <el-button @click="isShowMulty = true" type="primary">嵌套抽屉</el-button>
    <kd-drawer :visible.sync="isShow" title="提示" @confirm="confirm" ref="drawerRef">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="中文名" prop="realName">
          <kd-input v-model="form.realName"></kd-input>
        </el-form-item>
      </el-form>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height:200px"></div>
      <div style="background-color: pink; height:500px"></div>
    </kd-drawer>
     <kd-drawer :visible.sync="isShow2" @confirm="confirmDialog" title="干啥">
      <template slot="title">
        <div>
          我是title
      </div>
      </template>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height:200px"></div>
      <div style="background-color: pink; height:500px"></div>
      <template #footer>
        <el-button @click="isShow2 = false" type="primary">我是footer按钮</el-button>
      </template>
    </kd-drawer>
    <kd-drawer :visible.sync="isShowMulty" title="提示" @confirm="confirmDialog" :size="800" >
        第一层抽屉
        <el-button @click="isShowMulty2 = true" type="primary">打开内部抽屉</el-button>
        <!-- 第二层要加zIndex, 否则覆盖不住第一层抽屉。 最少为1000。 若有第三层抽屉，累加为1001 -->
        <kd-drawer :visible.sync="isShowMulty2" append-to-body @confirm="t2">
          <div slot="title">第二层抽屉</div>
          <el-button @click="isShowMulty3 = true" type="primary">测试</el-button>
          <kd-drawer :visible.sync="isShowMulty3" title="提示"  append-to-body direction="ttb" :size="300" showFullscreen>
            第三层抽屉 
          </kd-drawer> 
        </kd-drawer> 
      </el-form>
    </kd-drawer>
  </div>
</template>

<script>
import {$toast} from 'utils'
export default {
  name: "Index",
  props: {

  },
  data() {
    return {
      isShow: false,
      isShow2:false,
      isShowMulty: false,
      isShowMulty2: false,
      isShowMulty3: false,
      form: {
        realName: ''
      },
      rules: {
        realName: [
          { required: true, message: '请输入中文', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  
  },
  components: {
  
  },
  created() {

  },
  mounted() {

  },
  methods: {
    popWin() {
      this.isShow = true
    },
    popWin2(){
this.isShow2 = true
    },
    confirmDialog() {

    },
    confirm(){
      this.$refs.formRef.validate((valid)=>{
        if(valid){
          this.isShow = false
        }else{
          $toast('提交失败', 'e')
        }
      })
    },
    t2(){
      $toast('哈哈')
    }
  }
};
</script>
<style scoped lang='scss'>
    
</style>

```

### 属性
#### 全局属性
|选项|类型|默认值|说明|
|---|---|---|---|
|title|String|""|抽屉标题名称|
|showConfirm|Boolean|true|是否显示提交按钮|
|showCancel|Boolean|true|是否显示取消按钮|
|confirmText|String|"提交"|提交按钮文本|
|cancelText|String|"取消"|取消按钮文本|
|showFooter|Boolean|true|是否显示底部按钮|
|cancelThrottleNumber|Number|1000|取消按钮节流|
|confirmThrottleNumber|Number|2000|提交按钮节流|
|destroyOnClose|Boolean|true|关闭时是否销毁抽屉中的元素|
|loading|Boolean|false|抽屉内容的loading|
|wrapperClosable|Boolean|process.env.NODE_ENV === 'development'|点击遮罩层是否可以关闭 Drawer，开发模式为true|
|size|String/Number|30%|Drawer的宽度|
|withHeader|Boolean|true|控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效|
|modal-append-to-body|Boolean|true|遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上|
|direction|Direction|rtl / ltr / ttb / btt|Drawer 打开的方向|
|modal|Boolean|true|是否需要遮罩层|
|before-close|function(done)，done 用于关闭 Drawer|-|关闭前的回调，会暂停 Drawer 的关闭|
|show-close|Boolean|true|是否显示关闭按钮|
|append-to-body|Boolean|true|Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true|
|close-on-press-escape|Boolean|true|是否可以通过按下 ESC 关闭 Drawer|
|custom-class|String|-|Drawer 的自定义类名|

### 事件
|事件名称|说明|回调参数|
|---|---|---|
|cancel|抽屉取消按钮|-|
|confirm|抽屉提交按钮|-|

### slot
|名称|说明|参数|
|---|---|---|
|title|自定义抽屉标题|-|
|footer|自定义抽屉底部按钮|-|

