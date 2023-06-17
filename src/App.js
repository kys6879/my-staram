import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./login/Login";
import Register from "./register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Post from "./post/Post";
import { isValidJwt } from "./auth/tokenService";
function App() {

  // 로그인 했는지 안 했는지
  const [isAuthenticated] = useState(isValidJwt());

  return (
    <Container>
      <Routes>
        <Route path="/" element={ 
          isAuthenticated ? <Navigate to="/posts" /> : <Navigate to="/login" />
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={ 
          isAuthenticated ? <Post /> : <Navigate to="/login" /> 
        } 
        />
      </Routes>
    </Container>
  );
}

export default App;
