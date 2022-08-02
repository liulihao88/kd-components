<template>
  <div
    class="kj-affix-footer"
    v-bind="$attrs"
    :style="boxStyle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "KjAffixFooter",
  props: {
    offsetTop: {
      type: [String, Number, undefined]
    },
    offsetBottom: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    boxStyle() {
      console.log(typeof this.offsetTop, 1222);
      if(typeof this.offsetTop === "string" || typeof this.offsetTop === "number") {
        return {
          top: this.offsetTop
        }
      } else {
        return {
          bottom: this.offsetBottom
        }
      }
    }
  }
}
</script>

<style lang="scss">
.kj-affix-footer {
  position: fixed;
  z-index: 50;
  height: 56px;
  bottom: 0;
  left: 184px;
  right: 0;
  text-align: center;
  padding: 11px 0 12px 0;
  box-sizing: border-box;
  border-top: 1px solid var(--line-color);
  transition: all 0.2s linear;
  margin: 0 auto;
  background-color: var(--bg-color);
}
.hideSidebar {
  .kj-affix-footer {
    left: 54px;
  }
}
</style>
