<template>
  <div class="kd-table-search">
    <div class="kd-table-search_left-wrap">
      <!--旧系统，无模糊搜索-->
      <template v-if="oldModel">
        <div class="old-model-row">
          <slot></slot>
          <div style="font-size: 0">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </div>
        </div>
      </template>
      <!--新系统，有模糊搜索-->
      <template v-else>
        <div class="first-row">
          <div class="input-wrap">
            <slot></slot>
          </div>
          <div style="font-size: 0">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
            <el-button v-if="hasMore" type="text" @click="onFold">
              {{ isFold ? foldText : unFoldText }}
              <i :class="['el-icon-arrow-' + (isFold ? 'down' : 'up')]" style="margin-left: 8px"></i>
            </el-button>
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="!isFold" class="more-row">
            <slot name="more"></slot>
          </div>
        </el-collapse-transition>
      </template>
    </div>
    <div class="kd-table-search_right-wrap">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

export default {
  name: 'KdTableSearch',
  props: {
    oldModel: { type: Boolean, default: false },
    foldText: { type: String, default: '高级搜索' },
    unFoldText: { type: String, default: '收起' },
  },
  data() {
    return {
      isFold: true, // 是否折叠
    };
  },
  computed: {
    hasMore() {
      return get(this.$slots, 'more.length') > 0;
    },
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
  },
};
</script>
