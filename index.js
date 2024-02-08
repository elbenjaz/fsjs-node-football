const express = require('express');
const { auth } = require("./middlewares/auth.js");
const loginValidate = require("./middlewares/validation/login.js");

const app = express();

app.listen(3000, console.log("SERVER ON"));
app.use(express.json())

const { login } = require('./controllers/login')
const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')

app.post("/login", loginValidate, login)

app.get("/equipos", obtenerEquipos)
app.post("/equipos", auth.checkAuthentication, agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", auth.checkAuthentication, registrarJugador)

module.exports = app;
