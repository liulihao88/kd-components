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
          :class="[getName(item)]"
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
          // local:true
          // }
        ];
      },
    },
    local: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: 16,
      validator(val) {
        // 参数校验，必为2位数字或带单位的4位字符
        return /^[1-9]\d(px|em)?$/.test(String(val));
      },
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
    };
  },
  computed: {
    iconArr() {
      let arr = [];
      if (this.names) {
        this.names.forEach((item) => {
          arr.push({
            name: item.name,
            // this.tooltip优先级高于item.tooltip
            tooltip: item.tooltip || this.tooltip || '',
            key: item.key || '',
            local: item.local || this.local || false,
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
            local: this.local,
          },
        ];
      }
      return arr;
    },
    comSize() {
      // 字体最小12px，最大应该不会超过99，所以使用padEnd补充单位
      return String(this.size).padEnd(4, 'px') + '!important';
    },
    // 合并tooltip属性配置，增加默认配置，不合并tooltip属性
    mergeTooltipAttrs() {
      return Object.assign(
        {},
        {
          effect: 'dark',
          placement: 'top',
          'open-delay': 200,
        },
        this.tooltipAttrs
      );
    },
    statusLength() {
      return this.names.length;
    },
    margin() {
      return `${this.mt}px ${this.mr}px ${this.mb}px ${this.ml}px`;
    },
  },
  methods: {
    // 点击事件：
    onClick() {
      if (this.isPlace) return;
      let key = this.iconArr[this.clickNum] ? this.iconArr[this.clickNum].key : '';
      this.$emit('click', key);
      // 如果是多个图标的组合，点击后下一个生效
      if (this.clickNum < this.statusLength - 1) {
        this.clickNum++;
      } else {
        this.clickNum = 0;
      }
    },
    // 获取图标名称：全局el图标、全局kd-icon、项目中的icon图标
    getName({ name, local }) {
      let showName = name;
      // 非el图标
      if (!name.startsWith('el-icon-')) {
        if (local) {
          // 项目本地图标，class形式为"iconfont icon-xxxxx"
          showName = 'iconfont ' + (name.startsWith('icon-') ? name : 'icon-' + name);
        } else {
          // 全局kd-icon-xxxxx
          showName = name.startsWith('kd-icon-') ? name : `kd-icon-${name}`;
        }
      }
      return showName;
    },
  },
};
</script>
