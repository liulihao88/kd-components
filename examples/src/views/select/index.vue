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
      :default-props="{ label: 'name' }"
      @changeSelect="changeSelect"
    ></kd-select>
    <!-- 改变label -->
    <kd-select
      v-model="t3"
      :title="'改变label=>' + t3"
      class="mr"
      width="500"
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
      :default-props="{ label: 'name', value: 'value2' }"
      @changeSelect="changeSelect"
    ></kd-select>
  </div>
</template>

<script>
import { $toast } from 'utils';
export default {
  name: 'Index',
  data() {
    return {
      t1: '梅梅',
      t2: 'mm',
      t3: '',
      t4: ['ss', 'rr'],
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
    };
  },
  methods: {
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
