import { v4 as uuidv4 } from "uuid";
//class to handle all task related to web socket at client side
class WsClass {
  static ws;
  // static activeSockets = new Map();

  //function executed initially when web socket connection is to be established-----------------
  static init(setUnicodeArray, setOnline, setUserId) {
    const newUserId = uuidv4(); //unique user Id

    this.openConnection(setUserId, newUserId); //open web socket connection
    this.onMessage(setUnicodeArray, setOnline); //handle message recieved from server

    // WebSocket error handler
    this.ws.onerror = async (error) => {
      console.error("WebSocket error:", error);
    };

    // WebSocket close handler
    this.ws.onclose = async () => {
      console.log("WebSocket connection closed");
    };

    return this.ws;
  }

  //function executed to open web socket connection---------------
  static openConnection(setUserId, newUserId) {
    this.ws = new WebSocket("ws://localhost:8000");

    this.ws.onopen = () => {
      setUserId(newUserId); //set unique user id after connection established
      console.log("WebSocket connection established");
    };
  }

  //function executed to handle message from server side---------------
  static onMessage(setUnicodeArray, setOnline) {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.online) {
        //if server send number of online users
        setOnline(data.online);
      }
      if (data.unicodeArray) {
        //if server send ui state
        setUnicodeArray(data.unicodeArray);
      }
    };
  }

  // function executed to send message to server---------------
  static sendArray(unicodeArray) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          unicodeArray: unicodeArray,
        })
      );
    }
  }

  // // function executed to open web socket connection---------------
  // static addSocket(userId, ws) {
  //   this.activeSockets.set(userId, ws); // Store WebSocket with the corresponding userId
  // }
  // // function executed to open web socket connection---------------
  // static getSocket(userId) {
  //   return this.activeSockets.get(userId); // Get WebSocket using userId
  // }
  // // function executed to open web socket connection---------------
  // static removeSocket(userId) {
  //   this.activeSockets.delete(userId); // Remove WebSocket from active connections
  // }
}
export default WsClass;
