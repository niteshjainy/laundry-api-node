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
  });
  try {
    const a = await shop.save();
    console.log(a);
    res.status(200).send("dhfgdhgf");
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
