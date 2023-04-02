<template>
  <div class="kd-job-tree" :style="{ width: mHandleUnit(defaultProps.width || parentWidth) }">
    <div v-if="defaultProps.showTitle === undefined || defaultProps.showTitle !== false" class="jt_operation">
      <div class="jt_title">
        {{ defaultProps.title }}
      </div>
      <div class="jt_btns">
        <slot name="create"></slot>
        <el-tooltip :content="defaultProps.createTitle || '创建分组'" placement="top">
          <i
            v-if="defaultProps.showCreate !== false"
            class="kd-icon-xinjianwenjianjia cp"
            :class="defaultProps.createIcon || 'kd-icon-xinjianwenjianjia'"
            @click="create"
          ></i>
        </el-tooltip>
      </div>
    </div>
    <!-- 搜索框上边的插槽 -->
    <slot name="top"></slot>
    <div v-if="defaultProps.showSearch !== false" class="jt_search">
      <el-input
        v-model="queryTxt"
        width="100%"
        size="small"
        clearable
        :placeholder="defaultProps.placeholder || '请输入'"
        suffix-icon="el-icon-search"
      ></el-input>
    </div>
    <div
      ref="treeScrollComp"
      class="jt_body"
      :class="[
        defaultProps.showTitle === true && defaultProps.showSearch === false ? 'has_title' : '',
        defaultProps.showSearch === true && defaultProps.showTitle === false ? 'has_search' : '',
        defaultProps.showSearch === true && defaultProps.showTitle === true ? 'has_all' : '',
      ]"
    >
      <kd-tree
        ref="treeRef"
        v-loading="loading"
        class="job_tree_comp"
        :data="sTreeData"
        :node-key="nodeKey"
        highlight-current
        :expand-on-click-node="$attrs['expandOnClickNode'] || $attrs['expand-on-click-node'] || false"
        :default-expanded-keys="expandedKeys"
        :filter-node-method="$attrs['filterNodeMethod'] || $attrs['filter-node-method'] || filterNode"
        v-bind="$attrs"
        v-on="$listeners"
        @node-click="nodeClick"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse"
      >
        <div slot-scope="{ node, data }" class="job_tree_node">
          <div class="left_txt_box">
            <div class="icon_box">
              <slot name="icon" :data="data" :node="node">
                <i
                  style="color: #ffb51f"
                  :class="[
                    node.expanded
                      ? defaultProps.openIcon || 'kd-icon-wenjianjiazhankai'
                      : defaultProps.closeIcon || 'kd-icon-wenjianjia',
                  ]"
                ></i>
              </slot>
            </div>
            <div style="width: contentWidth(node, data)">
              <slot name="data" :data="data" :node="node" :width="contentWidth(node, data)">
                <kd-tooltip :content="data[treeProps.label]" :width="contentWidth(node, data)"></kd-tooltip>
              </slot>
            </div>
          </div>
          <slot name="btns" :data="data" :node="node">
            <div
              v-if="handleBtns(defaultProps.btns, node, data) && showBtns(data, node)"
              class="right_icon_box"
              @click.stop="() => {}"
            >
              <el-dropdown
                ref="dropdownRef"
                trigger="click"
                :hide-on-click="false"
                @visible-change="btnShowHandler($event, node, data)"
              >
                <i
                  class="kd-icon-ellipsis po-r"
                  style="color: var(--primary-color)"
                  @click="ellipsisHandler(node, data)"
                ></i>
                <el-dropdown-menu slot="dropdown">
                  <div v-for="(btn, index) in handleBtns(defaultProps.btns, node, data)" :key="index">
                    <template v-if="btn.useSlot">
                      <el-dropdown-item
                        v-if="btn.useSlot"
                        :class="{
                          disabled: handleDisabled(btn.disabled, node, data)
                            ? handleDisabled(btn.disabled, node, data)
                            : false,
                        }"
                      >
                        <slot :name="btn.key" :data="data" :node="node"></slot>
                      </el-dropdown-item>
                    </template>
                    <template v-else-if="btn.confirmInfo">
                      <el-popover
                        v-if="btn.confirmInfo && operatorBtnFn(btn.isShow, data)"
                        :key="index"
                        :ref="`popoverOut-${index}`"
                        :disabled="
                          handleDisabled(btn.disabled, node, data) ? handleDisabled(btn.disabled, node, data) : false
                        "
                        placement="bottom-start"
                        width="224"
                        :title="btn.popoverTitle || '删除'"
                        popper-class="popover_btn"
                      >
                        <p>{{ confirmInfoFn(btn.confirmInfo, data) }}</p>
                        <div style="text-align: right; margin: 0; margin-top: 16px">
                          <el-button size="mini" type="info" @click="handleCloseOut(index)"> 取消 </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="handleCloseOut(index) || (btn.confirm && btn.confirm(node, data))"
                          >
                            确定
                          </el-button>
                        </div>
                        <el-dropdown-item
                          slot="reference"
                          :class="{
                            disabled: handleDisabled(btn.disabled, node, data)
                              ? handleDisabled(btn.disabled, node, data)
                              : false,
                          }"
                          >{{ handleContent(btn.content, node, data) }}</el-dropdown-item
                        >
                      </el-popover>
                    </template>
                    <template v-else>
                      <el-dropdown-item
                        :class="{
                          disabled: handleDisabled(btn.disabled, node, data)
                            ? handleDisabled(btn.disabled, node, data)
                            : false,
                        }"
                        @click.native.stop.prevent="
                          !handleDisabled(btn.disabled, node, data) && btn.handler && btn.handler(node, data)
                        "
                      >
                        {{ handleContent(btn.content, node, data) }}
                      </el-dropdown-item>
                    </template>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </slot>
        </div>
      </kd-tree>
    </div>
  </div>
