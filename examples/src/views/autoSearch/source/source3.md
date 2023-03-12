```vue
<template>
  <kd-auto-search :form-arr="formArr" @change="onChange">
    <template #f6="{ data, form }">
      插槽
      <el-switch v-model="form.f6"></el-switch>
    </template>
    <template slot="right">
      <el-button type="primary">新增</el-button>
      <el-button type="primary">批量删除</el-button>
    </template>
  </kd-auto-search>
</template>
<script>
export default {
  data() {
    return {
      params: {},
      formArr: [
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
      this.formArr[2].attrs.options = [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ];
      this.formArr[3].attrs.options = [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ];
    }, 1500);
  },
  methods: {
    onChange(params) {
      this.params = params;
    },
  },
};
</script>
```
