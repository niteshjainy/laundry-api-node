const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
customerSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

customerSchema.pre("save", function (next) {
  const customer = this;
  if (!customer.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(customer.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      customer.password = hash;
      next();
    });
  });
});

customerSchema.methods.comparePassword = function (candidatePassword) {
  const customer = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, customer.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

mongoose.model("Customer", customerSchema);
