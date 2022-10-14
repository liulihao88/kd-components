```vue
<template>
  <kd-scroll-group v-model="value" :type="groupType" :options="options" :height="50" :space="40" min-width="150">
  </kd-scroll-group>
</template>

<script>
export default {
  data() {
    return {
      value: 'sh',
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
      groupType:'group'
    }
  }
}
</script>
```