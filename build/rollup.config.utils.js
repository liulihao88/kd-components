import { nodeResolve } from "@rollup/plugin-node-resolve";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import { alias as name } from "../packages/utils/package.json";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import strip from "@rollup/plugin-strip";
const file = (type) => `kd-utils/${name}.${type}.js`;
import {copyUtilPkg , copyUtilMd} from "./copy.config"

copyUtilPkg();
copyUtilMd();
export { name, file };
export default {
    input: "packages/utils/index.js",
    output: [
        {
            name,
            file: file("esm"),
            format: "es",
        },
        {
            name,
            file: file("cjs"),
            format: "cjs",
            exports: "named"
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs({
            include: ["node_modules/**", "node_modules/**/*"],
        }),
        // // 压缩代码
        terser(),
        // // 剔除debugger、assert.equal和 console.log 类似的函数
        strip({
            labels: ["unittest"],
        }),
        excludeDependenciesFromBundle({
            peerDependencies: true,
            dependencies: false,
        }),
    ],
    watch: {
        include: "packages/utils/**",
    },
};
