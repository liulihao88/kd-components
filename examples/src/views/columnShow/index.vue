<template>
  <div>
    <example-title :data="{title: '表格展示列',maintenance: '刘云'}">
      <template>
        基于el-table-column封装，与kd-simple-table一起使用。<br />
        该组件考虑了以下场景：链接展示、列点击、状态展示列、列筛选，并针对常规场景下的写法进行了简化<br />
        一、属性简写及默认值<br />
        1. 保持原有的prop、label用法，同时支持把它们合并为一个p-l属性，值为用逗号分隔的字符串，内部会拆分。<br />
        2. 不设置column-key时默认绑定为prop。<br />
        3. 行拖拽时，需要row-key，如果不单独设置，则判断row中是否有id或rowKey字段。<br />
        4. show-overflow-tooltip属性默认为true(因为大部分业务中需要它)，除非no-tip为true。<br />
        二、链接列<br />
        1. 修改了单元格内容默认样式，<br />
        1. 通过click事件可处理点击回调。<br />
        三、formatter处理<br />
        该列单元格内容的转换，有两种使用方式：<br />
        1. 单独使用或需要自定义时，直接设置formatter属性，它的优先级最高<br />
        2. 筛选列时，为了简化外部传参，可以不设置formatter属性，内部通过filters转换结果columnFilters（即[{text,value}]）来得到formatter方法<br />
        四、状态列处理<br />
        statusArr和statusStyles通过数组形式一一对应，满足默认双值状态展示的情况下，也方便扩展<br />
        通过定义status-type表示如何使用状态列：<br />
        - default：表示双值状态，默认状态值为[true,false]，指定showType=status即可；通过statusArr可以更改状态值<br />
        - extra：在default基础上附加一些状态值及样式，需要重写statusArr，并通过extraStyle增加额外样式<br />
        - custom：完全重写状态值及对应的样式，需要同时定义statusArr和statusStyles<br />
        如果提供了filters属性，表示为筛选列，就会用filters.value作为statusArr的值，除非statusByFilters=false<br />
        五、筛选列处理<br />
        筛选列的关键在于filters属性，由它可得到普遍可用的formatter<br />
        该组件的filters属性支持三种数据格式，最终都转换为[{text,value}]<br />
        - {value:label}：自定义时书写比较方便<br />
        - [{label,value},...]：一般是后端返回的数据结构<br />
        - [{text,value},...]：el-table-column默认支持的格式<br />
        <br />
        当kd-column-show不能满足需求时，可以考虑使用原生的el-table-column组件去自由发挥，实现一些特殊的需求。
      </template>
    </example-title>

    <h5>用法示例</h5>
    <kd-simple-table :data="tableData" @filter-change="filterChange" :show-paging="false">
      <!--属性简写-->
      <kd-column-show p-l="tip,属性简写" width="100px"></kd-column-show>
      <!--链接列-->
      <kd-column-show p-l="name,链接列" is-link @click="onClick"></kd-column-show>
      <!--单独使用formatter-->
      <kd-column-show p-l="collectMode,formatter配置" :formatter="(value) => ({ MANUAL: '手动', AUTO: '自动' }[value])"></kd-column-show>
      <!--普通双值状态：特指true、false状态-->
      <kd-column-show p-l="status,普通双值" is-status></kd-column-show>
      <!--自定义双值状态-->
      <kd-column-show p-l="status2,自定义双值" is-status :status-arr="['SUCCESS', 'FAILURE']"></kd-column-show>
      <!--扩展多值状态-->
      <kd-column-show p-l="status3,拓展多值" is-status status-type="extra" :status-arr="['s1', 's2','s3']" :extra-styles="[{background: 'yellow', color: 'blue' }]"></kd-column-show>
      <!--完全自定义多值状态-->
      <kd-column-show p-l="status4,自定义多值" is-status status-type="custom" :status-arr="['x1', 'x2','x3']" :status-styles="statusStyles"></kd-column-show>
      <!--筛选列-->
      <kd-column-show p-l="status5,筛选列" :filters="{ START: '启用', STOP: '停用' }"></kd-column-show>
      <!--筛选列配合状态-->
      <kd-column-show p-l="status5,状态值+筛选" is-status :filters="{ START: '启用', STOP: '停用' }"></kd-column-show>
    </kd-simple-table>
    <example-code :source="source1">
      上面的例子中分别展示了：<br />
      - 普通列：属性简写及重写默认属性<br />
      - 链接列：配置is-link属性<br />
      - formatter配置：一个转换单元格内容的函数<br />
      - 普通双值状态处理：针对状态值为true/false的处理<br />
      - 自定义双值状态处理：针对状态值不为true/false情况的处理<br />
      - 多值状态处理：通过status-arr、extra-styles、status-styles来自由配置状态值及对应的样式<br />
      - 筛选列处理：通过filters属性及其他属性配合，可大大减少配置项<br />
      <br />
      注意：筛选列需要在父级table上增加filter-change事件，具体的回调需要自己处理
    </example-code>
  </div>
</template>

<script>
import source1 from "./source/source1.md";
  export default {
    name: 'Index',
    data() {
      return {
        source1,
        tableData:[
          {
            tip:"超长文本超长文本超自动隐藏",
            name:'老刘',
            status:true,
            status2:'FAILURE',
            status3:'s1',
            status4:'x1',
            status5:'START',
            collectMode:'MANUAL',
          },
          {
            tip:"普通文本",
            name:'大刘',
            status:false,
            status2:'SUCCESS',
            status3:'s2',
            status4:'x2',
            status5:'STOP',
            collectMode:'AUTO',
          },
          {
            tip:"普通文本",
            name:'小刘',
            status:false,
            status2:'SUCCESS',
            status3:'s3',
            status4:'x3',
            status5:'STOP',
            collectMode:'AUTO',
          }
        ],
        statusStyles:[
          {
            background: 'yellow', color: 'blue'
          },
          {
            background: 'black', color: 'white'
          },
          {
            background: 'green', color: 'black'
          },
        ]
      }
    },
    methods: {
      onClick(a){
        console.log(a)
        this.$message.success('点击')
      },
      filterChange(filters) {
        console.log(filters)
      },
    },
  }
</script>
