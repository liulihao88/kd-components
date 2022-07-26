import { copy } from 'fs-extra'

copy('packages/locale','dist/locale',{ recursive: true }).then(() => console.log('success!')).catch(err => console.error(err))
