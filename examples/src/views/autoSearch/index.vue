<template>
  <div>
    <example-title :data="{ title: '表格搜索组件', maintenance: '刘云' }">
      搜索组件，由kd-table-search 组件基础上，结合目前的业务逻辑改造而来<br />
      一般情况，组件内部可以实现在折叠、展开、重置、查询操作时数据自动处理，外部可直接使用数据进行后续处理<br />
      在比较复杂的情况下，本组件的兼容性和便利性可能不太好，更建议使用kd-table-search 在基础布局基础上自己写处理逻辑<br />
    </example-title>

    <h5>一般用法</h5>
    <kd-auto-search :form-arr="formArr0" @change="onChange0">
      <template slot="right">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">批量删除</el-button>
      </template>
    </kd-auto-search>
    <div>
      返回结果
      {{ params0 }}
    </div>
    <example-code :source="source1" style="margin-top: 20px">
      一般情况下，除右侧的按钮，整个搜索表单可以使用纯配置完成，不需要额外的逻辑处理，只需要通过search
      事件在父组件接收参数处理查询操作即可
    </example-code>

    <h5>兼容旧系统</h5>
    <kd-auto-search old-model :form-arr="formArr0" @change="onChange1">
      <template slot="right">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">批量删除</el-button>
      </template>
    </kd-auto-search>
    <div>
      返回结果
      {{ params1 }}
    </div>
    <example-code :source="source1" style="margin-top: 20px">
      设置old-model即可，配置与一般用法相同；旧系统的搜索框通常没有模糊搜索功能，各个表单按照正常水平布局平铺，也没有折叠/展开的事件
    </example-code>

    <h5>复杂情况</h5>
    <kd-auto-search :form-arr="formArr1" @change="onChange2" @search="onSearch" @reset="onReset" @fold="onFold">
      <template #f6="{ data, form }">
        插槽
        <el-switch v-model="form.f6"></el-switch>
      </template>
      <template slot="right">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">批量删除</el-button>
      </template>
    </kd-auto-search>
    <div>
      返回结果
      {{ params2 }}
    </div>
    <example-code :source="source3" style="margin-top: 20px">
      复杂情况下，某个表单项需要使用具名插槽自定义，该项配置 slot=true，该插槽的名称就是该项的key，<br />
      - 如果只是简单的组件自定义，需要接收组件内部的 form 对象（它是最终需要返回的数据），使用v-model 与对应的 key
      进行绑定即可，其他逻辑仍可在kd-auto-search 组件内部处理<br />
      - 如果是完全自定义，那么需要全部重写所有的数据处理逻辑，实际开发中这种情况极少，示例中暂时不做说明
    </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
import source3 from './source/source3.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      source3,
      params0: {},
      params1: {},
      params2: {},
      formArr0: [
        {
          key: 'f1',
          title: '关键词',
          placeholder: '请输入关键词',
          first: true,
        },
        {
          key: 'f2',
          value: '23',
          title: '输入框2',
        },
        {
          key: 'f3',
          type: 'kd-select',
          value: '1',
          title: '下拉框-单选',
          attrs: {
            width: 180,
            options: [
              { label: '选项一', value: '1' },
              { label: '选项二', value: '2' },
            ],
          },
        },
        {
          key: 'f4',
          type: 'kd-select',
          value: ['1', '2'],
          title: '下拉框-多选',
          attrs: {
            multiple: true,
            options: [
              { label: '选项一', value: '1' },
              { label: '选项二', value: '2' },
            ],
          },
        },
        {
          key: 'f5',
          type: 'kd-date-range',
          title: '时间选择',
          value: [],
          valueFormat(val, key) {
            return { startTime: val?.[0] || '', endTime: val?.[1] || '' };
          },
        },
      ],
      formArr1: [
        {
          key: 'f1',
          title: '关键词',
          placeholder: '请输入关键词',
          first: true,
        },
        {
          key: 'f2',
          value: '23',
          title: '输入框2',
        },
        {
          key: 'f3',
          type: 'kd-select',
          value: '1',
          title: '下拉框-单选',
          attrs: {
            width: 150,
            options: [],
          },
        },
        {
          key: 'f4',
          type: 'kd-select',
          value: ['1', '2'],
          title: '下拉框-多选',
          attrs: {
            multiple: true,
            options: [],
          },
        },
        {
          key: 'f6',
          slot: true,
          defaultValue: false,
        },
        {
          key: 'f5',
          type: 'kd-date-range',
          title: '时间选择',
          value: [],
          valueFormat(val, key) {
            return { startTime: val?.[0] || '', endTime: val?.[1] || '' };
          },
        },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.formArr1[2].attrs.options = [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ];
      this.formArr1[3].attrs.options = [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ];
    }, 1500);
  },
  methods: {
    onChange0(params) {
      this.params0 = params;
    },
    onChange1(params) {
      this.params1 = params;
    },
    onChange2(params) {
      this.params2 = params;
    },
    onSearch(params) {
      this.$message.success(`查询操作，参数：${JSON.stringify(params)}`);
    },
    onReset(params) {
      this.$message.success(`重置操作，参数：${JSON.stringify(params)}`);
    },
    onFold(params) {
      this.$message.success(`fold操作， 当前 fold=${params.fold} 参数：${JSON.stringify(params.form)}`);
    },
  },
};
</script>
<style lang="scss" scoped></style>
