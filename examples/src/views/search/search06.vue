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
import { searchMixin } from './search06-mixin';
export default {
  name: 'Index06',
  mixins: [searchMixin],
  methods: {
    searchHandle(params) {
      console.log(params);

      this.$message.success(JSON.stringify(params));
    },
  },
};
</script>
<style lang="scss" scoped></style>
