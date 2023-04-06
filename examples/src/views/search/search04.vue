<template>
  <!--  兼容旧系统 -->
  <div>
    <!-- 格式化自组建返回的参数 -->
    <kd-search :main-items="mainItems" :formatter="formatter" @search="searchHandle">
      <!-- data === 数组的每一项-->
      <template #main-select="{ data }">
        <!-- 继承el-input的属性和方法 -->
        <kd-select v-model="data.value" :options="data.options" :title="data.title" :width="data.width"></kd-select>
      </template>
      <template #main-select-multiple="{ data }">
        <kd-select
          v-model="data.value"
          :options="data.options"
          :title="data.title"
          :width="data.width"
          :multiple="data.multiple"
        ></kd-select>
      </template>
    </kd-search>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      // 主查询条件
      mainItems: [
        {
          name: 'name', // 参数字段
          title: '关键词',
          placeholder: '请输入关键词',
          value: 'sa',
          disabled: false,
          type: 'kd-input',
        },
        {
          name: 'selectname',
          value: '1',
          title: '下拉框-单选',
          slot: 'main-select',
          width: 180,
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'select-multiple-name',
          value: ['1', '2'],
          title: '下拉框-多选',
          slot: 'main-select-multiple',
          multiple: true,
          width: 300,
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      ],
      // 格式化参数
      formatter: this.formatterHandle,
    };
  },
  mounted() {},
  methods: {
    formatterHandle() {
      return {
        name: 'dasd',
        dataTime: ['aa', 'sdd'],
      };
    },

    searchHandle(params) {
      if (params) {
        // 如果有params是查询 否则是重置
      }
      this.$message.success(JSON.stringify(params));
    },
  },
};
</script>
<style lang="scss" scoped></style>
