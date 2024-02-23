import { useLoaderData, Form, redirect, NavLink } from "react-router-dom";
import { getProducts } from "../handleProducts";
import { Product } from "../handleProducts";
import { useContext } from "react";
import CartContext from "./CartContext";
import { IProduct } from "../ts/interfaces/global_interface";

export async function loader() {
  const products = await getProducts();
  return { products };
}

export async function action() {
  return redirect(`/shop`);
}

export default function Shop() {
  const { products } = useLoaderData() as { products: Product[] };
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
      <div id="product">
        {products.map((product) => (
          <div className="cardHolder">
            <div id="productImg">
              <NavLink to={`/product/${product.id}`}>
                <img
                  height={300}
                  key={product.id}
                  src={product.image}
                  id="productImg"
                />
              </NavLink>
            </div>
            <div id="productInfo">
              <h4>{product.title}</h4>
              <p>{product.price}</p>
              <div id="formDiv">
                <Form id="formButton">
                  <button
                    type="submit"
                    id="btnAddCart"
                    onClick={() => {
                      handleAdd(product);
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
