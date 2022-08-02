import DetailBtn from "./DetailBtn";
import Step from "./step";
import Affix from "./affix";
import Owner from "./owner";
import SelectMultiple from "./SelectMultiple";
import TreeMultiple from "./treeMultiple";

const components = [DetailBtn, Step, Affix, Owner, SelectMultiple, TreeMultiple];

const install = (app) => {
  components.map((component) => {
    app.use(component);
  });
};

export { install, DetailBtn, Step, Affix,Owner,SelectMultiple,TreeMultiple};
export default install;
