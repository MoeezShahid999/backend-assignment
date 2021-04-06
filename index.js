const express = require("express");
const route = require("./route/routes");
const redis = require("redis");
const app = express();
const errorController = require("./errorController/errorController");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", route);

app.use(errorController);
app.listen(8000, () => {
  console.log("I am running");
});
