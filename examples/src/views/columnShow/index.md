**注意**：支持el-table-column的全部属性，部分属性改写为：
- p-l等于prop+label
- show-overflow-tooltip默认值改为true
- row-key默认值为row-key或id
- column-key默认值为column-key或prop

### 属性
| 选项                | 类型           | 默认值                                                                                 | 说明                                                                                                                                                   |
|-------------------|--------------|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| p-l               | string       | ''                                                                                  | 必填，prop和label的简写，需要用英文逗号（,）分隔                                                                                                                        |
| is-link           | boolean      | false                                                                               | 是否为链接展示，修改了单元格样式                                                                                                                                     |
| is-status         | boolean      | false                                                                               | 是否为状态值展示，修改了单元格样式                                                                                                                                    |
| status-type       | string       | default                                                                             | 状态值展示形式，可选值：<br/>default-默认状态，即true/false；<br/>extra-扩展状态，即重写status-arr，在默认样式基础上通过extra-style增加额外状态样式；<br/>custom-自定义状态，完全重写status-arr和status-styles |
| status-arr        | array        | [true,false]                                                                        | 状态值数组，需要与status-styles数组对应                                                                                                                           |
| status-styles     | array        | [{background: "#eaeefb",color: "#365edf"},{background: "#fdecea",color: "#e94c35"}] | 状态值对应样式数组，需要与status-arr数组对应                                                                                                                          |
| extra-styles      | array        | []                                                                                  | status-type为extra时，在status-styles基础上增加的额外样式                                                                                                          |
| filters           | object/array | null                                                                                | 列筛选时筛选条件对象，支持：{value:label}、[{label:label,value:value}]、[{text:label,value:value}]三种格式                                                               |
| status-by-filters | boolean      | true                                                                                | 筛选列时，默认通过filters对象得到status配置，如果需要自定义状态配置，需要设置为false                                                                                                  |
| format-by-filters | boolean      | true                                                                                | 筛选列时，默认通过filters对象得到formatter转换函数，如果需要自定义状态配置，需要设置为false                                                                                             |
| formatter         | function     | null                                                                                | 单元格内容转换函数，优先级最高                                                                                                                                      |
| no-tip            | boolean      | false                                                                               | show-overflow-tooltip默认值改为了true，如果要取消该行为，可设置为true                                                                                                    |


### 事件
| 事件名称       | 说明      | 回调参数  |
|------------|---------|-------|
| click      | 单元格点击事件 | scope |