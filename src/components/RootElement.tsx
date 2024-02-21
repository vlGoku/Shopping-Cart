import { useLoaderData, Form } from "react-router-dom";
import { getProducts } from "../handleProducts";
import { Product } from "../handleProducts";

export async function loader() {
  const products = await getProducts();
  return { products };
}

export default function RootElement() {
  const { products } = useLoaderData() as { products: Product[] };
  return (
    <>
      <div id="product">
        {products.map((product) => (
          <div>
            <div>
              <img height={300} key={product.id} src={product.image} />
            </div>
            <div>
              <h1>{product.title}</h1>
              <i>{product.price}</i>
              <div>
                <Form action="edit">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Add to Cart
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
