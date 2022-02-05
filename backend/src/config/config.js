const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

// genres types allowed
const GENRE_TYPE_EDUCATION = "Education";
const GENRE_TYPE_SPORTS = "Sports";
const GENRE_TYPE_MOVIES = "Movies";
const GENRE_TYPE_COMEDY = "Comedy";
const GENRE_TYPE_LIFESTYLE = "Lifestyle";
const GENRE_TYPE_ALL = "All";

// ratings types allowed
const RATINGS_7_PLUS = "7+";
const RATINGS_12_PLUS = "12+";
const RATINGS_16_PLUS = "16+";
const RATINGS_18_PLUS = "18+";
const RATINGS_ANYONE = "Anyone";

//valid sort options
const SORT_BY_RELEASE_DATE = "releaseDate",
const SORT_BY_VIEW_COUNT = "viewCount"


// votes default values
const DEFAULT_VOTES = {
  upVotes: 0,
  downVotes: 0,
};

//video link regex
const VIDEO_LINK_REGEX = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/gm;

const DEFAULT_VIEW_COUNT = 0;

module.exports = {
  genre_types: [
    GENRE_TYPE_EDUCATION,
    GENRE_TYPE_SPORTS,
    GENRE_TYPE_LIFESTYLE,
    GENRE_TYPE_MOVIES,
    GENRE_TYPE_COMEDY,
    GENRE_TYPE_ALL,
  ],

  genre_education: GENRE_TYPE_EDUCATION,
  genre_sports: GENRE_TYPE_SPORTS,
  genre_movies: GENRE_TYPE_MOVIES,
  genre_comedy: GENRE_TYPE_COMEDY,
  genre_lifestyle: GENRE_TYPE_LIFESTYLE,
  genre_all: GENRE_TYPE_ALL,

  ratings: [
    RATINGS_7_PLUS,
    RATINGS_12_PLUS,
    RATINGS_16_PLUS,
    RATINGS_18_PLUS,
    RATINGS_ANYONE,
  ],
  ratings_anyone: RATINGS_ANYONE,
  ratings_7_plus: RATINGS_7_PLUS,
  ratings_12_plus: RATINGS_12_PLUS,
  ratings_16_plus: RATINGS_16_PLUS,
  ratings_18_plus: RATINGS_18_PLUS,
  ratings_anyone: RATINGS_ANYONE,

  sort_by_options: [
    SORT_BY_RELEASE_DATE,
    SORT_BY_VIEW_COUNT
  ],
  

  videoLinkRegex: VIDEO_LINK_REGEX,

  default_votes: DEFAULT_VOTES,
  default_view_count: DEFAULT_VIEW_COUNT,

  port: process.env.BACKEND_PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
