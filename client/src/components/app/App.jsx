import "./style.css";
import Grid from "../grid/grid";
import { useState, useEffect, useRef } from "react";
import WsClass from "../../wsClass/WsClass";

//function establish websocket connection and generate a 10*10 grid UI-------------------------
function App() {
  const [userId, setUserId] = useState(""); //unique user Id
  const [online, setOnline] = useState(0); //to store number of online users
  const socketRef = useRef(null); //to avoid multiple connection through one user
  const [unicodeArray, setUnicodeArray] = useState(
    Array.from({ length: 10 }, () => Array(10).fill(null))
  ); // stor value of unicode by different users

  const columns = Array.from({ length: 10 });
  const rows = Array.from({ length: 10 });

  //executed whenever userId is updated---------------
  useEffect(() => {
    console.log("Updated userId:", userId);
  }, [userId]);

  //executed whenever user visit ui for first time or refresh page------------------
  useEffect(() => {
    socketRef.current = WsClass.init(
      setUnicodeArray,
      setOnline,
      setUserId,
      userId
    ); //initiate web socket connection

    async function fetchUnicodeArray() {
      //Api call to server to fetch already existed ui state
      const response = await fetch("http://localhost:8000/fetchUnicodeArray", {
        method: "GET",
      });
      const data = await response.json();
      setUnicodeArray(data.unicodeArray);
    }

    fetchUnicodeArray();

    return () => {
      // Cleanup WebSocket on unmount to avoid multiple connections
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <div className="online">
        <p>online users :- {online}</p>
      </div>
      <div className="container">
        {columns.map((_, colIndex) => (
          <div>
            {rows.map((_, rowIndex) => (
              <Grid
                rowIndex={rowIndex}
                colIndex={colIndex}
                unicode={unicodeArray[rowIndex][colIndex]}
                setUnicodeArray={setUnicodeArray}
                setOnline={setOnline}
                online={online}
                userId={userId}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
