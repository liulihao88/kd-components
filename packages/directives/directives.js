const Clipboard = require('clipboard');
import clickoutside from 'element-ui/src/utils/clickoutside.js';
export default function (app) {
  // 拖拽移动弹框
  app.directive('el-drag-dialog', {
    bind(el, binding, vnode) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header');
      const dragDom = el.querySelector('.el-dialog');
      dialogHeaderEl.style.cssText += ';cursor:move;';
      dragDom.style.cssText += ';top:0px;';

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const getStyle = (function () {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr];
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr];
        }
      })();

      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;

        const dragDomWidth = dragDom.offsetWidth;
        const dragDomHeight = dragDom.offsetHeight;

        const screenWidth = document.body.clientWidth;
        const screenHeight = document.body.clientHeight;

        const minDragDomLeft = dragDom.offsetLeft;
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

        const minDragDomTop = dragDom.offsetTop;
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

        // 获取到的值带px 正则匹配替换
        let styL = getStyle(dragDom, 'left');
        let styT = getStyle(dragDom, 'top');

        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
          styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
        } else {
          styL = +styL.replace(/\px/g, '');
          styT = +styT.replace(/\px/g, '');
        }

        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX;
          let top = e.clientY - disY;

          // 边界处理
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft;
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft;
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop;
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop;
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;

          // emit onDrag event
          vnode.child.$emit('dragDialog');
        };

        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
  });
  /**
   * 按钮点击节流 throttle. 默认是1000毫秒节流一次
   * @example
   * v-throttle
   * v-throttle="500"
   */
  app.directive('throttle', {
    bind: function (el, binding) {
      function handleClick() {
        if (!el.disabled) {
          el.disabled = true;
          setTimeout(() => {
            el.disabled = false;
          }, binding.value || 2000);
          // binding.value可以自行设置。如果设置了则跟着设置的时间走
          // 例如：v-throttle='500'
        }
      }
      el.__vueClickOutside__ = handleClick;
      el.addEventListener('click', handleClick);
    },
    unbind(el) {
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    },
  });

  /**
 * 复制文本
 * v-clipboard="testVal"
 * v-clipboard:success="clipboardSuccess"
 * v-clipboard:error="errorSuccess"
 * @example
 * <div v-clipboard="'小岳岳不服'" v-clipboard:success="clipboardSuccess">出来单挑啊</div>
*   clipboardSuccess(val) {
      this.$message({
        message: `内容(${val.text})复制成功`
      });
    }
 */
  app.directive('clipboard', {
    bind(el, binding) {
      if (binding.arg === 'success') {
        el._v_clipboard_success = binding.value;
      } else if (binding.arg === 'error') {
        el._v_clipboard_error = binding.value;
      } else {
        const clipboard = new Clipboard(el, {
          text() {
            return binding.value;
          },
          action() {
            return binding.arg === 'cut' ? 'cut' : 'copy';
          },
        });
        clipboard.on('success', (e) => {
          const callback = el._v_clipboard_success;
          callback && callback(e); // eslint-disable-line
        });
        clipboard.on('error', (e) => {
          const callback = el._v_clipboard_error;
          callback && callback(e); // eslint-disable-line
        });
        el._v_clipboard = clipboard;
      }
    },
    update(el, binding) {
      if (binding.arg === 'success') {
        el._v_clipboard_success = binding.value;
      } else if (binding.arg === 'error') {
        el._v_clipboard_error = binding.value;
      } else {
        el._v_clipboard.text = function () {
          return binding.value;
        };
        el._v_clipboard.action = function () {
          return binding.arg === 'cut' ? 'cut' : 'copy';
        };
      }
    },
    unbind(el, binding) {
      if (binding.arg === 'success') {
        delete el._v_clipboard_success;
      } else if (binding.arg === 'error') {
        delete el._v_clipboard_error;
      } else {
        el._v_clipboard.destroy();
        delete el._v_clipboard;
      }
    },
  });

  /**
   * 自动聚焦
   * v-focus
   */
  app.directive('focus', {
    // 获取光标在inserted中操作，此时元素已经插入到父节点了
    inserted(el) {
      el = el.nodeName === 'INPUT' ? el : el.children[0];
      el.focus();
    },
    bind(el) {
      el = el.nodeName === 'INPUT' ? el : el.children[0];
      el.focus();
    },
  });

  app.directive('clickoutside', clickoutside);
}
