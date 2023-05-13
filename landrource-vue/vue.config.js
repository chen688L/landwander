const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    proxy:process.env.VUE_APP_TITLE == '生产环境'?process.env.VUE_APP_BASE_API:'',
  },
  
})
