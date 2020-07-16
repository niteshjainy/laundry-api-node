const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Shop = mongoose.model("Shop");
const jwt = require("jsonwebtoken");

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
  const newShop = ({
    shopName,
    mobile,
    password,
    address,
    ownerName,
    openTime,
    closeTime,
    isOpen,
    isDelated,
    closeMsg,
  } = req.body);

  const shop = new Shop(newShop);
  try {
    await shop.save();
    const token = jwt.sign({ shopId: shop._id }, "5f034ae6ccd75c0f78383786");
    const data = {
      token: token,
      shopId: shop._id,
    };
    res.status(200).send(data);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/shop/login", async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(422).send({ error: "please enter mobile or password" });
  }

  const shop = await Shop.findOne({ mobile });

  if (!shop) {
    return res.status(422).send({ error: "incorrect mobile" });
  }
  try {
    await shop.comparePassword(password);
    const token = jwt.sign({ shopId: shop._id }, "5f034ae6ccd75c0f78383786");
    const data = {
      token: token,
      shopId: shop._id,
    };
    res.send(data);
  } catch (err) {
    return res.status(422).send({ error: "Invalid password" });
  }
});
module.exports = router;
