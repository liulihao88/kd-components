### 属性

#### 触发按钮

| 选项                          | 类型     | 默认值                                                                                                   | 说明                             |
|-----------------------------|--------|-------------------------------------------------------------------------------------------------------|--------------------------------|
| type                        | string | content                                                                                               | 组件展示类型                         |
| popoverAttrs【type=content】  | Object | {placement: "bottom",title: "删除",width: 260,trigger: "click"}                                         | el-popover 的属性对象               |
| popoverAttrs【type=dropdown】 | Object | {placement: "bottom-end",width: 143,trigger: "click","popper-class": "kd-popover-button\_\_dropdown"} | el-popover 的属性对象               |
| referenceBtnAttrs           | Object | {}                                                                                                    | 默认触发 popover 是一个按钮，该属性对象作用于该按钮 |
| referenceText               | String | "删除"                                                                                                  | 触发按钮文本，使用 reference 插槽后该属性失效   |

#### type=content（默认）时弹出框内容

| 选项             | 类型      | 默认值     | 说明                                                              |
|----------------|---------|---------|-----------------------------------------------------------------|
| contentText    | String  | "确定删除？" | 内容文本                                                            |
| contentStyles  | Object  | null    | 内容文本样式，默认是一个<p>标签                                               |
| disConfirm     | Boolean | false   | popover 框确认按钮 disabled                                          |
| confirmText    | String  | "确认"    | popover 框确认按钮文本                                                 |
| cancelText     | String  | "取消"    | popover 框取消按钮文本                                                 |
| loadingConfirm | Boolean | false   | 确认按钮是否显示 loading，如果为 true，则 confirm 事件方法要加一个 cb 回调函数，在方法结束时调用一下 |

#### type=dropdown（下拉按钮组）时按钮组

| 选项            | 类型     | 默认值           | 说明                                |
|---------------|--------|---------------|-----------------------------------|
| btnList       | array  | [\<btnItem\>] | 按钮组对象数组                           |
| btnItem.label | string | ''            | 按钮名称                              |
| btnItem.key   | string | ''            | 按钮 key，影响 v-for 的 key，以及点击按钮里回调参数 |
| btnItem.attrs | object | {}            | 同 el-button 配置项                   |

### 事件

| 事件名称      | 说明                    | 回调参数                             |
|-----------|-----------------------|----------------------------------|
| confirm   | 点击确定按钮                |                                  |
| cancel    | 点击取消按钮                |                                  |
| btnsClick | type=dropdown 时点击按钮回调 | key，通过 btnList 中配置的该参数判断是哪个按钮被点击 |

### slot

| 名称        | 说明                                  | 参数  |
|-----------|-------------------------------------|-----|
| default   | 同 el-popover，Popover 内嵌 HTML 文本     |     |
| reference | 同 el-popover，触发 Popover 显示的 HTML 元素 |     |
