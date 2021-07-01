const path = require('path');

const publicPath = '/';
module.exports = {
  publicPath,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src/')).set('vue$', 'vue/dist/vue.esm.js');
    config.module
      .rule('svg-icon')
      .test(/\.(svg)(\?.*)?$/)
      .include.add([path.resolve(__dirname, 'src/icons')])
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
    config.module.rule('svg').exclude.add([path.resolve(__dirname, 'src/icons')]);
    config.devtool('source-map');
  },
};