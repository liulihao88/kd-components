<template>
  <div class="markdown-body">
    <div class="notice">
      <div class="inner">
        <slot>代码示例</slot>
      </div>
    </div>
    <div class="markdown-inner">
      <transition name="el-zoom-in-top">
        <vue-markdown v-show="fold" :source="source"></vue-markdown>
      </transition>
    </div>
    <div v-if="source" class="footer" @click="triggerFold">
      <i :class="fold ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
      {{ fold ? '隐藏代码' : '显示代码' }}
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  name: 'ExampleCode',
  components: { VueMarkdown },
  props: {
    // notice: { type: String },
    source: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fold: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    triggerFold() {
      this.fold = !this.fold;
    },
  },
};
</script>

<style scoped lang="scss">
.markdown-body {
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  margin-top: 20px;

  .notice {
    padding: 10px;

    .inner {
      background-color: #fff;
      box-sizing: border-box;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      padding: 10px 20px;
      font-size: 14px;
      color: #5e6d82;
      line-height: 26px;
    }
  }
  ::v-deep {
    pre {
      background-color: #fafafa;
      color: #3182bd;
      font-size: 12px;
      line-height: 1.8;
    }
    *::selection {
      background-color: #d2a8ff;
      color: #1158c7;
    }
  }
  &:hover {
    box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%), 0 2px 4px 0 rgb(232 237 250 / 50%);
  }

  .footer {
    border-top: 1px solid #eaeefb;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    text-align: center;
    color: #d3dce6;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
  }
}
</style>
