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
      type: Array,
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
    const end = new Date();
    return {
      pickerOptions: {
        // 时间选择器时间段
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay);
              const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1);
              picker.$emit('pick', [start, yesEnd]);
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay * 6);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '本月',
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).setDate(1));
              picker.$emit('pick', [start, new Date()]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - oneDay * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
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
          let res = Object.assign(this.pickerOptions, {
            disabledDate: this.disabledDate,
          });
          return res;
        }
        return this.pickerOptions;
      }
    },
    rangeVal: {
      get() {
        if (this.value && this.value.length) {
          return this.value;
        } else {
          return '';
        }
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
  methods: {
    dateChange(v) {
      this.$emit('input', v);
    },
    disabledDate(date) {
      const newDate = new Date().getTime();
      const checkDate = new Date(date).getTime();
      if (checkDate < newDate) {
        return false;
      }
      return true;
    },
  },
};
</script>
