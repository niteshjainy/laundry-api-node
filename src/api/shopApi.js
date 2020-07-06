const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Shop = mongoose.model("Shop");

router.post("/shop/register", async (req, res) => {
  const {
    shopName,
    mobile,
    address,
    ownerName,
    openTime,
    closeTime,
    isOpen,
    isDelated,
    closeMsg,
    baseFields,
  } = req.body;

  const shop = new Shop({
    shopName,
    mobile,
    address,
    ownerName,
    openTime,
    closeTime,
    isOpen,
    isDelated,
    closeMsg,
    baseFields,
  });
  try {
    await shop.save();
    //console.log(shop._id);
    res.status(200).send(shop._id);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
