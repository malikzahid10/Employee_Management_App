const express = require("express");
const { loginValidate } = require("../validations/user.validation");
const { loginUser } = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/login", loginValidate, loginUser);

module.exports = userRouter;
