<template>
  <div class="kd-advancedsearch" :class="{'foldsearch': !expandFlag}">
    <div class="adtitle">
      <span class="addtitle_txt">高级筛选</span>
      <el-button
        type="text"
        class="adexpand"
        @click="toggleSearch"
      >
        {{!expandFlag ? '展开筛选' : '收起筛选'}}
        <i class="el-icon-arrow-down" :class="{'adfold': expandFlag}"></i>
      </el-button>
    </div>
    <div class="adcontent" ref="contentComp">
      <ul class="adul" :class="{'showall': this.showAllFlag}">
        <template v-for="(item, index) in newData">
          <li :key="item.type" :class="{'hideli': index >= 5}">
            <label>{{item.typeName}}：</label>
            <div class="adlist" :class="{'fold': !item.expFlag}">
              <div class="lbls" :ref="'lblsRef'+index">
                <span
                  v-for="it in item.children"
                  :key="it.value"
                  :class="{'active': activeData[item.type] && activeData[item.type].includes(it.value)}"
                  @click="clickItem(item, it)"
                >
                  {{it.label}}
                </span>
              </div>
            </div>
            <el-button type="text" class="morebtn" @click="clickMoreLabels(item, index)" v-if="item.moreFlag">
              <i class="el-icon-arrow-down" :class="{'adfold': item.expFlag}"></i>
              {{!item.expFlag ? '更多' : '收起'}}
            </el-button>
          </li>
        </template>
      </ul>
      <em class="adbtn" @click="togglePanel">
        <i class="el-icon-d-arrow-right" :class="{'showallbtn' : this.showAllFlag}"></i>
      </em>
    </div>
  </div>
</template>

<script>
export default {
  name: "KdAdvancedSearch",
  props: {
    defaultLayerNum: {
      type: Number,
      default: 2
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      expandFlag: true, // 是否展开了高级筛选
      activeData: {}, // 选中的筛选项
      newData: [],
      showAllFlag: false // 切换显示/隐藏更多面板
    }
  },
  watch: {
    data: {
      handler() {
        this.newData = this.data.map(item => {
          item.expFlag = false;
          return item;
        });
        this.resetMoreFlag();
      },
      immediate: true
    }
  },
  components: {

  },
  mounted () {
    // this.resetHeight();
  },
  methods: {
    /**
      * 展开/收起高级搜索
      */
    toggleSearch() {
      this.expandFlag = !this.expandFlag;
    },
    /**
      * 点击搜索
      */
    clickItem(it1, it2) {
      if (!this.activeData[it1.type]) {
          this.$set(this.activeData, it1.type, [it2.value]);
      } else {
        const index = this.activeData[it1.type].indexOf(it2.value);
        if (index > -1) {
          this.activeData[it1.type].splice(index, 1);
        } else {
          this.activeData[it1.type].push(it2.value);
        }
      }
      this.$emit('clickItem', this.activeData);
    },
    /**
      * 点击/收起更多显示全部小标签
      */
    clickMoreLabels(item, index) {
      item.expFlag = !item.expFlag;
      this.newData = [...this.newData];
    },
    /**
      * newData变化后，需要重新设置里面的moreFlag
      */
    resetMoreFlag() {
      this.$nextTick(() => {
        let arr = [];
        this.newData.forEach((item, index) => {
          let cur = this.$refs['lblsRef' + index];
          if (cur) {
            item.moreFlag = cur[0].clientHeight > 40;
          } else {
            item.moreFlag = false;
          }
          arr.push(item);
        });
        this.newData = arr;
        console.log('this.newData', this.newData)
      });
    },
    /**超过5个大搜索项，则隐藏后面的选项，通过此按钮显示更多或者隐藏 */
    togglePanel() {
      this.showAllFlag = !this.showAllFlag;
    }
  }
};
</script>
