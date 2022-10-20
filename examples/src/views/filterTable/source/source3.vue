<template>
  <kd-filter-table
    ref="tableRef"
    :data="tableData"
    :columns="columnsData"
    :total-num="totalNum"
    :searcharea-width="800"
    :open-search-flag="true"
    placeholder="请输入任务名称/负责人"
    :search-types="searchTypes"
    @updatePage="updatePage"
    @selection-change="selectionChange"
  >
    <template #search="{ search }">
      <kd-input v-model="search.nameEn" title="任务英文名称" class="mb" />
      <kd-input v-model="search.nameCn" title="任务中文名称" class="mb ml" />
      <kd-date-range
        v-model="search.modifyTime"
        title="最近更新时间"
        prefix-icon="iconfont icon-riqi"
        start-placeholder="请选择"
        end-placeholder="请选择"
        class="w-500 mr mb"
      />
    </template>
    <template #operation>
      <div class="right_btn">
        <kd-popover-button
          class="m-r-8"
          :disabled="delsDisable"
          :content-text="'是否确认要批量删除任务？'"
          :reference-text="mMerge('删除', checkoutList)"
          :referenceBtnAttrs="{style: 'background: #ebedf0;'}"
          @confirm="batchDeleteRows"
          @cancel="onCancel"
        ></kd-popover-button>
        <kd-popover-button
          class="m-r-8"
          :disabled="pausDisable"
          :content-text="'是否确认要批量暂停任务？'"
          :reference-text="mMerge('暂停', checkoutList)"
          :popoverAttrs="{title: '批量暂停'}"
          :referenceBtnAttrs="{style: 'background: #ebedf0;'}"
          :loading-confirm="true"
          :confirm-text="stopLoading? '加载中': '确定'"
          @confirm="batchStopRows"
          @cancel="onCancel"
        ></kd-popover-button>
        <kd-popover-button
          class="m-r-8"
          :disabled="offsDisable"
          :content-text="'是否确认要批量下线任务？'"
          :reference-text="mMerge('下线', checkoutList)"
          :popoverAttrs="{title: '批量下线'}"
          :referenceBtnAttrs="{type: 'primary'}"
          @confirm="batchOfflineRows"
          @cancel="onCancel"
        ></kd-popover-button>
      </div>
    </template>
    <template #status="{ row }">
      <span
        class="table_tag"
        :style="{
          color: statusColor[row.status].color,
          background: statusColor[row.status].bgColor
        }"
      >
        {{ STATUS_MAP[row.status] }}
      </span>
    </template>
  </kd-filter-table>
</template>

