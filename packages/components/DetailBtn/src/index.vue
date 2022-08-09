<template>
  <div class="text-box">
    <el-button @click="init">{{$t("kd.detailBtn.hl")}}9988</el-button>
    <div class="demo">{{ list }}</div>
  </div>
</template>

<script>
export default {
  name: "DetailBtn",
  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    init() {
      this.list = this.list.map((item) => item * 2);
    },
  },
};
</script>

