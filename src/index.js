import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 * React hook (version 16.8)ㅐ
 * Hook을 이용하여 Class를 작성할 필요 없이 상태값과 여러 React의 기능을 사용할 수 있다.
 */

const useNotification = (title, options) => {
  // if (!("Notification" in window)) {
  //   return;
  // }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      // notification 권한요청
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification("can I steel your kimchi?", {
    body: "i love js",
  });
  return (
    <div className="App">
      <button onClick={triggerNotif}>hello</button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
