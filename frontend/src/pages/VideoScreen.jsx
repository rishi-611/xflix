import React from "react";
import Videos from "../components/Videos";
import Header from "../components/Header";

import "./videoScreen.css";

const VideoScreen = () => {
  return (
    <>
      <Header />
      <div className="bg-dark text-light">
        <div>Video</div>
        <Videos />
      </div>
    </>
  );
};

export default VideoScreen;