</template>

<script>
/**
* @描述
* 公共的树形组件
* @使用方法

defaultProps: {
  title: '新建函数',
  openIcon: '',
  closeIcon: '',
  showCreate: false, // 隐藏新增按钮
  showSearch: false, // 隐藏搜索框
  showTitle: true, // 显示标题
  btns: [
    {
      content: "编辑",
      handler: this.editTree,
    },
    {
      content: "删除",
      confirm: this.deleteTree,
      confirmInfo: "确认删除本条数据吗",
    },
  ],
},
*/
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'KdJobTree',
  components: {},
  props: {
    // 大部分配置都在defaultProps里
    defaultProps: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
    nodeKey: {
      type: String,
      default: 'id',
    },
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label',
        };
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 自定义展开的项
    customExpand: {
      type: [Function, String],
      default: '',
    },
  },
  data() {
    return {
      queryTxt: '',
      // 当前选中的节点
      currentKey: '',
      // 当前展开的节点
      expandedKeys: [],
      expandKeys: [], //展开的节点
      sTreeData: this.data,
      parentWidth: '',
    };
  },
  computed: {},
  watch: {
    queryTxt(newVal) {
      this.$refs.treeRef.filter(newVal);
    },
    async data(val) {
      this.sTreeData = cloneDeep(val);
      // 展开我的标准树&&获取根目录我的标准下的所有标准
      if (typeof this.customExpand === 'function') {
        this.customExpand(val);
      } else {
        if (val && val.length) {
          let rootId = val[0][this.nodeKey];
          this.expandedKeys = this.expandedKeys.length ? this.expandedKeys : [rootId];
          this.$nextTick(() => {
            this.$refs.treeRef.setCurrentKey(this.currentKey || rootId);
          });
        }
        this.$emit('nodeHandler', this.sTreeData[0] || {});
      }
    },
  },
  created() {
    this.getParentWidth();
  },
  mounted() {},
  methods: {
    // 处理btns, 既可以传递函数, 也可以直接传递数组
    handleBtns(defaultBtns, node, data) {
      if (typeof defaultBtns === 'function') {
        return defaultBtns(node, data);
      } else {
        return defaultBtns;
      }
    },
    handleDisabled(defaultDisabled, node, data) {
      if (typeof defaultDisabled === 'function') {
        return defaultDisabled(node, data);
      } else {
        return defaultDisabled;
      }
    },
    // 如果content是字符串, 返回字符串. 否则返回函数
    handleContent(content, node, data) {
      if (typeof content === 'function') {
        return content(node, data);
      } else {
        return content;
      }
    },
    // 由于内容宽度是由顶层元素宽度计算出来的, 所以在不设置宽度的情况下, 以当前组件父元素的宽度为准
    getParentWidth() {
      this.$nextTick(() => {
        let pEl = this.$el.parentNode;
        this.parentWidth = window.getComputedStyle(pEl).width;
      });
    },
    // 自动计算内容宽度. 如果
    contentWidth(node, data) {
      let jobTreeWidth = this.mHandleUnit(this.defaultProps.width || this.parentWidth);
      return jobTreeWidth.replace('px', '') - 100 - (node.level - 1) * (this.$attrs.indent || 16) + 'px';
    },
    setCurrentNode(id) {
      this.$refs.treeRef.setCurrentKey(id);
      let node = this.$refs.treeRef.getNode(id);
      let parent = node.parent.data || {};
      this.expandedKeys.push(parent.id);
    },
    ellipsisHandler(node, data) {
      this.$emit('btnClick', node, data);
    },
    btnShowHandler(event, node, data) {
      if (event) {
        this.$emit('btnHandler', node, data);
      }
    },
    // 表格confirmInfo判断函数还是String
    confirmInfoFn(confirmInfo, data) {
      if (!confirmInfo) {
        return '您确定要删除当前行嘛';
      } else if (typeof confirmInfo === 'string') {
        return confirmInfo;
      } else if (typeof confirmInfo === 'function') {
        return confirmInfo(data);
      }
    },
    operatorBtnFn(cont, row = '') {
      if (typeof cont === 'function') {
        if (!row) {
          return true;
        }
        return cont(row);
      } else {
        if (cont === undefined) {
          return true;
        }
        return cont;
      }
    },
    // 创建目录
    create() {
      this.$emit('create');
    },
    /**
     * 递归获取目录结构
     */
    getMyPaths(exceptNode) {
      let myPaths = cloneDeep(this.sTreeData);
      myPaths = cloneDeep(myPaths);
      // 获取exceptNode文件夹的层级和
      let maxLayerNum = 5;
      if (exceptNode) {
        maxLayerNum = (() => {
          let getMaxDepth = (children, layer) => {
            if (!children.length) return layer;
            layer++;
            let nextAllChildren = children
              .map((ch) => ch[this.treeProps.children] || [])
              .reduce((acc, cur) => acc.concat(cur), []);
            return getMaxDepth(nextAllChildren, layer);
          };
          return maxLayerNum - getMaxDepth(exceptNode[this.treeProps.children] || [], 1);
        })();
      }
      let makePaths = (mys, layer) => {
        layer++;
        for (let i = mys.length - 1; i >= 0; i--) {
          let curP = mys[i];
          // 如果是移动文件夹，则删除被移动的文件夹
          if (exceptNode && curP[this.nodeKey] === exceptNode[this.nodeKey]) {
            mys.splice(i, 1);
          } else if (exceptNode && layer > maxLayerNum) {
            // 如果是移动文件夹，文件夹层级>maxLayerNum，则删除此文件夹
            mys.splice(i, 1);
          } else if (!exceptNode && layer > maxLayerNum - 1) {
            // 如果新建文件夹，文件夹层级>maxLayerNum，则删除此文件夹
            mys.splice(i, 1);
          } else {
            makePaths(curP[this.treeProps.children] || [], layer);
          }
        }
      };
      makePaths(myPaths, 0);
      return myPaths;
    },
    /**
     * 树节点过滤函数
     */
    filterNode(value, data) {
      if (!value) return true;
      // return data.label.indexOf(value) !== -1;
      // 搜索不区分大小写
      return data[this.treeProps.label].toLowerCase().includes(value.toLowerCase());
    },
    /**
     * 点击树节点
     */
    async nodeClick(data) {
      this.currentKey = data[this.nodeKey];
      this.$emit('nodeHandler', data);
    },

    nodeExpand(data) {
      if (data[this.nodeKey]) {
        this.expandedKeys.push(data[this.nodeKey]);
      }
    },
    nodeCollapse(data) {
      let index = this.expandedKeys.indexOf(data[this.nodeKey]);

      if (index > -1) {
        this.expandedKeys.splice(index, 1);
      }
    },
    handleCloseOut(index) {
      this.$nextTick(() => {
        this.$refs[`popoverOut-${index}`].forEach((item) => {
          item.doClose();
        });
      });
    },
    // 判断根据不同的返回值, 右侧是否显示...按钮
    showBtns(data, node) {
      if (this.$listeners.showBtns) {
        return this.$listeners.showBtns(data, node);
      } else {
        return true;
      }
    },
  },
};
</script>
