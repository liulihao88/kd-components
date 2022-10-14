```vue
<template>
  <kd-row-select-multiple
      v-model="value1"
      :options="tagData"
      active-text-color="blue"
      active-bg-color="yellow"
      hover-bg-color="red"
      hover-text-color="blue"
      :line-height="40"
      item-width="20"
      item-max-width="50"
  >
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
      tagData: arr
    }
  }
}
</script>
```