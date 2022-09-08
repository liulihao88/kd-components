```html
<template>
  <kd-filter-table
    ref="tableRef"
    :data="taskList"
    :columns="columns"
    :totalNum="totalNum"
    :table-expand="false"
    :tr-expand="false"
    :search-types="searchTypes"
    searchTitle="自定义搜索文字"
    placeholder="请输入任务英文名称/任务中文名称/负责人英文名称"
    @updatePage="getTaskList"
  >
    <template #search="{ search }">
      <kd-input v-model="form.name" title="搜索" class="mb" />
    </template>
    <template #operation>
      <div>
        <el-button
          style="background: #ebedf0"
          size="small"
          :disabled="false"
          @click="recover()"
        >
          恢复
        </el-button>
      </div>
    </template>
    <template #owner="{ row, scope }">
      {{ row.owner }}
      {{ scope.row.name }}
      {{ scope.$index }}
    </template>
  </kd-filter-table>
</template>

<script>
import { $toast } from 'utils';
export default {
  name: 'TestTable',
  props: {},
  data() {
    return {
      taskList: [],
      columns: [
        {
          title: '任务英文名称',
          key: 'name',
          filter: (val, row) => row.showName,
          handler: (row) => $toast(row)
        },
        {
          title: '负责人',
          key: 'owner',
          useSlot: true
        },
        {
          title: '结束时间',
          key: 'endTime'
        },
        {
          title: '操作',
          key: 'operation',
          width: 150,
          fixed: 'right',
          align: 'center',
          headerAlign: 'center',
          customHeader: true,
          maxBtns: 2,
          btns: [
            {
              content: '查看日志',
              // disabled: (item) => { return true },
              handler: this.viewLog
            },
            {
              content: '删除',
              confirmInfo: '哈哈',
              confirm: () => {
                console.log(123);
              }
              // handler: this.viewLog
            },

            {
              content: '恢复',
              disabled: (row) =>
                row.stopOrRecover && row.taskStatus !== 'FAILURE',
              handler: this.recover
            },
            {
              content: '终止运行',
              disabled: (row) => {
                return row.name === 'name1';
              },
              handler: this.stop
            }
          ]
        }
      ],
      form: {},
      totalNum: 0,
      searchTypes: {
        name: 'like',
        owner: 'eq',
        endTime: 'between'
      }
    };
  },
  components: {},
  created() {
    this.getTaskList();
  },
  mounted() {},
  methods: {
    getTaskList(search) {
      // const res = await getTaskList(search);
      const res = {
        success: true,
        data: {
          records: [
            {
              name: 'name1',
              showName: 'showName1',
              owner: 'owner1',
              endTime: '2022-08-02 12:12:00'
            },
            {
              name: 'name2',
              owner: 'owner2',
              showName: 'showName2',
              endTime: '2022-08-02 12:12:00'
            }
          ],
          total: 2
        }
      };
      if (res.success) {
        const { records, total } = res.data;
        this.taskList = records;
        this.totalNum = total;
      }
    },
    viewLog() {
      $toast(1);
    },
    recover() {
      $toast(2);
    },
    stop() {
      $toast(3);
      this.$refs.tableRef.initTableData();
    }
  }
};
</script>
<style scoped lang="scss"></style>

```
 ### 属性
 #### 全局属性
 |选项|类型|默认值|说明|
|---|---|---|---|
|data|Array|[]|表格数据|
|columns|Array|[]|列描述数据对象|
|totalNum|Number|0|总条数|
|tableExpand|Boolean|true|允许全表切换是否展示全部内容（不用...显示）|
|trExpand|Boolean|true|允许每行切换是否展示全部内容（不用...显示）|
|searchTypes|Object|{}|筛选规则定义，默认是like：模糊，还有 eq：精确 in：数组 between：日期，比如：{owner: 'eq',endTime:'between'}表示owner列按照精确搜索，endTime列按照between搜索|
|searchTitle|String|搜索关键字|关键字搜索title|
|placeholder|String|请输入|关键字搜索placeholder|
|showSearch|Boolean|true|是否显示头部搜索|
|searchareaWidth|Number|1000|搜索栏宽度|
|wordSearchFlag|Boolean|true|是否支持关键字筛选|
|searchFlag|Boolean|true|是否支持精准筛选|
|pageFlag|Boolean|true|是否包含分页|
|stripe|Boolean|false|是否显示间隔斑马纹|
|border|Boolean|false|是否显示纵向边框|
|showOverflowTooltip|Boolean|true|内容过长时隐藏，鼠标悬浮显示tooltip|
|loading|Boolean|false|表格loading|
|maxHeight|Number|5000|表格最大高度，超出滚动|
|rowKeys|String/Array|''|行数据的key，可以是数组，作为联合key|

#### column属性
|选项|类型|默认值|说明|
|---|---|---|---|
|title|String||列字段名|
|key|String||列名|
|filters|Array|[]|筛选项：eg:[{ text: '未物化', value: false }, { text: '已物化', value: true }]|
|filter|Function||如果要显示的内容不是本列对应的字段值，可使用filter返回真正要显示的内容，eg:filter: (val, row) => row.showName|
|useSlot|Boolean|false|如果某列显示逻辑复杂，可以使用插槽实现。|
|render|Function||如果某列显示逻辑复杂，也可以使用render函数实现。|
|width|Number||列宽度|
|minWidth|Number||列最小宽度|
|fixed|String/Boolean|false|'right' 右侧固定, true 默认左侧固定|
|sortable|Boolean|false|是否可排序|
|headerAlign|String|left|el-table原生属性|
|align|String|left|el-table原生属性|
|type|String|''|el-table原生属性，可以配置index selection等|
|tooltipFlag|Boolean|false|是否显示自带的tooltip，可以配合useSlot或render函数设置本列自己的tooltip|
|handler|Function||本列点击事件函数，配置后，本列内容自动加上链接样式|
|maxBtns|Number|2|只能配置在操作那一列，最多显示几个操作按钮，超出此个数需要点击...才能看到更多按钮|
|isTxtButton|Boolean|true|true：表示使用文字按钮 false：表示使用icon按钮|
|popoverTitle|String|'删除'|点击按钮需要弹出确认弹框时，指定弹框的标题|
|confirmInfo|String|''|有的按钮点击后有确认信息提示，确认框点击后确认后才执行handler|
|filterPlacement|String|'bottom-end'|el-column原生属性|
|filterMethod|Function|\|el-column原生属性|
|headerSlot|String|''|表头自定义插槽|
|headerTooltipText|String|''|移入表头文字提示|
|filteredValue|String|''|el-column原生属性|
|isShow|Boolean|true|列是否显示|
<!-- selectableFn -->

### 事件
|事件名称|说明|回调参数|
|---|---|---|
|updatePage|请求表格数据|无|

### 方法（ref调用）
|方法名称|说明|参数|
|---|---|---|
|clearSelection|清空表格选中项|无|
|refreshTableData|刷新表格，不改变筛选条件和分页|无|
|initTableData|初始化表格数据|无|

### slot
|名称|说明|参数|
|---|---|---|
|operation|操作按钮|无|
|search|筛选项|search对象|
|searchSpread|？？|search对象|
|tableInsert|表格和搜索框中间的插槽|无|
|pageleft|分页左边的位置插槽|无|