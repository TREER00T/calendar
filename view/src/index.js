import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth from './auth/Auth.js';
import Home from './home/Home.js';
import ReserveService from './service/reserve/ReserveService';
import ReserveProvider from './provider/reserve/ReserveProvider';
import ReserveWorkTimeInDay from './workTimeInDay/reserve/ReserveWorkTimeInDay';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/login" element={<Auth/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/service/reserve" element={<ReserveService/>}/>
            <Route path="/service/reserve/provider" element={<ReserveProvider/>}/>
            <Route path="/service/reserve/workTimeInDay" element={<ReserveWorkTimeInDay/>}/>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
