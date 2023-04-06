<template>
  <div>
    <!-- 参数模式 -->
    <kd-search
      :main-items="mainItems"
      :minor-items="minorItems"
      :formatter="formatter"
      @collapse="foldHandle"
      @search="searchHandle"
    >
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
          name: 'main-1',
          title: '关键词',
          placeholder: '请输入关键词',
          value: 'sa',
          disabled: false,
          type: 'kd-input',
        },
      ],
      // 次查询条件
      minorItems: [
        {
          name: 'minor-1',
          title: '输入框2',
          value: '',
          type: 'kd-select',
        },
      ],
      // 格式化参数
      formatter: this.formatterHandle,
    };
  },
  mounted() {},
  methods: {
    foldHandle(isFold) {
      // 主查询设置disabled
      this.mainItems[0].disabled = !isFold;

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
<style lang="scss" scoped></style>
