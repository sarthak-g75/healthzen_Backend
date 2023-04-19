const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery', false);
const mongoURI = process.env.MONGO_URI
const connectToMongo = () => {
    mongoose
      .connect(mongoURI, {
        dbName: "HealthZen",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to mongo");
      })
      .catch((err) => console.log(err.message));
};

module.exports = connectToMongo;
