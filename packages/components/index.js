import registerDirectives from '../directives/directives';
import DetailBtn from "./DetailBtn";
import Step from "./step";
import Affix from "./affix";
import Owner from "./owner";
import SelectMultiple from "./SelectMultiple";
import TreeMultiple from "./treeMultiple";
import FilterTable from "./FilterTable";
import Input from "./Input";
import DateRange from "./DateRange";
import AdvancedSearch from "./AdvancedSearch";
import KdTooltip from "./KdTooltip";
import Dialog from "./Dialog";
import Drawer from "./Drawer";
import Tree from "./Tree";
import Icon from "./Icon"
import Select from "./Select";
import Title from './Title'
const components = [DetailBtn, Step, Affix, Owner, SelectMultiple, TreeMultiple, FilterTable, Input, DateRange, AdvancedSearch, KdTooltip, Dialog, Drawer, Tree,Icon, Select, Title];

const install = (app) => {
  components.map((component) => {
    app.use(component);
  });
  registerDirectives(app);
};

export { install, DetailBtn, Step, Affix, Owner, SelectMultiple, TreeMultiple, FilterTable, Input, DateRange, AdvancedSearch, KdTooltip, Dialog, Drawer, Tree,Icon, Select, Title };

export default install;
