<template>
  <div class="config-list">
    <!-- {{this.type+'niam '}} -->
    <el-radio-group
      v-model="type"
      @change="onTypechange"
    >
      <div class="item">
        <el-radio
          label="TYPE_EVERY"
          class="choice"
          :disabled="disabled"
        >
          每年
        </el-radio>
      </div>
      <div class="item">
        <el-radio
          label="TYPE_RANGE"
          class="choice"
          :disabled="disabled"
        >
          区间
        </el-radio>
        从<el-input
          v-model="valueRange.start"
          :disabled="type!=TYPE_RANGE || disabled"
          :min="0"
          :precision="0"
          class="w100"
          size="small"
        />年
        至<el-input
          v-model="valueRange.end"
          :disabled="type!=TYPE_RANGE || disabled"
          :min="1"
          :precision="0"
          class="w100"
          size="small"
        />年
      </div>
      <div class="item">
        <el-radio
          label="TYPE_LOOP"
          class="choice"
          :disabled="disabled"
        >
          循环
        </el-radio>
        从<el-input
          v-model="valueLoop.start"
          :disabled="type!=TYPE_LOOP || disabled"
          :min="0"
          :precision="0"
          class="w100"
          size="small"
        />年开始，间隔
        <el-input
          v-model="valueLoop.interval"
          :disabled="type!=TYPE_LOOP || disabled"
          :min="1"
          :precision="0"
          class="w100"
          size="small"
        />年
      </div>
    </el-radio-group>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'Year',
  mixins: [mixin],
  data () {
    return {}
  },
  watch: {
    value_c (newVal) {
      // console.info('change:' + newVal)
      this.$emit('change', newVal)
    }
  },
  created () {
    const nowYear = (new Date()).getFullYear()
    this.DEFAULT_VALUE = '*'
    this.minValue = 0
    this.maxValue = 0
    this.valueRange.start = nowYear
    this.valueRange.end = nowYear + 100
    this.valueLoop.start = nowYear
    this.valueLoop.interval = 1
    // console.info('created')
    this.parseProp(this.prop)
  },
  methods:{
   
  }
}
</script>

<style lang="scss" scoped>

.config-list {
  text-align: left;
  margin: 0 10px 0 5px;
}

.item {
    margin-top: 5px;
    &:first-of-type {
         margin-top: 0;
     }
}

.choice {
  border: 1px solid transparent;
  padding: 5px 8px;
}

.choice:hover {
  border: 1px solid var(--primary-color);
}

.w60 {
  width: 60px;
}

.el-input {
  margin-left: 5px;
  width: 80px !important;
  margin-right: 5px;
}

.list {
    margin-left: 16px;
    .list-check-item {
        padding: 1px 3px;
        width: 4em;
    }
    .el-checkbox {
        margin-right: 16px;
    }
}
.el-radio-group {
  font-size: 10px;
}
</style>
