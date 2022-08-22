```vue
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

```

### 注意
选项key需要使用string类型，因为使用了**事件委托**和html的**data-\*自定义数据属性**

### 属性
|选项|类型|默认值|说明|
|---|---|---|---|
|value/v-model|string|""|绑定值|
|options|array|[]|对象数组，[{label:'',value:''}]|
|type|string|group|按钮类型：group-按钮组，button-单个按钮，tag-标签|
|space|number|16|type!==group时按钮间距|
|height|number|34|高度|
|forceShow|boolean|false|是否强制显示两边按钮，默认情况下，超宽时才显示|

### slot
|名称|说明|参数|
|---|---|---|
|default|中间滚动区域插槽，注意布局方式||