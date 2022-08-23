<template>
  <div class="wrap">
    <h3>可滚动按钮组（目前只支持单选）</h3>
    <h4>按钮组：type="group"</h4>
    <kd-scroll-group v-model="value" type="group" :options="options.slice(0,3)" :height="50" min-width="150"></kd-scroll-group>
    <h4>单个按钮：type="button"</h4>
    <kd-scroll-group v-model="value" type="button" :options="options"></kd-scroll-group>
    <h4>标签形式：type="tag"</h4>
    <kd-scroll-group v-model="value" type="tag" :options="options"></kd-scroll-group>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        options:[
          {
            label: "上海",
            value: "sh"
          },
          {
            label: "北京",
            value: "bj"
          },
          {
            label: "广州",
            value: "gz"
          },
          {
            label: "深圳",
            value: "sz"
          },
          {
            label: "太原",
            value: "ty"
          },
          {
            label: "黑龙江",
            value: "hlj"
          },
          {
            label: "杭州",
            value: "hz"
          },
          {
            label: "西安",
            value: "xa"
          },
          {
            label: "石家庄",
            value: "sjz"
          },
          {
            label: "济南",
            value: "jn"
          }
        ],
        value:'sh',
      }
    }
  }
</script>
<style lang="scss">
.wrap{
  width:50%;
}
</style>
