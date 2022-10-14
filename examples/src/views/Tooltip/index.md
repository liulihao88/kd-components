``` 
<template>
  <div>
    <div style="width:100px;">
      <kd-tooltip
        width="80%"
        :content="text"
      />
    </div>

    <div style="width:100px;">
      <kd-tooltip
        width="70px"
        :content="textPx"
        placement="top"
      />
    </div>
    
    <div>
      <kd-tooltip
        :content="textslot"
        :slot-show="true"
      >
        <i class="el-icon-user-solid"></i>
      </kd-tooltip>
    </div>
  </div>


</template>

<script>
export default {
  name: "testKdTooltip",
  data () {
    return {
      text:'测试kd-tooltip组件使用宽度百分比',
      textPx:'测试kd-tooltip组件使用宽度px',
      textslot: '测试kd-tooltip组件使用插槽'
    }
  }
}
</script>

 ```
 ### 组件接收参数
参数 | 说明 | 类型 | 默认值
:---:|:---:|:---:|:---:
width|文字容器的宽度，可以设置%、px、calc()，百分比需要父容器设置宽度|string|100%
slotShow|是否使用插槽,这里使用的是匿名插槽|boolean|false

剩余参数可参考element中的Tooltip组件直接传值就可以.
