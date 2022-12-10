```vue
<template>
  <kd-simple-table :data="tableData">
    <el-table-column label="接口名称" prop="name"></el-table-column>
    <kd-column-show p-l="url,地址"></kd-column-show>
    <kd-column-show p-l="status,状态" is-status :filters="statusFilter"></kd-column-show>
    <kd-column-operate2 :btn-list="btnList"></kd-column-operate2>
  </kd-simple-table>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {
          id:'1',
          name:'获取用户信息',
          url:'/userinfo',
          methods: 'GET',
          status:true,
        },
        {
          id:'2',
          name:'编辑用户信息',
          url:'/userinfo',
          methods: 'UPDATE',
          status:false,
        }
      ],
      statusFilter:[
        {
          label:'成功',
          value:true
        },
        {
          label:'失败',
          value:false
        }
      ],
      btnList: [
        {
          label: '编辑',
          key: 'update',
          permission: 'edit',
          confirm: (scope) => {
            this.$message.success('当前操作 --> update，id = ' + scope.row.id);
          },
        },
        {
          label: '删除',
          key: 'del',
          permission: 'delete',
          popover: true,
          confirm: (scope) => {
            this.$message.success('当前操作 --> del，id = ' + scope.row.id);
          },
        },
        {
          label: '导出',
          key: 'export',
          permission: 'config',
          dropdown: true,
          popover: true,
          popConfig: {
            title: '提示',
            content: '是否导出？',
            confirmText: '导出',
          },
          confirm: (scope) => {
            this.$message.success('当前操作 --> export，id = ' + scope.row.id);
          },
        },
      ],
    }
  }
}
</script>
```