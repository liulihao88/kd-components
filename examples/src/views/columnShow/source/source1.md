```vue
<template>
  <kd-simple-table :data="tableData" @filter-change="filterChange" :show-paging="false">
    <!--属性简写-->
    <kd-column-show p-l="tip,属性简写" width="100px"></kd-column-show>
    <!--链接列-->
    <kd-column-show p-l="name,链接列" is-link @click="onClick"></kd-column-show>
    <!--单独使用formatter-->
    <kd-column-show 
        p-l="collectMode,formatter配置" 
        :formatter="(value) => ({ MANUAL: '手动', AUTO: '自动' }[value])"
    ></kd-column-show>
    <!--普通双值状态：特指true、false状态-->
    <kd-column-show p-l="status,普通双值" is-status></kd-column-show>
    <!--自定义双值状态-->
    <kd-column-show p-l="status2,自定义双值" is-status :status-arr="['SUCCESS', 'FAILURE']"></kd-column-show>
    <!--扩展多值状态-->
    <kd-column-show 
        p-l="status3,拓展多值" 
        is-status 
        status-type="extra" 
        :status-arr="['s1', 's2','s3']" 
        :extra-styles="[{background: 'yellow', color: 'blue' }]"
    ></kd-column-show>
    <!--完全自定义多值状态-->
    <kd-column-show 
        p-l="status4,自定义多值" 
        is-status status-type="custom" 
        :status-arr="['x1', 'x2','x3']" 
        :status-styles="statusStyles"
    ></kd-column-show>
    <!--筛选列-->
    <kd-column-show p-l="status5,筛选列" :filters="{ START: '启用', STOP: '停用' }"></kd-column-show>
    <!--筛选列配合状态-->
    <kd-column-show p-l="status5,状态值+筛选" is-status :filters="{ START: '启用', STOP: '停用' }"></kd-column-show>
  </kd-simple-table>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {
          tip:"超长文本超长文本超自动隐藏",
          name:'老刘',
          status:true,
          status2:'FAILURE',
          status3:'s1',
          status4:'x1',
          status5:'START',
          collectMode:'MANUAL',
        },
        {
          tip:"普通文本",
          name:'大刘',
          status:false,
          status2:'SUCCESS',
          status3:'s2',
          status4:'x2',
          status5:'STOP',
          collectMode:'AUTO',
        },
        {
          tip:"普通文本",
          name:'小刘',
          status:false,
          status2:'SUCCESS',
          status3:'s3',
          status4:'x3',
          status5:'STOP',
          collectMode:'AUTO',
        }
      ],
      statusStyles:[
        {
          background: 'yellow', color: 'blue'
        },
        {
          background: 'black', color: 'white'
        },
        {
          background: 'green', color: 'black'
        },
      ]
    }
  },
  methods: {
    onClick(a){
      console.log(a)
      this.$message.success('点击')
    },
    filterChange(filters) {
      console.log(filters)
    },
  }
}
</script>
```