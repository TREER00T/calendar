import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/Login.js';
import Home from './home/Home.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
