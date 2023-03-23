```vue
<template>
  <kd-tree-single
      v-model="form.checkFiled"
      :table-data="form.option"
      :disabledTreeCheck="disabledTreeCheck"
      :default-props="defaultProps"
      node-key="name"
      placeholder="请选择要映射的字段"
  ></kd-tree-single>
</template>

<script>
export default {
  name: "testTreeSingle",
  data() {
    return {
      form: {
        option: [
          {
            name: "lisi"
          },
          {
            name: "aaa",
            disabled: true,
            children: [
              {
                name: "a111"
              }
            ]
          }
        ], // 字段下拉
        checkFiled: "" // 被选择的内容
      },
      /**
       * 映射字段，可自定义
       */
      defaultProps: {
        value: "name",
        label: "name"
      }
    };
  },
  methods: {
    disabledTreeCheck(data, node) {
      return node.level === 1;
    }
  },
};
</script>
```
