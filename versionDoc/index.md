##### 用于记录版本更新的内容, 规范待定。可直接在这个文件，或者按照版本分类成多个md文档，每10个发版为一个md.




###  V0.1.70 (2022-11-03)
- 【优化】simple-table组件逻辑优化
- 【文档】删除scroll-group组件冗余代码

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

