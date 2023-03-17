<template>
  <div class="input-cron">
    <el-input
      v-model="editCronValueTrunk"
      :placeholder="placeholder"
      :style="`width: ${inputWidth}`"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template slot="append">
        <el-button type="primary" :disabled="disabled" @click="showDialog"> 配置cron </el-button>
      </template>
    </el-input>
    <DragDialog
      :visible.sync="dialog.show"
      :title="dialog.title"
      :width="width"
      :buttons="dialog.buttons"
      v-bind="$attrs"
      @cancel="cancel"
      @confirm="confirm"
      @afterClose="afterClose"
      v-on="$listeners"
    >
      <div class="cron-mode">
        <easy-cron
          v-model="editCronValue"
          :exe-start-time="exeStartTime"
          :hide-year="hideYear"
          :remote="remote"
          :hide-second="hideSecond"
        ></easy-cron>
      </div>
    </DragDialog>
  </div>
</template>

<script>
import EasyCron from './index.vue';
import CronParser from 'cron-parser';
import DragDialog from '@kd/components/Dialog/src/index.vue';
export default {
  name: 'KdCron',
  components: {
    EasyCron,
    DragDialog,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    inputWidth: {
      type: String,
      default: '316px',
    },
    width: {
      type: String,
      default: '780px',
    },
    placeholder: {
      type: String,
      default: '请输入cron表达式',
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
        title: '配置Cron表达式',
        buttons: [
          { text: '确定', className: 'xa-bg-ok-click', clickEvent: 'confirm' },
          {
            text: '取消',
            className: 'xa-bg-cancel-click',
            clickEvent: 'cancel',
          },
        ],
      },
    };
  },
  computed: {
    editCronValueTrunk: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
        this.$emit('change', v);
      },
    },
  },
  methods: {
    showDialog() {
      this.dialog.show = true;
      if (!this.value) {
        this.editCronValue = '0 0 0 * * ? *';
      } else {
        const validate = this.validateCronValue(this.value);
        if (validate) {
          this.editCronValue = this.value;
        } else {
          this.editCronValue = '0 0 0 * * ? *';
        }
      }
    },
    validateCronValue(value) {
      value = value
        .split(' ')
        .filter((el) => el)
        .join(' ');
      // 分离出前六子
      let value6 = value;
      if (value.split(' ').length === 7) {
        value6 = value.substring(0, value.lastIndexOf(' '));
      }
      try {
        let interval = CronParser.parseExpression(value6);
        // console.log('cronDate:', interval.next().toDate());
        return true;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    cancel() {
      this.dialog.show = false;
      this.editCronValueTrunk = this.value;
    },
    confirm() {
      this.editCronValueTrunk = this.editCronValue;
      this.dialog.show = false;
    },
    // 右上角关闭
    afterClose() {
      this.$emit('change', this.value);
    },
  },
};
</script>
