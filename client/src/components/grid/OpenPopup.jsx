import { useState } from "react";
import PopupButton from "./popupButton";

//open popup where unicode is submitted by the client
function OpenPopup(data) {
  const [unicode, setunicode] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  return (
    <div>
      {isError && (
        <p className="header" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <h3 className="header">Enter Unicode character</h3>
      <input
        type="text"
        placeholder="Enter Here"
        onChange={(e) => setunicode(e.target.value)}
        className="input"
      />

      <PopupButton
        setUnicodeArray={data.setUnicodeArray}
        colIndex={data.colIndex}
        rowIndex={data.rowIndex}
        setIsError={setIsError}
        unicode={unicode}
        closePopUp={data.closePopUp}
        setError={setError}
        setOnline={data.setOnline}
        online={data.online}
        userId={data.userId}
      />
    </div>
  );
}

export default OpenPopup;
