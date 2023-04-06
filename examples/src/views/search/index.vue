<template>
  <div>
    <h6>右侧插槽</h6>
    <search01></search01>
    <h6>参数模式， 适用于基本的参数可以完成需求</h6>
    <search02></search02>
    <h6>格式化参数</h6>
    <search03></search03>
    <h6>兼容旧系统</h6>
    <search04></search04>
    <h6>点击查询获取参数</h6>
    <search05></search05>
    <h6>mixin写法</h6>
    <search06></search06>
    <h6>组件写法</h6>
    <search07></search07>
  </div>
</template>

<script>
import source1 from './source/source1.md';
import source3 from './source/source3.md';
import search01 from './search01';
import search02 from './search02';
import search03 from './search03';
import search04 from './search04';
import search05 from './search05';
import search06 from './search06';
import search07 from './search07';

export default {
  name: 'Index',
  components: { search01, search02, search03, search04, search05, search06, search07 },
  data() {
    return {
      source1,
      source3,
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
