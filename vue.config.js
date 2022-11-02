const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "examples/src/main.js",
      template: "examples/public/index.html",
      filename: "index.html",
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: "text-loader",
        },
      ],
    },
    resolve: {
      alias: {
        utils: resolve("packages/utils"),
        "@kd/utils": resolve("packages/utils"),
        "@kd/components": resolve("packages/components"),
      },
    },
  },
});
