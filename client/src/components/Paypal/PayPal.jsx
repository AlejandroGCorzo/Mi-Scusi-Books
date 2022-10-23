import axios from "axios";

export default async function CheckoutPaypal(id) {
  console.log('ENTREEEEEE', id);
  const response = await axios.post("/payment/create-order", {id});
  return response;
}
