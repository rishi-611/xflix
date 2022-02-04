import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { availableGenres, availableRatings } from "../config/data";

import "./genrePanel.css";

const GenrePanel = () => {
  const [genres, setGenres] = useState(["all genres"]);
  const [contentRating, setContentRating] = useState("any age group");
  const [sortBy, setSortBy] = useState("Release Date");

  const updateGenre = (e) => {
    const genre = e.target.innerText.toLowerCase();
    const isAlreadyActive =
      e.target.getAttribute("data-genre-toggle") === "on" ? true : false;

    if (isAlreadyActive) {
      //remove genre from active genres and turn off active tag
      setGenres((genres) =>
        genres.filter((activeGenre) => activeGenre !== genre)
      );
      e.target.setAttribute("data-genre-toggle", "off");
    } else {
      //add genre in active genres and turn on active tag
      setGenres((genres) => [...genres, genre]);
      e.target.setAttribute("data-genre-toggle", "on");
    }
  };

  const updateRating = (e) =>
    setContentRating(e.target.innerText.toLowerCase());

  const updateSortBy = (e) => setSortBy(e.target.value);

  
  //checks if the genre is present in genre statelist
  const isActiveGenre = (genre) => {
    return genres.indexOf(genre.toLowerCase()) !== -1;
  };

  const renderGenreBtns = () => (
    <>
      {availableGenres.map((genre) => (
        <div className="col-2" key={genre}>
          <button
            type="button"
            className={`btn panel-btn genre-btn ${
              isActiveGenre(genre.toLowerCase()) ? "active-panel-btn" : ""
            }`}
            data-genre-toggle="off"
            onClick={updateGenre}
          >
            {genre}
          </button>
        </div>
      ))}
    </>
  );

  const renderRatingBtns = () => (
    <>
      {availableRatings.map((rating) => (
        <div className="col-2" key={rating}>
          <button
            type="button"
            className={`btn panel-btn content-rating-btn ${
              rating.toLowerCase() === contentRating ? "active-panel-btn" : ""
            }`}
            onClick={updateRating}
          >
            {rating}
          </button>
        </div>
      ))}
    </>
  );


  return (
    <div className="bg-dark-custom text-light py-3">
      <Container>
        <Row>
          <div className="col-8 offset-2">
            <Row>
              <div className="col-2 offset-1">
                <button
                  type="button"
                  className={`btn panel-btn genre-btn ${
                    isActiveGenre("all genres") ? "active-panel-btn" : ""
                  }`}
                  data-genre-toggle="on"
                  onClick={updateGenre}
                >
                  All Genres
                </button>
              </div>
              {renderGenreBtns()}
            </Row>
          </div>
          <div className="col-2">
            <select
              className="form-select sortBy-select sort-select"
              aria-label="Default select example"
              defaultValue="release-date-option"
              onChange={updateSortBy}
            >
              <option
                id="release-date-option"
                className="my-2"
                value="Release Date"
              >
                Release Date
              </option>
              <option
                id="view-count-option"
                className="my-2"
                value="View Count"
              >
                View Count
              </option>
            </select>
          </div>
        </Row>
        <Row className="mt-4">
          <div className="col-6 offset-3">
            <Row>
              <div className="col-4">
                <button
                  type="button"
                  className={`btn panel-btn content-rating-btn ${
                    "any age group".toLowerCase() === contentRating
                      ? "active-panel-btn"
                      : ""
                  }`}
                  onClick={updateRating}
                >
                  Any age group
                </button>
              </div>
              {renderRatingBtns()}
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default GenrePanel;
