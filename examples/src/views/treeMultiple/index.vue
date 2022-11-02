<template>
  <div>
    <div class="author">维护人：刘力豪</div>
    <div class="sub-title"></div>

    <h5>基础用法</h5>
    <kd-tree-multiple
      v-model="checkData"
      :table-data="treeData"
      :default-props="defaultProps"
      node-key="id"
    ></kd-tree-multiple>
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
      checkData: [], // 选中的值
      treeData: [], // 下拉树形结构数据
      defaultProps: {
        // 属性可自己配置
        value: 'id',
        label: 'label',
        children: 'children',
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.treeData = [
        {
          id: 1,
          label: '一级 2',
          children: [
            {
              id: 3,
              label: '二级 2-1',
              children: [
                {
                  id: 4,
                  label: '三级 3-1-1',
                },
                {
                  id: 5,
                  label: '三级 3-1-2',
                },
              ],
            },
            {
              id: 2,
              label: '二级 2-2',
              disabled: true,
              children: [
                {
                  id: 6,
                  label: '三级 3-2-1',
                },
                {
                  id: 7,
                  label: '三级 3-2-2',
                  disabled: true,
                },
              ],
            },
          ],
        },
      ];
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
