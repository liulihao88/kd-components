<template>
  <div class="box">
    <el-form
      ref="formRef"
      :model="form"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="名称222" prop="name">
        <br />
        <kd-select
          v-model="aa"
          :options="options"
          style="--width: 100px"
          width="100"
        />
        <kd-select
          v-model="aa"
          :options="options"
          width="200px"
          popper-class="cc"
        />
      </el-form-item>
    </el-form>
    <div>下面的不在form中</div>
    <kd-select v-model="aa" :options="options" block />
    <kd-select v-model="aa" :options="options" width="600" />
    <div>hah a</div>
    <kd-input v-model="aa" width="100%"></kd-input>
    <kd-select v-model="aa" :options="options" />
    <kd-select v-model="aa" :options="options" width="316" />

    <kd-filter-table ref="tableRef" :data="tableData" :columns="columnsData">
      <template #status="{ row }">
        <kd-select v-model="aa" :options="options" width="700" />
      </template>
    </kd-filter-table>
  </div>
</template>

<script>
export default {
  name: "Test2",
  components: {},
  props: {},
  data() {
    return {
      tableData: [{ name: "andy", status: 1 }],
      options: [
        { label: "小泽泽", value: 18 },
        { label: "小悦悦", value: 19 },
        { label: "小鑫鑫", value: 20 }
      ],
      aa: 18,
      form: {
        name: "aa"
      }
    };
  },
  computed: {
    columnsData() {
      return [
        {
          type: "selection",
          selectableFn: (row, index) => {
            return index % 2 === 0;
          }
        },
        {
          title: "任务英文名称",
          key: "name",
          filters: [
            { text: "是", value: 1 },
            { text: "否", value: 0 }
          ],
          handler: this.deleteRow
        },
        {
          title: "任务状态",
          key: "status",
          useSlot: true
        },
        {
          key: "operation",
          title: "操作",
          btns: [
            {
              content: "编辑",
              disabled: (item) => {
                return this.mDisabled("UPDATE", item) || item.status === "on";
              },
              handler: this.deleteRow
            },
            {
              content: "删除",
              disabled: (item) => {
                return this.mDisabled("DELETE", item) || item.status === "on";
              },
              confirm: this.deleteRow,
              confirmInfo: "您确定要删除此文件嘛? "
            }
          ]
        }
      ];
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    deleteRow() {
      console.log("deleteRow");
    }
  }
};
</script>
<style scoped lang="scss">
.cc {
  width: 100px !important;
}
</style>
