const uuid = require("uuid");
const activeSockets = new Map();
let onlineUsers = 0;

//----------------------------------------------websocket class----------------------------------------------
class WsClass {
  constructor() {
    this.server = null;
    this.WebSocket = null;
    this.wss = null;
    this.socId = null;
  }

  //function executed when for first time user visited the ui or refresh the ui
  init(WebSocket, server) {
    if (!this.wss) {
      this.openSocketServer(WebSocket, server); //establish websocket connection
    }
  }

  //function executed when websocket connection is to be established
  openSocketServer(WebSocket, server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on("connection", (ws) => {
      onlineUsers++;
      console.log("ws connected");
      this.addClient(ws);
      this.socketMessage(ws);
      this.broadcastOnlineCount(ws);
      this.closeSocketServer(ws, this.socId);
    });
  }

  //add client to maintain active client data
  addClient(ws) {
    this.socId = uuid.v4();
    activeSockets.set(this.socId, ws);
  }

  //function executed when any message sent from client side to server side
  socketMessage(ws) {
    ws.on("message", async (message) => {
      const { unicodeArray } = JSON.parse(message);
      activeSockets.forEach((activeSocket, socId) => {
        // Send the message to all clients except the sender
        if (
          // this.socId !== socId &&
          activeSocket.readyState === WebSocket.OPEN
        ) {
          activeSocket.send(
            JSON.stringify({
              unicodeArray: unicodeArray,
            })
          );
        }
      });
    });
  }

  //function executed to sent number of online users to all online client
  broadcastOnlineCount() {
    activeSockets.forEach((activeSocket, socId) => {
      if (activeSocket.readyState === WebSocket.OPEN) {
        activeSocket.send(
          JSON.stringify({
            online: onlineUsers,
          })
        );
      }
    });
  }

  //function to disconnect socket connection
  closeSocketServer(ws, socId) {
    ws.on("close", async () => {
      activeSockets.delete(socId);
      onlineUsers--;
      this.broadcastOnlineCount();
      console.log("disconnected");
    });
  }
}

module.exports = WsClass;
