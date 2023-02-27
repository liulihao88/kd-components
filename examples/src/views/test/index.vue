<template>
  <div>
    <kd-filter-table
      ref="tableRef"
      :data="tableData"
      :columns="columnsData"
      :total-num="totalNum"
      :wordSearchFlag="true"
      :searchFlag="true"
      :showSearch="true"
      :echoFilterData="echoFilterData"
      @updatePage="init"
    >
      <template #operation>
        <el-button type="primary" icon="el-icon-plus" @click="newAdd">
          新建
        </el-button>
      </template>
      <template #search="{ search }">
        <kd-input v-model="search.id" title="实例id"></kd-input>
        <kd-input v-model="search.name" title="名称"></kd-input>
      </template>
    </kd-filter-table>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      filteredValue: [],
      filters: [
          {
            value: 'themis',
            text: '离线同步',
          },
          {
            value: 'achilles',
            text: '离线开发',
          }
        ],
      echoFilterData: {
        advancedSearchFlag: false,
        // word: '11',
        search: {
          name: '高启强',
          id: '1',
          word: '11',
        },
        currentPage: 2,
        pageSize: 20,
      },
      totalNum: 100,
      tableData: [
        {
          id: '0',
          name: '曹孟德',
          source: 'themis'
        },
        {
          id: '1',
          name: '刘备',
          source: 'themis'
        },
        {
          id: '2',
          name: '张飞',
          source: 'themis'
        },
        {
          id: '3',
          name: '高启强',
          source: 'themis'
        },
        {
          id: '4',
          name: '高气盛',
          source: 'themis'
        },
        {
          id: '5',
          name: '安心',
          source: 'themis'
        },
        {
          id: '6',
          name: '老莫',
          source: 'themis'
        },
        {
          id: '7',
          name: '鱼',
          source: 'themis'
        },
        {
          id: '8',
          name: '李宏伟',
          source: 'themis'
        },
        {
          id: '9',
          name: '理由天',
          source: 'themis'
        },
        
      ]
    };
  },
  computed: {
    columnsData() {return [
      // {
      //   type: 'selection',
      //   // isShow: this.isSelection,
      // },
      {
        title: '实例ID',
        key: 'id',
        search: true,
        // useSlot: false,
      },
      {
        title: '名称',
        key: 'name',
        search: true
      },
      // {
      //   title: '类型',
      //   key: 'flowJobType',
      //   filters: [],
      //   useSlot: true,
      // },
      {
        title: '来源',
        key: 'source',
        // useSlot: true,
        search: true,
        filters: this.filters,
        filteredValue: this.filteredValue
      },
      // {
      //   title: '运行状态',
      //   key: 'taskStatus',
      //   useSlot: true,
      //   filters: [],
      //   // filteredValue: []
      // },
    ]},
  },
  watch: {},
  created() {
    this.filteredValue.push('achilles');
  },
  mounted() {
    
  },
  methods: {
    init(p) {
      console.log(p);
    },
    newAdd() {}
  },
};
</script>
<style scoped lang="scss"></style>
