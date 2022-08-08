<template>
  <div class="testtree">
    <kd-tree 
      ref="jobTreeRef" 
      :defaultProps="defaultProps"
      :treeData="treeData"
      @nodeHandler="nodeHandler"
    >
      <template #data="{ data }">
        <div>{{ data.name }}</div>
      </template>
    </kd-tree>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {

  },
  data() {
    return {
      defaultProps: {
        title: '资源管理'
      },
      treeData: [
        {
          "id" : "1551899237577396292",
          "parentId" : null,
          "name" : "DD",
          "path" : "/DD",
          "children" : [ {
            "id" : "1555115624034734129",
            "parentId" : "1551899237577396292",
            "name" : "dd2",
            "path" : "/DD/dd2",
            "children" : [ {
              "id" : "1555115691147792393",
              "parentId" : "1555115624034734129",
              "name" : "dd3",
              "path" : "/DD/dd2/dd3"
            } ]
          } ]
        }, {
          "id" : "1551894041832984635",
          "parentId" : null,
          "name" : "gbgh",
          "path" : "/gbgh",
          "children" : [ {
            "id" : "1552484508060618790",
            "parentId" : "1551894041832984635",
            "name" : "11",
            "path" : "/gbgh/11"
          } ]
        }
      ]
    };
  },
  components: {
  
  },
  created() {

  },
  mounted() {

  },
  methods: {
    nodeHandler() {

    }
  }
};
</script>
<style scoped lang='scss'>
  .testtree {
    width: 300px;
  }
</style>
