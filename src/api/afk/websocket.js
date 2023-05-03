import { WebSocketServer } from "ws";
import settings from "../../../settings.js";
import log from "../../helpers/logger.js";
import userModel from "../../models/Users.js";

const createAfkWebSocketServer = (port) => {
  const wss = new WebSocketServer({ port: port });
  const users = [];

  wss.on("connection", (ws) => {
    const user = { token: null };
    ws.user = user;
    users.push(user);
    ws.on("message", (data) => {
      try {
        data = JSON.parse(data);
        if (!data || !data.type || !data.payload) return ws.close();
      } catch (error) {
        return ws.close();
      }

      if (data.type === "start") {
        ws.send("Authorized");
        const intervalId = setInterval(async () => {
          try {
            await userModel.findByIdAndUpdate(data.payload.user.id, {
              $inc: { Coins: settings.afk.coins },
            });
            ws.send("gained");
          } catch(err) {
            ws.close()
          }
        }, settings.afk.per * 1000);
        ws.user.intervalId = intervalId;
      } else {
        ws.close();
      }
    });

    ws.on("close", () => {
      clearInterval(ws.user.intervalId);
      const index = users.indexOf(ws.user);
      if (index > -1) {
        users.splice(index, 1);
      }
    });
  });
  log.info("WebSocket Successfuly Created");
  return wss;
};

export default createAfkWebSocketServer;
