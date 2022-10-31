```vue

<template>
  <div>
    <kd-tree-multiple
      v-model="checkData"
      :table-data="treeData"
      :default-props="defaultProps"
      node-key="id"
    />
  </div>
</template>

<script>
export default {
  name: "testTreeMultiple",
  data() {
    return {
      checkData: [], // 选中的值
      treeData: [], // 下拉树形结构数据
      defaultProps: {
        // 属性可自己配置
        value: "id",
        label: "label",
        children: "children"
      }
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
          label: "一级 2",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1"
                },
                {
                  id: 5,
                  label: "三级 3-1-2"
                }
              ]
            },
            {
              id: 2,
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1"
                },
                {
                  id: 7,
                  label: "三级 3-2-2",
                  disabled: true
                }
              ]
            }
          ]
        }
      ];
    }
  }
};
</script>
```