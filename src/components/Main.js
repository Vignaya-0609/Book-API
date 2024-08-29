import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { FaSearch } from 'react-icons/fa';
import BookList from './BookList';

function Main() {
  const REACT_APP_API_KEY=process.env.REACT_APP_API_KEY;
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      handleShow();
    } else {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
          params: {
            q: searchInput,
            key: REACT_APP_API_KEY,
          },
        });
        setSearchResults(response.data.items || []);
        console.log('Search results:', response.data.items);
      } catch (error) {
        console.error('Error fetching the search results:', error);
      }
    }
  };

  return (
    <Container 
      fluid 
      className="banner text-light">
      <Row className="text-center">
        <Col md={12}>
          <h1 className="text-center">BookWave</h1>
          <p className="fw-medium">Welcome to the BookWave API! Access thousands of books, authors, and genres through our extensive database.</p>
        </Col>
        <Col md={12} className="d-flex justify-content-center">
          <InputGroup className="mb-3 mt-3 w-50">
            <Form.Control
              placeholder="Search Books"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="outline-light" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Error Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter a search term before searching.</Modal.Body>
      </Modal>

      {/* Display BookList */}
      {searchResults.length > 0 && (
        <Row>
          <Col md={12}>
            <BookList books={searchResults} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Main;
