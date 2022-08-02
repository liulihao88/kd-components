import path from 'path';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vuePlugin from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import glob from 'fast-glob'
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";
import { alias as name } from "../package.json";
import css from "rollup-plugin-css-only";
import CleanCSS from "clean-css";
import babel from "rollup-plugin-babel";
// import { terser } from "rollup-plugin-terser";
import strip from "@rollup/plugin-strip";

// 用于文件查找 https://www.cnblogs.com/goloving/p/13096867.html
import {excludeFiles,pkgRoot,epOutput,epRoot} from "./build-utils/build.config";
import fs from "fs";

export const PKG_NAME = 'dist'

export const buildConfig= {
    esm: {
        module: 'ESNext',
        format: 'es',
        ext: 'mjs',
        output: {
            name: 'es',
            path: path.resolve(epOutput, 'es'),
        },
        bundle: {
            path: `${PKG_NAME}/es`,
        },
    },
    cjs: {
        module: 'CommonJS',
        format: 'cjs',
        ext: 'js',
        output: {
            name: 'lib',
            path: path.resolve(epOutput, 'lib'),
        },
        bundle: {
            path: `${PKG_NAME}/lib`,
        },
    },
}


export const buildConfigEntries = Object.entries(
    buildConfig
)

export const buildModules = async () => {
    const input = excludeFiles(
        await glob('**/*.{js,ts,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true,
        })
    )

    return {
        input: input,
        plugins: [
            css({
                output(style) {
                    !fs.existsSync("dist") && fs.mkdirSync("dist");
                    fs.writeFileSync(
                        `dist/${name}.css`,
                        new CleanCSS().minify(style).styles
                    );
                },
            }),
            vuePlugin({
                isProduction: false,
                css: false, // Dynamically inject css as a <style> tag
            }),
            nodeResolve({
                extensions: ['.mjs', '.js', '.json', '.ts'],
            }),
            babel({
                exclude: "node_modules/**", // 只转译我们的源代码
                runtimeHelpers: true,
                extensions: [".js", ".jsx", ".es6", ".es", ".vue"]
            }),
            commonjs({
                include: ["node_modules/**", "node_modules/**/*"],
            }),
            // // 压缩代码
            // terser(),
            // // 剔除debugger、assert.equal和 console.log 类似的函数
            strip({
                labels: ["unittest"],
            }),
            excludeDependenciesFromBundle({
                peerDependencies: true,
                dependencies: false,
            }),
        ],
        output: buildConfigEntries.map(([module, config]) => {
            return {
                format: config.format,
                dir: config.output.path,
                exports: module === 'cjs' ? 'named' : undefined,
                preserveModules: true,
                preserveModulesRoot: epRoot,
                sourcemap: false,
                // manualChunks: id => path.parse(id).name,
                entryFileNames(chunkInfo) {
                    let name = chunkInfo.name.replace('.vue_rollup-plugin-vue_script','_script');
                    return `${name}.${config.ext}`
                },
            }
        })
    }
}

export default buildModules();


