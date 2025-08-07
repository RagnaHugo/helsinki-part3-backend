const { mongoose, model } = require("mongoose");
const { Schema } = mongoose;

const password = process.argv[2];
const url = `mongodb+srv://hugozjimi:${password}@cluster0.j16qww0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
const ModelContact = model("Contact", newSchema);

if (process.argv.length > 3) {
  const contacto = new ModelContact({
    name: process.argv[3],
    phone: process.argv[4],
  });

  contacto
    .save()
    .then((res) => {
      console.log(res);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  ModelContact.find({}).then((res) => {
    console.log("PhoneBook");
    res.forEach((element) => {
      console.log(`${element.name} ${element.phone}`);
    });
    mongoose.connection.close();
  });
}
