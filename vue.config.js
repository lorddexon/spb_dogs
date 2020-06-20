const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/resources/css/_variables.scss";
          @import "@/resources/css/_fonts.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  }
}
