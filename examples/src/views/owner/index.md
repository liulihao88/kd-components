#### Attributes
| 选项    | 类型     | 默认值      | 说明                                             |
|-------|--------|----------|------------------------------------------------|
| value/v-model | Array  | []       | 绑定值                                            |
| options | Array | []       | 下拉框内的数据                                        |
| defaultProps | Array | []       | 配置lable 和value     与el-option label   value 同理 |
| disabled | Boolean | false    | 是否禁用全部输入框 且不可添加负责人                             |
| firstDisabled | Boolean | false    | 仅禁用第一个负责人输入框                                   |
| rowKey | string | id       | 与el-option key 同理                              |
| isObject | string | false    | 值为true,获取选中的整个JSON数据                           |
| value-key      | string | realName | isObject值为true时，需要配合使用，回显用的                    |
#### Methods
| 选项            | 类型     | 默认值 | 说明                 |
|---------------|--------|-----|--------------------|
| remoteMethod |  - | -  | 它会在输入值发生变化时调用，参数为当前输入值                |
