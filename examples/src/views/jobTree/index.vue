<template>
  <div class="testtree f-bt">
    <kd-job-tree
      ref="jobTreeRef"
      :defaultProps="defaultProps"
      :treeData="treeData"
      @nodeHandler="nodeHandler"
    >
      <template #data="{ data, nodes }">
        <span>{{ data.name }}</span>
        <!-- <div>{{ nodes }}</div> -->
      </template>
    </kd-job-tree>

    <kd-job-tree
      class="m-l-100"
      ref="jobTreeRef"
      :defaultProps="defaultProps2"
      :treeData="treeData"
      @nodeHandler="nodeHandler"
      @btnClick="btnClick"
    >
      <template #create="{ create }">
        <div class="ft-12">右上角的slot</div>
      </template>
      <template #icon="{ data, node }"> </template>
    </kd-job-tree>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {},
  data() {
    return {
      defaultProps2: {
        title: '资源管理2',
        showCreate: false,
        btns: [
          {
            content: '编辑11',
            handler: this.editTree
          },
          {
            content: '删除11',
            confirm: this.deleteTree,
            confirmInfo: '确认删除本条数据吗'
          }
        ]
      },

      defaultProps: {
        title: '资源管理',
        btns: [
          {
            content: '编辑11',
            handler: this.editTree
          },
          {
            content: '删除11',
            confirm: this.deleteTree,
            confirmInfo: '确认删除本条数据吗'
          }
        ]
      },
      treeData: [
        {
          id: '1551899237577396292',
          parentId: null,
          name: 'DD',
          path: '/DD',
          children: [
            {
              id: '1555115624034734129',
              parentId: '1551899237577396292',
              name: 'dd2',
              path: '/DD/dd2',
              children: [
                {
                  id: '1555115691147792393',
                  parentId: '1555115624034734129',
                  name: 'dd3',
                  path: '/DD/dd2/dd3'
                }
              ]
            }
          ]
        },
        {
          id: '1551894041832984635',
          parentId: null,
          name: 'gbgh',
          path: '/gbgh',
          children: [
            {
              id: '1552484508060618790',
              parentId: '1551894041832984635',
              name: '11',
              path: '/gbgh/11'
            }
          ]
        }
      ]
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    btnClick([node, data]) {
      console.log(
        `%c 444=>111行 ~/kj/kd-components/examples/src/views/jobTree/index.vue node `,
        'background:#000;color:#bada55',
        node
      );
      console.log(
        `%c 333=>112行 ~/kj/kd-components/examples/src/views/jobTree/index.vue node.id `,
        'background:#000;color:#bada55',
        node.data.name
      );

      if (node.data.name == 'DD') {
        this.defaultProps2.btns = [
          {
            content: '编辑22',
            handler: this.editTree
          },
          {
            content: '删除11',
            confirm: this.deleteTree,
            confirmInfo: '确认删除本条数据吗111'
          },
          {
            content: '自定义',
            confirm: this.deleteTree,
            confirmInfo: '自定义文本'
          }
        ];
      } else {
        this.defaultProps2.btns = [
          {
            content: '编辑3332',
            handler: this.editTree
          },
          {
            content: '测试2',
            confirm: this.deleteTree,
            confirmInfo: '确认测试2'
          }
        ];
      }
    },
    deleteTree() {
      console.log('deleteTree');
    },
    editTree() {
      console.log('editTree');
    },
    nodeHandler() {}
  }
};
</script>
<style scoped lang="scss">
.testtree {
  width: 1000px;
  height: 300px;
}
</style>
