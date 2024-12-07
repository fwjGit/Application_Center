const { Controller } = require("egg");

class LoginController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const { request } = ctx;
    let { userName, password } = request.body;

    const user = await ctx.service.user.findUser(userName);
    if (user === null) {
      ctx.body = {
        code: 500,
        msg: "服务器错误，请重试",
      };
      return;
    }

    if (user.length == 0) {
      ctx.body = {
        code: 404,
        msg: "用户未注册，请先注册",
      };
      return;
    }

    const loginState = password.slice(0, 20) === user[0].password;
    if (!loginState) {
      ctx.body = {
        code: 400,
        msg: "用户名或密码错误",
      };
      return;
    }

    const token = app.jwt.sign({ userName, password }, app.config.jwt.secret, {
      expiresIn: "24h",
    });
    ctx.body = {
      code: 200,
      msg: "登录成功",
      data: {
        token: token,
      },
    };
  }

  // 退出登录
  async logout() {
    const { ctx, app } = this;
    ctx.body = {
      code: 200,
      msg: "已退出登录",
    };
  }

  // 注册
  async register() {
    const { ctx, app } = this;
    const { request } = ctx;
    console.log(request.body);
    let { userName, password } = request.body;
    const user = await ctx.service.user.findUser(userName);

    if (user === null) {
      ctx.body = {
        code: 500,
        msg: "服务器错误，请重试",
      };
      return;
    }

    if (user.length !== 0) {
      ctx.body = {
        code: 400,
        msg: "用户名称已注册",
      };
      return;
    }

    const result = await ctx.service.user.addUser({ userName, password });
    if (result === null) {
      ctx.body = {
        code: 500,
        msg: "服务器错误，请重试",
        data: {},
      };
      return;
    }

    const token = app.jwt.sign({ userName, password }, app.config.jwt.secret, {
      expiresIn: "24h",
    });

    ctx.body = {
      code: 200,
      msg: "注册成功",
      data: {
        token: token,
      },
    };
  }
}

module.exports = LoginController;
