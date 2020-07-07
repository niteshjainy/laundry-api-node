const mongoose = require("mongoose");
const baseSchema = require("./Base");

const billSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  deliveryCharge: {
    type: Number,
    required: true,
  },
  pickupCharge: {
    type: Number,
    required: true,
  },
  urgentCharge: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  baseFields: baseSchema,
});

mongoose.model("Bill", billSchema);
