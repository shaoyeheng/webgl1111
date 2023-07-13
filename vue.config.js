const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  
  configureWebpack: { 
    plugins: [new NodePolyfillPlugin()]
  },

  // 开启代理服务器
  // devServer:{
  //   proxy:{
  //     '/hfqz_05':{
  //       target:'/livescene',
  //       ws:true,
  //       changeOrigin:true
  //     }
  //   }
  // }
})
