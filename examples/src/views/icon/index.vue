<template>
  <div>
    <example-title
      :data="{
        title: 'Icon 图标',
        subTitle: '提供了一套常用的图标集合class类名。提供功能丰富的kd-icon组件。',
        maintenance: '胡瑞瑞（图标）刘云（组件）',
        author: '胡瑞瑞',
      }"
    ></example-title>

    <h5>组件用法</h5>
    <div class="wrap">
      <div>
        <span>基本用法</span>
        <div>
          <kd-icon name="kd-icon-a-1bi1" default-color="blue"></kd-icon>
          <kd-icon name="el-icon-platform-eleme"></kd-icon>
        </div>
      </div>
      <div>
        <span>尺寸size</span>
        <kd-icon name="el-icon-goods" size="26"></kd-icon>
      </div>
      <div>
        <span>pointer样式</span>
        <kd-icon name="kd-icon-xuanzhong" pointer size="18"></kd-icon>
      </div>
      <div>
        <span>hover颜色</span>
        <kd-icon name="el-icon-upload" pointer hover-color="blue" size="26"></kd-icon>
      </div>
      <div>
        <span>tooltip</span>
        <kd-icon name="kd-icon-add" pointer hover-color="blue" size="26" tooltip="新建"></kd-icon>
      </div>
      <div>
        <span>多值自动切换</span>
        <kd-icon :names="names" pointer hover-color="blue" size="26" @click="onClick"></kd-icon>
      </div>
      <div>
        <span>多值手动切换</span>
        <kd-icon ref="kdIcon" :names="names" pointer hover-color="blue" size="26" custom-next></kd-icon>
        <el-button type="primary" :loading="loading" @click="toChangeIcon">点击切换</el-button>
      </div>
      <div>
        <span>占位</span>
        <div style="background: #eee; padding: 10px">
          <kd-icon place style="background: #fff"></kd-icon>
        </div>
      </div>
      <div>
        <span>外边距控制</span>
        <div>
          <kd-icon name="kd-icon-add" mr="8"></kd-icon>
          图标在前
        </div>
      </div>
    </div>
    <example-code :source="source2">
      kd-icon在图标<i></i>标签的外部增加了div和el-tooltip组件，提供了更多的可利用功能。<br />
      属性配置如下：<br />
      - name：string,完整的图标类名：项目公共图标 kd-icon-xxx，el图标 el-icon-xxx，项目本地图标
      icon-xxx（组件自动补全为"iconfot icon-xxx"）；<b style="color: red">在下方图标列表中点击即可复制类名。</b><br />
      - tooltip：string，默认值''；tooltip要显示的内容，默认为空时不显示<br />
      - <b>names</b>：数组，格式{name:'',key:'',tooltip: ''}；
      当一个位置需要动态切换图标时，可使用该属性，name的优先级高于names。<br />
      ---- item.name：同name属性用法 <br />
      ---- item.tooltip：图标对应的tooltip，如果未设置，会使用组件的tooltip属性值 <br />
      ---- item.key：用来区分图标对应的操作，以参数形式返回给click事件 <br />
      - size：string | number，默认值16；指定图标大小，同font-size属性作用；同时还会作用于图标容器，影响占位大小<br />
      - pointer：boolean，默认值false；是否为pointer样式<br />
      - tooltip-attrs：object，默认值{ effect: 'dark', placement: 'top', 'open-delay':
      200}；作用在el-tooltip上的属性，<br />
      - default-color：string，默认值'inherit'；颜色<br />
      - hover-color：string，默认值''；hover时颜色<br />
      - is-place：boolean，默认值false；是否占位，当没有name或names值时，是否占位，就是图标不显示但空间仍被占居<br />
      - wrap-style：object，用于自定义kd-icon容器的样式<br />
      - wrap-class：string，自定义kd-icon容器的类名<br />
      - mt/mr/mb/ml：string，默认值0；不带px单位的边距值，分别控制图标各个方向的外边距<br />
      - custom-next：boolean，默认值false；是否自定义next事件，如果为true，则必须外部调用next()方法才会切换图标<br /><br />

      事件：<br />
      - click：图标点击回调，如果有key，则返回key；如果有多个图标，默认情况下自动切换到下一个图标<br /><br />

      方法：<br />
      - next：当组件进行手动多值切换（custom-next=true）时，通过ref调用next()方法，它接收三种类型参数：<br />
      ---- undefined：默认，不传参数，切换到下一个图标<br />
      ---- 数字类型：指定图标索引，如果超限，则切换到下一个图标<br />
      ---- 字符串类型：指定图标key，如果不存在，则切换到下一个图标<br />
    </example-code>

    <h5>图标示例</h5>
    <example-code :source="source1Md">
      <i class="kd-icon-cangku"></i>
      <span class="m-r-10"></span>
      <i class="kd-icon-shanchu"></i>
      <span class="m-r-10"></span>
      <el-button type="primary">
        <i class="kd-icon-shangxian"></i>
        <span class="ft-14">搜索</span>
      </el-button>
    </example-code>

    <h3>图标集合</h3>
    <h5>点击图标类名可自动复制</h5>
    <div class="content font-class">
      <ul class="icon_lists dib-box">
        <li class="dib">
          <span class="icon iconfont kd-icon-ai-users"></span>
          <div class="name">用户组</div>
          <div class="code-name">.kd-icon-ai-users</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-ziyuan"></span>
          <div class="name">组织架构</div>
          <div class="code-name">.kd-icon-ziyuan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yonghuming"></span>
          <div class="name">用户名</div>
          <div class="code-name">.kd-icon-yonghuming</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujuzidian"></span>
          <div class="name">数据字典</div>
          <div class="code-name">.kd-icon-shujuzidian</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-rizhi"></span>
          <div class="name">日志</div>
          <div class="code-name">.kd-icon-rizhi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-guize"></span>
          <div class="name">规则</div>
          <div class="code-name">.kd-icon-guize</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yunweipeizhi"></span>
          <div class="name">运维配置</div>
          <div class="code-name">.kd-icon-yunweipeizhi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-gaojingzhongxin"></span>
          <div class="name">告警中心</div>
          <div class="code-name">.kd-icon-gaojingzhongxin</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chushihua"></span>
          <div class="name">初始化</div>
          <div class="code-name">.kd-icon-chushihua</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chakanguize"></span>
          <div class="name">查看规则</div>
          <div class="code-name">.kd-icon-chakanguize</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-zhiliangpinggu1"></span>
          <div class="name">质量评估</div>
          <div class="code-name">.kd-icon-zhiliangpinggu1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-zhiliangguize"></span>
          <div class="name">质量规则</div>
          <div class="code-name">.kd-icon-zhiliangguize</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shanchu"></span>
          <div class="name">删除</div>
          <div class="code-name">.kd-icon-shanchu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-xuanzhong"></span>
          <div class="name">选中</div>
          <div class="code-name">.kd-icon-xuanzhong</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-fenlei"></span>
          <div class="name">分类</div>
          <div class="code-name">.kd-icon-fenlei</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-cunchu"></span>
          <div class="name">存储</div>
          <div class="code-name">.kd-icon-cunchu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-a-1bi1"></span>
          <div class="name">1比1</div>
          <div class="code-name">.kd-icon-a-1bi1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-guanli"></span>
          <div class="name">管理</div>
          <div class="code-name">.kd-icon-guanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-biaoguanli"></span>
          <div class="name">表管理</div>
          <div class="code-name">.kd-icon-biaoguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-kuguanli"></span>
          <div class="name">库管理</div>
          <div class="code-name">.kd-icon-kuguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-ziyuanwenjian"></span>
          <div class="name">资源文件</div>
          <div class="code-name">.kd-icon-ziyuanwenjian</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-hanshuguanli"></span>
          <div class="name">函数管理</div>
          <div class="code-name">.kd-icon-hanshuguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-tingzhi"></span>
          <div class="name">停止</div>
          <div class="code-name">.kd-icon-tingzhi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-zhujian"></span>
          <div class="name">主键</div>
          <div class="code-name">.kd-icon-zhujian</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-paixu"></span>
          <div class="name">排序</div>
          <div class="code-name">.kd-icon-paixu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shangxian"></span>
          <div class="name">上线</div>
          <div class="code-name">.kd-icon-shangxian</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-cangku"></span>
          <div class="name">仓库</div>
          <div class="code-name">.kd-icon-cangku</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yuangouxuanzhuangtai"></span>
          <div class="name">源勾选状态</div>
          <div class="code-name">.kd-icon-yuangouxuanzhuangtai</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-geshihua"></span>
          <div class="name">格式化</div>
          <div class="code-name">.kd-icon-geshihua</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yufajiancha"></span>
          <div class="name">语法检查</div>
          <div class="code-name">.kd-icon-yufajiancha</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-baocun"></span>
          <div class="name">保存</div>
          <div class="code-name">.kd-icon-baocun</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-biao"></span>
          <div class="name">biao</div>
          <div class="code-name">.kd-icon-biao</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-caret-down"></span>
          <div class="name">caret-down</div>
          <div class="code-name">.kd-icon-caret-down</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-caret-up"></span>
          <div class="name">caret-up</div>
          <div class="code-name">.kd-icon-caret-up</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-add"></span>
          <div class="name">add</div>
          <div class="code-name">.kd-icon-add</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-Checkbox-bufen"></span>
          <div class="name">Checkbox-部分</div>
          <div class="code-name">.kd-icon-Checkbox-bufen</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-Checkbox-gouxuan"></span>
          <div class="name">Checkbox-勾选</div>
          <div class="code-name">.kd-icon-Checkbox-gouxuan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-close-circle-filled"></span>
          <div class="name">close-circle-filled</div>
          <div class="code-name">.kd-icon-close-circle-filled</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chevron-left"></span>
          <div class="name">chevron-left</div>
          <div class="code-name">.kd-icon-chevron-left</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-error-circle-filled"></span>
          <div class="name">error-circle-filled</div>
          <div class="code-name">.kd-icon-error-circle-filled</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-caret-left"></span>
          <div class="name">caret-left</div>
          <div class="code-name">.kd-icon-caret-left</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-caret-right"></span>
          <div class="name">caret-right</div>
          <div class="code-name">.kd-icon-caret-right</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-remove"></span>
          <div class="name">remove</div>
          <div class="code-name">.kd-icon-remove</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chevron-up"></span>
          <div class="name">chevron-up</div>
          <div class="code-name">.kd-icon-chevron-up</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-help-circle-filled"></span>
          <div class="name">help-circle-filled</div>
          <div class="code-name">.kd-icon-help-circle-filled</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chevron-right"></span>
          <div class="name">chevron-right</div>
          <div class="code-name">.kd-icon-chevron-right</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chevron-down"></span>
          <div class="name">chevron-down</div>
          <div class="code-name">.kd-icon-chevron-down</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-check-circle-filled"></span>
          <div class="name">check-circle-filled</div>
          <div class="code-name">.kd-icon-check-circle-filled</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-time-filled"></span>
          <div class="name">time-filled</div>
          <div class="code-name">.kd-icon-time-filled</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-help-circle"></span>
          <div class="name">help-circle</div>
          <div class="code-name">.kd-icon-help-circle</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-error-circle"></span>
          <div class="name">error-circle</div>
          <div class="code-name">.kd-icon-error-circle</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-xiangmu"></span>
          <div class="name">项目</div>
          <div class="code-name">.kd-icon-xiangmu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-move"></span>
          <div class="name">move</div>
          <div class="code-name">.kd-icon-move</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shuju"></span>
          <div class="name">数据</div>
          <div class="code-name">.kd-icon-shuju</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-project_space"></span>
          <div class="name">project_space</div>
          <div class="code-name">.kd-icon-project_space</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-download"></span>
          <div class="name">download</div>
          <div class="code-name">.kd-icon-download</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-fullscreen-exit"></span>
          <div class="name">fullscreen-exit</div>
          <div class="code-name">.kd-icon-fullscreen-exit</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-fullsreen"></span>
          <div class="name">fullsreen</div>
          <div class="code-name">.kd-icon-fullsreen</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-file-copy"></span>
          <div class="name">file-copy</div>
          <div class="code-name">.kd-icon-file-copy</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-play"></span>
          <div class="name">play</div>
          <div class="code-name">.kd-icon-play</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-zhuomianduan"></span>
          <div class="name">桌面端</div>
          <div class="code-name">.kd-icon-zhuomianduan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-minus"></span>
          <div class="name">minus</div>
          <div class="code-name">.kd-icon-minus</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-add1"></span>
          <div class="name">add</div>
          <div class="code-name">.kd-icon-add1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-huigun"></span>
          <div class="name">huigun</div>
          <div class="code-name">.kd-icon-huigun</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-jishi"></span>
          <div class="name">集市</div>
          <div class="code-name">.kd-icon-jishi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-tiaodurenwubanben"></span>
          <div class="name">调度任务版本</div>
          <div class="code-name">.kd-icon-tiaodurenwubanben</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-huishouzhan"></span>
          <div class="name">回收站</div>
          <div class="code-name">.kd-icon-huishouzhan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-jiekou"></span>
          <div class="name">接口</div>
          <div class="code-name">.kd-icon-jiekou</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-pingtaiguanli"></span>
          <div class="name">平台管理</div>
          <div class="code-name">.kd-icon-pingtaiguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-tongzhi"></span>
          <div class="name">通知</div>
          <div class="code-name">.kd-icon-tongzhi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-wendang"></span>
          <div class="name">文档</div>
          <div class="code-name">.kd-icon-wendang</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yonghu"></span>
          <div class="name">用户</div>
          <div class="code-name">.kd-icon-yonghu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujutongbu"></span>
          <div class="name">数据同步</div>
          <div class="code-name">.kd-icon-shujutongbu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujumoxing"></span>
          <div class="name">数据模型</div>
          <div class="code-name">.kd-icon-shujumoxing</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-wenjianjiazhankai"></span>
          <div class="name">文件夹展开</div>
          <div class="code-name">.kd-icon-wenjianjiazhankai</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-wenjianjia"></span>
          <div class="name">文件夹</div>
          <div class="code-name">.kd-icon-wenjianjia</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-xinjianwenjianjia"></span>
          <div class="name">新建文件夹</div>
          <div class="code-name">.kd-icon-xinjianwenjianjia</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-ellipsis"></span>
          <div class="name">ellipsis</div>
          <div class="code-name">.kd-icon-ellipsis</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-menu-fold"></span>
          <div class="name">menu-fold</div>
          <div class="code-name">.kd-icon-menu-fold</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-menu-unfold"></span>
          <div class="name">menu-unfold</div>
          <div class="code-name">.kd-icon-menu-unfold</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-search"></span>
          <div class="name">search</div>
          <div class="code-name">.kd-icon-search</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-biaoqianguanli"></span>
          <div class="name">标签管理</div>
          <div class="code-name">.kd-icon-biaoqianguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-biaoqianzichan"></span>
          <div class="name">标签资产</div>
          <div class="code-name">.kd-icon-biaoqianzichan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-biaoqianpingtai"></span>
          <div class="name">标签平台</div>
          <div class="code-name">.kd-icon-biaoqianpingtai</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujuyuanguanli"></span>
          <div class="name">数据源管理</div>
          <div class="code-name">.kd-icon-shujuyuanguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-lixiantongbu"></span>
          <div class="name">离线同步</div>
          <div class="code-name">.kd-icon-lixiantongbu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujuzhuti"></span>
          <div class="name">数据主题</div>
          <div class="code-name">.kd-icon-shujuzhuti</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-gailan"></span>
          <div class="name">概览</div>
          <div class="code-name">.kd-icon-gailan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujufenceng"></span>
          <div class="name">数据分层</div>
          <div class="code-name">.kd-icon-shujufenceng</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujucangku"></span>
          <div class="name">数据仓库</div>
          <div class="code-name">.kd-icon-shujucangku</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-wenjiandaoru"></span>
          <div class="name">文件导入</div>
          <div class="code-name">.kd-icon-wenjiandaoru</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yewuxian"></span>
          <div class="name">业务线</div>
          <div class="code-name">.kd-icon-yewuxian</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-renwufabu"></span>
          <div class="name">任务发布</div>
          <div class="code-name">.kd-icon-renwufabu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-zhiliangguanli"></span>
          <div class="name">质量管理</div>
          <div class="code-name">.kd-icon-zhiliangguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-zhushujuguanli"></span>
          <div class="name">主数据管理</div>
          <div class="code-name">.kd-icon-zhushujuguanli</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yunyingguanli1"></span>
          <div class="name">运营管理</div>
          <div class="code-name">.kd-icon-yunyingguanli1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujuyuanguanli1"></span>
          <div class="name">数据源管理</div>
          <div class="code-name">.kd-icon-shujuyuanguanli1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-jichengguanli1"></span>
          <div class="name">集成管理</div>
          <div class="code-name">.kd-icon-jichengguanli1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shenpizhongxin"></span>
          <div class="name">审批中心</div>
          <div class="code-name">.kd-icon-shenpizhongxin</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chaxunfenxi"></span>
          <div class="name">查询分析</div>
          <div class="code-name">.kd-icon-chaxunfenxi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shishitongbunav"></span>
          <div class="name">实时同步</div>
          <div class="code-name">.kd-icon-shishitongbunav</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-gerenzhongxin"></span>
          <div class="name">个人中心</div>
          <div class="code-name">.kd-icon-gerenzhongxin</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-pandian"></span>
          <div class="name">盘点</div>
          <div class="code-name">.kd-icon-pandian</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-guanxitu"></span>
          <div class="name">关系图</div>
          <div class="code-name">.kd-icon-guanxitu</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yuanshujucaiji"></span>
          <div class="name">元数据采集</div>
          <div class="code-name">.kd-icon-yuanshujucaiji</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujubiao"></span>
          <div class="name">数据表</div>
          <div class="code-name">.kd-icon-shujubiao</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujuzhuti1"></span>
          <div class="name">数据主题</div>
          <div class="code-name">.kd-icon-shujuzhuti1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-moxingguanxi"></span>
          <div class="name">模型关系</div>
          <div class="code-name">.kd-icon-moxingguanxi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-gailan1"></span>
          <div class="name">概览</div>
          <div class="code-name">.kd-icon-gailan1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yunwei"></span>
          <div class="name">运维</div>
          <div class="code-name">.kd-icon-yunwei</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-caidan"></span>
          <div class="name">菜单</div>
          <div class="code-name">.kd-icon-caidan</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-yunhang"></span>
          <div class="name">运行</div>
          <div class="code-name">.kd-icon-yunhang</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-dingyue"></span>
          <div class="name">订阅</div>
          <div class="code-name">.kd-icon-dingyue</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-houtui"></span>
          <div class="name">后退</div>
          <div class="code-name">.kd-icon-houtui</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-qianjin"></span>
          <div class="name">前进</div>
          <div class="code-name">.kd-icon-qianjin</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-shujubiao1"></span>
          <div class="name">数据表</div>
          <div class="code-name">.kd-icon-shujubiao1</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-dongjie"></span>
          <div class="name">冻结</div>
          <div class="code-name">.kd-icon-dongjie</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-chaxunshezhi"></span>
          <div class="name">查询设置</div>
          <div class="code-name">.kd-icon-chaxunshezhi</div>
        </li>

        <li class="dib">
          <span class="icon iconfont kd-icon-lixian"></span>
          <div class="name">离线</div>
          <div class="code-name">.kd-icon-lixian</div>
        </li>
      </ul>
      <div class="article markdown">
        <h2 id="font-class-">font-class 引用</h2>
        <hr />

        <p>font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。</p>
        <p>与 Unicode 使用方式相比，具有如下特点：</p>
        <ul>
          <li>相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。</li>
          <li>因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。</li>
        </ul>
        <p>使用步骤如下：</p>
        <h3 id="-fontclass-">第一步：引入项目下面生成的 fontclass 代码：</h3>
        <pre><code class="language-html">&lt;link rel="stylesheet" href="./iconfont.css"&gt;
