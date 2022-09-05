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
