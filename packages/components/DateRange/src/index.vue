<template>
  <div class="kd-daterange" :style="{ ...mHandleWidth() }">
    <span v-if="title" class="left_box">{{ title }}</span>
    <el-date-picker
      v-model="rangeVal"
      class="right_box"
      :size="$attrs.size || 'small'"
      :default-time="$attrs['default-time'] || ['00:00:00', '23:59:59']"
      type="datetimerange"
      :value-format="$attrs['default-time'] || 'yyyy-MM-dd HH:mm:ss'"
      :start-placeholder="$attrs.disabled ? '' : $attrs['start-placeholder'] || '请选择日期'"
      :end-placeholder="$attrs.disabled ? '' : $attrs['end-placeholder'] || '请选择日期'"
      :picker-options="mergePickerOptions"
      v-bind="$attrs"
      v-on="$listeners"
      @change="dateChange"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'KdDateRange',
  props: {
    value: {
      type: [Array, Object],
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    // 只能选择现在现在以前的时间
    futureDisabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    const oneDay = 3600 * 1000 * 24;
    return {
      pickerOptions: {
        // 时间选择器时间段
        shortcuts: [
          {
            // 0点至23:59:59
            text: '今天',
            onClick(picker) {
              const startTimestamp = new Date(new Date().toLocaleDateString()).getTime();
              picker.$emit('pick', [new Date(startTimestamp), new Date(startTimestamp + oneDay - 1)]);
            },
          },
          {
            // 0点至23:59:59
            text: '昨天',
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay);
              const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1);
              picker.$emit('pick', [start, yesEnd]);
            },
          },
          {
            // 当前时间前推7天
            text: '最近一周',
            onClick(picker) {
              // 今天的0点时间戳
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - oneDay * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            // 本月起始时间-本月结束
            text: '本月',
            onClick(picker) {
              const nowTemp = new Date().getTime(); // 当前时间戳-1673325323605
              const nextMonth = nowTemp + oneDay * 32; // 保证是下个月1676090190150
              const end = new Date(new Date(new Date(nextMonth).toLocaleDateString()).setDate(1) - 1);
              const start = new Date(new Date(new Date().toLocaleDateString()).setDate(1));
              picker.$emit('pick', [start, end]);
            },
          },
          {
            // 当前时间前推30天
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - oneDay * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            // 当前时间前推90天
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - oneDay * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  computed: {
    // pickerOptions有多个参数. 如果传递了这个参数, 合并现有的属性.
    mergePickerOptions() {
      if (this.$attrs['picker-options']) {
        return Object.assign(this.pickerOptions, this.$attrs['picker-options']);
      } else {
        // 如果futureDisabled为true, 不能选择将来的日期
        if (this.futureDisabled) {
          return Object.assign(this.pickerOptions, {
            disabledDate: this.disabledDate,
          });
        }
        return this.pickerOptions;
      }
    },
    rangeVal: {
      get() {
        if (this.value && this.value.length) {
          return this.value;
        } else {
          return [];
        }
      },
      set(v) {
        this.$emit('input', v || []);
      },
    },
  },
  methods: {
    dateChange(v) {
      this.$emit('input', v || []);
    },
    disabledDate(date) {
      const newDate = new Date().getTime();
      const checkDate = new Date(date).getTime();
      return checkDate >= newDate;
    },
  },
};
</script>
