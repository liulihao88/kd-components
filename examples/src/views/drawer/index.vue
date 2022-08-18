<template>
  <div>
    <el-button @click="popWin">抽屉</el-button>
    <el-button @click="popWin2">抽屉2</el-button>
    <el-button @click="isShowMulty = true" type="primary">嵌套抽屉</el-button>
    <kd-drawer :visible.sync="isShow" title="提示" @confirm="confirmDialog">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="中文名" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
      </el-form>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height:200px"></div>
      <div style="background-color: pink; height:500px"></div>
    </kd-drawer>
     <kd-drawer :visible.sync="isShow2" @confirm="confirmDialog">
      <div slot="title">标题插槽</div>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height:200px"></div>
      <div style="background-color: pink; height:500px"></div>
    </kd-drawer>
    <kd-drawer :visible.sync="isShowMulty" title="提示" @confirm="confirmDialog" :size="800" >
        第一层抽屉
        <el-button @click="isShowMulty2 = true" type="primary">打开内部抽屉</el-button>
        <!-- 第二层要加zIndex, 否则覆盖不住第一层抽屉。 最少为1000。 若有第三层抽屉，累加为1001 -->
        <kd-drawer :visible.sync="isShowMulty2" append-to-body>
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

    }
  }
};
</script>
<style scoped lang='scss'>
    
</style>
