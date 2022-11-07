<template>
  <div
    class="kd-icon-wrap"
    :class="[wrapClass]"
    :style="{
      width: isPlace ? comSize : '',
      height: isPlace ? comSize : '',
      'line-height': isPlace ? comSize : '',
      margin: margin,
      cursor: pointer && !isPlace ? 'pointer' : '',
      '--hover-color': hoverColor,
      '--default-color': defaultColor,
      ...wrapStyle,
    }"
    @click="onClick"
  >
    <template v-for="(item, index) in iconArr">
      <el-tooltip v-bind="mergeTooltipAttrs" :key="index" :disabled="!item.tooltip" :content="item.tooltip">
        <i
          v-show="clickNum === index"
          :key="index"
          class="kd-icon"
          :class="[getName(item.name)]"
          :style="{
            'font-size': comSize,
            'line-height': comSize,
          }"
        ></i>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
export default {
  name: 'KdIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    names: {
      type: Array,
      default: () => {
        return [
          // {
          //   name:'',
          //   tooltip:'',
          //   key:''
          // }
        ];
      },
    },
    size: {
      type: [String, Number],
      default: 16,
    },
    mt: {
      type: String,
      default: '0',
    },
    mr: {
      type: String,
      default: '0',
    },
    mb: {
      type: String,
      default: '0',
    },
    ml: {
      type: String,
      default: '0',
    },
    pointer: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: '',
    },
    tooltipAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defaultColor: {
      type: String,
      default: 'inherit', // #27304B
    },
    hoverColor: {
      type: String,
      default: '', // #365EDF
    },
    isPlace: {
      type: Boolean,
      default: false,
    },
    wrapStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    wrapClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      clickNum: 0,
      curTooltip: '',
    };
  },
  computed: {
    iconArr() {
      let arr = [];
      if (this.names) {
        this.names.forEach((item) => {
          arr.push({
            name: item.name,
            tooltip: item.tooltip || this.tooltip || '',
            key: item.key || '',
          });
        });
      }
      // name属性优先级更高，会覆盖names
      if (this.name) {
        arr = [
          {
            name: this.name,
            tooltip: this.tooltip || '',
            key: '',
          },
        ];
      }
      return arr;
    },
    comSize() {
      let r;
      if (typeof this.size === 'string') {
        if (this.size.endsWith('px')) {
          r = this.size;
        } else {
          r = this.size + 'px!important';
        }
      }
      if (typeof this.size === 'number') {
        r = this.size + 'px!important';
      }
      return r;
    },
    mergeTooltipAttrs() {
      let obj = {};
      if (this.tooltip) {
        Object.assign(
          obj,
          {
            effect: 'dark',
            placement: 'top',
            'open-delay': 200,
          },
          this.tooltipAttrs
        );
      } else {
        obj.disabled = true;
      }
      return obj;
    },
    statusLength() {
      return this.names.length;
    },
    margin() {
      return `${this.mt}px ${this.mr}px ${this.mb}px ${this.ml}px`;
    },
  },
  methods: {
    onClick() {
      if (this.isPlace) return;
      this.$emit('click', this.iconArr[this.clickNum]?.key);
      if (this.clickNum < this.statusLength - 1) {
        this.clickNum++;
      } else {
        this.clickNum = 0;
      }
    },
    getName(name) {
      let showName = name;
      if (!name.startsWith('el-icon-')) {
        showName = name.startsWith('kd-icon-') ? name : `kd-icon-${name}`;
      }
      return showName;
    },
  },
};
</script>
