<template>
  <el-table-column v-bind="manageAttrs" v-on="$listeners">
    <template slot-scope="scope">
      <slot :scope="scope" :value="scope.row[propLabel.prop]" :format-value="formatText(scope)">
        <el-tooltip :disabled="!customTip" v-bind="{ ...customTooltipAttrs(scope) }">
          <slot
            slot="content"
            name="tip-content"
            :scope="scope"
            :value="scope.row[propLabel.prop]"
            :format-value="formatText(scope)"
            >{{ formatText(scope) }}</slot
          >
          <span
            :class="{ 'kd-column-text__link': isLink }"
            :style="getTextStyles(scope)"
            @click="onClick(scope, $event)"
          >
            {{ formatText(scope) }}
          </span>
        </el-tooltip>
      </slot>
    </template>
    <slot slot="header" slot-scope="scope" name="header" v-bind="scope">{{ scope.column.label }}</slot>
  </el-table-column>
</template>

<script>
import { assign, isEmpty } from 'lodash';

export default {
  name: 'KdColumnText',
  props: {
    // 两个默认属性：prop,label合并为一个字符串
    pL: {
      type: String,
      default: '',
    },
    // 是否以link-链接展示，
    isLink: {
      type: Boolean,
      default: false,
    },
    formatter: {
      type: [Function, Object],
      default: null,
    },
    textStyles: {
      type: [Function, Object, String],
      default: null,
    },
    // 默认show-overflow-tooltip为true，如果不需要，设置noTip为true
    defaultTip: {
      type: Boolean,
      default: true,
    },
    customTip: {
      type: Boolean,
      default: false,
    },
    tipConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
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

    // 合并为最终的绑定值对象
    manageAttrs() {
      return assign({}, this.$attrs, {
        ...this.propLabel,
        'show-overflow-tooltip': this.defaultTip,
        'min-width': this.$attrs['min-width'] || 100,
        width: this.$attrs.width || 'auto',
      });
    },
  },
  watch: {},
  methods: {
    // 自定义文字样式
    getTextStyles(scope) {
      let obj = this.textStyles || '';
      if (typeof this.textStyles === 'function') {
        obj = this.textStyles(scope, scope.row[this.propLabel.prop]);
      }
      return obj;
    },
    customTooltipAttrs(scope) {
      return Object.assign(
        {},
        {
          effect: 'dark',
          placement: 'right-start',
          content: this.getContent(scope),
          offset: -10,
        },
        this.tipConfig
      );
    },
    getContent(scope) {
      const cellValue = scope.row[this.propLabel.prop];
      let str = '';
      if (cellValue === null) {
        str = '';
      } else {
        switch (typeof cellValue) {
          case 'undefined':
            str = '';
            break;
          default:
            str = cellValue.toString();
        }
      }
      return str;
    },
    onClick(scope, event) {
      if (this.$listeners.click) {
        this.$emit('click', scope, scope.row[this.propLabel.prop], this.formatText(scope), event);
      }
    },
    // 显示内容转换：
    formatText(scope) {
      const value = scope.row[this.propLabel.prop];
      // 默认情况下，显示内容就是原始内容
      let cellValue = value;
      if (typeof this.formatter === 'function') {
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
