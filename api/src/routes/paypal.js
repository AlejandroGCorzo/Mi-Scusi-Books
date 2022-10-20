const { Router } = require("express");
const { createOrder, captureOrder, cancelOrder } = require("../paypalcontrollers/PaypalControllers")
const paypalRouter = Router();

paypalRouter.get("/create-order", createOrder);
//cambiar a post cuando se le pasen los parametros de el front

paypalRouter.get("/capture-order", captureOrder);

paypalRouter.get("/cancel-order", cancelOrder);

module.exports = paypalRouter;