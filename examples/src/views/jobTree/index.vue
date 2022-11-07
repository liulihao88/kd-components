<template>
  <div>
    <h3>job-tree组件</h3>
    <div class="author">维护人：刘力豪</div>
    <div class="sub-title"></div>

    <h5>用法示例</h5>
    <div class="w-1000">
      <div class="test-tree f-bt">
        <kd-job-tree ref="jobTreeRef" :default-props="defaultProps" :data="data" @nodeHandler="nodeHandler">
          <template #data="{ data, nodes }">
            <span class="fs-12">{{ data.label }}</span>
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
                    :data="data"
            ></kd-job-tree>
          </div>
        </div>
      </div>
    </div>
    <example-code :source="source1">
      <div>上面示例中展示了kd-tree组件的各种使用方法。</div>
      <div></div>
    </example-code>
  </div>
</template>

<script>
import ExampleCode from '../../components/ExampleCode';
import source1 from './source/source1.md';
export default {
  label: 'Index',
  components: {
    ExampleCode,
  },
  data() {
    return {
      source1: source1,
      defaultProps2: {
        title: '资源管理2',
        showCreate: false
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
            disabled:  true,
            confirm: this.deleteTree,
            confirmInfo: '确认删除本条数据吗？',
          },

        ]
      }
    };
  },
  watch: {},
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
            }
          ]
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
    }, 500);
  },
  methods: {
    btnClick([node, data]) {
      if (node.data.label === 'DD') {
        this.defaultProps2.btns = [
          {
            content: '编辑22',
            handler: this.editTree,
          },
          {
            content: '删除11',
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
    deleteTree() {
      console.log('deleteTree');
    },
    editTree() {
      console.log('editTree');
    },
    nodeHandler() {},
  },
};
</script>
<style lang="scss" scoped>
.author {
  margin-bottom: 10px;
  font-size: 12px;
  font-style: italic;
}
.sub-title {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.8em;
  margin-bottom: 5px;
}
.example-wrap {
  width: 600px;
  margin-bottom: 20px;
}
.test-tree ::v-deep .kd-job-tree {
  height: unset;
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
