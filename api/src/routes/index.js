const Router = require("express");
const cors = require("cors");
const { expressjwt: jwt } = require('express-jwt');
const jwks = require("jwks-rsa");
const axios = require("axios");

const router = Router();
const user = require("./user");
const category = require("./category");
const review = require("./review");
const books = require("./books");
const { application } = require("express");
//middleware
router.use(cors());

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://miscusibooks.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "MiScusiBooks",
  issuer: "https://miscusibooks.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ['/','/user', "/books/allBooks"]})

// router.use(verifyJwt)

router.use(Router.json());

router.use("/user", user);
router.use("/category", category);
router.use("/review", review);
router.use("/books", books);

module.exports = router;
