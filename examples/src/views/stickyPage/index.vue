<template>
  <div>
    <example-title :data="{ title: '侧边吸顶布局组件', maintenance: '刘云' }">
      <p>一个页面布局组件。</p>
      <p>
        适用的场景是：左侧/右侧部分是需要吸顶展示的内容，主内容区域可以跟随页面滚动，例如：左侧是树形选择器，主内容区域为表格
      </p>
      <p>
        当页面滚动时，吸顶区域会吸附在导航栏下（距离可控），同时吸顶区域高度可自动计算，保证高度完全撑开。满足较好的交互体验和视觉观感。
      </p>
    </example-title>

    <el-image :src="image1"></el-image>
    <el-image :src="image2"></el-image>
    <example-code :source="source1" style="margin-top: 20px"></example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
export default {
  name: 'Index',
  data() {
    return {
      image1: require('../../assets/images/sticky-page_1.png'),
      image2: require('../../assets/images/sticky-page_2.png'),
      source1,
    };
  },
};
</script>
<style lang="scss" scoped></style>
