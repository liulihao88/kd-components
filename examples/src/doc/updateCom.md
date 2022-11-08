### 老项目前缀kj-组件替换前缀kd-组件指南
- 注意：主要写属性和tag差异,复制时注意空格,直接全局替换，替换后自己需要再整个项目点一点，自测一下。

<div style="width: 100%;display: flex;justify-content: space-between;">
  <div style="width: 25%">
    <h4>kj-text-tooltip 迁移至 kd-tooltip</h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:----------| 
    kj-text-tooltip | kd-tooltip
    :text=" | :content="
  </div>
  <div style="width: 25%">
    <h4>kj-filter-table 迁移至 kd-filter-table</h4>

    原始<img width=80/> | 全局替换<img width=80/> | 
    --- |:----------| 
    kj-filter-table | kd-filter-table
    :search-show=" | :show-search="
  </div>
  <div style="width: 25%">
    <h4>kj-owner 迁移至 kd-owner</h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:--------------------| 
    kj-owner | kd-owner
  </div>
  <div style="width: 25%">
    <h4>kj-cron 迁移至 kd-cron</h4>

    原始<img width=80/> | 全局替换 <img width=80/>  | 
    --- |:----------------------| 
    kj-cron | kd-cron
  </div>
</div>
<div style="width: 100%;display: flex;justify-content: space-between;">
  <div style="width: 25%">
    <h4>kj-affix-footer 迁移至 kd-affix</h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:----------| 
    kj-affix-footer | kd-affix
  </div>
  <div style="width: 25%">
    <h4>kj-input 迁移至 kd-input</h4>

    原始 <img width=80/> | 全局替换 <img width=80/> | 
    --- |:---------------------| 
    kj-input | kd-input
  </div>
  <div style="width: 25%">
    <h4>kj-step 迁移至 kd-step</h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:--------------------| 
    kj-step | kd-step
  </div>
  <div style="width: 25%">
    <h4>kj-date-range 迁移至 kd-date-range</h4>

    原始<img width=80/> | 全局替换 <img width=80/>  | 
    --- |:----------------------| 
    kj-date-range | kd-date-range
  </div>
</div>
<div style="width: 100%;display: flex;justify-content: space-between;">
  <div style="width: 25%">
    <h4> kj-right-drawer 迁移至 kd-drawer </h4>

    原始<img width=80/> | <font color=#FF0000 >单个替换</font> <img color=#FF0000 width=80/>| 
    --- |:----------| 
    kj-right-drawer | kd-drawer
    v-model | :visible.sync
    width | size
    buttons | 删除了,需自己配
    内置了padding | 需删自己的padding
  </div>
  <div style="width: 25%">
    <h4> kj-select-checkbox 迁移至 kd-select-multiple</h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:----------| 
     kj-select-checkbox | kd-select-multiple
  </div>
  <div style="width: 25%">
    <h4>kj-tree-multiple  迁移至 kd-tree-multiple </h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:----------| 
    kj-tree-multiple | kd-tree-multiple
  </div>
  <div style="width: 25%">
    <h4>  kj-tree-single 迁移至 kd-tree-single</h4>

    原始<img width=80/> | 全局替换 <img width=80/>| 
    --- |:----------| 
     kj-tree-single| kd-tree-single
  </div>
</div>
