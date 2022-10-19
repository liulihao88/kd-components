<template>
  <div>
    <h3>Input 输入框</h3>
    <div class="author">维护人：刘鑫</div>
    <div class="sub-title">
      通过鼠标或键盘输入字符
    </div>
    <div class="warning">
      <p>Input 为受控组件，它<strong>总会显示 Vue 绑定值</strong>。</p>
      <p>通常情况下，应当处理 <code>input</code> 事件，并更新组件的绑定值（或使用<code>v-model</code>）。否则，输入框内显示的值将不会改变。</p>
      <p>不支持 <code>v-model</code> 修饰符。</p>
    </div>

    <h5>基础用法</h5>
    <kd-input title="简单input" v-model="val" width="200" class="mb" />
    <example-code :source="source1">
      <!-- 设置 v-model/value 和 options 选项数组即可； -->
    </example-code>
    <h5>密码独占一行</h5>
    <kd-input
      v-model="val"
      title="密码独占一行"
      width="100%"
      type="password"
      class="mb"
    />
    <example-code :source="source2">
      <!-- 设置 v-model/value 和 options 选项数组即可； -->
    </example-code>
    <h5>文本域</h5>
    <div class="sub-title">
      用于输入多行文本信息，通过将 type 属性的值指定为 textarea。
    </div>
    <kd-input v-model="val" type="textarea" />
    <example-code :source="source3">
      <!-- 设置 v-model/value 和 options 选项数组即可； -->
    </example-code>
  </div>
</template>

<script>
import ExampleCode from "../../components/ExampleCode";
import source1 from "./source/source1.md";
import source2 from "./source/source2.md";
import source3 from "./source/source3.md";
export default {
  name: "Index",
  props: {},
  data() {
    return {
      val: "abc",
      source1,
      source2,
      source3
    };
  },
  components: { ExampleCode },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.warning {
  padding: 8px 16px;
    background-color: #fff6f7;
    border-radius: 4px;
    border-left: 5px solid #fe6c6f;
    margin: 20px 0;
}
.author{
  margin-bottom:10px;
  font-size:12px;
  font-style: italic;
}
.sub-title{
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}
code {
  background-color: #f9fafc;
    padding: 0 4px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    background-color: hsla(0,0%,100%,.7);
    color: #445368;
}
</style>
