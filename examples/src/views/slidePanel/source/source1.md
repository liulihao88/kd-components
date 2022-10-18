```vue
<template>
  <div>
    <kd-slide-panel class="kd-panel" :leftWidth="240" :minWidth="200" :maxWidth="360">
      <template #left>
        <div>左侧容器</div>
      </template>
      <template #right>
        <div>右侧容器</div>
      </template>
    </kd-slide-panel>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {};
  },
};
</script>
<style scoped lang='scss'>
.kd-panel {
  width: 100%;
  height: 600px;
  border: 1px solid gray;
}
</style>

 ```