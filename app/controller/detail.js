const { Controller } = require("egg");

class DetailController extends Controller {
  // 查询用户名
  async queryUserName() {
    const { ctx, app } = this;
    const {
      request: { headers },
    } = ctx;
    const token = headers.authorization;
    const { userName } = app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: {
        userName,
      },
    };
  }
}

module.exports = DetailController;
