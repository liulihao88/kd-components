<template>
  <div id="app">
    <ul class="nav">
      <li v-for="item in comArr" :key="item">
        <a :href="`#${item}`">{{ item.replace('test', '') }}</a>
      </li>
    </ul>
    <section class="container">
      <div>
        <div v-for="item in comArr" :id="item" :key="item">
          <h5 class="title">{{ item.replace('test', '') }}</h5>
          <component :is="item"></component>
          <div v-text="">
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
import testStep from "./views/step";
import testAffixFooter from "./views/affixFooter";
import testOwner from "./views/owner/index"
import testTreeMultiple from "./views/treeMultiple";
import testSelectMultiple from "./views/selectMultiple";
import testFilterTable from "./views/filterTable";
import testInput from "./views/input";
import testDateRange from "./views/dateRange";
import testAdvancedSearch from "./views/advancedSearch";
import KdTooltip from "./views/KdTooltip";
import testDialog from "./views/dialog";
import testDrawer from "./views/drawer";
import testTree from "./views/tree";
import testIcon from "./views/icon"
import testSelect from './views/select';
import testTitle from './views/title';

let com = [
  'testStep',
  'testAffixFooter',
  'testOwner',
  'testTreeMultiple',
  'testSelectMultiple',
  'testFilterTable',
  'testInput',
  'testDateRange',
  'testAdvancedSearch',
  'KdTooltip',
  'testDialog',
  'testDrawer',
  'testTree',
  'testIcon',
  'testSelect',
  'testTitle',
  ]

// if(process.env.NODE_ENV === 'development'){
//   com = [com[com.length-2], com[com.length-1]]
// }
export default {
  name: 'App',
  components: {
    testStep,
    testAffixFooter,
    testOwner,
    testTreeMultiple,
    testSelectMultiple,
    testFilterTable,
    testInput,
    testDateRange,
    testAdvancedSearch,
    KdTooltip,
    testDialog,
    testDrawer,
    testTree,
    testIcon,
    testSelect,
    testTitle
  },
  data() {
    return {
      comArr: com,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    replaceName (value) {
      let str = `kd${value.replace('test','')}`
      return str.replace(/([A-Z])/g, (match, p1, offset, string) => {
        // 一个捕获组捕获全部，所以match等于p1
        return '-' + p1.toLowerCase();
      })
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
  width: 185px;
  border-right: 1px solid #d8d8d8;
  padding: 20px 0 30px;
  height: calc(100vh - 1px);
  li {
    line-height: 40px;
  }
  a {
    text-decoration: none;
    color: #333333;
    text-align: left;
    font-size: 20px;
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
