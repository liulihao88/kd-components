<template>
  <div>
    <example-title
        :data="{
        title: 'kd-date-range 日期时间选择器',
        subTitle: '在同一个选择器里选择日期和时间',
        maintenance: '胡瑞瑞',
        author: ''
        }"
    ></example-title>
    <example-code :source="source1Md">
      <kd-date-range title="基础用法" v-model="val" />
      <kd-date-range
          class="mt"
          title="只能选择过去的时间"
          v-model="dateValue"
          futureDisabled
      />
    </example-code>
  </div>
</template>

<script>
import source1Md from "./source/source1.md"

export default {
  name: 'Index',
  data() {
    return {
      val: [],
      dateValue: [],
      source1Md: source1Md
    };
  }
};
</script>
