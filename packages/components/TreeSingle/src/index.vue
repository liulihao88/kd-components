<template>
  <div class="kd_tree_single">
    <el-select
      ref="selectTree"
      :key="option.value"
      v-model="pId"
      v-bind="$attrs"
      :clearable="clearable"
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
          :placeholder="searchAttrs.placeholder || '搜索'"
          :clearable="searchAttrs.clearable !== false"
          v-bind="searchAttrs"
          suffix-icon="el-icon-search"
          @input="filterMethod"
        ></el-input>
      </div>
      <div class="tree_single_tree_box">
        <el-tree
          ref="treeRef"
          :data="tableData"
          :props="defaultProps"
          :node-key="nodeKey"
          :filter-node-method="filterNode"
          :default-expanded-keys="expandedKeys"
          highlight-current
          :current-node-key="option.value"
          @node-click="handleClickNode"
        >
          <div slot-scope="{ data }" :class="['single_node', { disabled: data.disabled }]">
            <span class="tree-node-span">{{ data[defaultProps.label] }}</span>
          </div>
        </el-tree>
      </div>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'KdTreeSingle',
  components: {},
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    leafOnlyNode: {
      type: Boolean,
      default: false,
    },
    disabledTreeCheck: {
      type: Function,
      default() {
        return false;
      },
    },
    tableData: {
      type: Array,
      required: true,
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
    // 配置是否可清空选择
    clearable: {
      type: Boolean,
      default: false,
    },
    nodeKey: {
      type: String,
      default: 'id',
    },
    searchAttrs: {
      type: Object,
      default: () => {},
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
    };
  },
  computed: {
    pId: {
      get() {
        if (this.tableData.length > 0) {
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$nextTick(() => {
            if (this.value) {
              const node = this.$refs.treeRef.getNode(this.value);
              this.$refs.treeRef.setCurrentKey(node.key);
              this.option.label = node.data[this.defaultProps.label];
              this.option.value = node.data[this.defaultProps.value];
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
  },
  watch: {
    filterText(newVal) {
      this.$refs.treeRef.filter(newVal);
    },
  },
  created() {},
  mounted() {},
  methods: {
    //节点点击事件
    handleClickNode(data, node) {
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
      this.pId = node.data[this.defaultProps.value];
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      this.$refs.selectTree.blur();
    },
    // 下拉框搜索
    filterMethod(query) {
      this.$refs.treeRef.filter(query);
    },
    // 筛选树
    filterNode(value, data) {
      if (!value) return true;
      // return data.name.indexOf(value) !== -1;
      // 不区分大小写
      return data[this.defaultProps.label].toLowerCase().includes(value.toLowerCase());
    },
  },
};
</script>
