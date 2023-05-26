import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import style from '../styles/Auth.module.css';
import { Navigate } from 'react-router-dom';

function Login({ isLoggedIn, onLogin }) {

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // submit이 될 때 페이지 이동이 되는것을 막아줍니다.

    const loginInfo = {
      email,password
    }

    console.log(loginInfo);

    fetch("http://localhost:4000/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 요청 본문의 형식에 따라 적절한 Content-Type을 설정합니다.
      },
      body: JSON.stringify(loginInfo) // 요청 본문 데이터를 JSON 문자열로 변환하여 설정합니다.
    })
    .then(res => res.json())
    .then(res => {
      if (res.error && res.error === "LOGIN FAILED") {
        toast("잘못된 이메일 또는 비밀번호입니다." + res.error);
        return ;
      }
      onLogin();
      delete res.body.password;
      localStorage.setItem('token', res.body);
    });
  }

  return (
    <Card>
      <ToastContainer />
      <Container className={style.authTitle}>
        <Card.Text className="display-5">MYSTAGRAM - 로그인하기</Card.Text>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email" 
                placeholder="아이디를 입력해주세요." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="password" 
                placeholder="패스워드를 입력해주세요." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button 
              type="submit"
              variant="primary">입장하기
            </Button>
            <span className="m-2">또는</span>
            <a href="/register" style={{ textDecoration: "none" }}>
              가입하기
            </a>
          </Form>
        </Card.Body>
      </Container>
    </Card>
  );
}

export default Login;