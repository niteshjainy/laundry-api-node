const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
  createdBy: {
    type: String,
  },
  modifiedBy: {
    type: String,
  },
  createdOn: {
    type: Number,
  },
  modifiedOn: {
    type: Number,
  },
});

module.exports = baseSchema;
