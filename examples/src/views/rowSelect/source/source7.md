```vue
<template>
  <div class="advanced-wrap">
    <div class="title">
      <span>筛选条件</span>
      <el-button type="text" @click="triggerFold">收起筛选</el-button>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="showMain" class="main transition-box">
        <template v-for="(value, key) in showConfig">
          <kd-row-select-multiple
              :key="key"
              v-model="value.value"
              label-width="5em"
              :label-text="value.label"
              label-align="right"
              separator
              :default-lines="2"
              :options="value.options"
              icon-position="right"
          ></kd-row-select-multiple>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
let arr = []
for (let i = 0; i < 20; i++) {
  arr.push({ label: 'item' + i, value: i + '' })
}
export default {
  data() {
    return {
      showConfig:{
        o1:{
          value:[],
          label:'主题',
          options:arr.slice(0,20)
        },
        o2:{
          value:[],
          label:'项目',
          options:arr.slice(0,10)
        },
        o3:{
          value:[],
          label:'业务线',
          options:arr.slice(0,15)
        }
      },
      showMain:true
    }
  },
  methods: {
    triggerFold() {
      this.showMain = !this.showMain;
    }
  }
}
</script>
<style scoped lang="scss">
.advanced-wrap {
  border: 1px solid var(--line-color);

  .title {
    height: 40px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);
  }

  .main {
    padding: 16px;

    .row-select:nth-child(-n + 3) {
      margin-bottom: 16px;
    }
  }
}
</style>
```