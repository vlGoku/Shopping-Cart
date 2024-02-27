import { getProduct } from "../handleProducts";

export async function loader() {
  const product = await getProduct;
  return { product };
}
