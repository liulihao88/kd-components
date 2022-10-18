```vue
<template>
  <kd-select-multiple
      v-model="form.checkFiled"
      :options="form.allFiled"
      :default-props="defaultProps"
      value-key="value"
      :is-object="true"
      multiple
      collapse-tags
      placeholder="请选择"
  />
</template>

<script >
export default {
  name: "testSelectMultiple",
  data() {
    return {
      form: { 
        allFiled: [ // 字段下拉
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ], 
        checkFiled: [ // 选中的选项
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
      },
      /**
       * 映射字段，可自定义
       */
      defaultProps: {
        value: "value",
        label: "label",
      },
    }
  }
}
</script>

 ```