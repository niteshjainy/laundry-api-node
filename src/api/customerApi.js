const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Customer = mongoose.model("Customer");
const jwt = require("jsonwebtoken");

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
  const newCustomer = ({
    shopId,
    name,
    mobile,
    address,
    isDeleted,
    baseFields,
  } = req.body);
  const customer = new Customer(newCustomer);
  try {
    await customer.save();
    const token = jwt.sign({ customerId: customer._id }, "jainy");
    res.send({ token });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/customer/login", async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(422).send({ error: "please enter mobile or password" });
  }

  const customer = await Customer.findOne({ mobile });

  if (!customer) {
    return res.status(422).send({ error: "incorrect mobile" });
  }
  try {
    await customer.comparePassword(password);
    const token = jwt.sign({ customerId: customer._id }, "jainy");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password" });
  }
});

module.exports = router;
