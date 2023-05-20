import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./login/Login";
import Register from "./register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
function App() {
  // 로그인 or
  // 회원가입
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Navigate to="/login"></Navigate>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Container>
  );
}

export default App;
