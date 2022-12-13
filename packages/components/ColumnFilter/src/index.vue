<template>
  <el-table-column v-bind="manageAttrs" :filters="$attrs.filters || colFilters" v-on="$listeners">
    <template slot-scope="scope">
      <slot v-bind="scope">
        <span
          :class="{ 'kd-column-filter__text': !noStatus }"
          :style="mergeStyles[scope.row[propLabel.prop]] || ''"
          @click="onClick(scope)"
        >
          {{ formatText(scope) }}
        </span>
      </slot>
    </template>
    <slot slot="header" slot-scope="scope" name="header" v-bind="scope">{{ scope.column.label }}</slot>
  </el-table-column>
</template>

<script>
import { assign, isEmpty } from 'lodash';

export default {
  name: 'KdColumnFilter',
  props: {
    // 两个默认属性：prop,label合并为一个字符串
    pL: {
      type: String,
      default: '',
    },
    // 是否以状态展示
    noStatus: {
      type: Boolean,
      default: false,
    },
    noFilter: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {
        return {
          true: {
            text: '是', // filters的text，也可作为formatter转换
            color: '#365edf', // 状态列的文字颜色，noStatus=true时可不填
            bg: '#eaeefb', // 状态列的文字背景颜色
          },
          false: {
            text: '否', // filters的text，也可作为formatter转换
            color: '#e94c35', // 状态列的文字颜色
            bg: '#fdecea', // 状态列的文字背景颜色
          },
        };
      },
    },
    formatter: {
      type: [Function, Object, Boolean],
      default: true,
    },
    // 默认show-overflow-tooltip为true，如果不需要，设置noTip为true
    noTip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colFilters: null,
      mergeStyles: {},
      defaultFormatter: {},
    };
  },
  computed: {
    propLabel() {
      let obj = {
        prop: '',
        label: '',
      };
      if (this.pL) {
        let arr = this.pL.split(',');
        if (arr[0]) obj.prop = arr[0];
        if (arr[1]) obj.label = arr[1];
      }
      if (this.$attrs.prop) obj.prop = this.$attrs.prop;
      if (this.$attrs.label) obj.label = this.$attrs.label;
      return obj;
    },
    // 列筛选时必要参数
    colKey() {
      return this.$attrs['column-key'] ? this.$attrs['column-key'] : this.propLabel.prop;
    },
    // 合并为最终的绑定值对象
    manageAttrs() {
      return assign({}, this.$attrs, {
        ...this.propLabel,
        'column-key': this.colKey,
        'show-overflow-tooltip': !this.noTip,
        'min-width': this.$attrs['min-width'] || 100,
        width: this.$attrs.width || 'auto',
      });
    },
  },
  watch: {
    config: {
      handler(val) {
        const showStatus = !this.noStatus,
          showFilter = !this.noFilter,
          noFormat = this.formatter === false;
        let filters = [],
          styles = {},
          formatter = {};

        if (!isEmpty(val)) {
          Object.keys(val).forEach((key) => {
            const value = val[key];
            if (showStatus) {
              styles[key] = {
                color: value.color,
                background: value.bg,
              };
              showFilter &&
                filters.push({
                  text: noFormat ? key : value.text || value.label,
                  value: key,
                });
              formatter[key] = value.text || value.label;
            } else {
              if (showFilter) {
                if (typeof value !== 'object') {
                  filters.push({
                    text: noFormat ? key : value,
                    value: key,
                  });
                  formatter[key] = value;
                } else {
                  filters.push({
                    text: noFormat ? key : value.text || value.label,
                    value: key,
                  });
                  formatter[key] = value.text || value.label;
                }
              }
            }
          });
        }
        this.defaultFormatter = formatter;
        this.colFilters = filters.length === 0 ? null : filters;
        this.mergeStyles = styles;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onClick(scope) {
      if (this.$listeners.click) {
        this.$emit('click', scope);
      }
    },
    // 显示内容转换：如果有formatter转换，否则使用filters（columnFilters）转换
    formatText(scope) {
      const value = scope.row[this.propLabel.prop];
      // 默认情况下，显示内容就是原始内容
      let cellValue = value;
      if (typeof this.formatter === 'boolean') {
        if (this.formatter === true) {
          cellValue = this.defaultFormatter[value];
        }
      } else if (typeof this.formatter === 'function') {
        // 如果设置了formatter属性
        // 改写formatter方法参数，第一个值为cellValue当前值
        cellValue = this.formatter(value, scope);
      } else if (typeof this.formatter === 'object') {
        if (!isEmpty(this.formatter)) {
          cellValue = this.formatter[value];
        }
      }
      return cellValue;
    },
  },
};
</script>
