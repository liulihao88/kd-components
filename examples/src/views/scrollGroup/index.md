### 属性
| 选项            | 类型      | 默认值   | 说明                                |
|---------------|---------|-------|-----------------------------------|
| value/v-model | string  | ""    | 绑定值                               |
| options       | array   | []    | 对象数组，[{label:'',value:''}]        |
| type          | string  | group | 按钮类型：group-按钮组，button-单个按钮，tag-标签 |
| space         | number  | 16    | 选项间距，对type=group无效                |
| item-styles   | object  | {}    | 选项自定义样式                           |
| item-class    | string  | ""    | 选项自定义类名                           |
| height        | number  | 34    | 组件高度，同时也影响选项、按钮                   |
| force-show    | boolean | false | 是否强制显示两边按钮，默认情况下，超宽时才显示           |
| btn-styles    | object  | {}    | 两边按钮自定义样式                         |
| btn-class     | string  | ""    | 两边按钮自定义类名                         |

### 事件
| 事件名称   | 说明      | 回调参数                 |
|--------|---------|----------------------|
| change | 选项发生变化时 | 数据项value,item,$index |

### 插槽
| 名称  | 说明   | 回调参数                         |
|-----|------|------------------------------|
| -   | 选项插槽 | 数据项item,index，通过slot-scope获取 |