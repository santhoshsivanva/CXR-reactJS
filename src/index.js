import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Detect from './pages/Detect';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Pin from './pages/Pin';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <Routes>
    <Route index element={<Home />} />
    <Route path='/' element={<Home />} />
    <Route path='detectCovid' element={<Detect />}/>
    <Route path='findByPin' element={<Pin />}/>
  </Routes>
  </BrowserRouter>
);


reportWebVitals();
