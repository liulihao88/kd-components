<template>
  <div>
    <kd-title title="最基础用法"></kd-title>
    <kd-title
      title="我是title"
      style="--lc: red"
      class="bd-b-1"
      :customStyle="{
        fontSize: '12px',
        padding: '10px 0px',
      }"
      size="large"
    >
      <span class="ml2"> 这是默认插槽 </span>
      <template #right>
        <el-button>这是右侧插槽的值</el-button>
      </template>
    </kd-title>
    <kd-title title="最基础用法" size="large"></kd-title>
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
