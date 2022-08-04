# kd-components

## Project setup
```
npm install
```

### 启动examples,可用于调式组件效果和查看代码示例
```
npm run serve
```

### 打包构建组件库
```
npm run build
```

### 打包构建工具库
```
npm run build:utils
```

### 打包构建组件库和工具库
```
npm run all
```

### Run your unit tests
```
npm run test:unit
```

### PeerDependencies 依赖性
```

element-ui core-js  vue  vue-i18n
```

### 使用方式
```js
// 依赖项
import ElementUI from "element-ui";
/**
 * 注意必须是9以下版本,例如 8.25.1
 * npm install -S vue-i18n@8.25.1
 */

import VueI18n from 'vue-i18n' 
// 组件库
import KdComponents from '@kd/components'
// css
import '@kd/components/dist/element-theme/index.css' // 重置el 的样式
import '@kd/components/dist/kd-components.css'
import {zhCn,ja} from "@kd/components/dist/locale/index"


Vue.use(ElementUI);
Vue.use(KdComponents);
Vue.use(VueI18n);


/**
 * 国际化举例
 * @type {{ja: (*&{message: {hello: string}}), en: (*&{message: {hello: string}})}}
 * 修改国际化语言 this.$i8n.locale = 'xxxx'
 */
const messages = {
    en: {
        ...zhCn,
        message: {
            hello: 'hello world'
        }
    },
    ja: {
        ...ja,
        message: {
            hello: 'こんにちは、世界'
        }
    }
}

const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'en', // 设置地区
    messages, // 设置地区信息
})

new Vue({
    render: (h) => h(App),
    i18n,
}).$mount("#app");



```

###  主题修改,需要引入var.scss 主题,或者var.css

```vue

<template>
  <el-button @click="setTheme('')">切换原主题</el-button>
  <el-button @click="setTheme('black')">切换新主题</el-button>
</template>

<script >
export default {
  methods: {
    setTheme (theme) {
      const docElm = document.documentElement
      if (theme) {
        docElm.setAttribute('theme', theme)
      } else {
        docElm.removeAttribute('theme')
      }
    },
  }
}
</script>

```

### 组件更新

```npm

npm install @kd/components
或
npm install @kd/components@next

```

### 注意事项 lodash 引入会报错,需要在vue.config.js 配置以下文件

```js

configureWebpack: {
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            },
        ]
    }
}
    
```

