### 属性
| 选项            | 类型      | 默认值  | 说明                                                     |
|---------------|---------|------|--------------------------------------------------------|
| scroll-top    | number  | 0    | 页面滚动时距离顶部的距离，需要外部传入，配合ScrollLayout 布局组件，可通过inject 直接获取 |
| side-width    | number  | 270  | 吸顶区域宽度                                                 |
| side-position | string  | left | 吸顶区域位置，left、right                                      |
| top-border    | boolean | true | 是否显示上边框                                                |
| side-border   | boolean | true | 是否显示侧边栏边框                                              |
| ext-top       | number  | 0    | 额外的吸顶距离，默认吸顶位置为导航栏下部                                   |
| bottom        | number  | 0    | 组件底部距离浏览器底部的高度，控制组件显示整体高度                              |

### 插槽
| 名称   | 说明     | 回调参数             |
|------|--------|------------------|
| -    | 主要内容区域 |                  |
| side | 吸顶区域   | height，吸顶区域的动态高度 |