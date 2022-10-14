```vue
<template>
  <kd-row-select-multiple
      ref="rowSelectMultiple"
      v-model="value1"
      :options="tagData"
  >
  </kd-row-select-multiple>
  
  <el-button @click="triggerSelect">展开/折叠</el-button>
  <el-button @click="triggerSelect('open')">展开</el-button>
  <el-button @click="triggerSelect('close')">折叠</el-button>
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
  },
  methods: {
    triggerSelect(type){
      this.$refs.rowSelectMultiple.trigger(type)
    }
  }
}
</script>
```