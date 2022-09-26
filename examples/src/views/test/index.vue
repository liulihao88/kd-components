<template>
  <div>
    <kd-filter-table
      ref="tableRef"
      :data="tableData"
      :columns="columnsData"
      :totalNum="totalNum"
      @selection-change="selectionChange"
      @toReset="toReset"
      @toClear="toClear"
      @updatePage="init"
    >
      <template #operation>
        <el-button type="info" @click="deleteBtn">{{ deleteTxt }}</el-button>
      </template>
      <template #search="{ search }">
        <kd-input
          v-model="form.name"
          title="任务英文名称"
          class="mr mb"
          width="220"
        ></kd-input>
        <kd-input
          v-model="form.nameCn"
          title="任务中文名称"
          class="mr mb"
          width="220"
        ></kd-input>
      </template>
    </kd-filter-table>
  </div>
</template>

<script>
/**
* @描述
showSearch: 是否显示头部
wordSearchFlag: 是否支持关键字筛选
pageFlag: 显示pagenation
rowKeys: 选择selection时候无id需要其他参数做唯一值
searchareaWidth: 搜索宽度
searchFlag: 是否显示高级搜索
searchTitle： 搜索关键字
isShow: 列是否显示
方法: 
clearSelection: 清空表格选中项
*/
export default {
  name: 'T1',
  props: {},
  data() {
    return {
      tableData: [
        { name: '   ', status: 1 },
        { name: undefined, status: 3 },
        { name: ' ', status: ' ' },
        { name: [], status: [] },
        { name: null, status: {} },
        { name: {}, status: {} }
      ],
      totalNum: 0,
      selectArr: [],
      form: {}
    };
  },
  components: {},
  computed: {
    deleteTxt() {
      let selectTxt =
        this.selectArr.length === 0 ? '' : `(${this.selectArr.length})`;
      return `删除${selectTxt}`;
    },
    columnsData() {
      return [
        {
          type: 'selection',
          selectableFn: (row, index) => {
            return index % 2 === 0;
          }
        },
        {
          title: '任务英文名称',
          key: 'name',
          filters: [
            { text: '是', value: 1 },
            { text: '否', value: 0 }
          ]
        },
        {
          title: '任务状态',
          key: 'status'
        },
        {
          key: 'operation',
          title: '操作',
          btns: [
            {
              content: '编辑',
              disabled: (item) => {
                return this.mDisabled('UPDATE', item) || item.status === 'on';
              }
            },
            {
              content: '删除',
              disabled: (item) => {
                return this.mDisabled('DELETE', item) || item.status === 'on';
              },
              confirm: this.deleteRow,
              confirmInfo: '您确定要删除此文件嘛? '
            }
          ]
        }
      ];
    }
  },
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    toSearch() {
      console.log('toSearch');
    },
    toClear() {
      console.log('toClear');
    },
    toReset() {
      console.log('toReset');
    },
    deleteBtn() {},
    init() {
      console.log(`***** init  132行 examples/src/views/test/index.vue  22:51:26`);
      
      this.totalNum = this.tableData.length;
    },
    deleteRow(row) {
      console.log(JSON.stringify(row, null, '\t'));
    },
    selectionChange(val) {
      this.selectArr = val;
    }
  }
};
</script>
<style scoped lang="scss"></style>
