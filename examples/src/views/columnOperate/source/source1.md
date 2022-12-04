```vue
<template>
  <kd-simple-table :data="tableData" :show-paging="false">
    <el-table-column label="姓名" prop="name"></el-table-column>
    <kd-column-show p-l="age,年龄"></kd-column-show>
    <el-table-column label="性别" prop="gender"></el-table-column>
    <kd-column-operate :btn-list="btnList" @click="operateConfirm"></kd-column-operate>
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
        {
          label: "编辑",
          key: "update",
          permission: "edit"
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
        // popover和popConfig控制按钮是否按kd-popover-button显示及相关配置
        {
          label: "停止",
          key: "stop",
          permission: "config",
          popover: true,
          popConfig:{
            popoverAttrs:{placement:'left',title:'停止'},
            contentText:'是否停止抢救？',
            confirmText:'停了吧',
            cancelText:'再想想'
          },
          show: function (scope) {
            return scope.row.status === "START";
          }
        },
        {
          label: "启用",
          key: "start",
          permission: "config",
          show: function (scope) {
            return scope.row.status !== "START";
          }
        },
        {
          label: "删除",
          key: "del",
          popover: true,
          dropdown: true,
          permission: "del"
        },
        {
          label: "日志",
          key: "log",
          dropdown: true
        }
      ]
    }
  },
  methods: {
    operateConfirm({ scope, key }) {
      switch (key) {
        case "update":
          this.$message.success('当前操作 --> update，id = '+scope.row.id)
          break;
        case "del":
          this.$message.success('当前操作 --> del，id = '+scope.row.id)
          break;
        case "stop":
          this.$message.success('当前操作 --> stop，id = '+scope.row.id)
          break;
        case "start":
          this.$message.success('当前操作 --> start，id = '+scope.row.id)
          break;
        case "log":
          this.$message.success('当前操作 --> log，id = '+scope.row.id)
          break;
        default:
          return;
      }
    }
  }
}
</script>
```