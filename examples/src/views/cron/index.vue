<template>
  <div>
    <example-title
      :data="{
        title: 'cron 表达式',
        subTitle: 'cron 表达式组件',
        maintenance: '胡瑞瑞',
        author: '',
      }"
    ></example-title>
    <kd-cron
      v-model="cronExpression"
      exe-start-time=""
      :hide-year="false"
      :hide-second="false"
      placeholder="请输入cron表达式"
    ></kd-cron>
    <example-code :source="source1Md"></example-code>
  </div>
</template>

<script>
import source1Md from './source/source1.md';
export default {
  data() {
    return {
      cronExpression: '',
      source1Md: source1Md,
    };
  },
};
</script>
