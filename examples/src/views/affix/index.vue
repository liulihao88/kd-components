<template>
  <div>
    <example-title
      :data="{
        title: 'kd-affix吸底button',
        subTitle: '常用于底部button吸底显示,',
        maintenance: '胡瑞瑞',
        author: '',
      }"
    ></example-title>
    <example-code :source="source1Md"> 代码展示 </example-code>
    <!--    <kd-affix offset-bottom="0">-->
    <!--      <el-button>test</el-button>-->
    <!--    </kd-affix>  -->
  </div>
</template>

<script>
import source1Md from './source/source1.md';
export default {
  name: 'TestAffixFooter',
  data() {
    return {
      source1Md: source1Md,
    };
  },
};
</script>
