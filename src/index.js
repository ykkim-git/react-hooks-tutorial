import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 * React hook (version 16.8)ㅐ
 * Hook을 이용하여 Class를 작성할 필요 없이 상태값과 여러 React의 기능을 사용할 수 있다.
 */

 // ref + 기능이 들어가있는 함수
const useClick = (onClick) => {
  // if (typeof onClick !== "function") {
  //   return;
  // }

  const element = useRef();
  useEffect(() => { // 컴포넌트가 마운트 되었을 때 (like componentDidMount) 실행
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    /**
     * componentWillUnMount 됐을 때 이벤트리스너 제거
     * component가 mount되지않았을 때 이벤트리스너가 배치되지 않게 하기위해서
     */
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); // no defendencies
  return element;
};

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}> Hi </h1> 
      {/* id 같이 ref를 부여함 */}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
