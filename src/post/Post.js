import React, { useState } from 'react';
import { Container, FloatingLabel, Row, Form, Button, Col } from 'react-bootstrap';
import { getCurrentUser } from '../auth/tokenService'
// 사용자들이 쓴 글이 보여지고
// 여기서 글 작성도 가능
// 여기서 마이페이지도 이동
// 여기서 로그아웃도 가능

function Post() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const displayNickname = getCurrentUser().nickname;

    function handleSubmit(e) {
        e.preventDefault(); // submit이 될 때 페이지 이동이 되는것을 막아줍니다.

        const postInfo = {
            title: title,
            content: content,
            userId: getCurrentUser().id, // getCurrentUser는 토큰 값
        };

        // 이후 서버통신
        fetch('http://localhost:4000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(postInfo)
        })
        .then(response => response.json())
        .then(json => console.log(json));
    }

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col xs={4} sm={5} md={6}>
                    <div>
                        <span className='bold p-2' style={{ fontSize: '32px' }}>
                            {displayNickname}
                        </span>님.
                        반갑습니다.
                    </div>
                    <hr className="my-3" />
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="제목"
                            className="mb-3">
                            <Form.Control
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingTextarea2"
                            label="무슨 생각을 하고 계신가요?">
                            <Form.Control
                                as="textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>

                        <Button className='mt-3' variant="primary"
                            type="submit" > 게시하기
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Post;