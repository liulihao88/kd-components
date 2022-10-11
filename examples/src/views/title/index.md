 ### 组件接收参数
属性 | 说明 | 类型 | 默认值
--- | :---| :---| :---
title |  title的文字 | String | 
color | 左侧竖条颜色| String | 
customStyle | 文字的自定义style样式| Object | {}
size | 上下margin间距；可选值(none："0"; small："8px 0"; small："24px 0" ) | String | ''
 ### 组件插槽
属性 | 说明  
--- | :---
—— |  title文字靠右的插槽（匿名插槽） 
right | 最右侧插槽


```
<template>
  <div>
    <kd-title title="最基础用法"></kd-title>
    <kd-title
      title="我是title"
      style="--lc: red"
      class="bd-b-1"
      :customStyle="{
        fontSize: '16px',
        padding: '10px 0',
      }"
      size="large"
    >
      <span class="ml2"> 这是默认插槽 </span>
      <template #right>
        <el-button>这是右侧插槽的值</el-button>
      </template>
    </kd-title>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss"></style>

```
