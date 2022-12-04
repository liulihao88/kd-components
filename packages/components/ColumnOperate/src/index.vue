<template>
  <el-table-column
    ref="column"
    class="kd-column-operate"
    :label="$attrs.label || '操作'"
    :resizable="$attrs.resizable || false"
    v-bind="$attrs"
    :width="$attrs.width || 'auto'"
    :min-width="$attrs['min-width'] || '140'"
    v-on="$listeners"
  >
    <template v-if="showBtnsFun !== null ? showBtnsFun(scope) : true" slot-scope="scope">
      <template v-for="item in unDropdownList">
        <template v-if="item.hidden && item.hidden(scope, item)">
          <span :key="item.key" class="kd-column-operate__hidden-text kd-column-operate__btn-item">{{
            item.label
          }}</span>
        </template>
        <template v-else>
          <template v-if="item.popover">
            <kd-popover-button
              v-show="item.show ? item.show(scope, item) : true"
              :key="item.key"
              class="kd-column-operate__btn-item"
              v-bind="item.popConfig"
              @confirm="onPopoverConfirm(scope, item.key)"
            >
              <el-button
                slot="reference"
                :key="item.key"
                :class="{ hidden: item.hidden && item.hidden(scope, item) }"
                type="text"
                :disabled="getDisabled(scope, item)"
                @click.self="onClick(scope, item.key)"
              >
                {{ item.label }}
              </el-button>
            </kd-popover-button>
          </template>
          <template v-else>
            <el-button
              v-show="item.show ? item.show(scope, item) : true"
              :key="item.key"
              class="kd-column-operate__btn-item"
              :class="{ hidden: item.hidden && item.hidden(scope, item) }"
              type="text"
              :disabled="getDisabled(scope, item)"
              @click="onClick(scope, item.key)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </template>

      <el-dropdown
        v-if="dropdownList.length > 0"
        class="dropdown kd-column-operate__btn-item"
        placement="bottom-end"
        :hide-on-click="false"
        trigger="click"
        @command="handleCommand(scope, $event)"
      >
        <kd-icon name="kd-icon-ellipsis" class="kd-column-operate__icon"></kd-icon>
        <el-dropdown-menu slot="dropdown" :ref="'innerDropdown' + scope.$index">
          <template v-for="item in dropdownList">
            <template v-if="item.popover">
              <kd-popover-button
                v-show="item.show ? item.show(scope, item) : true"
                :key="item.key"
                v-bind="item.popConfig"
                @confirm="onPopoverConfirm(scope, item.key)"
              >
                <el-dropdown-item
                  slot="reference"
                  class="kd-column-operate__dd-item"
                  :command="item.key"
                  :disabled="getDisabled(scope, item)"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </kd-popover-button>
            </template>
            <template v-else>
              <el-dropdown-item
                v-show="item.show ? item.show(scope, item) : true"
                :key="item.key"
                class="kd-column-operate__dd-item"
                :command="item.key"
                :disabled="getDisabled(scope, item)"
              >
                {{ item.label }}
              </el-dropdown-item>
            </template>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
  </el-table-column>
</template>

<script>
import { get } from 'lodash';

export default {
  name: 'KdColumnOperate',
  props: {
    btnList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    defaultIcon: {
      type: Boolean,
      default: true,
    },
    // 是否显示全部按钮的函数，参数：scope
    showBtnsFun: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      dropdownList: [],
      unDropdownList: [],
      popoverKeys: [],
      hideOnClick: false, // 是否点击按钮后关闭
    };
  },
  watch: {
    btnList: {
      handler(val) {
        if (val.length === 0) return;
        val.forEach((x) => {
          if (x.dropdown) {
            this.dropdownList.push(x);
          } else {
            this.unDropdownList.push(x);
          }
          if (x.popover) {
            this.popoverKeys.push(x.key);
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 按钮disabled处理：行数据的permissionTypes||按钮本身的disabled
    getDisabled(scope, item) {
      let rowDisabled = false;
      let itemDisabled;
      if (typeof item.disabled === 'function') {
        itemDisabled = item.disabled(scope, item);
      } else {
        itemDisabled = Boolean(item.disabled);
      }
      if (item.permission && get(scope, 'row.permissionTypes')) {
        rowDisabled = !scope.row.permissionTypes.includes(item.permission.toLowerCase());
      }
      return itemDisabled || rowDisabled;
    },
    // 普通按钮点击，不在dropdown，也不popover
    onClick(scope, key) {
      this.$emit('click', { scope, key });
    },
    // dropdown中按钮点击，
    handleCommand(scope, event) {
      // 非popover按钮，手动关闭它
      if (!this.popoverKeys.includes(event)) {
        this.$emit('click', { scope, key: event });
        if (this.$refs['innerDropdown' + scope.$index]) {
          this.$refs['innerDropdown' + scope.$index].showPopper = false;
        }
      }
    },
    // popover确认按钮点击
    onPopoverConfirm(scope, key) {
      this.$emit('click', { scope, key });
    },
  },
};
</script>
