```vue
<template>
  <el-form :model="form" ref="form" :rules="rules">
    <el-form-item label="接口列表" prop="params">
      <div style="margin-left:80px;">
        <kd-simple-table :data="form.tableData" :show-paging="false">
          <kd-column-form
              t-name="tableData"
              prop="name"
              :col-attrs="{label:'接口名称'}"
              :form-item-attrs="{rules:rules.name}"
              :editor-attrs="{ placeholder: '请输入接口名称',clearable: true }"
          ></kd-column-form>
          <kd-column-form
              t-name="tableData"
              prop="url"
              :col-attrs="{label:'地址'}"
              :form-item-attrs="{rules:rules.url}"
              :editor-attrs="{ placeholder: '请输入接口地址' }"
          ></kd-column-form>
          <kd-column-form
              t-name="tableData"
              prop="method"
              :col-attrs="{label:'请求类型'}"
              editor-type="kd-select"
              :editor-attrs="{options:methodList,type:'simple',placeholder: '请选择请求类型'}"
          ></kd-column-form>
          <kd-column-form
              t-name="tableData"
              prop="timing"
              :col-attrs="{label:'定时发送'}"
              editor-type="el-switch"
              :editor-attrs="{'active-text':'是','inactive-text':'否'}"
          ></kd-column-form>
        </kd-simple-table>
      </div>
    </el-form-item>
  </el-form>
  <el-button type="warning" @click="add">添加接口</el-button>
  <el-button type="primary" @click="submit">提交</el-button>
  <el-button type="info" @click="reset">重置</el-button>
</template>

<script>
export default {
  data() {
    return {
      form:{
        tableData:[
          {
            name:'查询用户列表',
            url:'',
            method:'GET',
            timing:true
          },
          {
            name:'编辑用户信息',
            url:'',
            method:'POST',
            timing:false
          }
        ]
      },
      rules:{
        name:[{ required: true, message: "请输入接口名称", trigger: "blur" }],
        url:[{ required: true, message: "请输入接口地址", trigger: "blur" }]
      },
      methodList:['GET', 'POST', 'PUT', 'DELETE']
    }
  },
  methods: {
    add(){
      this.form.tableData.push({
        name:'',
        url:'',
        method:'',
        timing:false
      })
    },
    submit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    reset(){
      this.$refs.form.resetFields();
    }
  }
}
</script>
```