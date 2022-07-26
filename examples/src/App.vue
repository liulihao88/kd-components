<template>
  <div id="app">
    <p>{{ $t("message.hello") }}</p>
    <Kj2Step></Kj2Step>
    <el-button @click="lang">切换ja</el-button>
    <el-button @click="langen">切换en</el-button>
    <el-select v-model="value">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="input"></el-input>
    <detail-btn></detail-btn>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      options: [],
      value: "",
      input: ""
    }
  },
  methods: {
    lang() {
      this.$i18n.locale = 'ja'
    },
    langen() {
      this.$i18n.locale = 'en'
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
