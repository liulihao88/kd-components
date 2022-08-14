``` 
<template>
  <el-form :model="form" label-width="auto">
    <kj-owner
        v-model="form"
        :options="ownerOptions"
        :default-props="defaultProps"
        @remoteMethod="remoteMethod"
    />
  </el-form>
</template>

<script >
export default {
  name: "testOwner",
  data() {
    return {
      form: {
        owners: [{ name:"" }], // 传入form,取值form.owner
      },
      ownerOptions: [{
        "name" : "admin",
        "realName" : "admin(管理员)",
        "id": 456789056789
      }], // 下拉信息,只需要改变这个值，下拉选项就会改变
      defaultProps: {
        label: "realName",
        value: "name",
      }
    }
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
    }
  }
}
</script>

 ```