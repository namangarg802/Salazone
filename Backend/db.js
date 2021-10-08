const mongoose = require("mongoose");
const mongoURL =
  "mongodb://localhost:27017/Makeup?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to mongo sucessfully");
  });
};
module.exports = connectToMongo;
