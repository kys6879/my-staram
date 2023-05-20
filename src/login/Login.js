import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import style from '../styles/Auth.module.css';

function Login() {
  return (
    <Card>
      <Container className={style.authTitle}>
        <Card.Text className="display-5">MYSTAGRAM - 로그인하기</Card.Text>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="아이디를 입력해주세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="패스워드를 입력해주세요." />
            </Form.Group>

            <Button variant="primary">입장하기</Button>
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