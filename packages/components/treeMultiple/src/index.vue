<!--
 * @description: 树形结构 多选, 获取最后一级的数据
 * @params: isObject true 返回数组是[{name:'',id: ''}], false 返回数组 [2,3]
 * @author: huruirui@keendata.com
 !-->
<template>
  <div class="orgtree">
    <el-select
      ref="selectTree"
      v-bind="$attrs"
      v-model="pIds"
      multiple
      collapse-tags
      :clearable="false"
      :value-key="nodeKey"
      placeholder="请选择..."
      @remove-tag="tagRemove"
    >
      <el-option
        v-for="item in checkLists"
        :key="item[defaultProps.value]"
        :value="isObject ? item : item[defaultProps.value]"
        :label="item[defaultProps.label]"
        style="height: auto"
        hidden
      />
      <div class="search-style">
        <el-input
          v-model="searchValue"
          placeholder="输入关键字搜索"
          suffix-icon="el-icon-search"
          @input="filterMethod"
        />
      </div>
      <el-tree
        ref="orgTree"
        class="kj-tree"
        :data="tableData"
        :props="defaultProps"
        :node-key="nodeKey"
        :show-checkbox="showCheckbox"
        :filter-node-method="filterNode"
        :default-expanded-keys="expandedKeys"
        @check="handleCheckChange"
      />
    </el-select>
  </div>
</template>

<script>
// import { getOrgList } from '@/server/orgApi'
export default {
  name: "KjTreeMultiple",
  props: {
    value: {
      type: [Array, Number, String, Object],
      default() {
          return []
      },
    },
    isObject: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    nodeKey: {
      type: String,
      default: "id", // 当isObject为true时，一定要配置该字段
    },
    edit: {
      type: Boolean,
      default: false, // true,说明拿到的数据，在外部会再次被增删改，不设置不进行比对。节省资源
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          value: "id",
          label: "name",
          children: "children",
        };
      }
    }
  },
  data() {
    return {
      checkList: [],
      searchValue: ''
    };
  },
  computed: {
    expandedKeys() {
      return Array.from(this.checkList, item => item[this.defaultProps.value])
    },
    checkLists() {
      return this.checkList.length <= 0 ? [{}] : this.checkList.slice()
    },
    pIds: {
      get() {
        let nowValue = Array.isArray(this.value) ? this.value.slice() : []
        this.$nextTick(() => {
          if(this.isObject) {
            this.checkList = nowValue
            this.$refs.orgTree.setCheckedNodes(nowValue)
            this.$emit("change", nowValue, this.expandedKeys)
          } else {
            this.checkList = Array.from(nowValue, item => this.$refs.orgTree.getNode(item).data)
            this.$refs.orgTree.setCheckedKeys(nowValue)
            this.$emit("change", nowValue, nowValue)
          }
        })
        return nowValue;
      },
      set(v) {
        this.$emit("input", JSON.parse(JSON.stringify(v)))
      },
    },
  },
  methods: {
    handleCheckChange(data) {
      let nodes = this.$refs.orgTree.getCheckedNodes(true)
      let filterData = nodes
      /**
       * 设置edit,说明拿到的数据，在外部会再次被增删改，不设置不进行比对。节省资源
       */
      if(this.edit) {
        // 当数据增加时,合并数据
        if(this.pIds.length < nodes.length) {
          let pidValues = Array.from(this.pIds, item => item[this.nodeKey])
          filterData = Array.from(nodes, item => {
            let nodeIndex = pidValues.findIndex(pidItem => pidItem === item[this.nodeKey])
            if(nodeIndex >= 0) {
              return this.pIds[nodeIndex]
            } else {
              return item
            }
          })
        } else if(this.pIds.length > nodes.length) {
          // 当数据减少时,过滤删除的数据
          let nodeValues = Array.from(nodes, item => item[this.nodeKey])
          filterData = this.pIds.filter(item => nodeValues.includes(item[this.nodeKey]))
        }
      }
      this.checkList = filterData
      if(this.isObject) {
        this.pIds = filterData.slice();
      } else {
        this.pIds = this.$refs.orgTree.getCheckedKeys(true)
      }
      this.$emit('currentNode',data)
    },
    tagRemove(value) {
      this.$emit('currentNode',value)
    },
    filterMethod(query) {
      this.$refs.orgTree.filter(query);
    },
    // 筛选树
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
  },
};
</script>
<style scoped lang="scss">
.orgtree {
  width: 100%;
  .el-select {
    width: 100%;
  }
}
.kj-tree {
  padding-right: 8px;
}
.search-style {
  padding: 8px 16px 8px;
}
</style>
