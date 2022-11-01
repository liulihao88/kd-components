<template>
<div class="kd-table-search">
  <div class="first-row">
    <div class="left">
      <div class="form">
        <slot></slot>
      </div>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button @click="onReset">重置</el-button>
      <el-button type="text" v-if="hasMore" :icon="isFold?'el-icon-arrow-down':'el-icon-arrow-up'" @click="onFold">{{ isFold?'高级搜索':'收起' }}</el-button>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
  <div class="more-row" v-show="!isFold" ref="moreRow">
    <slot name="more"></slot>
  </div>
</div>
</template>

<script>
import { get } from "lodash";

export default {
  name: "KdTableSearch",
  data() {
    return {
      isFold:true, // 是否折叠
    };
  },
  computed: {
    hasMore(){
      return get(this.$slots,'more.length')>0
    }
  },
  methods: {
    onFold(){
      this.isFold=!this.isFold;
      this.$emit('onFold',this.isFold);
    },
    onSearch(){
      this.$emit('onSearch');
    },
    onReset(){
      this.$emit('onReset');
    }
  }
}
</script>