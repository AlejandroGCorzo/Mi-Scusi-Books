import axios from "axios";

export default async function CheckoutPaypal(id, discount, shipping) {
  const response = await axios.post("/payment/create-order", {
    id,
    discount,
    shipping,
  });
  console.log("estoy en la despues action");
  return response;
}
