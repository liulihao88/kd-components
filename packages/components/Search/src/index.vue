<!-- 
  子组件通过emit让父组件执行数据的变化，

 -->
<template>
  <div class="kd-table-search">
    <div class="kd-table-search_left-wrap">
      <!-- ** 兼容旧系统 **-->
      <div v-if="!minorItems.length" class="old-model-row">
        <slot v-for="item in mainItems" :name="item.slot" :data="item">
          <component
            :is="item.type"
            :key="item.key"
            v-model="item.value"
            :title="item.title"
            :placeholder="item.placeholder"
          ></component>
        </slot>
        <div>
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="resetHandle">重置</el-button>
        </div>
      </div>
      <!--** 新系统 **-->
      <div v-else class="first-row">
        <!-- 主查询组件 -->
        <div class="input-wrap">
          <slot v-for="item in mainItems" :name="item.slot" :data="item">
            <component
              :is="item.type"
              :key="item.name"
              v-model="item.value"
              :title="item.title"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            ></component>
          </slot>
        </div>
        <!-- 查询按钮 -->
        <div>
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="resetHandle">重置</el-button>
          <!-- minorItems 数组为空 不展示高级搜索 -->
          <el-button v-if="minorItems.length" type="text" @click="foldHandle">
            {{ isFold ? foldText : unFoldText }}
            <i :class="['el-icon-arrow-' + (isFold ? 'down' : 'up')]"></i>
          </el-button>
        </div>
      </div>
      <!-- 高级查询 -->
      <template v-if="minorItems.length">
        <el-collapse-transition>
          <div v-show="!isFold" class="more-row">
            <slot v-for="item in minorItems" :name="item.slot" :data="item" :index="item.key">
              <component
                :is="item.type"
                :key="item.name"
                v-model="item.value"
                :title="item.title"
                :disabled="item.disabled"
              ></component>
            </slot>
          </div>
        </el-collapse-transition>
      </template>
    </div>
    <div class="kd-table-search_right-wrap">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KdSearch',
  props: {
    // 主搜索表单
    mainItems: {
      type: Array,
      default: () => [],
    },
    // 次搜索表单
    minorItems: {
      type: Array,
      default: () => [],
    },
    // 格式化参数
    formatter: {
      type: Function,
      default: null,
    },
    // 重置格式化参数
    resetFormatter: {
      type: Function,
      default: null,
    },
    // 展开收起的文本
    foldText: { type: String, default: '高级搜索' },
    unFoldText: { type: String, default: '收起' },
  },
  data() {
    return {
      // 展开收起
      isFold: true,
    };
  },
  methods: {
    // 折叠方法
    foldHandle() {
      this.isFold = !this.isFold;

      // 给父组件发送折叠事件 根据参数做不同的业务逻辑
      this.$emit('collapse', this.isFold);
    },

    // 点击查询格式化接口参数发送给父组件
    searchHandle() {
      let params = {};
      if (this.formatter) {
        params = this.formatter();
      } else {
        if (this.isFold) {
          this.mainItems.forEach((item) => {
            params[item.name] = item.value;
          });
        } else {
          this.minorItems.forEach((item) => {
            params[item.name] = item.value;
          });
        }
      }
      this.$emit('search', params);
    },

    // 重置参数
    resetHandle() {
      let params = {};
      // 兼容极特别的形式 使用外部函数格式化
      if (!this.resetFormatter) {
        let result = [...this.mainItems, ...this.minorItems];
        result.forEach((item) => {
          if (Array.isArray(item.value)) {
            params[item.name] = [];
            item.value = [];
          } else if (typeof item.value === 'boolean') {
            params[item.name] = false;
            item.value = false;
          } else {
            params[item.name] = '';
            item.value = '';
          }
        });
      } else {
        params = this.resetFormatter();
      }

      this.$emit('search', params);
    },
  },
};
</script>
<style>
.input-wrap > div + div {
  margin-left: 8px;
}
</style>
