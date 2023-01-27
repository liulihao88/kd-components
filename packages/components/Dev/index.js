import Dev from './src/index.vue';

Dev.install = (Vue) => Vue.component(Dev.name, Dev);

export default Dev;
