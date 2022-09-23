<template>
  <i :class="`kd-icon-${name}`"></i>
</template>

<script>
  export default {
    name: 'KdIcon',
    props: {
      name: String
    }
  };
</script>
