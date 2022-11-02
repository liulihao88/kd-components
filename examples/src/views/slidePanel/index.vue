<template>
  <div>
    <h3>布局拖拽容器</h3>
    <div class="author">维护人：刘月鹏</div>
    <div class="sub-title">左右布局拖拽组件基于 vue-multipane 的二次封装</div>

    <h5>基础用法</h5>
    <div class="example-wrap" style="width: 100%">
      <kd-slide-panel class="kd-panel" :left-width="240" :min-width="200" :max-width="360">
        <template #left>
          <div>左侧容器</div>
        </template>
        <template #right>
          <div>右侧容器</div>
        </template>
      </kd-slide-panel>
    </div>
    <example-code :source="source1"> 左右布局 配置好 leftWidth minWidth maxWidth #left #right </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode.vue';
import source1 from './source/source1.md';
export default {
  name: 'TestSelectMultiple',
  components: {
    ExampleCode,
  },
  data() {
    return {
      source1,
    };
  },
};
</script>
<style scoped lang="scss">
.kd-panel {
  width: 100%;
  height: 300px;
  border: 1px solid gray;
}
</style>
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
