const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    address: {
      type: String,
      required: true,
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
      enum: ["REQUESTED", "ACCEPTED", "PICKEDUP", "PREPARED", "COMPLETED"],
      default: "REQUESTED",
    },
    requestType: {
      type: String,
      enum: ["WashOnly", "IronOnly", "WashAndIron"],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.model("Request", requestSchema);
