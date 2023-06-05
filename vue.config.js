const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api'),
        'assets': resolve('src/assets'),
        'base': resolve('src/base'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
        'utils': resolve('src/utils'),
        'router': resolve('src/router')
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 3400,
    open: true,
    // proxy: {
    //   '/api/v1': {
    //     target: 'http://localhost:8011',
    //     pathRewrite: {
    //       '/api/v1': '/api/v1'
    //     }
    //   },
    //   '/api': {
    //     target: 'http://localhost:4300',
    //     pathRewrite: {
    //       '/api': ''
    //     }
    //   },
    //   '/mock': {
    //     target: 'http://localhost:4300'
    //   }
    // }
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:9098`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    disableHostCheck: true
  },
  lintOnSave: true
}
