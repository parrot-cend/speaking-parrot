const path = require('path')

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js' // 使用带有编译器的完整版 Vue 框架
      }
    }
  },
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1, //多余1核cpu时 启动并行压缩
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/style/_variables.scss'),
        path.resolve(__dirname, 'src/assets/style/_mixins.scss')
      ]
    }
  }
}
