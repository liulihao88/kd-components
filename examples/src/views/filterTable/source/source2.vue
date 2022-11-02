<template>
  <kd-filter-table
    ref="tableRef"
    :data="taskList"
    :columns="columns"
    :total-num="totalNum"
    :table-expand="false"
    :tr-expand="false"
    :show-search="false"
    :search-flag="false"
    :page-flag="false"
    @updatePage="getTaskList"
  >
  </kd-filter-table>
</template>

<script>
export default {
  name: 'Exam2',
  components: {},
  props: {},
  data() {
    return {
      taskList: [],
      columns: [
        {
          title: '任务英文名称',
          key: 'name',
        },
        {
          title: '负责人',
          key: 'owner',
        },
        {
          title: '状态',
          key: 'status',
        },
        {
          title: '结束时间',
          key: 'endTime',
        },
      ],
      totalNum: 0,
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
  },
};
</script>
<style scoped lang="scss"></style>
