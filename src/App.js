import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import styles from './App.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
