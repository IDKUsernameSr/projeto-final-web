const path = require("path");
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("dotenv").config();

const { testConnection } = require("./config/db");

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// sessão (vamos usar depois para login)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

// rotas
const homeRoutes = require("./routes/homeRoutes");
app.use("/", homeRoutes);

// testa conexão ao subir
testConnection();

module.exports = app;