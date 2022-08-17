```
<template>
  <div>
    <el-button @click="isShow=true">抽屉</el-button>
    <el-button @click="isShowMulty = true" type="primary">嵌套抽屉</el-button>

    <kd-drawer :visible.sync="isShow" title="提示" @confirm="confirmDialog">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="中文名" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
      </el-form>
    </kd-drawer>

    <kd-drawer :visible.sync="isShowMulty" title="提示" @confirm="confirmDialog" :size="800" >
        第一层抽屉
        <el-button @click="isShowMulty2 = true" type="primary">打开内部抽屉</el-button>
        
        <kd-drawer :visible.sync="isShowMulty2" title="提示" :zIndex="1000" append-to-body>
          第二层抽屉  
          <el-button @click="isShowMulty3 = true" type="primary">测试</el-button>
          <kd-drawer :visible.sync="isShowMulty3" title="提示"  append-to-body zIndex="1001" direction="ttb" :size="300" showFullscreen>
          第三层抽屉 
        </kd-drawer> 
      </kd-drawer> 
    </kd-drawer>
  </div>
</template>

<script>
### 注意：
对于el-drawer遮罩层级过高，挡信message弹框的问题，可以在调用this.$message时，指定customClass自定义类，并声明z-index:3000，或更多在值。因为el-drawer遮罩层默认从2000开始，每打开一个+1，

### 属性：
- 支持el-drawer的绝大部分属性，以下属性按项目情况设置了默认值
- wrapperClosable属性默认为false
- isDestroyChild，即destroy-on-close，默认为true
- size默认为480
- with-header设为true，最好别设置该属性，没测试过

### 事件：
- confirm：默认确认按钮点击回调
- cancel：默认取消按钮点击回调

### 插槽：
- title：顶部左侧部分，不含关闭按钮，没有啥情况需要整个header替换
- default：主体内容部分
- footer：底部按钮区域


import {$toast} from 'u/gFunc'
export default {
  name: "Index",
  data() {
    return {
      isShow: false,
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
  }
};
</script>
<style scoped lang='scss'>
    
</style>
```