import { useState, useEffect } from "react";
export default function UndoableCounter() {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  const handleClick = (strVal) => {
    setHistory([
      {
        action: strVal,
        prev: value,
        new: value + parseInt(strVal),
      },
      ...history, // old items after new one (order matters!)
    ]);
    setValue(value + parseInt(strVal));
  };

  const handleUndoAction = () => {
    const removedObj = history.shift();
    setRemovedItems([removedObj, ...removedItems]);
    setValue(removedObj.prev);
  };

  const handleRedoAction = () => {
    const latestObj = removedItems.shift();
    setHistory([latestObj, ...history]);
    setValue(latestObj.new);
  };

  return (
    <>
      <div className="user-actions">
        <button disabled={!history.length} onClick={handleUndoAction}>
          {" "}
          Undo{" "}
        </button>
        <button disabled={!removedItems.length} onClick={handleRedoAction}>
          {" "}
          Redo{" "}
        </button>
      </div>

      <div className="operations">
        {["-100", "-10", "-1"].map((val) => {
          return <button onClick={() => handleClick(val)}>{val}</button>;
        })}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {value}
        </div>
        {["+100", "+10", "+1"].map((val) => {
          return <button onClick={() => handleClick(val)}>{val}</button>;
        })}
      </div>

      <div className="history">
        <div style={{ fontSize: "20px" }}>Actions History</div>
        <div className="history-item">
          {history.map((historyObj) => (
            <div>
              {historyObj.action} &nbsp; ({historyObj.prev} -> {historyObj.new})
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
