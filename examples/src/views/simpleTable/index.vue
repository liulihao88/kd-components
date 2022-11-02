<template>
  <div>
    <example-title :data="{ title: '简单表格', maintenance: '刘云' }">
      基于el-table封装，与kd-filter-table不同的是，simple-table没有把过多的逻辑与交互行为封装在组件内部，只提供了必要的样式覆盖、默认属性改写。
      目的是为了让el-table与el-table-column
      <b>解耦</b>，在保证样式统一的基础上可以更灵活的使用el-table，满足可能出现的更多场景。
      kd-simple-table可能比较简单，尤其是对表格搜索、筛选等仍需要使用者在外部处理相关逻辑。<br />
      内部的el-table-column，针对不同特性又封装为展示列组件（kd-column-show）、操作列组件（kd-column-operate）、编辑列组件（kd-column-form）。
      <br />
      当kd-filter-table不能满足需求时，可以考虑使用kd-simple-table，它至少提供了基本的样式，并且不限制你使用原生的组件、属性、方法去自由发挥，
      实现一些特殊的需求。
    </example-title>

    <h5>基础用法</h5>
    <kd-simple-table :data="tableData">
      <el-table-column label="接口名称" prop="name"></el-table-column>
      <kd-column-show p-l="url,地址"></kd-column-show>
      <kd-column-show p-l="status,状态" is-status :filters="statusFilter"></kd-column-show>
      <kd-column-operate :btn-list="btnList" @click="operateConfirm"></kd-column-operate>
    </kd-simple-table>
    <example-code :source="source1">
      kd-simple-table可以和el-table-column、kd-column-show、kd-column-operate、kd-column-form一起使用，其中kd-column-form一般还需要在table
      外层增加el-form才能正常使用。
    </example-code>

    <h5>特殊列</h5>
    <div class="" style="display: flex; width: 100%">
      <div style="position: relative; flex: 1">
        <div style="margin-bottom: 10px">type="index"</div>
        <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="index">
          <el-table-column label="接口名称" prop="name"></el-table-column>
        </kd-simple-table>
      </div>
      <div style="position: relative; flex: 1">
        <div style="margin-bottom: 10px">type="selection"</div>
        <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="selection">
          <el-table-column label="接口名称" prop="name"></el-table-column>
        </kd-simple-table>
      </div>
      <div style="position: relative; flex: 1">
        <div style="margin-bottom: 10px">type="expand"</div>
        <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="expand" :pre-col-conf="{ width: '80px' }">
          <el-table-column label="接口名称" prop="name"></el-table-column>
        </kd-simple-table>
      </div>
    </div>
    <example-code :source="source2">
      通过pre-col-type控制表格第一列为特殊功能的类型，对应el-table-column的type属性，通过pre-col-conf控制其他属性。<br />
      如果有其他自定义需求，可以设置pre-col-type为空（默认值），然后通过el-table-column进行自定义。
    </example-code>

    <h5>行拖拽</h5>
    <kd-simple-table :data="tableData" draggable :pre-col-conf="{ width: '40px' }" @onSort="onSortHandler">
      <el-table-column label="接口名称" prop="name"></el-table-column>
      <kd-column-show p-l="url,地址"></kd-column-show>
    </kd-simple-table>
    <example-code :source="source2">
      通过draggable控制表格的行是否可以被拖拽，通过drag-col-conf控制该列的其他属性。<br />
      行拖拽功能依赖sortablejs，组件内部进行了排序逻辑处理，并赋值了新的表格数据，通过onSort接收拖拽后的新数据。<br />
      <b>注意：</b>本示例中的行拖拽功能仍有问题，目前仍在测试中。
    </example-code>

    <h5>分页配置</h5>
    <kd-simple-table :data="tableData" :paging-attrs="pagingConf" @pageChange="onPageChange">
      <el-table-column label="接口名称" prop="name"></el-table-column>
      <kd-column-show p-l="url,地址"></kd-column-show>
    </kd-simple-table>
    <example-code :source="source3">
      通过paging-attrs控制表格内分页组件属性。show-paging可以控制是否显示底部分页组件。<br />
      pageChange事件用来处理分页组件内当前页改变或者每页显示数量改变时的事件。<br />
      name=paging的插槽可以自定义底部内容。
    </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
import source2 from './source/source2.md';
import source3 from './source/source3.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      source2,
      source3,
      preColType: '',
      pagingConf: {
        pageSize: 40,
        currentPage: 1,
        total: 89,
      },
      statusFilter: [
        {
          label: '成功',
          value: true,
        },
        {
          label: '失败',
          value: false,
        },
      ],
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
      btnList: [
        {
          label: '编辑',
          key: 'update',
          permission: 'edit',
        },
        {
          label: '删除',
          key: 'del',
          permission: 'delete',
          popover: true,
        },
        {
          label: '导出',
          key: 'export',
          permission: 'config',
          dropdown: true,
          popover: true,
          popConfig: {
            popoverAttrs: { title: '提示' },
            contentText: '是否导出？',
            confirmText: '导出',
          },
        },
      ],
    };
  },
  methods: {
    operateConfirm({ scope, key }) {
      switch (key) {
        case 'update':
          this.$message.success('当前操作 --> update，id = ' + scope.row.id);
          break;
        case 'del':
          this.$message.success('当前操作 --> del，id = ' + scope.row.id);
          break;
        case 'export':
          this.$message.success('当前操作 --> export，id = ' + scope.row.id);
          break;
        default:
          return;
      }
    },
    onPageChange(e) {
      this.$message.success(JSON.stringify(e));
    },
    onSortHandler(e) {
      console.log(e);
    },
  },
};
</script>
