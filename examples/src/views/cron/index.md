``` 
<template>
  <kd-cron
      v-model="cronExpression"
      exe-start-time=""
      :hide-year="false"
      :hide-second="false"
      placeholder="请输入cron表达式"
  />
</template>

<script >
export default {
  data() {
    return {
      cronExpression: ''
    }
  }
}
</script>

 ```

### 组件接收参数
参数 |    说明    |   类型    | 默认值
:---:|:--------:|:-------:|:---:
v-model|  cron的值  | string  |无
width| dialog宽度 | String  |780px
disabled|    禁用    | Boolean |false
placeholder|   站位符    | String  |请输入cron表达式

