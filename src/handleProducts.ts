export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export type FiveProducts = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export async function getProducts() {
  let products: Product[] = await fetch(
    "https://fakestoreapi.com/products?limit=20"
  ).then((res) => res.json());
  return products;
}

export async function getProduct(id: number) {
  let product: Product = await fetch(
    `https://fakestoreapi.com/products/${id}`
  ).then((res) => res.json());
  return product;
}

export async function getFiveProducts() {
  let products: Product[] = await fetch(
    "https://fakestoreapi.com/products?limit=4"
  ).then((res) => res.json());
  return products;
}
