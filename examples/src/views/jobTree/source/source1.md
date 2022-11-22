```vue
<template>
  <div class="test-tree f-bt">
      <kd-job-tree ref="jobTreeRef" :default-props="defaultProps" :treeProps="treeProps" :data="data1" @nodeHandler="nodeHandler">
        <template #data="{ data, nodes }">
          <span class="fs-12">{{ data.name }}</span>
        </template>
      </kd-job-tree>

      <kd-job-tree
        ref="jobTreeRef"
        class="m-l-100"
        :default-props="defaultProps2"
        :data="data"
        @nodeHandler="nodeHandler"
        @btnClick="btnClick"
      >
        <template #create="{ create }">
          <div class="ft-12">右上角的slot</div>
        </template>
        <template #icon="{ data, node }"></template>
        <!-- <template #data="{ data, nodes }">
          <span class="fs-12">{{ data.label }}</span>
        </template> -->
      </kd-job-tree>
      <div class="three">
        <div class="tree-wrap">
          <kd-job-tree
            ref="jobTreeRef3"
            :default-props="defaultProps3"
            :data="data3"
            :treeProps="treeProps"
            @nodeHandler="nodeHandler3"
          >
            <template #icon="{ data, node }">
              <i
                  v-show="data.level === 1"
                  style="color: #ffb51f"
                  :class="[
                  node.expanded
                    ? 'kd-icon-wenjianjiazhankai'
                    : 'kd-icon-wenjianjia',
                ]"
              ></i>
            </template>
            <template #data="{ data, node }">
              <span class="fs-12">{{ data.name }}</span>
            </template>
          </kd-job-tree>
        </div>
      </div>
   </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {
        source1: source1,
        defaultProps2: {
          title: '资源管理2',
          showCreate: false,
          btns: [
            {
              content: '编辑22',
              handler: this.editTree,
            },
            {
              content: '删除22',
              confirm: this.deleteTree,
              confirmInfo: '确认删除本条数据吗？',
            },
          ],
        },
        defaultProps: {
          title: '资源管理',
          btns: [
            {
              content: '编辑11',
              handler: this.editTree,
            },
            {
              content: '删除11',
              confirm: this.deleteTree,
              confirmInfo: '确认删除本条数据吗？',
            },
          ],
        },
        data: [],
        data1: [],
        data3: [],
        defaultProps3: {
          showTitle: false,
          btns: [
            {
              content: '新建',
              disabled: true,
              handler: this.editTree,
            },
            {
              content: '查看',
              handler: this.editTree,
            },
            {
              content: '删除',
              disabled: true,
              confirm: this.deleteTree,
              confirmInfo: '确认删除本条数据吗？',
            },
          ],
        },
        treeProps: {
          children: 'children',
          label: 'name',
        }
    };
  },
  components: {},
  created() {
    
  },
  mounted() {
      setTimeout(() => {
        this.data = [
          {
            id: '1551899237577396292',
            parentId: null,
            label: 'DD',
            path: '/DD',
            children: [
              {
                id: '1555115624034734129',
                parentId: '1551899237577396292',
                label: 'dd2',
                path: '/DD/dd2',
                children: [
                  {
                    id: '1555115691147792393',
                    parentId: '1555115624034734129',
                    label: 'dd3',
                    path: '/DD/dd2/dd3',
                  },
                ],
              },
            ],
          },
          {
            id: '1551899237572',
            parentId: null,
            label: 'dd',
            path: '/dd',
            children: [
              {
                id: '155189927572',
                parentId: null,
                label: 'aa',
                path: '/aa',
              },
            ],
          },
          {
            id: '1551894041832984635',
            parentId: null,
            label: 'gbgh',
            path: '/gbgh',
            children: [
              {
                id: '1552484508060618790',
                parentId: '1551894041832984635',
                label: '11',
                path: '/gbgh/11',
              },
            ],
          },
        ];
        this.data1 = [
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
                    path: '/DD/dd2/dd3',
                  },
                ],
              },
            ],
          },
          {
            id: '1551899237572',
            parentId: null,
            name: 'dd',
            path: '/dd',
            children: [
              {
                id: '155189927572',
                parentId: null,
                name: 'aa',
                path: '/aa',
              },
            ],
          },
        ];
        this.data3 = [
          {
            name: "全部",
            level: 1,
            id: "0",
            children: [
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
                        path: '/DD/dd2/dd3',
                      },
                    ],
                  },
                ],
              },
              {
                id: '1551899237572',
                parentId: null,
                name: 'dd',
                path: '/dd',
                children: [
                  {
                    id: '155189927572',
                    parentId: null,
                    name: 'aa',
                    path: '/aa',
                  },
                ],
              },
            ],
          },
        ]
      }, 500);
    },
    methods: {
      btnClick(node, data) {
        if (node.data.label === 'DD') {
          this.defaultProps2.btns = [
            {
              content: '编辑22',
              handler: this.editTree,
            },
            {
              content: '删除11',
              disabled: true,
              confirm: this.deleteTree,
              confirmInfo: '确认删除本条数据吗111',
            },
            {
              content: '自定义',
              confirm: this.deleteTree,
              confirmInfo: '自定义文本',
            },
          ];
        } else {
          this.defaultProps2.btns = [
            {
              content: '编辑3332',
              disabled: true,
              handler: this.editTree,
            },
            {
              content: '测试2',
              confirm: this.deleteTree,
              confirmInfo: '确认测试2',
            },
          ];
        }
      },
      btnHandler(node, data) {
        console.log('btnHandler', node, data)
      },
      deleteTree() {
        console.log('deleteTree');
      },
      editTree() {
        console.log('editTree');
      },
      nodeHandler() {},
      nodeHandler3(data) {
        console.log('当前选中项', data)
      },
      setNode() {
        this.$refs.jobTreeRef3.setCurrentNode('1555115624034734129');
      }
    },
};
</script>
<style scoped lang="scss">
.testtree {
  width: 1000px;
  height: 400px;
}
.three {
  .tree-wrap {
    width: 270px;
    border: 1px solid #e3e6eb;
    border-left: none;
    border-bottom: none;
  }
}
</style>
```
