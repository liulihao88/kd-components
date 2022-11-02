<template>
  <div>
    <h3>表格展示列</h3>
    <div class="author">维护人：刘力豪</div>
    <div class="sub-title"></div>

    <h5>用法示例</h5>
    <div class="w-300">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤"> </el-input>
      <kd-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      ></kd-tree>
    </div>
    <example-code :source="source1">
      <div>上面示例中展示了kd-tree组件的各种使用方法。</div>
      <div></div>
    </example-code>
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
      filterText: '',
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
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
