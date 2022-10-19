const { Router } = require("express");
const { createOrder, captureOrder, cancelOrder } = require("../paypalcontrollers/PaypalControllers")
const paypalRouter = Router();

paypalRouter.get("/create-order", createOrder);

module.exports = paypalRouter;