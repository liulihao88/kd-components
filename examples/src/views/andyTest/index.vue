<template>
  <div class="c-box">

    <kd-title title="2. 复制文本内容"></kd-title>
    <div class="app-container">
      <el-button
        v-clipboard="testVal"
        v-clipboard:success="clipboardSuccess"
        type="primary"
        icon="el-icon-document"
      >
        复制内容
      </el-button>
      <div
        v-clipboard="copyVal"
      >{{copyVal}}</div>
    </div>


  </div>
</template>

<script>
import {$toast} from '@kd/utils'
export default {
  name: "DirectivesPage",
  props: {

  },
  data() {
    return {
      testVal: 'O(∩_∩)O哈哈~',
      copyVal: '复制的内容文本',
      isShow: false,
      iptVal: '',
      iptVal2: '',
      price: '128',
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    clipboardSuccess(val) {
      $toast(`内容(${val.text})复制成功`)
    },
    confirmDialog() { }
  }
};
</script>
<style scoped lang='scss'>
</style>
