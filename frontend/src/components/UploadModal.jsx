import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./uploadModal.css";
import { availableGenres, availableRatings } from "../config/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UploadModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="uploadModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="upload-btn-video">
            <Form.Control
              type="text"
              placeholder="Video Link"
              className="modal-input"
            />
            <Form.Label className="ps-2 modal-label">
              This link will be used to derive the video
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="upload-btn-image">
            <Form.Control
              type="text"
              placeholder="Thumbnail Image Link"
              className="modal-input"
            />
            <Form.Label className="ps-2  modal-label">
              This link will be used to preview the thumbnail image
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="upload-btn-title">
            <Form.Control
              type="text"
              placeholder="Title"
              className="modal-input"
            />
            <Form.Label className="ps-2  modal-label">
              This title will be the representative text for video
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3" controlId="upload-btn-genre">
            <Form.Select
              aria-label="Default select example"
              className="modal-genre-select"
            >
              <option>Genre</option>
              {availableGenres.map((genre) => (
                <option
                  value={genre}
                  key={genre}
                  className="modal-genre-options"
                >
                  {genre}
                </option>
              ))}
              <option className="modal-genre-options" value="any">
                None
              </option>
            </Form.Select>
            <Form.Label className="ps-2  modal-label">
              Genre will help in categorizing your video
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3" controlId="upload-btn-content-rating">
            <Form.Select
              aria-label="Default select example"
              className="modal-rating-select"
            >
              <option>Suitable age group for the clip</option>
              {availableRatings.map((rating) => (
                <option
                  value={rating}
                  key={rating}
                  className="modal-rating-options"
                >
                  {rating}
                </option>
              ))}
              <option className="modal-rating-options" value="any">
                Any
              </option>
            </Form.Select>
            <Form.Label className="ps-2  modal-label">
              Genre will help in categorizing your video
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <DatePicker
              //   selected={new Date()}
              placeholderText="Release Date"
              //   onChange={(date) => setDate(date)}
              //   onCalendarClose={handleCalendarClose}
              //   onCalendarOpen={handleCalendarOpen}
              className="modal-datepicker"
              id="upload-btn-release-date"
            />
            <Form.Label className="ps-2  modal-label">
              This will be used to sort videos
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="danger" id="upload-btn-submit">
              Upload Video
            </Button>
            <Button type="button" variant="link" className="modal-cancel" id="upload-btn-cancel" onClick={props.onHide}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default UploadModal;
