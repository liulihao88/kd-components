import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../dist/kj-components.css";
import "./assets/styles/var.scss";
import kjComponents from "../packages/components/index";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(kjComponents);

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
}).$mount("#app");
