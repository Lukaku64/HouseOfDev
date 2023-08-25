import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { setUser } from "./store/user.js";
import App from "./App.jsx";
import "./index.css";
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  store.dispatch(setUser(user));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
