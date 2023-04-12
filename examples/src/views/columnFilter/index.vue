<template>
  <div>
    <example-title :data="{ title: '表格状态和筛选列', maintenance: '刘云' }">
      <p>基于el-table-column封装，与kd-simple-table一起使用。</p>
      <p>
        该组件是从kd-column-show中分离出来的，专注于状态展示、筛选场景，避免单个组件属性过多，减少单个组件的使用复杂度，便于阅读和维护
      </p>
      <p>config属性是组件的主要配置，一般情况下，它包含了该列的枚举值、值转换映射、状态展示、筛选所需要的全部参数。</p>
      <p>同时也支持使用filters、formatter进行自定义配置：</p>
      <p>- formatter：支持对象字面量、函数形式</p>
      <p>- filters：el-table-column的filters属性，只用来处理筛选，不会影响显示值</p>
    </example-title>

    <h5>用法示例</h5>
    <kd-simple-table :data="tableData" :show-paging="false" @filter-change="filterChange">
      <!--属性简写-->
      <kd-column-filter p-l="tip,属性简写" width="100px" no-filter no-status :formatter="false"></kd-column-filter>
      <kd-column-text p-l="status,原始值status"></kd-column-text>
      <!--状态显示：默认-->
      <kd-column-filter p-l="status,默认"></kd-column-filter>
      <!--只显示状态-->
      <kd-column-filter p-l="status,只状态显示" no-filter></kd-column-filter>
      <!--只显示filter-->
      <kd-column-filter p-l="status,只筛选" no-status></kd-column-filter>
      <kd-column-text p-l="status1,原始值status1"></kd-column-text>
      <!--状态显示：自定义双值-->
      <kd-column-filter p-l="status1,自定义formatter" :config="statusConfig1"></kd-column-filter>
      <!--状态显示：自定义双值-->
      <kd-column-filter p-l="status1,自定义filters" :config="statusConfig1" :filters="filters"></kd-column-filter>
      <!--状态显示：自定义双值-->
      <kd-column-filter
        p-l="status1,自定义双值状态"
        :config="statusConfig2"
        no-filter
        :formatter="(value, scope) => '自定义转换' + scope.$index + '-' + value"
      ></kd-column-filter>
    </kd-simple-table>
    <example-code :source="source1">
      注意：筛选列需要在父级table上增加filter-change事件，具体的回调需要自己处理
    </example-code>
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
          tip: '超长文本超长文本超自动隐藏',
          status: true,
          status1: 'FAILURE',
        },
        {
          tip: '普通文本',
          status: false,
          status1: 'SUCCESS',
        },
        {
          tip: '普通文本',
          status: false,
          status1: 'SUCCESS',
        },
      ],
      statusConfig1: {
        SUCCESS: {
          label: '成功',
          color: '#365edf', // 状态列的文字颜色，noStatus=true时可不填
          bg: '#eaeefb', // 状态列的文字背景颜色
        },
        FAILURE: {
          label: '失败',
          color: '#e94c35', // 状态列的文字颜色
          bg: '#fdecea', // 状态列的文字背景颜色
          filter: false, // 筛选列是否显示该值
        },
      },
      statusConfig2: {
        SUCCESS: {
          color: '#365edf', // 状态列的文字颜色，noStatus=true时可不填
          bg: '#eaeefb', // 状态列的文字背景颜色
        },
        FAILURE: {
          color: '#e94c35', // 状态列的文字颜色
          bg: '#fdecea', // 状态列的文字背景颜色
          // filter:false
        },
      },
      filters: [
        {
          text: '失败-FAILURE',
          value: 'FAILURE',
        },
        {
          text: '成功-SUCCESS',
          value: 'SUCCESS',
        },
      ],
    };
  },
  methods: {
    onClick(a) {
      console.log(a);
      this.$message.success('点击');
    },
    filterChange(filters) {
      console.log(filters);
    },
  },
};
</script>
