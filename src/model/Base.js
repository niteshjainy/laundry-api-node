const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
  createdBy: {
    type: String,
  },
  modifiedBy: {
    type: String,
  },
  createdOn: {
    type: String,
  },
  modifiedOn: {
    type: String,
  },
});

module.exports = baseSchema;
