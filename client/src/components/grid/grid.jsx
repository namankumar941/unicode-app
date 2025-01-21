import "./grid.css";
import { useState } from "react";
import OpenPopup from "./OpenPopup";

//function to show 10*10 grid and unicode present in it
function Grid(data) {
  const [popUp, setPopUp] = useState(false);

  function openPopUp() {
    setPopUp(true);
  }
  function closePopUp() {
    setPopUp(false);
  }

  return (
    <div>
      <button className="blockButton" key={data.colIndex} onClick={openPopUp}>
        <div className="corner-text">{`${data.rowIndex + 1},${
          data.colIndex + 1
        }`}</div>

        <div className="center-text">
          {data.unicode != null && `${data.unicode}`}
        </div>
      </button>

      {popUp ? (
        <>
          {/* Modal backdrop to disable background interaction */}
          <div className="modal-backdrop" onClick={data.closePopUp}></div>
          <div className="popup-container">
            <OpenPopup
              closePopUp={closePopUp}
              colIndex={data.colIndex}
              rowIndex={data.rowIndex}
              setUnicodeArray={data.setUnicodeArray}
              setOnline={data.setOnline}
              online={data.online}
              userId={data.userId}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Grid;
