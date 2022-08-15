<!--
des: is-object 为true时需要设置value-key,默认为value，选择后的值为[{name: "id"},{name: "name"}]
    is-object 为 false ,选择的值内容为['id','name']
-->
<template>
  <kd-select-multiple
      v-model="form.checkFiled"
      :options="form.allFiled"
      :default-props="defaultProps"
      value-key="name"
      :is-object="true"
      multiple
      collapse-tags
      placeholder="请选择要映射的字段"
  />
</template>

<script >
export default {
  name: "testSelectMultiple",
  data() {
    return {
      form: {
        allFiled: [{
          name: "lisi"
        }], // 字段下拉
        checkFiled: [], // 被选择的内容
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
