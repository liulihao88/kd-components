```
<template>
  <div>
    <kd-input v-model="val" title="密码独占一行" width="100%" type="password" class="mb" />
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
```