import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import './directives/index';
import 'github-markdown-css/github-markdown.css';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
// import "element-ui/lib/theme-chalk/index.css";
// 重置el 样式
import '../../packages/theme-chalk/element-theme/index.css';
// dist
import "../../dist/kd-components.css";
import kjComponents from "../../dist/kd-components.esm.js";

// 本地的
// import kjComponents from '../../packages/components/index';
// import '../../packages/theme-chalk/src/index.scss';
import { zhCn, ja } from '../../packages/locale/index';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(kjComponents);
Vue.use(VueI18n);



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
};

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en', // 设置地区
  messages // 设置地区信息
});

const setTheme = (theme) => {
  if (theme) {
    const docElm = document.documentElement;
    if (!docElm.hasAttribute('theme')) {
      docElm.setAttribute('theme', theme);
    } else {
      docElm.removeAttribute('theme');
    }
  }
};
setTheme('');

// 全局混入mixins。 mixins的变量和方法前缀都有个m。
Vue.mixin({
  data() {
    return {
      mIsDev: process.env.NODE_ENV === 'development'
    };
  },
});
new Vue({
  render: (h) => h(App),
  i18n
}).$mount('#app');
