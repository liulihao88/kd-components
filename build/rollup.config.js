import vuePlugin from "rollup-plugin-vue";
import alias from '@rollup/plugin-alias';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import { alias as name } from "../package.json";
// import postcss from "rollup-plugin-postcss";
// import postcssImport from "postcss-import";
// import css from "rollup-plugin-css-only";
// import CleanCSS from "clean-css";
import commonjs from "rollup-plugin-commonjs";
import image from '@rollup/plugin-image';
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import strip from "@rollup/plugin-strip";
import {componentsRoot, utilsRoot} from "./build-utils/build.config";

const file = (type) => `dist/${name}.${type}.js`;

export { name, file };
export default {
  input: "packages/components/index.js",
  output: {
    name,
    file: file("esm"),
    format: "es",
  },
  plugins: [
    nodeResolve(),
    image(),
    vuePlugin({
      // css: false, // Dynamically inject css as a <style> tag
    }),
    // css({
    //   output(style) {
    //     !fs.existsSync("dist") && fs.mkdirSync("dist");
    //     fs.writeFileSync(
    //       `dist/${name}.css`,
    //       new CleanCSS().minify(style).styles
    //     );
    //   },
    // }),
    // postcss({
    //   extensions: [".css"],
    //   extract: true,
    //   plugins: [postcssImport()],
    //   // inject: false,
    //   // modules: false,
    // }),
    commonjs({
      include: ["node_modules/**", "node_modules/**/*"],
    }),
    alias({
      entries: [
        {
          find: '@kd/utils',
          replacement: utilsRoot
        },
        { find: '@kd/components', replacement: componentsRoot },
      ]
    }),
    // // 压缩代码
    terser(),
    // // 剔除debugger、assert.equal和 console.log 类似的函数
    strip({
      labels: ["unittest"],
    }),
    babel({
      exclude: "node_modules/**", // 只转译我们的源代码
      runtimeHelpers: true,
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".vue"],
    }),
    excludeDependenciesFromBundle({
      peerDependencies: true,
      dependencies: false,
    }),
  ],
  watch: {
    include: "packages/**",
  },
};
