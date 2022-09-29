<template>
  <div>
    <el-button @click="t1" type="primary">测试1</el-button>
    <el-button @click="t2" type="info">测试2</el-button>
    <kd-input v-model="num" maxlength="6" />
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {
      num: 'dsadsasa',
      str: 'hello world',
      arr: [11, 22, 33],
      obj: {
        name: 'andy',
        age: 18,
        objArr:[{name: 'andy', age: 18}],  
      },
      date: new Date()
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.t1();
  },
  mounted() {},
  methods: {
    t1() {
      console.log('t1');
    },
    t2() {
      console.log('t2');
    }
  }
};
</script>
<style scoped lang="scss"></style>
