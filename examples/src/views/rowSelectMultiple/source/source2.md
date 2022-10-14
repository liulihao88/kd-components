```vue
<template>
  <kd-row-select-multiple v-model="value1" :options="tagData" :duration="300" :default-lines="2">
  </kd-row-select-multiple>
</template>

<script>
let arr = []
for (let i = 0; i < 20; i++) {
  arr.push({ label: 'item' + i, value: i + '' })
}
export default {
  data() {
    return {
      value1: ['2', '4'],
      tagData: arr,
    }
  }
}
</script>
```