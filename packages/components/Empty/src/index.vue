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
import group_null from './img/group_null.png'
export default {
    name: 'KdEmpty',
    props: {
        img:{
            type: String,
            default: () => {
                return group_null
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
