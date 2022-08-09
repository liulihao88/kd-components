<template>
  <i :class="`icon kj-iconfont icon-${name}`"></i>
</template>

<script>
  export default {
    name: 'KdIcon',
    props: {
      name: String
    }
  };
</script>
