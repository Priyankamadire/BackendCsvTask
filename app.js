const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uploadRoute = require("./routes/Upload");
const gettimedetailRouter = require("./routes/gettimedetail");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
console.log(process.env.PORT);
app.use(cors());
app.use(bodyParser.json());
app.use(require("./routes/Upload"));

app.use(require("./routes/gettimedetail"));
require("./connection");
app.get("/", (req, res) => {
  res.send("Hello This is Assignment");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
