```vue 
 
<template>
  <kd-advanced-search
    class="adsearch"
    :data="searchData"
    @clickItem="initList"
  >
  </kd-advanced-search>
</template>

<script>
export default {
  name: "Index",
  props: {

  },
  data() {
    return {
      searchData: [
        {
          "type": "staTypes",
          "typeName": "标准分类",
          "children": [{
            "value": "NAME_STA",
            "label": "命名标准"
          }, {
            "value": "DATA_STA",
            "label": "数据标准"
          }]
        }, {
          "type": "topics",
          "typeName": "归属分类",
          "children": [{
            "value": "434055598309376",
            "label": "测试数据"
          }, {
            "value": "434055824801792",
            "label": "客服"
          }, {
            "value": "439454594498560",
            "label": "销售"
          }, {
            "value": "439454628052992",
            "label": "订单"
          }, {
            "value": "440204565413888",
            "label": "产品"
          }, {
            "value": "443131157831680",
            "label": "商城"
          }, {
            "value": "443131212357632",
            "label": "仓储"
          }, {
            "value": "443135410855936",
            "label": "生鲜"
          }, {
            "value": "443135448604672",
            "label": "物流"
          }, {
            "value": "443135700262912",
            "label": "金融"
          }, {
            "value": "443135826092032",
            "label": "科技"
          }, {
            "value": "443135939338240",
            "label": "健康"
          }, {
            "value": "443136027418624",
            "label": "3G"
          }, {
            "value": "443136107110400",
            "label": "配送"
          }, {
            "value": "443136614621184",
            "label": "生态"
          }, {
            "value": "443136677535744",
            "label": "AI"
          }, {
            "value": "443136836919296",
            "label": "游戏"
          }, {
            "value": "444544751538176",
            "label": "绿色健康"
          }, {
            "value": "462678426562560",
            "label": "tttt"
          }, {
            "value": "494532835876864",
            "label": "测试数据2"
          }, {
            "value": "561270000930816",
            "label": "产品生命01"
          }, {
            "value": "561270034485248",
            "label": "产品生命02"
          }, {
            "value": "561270072233984",
            "label": "产品生命03"
          }, {
            "value": "561863876640768",
            "label": "种子基本信息"
          }, {
            "value": "571748244840448",
            "label": "mwg_theme"
          }, {
            "value": "572082346319872",
            "label": "kudu"
          }]
        }, {
          "type": "staTags",
          "typeName": "标准标签",
          "children": [{
            "value": "554029116522496",
            "label": "tag11"
          }, {
            "value": "554030752301056",
            "label": "tag1x1"
          }, {
            "value": "554038209773568",
            "label": "tag12"
          }, {
            "value": "554040323702784",
            "label": "tag31"
          }, {
            "value": "554040348868608",
            "label": "tag32"
          }, {
            "value": "554046048927744",
            "label": "tag410"
          }, {
            "value": "557262259568640",
            "label": "tag1"
          }, {
            "value": "557264679682048",
            "label": "tag111"
          }, {
            "value": "558673907105792",
            "label": "1"
          }, {
            "value": "559373680590848",
            "label": "tag2"
          }, {
            "value": "559374670446592",
            "label": "tag3"
          }, {
            "value": "559375656108032",
            "label": "tag4"
          }, {
            "value": "559800073539584",
            "label": "tag222"
          }, {
            "value": "560783566524416",
            "label": ""
          }, {
            "value": "561272106471424",
            "label": "POC测试"
          }, {
            "value": "561860974182400",
            "label": "数据标准"
          }, {
            "value": "562652129017856",
            "label": "j"
          }, {
            "value": "570578528952320",
            "label": "测试0404"
          }, {
            "value": "570578558312448",
            "label": "测试0410"
          }, {
            "value": "593826788532224",
            "label": "dddd"
          }]
        }, {
          "type": "secretLevel",
          "typeName": "敏感等级",
          "children": [{
            "value": "GENERAL",
            "label": "普通"
          }, {
            "value": "SECRET",
            "label": "机密"
          }, {
            "value": "SENIOR",
            "label": "高级机密"
          }]
        }
      ],

    };
  },
  components: {
  
  },
  created() {

  },
  mounted() {

  },
  methods: {
    async initList(paramJson) {
      // this.paramJson = {...paramJson} || this.paramJson;
      // let res = {};
      // // 数组转成逗号分隔的字符串
      // Object.keys(this.paramJson).forEach((key) => {
      //     this.paramJson[key] = this.paramJson[key].join(',');
      // });
      // let params = {
      //     page: this.page,
      //     pageSize: this.pageSize,
      //     word: this.word,
      //     paramJson: JSON.stringify(this.paramJson)
      // };
      // this.loadingFlag = true;
      // switch (this.activeName) {
      //     case 'ALL':
      //         res = await getDictList(params);
      //         break;
      //     case 'MYSTAR':
      //         res = await getStarDictList(params);
      //         break;
      //     case 'MYOWN':
      //         res = await getOwnDictList(params);
      //         break;
      //     default:
      // }
      // this.loadingFlag = false;
      // if (res.code === 200) {
      //   this.dictListMap[this.activeName] = res.data.list;
      //   this.totalNum = res.data.amount
      // }
    }
  }
};
</script>
<style scoped lang='scss'>
    
</style>

 ```
