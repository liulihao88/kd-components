<template>
  <div>
    <div style="width:100px;">
      <kd-tooltip
        width="80%"
        @click="clickHandler"
        :content="text"
      />
    </div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <div style="width:100px;">
      <kd-tooltip
        width="70px"
        :content="textPx"
        placement="top"
      />
    </div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <div>
      <kd-tooltip
        :content="textslot"
        :slot-show="true"
      >
        <i class="el-icon-user-solid"></i>
      </kd-tooltip>
    </div>
  </div>


</template>

<script>
import {$toast} from "../../../../packages/utils";

export default {
  name: "testKdTooltip",
  data () {
    return {
      text:'测试kd-tooltip组件使用宽度百分比',
      textPx:'测试kd-tooltip组件使用宽度px',
      textslot: '测试kd-tooltip组件使用插槽'
    }
  },
  methods: {
    clickHandler() {
      $toast("点击了click");
    }
  }
}
</script>
<style lang="scss" scoped>
.divider{
  width: 100%;
  height: 1px;
  background: #e3e6eb;
  margin: 10px 0;
}
</style>

