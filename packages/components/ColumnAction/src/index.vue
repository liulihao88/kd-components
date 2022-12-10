<template>
  <el-table-column
    ref="column"
    class="kd-column-action"
    :label="$attrs.label || '操作'"
    :resizable="$attrs.resizable || false"
    v-bind="$attrs"
    :width="$attrs.width || 'auto'"
    :min-width="$attrs['min-width'] || '140'"
    v-on="$listeners"
  >
    <template slot-scope="scope">
      <template v-for="item in unDropdownList">
        <template v-if="btnShow(scope, item)">
          <template v-if="btnHidden(scope, item)">
            <span :key="item.key" class="kd-column-action__btn-item btn-hidden no-dropdown">{{
              btnLabel(scope, item)
            }}</span>
          </template>
          <template v-else>
            <template v-if="item.popover">
              <popover-item
                :key="item.key"
                class="kd-column-action__btn-item no-dropdown"
                :disabled="btnDisabled(scope, item)"
                :btn-item="item"
                :scope="scope"
              ></popover-item>
            </template>
            <template v-else>
              <el-button
                :key="item.key"
                class="kd-column-action__btn-item no-dropdown"
                type="text"
                :disabled="btnDisabled(scope, item)"
                @click="onClick(scope, item)"
              >
                {{ btnLabel(scope, item) }}
              </el-button>
            </template>
          </template>
        </template>
      </template>

      <template v-if="dropdownList.length > 0">
        <el-dropdown
          class="dropdown kd-column-action__btn-item no-dropdown"
          placement="bottom-end"
          :hide-on-click="false"
          trigger="click"
        >
          <kd-icon name="kd-icon-ellipsis" class="kd-column-action__icon"></kd-icon>
          <el-dropdown-menu slot="dropdown" :ref="'innerDropdown' + scope.$index" trigger="manual">
            <template v-for="item in dropdownList">
              <template v-if="btnShow(scope, item)">
                <template v-if="item.popover">
                  <popover-item
                    :key="item.key"
                    type="dropdown"
                    :btn-item="item"
                    :scope="scope"
                    :disabled="btnDisabled(scope, item)"
                  ></popover-item>
                </template>
                <template v-else>
                  <el-dropdown-item
                    :key="item.key"
                    class="kd-column-action__btn-item"
                    :command="item.key"
                    :disabled="btnDisabled(scope, item)"
                    @click.native="onClick(scope, item)"
                  >
                    {{ item.label }}
                  </el-dropdown-item>
                </template>
              </template>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import PopoverItem from './PopoverItem';
import { get } from 'lodash';

export default {
  name: 'KdColumnAction',
  components: { PopoverItem },
  props: {
    btnList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      dropdownList: [],
      unDropdownList: [],
      // popoverKeys: [],
      // hideOnClick: false, // 是否点击按钮后关闭
      // showPopper: false,
      // refDropdown: null,
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
          // if (x.popover) {
          //   this.popoverKeys.push(x.key);
          // }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    onClick(scope, item, event) {
      item.confirm && item.confirm(scope, item);
    },
    btnLabel(scope, item) {
      let itemLabel;
      if (typeof item.label === 'function') {
        itemLabel = item.label(scope, item);
      } else {
        itemLabel = item.label;
      }
      return itemLabel;
    },
    // 按钮disabled处理：行数据的permissionTypes||按钮本身的disabled
    btnDisabled(scope, item) {
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
    // 隐藏按钮，可占位
    btnHidden(scope, item) {
      let itemHidden;
      if (typeof item.hidden === 'function') {
        itemHidden = item.hidden(scope, item);
      } else {
        itemHidden = Boolean(item.hidden);
      }
      return itemHidden;
    },
    // 隐藏按钮，不占位
    btnShow(scope, item) {
      let itemShow;
      if (typeof item.show === 'function') {
        itemShow = item.show(scope, item);
      } else if (typeof item.show === 'boolean') {
        itemShow = item.show;
      } else {
        itemShow = true;
      }
      return itemShow;
    },
  },
};
</script>
