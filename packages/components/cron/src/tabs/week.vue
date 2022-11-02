<template>
  <div class="config-list">
    <el-radio-group v-model="type">
      <div class="item">
        <el-radio label="TYPE_NOT_SET" class="choice" :disabled="disableChoice"> 不设置 </el-radio>
        <span class="tip-info">日和周只能设置其中之一</span>
      </div>
      <div class="item">
        <el-radio label="TYPE_RANGE" class="choice" :disabled="disableChoice"> 区间 </el-radio>
        从<el-select v-model="valueRange.start" class="w80" :disabled="type != TYPE_RANGE || disableChoice">
          <el-option v-for="(v, k) of WEEK_MAP" :key="`week-pre-Lf13-${v}`" :value="v">
            {{ k }}
          </el-option>
        </el-select>
        至<el-select v-model="valueRange.end" class="w80" :disabled="type != TYPE_RANGE || disableChoice">
          <el-option v-for="(v, k) of WEEK_MAP" :key="`week-next-1fas-${v}`" :value="v">
            {{ k }}
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-radio label="TYPE_LOOP" class="choice" :disabled="disableChoice"> 循环 </el-radio>
        从<el-select v-model="valueLoop.start" class="w80" :disabled="type != TYPE_LOOP || disableChoice">
          <el-option v-for="(v, k) of WEEK_MAP" :key="`week-pre-Lf13-${v}`" :value="v">
            {{ k }}
          </el-option> </el-select
        >开始，间隔
        <el-input
          v-model="valueLoop.interval"
          :disabled="type != TYPE_LOOP || disableChoice"
          :max="maxValue"
          :min="minValue"
          :precision="0"
          class="w60"
        ></el-input>
        天
      </div>
      <div class="item">
        <el-radio label="TYPE_SPECIFY" class="choice" :disabled="disableChoice"> 指定 </el-radio>
        <div class="list">
          <el-checkbox-group v-model="valueList">
            <el-checkbox
              v-for="(v, k) of WEEK_MAP"
              :key="`key-${v}`"
              class="list-check-item"
              :label="`${v}`"
              :disabled="type != TYPE_SPECIFY || disableChoice"
            >
              <span>{{ k }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </el-radio-group>
  </div>
</template>

<script>
import mixin from './mixin';
import { WEEK_MAP_EN, replaceWeekName } from './const.js';

const WEEK_MAP = {
  周日: 0,
  周一: 1,
  周二: 2,
  周三: 3,
  周四: 4,
  周五: 5,
  周六: 6,
};

export default {
  name: 'Week',
  mixins: [mixin],
  props: {
    day: {
      type: String,
      default: '*',
    },
  },
  data() {
    return {
      WEEK_MAP,
      WEEK_MAP_EN,
    };
  },
  computed: {
    disableChoice() {
      return (this.day && this.day !== '?') || this.disabled;
    },
  },
  watch: {
    value_c() {
      // 如果设置日，那么星期就直接不设置
      this.updateValue();
    },
    day() {
      // console.info('new day: ' + newVal)
      this.updateValue();
    },
  },
  created() {
    this.DEFAULT_VALUE = '*';
    // 0,7表示周日 1表示周一
    this.minValue = 0;
    this.maxValue = 6;
    this.valueRange.start = 0;
    this.valueRange.end = 6;
    this.valueLoop.start = 2;
    this.valueLoop.interval = 1;
    this.parseProp(this.prop);
  },
  methods: {
    updateValue() {
      this.$emit('change', this.disableChoice ? '?' : this.value_c);
    },
    preProcessProp(c) {
      return replaceWeekName(c);
    },
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

.tip-info {
  color: #999;
}

.choice {
  border: 1px solid transparent;
  padding: 5px 8px;
}

.choice:hover {
  border: 1px solid var(--primary-color);
}

.w80 {
  width: 80px;
}

.el-input,
.el-select {
  margin-left: 5px;
  width: 80px !important;
  margin-right: 5px;
}
::v-deep .el-select {
  .el-input {
    width: 80px !important;
  }
}

.list {
  margin-left: 16px;
  .list-check-item {
    padding: 1px 3px;
    width: 4em;
  }
}

.el-radio-group {
  font-size: 10px;
}
</style>
