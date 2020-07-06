const mongoose = require("mongoose");
const baseSchema = require("./Base");

const billSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  deliverCharge: {
    type: Number,
  },
  pickupCharge: {
    type: Number,
  },
  urgentCharge: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
  },
  baseFields: baseSchema,
});

mongoose.model("Bill", billSchema);
