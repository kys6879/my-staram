import React, { useState } from 'react';
import {
  Card, Container, Form, Button,
} from 'react-bootstrap';
import { login } from '../services/authService';
import styles from '../styles/Auth.module.css'; // CSS 모듈 import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // 회원가입도 똑같이 받기
  // 중복체크 이벤트 걸기
  // 로그인시 데이터 모아서 서버에 전송
  // 회원가입시 데이터 모아서 서버에 전송

  // 로그인 및 회원가입 api 만들기

  return (
    <Container className={styles.loginContainer}>
      <Card className={styles.cardWrapper}>
        <Card.Text className="text-center pt-5 display-5">MYSTAGRAM</Card.Text>
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
            <Button variant="primary" type="submit">
              입장하기
            </Button>
            <span className={styles.orText}>또는</span>
            <a href="/register" className={styles.register}>
              가입하기
            </a>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
