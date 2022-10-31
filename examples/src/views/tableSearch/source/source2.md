```vue
<template>
  <kd-table-search>
    <kd-input title="搜索关键词" placeholder="请输入服务名称/负责人/描述" width="400"></kd-input>
    <template slot="right">
      <el-button type="primary">新增</el-button>
      <el-button type="primary">批量删除</el-button>
    </template>
    <template slot="more">
      <kd-input title="服务名称" width="220"></kd-input>
      <kd-input title="负责人" width="220"></kd-input>
      <kd-input title="描述" width="220"></kd-input>
      <kd-input title="条件一" width="220"></kd-input>
      <kd-input title="条件二" width="220"></kd-input>
      <kd-date-range title="选择时间"></kd-date-range>
    </template>
  </kd-table-search>
</template>
```