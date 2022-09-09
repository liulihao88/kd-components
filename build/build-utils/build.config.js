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
export const pkgRoot = resolve(projRoot, 'packages/')
export const epRoot = resolve(pkgRoot, '')
export const componentsRoot = resolve(pkgRoot, 'components')
export const utilsRoot = resolve(pkgRoot, 'utils')


export const buildOutput = resolve(projRoot, 'dist')
export const buildThemeOutput = resolve(projRoot, '../dist')
export const epOutput = resolve(buildOutput, '')
