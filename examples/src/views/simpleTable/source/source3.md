```vue
<template>
  <kd-simple-table :data="tableData" :paging-attrs="pagingConf" @pageChange="onPageChange">
    <el-table-column label="接口名称" prop="name"></el-table-column>
    <kd-column-show p-l="url,地址"></kd-column-show>
  </kd-simple-table>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {
          name:'获取用户信息',
          url:'/userinfo',
        },
        {
          name:'编辑用户信息',
          url:'/userinfo',
        }
      ],
      pagingConf:{
        pageSize: 40,
        currentPage: 1,
        total: 89
      },
    }
  },
  methods:{
    onPageChange(e){
      this.$message.success(JSON.stringify(e))
    }
  }
}
</script>
```