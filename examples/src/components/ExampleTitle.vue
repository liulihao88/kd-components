<template>
  <div class="example-title">
    <h3>{{data.title}}</h3>
    <div class="author">
      维护人：{{data.maintenance}}
      <span class="m-l-10" v-if="data.author">开发人: {{data.author}}</span>
    </div>
    <div class="sub-title" v-if="data.subTitle">
      {{data.subTitle}}
    </div>
    <div class="warning" v-if="warning">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExampleTitle",
  props: {
    data: {
      type: Object,
      default: {
        title: 'Input 输入框',
        maintenance: '', // 维护人
        author: '', // 开发人
        subTitle: ''
      }
    },
    warning: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.example-title {
  margin-bottom: 20px;
  .warning {
    padding: 8px 16px;
    background-color: #fff6f7;
    border-radius: 4px;
    border-left: 5px solid #fe6c6f;
    margin: 20px 0;
  }
  .author{
    margin-bottom:10px;
    font-size:12px;
    font-style: italic;
  }
  .sub-title{
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  code {
    background-color: #f9fafc;
    padding: 0 4px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    background-color: hsla(0,0%,100%,.7);
    color: #445368;
  }
}
</style>
