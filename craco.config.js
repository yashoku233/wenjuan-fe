module.exports = {
  devServer: {
    port: 3000, // B 端，前端
    proxy: {
      '/api': 'http://localhost:3001', // Mock
    },
  },
}
