import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./login/Login";
import Register from "./register/Register";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { isValidJwt, decodeJwt } from "./service/authService";
import Post from "./post/Post";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isVaild = isValidJwt();
    setIsLoggedIn(isVaild);
    console.log(decodeJwt());
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/posts');
  };

  return (
    <Container>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? (
            <Navigate to="/posts" element={<Post />} />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Post />} />
      </Routes>
    </Container>
  );
}

export default App;
