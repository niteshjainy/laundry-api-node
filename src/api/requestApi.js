const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Request = mongoose.model("Request");
const Customer = mongoose.model("Customer");

router.get("/request/list", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).send(requests);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.get("/request/:requestId", async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);
    res.status(200).send(request);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.patch("/request/update/:requestId", async (req, res) => {
  const data = req.body;

  if (!data) {
    return res
      .status(422)
      .send({ error: "Something went wrong!! Please try again" });
  }
  try {
    await Request.updateOne({ _id: req.params.requestId }, data, {
      timestamps: true,
    });
    res.status(200).send("updated successfully");
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/request/register", async (req, res) => {
  const newRequest = req.body;
  newRequest.shopId = "5f10a3cbc66a080bb4d5254d";
  const request = new Request(newRequest);
  try {
    await request.save();
    await Customer.updateOne(
      { _id: req.body.customerId },
      { deliveryAddress: req.body.address },
      {
        timestamps: true,
      }
    );
    res.status(200).send(request);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
