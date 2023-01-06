## kd-column-operate2（重构版）
### 属性
| 选项            | 类型               | 默认值  | 说明                          |
|---------------|------------------|------|-----------------------------|
| btn-list      | Array<btnConfig> | []   | 按钮组配置，详见下方btnConfig         |

#### btnConfig
| 选项         | 类型                            | 默认值       | 说明                                                        |
|------------|-------------------------------|-----------|-----------------------------------------------------------|
| label      | string/(scope,item)=>string   | ""        | 按钮文字                                                      |
| key        | string                        | ""        | 重要，操作按钮对应的标识符，需要在按钮组中唯一                                   |
| permission | string                        | ""        | 操作按钮对应的权限，对应row.permissionTypes中的某个字段，不设置则不影响按钮disabled行为 |
| disabled   | boolean/(scope,item)=>boolean | false     | 对应button的disabled属性，但permission也会影响最终disabled效果           |
| hidden     | boolean/(scope,item)=>boolean | false     | 是否隐藏按钮，如果为true，则按钮不显示，还会占位；dropdown=true时该属性不生效           |
| show       | boolean/(scope,item)=>boolean | true      | 是否渲染按钮，与hidden的区别在于不会占位                                   |
| dropdown   | boolean                       | false     | 是否以dropdown形式展示按钮，内部使用el-dropdown处理                       |
| popover    | boolean                       | false     | 是否以popover形式展示按钮，内部使用el-popover处理，设置了默认样式                 |
| popConfig  | object/(scope,item)=>{}       | popConfig | 对应el-popover的部分配置，因为它的样式是统一的                              |
| confirm    | function                      | -         | 确认回调，非popover时，点击后直接执行；在popover中，对应确认按钮                   |
| cancel     | function                      | -         | 取消回调，非popover时无效；在popover中，对应取消按钮                         |

#### popConfig
| 选项          | 类型      | 默认值    | 说明                   |
|-------------|---------|--------|----------------------|
| title       | string  | 删除     | el-popover标题         |
| placement   | string  | bottom | el-popover出现位置       |
| content     | string  | 确定删除？  | el-popover的提示内容      |
| confirmText | string  | 确定     | el-popover的自定义确定按钮内容 |
| cancelText  | string  | 取消     | el-popover的自定义取消按钮内容 |
| showCancel  | boolean | true   | 是否显示取消按钮             |


## kd-column-operate（初始版，有bug，不再维护）
### 属性
| 选项            | 类型               | 默认值  | 说明                          |
|---------------|------------------|------|-----------------------------|
| btn-list      | Array            | []   | 按钮组配置，详见下方btnConfig         |
| show-btns-fun | (scope)=>boolean | null | 是否显示全部按钮的方法，参数为scope，一般没什么用 |

#### btnConfig
| 选项         | 类型               | 默认值                         | 说明                                                         |
|------------|------------------|-----------------------------|------------------------------------------------------------|
| label      | string           | ""                          | 按钮文字                                                       |
| key        | string           | ""                          | 重要，操作按钮对应的标识符，需要在按钮组中唯一                                    |
| disabled   | boolean/function | false/(scope,item)=>boolean | 对应button的disabled属性，但按钮是否可点击还会有其他属性的影响，比如permission        |
| permission | string           | ''                          | 操作按钮对应的权限，应该是row.permissionTypes中的某个字段，不设置则不影响按钮disabled行为 |
| popover    | boolean          | false                       | 是否以popover形式展示按钮，内部使用kd-popover-button处理                   |
| popConfig  | object           | 见kd-popover-button          | 对应kd-popover-button的配置                                     |
| dropdown   | boolean          | false                       | 是否以dropdown形式展示按钮，内部使用el-dropdown处理                        |
| hidden     | function         | (scope,item)=>boolean       | 隐藏按钮，并会有一个占位符，让按钮列看起来整齐；dropdown中的按钮该属性不生效                 |
| show       | function         | (scope,item)=>boolean       | 是否渲染按钮                                                     |

### 事件
| 事件名称  | 说明      | 回调参数                                                                                  |
|-------|---------|---------------------------------------------------------------------------------------|
| click | 操作列被点击时 | { scope, key }，其中scope是完整的el-table-column插槽的scope，<br/>key是按钮对应的key，用于回调函数中区分是哪个按钮被点击 |