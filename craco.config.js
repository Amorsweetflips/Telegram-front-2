// craco.config.js
module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // you can reapply any before/after hooks here if needed
      return middlewares;
    }
  }
};
