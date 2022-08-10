```vue 
 
<template>
  <kd-filter-table
    ref="tableRef"
    :data="taskList"
    :columns="columns"
    :totalNum="totalNum"
    :table-expand="false"
    :tr-expand="false"
    :search-types="searchTypes"
    placeholder="请输入任务英文名称/任务中文名称/负责人英文名称"
    @updatePage="getTaskList"
  >
    <template #search="{ search }">
    
    </template>
    <template #operation>
      <div>
          <el-button
            style="background: #ebedf0;"
            size="small"
            class="mb"
            :disabled="false"
            @click="recover()"
          >
          恢复
          </el-button>
      </div>
    </template>
  </kd-filter-table>
</template>

<script>
export default {
  name: "TestTable",
  props: {

  },
  data() {
    return {
      taskList: [],
      columns: [
        {
          title: "任务英文名称",
          key: "name",
        },
        {
          title: "负责人",
          key: "owner",
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
          btns: [
            {
              content: '查看日志',
              // disabled: (item) => { return true },
              handler: this.viewLog
            },
            {
              content: '恢复',
              disabled: (row) => row.stopOrRecover && row.taskStatus !== 'FAILURE',
              handler: this.recover,
            },
            {
              content: '终止运行',
              disabled: (row) => row.taskStatus === 'WAITING' || row.taskStatus === 'RUNNING',
              handler: this.stop
            }
          ],
        }
      ],
      totalNum: 0,
      searchTypes: {
        name: 'like',
        owner: 'eq',
        endTime: 'between',
      }
    }
  },
  components: {
  
  },
  created() {
    this.getTaskList();
  },
  mounted() {

  },
  methods: {
    getTaskList(search) {
      // const res = await getTaskList(search);
      const res = {
        success: true,
        data: {
          records: [
            {
              name: 'name1',
              owner: 'owner1',
              endTime: '2022-08-02 12:12:00'
            },
            {
              name: 'name2',
              owner: 'owner2',
              endTime: '2022-08-02 12:12:00'
            }
          ],
          total: 2
        }
      }
      if (res.success) {
        const { records, total } = res.data
        this.taskList = records
        this.totalNum = total
      }
    },
    viewLog() {
      alert(1)
    },
    recover() {
      alert(2)
    },
    stop() {
      this.$refs.tableRef.initTableData()
      alert(3)
    }
  }
};
</script>
<style scoped lang='scss'>
  
</style>

 ```