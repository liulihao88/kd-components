<template>
  <div id="app">
    <ul class="nav">
      <li v-for="item in Object.keys(docName)">
        <a :href="`#${item}`">{{docName[item]}}</a>
      </li>
      <li v-for="item in comArr" :key="item">
        <a :href="`#${item}`" v-text="replaceName(item)"></a>
      </li>
    </ul>
    <section class="container">
      <div>
        <div v-for="item in Object.keys(docName)">
          <h5 class="title" :id="item" :key="item">{{docName[item]}}</h5>
          <div class="markdown-body" style="margin-top: 16px;">
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
        <div>
          <p>{{ $t('message.hello') }}</p>
          <el-button @click="lang">切换ja</el-button>
          <el-button @click="langen">切换en</el-button>
          <detail-btn></detail-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { requireComponents, requireMd } from './utils/index';
import { docMd, docName } from "./doc/index"
import guideMd from "./doc/guide.md";
import gStyleMd from "./doc/gStyle.md"
import { deepClone } from 'utils';

const constantModulesMd = require.context('./views', true, /\.md$/);
const constantModules = require.context('./views', true, /\.vue$/);
const { mds } = requireMd(constantModulesMd);
const { components, names } = requireComponents(constantModules, ['testCron']);
/**
 * 将希望显示的组件放在第一位
 */
// names = names.splice(9)
let spliceNames = deepClone(names);
if (process.env.NODE_ENV === 'development') {
  // console.log(`%c 222=>46行 ~/kj/kd-components/examples/src/App.vue names `, 'background:#000;color:#bada55', names);
  // spliceNames = names.filter((v) => v ==='testEmpty');
}

export default {
  name: 'App',
  components: {
    VueMarkdown,
    ...components
  },
  data() {
    return {
      comArr: names,
      mds: mds,
      docName: docName,
      docMd: docMd,
      gStyleMd: gStyleMd,
      guideMd: guideMd
    };
  },
  mounted() {},
  methods: {
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
    }
  }
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
}
.container {
  box-sizing: border-box;
  padding: 30px 30px 60px 30px;
  flex: 1;
  height: calc(100vh - 1px);
  overflow: auto;
  > div > div {
    box-shadow: #d9d9d9ab 0 1px 3px;
    margin: 20px 0;
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
