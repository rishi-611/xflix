import React from "react";
import { useParams } from "react-router-dom";
import Videos from "../components/Videos";
import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";

import "./videoScreen.css";

const VideoScreen = () => {
  const videoId = useParams().id;
  return (
    <>
      <Header />
      <div className="bg-dark text-light">
        <div className="container mt-3">
          <VideoPlayer videoId={videoId} />
          <Videos />
        </div>
      </div>
    </>
  );
};

export default VideoScreen;
