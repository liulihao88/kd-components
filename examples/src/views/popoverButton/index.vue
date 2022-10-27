<template>
  <div>
    <example-title :data="{title: 'popover按钮',maintenance: '刘云'}">
      弹框按钮组件，基于el-popover封装，适用于需要二次确认的交互操作场景。
    </example-title>

    <h5>基础用法</h5>
    <kd-popover-button @confirm="onConfirm"></kd-popover-button>
    <example-code :source="source1">
      该组件默认是为删除操作设计的
    </example-code>

    <h5>popover配置</h5>
    <kd-popover-button
       reference-text="批量导出"
       :popover-attrs="{title: '批量导出'}"
       content-text="确定批量导出数据？"
       @confirm="onConfirm"
    >
      <template #reference>
        <i class="el-icon-s-tools" />
      </template>
    </kd-popover-button>
    <example-code :source="source1">
      使用方式同el-popover；<br />
      默认触发popover的元素是el-button，reference-text用来设置按钮文字，reference-btn-attrs用来配置button属性；<br />
      如果触发popover的元素不是button，可通过插槽reference自定义（同el-popover）；<br />
      popover-attrs 接收一个对象，对应el-popover 的属性配置；<br />
      content-text对应el-popover的content，也可用默认插槽自定义；content-styles 接收一个对象，控制content-text的样式；
    </example-code>

    <h5>按钮配置</h5>
    <kd-popover-button
        content-text="确定暂停数据读取吗？"
        :popover-attrs="{title: '是否暂停'}"
        :confirm-text="stopLoading? '加载中': '暂停'"
        cancel-text="不暂停"
        loading-confirm
        @confirm="stopRead"
        @cancel="cancelStop"
    >
      <template #reference>
        <i class="el-icon-s-tools" />
      </template>
    </kd-popover-button>
    <example-code :source="source1">
      confirm-text/cancel-text 分别控制确认/取消按钮的文字；<br />
      dis-confirm用来控制确认按钮的disabled属性；loading-confirm 用来控制确认按钮的loading属性；
    </example-code>
  </div>
</template>

<script>
import source1 from "./source/source1.md"
import source2 from "./source/source2.md"
import source3 from "./source/source3.md"
  export default {
    name: 'Index',
    data() {
      return {
        source1,
        source2,
        source3,
        stopLoading: false
      }
    },
    methods: {
      onConfirm() {
        this.$message.success('确认删除')
      },
      onCancel(){
        this.$message.info('取消操作')
      },
      stopRead(cb) {
        this.stopLoading = true
        setTimeout(() => {
          this.stopLoading = false
          cb();
        }, 3000)
      },
      cancelStop() {
        // this.stopLoading = false
      }
    },
  }
</script>