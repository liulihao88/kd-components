<template>
  <div
    class="filter_table"
    :class="{'showall': showallFlag}"
  >
    <!-- showSearch为false不显示头部搜索 -->
    <template v-if="showSearch">
      <!-- 关键词搜索，默认显示一个输入框，模糊查询 -->
      <template v-if="wordSearchFlag">
        <div class="top_wrapper mb">
          <div
            ref="searchAreaComp"
            class="searcharea"
            :style="{width: searchareaWidth + 'px'}"
            :class="{'filter_active': advancedSearchFlag}"
          >
            <slot />

            <div class="searchopers f mt">
              <el-input
                v-model="search.word"
                class="w-500"
                size="small"
                :placeholder="placeholder"
                :disabled="advancedSearchFlag"
                @keyup.enter.native="toSearch"
              >
                <div slot="prepend">
                  {{ searchTitle }}
                </div>
              </el-input>
              <!-- :disabled="mDisabled('LOAD')" -->
              <el-button
                type="primary"
                class="ml"
                size="small"
                @click="toSearch"
              >
                查询
              </el-button>
              <!-- :disabled="mDisabled('LOAD')" -->
              <el-button
                size="small"
                @click="toReset"
              >
                重置
              </el-button>
              <el-button
                v-if="searchFlag && expandExistFlag"
                type="text"
                size="small"
                class="expandbtn"
                @click="toggleMoreSearch"
              >
                <i :class="{'foldsearch el-icon-arrow-up': advancedSearchFlag, 'el-icon-arrow-down': !advancedSearchFlag}" />
                {{ !advancedSearchFlag? '高级搜索': '收起' }}
              </el-button>
            </div>
          </div>
          <div class="operations mt">
            <slot name="operation" />
          </div>
        </div>
        <div
          v-if="advancedSearchFlag"
          ref="searchBoxRef"
          class="f"
          style="flex-wrap: wrap"
        >
          <slot
            name="search"
            :search="search"
            :disabled="!advancedSearchFlag"
          />
        </div>
      </template>
      <!-- 自定义搜索框 -->
      <template v-else>
        <div class="top_wrapper">
          <div
            ref="searchAreaComp"
            class="searcharea aloneSearcharea"
            :style="{width: searchareaWidth + 'px'}"
            :class="{'filter_active': advancedSearchFlag}"
          >
            <slot />
            <div class="searchopers search_btn mt">
              <div
                ref="searchBoxRef"
                class="f"
                style="flex-wrap: wrap"
              >
                <slot
                  name="search"
                  :search="search"
                  :disabled="!advancedSearchFlag"
                />
              </div>
              <!-- :disabled="mDisabled('LOAD')" -->
              <el-button
                type="primary"
                class="ml"
                size="small"
                @click="toSearch"
              >
                查询
              </el-button>
              <!-- :disabled="mDisabled('LOAD')" -->
              <el-button
                size="small"
                @click="toReset"
              >
                重置
              </el-button>
              <el-button
                v-if="openSearchFlag"
                type="text"
                size="small"
                class="expandbtn"
                @click="toggleMoreSearch"
              >
                <i :class="{'foldsearch el-icon-arrow-up': advancedSearchFlag, 'el-icon-arrow-down': !advancedSearchFlag}" />
                {{ !advancedSearchFlag? '展开': '收起' }}
              </el-button>
            </div>
          </div>
          <div class="operations mt">
            <slot name="operation" />
          </div>
        </div>
        <div>
          <slot
            v-if="advancedSearchFlag"
            name="searchSpread"
            :search="search"
          />
        </div>
      </template>
    </template>
    <!-- 表格和搜索框中间的插槽 -->
    <template>
      <slot name="tableInsert" />
    </template>
    <!-- :row-key="(row) => row.id || ''" -->
    <div class="tablewraper">
      <el-table
        ref="kTable"
        v-loading="loading"
        v-bind="$attrs"
        size="mini"
        style="width:100%;"
        :data="tableData"
        :row-key="rowKey"
        :stripe="stripe"
        :max-height="maxHeight"
        border
        :row-class-name="tableRowClassName"
        :class="{'unfoldable': tableExpand}"
        :header-cell-style="{background:'var(--table-th-bg)',color:'var(--text-color)'}"
        v-on="$listeners"
        @sort-change="handleSort"
        @filter-change="handleFilter"
        @selection-change="selectionChange"
      >
        <template v-for="(col, index) in zkColumns">
          <el-table-column
            v-if="col.type && operatorBtnFn(col.isShow)"
            :key="col.type"
            :type="col.type"
            :width="col.width"
            :selectable="col.selectableFn"
            :reserve-selection="col.type==='selection'"
          />
          <el-table-column
            v-else-if="col.baseBtns && col.baseBtns.length>0 && operatorBtnFn(col.isShow)"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :width="col.width || 120"
            :min-width="col.minWidth || 100"
            :fixed="col.fixed"
          >
            <div
              slot-scope="scope"
              class="btnlist"
            >
              <template v-for="(btn,idx) in col.baseBtns">
                <el-popover
                  v-if="btn.confirmInfo && operatorBtnFn(btn.isShow, scope.row)"
                  :key="idx"
                  :ref="`popoverOut-${scope.$index}`"
                  :disabled="btn.disabled? btn.disabled(scope.row) : false "
                  placement="bottom-start"
                  width="224"
                  :title="btn.popoverTitle || '删除'"
                  popper-class="popover_btn"
                >
                  <!-- <p>{{btn.confirmInfo(scope.row) || '您确定要删除当前数据嘛？'}}</p> -->
                  <p>{{ confirmInfoFn(btn.confirmInfo,scope) }}</p>
                  <div style="text-align: right; margin: 0; margin-top:16px;">
                    <el-button
                      size="mini"
                      type="info"
                      @click="handleCloseOut(scope.$index)"
                    >
                      取消
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="confirmBtn(btn, this, scope)"
                    >
                      {{ btn.contentText || btn.content }}
                    </el-button>
                  </div>
                  <el-button
                    slot="reference"
                    type="text"
                    size="small"
                    :disabled="btn.disabled? btn.disabled(scope.row) : false "
                  >
                    {{ operatorBtnFn(btn.content, scope.row) }}
                  </el-button>
                </el-popover>
                <el-button
                  v-if="!!!btn.confirmInfo && operatorBtnFn(btn.isShow, scope.row)"
                  :key="btn.confirmInfo"
                  type="text"
                  size="small"
                  class="txt_btn "
                  :class="{'disabled': btn.disabled? btn.disabled(scope.row) : false}"
                  @click="(btn.disabled && !btn.disabled(scope.row) || !btn.disabled) && btn.handler && btn.handler.call(this, scope.row,scope)"
                >
                  {{ operatorBtnFn(btn.content, scope.row) }}
                </el-button>
              </template>

              <template v-if="col.hideBtns.length > 0">
                <el-dropdown
                  :hide-on-click="true"
                  trigger="click"
                >
                  <span
                    class="po-r"
                    style="top: -3px;cursor: pointer;font-weight: bold;"
                  >
                    ...<i class="" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(btn,idx) in col.hideBtns"
                      :key="idx"
                      :class="{'disabled': btn.disabled? btn.disabled(scope.row) : false}"
                      @click.native="(btn.disabled && !btn.disabled(scope.row) || !btn.disabled) && btn.handler && btn.handler.call(this, scope.row)"
                    >
                      <div
                        v-if="!!btn.confirmInfo && operatorBtnFn(btn.isShow, scope.row)"
                        class="dropdown-item-custom"
                      >
                        <template>
                          <el-popover
                            :ref="`popover-${scope.$index}`"
                            placement="bottom-start"
                            width="224"
                            :title="btn.popoverTitle || '删除'"
                            popper-class="popover_btn"
                          >
                            <!-- <p>{{btn.confirmInfo(scope.row) || '您确定要删除当前数据嘛？'}}</p> -->
                            <p>{{ confirmInfoFn(btn.confirmInfo,scope) }}</p>
                            <div style="text-align: right; margin: 0; margin-top:16px;">
                              <el-button
                                size="mini"
                                type="info"
                                @click="handleClose(scope.$index)"
                              >
                                取消
                              </el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                @click="confirmBtn(btn, this, scope, false)"
                              >
                                {{  btn.contentText ||  operatorBtnFn(btn.content, scope.row) }}
                              </el-button>
                            </div>
                            <el-button
                              slot="reference"
                              type="text"
                              size="small"
                              :disabled="btn.disabled? btn.disabled(scope.row) : false "
                              @click.stop="()=>{}"
                            >
                              {{ operatorBtnFn(btn.content, scope.row) }}
                            </el-button>
                          </el-popover>
                        </template>
                      </div>
                      <el-button
                        v-if="!!!btn.confirmInfo && operatorBtnFn(btn.isShow, scope.row)"
                        type="text"
                        size="small"
                        :disabled="btn.disabled? btn.disabled(scope.row) : false"
                      >
                        {{ operatorBtnFn(btn.content, scope.row) }}
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </div>
          </el-table-column>
          <el-table-column
            v-if="!col.type && (!col.baseBtns || col.baseBtns && col.baseBtns.length === 0) && operatorBtnFn(col.isShow)"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :min-width="col.minWidth || 100"
            :fixed="col.fixed"
            :sortable="col.sortable? 'custom': false"
            :filters="col.filters"
            :column-key="col.prop"
            :show-overflow-tooltip="showOverflowTooltip && col.tooltipFlag "
            :resizable="index!=zkColumns.length-1"
            :align="col.align"
            :filter-method="col.filterMethod"
            :filter-placement="col.filterPlacement"
            :header-align="col.headerAlign"
            :filtered-value="col.filteredValue"
          >
            <template slot-scope="scope">
              <exSlot
                v-if="col.render"
                :render="col.render"
                :row="scope.row"
                :index="scope.$index"
                :column="col"
              />
              <slot
                v-else-if="col.useSlot"
                :name="col.prop"
                :row="scope.row"
                :scope="scope"
              />
              <template v-else>
                <span
                  v-if="col.handler"
                  class="linked"
                  @click="col.handler.call(null, scope.row)"
                >
                  <span v-if="col.filter">
                    {{ col.filter(scope.row[col.prop], scope.row) }}
                  </span>
                  <span v-else>
                    {{ scope.row[col.prop] }}
                  </span>
                </span>
                <span v-else>
                  <span v-if="col.filter">
                    {{ col.filter(scope.row[col.prop], scope.row) }}
                  </span>
                  <span v-else>
                    {{ scope.row[col.prop] }}
                  </span>
                </span>
              </template>
            </template>

            <template v-slot:header="slotProps">
              <slot
                v-if="col.headerSlot"
                :name="col.headerSlot"
                :column="slotProps.column"
              />
              <template v-else-if="col.headerTooltipText">
                {{ slotProps.column.label }}
                <el-tooltip
                  effect="dark"
                  :content="col.headerTooltipText"
                  placement="top-start"
                >
                  <i class="kj-iconfont icon-wendang icon-zhushi icon_tooltip" />
                </el-tooltip>
              </template>
              <template v-else>
                {{ slotProps.column.label }}
              </template>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          prop="hidecol"
          label=""
          fixed="right"
          width="1px"
          :resizable="false"
        >
          <template slot="header">
            <i
              v-if="tableExpand"
              class="kj-iconfont icon-zhankai tableshowall"
              @click="showallFlag=!showallFlag"
            />
          </template>
          <template slot-scope="scope">
            <i
              v-if="trExpand"
              class="kj-iconfont icon-zhankai"
              @click="toggleShowAll(scope.row)"
            />
          </template>
        </el-table-column>
        <!-- 空数据展示 -->
        <template #empty>
          <kd-empty />
        </template>
      </el-table>
      <div
        v-if="pageFlag"
        style="height: 68px;"
      >
        <slot name="pageleft" />
        <el-pagination
          class="tab_pagination mt2"
          background
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
* @描述
* filterTable使用方法
* @使用方法
   <kj-filter-table
      ref="tableComp"
      :data="tableData"
      :columns="columnsData"
    >
      <template #search>
        <el-button class="mb">哈哈</el-button>
      </template>
      <template #operation>
        <el-button>按钮1</el-button>
        <el-button>按钮2</el-button>
      </template>
    </kj-filter-table>

