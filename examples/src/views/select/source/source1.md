```vue
<template>
  <div>
    <kd-select v-model="value" title="测试" :options="options" class="mr" :loading="loading"></kd-select>
    <el-button @click="showLoading">加载</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [],
      loading: false,
    };
  },
  methods: {
    showLoading() {
      this.selectLoading = true;
      setTimeout(() => {
        this.t6Options = [
          {
            name: '莎莎4',
            value: 'ss',
          },
          {
            name: '瑞瑞4',
            value: 'rr',
          },
          {
            name: '梅梅4',
            value: 'mm',
          },
        ];
        this.selectLoading = false;
      }, 5000);
    },
  },
};
</script>
```
