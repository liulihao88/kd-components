<template>
  <div>
    <div class="author">维护人：盖翠莎</div>
    <div class="sub-title">表格</div>

    <h5>一般用法</h5>
    <div class="example-wrap">
      <source1></source1>
    </div>
    <example-code :source="sourceMd1">
      一般表格，包含关键字搜索，高级搜索，operation插槽，分页，字段插槽，列下拉搜索，每行操作按钮配置等
    </example-code>

    <h5>简单用法</h5>
    <div class="example-wrap">
      <source2></source2>
    </div>
    <example-code :source="sourceMd2"> 仅表格，不包含其他功能 </example-code>

    <h5>支持多选、批量操作</h5>
    <div class="example-wrap">
      <source3></source3>
    </div>
    <example-code :source="sourceMd3"> 支持多选、批量操作 </example-code>

    <h5>兼容老平台的表格（老平台传参方式不一样），需要配置simpleKv:true</h5>
    <div class="example-wrap">
      <source4></source4>
    </div>
    <example-code :source="sourceMd4"> 兼容老平台的表格，配置simpleKv=true </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode';
import source1 from './source/source1.vue';
import sourceMd1 from './source/source1.md';
import source2 from './source/source2.vue';
import sourceMd2 from './source/source2.md';
import source3 from './source/source3.vue';
import sourceMd3 from './source/source3.md';
import source4 from './source/source4.vue';
import sourceMd4 from './source/source4.md';
export default {
  name: 'TestTable',
  components: {
    ExampleCode,
    source1,
    source2,
    source3,
    source4,
  },
  props: {},
  data() {
    return {
      sourceMd1,
      sourceMd2,
      sourceMd3,
      sourceMd4,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
