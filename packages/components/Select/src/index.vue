<template>
  <div class="kd-select" :style="{ ...mHandleWidth() }">
    <div v-if="title" class="left_box">
      {{ title }}
    </div>
    <el-select
      v-loading="loading"
      :class="options.length === 0 && 'tip_empty'"
      class="right_box"
      :filterable="$attrs.filterable !== false"
      :placeholder="handlePlaceholder()"
      popper-class="kd-custom-multiple-checkbox"
      :clearable="$attrs.clearable !== false"
      v-bind="$attrs"
      v-on="$listeners"
      @change="changeHandler"
    >
      <el-option
        v-for="item in options"
        :key="type === 'simple' ? item : handleValue(item)"
        :label="type === 'simple' ? item : handleLabel(item)"
        :value="type === 'simple' ? item : handleValue(item)"
        :disabled="optionDisabled(item)"
      >
        <el-checkbox v-if="$attrs.multiple === true || $attrs.multiple === ''" @click.prevent.native>
          {{ handleLabel(item) }}
        </el-checkbox>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'KdSelect',
  components: {},
  props: {
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: '',
          label: '',
        };
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'label',
    },
    val: {
      type: String,
      default: 'value',
    },
    options: {
      type: Array,
      default: () => [],
    },
    // 是简单的options 还是复杂options。默认复杂
    type: {
      type: String,
      default: '', // 简单选项'simple'
    },
    title: {
      type: String,
      default: '',
    },
    // 如果label显示多个参数的连接符
    connect: {
      type: String,
      default: '/',
    },
    // 自定义label显示多个参数的函数
    customLabel: {
      type: [Function, String],
      default: '',
    },
    width: {
      type: [String, Number],
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
    // placeholder在disabled的情况下是不显示的. 如果想要在这种情况下显示placeholder, 那么就用这个属性
    disPlaceholder: {
      type: String,
      default: '',
    },
    optionDisabled: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      sLabel: this.defaultProps.label || this.label,
      sValue: this.defaultProps.value || this.val,
    };
  },
  watch: {
    defaultProps: {
      deep: true,
      handler(val) {
        this.sLabel = this.defaultProps.label || this.label;
        this.sValue = this.defaultProps.value || this.val;
      },
    },
    val(val) {
      this.sValue = this.defaultProps.value || this.val;
    },
    label(val) {
      this.sLabel = this.defaultProps.label || this.label;
    },
  },
  methods: {
    handlePlaceholder() {
      const { $attrs } = this;
      let res = $attrs.disabled ? this.disPlaceholder : $attrs.placeholder || '请输入';
      return res;
    },
    // 将label作为多个值连接起来。 比如 admin/管理员, 这是两个属性拼接出来的
    handleLabel(item) {
      // 如果customLabel是函数就执行customLabel的函数去处理label显示
      if (typeof this.customLabel === 'function') {
        return this.customLabel(item);
      } else {
        // 如果label是数组, 就拼接数组。
        if (Array.isArray(this.sLabel)) {
          let str = '';
          this.sLabel.forEach((v) => {
            str += item[v] + this.connect;
          });
          let res = str.slice(0, -1);
          return res;
        } else {
          // 直接显示label
          return item[this.sLabel];
        }
      }
    },
    // 处理value的值
    handleValue(item) {
      return item[this.sValue];
    },
    // 处理多选的返回情况
    changeMulty(arr) {
      let selectLabel = [];
      const selectObj = this.options.filter((v) => {
        if (arr.includes(v[this.sValue])) {
          selectLabel.push(v[this.sLabel]);
          return true;
        } else {
          return false;
        }
      });
      this.$emit('changeSelect', [arr, selectObj, selectLabel]);
    },
    // 有些场景， 下拉框不仅需要获取value, 还需要获取选择的对象或者label, el-select原生没有这个属性， 所以changeHandler就做了下处理， 返回的数组包含3个属性， 第一个value, 第二个选中对象， 第三个选中的label。
    changeHandler(item) {
      // 如果val是数组, 证明是多选
      if (Array.isArray(item)) {
        this.changeMulty(item);
        return;
      }
      if (!item) {
        this.$emit('changeSelect', []);
        return;
      }
      let selectObj = this.options.filter((v) => {
        if (this.type === 'simple') {
          return v === item;
        } else {
          return v[this.sValue] === item;
        }
      })[0];
      let selectLabel = selectObj[this.sLabel];

      this.$emit('changeSelect', [item, selectObj, selectLabel]);
    },
  },
};
</script>
