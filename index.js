const express = require("express");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>HOLA DESDE EL SERVIDOR</h1>");
});

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>PhoneBook has info for ${
      persons.length
    } people</p><p>${new Date().toString()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const findPerson = persons.find((e) => e.id === id);
  if (findPerson) {
    response.status(200).json(findPerson);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((e) => e.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const object = request.body;

  const id = Math.floor(Math.random() * 100000) + 1;

  if (!object.name || !object.number) {
    return response.status(400).send({ error: "name or number missing" });
  }

  if (object.name) {
    const nameFind = persons.find((p) => p.name === object.name);
    if (nameFind) {
      return response.status(400).send({ error: "name must be unique" });
    }
  }

  const contact = {
    id: id,
    name: object.name.trim(),
    number: object.number.trim(),
  };
  persons.push(contact);
  response.status(201).json(contact);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Servidor iniciado");
});
