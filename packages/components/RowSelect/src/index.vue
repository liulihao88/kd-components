<template>
  <div
    class="kd-row-select"
    :style="{
      '--hoverBgColor': hoverBgColor,
      '--hoverTextColor': hoverTextColor,
      '--activeBgColor': activeBgColor,
      '--activeTextColor': activeTextColor,
      '--duration': duration + 'ms',
      '--lineHeight': lineHeight + 'px',
      '--itemWidth': itemWidth + 'px',
      '--itemMaxWidth': itemMaxWidth + 'px',
      '--overflow': overflow,
      '--fold-height': foldHeight + 'px',
      '--unfold-height': unfoldHeight + 'px',
      height: isFold ? foldHeight + 'px' : unfoldHeight + 'px',
    }"
  >
    <div
      class="label-box"
      :class="{ 'label-separator': separator }"
      :style="{ width: labelWidth, 'text-align': labelAlign, ...labelStyles }"
    >
      {{ labelText }}
    </div>
    <div ref="optionsBox" class="options-box" @click="onItemClick">
      <template v-if="showAll">
        <div>
          <div class="item" :class="{ 'is-active': selectAll }" :style="itemStyles" data-index="$all">
            <slot name="all">
              {{ allText }}
            </slot>
          </div>
        </div>
      </template>
      <div v-for="(item, index) in options" :key="index">
        <div
          class="item"
          :class="{
            'is-active': !selectAll && (single ? selectedKey === item[keyName] : selectedKey.includes(item[keyName])),
          }"
          :style="itemStyles"
        >
          <div :class="{ break: itemWidth !== 'auto' }" :data-index="item[keyName]">
            <slot v-bind="item" :index="index">
              {{ item[labelName] }}
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="fold-box">
      <div
        v-if="showMore"
        class="fold-inner"
        :style="{ 'flex-direction': iconPosition === 'left' ? 'row' : 'row-reverse' }"
        @click="trigger"
      >
        <i v-if="showIcon" class="el-icon-arrow-down" :class="{ 'trans-icon': !isFold }"></i>
        <div class="text" :style="btnStyles">
          {{ isFold ? foldText : unfoldText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 说明：
// 全部为空值[]

// 属性
// value/v-model {string,Array} 绑定值
// duration {number} 收缩展开动画时长，单位ms，默认100
// defaultLines {number} 默认显示行数，默认1
// lineHeight {Number} 选项高度，默认24px
// =====左侧label相关=====
// labelWidth {String} label宽度，默认auto，即自适应，可指定为固定宽度
// labelAlign {String} label水平对齐方式，同text-align
// labelText {String} 默认"选项"，label文字
// separator {Boolean} 是否显示分隔符，默认不显示
// labelStyles {Object} 默认{}，label文字的样式，支持css
// =====右侧按钮相关=====
// foldText {Object} 默认"更多"，右侧按钮折叠状态时文字
// unfoldText {Object} 默认"收起"，右侧按钮展开状态时文字
// showIcon {Boolean} 默认true，是否显示图标
// btnStyles {Object} 默认{}，右侧按钮文字样式
// forceMoreBtn {Boolean} 是否强制显示右侧收缩按钮，默认为false，即数量不足时不显示更多按钮
// iconPosition {String} 图标位于按钮方位，可选：left、right
// =====选项相关=====
// options {Array} 默认[]，选项数组，对象数组，{label:'',value:''}
// showAll {Boolean} 默认true，是否显示全部选项
// itemWidth {String} 默认auto，选项宽度
// itemMaxWidth {String} 默认auto，选项最大宽度
// overflow {String} 默认ellispe，超出后行为
// labelName {String} 默认'label'，用来显示的字段名
// keyName {String} 默认'value'，用作key的字段名
// format {function} 自定义选项显示内容转换，一个函数，参数为：选项、index，返回一个字符串
// activeBgColor {String} 默认#f5f7fd，激活状态时选项背景色
// activeTextColor {String} 默认#0052d9，激活状态时选项文字色
// hoverBgColor {String} 默认无，hover状态时选项背景色
// hoverTextColor {String} 默认无，hover状态时选项文字色
// itemStyles {Object} 默认{}，选项样式集

// 事件
// selectChange 选项发生变化时选中的选项，返回原数据中选中的项
// foldChange 组件打开或收起变化时触发，返回组件当前状态，close收起，open打开

// 方法，父组件可通过ref调用
// trigger 切换折叠状态

import { get } from 'lodash';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

export default {
  name: 'KdRowSelect',
  props: {
    value: {
      type: [String, Array],
      default: '',
    },
    single: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 100,
    },
    defaultLines: {
      type: Number,
      default: 1,
    },
    lineHeight: {
      type: Number,
      default: 24,
    },
    // 左侧label
    labelWidth: {
      type: String,
      default: 'auto',
    },
    labelAlign: {
      type: String,
      default: 'left',
    },
    labelText: {
      type: String,
      default: '选项',
    },
    separator: {
      type: Boolean,
      default: false,
    },
    labelStyles: {
      type: Object,
      default: () => {},
    },
    // 右侧按钮
    foldText: {
      type: String,
      default: '更多',
    },
    unfoldText: {
      type: String,
      default: '收起',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    btnStyles: {
      type: Object,
      default: () => {
        return {
          // css样式
        };
      },
    },
    // 选项
    options: {
      type: Array,
      default: () => [],
    },
    showAll: {
      type: Boolean,
      default: true,
    },
    allText: {
      type: String,
      default: '全部',
    },
    itemWidth: {
      type: String,
      default: 'auto',
    },
    itemMaxWidth: {
      type: String,
      default: 'auto',
    },
    overflow: {
      type: String,
      default: 'ellipsis',
    },
    labelName: {
      type: String,
      default: 'label',
    },
    keyName: {
      type: String,
      default: 'value',
    },
    activeBgColor: {
      type: String,
      default: '#365edf',
    },
    hoverBgColor: {
      type: String,
      default: '',
    },
    activeTextColor: {
      type: String,
      default: '#fff',
    },
    hoverTextColor: {
      type: String,
      default: '',
    },
    itemStyles: {
      type: Object,
      default: () => {
        return {
          // css样式
        };
      },
    },
    forceMoreBtn: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: function (value) {
        return ['left', 'right'].includes(value);
      },
    },
  },
  data() {
    return {
      isFold: true, // true收false开
      optionScrollHeight: '24px',
      keySet: new Set(),
      keyValue: '',
      showMore: true,
      foldHeight: 24,
      unfoldHeight: 24,
    };
  },
  computed: {
    // 最小行高，不能小于24
    minLineHeight() {
      return Math.max(Number(this.lineHeight), 24);
    },
    // 最小行数，不能小于1
    minLineNum() {
      return Math.max(Math.round(this.defaultLines), 1);
    },
    // 计算按预设行数需要的对应的高度 = (行高 + 每行paddingBottom) * 行数
    needHeight() {
      return (this.minLineHeight + 8) * this.minLineNum;
    },
    selectedKey: {
      get() {
        let v;
        if (!this.single) {
          v = this.value || [];
        } else {
          v = this.value || '';
        }
        return v;
      },
      set(val) {
        if (!this.single) {
          this.$emit('input', val || []);
        } else {
          this.$emit('input', val || '');
        }
      },
    },
    selectAll() {
      let b = true;
      if (this.showAll) {
        if (!this.single) {
          b = this.value.length === 0;
        } else {
          b = this.value === '';
        }
      } else {
        b = false;
      }
      return b;
    },
  },
  watch: {
    // options是要渲染的内容，可能是异步的，所以要使用watch监听
    options: {
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.onResize();
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // 初始化默认选中项
    if (!this.single) {
      if (this.value.length === 0) {
        this.keySet.clear();
      } else {
        this.value.forEach((item) => {
          this.keySet.add(item);
        });
      }
    }
    addResizeListener(this.$el, this.onResize);
  },
  beforeDestroy() {
    if (this.onResize) removeResizeListener(this.$el, this.onResize);
  },
  methods: {
    onResize() {
      // 获取内容实际高度
      const scrollHeight = get(this.$refs, 'optionsBox.scrollHeight') || 0;
      let canMore = true; // 是否可以出现更多按钮
      // 判断是否需要更多按钮
      // 如果选项不够lineNum,那么按最小值显示
      // 实际高度大于所需高度：出现更多按钮；收缩高度=所需高度
      if (scrollHeight > this.needHeight) {
        this.foldHeight = this.needHeight;
        this.unfoldHeight = scrollHeight;
      } else if (scrollHeight === this.needHeight) {
        // 实际高度等于所需高度：无更多按钮；收缩高度=展开高度=所需高度
        this.foldHeight = this.unfoldHeight = this.needHeight;
        canMore = false;
      } else {
        // 实际高度小于所需高度：无更多按钮；收缩高度=展开高度=实际高度
        this.foldHeight = this.unfoldHeight = scrollHeight;
        canMore = false;
      }
      // 判断是否显示更多按钮
      if (this.forceMoreBtn) {
        this.showMore = true;
      } else {
        this.showMore = canMore;
      }
    },
    onItemClick(e) {
      const key = e.target.dataset.index;
      if (!key) return;
      let res;
      if (!this.single) {
        if (key === '$all') {
          this.keySet.clear();
          res = [];
        } else {
          const hasKey = this.keySet.has(key);
          this.keySet[hasKey ? 'delete' : 'add'](key);
          res = Array.from(this.keySet);
        }
      } else {
        if (key === '$all') {
          this.keyValue = '';
          res = '';
        } else {
          res = key;
        }
      }
      this.selectedKey = res;
      this.$emit('selectChange', res);
      this.$emit('change', res);
    },
    trigger(type) {
      if (type !== 'open' && type !== 'close') {
        this.isFold = !this.isFold;
      } else {
        if (type === 'open') this.isFold = false;
        if (type === 'close') this.isFold = true;
      }
      this.$emit('foldChange', this.isFold === true ? 'close' : 'open');
      this.$emit('fold', this.isFold === true ? 'close' : 'open');
    },
  },
};
</script>
