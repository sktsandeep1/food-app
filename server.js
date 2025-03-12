const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { bgBlue, bgCyan } = require("colors");
require("colors");

const connectDb = require("./config/config");

// ----------------------------------------------------- //
const path = require("path");

const _dirname = path.resolve();

// ----------------------------------------------------- //
// dotenv
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

// middleware
// app.use (cors())
// app.use(cors({ origin: "*" }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("<h1>hi there</h1>");
});
// only this one is showing

app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Port
const PORT = process.env.PORT || 9090;

// ---------------- ---------------- //
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

// ---------------- ---------------- //
//listen
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgCyan);
});
