<template>
  <div>
    <example-title :data="{ title: '表格文本列', maintenance: '刘云' }">
      基于el-table-column封装，与kd-simple-table一起使用。<br />
      该组件是从kd-column-show中分离出来的，并增加了一些功能，主要为了满足更为复杂的内容展示场景：单元格链接、单元格点击、自定义样式、自定义tooltip<br />
    </example-title>

    <h5>用法示例</h5>
    <kd-simple-table :data="tableData" :show-paging="false">
      <!--属性简写-->
      <kd-column-text p-l="t1,属性简写"></kd-column-text>
      <!--show-overflow-tooltip默认为true-->
      <kd-column-text p-l="t2,默认tooltip" width="120px"></kd-column-text>
      <!--自定义tooltip-->
      <kd-column-text p-l="t3,自定义tip" custom-tip>
        <div slot="tip-content">
          这是自定义tooltip的内容<br />
          这是自定义tooltip的内容
        </div>
      </kd-column-text>
      <!--链接列-->
      <kd-column-text p-l="name,链接列" is-link @click="onClick"></kd-column-text>
      <!--使用formatter-->
      <kd-column-text
        p-l="collectMode,formatter函数"
        :formatter="(value) => ({ MANUAL: '手动', AUTO: '自动' }[value])"
        custom-tip
      >
        <div slot="tip-content" slot-scope="{ scope, value, formatValue }">
          slot中可获取scope<br />
          原始值：{{ value }}<br />
          转换值：{{ formatValue }}<br />
        </div>
      </kd-column-text>
      <kd-column-text
        p-l="collectMode,formatter对象格式"
        :formatter="{ MANUAL: '手动运行', AUTO: '自动运行' }"
      ></kd-column-text>
      <!--自定义样式函数用法-->
      <kd-column-text p-l="text1,样式函数" :text-styles="cellStylesFunc" min-width="300"></kd-column-text>
      <!--自定义样式对象用法-->
      <kd-column-text p-l="text2,样式对象" :text-styles="cellStylesJson" min-width="180"></kd-column-text>
      <!--自定义样式字符串用法-->
      <kd-column-text p-l="text3,样式字符串" :text-styles="cellStylesStr" min-width="180"></kd-column-text>
    </kd-simple-table>
    <example-code :source="source1">
      <b style="color: red">注意：</b><br />
      - 内容超宽时使用自定义tooltip，位置在右侧时，tooltip的位置会在内容的实际结束位置，参见第3列的效果 <br />
      - formatter函数形式的参数顺序与el-table的formatter参数顺序不一样<br />
    </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      tableData: [
        {
          t1: '使用p-l代替prop和label属性',
          t2: 'show-overflow-tooltip属性的值',
          t3: 'custom-tip表示添加自定义tooltip',
          name: '老刘',
          text1: '使用函数定义样式',
          text2: '使用对象定义样式',
          text3: '使用字符串定义样式',
          collectMode: 'MANUAL',
          text: '这是文本',
        },
        {
          t1: '但是也支持prop和label属性',
          t2: '默认为true',
          t3: 'tip-config={}表示tooltip配置',
          name: '大刘',
          text1: "如(scope)=>{color:['red', 'blue','green][scope.$index]}'",
          text2: '如{fontWeight:900}',
          text3: "如：'font-size:20px;'",
          collectMode: 'AUTO',
          text: '这是文本2',
        },
        {
          t1: '并且它们优化级更高',
          t2: 'defaultTip=false可以取消它',
          t3: 'slot#tip-content表示自定义tooltip内容',
          name: '小刘',
          text1: '可利用内部的scope参数',
          text2: '',
          text3: '',
          collectMode: 'AUTO',
          text: '这是比较长的一段文本',
        },
      ],
      cellStylesJson: {
        fontSize: '20px',
        color: 'pink',
      },
      cellStylesStr: 'font-size:20px;display:inline-block;background:#eee;',
    };
  },
  methods: {
    onClick(scope, value, formatValue, event) {
      console.log(scope, value, formatValue, event);
      this.$message.success(`点击单元格，原始值：${value}，转换值：${formatValue}`);
    },
    cellStylesFunc(scope, value) {
      return {
        fontWeight: (scope.$index + 1) * 300,
        fontSize: (scope.$index + 1) * 8 + 'px',
        color: ['red', 'blue', 'green'][scope.$index],
      };
    },
  },
};
</script>
