require("dotenv").config({});

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

const router = require("./router");
const middlewares = require("./utils/middlewares");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not define");
  // process.exit(-1);
}

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());

if (process.env.NODE === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(middlewares.modifyResponse);

app.use(router);

mongoose.connect(MONGO_URI, { useUnifiedTopology: true }).then(() => {
  console.log("DATA BASE connected!");
});

app.listen(PORT, () => {
  console.log(`App listen on ${PORT}`);
});
