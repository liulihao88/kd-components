<template>
  <div>
    <example-title
      :data="{
        title: 'kd-date-range 日期时间选择器',
        subTitle: '在同一个选择器里选择日期和时间',
        maintenance: '胡瑞瑞',
        author: '',
      }"
    ></example-title>
    <example-code :source="source1Md">
      <kd-date-range v-model="val" title="默认424px"></kd-date-range>

      <span class="mlr">中间</span>

      <kd-date-range v-model="dateValue" title="支持width" future-disabled></kd-date-range>
    </example-code>
  </div>
</template>

<script>
import source1Md from './source/source1.md';

export default {
  name: 'Index',
  data() {
    return {
      val: [],
      dateValue: [],
      source1Md: source1Md,
    };
  },
};
</script>
