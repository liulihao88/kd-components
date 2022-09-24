export const pageMixin = {
  methods: {
    /**
      * ，CREATE： 对应添加，UPDATE：编辑，DELETE：删除，LOAD：搜索和详情，其余的都是CONFIG
      * btnList
      "btnList": [
        {
          "code": "",
          "action_mode": "CREATE"
        },
        {
          "code": "",
          "action_mode": "ADD"
        },
      ]
    */
    // 返回true，表示无权限；返回false，表示有权限
    // mDisabled(sendStr, row = '') {
    //   // 行内按钮权限和全局按钮权限对应字段。
    //   const dict = {
    //     CREATE: 'create',
    //     UPDATE: 'edit',
    //     DELETE: 'del',
    //     CONFIG: 'config'
    //   };
    //   // 如果是走后台逻辑登录
    //   try {
    //     let getLoginRoutes = this.$store.getters.loginRoutes;
    //     let nowPageMenuKey = this.mMenuKey();
    //     // 如果当前路由没有menuKey, 那么按钮权限全部放开都可以点击
    //     if (!nowPageMenuKey) {
    //       return false;
    //     }
    //     // 如果当前路由有menuKey且本地缓存中有权限控制。 过滤出按钮的权限
    //     let isDisabled = true;
    //     let rowDisabled = false;
    //     if (nowPageMenuKey && getLoginRoutes) {
    //       let btnList =
    //         getLoginRoutes.filter((v) => {
    //           return v.menuKey === nowPageMenuKey;
    //         })[0].btnList || [];
    //       if (btnList.length > 0) {
    //         btnList.forEach((val) => {
    //           if (val.action_mode === sendStr || val.code === sendStr) {
    //             isDisabled = false;
    //           }
    //         });
    //       }
    //     }
    //     if (row && row.permissionTypes) {
    //       let matchStr = dict[sendStr];
    //       rowDisabled = !row.permissionTypes.includes(matchStr);
    //     }
    //     return isDisabled || rowDisabled;
    //   } catch (error) {
    //     // 如果有错误， 按钮都不可点击
    //     // console.error('pageMixin进入到catch错误');
    //     return true;
    //   }
    // },
    // 返回true，表示无权限；返回false，表示有权限
    mDisabled (sendStr, row = "") {
      // 行内按钮权限和全局按钮权限对应字段。
      const dict = {
        CREATE: "create",
        UPDATE: "edit",
        DELETE: "del",
        CONFIG: "config"
      }
      // 如果是走后台逻辑登录
      try {
        const nowPageMenuKey = this.$route.meta.menuKey
        // 如果当前路由没有menuKey, 那么按钮权限全部放开都可以点击
        if (!nowPageMenuKey) {
          return false
        }
        const btnList = this.$route.meta.btnList || []
        // 如果当前路由有menuKey且本地缓存中有权限控制。 过滤出按钮的权限
        let isDisabled = true
        let rowDisabled = false
        if (nowPageMenuKey) {
          if (btnList.length > 0) {
            btnList.forEach((val) => {
              if (val.action_mode === sendStr || val.code === sendStr) {
                isDisabled = false
              }
            })
          }
        }
        if (row && row.permissionTypes) {
          let matchStr = dict[sendStr]
          rowDisabled = !row.permissionTypes.includes(matchStr)
        }
        return isDisabled || rowDisabled
      } catch (error) {
        // 如果有错误， 按钮都不可点击
        console.error("pageMixin进入到catch错误", error)
        return true
      }
    },
    /**
     * dom 加载完成，计算高度并发送给iframe接收
     * @param id
     */
    mPostMessageHeight(id) {
      let newWindow = new Function("return window")();
      if(newWindow.parent) {
        let domH = document.querySelector(id).scrollHeight || 0; //获取自身高度
        newWindow.parent.postMessage(domH, "*");
      }
    },
    /**
     * 向iframe 发送 message
     * @param params
     */
    mPostMessage(params) {
      let newWindow = new Function("return window")();
      if(newWindow.parent) {
        newWindow.parent.postMessage(params, "*");
      }
    },
    /**
     * 设置iframe 高度
     * @param event
     */
    mSetIframeHeight(event) {
      document.querySelector('#kdIframe').style.height = event.data + 'px'
    },
    // 如果本地路由没有存menuKey返回空， 否则返回当前menuKey
    mMenuKey () {
      if (!this.$route.meta || !this.$route.meta.menuKey) {
        return ''
      }
      return this.$route.meta.menuKey
    },

    // 清空form表单的校验
    mClearValidate (formRef = 'formRef') {
      if (this.$refs[formRef]) {
        this.$nextTick(() => {
          this.$refs[formRef].clearValidate()
        })
      }
    },
    // 根据传入的width, 返回处理后的width
    mHandleWidth () {
      if (this.block) {
        return { width: '100%' }
      }
      if (!this.width) {
        return {}
      }
      if (this.width.indexOf('px') !== -1 || this.width.indexOf('%') !== -1) {
        return { width: this.width }
      }
      return { width: this.width + 'px' }
    }
  }
}
