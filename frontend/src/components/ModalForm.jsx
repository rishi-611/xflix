import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  availableGenres,
  availableRatings,
  youtubeURLRegex,
} from "../config/data";
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import baseUrl from "../config/ipConfig";
import "react-datepicker/dist/react-datepicker.css";

const ModalForm = (props) => {
  const [formData, setFormData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: null,
    previewImage: "",
  });

  const [isLinkValid, setIsLinkValid] = useState(true);

  //make post request and return response
  const postVideo = async (formData)=>{
      const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      }
    try {
        const res = await fetch(baseUrl + "/v1/videos",  options);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
  }

  const handleChange = (e) =>
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));

  const handleDateChange = (date) =>
    setFormData((formData) => ({
      ...formData,
      releaseDate: date,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate video link
    const isLinkValid = youtubeURLRegex.test(formData.videoLink); //validate video link
    if (!isLinkValid) {
      setIsLinkValid(false);
      return;
    } else {
      setIsLinkValid(true);
    }

    //format release date to dd mmm yyyy format
    const releaseDateFormatted = dateFormat(
      formData.releaseDate,
      "dd mmm yyyy"
    );
    
    const formattedFormData = {
        ...formData,
        releaseDate: releaseDateFormatted
    }

    //trigger post request
    const response = await postVideo(formattedFormData);
    console.log(response);

    //close modal
    props.onHide();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* VIDEO LINK */}
      <Form.Group className="mb-3" controlId="upload-btn-video">
        <Form.Control
          type="text"
          placeholder="Video Link"
          className={`modal-input ${isLinkValid ? "" : "border border-danger"}`}
          name="videoLink"
          value={formData.videoLink}
          onChange={handleChange}
          required
        />
        {/* display label / error warning */}
        <Form.Label className="ps-2 modal-label">
          {isLinkValid ? (
            "This link will be used to derive the video"
          ) : (
            <span className="text-danger fw-bold">
              Video link should be in format:{" "}
              <span>youtube.com/embed/"video-id"</span>
            </span>
          )}
        </Form.Label>
      </Form.Group>

      {/* THUMBNAIL */}
      <Form.Group className="mb-3" controlId="upload-btn-image">
        <Form.Control
          type="text"
          placeholder="Thumbnail Image Link"
          className="modal-input"
          name="previewImage"
          value={formData.previewImage}
          onChange={handleChange}
          required
        />
        <Form.Label className="ps-2  modal-label">
          This link will be used to preview the thumbnail image
        </Form.Label>
      </Form.Group>

      {/* TITLE */}
      <Form.Group className="mb-3" controlId="upload-btn-title">
        <Form.Control
          type="text"
          placeholder="Title"
          className="modal-input"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Form.Label className="ps-2  modal-label">
          This title will be the representative text for video
        </Form.Label>
      </Form.Group>

      {/* GENRE */}
      <Form.Group className="mb-3" controlId="upload-btn-genre">
        <Form.Select
          aria-label="Default select example"
          className="modal-genre-select"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        >
          <option>Genre</option>
          {availableGenres.map((genre) => (
            <option value={genre} key={genre} className="modal-genre-options">
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

      {/* CONTENT RATING */}
      <Form.Group className="mb-3" controlId="upload-btn-content-rating">
        <Form.Select
          aria-label="Default select example"
          className="modal-rating-select"
          name="contentRating"
          value={formData.contentRating}
          onChange={handleChange}
          required
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

      {/* RELEASE DATE */}
      <Form.Group className="mb-3">
        <DatePicker
          selected={formData.releaseDate}
          placeholderText="Release Date"
          maxDate={new Date()}
          onChange={handleDateChange}
          className="modal-datepicker"
          id="upload-btn-release-date"
          required
        />
        <Form.Label className="ps-2  modal-label">
          This will be used to sort videos
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Button type="submit" variant="danger" id="upload-btn-submit">
          Upload Video
        </Button>
        <Button
          type="button"
          variant="link"
          className="modal-cancel"
          id="upload-btn-cancel"
          onClick={props.onHide}
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ModalForm;