** script中的data
    tableData: [
        {
          english: 'test',
          chinese: '租户测试',
          manage: '王文文',
          include: 2,
          creator: 'wangwenwen',
          createTime: '2020-03-03 08:05:44',
        },
        {
          english: 'test2',
          chinese: '租户测试2',
          manage: '王文文',
          include: 2,
          creator: 'wangwenwen',
          createTime: '2020-03-03 08:05:44',
        },
      ],
      columnsData: [{
        title: '英文租户名称',
        key: 'english',
        handler: this.getDetail,
      }, {
        title: '租户中文名称',
        key: 'chinese',
      }, {
        title: '租户管理员',
        key: 'manage',
        filters: [{ text: 'SQL创建', value: 1 }, { text: '规则创建', value: 2 }],
        filterMethod:this.filterTag
         width: 500,
      }, {
        title: '包含项目数量',
        key: 'include',
        headerTooltipText: '文字提示',
      }, {
        title: '创建人',
        key: 'creator',
      }, {
        title: '创建时间',
        key: 'createTime',
      },
      {
        key: 'operation',
        title: '操作',
        btns: [
          {
            content: '查看',
            handler: (item) => {  }
          },
          {
            content: '编辑',
            disabled: (item) => { return true },
            handler: this.editRow
          },
          {
            content: '发布',
            handler: (item) => {  },
          },
          {
            content: '下线',
            handler: (row) => { }
          },
          {
            content: '删除',
            confirm: this.deleteRow,
            confirmInfo: '您确定要删除当前行嘛? '
          }
        ],
      }],
