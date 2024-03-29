import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AccountDetails from "./pages/AccountDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <RouterProvider router={router} /> */}
        <HashRouter>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/account-details" element={<AccountDetails/>}/>
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
