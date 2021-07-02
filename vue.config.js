module.exports = {
  "devServer":{
    "proxy": {
      "/api": {
      "target": 'https://api.vk.com/method',
      "pathRewrite": { '^/api': '' },
      "changeOrigin": true,
      "secure": false
      },
      "/upload-image": {
        "target": 'https://pu.vk.com',
        "pathRewrite": { '^/upload-image': '' },
        "changeOrigin": true,
        "secure": false
      },
    }
  }
}