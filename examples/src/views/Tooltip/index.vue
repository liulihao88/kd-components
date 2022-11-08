<template>
  <div>
    <example-title
      :data="{
        title: 'Tooltip 文字提示',
        subTitle: '常用于展示鼠标 hover 时的提示信息。',
        maintenance: '胡瑞瑞',
        author: '',
      }"
    ></example-title>
    <example-code :source="source1Md">
      <div style="width: 100px">
        <kd-tooltip width="80%" :content="text" @click="clickHandler"></kd-tooltip>
      </div>

      <!-- 分割线 -->
      <div class="divider"></div>

      <div style="width: 100px">
        <kd-tooltip width="70px" :content="textPx" placement="bottom"></kd-tooltip>
      </div>

      <!-- 分割线 -->
      <div class="divider"></div>

      <div>
        <kd-tooltip :content="textslot" :slot-show="true">
          <i class="el-icon-user-solid"></i>
        </kd-tooltip>
      </div>
    </example-code>
  </div>
</template>

<script>
import { $toast } from '../../../../packages/utils';
import source1Md from './source/source1.md';

export default {
  name: 'TestKdTooltip',
  data() {
    return {
      source1Md: source1Md,
      text: '测试kd-tooltip组件使用宽度百分比',
      textPx: '测试kd-tooltip组件使用宽度px',
      textslot: '测试kd-tooltip组件使用插槽',
    };
  },
  methods: {
    clickHandler() {
      $toast('点击了click');
    },
  },
};
</script>
<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 1px;
  background: #e3e6eb;
  margin: 10px 0;
}
</style>
