<template>
  <div>
    <example-title :data="{ title: '页面标题组件', maintenance: '刘云' }">
      页面标题组件，它从当前页面的路由中获取标题文本，即this.$route.meta.title，同时也可以自定义文本。<br />
      提供了一个基本的左右布局，通过default（即title）、extend、left、right
      四个插槽进行内容扩展，可以在已有布局下扩展不同业务需要。
    </example-title>

    <h5>基础用法</h5>
    <kd-page-title title="模型概览"></kd-page-title>
    <example-code :source="source1" style="margin-top: 20px">
      该组件主要就是为了展示当前页面的title，前提是当前路由有meta.title属性有值。<br />
      通过title属性可以自定义标题文本。默认插槽也可以修改title区域内容。<br />
    </example-code>

    <h5>样式配置</h5>
    <kd-page-title
      title="模型概览"
      :border="isBorder"
      :height="height"
      :padding="padding"
      :title-styles="styles"
    ></kd-page-title>
    <div class="btn-wrap">
      <el-button type="primary" @click="isBorder = !isBorder">border：{{ isBorder }}</el-button>
      <el-button type="primary" @click="changeHeight">height：{{ height }}</el-button>
      <el-button type="primary" @click="changePadding">padding：{{ padding }}</el-button>
    </div>
    <example-code :source="source2" style="margin-top: 20px">
      基于现有需求，page-title需要控制的样式主要有：<br />
      - 底边框默认为显示，border可以控制组件是否显示底部边框<br />
      - 高度默认为44px，也可通过height属性自定义<br />
      - 内边距默认为左右各24px，有些情况下当外层容器已经配置padding时组件中需要设置padding="0"<br />
      - title-text-styles，可以对标题文本样式做调整，只对文本起作用
    </example-code>

    <h5>插槽</h5>
    <kd-page-title title="模型概览">
      <template slot="extend">
        <i class="el-icon-warning-outline" style="margin-left: 8px"></i>
      </template>
      <template slot="right">
        <el-button type="info">查看详情</el-button>
        <el-button type="primary">添加模型</el-button>
      </template>
    </kd-page-title>
    <example-code :source="source3" style="margin-top: 20px">
      提供了以下插槽：<br />
      - default：用来配置title文本区域<br />
      - extend：用来扩展title的数据展示，一般用来附加个小图标、状态tag之类的<br />
      - left：用来自定义整个左侧区域<br />
      - right：用来自定义右侧操作区域，一般都用来放置按钮，所以该区域默认是flex布局<br />
    </example-code>
  </div>
</template>

<script>
import source1 from './source/source1.md';
import source2 from './source/source2.md';
import source3 from './source/source3.md';
export default {
  name: 'Index',
  data() {
    return {
      source1,
      source2,
      source3,
      isBorder: false,
      height: '44px',
      padding: '0',
      styles: {
        color: 'red',
        fontSize: '18px',
      },
    };
  },
  methods: {
    changeHeight() {
      if (this.height === '44px') {
        this.height = 'auto';
      } else if (this.height === 'auto') {
        this.height = '44px';
      }
    },
    changePadding() {
      if (this.padding === '0') {
        this.padding = '0 24px';
      } else if (this.padding === '0 24px') {
        this.padding = '0';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-wrap {
  margin-top: 20px;
}
</style>
