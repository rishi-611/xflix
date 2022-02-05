const mongoose = require("mongoose");
const config = require("../config/config");

const videoSchema = new mongoose.Schema({
  videoLink: {
    trim: true,
    type: String,
    required: true,
    validate(value) {
      if (!value.match(config.videoLinkRegex)) {
        throw new Error(
          "Invalvideo link should be of format: 'youtube.com/embed/<youtube-video-id>'"
        );
      }
    }
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  previewImage: {
    type: String,
    trim: true,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    enum: config.genre_types,
  },
  contentRating: {
    type: String,
    required: true,
    trim: true,
    enum: config.ratings,
  },
  releaseDate: {
    type: Date,
    required: true,
    trim: true,
  },

  votes: {
    type: {
      upVotes: Number,
      downVotes: Number,
    },
    required: true,
    default: config.default_votes,
  },
  viewCount: {
    type: Number,
    required: true,
    default: config.default_view_count,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports.Video = Video;
