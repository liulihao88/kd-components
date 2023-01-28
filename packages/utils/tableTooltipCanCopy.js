import { Table, TableColumn } from 'element-ui';
import { getCell, getColumnByCell } from 'element-ui/packages/table/src/util';
import { getStyle, hasClass } from 'element-ui/src/utils/dom';

// Temporary  fixed https://github.com/ElemeFE/element/issues/13916
// TODO:   临 时 处理 ,待 element-ui #13916 修复后,去掉此代码
Object.assign(Table.components.TableBody.methods, {
  handleCellMouseLeave() {
    const tooltip = this.$refs.tooltip;
    if (tooltip && tooltip.expectedState) {
      tooltip.setExpectedState(false);
      clearTimeout(tooltip._timeoutLeave);
      tooltip._timeoutLeave = setTimeout(() => {
        if (!tooltip.expectedState) {
          tooltip.handleClosePopper();
        }
      }, 150);
    }
    const cell = getCell(event);
    if (!cell) return;

    const oldHoverState = this.table.hoverState || {};
    this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
  },
  handleCellMouseEnter(event, row) {
    // console.log('handleCellMouseEnter', this.$refs.tooltip)
    const table = this.table;
    const cell = getCell(event);
    const tooltip = this.$refs.tooltip;

    if (cell) {
      const column = getColumnByCell(table, cell);
      const hoverState = (table.hoverState = { cell, column, row });
      table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
    }

    // 判断是否text-overflow, 如果是就显示tooltip
    const cellChild = event.target.querySelector('.cell');
    if (!(hasClass(cellChild, 'el-tooltip') && cellChild.childNodes.length)) {
      setTimeout(() => {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }, 100);
      return;
    }
    // use range width instead of scrollWidth to determine whether the text is overflowing
    // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
    const range = document.createRange();
    range.setStart(cellChild, 0);
    range.setEnd(cellChild, cellChild.childNodes.length);
    const rangeWidth = range.getBoundingClientRect().width;
    const padding =
      (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
      (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0);
    if (
      (rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) &&
      this.$refs.tooltip
    ) {
      // TODO 会引起整个 Table 的重新渲染，需要优化
      const showTooltip = () => {
        this.tooltipContent = cell.innerText || cell.textContent;
        tooltip.referenceElm = cell;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      };
      clearTimeout(tooltip._timeoutEnter);
      tooltip._timeoutEnter = setTimeout(() => {
        !tooltip.expectedState && showTooltip();
      }, 100);
    }
  },
});

const ElTable = { extends: Table };
const ElTableColumn = { extends: TableColumn };
export default {
  components: {
    ElTable,
    ElTableColumn,
  },
};
