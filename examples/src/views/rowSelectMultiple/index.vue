<template>
  <div>
    <example-title :data="{ title: '行选择器（多选）', maintenance: '刘云' }">
      行选择器（多选），由于业务场景中目前只有多选情况，单选场景的row-select-single组件正在开发中。
    </example-title>

    <h5>基础用法</h5>
    <div class="example-wrap">
      <kd-row-select-multiple v-model="value1" :options="tagData"></kd-row-select-multiple>
    </div>
    <example-code :source="source1"> 设置 v-model/value 和 options 选项数组即可； </example-code>

    <h5>全局配置</h5>
    <div class="example-wrap">
      <kd-row-select-multiple v-model="value1" :options="tagData" :duration="300" :default-lines="2">
      </kd-row-select-multiple>
    </div>
    <example-code :source="source2">
      通过duration控制折叠/展开动画过渡时长，默认为100ms； 通过 default-lines 控制折叠状态下显示行数， 默认为1；
      默认配置下，当选项数量不超过最大可显示数量时，右侧按钮会隐藏，通过 force-more-btn 可强制显示按钮
    </example-code>

    <h5>label配置</h5>
    <div class="example-wrap">
      <kd-row-select-multiple
        v-model="value1"
        :options="tagData"
        label-width="10em"
        label-align="right"
        label-text="一级业务线"
        separator
        :label-styles="labelStyles"
      >
      </kd-row-select-multiple>
    </div>
    <example-code :source="source3">
      通过 label-text 配置label显示文字； label-width 控制label的宽度，默认值为auto； 通过 label-align
      控制label文字水平对齐 方式，可选值同css text-align，默认为left，只有在配置了label-width时才会生效；label-styles
      接受一个对象，用来配置label样式； separator用来控制是否显示label分隔符，目前只支持冒号（:）分隔符
    </example-code>

    <h5>折叠按钮配置</h5>
    <div class="example-wrap">
      <kd-row-select-multiple
        v-model="value1"
        :options="tagData"
        fold-text="打开"
        unfold-text="收起"
        icon-position="right"
        :btn-styles="labelStyles"
      >
      </kd-row-select-multiple>
    </div>
    <example-code :source="source4">
      fold-text/unfold-text 分别控制折叠状态/展开状态下按钮文字；<br />icon-position
      控制图标位置，可选值：left/right；<br />btn-styles 接受一个对象，用来配置按钮文字样式，不包括图标；
    </example-code>

    <h5>选项配置</h5>
    <div class="example-wrap">
      <kd-row-select-multiple
        v-model="value1"
        :options="tagData"
        active-text-color="blue"
        active-bg-color="yellow"
        hover-bg-color="red"
        hover-text-color="blue"
        :line-height="40"
        item-width="20"
        item-max-width="50"
      >
      </kd-row-select-multiple>
    </div>
    <example-code :source="source5">
      选项集合options默认情况下应该是 [{label:'',value:''}] 格式，通过 label-name/key-name 可指定label、key字段；<br />
      "全部"选项是一个特殊选项，不包含在options内，是根据业务需求在组件内部添加的额外选项，它的key为"$all"，按现有的业务需求，
      选择全部时返回值为空数组（[]）；<br />
      active-text-color/active-bg-color 分别控制选项在选中状态下的文字颜色/背景颜色； hover-text-color/hover-bg-color
      分别控制选项在 hover 状态下的文字颜色/背景颜色； line-height 控制选项行高；<br />
      item-width/item-max-width 控制选项宽度/最大宽度，可按需求使用，item-width优先级更高； overflow
      可控制当选项内容超宽时的显示行为；<br />
      item-styles 接受一个对象，用来配置选项样式，注意不要更改width、height属性，会与内置配置项引起冲突
    </example-code>

    <h5>折叠/展开</h5>
    <div class="example-wrap">
      <kd-row-select-multiple ref="rowSelectMultiple" v-model="value1" :options="tagData"> </kd-row-select-multiple>
      <el-button @click="triggerSelect">展开/折叠</el-button>
      <el-button @click="triggerSelect('open')">展开</el-button>
      <el-button @click="triggerSelect('close')">折叠</el-button>
    </div>
    <example-code :source="source6">
      除了点击右侧按钮，通过ref也可控制组件的折叠状态，调用$refs.rowSelectMultiple.trigger(type)方法，type可选值：undefined/open/close
    </example-code>

    <h5>高级用法</h5>
    <div class="example-wrap">
      <div class="advanced-wrap">
        <div class="title">
          <span>筛选条件</span>
          <el-button type="text" @click="triggerFold">收起筛选</el-button>
        </div>
        <transition name="el-zoom-in-top">
          <div v-show="showMain" class="main transition-box">
            <template v-for="(value, key) in showConfig">
              <kd-row-select-multiple
                :key="key"
                v-model="value.value"
                label-width="5em"
                :label-text="value.label"
                label-align="right"
                separator
                :default-lines="2"
                :options="value.options"
                icon-position="right"
              ></kd-row-select-multiple>
            </template>
          </div>
        </transition>
      </div>
    </div>
    <example-code :source="source7">
      以资产管理平台-资产搜索页面的高级搜索为例，可将多个kd-row-select-multiple组合使用
    </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
import source2 from './source/source2.md';
import source3 from './source/source3.md';
import source4 from './source/source4.md';
import source5 from './source/source5.md';
import source6 from './source/source6.md';
import source7 from './source/source7.md';
let arr = [];
for (let i = 0; i < 20; i++) {
  arr.push({ label: 'item' + i, value: i + '' });
}
export default {
  name: 'Index',
  data() {
    return {
      value1: ['2', '4'],
      tagData: arr,
      labelStyles: {
        background: '#eee',
        color: 'red',
        fontSize: '10px',
      },
      source1,
      source2,
      source3,
      source4,
      source5,
      source6,
      source7,
      showConfig: {
        o1: {
          value: [],
          label: '主题',
          options: arr.slice(0, 20),
        },
        o2: {
          value: [],
          label: '项目',
          options: arr.slice(0, 10),
        },
        o3: {
          value: [],
          label: '业务线',
          options: arr.slice(0, 15),
        },
      },
      showMain: true,
    };
  },
  methods: {
    triggerSelect(type) {
      this.$refs.rowSelectMultiple.trigger(type);
    },
    triggerFold() {
      this.showMain = !this.showMain;
    },
  },
};
</script>
<style lang="scss" scoped>
.example-wrap {
  width: 600px;
  margin-bottom: 20px;
}
.advanced-wrap {
  border: 1px solid var(--line-color);

  .title {
    height: 40px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);
  }

  .main {
    padding: 16px;

    .row-select:nth-child(-n + 3) {
      margin-bottom: 16px;
    }
  }
}
</style>
