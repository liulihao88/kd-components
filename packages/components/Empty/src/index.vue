<template>
  <div class="kd-empty">
    <div>
      <img :src="img" :style="{ ...mHandleWidth() }" alt="" />
      <p>{{ title }}</p>
    </div>
  </div>
</template>
<script>
import group_null from './img/group_null.png';
export default {
  name: 'KdEmpty',
  props: {
    img: {
      type: String,
      default: () => {
        return group_null;
      },
    },
    width: {
      type: [String, Number],
      default: () => {
        return '100px';
      },
    },
    title: {
      type: String,
      default: '暂无数据',
    },
  },
};
</script>
