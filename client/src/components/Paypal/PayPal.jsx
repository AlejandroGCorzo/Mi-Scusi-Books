import axios from "axios";

export default async function CheckoutPaypal() {
  console.log('ENTREEEEEE');
  const response = await axios.post("/payment/create-order");
  return response;
}
