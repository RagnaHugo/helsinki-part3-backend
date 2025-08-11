const mongoose = require("mongoose");
const { Schema, model } = mongoose;
require("dotenv").config();
const url = process.env.URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Base conectada");
  })
  .catch((err) => {
    console.log(err);
  });

const validation = (v) => {
  if (v.length >= 8) {
    const format1 = /^\d{2}-\d+$/;
    const format2 = /^\d{3}-\d+$/;

    return format1.test(v) || format2.test(v);
  }
  return false;
};

const newSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  phone: {
    type: String,
    validate: {
      validator: validation,
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

newSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ModelContact = model("Contact", newSchema);

module.exports = {
  ModelContact,
  mongoose,
};
