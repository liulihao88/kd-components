import basicConfig, { file } from "./rollup.config";
export default {
  ...basicConfig,
  output: {
    name: "kjComponents",
    file: file("cjs"),
    format: "cjs",
    exports: "named",
  },
};
