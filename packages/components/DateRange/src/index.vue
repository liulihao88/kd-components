<template>
  <div class="kd-daterange">
    <div>
      <span
        v-if="title"
        class="title"
      >{{ title }}</span>
      <el-date-picker
        v-model="rangeVal"
        :size="$attrs.size || 'small'"
        :default-time="['00:00:00', '23:59:59']"
        v-bind="$attrs"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        :start-placeholder="$attrs.disabled ? '' : ($attrs['start-placeholder'] || '请选择日期')"
        :end-placeholder="$attrs.disabled ? '' : ($attrs['end-placeholder'] || '请选择日期')"
        :picker-options="pickerOptions"
        v-on="$listeners"
        @change="dateChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "KdDateRange",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    const oneDay = 3600 * 1000 * 24
    const end = new Date();
    return {
      pickerOptions: {
        // 时间选择器时间段
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay);
              const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1);
              picker.$emit("pick", [start, yesEnd]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay * 6);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "本月",
            onClick(picker) {
              const start = new Date(new Date(new Date().toLocaleDateString()).setDate(1))
              picker.$emit("pick", [start, new Date()]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - oneDay * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - oneDay * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    rangeVal: {
      get() {
        if (this.value && this.value.length) {
          return this.value;
        } else {
          return '';
        }
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  mounted() {
    console.log(this.$attrs)
  },
  methods: {
    dateChange(v) {
      this.$emit("input", v);
    }
  }
};
</script>
