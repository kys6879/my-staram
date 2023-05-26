import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./login/Login";
import Register from "./register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Feed from "./feed/Feed";
import { isValidJwt, decodeJwt } from "./auth/authService";
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isVaild = isValidJwt();
    setIsLoggedIn(isVaild);
    console.log(decodeJwt());
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Container>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? (
            <Navigate to="/feed" />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={
          isLoggedIn ? (
            <Feed />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Container>
  );
}

export default App;
