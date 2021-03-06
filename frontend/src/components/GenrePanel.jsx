import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { availableGenres, availableRatings } from "../config/data";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../store/actions/queryActions";

import "./genrePanel.css";

const GenrePanel = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);

  const [genres, setGenres] = useState(
    !query.genres.length
      ? ["all"] //if nothing else
      : query.genres.split(",").map((genre) => genre.toLowerCase()) //is state already has a query
  );
  const [contentRating, setContentRating] = useState(
    !query.contentRating.length ? "any" : decodeURIComponent(query.contentRating).toLowerCase()
  );
  const [sortBy, setSortBy] = useState("Release Date");

  //when any of the filters field change
  useEffect(() => {
    dispatch(updateFilters(getQuery()));
  }, [genres, contentRating, sortBy]);

  const toCamelCase = (str) => {
    let lower = str
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("");
    return lower;
  };

  const toLowerCamelCase = (str) => {
    let lower = toCamelCase(str);
    return lower[0].toLowerCase() + lower.slice(1);
  };

  const toUpperCamelCase = (str) => {
    let upper = toCamelCase(str);
    return upper[0].toUpperCase() + upper.slice(1);
  };

  //returns query to pass along with get videos request
  const getQuery = () => {
    let qsGenres = "",
      qsSortBy = "",
      qsRating = "";

    //sortby
    qsSortBy += toLowerCamelCase(sortBy);

    //genres
    if (genres.includes("all")) {
      qsGenres += "All";
    } else {
      const filteredGenres = genres.filter((genre) => genre !== "all");
      filteredGenres.forEach(
        (filteredGenre) => (qsGenres += toUpperCamelCase(filteredGenre) + ",")
      );
      //remove last comma
      if (qsGenres.length > 0)
        qsGenres = qsGenres.slice(0, qsGenres.length - 1);
    }

    //rating
    if (contentRating === "any") {
      qsRating = ""; //no need to add any filters
    } else {
      qsRating += encodeURIComponent(contentRating);
    }

    return {
      genres: qsGenres,
      contentRating: qsRating,
      sortBy: qsSortBy,
    };
  };

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
      <Container fluid="lg">
        <Row>
          <div className="col-12 col-lg-8 offset-lg-2">
            <Row>
              <div className="col-2 offset-1">
                <button
                  type="button"
                  className={`btn panel-btn genre-btn ${
                    isActiveGenre("all") ? "active-panel-btn" : ""
                  }`}
                  data-genre-toggle="on"
                  onClick={updateGenre}
                >
                  All
                </button>
              </div>
              {renderGenreBtns()}
            </Row>
          </div>
          <div className="col-12 col-lg-2 d-flex justify-content-center mt-2 mt-lg-0">
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
          <div className="col-10 offset-1 col-md-6 offset-md-3">
            <Row>
              <div className="col-2 offset-1">
                <button
                  type="button"
                  className={`btn panel-btn content-rating-btn ${
                    "any".toLowerCase() === contentRating
                      ? "active-panel-btn"
                      : ""
                  }`}
                  onClick={updateRating}
                >
                  Any
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
