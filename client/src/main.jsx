import ReactDOM from "react-dom/client";
import "./assets/global.css";
import Router from "./components/utils/router/router";
import { createStore } from "./components/store/createStore";
import { Provider } from "react-redux";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router />
  </Provider>
  // </React.StrictMode>
);
