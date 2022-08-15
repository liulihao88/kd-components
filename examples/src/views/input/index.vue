<template>
  <div>
    <kd-input title="简单input" v-model="val" width="200" />
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
