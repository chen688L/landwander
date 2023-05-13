module.exports = {
  chainWebpack: (config) => {
    config.optimization.minimizer("terser").tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true;
      compress.pure_funcs = [
        "__f__", // App 平台 vue 移除日志代码
      ];
      return args;
    });
  },
  devServer: {
    proxy: {
      "/api": {
        // target: "http://192.168.35.30:8089", // 连接192.168.118.77
        target: "http://172.16.205.110:8089", // 连接192.168.118.77
        // target: "http://192.168.79.30:8089", // 连接192.168.118.77
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
