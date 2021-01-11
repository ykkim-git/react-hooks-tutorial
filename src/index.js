import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
/**
 * React hook (version 16.8)ㅐ
 * Hook을 이용하여 Class를 작성할 필요 없이 상태값과 여러 React의 기능을 사용할 수 있다.
 */

const useBeforeLeave = (onBefore) => {
  // if (typeof onBefore !== "function") {
  //   return;
  // }

  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) { // 마우스를 위쪽으로 벗어나면 작동
      onBefore();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []); // 한번만 이벤트리스너가 추가되도록 [] 추가
};

const App = () => {
  const begForLife = () => console.log("please dont leave...");
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
