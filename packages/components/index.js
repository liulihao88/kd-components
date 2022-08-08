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
import TextTooltip from "./TextTooltip";
const components = [DetailBtn, Step, Affix, Owner, SelectMultiple, TreeMultiple, FilterTable, Input, DateRange, AdvancedSearch,TextTooltip];

const install = (app) => {
  components.map((component) => {
    app.use(component);
  });
};

export { install, DetailBtn, Step, Affix,Owner,SelectMultiple,TreeMultiple, FilterTable, Input, DateRange, AdvancedSearch,TextTooltip};
export default install;
