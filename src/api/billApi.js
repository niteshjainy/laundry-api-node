const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Bill = mongoose.model("Bill");

router.get("/bill/list", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).send(bills);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.get("/bill/:billId", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    res.status(200).send(bill);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/bill/generate", async (req, res) => {
  const newBill = ({
    requestId,
    amount,
    description,
    deliveryCharge,
    pickupCharge,
    urgentCharge,
    isDeleted,
    baseFields,
  } = req.body);

  const bill = new Bill(newBill);
  try {
    await bill.save();
    console.log(bill._id);
    res.status(200).send(bill._id);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
