const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./config/connection");

const routes = require("./routes");
const app = express();

let PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(routes);
connection;

app.use((req, res, next) => {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Controll-Allow-Headers",
    "Access, Content-type, Authorization, Acept, Origin, X-Requested-With"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`App listenner on port: ${PORT}`);
});
