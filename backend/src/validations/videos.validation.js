const Joi = require("joi");
const config = require('../config/config');
const { objectId, genres, videoLink } = require("./custom.validation");


const getVideos = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.string(),
        sortBy: Joi.string().valid(...config.sort_by_options),
        contentRating: Joi.string().valid(...config.ratings),
    }),
};

const getVideoById = {
    params: Joi.object().keys({
        videoId: Joi.string().required().custom(objectId),
    }),
};

const videoUpload = {
    body: Joi.object().keys({
        videoLink: Joi.string().custom(videoLink).required(),
        title: Joi.string().required(),
        genre: Joi.string().required().custom(genres),
        contentRating: Joi.string().valid(...config.ratings).required(),
        releaseDate: Joi.string().required(),
        previewImage: Joi.string().required(),
    }),
};

module.exports = {
  getVideos,
  getVideoById,
  videoUpload,
};