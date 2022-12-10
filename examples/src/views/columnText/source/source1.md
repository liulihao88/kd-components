```vue
<template>
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
    ></kd-column-text>
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
</template>

<script>
export default {
  data() {
    return {
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
        },
      ],
      cellStylesJson: {
        fontSize: '20px',
        color: 'pink',
      },
      cellStylesStr: 'font-size:20px;display:inline-block;background:#eee;',
    }
  },
  methods: {
    onClick(scope) {
      console.log(scope);
      this.$message.success('点击单元格');
    },
    cellStylesFunc(scope) {
      return {
        fontWeight: (scope.$index + 1) * 300,
        fontSize: (scope.$index + 1) * 8 + 'px',
        color: ['red', 'blue', 'green'][scope.$index],
      };
    },
  }
}
</script>
```