<template>
  <div class="kd-tree">
    <div class="jt_operation">
      <div class="jt_title">
        {{ defaultProps.title }}
      </div>
      <div class="jt_btns">
        <el-tooltip
          :content="defaultProps.createTitle || '创建分组'"
          placement="top"
          :open-delay="500"
        >
          <i
            class="kj-iconfont icon-xinjianwenjianjia cp"
            :class="defaultProps.createIcon || 'icon-xinjianwenjianjia'"
            @click="create"
            v-if="defaultProps.showCreate !== false"
          />
        </el-tooltip>
      </div>
    </div>
    <!-- 搜索框上边的插槽 -->
    <slot name="top" />
    <div class="jt_search" v-if="defaultProps.showSearch !== false">
      <el-input
        v-model="queryTxt"
        width="100%"
        size="small"
        :placeholder="defaultProps.placeholder || '请输入'"
        suffix-icon="el-icon-search"
      />
    </div>
    <div ref="treeScrollComp" v-loading="isLoading" class="jt_body">
      <el-tree
        ref="treeRef"
        class="job_tree_comp"
        :props="treeProps"
        :data="treeData"
        :node-key="nodeKey"
        highlight-current
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKeys"
        :filter-node-method="filterNode"
        @node-click="clickNode"
        @node-expand="expandNode"
        @node-collapse="collapseNode"
      >
        <div slot-scope="{ node, data }" class="job_tree_node f-bt w-block">
          <div class="f-bt w-block">
            <div class="txt_box">
              <div class="icon_box">
                <slot name="icon" :data="data" :node="node">
                  <i
                    class="kj-iconfont"
                    :class="[
                      node.expanded
                        ? defaultProps.openIcon || 'icon-wenjianjiazhankai'
                        : defaultProps.closeIcon || 'icon-wenjianjia'
                    ]"
                  />
                </slot>
              </div>
              <div class="slot_box">
                <slot name="data" :data="data" />
              </div>
            </div>
            <div
              v-if="defaultProps.btns && defaultProps.btns.length > 0"
              class="right_icon"
            >
              <el-dropdown trigger="click" :hide-on-click="false">
                <i class="kj-iconfont icon-ellipsis" style="color: #365edf" />
                <el-dropdown-menu slot="dropdown">
                  <div v-for="(item, index) in defaultProps.btns" :key="index">
                    <!-- <el-dropdown-item @click.native="popRename(data, node)">重命名</el-dropdown-item>
                          <el-dropdown-item @click.native="popMove(data, node)">移动</el-dropdown-item> -->

                    <el-dropdown-item v-if="item.confirmInfo">
                      <template>
                        <el-popconfirm
                          :title="item.confirmInfo"
                          confirm-button-text="删除"
                          cancel-button-type="info"
                          :hide-icon="true"
                          @confirm="
                            item.confirm && item.confirm.call(this, node, data)
                          "
                        >
                          <el-button
                            slot="reference"
                            type="text"
                            class="main-txt"
                          >
                            删除
                          </el-button>
                        </el-popconfirm>
                      </template>
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-else
                      @click.native="
                        item.handler && item.handler.call(this, node, data)
                      "
                    >
                      {{ item.content }}
                    </el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
/**
* @描述
* 公共的树形组件
* @使用方法
<kjTree
  class="left_box"
  ref="treeRef"
  title="函数管理"
  :defaultProps="defaultProps"
  @nodeHandler="nodeHandler"
>
  <template #data="{data}">
    <div>{{data.nameCh}}</div>
  </template>
</kjTree>

defaultProps: {
  title: '新建函数',
  openIcon: '',
  closeIcon: '',
  showCreate: false, // 隐藏新增按钮
  showSearch: false, // 隐藏搜索框
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
* @param
*
* @LastEditTime: 最后更新时间
* 2022-06-17
* @Author: andy凌云
*/
import { cloneDeep } from 'lodash/cloneDeep';
export default {
  name: 'KdTree',
  components: {},
  props: {
    // 大部分配置都在defaultProps里
    defaultProps: {
      type: [Object],
      default: () => {}
    },
    treeData: {
      type: Array,
      default: () => []
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    type: {
      // job接口最开始的url字符串
      type: String,
      default: 'function' // resource
    },
    title: {
      type: String,
      default: ''
    },

    createOptions: {
      type: [Object]
    },
    //
    treeProps: {
      type: Object,
      default: () => {
        return { children: 'children' };
      }
    },
    // 自定义展开的项
    cusExpand: {
      type: [String, Function],
      default: ''
    }
  },
  data() {
    return {
      queryTxt: '',
      // 当前选中的节点
      currentKey: '',
      // 当前展开的节点
      expandedKeys: [],

      expandKeys: [], //展开的节点
      isLoading: false
    };
  },
  computed: {},
  watch: {
    queryTxt(newVal) {
      this.$refs.treeRef.filter(newVal);
    },
    async treeData(val) {
      // 展开我的标准树&&获取根目录我的标准下的所有标准
      await this.sleep(0);
      if (typeof this.cusExpand === 'function') {
        this.cusExpand(val);
      } else {
        if (val && val.length) {
          const rootId = val[0][this.nodeKey];

          // const rootId = '1554777131681058862';
          // console.log(
          //   `%c 222=>228行 ~/kj/qiankun-fe/main/src/share/components/comps/gaeaComps/KjTree.vue this.currentKey `,
          //   'background:#000;color:#bada55',
          //   this.currentKey
          // );

          this.expandedKeys = this.expandedKeys.length
            ? this.expandedKeys
            : [rootId];
          console.log(
            `%c 555=>233行 ~/kj/qiankun-fe/main/src/share/components/comps/gaeaComps/KjTree.vue this.expandedKeys `,
            'background:#000;color:#bada55',
            this.expandedKeys
          );
          console.log(
            `%c 666=>234行 ~/kj/qiankun-fe/main/src/share/components/comps/gaeaComps/KjTree.vue this.rootId `,
            'background:#000;color:#bada55',
            rootId
          );

          console.log(
            `%c 777=>236行 ~/kj/qiankun-fe/main/src/share/components/comps/gaeaComps/KjTree.vue this.currentKey `,
            'background:#000;color:#bada55',
            this.currentKey
          );

          this.$refs.treeRef.setCurrentKey(this.currentKey || rootId);
        }
        this.$emit('nodeHandler', this.treeData[0] || {});
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    deleteRow() {
      console.log('deleteRow');
    },
    editRow() {
      console.log('editTow');
    },
    // 创建目录
    create() {
      this.$emit('create');
    },

    sleep(time = 0) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },

    /**
     * 递归获取目录结构
     */
    getMyPaths(exceptNode) {
      let myPaths = this.treeData;
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
          return (
            maxLayerNum -
            getMaxDepth(exceptNode[this.treeProps.children] || [], 1)
          );
        })();
        console.log('maxLayerNum', maxLayerNum);
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
      return data.name.indexOf(value) !== -1;
    },
    /**
     * 点击树节点
     */
    async clickNode(data) {
      this.currentKey = data.value;
      this.$emit('nodeHandler', data);
    },

    expandNode(data) {
      this.expandedKeys.push(data[this.nodeKey]);
    },
    collapseNode(data) {
      const index = this.expandedKeys.indexOf(data[this.nodeKey]);
      index > -1 && this.expandedKeys.splice(index, 1);
    }
  }
};
</script>
