### 属性
| 选项           | 类型      | 默认值                                                                                                                         | 说明                                  |
|--------------|---------|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| loading      | boolean | false                                                                                                                       | 表格上v-loading对应的属性                   |
| pre-col-type | string  | ""                                                                                                                          | 表格第一列的类型，可选值：index、selection、expand |
| pre-col-conf | object  | {width:'55px'}                                                                                                              | 表格第一列除type以外的属性                     |
| show-paging  | boolean | true                                                                                                                        | 是否显示内置的分页组件                         |
| paging-attrs | object  | {<br/>pageSizes: [10, 20, 30, 40],<br/>background: true,<br/>layout: "prev, pager, next, sizes, jumper",<br/>total: 0<br/>} | 内置的分页组件的默认配置                        |
| foot-height  | number  | 64                                                                                                                          | 底部footer高度                          |

### 事件
| 事件名称       | 说明                              | 回调参数                                 |
|------------|---------------------------------|--------------------------------------|
| pageChange | 分页组件pageSize或currentPage发生变化时触发 | {pageSize:value}或{currentPage:value} |


### 插槽
| 名称     | 说明            |
|--------|---------------|
| empty  | 表格无数据时empty内容 |
| paging | 底部分页组件区域插槽    |