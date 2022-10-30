<template>
  <div>
    <example-title :data="{title: '可滚动选项组（单选）',maintenance: '刘云'}">
      可滚动按钮组（单选），根据外层容器宽度显示滚动按钮。
    </example-title>

    <h5>基础用法</h5>
    <div class="example-wrap">
      <kd-scroll-group v-model="value" :type="groupType" :options="options.slice(0,3)" :force-show="forceShow">
      </kd-scroll-group>
    </div>
    <el-button @click="groupType='group'">按钮组</el-button>
    <el-button @click="groupType='button'">单个按钮</el-button>
    <el-button @click="groupType='tag'">标签样式</el-button>
    <el-button @click="forceShow=!forceShow">显示/隐藏滚动按钮</el-button>
    <example-code :source="source1" style="margin-top:20px;">
      设置 v-model/value 和 options 选项数组即可；<br />
      通过type可控制按钮组显示模式，可选值：group-按钮组，button-按钮，tag-标签；<br />
      默认情况下，选项数量不超过容器宽度时，不显示滚动按钮，通过 force-show 可强制显示；
    </example-code>

    <h5>选项配置</h5>
    <div class="example-wrap">
      <kd-scroll-group v-model="value2" :type="groupType2" :options="options" :height="50" :space="40" min-width="150">
      </kd-scroll-group>
    </div>
    <el-button @click="groupType2='group'">按钮组</el-button>
    <el-button @click="groupType2='button'">单个按钮</el-button>
    <el-button @click="groupType2='tag'">标签样式</el-button>
    <example-code :source="source2" style="margin-top:20px;">
      选项集合options默认情况下应该是 [{label:'',value:''}] 格式；<br />
      height属性可控制组件高度，同时会影响type为group/button时按钮高度，对于type=tag时，只影响组件高度和滚动按钮高度，不影响tag样式；<br />
      space用来控制选项间距，对type=group无效
    </example-code>

    <h5>选项样式及插槽</h5>
    <div class="example-wrap">
      <kd-scroll-group v-model="value3" :options="options" :height="50" :item-styles="{width:'200px',color:'red'}">
        <template slot-scope="scope">
          <div>
            <div style="font-size: 12px;">选项:{{ scope.index+1 }}-{{ scope.label}}</div>
            <div style="color:blue;text-align: center;margin-top: 5px;">{{ scope.value }}</div>
          </div>
        </template>
      </kd-scroll-group>
    </div>
    <example-code :source="source3" style="margin-top:20px;">
      通过item-styles、item-class可以控制选项样式，同时选项支持插槽，通过 slot-scope="scope" 接收选项内容
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
        options:[
          {
            label: "上海",
            value: "sh"
          },
          {
            label: "北京",
            value: "bj"
          },
          {
            label: "广州",
            value: "gz"
          },
          {
            label: "深圳",
            value: "sz"
          },
          {
            label: "太原",
            value: "ty"
          },
          {
            label: "黑龙江",
            value: "hlj"
          },
          {
            label: "杭州",
            value: "hz"
          },
          {
            label: "西安",
            value: "xa"
          },
          {
            label: "石家庄",
            value: "sjz"
          },
          {
            label: "济南",
            value: "jn"
          }
        ],
        value:'sh',
        value2:'sh',
        value3:'sh',
        groupType: 'group',
        groupType2:'group',
        forceShow:false,
        source1,
        source2,
        source3,
      }
    },
    methods: {
      onChange(e){
        console.log(e)
      }
    }
  }
</script>
<style lang="scss" scoped>
.example-wrap{
  width:600px;
  margin-bottom:20px;
}
</style>
