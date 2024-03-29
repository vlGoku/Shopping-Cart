import { useContext } from "react";
import { Link, redirect } from "react-router-dom";
import CartContext from "./CartContext";
import { IProduct } from "../ts/interfaces/global_interface";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { produce } from "immer";

export async function action() {
  return redirect(`/cart`);
}

export default function Cart() {
  const [products, setProducts] = useContext(CartContext);

  const addSum = (products: IProduct[]) => {
    let sum = 0;
    products.map((product) => {
      sum += product.price;
    });
    return sum.toFixed(2);
  };

  const addAmount = (products: IProduct[]) => {
    let sum = 0;
    products.map((product) => {
      sum += product.amount;
    });
    return sum;
  };

  const deleteItem = (product: IProduct) => {
    setProducts((prevProduct) =>
      prevProduct.filter((prevProduct) => prevProduct.id !== product.id)
    );
  };

  const handleIncreaseItem = (product: IProduct) => {
    const nextState = produce(products, (draft) => {
      const index = draft!.findIndex((p) => p.id === product.id);
      draft![index].amount++;
      draft![index].price = draft![index].singlePrice * draft![index].amount;
    });
    setProducts(nextState!);
  };

  const handleDecreaseItem = (product: IProduct) => {
    const nextState = produce(products, (draft) => {
      const index = draft!.findIndex((p) => p.id === product.id);
      if (draft![index].amount > 1) {
        draft![index].amount--;
        draft![index].price -= draft![index].singlePrice;
      }
    });
    setProducts(nextState!);
  };

  return (
    <>
      <div>
        <Link to={`/shop`}>Back to Shop</Link>
        <h1 id="header">Your Cart</h1>
      </div>
      <div id="cartContainer">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Price in €</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: IProduct): JSX.Element => {
              return (
                <tr key={product.id}>
                  <td>
                    <img id="imgCart" src={product.image} />
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <IconButton
                      onClick={() => {
                        handleDecreaseItem(product);
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                    {product.amount}
                    <IconButton
                      onClick={() => {
                        handleIncreaseItem(product);
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </td>
                  <td>{product.price.toFixed(2)}€</td>
                  <td>
                    <IconButton
                      onClick={() => {
                        deleteItem(product);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Amount: {addAmount(products!)}</th>
              <th>Total Price in €: {addSum(products!)}</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
