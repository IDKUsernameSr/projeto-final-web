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

// estaticos
app.use(express.static(path.join(__dirname, "..", "public")));

// middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// sessao
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

// testa conexao com o banco
testConnection();

module.exports = app;