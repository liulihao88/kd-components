<template>
  <div class="kd-select">
    <div v-if="title" class="left_box">
      {{ title }}
    </div>
    <el-select class="right_box" popper-class="kd-custom-multiple-checkbox" v-bind="$attrs" v-on="$listeners">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <slot :item="item">{{ item.label }}</slot>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'KdSelectA',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
