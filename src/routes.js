const express = require("express");
const routes = express.Router();

const { show, store, showOne } = require("./app/Controllers/UserController");

const LoginController = require("./app/Controllers/LoginController");
const auth = require("./app/Middlewares/auth");
const {
  getCLients,
  getCLientActivities,
  registerNewClient,
  clientNextStage,
} = require("./app/Controllers/CustomerController");

routes.get("/", (req, res) => {
  return res.send("MainPage");
});

routes.get("/user", auth, show);
routes.get("/user/:id", auth, showOne);
routes.post("/user", store);

routes.post("/login", LoginController);

routes.get("/costumerService", auth, getCLients);
routes.get("/costumerService/:serviceId", auth, getCLientActivities);
routes.post("/costumerService", auth, registerNewClient);
routes.put("/costumerService/:serviceId", auth, clientNextStage);

module.exports = routes;
