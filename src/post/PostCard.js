import React, { useState } from 'react';
import { Button, Card, Form, FloatingLabel } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart  } from 'react-icons/ai'; 

// props
const PostCard = ({ id, title, content, author, createdAt, onDelete, onEdit }) => {

    const [isEdit, setIsEdit] = useState(false);

    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);

    const [isLike, setIsLike] = useState(false);

    function handleDelete() {
        onDelete(id);
    }

    function handleEdit() {
        setIsEdit(true);
    }

    function handleEditComplete() {
        // 부모컴포넌트에서 서버와 통신
        onEdit(editedTitle,editedContent,id)
          .then( () => {
            console.log("isEdit을 false로 변경합니다.");
            setIsEdit(false);
          })
        .catch(error => {
            console.log(error);
        })
    }

    function handleLike() {
        setIsLike(!isLike) 
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {isEdit ?
                        <Form.Control type="text" placeholder="글 제목"
                            className='d-inline'
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            style={{ width: '350px' }} />
                        : <span> {title} </span>
                    }

                    <div style={{ float: 'right'}} className="align-self-end">
                        {
                            isEdit ? <Button variant='success' onClick={handleEditComplete}>완료</Button>
                                : <div style={{ display: 'flex', gap: '10px'}}>
                                    <Button onClick={handleEdit} variant='primary'>수정</Button>
                                    <Button onClick={handleDelete} variant='danger'>삭제</Button>
                                </div>
                        }
                    </div>
                </Card.Title>
                <Card.Text> 
                    {
                        isEdit ? 
                        <FloatingLabel controlId="floatingTextarea2"
                        label="무슨 생각을 하고 계신가요?">
                            <Form.Control
                                as="textarea"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel> : <span>{content}</span> 
                    }
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    작성자: {author}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    작성 시간: {createdAt}
                </Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                {
                    isLike ?
                     <AiFillHeart style={{cursor: 'pointer'}} onClick={handleLike} color='red' size={30} /> : 
                     <AiOutlineHeart style={{cursor: 'pointer'}} onClick={handleLike} color='red' size={30} />
                }
                <span className='p-2'>24만명이 이 글을 좋아합니다.</span>
            </Card.Footer>
        </Card>
    );
}

export default PostCard;