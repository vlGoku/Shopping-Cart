import { getProduct } from "../handleProducts";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { IProduct } from "../ts/interfaces/global_interface";
import { useContext } from "react";
import CartContext from "./CartContext";

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
  const [productsCart, setProducts] = useContext(CartContext);

  const handleAdd = (product: IProduct) => {
    const currentCart = [...productsCart!];
    const isProductInCart = currentCart.some((item) => item.id === product.id);
    if (!isProductInCart) {
      currentCart.push(product);
      setProducts(currentCart);
    }
  };
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
                  onClick={() => {
                    handleAdd(product);
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
