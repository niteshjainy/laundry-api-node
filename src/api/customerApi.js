const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Customer = mongoose.model("Customer");

router.get("/customer/list", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
router.get("/customer/:customerId", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    res.status(200).send(customer);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
router.post("/customer/register", async (req, res) => {
  const { shopId, name, mobile, address, isDeleted, baseFields } = req.body;
  const customer = new Customer({
    shopId,
    name,
    mobile,
    address,
    isDeleted,
    baseFields,
  });
  try {
    await customer.save();
    res.status(200).send(customer);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
