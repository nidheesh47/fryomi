require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const response = await mongoose.connect(mongoUri);
    console.log("DB connect successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { PORT, connectDB };