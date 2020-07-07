const mongoose = require("mongoose");
const baseSchema = require("./Base");

const requestSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  numberOfPiece: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  isUrgent: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isDeliveryNeeded: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  baseFields: baseSchema,
});

mongoose.model("Request", requestSchema);
