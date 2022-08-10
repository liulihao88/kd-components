```vue 
 
<template>
  <div>
    <kd-title title="最基础用法" class="b-b-1"></kd-title>
    <kd-title title="我是title" style="--lc: red">
      <span class="ml2"> 这是默认插槽 </span>
      <template #right>
        <el-button>这是右侧插槽的值</el-button>
      </template>
    </kd-title>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    t1() {}
  }
};
</script>
<style scoped lang="scss"></style>

 ```