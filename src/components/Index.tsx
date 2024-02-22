import { useLoaderData, Form } from "react-router-dom";
import { getFiveProducts, getProducts } from "../handleProducts";
import { Product, FiveProducts } from "../handleProducts";

export async function loader() {
  const products = await getProducts();
  const fiveProducts = await getFiveProducts();
  return { products, fiveProducts };
}

export default function Index() {
  const { fiveProducts } = useLoaderData() as { fiveProducts: FiveProducts[] };
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
          <div className="cardHolder">
            <div id="productImg">
              <img
                height={300}
                key={product.id}
                src={product.image}
                id="productImg"
              />
            </div>
            <div id="productInfo">
              <h4>{product.title}</h4>
              <p>{product.price}</p>
              <div id="formDiv">
                <Form action="addToCart" id="formButton">
                  <button
                    type="submit"
                    id="btnAddCart"
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
