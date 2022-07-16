module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true
      }
    }
  }
}
