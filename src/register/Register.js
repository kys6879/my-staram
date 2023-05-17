import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import { register } from '../services/authService';
import styles from '../styles/Auth.module.css'; // CSS 모듈 import

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleDuplicateCheck = () => {
    setIsValidEmail(true);
  };

  const handleComparePassword = () => {
    const isEqual = password === secondPassword;
    setIsValidPassword(isEqual);
  };

  useEffect(() => {
    if (password && secondPassword) {
      handleComparePassword();
    } else {
      setIsValidPassword(false);
    }
  }, [password, secondPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerInfo = {
      email,
      password,
      name,
      nickname,
    };

    register(registerInfo);
  };

  return (
    <Container className={styles.loginContainer}>
      <Card className={styles.cardWrapper}>
        <Card.Text className="text-center pt-5 display-5">MYSTAGRAM</Card.Text>
        <Card.Text className="text-center pt-1">
          MyStagram은 소셜네트워크서비스 입니다. 환영합니다.
        </Card.Text>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  onClick={handleDuplicateCheck}
                >
                  <Button variant="primary">중복확인</Button>
                </Form.Group>
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
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!isValidEmail || !isValidPassword}
            >
              가입하기
            </Button>
            <span className={styles.orText}>또는</span>
            <a href="/login" className={styles.register}>
              로그인 화면으로
            </a>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
