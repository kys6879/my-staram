import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import style from '../styles/Auth.module.css';

function Login() {

  const [helloWorld, setHelloWorld] = useState('서버와 통신 전');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchHelloWorld = () => {
    return fetch("http://localhost:4000")
      .then(response => response.text());
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // submit이 될 때 페이지 이동이 되는것을 막아줍니다.
    const loginInfo = {
      email: email,
      password: password
    }
    console.log("로그인 정보는 : ", loginInfo);
  }

  //컴포넌트가 처음 로딩 될 때
  useEffect( () => {
    // 서버와 통신해서
    fetchHelloWorld()
      // setHelloWorld 를 한다.
      .then(text => setHelloWorld(text));
  }, [] );

  return (
    <Card>
      <Container className={style.authTitle}>
        <Card.Text className="display-5">MYSTAGRAM - 로그인하기</Card.Text>
        <span>{helloWorld}</span>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="패스워드를 입력해주세요." />
            </Form.Group>

            <Button
              type= "submit"
              variant="primary">입장하기</Button>
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