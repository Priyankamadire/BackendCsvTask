const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Trade = require("../models/InsertCsvData");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("File upload endpoint hit");
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      console.log("Reading CSV data:", data);
      const [base_coin, quote_coin] = data.Market.split("/");
      const trade = new Trade({
        utc_time: data.UTC_Time,
        operation: data.Operation,
        base_coin,
        quote_coin,
        amount: parseFloat(data["Buy/Sell Amount"]),
        price: parseFloat(data.Price),
      });
      results.push(trade);
    })
    .on("end", async () => {
      console.log("Finished reading CSV file");
      try {
        await Trade.insertMany(results);
        console.log("Data inserted into database");
        fs.unlinkSync(req.file.path);
        res.send("File uploaded and data stored");
      } catch (error) {
        console.error("Error inserting data into database:", error);
        res.status(500).send("Internal Server Error");
      }
    })
    .on("error", (err) => {
      console.error("Error reading CSV file:", err);
      res.status(500).send("Error processing file");
    });
});

router.get("/mydata", async (req, res) => {
  try {
    const trades = await Trade.find({});
    res.json(trades);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
