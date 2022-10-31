### 属性

| 选项         | 类型     | 默认值                                 | 说明                                         |
| ------------ | -------- | -------------------------------------- | -------------------------------------------- |
| defaultProps | Object   | {}                                     | 默认的公共属性, 大部分属性都在这个对象中书写 |
| data         | Array    | []                                     | 展示数据                                     |
| nodeKey      | String   | 'id'                                   | 唯一标识的属性                               |
| treeProps    | Object   | {children: 'children',label: 'label',} | 配置选项                                     |
| loading      | Boolean  | false                                  | 组件 loading                                 |
| customExpand | Function | ''                                     | 自定义展开项函数                             |

### defaultProps 的参数举例

```js
defaultProps: {
  title: "表管理",
  showCreate: false,
  showSearch: false,
  placeholder: "请输入库名",
  openIcon: "kd-icon-wenjianjia"
  btns: [
     {
       content: "编辑",
       handler: this.editTree
     },
     {
       content: "删除",
       confirm: this.deleteTree,
       confirmInfo: "确认删除本条数据吗"
     },
     {
       key: "cus",
       content: "男",
       useSlot: true
     }
   ]
}
```

### 事件

| 事件名称    | 说明               | 回调参数     |
| ----------- | ------------------ | ------------ |
| nodeHandler | 点击一行时候的方法 | 当前行的数据 |
