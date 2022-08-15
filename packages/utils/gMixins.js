export const gMixins = {
  data() {
    return {
      mIsShow: false
    };
  },
  computed: {},
  methods: {
    // 让宽度支持 数字、字符串、 百分比
    mHandleWidth(width = '') {
      if (!width && this.width) {
        width = this.width;
      }
      if (!width) {
        return {};
      }
      width = '' + width;
      if (
        width.indexOf('px') !== -1 ||
        width.indexOf('%') !== -1 ||
        width.indexOf('vw') !== -1
      ) {
        return { width: width };
      }
      return { width: width + 'px' };
    }
  }
};
