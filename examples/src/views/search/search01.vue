<template>
  <!-- 右侧插槽-->
  <div>
    <kd-search :main-items="mainItems" :formatter="formatter" @collapse="foldHandle" @search="searchHandle">
      <template #right>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">批量删除</el-button>
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
          name: 'query-input',
          title: '关键词',
          placeholder: '请输入关键词',
          value: '',
          // 如果需要继承ele上的属性或者方法 使用slot
          // type 和slot 只能存在一个
          type: 'kd-input',
        },
      ],
      // 格式化参数
      formatter: this.formatterHandle,
    };
  },
  methods: {
    foldHandle(isFold) {
      // 主查询设置disabled
      if (this.mainItems && this.mainItems.length > 0) {
        this.mainItems.foreach((item) => {
          item.disabled = !isFold;
        });
      }

      this.$message.success(isFold);
    },

    formatterHandle() {
      return {
        name: 'dasd',
        dataTime: ['aa', 'sdd'],
      };
    },

    searchHandle(params) {
      this.$message.success(JSON.stringify(params));
    },
  },
};
</script>
