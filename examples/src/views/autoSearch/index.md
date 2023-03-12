### 属性
| 选项           | 类型      | 默认值           | 说明                          |
|--------------|---------|---------------|-----------------------------|
| fold-text    | string  | 高级搜索          | 折叠状态下查看更多按钮文字               |
| un-fold-text | string  | 收起            | 展开状态下收起按钮文字                 |
| old-model    | boolean | false         | 兼容旧系统模式下，所有表单水平平铺排列         |
| form-arr     | array   | formArrItem[] | 搜索参数表单配置，formArrItem详细配置见下方 |

#### formArrItem
| 选项           | 类型      | 默认值      | 说明                                                                                                    |
|--------------|---------|----------|-------------------------------------------------------------------------------------------------------|
| type         | string  | kd-input | 全局组件的名称，内部使用 \<component :is="type" \/> 动态渲染                                                          |
| key          | string  | 必填       | 配置项的唯一标识，最好设置为查询参数对象的key                                                                              |
| value        | any     | any      | 表单项组件的默认值                                                                                             |
| defaultValue | any     | -        | 该表单项组件在重置/清空时的默认值，默认会根据type 进行判断，目前已支持kd-input、kd-select、ke-date-range、el-input、el-switch、el-checkbox |
| title        | string  | ""       | 如果type 为 kd-input/kd-select/ke-date-range 时，title 属性                                                  |
| placeholder  | string  | ""       | 组件的 placeholder 属性                                                                                    |
| disabled     | boolean | false    | 组件的 disabled 属性                                                                                       |
| attrs        | object  | null     | 组件的其他原生属性，通过 v-bint=attrs 作用在组件上，根据具体组件自行设定                                                           |
| listeners    | object  | null     | 组件的其他原生事件，通过 v-on=listeners 作用在组件上，根据具体组件自行设定                                                         |

### 事件
| 事件名称   | 说明         | 回调参数                                                             |
|--------|------------|------------------------------------------------------------------|
| fold   | 折叠或展开回调    | function({fold:boolean,form:{}}){}，fold 表示折叠状态，form 表示事件触发后的表单数据 |
| search | 点击搜索回调     | function({}){}，表示表单数据                                            |
| reset  | 点击重置回调     | function({}){}，表示表单数据，内部会自动清空数据                                  |
| change | 任意表单数据变化回调 | function({}){}，表示表单数据                                            |

### 插槽
| 名称      | 说明                       | 回调参数                                   |
|---------|--------------------------|----------------------------------------|
| right   | 首行右侧操作按钮区域               |                                        |
| 表单项具名插槽 | 使用插槽渲染表单项时，name 就是该项的key | {data,form}，data 是该项的配置，form 是处理后的表单数据 |