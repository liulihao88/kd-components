import registerDirectives from '../directives/directives';
import registerMixins from "../mixins/index"
import DetailBtn from "./DetailBtn";
import Step from "./step";
import Affix from "./affix";
import Owner from "./owner";
import SelectMultiple from "./SelectMultiple";
import TreeSingle from './TreeSingle';
import TreeMultiple from "./treeMultiple";
import FilterTable from "./FilterTable";
import Input from "./Input";
import DateRange from "./DateRange";
import AdvancedSearch from "./AdvancedSearch";
import KdTooltip from "./KdTooltip";
import Dialog from "./Dialog";
import Drawer from "./Drawer";
import JobTree from "./JobTree";
import SlidePanel from "./SlidePanel";
import Icon from "./Icon";
import Select from "./Select";
import Title from './Title';
import Empty from './Empty';
import Tree from './Tree';
import RowSelect from './RowSelect';
import PopoverButton from './PopoverButton';
import ScrollGroup from './ScrollGroup';
import scrollbar from "./scrollbar";
import cron from "./cron"

const components = [DetailBtn, Step, Affix, Owner, SelectMultiple, TreeSingle, TreeMultiple, FilterTable, Input, DateRange, AdvancedSearch, KdTooltip, Dialog, Drawer, JobTree, SlidePanel, Icon, Select, Title, Empty, Tree,RowSelect,PopoverButton,ScrollGroup,scrollbar,cron];

const install = (app) => {
  components.map((component) => {
    app.use(component);
  });
  registerDirectives(app);
  registerMixins(app);
};

export { install, DetailBtn, Step, Affix, Owner, SelectMultiple, TreeSingle, TreeMultiple, FilterTable, Input, DateRange, AdvancedSearch, KdTooltip, Dialog, Drawer, JobTree, SlidePanel, Icon, Select, Title, Empty, Tree,RowSelect,ScrollGroup,scrollbar,cron };

export default install;
