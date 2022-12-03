### 属性

| 选项         | 类型       | 默认值                                              | 说明                  |
| ------------ |----------|--------------------------------------------------|---------------------|
| tableData    | Array    | ''                                               | 展示数据                |
| defaultProps | Object   | {value: "id",label: "name",children: "children"} | 属性                  |
| filterable | Boolean  | true                                             | 是否显示搜索框             |
| leafOnlyNode | Boolean  | false                                            | 只选中叶节点(最后一级)        |
| disabledTreeCheck | boolean, function(data, node) | false                                            | 指定节点是否禁止选择，true禁止选中 |
