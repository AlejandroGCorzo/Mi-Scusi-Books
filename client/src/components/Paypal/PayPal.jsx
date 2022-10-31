import axios from "axios";

export default async function CheckoutPaypal(id, discount) {
  const response = await axios.post("/payment/create-order", {id, discount});
  console.log('estoy en la despues action');
  return response;
}
