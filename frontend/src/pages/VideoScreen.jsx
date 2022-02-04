import React from "react";
import Videos from "../components/Videos";

import "./videoScreen.css";

const VideoScreen = () => {
  return (
    <div className="bg-dark text-light">
      <div>Video</div> 
      <Videos />
    </div>
  );
};

export default VideoScreen;
