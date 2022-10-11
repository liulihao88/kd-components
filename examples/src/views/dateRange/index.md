``` 
<template>
  <div>
    <kd-date-range title="基础用法" v-model="val" />
    <kd-date-range
      class="mt"
      title="只能选择过去的时间"
      v-model="dateValue"
      futureDisabled
    />
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      val: [],
      dateValue: []
    };
  }
};
</script>

 ```

### 组件接收参数
参数 | 说明 |   类型    | 默认值
:---:|:--:|:-------:|:---:
title|  左侧标题  | String  | 无
futureDisabled| 只能选择今天和以前的时间 | Boolean |false

剩余参数可参考element中的Tooltip组件直接传值就可以.

