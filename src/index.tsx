import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginDemo from "./Logindemo";
import reportWebVitals from './reportWebVitals';
import User from "./User";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginDemo/>}/>
                <Route path="/Admin" element={<App/>}/>
                <Route path="/User" element={<User />} />
            </Routes>
        </Router>
    );
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
