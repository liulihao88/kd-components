### 属性

| 选项                   | 类型                             | 默认值                                                                                                           | 说明                     |
|----------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------|------------------------|
| tableData 或 treeData | Array                          | []                                                                                                            | 树形结构数据                 |
| defaultProps         | Object                         | {value: "id",label: "name",children: "children"}                                                              | 同 el-tree 的 props 属性   |
| nodeKey              | string                         | id                                                                                                            | 同 el-tree 的 nodeKey 属性 |
| filterable           | Boolean                        | true                                                                                                          | 是否显示搜索框                |
| leafOnlyNode         | Boolean                        | false                                                                                                         | 只选中叶节点(最后一级)           |
| disabledTreeCheck    | boolean, (data, node)=>boolean | false                                                                                                         | 指定节点是否禁止选择，true 禁止选中   |
| searchAttrs          | Object                         | {}                                                                                                            | 下拉选框内搜索 input 的属性      |
| width                | string                         | 316px                                                                                                         | 组件宽度                   |
| loading              | Boolean                        | false                                                                                                         | 异步加载数据时组件 loading 效果   |
| treeAttrs            | Object                         | {<br/>props:defaultProps,<br/>nodeKey:nodeKey,<br/>defaultExpandedKeys:value,<br/>highlightCurrent:true<br/>} | 同 el-tree 组件，接收所有属性，   |
| treeListeners        | Object                         | {}                                                                                                            | 同 el-tree 组件，接收所有事件    |
