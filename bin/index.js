// #!/usr/bin/env node
const process = require("process")
const path = require("path")
const shell = require('shelljs')
let chmodComponent = process.argv[2]
let chmodUtils = process.argv[3]
let cwd = process.cwd();
const utilsRoot = path.join(cwd, '/packages/utils')
/**
 * A 升级主版本号
 * B 升级此版号
 * C 升级修订号
 */
switch (chmodComponent) {
    case "A":
        shell.exec('npm version major');
        shell.exec('npm publish');
        break;
    case "B":
        shell.exec('npm version minor');
        shell.exec('npm publish');
        break;
    default:
        shell.exec('npm version patch');
        shell.exec('npm publish');
        break;
}

shell.cd(utilsRoot);
switch (chmodUtils) {
    case "A":
        shell.exec('npm version major');
        shell.exec('npm publish');
        break;
    case "B":
        shell.exec('npm version minor');
        shell.exec('npm publish');
        break;
    default:
        shell.exec('npm version patch');
        shell.exec('npm publish');
        break;
}
