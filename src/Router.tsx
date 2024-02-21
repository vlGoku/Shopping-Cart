import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootElement, { loader as rootLoader } from "./components/RootElement";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      loader: rootLoader,
    },
  ]);
  return <RouterProvider router={router} />;
}
