const Joi = require("joi");
const config = require('../config/config');
const { objectId, genres, videoLink } = require("./custom.validation");


const getVideos = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.string().custom(genres),
        sortBy: Joi.string().valid(...config.sort_by_options),
        contentRating: Joi.string().valid(...config.ratings),
    }),
};

const getVideoById = {
    params: Joi.object().keys({
        videoId: Joi.string().required().custom(objectId),
    }),
};

const postVideo = {
    body: Joi.object().keys({
        videoLink: Joi.string().custom(videoLink).required(),
        title: Joi.string().required(),
        genre: Joi.string().required().valid(...config.genre_types),
        contentRating: Joi.string().valid(...config.ratings).required(),
        releaseDate: Joi.string().required(),
        previewImage: Joi.string().required(),
    }),
};

const updateVotes = {
    body: Joi.object().keys({
        vote: Joi.string().required().valid(...config.voteTypes),
        change: Joi.string().required().valid(...config.voteMethods)
    })
}

module.exports = {
  getVideos,
  getVideoById,
  postVideo,
  updateVotes
};