const path = require('path');
module.exports = {
    entry:'./src/index.js',//no implemenation needed by default webpack verification
    mode: 'development',
    devServer: {
    historyApiFallback: true,// handle 404 cannot get error after refreshing url
    https: true,//secure the server
    compress: true,//invalid header multiple url proxy
    client: {
        webSocketURL: 'ws://0.0.0.0:8080/ws',// handle Invalid header error  in heroku port 8080 maps in server.js
      },
      static: {
        directory: path.join(__dirname, '/dist/car-rental-frontend'),
      },

      proxy: {
    /** Same as proxy.conf.json or proxy.conf.js */
        "/api": {
          "target": "https://fullstack-beadando.herokuapp.com/",
          "changeOrigin": true,
          "secure": false,
          "pathRewrite": {
            "^/api": ""
          }
        }
      },
    },

  };
