```vue
<template>
  <kd-simple-table :data="tableData" :show-paging="false">
    <el-table-column label="姓名" prop="name"></el-table-column>
    <kd-column-show p-l="age,年龄"></kd-column-show>
    <el-table-column label="性别" prop="gender"></el-table-column>
    <kd-column-action :btn-list="btnList"></kd-column-action>
  </kd-simple-table>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {
          id:'1',
          name:'老刘',
          age:'80',
          gender:'男',
          status:"START"
        },
        {
          id:'2',
          name:'小刘',
          age:'8',
          gender:'女',
          status:"STOP"
        }
      ],
      btnList:[
        // 普通按钮配置
        {
          label: "编辑",
          key: "update",
          permission: "edit",
          confirm: (scope, item) => {
            this.$message.success('点击按钮--普通');
          },
        },
        // label支持函数
        {
          label: (scope, item) => {
            return '普通' + (scope.$index + 1);
          },
          key: 'normal',
          confirm: (scope, item) => {
            this.$message.success('点击按钮--' + item.label(scope, item));
          },
        },
        // popover默认以删除操作展示
        {
          label: '删除',
          key: 'del',
          popover: true,
          confirm: (scope, item) => {
            this.$message.success('点击按钮--删除->确定');
          },
          cancel: (scope, item) => {
            this.$message.success('点击按钮--删除->取消');
          },
        },
        // hidden方法控制按钮是否隐藏
        {
          label: "删除",
          key: "del",
          popover: true,
          permission: "del",
          disabled: (scope, item) => {
            return scope.$index === 1;
          },
          hidden:(scope, item)=>{
            return scope.$index===0
          }
        },
        // popover和popConfig控制按钮是否按el-popover显示及相关配置
        {
          label: "停止",
          key: "stop",
          permission: "config",
          popover: true,
          popConfig:{
            title:'停止',
            placement:'left',
            content:'是否停止抢救？',
            confirmText:'停了吧',
            cancelText:'再想想'
          },
          show: function (scope) {
            return scope.row.status === "START";
          }
        },
      ]
    }
  },
}
</script>
```