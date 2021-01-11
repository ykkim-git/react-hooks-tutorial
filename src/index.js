import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useAxios from "./useAxios.js";

const App = () => {
  const { loading, data, error } = useAxios({
    url:
      "https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json"
  });
  console.log(
    `Loading: ${loading}\n 
    Error: ${error}\n  
    data: ${JSON.stringify(data)}`
  );
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
