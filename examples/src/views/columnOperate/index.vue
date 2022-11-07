<template>
  <div>
    <example-title :data="{ title: '表格操作列', maintenance: '刘云' }">
      基于el-table-column封装，内置了dropdown、popover按钮的处理，与kd-simple-table一起使用。<br />
      通过btn-list配置来控制操作列各种按钮的展示形式；通过click事件处理点击回调。<br />
      <br />
      当kd-column-operate不能满足需求时，可以考虑使用原生的el-table-column组件去自由发挥，实现一些特殊的需求。
    </example-title>

    <h5>基础用法</h5>
    <kd-simple-table :data="tableData" :show-paging="false">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <kd-column-show p-l="age,年龄"></kd-column-show>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <kd-column-operate :btn-list="btnList" @click="operateConfirm"></kd-column-operate>
    </kd-simple-table>
    <example-code :source="source1"> 上面示例中展示了操作列组件的各种使用方法。 </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      tableData: [
        {
          id: '1',
          name: '老刘',
          age: '80',
          gender: '男',
          status: 'START',
        },
        {
          id: '2',
          name: '小刘',
          age: '8',
          gender: '女',
          status: 'STOP',
        },
      ],
      btnList: [
        {
          label: '编辑',
          key: 'update',
          permission: 'edit',
        },
        // 隐藏按钮
        {
          label: '删除',
          key: 'del',
          popover: true,
          permission: 'del',
          hidden: (scope, item) => {
            return scope.$index === 0;
          },
        },
        {
          label: '停止',
          key: 'stop',
          permission: 'config',
          popover: true,
          popConfig: {
            popoverAttrs: { placement: 'left', title: '停止' },
            contentText: '是否停止抢救？',
            confirmText: '停了吧',
            cancelText: '再想想',
          },
          show: function (scope) {
            return scope.row.status === 'START';
          },
        },
        {
          label: '启用',
          key: 'start',
          permission: 'config',
          show: function (scope) {
            return scope.row.status !== 'START';
          },
        },
        {
          label: '删除',
          key: 'del',
          popover: true,
          dropdown: true,
          permission: 'del',
        },
        {
          label: '日志日志',
          key: 'log',
          dropdown: true,
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
        case 'stop':
          this.$message.success('当前操作 --> stop，id = ' + scope.row.id);
          break;
        case 'start':
          this.$message.success('当前操作 --> start，id = ' + scope.row.id);
          break;
        case 'log':
          this.$message.success('当前操作 --> log，id = ' + scope.row.id);
          break;
        default:
          return;
      }
    },
  },
};
</script>
