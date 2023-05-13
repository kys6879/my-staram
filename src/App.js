import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
function App() {
  return (
    <div>
      <Card>
        MyService
        <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="아이디를 입력해주세요." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="패스워드를 입력해주세요." />
          </Form.Group>

          <Button variant="primary">입장하기</Button>{' '}
        </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
