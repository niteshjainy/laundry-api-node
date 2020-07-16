const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "auth not found" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "5f034ae6ccd75c0f78383786", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in." });
    }

    const { customerId } = payload;
    const customer = await Customer.findById(customerId);

    req.customer = customer;
    next();
  });
};
