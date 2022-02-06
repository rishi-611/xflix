const express = require("express");
const validate = require("../../middlewares/validate");
const videoController = require("../../controllers/videos.controller");
const videoValidation = require("../../validations/videos.validation");

const router = express.Router();

router.get(
  "/",
  validate(videoValidation.getVideos),
  videoController.getAllVideos
);

router.get(
  "/:videoId",
  validate(videoValidation.getVideoById),
  videoController.getVideoById
);

router.post(
  "/",
  validate(videoValidation.postVideo),
  videoController.postVideo
);

router.patch(
  "/:videoId/views",
  validate(videoValidation.getVideoById),
  videoController.incrementViews
);

router.patch(
  "/:videoId/votes",
  validate(videoValidation.getVideoById),
  validate(videoValidation.updateVotes),
  videoController.updateVotes
);

module.exports = router;
