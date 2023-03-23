```vue
<template>
  <div>
    <kd-tree-single
      ref="single"
      v-model="value"
      :tree-data="treeData"
      :loading="loading"
      :tree-attrs="treeAttrs"
      :tree-listeners="treeListeners"
    ></kd-tree-single>

    <el-button class="ml3" type="primary" @click="getOptions">异步加载数据</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:'',
      treeData:[],
      treeAttrs:{
        props:{
          value: 'name',
          label: 'name',
        },
        nodeKey:'name'
      },
      loading:false,
      // 绑定事件时，必须保持key与el-tree 一致，区分大小写和连字符
      treeListeners: {
        'node-expand': (data, node, self) => {
          console.log(data, node, self);
        },
      },
    };
  },
  methods: {
    // 模拟异步请求数据
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
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
```
