// server.js
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uploadRoute = require("./routes/Upload");
const gettimedetailRouter = require("./routes/gettimedetail"); // Import the new router
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
console.log(process.env.PORT);
app.use(cors());
app.use(bodyParser.json());
app.use(require("./routes/Upload"));
// app.use("/api", gettimedetailRouter); // Use the new router for asset-wise balance
app.use(require("./routes/gettimedetail"));
require("./connection");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const bodyParser = require("body-parser");
// const csv = require("csv-parser");
// const fs = require("fs");
// const moment = require("moment");

// const app = express();
// const PORT = 3000;

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Parse CSV file and store  data in memory
// let transactions = [];
// fs.createReadStream("trans.csv")
//   .pipe(csv())
//   .on("data", (row) => {
//     transactions.push(row);
//   })
//   .on("end", () => {
//     console.log("CSV file successfully processed.");
//   });

// // API Endpoint
// app.post("/asset/balance", (req, res) => {
//   const { timestamp } = req.body;

//   // Validate timestamp format
//   if (!moment(timestamp, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
//     return res.status(400).json({ error: "Invalid timestamp format" });
//   }

//   const balances = {};

//   // Calculate asset-wise balance
//   transactions.forEach((transaction) => {
//     if (moment(transaction.UTC_Time).isBefore(timestamp)) {
//       const [asset] = transaction.Market.split("/");
//       if (transaction.Operation === "Buy") {
//         balances[asset] =
//           (balances[asset] || 0) + parseInt(transaction["Buy/Sell Amount"]);
//       } else if (transaction.Operation === "Sell") {
//         balances[asset] =
//           (balances[asset] || 0) - parseInt(transaction["Buy/Sell Amount"]);
//       }
//     }
//   });

//   // Filter out assets with zero balance
//   const nonZeroBalances = Object.fromEntries(
//     Object.entries(balances).filter(([_, balance]) => balance !== 0)
//   );

//   res.json(nonZeroBalances);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
