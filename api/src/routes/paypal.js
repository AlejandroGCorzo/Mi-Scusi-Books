const { Router } = require("express");
const { createOrder, captureOrder, cancelOrder } = require("../paypalcontrollers/paypalControllers")
const paypalRouter = Router();

paypalRouter.post("/create-order", createOrder);

paypalRouter.get("/capture-order", captureOrder);

paypalRouter.get("/cancel-order", cancelOrder);

module.exports = paypalRouter;