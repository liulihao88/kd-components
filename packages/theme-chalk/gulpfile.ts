import path from 'path'
import chalk from 'chalk'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import consola from 'consola'
import rename from 'gulp-rename'
import { buildThemeOutput } from "../../build/build-utils/build.config"

const distFolder = buildThemeOutput

function copy() {
    const sass = gulpSass(dartSass)
    const prefixFile = /(index|base|display)/
    return src(path.resolve(__dirname, 'src/index.scss'))
        .pipe(sass.sync()) //将scss编译成css
        .pipe(autoprefixer({ cascade: false }))
        .pipe(
            cleanCSS({}, (details) => {
                consola.success(
                    `${chalk.cyan(details.name)}: ${chalk.yellow(
                        details.stats.originalSize / 1000
                    )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
                )
            })
        )
        .pipe(
            rename((path) => {
                if (prefixFile.test(path.basename)) {
                    path.basename = `kd-components`
                }
            })
        )
        .pipe(dest(distFolder))
}

export default copy
