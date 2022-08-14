const { defineConfig } = require('@vue/cli-service')
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
          use: 'text-loader'
        }
      ]
    }
  }
})
