import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

Vue.directive('highlight', function (el) {
  // console.log(el.innerHTML);
  const blocks = el.querySelectorAll('pre code');
  // console.log(blocks);
  blocks.forEach((block) => {
    hljs.highlightElement(block);
  });
});
