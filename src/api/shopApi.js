const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Shop = mongoose.model("Shop");

router.get("/shop/list", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).send(shops);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
router.get("/shop/:shopId", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId);
    res.status(200).send(shop);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
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
    //req.shop.shopId = shop._id;
    res.status(200).send(shop._id);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

module.exports = router;
