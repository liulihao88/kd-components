<template>
  <div>
    <el-button @click="popWin">抽屉</el-button>
    <el-button @click="popWin2">自定义title和footer插槽</el-button>
    <el-button type="primary" @click="isShowMulty = true">嵌套抽屉</el-button>
    <kd-drawer
      ref="drawerRef"
      :visible.sync="isShow"
      title="提示"
      sub-title="examples/drawer/index.vue"
      @confirm="confirm"
    >
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="中文名" prop="realName">
          <kd-input v-model="form.realName"></kd-input>
        </el-form-item>
        <el-form-item label="英文名" prop="enName">
          <kd-input v-model="form.enName" v-focus></kd-input>
        </el-form-item>
      </el-form>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height: 200px"></div>
      <div style="background-color: pink; height: 500px"></div>
    </kd-drawer>
    <kd-drawer :visible.sync="isShow2" title="干啥" @confirm="confirmDialog">
      <template slot="title">
        <div>我是title</div>
      </template>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height: 200px"></div>
      <div style="background-color: pink; height: 500px"></div>
      <template #footer>
        <el-button type="primary" @click="isShow2 = false">我是footer按钮</el-button>
      </template>
    </kd-drawer>
    <kd-drawer
      :visible.sync="isShowMulty"
      title="提示"
      :size="800"
      :confirm-attrs="{
        disabled: true,
        type: 'danger',
      }"
      :cancel-attrs="{
        disabled: true,
        type: 'primary',
        size: 'large',
        loading: true,
      }"
      @confirm="confirmDialog"
    >
      第一层抽屉
      <el-button type="primary" @click="isShowMulty2 = true">打开内部抽屉</el-button>
      <kd-drawer :visible.sync="isShowMulty2" append-to-body @confirm="t2">
        <div slot="title">第二层抽屉</div>
        <el-button type="primary" @click="isShowMulty3 = true">测试</el-button>
        <kd-drawer :visible.sync="isShowMulty3" title="提示" append-to-body direction="ttb" :size="300" show-fullscreen>
          第三层抽屉
        </kd-drawer>
      </kd-drawer>
    </kd-drawer>
  </div>
</template>

<script>
import { $toast } from 'utils';
export default {
  name: 'Index',
  components: {},
  props: {},
  data() {
    return {
      isShow: false,
      isShow2: false,
      isShowMulty: false,
      isShowMulty2: false,
      isShowMulty3: false,
      form: {
        realName: '',
        enName: '',
      },
      rules: {
        realName: [{ required: true, message: '请输入中文', trigger: 'blur' }],
        enName: [this.mBlurRequired()],
      },
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    popWin() {
      this.isShow = true;
    },
    popWin2() {
      this.isShow2 = true;
    },
    confirmDialog() {},
    confirm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.isShow = false;
        } else {
          $toast('提交失败', 'e');
        }
      });
    },
    t2() {
      $toast('哈哈');
    },
  },
};
</script>
<style scoped lang="scss"></style>
