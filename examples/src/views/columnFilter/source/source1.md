```vue
<template>
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
</template>

<script>
export default {
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
}
</script>
```