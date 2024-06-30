const express = require("express");
const menuRouter = express.Router();
const menu = require("../controllers/menu");
const userAuth = require('../middleware/userAuth');
menuRouter.use(userAuth);

menuRouter.route("/").get(menu);

module.exports = menuRouter;