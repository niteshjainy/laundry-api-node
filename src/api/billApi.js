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

router.patch("/bill/update/:billId", async (req, res) => {
  const data = req.body;

  if (!data) {
    return res
      .status(422)
      .send({ error: "Something went wrong!! Please try again" });
  }
  try {
    await Bill.updateOne({ _id: req.params.billId }, data, {
      timestamps: true,
    });
    res.status(200).send("updated successfully");
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
  const newBill = req.body;

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
