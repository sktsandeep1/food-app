const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
require("colors");

const connectDb = require("./config/config");

// dotenv config
dotenv.config();

// database connection
connectDb();

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// cors
app.use(
  cors({
    origin: "https://food-app-chi-livid.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// api routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

// port
const PORT = process.env.PORT || 9090;

// listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
