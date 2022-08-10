```vue 
 
<template>
  <div>
    <el-button @click="popWin">抽屉</el-button>
    <kd-drawer :visible.sync="isShow" title="提示" @confirm="confirmDialog">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="中文名" prop="realName">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
      </el-form>
    </kd-drawer>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {

  },
  data() {
    return {
      isShow: false,
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
    confirmDialog() {

    }
  }
};
</script>
<style scoped lang='scss'>
    
</style>

 ```