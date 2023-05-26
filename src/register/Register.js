import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from '../styles/Auth.module.css';
function Register() {

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [nickname, setNickname] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);

  const [helloWorld,setHelloWorld] = useState('기본값');

  const navigate = useNavigate();

  const fetchData = () => {
    return fetch("http://localhost:4000")
      .then(res => res.text())
  }

  useEffect( () => {
    fetchData()
    .then(text => setHelloWorld(text));
  }, [] );

  const handleCheckEmail = () => {
    fetch("http://localhost:4000/duplicate/email?email="+email)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.error) {
        toast("중복확인 요청이 실패했습니다.");
        setIsValidEmail(false);
        return ;
      }
      if (res.body) {
        toast("사용할 수 없는 이메일입니다.");
        setIsValidEmail(false);
        return ;
      }
      toast("사용 가능한 이메일입니다.");
      setIsValidEmail(true);
    });
  }

  useEffect(() => {
    if (nickname) {
      setIsValidNickname(true);
    } else {
      setIsValidNickname(false);
    }
  }, [nickname]);

  useEffect(() => {
    if (password && passwordCheck) {
      if (password === passwordCheck) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    }
  }, [password, passwordCheck]);

  const handleSubmit = (e) => {
    e.preventDefault(); // submit이 될 때 페이지 이동이 되는것을 막아줍니다.

    const registerInfo = {
      email : email,
      password: password,
      nickname: nickname
    };

    // 이제 registerInfo를 서버로 보낼꺼임!
    console.log(registerInfo);

    fetch("http://localhost:4000/register",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 요청 본문의 형식에 따라 적절한 Content-Type을 설정합니다.
      },
      body: JSON.stringify(registerInfo) // 요청 본문 데이터를 JSON 문자열로 변환하여 설정합니다.
    })
    .then(res => res.json()
    .then(res => {
      if (res.error) {
        toast("회원가입에 실패했습니다. " + res.error);
        return ;
      }
      toast("MYSTAGRAM에 오신것을 환영합니다. 잠시 후 로그인 페이지로 이동합니다.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }));
  }

  return (
    <Card>
      <ToastContainer />
      {/* 아래꺼 재미로 한거임 ! */}
      <Container className={style.authTitle}>
        <Card.Text className="display-5">MYSTAGRAM - 가입하기</Card.Text>
        <Card.Text>
          MYSTAGRAM은 소셜네트워크 서비스입니다. 환영합니다.
        </Card.Text>
      </Container>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={9}>
              <span>{helloWorld}</span>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Button onClick={handleCheckEmail}>중복확인</Button>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="패스워드를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="동일한 패스워드를 입력해주세요."
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary"
            type="submit"
            disabled={
              !isValidEmail
              || !isValidPassword
              || !isValidNickname} >가입하기
            </Button>
          <span className="m-2">또는</span>
          <a href="/login" style={{ textDecoration: "none" }}>
            로그인하기
          </a>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Register;

