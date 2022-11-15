<template>
  <div class="kd-table-search">
    <div class="first-row">
      <div class="left">
        <div class="form">
          <slot></slot>
        </div>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button v-if="hasMore" type="text" @click="onFold">
          {{ isFold ? foldText : unFoldText }}
          <i :class="['el-icon-arrow-' + (isFold ? 'down' : 'up')]" style="margin-left: 8px"></i>
        </el-button>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div ref="moreRow" class="more-row" :style="{ height: isFold ? '0' : scrollHeight + 'px' }">
      <slot name="more"></slot>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';

export default {
  name: 'KdTableSearch',
  props: {
    foldText: { type: String, default: '高级搜索' },
    unFoldText: { type: String, default: '收起' },
  },
  data() {
    return {
      isFold: true, // 是否折叠
      scrollHeight: 0,
    };
  },
  computed: {
    hasMore() {
      return get(this.$slots, 'more.length') > 0;
    },
  },
  mounted() {
    if (this.hasMore) {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
  },
  beforeDestroy() {
    if (this.hasMore && this.onResize) window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onFold() {
      this.isFold = !this.isFold;
      this.$emit('onFold', this.isFold);
    },
    onSearch() {
      this.$emit('onSearch');
      this.$emit('search');
    },
    onReset() {
      this.$emit('onReset');
      this.$emit('reset');
    },
    onResize() {
      // 获取内容实际高度
      this.scrollHeight = this.$refs.moreRow.scrollHeight;
    },
  },
};
</script>
