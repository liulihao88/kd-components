<template>
  <div>
    <!-- 格式化返回的参数 -->
    <kd-search
      :main-items="mainItems"
      :minor-items="minorItems"
      :formatter="formatter"
      @collapse="foldHandle"
      @search="searchHandle"
    >
      <!-- data === 数组的每一项-->
      <!-- <template #main-input="{ data }"> -->
      <!-- 继承el-input的属性和方法 -->
      <!-- <kd-input v-model="data.value" :disabled="data.disabled"></kd-input> -->
      <!-- </template> -->
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
          value: 'sa',
          disabled: false,
          // 如果需要继承ele上的属性或者方法 使用slot
          type: 'kd-input', // type 和slot 只能存在一个  type优先级高
          // slot: 'main-input',
        },
      ],
      // 次查询条件
      minorItems: [
        {
          name: 'minor-0',
          title: '下拉框',
          value: '',
          type: 'kd-select',
        },
        {
          name: 'minor-1',
          title: '输入框',
          value: '',
          type: 'kd-input',
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
      // 当是收起的时候 次要查询项需要重置条件
      if (isFold) {
        this.minorItems.forEach((item) => {
          if (Array.isArray(item.value)) {
            item.value = [];
          } else if (typeof item.value === 'string') {
            item.value = '';
          }
        });
      } else {
        this.mainItems.forEach((item) => {
          if (Array.isArray(item.value)) {
            item.value = [];
          } else if (typeof item.value === 'string') {
            item.value = '';
          }
        });
      }

      this.$message.success(`${isFold ? '收起' : '下拉'}`);
    },

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
