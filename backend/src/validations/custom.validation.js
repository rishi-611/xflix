const config = require("../config/config");

//object id should be in the mongoose object id format
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

//genres can be out of these values only
const genres = (value, helpers) => {
  if (!value) return true;

  //all values seperated by commas must in genres string must be present in config genre types
  const isValid = value
    .split(",")
    .every((inputGenre) => config.genre_types.includes(inputGenre));

  if(isValid){
    return value;
  }else{
    return helpers.message("Genre must be one of " + config.genre_types.filter(type=>type!=="All"));
  }
};

const videoLink = (value, helpers) => {
  const videoLinkRegex = config.videoLinkRegex;

  if (!videoLinkRegex.test(value.trim())) {
    return helpers.message(
      "video link should be of format: 'youtube.com/embed/<youtube-video-id>'"
    );
  }

  return value;
};

module.exports = {
  objectId,
  genres,
  videoLink,
};
