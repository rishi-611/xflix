import React, { useState, useEffect } from "react";
import baseUrl from "../config/ipConfig";
import Spinner from "./Spinner";
import { format } from "timeago.js";

const VideoPlayer = ({ videoId }) => {
  const [videoDetails, setVideoDetails] = useState({
    video: null,
    loading: false,
    error: {
      status: false,
      message: "",
    },
  });

  const { video } = videoDetails;

  //fetch the video on page load
  useEffect(() => {
    updateVideo();
  }, []);

  //fetches video
  const fetchVideo = async (videoId) => {
    try {
      const res = await fetch(baseUrl + "/v1/videos/" + videoId);

      if (res.status === 404) {
        return {
          video: null,
          error: {
            status: true,
            message: "video not found",
          },
        };
      }

      const data = await res.json();
      return {
        video: data,
        error: null,
      };
    } catch (error) {
      return {
        video: null,
        error: {
          status: true,
          message: "could not fetch video",
        },
      };
    }
  };

  //triggers fetch, and updates state
  const updateVideo = async () => {
    setVideoDetails((videoDetails) => ({
      ...videoDetails,
      loading: true,
    }));

    const response = await fetchVideo(videoId);
    if (response.video) {
      setVideoDetails({
        video: response.video,
        loading: false,
        error: {
          status: false,
          message: "",
        },
      });
    } else {
      setVideoDetails({
        video: null,
        loading: false,
        error: response.error,
      });
    }
  };

  console.log(videoDetails);

  return (
    <div className="mb-3 video-outer-container">
      {videoDetails.loading && <Spinner />}
      {videoDetails.error.status && (
        <div className="alert alert-danger" role="alert">
          {videoDetails.error.message}
        </div>
      )}

      {/* video player */}
      {video && (
        <div className="container-fluid videoPlayer-box p-0">
          {/* video */}
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.${video.videoLink}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* details */}
          <div className="video-details my-3">
            <div className="row">
              <div className="col-lg-9">
                <h4>{video.title}</h4>
                <div className="row">
                  <div className="col-3 col-lg-2 video-details">
                    {" "}
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {video.contentRating}
                  </div>
                  <div className="col-4 col-lg-2 video-details">
                    {" "}
                    <i className="fas fa-compact-disc"></i> {video.genre}
                  </div>
                  <div className="col-5 video-details">
                    {" "}
                    <i className="far fa-clock"></i> {format(video.releaseDate)}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 d-flex align-items-center justify-content-end p-0 mt-2 mt-lg-0">
                <div className="row container-fluid p-0">
                  <div className="col-3 col-lg-6 p-0">
                    <button className="btn btn-primary votes-btn">
                      <i
                        className="fas fa-thumbs-up"
                        style={{ marginRight: "5px" }}
                      ></i>
                      {video.votes.upVotes}
                    </button>
                  </div>
                  <div className="col-3 col-lg-6 p-0">
                    <button className="btn btn-dark votes-btn">
                      <i
                        className="fas fa-thumbs-down"
                        style={{ marginRight: "5px" }}
                      ></i>
                      {video.votes.downVotes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="views-box my-1">{video.viewCount} views <i className="fas fa-eye"></i></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
