<template>
  <el-input
    v-on="$listeners"
    v-bind="$attrs"
    v-model="iptValue"
    :placeholder="handlePlaceholder()"
    class="kd-ipt"
    :clearable="$attrs.clearable !== false"
    :class="{ 'kd-textarea': $attrs.type === 'textarea' }"
    :style="{ ...mHandleWidth() }"
    :maxlength="handleMaxLength"
    :show-word-limit="handleShowWordLimit()"
    @focus="focusHandler($event)"
    @keyup.delete.native="keyUpDeleteHandler()"
  >
    <div v-if="$attrs.title" slot="prepend">
      {{ $attrs.title }}
    </div>
  </el-input>
</template>

<script>
export default {
  name: "KdInput",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    width: {
      type: [String, Number],
      default: ''
    },
    showWordLimit: {
      type: [Boolean, String],
      default: ""
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 主要是为了处理， 如果type是password的情况, 值的修改
    iptValue: {
      set(v) {
        this.$emit("input", v);
      },
      get() {
        return this.value;
      }
    },
    // 如果是textarea。 默认文本长度为200
    handleMaxLength() {
      if (this.$attrs.type === "textarea") {
        return this.$attrs.maxlength || 200;
      } else {
        return this.$attrs.maxlength || "";
      }
    }
  },
  created() {},
  methods: {
    handlePlaceholder() {
      const { $attrs } = this;
      let res = $attrs.disabled ? "" : $attrs.placeholder || "请输入";
      return res;
    },
    // 如果是密码输入框, 删除直接清空所有文本
    keyUpDeleteHandler() {
      if (this.$attrs.type === "password") {
        this.iptValue = "";
      }
    },
    // 是否显示showWordLimit属性
    handleShowWordLimit() {
      if (typeof this.showWordLimit === "boolean") {
        return this.showWordLimit;
      }
      if (this.$attrs.type === "textarea") {
        return true;
      }
      return false;
    },
    // 如果是密码输入框, focus直接选中文本
    focusHandler(evt) {
      if (this.$attrs.type === "password") {
        evt.currentTarget.select();
      }
    }
  }
};
</script>
