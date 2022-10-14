```vue
<template>
  <kd-row-select-multiple
      v-model="value1"
      :options="tagData"
      fold-text="打开"
      unfold-text="收起"
      icon-position="right"
      :btn-styles="labelStyles"
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
      tagData: arr,
      labelStyles:{
        background:"#eee",
        color:'red',
        fontSize:"10px",
      },
    }
  }
}
</script>
```