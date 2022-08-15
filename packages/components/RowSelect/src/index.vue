<template>
  <div
    class="row-select"
    :style="{
      '--hoverBgColor': hoverBgColor,
      '--hoverTextColor': hoverTextColor,
      '--activeBgColor': activeBgColor,
      '--activeTextColor': activeTextColor,
      '--duration': duration + 'ms',
      '--lineHeight': lineHeight + 'px',
      '--itemWidth': itemWidth + 'px',
      '--itemMaxWidth': itemMaxWidth + 'px',
      '--overflow': overflow,
      height: isFold ? lineHeight + 'px' : optionScrollHeight,
    }"
  >
    <div class="label-box">
      <span :style="labelStyles">{{ labelText }}</span>
      <span class="label-separator">{{ separator }}</span>
    </div>

    <div
      ref="optionsBox"
      class="options-box"
      :style="{ height: isFold ? lineHeight + 'px' : optionScrollHeight }"
      @click.capture="onItemClick"
    >
      <template v-if="multiple && showAll">
        <slot name="all" :index="'$all'" :active="selectAll">
          <div
            class="item"
            :class="{ 'is-active': selectAll }"
            data-index="$all"
            :style="itemStyles"
          >
            全部
          </div>
        </slot>
      </template>
      <div v-for="(item, index) in options" :key="item[keyName]">
        <slot
          :item="item"
          :index="item[keyName]"
          :active="selectedKey.includes(item[keyName])"
        >
          <div
            class="item"
            :class="{
              'is-active': !selectAll && selectedKey.includes(item[keyName]),
            }"
            :style="itemStyles"
          >
            <div
              :class="{ break: itemWidth !== 'auto' }"
              :data-index="item[keyName]"
            >
              <template v-if="format">
                {{ format(item, item[keyName], index) }}
              </template>
              <template v-else>
                {{ item[labelName] }}
              </template>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <div class="fold-box" @click="trigger">
      <div class="fold-inner">
        <i
          v-if="showIcon"
          class="el-icon-arrow-down"
          :class="{ 'trans-icon': !isFold }"
        ></i>
        <div class="text" :style="btnStyles">
          {{ isFold ? foldText : unfoldText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 属性
  // value/v-model {string,Array} 绑定值
  // multiple {Boolean} 默认true，是否可多选
  // duration {number} 默认200 动画时长，单位ms
  // lineHeight {Number} 默认24 选项高度，会影响所
  // required {Boolean} 默认true 是否必须选中最少1项
  // =====左侧label相关=====
  // showLable {Boolean} 默认true，是否显示label
  // labelText {String} 默认"选项"，label文字
  // separator {String} 默认无，label文字后的分隔符
  // labelStyles {Object} 默认{}，label文字的样式，支持css
  // =====右侧按钮相关=====
  // foldText {Object} 默认"更多"，右侧按钮折叠状态时文字
  // unfoldText {Object} 默认"收起"，右侧按钮展开状态时文字
  // showIcon {Boolean} 默认true，图标是否显示
  // btnStyles {Object} 默认{}，右侧按钮文字样式
  // =====选项相关=====
  // options {Array} 默认[]，选项数组，对象数组，{label:'',value:''}
  // showAll {Boolean} 默认true，是否显示全部按钮
  // labelName {String} 默认'label'，用来显示的字段名
  // keyName {String} 默认'value'，用作key的字段名
  // format {function} 自定义选项显示内容转换，一个函数，参数为：选项、index，返回一个字符串
  // activeBgColor {String} 默认#f5f7fd，激活状态时选项背景色
  // activeTextColor {String} 默认#0052d9，激活状态时选项文字色
  // hoverBgColor {String} 默认无，hover状态时选项背景色
  // hoverTextColor {String} 默认无，hover状态时选项文字色
  // itemStyles {Object} 默认{}，选项样式集
  // itemWidth {String} 默认auto，选项宽度
  // itemMaxWidth {String} 默认auto，选项最大宽度
  // overflow {String} 默认ellispe，超出后行为

  // 事件
  // selectChange 选项发生变化时选中的选项，返回原数据中选中的项
  // foldChange 组件打开或收起变化时触发，返回组件当前状态，true收起，false打开

  // 方法，父组件可通过ref调用
  // trigger 切换折叠状态
  // add(keys) 增加选项，参数为选项key字符串或数组
  // reduce(keys) 减少选项，参数为选项key字符串或数组

  export default {
    name: 'KdRowSelect',
    props: {
      value: {
        type: [Array, String],
        default: () => [],
      },
      multiple: {
        type: Boolean,
        default: true,
      },
      required: {
        type: Boolean,
        default: true,
      },
      duration: {
        type: Number,
        default: 200,
      },
      lineHeight: {
        type: Number,
        default: 24,
      },
      // 左侧label
      showLabel: {
        type: Boolean,
        default: true,
      },
      labelText: {
        type: String,
        default: '选项',
      },
      separator: {
        type: String,
        default: '',
      },
      labelStyles: {
        type: Object,
        default: () => {},
      },
      // 右侧按钮
      foldText: {
        type: String,
        default: '更多',
      },
      unfoldText: {
        type: String,
        default: '收起',
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
      btnStyles: {
        type: Object,
        default: () => {
          return {
            // css样式
          }
        },
      },
      // 选项
      options: {
        type: Array,
        default: () => [],
      },
      showAll: {
        type: Boolean,
        default: true,
      },
      itemWidth: {
        type: String,
        default: 'auto',
      },
      itemMaxWidth: {
        type: String,
        default: 'auto',
      },
      overflow: {
        type: String,
        default: 'ellipsis',
      },
      labelName: {
        type: String,
        default: 'label',
      },
      keyName: {
        type: String,
        default: 'value',
      },
      format: {
        type: Function,
        default: null,
      },
      activeBgColor: {
        type: String,
        default: '#365edf',
      },
      hoverBgColor: {
        type: String,
        default: '',
      },
      activeTextColor: {
        type: String,
        default: '#fff',
      },
      hoverTextColor: {
        type: String,
        default: '',
      },
      itemStyles: {
        type: Object,
        default: () => {
          return {
            // css样式
          }
        },
      },
    },
    data() {
      return {
        selectedKey: [],
        isFold: true, // true收false开
        optionScrollHeight: '24px',
        selectAll: false,
        keySet: new Set(),
      }
    },
    watch: {
      selectedKey: {
        handler(value) {
          if (this.multiple) {
            this.$emit('input', value || [])
            this.$emit(
              'selectChange',
              this.options.filter(x =>
                this.selectedKey.includes(x[this.keyName])
              ) || []
            )
          } else {
            this.$emit('input', value[0] || '')
            this.$emit(
              'selectChange',
              this.options.filter(x =>
                this.selectedKey.includes(x[this.keyName])
              )[0] || ''
            )
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.init()
      this.onResize()
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      onResize() {
        this.optionScrollHeight =
          Math.max(this.$refs.optionsBox.scrollHeight - 8, this.lineHeight) +
          'px'
      },
      onItemClick(e) {
        const key = e.target.dataset.index
        if (this.multiple) {
          if (key === '$all') {
            this.selectAll = true
            this.options.forEach(item => {
              this.keySet.add(item[this.keyName])
            })
          } else {
            if (this.selectAll) {
              this.selectAll = false
              this.keySet.clear()
            }
            const hasKey = this.keySet.has(key)
            this.keySet[hasKey ? 'delete' : 'add'](key)
          }
        } else {
          if (!this.required && this.keySet.has(key)) {
            this.keySet.delete(key)
          } else {
            this.keySet.clear()
            this.keySet.add(key)
          }
        }
        this.selectedKey = Array.from(this.keySet)
      },
      init() {
        this.keySet.clear()
        this.selectedKey = []
        if (this.required) {
          if (this.multiple) {
            if (!Array.isArray(this.value)) {
              console.error(
                'kd-row-select：多选配置下需要 v-model 绑定数组类型'
              )
              return
            }
            if (this.value.length > 0) {
              this.add(this.value)
            } else {
              if (this.showAll) {
                this.selectAll = true
                this.add(this.options.map(x => x[this.keyName]))
              } else {
                this.add(this.options[0][this.keyName])
              }
            }
          } else {
            if (typeof this.value !== 'string') {
              console.error(
                'kd-row-select：单选配置下需要 v-model 绑定字符串类型'
              )
              return
            }
            if (this.value === '') {
              this.add(this.options[0][this.keyName])
            } else {
              this.add(this.value)
            }
          }
        }
      },
      // 切换折叠状态，true折叠，false展开，可被ref调用
      trigger(type) {
        if (type === undefined||type instanceof PointerEvent) {
        this.isFold = !this.isFold;
      } else {
        if (type === "open") this.isFold = false;
        if (type === "close") this.isFold = true;
      }
        this.$emit('foldChange', this.isFold)
      },
      set(keys) {
        if (keys === '$all') {
          if (!this.multiple) {
            console.error('kd-row-select：单选状态下不可全选')
          } else {
            if (this.showAll) {
              this.selectAll = true
              this.add(this.options.map(x => x[this.keyName]))
            } else {
              this.add(this.options[0][this.keyName])
            }
          }
        } else {
          let keysType = ''
          if (Array.isArray(keys)) {
            keysType = 'array'
          } else if (typeof keys === 'string') {
            keysType = 'string'
          }
          console.log(keysType)
          if (keysType !== 'array' && keysType !== 'string') {
            console.log('kd-row-select：set方法参数错误，需要array或string')
            return
          }
          this.keySet.clear()
          this.selectAll = false
          if (this.multiple) {
            if (keysType === 'array') {
              keys.forEach(k => this.keySet.add(k))
            }
          } else {
            if (keysType === 'string') this.keySet.add(keys)
          }
        }
        this.selectedKey = Array.from(this.keySet)
      },
      // ref调用添加选项的方法：要删除的key，数组或字符串
      add(keys) {
        let keysType = ''
        if (Array.isArray(keys)) {
          keysType = 'array'
        } else if (typeof keys === 'string') {
          keysType = 'string'
        }

        if (this.multiple) {
          if (keysType === 'array') {
            keys.forEach(k => this.keySet.add(k))
          }
          if (keysType === 'string') this.keySet.add(keys)
        } else {
          this.keySet.clear()
          if (keysType === 'array') this.keySet.add(keys[0])
          if (keysType === 'string') this.keySet.add(keys)
        }
        this.selectedKey = Array.from(this.keySet)
      },
      // ref调用删除选项的方法：要删除的key，数组或字符串
      reduce(keys) {
        if (keys === undefined) return
        let keysType = ''
        if (Array.isArray(keys)) {
          keysType = 'array'
        } else if (typeof keys === 'string') {
          keysType = 'string'
        }
        if (keysType === 'array') {
          keys.forEach(k => this.keySet.delete(k))
        }
        if (keysType === 'string') this.keySet.delete(keys)

        if (this.keySet.size === 0 && this.required) {
          // 如果选项为0,还必选，则选中第一项
          if (this.multiple) {
            if (this.showAll) {
              this.selectAll = true
              this.options.forEach(x => {
                this.keySet.add(x[this.keyName])
              })
            } else {
              this.selectAll = false
              this.keySet.add(this.options[0][this.keyName])
            }
          } else {
            this.keySet.add(this.options[0][this.keyName])
          }
        }
        this.selectedKey = Array.from(this.keySet)
      },
    },
  }
</script>
