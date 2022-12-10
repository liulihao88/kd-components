**注意**：支持 el-table-column 的全部属性，部分属性改写为：

- p-l 等于 prop+label
- show-overflow-tooltip 默认值改为 true

### 属性

| 选项          | 类型                     | 默认值                                                                                            | 说明                                                            |
|-------------|------------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| p-l         | string                 | ''                                                                                             | prop 和 label 的简写，需要用英文逗号分隔，原生的 prop 和 label 优先级更高             |
| is-link     | boolean                | false                                                                                          | 是否为链接展示，修改了单元格样式                                              |
| formatter   | object/function        | null/(scope,value)=>value                                                                      | 内容转换，支持对象字面量形式进行简单转换，或以函数形式进行更复杂的自定义                          |
| text-styles | string/object/function | null/{}/(scope,value)=>{}                                                                      | 自定义单元格样式，支持对象字面量、函数形式、字符串3种形式，只要符合style属性要求即可                 |
| default-tip | boolean                | true                                                                                           | show-overflow-tooltip 默认值改为了true，如果要取消该行为，设置default-tip=false |
| custom-tip  | boolean                | false                                                                                          | 是否启用自定义tooltip，默认不启用，                                         |
| tip-config  | object                 | {effect: 'dark',placement: 'right-start',content: scope.row[this.propLabel.prop],offset: -10,} | el-tooltip的配置项                                                |

### 事件

| 事件名称  | 说明      | 回调参数                           |
|-------|---------|--------------------------------|
| click | 单元格点击事件 | scope,value,format-value,event |

### 插槽

| 名称          | 说明                                | 参数                       |
|-------------|-----------------------------------|--------------------------|
| -/default   | 自定义列单元格内容，同el-table-column        | scope,value,format-value |
| header      | 自定义表头的内容，同el-table-column         | scope                    |
| tip-content | el-tooltip的content插槽，自定义tooltip内容 | scope,value,format-value |
