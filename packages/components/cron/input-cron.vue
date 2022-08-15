<template>
  <div class="input-cron">
    <el-input
      v-model="editCronValueTrunk"
      :placeholder="placeholder"
      style="width: auto"
      :disabled="disabled"
    >
      <template slot="append">
        <el-button
          type="primary"
          :disabled="disabled"
          @click="showDialog"
        >
          配置cron
        </el-button>
      </template>
    </el-input>
    <DragDialog
      v-model="dialog.show"
      :title="dialog.title"
      :buttons="dialog.buttons"
      @cancel="cancel"
      @confirm="confirm"
      @afterClose="afterClose"
    >
      <div class="cron-mode">
        <easy-cron
          v-model="editCronValue"
          :exe-start-time="exeStartTime"
          :hide-year="hideYear"
          :remote="remote"
          :hide-second="hideSecond"
        />
      </div>
    </DragDialog>
  </div>
</template>

<script>
import EasyCron from "./index";
import DragDialog from "../comps/KjDragDialog.vue";
export default {
  name: "KdCron",
  components: {
    EasyCron,
    DragDialog,
  },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 700,
    },
    placeholder: {
      type: String,
      default: "请输入cron表达式",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    exeStartTime: {
      type: [Number, String, Object],
      default: 0,
    },
    hideSecond: {
      type: Boolean,
      default: false,
    },
    hideYear: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      editCronValue: this.value,
      dialog: {
        show: false,
        title: "配置Cron表达式",
        buttons: [
          { text: "确定", className: "xa-bg-ok-click", clickEvent: "confirm" },
          {
            text: "取消",
            className: "xa-bg-cancel-click",
            clickEvent: "cancel",
          },
        ],
      },
    };
  },
  computed: {
    editCronValueTrunk: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit("input", v);
        this.$emit("change", v);
      }
    }
  },
  methods: {
    showDialog() {
      this.dialog.show = true;
      if (!this.value) {
        this.editCronValue = "0 0 0 * * ? *";
      } else {
        this.editCronValue = this.value
      }
    },
    cancel() {
      this.dialog.show = false;
      this.editCronValueTrunk = this.value
    },
    confirm() {
      this.editCronValueTrunk = this.editCronValue
      this.dialog.show = false;
    },
    // 右上角关闭
    afterClose() {
      this.$emit("change", this.value);
    }
  },
};
</script>

<style lang="scss" scoped>
.cron-mode {
  width: 700px;
  padding: 16px;
}
.input-cron,
.input-ui {
  display: inline-block;
}

.input-cron .ivu-input-wrapper {
  width: 100% !important;
}

.input-cron {
  ::v-deep .el-input-group__append {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--ok-btn-color);
  }
}
.config-btn {
  cursor: pointer;
}

.config-btn:hover {
  color: var(--primary-color);
}
</style>
