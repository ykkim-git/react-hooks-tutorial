import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
/**
 * React hook (version 16.8)ㅐ
 * Hook을 이용하여 Class를 작성할 필요 없이 상태값과 여러 React의 기능을 사용할 수 있다.
 */

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  /** beforeUnload: window가 닫히기전에 function이 실행되는것을 허락함 */
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
  <div className="App">
    <button onClick={enablePrevent}>Protect</button>
    <button onClick={disablePrevent}>UnProtect</button>
  </div>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
