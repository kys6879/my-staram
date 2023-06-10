import React from 'react';
import { Button, Card } from 'react-bootstrap';

// props
const PostCard = ({ id, title, content, author, createdAt, onDelete }) => {

    function handleDelete() {
        onDelete(id);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {title}
                    <div style={{ float: 'right' }} className="align-self-end">
                        <Button onClick={handleDelete} variant='danger'>삭제</Button>
                    </div>
                </Card.Title>
                <Card.Text>{content}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                    작성자: {author}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    작성 시간: {createdAt}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default PostCard;