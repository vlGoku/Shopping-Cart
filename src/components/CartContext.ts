import { createContext, Dispatch, SetStateAction } from "react";
import { IProduct } from "../ts/interfaces/global_interface";

type CartContextType = [
  IProduct[] | null,
  Dispatch<SetStateAction<IProduct[]>>
];

const CartContext = createContext<CartContextType>([null, () => {}]);

export default CartContext;
