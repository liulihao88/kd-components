
export const requireComponents =  function (constantModules,exclude) {
    let components = {}
    let names = []
    constantModules.keys().forEach(key => {
        const fileName = key.split('/')[1];
        let name1 = fileName.charAt(0).toUpperCase();
        let name2 = fileName.slice(1)
        let newFileName = `test${name1}${name2}`
        if(!exclude.includes(newFileName)) {
            names.push(newFileName)
        }
        Object.assign(components, { [newFileName]: constantModules(key).default })
    })
    return {
        components,
        names
    }
}

export const requireMd =  function (constantModules) {
    let mds = {}
    constantModules.keys().forEach(key => {
        const fileName = key.split('/')[1];
        let name1 = fileName.charAt(0).toUpperCase();
        let name2 = fileName.slice(1)
        let newFileName = `test${name1}${name2}`
        Object.assign(mds, { [newFileName]: constantModules(key) })
    })
    return {
        mds
    }
}
