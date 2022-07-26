import DetailBtn from "./DetailBtn";
import Step from "./step";

const components = [DetailBtn, Step];

const install = (app) => {
  components.map((component) => {
    app.use(component);
  });
};

export { install, DetailBtn, Step };
export default install;
