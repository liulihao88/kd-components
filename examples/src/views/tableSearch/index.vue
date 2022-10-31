<template>
  <div>
    <example-title :data="{title: '表格搜索组件',maintenance: '刘云'}">
      表格顶部搜索组件，与kd-simple-table一起使用，默认为简单搜索，通过插槽扩展右侧按钮组和多条件搜索（即高级搜索）。<br />
      组件内容只提供布局、样式和交互，数据处理还需要在外部进行。
    </example-title>

    <h5>普通搜索</h5>
    <kd-table-search>
      <kd-input title="搜索关键词" placeholder="请输入服务名称/负责人/描述" width="400"></kd-input>
    </kd-table-search>
    <example-code :source="source1" style="margin-top:20px;"></example-code>

    <h5>高级搜索</h5>
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
    <example-code :source="source2" style="margin-top:20px;">
      提供以下插槽扩展组件：<br />
      - default：首行左侧筛选区域 <br />
      - more：高级搜索区域<br />
      - right：首行右侧按钮区域<br />
    </example-code>
  </div>
</template>

<script>
import source1 from "./source/source1.md"
import source2 from "./source/source2.md"
  export default {
    name: 'Index',
    data() {
      return {
        source1,
        source2,
      }
    },
  }
</script>
<style lang="scss" scoped>
</style>
