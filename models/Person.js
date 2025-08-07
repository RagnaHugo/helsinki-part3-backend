const { mongoose, model } = require("mongoose");
const { Schema } = mongoose;
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

const newSchema = new Schema({
  name: String,
  phone: String,
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
