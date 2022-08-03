<template>
  <el-input
    v-model="iptValue"
    v-bind="$attrs"
    :placeholder="handlePlaceholder()"
    :size="$attrs.size || 'small'"
    class="kd-ipt"
    :clearable="$attrs.clearable !== false"
    :class="{'kd-textarea':$attrs.type ==='textarea'}"
    :style="{...mHandleWidth()}"
    :maxlength="handleMaxLength"
    show-word-limit
    v-on="$listeners"
    @focus="focusHandler($event)"
    @keyup.delete.native="keyUpDeleteHandler()"
  >
    <div
      v-if="$attrs.title"
      slot="prepend"
    >
    {{ $attrs.title }}
    </div>
  </el-input>
</template>

<script>
export default {
  name: "KdInput",
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      required: false,
    }
  },
  computed: {
    // 主要是为了处理， 如果type是password的情况, 值的修改
    iptValue: {
      set(v) {
        this.$emit('input', v)
      },
      get() {
        return this.value
      }
    },
    // 如果是textarea。 默认文本长度为200
    handleMaxLength() {
      if (this.$attrs.type === 'textarea') {
        if (this.maxlength) {
          return this.maxlength
        } else {
          return 200
        }
      } else {
        return ''
      }
    },
  },
  created() { },
  methods: {
    handlePlaceholder() {
      const { $attrs } = this;
      let res = $attrs.disabled ? "" : $attrs.placeholder || "请输入";
      return res;
    },
    // 如果是密码输入框, 删除直接清空所有文本
    keyUpDeleteHandler() {
      if (this.$attrs.type === 'password') {
        this.iptValue = ""
      }
    },
    // 如果是密码输入框, focus直接选中文本
    focusHandler(evt) {
      if (this.$attrs.type === 'password') {
        evt.currentTarget.select()
      }
    },
    // 根据传入的width, 返回处理后的width
    mHandleWidth(){
      if(!this.width){
        return {}
      }
      if(this.width.indexOf('px')!== -1 || this.width.indexOf('%') !== -1){
        return {width: this.width}
      }
      return {width: this.width + 'px'}
    }
  },
};
</script>
<style lang="scss" src="./index.scss"></style>
