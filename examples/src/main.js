import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import VueI18n from 'vue-i18n'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import "element-ui/lib/theme-chalk/index.css";
import '../../packages/theme-chalk/element-theme/index.css'
import "../../dist/kd-components.css";
import "./assets/styles/var.css";
import kjComponents from "../../packages/components/index";
import {zhCn,ja} from "../../packages/locale/index"
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
}

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'en', // 设置地区
  messages, // 设置地区信息
})


const setTheme = (theme) => {
  if (theme) {
    const docElm = document.documentElement;
    if (!docElm.hasAttribute("theme")) {
      docElm.setAttribute("theme", theme);
    } else {
      docElm.removeAttribute("theme");
    }
  }
};
setTheme("");
new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
