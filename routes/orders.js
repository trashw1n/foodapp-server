const express = require("express");
const ordersRouter = express.Router();
const {placeOrder, getOrders, completeOrder} = require('../controllers/orders');
const userAuth = require('../middleware/userAuth');
const staffAuth = require('../middleware/staffAuth');

ordersRouter.route("/").get(staffAuth, getOrders).post(userAuth, placeOrder).delete(staffAuth, completeOrder);

module.exports = ordersRouter;