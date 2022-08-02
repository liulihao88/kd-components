import basicConfig, { name, file } from "./rollup.config";
import {copyLocale} from "./copy.config"
// import vue from "rollup-plugin-vue";
// basicConfig.plugins.push(vue({ css: false }));
copyLocale();
export default {
  ...basicConfig,
  output: {
    name,
    file: file("esm"),
    format: "es",
  },
};
