<template>
  <div>
    <div class="author">维护人：刘力豪</div>
    <div class="sub-title"></div>

    <h5>基础用法</h5>
    <kd-tree-single
      v-model="form.checkFiled"
      :table-data="form.option"
      :default-props="defaultProps"
      node-key="name"
      placeholder="请选择要映射的字段"
    ></kd-tree-single>
    <example-code :source="source1"> 上面示例中展示了操作列组件的各种使用方法。 </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode';
import source1 from './source/source1.md';
export default {
  name: 'Index',
  components: {
    ExampleCode,
  },
  data() {
    return {
      source1,
      form: {
        option: [
          {
            name: 'lisi',
          },
          {
            name: 'aaa',
            disabled: true,
            children: [
              {
                name: 'a111',
              },
            ],
          },
        ], // 字段下拉
        checkFiled: '', // 被选择的内容
      },
      /**
       * 映射字段，可自定义
       */
      defaultProps: {
        value: 'name',
        label: 'name',
      },
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.author {
  margin-bottom: 10px;
  font-size: 12px;
  font-style: italic;
}
.sub-title {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.8em;
  margin-bottom: 5px;
}
.example-wrap {
  width: 600px;
  margin-bottom: 20px;
}
</style>
