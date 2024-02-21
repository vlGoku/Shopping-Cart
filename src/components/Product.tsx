import { getProduct } from "../handleProducts";
import { useLoaderData, Form } from "react-router-dom";

export async function loader() {
  const product = await getProduct;
  return { product };
}
