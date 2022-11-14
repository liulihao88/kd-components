<template>
  <div>
    <example-title :data="{ title: '简单表格', maintenance: '刘云' }">
      基于el-table封装，与kd-filter-table不同的是，simple-table没有把过多的逻辑与交互行为封装在组件内部，只提供了必要的样式覆盖、默认属性改写。
      目的是为了让el-table与el-table-column
      <b>解耦</b>，在保证样式统一的基础上可以更灵活的使用el-table，满足可能出现的更多场景。
      kd-simple-table可能比较简单，尤其是对表格搜索、筛选等仍需要使用者在外部处理相关逻辑。<br />
      内部的el-table-column，针对不同特性又封装为展示列组件（<a href="#testColumnShow">kd-column-show</a
      >）、操作列组件（<a href="#testColumnOperate">kd-column-operate</a>）、编辑列组件（<a href="#testColumnForm"
        >kd-column-form</a
      >）。
      <br />
      当kd-filter-table不能满足需求时，可以考虑使用kd-simple-table，它至少提供了基本的样式，并且不限制你使用原生的组件、属性、方法去自由发挥，
      实现一些特殊的需求。
    </example-title>

    <h5>基础用法</h5>
    <kd-simple-table :data="tableData" :border="false" :out-border="false">
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
    <el-row>
      <el-col :span="12">
        <div style="height: 40px; line-height: 40px">type="index"</div>
        <kd-simple-table :data="tableData" :show-paging="false" pre-col-type="index" :border="false">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column label="接口名称" prop="name"></el-table-column>
        </kd-simple-table>
      </el-col>
      <el-col :span="12">
        <div style="height: 40px; line-height: 40px">type="selection"</div>
        <kd-simple-table :data="tableData" :show-paging="false" :border="false" @selection-change="onSelection">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="接口名称" prop="name"></el-table-column>
        </kd-simple-table>
      </el-col>
      <el-col :span="12">
        <div style="height: 40px; line-height: 40px">type="expand"</div>
        <kd-simple-table :data="tableData" :show-paging="false" :border="false">
          <el-table-column type="expand"> 展开行 </el-table-column>
          <el-table-column label="接口名称" prop="name"></el-table-column>
        </kd-simple-table>
      </el-col>
      <el-col :span="12">
        <div style="height: 40px; line-height: 40px">树结构</div>
        <kd-simple-table :data="tableData3" :show-paging="false" :border="false" row-key="id" default-expand-all>
          <el-table-column label="名称" prop="name"></el-table-column>
        </kd-simple-table>
      </el-col>
    </el-row>
    <example-code :source="source2">
      通过el-table-column为表格添加特殊列。<br />
      <span style="color: red; font-weight: bold">注意：</span
      >当表格外部容器为flex布局时，表格横向只能放大不能缩小，并且没有完美的解决方案
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

    <!--    <h5>固定表头及分页行</h5>-->
    <!--    <kd-simple-table-->
    <!--      :data="tableData2"-->
    <!--      :paging-attrs="pagingConf2"-->
    <!--      :fixed="['header', 'footer']"-->
    <!--      @pageChange="onPageChange2"-->
    <!--    >-->
    <!--      <el-table-column label="接口名称" prop="name"></el-table-column>-->
    <!--      <kd-column-show p-l="url,地址"></kd-column-show>-->
    <!--    </kd-simple-table>-->
    <!--    <example-code :source="source3">-->
    <!--      结合现有业务，当表格显示内容过多时，可通过fixed属性配置，使表头行吸顶、分页行吸底<br />-->
    <!--      <br />-->
    <!--    </example-code>-->
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
      pagingConf2: {
        pageSize: 20,
        currentPage: 1,
        total: 300,
        pageSizes: [10, 20, 30, 40, 80],
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
      tableData2: [
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
      tableData3: [
        {
          id: '0',
          name: '一级1',
          children: [
            {
              id: '1',
              name: '二级1',
              children: [
                {
                  id: '11',
                  name: '三级1',
                },
              ],
            },
            {
              id: '2',
              name: '二级2',
            },
          ],
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
    onPageChange2(e) {
      this.$message.success(JSON.stringify(e));
      let obj = Object.assign({}, this.pagingConf2, e);
      console.log(obj);
      let arr = [];
      for (let i = 0; i < obj.pageSize; i++) {
        arr.push({
          id: i + '',
          name: '获取用户信息',
          url: '/userinfo',
          methods: 'GET',
          status: true,
        });
      }
      this.tableData2 = arr;
    },
    onSortHandler(e) {
      console.log(e);
    },
    onSelection() {
      console.log('type=selection');
    },
  },
};
</script>
