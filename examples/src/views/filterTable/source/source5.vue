<template>
  <kd-filter-table
    ref="tableRef"
    :data="taskList"
    :columns="columns"
    :total-num="totalNum"
    :add-show-all-flage="false"
    :table-expand="false"
    :tr-expand="false"
    :search-types="searchTypes"
    search-title="自定义搜索文字"
    placeholder="请输入任务英文名称/任务中文名称/负责人英文名称"
    :word-search-flag="false"
    @updatePage="getTaskList"
  >
    <template #search="{ search }">
      <kd-input v-model="search.nameEn" title="任务英文名称" class="mb"></kd-input>
      <kd-input v-model="search.nameCn" title="任务中文名称" class="mb ml"></kd-input>
      <kd-date-range
        v-model="search.endTime"
        title="最近更新时间"
        prefix-icon="iconfont icon-riqi"
        start-placeholder="请选择"
        end-placeholder="请选择"
        class="w-500 mr mb"
      ></kd-date-range>
    </template>
    <template #operation>
      <div>
        <el-button type="primary" :disabled="false" @click="create()"> 新建 </el-button>
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
export default {
  name: 'Exam1',
  components: {},
  props: {},
  data() {
    return {
      taskList: [],
      columns: [
        {
          title: '任务英文名称',
          key: 'name',
          filter: (val, row) => row.showName,
          handler: (row) => $toast(row),
        },
        {
          title: '负责人',
          key: 'owner',
          useSlot: true,
        },
        {
          title: '状态',
          key: 'status',
          filters: [
            { text: '未上线未上线未上线未上线未上线未上线未上线未上线未上线未上线未上线未上线', value: 'offline' },
            { text: '已上线', value: 'online' },
          ],
        },
        {
          title: '结束时间',
          key: 'endTime',
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
              handler: this.viewLog,
            },
            {
              content: '删除',
              confirmInfo: '哈哈',
              confirm: () => {
                console.log(123);
              },
              // handler: this.viewLog
            },

            {
              content: '恢复',
              disabled: (row) => row.stopOrRecover && row.taskStatus !== 'FAILURE',
              handler: this.recover,
            },
            {
              content: '终止运行',
              disabled: (row) => {
                return row.name === 'name1';
              },
              handler: this.stop,
            },
          ],
        },
      ],
      totalNum: 0,
      searchTypes: {
        name: 'like',
        owner: 'eq',
        endTime: 'between',
      },
    };
  },
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
              status: '已上线',
              owner: 'owner1',
              endTime: '2022-08-02 12:12:00',
            },
            {
              name: 'name2',
              owner: 'owner2',
              status: '未上线',
              showName: 'showName2',
              endTime: '2022-08-02 12:12:00',
            },
          ],
          total: 2,
        },
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
    create() {
      $toast(2);
    },
    stop() {
      $toast(3);
      this.$refs.tableRef.initTableData();
    },
  },
};
</script>
<style scoped lang="scss"></style>
