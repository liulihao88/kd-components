<template>
  <div>
    <el-button @click="isShowDialog = true" type="primary">弹框</el-button>
    <el-button @click="popWin">抽屉</el-button>
    <el-button @click="popWin2">自定义title和footer插槽</el-button>
    <el-button @click="isShowMulty = true" type="primary">嵌套抽屉</el-button>
    <kd-drawer
      :visible.sync="isShow"
      title="提示"
      @confirm="confirm"
      ref="drawerRef"
    >
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="中文名" prop="realName">
          <kd-input v-model="form.realName"></kd-input>
        </el-form-item>
      </el-form>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height: 200px"></div>
      <div style="background-color: pink; height: 500px"></div>
    </kd-drawer>
    <kd-drawer :visible.sync="isShow2" @confirm="confirmDialog" title="干啥">
      <template slot="title">
        <div>我是title</div>
      </template>
      <div style="background-color: red; height: 300px"></div>
      <div style="background-color: blue; height: 400px"></div>
      <div style="background-color: green; height: 200px"></div>
      <div style="background-color: pink; height: 500px"></div>
      <template #footer>
        <el-button @click="isShow2 = false" type="primary"
          >我是footer按钮</el-button
        >
      </template>
    </kd-drawer>
    <kd-drawer
      :visible.sync="isShowMulty"
      title="提示"
      @confirm="confirmDialog"
      :size="800"
    >
      第一层抽屉
      <el-button @click="isShowMulty2 = true" type="primary"
        >打开内部抽屉</el-button
      >
      <!-- 第二层要加zIndex, 否则覆盖不住第一层抽屉。 最少为1000。 若有第三层抽屉，累加为1001 -->
      <kd-drawer :visible.sync="isShowMulty2" append-to-body @confirm="t2">
        <div slot="title">第二层抽屉</div>
        <el-button @click="isShowMulty3 = true" type="primary">测试</el-button>
        <kd-drawer
          :visible.sync="isShowMulty3"
          title="提示"
          append-to-body
          direction="ttb"
          :size="300"
          showFullscreen
        >
          第三层抽屉
        </kd-drawer>
      </kd-drawer>
    </kd-drawer>

    <kd-dialog ref="dialogRef" title="测试弹框" :visible.sync="isShowDialog" @confirm="isShowDialog = false">
      这弹框的内容多大?
    </kd-dialog>
  </div>
</template>

<script>
import { $toast } from 'utils';
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      isShowDialog: false,
      isShow: false,
      isShow2: false,
      isShowMulty: false,
      isShowMulty2: false,
      isShowMulty3: false,
      form: {
        realName: ''
      },
      rules: {
        realName: [{ required: true, message: '请输入中文', trigger: 'blur' }]
      }
    };
  },
  watch: {},
  components: {},
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
    }
  }
};
</script>
<style scoped lang="scss"></style>
