const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const InputController = require("./InputControllerClass/InputController");

const app = express();
const port = 8000;

const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);

//----------------------------------------------Middleware----------------------------------------------

app.use(bodyParser.json()); // Middleware to parse JSON request body
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend origin
  })
); // Enable CORS for all origins { Cross-Origin Resource Sharing (CORS) }

const inputController = new InputController(WebSocket, server); // inputController class instance

//----------------------------------------------route----------------------------------------------
app.post("/input", inputController.handleInput.bind(inputController));
app.get(
  "/fetchUnicodeArray",
  inputController.sendUnicodeArray.bind(inputController)
);

server.listen(port, () => console.log("server started"));