```vue
<template>
  <div class="" style="display: flex;width: 100%;">
    <div style="position:relative;flex:1;">
      <div style="margin-bottom: 10px;">type="index"</div>
      <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="index">
        <el-table-column label="接口名称" prop="name"></el-table-column>
      </kd-simple-table>
    </div>
    <div style="position:relative;flex:1;">
      <div style="margin-bottom: 10px;">type="selection"</div>
      <kd-simple-table :data="tableData" :show-paging="false"  pre-col-type="selection">
        <el-table-column label="接口名称" prop="name"></el-table-column>
      </kd-simple-table>
    </div>
    <div style="position:relative;flex:1;">
      <div style="margin-bottom: 10px;">type="expand"</div>
      <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="expand" :pre-col-conf="{width:'80px'}">
        <el-table-column label="接口名称" prop="name"></el-table-column>
      </kd-simple-table>
    </div>
  </div>
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
      ]
    }
  }
}
</script>
```