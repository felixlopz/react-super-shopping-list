const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connecting to mongo
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const netlifyRoot = "/.netlify/functions/api";

const apiRoot = netlifyRoot;

// routes
app.use(`${apiRoot}/signin`, require("../src/routes/api/signin"));
app.use(`${apiRoot}/login`, require("../src/routes/api/login"));
app.use(`${apiRoot}/user`, require("../src/routes/api/user"));

// Basic get rout
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    `Super shopping list API see ${process.env.PROJECT_REPOSITORY_URL} for more info`
  );
});

app.use(`${apiRoot}/`, router);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`API server listening on port http://localhost:${port}`);
});

module.exports.handler = serverless(app);
