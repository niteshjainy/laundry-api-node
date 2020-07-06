const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Request = mongoose.model("Request");

router.get("/request/list", async (req, res) => {
  try {
    const request = await Request.find();
    res.status(200).send(request);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/request/register", async (req, res) => {
  const {
    shopId,
    customerId,
    numberOfPiece,
    description,
    isUrgent,
    status,
    isDeliveryNeeded,
    isDeleted,
    requestType,
    baseFields,
  } = req.body;

  const request = new Request({
    shopId,
    customerId,
    numberOfPiece,
    description,
    isUrgent,
    status,
    isDeliveryNeeded,
    isDeleted,
    requestType,
    baseFields,
  });
  try {
    await request.save();
    res.status(200).send(request);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
