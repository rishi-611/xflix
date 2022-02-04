import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearch } from "../store/actions/queryActions";
import UploadModal from "./UploadModal";

const HeaderForm = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSearch(search));
  };

  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="d-flex ms-auto me-auto" onSubmit={handleFormSubmit}>
          <input
            id="search-input"
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearchChange}
          />
          <button
            id="search-input-submit"
            className="btn btn-danger"
            type="submit"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <button
              id="upload-btn"
              className="btn btn-danger"
              type="button"
              onClick={() => setModalShow(true)}
            >
              Upload <i className="fas fa-upload"></i>
            </button>
            <UploadModal show={modalShow} onHide={() => setModalShow(false)} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderForm;
