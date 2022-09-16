<template>
  <div>
    <kd-date-range title="基础用法" v-model="val" />
    <kd-date-range
      class="mt"
      title="只能选择过去的时间"
      v-model="dateValue"
      futureDisabled
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      val: [],
      dateValue: []
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss"></style>
