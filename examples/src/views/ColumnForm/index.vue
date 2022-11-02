<template>
  <div>
    <example-title :data="{ title: '表格表单列', maintenance: '刘云' }">
      基于el-table-column封装，与kd-simple-table一起使用，专为表单中内嵌table的情况封装，所以某些参数为必填：<br />
      - prop：字段名，用于form-item.prop、column.prop、内部表单绑定值<br />
      - t-name：form表单中表格数据对应的字段名，用于绑定参数校验<br />
      组件内部由el-table-column、el-form-item、动态组件三层嵌套，使用时需要通过editor-type给动态组件指定一个组件名称，
      并且这个组件应该是全局组件，如：el-input、el-select等<br />
      <br />
      <b>注意</b>
      ：本组件未实现一个单元格内需要多个表单的情况，因为涉及到关联关系、布局样式等问题，逻辑可能会比较复杂。<br />
      当kd-column-form不能满足需求时，可以考虑使用原生的el-table-column组件去自由发挥，实现一些特殊的需求。
    </example-title>

    <h5>用法示例</h5>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="接口列表" prop="params">
        <div style="margin-left: 80px">
          <kd-simple-table :data="form.tableData" :show-paging="false">
            <kd-column-form
              t-name="tableData"
              prop="name"
              :col-attrs="{ label: '接口名称' }"
              :form-item-attrs="{ rules: rules.name }"
              :editor-attrs="{ placeholder: '请输入接口名称', clearable: true }"
            ></kd-column-form>
            <kd-column-form
              t-name="tableData"
              prop="url"
              :col-attrs="{ label: '地址' }"
              :form-item-attrs="{ rules: rules.url }"
              :editor-attrs="{ placeholder: '请输入接口地址' }"
            ></kd-column-form>
            <kd-column-form
              t-name="tableData"
              prop="method"
              :col-attrs="{ label: '请求类型' }"
              editor-type="kd-select"
              :editor-attrs="{ options: methodList, type: 'simple', placeholder: '请选择请求类型' }"
            ></kd-column-form>
            <kd-column-form
              t-name="tableData"
              prop="timing"
              :col-attrs="{ label: '定时发送' }"
              editor-type="el-switch"
              :editor-attrs="{ 'active-text': '是', 'inactive-text': '否' }"
            ></kd-column-form>
          </kd-simple-table>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="warning" @click="add">添加接口</el-button>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="info" @click="reset">重置</el-button>

    <example-code :source="source1">
      上面示例展示了如何在el-form表单中使用该组件，可以把任意全局组件插入到该组件内，并传递相关配置即可。
    </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      form: {
        tableData: [
          {
            name: '查询用户列表',
            url: '',
            method: 'GET',
            timing: true,
          },
          {
            name: '编辑用户信息',
            url: '',
            method: 'POST',
            timing: false,
          },
        ],
      },
      rules: {
        name: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入接口地址', trigger: 'blur' }],
      },
      methodList: ['GET', 'POST', 'PUT', 'DELETE'],
    };
  },
  methods: {
    add() {
      this.form.tableData.push({
        name: '',
        url: '',
        method: '',
        timing: false,
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    reset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
