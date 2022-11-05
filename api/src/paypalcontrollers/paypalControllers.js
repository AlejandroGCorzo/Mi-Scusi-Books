const axios = require("axios");
const User = require("../models/user");


const createOrder = async (req, res) => {
  const { id, discount, shipping } = req.body
  
  try {
    const cart = await User.findById(id).select("cart");
    let price = cart.cart.reduce((acc, el) => {
      return acc += el.price * el.amount
    }, 0)

    price = price + Number(shipping) - Math.round(price * discount* 100) / 100
    price = Math.round(price * 100) / 100
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${price}`,
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

    return res.json(response.data.links[1].href);
  } catch (error) {
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


    res.redirect(`${process.env.FRONT_URL}/order-successfully`);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const cancelOrder = (req, res) => {
  res.redirect(`${process.env.FRONT_URL}`);
};

module.exports = { createOrder, captureOrder, cancelOrder };
