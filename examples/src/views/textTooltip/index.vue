<template>
  <div style="width:100px;height:100px">
    <text-tooltip
      width="80%"
      :text="text"
    />
    <text-tooltip
      width="70px"
      :text="textPx"
      kd-placement="bottom"
    />
  </div>

</template>

<script>
export default {
  name: "testTextTooltip",
  data () {
    return {
      text:'测试text-tooltip组件使用宽度百分比',
      textPx:'测试text-tooltip组件使用宽度px'
    }
  }
}
</script>

