<template>
  <el-table-column :prop="prop" v-bind="colAttrs">
    <template slot-scope="scope">
      <component :is="editorType" v-if="noForm" v-model="scope.row[prop]" v-bind="editorAttrs"></component>
      <el-form-item v-else v-bind="formItemAttrs" :key="scope.row[keyField]" :prop="`${tName}.${scope.$index}.${prop}`">
        <component :is="editorType" v-model="scope.row[prop]" v-bind="editorAttrs"></component>
      </el-form-item>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'KdColumnForm',
  props: {
    // 不需要包裹在el-form-item
    noForm: {
      type: Boolean,
      default: false,
    },
    // 字段名，用于column.prop、form-item.prop、内部表单绑定值
    prop: {
      type: String,
      required: true,
    },
    // form中table字段名，用于绑定校验
    tName: {
      type: String,
      default: '',
    },
    // el-table-column的属性，除prop字段
    colAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // el-form-item的属性，除prop字段
    formItemAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 内部表单组件名，需要全局注册的或在本组件中已经支持的
    editorType: {
      type: String,
      default: 'el-input',
    },
    // 内部表单组件属性
    editorAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    keyField: {
      type: String,
      default: 'key',
    },
  },
};
</script>
