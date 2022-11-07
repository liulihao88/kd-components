<template>
  <el-table-column v-bind="manageAttrs" :filters="colFilters" v-on="$listeners">
    <template slot-scope="scope">
      <template v-if="isLink">
        <span class="kd-column-show__link" @click="onClick(scope)">
          {{ formatText(scope) }}
        </span>
      </template>
      <template v-else>
        <template v-if="isStatus">
          <span
            class="kd-column-show__status-box"
            :style="isStatus ? mergeStatusStyles[scope.row[propLabel.prop]] : ''"
            @click="onClick(scope)"
          >
            {{ formatText(scope) }}
          </span>
        </template>
        <template v-else>
          <span @click="onClick(scope)">
            {{ formatText(scope) }}
          </span>
        </template>
      </template>
    </template>
  </el-table-column>
</template>

<script>
// 存在问题
// 2、如果状态为数字，则filters不能使用{true:'是',false:'否'}，因为true、false会被转为字符串，同时数字类型应该也不行

// 场景&需求
// 1、链接列：一个可以点击的link样式的列，单纯改变样式，增加点击事件
// 2、列内容formatter：内容转换，单独转换，或者配合filters转换
// 3、状态展示列：按不同状态显示为不同样式，大部分为双值显示true、false，还应该支持多值
// 4、列筛选：需要设置filters，column-key，一般还需要formatter进行显示内容转换
// 5、默认需要添加show-overflow-tooltip，内容超宽时隐藏，noTip可以取消这种行为
// 6、最简单的情况下，只有prop、label属性，需要简化一下
// 7、拖拽行时，需要设置row-key，一般为自定义row-key、'id'
// 8、当配置了filters时，在普遍情况下，该信息可以用作formatter、状态转换

// 实现思路&逻辑说明：
// 一、属性值简写及更改默认值
// 1、保持原有的prop、label用法，同时支持把它们合并为一个p-l属性，用逗号分隔的字符串，内部会拆分
// 2、不设置column-key时自动绑定为prop，
// 3、行拖拽时，需要row-key，如果不设置，则判断row中是否有id或rowKey字段

// 二、状态列处理
// statusArr和statusStyles通过数组形式一一对应，满足默认值情况下，方便扩展
// 通过定义status-type表示如何使用状态列；
// - default：表示双值状态，默认状态值为[true,false]，指定showType=status即可；通过statusArr可以更改状态值
// - extra：在default基础上附加一些状态值及样式，需要重写statusArr，如果沿用默认样式，通过extraStyle增加额外样式，如果不沿用默认样式，则重写statusStyles
// - custom：完全重写状态值及对应的样式，需要同时定义statusArr和statusStyles
// 如果提借了filters属性，表示为筛选列，就会用filters.value作为statusArr的值，除非statusByFilters=false

// 三、formatter处理
// 显示内容的转换，一般单独使用，或在筛选列情况下使用
// - 单独使用或需要自定义时，直接设置formatter属性，它的优先级高
// - 筛选列时，默认情况下，为了简化外部传参，可以不设置formatter属性，组件通过filters转换结果columnFilters（即[{text,value}]）来得到formatter方法

// 四、筛选列处理
// 筛选列的关键在filters属性，由它可得到普通可用的formatter，column-key默认取prop
// filters支持三种格式，最终都转换为[{text,value}]
// - {value:label}：自定义时书写方便
// - [{label,value},...]：一般是后端返回的数据结构
// - [value,...]：一般在值也是显示内容的情况（暂不实现）
// - [{text,value},...]：el-table-column默认支持的格式

// Attributes
// value/v-model {string,Array} 绑定值
// multiple {Boolean} 默认true，是否可多选
// duration {number} 默认200 动画时长，单位ms
// lineHeight {Number} 默认24 选项高度，会影响所
// required {Boolean} 默认true 是否必须选中最少1项
import { assign, isEmpty, get } from 'lodash';

