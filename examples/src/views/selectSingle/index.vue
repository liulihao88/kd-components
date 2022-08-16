<!--
des: is-object 为true时需要设置value-key,默认为value，选择后的值为[{name: "id"},{name: "name"}]
    is-object 为 false ,选择的值内容为['id','name']
-->
<template>
  <kd-select-single
      v-model="form.checkFiled"
      :tableData="form.option"
      :default-props="defaultProps"
      :node-key="'name'"
      placeholder="请选择要映射的字段"
  />
</template>

<script >
export default {
  name: "testSelectSingle",
  data() {
    return {
      form: {
        option: [
          {
            name: "lisi"
          },
          {
            name: 'aaa',
            children: [
              {
                name: 'a111'
              }
            ]
          }
        ], // 字段下拉
        checkFiled: '', // 被选择的内容
      },
      /**
       * 映射字段，可自定义
       */
      defaultProps: {
        value: "name",
        label: "name",
      }
    }
  }
}
</script>
