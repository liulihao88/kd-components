##### 用于记录版本更新的内容, 规范待定。可直接在这个文件，或者按照版本分类成多个md文档，每10个发版为一个md.

- 【新增】 增加v-clickoutside指令，从项目模板迁移到组件库
- 【优化】 kd-icon: 支持图标禁用状态
- 【新增】 kd-auto-search：数据可内部自动处理的搜索组件
- 【优化】 kd-table-search：使用el-collapse-transition组件优化折叠/展开动画


### V2.0.17 (2023-2-27)
- 【优化】 gFunc的getStorage, 增加第二个参数区分取的是localStorage还是sessionStorage
### V2.0.16 (2023-2-22)
- 【优化】 京东红主题色theme名称修改

### V2.0.15 (2023-2-22)
- 【优化】 主题色
- 【fix】(kd-filter-table): 解决searchSpread不生效的问题
### V2.0.13 (2023-2-21)
- 【优化】 脱敏关键词

### V2.0.12 (2023-2-20)
- 【优化】 表格echoAll 函数，?? 不能使用问题修复

### V2.0.11 (2023-2-18)
- 【优化】 kd-table-search样式调整，行间距8px

### V2.0.10 (2023-2-13)
- 【刘力豪】 ...

### V2.0.9 (2023-2-08)
- 【feat】增加kd-dev组件
- 【优化】 kd-dialog和kd-drawer

### V2.0.7 (2023-1-12)
- 【新增】kd-select增加disabled和option为空的样式, gStyle支持-1000到0
### V2.0.5 (2023-1-12)
- 力豪新增的内容,

### V2.0.3 (2023-1-10)
- 【iconfont】 更新iconfont
- 【style】kd-table-search：样式优化，默认下边距16px
- 【fix】kd-date-range：预设时间范围选项优化

### V2.0.2 (2023-1-08)
- 【fix】kd-table-search：修复old-model模式下，布局异常问题
- 【优化】kd-date-range, kd-select：title颜色调整

### V2.0.1 (2023-1-05)
- 【重构】kd-row-select：行选择器，整合kd-row-select-multiple组件功能，增加单选模式；增加选项插槽；
- 【优化】kd-column-action：popConfig支持函数式配置
- 【优化】kd-table-search：增加对旧项目改造时表格搜索栏的兼容处理
- 【优化】kd-owner：增加no-icon属性，可隐藏增加负责人按钮
- 【新增】mMaxLength：校验指定长度字段串

### V0.1.99 (2023-1-05)
- 【优化】kd-filter-table：simple-kv=true时，先选择一个时间范围进行筛选，再点击x清空时间范围，然后点击重置会报错

### V0.1.98 (2022-12-30)
- 力豪新增的内容,
### V0.1.97 (2022-12-29)
- 【优化】kd-filter-table：simple-kv=true配置兼容老平台表格的同时，兼容新平台以k-v的形式传参

### V0.1.96 (2022-12-23)
- 【优化】kd-owner：负责人前加*
- 【优化】新增icon图标

### V0.1.95 (2022-12-22)
- 【优化】kd-filter-table：优化(缺刘力豪备注)

### V0.1.93 (2022-12-22)
- 【优化】kd-filter-table：优化(缺刘力豪备注)

### V0.1.92 (2022-12-16)
- 【fix】kd-filter-table：没有关键词搜索只有高级搜索项时样式调整

### V0.1.91 (2022-12-15)
- 【优化】kd-page-title：回退提交，取消no-border属性

### V0.1.90 (2022-12-13)
- 【fix】kd-column-text：数据为非string类型时不能直接赋值给tooltip的content属性，必须转为string
- 【feat】kd-column-filter：优化config参数处理逻辑，no-status时可简写属性

### V0.1.89 (2022-12-13)
- 【feat】kd-column-filter：新增状态及筛选列组件，专注于状态及筛选功能，简化配置项，用于代替kd-column-show的部分功能；
- 【fix】kd-column-text：数据为非string类型时不能直接赋值给tooltip的content属性，必须转为string
- 【优化】kd-page-title：no-border属性可代替border属性（是否显示底边框）

### V0.1.88 (2022-12-11)
- 【refactor】kd-column-action：新增列操作组件，重构并代替kd-column-operate组件
- 【feat】新增kd-column-text列文件展示组件，从kd-column-show中分离，满足较复杂的列展示场景，原组件仍可使用
- 【docs】完善kd-simple-table组件文档及示例代码

### V0.1.87 (2022-12-05)
- 【fix】 kd-column-operate：内部click事件造成的按钮偶尔触发

### V0.1.86 (2022-12-05)
- 【优化】 kd-column-operate：按钮disabled属性支持函数
- 【优化】 kd-column-show/kd-column-form：优化列宽配置

### V0.1.85 (2022-12-03)
- 【feat】 下拉树单选: 加leafOnlyNode、disabledTreeCheck属性
- 【fix】 kd-column-show：修改单词错误引起的属性不生效问题；修复状态展示时内边距问题
- 【优化】 kd-table-search：增加内部触发方法兼容写法
- 【优化】 kd-column-operate：增加宽度默认值
- 【优化】 kd-simple-table：整理并优化样式，保持与filter-table统一

### V0.1.83 (2022-11-29)
- 【feat】 下拉树单选: 加禁止选择功能
### V0.1.82 (2022-11-26)
- 【feat】 kd-owner 新增isObject属性，兼容手机号
### V0.1.81 (2022-11-22)
- 【feat】 kd-filter-table：增加simpleKv配置项，true代表兼容老平台的表格（老平台接口传参不一样）
###  V0.1.80 (2022-11-11)
- 【优化】 job-tree功能完善
- 【fix】 kd-filter-table：searchTitle配置后不显示
###  V0.1.79 (2022-11-10)
- 【feat】kd-icon：修改name传递icon类名方式；删除local属性；增加next()方法可手动控制图标切换；增加custom-next标识是否自动切换图标；
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

