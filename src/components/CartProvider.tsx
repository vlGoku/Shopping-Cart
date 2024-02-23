import React, { useState } from "react";
import CartContext from "./CartContext";
import { IProduct } from "../ts/interfaces/global_interface";

interface Props {
  children: React.ReactNode;
}

export default function ProductsProvider({ children }: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);
  return (
    <CartContext.Provider value={[products, setProducts]}>
      {children}
    </CartContext.Provider>
  );
}
