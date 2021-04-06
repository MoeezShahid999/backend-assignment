const userRoutes = require("express").Router();
const taskController = require("../../controller/tasks");
const { userAuth } = require("../../userAuth/userAuth");
userRoutes.post("/create", userAuth, taskController.createTask);
userRoutes.get("/list", userAuth, taskController.listTask);

module.exports = userRoutes;
