<!--
 * @description: step,根据屏幕宽度和step的数量自适应。
 * @author: huruirui@keendata.com
 !-->
<template>
  <div class="task-step">
    <ul ref="taskStep" class="step-container">
      <li
        v-for="(item, index) in steps"
        :key="index"
        :class="{ finished: index + 1 < active, active: index + 1 === active }"
      >
        <span class="li-span">
          <i :class="{ 'el-icon-circle-check': index + 1 < active }">
            {{ index + 1 }}
          </i>
          <span>{{ item.name }}</span>
        </span>
        <em :style="{ width: stepWidth + 'px' }"></em>
      </li>
    </ul>
  </div>
</template>
<script>
// import { debounce } from "@/share/utils/gFunc";
export default {
  name: 'KdStep',
  props: {
    steps: {
      type: Array,
      require: true,
      default() {
        return [{ name: '同步配置' }, { name: '读取配置' }, { name: '任务设置' }];
      },
    },
    active: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      stepWidth: 100,
    };
  },
  watch: {
    steps() {
      this.$nextTick(() => {
        this.computedStepWidth();
      });
    },
  },
  mounted() {
    let _this = this;
    this.computedStepWidth();
    window.addEventListener('resize', _this.computedStepWidth, true);
  },
  destroyed() {
    window.removeEventListener('resize', this.computedStepWidth, true);
  },
  methods: {
    computedStepWidth() {
      let containerWidth = this.$refs.taskStep && this.$refs.taskStep.clientWidth;
      let domLi = document.getElementsByClassName('li-span');
      let stepLength = this.steps.length;
      let lineMargin = (stepLength - 1) * 32;
      let textLength = 0;
      for (let item of domLi) {
        textLength += item.offsetWidth;
      }
      this.stepWidth = (containerWidth - (textLength + lineMargin)) / (stepLength - 1);
    },
  },
};
</script>
