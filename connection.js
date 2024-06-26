const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const DB = process.env.MONGOURL;
mongoose
  .connect(DB)
  .then(() => {
    console.log(`connected`);
  })
  .catch((err) => {
    console.log(`not connect`);
  });
