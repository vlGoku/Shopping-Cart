import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart, { action as changeAction } from "./components/Cart";
import Index, { loader as indexLoader } from "./components/Index";
import Shop, {
  loader as shopLoader,
  action as shopAction,
} from "./components/Shop";
import Menu from "./components/Menu";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Menu />,
      children: [
        { index: true, element: <Index />, loader: indexLoader as any },
        {
          path: "/shop",
          element: <Shop />,
          action: shopAction as any,
          loader: shopLoader as any,
        },
      ],
    },
    {
      path: "/cart",
      element: <Cart />,
      action: changeAction as any,
    },
  ]);
  return <RouterProvider router={router} />;
}
