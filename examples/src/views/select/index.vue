<template>
  <div>
    <!-- 单一select -->
    <kd-select
      v-model="t1"
      :title="'简单的=>' + t1"
      :options="t1Options"
      class="mr"
      width="100%"
      type="simple"
      @changeSelect="changeSelect"
    ></kd-select>
    <!-- 常用select -->
    <kd-select
      v-model="t2"
      :title="'最常用=>' + t2"
      class="mr mt"
      :options="t2Options"
      label="name"
      @changeSelect="changeSelect"
    ></kd-select>
    <!-- 改变label -->
    <kd-select
      v-model="t3"
      :title="'改变label=>' + t3"
      class="mr"
      :options="t3Options"
      :custom-label="(item) => `${item.name}(${item.value})`"
      @changeSelect="changeSelect"
    ></kd-select>
    <!-- 多选 -->
    <kd-select
      v-model="t4"
      :title="'多选=>' + t4"
      class="mr"
      multiple
      width="500"
      :options="t4Options"
      :custom-label="(item) => `${item.name}(${item.value2})`"
      label="name"
      val="value2"
      @changeSelect="changeSelect"
    ></kd-select>
    <!-- 禁用 -->
    <kd-select
      v-model="t5"
      :title="'禁用=>' + t4"
      class="mr"
      multiple
      :options="t4Options"
      :custom-label="(item) => `${item.name}(${item.value2})`"
      :option-disabled="optionDisabled"
      label="name"
      val="value2"
      @changeSelect="changeSelect"
    ></kd-select>

    <h5>异步加载</h5>
    <div>
      <kd-select
        v-model="t6"
        title="测试"
        :options="t6Options"
        class="mr"
        :loading="selectLoading"
        @changeSelect="changeSelect"
      ></kd-select>
      <el-button @click="showLoading">加载</el-button>
    </div>
    <example-code :source="source1">
      通过 loading 属性可以在组件数据异步加载时增加loading 动画，并且loading 期间是禁用状态
    </example-code>
  </div>
</template>

<script>
import { $toast } from 'utils';
import source1 from './source/source1.md';

export default {
  name: 'Index',
  data() {
    return {
      source1,
      t1: '梅梅',
      t2: 'mm',
      t3: '',
      t4: ['ss', 'rr'],
      t5: [],
      t6: '',
      t1Options: ['莎莎', '瑞瑞', '梅梅'],
      t2Options: [
        {
          name: '莎莎2',
          value: 'ss',
        },
        {
          name: '瑞瑞2',
          value: 'rr',
        },
        {
          name: '梅梅2',
          value: 'mm',
        },
      ],
      t3Options: [
        {
          name: '莎莎3',
          value: 'ss',
        },
        {
          name: '瑞瑞3',
          value: 'rr',
        },
        {
          name: '梅梅3',
          value: 'mm',
        },
      ],
      t4Options: [
        {
          name: '莎莎4',
          value2: 'ss',
        },
        {
          name: '瑞瑞4',
          value2: 'rr',
        },
        {
          name: '梅梅4',
          value2: 'mm',
        },
      ],
      selectLoading: false,
      t6Options: [],
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
    optionDisabled(item) {
      return item.value2 === 'ss' || item.value2 === 'mm';
    },
    changeSelect([val, obj, label]) {
      $toast(
        `val: ${JSON.stringify(val)} <br />  obj: ${JSON.stringify(obj)}<br />  label: ${JSON.stringify(label)}`,
        'i',
        {
          duration: 5000,
          dangerouslyUseHTMLString: true,
          showClose: true,
        }
      );
    },
  },
};
</script>
