```html
<template>
  <div>
    <h6>基础用法</h6>
    <kd-select-a v-model="val0" :title="title" :options="options"> </kd-select-a>
    <h6>多选用法</h6>
    <kd-select-a v-model="val" multiple collapse-tags title="基础用法" :options="options">
      <template slot-scope="{ item }">
        <el-checkbox v-model="item.checked" :disabled="item.disabled">{{ item.label }}</el-checkbox>
      </template>
    </kd-select-a>
    <h6>多选自定义模版用法</h6>
    <kd-select-a v-model="val" multiple collapse-tags title="基础用法" :options="options">
      <template slot-scope="{ item }">
        <div>
          <span style="float: left">
            <el-checkbox v-model="item.checked" :disabled="item.disabled" @click.prevent.native
              >{{ item.label }}</el-checkbox
            ></span
          >
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </div>
      </template>
    </kd-select-a>
    <h6>异步加载</h6>
    <kd-select-a
      v-model="val1"
      multiple
      filterable
      remote
      reserve-keyword
      title="基础用法"
      :options="options1"
      :remote-method="remoteMethod"
      :loading="loading"
    >
    </kd-select-a>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        val0: '', // 选中的数据
        val: [], // 选中的数据
        val1: ['黄金糕'],
        loading: true,
        options: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
            disabled: true,
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
        options1: [],
      };
    },
    computed: {
      title() {
        return '基础用法>>' + this.val0;
      },
    },
    methods: {
      removeTagHandle(tag) {
        console.log(tag, 'tag');
      },
      valueChangeHandle(val) {
        console.log(val);
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options1 = this.options.filter((item) => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options1 = [];
        }
      },
    },
  };
</script>
```
