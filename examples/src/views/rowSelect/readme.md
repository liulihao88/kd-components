### 注意
选项key需要使用string类型，因为使用了**事件委托**和html的**data-\*自定义数据属性**

### 属性
#### 全局属性
|选项|类型|默认值|说明|
|---|---|---|---|
|value/v-model|string \| Array|"" \| []|绑定值|
|multiple|Boolean|true|是否可多选|
|duration|number|200|动画时长，单位ms|
|lineHeight|number|24|文本行高，会影响选项行高度|
|required|Boolean|true|是否必须选中最少1项，v-model未绑定值时，默认选中第一项|

#### 左侧label相关
|选项|类型|默认值|说明|
|---|---|---|---|
|showLable|Boolean|true|是否显示左侧label|
|labelText|String|"选项"|左侧label文字|
|separator|String|""|左侧label文字后的分隔符|
|labelStyles|Object|{}|左侧label文字的样式，支持css|

#### 右侧按钮相关
|选项|类型|默认值|说明|
|---|---|---|---|
|foldText|String|"更多"|右侧按钮折叠状态时文字|
|unfoldText|String|"收起"|右侧按钮展开状态时文字|
|showIcon|Boolean|true|右侧图标是否显示|
|btnStyles|Object|{}|右侧按钮文字样式，不含icon|

#### 中间选项相关
|选项|类型|默认值|说明|
|---|---|---|---|
|options|Array|[]|选项数组，对象数组，{label:'',value:''}|
|showAll|Boolean|true|多选模式下，是否显示"全部"选项|
|labelName|String|label|用来显示的字段名|
|keyName|String|value|用作key的字段名|
|format|function|null|自定义选项显示内容转换函数，参数为：选项、index，需要返回字符|
|activeBgColor|String|#365edf|激活状态时选项背景颜色|
|activeTextColor|String|#fff|激活状态时选项文字颜色|
|hoverBgColor|String||hover状态时选项背景色|
|hoverTextColor|String||hover状态时选项文字色|
|itemWidth|String|auto|选项宽度，带px的单位字符串|
|itemMaxWidth|String|auto|选项最大宽度，带px的单位字符串|
|overflow|String|ellispe|指定宽度时，超宽后行为|
|itemStyles|Object|{}|选项样式集|

### 事件
|事件名称|说明|回调参数|
|---|---|---|
|selectChange|选项发生变化时，返回原数据中选中的项|数据项数组|
|foldChange|组件打开或收起变化时触发，返回组件当前状态|close收起，open打开|

### 方法（ref调用）
|方法名称|说明|参数|
|---|---|---|
|trigger|组件打开或收起变化时触发，返回组件当前状态|无参数时按当前状态切换；可选参数：close收起/open打开|
|set|选择指定选项|选项key字符串或数组，特殊参数："$all"，当multiple=true,showAll=true时，可直接选中"全部"选项|
|add|增加选项|选项key字符串或数组|
|reduce|减少选项|选项key字符串或数组|

### slot
|名称|说明|参数|
|---|---|---|
|all|multiple=true,showAll=true时，"全部"选项|index:'$all'，"全部"选项的特殊key；active:true/false，是否被选中|
|default|选项插槽，自定义选项item|item:选项对象；index:选项的key；active：true/false，是否被选中|