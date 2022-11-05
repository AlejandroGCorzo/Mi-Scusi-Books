const Router = require("express");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const router = Router();
const user = require("./user");
const category = require("./category");
const review = require("./review");
const books = require("./books");
const bills = require("./bills");
const paypalRouter = require("./paypal");
const report = require("./reports")

const { application } = require("express");
//middleware
router.use(cors());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.use(Router.json());
router.use("/user", user);
router.use("/category", category);
router.use("/review", review);
router.use("/books", books);
router.use("/bills", bills);
router.use("/payment", paypalRouter);
router.use("/report", report);

module.exports = router;
