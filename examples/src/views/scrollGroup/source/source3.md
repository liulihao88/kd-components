```vue
<template>
  <kd-scroll-group v-model="value" :options="options" :height="60" :item-styles="{width:'200px',color:'red'}">
    <template slot-scope="scope">
      <div>
        <div style="font-size: 12px;">选项:{{ scope.index+1 }}-{{ scope.label}}</div>
        <div style="color:blue;text-align: center;margin-top: 5px;">{{ scope.value }}</div>
      </div>
    </template>
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
    }
  }
}
</script>
```