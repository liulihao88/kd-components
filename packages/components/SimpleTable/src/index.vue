<template>
  <div class="kd-simple-table-wrap" :class="{ 'no-border': !outBorder }">
    <div class="table-inner filter_table">
      <el-table
        ref="kdSimpleTable"
        v-loading="loading"
        class="kd-simple-table"
        width="90%"
        size="small"
        :border="$attrs.border === undefined ? true : $attrs.border"
        :header-cell-style="headerCellStyle"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <el-table-column v-if="draggable" v-bind="dragColConf">
          <div class="drag-icon">
            <kd-icon class="kd-icon-move"></kd-icon>
          </div>
        </el-table-column>
        <slot></slot>
        <template slot="empty">
          <slot name="empty">
            <kd-empty></kd-empty>
          </slot>
        </template>
      </el-table>
      <div v-if="showPaging" :style="{ height: footHeight + 'px' }">
        <slot name="paging">
          <div class="page-wrap">
            <div class="left-text">
              共
              <span class="m-lr-5">{{ pagingConf.total }}</span>
              项数据
            </div>
            <el-pagination
              class="tab_pagination"
              v-bind="pagingConf"
              @size-change="pageChange('pageSize', $event)"
              @current-change="pageChange('currentPage', $event)"
            ></el-pagination>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: 'KdSimpleTable',
  props: {
    outBorder: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showPaging: {
      type: Boolean,
      default: true,
    },
    pagingAttrs: {
      type: Object,
      default: () => {
        return {
          // pageSize: 10,
          // currentPage: 1,
          // total: 0
        };
      },
    },
    // preColType: {
    //   type: String,
    //   default: '',
    //   validator: function (value) {
    //     if (value) {
    //       return ['selection', 'index'].includes(value);
    //     }
    //     return true;
    //   },
    // },
    // preColConf: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       width: '50px',
    //     };
    //   },
    // },
    // 可拖拽行
    draggable: {
      type: Boolean,
      default: false,
    },
    dragColConf: {
      type: Object,
      default: () => {
        return {
          width: '50px',
        };
      },
    },
    footHeight: {
      type: Number,
      default: 64,
    },
  },
  data() {
    return {
      headerCellStyle: {
        background: 'var(--table-th-bg)',
        color: 'var(--text-color)',
      },
      // wrapHeight: null,
      sort: null,
    };
  },
  computed: {
    pagingConf() {
      return Object.assign(
        {
          pageSizes: [10, 20, 30, 40],
          background: true,
          layout: 'prev, pager, next, sizes, jumper',
          total: 0,
        },
        this.pagingAttrs
      );
    },
  },
  mounted() {
    if (this.draggable) {
      this.$nextTick(() => {
        this.rowDrop();
      });
    }
  },
  updated() {
    // 为了保证表格组件在flex布局下宽度可以自适应，需要给表格父元素relative，表格本身absolute
    // 这样会造成表格组件高度丢失问题，虽然不影响视觉，但是会不爽，
    // 所以通过js计算表格高度并赋值给父元素，避免高度丢失的问题
    // this.$refs.kdSimpleTable.
    // console.log(this.$el.getBoundingClientRect().height);
    // this.$nextTick(() => {
    //   let bodyHeight = this.$refs.kdSimpleTable.$el.offsetHeight;
    //   if (!this.$attrs.data || this.$attrs.data.length === 0) {
    //     bodyHeight = 231;
    //   }
    //   // this.wrapHeight = this.showPaging ? bodyHeight + this.footHeight : bodyHeight;
    // });
  },
  methods: {
    // 表格嵌套时，如果column上有fixed属性，则有可能出现两个table，用这种方法进行解决
    // @hook:mounted="tableMounted
    // tableMounted() {
    //   let dom = this.$el.querySelectorAll('.kd-simple-table');
    //   // console.log(dom);
    //   if (dom.length === 2) {
    //     dom[1].remove();
    //   }
    // },
    // expandChange() {
    //   console.log('expandChange');
    //   console.log(this.$el.offsetHeight);
    //   // console.log(this.$el.getBoundingClientRect().height);
    // },
    // 分页组件页码、每页数量变量时
    pageChange(type, e) {
      this.$emit('pageChange', { [type]: e });
    },
    // 动态切换列数据时，需要调用该方法，避免表格在切换过程中布局异常
    doLayout() {
      this.$nextTick(() => {
        this.$refs.kdSimpleTable.doLayout();
      });
    },
    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector('.kd-simple-table .el-table__body-wrapper tbody');
      const _this = this;
      Sortable.create(tbody, {
        ghostClass: 'ghost-drag-table',
        handle: '.drag-icon',
        onEnd({ newIndex, oldIndex }) {
          [_this.$attrs.data[newIndex], _this.$attrs.data[oldIndex]] = [
            _this.$attrs.data[oldIndex],
            _this.$attrs.data[newIndex],
          ];
          _this.$emit('onSort', _this.$attrs.data);
        },
      });
    },
  },
};
</script>
