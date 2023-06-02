import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, FloatingLabel, Row, Form, Button } from 'react-bootstrap';
import PostCard from './PostCard';

function Post() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Feeds</h1>
          <p>MYSTAGRAM에서 사람들과 소통하세요.</p>
          <div className='mt-5'>
            <FloatingLabel controlId="floatingTextarea2" label="무슨 생각을 하고있나요?">
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <Button variant="primary" className="mt-3">공유히기</Button>
          </div>
        </Col>
      </Row>
      <Row>
        <PostCard />
      </Row>
    </Container>
  )
}

export default Post;