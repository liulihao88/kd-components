### 属性
| 选项              | 类型      | 默认值      | 说明                                                                                     |
|-----------------|---------|----------|----------------------------------------------------------------------------------------|
| prop            | string  | ""       | 必填，字段名，用于column.prop、form-item.prop、内部表单绑定值                                            |
| t-name          | string  | ""       | 必填，form中table字段名，用于绑定校验                                                                |
| editor-type     | string  | el-input | 内部表单组件名，需要全局组件名                                                                        |
| col-attrs       | object  | {}       | 对应el-table-column的属性，除prop字段                                                           |
| form-item-attrs | object  | {}       | 对应el-form-item的属性，除prop字段                                                              |
| editor-attrs    | object  | {}       | 对应内部表单组件的属性，按具体的组件定义                                                                   |
| key-field       | string  | "key"    | 表格行唯一标识，类似vue的key的作用，**目前好像可以不传**                                                      |
| no-form         | boolean | false    | 内部表单项是否用el-form-item包裹（外层没有el-form时el-form-item不可用）。<br/>true时t-name、form-item-attrs失效 |
