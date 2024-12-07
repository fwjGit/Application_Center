const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    // 向房间 foo 发送消息
    app.ws.sendTo("foo", "hello from index");
    ctx.body = "hi, egg";
  }

  async hello() {
    const { ctx, app } = this;
    if (!ctx.websocket) {
      throw new Error("this function can only be use in websocket router");
    }
    const socketId = ctx.request.url.split("=")[1];
    const socket = ctx.websocket;
    let room = ctx.helper.room;
    room[socketId] = socket;

    ctx.websocket
      .on("message", (msg) => {
        console.log("receive", msg);
        // 房间内没有除自己外其他socket时，关闭socket连接
        if (Object.keys(room).length === 1 && room[socketId]) {
          room[socketId].close();
          return;
        }

        // 向除自己外的 socket 发送消息
        for (let key in room) {
          if (key !== socketId) {
            let socket = room[key];
            socket.send(msg);
          }
        }
      })
      .on("close", (code, reason) => {
        console.log("websocket closed", code, reason);
        delete room[socketId];
      });
  }
}

module.exports = HomeController;
