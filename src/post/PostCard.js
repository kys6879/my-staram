import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function PostCard() {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>글 제목</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">작성자</Card.Subtitle>
              <Card.Text>
                글 내용
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PostCard;