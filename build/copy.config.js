import { copy } from 'fs-extra'

export const copyFile = (inputPath , targetPath , message = 'success!') =>{
    return () => {
        copy(inputPath,targetPath,{ recursive: true }).then(() => console.log(message)).catch(err => console.error(err))
    }
}
export const copyLocale = copyFile('packages/locale', 'dist/locale','locale success!')

export const copyUtilPkg = copyFile('packages/utils/package.json','kd-utils/package.json','utilsPkg success!')

export const copyElementUIReset = copyFile('packages/theme-chalk/element-theme','dist/element-theme','element-theme success!')

export const copyCmpPkg = copyFile('package.json','dist/package.json', 'dist/locale','cmpPkg success!')

