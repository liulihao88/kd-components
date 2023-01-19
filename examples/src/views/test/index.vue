<template>
  <div>
    <kd-title title="ikun" subTitle="鸡你太美">
      你干嘛
      <template #right>
        <div class="w-200 tr">唱跳 rap 篮球</div>
      </template>
    </kd-title>

    <kd-select v-model="selectValue" :options="options" />
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      selectValue: '',
      options: [
        
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss"></style>