* @param
*
* @LastEditTime: 最后更新时间
* 2022-03-14
* @Author: andy凌云
*/
let exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    };
    if (data.props.column) params.column = data.props.column;
    return data.props.render(h, params);
  }
}
import  cloneDeep  from 'lodash/cloneDeep'
export default {
  name: "KdFilterTable",
  components: {
    exSlot
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    }, // 列描述数据对象
    data: {
      type: Array,
      default: () => []
    },     // 表格数据
    totalNum: {
      type: Number,
      default: 0
    },
    // height: {
    //   type: Number,
    //   required: false
    // },
    stripe: { // 是否显示间隔斑马纹
      type: Boolean,
      default: false
    },
    border: { // 是否显示纵向边框
      type: Boolean,
      default: false
    },
    showOverflowTooltip: { // 内容过长时隐藏，鼠标悬浮显示tooltip
      type: Boolean,
      default: true
    },
    tableExpand: { // 允许全表切换是否展示全部内容（不用...显示）
      type: Boolean,
      default: true
    },
    trExpand: { // 允许每行切换是否展示全部内容（不用...显示）
      type: Boolean,
      default: true
    },
    wordSearchFlag: { // 是否支持关键字筛选
      type: Boolean,
      default: true
    },
    searchFlag: { // 是否支持精准筛选
      type: Boolean,
      default: true
    },
    showSearch: { // 是否显示头部搜索
      type: Boolean,
      default: true
    },
    searchareaWidth: {
      type: Number,
      default: 1000,
    },
    pageFlag: { // 是否包含分页
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    searchTitle: {
      type: String,
      default: "搜索关键词",
    },
    searchTypes: {
      type: Object, //默认 like：模糊 eq：精确 in：数组 between：日期
      default: () => ({})
    },
    openSearchFlag: { //自定义搜索展开按钮
      type: Boolean,
      default: false
    },
    maxHeight: { // 表格最大高度
      type: Number,
      default: 5000
    },
    rowKeys: {
      type: String || Array,
      default: ""
    },
    addShowAllFlage: { // 是否改变表格源数据，并添加showAll属性
      type: Boolean,
      default: true
    
    }
  },
  data() {
    return {
      searchCopy: {},
      total: 0,
      zkColumns: [],
      search: {}, // 过滤条件保存的对象,就是保存Input框和Select中值
      advancedSearchFlag: false, //高级搜索是否展开
      tableData: [],
      showallFlag: false, //是否全表内容完整显示，不用...
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1,
      expandExistFlag: true, //是否需要显示展开
      searchWidth: '416px', //搜索框容器的宽度
      visiblePopover: false,
      visible: false
    }
  },
  computed: {

  },
  watch: {
    columns() {
      this.updateTable();
    },
    data: {
      handler() {
        let items = [];
        if(this.addShowAllFlage) {
          this.data.forEach(dt => {
            items.push({ ...dt, showall: false });
          });
          this.tableData = items;
        } else {
          this.tableData = this.data;
        }
        
        
      },
      immediate: true
    },
    totalNum: {
      handler(newVal) {
        this.total = newVal;
      },
      immediate: true
    }
  },
  created() {
    this.updateTable();
    // this.toSearch()
  },
  methods: {
    // 表格confirmInfo判断函数还是String
    confirmInfoFn(confirmInfo, scope) {
      if (!confirmInfo) {
        return '您确定要删除当前行嘛'
      } else if (typeof confirmInfo === 'string') {
        return confirmInfo
      } else if (typeof confirmInfo === 'function') {
        return confirmInfo(scope.row)
      }
    },
    // isShow 或者 content支持 函数或字符串两种写法。
    operatorBtnFn(cont, row = '') {
      if (typeof cont === 'function') {
        if (!row) {
          return true
        }
        return cont(row)
      } else {
        if (cont === undefined) {
          return true
        }
        return cont
      }
    },
    // 表格操作外面的按钮
    handleCloseOut(index) {
      this.$refs[`popoverOut-${index}`].forEach(item => {
        item.doClose()
      })
      // this.$refs[`popoverOut-${index}`][0].doClose()
      // this.$refs[`popoverOut-${index}`][1].doClose()
    },
    // 表格操作点击省略号里的按钮
    handleClose(index) {
      this.$refs[`popover-${index}`].forEach(item => {
        item.doClose()
      })
      // this.$refs[`popover-${index}`][0].doClose()
      // this.$refs[`popover-${index}`][1].doClose()
    },
    rowKey(row) {
      if (this.rowKeys && this.rowKeys !== '') {
        return row[this.rowKeys]
      } else if (this.rowKeys && Array.isArray(this.rowKeys)) {
        return this.rowKeys.map(key => row[key]).join('')
      } else {
        return row.id
      }
    },
    filterHandle(val, f) {
      if (f === 'toFixed') {
        return val + '222'
      }
    },
    updateTable() {
      this.transformZKColumns();
      if (this.wordSearchFlag) {
        // this.updateSearchBox();
      }
    },
    /**
     * 更新搜索栏样式
     */
    updateSearchBox() {
      this.$nextTick(() => {
        let areaWidth = this.$refs.searchAreaComp.clientWidth;
        let maxAreaWidth = areaWidth - 200;
        let realNum = this.$refs.searchBoxRef.clientWidth;
        if (realNum >= maxAreaWidth) {
          this.expandExistFlag = true;
        } else {
          this.expandExistFlag = false;
        }
      });
    },
    transformZKColumns() {
      this.zkColumns = this.columns.map((item) => {
        if (item.search || item.filters) {
          this.$set(this.search, item.key, this.search[item.key] || '');
        }
        let baseBtns = [];
        let hideBtns = [];
        if (item.btns) {
          item.maxBtns = item.maxBtns || 2;
          item.btns = item.btns.map(v => {
            if (v.isShow === undefined) {
              v.isShow = true
            }
            return v
          })
          if (item.btns.length > item.maxBtns) {
            baseBtns = item.btns.slice(0, item.maxBtns);
            hideBtns = item.btns.slice(item.maxBtns);
          } else {
            baseBtns = item.btns;
          }
        }
        return {
          label: item.title,
          prop: item.key,
          width: item.width,
          fixed: item.fixed || false, // 'right' 右侧固定, true 默认左侧固定
          sortable: item.sortable || false,
          filters: item.filters || null,
          filter: item.filter || null,
          minWidth: item.minWidth,
          render: item.render,   // 渲染函数
          headerAlign: item.headerAlign || 'left', // el-table原生属性
          align: item.align || 'left', // el-table原生属性
          type: item.type, // el-table原生属性，可以配置index selection等
          useSlot: item.useSlot || false, // 如果某列显示逻辑复杂，可以使用插槽实现
          tooltipFlag: item.tooltipFlag === undefined ? true : item.tooltipFlag, //是否显示自带的tooltip
          handler: item.handler || false,
          baseBtns: baseBtns, // 显示的按钮
          hideBtns: hideBtns, // 隐藏在...中的按钮
          maxBtns: item.maxBtns || 2, // 最大显示按钮个数，超出后显示...
          isTxtButton: item.isTxtButton || true, // true：表示使用文字按钮 false：表示使用icon按钮
          confirmInfo: item.confirmInfo || null, // 有的按钮点击后有确认信息提示，确认框点击后确认后才执行handler
          filterPlacement: item.filterPlacement || 'bottom-end', //过滤弹出框的定位
          filterMethod: item.filterMethod || null, // 数据过滤使用的方法
          headerSlot: item.headerSlot || '',//表头自定义插槽
          headerTooltipText: item.headerTooltipText || '', //移入表头文字提示
          filteredValue: item.filteredValue,
          selectableFn: item.selectableFn, // 决定单行多选按钮是否可勾选
          isShow: item.isShow === false ? false : item.isShow, // 列是否显示
        }
      })


    },
    /**
     * 设置行样式
     */
    tableRowClassName(row) {
      if (row.row.showall) {
        return 'showall';
      }
      return '';
    },
    /**
     * 展开/收起完整内容
     */
    toggleShowAll(row) {
      row.showall = !row.showall;
    },
    /**
     * 初始化表格数据
     */
    initTableData() {
      this.handleCurrentChange(1);
    },
    /**
     * 刷新表格，不改变筛选条件和分页
     */
    refreshTableData() {
      this._updatePage()
    },
    /**
     * 筛选
     */
    toSearch() {
      this.currentPage = 1;
      this._updatePage()
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this._updatePage()
    },
    // 重置表格基础数据
    _reset(sendTotalNum) {
      this.currentPage = 1
      this.total = sendTotalNum
    },
    handleCurrentChange(val) {
      // this.$refs['kTable'].clearSelection();
      this.currentPage = val;
      this._updatePage()
    },
    _updatePage() {
      // 点击查询按钮，获取到表头中的筛选项，使不通过点击表头的筛选也可以筛选
      let filterColumns = this.$refs.kTable.columns.map(item => {
        if (item.filterable) {
          return {
            [item.columnKey]: item.filteredValue
          }
        }
      })
      filterColumns.forEach(item => {
        if (item != undefined) {
          Object.keys(this.search).map(key => {
            if (key === Object.keys(item)[0]) {
              this.search[key] = item[key]
            }
          })
        }
      })
      this.searchCopy = cloneDeep(this.search);
      // 如果是上边的模糊搜索。 只处理word。 如果是下面的模糊搜索, 将word删除
      if (this.wordSearchFlag) {
        // 如果包含word搜索
        if (this.advancedSearchFlag) {
          delete this.searchCopy.word;
        } else {
          this.searchCopy.word = this.search.word;
        }
      }
      let changeSearchArr = []
      for (let key in this.searchCopy) {
        const qData = this.searchCopy[key];
        const isArr = Array.isArray(qData);
        const isString = !isArr && typeof qData === 'string'
        // 是数组，且数组为空的话，不需要将此条件放入请求中
        if (qData && (!isArr || qData.length > 0)) {
          let listObj = {
            queryType: this.searchTypes[key] || 'like',
            field: key,
            queryData: isArr ? JSON.stringify(qData) : (isString? qData.trim() : qData)
          }
          // word不存在，或者word存在时，仅包装word和下拉框搜索
          if (!this.searchCopy.word || (this.searchCopy.word && (listObj.field === 'word' || isArr))) {
            changeSearchArr.push(listObj)
          }
        }
      }
      // let testArr = [
      //   {
      //     "queryType": "like",
      //     "field": "word",
      //     "queryData": "321"
      //   },
      // ]
      let sendSearch = {
        queries: changeSearchArr,
        current: this.currentPage, size: this.pageSize
      }
      this.$emit('updatePage', sendSearch, (data) => {
        this.total = data.total
        console.warn('这个回调函数即将废弃，请在使用表格的地方，自行定义totalNum，并传递到表格组件中')
      });
      return sendSearch;

    },
    /**
     * 排序 参数{ column, prop, order }
     */
    handleSort() {
    },
    /**
     * 筛选
     */
    handleFilter(filterMap) {
      for (let key in filterMap) {
        this.search[key] = filterMap[key];
      }
      this.toSearch();
    },
    /**
     * 重置
     */
    toReset() {
      for (let key in this.search) {
        this.search[key] = '';
      }
      this.$refs.kTable.clearFilter()
      this.toSearch();
      this.clearSelection();
    },
    /**
     * 高级筛选
     */
    toggleMoreSearch() {
      this.advancedSearchFlag = !this.advancedSearchFlag;
    },
    selectionChange(val) {
      this.$emit('selection-change', val);
    },
    //  清空表格选中项
    clearSelection() {
      this.$refs.kTable.clearSelection()
    },

    // 确定按钮
    confirmBtn(btn, _this, scope, isOut = true) {
      isOut ? this.handleCloseOut(scope.$index) : this.handleClose(scope.$index)
      btn.confirm && btn.confirm.call(_this, scope.row)
    },

  }
}
</script>

