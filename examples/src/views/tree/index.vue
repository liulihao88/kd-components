<template>
  <div class="testtree">
    <kd-tree 
      :data="data" 
      :props="defaultProps" 
      @node-click="handleNodeClick"
    ></kd-tree>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {

  },
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  components: {
  
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style scoped lang='scss'>
  .testtree {
    width: 300px;
  }
</style>
