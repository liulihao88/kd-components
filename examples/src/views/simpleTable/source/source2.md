```vue
<template>
  <kd-simple-table :data="tableData" draggable :pre-col-conf="{ width: '40px' }" @onSort="onSortHandler">
    <el-table-column label="接口名称" prop="name"></el-table-column>
    <kd-column-show p-l="url,地址"></kd-column-show>
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
        {
          id: '2',
          name: '编辑用户信息',
          url: '/userinfo',
          methods: 'UPDATE',
          status: false,
        },
      ],
    };
  },
  methods: {
    onSortHandler(newData) {
      console.log('重新排序后的数据',newData);
    },
  }
};
</script>
```
