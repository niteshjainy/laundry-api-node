const mongoose = require("mongoose");
const baseSchema = require("./Base");
const shopSchema = new mongoose.Schema({
  shopName: {
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
  ownerName: {
    type: String,
    require: true,
  },
  openTime: {
    type: String,
    require: true,
  },
  closeTime: {
    type: String,
    require: true,
  },
  isOpen: {
    type: Boolean,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    require: true,
  },
  closeMsg: {
    type: String,
    require: true,
  },

  baseFields: baseSchema,
});

mongoose.model("Shop", shopSchema);
