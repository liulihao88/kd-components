<template>
  <div>
    <example-title :data="{ title: '行选择器', maintenance: '刘云' }" warning>
      kd-row-select是将kd-row-select-multiple（多选）和kd-row-select-single（单选，未开发）整合在一起，通过type来控制最终渲染哪个组件<br />
      - type=multiple：默认，为kd-row-select-multiple
      行级多选组件，在目前情况下，使用kd-row-select和kd-row-select-multiple是相同的效果<br />
      - type=single：单选，目前无需求，未开发<br />
      这样的好处是保证了原有组件的全部属性，同时在使用时又比较方便。<br />
      查看：<a href="#testRowSelectMultiple">kd-row-select-multiple</a>
      <template #warning>row-select计划支持多选和单选模式，目前只支持多选，单选模式正在开发中</template>
    </example-title>
  </div>
</template>
