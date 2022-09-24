#### 一、 iframe 相互嵌套页面
- 问题： iframe嵌套的页面高度不准确，页面无法完全显示
- 解决方式：
  1.子页面代码,id 可以自定义
```
<template>
  <div
    id="real-time-detail"
  >
  内容
  </div>
</template>

// js 代码,页面无动态切换，放在mounted里即可，如果页面有切换显示，放在切换事件内执行。
this.$nextTick(() => {
     this.mPostMessageHeight('#real-time-detail')
 })
```
 2.父页面代码
```
<template>
  <div class="detail">
    <iframe
      id="kdIframe"
      ref="iframe"
      :src="src"
      frameborder="0"
      width="100%"
      :height="height"
      scrolling="no"
    />
  </div>
</template>

<script>
export default {
  name: 'RealtimeDetail',
  data() {
    return {
      src: '',
      height: ''
    }
  },
  mounted() {
    window.addEventListener('message', this.getHeight)
    // 清除定时器
    this.$once('hook:beforeDestroy', ()=>{
      window.removeEventListener('message', this.getHeight)
    })
  },
  methods: {
    getHeight(event) {
      document.querySelector('#kdIframe').style.height = event.data + 'px'
    }
  }

}
</script>

<style lang="scss" scoped>
.detail{
  height: fit-content;
  overflow: auto;
}
</style>

```


