const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
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
      default: 0,
    },
    pickupCharge: {
      type: Number,
      default: 0,
    },
    urgentCharge: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.model("Bill", billSchema);
