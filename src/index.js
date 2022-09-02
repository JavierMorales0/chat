import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './views/chat.view';
import Login from './views/login.view';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
/* Getting the current year. */
const date = new Date();
const year = date.getFullYear();
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="chat" element={<Chat />}></Route>
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There is nothing here!</p>
          </main>
        }
      />
    </Routes>
    <footer className="text-center _text-small py-2 ">
      <span>Javier Morales Melara | Copyright @ {year}</span>
    </footer>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
