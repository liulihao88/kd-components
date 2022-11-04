```vue
<template>
  <!--type="index"-->
  <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="index" :border="false">
    <el-table-column type="index" width="50"> </el-table-column>
    <el-table-column label="接口名称" prop="name"></el-table-column>
  </kd-simple-table>
  
  <!--type="selection"-->
  <kd-simple-table :data="tableData" :show-paging="false" :border="false" @selection-change="onSelection">
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column label="接口名称" prop="name"></el-table-column>
  </kd-simple-table>
  
  <!--type="expand"-->
  <kd-simple-table :data="tableData" :show-paging="false" :border="false">
    <el-table-column type="expand"> 展开行 </el-table-column>
    <el-table-column label="接口名称" prop="name"></el-table-column>
  </kd-simple-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: '1',
          name: '获取用户信息',
          url: '/userinfo',
          methods: 'GET',
          status: true,
        },
      ],
    };
  },
};
</script>
```
