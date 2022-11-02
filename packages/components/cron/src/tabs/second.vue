<template>
  <div class="config-list">
    <el-radio-group v-model="type">
      <div class="item">
        <el-radio label="TYPE_EVERY" class="choice" :disabled="disabled"> 每秒 </el-radio>
      </div>
      <div class="item">
        <el-radio label="TYPE_RANGE" class="choice" :disabled="disabled"> 区间 </el-radio>
        从<el-input
          v-model="valueRange.start"
          :disabled="type != TYPE_RANGE || disabled"
          :max="maxValue"
          :min="minValue"
          :precision="0"
          class="w60"
        ></el-input
        >秒 至<el-input
          v-model="valueRange.end"
          :disabled="type != TYPE_RANGE || disabled"
          :max="maxValue"
          :min="minValue"
          :precision="0"
          class="w60"
        ></el-input
        >秒
      </div>
      <div class="item">
        <el-radio label="TYPE_LOOP" class="choice" :disabled="disabled"> 循环 </el-radio>
        从<el-input
          v-model="valueLoop.start"
          :disabled="type != TYPE_LOOP || disabled"
          :max="maxValue"
          :min="minValue"
          :precision="0"
          class="w60"
        ></el-input
        >秒开始，间隔
        <el-input
          v-model="valueLoop.interval"
          :disabled="type != TYPE_LOOP || disabled"
          :max="maxValue"
          :min="minValue"
          :precision="0"
          class="w60"
        ></el-input
        >秒
      </div>
      <div class="item">
        <el-radio label="TYPE_SPECIFY" class="choice" :disabled="disabled"> 指定 </el-radio>
        <div class="list">
          <el-checkbox-group v-model="valueList">
            <el-checkbox
              v-for="i in maxValue + 1"
              :key="`key-${i - 1}`"
              class="list-check-item"
              :label="i - 1"
              :disabled="type != TYPE_SPECIFY || disabled"
            >
              {{ i - 1 }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </el-radio-group>
  </div>
</template>

<script>
import mixin from './mixin';

export default {
  name: 'Second',
  mixins: [mixin],
  data() {
    return {};
  },
  watch: {
    value_c(newVal) {
      this.$emit('change', newVal);
    },
  },
  created() {
    this.DEFAULT_VALUE = '*';
    this.minValue = 0;
    this.maxValue = 59;
    this.valueRange.start = 0;
    this.valueRange.end = 59;
    this.valueLoop.start = 0;
    this.valueLoop.interval = 1;
    // console.info('created')
    this.parseProp(this.prop);
  },
};
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
  width: 60px !important;
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
