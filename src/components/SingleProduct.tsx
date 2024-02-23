import { getProduct } from "../handleProducts";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";

export async function loader({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);
  return { product };
}

export async function action() {
  return redirect(`/product/:id`);
}

type ProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default function Product() {
  const { product } = useLoaderData() as { product: ProductType };
  return (
    <>
      <div id="productDiv">
        <div id="product-card">
          <div>
            <img height={300} key={product.image} src={product.image} />
          </div>
          <div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div>
              <Form action="edit">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Add to cart
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
