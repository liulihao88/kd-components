pipeline {
  agent {
    label '192.168.12.205'
  }
  tools {
    nodejs 'node'
  }
  stages {
    stage('Build') {
      steps {
        //  sh 'sh check_package.sh'
         sh 'cnpm install'
         sh 'cnpm run build:exm'
      }
    }
    //部署阶段
    stage('Deploy') {
      steps {
        sh '''
          #前端部署目录;主前端路径不包含subapp,子前端路径必须为:主前端路径/subapp/前端名称，以/结尾。
          app_workspace_path=/opt/application/kd-components/
          if [[ -z ${app_workspace_path} ]]; then
            echo -e "\033[0;35m>>> 未正确配置应用工作目录,无法完成自动部署 <<<\033[0m"
            exit 0
          fi
          if [ ! -d ${app_workspace_path} ] ;  then
            mkdir -p ${app_workspace_path}
          else
            find ${app_workspace_path}* -path ${app_workspace_path}subapp -prune -o -print | xargs rm -rf
          fi
          cp -rv dist/* ${app_workspace_path}
        '''
      }
    }
  }
}
