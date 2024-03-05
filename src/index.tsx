import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!); // null이 아니여야 한다 해서 !표시 추가함
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
