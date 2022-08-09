<template>
  <div class="kd-multipane">
    <multipane class="horizontal-panes" layout="vertical" @paneResizeStop="paneResizeStop">
      <div class="left_panel" :style="{minWidth: minWidth+'px', width: lWidth+'px', maxWidth: maxWidth+'px'}">
        <slot name="left" />
      </div>
      <multipane-resizer class="resizer"></multipane-resizer>
      <div class="right_panel" :style="{ flexGrow: 1 }">
        <slot name="right" />
      </div>
    </multipane>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane';
export default {
  name: "KdSlidePanel",
  props: {
    leftWidth: {
      type: Number,
      default: 222
    },
    minWidth: {
      type: Number,
      default: 190
    },
    maxWidth: {
      type: Number,
      default: 450
    }
  },
  data() {
    return {
      lWidth: this.leftWidth,

    };
  },
  components: {
    Multipane,
    MultipaneResizer
  },
  created() {
    window.onresize = () => {
        //当触发window.onresize方法时调用子组件的方法重置代码结构区域大小
        // this.$refs.jobEditorDom && this.$refs.jobEditorDom.resizeCode();
        // this.bus.$emit('layoutEditor', true, window.innerWidth - this.lWidth - 67);
        // this.bus.$emit('resizeDiffEditor', true, window.innerWidth);
    }
  },
  mounted() {

  },
  methods: {
    /**
      * When user release the resize handle to stop resizing a pane
      */
    paneResizeStop(pane, container, size) {
      console.log('pane, container, size', pane, container, size);
      this.lWidth = parseInt(size);
      this.bus.$emit('layoutEditor', true, window.innerWidth - this.lWidth - 67);
    },
  }
};
</script>
<style lang="scss" src="./index.scss"></style>
