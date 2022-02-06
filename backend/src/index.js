const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const colors = require("colors/safe");

let server;

// connect to database
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => console.log(colors.blue.bold(`database running at  ${config.mongoose.url}`)))
  .catch((err) => {
    console.log(colors.red.bold("could not connect to database"))
    console.log(colors.red(config.mongoose.url))
    console.log(err);
  });


//create server
app.listen(config.port, (err)=>{
  if(err){
    return console.log(colors.red.bold("could not start server"));
  } 

  console.log(colors.yellow.bold(`server listening on port  ${config.port}`));
})

const exitHandler = () => {
  console.log("exiting")
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error)
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("sigterm received");
  if (server) {
    server.close();
  }
});
