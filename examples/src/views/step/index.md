属性 | 说明
--- | :---
active |  当前被选中的step
steps | Array<name> [{name: "step1"},{name: "step2"}]

``` 

<template>
  <kd-step :active="1" :steps="steps"></kd-step>
</template>

<script>
export default {
  name: "testStep",
  data() {
    return {
      steps: [
        { name: "同步配置" },
        { name: "读取配置" },
        { name: "任务设置" },
      ]
    }
  }
}
</script>



 ```
