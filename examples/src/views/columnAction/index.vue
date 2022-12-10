<template>
  <div>
    <example-title :data="{ title: '表格操作列', maintenance: '刘云' }" warning>
      基于el-table-column封装，内置了dropdown、popover按钮的处理，与kd-simple-table一起使用。<br />
      通过btn-list配置来控制操作列各种按钮的展示形式；通过click事件处理点击回调。<br />
      当kd-column-action不能满足需求时，可以考虑使用原生的el-table-column组件去自由发挥，实现一些特殊的需求。<br />
      <br />
      <b>
        优化：目前是每个popover按钮都会触发一个单独的el-popover实例，在数据量较多时，会有性能问题，所以应该使用单例模式进行优化。
      </b>
      <br />

      <p slot="warning">
        kd-column-action是kd-column-operate的重构版，后者在个别情况下有比较严重的bug（连续多次点击触发popover时，偶发情况下不经二次确认也会执行确认回调）
      </p>
    </example-title>

    <h5>基础用法</h5>
    <kd-simple-table :data="tableData" :show-paging="false" row-key="id">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <kd-column-action :btn-list="btnList1" label="普通按钮"></kd-column-action>
      <kd-column-action :btn-list="btnList2" label="label函数"></kd-column-action>
      <kd-column-action :btn-list="btnList3" label="popover按钮"></kd-column-action>
      <kd-column-action :btn-list="btnList4" label="按钮禁用"></kd-column-action>
      <kd-column-action :btn-list="btnList5" label="按钮占位"></kd-column-action>
      <kd-column-action :btn-list="btnList6" label="按钮显示/隐藏"></kd-column-action>
      <kd-column-action :btn-list="btnList7" label="dropdown按钮组"></kd-column-action>
    </kd-simple-table>
    <example-code :source="source1"> 上面示例中展示了操作列组件的各种情况下的使用方法。 </example-code>
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
          hidden: '1',
          show: '1',
        },
        {
          id: '2',
          name: '小刘',
          age: '8',
          gender: '女',
          status: 'STOP',
          hidden: '2',
          show: '2',
        },
      ],
      // 普通按钮配置
      btnList1: [
        {
          label: '普通',
          key: 'normal',
          confirm: (scope, item) => {
            this.$message.success('点击按钮--普通');
          },
        },
      ],
      btnList2: [
        {
          label: (scope, item) => {
            return '普通' + (scope.$index + 1);
          },
          key: 'normal',
          confirm: (scope, item) => {
            this.$message.success('点击按钮--' + item.label(scope, item));
          },
        },
      ],
      btnList3: [
        {
          label: '删除',
          key: 'del',
          popover: true,
          confirm: (scope, item) => {
            this.$message.success('点击按钮--删除->确定');
          },
          cancel: (scope, item) => {
            this.$message.success('点击按钮--删除->取消');
          },
        },
        {
          label: '停止',
          key: 'stop',
          popover: true,
          popConfig: {
            title: '提示',
            // placement: 'left',
            content: '是否停止抢救？',
            confirmText: '停了吧',
            cancelText: '再想想',
          },
          confirm: (scope, item) => {
            this.$message.success('点击按钮--停止');
          },
        },
      ],
      btnList4: [
        {
          label: '上线',
          key: 'online',
          // popover: true,
          disabled: (scope, item) => {
            return scope.row.status === 'STOP';
          },
          confirm: (scope, item) => {
            scope.row.status = 'STOP';
          },
        },
        {
          label: '下线',
          key: 'offline',
          disabled: (scope, item) => {
            return scope.row.status === 'START';
          },
          popover: true,
          confirm: (scope, item) => {
            scope.row.status = 'START';
          },
          cancel: (scope, item) => {
            this.$message.success('点击按钮->取消');
          },
        },
      ],
      btnList5: [
        {
          label: '按钮1',
          key: '1',
          hidden: (scope, item) => {
            return scope.row.hidden === '1';
          },
        },
        {
          label: '按钮2',
          key: '2',
          popover: true,
          hidden: (scope, item) => {
            return scope.row.hidden === '2';
          },
        },
        {
          label: '切换',
          key: '3',
          confirm: (scope, item) => {
            scope.row.hidden = scope.row.hidden === '1' ? '2' : '1';
          },
        },
      ],
      btnList6: [
        {
          label: '按钮1',
          key: '1',
          show: (scope, item) => {
            return scope.row.show === '1';
          },
        },
        {
          label: '按钮2',
          key: '2',
          popover: true,
          show: (scope, item) => {
            return scope.row.show === '2';
          },
        },
        {
          label: '切换',
          key: '3',
          confirm: (scope, item) => {
            scope.row.show = scope.row.show === '1' ? '2' : '1';
          },
        },
      ],
      btnList7: [
        {
          label: '按钮1',
          key: '1',
        },
        {
          label: '下拉下拉1',
          key: '2',
          popover: true,
          dropdown: true,
          confirm: (scope, item) => {
            this.$message.success('点击按钮--下拉1');
          },
        },
        {
          label: '下拉2',
          key: '3',
          dropdown: true,
          confirm: (scope, item) => {
            this.$message.success('点击按钮--下拉2');
          },
        },
        {
          label: '下拉3',
          key: '4',
          dropdown: true,
          disabled: (scope, item) => {
            return scope.$index === 1;
          },
          confirm: (scope, item) => {
            this.$message.success('点击按钮--下拉3');
          },
        },
      ],
      btnList: [
        {
          label: '编辑',
          key: 'update',
          permission: 'edit',
          callback: () => {
            this.$message.success('编辑updata 执行');
          },
        },
        // 隐藏按钮
        {
          label: '删除',
          key: 'del',
          popover: true,
          permission: 'del',
          // disabled: (scope, item) => {
          //   return scope.$index === 1;
          // },
          // hidden: (scope, item) => {
          //   return scope.$index === 0;
          // },
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
          // show: function (scope) {
          //   return scope.row.status === 'START';
          // },
        },
        {
          label: '启用',
          key: 'start',
          permission: 'config',
          // show: function (scope) {
          //   return scope.row.status !== 'START';
          // },
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
};
</script>
