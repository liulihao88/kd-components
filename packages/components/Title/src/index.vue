<template>
  <div class="kd-title">
    <div class="mtb  f-bt border">
    <div class="title f" ref="titleRef">
      <div>{{ title }}</div>
      <slot></slot>
    </div>
    <div class="f mr3">
      <slot name="right"></slot>
    </div>
  </div>
  </div>
</template>

<script>
/**
* @描述
* 公共title组件。可以设置title,  可以设置左侧竖条颜色
* @使用方法
<kd-title title="4. 回到顶部"></kd-title> 
<kd-title ttitle="左侧粉色" style="--lc: pink"/>
<kd-title
  title="自定义titile"
  style="--lc: yellow"
></kd-title>
* @param
* @LastEditTime: 最后更新时间
* 2022-03-02
* @Author: andy凌云
*/
export default {
  name: "KdTitle",
  props: {
     title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
  t1() {},
  }
}
</script>
<style lang="scss" src="./index.scss"></style>
