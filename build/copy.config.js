import { copy } from 'fs-extra'

export const copyLocale = () => {
    copy('packages/locale','dist/locale',{ recursive: true }).then(() => console.log('success!')).catch(err => console.error(err))
}

export const copyUtilPkg = ()=> {
    copy('packages/utils/package.json','kd-utils/package.json').then(() => console.log('success!')).catch(err => console.error(err))
}