export default {
  name: 'KdColumnShow',
  props: {
    // 两个默认属性：prop,label合并为一个字符串
    pL: {
      type: String,
      required: true,
      validator: function (value) {
        // 约定以英文逗号分隔prop和label
        return value.includes(',');
      },
    },
    // 是否以link-链接展示，
    isLink: {
      type: Boolean,
      default: false,
    },
    // 是否以status-状态展示
    isStatus: {
      type: Boolean,
      default: false,
    },
    statusType: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'extra', 'custom'].includes(value);
      },
    },
    statusArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    extraStyles: {
      type: Array,
      default: () => {
        return [];
      },
    },
    statusStyles: {
      type: Array,
      default: () => {
        return [
          {
            background: '#eaeefb',
            color: '#365edf',
          },
          {
            background: '#fdecea',
            color: '#e94c35',
          },
        ];
      },
    },
    statusByFilters: {
      type: Boolean,
      default: true,
    },
    // filters对象，格式{value:label}或[{label:label,value:value}]，组件内会转换为[{text:label,value:value}]，
    filters: {
      type: [Object, Array],
      default: () => {
        return null;
      },
    },
    // 是否使用filter进行显示值转换，在filters不为只时起作用
    formatByFilters: {
      type: Boolean,
      default: true,
    },
    formatter: {
      type: Function,
      default: null,
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
      mergeStatus: [],
      mergeStatusStyles: {},
    };
  },
  computed: {
    propLabel() {
      let obj = {
        prop: '',
        label: '',
      };
      if (!this.pL) {
        obj.prop = this.$attrs.prop;
        obj.label = this.$attrs.label;
      } else {
        try {
          let arr = this.pL.split(',');
          obj.prop = arr[0];
          obj.label = arr[1];
        } catch (e) {
          throw new Error('column-show ： prop 和 label 转换出错 \n' + e);
        }
      }
      return obj;
    },
    // 列筛选时必要参数
    colKey() {
      return this.$attrs['column-key'] ? this.$attrs['column-key'] : this.propLabel.prop;
    },
    // 行拖拽时必要参数
    rowKey() {
      return this.$attrs['row-key'] ? this.$attrs['row-key'] : 'id';
    },
    // 合并为最终的绑定值对象
    manageAttrs() {
      let customAttr = {
        ...this.propLabel,
        'row-key': this.rowKey,
        'column-key': this.colKey,
        'show-overflow-tooltip': !this.noTip,
        'min-width': 100,
        width: 'auto',
      };
      // if (this.colFilters.length !== 0) customAttr.filters = this.colFilters;
      return assign({}, this.$attrs, customAttr);
    },
  },
  watch: {
    // 根据传入的filters得到最终的filters
    filters: {
      handler(value) {
        if (value) {
          let arr = [];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              // 先排除不合法项
              if (item === null || item === undefined || typeof item === 'function')
                throw new Error('column-show ： filters数组元素为' + typeof item);
              if (typeof item !== 'object') {
                //[value,...]处理
                arr.push({
                  text: item,
                  value: item,
                });
              } else {
                //[{label,value}]和[{text,value}]处理
                arr.push({
                  text: item.text || item.label,
                  value: item.value,
                });
              }
            });
          } else {
            // {value:label}格式处理
            for (let filtersKey in value) {
              arr.push({
                text: value[filtersKey],
                value: filtersKey,
              });
            }
          }
          this.colFilters = arr || null;
        }
      },
      immediate: true,
      deep: true,
    },
    isStatus: {
      handler(value) {
        if (value) {
          this.mergeStatusStyles = this.getStyles();
        }
      },
      immediate: true,
    },
    // 根据最终的filters获取其他信息
  },
  methods: {
    getDefaultStatus() {
      let arr = [];
      if (!this.isLink && this.isStatus) {
        arr = this.statusArr.length === 0 ? [true, false] : this.statusArr;
        if (this.statusByFilters && get(this.colFilters, 'legnth') > 0) {
          arr = this.colFilters.map((x) => x.value);
        }
      }
      return arr;
    },
    getStyles() {
      let mergeStatus = this.getDefaultStatus();
      let obj = {};
      let mergeStyles = this.statusType === 'extra' ? [...this.statusStyles, ...this.extraStyles] : this.statusStyles;
      if (mergeStatus.length !== mergeStyles.length) {
        console.warn('column-show ：状态值与样式集数量不匹配，部分状态无法正常显示');
      }
      mergeStatus.forEach((item, index) => {
        obj[item] = mergeStyles[index];
      });
      return obj;
    },
    onClick(scope) {
      if (this.$listeners.click) {
        this.$emit('click', scope);
      }
    },
    // 显示内容转换：如果有formatter转换，否则使用filters（columnFilters）转换
    formatText(scope) {
      const { row, column, $index } = scope;
      const value = row[this.propLabel.prop];
      // 默认情况下，显示内容就是原始内容
      let cellValue = value;
      if (this.formatter !== null) {
        // 如果设置了formatter属性
        // 改写formatter方法参数，第一个值为cellValue当前值
        cellValue = this.formatter(value, row, column, $index);
      } else if (this.formatByFilters && this.colFilters !== null) {
        // 如果使用filters参数来转换
        let a = this.colFilters.find((x) => x.value === value);
        if (!isEmpty(a)) cellValue = a.text;
      }
      return cellValue;
    },
  },
};
</script>
