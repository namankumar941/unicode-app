import "./grid.css";
import WsClass from "../../wsClass/WsClass";

//function to handle button in popup and thir function--------------
const PopupButton = (data) => {
  //executed when unicode submitted by the user-------------------
  async function handleInput() {
    const unicodeRegex = /^[^\p{Zs}]$/u; // Matches a single Unicode character except space

    if (unicodeRegex.test(data.unicode)) {
      data.closePopUp();
      //API call to set unicode over a block
      const response = await fetch("http://localhost:8000/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowIndex: data.rowIndex,
          colIndex: data.colIndex,
          unicode: data.unicode,
          userId: data.userId,
        }),
      });

      const details = await response.json();

      if (details.error) {
        alert(`error:- ${details.error}`);
      } else {
        data.setUnicodeArray(details.unicodeArray);
        WsClass.sendArray(details.unicodeArray); //send new ui state to all active users
      }
    } else {
      data.setIsError(true);
      data.setError("Enter Valid Input");
    }
  }

  return (
    <div className="buttonRow">
      <button className="buttonClass" onClick={handleInput}>
        {" "}
        done{" "}
      </button>
      <button
        onClick={data.closePopUp}
        className="buttonClass"
        style={{ backgroundColor: "rgb(255, 0, 0)" }}
      >
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
};

export default PopupButton;
