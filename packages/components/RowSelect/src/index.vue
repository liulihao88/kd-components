<script>
export default {
  name: 'KdRowSelect',
  props: {
    type: {
      type: String,
      default: 'multiple',
    },
  },
  render(h) {
    const props = {
      ...this.$attrs,
      ...this.$props,
    };
    const on = {
      ...this.$listeners,
    };
    let { type } = this;
    if (this.type === 'multiple') {
      return <kd-row-select-multiple {...{ props }} {...{ on }}></kd-row-select-multiple>;
    } else {
      return <div>123</div>;
    }
  },
};
</script>
