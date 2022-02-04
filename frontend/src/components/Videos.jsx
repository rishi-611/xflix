import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import baseUrl from "../config/ipConfig";
import Spinner from "./Spinner";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./videos.css";

const Videos = () => {
  const query = useSelector((state) => state.query);

  const [videosData, setVideosData] = useState({
    videos: [],
    loading: false,
    error: {
      status: false,
      message: "",
    },
  });

  useEffect(() => {
    //reload data when query is updated

    //if some data is already loading, then return
    if (videosData.loading) return;

    updateVideos(generateQuery(query)); //provide the query for fetch
  }, [query]);

  //converts object key val pairs to query
  const generateQuery = (query) => {
    let qs = "?";

    for (const key in query) {
      if (query[key].length) {
        qs += `${key}=${query[key]}&`;
      }
    }

    //remove last end
    if(qs[qs.length-1] === "&") qs = qs.slice(0, qs.length-1);
    return qs;
  };

  const fetchVideos = async (queryString) => {
    try {
      const res = await fetch(baseUrl + "/v1/videos" + queryString);
      const data = await res.json();
      return { error: null, videos: data.videos };
    } catch (error) {
      return { videos: null, error };
    }
  };

  const updateVideos = async (queryString) => {
    //set loading to true
    setVideosData((videosData) => ({
      ...videosData,
      loading: true,
    }));

    //fetch data
    const { error, videos } = await fetchVideos(queryString);

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
