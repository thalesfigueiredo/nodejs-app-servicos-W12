const express = require('express');
const consign = require('consign');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.set('jwt', jwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

consign({ cwd: 'src' })
    .include("db")
    .then("middlewares")
    .then("models")
    .then("controllers")
    .then("routes")
    .into(app)

// HTTP
// GET (consultar), POST (adicionar coisas novas), PUT (atualizar), DELETE (excluir)

app.listen(8000, function() {
    console.log("servidor rodando na porta 8000");
})

