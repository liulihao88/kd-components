<template>
  <div class="kd-empty">
    <div>
      <img 
        :src="img"
        :width="imageSize"
        alt=""
      >
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
export default {
    name: 'KdEmpty',
    props: {
        img:{
            type: String,
            default: () => {
                return require ('./img/group_null.png')
            }
        },
        imageSize: {
            type: String,
            default: () => {
                return '100px'
            }
        }
    }
}
</script>