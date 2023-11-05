const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URL);
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDb;
