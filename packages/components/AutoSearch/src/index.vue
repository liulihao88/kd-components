<template>
  <div v-if="formArr.length !== 0" class="kd-table-search" @keyup.enter.stop="onSearch">
    <div class="kd-table-search_left-wrap">
      <!--旧系统，无模糊搜索-->
      <template v-if="oldModel">
        <div class="old-model-row">
          <slot v-for="item in oldForm" :name="item.key" :data="item" :form="form" :index="item.key">
            <component
              :is="item.type"
              :key="item.key"
              v-model="form[item.key]"
              v-bind="item.attrs"
              v-on="item.listeners"
            ></component>
          </slot>
          <div v-if="$slots.default || formArr.length > 0" style="font-size: 0">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </div>
        </div>
      </template>
      <!--新系统，有模糊搜索-->
      <template v-else>
        <div class="first-row">
          <div class="input-wrap">
            <slot v-for="item in firstForm" :name="item.key" :data="item" :form="form" :index="item.key">
              <component
                :is="item.type"
                :key="item.key"
                v-model="form[item.key]"
                v-bind="item.attrs"
                v-on="item.listeners"
              ></component>
            </slot>
          </div>
          <div v-if="$slots.default || formArr.length > 0" style="font-size: 0">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
            <el-button v-if="hasMore" type="text" @click="onFold">
              {{ isFold ? foldText : unFoldText }}
              <i :class="['el-icon-arrow-' + (isFold ? 'down' : 'up')]" style="margin-left: 8px"></i>
            </el-button>
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="!isFold" class="more-row">
            <slot v-for="item in moreForm" :name="item.key" :data="item" :form="form" :index="item.key">
              <component
                :is="item.type"
                :key="item.key"
                v-model="form[item.key]"
                v-bind="item.attrs"
                v-on="item.listeners"
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
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'KdAutoSearch',
  props: {
    oldModel: { type: Boolean, default: false },
    foldText: { type: String, default: '高级搜索' },
    unFoldText: { type: String, default: '收起' },
    formArr: {
      type: Array,
      default: () => [
        // {
        //   type: 'kd-input',
        //   key: 'aa',
        //   value: '3',
        //   defaultValue:null,
        //   title:'',
        //   disabled:false,
        //   placeholder:'',
        //   attrs: {},
        //   listeners: {},
        // },
      ],
    },
  },
  data() {
    return {
      isFold: true, // 是否折叠
      form: {},
      newFormArr: [],
      oldForm: [],
      firstForm: [],
      moreForm: [],
      formResult: {},
    };
  },
  computed: {
    hasMore() {
      let hasMore = false;
      if (!this.oldModel) {
        hasMore = get(this.$slots, 'more.length') > 0 || this.moreForm.length > 0;
      }
      return hasMore;
    },
  },
  watch: {
    // 原始数据格式化
    formArr: {
      handler(val) {
        if (!Array.isArray(val) || val.length === 0) return;
        let newFormArr = [];
        cloneDeep(val).forEach((item) => {
          if (item.title) {
            item.attrs = {
              ...item.attrs,
              title: item.title,
            };
            delete item.title;
          }
          if (item.placeholder) {
            item.attrs = {
              ...item.attrs,
              placeholder: item.placeholder,
            };
            delete item.placeholder;
          }
          item.attrs = {
            ...item.attrs,
            disabled: item.disabled || false,
          };
          delete item.disabled;
          if (!item.slot) {
            item.type = item.type || 'kd-input';
          }
          item.value = item.value === undefined ? this.getDefaultValue(item) : item.value;
          this.$set(this.form, item.key, item.value);
          newFormArr.push(item);
        });
        this.newFormArr = newFormArr;
      },
      deep: true,
      immediate: true,
    },
    // 数据分发
    newFormArr: {
      handler(val) {
        if (!val) return;
        let oldForm = [],
          firstForm = [],
          moreForm = [];
        val.forEach((item) => {
          if (this.oldModel) {
            oldForm.push(item);
          } else {
            if (item.first === true) {
              firstForm.push(item);
            } else {
              moreForm.push(item);
            }
          }
        });
        this.oldForm = oldForm;
        this.firstForm = firstForm;
        this.moreForm = moreForm;
      },
      deep: true,
      immediate: true,
    },
    // 向父组件返回数据变化
    form: {
      handler(val) {
        let obj = {};
        Object.keys(val).forEach((key, i) => {
          const formItem = this.newFormArr.find((x) => x.key === key);
          if (formItem.valueFormat) {
            // 值格式化
            const formatValue = formItem.valueFormat(val[key], key);
            for (const key2 in formatValue) {
              obj[key2] = cloneDeep(formatValue[key2]);
            }
          } else {
            obj[key] = val[key];
          }
        });
        this.formResult = obj;
        this.$emit('change', obj);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getDefaultValue(item) {
      let defaultValue;
      if (item.defaultValue !== undefined) {
        defaultValue = item.defaultValue;
      } else {
        defaultValue = '';
        if ((item.type === 'kd-select' && item.attrs.multiple) || item.type === 'kd-date-range') {
          defaultValue = [];
        }
        // 默认值为布尔值
        if (['el-checkbox', 'el-switch'].includes(item.type)) {
          defaultValue = false;
        }
      }
      return defaultValue;
    },
    // 折叠或展开
    onFold() {
      const target = !this.isFold;
      if (!this.oldModel) {
        this.firstForm.forEach((item) => {
          item.attrs.disabled = !target;
        });
        this.resetForm();
      }
      this.isFold = target;
      this.$emit('fold', {
        fold: target,
        form: this.formResult,
      });
    },
    onSearch() {
      this.$emit('search', this.formResult);
    },
    onReset() {
      this.resetForm();
      this.$nextTick(() => {
        this.$emit('reset', this.formResult);
      });
    },
    resetForm() {
      this.newFormArr.forEach((item, i) => {
        this.form[item.key] = this.getDefaultValue(item);
      });
    },
  },
};
</script>
