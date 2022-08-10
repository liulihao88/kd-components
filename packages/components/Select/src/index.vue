<template>
    <div class="kd-select" :style="{ ...handleWidth() }">
      <div v-if="title" class="left_box">
        {{ title }}
      </div>
      <el-select
        class="right_box"
        v-loading="loading"
        size="small"
        v-bind="$attrs"
        :filterable="$attrs.filterable !== false"
        :placeholder="$attrs.disabled ? '' : $attrs.placeholder || '请选择'"
        :clearable="$attrs.clearable !== false"
        v-on="$listeners"
        @change="changeHandler"
      >
        <el-option
          size="small"
          v-for="item in options"
          :key="type === 'simple' ? item : handleValue(item)"
          :label="type === 'simple' ? item : handleLabel(item)"
          :value="type === 'simple' ? item : handleValue(item)"
        />
      </el-select>
  </div>
</template>

<script>
/**
* @描述
* 下拉选择框的组件封装
* @使用方法
   1. 简单的options, 纯数组
    <kd-select
      v-model="tt"
      :options="TEST_DATA2"
      type="simple"
    />
     TEST_DATA2: ['andy', '凌云', 18],
  2. 复杂的options, 数组对象
   <kd-select
      v-model="tt2"
      :options="TEST_DATA"
      :defaultProps="{label: 'name'}"
    />
    TEST_DATA: [
    {
      value: '选项1',
      name: '去年今日此门中'
    }, {
      value: '选项2',
      name: '人面桃花相映红'
    }
  ],

  objConnectValue: [
    { enName: 'andy', chName: '凌云', id: 111 },
    { enName: 'andy2', chName: '凌云2', id: 222 },
  ],
  3. 如果是多个参数拼接出来的选项
  <gSelect2
      v-model="value3"
      title="拼接下拉框"
      :options="objConnectValue"
      connect="|"
      :defaultProps="{
        label: ['enName', 'chName'],
        value: 'id',
      }"
    />
  4. 如果是自定义显示label。 :cusLabel="cusLabelFunc"
   <kd-select
      v-model="value3"
      title="自定义label下拉框"
      :options="objConnectValue"
      :cusLabel="(item)=>(`${item.enName}+${item.chName}` )"
      :defaultProps="{
        label: ['enName', 'chName'],
        value: 'id',
      }"
    />
* @param
*
* @LastEditTime: 最后更新时间
* 2022-03-17
* @Author: andy凌云
*/

export default {
  name: "KdSelect",
  components: {},
  props: {
    defaultProps: {
      type: Object,
      default: ()=>{
        return {
          value: 'value',
          label: 'label',
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    // 是简单的options 还是复杂options。默认复杂
    type: {
      type: String,
      default: '', // 简单选项'simple'
    },
    title: {
      type: String,
      default: ''
    },
    // 如果label显示多个参数的连接符
    connect: {
      type: String,
      default: '/',
    },
    // 自定义label显示多个参数的函数
    cusLabel: {
      type: [Function, String],
      default: '',
    },
    width: {
      type:[String, Number],
      required:false,
    }
  },
  data() {
    return {

    };
  },
  computed: {

  },
  watch: {

  },
  created() { },
  mounted() { },
  methods: {
    // 将label作为多个值连接起来。 比如 admin/管理员, 这是两个属性拼接出来的
    handleLabel(item) {
      // 如果cusLabel是函数就执行cusLabel的函数去处理label显示
      if (typeof this.cusLabel === 'function') {
        return this.cusLabel(item)
      } else {
        // 如果label是数组, 就拼接数组。
        if (Array.isArray(this.defaultProps.label)) {
          let str = ''
          this.defaultProps.label.forEach((v) => {
            str += item[v] + this.connect
          })
          let res = str.slice(0, -1)
          return res;
        } else {
          // 直接显示label
          const label = this.defaultProps.label || 'label'
          return item[label]
        }
      }
    },
    // 处理value的值
    handleValue(item){
      const value = this.defaultProps.value || 'value'
      return item[value]
    },
    changeHandler(val) {
      if (!val) {
        this.$emit("selectChange", []);
        return
      }
      let selectObj = this.options.filter(v => {
        if (this.type === 'simple') {
          return v === val
        } else {
          const value =this.defaultProps.value || 'value'
          return v[value] === val;
        }
      })[0];
      const optLabel = this.defaultProps.label || 'label';
      let selectLabel = selectObj.optLabel;
      this.$emit("selectChange", [val, selectLabel, selectObj]);
    },
    // 根据传入的width, 返回处理后的width
    handleWidth(){
      if(!this.width){
        return {}
      }
      if(this.width.indexOf('px')!== -1 || this.width.indexOf('%') !== -1){
        return {width: this.width}
      }
      return {width: this.width + 'px'}
    },
  }
};
</script>
