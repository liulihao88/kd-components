<template>
  <div>
    <kd-title title="最基础用法"></kd-title>
    <kd-title title="我是title" style="--lc: red" class="bd-b-1" size="large">
      <span class="ml2"> 这是默认插槽 </span>
      <template #right>
        <el-button>这是右侧插槽的值</el-button>
      </template>
    </kd-title>
    <kd-title title="我是title测试" style="--lc: yellow; margin-bottom: 30px; padding: 16px" size="none">
      <span class="ml2 cl-blue"> 这是默认插槽 </span>
      <template #right>
        <div class="f">
          <el-button>这是右侧插槽的值1</el-button>
          <el-button>这是右侧插槽的值2</el-button>
          <el-button>这是右侧插槽的值3</el-button>
          <div class="w-40 ml">唱跳</div>
        </div>
      </template>
    </kd-title>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss"></style>
