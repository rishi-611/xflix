import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import baseUrl from "../config/ipConfig";
import Spinner from "./Spinner";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import "./videos.css";

const Videos = () => {
  const [videosData, setVideosData] = useState({
    videos: [],
    loading: false,
    error: {
      status: false,
      message: "",
    },
  });

  useEffect(() => {
    //on page load, if data is not loaded already, load it
    if (videosData.loading || videosData.videos.length > 0) return;

    updateVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch(baseUrl + "/v1/videos");
      const data = await res.json();
      return { error: null, videos: data.videos };
    } catch (error) {
      return { videos: null, error };
    }
  };

  const updateVideos = async () => {
    //set loading to true
    setVideosData((videosData) => ({
      ...videosData,
      loading: true,
    }));

    //fetch data
    const { error, videos } = await fetchVideos();

    //update state with data
    if (error) {
      //update error
      setVideosData({
        videos: [],
        loading: false,
        error: {
          status: false,
          message: "",
        },
      });
    } else {
      //update videos in state
      setVideosData({
        videos,
        loading: false,
        error: {
          status: false,
          message: "Failed to fetch videos!",
        },
      });
    }
  };
  const renderVideos = () =>
    videosData.videos.map((video) => (
      <Col md="6" lg="3" key={video._id} className="mb-3   ">
        <Link to={`/video/${video._id}`} className="video-tile-link">
          <div className="card bg-dark text-light" className="video-tile">
            <img
              className="card-img-top"
              src={video.previewImage}
              alt="video thumbnail"
            />
            <div className="card-body">
              <h6 className="card-title">{video.title}</h6>
              <p className="card-text">{format(video.releaseDate)}</p>
            </div>
          </div>
        </Link>
      </Col>
    ));

  return (
    <div className="pt-4 bg-dark text-light">
      <Container>
        {videosData.loading ? <Spinner /> : <Row>{renderVideos()}</Row>}
      </Container>
    </div>
  );
};

export default Videos;
