<template>
  <div class="kd-scroll-group" :style="{ '--height': height + 'px', '--space': space + 'px' }" :type="type">
    <div :class="['kd-scroll-group__wrap', forceShow || scrollable ? 'is-scrollable' : '']">
      <!--      :disabled="!scrollable.prev"-->
      <el-button
        v-show="forceShow || scrollable"
        :style="btnStyles"
        :disabled="navOffset <= 0"
        class="btn prev"
        :class="btnClass"
        icon="el-icon-arrow-left"
        @click="scrollPrev"
      ></el-button>
      <div ref="navScroll" class="kd-scroll-group__scroll">
        <div ref="nav" class="kd-scroll-group__list" :style="navStyle">
          <template v-for="(item, index) in options">
            <div
              :key="index"
              :class="['item', { active: value === item.value }, itemClass]"
              :style="itemStyles"
              @click="onClick(item.value)"
            >
              <slot v-bind="item" :index="index">
                {{ item.label }}
              </slot>
            </div>
          </template>
        </div>
      </div>
      <!--      :disabled="!scrollable.next"-->
      <el-button
        v-show="forceShow || scrollable"
        :disabled="navOffset >= navSize - containerSize"
        :style="btnStyles"
        class="btn next"
        :class="btnClass"
        icon="el-icon-arrow-right"
        @click="scrollNext"
      ></el-button>
    </div>

    <div class="test" style="position: absolute; bottom: -20px">
      偏移量={{ navOffset }} 容器尺寸={{ containerSize }} 内容尺寸={{ navSize }}
    </div>
  </div>
</template>

<script>
import { removeResizeListener } from 'element-ui/src/utils/resize-event';
import { cloneDeep } from 'lodash';

const firstUpperCase = (str) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
};
export default {
  name: 'KdScrollGroup',
  props: {
    // 绑定值
    value: {
      type: String,
      default: '',
    },
    // 两边按钮样式
    btnStyles: {
      type: Object,
      default: () => {
        return {};
      },
    },
    btnClass: {
      type: String,
      default: '',
    },
    // 强制显示箭头，默认情况只有超宽时显示
    forceShow: {
      type: Boolean,
      default: false,
    },
    // 选项数组，{label:'',value:''}
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 类型group，button，tag，custom
    type: {
      type: String,
      default: 'group',
    },
    // 按钮间距
    space: {
      type: Number,
      default: 16,
    },
    // 选项最小宽度
    itemStyles: {
      type: Object,
      default: () => {
        return {};
      },
    },
    itemClass: {
      type: String,
      default: '',
    },
    // 高度
    height: {
      type: Number,
      default: 34,
    },
  },
  data() {
    return {
      showArrow: false,
      scrollable: false, // 是否可滚动
      sizeName: 'width', // 尺寸变量
      navOffset: 0, // 偏移量
      containerSize: 0,
      navSize: 0,
    };
  },
  computed: {
    navStyle() {
      // const dir = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'X' : 'Y';
      return {
        transform: `translateX(-${this.navOffset}px)`,
      };
    },
  },
  watch: {
    type: {
      handler() {
        this.update();
      },
      immediate: true,
    },
    options: {
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.update();
          });
        }
      },
      deep: true,
      immediate: true,
    },
    forceShow() {
      this.update();
    },
    value() {
      console.log('value');
      // this.$nextTick(() => {
      //   this.scrollToActiveTab()
      // })
    },
  },
  mounted() {
    // this.update()
    addEventListener(this.$el, this.update);
    setTimeout(() => {
      this.scrollToActiveTab();
    }, 0);
  },
  beforeDestroy() {
    if (this.$el && this.update) removeResizeListener(this.$el, this.update);
  },
  updated() {
    console.log('updated');
    this.update();
    // console.log(this.scrollable)
  },
  methods: {
    update() {
      if (!this.$refs.nav) return;
      const sizeName = this.sizeName;
      // 内容尺寸（实际）
      const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`];
      this.navSize = navSize;
      // 容器尺寸（可视）
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`];
      this.containerSize = containerSize;
      // 当前偏移量
      const currentOffset = this.navOffset;
      // 内容尺寸与容器尺寸对比
      if (containerSize < navSize) {
        // 如果容器尺寸小于内容尺寸，则scrollable=true
        // this.$nextTick(() => {
        this.scrollable = true;
        const currentOffset = this.navOffset;
        // this.scrollable=this.scrollable || {};
        // this.scrollable.prev = currentOffset;
        // this.scrollable.next = currentOffset + containerSize < navSize;
        if (navSize - currentOffset < containerSize) {
          this.navOffset = navSize - containerSize;
        }
        // })
      } else {
        this.scrollable = false;
        if (currentOffset > 0) {
          this.navOffset = 0;
        }
      }
    },
    scrollPrev() {
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
      const currentOffset = this.navOffset;
      if (!currentOffset) {
        console.log(currentOffset);
        return;
      }
      this.navOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
    },
    scrollNext() {
      const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`];
      const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
      const currentOffset = this.navOffset;
      if (navSize - currentOffset <= containerSize) {
        console.log(navSize - currentOffset, containerSize);
        return;
      }
      this.navOffset =
        navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;
    },
    scrollToActiveTab() {
      if (!this.scrollable) return;
      // this.$nextTick(() =>{
      const nav = this.$refs.nav;
      const activeTab = this.$el.querySelector('.active');
      if (!activeTab) return;
      const navScroll = this.$refs.navScroll;
      const isHorizontal = true;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const maxOffset = isHorizontal
        ? nav.offsetWidth - navScrollBounding.width
        : nav.offsetHeight - navScrollBounding.height;
      const currentOffset = this.navOffset;
      let newOffset = currentOffset;

      if (isHorizontal) {
        // 水平排列
        if (activeTabBounding.left < navScrollBounding.left) {
          // 元素左侧超出边界
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          // 元素右侧超出边界
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        }
      }
      // 不考虑垂直排列
      // else {
      //   if (activeTabBounding.top < navScrollBounding.top) {
      //     newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
      //   }
      //   if (activeTabBounding.bottom > navScrollBounding.bottom) {
      //     newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
      //   }
      // }
      newOffset = Math.max(newOffset, 0);
      this.navOffset = Math.min(newOffset, maxOffset);
      // })
    },
    onClick(value) {
      this.$emit('input', value);
      this.$emit('change', {
        value,
        item: cloneDeep(this.options.find((x) => x.value === value)),
        index: this.options.indexOf((x) => x.value === value),
      });
      // this.update()
      this.$nextTick(() => {
        this.scrollToActiveTab();
      });
    },
  },
};
</script>
