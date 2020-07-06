const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Bill = mongoose.model("Bill");

router.get("/bill/list", async (req, res) => {
  try {
    const bill = await Bill.find();
    res.status(200).send(bill);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/bill/generate", async (req, res) => {
  const {
    requestId,
    amount,
    description,
    deliverCharge,
    pickupCharge,
    urgentCharge,
    isDeleted,
    baseFields,
  } = req.body;

  const bill = new Bill({
    requestId,
    amount,
    description,
    deliverCharge,
    pickupCharge,
    urgentCharge,
    isDeleted,
    baseFields,
  });
  try {
    await bill.save();
    console.log(bill._id);
    res.status(200).send(bill._id);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
