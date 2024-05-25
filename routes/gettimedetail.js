// routes/gettimedetail.js
const express = require("express");
const router = express.Router();
const Transaction = require("../models/InsertCsvData");
const moment = require("moment");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.post("/asset/balance", async (req, res) => {
  const { timestamp } = req.body;

  // Validate timestamp format
  if (!moment(timestamp, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
    return res.status(400).json({ error: "Invalid timestamp format" });
  }

  try {
    // Fetch transactions before the given timestamp
    const transactions = await Transaction.find({
      utc_time: { $lt: new Date(timestamp) },
    });

    console.log("Fetched transactions:", transactions); // Debugging output

    const balances = {};

    // Calculate asset-wise balance
    transactions.forEach((transaction) => {
      const asset = transaction.base_coin;
      if (
        moment(transaction.utc_time).isBefore(timestamp) &&
        ["Buy", "Sell"].includes(transaction.operation)
      ) {
        if (transaction.operation === "Buy") {
          balances[asset] =
            (balances[asset] || 0) + parseInt(transaction.amount);
        } else if (transaction.operation === "Sell") {
          balances[asset] =
            (balances[asset] || 0) - parseInt(transaction.amount);
        }
      }
    });

    console.log("Calculated balances:", balances); // Debugging output

    // Filter out assets with zero balance
    const nonZeroBalances = Object.fromEntries(
      Object.entries(balances).filter(([_, balance]) => balance !== 0)
    );

    res.json(nonZeroBalances);
  } catch (error) {
    console.error("Error fetching transactions:", error); // Debugging output
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
