### 属性
| 选项            | 类型               | 默认值  | 说明                          |
|---------------|------------------|------|-----------------------------|
| btn-list      | Array            | []   | 按钮组配置，详见下方btnConfig         |
| show-btns-fun | (scope)=>boolean | null | 是否显示全部按钮的方法，参数为scope，一般没什么用 |

#### btnConfig
| 选项         | 类型       | 默认值                   | 说明                                                  |
|------------|----------|-----------------------|-----------------------------------------------------|
| label      | string   | ""                    | 按钮文字                                                |
| key        | string   | ""                    | 重要，操作按钮对应的标识符，需要在按钮组中唯一                             |
| disabled   | boolean  | false                 | 对应button的disabled属性，但按钮是否可点击还会有其他属性的影响，比如permission |
| permission | string   | ''                    | 操作按钮对应的权限，应该是row.permissionTypes中的某个字段              |
| popover    | boolean  | false                 | 是否以popover形式展示按钮，内部使用kd-popover-button处理            |
| popConfig  | object   | 见kd-popover-button    | 对应kd-popover-button的配置                              |
| dropdown   | boolean  | false                 | 是否以dropdown形式展示按钮，内部使用el-dropdown处理                 |
| hidden     | function | (scope,item)=>boolean | 隐藏按钮，并会有一个占位符，让按钮列看起来整齐；dropdown中的按钮该属性不生效          |
| show       | function | (scope,item)=>boolean | 是否渲染按钮                                              |

### 事件
| 事件名称  | 说明      | 回调参数                                                                                  |
|-------|---------|---------------------------------------------------------------------------------------|
| click | 操作列被点击时 | { scope, key }，其中scope是完整的el-table-column插槽的scope，<br/>key是按钮对应的key，用于回调函数中区分是哪个按钮被点击 |