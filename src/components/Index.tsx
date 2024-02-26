import { useLoaderData, Form, NavLink } from "react-router-dom";
import { getFiveProducts, getProducts } from "../handleProducts";
import { Product, FiveProducts } from "../handleProducts";
import { IProduct } from "../ts/interfaces/global_interface";
import { useContext } from "react";
import CartContext from "./CartContext";

export async function loader() {
  const products = await getProducts();
  const fiveProducts = await getFiveProducts();
  return { products, fiveProducts };
}

export default function Index() {
  const { fiveProducts } = useLoaderData() as { fiveProducts: FiveProducts[] };
  const [productsCart, setProducts] = useContext(CartContext);

  const handleAdd = (product: IProduct) => {
    const currentCart = [...productsCart!];
    const isProductInCart = currentCart.some((item) => item.id === product.id);
    if (!isProductInCart) {
      currentCart.push(product);
      product.amount = 1;
      product.singlePrice = product.price;
      setProducts(currentCart);
    }
  };
  return (
    <>
      <div className="container">
        <div id="backgroundImgDiv">Welcome to my cool Store</div>
        <div className="indexHeaderDiv">
          <h2 className="indexHeader">Unsere Produkte</h2>
        </div>
      </div>
      <div id="product">
        {fiveProducts.map((product) => (
          <div className="cardHolder" key={product.id}>
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
              <p>{product.price}€</p>
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
