<template>
  <!--  点击查询获取参数 -->
  <!-- 

    参数式组件 支持的属性有限
          name: '', // 参数的名称 唯一 内部作为key 和插槽的名字
          title: '', // 组件前的标题
          placeholder: '', // placeholder
          value: '', // value 值 注意 区分是数组和字符串
          type: '',// 要使用的组件名字
          disabled: true
    
    插槽式组件

    可以继承element-ui 的属性和方法
    复杂组件可以使用插槽
    slot： 插槽的名字 和template对应
   -->
  <div>
    <kd-search
      :main-items="mainItems"
      :minor-items="minorItems"
      :formatter="formatterHandle"
      @search="searchHandle"
      @collapse="foldHandle"
    >
      <template #main-select="{ data }">
        <kd-select
          v-model="data.value"
          :options="data.options"
          :title="data.title"
          :width="data.width"
          :disabled="data.disabled"
        ></kd-select>
      </template>
      <template #minor-select-multiple="{ data }">
        <kd-select
          v-model="data.value"
          :options="data.options"
          :title="data.title"
          :width="data.width"
          :multiple="data.multiple"
        ></kd-select>
      </template>
      <template #minor-select="{ data }">
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
  name: 'Index07',
  data() {
    return {
      // 主查询条件
      mainItems: [
        {
          name: 'name', // 参数字段
          queryType: 'eq',
          title: '关键词',
          placeholder: '请输入关键词',
          value: '',
          disabled: false,
          type: 'kd-input',
        },
        {
          name: 'mainSelectVal',
          value: '',
          queryType: 'eq',
          title: '下拉框-单选',
          disabled: false,
          slot: 'main-select',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      ],
      // 次查询条件
      minorItems: [
        {
          name: 'minorSelectVal',
          value: '',
          queryType: 'eq',
          title: '下拉框-单选',
          slot: 'minor-select',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'minorSelectMultipleVal',
          value: [],
          title: '下拉框-多选',
          queryType: 'eq',
          slot: 'minor-select-multiple',
          multiple: true,
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'label',
          title: '输入框',
          placeholder: '请输入',
          value: '',
          queryType: 'eq',
          type: 'kd-input',
        },
        {
          name: 'timerange',
          title: '时间范围',
          placeholder: '请输入',
          value: [],
          queryType: 'eq',
          type: 'kd-date-range',
        },
      ],
      // 格式化参数
      formatter: this.formatterHandle,
    };
  },
  methods: {
    formatterHandle() {
      let mergeItems = [...this.mainItems, ...this.minorItems];
      let queries = mergeItems
        .map((item) => {
          return {
            queryType: item.queryType,
            field: item.name,
            queryData: item.value,
          };
        })
        .filter((item) => {
          return item.queryData.length;
        });
      return queries;
    },
    foldHandle(isFold) {
      // 主查询设置disabled
      this.mainItems = this.mainItems.map((item) => {
        return {
          ...item,
          value: !isFold ? (Array.isArray(item.value) ? [] : '') : item.value,
          disabled: !isFold,
        };
      });

      this.minorItems = this.minorItems.map((item) => {
        return {
          ...item,
          value: isFold ? (Array.isArray(item.value) ? [] : '') : item.value,
        };
      });
    },
    searchHandle(params) {
      console.log(params);

      this.$message.success(JSON.stringify(params));
    },
  },
};
</script>
<style lang="scss" scoped></style>
