<!-- 负责人 -->
<template>
  <el-form-item :label="labelText" style="margin-bottom: 0" required>
    <div v-for="(ownerItem, index) in form.owners" :key="index" class="owner-item" style="display: flex">
      <el-form-item ref="kjOwnerRef" :prop="`owners[${index}][${defaultProps.value}]`" :rules="rules.owners">
        <div class="kj-owner">
          <el-select
            v-if="!isObject"
            v-model="ownerItem[defaultProps.value]"
            :style="customStyle"
            filterable
            remote
            reserve-keyword
            :clearable="false"
            :disabled="disabledFn(index)"
            placeholder="请输入关键词"
            size="small"
            :remote-method="remoteMethod"
            :loading="loading"
            v-bind="$attrs"
          >
            <el-option
              v-for="item in options"
              :key="item[rowKey]"
              :label="item[defaultProps.label]"
              :value="item[defaultProps.value]"
            ></el-option>
          </el-select>
          <el-select
            v-else
            v-model="form.owners[index]"
            :value-key="valueKey"
            filterable
            remote
            reserve-keyword
            :clearable="false"
            :disabled="disabledFn(index)"
            placeholder="请输入关键词"
            size="small"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item[rowKey]"
              :label="item[defaultProps.label]"
              :value="item"
            ></el-option>
          </el-select>
          <template v-if="!noIcon">
            <i v-if="index === 0" class="add" :class="[disabled ? 'no_drop' : 'pointer']" @click="add">+</i>
            <i v-else class="del" :class="[disabled ? 'no_drop' : 'pointer']" @click="deleteOwner(index)">-</i>
          </template>
        </div>
      </el-form-item>
    </div>
  </el-form-item>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'KdOwner',
  props: {
    value: {
      type: Object,
      default() {
        return {
          owners: [
            {
              name: '',
            },
          ],
        };
      },
    },
    rule: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    valueKey: {
      type: String,
      default: 'username',
    },
    width: {
      type: String,
      default: '316px',
    },
    maxWidth: {
      type: String,
      default: '316px',
    },
    isObject: {
      type: Boolean,
      default: false,
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          label: 'realName',
          value: 'name',
        };
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    firstDisabled: {
      type: Boolean,
      default: false,
    },
    labelText: {
      type: String,
      default: '负责人',
    },
    noIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      ruleObject: {
        owners: [this.mBlurRequired('请输入负责人'), { validator: this.validateOwner, trigger: ['blur', 'change'] }],
      },
    };
  },
  computed: {
    form: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
    customStyle() {
      return {
        '--owner-max-width': this.maxWidth,
        '--owner-width': this.width,
      };
    },
    rules() {
      return this.rule ? this.ruleObject : {};
    },
  },
  methods: {
    disabledFn(index) {
      if (this.firstDisabled) {
        return index === 0;
      } else {
        return this.disabled;
      }
    },
    add() {
      if (this.disabled) return;
      this.form.owners.push({
        [this.defaultProps.value]: '',
      });
    },
    deleteOwner(index) {
      if (this.disabled) return;
      this.form.owners.splice(index, 1);
      // let owners = cloneDeep(this.form.owners)
      let owners = JSON.parse(JSON.stringify(this.form.owners));
      console.log(owners, '====');

      this.form.owners.forEach((item, index) => {
        this.$refs.kjOwnerRef[index].resetField();
      });
      this.form.owners = owners;
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.$emit('remoteMethod', query, () => {
          this.loading = false;
        });
      }
    },
    /**
     * 校验负责人是否有重复
     */
    validateOwner(rule, value, callback) {
      let owns = this.form.owners.filter((own) => own[this.defaultProps.value] === value);
      if (owns.length > 1) {
        callback(new Error('负责人重复'));
      } else {
        callback();
      }
    },
  },
};
</script>
