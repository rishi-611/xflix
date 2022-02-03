import React from "react";
import { Container, Row } from "react-bootstrap";
import { availableGenres, availableRatings } from "../config/data";

import "./genrePanel.css";

const GenrePanel = () => {
  const renderGenreBtns = () => (
    <>
      {availableGenres.map((genre) => (
        <div className="col-2">
          <button type="button" className="btn btn-light panel-btn genre-btn">
            {genre}
          </button>
        </div>
      ))}
    </>
  );

  const renderRatingBtns = () => (
    <>
      {availableRatings.map((rating) => (
        <div className="col-2">
          <button type="button" className="btn btn-light panel-btn content-rating-btn">
            {rating}
          </button>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-dark text-light py-3">
      <Container>
        <Row>
          <div className="col-8 offset-2">
            <Row>
              <div className="col-2 offset-1">
                <button type="button" className="btn btn-light panel-btn genre-btn active-panel-btn">
                  All Genres
                </button>
              </div>
              {renderGenreBtns()}
            </Row>
          </div>
          <div className="col-2"></div>
        </Row>
        <Row className="mt-4">
          <div className="col-6 offset-3">
            <Row>
              <div className="col-4">
                <button type="button" className="btn btn-light panel-btn content-rating-btn active-panel-btn">
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
