<!--
des: is-object 为true时需要设置node-key,默认为value，选择后的值为[{name: "id"},{name: "name"}]
  is-object 为 false ,选择的值内容为['id','name']
-->
<template>
  <div>
    <kd-tree-multiple
        v-if="treeLoading"
        v-model="checkData"
        :table-data="treeData"
        :default-props="defaultProps"
        node-key="id"
    />
  </div>
</template>

<script >
export default {
  name: "testTreeMultiple",
  data() {
    return {
      treeLoading: false, // 当树形结构数据请求成功时，设置为true
      checkData: [], // 选中的值
      treeData: [], // 下拉树形结构数据
      defaultProps: {  // 属性可自己配置
        value: "id",
        label: "label",
        children: "children",
      },
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.treeData = [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }]
      this.treeLoading = true
    },
  }
}
</script>
