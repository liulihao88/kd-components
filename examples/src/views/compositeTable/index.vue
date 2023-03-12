<template>
  <div>
    <example-title :data="{ title: '组合式表格', maintenance: '刘云' }">
      基于el-table-column封装，与kd-simple-table一起使用。<br />
      <br />
    </example-title>

    <h5>用法示例</h5>
    <kd-composite-table :search-config="searchConfig"></kd-composite-table>
    <example-code :source="source1"> </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      searchConfig: {
        // oldModel: false,
        // foldText: '一',
        // unFoldText: '二',
        formArr: [
          {
            key: 'f1',
            title: '关键词',
            placeholder: '请输入关键词',
            first: true,
          },
          {
            key: 'f2',
            value: '23',
            title: '输入框2',
          },
          {
            key: 'f3',
            type: 'kd-select',
            value: '1',
            title: '下拉框-单选',
            attrs: {
              width: 180,
              options: [
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
              ],
            },
          },
          {
            key: 'f4',
            type: 'kd-select',
            value: ['1', '2'],
            title: '下拉框-多选',
            attrs: {
              multiple: true,
              options: [
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
              ],
            },
          },
          {
            key: 'f5',
            type: 'kd-date-range',
            title: '时间选择',
            value: [],
            valueFormat(val, key) {
              return { startTime: val?.[0] || '', endTime: val?.[1] || '' };
            },
          },
        ],
      },
      searchBtns: [
        {
          label: '',
          icon: '',
        },
      ],
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
          s: 12,
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
          s: null,
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
          s: undefined,
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
