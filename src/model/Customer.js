const mongoose = require("mongoose");
const baseSchema = require("./Base");

const customerSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },

  name: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    require: true,
  },
  baseFields: baseSchema,
});

mongoose.model("Customer", customerSchema);
