const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  utc_time: { type: String, required: true },
  operation: { type: String, required: true },
  base_coin: { type: String, required: true },
  quote_coin: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("InsertCsvDatas", DataSchema);
