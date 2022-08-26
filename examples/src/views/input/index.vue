<template>
  <div>
    <kd-input title="简单input" v-model="val" width="200" />
    <kd-input v-model="val" title="独占一行" width="100%" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      val: 'abc'
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss"></style>
