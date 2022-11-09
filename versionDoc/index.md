##### 用于记录版本更新的内容, 规范待定。可直接在这个文件，或者按照版本分类成多个md文档，每10个发版为一个md.


###  V0.1.78 (2022-11-09)
- 【优化】kd-column-form/kd-column-form-show：增加对header、default插槽的支持
- 【fix】 kd-input：高度错误问题
- 【优化】 kd-cron 的宽度默认为316px
###  V0.1.77 (2022-11-08)
- 【feat】kd-icon：支持组件内使用项目本地图标
- 【优化】 kd-tooltip 的出现位置默认改为top
###  V0.1.76 (2022-11-07)
- 【fix】 kd-tooltip,解决tag为undefined时报错的问题
###  V0.1.75 (2022-11-07)
- 【fix】kd-icon 使用?.,删除?.方式，更换其它方式
###  V0.1.73 (2022-11-07)
- 【优化】kd-tree：修改列表项默认样式：高度32px，下边距4px
- 【优化】kd-icon：增加大量新功能；优化文档使用（点击类名可直接复制）
- 【优化】kd-column-form：兼容非form情况
- 【重构】将kd-row-select-multiple整合进kd-row-select组件
- 【优化】element-variables.scss：整理样式文件，删除重复代码；增加页面进度条样式覆盖；
- 【优化】kd-column-operate：内部dropdown按钮水平居中
- 【优化】kd-table-search：调整“更多”按钮图标位置

###  V0.1.72 (2022-11-04)
- 【新增】kd-popover-button组件：增加type=dropdown显示模式（类似el-dropdown）
- 【优化】【内部】example-cole：底部代码隐藏按钮增加吸底效果
- 【优化】kd-table-search组件：增加折叠动画效果，增加展开/折叠文字props
- 【优化】kd-simple-table组件逻辑优化，去掉内部对type=index/selection/expand特殊列的处理
- 【文档】清除scroll-group组件冗余代码

###  V0.1.71 (2022-11-03)
- 【优化】simple-table组件逻辑优化

###  V0.1.70 (2022-11-02)
- 【删除】AdvancedSearch组件
- 【优化】项目内增加eslint、prettier、git Hooks相关代码规范化配置
- 【优化】kd-title：取消.title::before的z-index层级声明
- 【优化】kd-column-show显示列组件：增加默认列宽：width=120，minWidth=100
- 【fix】使用```lodash.get```方法代替```?.```操作符
- 【fix】修复kd-scroll-group组件横向滚动逻辑异常

###  V0.1.69 (2022-10-31)

- 【新增】kd-simple-table、kd-column-show、kd-column-operate、kd-column-form、kd-table-search系列表格组件及示例代码。
- 【新增】kd-page-title页面标题组件。
- 【删除】AdvancedSearch组件弃用，改为使用kd-row-select-multiple组件。
- 【优化】kd-filter-table组件，点击重置按钮重置时间范围时控制台报错问题修复。
- 【优化】kd-row-select-multiple组件，停止对ke-row-select组件的更新。
- 【优化】重构kd-scroll-group组件。

