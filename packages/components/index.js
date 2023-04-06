import registerDirectives from '../directives/directives';
import registerMixins from '../mixins/index';
import DetailBtn from './DetailBtn';
import Step from './step';
import Affix from './affix';
import Owner from './owner';
import SelectMultiple from './SelectMultiple';
import TreeSingle from './TreeSingle';
import TreeMultiple from './treeMultiple';
import FilterTable from './FilterTable';
import Input from './Input';
import DateRange from './DateRange';
import KdTooltip from './KdTooltip';
import Dialog from './Dialog';
import Drawer from './Drawer';
import JobTree from './JobTree';
import SlidePanel from './SlidePanel';
import Icon from './Icon';
import Select from './Select';
import Title from './Title';
import Empty from './Empty';
import Tree from './Tree';
import RowSelect from './RowSelect';
import RowSelectMultiple from './RowSelectMultiple';
import SimpleTable from './SimpleTable';
import ColumnShow from './ColumnShow';
import ColumnFilter from './ColumnFilter';
import ColumnText from './ColumnText';
import ColumnOperate from './ColumnOperate';
import ColumnAction from './ColumnAction';
import ColumnForm from './ColumnForm';
import PopoverButton from './PopoverButton';
import PageTitle from './PageTitle';
import TableSearch from './TableSearch';
import AutoSearch from './AutoSearch';
import ScrollGroup from './ScrollGroup';
import StickyPage from './StickyPage';
import scrollbar from './scrollbar';
import cron from './cron';
import Dev from './Dev';
import Search from './Search';

const components = [
  DetailBtn,
  Step,
  Affix,
  Owner,
  SelectMultiple,
  TreeSingle,
  TreeMultiple,
  FilterTable,
  Input,
  DateRange,
  KdTooltip,
  Dialog,
  Drawer,
  JobTree,
  SlidePanel,
  Icon,
  Select,
  Title,
  Empty,
  Tree,
  RowSelect,
  RowSelectMultiple,
  PopoverButton,
  PageTitle,
  SimpleTable,
  ColumnShow,
  ColumnFilter,
  ColumnText,
  ColumnOperate,
  ColumnAction,
  ColumnForm,
  ScrollGroup,
  scrollbar,
  cron,
  TableSearch,
  AutoSearch,
  StickyPage,
  Dev,
  Search,
];

const install = (app) => {
  components.map((component) => {
    app.use(component);
  });
  registerDirectives(app);
  registerMixins(app);
};

export {
  install,
  DetailBtn,
  Step,
  Affix,
  Owner,
  SelectMultiple,
  TreeSingle,
  TreeMultiple,
  FilterTable,
  Input,
  DateRange,
  KdTooltip,
  Dialog,
  Drawer,
  JobTree,
  SlidePanel,
  Icon,
  Select,
  Title,
  Empty,
  Tree,
  RowSelect,
  RowSelectMultiple,
  PopoverButton,
  PageTitle,
  SimpleTable,
  ColumnShow,
  ColumnFilter,
  ColumnText,
  ColumnOperate,
  ColumnAction,
  ColumnForm,
  ScrollGroup,
  scrollbar,
  cron,
  TableSearch,
  AutoSearch,
  StickyPage,
  Dev,
};

export default install;
