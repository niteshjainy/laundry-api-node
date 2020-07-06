require("./model/Shop");
require("./model/Customer");
require("./model/Bill");
require("./model/Request");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shopApi = require("./api/shopApi");
const customerApi = require("./api/customerApi");
const billApi = require("./api/billApi");

const app = express();

app.use(bodyParser.json());
app.use(shopApi);
app.use(billApi);
app.use(customerApi);

const mangoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.hqgew.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mangoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mango instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mango", err);
});

app.get("/", (req, res) => {
  res.send("called successfully");
});

app.listen(4000, () => {
  console.log("listing port 4000");
});
