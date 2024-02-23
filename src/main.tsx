import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx";
import ProductsProvider from "./components/CartProvider.tsx";
import "@picocss/pico";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsProvider>
      <Router />
    </ProductsProvider>
  </React.StrictMode>
);
