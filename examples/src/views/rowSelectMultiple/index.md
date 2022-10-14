### 注意
选项key需要使用string类型，因为使用了**事件委托**和html的**data-\*自定义数据属性**

### 属性
#### 全局属性
| 选项            | 类型     | 默认值 | 说明                 |
|---------------|--------|-----|--------------------|
| value/v-model | Array  | []  | 绑定值                |
| duration      | number | 100 | 收缩展开动画时长，单位ms      |
| defaultLines  | number | 1   | 默认显示行数             |

#### 左侧label相关
| 选项          | 类型      | 默认值    | 说明                      |
|-------------|---------|--------|-------------------------|
| labelWidth  | String  | "auto" | label宽度，默认自适应，可指定为固定宽度  |
| labelAlign  | String  | "left" | label水平对齐方式，同text-align |
| labelText   | String  | "选项"   | label显示文字               |
| separator   | Boolean | false  | 是否显示分隔符                 |
| labelStyles | Object  | {}     | 左侧label文字的样式，支持css      |

#### 右侧按钮相关
| 选项           | 类型      | 默认值    | 说明                              |
|--------------|---------|--------|---------------------------------|
| foldText     | String  | "更多"   | 右侧按钮折叠状态时文字                     |
| unfoldText   | String  | "收起"   | 右侧按钮展开状态时文字                     |
| showIcon     | Boolean | true   | 是否显示右侧图标                        |
| btnStyles    | Object  | {}     | 右侧按钮文字样式，不含icon                 |
| forceMoreBtn | Boolean | false  | 是否强制显示右侧折叠按钮，默认为false，即数量不足时不显示 |
| iconPosition | String  | 'left' | 折叠按钮图标位置，可选：left/right          |

#### 中间选项相关
| 选项              | 类型      | 默认值     | 说明                            |
|-----------------|---------|---------|-------------------------------|
| options         | Array   | []      | 选项数组，对象数组，{label:'',value:''} |
| showAll         | Boolean | true    | 多选模式下，是否显示"全部"选项              |
| itemWidth       | String  | auto    | 选项宽度，带px的单位字符串                |
| itemMaxWidth    | String  | auto    | 选项最大宽度，带px的单位字符串              |
| lineHeight      | number  | 24      | 文本行高，单位px，会影响选项行高度            |
| overflow        | String  | ellispe | 指定宽度时，超宽后行为                   |
| labelName       | String  | label   | 用来显示的字段名                      |
| keyName         | String  | value   | 用作key的字段名                     |
| activeBgColor   | String  | #365edf | 激活状态时选项背景颜色                   |
| activeTextColor | String  | #fff    | 激活状态时选项文字颜色                   |
| hoverBgColor    | String  | 无       | hover状态时选项背景色                 |
| hoverTextColor  | String  | 无       | hover状态时选项文字色                 |
| itemStyles      | Object  | {}      | 选项样式集                         |

### 事件
| 事件名称         | 说明                    | 回调参数           |
|--------------|-----------------------|----------------|
| selectChange | 选项发生变化时，返回原数据中选中的项    | 数据项数组          |
| foldChange   | 组件打开或收起变化时触发，返回组件当前状态 | close收起，open打开 |

### 方法（ref调用）
| 方法名称    | 说明                    | 参数                              |
|---------|-----------------------|---------------------------------|
| trigger | 组件打开或收起变化时触发，返回组件当前状态 | 无参数时按当前状态切换；可选参数：close收起/open打开 |