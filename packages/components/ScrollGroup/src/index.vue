<template>
  <div
    class="kd-scroll-group"
    :style="{ '--min-width': minWidth + 'px', '--height': height + 'px', '--space': space + 'px'}"
    :type="type"
  >
    <el-button v-show="showArrow" class="btn m-r-8" icon="el-icon-arrow-left" @click="toLeft"></el-button>
    <div class="scroll-wrap">
      <el-scrollbar ref="scrollContain" class="inner-scrollbar scroll-x" native>
          <div ref="tInner" class="inner-wrap" @click="onClick">
            <div
              v-for="(item, index) in options"
              :key="index"
              class="item"
              :data-value="item.value"
              :class="{ active: curValue === item.value }"
            >
              {{ item.label }}
            </div>
          </div>
      </el-scrollbar>
    </div>
    <el-button v-show="showArrow" class="btn m-l-10" icon="el-icon-arrow-right" @click="toRight"></el-button>
  </div>
</template>

<script>
export default {
  name: "KdScrollGroup",
  props: {
    // 绑定值
    value: {
      type: String,
      default: ""
    },
    // 选项数组，{label:'',value:''}
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 类型group，button，tag，custom
    type: {
      type: String,
      default: "group"
    },
    // 按钮间距
    space: {
      type: Number,
      default: 16
    },
    // 选项最小宽度
    minWidth: {
      type: String,
      default: ""
    },
    // 高度
    height: {
      type: Number,
      default: 34
    },
    // 强制显示箭头，默认情况只有超宽时显示
    forceShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showArrow: false
    };
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContain.$refs.wrap;
    },
    curValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  watch: {
    options: {
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.onResize();
          });
        }
      },
      deep: true,
      immediate: true
    },
    curValue: {
      handler(oVal, nVal) {
        if (oVal !== nVal) {
          this.$emit("change", nVal);
        }
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize(){
      this.$nextTick(() => {
        if (this.forceShow) {
          this.showArrow = true;
        } else {
          this.showArrow = this.$el.scrollWidth < this.$refs.tInner.scrollWidth;
        }
      })
    },
    onClick(e) {
      this.curValue = e.target.dataset.value;
    },
    toLeft() {
      this.scrollWrapper.scrollLeft = this.scrollWrapper.scrollLeft - (this.minWidth || 50);
    },
    toRight() {
      this.scrollWrapper.scrollLeft = this.scrollWrapper.scrollLeft + (this.minWidth || 50);
    }
  }
};
</script>