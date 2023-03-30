<template>
  <div class="kd_tree_single" :style="{ '--width': width }">
    <el-select
      ref="selectTree"
      :key="option.value"
      v-model="pId"
      v-bind="$attrs"
      :style="{ width: 'var(--width)' }"
      v-on="$listeners"
    >
      <el-option
        :key="option.value"
        :value="option.value"
        :label="option.label"
        style="height: auto"
        hidden
      ></el-option>
      <div v-if="filterable" class="tree_single_search_box">
        <el-input
          v-model="filterText"
          :placeholder="(searchAttrs && searchAttrs.placeholder) || '搜索'"
          :clearable="false"
          v-bind="searchAttrs"
          @input="filterMethod"
        ></el-input>
      </div>
      <div class="tree_single_tree_box">
        <el-tree
          ref="treeRef"
          :data="finallyData"
          :filter-node-method="filterNode"
          :current-node-key="option.value"
          v-bind="mergedTreeAttrs"
          @node-click="handleClickNode"
          v-on="treeListeners"
        >
          <div slot-scope="{ data }" :class="['single_node', { disabled: data.disabled }]">
            <span class="tree-node-span">{{ data[mergedTreeAttrs.props.label] }}</span>
          </div>
        </el-tree>
      </div>
    </el-select>
  </div>
</template>

<script>
import { addClass, removeClass } from 'element-ui/src/utils/dom';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'KdTreeSingle',
  components: {},
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    leafOnlyNode: {
      type: Boolean,
      default: false,
    },
    searchAttrs: {
      type: Object,
      default: () => {},
    },
    disabledTreeCheck: {
      type: Function,
      default() {
        return false;
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'id',
          label: 'name',
          children: 'children',
        };
      },
    },
    //配置是否可以搜索
    filterable: {
      type: Boolean,
      default: true,
    },
    nodeKey: {
      type: String,
      default: 'id',
    },
    width: {
      type: String,
      default: '316px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    treeAttrs: {
      type: Object,
      default: () => {
        return {};
      },
    },
    treeListeners: {
      type: Object,
      default: () => {
        return {};
      },
    },
    filterNodeMethod: {
      type: [String, Function],
      default: '',
    },
  },
  data() {
    return {
      option: {
        label: '',
        value: '',
      },
      expandedKeys: [],
      filterText: '', //筛选绑定值
      originDisabled: null,
    };
  },
  computed: {
    finallyData() {
      return isEmpty(this.tableData) ? this.treeData : this.tableData;
    },
    pId: {
      get() {
        if (this.finallyData.length > 0) {
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$nextTick(() => {
            if (this.value) {
              const node = this.$refs.treeRef.getNode(this.value);
              this.$refs.treeRef.setCurrentKey(node.key);
              this.option.label = node.data[this.mergedTreeAttrs.props.label];
              this.option.value = node.data[this.mergedTreeAttrs.props.value];
              this.expandedKeys = [this.value];
            }
          });
        }
        return this.value || '';
      },
      set(v) {
        this.$emit('input', v);
        this.$emit('change', v);
      },
    },
    mergedTreeAttrs() {
      return merge(
        {},
        {
          props: this.defaultProps,
          nodeKey: this.nodeKey,
          defaultExpandedKeys: this.expandedKeys,
          highlightCurrent: true,
        },
        this.treeAttrs
      );
    },
  },
  watch: {
    filterText(newVal) {
      this.$refs.treeRef.filter(newVal);
    },
    loading: {
      handler(val) {
        const dom = this.$refs.selectTree.$el.getElementsByTagName('i');
        if (val) {
          if (this.originDisabled === false) {
            this.$attrs.disabled = true;
          }
          addClass(dom[0], 'el-icon-loading');
          removeClass(dom[0], 'el-icon-arrow-up');
        } else {
          if (this.originDisabled === false) {
            this.$attrs.disabled = false;
          }
          removeClass(dom[0], 'el-icon-loading');
          addClass(dom[0], 'el-icon-arrow-up');
        }
      },
      immediate: false,
    },
  },
  created() {
    this.originDisabled = this.$attrs.disabled || false;
  },
  mounted() {},
  methods: {
    //节点点击事件
    handleClickNode(data, node) {
      // 给点击事件, 增加自定义方法
      if (this.$listeners['node-click']) {
        this.$emit('node-click', data, node);
      } else {
        if (data.disabled) {
          return;
        }
        if (this.leafOnlyNode && node.childNodes.length > 0) {
          return;
        }
        if (typeof this.disabledTreeCheck === 'function' && this.disabledTreeCheck(data, node)) {
          return;
        }
        // var node = this.$refs.treeRef.getNode(node.key);
        this.pId = node.data[this.mergedTreeAttrs.props.value];
        // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
        this.$refs.selectTree.blur();
      }
    },
    // 下拉框搜索
    filterMethod(query) {
      this.$refs.treeRef.filter(query);
    },
    // 筛选树
    filterNode(value, data) {
      // 自定义筛选树
      if (typeof this.filterNodeMethod === 'function') {
        return this.filterNodeMethod(value, data);
      } else {
        if (!value) return true;
        // return data.name.indexOf(value) !== -1;
        // 不区分大小写
        return data[this.mergedTreeAttrs.props.label].toLowerCase().includes(value.toLowerCase());
      }
    },
  },
};
</script>
