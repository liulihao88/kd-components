<!--
 * @description: 下拉多选
 !-->
<template>
  <el-select v-model="checkValue" v-bind="$attrs" multiple popper-class="need-table-checkbox" v-on="$listeners">
    <el-option
      v-for="item in options"
      :key="item[defaultProps.value]"
      :label="item[defaultProps.label]"
      :value="isObject ? item : item[defaultProps.value]"
    >
      <el-checkbox @click.prevent.native>
        {{ item[defaultProps.label] }}
      </el-checkbox>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'KdSelectMultiple',
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
        };
      },
    },
    isObject: {
      type: Boolean, // 绑定value为json格式时为true,默认false
      default: false,
    },
  },
  computed: {
    checkValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
};
</script>
