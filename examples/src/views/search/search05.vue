<template>
  <!--  点击查询获取参数 -->
  <!-- 

    参数式组件 支持的属性有限
          name: '', // 参数的名称 唯一 内部作为key 和插槽的名字
          title: '', // 组件前的标题
          placeholder: '', // placeholder
          value: '', // value 值 注意 区分是数组和字符串
          type: '',// 要使用的组件名字
    
    插槽式组件

    可以继承element-ui 的属性和方法
    复杂组件可以使用插槽
    slot： 插槽的名字 和template对应
   -->
  <div>
    <kd-search :main-items="mainItems" :minor-items="minorItems" :formatter="formatter" @search="searchHandle">
      <!-- data === 数组的每一项-->
      <template #main-select="{ data }">
        <!-- 继承el-input的属性和方法 -->
        <kd-select v-model="data.value" :options="data.options" :title="data.title" :width="data.width"></kd-select>
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
  name: 'Index',
  data() {
    return {
      // 主查询条件
      mainItems: [
        {
          name: 'name', // 参数字段
          title: '关键词',
          placeholder: '请输入关键词',
          value: '',
          disabled: false,
          type: 'kd-input',
        },
      ],
      // 次查询条件
      minorItems: [
        {
          name: 'minor-select',
          value: '1',
          title: '下拉框-单选',
          slot: 'minor-select',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'minor-select-multiple',
          value: ['1', '2'],
          title: '下拉框-多选',
          slot: 'minor-select-multiple',
          multiple: true,
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
        {
          name: 'minor-1',
          title: '输入框',
          placeholder: '请输入',
          value: '',
          type: 'kd-input',
        },
        {
          name: 'minor-2',
          title: '时间范围',
          placeholder: '请输入',
          value: [],
          type: 'kd-date-range',
        },
      ],
      // 格式化参数
      formatter: this.formatterHandle,
    };
  },
  mounted() {},
  methods: {
    formatterHandle() {
      let params = {};
      this.mainItems.forEach((item) => {
        params[item.key] = item.value;
      });

      this.minorItems.forEach((item) => {
        params[item.key] = item.value;
      });
      return params;
    },

    searchHandle(params) {
      if (params) {
        // 如果有params是查询 否则是重置
        console.log(params);
      }
      this.$message.success(JSON.stringify(params));
    },
  },
};
</script>
<style lang="scss" scoped></style>
