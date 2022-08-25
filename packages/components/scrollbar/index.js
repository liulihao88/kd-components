import KdScrollBar from './src/index.vue';

KdScrollBar.install = function(Vue) {
  Vue.component(KdScrollBar.name, KdScrollBar);
};

export default KdScrollBar;
