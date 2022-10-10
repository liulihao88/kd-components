<template>
  <div>
    <kd-input title="简单input" v-model="val" width="200" class="mb" />
    <kd-input
      v-model="val"
      title="密码独占一行"
      width="100%"
      type="password"
      class="mb"
    />
    <kd-input v-model="val" type="textarea" />
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {
      val: "abc",
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