<script>
const STATUS_LIST = [
  { text: "未启动", value: "UNSTART" },
  { text: "已下线", value: "OFFLINE" },
  { text: "已暂停", value: "PAUSED" },
  { text: "异常停止", value: "FAILED" },
  { text: "运行中", value: "RUNNING" },
  { text: "启动中", value: "STARTING" },
  { text: "暂停中", value: "STOPPING" }
]
const STATUS_MAP = {
  "UNSTART": "未启动",
  "OFFLINE": "已下线",
  "PAUSED": "已暂停",
  "FAILED": "异常停止",
  "RUNNING": "运行中",
  "STARTING": "启动中",
  "STOPPING": "暂停中"
}
const STATUS_COLOR = {
  RUNNING: {
    color: '#30BD81',
    bgColor: '#e0f5ed',
  },
  STARTING: {
    color: '#30BD81',
    bgColor: '#e0f5ed',
  },
  OFFLINE: {
    color: 'rgba(39,48,75,0.65)',
    bgColor: '#e9eaed',
  },
  UNSTART: {
    color: 'rgba(39,48,75,0.65)',
    bgColor: '#e9eaed',
  },
  PAUSED: {
    color: '#FFB51F',
    bgColor: 'rgba(255,181,31,0.15)',
  },
  STOPPING: {
    color: '#FFB51F',
    bgColor: 'rgba(255,181,31,0.15)',
  },
  FAILED: {
    color: '#E94C35',
    bgColor: 'rgba(233,76,53,0.12)',
  }
}
export default {
  name: "Exam1",
  props: {

  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 表格多选选中的数据
      checkoutList: [],
      // 表格配置信息
      columnsData: [
        { title: "", key: "selection", type: "selection" },
        { title: "任务英文名称", key: "nameEn", handler: this.detailHandler, width: '160px' },
        { title: "任务中文名称", key: "nameCn", width: '160px' },
        {
          title: "状态",
          key: "status",
          filters: STATUS_LIST,
          useSlot: true
        },
        { title: "开始运行", key: "startTime", width: '160px' },
        { title: "结束运行", key: "endTime", width: '160px' },
        { title: "运行时长", key: "range", width: '120px', render: (h, params) => {
          if (params.row.runTime) {
            const secs = Math.floor(parseInt(params.row.runTime)/1000);
            let rst = '';
            if (secs < 60) {
              rst = `${secs}秒`;
            } else if (secs >= 60 && secs < 3600) {
              rst = `${Math.floor(secs/60)}分${secs%60}秒`;
            } else {
              rst = `${Math.floor(secs/3600)}时${Math.floor(secs%3600/60)}分${secs%3600%60}秒`;
            }
            return h('span', {}, rst);
          } else {
            return h('span', {}, '');
          }
        } },
        {
          title: "任务类型",
          key: "realComputationType"
        },
        { title: "任务版本", key: "version", render: (h, params) => h('span', {}, `v${params.row.version}`) },
        { 
          title: "负责人", 
          key: "owner", 
          width: '160px', 
          render: (h, params) => h('span', {}, params.row.principals.map(own => `${own.username}(${own.realName})`).join(', ')) 
        },
        { title: "更新时间", key: "modifyTime", width: '160px' },
        { title: "操作人", key: "operator", width: '160px' },
        {
          key: "operation",
          title: "操作",
          fixed: "right",
          maxBtns: 3,
          width: '140px',
          btns: [
            {
              content: "启动",
              isShow: (row) => {
                return row.status !== 'RUNNING';
              },
              disabled: (row) => {
                return row.status !== 'UNSTART' && row.status !== 'PAUSED' && row.status !== 'FAILED';
              },
              handler: this.startRow
            },
            {
              content: "暂停",
              isShow: (row) => {
                return row.status === 'RUNNING';
              },
              popoverTitle: '暂停',
              confirmInfo: '是否确认暂停此任务？',
              confirm: this.stopRow
            },
            {
              content: "查看日志",
              handler: this.logRow,
              disabled: (row) => row.status === 'UNSTART',
            },
            {
              content: "监控",
              handler: this.monitorRow,
              disabled: (row) => {
                return row.status !== 'RUNNING';
              }
            },
            {
              content: "下线",
              popoverTitle: '下线',
              confirmInfo: '是否确认下线此任务？',
              confirm: this.offlineRow,
              disabled: (row) => {
                return row.status !== 'PAUSED' && row.status !== 'FAILED' && row.status !== 'UNSTART';
              }
            },
            {
              content: "删除",
              popoverTitle: '删除',
              confirmInfo: '是否确认删除此任务？',
              confirm: this.deleteRow,
              disabled: (row) => {
                return row.status !== 'OFFLINE';
              }
            }
          ]
        }
      ],
      totalNum: 0, //总条数
      searchTypes: {
        id: "eq",
        owner: "eq",
        operator: "eq",
        startTime: "between",
        endTime: "between",
        modifyTime: "between",
        status: 'in'
      },
      STATUS_MAP: STATUS_MAP,
      statusColor: STATUS_COLOR,
      stopLoading: false,
    };
  },
  computed: {
    delsDisable() {
      const flag = this.checkoutList.some(one => one.status !== 'OFFLINE');
      return !this.checkoutList.length || flag
    },
    pausDisable() {
      const flag = this.checkoutList.some(one => one.status !== 'RUNNING');
      return !this.checkoutList.length || flag
    },
    offsDisable() {
      const flag = this.checkoutList.some(one => one.status !== 'PAUSED' && one.status !== 'FAILED' && one.status !== 'UNSTART');
      return !this.checkoutList.length || flag
    }
  },
  components: {
  
  },
  created() {
    this.updatePage();
  },
  mounted() {

  },
  methods: {
    updatePage(search) {
      // const res = await getTaskList(search);
      const res = {
        success: true,
        data: {
          records: [ {
            "id" : "1567764951571890210",
            "modifyTime" : "2022-10-18 16:11:05",
            "modifier" : "admin",
            "createTime" : "2022-10-18 16:11:03",
            "creator" : "admin",
            "permissionTypes" : [ "create", "del", "edit", "config" ],
            "projectId" : "1542114681269780487",
            "nameEn" : "sq1",
            "nameCn" : "sql任务1",
            "realComputationType" : "FLINK_SQL",
            "status" : "UNSTART",
            "startTime" : null,
            "endTime" : null,
            "runTime" : null,
            "operator" : null,
            "version" : "2",
            "owner" : "admin,",
            "applicationId" : null,
            "monitorUrl" : null,
            "principals" : [ {
              "username" : "admin",
              "realName" : "管理员"
            } ],
            "jarResourceId" : "1574652013751304262"
          }, 
          {
            "id" : "1567764951571890212",
            "modifyTime" : "2022-10-18 16:11:05",
            "modifier" : "admin",
            "createTime" : "2022-10-18 16:11:03",
            "creator" : "admin",
            "permissionTypes" : [ "create", "del", "edit", "config" ],
            "projectId" : "1542114681269780487",
            "nameEn" : "sq2",
            "nameCn" : "sql任务2",
            "realComputationType" : "FLINK_SQL",
            "status" : "RUNNING",
            "startTime" : null,
            "endTime" : null,
            "runTime" : null,
            "operator" : null,
            "version" : "2",
            "owner" : "admin,",
            "applicationId" : null,
            "monitorUrl" : null,
            "principals" : [ {
              "username" : "admin",
              "realName" : "管理员"
            } ],
            "jarResourceId" : "1574652013751304262"
          } ],
          total: 2
        }
      };
      if (res.success) {
        const { records, total } = res.data;
        this.tableData = records;
        this.totalNum = total;
      }
    },
    refreshPage() {
      this.$refs.tableRef.refreshTableData();
    },
    // 表格多选
    selectionChange(val) {
      this.checkoutList = val;
    },
    onCancel() {
      // alert('取消操作')
    },
    // 批量删除
    async batchDeleteRows() {
      // const ids = this.checkoutList.map(it => it.id)
    },
    async batchOfflineRows() {
      // const ids = this.checkoutList.map(it => it.id)
    },
    async batchStopRows() {
      // const ids = this.checkoutList.map(it => it.id)
    },
    // 启动
    startRow(row) {
      this.$message({
        type: 'info',
        message: row
      });
    },
    // 日志
    logRow(row) {
      // this.$refs.logRef.showDialog(row);
    },
    // 监控
    monitorRow(row) {
      this.$message({
        type: 'info',
        message: row
      });
    },
    // 下线
    offlineRow(row) {
      this.$message({
        type: 'info',
        message: row
      });
    },
    // 暂停
    stopRow(row) {
      this.$message({
        type: 'info',
        message: row
      });
    },
    // 删除
    async deleteRow(row) {
      this.$message({
        type: 'info',
        message: row
      });
    },
  }
};
</script>
<style scoped lang='scss'>
.table_tag{
  padding:2px 4px;
}
</style>
