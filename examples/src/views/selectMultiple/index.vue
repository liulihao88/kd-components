<template>
  <div>
    <h3>下拉选择</h3>
    <div class="author">维护人：刘月鹏</div>
    <div class="sub-title">基于el-select的二次封装，el-select的所有属性与方法均适配。</div>

    <h5>基础用法</h5>
    <div class="example-wrap">
      <kd-select-multiple
        v-model="form.checkFiled"
        :options="form.allFiled"
        :default-props="defaultProps"
        value-key="value"
        :is-object="true"
        multiple
        collapse-tags
        placeholder="请选择"
      ></kd-select-multiple>
    </div>
    <example-code :source="source1">
      设置 defaultProps 和 v-model 和 options 选项数组即可；is-object
      为true时需要设置value-key,默认为value，选择后的值为[{name: "id"},{name: "name"}] is-object 为 false
      ,选择的值内容为['id','name']
    </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode';
import source1 from './source/source1.md';
export default {
  name: 'TestSelectMultiple',
  components: {
    ExampleCode,
  },
  data() {
    return {
      form: {
        allFiled: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
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
        ], // 字段下拉
        checkFiled: [
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
      },
      /**
       * 映射字段，可自定义
       */
      defaultProps: {
        value: 'value',
        label: 'label',
      },
      source1,
    };
  },
};
</script>
<style lang="scss" scoped>
.author {
  margin-bottom: 10px;
  font-size: 12px;
  font-style: italic;
}
.sub-title {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}
.example-wrap {
  width: 600px;
  margin-bottom: 20px;
}
.advanced-wrap {
  border: 1px solid var(--line-color);

  .title {
    height: 40px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--line-color);
  }

  .main {
    padding: 16px;

    .row-select:nth-child(-n + 3) {
      margin-bottom: 16px;
    }
  }
}
</style>
