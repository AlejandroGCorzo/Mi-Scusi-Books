import axios from "axios";

export default async function CheckoutPaypal() {
  const response = await axios.post("/payment/create-order");
  return response;
}
