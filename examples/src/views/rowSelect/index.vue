<template>
  <div class="wrap">
    <h4>多选模式</h4>
    <kd-row-select
      ref="rowSelect1"
      v-model="value1"
      class="m-b-24"
      label-text="必选"
      separator=":"
      :options="tagData"
      :line-height="40"
    >
    </kd-row-select>
    <kd-row-select
      ref="rowSelect2"
      v-model="value2"
      class="m-b-24"
      label-text="非必选"
      :options="tagData"
      :required="false"
      :line-height="40"
    >
    </kd-row-select>
    <div class="btns">
      <el-button @click="selectArr('$all')">set('$all')</el-button>
      <el-button @click="selectArr(['0', '7'])">set(['0','7'])</el-button>
      <el-button @click="addArr(['6'])">add(['6'])</el-button>
      <el-button @click="reduceArr(['0', '6', '7'])"
        >reduce(['0','6','7'])</el-button
      >
    </div>

    <h4>单选模式</h4>
    <kd-row-select
      v-model="value3"
      ref="rowSelect3"
      class="m-b-24"
      label-text="必选"
      :options="tagData"
      :multiple="false"
      :line-height="40"
    >
    </kd-row-select>
    <kd-row-select
      v-model="value4"
      ref="rowSelect4"
      class="m-b-24"
      label-text="非必选"
      :options="tagData"
      :multiple="false"
      :required="false"
      :duration="1000"
      :line-height="40"
    >
    </kd-row-select>
    <div class="btns">
      <el-button @click="trigger">切换状态trigger()</el-button>
      <el-button @click="trigger('open')">打开trigger('open')</el-button>
      <el-button @click="trigger('close')">关闭trigger('close')</el-button>
      <el-button @click="add('8')">add('8')</el-button>
      <el-button @click="reduce('8')">reduce('8')</el-button>
    </div>
  </div>
</template>

<script>
  let arr = []
  for (let i = 0; i < 20; i++) {
    arr.push({ label: 'item' + i, value: i + '' })
  }
  export default {
    name: 'Index',
    data() {
      return {
        value1: ['2', '4'],
        value2: [],
        value3: '',
        value4: '',
        tagData: arr,
      }
    },
    methods: {
      selectArr(keys) {
        this.$refs.rowSelect1.set(keys)
        this.$refs.rowSelect2.set(keys)
      },
      addArr(keys) {
        this.$refs.rowSelect1.add(keys)
        this.$refs.rowSelect2.add(keys)
      },
      reduceArr(keys) {
        this.$refs.rowSelect1.reduce(keys)
        this.$refs.rowSelect2.reduce(keys)
      },
      trigger(type) {
        this.$refs.rowSelect3.trigger(type)
        this.$refs.rowSelect4.trigger(type)
      },
      add(key) {
        this.$refs.rowSelect3.add(key)
        this.$refs.rowSelect4.add(key)
      },
      reduce(key) {
        this.$refs.rowSelect3.reduce(key)
        this.$refs.rowSelect4.reduce(key)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .part {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }
  .btns {
    display: flex;
  }
</style>
