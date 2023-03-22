<template>
  <div>
    <div class="author">维护人：刘云</div>
    <div class="sub-title"></div>

    <h5>基础用法</h5>
    <kd-tree-single
      ref="single"
      v-model="value"
      :tree-data="treeData"
      :loading="loading"
      :tree-attrs="treeAttrs"
      :tree-listeners="treeListeners"
    ></kd-tree-single>
    <el-button class="ml3" type="primary" @click="getOptions">异步加载数据</el-button>
    <example-code :source="source2">
      如果要调用组件内部el-tree 组件的各种方法，在外部使用this.$refs.single.$refs.treeRef，可以获取到实例
    </example-code>

    <h6>进阶用法</h6>
    <kd-tree-single
      v-model="form.checkFiled"
      :table-data="form.option"
      :search-attrs="{
        clearable: false,
        placeholder: '请搜索',
        disabled: true,
      }"
      :disabled-tree-check="disabledTreeCheck"
      :default-props="defaultProps"
      node-key="name"
      placeholder="请选择要映射的字段"
      :loading="loading"
    ></kd-tree-single>
    <example-code :source="source1"> 上面示例中展示了操作列组件的各种使用方法。 </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode';
import source1 from './source/source1.md';
import source2 from './source/source2.md';
export default {
  name: 'Index',
  components: {
    ExampleCode,
  },
  data() {
    return {
      source1,
      source2,
      value: '',
      treeData: [],
      treeAttrs: {
        props: {
          value: 'name',
          label: 'name',
          children: 'children',
        },
        nodeKey: 'name',
      },
      loading: false,
      treeListeners: {
        'node-expand': (data, node, self) => {
          console.log(data, node, self);
        },
      },

      form: {
        option: [], // 字段下拉
        checkFiled: '', // 被选择的内容
      },
      // 映射字段，可自定义
      defaultProps: {
        value: 'name',
        label: 'name',
      },
    };
  },
  methods: {
    disabledTreeCheck(data, node) {
      return node.level === 1;
    },
    getOptions() {
      this.loading = true;
      setTimeout(() => {
        this.treeData = [
          {
            name: 'lisi',
          },
          {
            name: 'aaa',
            disabled: false,
            children: [
              {
                name: 'a111',
              },
            ],
          },
        ];
        this.form.option = [
          {
            name: 'lisi',
          },
          {
            name: 'aaa',
            disabled: false,
            children: [
              {
                name: 'a111',
              },
            ],
          },
        ];
        this.loading = false;
      }, 3000);
    },
  },
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
