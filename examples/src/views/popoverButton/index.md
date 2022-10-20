### 属性
| 选项                | 类型      | 默认值                                                           | 说明                                                        |
|-------------------|---------|---------------------------------------------------------------|-----------------------------------------------------------|
| popoverAttrs      | Object  | {placement: "bottom",title: "删除",width: 260,trigger: "click"} | el-popover的属性对象                                           |
| referenceBtnAttrs | Object  | {}                                                            | 默认触发popover是一个按钮，该属性对象作用于该按钮                              |
| referenceText     | String  | "删除"                                                          | 触发按钮文本，使用reference插槽后该属性失效                                |
| contentText       | String  | "确定删除？"                                                       | 内容文本                                                      |
| contentStyles     | Object  | null                                                          | 内容文本样式，默认是一个<p>标签                                         |
| disConfirm        | Boolean | false                                                         | popover框确认按钮disabled                                      |
| confirmText       | String  | "确认"                                                          | popover框确认按钮文本                                            |
| cancelText        | String  | "取消"                                                          | popover框取消按钮文本                                            |
| loadingConfirm    | Boolean | false                                                         | 确认按钮是否显示loading，如果为true，则confirm事件方法要加一个cb回调函数，在方法结束时调用一下 |

### 事件
| 事件名称    | 说明     | 回调参数 |
|---------|--------|------|
| confirm | 点击确定按钮 ||
| cancel  | 点击取消按钮 ||

### slot
| 名称        | 说明                                 | 参数  |
|-----------|------------------------------------|-----|
| default   | 同el-popover，Popover 内嵌 HTML 文本     ||
| reference | 同el-popover，触发 Popover 显示的 HTML 元素 ||