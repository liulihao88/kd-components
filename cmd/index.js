#!/usr/bin/env node
const process = require("process");
const path = require("path");
const shell = require("shelljs");
let chmodComponent = process.argv[2];
let chmodUtils = process.argv[3];
let cwd = process.cwd();
const utilsRoot = path.join(cwd, "/packages/utils");
/**
 * A 升级主版本号
 * B 升级此版号
 * C 升级修订号
 */

if (!chmodComponent) {
  shell.exec("npm version patch");
} else if (chmodComponent === "A") {
  shell.exec("npm version major");
} else if (chmodComponent === "B") {
  shell.exec("npm version minor");
}
shell.exec("npm publish");
shell.cd(utilsRoot);
if (!chmodUtils) {
  shell.exec("npm version patch");
} else if (chmodComponent === "A") {
  shell.exec("npm version major");
} else if (chmodComponent === "B") {
  shell.exec("npm version minor");
}
shell.exec("npm publish");
