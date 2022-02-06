const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const videoService = require("../services/videos.service");

const getAllVideos = catchAsync(async (req, res) => {
  const { title, genres, contentRating, sortBy } = req.query;

  const videos = await videoService.getAllVideos(
    title,
    genres,
    contentRating,
    sortBy
  );

  res.status(httpStatus.OK).send({
    videos: videos,
  });
});

const getVideoById = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  const video = await videoService.getVideoById(videoId);

  if (!video)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No video is found with matching videoId"
    );

  res.status(httpStatus.OK).send(video);
});

const postVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);

  res.status(httpStatus.CREATED).send(video);
});

const updateVotes = catchAsync(async (req, res) => {

  const { vote, change } = req.body;

  const { videoId } = req.params;

  const changeFactor = change === "decrease" ? -1 : 1;

  console.log(req.body)
  if (vote === "upVote") {
    console.log("upvoting")
    await videoService.updateVideoUpVotes(videoId, changeFactor);
  } else if (vote == "downVote") {
    await videoService.updateVideoDownVotes(videoId, changeFactor);
  }

  res.status(httpStatus.NO_CONTENT).send();
});

const incrementViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;

  await videoService.incrementVideoViews(videoId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllVideos,
  getVideoById,
  postVideo,
  updateVotes,
  incrementViews,
};
