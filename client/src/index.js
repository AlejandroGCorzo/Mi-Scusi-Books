import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { ColorProvider } from "./components/Palettes/GreenColor";

// console.log(process.env.REACT_APP_API);
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:9000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ColorProvider>
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID}
        >
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ColorProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
