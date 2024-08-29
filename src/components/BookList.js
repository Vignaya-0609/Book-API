import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BookModal from './BookModal'; 
function BookList({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleShow = (book) => setSelectedBook(book);
  const handleClose = () => setSelectedBook(null);

  return (
    <Container className="mt-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book, idx) => (
          <Col key={idx}>
            <Card style={{ height: "370px" }}>
              <Card.Img 
                variant="top" 
                src={book.volumeInfo.imageLinks?.thumbnail || "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D"} 
                alt={book.volumeInfo.title} 
                className='book-img'
              />
              <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title className='fs-6 text-center'>{book.volumeInfo.title}</Card.Title>
                <Card.Text>
                  <Button variant="dark" onClick={() => handleShow(book)} className='w-100'>
                    More
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Render the modal and pass the selected book and close handler */}
      <BookModal book={selectedBook} handleClose={handleClose} />
    </Container>
  );
}

export default BookList;
