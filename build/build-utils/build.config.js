import { resolve } from 'path'

/**
 * 过滤不需要被引入的入口文件
 * @param files
 * @returns {*}
 */
export const excludeFiles = (files) => {
    console.log(files,'files')
    const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist', 'locale']
    return files.filter(
        (path) => !excludes.some((exclude) => path.includes(exclude))
    )
}


export const projRoot = resolve(__dirname, '..',)
console.log(projRoot,'projRoot');
export const pkgRoot = resolve(projRoot, 'packages/')
console.log(pkgRoot,'pkgRoot')
export const epRoot = resolve(pkgRoot, '')
console.log(epRoot,'epRoot');


/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist` */
export const epOutput = resolve(buildOutput, '')
