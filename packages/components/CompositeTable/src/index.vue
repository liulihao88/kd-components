<template>
  <div>
    <kd-auto-search v-bind="searchConfig">
      <template slot="right"></template>
    </kd-auto-search>
    <kd-simple-table :data="tableData" v-bind="tableAttrs"></kd-simple-table>
  </div>
</template>

<script>
export default {
  name: 'KdCompositeTable',
  props: {
    searchConfig: {
      type: Object,
      default: () => {
        return {
          // oldModel: false,
          // foldText: '33',
          // unFoldText: '',
          // formArr: [],
        };
      },
    },
    searchButtons: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableAttrs: {
      type: Object,
      default: () => {
        return {
          wrapHeight: 0,
          outBorder: true,
          loading: false,
          showPaging: true,
          pagingAttrs: {
            // pageSize: 10,
            // currentPage: 1,
            // total: 0
          },
          draggable: false,
          dragColConf: '50px',
          footHeight: 64,
        };
      },
    },
    tableColumns: {
      type: Array,
      default: () => {
        return [
          {
            type: '',
          },
        ];
      },
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style scoped lang="scss"></style>
