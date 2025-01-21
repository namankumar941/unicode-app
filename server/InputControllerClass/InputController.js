let unicodeArray = Array.from({ length: 10 }, () => Array(10).fill(null));
let playerSubmittedChar = [];
const WsClass = require("../WsClass/WsClass");

//----------------------------------------------controller class----------------------------------------------
class InputController {
  constructor(WebSocket, server) {
    this.wsClass = new WsClass();
    this.WebSocket = WebSocket;
    this.server = server;
  }

  //function executed when any player enters the unicode
  handleInput(req, res) {
    if (playerSubmittedChar.includes(req.body.userId)) {
      return res.send({
        error:
          "You are temporarily blocked from making further updates for 1 minute.",
      });
    }
    unicodeArray[req.body.rowIndex][req.body.colIndex] = req.body.unicode;
    playerSubmittedChar.push(req.body.userId);
    setTimeout(() => {
      playerSubmittedChar = playerSubmittedChar.filter(
        (item) => item !== req.body.userId
      );
      console.log("player can update now");
    }, 60 * 1000);
    res.send({
      unicodeArray: unicodeArray,
      id: req.body.userId,
    });
  }

  //function executed when for first time user visited the ui or refresh the ui
  sendUnicodeArray(req, res) {
    this.wsClass.init(this.WebSocket, this.server);
    res.send({
      unicodeArray: unicodeArray,
    });
  }
  
}

module.exports = InputController;
