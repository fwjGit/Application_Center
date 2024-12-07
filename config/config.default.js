/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1733304266672_6401";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mysql = {
    client: {
      host: "localhost",
      port: "3306",
      user: "root",
      password: "070619@a",
      database: "sso",
    },
    app: true,
    agent: false,
  };

  config.jwt = {
    secret: "encodeToken",
  };

  config.middleware = ["verifyToken"];
  config.verifyToken = {
    ignore: ["/login", "/register", "/detail"],
  };

  // 设置端口号
  config.cluster = {
    listen: {
      path: "",
      port: 7001,
      host: "0.0.0.0",
    },
  };

  // config.websocket = {
  //   // 配置 websocket 使用 redis 作消息广播，配置项目参见 ioredis
  //   redis: {
  //     host: "127.0.0.1",
  //     port: 6379,
  //   },
  // };

  return {
    ...config,
    ...userConfig,
  };
};
