import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BookModal({ book, handleClose }) {
  return (
    <Modal show={!!book} onHide={handleClose} className='modal-lg'>
      <Modal.Header closeButton>
        <Modal.Title>{book?.volumeInfo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "justify" }}>
        <p><strong>Author:</strong> {book?.volumeInfo.authors?.join(', ') || "Unknown"}</p>
        <p><strong>Category:</strong> {book?.volumeInfo.categories?.join(', ') || "Unknown"}</p>
        <p><strong>Published Year:</strong> {book?.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.split('-')[0] : "Not available"}</p>
        <p><strong>Description:</strong> {book?.volumeInfo.description || "No description available."}</p>
        <div className='d-flex align-items-center justify-content-center'>
          <Button variant="dark" href={book?.volumeInfo.infoLink} target="_blank">More Info</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default BookModal;
