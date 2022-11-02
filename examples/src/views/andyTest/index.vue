<template>
  <div>
    <el-button type="primary" @click="t1">测试1</el-button>
    <el-button type="info" @click="t2">测试2</el-button>
    <div style="background: var(--yellow); fontsize: 40px">我呢</div>
    <div class="test-text">我呢2</div>
    <div class="cl-85 bg-blue">我呢3</div>
    <div style="background: var(--blue2); color: var(--red); fontsize: 40px">测试字体色</div>
  </div>
</template>

<script>
import { uuid } from '@kd/utils';
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      num: 123,
      isShow: false,
      str: 'hello world',
      arr: [11, 22, 33],
      obj: {
        name: 'andy',
        age: 18,
        objArr: [{ chName: '凌云', height: 188 }],
      },
      date: new Date(),
    };
  },
  computed: {},
  watch: {},
  created() {
    this.t1();
  },
  mounted() {},
  methods: {
    t1() {
      console.log(
        '%c 111=>36行 examples/src/views/andyTest/index.vue uuid() ',
        'background:#000;color:#bada55',
        uuid('我只能')
      );
      console.log(
        "%c 222=>37行 examples/src/views/andyTest/index.vue uuid('time') ",
        'background:#000;color:#bada55',
        uuid('time')
      );
      console.log(
        "%c 222=>37行 examples/src/views/andyTest/index.vue uuid('time') ",
        'background:#000;color:#bada55',
        uuid('phone')
      );
      console.log(
        "%c 222=>37行 examples/src/views/andyTest/index.vue uuid('time') ",
        'background:#000;color:#bada55',
        uuid('email')
      );
      uuid([
        { label: '小泽泽', value: 'xzz' },
        { label: '小月月', value: 'xyy' },
      ]);
      console.log(
        ' uuid([ { label: "小泽泽", value: "xzz" },{ label: "小月月", value: "xyy" }])',
        uuid([
          { label: '小泽泽', value: 'xzz' },
          { label: '小月月', value: 'xyy' },
        ])
      );
      console.log(uuid('time', 0, { startStr: 'andy', timeStr: '{h}:{i}:{s}' }));
      console.log(uuid('number'), typeof uuid('number'));
    },
    t2() {
      console.log('t2');
    },
  },
};
</script>
<style scoped lang="scss">
.test-text {
  color: var(--white);
  background: var(--gray);
  border: 1px solid var(--line);
}
</style>
