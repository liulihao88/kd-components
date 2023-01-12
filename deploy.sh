#!/bin/bash

#set -o verbose
set -o nounset
set -o errexit

base_dir=$(dirname ${0})
deploy_path="/opt/jenkins_workspace/workspace/themis-vue/node_modules/@kd/"
server="root@192.168.12.205"

# 本地文件打包
cd ${base_dir}
if [[ "$#" != 0 && "$1" == "-k" ]]; then
    echo
else
    npm run build:exm
fi

echo "Copy to server [${server}]..."
#scp是linux间复制文件和目录
scp -r ${base_dir}/dist ${server}:${deploy_path}

cmd="cd ${deploy_path}\
  && rm -rf components/dist/\
  && mv dist/ components/dist/"

echo "Extracting..$cmd"
ssh -q -t ${server} "${cmd}"
echo "Done."
