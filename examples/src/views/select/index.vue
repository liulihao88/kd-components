<template>
  <div>
    <!-- 单一select -->
    <kd-select
      v-model="t1"
      :title="'简单的=>' + t1"
      :options="t1Options"
      @changeSelect="changeSelect"
      class="mr"
      width="120"
      type="simple"
    />
    <!-- 常用select -->
    <kd-select
      :title="'最常用=>' + t2"
      v-model="t2"
      class="mr"
      :options="t2Options"
      @changeSelect="changeSelect"
      :defaultProps="{ label: 'name' }"
    />
    <!-- 改变label -->
    <kd-select
      :title="'改变label=>' + t3"
      v-model="t3"
      class="mr"
      @changeSelect="changeSelect"
      :options="t3Options"
      :customLabel="(item) => `${item.name}(${item.value})`"
    />
    <!-- 多选 -->
    <kd-select
      :title="'多选=>' + t4"
      v-model="t4"
      class="mr"
      multiple
      :options="t4Options"
      @changeSelect="changeSelect"
      :customLabel="(item) => `${item.name}(${item.value2})`"
      :defaultProps="{ label: 'name', value: 'value2' }"
    />
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
          value: 'ss'
        },
        {
          name: '瑞瑞2',
          value: 'rr'
        },
        {
          name: '梅梅2',
          value: 'mm'
        }
      ],
      t3Options: [
        {
          name: '莎莎3',
          value: 'ss'
        },
        {
          name: '瑞瑞3',
          value: 'rr'
        },
        {
          name: '梅梅3',
          value: 'mm'
        }
      ],
      t4Options: [
        {
          name: '莎莎4',
          value2: 'ss'
        },
        {
          name: '瑞瑞4',
          value2: 'rr'
        },
        {
          name: '梅梅4',
          value2: 'mm'
        }
      ]
    };
  },
  methods: {
    changeSelect([val, obj, label]) {
      $toast(
        `val: ${JSON.stringify(val)} <br />  obj: ${JSON.stringify(
          obj
        )}<br />  label: ${JSON.stringify(label)}`,
        'i',
        {
          duration: 5000,
          dangerouslyUseHTMLString: true,
          showClose: true
        }
      );
    }
  }
};
</script>
