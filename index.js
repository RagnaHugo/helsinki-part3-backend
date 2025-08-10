const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { ModelContact, mongoose } = require("./models/Person");

let persons = [];

app.use(cors());

morgan.token("getBody", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :getBody"
  )
);

app.use(express.static("dist"));
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>HOLA DESDE EL SERVIDOR</h1>");
});

app.get("/api/persons/", (request, response) => {
  ModelContact.find({}).then((res) => {
    response.json(res);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<p>PhoneBook has info for ${
      persons.length
    } people</p><p>${new Date().toString()}</p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  ModelContact.findById(id)

    .then((res) => {
      if (res) {
        response.status(200).json(res);
      } else {
        response.status(404).send({ error: "id not found" });
      }
    })
    .catch((err) => {
      return next(err);
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  ModelContact.findByIdAndDelete(id)

    .then((res) => {
      if (res) {
        response.status(204).json(res);
      } else {
        response.status(404).send({ error: "id not found" });
      }
    })
    .catch((err) => {
      console.log(err);

      response.status(400).send({ error: "id not valid" });
    });
});

app.post("/api/persons/", (request, response) => {
  const object = request.body;

  if (!object.name || !object.phone) {
    return response.status(400).send({ error: "name or number missing" });
  }

  if (object.name) {
    const nameFind = persons.find((p) => p.name === object.name);
    if (nameFind) {
      return response.status(400).send({ error: "name must be unique" });
    }
  }

  const contacto = new ModelContact({
    name: object.name.trim(),
    phone: object.phone.trim(),
  });

  contacto
    .save()
    .then((res) => {
      console.log(res);
      response.status(201).json(res);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("error " + err); //se guardan dos veces
    });
});

// middleware de errores
const errorHandle = (error, request, response, next) => {
  console.error(error.message);
  if (error.name == "CastError") {
    return response.status(400).send({ error: "malformtted id" });
  }
  next(error);
};

app.use(errorHandle);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
