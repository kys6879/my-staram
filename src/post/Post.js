import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, FloatingLabel, Row, Form, Button, Col } from 'react-bootstrap';
import { getCurrentUser } from '../auth/tokenService';
import PostCard from './PostCard';

// 사용자들이 쓴 글이 보여지고
// 여기서 글 작성도 가능
// 여기서 마이페이지도 이동
// 여기서 로그아웃도 가능

function Post() {
    // useState의 전달되는 값은 상태의 default값임.
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [posts, setPosts] = useState([]);

    const displayNickname = getCurrentUser().nickname;

    // 1
    const fetchPosts = () => {
        // 최근순 글 불러오기
        fetch("http://localhost:4000/posts")
          .then(response => response.json())
          .then(json => setPosts(json.data));
    }

    // 2번째 argumnet에는 비어있는 배열을 넘긴다 => callback 함수는 컴포넌트가 처음
    // 그려지고 최초 1번 실행됨.
    useEffect( () => {
        // 2
        fetchPosts();
    }, [] );

    // 서버랑 통신해서 글들을 불러온다.

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
        .then(json => {
            if (json.error) {
                if (json.error === 'INVALID PARAMETER') {
                    toast('INVALID PARAMETER. 모두 입력 해주세요.');
                    return ;
                }
                toast('서버와의 통신이 불안정합니다.');
                return;
            }
            toast('글이 작성되었어요.');
        })
        .then(() => {
            // 3
            fetchPosts();
            setTitle('');
            setContent('');
        });
    }

    function handleDelete(postId) {
        console.log("삭제버튼이 눌렸습니당 데이터는 :",postId);
    }

    return (
        <Container>
            <ToastContainer />
            
            {/* 글 작성 */}
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

            {/* 글 조회 */}
            <Row className="justify-content-center mt-4">
                <Col xs={4} sm={5} md={6}>
                    { 
                    // posts 안에는 post가 여러개 
                      posts.map( post => {
                        return (
                            <div key={post.posts_id} className='mb-4'>
                                <PostCard
                                    id={post.posts_id}
                                    onDelete={handleDelete}
                                    title={post.posts_title}
                                    content={post.posts_content}
                                    author={post.users_nickname}
                                    createdAt={post.posts_created_at}
                                />
                            </div>  
                        )
                      } )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Post;