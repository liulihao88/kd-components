<template>
  <!--  底部分页吸底'sticky-footer': stickyFooter-->
  <div class="kd-simple-table-wrap" :class="{ 'no-border': !outBorder }">
    <div class="table-inner filter_table">
      <el-table
        ref="kdSimpleTable"
        v-loading="loading"
        class="kd-simple-table"
        size="small"
        :border="$attrs.border === undefined ? true : $attrs.border"
        :header-cell-style="headerCellStyle"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <el-table-column v-if="draggable" v-bind="dragColConf">
          <div class="drag-icon">
            <kd-icon name="kd-icon-move"></kd-icon>
          </div>
        </el-table-column>
        <slot></slot>
        <template slot="empty">
          <slot name="empty">
            <kd-empty></kd-empty>
          </slot>
        </template>
      </el-table>
      <div v-if="showPaging" :style="{ height: footHeight + 'px' }" class="kd-simple-table__page-wrap">
        <slot name="paging">
          <div class="page-inner">
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
    wrapHeight: {
      type: Number,
      default: 0,
    },
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
    fixed: {
      type: Array,
      default: () => {
        return [];
      },
      validate: (value) => {
        const def = ['header', 'footer'];
        return (value[0] && def.includes(value[0])) || (value[1] && def.includes(value[1]));
      },
    },
  },
  data() {
    return {
      headerCellStyle: {
        background: 'var(--table-th-bg)',
        color: 'var(--text-color)',
      },
      sort: null,
      // tableHeight: 400,
      // stickyHeader: false,
      // stickyFooter: false,
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
  watch: {
    // '$attrs.data.length': {
    //   handler() {
    //     this.$nextTick(() => {
    //       this.onResize();
    //     });
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    if (this.draggable) {
      this.$nextTick(() => {
        this.rowDrop();
      });
    }
    // if (this.fixed.length > 0) {
    //   window.addEventListener('resize', this.onResize);
    // }
  },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.onResize);
  // },
  updated() {
    // 为了保证表格组件在flex布局下宽度可以自适应，需要给表格父元素relative，表格本身absolute
    // 这样会造成表格组件高度丢失问题，虽然不影响视觉，但是会不爽，
    // 所以通过js计算表格高度并赋值给父元素，避免高度丢失的问题
    // this.$refs.kdSimpleTable.
    // console.log(this.$el.getBoundingClientRect());
    // const tH = this.$el && this.$el.getBoundingClientRect() && this.$el.getBoundingClientRect().height;
    // // console.log(document.body.clientHeight);
    // const wH = document.body.clientHeight;
    // console.log(tH, wH);
    // if (tH > wH) {
    //   this.tableHeight = wH - this.footHeight;
    // }
    // this.$nextTick(() => {
    //   let bodyHeight = this.$refs.kdSimpleTable.$el.offsetHeight;
    //   if (!this.$attrs.data || this.$attrs.data.length === 0) {
    //     bodyHeight = 231;
    //   }
    //   // this.wrapHeight = this.showPaging ? bodyHeight + this.footHeight : bodyHeight;
    // });
  },
  methods: {
    onResize() {
      // 获取底部分页区域高度、表格真实高度、组件外部容器高度，
      const footH = this.showPaging ? this.footHeight : 0;
      const tableOffsetHeight = this.$refs.kdSimpleTable && this.$refs.kdSimpleTable.$el.getBoundingClientRect().height;
      const wrapH = this.wrapHeight || document.body.clientHeight;
      // console.log(tableOffsetHeight, footH, wrapH);
      // 当容器高度<表格高度+分页区域高度 时，允许开启sticky
      const canSticky = tableOffsetHeight + footH > wrapH;
      // console.log('canSticky', canSticky);
      // 高度不够或者没有配置，则不设置吸顶
      if (!canSticky || this.fixed.length === 0) {
        // this.stickyHeader = false;
        this.tableHeight = '';
        this.stickyFooter = false;
        return;
      }
      if (this.fixed.includes('header')) {
        // this.stickyHeader = true;
        this.tableHeight = wrapH - footH;
      }
      if (this.fixed.includes('footer')) this.stickyFooter = true;
    },
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
