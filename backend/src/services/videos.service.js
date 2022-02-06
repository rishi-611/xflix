const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { Video } = require("../models/videos.model");

const getAllVideos = async (title, genres, contentRating, sortBy) => {
  const filters = {};

  if (title) {
    filters.title = new RegExp(title, "i"); //search for this pattern in documents
  }

  if (genres) {
    genres = genres.split(",");
    //no filters if All is one of the genres
    if (!genres.includes(config.genre_all)) filters.genre = { $in: genres };
  }

  if (contentRating && contentRating!==config.ratings_anyone) {
    let ratings = config.ratings;
    let indexOfRating = ratings.indexOf(contentRating);
    
    // if we have a valid rating
    if(indexOfRating !== -1){
      //according to api docs
        let ratingsSubset = ratings.splice(0, indexOfRating + 1);
        filters.contentRating = {$in: ratingsSubset};

        //to pass tests
        // filters.contentRating = {$in: [contentRating]};
    }

}

  if (!sortBy || sortBy === "releaseDate") {
    const result = await Video.aggregate([
      { $match: filters },
      { $sort: { releaseDate: -1 } },
    ]);
    return result;
  } else if (sortBy == "viewCount") {
    const result = await Video.aggregate([
      { $match: filters },
      { $sort: { viewCount: -1 } },
    ]);
    return result;
  }
};

const getVideoById = async (id) => {
  const video = await Video.findById(id);

  if (!video)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No video is found with matching id"
    );

  return video;
};

const createVideo = async (body) => {
  const video = await Video.create(body);
  return video;
};

const updateVideoUpVotes = async (videoId, changeBy) => {
  const video = await getVideoById(videoId);
  video.votes = {
    upVotes: Number(video.votes.upVotes) + Number(changeBy),
    downVotes: video.votes.downVotes,
  };
  await video.save();
};

const updateVideoDownVotes = async (videoId, changeBy) => {
  const video = await getVideoById(videoId);
  video.votes = {
    upVotes: video.votes.upVotes,
    downVotes: Number(video.votes.downVotes) + Number(changeBy),
  };
  await video.save();
};

const incrementVideoViews = async (videoId) => {
  const video = await getVideoById(videoId);

  video.viewCount++;
  await video.save();
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideoUpVotes,
  updateVideoDownVotes,
  incrementVideoViews,
};
