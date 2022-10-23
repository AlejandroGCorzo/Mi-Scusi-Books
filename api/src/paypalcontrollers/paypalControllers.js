const axios = require("axios");
const User = require("../models/user");


const createOrder = async (req, res) => {
  const { id } = req.body
  
  try {
    const cart = await User.findById(id).select("cart");
    console.log('user cart', cart)
    const price = cart.cart.reduce((acc, el) => {
      return acc += el.price * el.amount
    }, 0)
    console.log(price)
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${price + 8}`,
          },
        },
      ],
      application_context: {
        brand_name: "Mi Scusi Books",
        locale: "en-US",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url:  `${process.env.BACK_URL}/payment/capture-order`,
        cancel_url: `${process.env.BACK_URL}/payment/cancel-order`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // console.log(params);

    // Generate an access token

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      }
    );

    // const {
    //   data: { access_token },
    // } = await axios.post(
    //   `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    //   params,
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     auth: {
    //       username: process.env.CLIENT_ID,
    //       password: process.env.CLIENT_SECRET,
    //     },
    //   }
    // );

    console.log(access_token);

    // make a request
    const response = await axios.post(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // console.log(response.data);

    return res.json(response.data.links[1].href);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Something goes wrong");
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET,
        },
      }
    );

    console.log(response.data);

    res.redirect("http://localhost:3000/order-successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelOrder = (req, res) => {
  res.redirect("http://localhost:3000/");
};

module.exports = { createOrder, captureOrder, cancelOrder };
