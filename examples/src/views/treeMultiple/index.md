### 属性

| 选项         | 类型   | 默认值                                           | 说明     |
| ------------ | ------ | ------------------------------------------------ | -------- |
| tableData    | Array  | ''                                               | 展示数据 |
| defaultProps | Object |{value: "id",label: "name",children: "children"} | 属性  |
| showCheckbox | Boolean | true  | 是否显示checkbox    |
| isObject | Boolean | true  | 是否是对象    |
| edit | Boolean | false  | 设为true,说明拿到的数据，在外部会再次被增删改.节省资源    |

### 方法
|方法名称| 说明                      | 参数            |
|---|-------------------------|---------------|
|currentNode| 操作的当前项 | 当前项的值             |

### 注意
+ isObject true 返回数组是[{name:'',id: ''}], false 返回数组 [2,3]
