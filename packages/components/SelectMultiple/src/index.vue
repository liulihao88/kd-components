<!--
 * @description: 下拉多选
 * @author: huruirui@keendata.com
 !-->
<template>
  <el-select
    v-model="checkValue"
    v-bind="$attrs"
    multiple
    popper-class="need-table-checkbox"
    v-on="$listeners"
  >
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
  name: "KjSelectMultiple",
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    options:{
      type: Array,
      default() {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
        }
      }
    },
    isObject: {
      type: Boolean, // 绑定value为json格式时为true,默认false
      default: false
    }
  },
  computed: {
    checkValue: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v);
      }
    }
  }
};
</script>

<style lang="scss">

.need-table-checkbox.is-multiple .el-select-dropdown__item {
  &.selected::after {
    left: 21px;
    z-index: 10;
    width: 16px;
    height: 16px;
    background: #365edf;
    border: 1px solid #365edf;
    border-radius: 2px;
    color: #ffffff;
    top: 50%;
    transform: translateY(-50%);
    line-height: 14px;
    text-align: center;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  &.selected .el-checkbox__label {
    color: #365edf;
  }
  &.hover {
    background-color: #f5f7fd;
    border-radius: 1px;
  }
}
</style>
