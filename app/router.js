/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.post("/login", controller.login.login);
  router.get("/logout", controller.login.logout);
  router.post("/register", controller.login.register);
  router.get("/queryUserName", controller.detail.queryUserName);

  // socket.io
  // io.of("/ws").route("exchange", io.controller.default.exchange);

  // 配置 WebSocket 全局中间件
  // app.ws.use(async (ctx, next) => {
  //   console.log("websocket open");
  //   await next();
  //   console.log("websocket closed");
  // });

  //ws
  app.ws.route("/detail", controller.home.hello);
  // 可使用路由参数，使用方式同 egg 自身路由
  // app.ws.route('/foo/:id', app.controller.home.foo);
};
