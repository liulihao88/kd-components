<template>
  <div>
    哈哈
<!--    <kd-drawer-->
<!--      :visible.sync="isShowMulty"-->
<!--      title="提示"-->
<!--      @confirm="confirmDialog"-->
<!--      :size="800"-->
<!--    >-->
<!--      第一层抽屉-->
<!--      <el-button @click="isShowMulty2 = true" type="primary"-->
<!--        >打开内部抽屉</el-button-->
<!--      >-->
<!--      &lt;!&ndash; 第二层要加zIndex, 否则覆盖不住第一层抽屉。 最少为1000。 若有第三层抽屉，累加为1001 &ndash;&gt;-->
<!--      <kd-dialog :visible.sync="isShowMulty2" append-to-body @confirm="t2">-->
<!--        <div slot="title">第二层抽屉</div>-->
<!--        <el-button @click="isShowMulty3 = true" type="primary">测试</el-button>-->
<!--        <kd-drawer-->
<!--          :visible.sync="isShowMulty3"-->
<!--          title="提示"-->
<!--          append-to-body-->
<!--          direction="ttb"-->
<!--          :size="300"-->
<!--          showFullscreen-->
<!--        >-->
<!--          第三层抽屉-->
<!--        </kd-drawer>-->
<!--      </kd-dialog>-->
<!--    </kd-drawer>-->
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      isShowMulty: false,
      isShowMulty2: false,
      isShowMulty3: false
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss"></style>
