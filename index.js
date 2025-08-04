const express = require("express");

const persons = [
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

app.get("/", (request, response) => {
  response.send("<h1>HOLA DESDE EL SERVIDOR</h1>");
});

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Servidor iniciado");
});
