const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://naman:JJvUYhtDw2B2h96C@cluster0.n0wct.mongodb.net/Salazone?retryWrites=true&w=majority";
// JJvUYhtDw2B2h96C
const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Connected to mongo sucessfully");
  });
};
module.exports = connectToMongo;
