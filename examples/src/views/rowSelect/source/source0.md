```vue
<template>
  <el-row>
    <el-col :span="12">
      <div class="example-wrap">
        <kd-row-select v-model="value1" :options="tagData"></kd-row-select>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="example-wrap">
        <kd-row-select v-model="value2" :options="tagData" single></kd-row-select>
      </div>
    </el-col>
  </el-row>
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
      value2: '3',
      tagData: arr,
    }
  }
}
</script>
```