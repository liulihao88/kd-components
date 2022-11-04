<template>
  <div id="app">
    <ul class="nav">
      <li v-for="(item, index) in Object.keys(docName)" :key="index">
        <a :href="`#${item}`" :class="{ active: navActive(item) }" @click="changeLocationHash(item)">{{
          docName[item]
        }}</a>
      </li>
      <li v-for="item in comArr" :key="item">
        <a
          :href="`#${item}`"
          :class="{ active: navActive(item) }"
          @click="changeLocationHash(item)"
          v-text="replaceName(item)"
        ></a>
      </li>
    </ul>
    <section class="container">
      <div>
        <div v-for="item in Object.keys(docName)" :id="item" :key="item">
          <h5 class="title">{{ docName[item] }}</h5>
          <div class="markdown-body" style="margin-top: 16px">
            <VueMarkdown :source="docMd[item]"></VueMarkdown>
          </div>
        </div>
        <div v-for="item in comArr" :id="item" :key="item">
          <h5 class="title" v-text="replaceName(item)"></h5>
          <component :is="item"></component>
          <div class="markdown-body" style="margin-top: 16px">
            <VueMarkdown :source="mds[item]"></VueMarkdown>
            <!--            <VueMarkdown :source="mds[item]" v-highlight></VueMarkdown>-->
          </div>
        </div>
        <!--    国际化demo    -->
        <!-- <div>
          <p>{{ $t('message.hello') }}</p>
          <el-button @click="lang">切换ja</el-button>
          <el-button @click="langen">切换en</el-button>
          <detail-btn></detail-btn>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { requireComponents, requireMd } from './utils/index';
import { docMd, docName } from './doc/index';
import { deepClone } from 'utils';
import './components';

const constantModulesMd = require.context('./views', true, /index\.md$/);
const constantModules = require.context('./views', true, /index.vue$/);
const { mds } = requireMd(constantModulesMd);
// 生产环境过滤的案例
let excludeArr = process.env.NODE_ENV !== 'production' ? [] : ['testAndyTest', 'testTest'];
const { components, names } = requireComponents(constantModules, excludeArr);

// const { components, names } = requireComponents(constantModules, ['testCron']);
/**
 * 将希望显示的组件放在第一位
 */
// names = names.splice(9)
let spliceNames = deepClone(names);

export default {
  name: 'App',
  components: {
    VueMarkdown,
    ...components,
  },
  data() {
    return {
      comArr: names,
      mds: mds,
      docName: docName,
      docMd: docMd,
      isDev: false,
      locationHash: '',
    };
  },
  created() {
    // 生产环境下隐藏test等想要隐藏的组件
    this.prodHideTest();

    // 是否隐藏组件. 因为把全部组件加载到页面上调试麻烦, 所以定义一个变量来只显示想显示的组件
    // this.hideComps();
  },
  mounted() {
    this.$nextTick(() => {
      let hash = document.location.hash;
      if (hash) {
        this.locationHash = hash;
        document.querySelector(hash).scrollIntoView(true);
      }
    });
  },
  methods: {
    prodHideTest() {
      if (process.env.NODE_ENV === 'production') {
        this.comArr = this.comArr.filter((v) => {
          if (v.endsWith('Test')) {
            return false;
          } else {
            return true;
          }
        });
      }
    },
    changeLocationHash(item) {
      this.locationHash = `#${item}`;
    },
    navActive(item) {
      return this.locationHash === `#${item}`;
    },
    hideComps() {
      //  将希望显示的组件放在第一位
      if (process.env.NODE_ENV === 'development') {
        // 只改下面这行代码,改变compName
        // let compName = ['rowSelectMultiple', 'selectMultiple'];
        let compName = ['treeMultiple'];
        // 只改上面这行代码
        let spliceNames = deepClone(this.comArr);
        let str = 'test';
        let res = [];
        for (let i = 0; i < compName.length; i++) {
          let strRes = str + compName[i][0].toUpperCase() + compName[i].slice(1);
          res.push(strRes);
        }
        this.comArr = spliceNames.filter((v) => {
          return res.includes(v);
        });
        this.docName = {};
      }
    },
    replaceName(value) {
      let str = `kd${value.replace('test', '')}`;
      return str.replace(/([A-Z])/g, (match, p1, offset, string) => {
        // 一个捕获组捕获全部，所以match等于p1
        return '-' + p1.toLowerCase();
      });
    },
    lang() {
      this.$i18n.locale = 'ja';
      localStorage.setItem('lang', 'ja');
      location.reload();
    },
    langen() {
      this.$i18n.locale = 'en';
      localStorage.setItem('lang', 'en');
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}
.nav {
  box-sizing: border-box;
  width: 175px;
  border-right: 1px solid #d8d8d8;
  padding: 20px 0 30px;
  height: calc(100vh - 1px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    line-height: 40px;
  }
  a {
    text-decoration: none;
    color: #333333;
    text-align: left;
    font-size: 16px;
    &:hover {
      color: #409eff;
    }
  }
  .active {
    color: #409eff;
    font-weight: 700;
  }
}
.container {
  box-sizing: border-box;
  padding: 30px 30px 10px 30px;
  flex: 1;
  height: calc(100vh - 1px);
  overflow: auto;
  > div > div {
    //box-shadow: #d9d9d9ab 0 1px 3px;
    box-shadow: rgb(64 158 255 / 20%) 0 1px 10px;
    margin: 50px 0;
    padding: 10px 20px 20px;
    border-radius: 10px;
    text-align: left;
  }
  .title {
    text-align: left;
    font-size: 20px;
    margin: 10px 0;
    font-weight: 500;
    color: #333333;
  }
}
</style>
