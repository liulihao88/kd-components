```vue 
 
<!--
des: is-object 为true时需要设置value-key,默认为value，选择后的值为[{name: "id"},{name: "name"}]
    is-object 为 false ,选择的值内容为['id','name']
-->
<template>
  <div>
    <!-- 单一select -->
    <kd-select v-model="t1" title="简单的select" :options="t1Options" class="mr" type="simple" />
    <!-- 常用select -->
    <kd-select title="最常用select" v-model="t2" class="mr" :options="t2Options" :defaultProps="{label: 'name'}" />

  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      t1: '梅梅',
      t2: 'mm',
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
      ]
    };
  }
};
</script>

 ```