```vue
<template>
  <kd-page-title title="模型概览" :border="isBorder" :height="height" :padding="padding" :title-styles="styles"></kd-page-title>
</template>

<script>
export default {
  data(){
    return {
      isBorder:false,
      height:'44px',
      padding:'0',
      styles:{
        color:'red',
        fontSize:'18px'
      }
    }
  }
}
</script>
```