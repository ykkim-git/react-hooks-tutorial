import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 * React hook (version 16.8)ㅐ
 * Hook을 이용하여 Class를 작성할 필요 없이 상태값과 여러 React의 기능을 사용할 수 있다.
 */

const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm && typeof callback !== "function") {
    return;
  }

  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("Deleting the world......");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
