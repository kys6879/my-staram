import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [helloWorld, setHelloWorld] = useState('서버와 통신 전');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          // 사용자 이메일 DB에 없을떄
          if (json.error === 'LOGIN_FAIL') {
            toast('잘못된 이메일 또는 패스워드 입니다.');
            return;
          }
          toast('서버와의 통신이 불안정합니다.');
          return;
        }
        toast('로그인 성공');
        localStorage.setItem('token', json.data);
        navigate('/posts');
      });
  }

  //컴포넌트가 처음 로딩 될 때
  useEffect(() => {
    // 서버와 통신해서
    fetchHelloWorld()
      // setHelloWorld 를 한다.
      .then(text => setHelloWorld(text));
  }, []);

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs={4} sm={5} md={6}>
          <Card>
            <ToastContainer />
            <Container>
              <Card.Text className="display-5">로그인</Card.Text>
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
                    type="submit"
                    variant="primary">입장하기</Button>
                  <span className="m-2">또는</span>
                  <a href="/register" style={{ textDecoration: "none" }}>
                    가입하기
                  </a>
                </Form>
              </Card.Body>
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;