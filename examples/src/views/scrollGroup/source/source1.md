```vue
<template>
  <kd-scroll-group v-model="value" :type="groupType" :options="options" :force-show="forceShow">
  </kd-scroll-group>

  <el-button @click="groupType='group'">按钮组</el-button>
  <el-button @click="groupType='button'">单个按钮</el-button>
  <el-button @click="groupType='tag'">标签样式</el-button>
  <el-button @click="forceShow=!forceShow">显示/隐藏滚动按钮</el-button>
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
        }
      ],
      groupType:'group',
      forceShow:false
    }
  }
}
</script>
```