<template>
  <div>
    <h3>kd-owner 负责人多选框</h3>
    <div class="author">维护人：刘鑫</div>
    <div class="sub-title">添加一个或多个负责人</div>
    <h5>基础用法</h5>
    <el-form :model="form" label-width="auto">
      <el-row>
        <el-col :span="12">
          <kd-owner
            v-model="form"
            :options="ownerOptions"
            :default-props="defaultProps"
            @remoteMethod="remoteMethod"
          ></kd-owner>
        </el-col>
        <el-col :span="12">
          <kd-owner
            v-model="form"
            :options="ownerOptions"
            :default-props="defaultProps"
            no-icon
            @remoteMethod="remoteMethod"
          ></kd-owner>
        </el-col>
      </el-row>
    </el-form>
    <example-code :source="source1">
      <!-- 设置 v-model/value 和 options 选项数组即可； -->
    </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode';
import source1 from './source/source1.md';
export default {
  name: 'TestOwner',
  components: { ExampleCode },
  data() {
    return {
      form: {
        owners: [{ name: '' }], // 传入form,取值form.owners
      },
      ownerOptions: [
        {
          name: 'admin',
          realName: 'admin(管理员)',
          id: 456789056789,
        },
      ], // 下拉信息,只需要改变这个值，下拉选项就会改变
      defaultProps: {
        label: 'realName',
        value: 'name',
      },
      source1,
    };
  },
  methods: {
    /**
     * owner 搜索接口, getUserList 是接口api，需自己更换。
     * @param query
     * @param callback
     * @returns {Promise<void>}
     */
    async remoteMethod(query, callback) {
      // let result = await getUserList(query);
      // if (result && result.success) {
      //   this.ownerOptions = result.data;
      // }
      callback();
    },
  },
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
code {
  background-color: #f9fafc;
  padding: 0 4px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, 0.7);
  color: #445368;
}
</style>
