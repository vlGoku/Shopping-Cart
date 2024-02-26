import { useContext, useState } from "react";
import { Link, redirect } from "react-router-dom";
import CartContext from "./CartContext";
import { IProduct } from "../ts/interfaces/global_interface";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

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

  const deleteItem = (product: IProduct) => {
    setProducts((prevProduct) =>
      prevProduct.filter((prevProduct) => prevProduct.id !== product.id)
    );
  };

  const handleIncreaseItem = (product: IProduct) => {
    const copy = [...products!];
    const productsNew = copy.filter((prod) => prod.id !== product.id);
    product.amount++;
    product.price = product.amount * product.singlePrice;
    setProducts(productsNew);
  };

  const handleDecreaseItem = (product: IProduct) => {
    const copy = [...products!];
    const productsNew = copy.filter((prod) => prod.id !== product.id);
    if (product.amount > 1) {
      product.amount--;
      product.price -= product.singlePrice;
      setProducts(productsNew);
    } else {
      deleteItem(product);
    }
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
              <th>Amount: {products?.length}</th>
              <th>Total Price in €: {addSum(products!)}</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
