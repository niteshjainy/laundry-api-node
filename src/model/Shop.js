const mongoose = require("mongoose");
const baseSchema = require("./Base");
const bcrypt = require("bcrypt");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  openTime: {
    type: String,
  },
  closeTime: {
    type: String,
  },
  isOpen: {
    type: Boolean,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  closeMsg: {
    type: String,
  },

  baseFields: baseSchema,
});

shopSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

shopSchema.pre("save", function (next) {
  const shop = this;
  if (!shop.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(shop.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      shop.password = hash;
      next();
    });
  });
});

shopSchema.methods.comparePassword = function (candidatePassword) {
  const shop = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, shop.password, (err, isMatch) => {
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

mongoose.model("Shop", shopSchema);
