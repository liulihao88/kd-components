<template>
  <div class="cron-container content">
    <div class="left">
      <el-tabs
        v-model="curtab"
        size="small"
      >
        <el-tab-pane
          v-if="!hideYear && !hideSecond"
          label="年"
          name="year"
        >
          <year-ui
            v-model="year"
            :disabled="disabled"
          />
        </el-tab-pane>
        <el-tab-pane
          label="月"
          name="month"
        >
          <month-ui
            v-model="month"
            :disabled="disabled"
          />
        </el-tab-pane>
        <el-tab-pane
          label="日"
          name="day"
        >
          <day-ui
            v-model="day"
            :week="week"
            :disabled="disabled"
          />
        </el-tab-pane>
        <el-tab-pane
          label="时"
          name="hour"
        >
          <hour-ui
            v-model="hour"
            :disabled="disabled"
          />
        </el-tab-pane>
        <el-tab-pane
          label="分"
          name="minute"
        >
          <minute-ui
            v-model="minute"
            :disabled="disabled"
          />
        </el-tab-pane>
        <el-tab-pane
          v-if="!hideSecond"
          label="秒"
          name="second"
        >
          <second-ui
            v-model="second"
            :disabled="disabled"
          />
        </el-tab-pane>
        <el-tab-pane
          label="周"
          name="week"
        >
          <week-ui
            v-model="week"
            :day="day"
            :disabled="disabled"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <div class="field-list">
        <table class="ftable">
          <tr
            v-for="item in tableData"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>
      </div>
      <div class="exe-pre">
        <div class="exe-pre-panel">
          <label class="p-left">执行时间</label>
          <el-date-picker
            v-model="startTime"
            type="datetime"
            class="p-right"
            placeholder="选择执行开始时间"
          />
        </div>
        <div class="exe-pre-panel">
          <label style="margin-right: 10px;">
            <el-tooltip
              content="执行预览解析不含年参数"
              class="p-left"
            >
              <span>执行预览</span>
            </el-tooltip>
          </label>
          <el-input
            type="textarea"
            :value="preTimeList"
            class="p-right"
            :rows="4"
            readonly
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SecondUi from './tabs/second.vue'
import MinuteUi from './tabs/minute.vue'
import HourUi from './tabs/hour.vue'
import DayUi from './tabs/day.vue'
import WeekUi from './tabs/week.vue'
import MonthUi from './tabs/month.vue'
import YearUi from './tabs/year.vue'
import CronParser from 'cron-parser'
import dateFormat from './format-date'
import { debounce } from '../../../utils/gFunc'

export default {
  name: 'EasyCron',
  components: {
    SecondUi,
    MinuteUi,
    HourUi,
    DayUi,
    WeekUi,
    MonthUi,
    YearUi
  },
  model: {
    prop: 'cronValue',
    event: 'change'
  },
  props: {
    cronValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    exeStartTime: {
      type: [Number, String, Object],
      default: 0
    },
    hideSecond: {
      type: Boolean,
      default: false
    },
    hideYear: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      curtab: this.hideYear ? 'month' : 'year',
      second: '*',
      minute: '*',
      hour: '*',
      day: '*',
      month: '*',
      week: '?',
      year: '*',
      startTime: new Date(),
      preTimeList: '执行预览，会忽略年份参数'
    }
  },
  computed: {
    tableData () {
      let c = this.hideSecond ? [] : [{ name: '秒', value: this.second }]
      c = c.concat([
        { name: '分', value: this.minute },
        { name: '时', value: this.hour },
        { name: '日', value: this.day },
        { name: '月', value: this.month },
        { name: '周', value: this.week }
      ])
      return (this.hideSecond || this.hideYear) ? c.concat({ name: '表达式', value: this.cronValue_c })
        : c.concat(
          { name: '年', value: this.year },
          { name: '表达式', value: this.cronValue_c },
          // { name: '表达式(不含年)', value: this.cronValue_c2 }
        )
    },
    cronValue_c () {
      let result = []
      if (!this.hideSecond) result.push(this.second ? this.second : '*')
      result.push(this.minute ? this.minute : '*')
      result.push(this.hour ? this.hour : '*')
      result.push(this.day ? this.day : '*')
      result.push(this.month ? this.month : '*')
      result.push(this.week ? this.week : '?')
      if (!this.hideYear && !this.hideSecond) result.push(this.year ? this.year : '*')
      return result.join(' ')
    },
    cronValue_c2 () {
      const v = this.cronValue_c
      if (this.hideYear || this.hideSecond) return v
      const vs = v.split(' ')
      return vs.slice(0, vs.length - 1).join(' ')
    }
  },
  watch: {
    cronValue (newVal) {
      if (newVal === this.cronValue_c) {
        // console.info('same cron value: ' + newVal)
        return
      }
      this.formatValue()
    },
    cronValue_c (newVal) {
      this.calTriggerList()
      this.$emit('change', newVal)
    },
    exeStartTime () {
      this.calStartTime()
    },
    startTime () {
      this.calTriggerList()
    }
  },
  created () {
    this.formatValue()
    this.calStartTime()
    this.$nextTick(() => {
      this.calTriggerListInner()
    })
  },
  methods: {
    formatValue () {
      // console.info(this.cronValue)
      if (!this.cronValue) return
      const values = this.cronValue.split(' ').filter(item => !!item)
      if (!values || values.length <= 0) return
      let i = 0
      if (!this.hideSecond) this.second = values[i++]
      if (values.length > i) this.minute = values[i++]
      if (values.length > i) this.hour = values[i++]
      if (values.length > i) this.day = values[i++]
      if (values.length > i) this.month = values[i++]
      if (values.length > i) this.week = values[i++]
      if (values.length > i) this.year = values[i]
    },
    calTriggerList() {
      debounce(this.calTriggerListInner(), 500)
    },
    calTriggerListInner () {
      // 设置了回调函数
      if (this.remote) {
        this.remote(this.cronValue_c2, +this.startTime, v => { this.preTimeList = v })
        return
      }
      // 去掉年份参数
      const e = this.cronValue_c2
      const format = 'yyyy-MM-dd hh:mm:ss'
      const options = {
        currentDate: dateFormat(this.startTime, format)
      }
      // console.info(options)
      const iter = CronParser.parseExpression(e, options)
      const result = []
      for (let i = 0; i < 5; i++) {
        result.push(dateFormat(new Date(iter.next()), format))
      }
      this.preTimeList = result.length > 0 ? result.join('\n') : '无执行时间'
    },
    calStartTime () {
      if (!this.exeStartTime) {
        this.startTime = new Date()
        return
      }
      try {
        this.startTime = new Date(this.exeStartTime)
      } catch (e) {
        this.startTime = new Date()
      }
    }
  }
}
</script>

