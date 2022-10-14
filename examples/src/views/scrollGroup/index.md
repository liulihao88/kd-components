### 注意
选项key需要使用string类型，因为使用了**事件委托**和html的**data-\*自定义数据属性**

### 属性
| 选项            | 类型      | 默认值   | 说明                                |
|---------------|---------|-------|-----------------------------------|
| value/v-model | string  | ""    | 绑定值                               |
| options       | array   | []    | 对象数组，[{label:'',value:''}]        |
| type          | string  | group | 按钮类型：group-按钮组，button-单个按钮，tag-标签 |
| space         | number  | 16    | 选项间距，对type=group无效                |
| height        | number  | 34    | 选项高度，对type=tag时只影响组件高度，不影响选项样式    |
| forceShow     | boolean | false | 是否强制显示两边按钮，默认情况下，超宽时才显示           |

### 事件
| 事件名称   | 说明      | 回调参数     |
|--------|---------|----------|
| change | 选项发生变化时 | 数据项value |