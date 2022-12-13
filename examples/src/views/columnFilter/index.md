**注意**：支持 el-table-column 的全部属性，部分属性改写为：

- p-l 等于 prop+label
- show-overflow-tooltip 默认值改为 true
- column-key 默认值为 column-key 或 prop

### 属性

| 选项      | 类型                    | 默认值                         | 说明                                                                               |
| --------- | ----------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| p-l       | string                  | ''                             | prop 和 label 的简写，需要用英文逗号（,）分隔                                      |
| no-status | boolean                 | false                          | 是否禁用状态展示                                                                   |
| no-filter | boolean                 | false                          | 是否禁用筛选操作                                                                   |
| no-tip    | boolean                 | false                          | show-overflow-tooltip 默认值改为了 true，如果要取消该行为，可设置为 true           |
| formatter | boolean/object/function | true/null/(scope,value)=>value | 内容转换，默认从 config 中获得转换内容，也可以自定义对象字面量，或函数来自定义转换 |
| config    | object                  | {true:{},false:{}}             | 列配置，见下边 config                                                              |

#### config 配置

| 选项        | 类型   | 默认值                | 说明                                                               |
| ----------- | ------ | --------------------- | ------------------------------------------------------------------ |
| [key]       | any    |                       | 配置项的 key 就是该列的值，                                        |
| [key].text  | string | '是'、'否'            | 该列的值对应的转换文案，在 noFilter=true 或使用 formatter 时非必填 |
| [key].label | string |                       | 兼容性写法，作用同上                                               |
| [key].color | string | '#365edf'、'#e94c35'  | 状态展示时，该 key 值对应的文本颜色                                |
| [key].bg    | string | '#eaeefb'、 '#fdecea' | 状态展示时，该 key 值对应的背景颜色                                |

### 事件

| 事件名称 | 说明           | 回调参数 |
| -------- | -------------- | -------- |
| click    | 单元格点击事件 | scope    |

### 插槽

| 名称      | 说明               | 参数                    |
| --------- | ------------------ | ----------------------- |
| -/default | 自定义列单元格内容 | { row, column, $index } |
| header    | 自定义表头的内容   | { column, $index }      |