</code></pre>
        <h3 id="-">第二步：挑选相应图标并获取类名，应用于页面：</h3>
        <pre><code class="language-html">&lt;span class="iconfont kd-icon-xxx"&gt;&lt;/span&gt;
</code></pre>
        <blockquote>
          <p>" iconfont" 是你项目下的 font-family。可以通过编辑项目查看，默认是 "iconfont"。</p>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import source1Md from './source/source1.md';
import source2 from './source/source2.md';

export default {
  data() {
    return {
      source1Md: source1Md,
      source2,
      names: [
        {
          name: 'kd-icon-chevron-up',
          key: 'up',
          tooltip: '上',
        },
        {
          name: 'kd-icon-chevron-right',
          key: 'right',
          tooltip: '右',
        },
        {
          name: 'kd-icon-chevron-down',
          key: 'down',
          tooltip: '下',
        },
        {
          name: 'kd-icon-chevron-left',
          key: 'left',
          tooltip: '左',
        },
      ],
      loading: false,
    };
  },
  mounted() {
    let doms = this.$el.getElementsByClassName('code-name');
    Array.from(doms).forEach((item) => {
      item.onclick = this.onCopy;
    });
  },
  methods: {
    onClick(key) {
      this.$message.success('多值切换：当前点击' + key);
    },
    onCopy(e) {
      const innerText = e.target.innerText;
      const text = innerText.replace('.', '');
      if (!text) return;
      this.$copyText(text)
        .then(() => {
          this.$message.success('复制成功 ' + text);
        })
        .catch((e) => {
          console.log(e);
          this.$message.error('复制失败');
        });
    },
    toChangeIcon() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$refs.kdIcon.next();
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > span {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
.icon_lists {
  width: 100% !important;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  *zoom: 1;
}

.icon_lists li {
  width: 100px;
  margin-bottom: 10px;
  margin-right: 20px;
  text-align: center;
  list-style: none !important;
  cursor: default;
}

.icon_lists li .code-name {
  line-height: 1.2;
}

.icon_lists .icon {
  display: block;
  height: 100px;
  line-height: 100px;
  font-size: 42px;
  margin: 10px auto;
  color: #333;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}

.icon_lists .icon:hover {
  font-size: 100px;
}

.icon_lists .svg-icon {
  /* 通过设置 font-size 来改变图标大小 */
  width: 1em;
  /* 图标和文字相邻时，垂直对齐 */
  vertical-align: -0.15em;
  /* 通过设置 color 来改变 SVG 的颜色/fill */
  fill: currentColor;
  /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
      normalize.css 中也包含这行 */
  overflow: hidden;
}

.icon_lists li .name,
.icon_lists li .code-name {
  color: #666;
}
</style>
