const mongoose = require("mongoose");
const baseSchema = require("./Base");

const requestSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  customerId: {
    type: mongoose.mongoose.Schema.Types.ObjectId,
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
  },
  status: {
    type: String,
  },
  isDeliveryNeeded: {
    type: Boolean,
  },
  isDeleted: {
    type: Boolean,
  },
  requestType: {
    type: String,
    required: true,
  },
  baseFields: baseSchema,
});

mongoose.model("Request", requestSchema);
